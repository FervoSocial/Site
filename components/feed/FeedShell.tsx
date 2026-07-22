"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { feedPlaceholderItems, type FeedTabId } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import { FeedCard } from "./FeedCard";

const tabs: Array<{ id: FeedTabId; label: string }> = [
  { id: "for-you", label: ptBR.feed.tabs.forYou },
  { id: "nearby", label: ptBR.feed.tabs.nearby },
  { id: "following", label: ptBR.feed.tabs.following },
];

export function FeedShell() {
  const [activeTab, setActiveTab] = useState<FeedTabId>("for-you");
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(
    () => new Set(["luna-e-caio", "clube-aurora", "renata-sp"]),
  );

  const visibleItems = useMemo(
    () => feedPlaceholderItems.filter((item) => item.tabs.includes(activeTab)),
    [activeTab],
  );

  function toggle(setter: Dispatch<SetStateAction<Set<string>>>, value: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  return (
    <section className="feed-shell" aria-labelledby="feed-title">
      <header className="feed-heading">
        <p className="section-kicker">{ptBR.feed.eyebrow}</p>
        <h1 id="feed-title">{ptBR.feed.title}</h1>
        <p>{ptBR.feed.description}</p>
      </header>

      <div className="feed-tab-bar">
        <div className="feed-tabs" role="tablist" aria-label="Filtros do feed">
          {tabs.map((tab) => (
            <button
              id={`feed-tab-${tab.id}`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="feed-panel"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="feed-demo-notice">
          <span aria-hidden="true" />
          {ptBR.feed.demoNotice}
        </p>
      </div>

      <div
        className="feed-list"
        id="feed-panel"
        role="tabpanel"
        aria-labelledby={`feed-tab-${activeTab}`}
      >
        {visibleItems.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
            liked={likedIds.has(item.id)}
            saved={savedIds.has(item.id)}
            followed={followedHandles.has(item.handle)}
            onLike={() => toggle(setLikedIds, item.id)}
            onSave={() => toggle(setSavedIds, item.id)}
            onFollow={() => toggle(setFollowedHandles, item.handle)}
          />
        ))}
      </div>
    </section>
  );
}
