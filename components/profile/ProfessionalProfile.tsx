"use client";

import { useState } from "react";
import { ReviewsShell } from "@/components/reviews/ReviewsShell";
import { Surface } from "@/components/ui/Surface";
import { professionalProfile as profile } from "@/lib/professional-placeholder";
import { ptBR } from "@/lib/i18n";

type ProfessionalTab = "overview" | "portfolio" | "reviews";

const copy = ptBR.professionalProfile;

export function ProfessionalProfile() {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>("overview");
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [privateRequested, setPrivateRequested] = useState(false);

  return (
    <section className="private-profile professional-profile" aria-labelledby="professional-profile-name">
      <p className="section-kicker">{copy.eyebrow}</p>

      <Surface className="private-profile-card professional-profile-card">
        <div className="private-profile-photo professional-profile-photo" role="img" aria-label={copy.photoLabel}>
          <span aria-hidden="true">{profile.initials}</span>
          <small>{copy.photoPlaceholder}</small>
        </div>

        <div className="private-profile-copy">
          <div className="professional-profile-labels">
            <span className="private-profile-type">{profile.accountLabel}</span>
            <span className="professional-category">{profile.category}</span>
          </div>
          <h1 id="professional-profile-name">{profile.displayName}</h1>
          <p className="private-profile-location"><span aria-hidden="true">⌖</span>{profile.serviceArea}</p>
          <div className="professional-verification-list" aria-label={copy.verificationLabel}>
            {profile.verificationLabels.map((label) => (
              <span key={label}><span aria-hidden="true">◇</span>{label}</span>
            ))}
          </div>
          <p className="private-profile-bio">{profile.summary}</p>
          <p className="professional-availability"><span aria-hidden="true">◌</span>{profile.availability}</p>
        </div>

        <div className="private-profile-actions professional-profile-actions" aria-label={copy.actionsLabel}>
          <button type="button" className="private-profile-action private-profile-action-primary" aria-pressed={followed} onClick={() => setFollowed((current) => !current)}>
            <span aria-hidden="true">＋</span>{followed ? copy.following : copy.follow}
          </button>
          <button type="button" className="private-profile-action" aria-pressed={saved} onClick={() => setSaved((current) => !current)}>
            <span aria-hidden="true">◇</span>{saved ? copy.saved : copy.save}
          </button>
          <button type="button" className="private-profile-action" disabled title={copy.unavailable}>
            <span aria-hidden="true">✉</span>{copy.contact}
          </button>
          <button type="button" className="private-profile-action" onClick={() => setActiveTab("portfolio")}>
            <span aria-hidden="true">▦</span>{copy.viewPortfolio}
          </button>
          <button
            type="button"
            className="private-profile-action"
            aria-pressed={privateRequested}
            onClick={() => setPrivateRequested(true)}
          >
            <span aria-hidden="true">⌁</span>{privateRequested ? copy.privateRequested : copy.requestPrivate}
          </button>
          {([
            ["↗", copy.share],
            ["!", copy.report],
            ["×", copy.block],
          ] as const).map(([icon, label]) => (
            <button type="button" className="private-profile-action" disabled title={copy.unavailable} key={label}>
              <span aria-hidden="true">{icon}</span>{label}
            </button>
          ))}
          <button type="button" className="private-profile-action" onClick={() => setActiveTab("reviews")}>
            <span aria-hidden="true">★</span>{copy.reviews}
          </button>
        </div>

        <div className="private-profile-tabs professional-profile-tabs">
          <div className="private-profile-tab-list" role="tablist" aria-label={copy.tabsLabel}>
            {([
              ["overview", copy.tabs.overview],
              ["portfolio", copy.tabs.portfolio],
              ["reviews", copy.tabs.reviews],
            ] as const).map(([id, label]) => (
              <button
                type="button"
                role="tab"
                id={`professional-tab-${id}`}
                aria-controls={`professional-panel-${id}`}
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                key={id}
              >
                {label}
              </button>
            ))}
          </div>

          <div id="professional-panel-overview" role="tabpanel" aria-labelledby="professional-tab-overview" hidden={activeTab !== "overview"}>
            <div className="professional-detail-grid">
              {profile.details.map((detail) => (
                <div key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>
              ))}
            </div>
            <div className="professional-module-grid">
              <section><h2>{copy.services}</h2><ul>{profile.services.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h2>{copy.accessibility}</h2><p>{profile.accessibility}</p></section>
              <section className="professional-boundaries"><h2>{copy.boundaries}</h2><ul>{profile.boundaries.map((item) => <li key={item}>{item}</li>)}</ul></section>
            </div>
          </div>

          <div id="professional-panel-portfolio" role="tabpanel" aria-labelledby="professional-tab-portfolio" hidden={activeTab !== "portfolio"}>
            <div className="professional-panel-heading">
              <div><h2>{copy.publicPortfolio}</h2><p>{copy.publicPortfolioDescription}</p></div>
              <span>{copy.abstractMedia}</span>
            </div>
            <div className="professional-portfolio-grid" aria-label={copy.portfolioItemsLabel}>
              {profile.portfolio.map((item) => (
                <button type="button" disabled title={copy.unavailable} key={item.id}>
                  <span className={`professional-portfolio-art professional-portfolio-${item.tone}`} aria-hidden="true" />
                  <strong>{item.title}</strong>
                  <small>{copy.placeholderItem}</small>
                </button>
              ))}
            </div>
            <div className="professional-private-gallery">
              <span aria-hidden="true">⌁</span>
              <div><h2>{copy.privateGallery}</h2><p>{privateRequested ? copy.privateGalleryRequested : copy.privateGalleryDescription}</p></div>
              <span className="professional-private-status">{privateRequested ? copy.privateRequested : copy.locked}</span>
            </div>
          </div>

          <div id="professional-panel-reviews" role="tabpanel" aria-labelledby="professional-tab-reviews" hidden={activeTab !== "reviews"}>
            <ReviewsShell context="professional" />
          </div>
        </div>

        <div className="professional-commercial-gate">
          <span aria-hidden="true">◇</span>
          <p><strong>{copy.commercialGateTitle}</strong>{copy.commercialGateDescription}</p>
        </div>
      </Surface>

      <p className="private-profile-demo">{copy.demoNotice}</p>
    </section>
  );
}
