"use client";

import Link from "next/link";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { feedPlaceholderItems } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import { useFeedView } from "@/components/navigation/FeedAtmosphereContext";
import { FeedCard } from "./FeedCard";

const activeFriends = [
  { href: "/profile/luna-e-caio", initials: "LC", name: "Luna & Caio" },
  { href: "/profile/bia-e-leo", initials: "BL", name: "Bia & Leo" },
  { href: "/profile/renata-sp", initials: "RE", name: "Renata" },
];

export function FeedShell() {
  const { activeView } = useFeedView();
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(
    () => new Set(["luna-e-caio", "clube-aurora", "renata-sp"]),
  );

  const visibleItems = useMemo(
    () => feedPlaceholderItems.filter((item) => item.views.includes(activeView)),
    [activeView],
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

      <p className="feed-demo-notice">
        <span aria-hidden="true" />
        {ptBR.feed.demoNotice}
      </p>

      <div
        className="feed-list"
        id="feed-panel"
        role="region"
        aria-label={`${ptBR.feed.viewsLabel}: ${ptBR.feed.views[activeView]}`}
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
