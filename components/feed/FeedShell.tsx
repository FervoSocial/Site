"use client";

import Link from "next/link";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { feedPlaceholderItems, type FeedPlaceholderItem } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import type { PublicPost } from "@/lib/posts";
import { useFeedView } from "@/components/navigation/FeedAtmosphereContext";
import { FeedCard } from "./FeedCard";

const activeFriends = [
  { href: "/profile/luna-e-caio", initials: "LC", name: "Luna & Caio" },
  { href: "/profile/bia-e-leo", initials: "BL", name: "Bia & Leo" },
  { href: "/profile/renata-sp", initials: "RE", name: "Renata" },
];

function postInitials(displayName: string) {
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0]?.toLocaleUpperCase("pt-BR") ?? "")
    .join("") || "FS";
}

function persistedFeedItem(post: PublicPost, viewerProfileId: string): FeedPlaceholderItem {
  const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" })
    .format(new Date(post.createdAt * 1000));
  return {
    id: `persisted-${post.id}`,
    persistedPostId: post.id,
    kind: post.media ? "media" : "text",
    views: ["public"],
    author: post.displayName,
    handle: post.handle,
    initials: postInitials(post.displayName),
    accountLabel: ptBR.feed.persistedAccountLabel,
    location: post.approximateLocationLabel ?? ptBR.feed.locationNotShared,
    time: date,
    profileHref: `/profile/${post.handle}`,
    body: post.body,
    canDelete: post.authorProfileId === viewerProfileId,
    mediaKind: post.media?.kind,
    mediaUrl: post.media ? `/api/posts/${encodeURIComponent(post.id)}/media` : undefined,
  };
}

export function FeedShell({
  persistedPosts: initialPersistedPosts,
  viewerProfileId,
}: {
  persistedPosts: PublicPost[];
  viewerProfileId: string;
}) {
  const { activeView, setActiveView } = useFeedView();
  const router = useRouter();
  const [hiddenDeletedIds, setHiddenDeletedIds] = useState<Set<string>>(() => new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(() => new Set());
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(
    () => new Set(["luna-e-caio", "clube-aurora", "renata-sp"]),
  );

  const visibleItems = useMemo(() => {
    const persistedItems = initialPersistedPosts
      .filter((post) => !hiddenDeletedIds.has(post.id))
      .map((post) => persistedFeedItem(post, viewerProfileId));
    return [...persistedItems, ...feedPlaceholderItems].filter((item) => item.views.includes(activeView));
  }, [activeView, hiddenDeletedIds, initialPersistedPosts, viewerProfileId]);

  function toggle(setter: Dispatch<SetStateAction<Set<string>>>, value: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  async function deletePost(item: FeedPlaceholderItem) {
    if (!item.persistedPostId || !item.canDelete) return;
    if (!window.confirm(ptBR.feed.actions.deleteConfirmation)) return;
    setDeleteMessage(null);
    setDeletingIds((current) => new Set(current).add(item.persistedPostId!));
    try {
      const response = await fetch(`/api/posts/${encodeURIComponent(item.persistedPostId)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("delete_failed");
      setHiddenDeletedIds((current) => new Set(current).add(item.persistedPostId!));
      setDeleteMessage(ptBR.feed.actions.deleteSuccess);
      router.refresh();
    } catch {
      setDeleteMessage(ptBR.feed.actions.deleteError);
    } finally {
      setDeletingIds((current) => {
        const next = new Set(current);
        next.delete(item.persistedPostId!);
        return next;
      });
    }
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

      <div className="feed-context-row">
        <p className="feed-demo-notice">
          <span aria-hidden="true" />
          {ptBR.feed.demoNotice}
        </p>
        <div className="feed-view-context">
          <button
            type="button"
            aria-label={`${ptBR.feed.viewMenuLabel}: ${ptBR.feed.views[activeView]}`}
            aria-expanded={viewMenuOpen}
            aria-controls="feed-view-context-menu"
            onClick={() => setViewMenuOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setViewMenuOpen(false);
            }}
          >
            <strong>{ptBR.feed.views[activeView]}</strong>
            <span aria-hidden="true">⌄</span>
          </button>
          <div
            className="feed-view-context-menu"
            id="feed-view-context-menu"
            role="menu"
            aria-label={ptBR.feed.viewsLabel}
            hidden={!viewMenuOpen}
            onKeyDown={(event) => {
              if (event.key === "Escape") setViewMenuOpen(false);
            }}
          >
            {(["public", "nearby", "friends"] as const).map((view) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={activeView === view}
                key={view}
                onClick={() => {
                  setActiveView(view);
                  setViewMenuOpen(false);
                }}
              >
                {ptBR.feed.views[view]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="feed-list"
        id="feed-panel"
        role="region"
        aria-label={`${ptBR.feed.viewsLabel}: ${ptBR.feed.views[activeView]}`}
      >
        {deleteMessage ? <p className="feed-mutation-status" role="status">{deleteMessage}</p> : null}
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
            deleting={Boolean(item.persistedPostId && deletingIds.has(item.persistedPostId))}
            onDelete={item.canDelete ? () => deletePost(item) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
