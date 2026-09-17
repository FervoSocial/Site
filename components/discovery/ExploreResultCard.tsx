import Link from "next/link";
import type { ExploreResult } from "@/lib/explore-placeholder";
import { ptBR } from "@/lib/i18n";

type ExploreResultCardProps = {
  result: ExploreResult;
  showTypeBadge?: boolean;
};

export function ExploreResultCard({ result, showTypeBadge = false }: ExploreResultCardProps) {
  const typeLabel = result.category === "clubs"
    ? ptBR.clubsEventsEntry.clubType
    : result.category === "events"
      ? ptBR.clubsEventsEntry.eventType
      : null;

  return (
    <article className={`explore-result-card explore-result-${result.category}`}>
      <div className="explore-result-visual" aria-hidden="true">
        <span>{result.initials}</span>
      </div>

      <div className="explore-result-copy">
        {showTypeBadge && typeLabel ? (
          <span className={`clubs-events-type clubs-events-type-${result.category}`}>
            {typeLabel}
          </span>
        ) : null}
        <div className="explore-result-heading">
          <div>
            <p>{result.accountLabel}</p>
            <h2>{result.name}</h2>
          </div>
          {result.verified ? (
            <span className="explore-verified">{ptBR.explore.results.verified}</span>
          ) : null}
        </div>
        <p className="explore-result-location">{result.location}</p>
        <p className="explore-result-summary">{result.summary}</p>
        <div className="explore-result-footer">
          <span>{result.meta}</span>
          {result.href ? (
            <Link href={result.href}>{ptBR.explore.results.open}</Link>
          ) : (
            <button type="button" disabled title={ptBR.explore.results.actionUnavailable}>
              {ptBR.explore.results.open}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
