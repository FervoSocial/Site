import Link from "next/link";
import type { ExploreResult } from "@/lib/explore-placeholder";
import { ptBR } from "@/lib/i18n";

type ClubsEventsDiscoveryCardProps = {
  result: ExploreResult;
};

function ClubIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 25V11l10-5 10 5v14" />
      <path d="M10 25v-8h12v8M4 25h24" />
      <path d="M12 13h.01M16 13h.01M20 13h.01" />
    </svg>
  );
}

function EventIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5" y="7" width="22" height="20" rx="4" />
      <path d="M10 4v6M22 4v6M5 13h22" />
      <path d="m12 20 2.5 2.5L21 17" />
    </svg>
  );
}

export function ClubsEventsDiscoveryCard({ result }: ClubsEventsDiscoveryCardProps) {
  const isEvent = result.category === "events";
  const typeLabel = isEvent ? ptBR.clubsEventsEntry.eventType : ptBR.clubsEventsEntry.clubType;
  const actionLabel = isEvent ? ptBR.clubsEventsEntry.openEvent : ptBR.clubsEventsEntry.openClub;

  return (
    <article className={`clubs-events-discovery-card clubs-events-discovery-${isEvent ? "event" : "club"}`}>
      <div className="clubs-events-discovery-visual" aria-hidden="true">
        <span className="clubs-events-discovery-symbol">
          {isEvent ? <EventIcon /> : <ClubIcon />}
        </span>
        <strong>{result.initials}</strong>
        <small>{typeLabel}</small>
      </div>

      <div className="clubs-events-discovery-copy">
        <header className="clubs-events-discovery-header">
          <span className={`clubs-events-type clubs-events-type-${result.category}`}>
            {typeLabel}
          </span>
          {result.verified ? (
            <span className="clubs-events-discovery-verified">
              <span aria-hidden="true">✓</span>
              {ptBR.explore.results.verified}
            </span>
          ) : null}
        </header>

        <div className="clubs-events-discovery-body">
          <p>{result.accountLabel}</p>
          <h2>{result.name}</h2>
          <span className="clubs-events-discovery-location">
            <span aria-hidden="true">⌖</span>
            {result.location}
          </span>
          <p className="clubs-events-discovery-summary">{result.summary}</p>
        </div>

        <footer className="clubs-events-discovery-footer">
          <span>{result.meta}</span>
          {result.href ? (
            <Link href={result.href} aria-label={`${actionLabel}: ${result.name}`}>
              {actionLabel}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
