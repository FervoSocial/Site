"use client";

import { useState } from "react";
import { GalleryShell } from "@/components/profile/GalleryShell";
import { Surface } from "@/components/ui/Surface";
import { ptBR } from "@/lib/i18n";

const profile = ptBR.profile.privateMember;
type ProfileTab = "about" | "media" | "posts";

export function PrivateMemberProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("about");
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <section className="private-profile" aria-labelledby="private-profile-name">
      <p className="section-kicker">{profile.eyebrow}</p>

      <Surface className="private-profile-card">
        <div
          className="private-profile-photo"
          role="img"
          aria-label={profile.photoLabel}
        >
          <span aria-hidden="true">LC</span>
          <small>{profile.photoPlaceholder}</small>
        </div>

        <div className="private-profile-copy">
          <span className="private-profile-type">{profile.accountType}</span>
          <h1 id="private-profile-name">{profile.displayName}</h1>
          <p className="private-profile-location">
            <span aria-hidden="true">⌖</span>
            {profile.approximateLocation}
          </p>
          <p className="private-profile-bio">{profile.bio}</p>

          <dl className="private-profile-stats" aria-label={profile.statsLabel}>
            <div>
              <dt>{profile.stats.followers}</dt>
              <dd>248</dd>
            </div>
            <div>
              <dt>{profile.stats.following}</dt>
              <dd>186</dd>
            </div>
            <div>
              <dt>{profile.stats.posts}</dt>
              <dd>12</dd>
            </div>
          </dl>
        </div>

        <div className="private-profile-actions" aria-label={profile.actions.label}>
          <button
            type="button"
            className="private-profile-action private-profile-action-primary"
            aria-pressed={followed}
            onClick={() => setFollowed((current) => !current)}
          >
            <span aria-hidden="true">＋</span>
            {followed ? profile.actions.following : profile.actions.follow}
          </button>
          <button
            type="button"
            className="private-profile-action"
            aria-pressed={saved}
            onClick={() => setSaved((current) => !current)}
          >
            <span aria-hidden="true">◇</span>
            {saved ? profile.actions.saved : profile.actions.save}
          </button>
          {[
            ["○", profile.actions.nudge],
            ["✉", profile.actions.message],
            ["!", profile.actions.report],
            ["×", profile.actions.block],
          ].map(([icon, label]) => (
            <button
              type="button"
              className="private-profile-action"
              title={profile.actions.unavailable}
              disabled
              key={label}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="private-profile-tabs">
          <div className="private-profile-tab-list" role="tablist" aria-label={profile.tabs.label}>
            {([
              ["about", profile.tabs.about],
              ["media", profile.tabs.media],
              ["posts", profile.tabs.posts],
            ] as const).map(([id, label]) => (
              <button
                type="button"
                role="tab"
                id={`private-profile-tab-${id}`}
                aria-controls={`private-profile-tab-panel-${id}`}
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                key={id}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className="private-profile-tab-panel"
            id="private-profile-tab-panel-about"
            role="tabpanel"
            aria-labelledby="private-profile-tab-about"
            hidden={activeTab !== "about"}
          >
            <h2>{profile.tabs.content.about.title}</h2>
            <p>{profile.tabs.content.about.description}</p>
          </div>

          <div
            className="private-profile-tab-panel private-profile-media-panel"
            id="private-profile-tab-panel-media"
            role="tabpanel"
            aria-labelledby="private-profile-tab-media"
            hidden={activeTab !== "media"}
          >
            <GalleryShell />
          </div>

          <div
            className="private-profile-tab-panel"
            id="private-profile-tab-panel-posts"
            role="tabpanel"
            aria-labelledby="private-profile-tab-posts"
            hidden={activeTab !== "posts"}
          >
            <h2>{profile.tabs.content.posts.title}</h2>
            <p>{profile.tabs.content.posts.description}</p>
          </div>
        </div>
      </Surface>

      <p className="private-profile-demo">{profile.demoNotice}</p>
    </section>
  );
}
