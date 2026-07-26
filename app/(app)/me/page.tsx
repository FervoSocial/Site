import { ActionLink } from "@/components/ui/ActionLink";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Surface } from "@/components/ui/Surface";
import { requireVerifiedSession } from "@/lib/auth/guards";
import { ptBR } from "@/lib/i18n";

const accountLabels = {
  private: "Conta privada",
  club_business: "Clube ou negócio",
  event_organizer: "Organizador de eventos",
  professional: "Profissional",
} as const;

export default async function MePage() {
  const principal = await requireVerifiedSession();
  return (
    <section className="placeholder-page" aria-labelledby="account-title">
      <p className="section-kicker">{ptBR.common.foundation}</p>
      <h1 id="account-title">{ptBR.routes.me.title}</h1>
      <p className="placeholder-intro">{ptBR.routes.me.description}</p>

      <Surface className="placeholder-card account-entry-card">
        <span className="status-chip"><span aria-hidden="true" />Conta verificada</span>
        <h2>{principal.displayName}</h2>
        <p><strong>Identidade pública:</strong> @{principal.handle} · {accountLabels[principal.accountType]}</p>
        <p><strong>Identidade privada:</strong> {principal.email}. Este e-mail não aparece no perfil público.</p>
        <p><strong>Localização:</strong> {principal.approximateLocationLabel ?? "Oculta por padrão"}. A Fervo não guarda endereço residencial nem coordenadas exatas.</p>
        <LogoutButton className="auth-secondary-button" label="Sair da conta" />
      </Surface>

      <Surface className="placeholder-card account-entry-card">
        <span className="status-chip"><span aria-hidden="true" />{ptBR.account.billingReady}</span>
        <h2>{ptBR.account.billingTitle}</h2>
        <p>{ptBR.account.billingDescription}</p>
        <ActionLink href="/me/billing">{ptBR.account.openBilling}</ActionLink>
      </Surface>
    </section>
  );
}
