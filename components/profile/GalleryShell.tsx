"use client";

import { useState } from "react";
import { ptBR } from "@/lib/i18n";
import {
  galleryItems,
  type GalleryItem,
  type GallerySection,
} from "@/lib/gallery-placeholder";

type GalleryViewState = "results" | "loading" | "empty";

const copy = ptBR.profile.privateMember.gallery;

function GalleryGrid({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <div className="profile-gallery-grid" aria-label={copy.itemsLabel}>
      {items.map((item) => (
        <button
          type="button"
          className="profile-gallery-tile"
          aria-label={`${copy.openItem}: ${item.title}`}
          onClick={() => onOpen(item)}
          key={item.id}
        >
          <span
            className={`profile-gallery-art profile-gallery-art-${item.tone}`}
            aria-hidden="true"
          />
          <span className="profile-gallery-tile-copy">
            <strong>{item.title}</strong>
            <span className="profile-gallery-visibility">
              <span aria-hidden="true">◉</span>
              {item.visibility}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function GalleryShell() {
  const [section, setSection] = useState<GallerySection>("public");
  const [viewState, setViewState] = useState<GalleryViewState>("results");
  const [accessRequested, setAccessRequested] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const showGalleryContent = (gallerySection: "public" | "friends") => {
    if (viewState === "loading") {
      return (
        <div className="profile-gallery-state" role="status">
          <span className="profile-gallery-state-mark" aria-hidden="true">···</span>
          <h3>{copy.states.loadingTitle}</h3>
          <p>{copy.states.loadingDescription}</p>
        </div>
      );
    }

    if (viewState === "empty") {
      return (
        <div className="profile-gallery-state">
          <span className="profile-gallery-state-mark" aria-hidden="true">◇</span>
          <h3>{copy.states.emptyTitle}</h3>
          <p>{copy.states.emptyDescription}</p>
        </div>
      );
    }

    return <GalleryGrid items={galleryItems[gallerySection]} onOpen={setSelectedItem} />;
  };

  return (
    <section className="profile-gallery-shell" aria-labelledby="profile-gallery-title">
      <div className="profile-gallery-heading">
        <div>
          <p className="section-kicker">{copy.eyebrow}</p>
          <h2 id="profile-gallery-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <span className="profile-gallery-safety">{copy.safetyLabel}</span>
      </div>

      <div
        className="profile-gallery-section-tabs"
        role="tablist"
        aria-label={copy.sectionsLabel}
      >
        {([
          ["public", copy.sections.public],
          ["friends", copy.sections.friends],
          ["private", copy.sections.private],
        ] as const).map(([id, label]) => (
          <button
            type="button"
            role="tab"
            id={`gallery-section-tab-${id}`}
            aria-controls={`gallery-section-panel-${id}`}
            aria-selected={section === id}
            onClick={() => setSection(id)}
            key={id}
          >
            {label}
          </button>
        ))}
      </div>

      <details className="profile-gallery-state-preview">
        <summary>{copy.states.preview}</summary>
        <div role="group" aria-label={copy.states.preview}>
          {([
            ["results", copy.states.resultsLabel],
            ["loading", copy.states.loadingLabel],
            ["empty", copy.states.emptyLabel],
          ] as const).map(([id, label]) => (
            <button
              type="button"
              aria-pressed={viewState === id}
              onClick={() => setViewState(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </div>
      </details>

      <div
        id="gallery-section-panel-public"
        role="tabpanel"
        aria-labelledby="gallery-section-tab-public"
        hidden={section !== "public"}
      >
        <div className="profile-gallery-section-heading">
          <div>
            <h3>{copy.public.title}</h3>
            <p>{copy.public.description}</p>
          </div>
          <span className="profile-gallery-visibility">{copy.public.visibility}</span>
        </div>
        {showGalleryContent("public")}
      </div>

      <div
        id="gallery-section-panel-friends"
        role="tabpanel"
        aria-labelledby="gallery-section-tab-friends"
        hidden={section !== "friends"}
      >
        <div className="profile-gallery-section-heading">
          <div>
            <h3>{copy.friends.title}</h3>
            <p>{copy.friends.description}</p>
          </div>
          <span className="profile-gallery-visibility">{copy.friends.visibility}</span>
        </div>
        {showGalleryContent("friends")}
      </div>

      <div
        id="gallery-section-panel-private"
        role="tabpanel"
        aria-labelledby="gallery-section-tab-private"
        hidden={section !== "private"}
      >
        <div className="profile-gallery-locked">
          <span className="profile-gallery-lock" aria-hidden="true">⌁</span>
          <span className="profile-gallery-visibility">{copy.private.visibility}</span>
          <h3>{accessRequested ? copy.private.requestedTitle : copy.private.lockedTitle}</h3>
          <p>
            {accessRequested
              ? copy.private.requestedDescription
              : copy.private.lockedDescription}
          </p>
          {!accessRequested && (
            <button
              type="button"
              className="profile-gallery-request"
              onClick={() => setAccessRequested(true)}
            >
              {copy.private.requestAction}
            </button>
          )}
          {accessRequested && (
            <span className="profile-gallery-requested" role="status">
              {copy.private.requestedStatus}
            </span>
          )}
        </div>

        <div className="profile-gallery-access-controls" aria-label={copy.private.controlsLabel}>
          <p>{copy.private.controlsDescription}</p>
          <div>
            {[copy.private.grant, copy.private.revoke, copy.private.expiry].map((label) => (
              <button type="button" disabled title={copy.placeholderNotice} key={label}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="profile-gallery-placeholder-notice">{copy.placeholderNotice}</p>

      {selectedItem && (
        <div
          className="profile-gallery-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedItem(null);
          }}
        >
          <section
            className="profile-gallery-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-gallery-dialog-title"
          >
            <button
              type="button"
              className="profile-gallery-dialog-close"
              aria-label={copy.closeItem}
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <span
              className={`profile-gallery-dialog-art profile-gallery-art-${selectedItem.tone}`}
              aria-hidden="true"
            />
            <span className="profile-gallery-visibility">{selectedItem.visibility}</span>
            <h3 id="profile-gallery-dialog-title">{selectedItem.title}</h3>
            <p>{selectedItem.description}</p>
            <small>{copy.itemNotice}</small>
          </section>
        </div>
      )}
    </section>
  );
}
