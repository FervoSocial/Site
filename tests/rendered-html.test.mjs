import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

const sqlite = new DatabaseSync(":memory:");
const migration = readFileSync(new URL("../drizzle/0000_skinny_hellcat.sql", import.meta.url), "utf8");
for (const statement of migration.split("--> statement-breakpoint").map((value) => value.trim()).filter(Boolean)) {
  sqlite.exec(statement);
}
sqlite.exec("PRAGMA foreign_keys = ON");

const testEnv = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  DB: new TestD1Database(sqlite),
  VERIFICATION_PROVIDER_MODE: "sandbox",
};
const testContext = { waitUntil() {}, passThroughOnException() {} };
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function request(pathname, init = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("accept")) headers.set("accept", "text/html");
  return worker.fetch(new Request(`http://localhost${pathname}`, { ...init, headers }), testEnv, testContext);
}

let accountSequence = 0;
async function createTestAccount({ approved = false, role = "member" } = {}) {
  accountSequence += 1;
  const email = `member-${accountSequence}@example.test`;
  const response = await request("/api/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      accountType: "private",
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
  return ["/home", "/explore", "/messages", "/profile", "/event", "/me"].some(
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

test("server-renders the shared application shell and five navigation items", async () => {
  const response = await render("/home");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Navegação principal/);
  assert.match(html, />Home</);
  assert.match(html, />Explorar</);
  assert.match(html, />Criar</);
  assert.match(html, />Mensagens</);
  assert.match(html, />Perfil</);
  assert.match(html, /Descubra no seu ritmo/);
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

test("server-renders the three-tab Home and Feed shell", async () => {
  const home = await (await render("/home")).text();
  const tabs = home.match(/role="tab"/g) ?? [];

  assert.equal(tabs.length, 3);
  assert.match(home, />Para você</i);
  assert.match(home, />Perto de você</i);
  assert.match(home, />Seguindo</i);
  assert.match(home, /Evento/i);
  assert.match(home, /Profissional/i);
  assert.match(home, /Conteúdo seguro de demonstração/i);
  assert.match(home, /localização sempre aproximada/i);
  assert.match(home, /href="\/profile\//i);
  assert.match(home, /href="\/event\//i);
});

test("server-renders the Private Member profile milestone", async () => {
  const profile = await (await render("/profile/luna-caio")).text();

  assert.match(profile, /Membro privado/i);
  assert.match(profile, /Luna &amp; Caio/i);
  assert.match(profile, /Foto de perfil/i);
  assert.match(profile, /Localização aproximada/i);
  assert.match(profile, /Seguidores/i);
  assert.match(profile, /Seguindo/i);
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
  assert.match(me, /O meu perfil/i);
  assert.match(me, /Planos e faturamento/i);
  assert.match(me, /href="\/me\/billing"/i);
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
