import Link from "next/link";
import type { FeedPlaceholderItem } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";

type FeedCardProps = {
  followed: boolean;
  item: FeedPlaceholderItem;
  liked: boolean;
  onFollow: () => void;
  onLike: () => void;
  onSave: () => void;
  saved: boolean;
};

const typeLabels = {
  media: ptBR.feed.types.media,
  text: ptBR.feed.types.text,
  event: ptBR.feed.types.event,
  professional: ptBR.feed.types.professional,
  safety: ptBR.feed.types.safety,
  sponsored: ptBR.feed.types.sponsored,
};

export function FeedCard({
  followed,
  item,
  liked,
  onFollow,
  onLike,
  onSave,
  saved,
}: FeedCardProps) {
  const actions = ptBR.feed.actions;
  const showFollow = item.kind !== "safety";

  return (
    <article className={`feed-card feed-card-${item.kind}`} aria-labelledby={`feed-title-${item.id}`}>
      <header className="feed-card-header">
        <Link className="feed-profile-link" href={item.profileHref} aria-label={`${actions.openProfile}: ${item.author}`}>
          <span className={`feed-avatar feed-avatar-${item.kind}`} aria-hidden="true">
            {item.initials}
          </span>
          <span className="feed-profile-copy">
            <span className="feed-author-line">
              <strong>{item.author}</strong>
              {item.verified ? <span className="verification-mark" aria-label="Verificado">✓</span> : null}
            </span>
            <span className="feed-account-label">{item.accountLabel}</span>
            <span className="feed-location">⌖ {item.location} · {item.time}</span>
          </span>
        </Link>

        {showFollow ? (
          <button
            className="feed-follow-button"
            type="button"
            aria-pressed={followed}
            onClick={onFollow}
          >
            {followed ? actions.following : actions.follow}
          </button>
        ) : null}
      </header>

      {item.kind === "media" ? (
        <div className="feed-media-placeholder" role="img" aria-label={item.visualLabel}>
          <span>{item.visualLabel}</span>
        </div>
      ) : null}

      <div className="feed-card-content">
        <span className={`feed-type-chip feed-type-${item.kind}`}>{typeLabels[item.kind]}</span>
        {item.title ? <h2 id={`feed-title-${item.id}`}>{item.title}</h2> : null}
        <p>{item.body}</p>
        {item.meta ? <p className="feed-card-meta">{item.meta}</p> : null}

        {item.eventHref ? (
          <Link className="feed-event-link" href={item.eventHref}>
            {actions.openEvent}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      <footer className="feed-actions" aria-label="Ações da publicação">
        <button type="button" aria-pressed={liked} onClick={onLike} className={liked ? "is-active" : ""}>
          <span aria-hidden="true">♡</span>
          {liked ? actions.liked : actions.like}
        </button>
        <button type="button" disabled title={actions.unavailable}>
          <span aria-hidden="true">○</span>
          {actions.comment}
        </button>
        <button type="button" aria-pressed={saved} onClick={onSave} className={saved ? "is-active" : ""}>
          <span aria-hidden="true">◇</span>
          {saved ? actions.saved : actions.save}
        </button>
        <button type="button" disabled title={actions.unavailable}>
          <span aria-hidden="true">✉</span>
          {actions.message}
        </button>
        <button type="button" disabled title={actions.unavailable}>
          <span aria-hidden="true">!</span>
          {actions.report}
        </button>
      </footer>
    </article>
  );
}
