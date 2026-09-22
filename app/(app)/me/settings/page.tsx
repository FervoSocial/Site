import { ActionLink } from "@/components/ui/ActionLink";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Surface } from "@/components/ui/Surface";
import { requireVerifiedSession } from "@/lib/auth/guards";

const accountLabels = {
  private: "Conta privada",
  club_business: "Clube ou negócio",
  event_organizer: "Organizador de eventos",
  professional: "Profissional",
} as const;

export default async function AccountSettingsPage() {
  const principal = await requireVerifiedSession();

  return (
    <section className="account-settings-shell" aria-labelledby="account-settings-title">
      <header className="account-settings-heading">
        <p className="section-kicker">Área privada</p>
        <h1 id="account-settings-title">Conta e configurações</h1>
        <p>Gerencie dados privados e controles da conta sem misturá-los ao seu perfil social.</p>
        <ActionLink href="/me">Voltar ao meu perfil</ActionLink>
      </header>

      <div className="account-settings-grid">
        <Surface className="placeholder-card account-entry-card account-settings-primary">
          <span className="status-chip"><span aria-hidden="true" />Conta verificada</span>
          <h2>{principal.displayName}</h2>
          <p><strong>Identidade pública:</strong> @{principal.handle} · {accountLabels[principal.accountType]}</p>
          <p><strong>Identidade privada:</strong> {principal.email}. Este e-mail não aparece no perfil público.</p>
          <p><strong>Localização:</strong> {principal.approximateLocationLabel ?? "Oculta por padrão"}. A Fervo não guarda endereço residencial nem coordenadas exatas.</p>
        </Surface>

        <Surface className="placeholder-card account-entry-card">
          <span className="status-chip"><span aria-hidden="true" />Verificação</span>
          <h2>Identidade e acesso</h2>
          <p>Seu acesso adulto está aprovado. A identidade legal e os dados do provedor permanecem separados do perfil público.</p>
          <button type="button" className="auth-secondary-button" disabled>Gerenciar verificação</button>
        </Surface>

        <Surface className="placeholder-card account-entry-card">
          <span className="status-chip"><span aria-hidden="true" />Privacidade</span>
          <h2>Privacidade e segurança</h2>
          <p>Os controles persistentes de descoberta, mensagens e visibilidade serão tratados na fase específica de alinhamento de privacidade e dados.</p>
          <button type="button" className="auth-secondary-button" disabled>Revisar controles</button>
        </Surface>

        <Surface className="placeholder-card account-entry-card">
          <span className="status-chip"><span aria-hidden="true" />Faturamento</span>
          <h2>Planos e faturamento</h2>
          <p>Consulte a demonstração de planos e estado da assinatura. Nenhuma cobrança real é feita.</p>
          <ActionLink href="/me/billing">Abrir faturamento</ActionLink>
        </Surface>
      </div>

      <Surface className="account-settings-session">
        <div><h2>Sessão e acesso</h2><p>Saia com segurança deste dispositivo.</p></div>
        <LogoutButton className="auth-secondary-button" label="Sair da conta" />
      </Surface>
    </section>
  );
}
