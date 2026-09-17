import Link from "next/link";
import type { FeedPlaceholderItem } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import { TooltipButton } from "@/components/ui/TooltipButton";

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

function FeedActionIcon({ name }: { name: "comment" | "message" | "report" }) {
  if (name === "message") {
    return (
      <svg className="feed-action-svg" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4 5.5h16v11H9l-5 3v-14Z" />
        <path d="m7.5 9 4.5 3.4L16.5 9" />
      </svg>
    );
  }

  if (name === "report") {
    return (
      <svg className="feed-action-svg" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3.5 21 20H3L12 3.5Z" />
        <path d="M12 9v5" />
        <circle className="feed-action-icon-dot" cx="12" cy="17.1" r=".7" />
      </svg>
    );
  }

  return (
    <svg className="feed-action-svg" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 5.5h16v11H9l-5 3v-14Z" />
      <circle className="feed-action-icon-dot" cx="8.5" cy="11" r=".7" />
      <circle className="feed-action-icon-dot" cx="12" cy="11" r=".7" />
      <circle className="feed-action-icon-dot" cx="15.5" cy="11" r=".7" />
    </svg>
  );
}

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
        <TooltipButton type="button" label={liked ? actions.liked : actions.like} aria-pressed={liked} onClick={onLike} className={`feed-icon-action ${liked ? "is-active" : ""}`}>
          <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
          <span className="touch-action-label" aria-hidden="true">{liked ? actions.liked : actions.like}</span>
        </TooltipButton>
        <button type="button" disabled aria-label={actions.comment} title={`${actions.comment}: ${actions.unavailable}`}>
          <FeedActionIcon name="comment" />
        </button>
        <TooltipButton type="button" label={saved ? actions.saved : actions.save} aria-pressed={saved} onClick={onSave} className={`feed-icon-action ${saved ? "is-active" : ""}`}>
          <span className="bookmark-icon" aria-hidden="true" />
          <span className="touch-action-label" aria-hidden="true">{saved ? actions.saved : actions.save}</span>
        </TooltipButton>
        <button type="button" disabled aria-label={actions.message} title={`${actions.message}: ${actions.unavailable}`}>
          <FeedActionIcon name="message" />
        </button>
        <button type="button" disabled aria-label={actions.report} title={`${actions.report}: ${actions.unavailable}`}>
          <FeedActionIcon name="report" />
        </button>
      </footer>
    </article>
  );
}
