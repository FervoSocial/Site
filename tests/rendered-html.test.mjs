import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

class TestD1Statement {
  constructor(database, sql, bindings = []) {
    this.database = database;
    this.sql = sql;
    this.bindings = bindings;
  }

  bind(...bindings) {
    return new TestD1Statement(this.database, this.sql, bindings);
  }

  async first(columnName) {
    const row = this.database.prepare(this.sql).get(...this.bindings);
    if (!row) return null;
    return columnName ? row[columnName] ?? null : row;
  }

  async all() {
    return { success: true, results: this.database.prepare(this.sql).all(...this.bindings) };
  }

  async run() {
    const result = this.database.prepare(this.sql).run(...this.bindings);
    return { success: true, meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
  }
}

class TestD1Database {
  constructor(database) {
    this.database = database;
  }

  prepare(sql) {
    return new TestD1Statement(this.database, sql);
  }

  async batch(statements) {
    this.database.exec("BEGIN");
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      this.database.exec("COMMIT");
      return results;
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }
}

class TestR2Bucket {
  constructor() {
    this.objects = new Map();
  }

  async put(key, value, options = {}) {
    const bytes = value instanceof ArrayBuffer
      ? new Uint8Array(value)
      : new Uint8Array(await new Response(value).arrayBuffer());
    this.objects.set(key, {
      bytes: new Uint8Array(bytes),
      contentType: options.httpMetadata?.contentType,
    });
  }

  async get(key) {
    const stored = this.objects.get(key);
    if (!stored) return null;
    return {
      body: new Response(stored.bytes).body,
      httpMetadata: { contentType: stored.contentType },
      size: stored.bytes.byteLength,
    };
  }

  async delete(key) {
    this.objects.delete(key);
  }
}

const sqlite = new DatabaseSync(":memory:");
const migrationsDirectory = new URL("../drizzle/", import.meta.url);
for (const filename of readdirSync(migrationsDirectory).filter((value) => /^\d{4}_.+\.sql$/.test(value)).sort()) {
  const migration = readFileSync(new URL(filename, migrationsDirectory), "utf8");
  for (const statement of migration.split("--> statement-breakpoint").map((value) => value.trim()).filter(Boolean)) {
    sqlite.exec(statement);
  }
}
sqlite.exec("PRAGMA foreign_keys = ON");

const testMediaBucket = new TestR2Bucket();
const testEnv = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  DB: new TestD1Database(sqlite),
  MEDIA: testMediaBucket,
  VERIFICATION_PROVIDER_MODE: "sandbox",
};
const testContext = { waitUntil() {}, passThroughOnException() {} };
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

test("applies the audience migration without retaining temporary-table constraints", () => {
  const postsTable = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'posts'").get();
  assert.match(postsTable.sql, /'public', 'profile', 'only_me'/);
  assert.doesNotMatch(postsTable.sql, /__new_posts/);
});

async function request(pathname, init = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("accept")) headers.set("accept", "text/html");
  return worker.fetch(new Request(`http://localhost${pathname}`, { ...init, headers }), testEnv, testContext);
}

let accountSequence = 0;
async function createTestAccount({ approved = false, role = "member", accountType = "private" } = {}) {
  accountSequence += 1;
  const email = `member-${accountSequence}@example.test`;
  const response = await request("/api/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      accountType,
      email,
      username: `Membro Teste ${accountSequence}`,
      birthDate: "1990-01-01",
      password: "uma-senha-segura-123",
      adultConsent: true,
      termsConsent: true,
    }),
  });
  assert.equal(response.status, 201);
  const cookie = response.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);

  if (approved) {
    const start = await request("/api/auth/verification", {
      method: "POST",
      headers: { cookie, "content-type": "application/json" },
      body: JSON.stringify({ action: "start" }),
    });
    assert.equal(start.status, 200);
    const approve = await request("/api/auth/verification", {
      method: "POST",
      headers: { cookie, "content-type": "application/json" },
      body: JSON.stringify({ action: "approve" }),
    });
    assert.equal(approve.status, 200);
  }

  if (role !== "member") {
    sqlite.prepare("UPDATE users SET role = ? WHERE id = (SELECT user_id FROM auth_identities WHERE identifier = ?)").run(role, email);
  }
  return { cookie, email };
}

const pendingAccount = createTestAccount();
const approvedAccount = pendingAccount.then(() => createTestAccount({ approved: true }));
const adminAccount = approvedAccount.then(() => createTestAccount({ approved: true, role: "admin" }));

function needsMemberSession(pathname) {
  return ["/home", "/clubs-events", "/health-safety", "/explore", "/messages", "/profile", "/event", "/me"].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

async function render(pathname = "/") {
  let cookie;
  if (pathname === "/verify-age") cookie = (await pendingAccount).cookie;
  else if (pathname.startsWith("/admin/")) cookie = (await adminAccount).cookie;
  else if (needsMemberSession(pathname)) cookie = (await approvedAccount).cookie;

  return request(pathname, { headers: cookie ? { cookie } : undefined });
}

test("server-renders the Fervo Social landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>Fervo Social — Conexões reais, no seu ritmo<\/title>/i);
  assert.match(html, /Fervo/);
  assert.match(html, /Social/);
  assert.match(html, /Tua nova comunidade para adultos/);
  assert.match(html, /Conexões reais/);
  assert.match(html, /No seu ritmo/);
  assert.match(html, /href="\/login"[^>]*>Entrar<\/a>/);
  assert.match(html, /maiores de 18 anos/);
  assert.doesNotMatch(html, /<img\b/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders the founder-approved launch navigation shell", async () => {
  const response = await render("/home");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Navegação principal/);
  assert.match(html, /aria-label="Home"/);
  assert.match(html, /aria-label="Criar"/);
  assert.match(html, /aria-label="Clubes e eventos"/);
  assert.match(html, /nav-clubs-heart/);
  assert.match(html, /nav-clubs-tail/);
  assert.match(html, /aria-label="Mensagens"/);
  assert.match(html, /nav-listening-face/);
  assert.match(html, /nav-listening-ear/);
  assert.match(html, /aria-label="Perfil"/);
  assert.match(html, /aria-label="Saúde, segurança e orientação"/);
  assert.match(html, /href="\/clubs-events"/);
  assert.match(html, /href="\/health-safety"/);
  assert.doesNotMatch(html, /class="nav-item" href="\/explore"/);
  assert.match(html, /aria-label="Pesquisar"/);
  assert.match(html, /aria-label="Mais"/);
  assert.doesNotMatch(html, /Descubra no seu ritmo/);
  assert.match(html, /id="feed-title"/);
  assert.match(html, /class="app-atmosphere"[^>]*aria-hidden="true"/);
  assert.doesNotMatch(html, /Pausar fundo|Retomar fundo/);
  assert.match(html, /aria-label="Curtir"/);
  assert.match(html, /aria-label="Guardar"/);
  assert.match(html, /control-tooltip/);
  assert.match(html, /touch-action-label/);
});

test("the shared Feed atmosphere switches Kling, Seedance, and Hailuo with a static fallback", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const shell = readFileSync(
    new URL("../components/navigation/AppShell.tsx", import.meta.url),
    "utf8",
  );
  assert.match(shell, /fervo-gold-smoke-kling-2-5\.mp4/);
  assert.match(shell, /fervo-gold-smoke-seedance-2-5-h264\.mp4/);
  assert.match(shell, /fervo-gold-smoke-hailuo-2-3\.mp4/);
  assert.doesNotMatch(
    shell,
    /seedance:\s*"\/fervo-gold-smoke-seedance-2-5\.mp4"/,
  );
  assert.match(shell, /data-active-background=\{visibleVariant\}/);
  assert.match(shell, /autoPlay=\{motionAllowed && variant === "kling"\}/);
  assert.match(shell, /muted/);
  assert.match(shell, /loop/);
  assert.match(shell, /playsInline/);
  assert.match(shell, /poster=\{atmospherePoster\}/);
  assert.match(shell, /prefers-reduced-motion: reduce/);
  assert.match(shell, /video\.pause\(\)/);
  assert.match(shell, /\.play\(\)/);
  assert.match(shell, /activeFeedView === "nearby" \? "hailuo" : "kling"/);
  assert.doesNotMatch(css, /@keyframes app-gold-(flow|undertow)/);
  assert.match(css, /\.app-atmosphere-video[\s\S]*object-fit: cover/);
  assert.match(css, /data-active-background="kling"/);
  assert.match(css, /data-active-background="seedance"/);
  assert.match(css, /data-active-background="hailuo"/);
  assert.match(shell, /data-hailuo-loop-blend=\{hailuoLoopBlend \? "true" : "false"\}/);
  assert.match(shell, /hailuoLoopBlendDuration = 700/);
  assert.match(css, /url\("\/fervo-gold-smoke-v2\.png"\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.app-atmosphere-video\s*\{ display: none; \}/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /\.feed-view-navigation-menu > button:focus-visible/);
  assert.match(css, /\.save-heart-lock-icon/);
});

test("server-renders public and authenticated placeholder routes", async () => {
  for (const pathname of [
    "/login",
    "/register",
    "/verify-age",
    "/forgot-password",
    "/safety",
    "/help",
    "/legal/terms",
    "/clubs-events",
    "/health-safety",
    "/explore",
    "/explore/profiles",
    "/explore/clubs",
    "/explore/events",
    "/explore/professionals",
    "/messages",
    "/messages/example",
    "/profile/example",
    "/event/example",
    "/me",
    "/me/profile/edit",
    "/me/settings",
    "/me/billing",
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
  }
});

test("server-renders accessible authentication and verification shells", async () => {
  const login = await (await render("/login")).text();
  assert.match(login, /<form\b/i);
  assert.match(login, /<label[^>]*for="login-email"[^>]*>E-mail<\/label>/i);
  assert.match(login, /<label[^>]*for="login-password"[^>]*>Senha<\/label>/i);
  assert.match(login, /href="\/forgot-password"/i);
  assert.match(login, /href="\/register"/i);

  const register = await (await render("/register")).text();
  assert.match(register, /Tipo de conta/i);
  assert.match(register, /Pessoa, casal ou grupo/i);
  assert.match(register, /Clube ou negócio/i);
  assert.match(register, /Organizador de eventos/i);
  assert.match(register, /Profissional/i);
  assert.match(register, /18 anos ou mais/i);

  const recovery = await (await render("/forgot-password")).text();
  assert.match(recovery, /Solicitar recuperação/i);

  const verification = await (await render("/verify-age")).text();
  assert.match(verification, /Verificação obrigatória/i);
  assert.match(verification, /identidade legal fica privada/i);
  assert.match(verification, /Provedor em modo de testes/i);
  assert.match(verification, /Iniciar demonstração/i);
});

test("persists private identity safely and enforces verification and role boundaries", async () => {
  const pending = await pendingAccount;
  const approved = await approvedAccount;

  const unauthenticatedHome = await request("/home", { redirect: "manual" });
  assert.match(unauthenticatedHome.headers.get("location") ?? "", /\/login$/);

  const pendingHome = await request("/home", { headers: { cookie: pending.cookie }, redirect: "manual" });
  assert.match(pendingHome.headers.get("location") ?? "", /\/verify-age$/);

  const approvedHome = await request("/home", { headers: { cookie: approved.cookie } });
  assert.equal(approvedHome.status, 200);

  const memberAdmin = await request("/admin/moderation", { headers: { cookie: approved.cookie }, redirect: "manual" });
  assert.match(memberAdmin.headers.get("location") ?? "", /\/home\?access=denied$/);

  const identity = sqlite.prepare("SELECT password_hash FROM auth_identities WHERE identifier = ?").get(approved.email);
  assert.match(identity.password_hash, /^pbkdf2-sha256\$310000\$/);
  assert.doesNotMatch(identity.password_hash, /uma-senha-segura-123/);

  const profileColumns = sqlite.prepare("PRAGMA table_info(profiles)").all().map((column) => column.name);
  assert.ok(profileColumns.includes("approximate_location_label"));
  assert.ok(!profileColumns.includes("exact_home_address"));
  assert.ok(!profileColumns.includes("latitude"));
  assert.ok(!profileColumns.includes("longitude"));

  const identityColumns = sqlite.prepare("PRAGMA table_info(auth_identities)").all().map((column) => column.name);
  assert.ok(!identityColumns.includes("birth_date"));
  assert.ok(!identityColumns.includes("identity_document"));
  const publicProfileColumns = sqlite.prepare("PRAGMA table_info(profiles)").all().map((column) => column.name);
  assert.ok(!publicProfileColumns.includes("email"));

  const registrationSession = await createTestAccount();
  const cookieHeader = (await request("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: registrationSession.email, password: "uma-senha-segura-123" }),
  })).headers.get("set-cookie") ?? "";
  assert.match(cookieHeader, /HttpOnly/i);
  assert.match(cookieHeader, /SameSite=Lax/i);
  const browserToken = cookieHeader.match(/fervo_session=([^;]+)/)?.[1];
  const storedSession = sqlite.prepare("SELECT token_hash FROM sessions ORDER BY created_at DESC, rowid DESC LIMIT 1").get();
  assert.ok(browserToken);
  assert.notEqual(storedSession.token_hash, browserToken);

  const recovery = await request("/api/auth/recover", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: registrationSession.email }),
  });
  assert.equal(recovery.status, 200);
  const recoveryToken = sqlite.prepare("SELECT token_hash FROM password_recovery_tokens ORDER BY created_at DESC LIMIT 1").get();
  assert.ok(recoveryToken.token_hash.length >= 40);

  const disposable = await createTestAccount({ approved: true });
  const logout = await request("/api/auth/logout", { method: "POST", headers: { cookie: disposable.cookie } });
  assert.equal(logout.status, 200);
  assert.match(logout.headers.get("set-cookie") ?? "", /Max-Age=0/);
  const afterLogout = await request("/home", { headers: { cookie: disposable.cookie }, redirect: "manual" });
  assert.match(afterLogout.headers.get("location") ?? "", /\/login$/);
});

test("creates, renders, and author-soft-deletes Public text posts with server permissions", async () => {
  const pending = await pendingAccount;
  const author = await approvedAccount;
  const nonOwner = await createTestAccount({ approved: true });

  const unauthenticatedCreate = await request("/api/posts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "Sem sessão" }),
  });
  assert.equal(unauthenticatedCreate.status, 401);

  const unverifiedCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: pending.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "Sem verificação" }),
  });
  assert.equal(unverifiedCreate.status, 403);

  const emptyCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "   " }),
  });
  assert.equal(emptyCreate.status, 400);

  const tooLongCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "a".repeat(1001) }),
  });
  assert.equal(tooLongCreate.status, 400);

  const friendsCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "friends", body: "Audiência ainda não suportada" }),
  });
  assert.equal(friendsCreate.status, 400);

  const club = await createTestAccount({ approved: true, accountType: "club_business" });
  const clubCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: club.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "Publicação de clube não autorizada" }),
  });
  assert.equal(clubCreate.status, 403);

  const exactLimitCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: "b".repeat(1000) }),
  });
  assert.equal(exactLimitCreate.status, 201);
  const exactLimitPayload = await exactLimitCreate.json();
  const exactLimitDelete = await request(`/api/posts/${exactLimitPayload.post.id}`, {
    method: "DELETE",
    headers: { cookie: author.cookie },
  });
  assert.equal(exactLimitDelete.status, 200);

  const uniqueBody = `Publicação persistente de teste ${Date.now()}`;
  const created = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie, "content-type": "application/json" },
    body: JSON.stringify({ audience: "public", body: uniqueBody }),
  });
  assert.equal(created.status, 201);
  const payload = await created.json();
  assert.ok(payload.post.id);

  const stored = sqlite.prepare("SELECT author_profile_id, body, audience, deleted_at FROM posts WHERE id = ?").get(payload.post.id);
  assert.equal(stored.body, uniqueBody);
  assert.equal(stored.audience, "public");
  assert.equal(stored.deleted_at, null);
  const authorProfile = sqlite.prepare("SELECT id, handle FROM profiles WHERE owner_user_id = (SELECT user_id FROM auth_identities WHERE identifier = ?)").get(author.email);
  assert.equal(stored.author_profile_id, authorProfile.id);

  const persistedHome = await request("/home", { headers: { cookie: author.cookie } });
  const persistedHtml = await persistedHome.text();
  assert.match(persistedHtml, new RegExp(uniqueBody));
  assert.match(persistedHtml, new RegExp(`href="/profile/${authorProfile.handle}"`));
  assert.match(persistedHtml, />Excluir</);

  const nonOwnerDelete = await request(`/api/posts/${payload.post.id}`, {
    method: "DELETE",
    headers: { cookie: nonOwner.cookie },
  });
  assert.equal(nonOwnerDelete.status, 404);
  assert.equal(sqlite.prepare("SELECT deleted_at FROM posts WHERE id = ?").get(payload.post.id).deleted_at, null);

  const unverifiedDelete = await request(`/api/posts/${payload.post.id}`, {
    method: "DELETE",
    headers: { cookie: pending.cookie },
  });
  assert.equal(unverifiedDelete.status, 403);

  const authorDelete = await request(`/api/posts/${payload.post.id}`, {
    method: "DELETE",
    headers: { cookie: author.cookie },
  });
  assert.equal(authorDelete.status, 200);
  assert.ok(sqlite.prepare("SELECT deleted_at FROM posts WHERE id = ?").get(payload.post.id).deleted_at);

  const afterDeleteHome = await request("/home", { headers: { cookie: author.cookie } });
  assert.doesNotMatch(await afterDeleteHome.text(), new RegExp(uniqueBody));

  const repeatedDelete = await request(`/api/posts/${payload.post.id}`, {
    method: "DELETE",
    headers: { cookie: author.cookie },
  });
  assert.equal(repeatedDelete.status, 404);
});

test("enforces Public, profile-only, and only-me audiences across Feed and profiles", async () => {
  const author = await createTestAccount({ approved: true });
  const viewer = await createTestAccount({ approved: true });
  const authorProfile = sqlite.prepare("SELECT id, handle FROM profiles WHERE owner_user_id = (SELECT user_id FROM auth_identities WHERE identifier = ?)").get(author.email);

  async function createAudiencePost(audience, body) {
    const response = await request("/api/posts", {
      method: "POST",
      headers: { cookie: author.cookie, "content-type": "application/json" },
      body: JSON.stringify({ audience, body }),
    });
    assert.equal(response.status, 201);
    return response.json();
  }

  const publicBody = `Público audience ${Date.now()}`;
  const profileBody = `Somente perfil ${Date.now()}`;
  const onlyMeBody = `Só eu ${Date.now()}`;
  const publicPost = await createAudiencePost("public", publicBody);
  const profilePost = await createAudiencePost("profile", profileBody);
  const onlyMePost = await createAudiencePost("only_me", onlyMeBody);

  const homeHtml = await (await request("/home", { headers: { cookie: viewer.cookie } })).text();
  assert.match(homeHtml, new RegExp(publicBody));
  assert.doesNotMatch(homeHtml, new RegExp(profileBody));
  assert.doesNotMatch(homeHtml, new RegExp(onlyMeBody));

  const publicProfileHtml = await (await request(`/profile/${authorProfile.handle}`, { headers: { cookie: viewer.cookie } })).text();
  assert.match(publicProfileHtml, new RegExp(publicBody));
  assert.match(publicProfileHtml, new RegExp(profileBody));
  assert.doesNotMatch(publicProfileHtml, new RegExp(onlyMeBody));

  const ownerProfileHtml = await (await request("/me", { headers: { cookie: author.cookie } })).text();
  assert.match(ownerProfileHtml, new RegExp(publicBody));
  assert.match(ownerProfileHtml, new RegExp(profileBody));
  assert.match(ownerProfileHtml, new RegExp(onlyMeBody));
  assert.match(ownerProfileHtml, /Somente no perfil/);
  assert.match(ownerProfileHtml, /Só eu/);

  for (const post of [publicPost, profilePost, onlyMePost]) {
    const deleted = await request(`/api/posts/${post.post.id}`, { method: "DELETE", headers: { cookie: author.cookie } });
    assert.equal(deleted.status, 200);
  }
});

test("stores, renders, protects, and deletes one image or video attached to a Public post", async () => {
  const author = await approvedAccount;
  const viewer = await createTestAccount({ approved: true });

  const invalidForm = new FormData();
  invalidForm.set("audience", "public");
  invalidForm.set("body", "Arquivo inválido");
  invalidForm.set("mediaAttestation", "accepted");
  invalidForm.set("media", new File(["not-an-image"], "fake.png", { type: "image/png" }));
  const invalidUpload = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: invalidForm,
  });
  assert.equal(invalidUpload.status, 400);

  const noAttestationForm = new FormData();
  noAttestationForm.set("audience", "public");
  noAttestationForm.set("body", "Sem confirmação");
  noAttestationForm.set("media", new File([
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  ], "photo.png", { type: "image/png" }));
  const noAttestation = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: noAttestationForm,
  });
  assert.equal(noAttestation.status, 400);

  const imageBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
  const imageForm = new FormData();
  imageForm.set("audience", "public");
  imageForm.set("body", "Foto persistente de teste");
  imageForm.set("mediaAttestation", "accepted");
  imageForm.set("media", new File([imageBytes], "photo.png", { type: "image/png" }));
  const imageCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: imageForm,
  });
  assert.equal(imageCreate.status, 201);
  const imagePayload = await imageCreate.json();
  const imageMetadata = sqlite.prepare(`
    SELECT object_key, media_type, mime_type, byte_size, attestation_version, deleted_at
    FROM post_media WHERE post_id = ?
  `).get(imagePayload.post.id);
  assert.equal(imageMetadata.media_type, "image");
  assert.equal(imageMetadata.mime_type, "image/png");
  assert.equal(imageMetadata.byte_size, imageBytes.byteLength);
  assert.ok(imageMetadata.attestation_version);
  assert.equal(imageMetadata.deleted_at, null);
  assert.ok(testMediaBucket.objects.has(imageMetadata.object_key));

  const anonymousMedia = await request(`/api/posts/${imagePayload.post.id}/media`);
  assert.equal(anonymousMedia.status, 401);
  const imageResponse = await request(`/api/posts/${imagePayload.post.id}/media`, {
    headers: { cookie: viewer.cookie },
  });
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/png");
  assert.deepEqual(new Uint8Array(await imageResponse.arrayBuffer()), imageBytes);

  const homeWithImage = await request("/home", { headers: { cookie: viewer.cookie } });
  const imageHtml = await homeWithImage.text();
  assert.match(imageHtml, /Foto persistente de teste/);
  assert.match(imageHtml, new RegExp(`/api/posts/${imagePayload.post.id}/media`));

  const mp4Bytes = new Uint8Array([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
  const videoForm = new FormData();
  videoForm.set("audience", "public");
  videoForm.set("body", "Vídeo persistente de teste");
  videoForm.set("mediaAttestation", "accepted");
  videoForm.set("media", new File([mp4Bytes], "clip.mp4", { type: "video/mp4" }));
  const videoCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: videoForm,
  });
  assert.equal(videoCreate.status, 201);
  const videoPayload = await videoCreate.json();
  const videoMetadata = sqlite.prepare("SELECT media_type, mime_type FROM post_media WHERE post_id = ?").get(videoPayload.post.id);
  assert.equal(videoMetadata.media_type, "video");
  assert.equal(videoMetadata.mime_type, "video/mp4");
  const homeWithVideo = await request("/home", { headers: { cookie: viewer.cookie } });
  assert.match(await homeWithVideo.text(), new RegExp(`/api/posts/${videoPayload.post.id}/media`));

  const profileVideoForm = new FormData();
  profileVideoForm.set("audience", "profile");
  profileVideoForm.set("body", "Vídeo somente no perfil");
  profileVideoForm.set("mediaAttestation", "accepted");
  profileVideoForm.set("media", new File([mp4Bytes], "profile.mp4", { type: "video/mp4" }));
  const profileVideoCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: profileVideoForm,
  });
  assert.equal(profileVideoCreate.status, 201);
  const profileVideoPayload = await profileVideoCreate.json();
  assert.equal((await request(`/api/posts/${profileVideoPayload.post.id}/media`, { headers: { cookie: viewer.cookie } })).status, 200);
  assert.doesNotMatch(await (await request("/home", { headers: { cookie: viewer.cookie } })).text(), /Vídeo somente no perfil/);

  const deleteImage = await request(`/api/posts/${imagePayload.post.id}`, {
    method: "DELETE",
    headers: { cookie: author.cookie },
  });
  assert.equal(deleteImage.status, 200);
  assert.ok(sqlite.prepare("SELECT deleted_at FROM post_media WHERE post_id = ?").get(imagePayload.post.id).deleted_at);
  assert.equal(testMediaBucket.objects.has(imageMetadata.object_key), false);
  const deletedMedia = await request(`/api/posts/${imagePayload.post.id}/media`, {
    headers: { cookie: viewer.cookie },
  });
  assert.equal(deletedMedia.status, 404);

  const privateImageForm = new FormData();
  privateImageForm.set("audience", "only_me");
  privateImageForm.set("body", "Foto privada persistente");
  privateImageForm.set("mediaAttestation", "accepted");
  privateImageForm.set("media", new File([imageBytes], "private.png", { type: "image/png" }));
  const privateImageCreate = await request("/api/posts", {
    method: "POST",
    headers: { cookie: author.cookie },
    body: privateImageForm,
  });
  assert.equal(privateImageCreate.status, 201);
  const privateImagePayload = await privateImageCreate.json();
  assert.equal((await request(`/api/posts/${privateImagePayload.post.id}/media`, { headers: { cookie: viewer.cookie } })).status, 404);
  assert.equal((await request(`/api/posts/${privateImagePayload.post.id}/media`, { headers: { cookie: author.cookie } })).status, 200);
  assert.equal((await request(`/api/posts/${privateImagePayload.post.id}`, { method: "DELETE", headers: { cookie: author.cookie } })).status, 200);
  assert.equal((await request(`/api/posts/${profileVideoPayload.post.id}`, { method: "DELETE", headers: { cookie: author.cookie } })).status, 200);
});

test("offers three enforced Create audiences while keeping Friends and advanced options unavailable", () => {
  const composer = readFileSync(
    new URL("../components/create/CreateComposer.tsx", import.meta.url),
    "utf8",
  );
  const copy = readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8");

  assert.match(composer, /body: JSON\.stringify\(\{ body, audience \}\)/);
  assert.match(composer, /\["public", "profile", "only_me"\]/);
  assert.match(composer, /className="create-audience-trigger"/);
  assert.match(composer, /role="listbox"/);
  assert.match(composer, /aria-disabled="true" disabled/);
  assert.match(copy, /label: "Somente no perfil"/);
  assert.match(copy, /label: "Só eu"/);
  assert.match(composer, /maxLength=\{POST_BODY_MAX_CHARACTERS\}/);
  assert.match(copy, /addMedia: "Adicionar foto ou vídeo"/);
  assert.match(copy, /moreOptions: "Mais opções"/);
  assert.match(copy, /Mais opções reúne configurações secundárias da publicação/);
  assert.match(copy, /comingSoon: "Em breve"/);
  assert.match(composer, /type="file"/);
  assert.match(composer, /form\.set\("media", media\)/);
  assert.match(composer, /form\.set\("mediaAttestation"/);
  assert.match(composer, /mediaPreviewUrl/);
  assert.match(composer, /clearMedia/);
  assert.equal((composer.match(/className="create-tool-control" type="button" disabled/g) ?? []).length, 1);
});

test("server-renders one Feed with three selectable views", async () => {
  const home = await (await render("/home")).text();
  const options = home.match(/role="menuitemradio"/g) ?? [];

  assert.equal(options.length, 3);
  assert.match(home, /id="feed-view-navigation-menu"/i);
  assert.match(home, /aria-label="Visualização: Público"/i);
  assert.match(home, /aria-checked="true"[^>]*>[\s\S]*?Público/i);
  assert.match(home, /aria-checked="false"[^>]*>[\s\S]*?Distância/i);
  assert.match(home, /aria-checked="false"[^>]*>[\s\S]*?Amigos/i);
  assert.doesNotMatch(home, /id="feed-view-select"/i);
  assert.match(home, /Visualizações do Feed/i);
  assert.match(home, /Visualização/i);
  assert.match(home, /class="feed-brand-logo" aria-label="Fervo Social"/i);
  assert.match(home, /class="friend-activity-orbits" aria-label="Amigos com atividade recente"/i);
  assert.match(home, /atividade recente/i);
  assert.doesNotMatch(home, /Uma seleção leve de pessoas/i);
  assert.doesNotMatch(home, /Rótulos provisórios/i);
  assert.match(home, /aria-label="Comentar"/i);
  assert.match(home, /aria-label="Mensagem"/i);
  assert.match(home, /aria-label="Denunciar"/i);
  assert.match(home, /feed-action-svg/i);
  assert.match(home, /save-heart-lock-icon/i);
  assert.match(home, /Evento/i);
  assert.doesNotMatch(home, /Perfil profissional de demonstração/i);
  assert.match(home, /Conteúdo seguro de demonstração/i);
  assert.match(home, /localização sempre aproximada/i);
  assert.match(home, /href="\/profile\//i);
  assert.match(home, /href="\/event\//i);
});

test("server-renders the launch Clubs and Events and Health Safety entry points", async () => {
  const clubsEvents = await (await render("/clubs-events")).text();
  assert.match(clubsEvents, /Clubes e eventos/i);
  assert.match(clubsEvents, /Fluxo de Clubes e Eventos/i);
  assert.match(clubsEvents, /Um único fluxo/i);
  assert.match(clubsEvents, /Clube ou espaço/i);
  assert.match(clubsEvents, />Evento</i);
  for (const name of ["Espaço Aurora", "Noite de Conexões", "Casa Livre", "Encontro no Jardim", "Ponto Violeta", "Fervo Social Club"]) {
    assert.match(clubsEvents, new RegExp(name, "i"));
  }
  assert.match(clubsEvents, /href="\/profile\/espaco-aurora"/i);
  assert.match(clubsEvents, /href="\/event\/noite-conexoes"/i);
  assert.match(clubsEvents, /Conhecer o espaço/i);
  assert.match(clubsEvents, /Ver evento/i);
  assert.match(clubsEvents, /sem ranking, promoção, reserva ou localização exata/i);
  assert.doesNotMatch(clubsEvents, /Fase 3/i);

  const healthSafety = await (await render("/health-safety")).text();
  assert.match(healthSafety, /Saúde, segurança e orientação/i);
  assert.match(healthSafety, /Encontros mais seguros/i);
  assert.match(healthSafety, /Consentimento e limites/i);
  assert.match(healthSafety, /Preocupação com menor de idade/i);
  assert.match(healthSafety, /href="\/help"/i);
  assert.match(healthSafety, /não substitui orientação médica/i);
});

test("server-renders the Private Member profile milestone", async () => {
  const profile = await (await render("/profile/luna-e-caio")).text();

  assert.match(profile, /Membro privado/i);
  assert.match(profile, /Luna &amp; Caio/i);
  assert.match(profile, /Perfil compartilhado · 2 adultos/i);
  assert.match(profile, /Adulta verificada individualmente/i);
  assert.match(profile, /Adulto verificado individualmente/i);
  assert.match(profile, /camada social vinculada/i);
  assert.match(profile, /Foto de perfil/i);
  assert.match(profile, /Localização aproximada/i);
  assert.match(profile, /Adultos vinculados/i);
  assert.match(profile, /Publicações/i);
  assert.match(profile, /nenhum dado real/i);
  assert.match(profile, /Ações do perfil/i);
  assert.match(profile, />Seguir</i);
  assert.match(profile, />Guardar</i);
  assert.match(profile, />Acenar</i);
  assert.match(profile, />Mensagem</i);
  assert.match(profile, />Denunciar</i);
  assert.match(profile, />Bloquear</i);
  assert.match(profile, /role="tab"/i);
  assert.match(profile, />Sobre</i);
  assert.match(profile, />Mídia</i);
  assert.match(profile, />Publicações</i);
  assert.doesNotMatch(profile, /Clube ou negócio/i);
  assert.doesNotMatch(profile, /Organizador de eventos/i);
  assert.doesNotMatch(profile, /Profissional independente/i);

  const me = await (await render("/me")).text();
  assert.match(me, /Seu perfil social/i);
  assert.match(me, /Editar perfil/i);
  assert.match(me, /Conta e configurações/i);
  assert.match(me, /Ver como membro/i);
  assert.doesNotMatch(me, /Identidade privada:/i);

  const settings = await (await render("/me/settings")).text();
  assert.match(settings, /Área privada/i);
  assert.match(settings, /Conta e configurações/i);
  assert.match(settings, /Identidade privada:/i);
  assert.match(settings, /href="\/me\/billing"/i);

  const edit = await (await render("/me/profile/edit")).text();
  assert.match(edit, /Editar perfil/i);
  assert.match(edit, /Prévia de edição/i);
  assert.match(edit, /Nada digitado aqui será enviado ou guardado/i);
  assert.match(edit, /Salvar alterações/i);
  assert.match(edit, /disabled/i);

  const hiddenMember = await createTestAccount({ approved: true });
  const hiddenProfile = sqlite.prepare(`
    SELECT profile.handle, profile.display_name, profile.owner_user_id
    FROM profiles profile
    JOIN auth_identities identity ON identity.user_id = profile.owner_user_id
    WHERE identity.identifier = ?
  `).get(hiddenMember.email);
  sqlite.prepare("UPDATE privacy_settings SET profile_discoverability = 'hidden' WHERE user_id = ?").run(hiddenProfile.owner_user_id);

  const viewer = await approvedAccount;
  const hiddenResponse = await request(`/profile/${hiddenProfile.handle}`, { headers: { cookie: viewer.cookie } });
  const hiddenHtml = await hiddenResponse.text();
  assert.match(hiddenHtml, /Perfil indisponível/i);
  assert.doesNotMatch(hiddenHtml, new RegExp(hiddenProfile.display_name));
});

test("server-renders the configuration-driven Billing shell", async () => {
  const billing = await (await render("/me/billing")).text();

  assert.match(billing, /Planos e faturamento/i);
  assert.match(billing, /Plano atual/i);
  assert.match(billing, /Demonstração · sem cobrança/i);
  assert.match(billing, /Mensal/i);
  assert.match(billing, /Quadrimestral/i);
  assert.match(billing, /Anual/i);
  assert.match(billing, /R\$[^0-9]*19,90/i);
  assert.match(billing, /R\$[^0-9]*71,64/i);
  assert.match(billing, /R\$[^0-9]*191,04/i);
  assert.match(billing, /Founding Club Pro/i);
  assert.match(billing, /Não exige cartão/i);
  assert.match(billing, /Nunca é convertido automaticamente num plano pago/i);
  assert.match(billing, /Recursos profissionais comerciais desativados/i);
  assert.match(billing, /aprovação legal e do provedor de pagamentos/i);
  assert.match(billing, /Gerir forma de pagamento/i);
  assert.match(billing, /Ver faturas/i);
  assert.match(billing, /Cancelar plano/i);
  assert.match(billing, /Pré-visualizar mudanças/i);
  assert.match(billing, /disabled/i);
  assert.doesNotMatch(billing, /<form\b/i);
});

test("server-renders the separate Moderation Administration shell", async () => {
  const queue = await (await render("/admin/moderation")).text();

  assert.match(queue, /Fila de moderação/i);
  assert.match(queue, /Acesso simulado/i);
  assert.match(queue, /Conteúdo sensível permanece protegido/i);
  assert.match(queue, /Preocupação com menor de idade/i);
  assert.match(queue, /Imagem íntima sem consentimento/i);
  assert.match(queue, /Falsidade ideológica/i);
  assert.match(queue, /Incidente de segurança profissional/i);
  assert.match(queue, />Urgente</i);
  assert.match(queue, />Resolvido</i);
  assert.match(queue, /Aguardando recurso/i);
  assert.match(queue, /Filtrar prioridade/i);
  assert.match(queue, /Ordenar/i);
  assert.match(queue, />Atribuir</i);
  assert.match(queue, /Ver estados da fila/i);
  assert.match(queue, />Carregando</i);
  assert.match(queue, />Fila vazia</i);
  assert.match(queue, />Sem acesso</i);
  assert.match(queue, /href="\/admin\/moderation\/urgent-age-review"/i);
  assert.doesNotMatch(queue, /Navegação principal/i);
  assert.doesNotMatch(queue, /<img\b/i);

  const detail = await (await render("/admin/moderation/awaiting-appeal")).text();
  assert.match(detail, /Detalhes do caso/i);
  assert.match(detail, /Conteúdo denunciado/i);
  assert.match(detail, /Somente texto seguro/i);
  assert.match(detail, /Resumo das evidências/i);
  assert.match(detail, /Histórico do caso/i);
  assert.match(detail, /role="tab"/i);
  assert.match(detail, />Caso</i);
  assert.match(detail, />Recurso</i);
  assert.match(detail, />Auditoria</i);
  assert.match(detail, /Registo de auditoria preparado/i);
  assert.match(detail, />Rever recurso</i);
  for (const action of ["Atribuir", "Colocar em quarentena", "Advertir", "Restringir", "Suspender", "Banir", "Descartar", "Escalar"]) {
    assert.match(detail, new RegExp(`>${action}<`, "i"));
  }
  assert.match(detail, /disabled/i);
  assert.doesNotMatch(detail, /Navegação principal/i);
  assert.doesNotMatch(detail, /<img\b/i);

  const resolved = await (await render("/admin/moderation/resolved-impersonation")).text();
  assert.match(resolved, />Resolvido</i);
});

test("server-renders the Galleries shell inside the Private Member media tab", async () => {
  const profile = await (await render("/profile/luna-caio")).text();

  assert.match(profile, /Galerias do perfil/i);
  assert.match(profile, /Mídia compartilhada com controle/i);
  assert.match(profile, />Público</i);
  assert.match(profile, />Amigos</i);
  assert.match(profile, />Privado</i);
  assert.match(profile, /Visível no perfil/i);
  assert.match(profile, /Somente amigos/i);
  assert.match(profile, /Galeria privada bloqueada/i);
  assert.match(profile, /Solicitar acesso privado/i);
  assert.match(profile, /Conceder acesso/i);
  assert.match(profile, /Revogar acesso/i);
  assert.match(profile, /Definir validade/i);
  assert.match(profile, /Ver estados da galeria/i);
  assert.match(profile, />Carregando</i);
  assert.match(profile, />Galeria vazia</i);
  assert.match(profile, /sem uploads, armazenamento ou permissões reais/i);
  assert.doesNotMatch(profile, /<img\b/i);
});

test("server-renders the Explore shell and category routes", async () => {
  const explore = await (await render("/explore")).text();

  assert.match(explore, /Descubra a comunidade/i);
  assert.match(explore, /Pesquisar no Explorar/i);
  assert.match(explore, /Pesquisa de demonstração/i);
  assert.match(explore, /Localização/i);
  assert.match(explore, /Distância aproximada/i);
  assert.match(explore, /Tipo de resultado/i);
  assert.match(explore, /Faixa etária/i);
  assert.match(explore, /Apenas verificados/i);
  assert.match(explore, /Atividade recente/i);
  assert.match(explore, /Ordenar por/i);
  assert.match(explore, /Ver estados da página/i);
  assert.match(explore, /Carregando/i);
  assert.match(explore, /Categoria vazia/i);
  assert.match(explore, /Sem resultados/i);
  assert.doesNotMatch(explore, /href="\/explore\/professionals"/i);

  const categoryRoutes = [
    ["/explore/profiles", /Perfis para descobrir/i],
    ["/explore/clubs", /Clubes e espaços/i],
    ["/explore/events", /Eventos da comunidade/i],
    ["/explore/professionals", /Profissionais para conhecer/i],
  ];

  for (const [pathname, expectedTitle] of categoryRoutes) {
    const html = await (await render(pathname)).text();
    assert.match(html, expectedTitle);
    assert.match(html, /localização exata/i);
    assert.match(html, /resultados seguros de demonstração/i);
  }

  const clubs = await (await render("/explore/clubs")).text();
  assert.match(clubs, /href="\/profile\/espaco-aurora"/i);

  const events = await (await render("/explore/events")).text();
  assert.match(events, /href="\/event\/noite-conexoes"/i);

  const professionals = await (await render("/explore/professionals")).text();
  assert.match(professionals, /href="\/profile\/luiza-educadora"/i);
});

test("server-renders shared Club, Organiser, and Event detail shells", async () => {
  const club = await (await render("/profile/espaco-aurora")).text();
  assert.match(club, /Clube ou negócio/i);
  assert.match(club, /Espaço Aurora/i);
  assert.match(club, /Estrutura e facilidades/i);
  assert.match(club, /Acessibilidade/i);
  assert.match(club, /Regras e políticas/i);
  assert.match(club, /Próximo evento/i);
  assert.match(club, /href="\/event\/noite-conexoes"/i);
  assert.match(club, />Seguir</i);
  assert.match(club, />Guardar</i);
  assert.match(club, />Contato</i);
  assert.match(club, />Avaliações</i);
  assert.match(club, />Denunciar</i);
  assert.match(club, /demonstração/i);

  const organiser = await (await render("/profile/coletivo-lume")).text();
  assert.match(organiser, /Organizador de eventos/i);
  assert.match(organiser, /Coletivo Lume/i);
  assert.match(organiser, /Categorias/i);
  assert.match(organiser, /Política de fotografia restrita/i);

  const event = await (await render("/event/noite-conexoes")).text();
  assert.match(event, /Noite de Conexões/i);
  assert.match(event, /Evento fictício/i);
  assert.match(event, /Data e horário/i);
  assert.match(event, /Local aproximado/i);
  assert.match(event, /Espaço Aurora/i);
  assert.match(event, /Coletivo Lume/i);
  assert.match(event, /href="\/profile\/espaco-aurora"/i);
  assert.match(event, /href="\/profile\/coletivo-lume"/i);
  assert.match(event, /href="\/clubs-events"/i);
  assert.match(event, /Tenho interesse/i);
  assert.match(event, /Entrar na lista de espera/i);
  assert.match(event, /Ver ingressos/i);
  assert.match(event, /Compartilhar/i);
  assert.match(event, /Avaliações/i);
  assert.match(event, /Conversa do evento/i);
  assert.match(event, /sem RSVP, ingressos, pagamentos/i);
});

test("server-renders the Professional profile shell", async () => {
  const professional = await (await render("/profile/luiza-educadora")).text();

  assert.match(professional, />Profissional</i);
  assert.match(professional, /Luiza/i);
  assert.match(professional, /Educadora de bem-estar e comunicação/i);
  assert.match(professional, /Área de atendimento aproximada/i);
  assert.match(professional, /Disponibilidade a confirmar/i);
  assert.match(professional, /Identidade adulta verificada · demonstração/i);
  assert.match(professional, /Perfil profissional verificado · demonstração/i);
  assert.match(professional, /Idiomas/i);
  assert.match(professional, /Acessibilidade/i);
  assert.match(professional, /Segurança e limites/i);
  assert.match(professional, />Seguir</i);
  assert.match(professional, />Guardar</i);
  assert.match(professional, />Contato</i);
  assert.match(professional, /Ver portfólio/i);
  assert.match(professional, /Solicitar acesso privado/i);
  assert.match(professional, />Compartilhar</i);
  assert.match(professional, />Avaliações</i);
  assert.match(professional, />Denunciar</i);
  assert.match(professional, />Bloquear</i);
  assert.match(professional, /Portfólio público/i);
  assert.match(professional, /Galeria privada/i);
  assert.match(professional, /Recursos comerciais desativados/i);
  assert.match(professional, /aprovação legal e do provedor de pagamentos/i);
  assert.match(professional, /sem verificação, valores ou serviços reais/i);
  assert.doesNotMatch(professional, /R\$\s*\d/i);
  assert.doesNotMatch(professional, /<img\b/i);
});

test("server-renders embedded Reviews shells without a separate route", async () => {
  const club = await (await render("/profile/espaco-aurora")).text();
  assert.match(club, /Avaliações do espaço/i);
  assert.match(club, /Somente após uma visita verificada/i);
  assert.match(club, /Limpeza/i);
  assert.match(club, /Conduta da equipe/i);
  assert.match(club, /Texto moderado · demonstração/i);
  assert.match(club, /Resposta do Espaço Aurora/i);

  const organiser = await (await render("/profile/coletivo-lume")).text();
  assert.match(organiser, /Avaliações da organização/i);
  assert.match(organiser, /participação verificada num evento/i);

  const event = await (await render("/event/noite-conexoes")).text();
  assert.match(event, /Avaliações do evento/i);
  assert.match(event, /RSVP e presença verificados/i);

  const professional = await (await render("/profile/luiza-educadora")).text();
  assert.match(professional, /Avaliações profissionais/i);
  assert.match(professional, /interação profissional verificada/i);
  assert.match(professional, /Precisão do perfil/i);
  assert.match(professional, /Respeito aos limites/i);
  assert.match(professional, /Resposta de Luiza/i);

  for (const html of [club, organiser, event, professional]) {
    assert.match(html, /Escrever avaliação/i);
    assert.match(html, /Verificar elegibilidade/i);
    assert.match(html, />Filtrar</i);
    assert.match(html, />Ordenar</i);
    assert.match(html, /Foi útil/i);
    assert.match(html, />Responder</i);
    assert.match(html, />Denunciar</i);
    assert.match(html, /Ver estados das avaliações/i);
    assert.match(html, />Carregando</i);
    assert.match(html, />Sem avaliações</i);
    assert.match(html, />Não elegível</i);
    assert.match(html, /Feedback profissional privado não está incluído/i);
    assert.match(html, /sem elegibilidade, envio, pontuação/i);
  }
});

test("server-renders the Messages inbox and placeholder conversation shell", async () => {
  const inbox = await (await render("/messages")).text();

  assert.match(inbox, /Mensagens privadas/i);
  assert.match(inbox, /Pesquisar conversas/i);
  assert.match(inbox, /role="tab"/i);
  assert.match(inbox, />Conversas</i);
  assert.match(inbox, />Solicitações</i);
  assert.match(inbox, /href="\/messages\/luna-caio"/i);
  assert.match(inbox, /Selecione uma conversa/i);
  assert.match(inbox, /Ver estados da lista/i);
  assert.match(inbox, /Carregando/i);
  assert.match(inbox, /Lista vazia/i);
  assert.match(inbox, />Aceitar</i);
  assert.match(inbox, />Recusar</i);
  assert.match(inbox, />Bloquear</i);
  assert.match(inbox, /abordagem respeitosa|apresentar com respeito/i);

  const thread = await (await render("/messages/luna-caio")).text();

  assert.match(thread, /Voltar para mensagens/i);
  assert.match(thread, /Membros privados/i);
  assert.match(thread, /Região aproximada/i);
  assert.match(thread, /role="log"/i);
  assert.match(thread, /conversar com calma por aqui/i);
  assert.match(thread, /Escrever mensagem/i);
  assert.match(thread, />Enviar</i);
  assert.match(thread, />Silenciar</i);
  assert.match(thread, />Arquivar</i);
  assert.match(thread, />Denunciar</i);
  assert.match(thread, /Permissão de mídia/i);
  assert.match(thread, /Mídia permanece bloqueada/i);
  assert.match(thread, /disabled/i);
});
