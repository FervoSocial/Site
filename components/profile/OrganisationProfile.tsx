"use client";

import Link from "next/link";
import { useState } from "react";
import { ReviewsShell } from "@/components/reviews/ReviewsShell";
import { Surface } from "@/components/ui/Surface";
import type { OrganisationProfileData } from "@/lib/club-event-placeholder";
import { ptBR } from "@/lib/i18n";

type OrganisationProfileProps = {
  profile: OrganisationProfileData;
};

type OrganisationTab = "overview" | "details" | "events" | "reviews";

const copy = ptBR.clubEvents.profile;

export function OrganisationProfile({ profile }: OrganisationProfileProps) {
  const [activeTab, setActiveTab] = useState<OrganisationTab>("overview");
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <section className="private-profile organisation-profile" aria-labelledby="organisation-profile-name">
      <p className="section-kicker">{copy.eyebrow}</p>

      <Surface className={`private-profile-card organisation-profile-card organisation-profile-${profile.kind}`}>
        <div className="private-profile-photo organisation-profile-mark" role="img" aria-label={`${copy.logoLabel} ${profile.name}`}>
          <span aria-hidden="true">{profile.initials}</span>
          <small>{copy.logoPlaceholder}</small>
        </div>

        <div className="private-profile-copy">
          <span className="private-profile-type">{profile.accountLabel}</span>
          <h1 id="organisation-profile-name">{profile.name}</h1>
          <p className="private-profile-location"><span aria-hidden="true">⌖</span>{profile.location}</p>
          <p className="organisation-verification"><span aria-hidden="true">◇</span>{profile.verificationLabel}</p>
          <p className="private-profile-bio">{profile.description}</p>
        </div>

        <div className="private-profile-actions" aria-label={copy.actionsLabel}>
          <button
            type="button"
            className="private-profile-action private-profile-action-primary"
            aria-pressed={followed}
            onClick={() => setFollowed((current) => !current)}
          >
            <span aria-hidden="true">＋</span>
            {followed ? copy.following : copy.follow}
          </button>
          <button
            type="button"
            className="private-profile-action"
            aria-pressed={saved}
            onClick={() => setSaved((current) => !current)}
          >
            <span aria-hidden="true">◇</span>
            {saved ? copy.saved : copy.save}
          </button>
          {([
            ["✉", copy.contact],
            ["↗", copy.share],
            ["!", copy.report],
          ] as const).map(([icon, label]) => (
            <button type="button" className="private-profile-action" disabled title={copy.unavailable} key={label}>
              <span aria-hidden="true">{icon}</span>{label}
            </button>
          ))}
          <button type="button" className="private-profile-action" onClick={() => setActiveTab("reviews")}>
            <span aria-hidden="true">★</span>{copy.reviews}
          </button>
        </div>

        <div className="private-profile-tabs organisation-profile-tabs">
          <div className="private-profile-tab-list" role="tablist" aria-label={copy.tabsLabel}>
            {([
              ["overview", copy.tabs.overview],
              ["details", copy.tabs.details],
              ["events", copy.tabs.events],
              ["reviews", copy.tabs.reviews],
            ] as const).map(([id, label]) => (
              <button
                type="button"
                role="tab"
                id={`organisation-tab-${id}`}
                aria-controls={`organisation-panel-${id}`}
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                key={id}
              >
                {label}
              </button>
            ))}
          </div>

          <div id="organisation-panel-overview" role="tabpanel" aria-labelledby="organisation-tab-overview" hidden={activeTab !== "overview"}>
            <div className="organisation-detail-grid">
              {profile.details.map((detail) => (
                <div key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>
              ))}
            </div>
            <div className="organisation-module-grid">
              <section><h2>{copy.facilities}</h2><ul>{profile.facilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h2>{copy.accessibility}</h2><p>{copy.accessibilityDescription}</p></section>
            </div>
          </div>

          <div id="organisation-panel-details" role="tabpanel" aria-labelledby="organisation-tab-details" hidden={activeTab !== "details"}>
            <div className="organisation-module-grid">
              <section><h2>{copy.rules}</h2><ul>{profile.rules.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h2>{copy.policies}</h2><ul>{profile.policies.map((item) => <li key={item}>{item}</li>)}</ul></section>
            </div>
          </div>

          <div id="organisation-panel-events" role="tabpanel" aria-labelledby="organisation-tab-events" hidden={activeTab !== "events"}>
            <article className="organisation-event-card">
              <span>{copy.upcomingEvent}</span>
              <h2>{profile.upcomingEvent.name}</h2>
              <p>{profile.upcomingEvent.schedule} · {profile.upcomingEvent.location}</p>
              <Link href={`/event/${profile.upcomingEvent.id}`}>{copy.openEvent}</Link>
            </article>
          </div>

          <div id="organisation-panel-reviews" role="tabpanel" aria-labelledby="organisation-tab-reviews" hidden={activeTab !== "reviews"}>
            <ReviewsShell context={profile.kind} />
          </div>
        </div>
      </Surface>

      <p className="private-profile-demo">{copy.demoNotice}</p>
    </section>
  );
}
