"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { feedPlaceholderItems, type FeedViewId } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import { useFeedAtmosphere } from "@/components/navigation/FeedAtmosphereContext";
import { TooltipButton } from "@/components/ui/TooltipButton";
import { FeedCard } from "./FeedCard";

const feedViews: Array<{ id: FeedViewId; label: string }> = [
  { id: "public", label: ptBR.feed.views.public },
  { id: "nearby", label: ptBR.feed.views.nearby },
  { id: "friends", label: ptBR.feed.views.friends },
];

const activeFriends = [
  { href: "/profile/luna-e-caio", initials: "LC", name: "Luna & Caio" },
  { href: "/profile/bia-e-leo", initials: "BL", name: "Bia & Leo" },
  { href: "/profile/renata-sp", initials: "RE", name: "Renata" },
];

function FeedViewIcon({ view }: { view: FeedViewId }) {
  if (view === "nearby") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 12 18.2 6.8" />
        <circle className="feed-view-icon-dot" cx="18.2" cy="6.8" r="1.2" />
      </svg>
    );
  }

  if (view === "friends") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="8.3" cy="7.4" r="2.7" />
        <circle cx="15.7" cy="7.4" r="2.7" />
        <path d="M4.2 18.4c.4-4 2.1-6.2 4.7-6.2 1.3 0 2.4.6 3.1 1.7.7-1.1 1.8-1.7 3.1-1.7 2.6 0 4.3 2.2 4.7 6.2" />
        <path d="M8.5 14.3c1.1 2.1 2.3 3.1 3.5 3.1s2.4-1 3.5-3.1" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="3" />
      <circle cx="5.4" cy="9" r="2.2" />
      <circle cx="18.6" cy="9" r="2.2" />
      <path d="M7.3 18.5c.4-4.1 2-6.3 4.7-6.3s4.3 2.2 4.7 6.3" />
      <path d="M1.9 18.5c.2-3.1 1.4-4.8 3.6-4.8 1 0 1.8.4 2.4 1.1M22.1 18.5c-.2-3.1-1.4-4.8-3.6-4.8-1 0-1.8.4-2.4 1.1" />
    </svg>
  );
}

export function FeedShell() {
  const [activeView, setActiveView] = useState<FeedViewId>("public");
  const setFeedAtmosphere = useFeedAtmosphere();
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(
    () => new Set(["luna-e-caio", "clube-aurora", "renata-sp"]),
  );

  const visibleItems = useMemo(
    () => feedPlaceholderItems.filter((item) => item.views.includes(activeView)),
    [activeView],
  );

  useEffect(() => {
    const atmosphere =
      activeView === "friends" ? "seedance" : activeView === "nearby" ? "hailuo" : "kling";
    setFeedAtmosphere(atmosphere);
  }, [activeView, setFeedAtmosphere]);

  useEffect(
    () => () => {
      setFeedAtmosphere("kling");
    },
    [setFeedAtmosphere],
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
        <h1 id="feed-title" className="feed-brand-logo" aria-label={ptBR.brand}>
          Fervo<span>Social</span>
        </h1>
        <nav className="friend-activity-orbits" aria-label={ptBR.feed.activeFriendsLabel}>
          {activeFriends.map((friend) => (
            <Link
              className="friend-activity-orbit"
              href={friend.href}
              key={friend.href}
              aria-label={`${friend.name}: ${ptBR.feed.recentActivity}`}
            >
              <span className="friend-orbit-ring" aria-hidden="true">
                <span>{friend.initials}</span>
              </span>
              <small aria-hidden="true">{friend.name}</small>
            </Link>
          ))}
        </nav>
      </header>

      <div className="feed-view-bar">
        <div className="feed-view-switch" role="tablist" aria-label={ptBR.feed.viewsLabel}>
          {feedViews.map((view) => (
            <TooltipButton
              id={`feed-view-${view.id}`}
              key={view.id}
              type="button"
              label={view.label}
              role="tab"
              aria-selected={activeView === view.id}
              aria-controls="feed-panel"
              onClick={() => setActiveView(view.id)}
            >
              <FeedViewIcon view={view.id} />
            </TooltipButton>
          ))}
        </div>
      </div>

      <p className="feed-demo-notice">
        <span aria-hidden="true" />
        {ptBR.feed.demoNotice}
      </p>

      <div
        className="feed-list"
        id="feed-panel"
        role="tabpanel"
        aria-labelledby={`feed-view-${activeView}`}
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
