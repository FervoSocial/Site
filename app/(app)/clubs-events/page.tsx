import { ExploreResultCard } from "@/components/discovery/ExploreResultCard";
import { exploreResults, type ExploreResult } from "@/lib/explore-placeholder";
import { ptBR } from "@/lib/i18n";

const copy = ptBR.clubsEventsEntry;
const mixedResults = exploreResults.clubs.flatMap<ExploreResult>((club, index) => {
  const event = exploreResults.events[index];
  return event ? [club, event] : [club];
});

export default function ClubsEventsPage() {
  return (
    <section className="launch-entry-shell" aria-labelledby="clubs-events-title">
      <header className="launch-entry-heading">
        <p className="section-kicker">{copy.eyebrow}</p>
        <h1 id="clubs-events-title">{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      <div className="clubs-events-feed-heading">
        <p className="section-kicker">{copy.feedEyebrow}</p>
        <h2>{copy.feedTitle}</h2>
        <p>{copy.feedDescription}</p>
      </div>

      <div className="clubs-events-mixed-feed" aria-label={copy.feedLabel}>
        {mixedResults.map((result) => (
          <ExploreResultCard key={`${result.category}-${result.id}`} result={result} showTypeBadge />
        ))}
      </div>

      <p className="launch-entry-notice">{copy.phaseNotice}</p>
    </section>
  );
}
