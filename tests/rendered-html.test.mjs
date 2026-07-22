import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
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
    "/messages",
    "/messages/example",
    "/profile/example",
    "/event/example",
    "/me",
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
  assert.match(verification, /Integração ainda não ativa/i);
  assert.match(verification, /Iniciar demonstração/i);
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
  assert.match(me, /Estrutura preparada/i);
});
