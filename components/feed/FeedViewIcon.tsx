import type { FeedViewId } from "@/lib/feed-placeholder";

export function FeedViewIcon({ view }: { view: FeedViewId }) {
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
