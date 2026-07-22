import Link from "next/link";
import { ptBR } from "@/lib/i18n";
import { ActionLink } from "./ActionLink";
import { Surface } from "./Surface";

type PublicPlaceholderProps = {
  title: string;
  description: string;
  showAppEntry?: boolean;
};

export function PublicPlaceholder({
  title,
  description,
  showAppEntry = false,
}: PublicPlaceholderProps) {
  return (
    <main className="public-placeholder">
      <header className="public-header">
        <Link className="app-brand" href="/" aria-label="Fervo Social — início">
          Fervo<span>Social</span>
        </Link>
      </header>

      <Surface className="public-entry-card">
        <p className="section-kicker">{ptBR.common.foundation}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="public-entry-actions">
          {showAppEntry ? (
            <ActionLink href="/home">{ptBR.common.enterApp}</ActionLink>
          ) : null}
          <ActionLink href="/" variant="secondary">
            {ptBR.common.backToLanding}
          </ActionLink>
        </div>
      </Surface>
    </main>
  );
}
