"use client";

import Link from "next/link";
import { useState } from "react";
import { ReviewsShell } from "@/components/reviews/ReviewsShell";
import { Surface } from "@/components/ui/Surface";
import { exampleEvent } from "@/lib/club-event-placeholder";
import { ptBR } from "@/lib/i18n";

const copy = ptBR.clubEvents.event;

export function EventDetailShell() {
  const [interested, setInterested] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <section className="event-detail-shell" aria-labelledby="event-detail-title">
      <Link className="event-detail-back" href="/explore/events"><span aria-hidden="true">←</span>{copy.back}</Link>

      <Surface className="event-detail-card">
        <div className="event-detail-cover" role="img" aria-label={copy.coverLabel}>
          <span>{exampleEvent.accountLabel}</span>
          <small>{copy.coverPlaceholder}</small>
        </div>

        <header className="event-detail-header">
          <div>
            <p className="section-kicker">{copy.eyebrow}</p>
            <h1 id="event-detail-title">{exampleEvent.name}</h1>
            <p className="event-detail-intro">{exampleEvent.description}</p>
          </div>
          <span className="event-demo-badge">{copy.demoBadge}</span>
        </header>

        <div className="event-detail-primary-info">
          <div><span>{copy.date}</span><strong>{exampleEvent.date}</strong></div>
          <div><span>{copy.location}</span><strong>{exampleEvent.location}</strong></div>
        </div>

        <div className="event-detail-actions" aria-label={copy.actionsLabel}>
          <button type="button" className="event-primary-action" aria-pressed={interested} onClick={() => setInterested((current) => !current)}>
            {interested ? copy.interested : copy.rsvp}
          </button>
          <button type="button" aria-pressed={saved} onClick={() => setSaved((current) => !current)}>
            {saved ? copy.saved : copy.save}
          </button>
          {[copy.waitlist, copy.tickets, copy.share, copy.report].map((label) => (
            <button type="button" disabled title={copy.unavailable} key={label}>{label}</button>
          ))}
        </div>

        <div className="event-host-grid">
          <article>
            <span>{copy.venue}</span>
            <h2>{exampleEvent.venue}</h2>
            <p>{copy.protectedLocation}</p>
            <Link href={`/profile/${exampleEvent.venueHandle}`}>{copy.openVenue}</Link>
          </article>
          <article>
            <span>{copy.organiser}</span>
            <h2>{exampleEvent.organiser}</h2>
            <p>{copy.organiserDescription}</p>
            <Link href={`/profile/${exampleEvent.organiserHandle}`}>{copy.openOrganiser}</Link>
          </article>
        </div>

        <div className="event-detail-facts">
          {exampleEvent.details.map((detail) => (
            <div key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>
          ))}
        </div>

        <div className="event-policy-grid">
          <section><h2>{copy.rules}</h2><ul>{exampleEvent.rules.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h2>{copy.policies}</h2><ul>{exampleEvent.policies.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <ReviewsShell context="event" />

        <div className="event-community-controls" aria-label={copy.communityLabel}>
          <div><h2>{copy.discussion}</h2><p>{copy.discussionDescription}</p><button type="button" disabled>{copy.openDiscussion}</button></div>
        </div>

        <p className="event-placeholder-notice">{copy.placeholderNotice}</p>
      </Surface>
    </section>
  );
}
