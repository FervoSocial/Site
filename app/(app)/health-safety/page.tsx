import { ActionLink } from "@/components/ui/ActionLink";
import { Surface } from "@/components/ui/Surface";
import { ptBR } from "@/lib/i18n";

const copy = ptBR.healthSafety;

const guidance = [
  { icon: "⌖", title: copy.meetingTitle, description: copy.meetingDescription },
  { icon: "◇", title: copy.consentTitle, description: copy.consentDescription },
  { icon: "+", title: copy.wellbeingTitle, description: copy.wellbeingDescription },
  { icon: "!", title: copy.reportingTitle, description: copy.reportingDescription },
];

export default function HealthSafetyPage() {
  return (
    <section className="launch-entry-shell safety-advice-shell" aria-labelledby="health-safety-title">
      <header className="launch-entry-heading">
        <p className="section-kicker">{copy.eyebrow}</p>
        <h1 id="health-safety-title">{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      <div className="safety-advice-grid">
        {guidance.map((item) => (
          <Surface className="safety-advice-card" key={item.title}>
            <span className="safety-advice-icon" aria-hidden="true">{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Surface>
        ))}
      </div>

      <Surface className="safety-help-card">
        <div>
          <h2>{copy.helpTitle}</h2>
          <p>{copy.helpDescription}</p>
        </div>
        <ActionLink href="/help" variant="secondary">{copy.helpAction}</ActionLink>
      </Surface>

      <p className="launch-entry-notice">{copy.editorialNotice}</p>
    </section>
  );
}
