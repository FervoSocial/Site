import Link from "next/link";
import type { FeedPlaceholderItem } from "@/lib/feed-placeholder";
import { ptBR } from "@/lib/i18n";
import { TooltipButton } from "@/components/ui/TooltipButton";

type FeedCardProps = {
  deleting?: boolean;
  followed: boolean;
  item: FeedPlaceholderItem;
  liked: boolean;
  onFollow: () => void;
  onLike: () => void;
  onDelete?: () => void;
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

function SaveHeartLockIcon({ id }: { id: string }) {
  const maskId = `save-heart-lock-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  return (
    <svg className="save-heart-lock-icon" aria-hidden="true" viewBox="0 0 38 24">
      <defs>
        <mask id={maskId}>
          <rect width="25" height="24" fill="black" />
          <path fill="white" d="M12 21.2 4.4 14C.7 10.5 2.6 4.5 7.5 4.5c2 0 3.6 1.1 4.5 2.5.9-1.4 2.5-2.5 4.5-2.5 4.9 0 6.8 6 3.1 9.5L12 21.2Z" />
          <circle cx="12" cy="10.7" r="2.05" fill="black" />
          <path d="m10.8 12.1-.9 4.2h4.2l-.9-4.2Z" fill="black" />
        </mask>
      </defs>
      <rect width="25" height="24" fill="currentColor" mask={`url(#${maskId})`} />
      <g className="save-heart-key">
        <circle cx="29" cy="8.2" r="3.4" />
        <path d="m31.4 10.6 5.1 5.1m-2.6-2.6 1.8-1.8m-3.7.1 1.8-1.8" />
      </g>
    </svg>
  );
}

export function FeedCard({
  deleting = false,
  followed,
  item,
  liked,
  onFollow,
  onLike,
  onDelete,
  onSave,
  saved,
}: FeedCardProps) {
  const actions = ptBR.feed.actions;
  const showFollow = item.kind !== "safety" && !item.canDelete;

  return (
    <article
      className={`feed-card feed-card-${item.kind}`}
      aria-labelledby={item.title ? `feed-title-${item.id}` : undefined}
      aria-label={item.title ? undefined : `${item.author}: ${item.body}`}
    >
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
        ) : onDelete ? (
          <button
            className="feed-delete-button"
            type="button"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? actions.deleting : actions.delete}
          </button>
        ) : null}
      </header>

      {item.kind === "media" ? (
        item.mediaUrl ? (
          <div className="feed-published-media">
            {item.mediaKind === "video" ? (
              <video
                src={item.mediaUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={`${item.author}: ${ptBR.feed.publishedMedia}`}
              />
            ) : (
              // Authenticated R2 responses are served through a protected application route.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.mediaUrl}
                alt={`${item.author}: ${ptBR.feed.publishedMedia}`}
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <div className="feed-media-placeholder" role="img" aria-label={item.visualLabel}>
            <span>{item.visualLabel}</span>
          </div>
        )
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
        <TooltipButton type="button" label={liked ? actions.liked : actions.like} aria-pressed={liked} onClick={onLike} className={`feed-icon-action feed-like-action ${liked ? "is-active" : ""}`}>
          <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
          <span className="touch-action-label" aria-hidden="true">{liked ? actions.liked : actions.like}</span>
        </TooltipButton>
        <button type="button" disabled aria-label={actions.comment} title={`${actions.comment}: ${actions.unavailable}`}>
          <FeedActionIcon name="comment" />
        </button>
        <TooltipButton type="button" label={saved ? actions.saved : actions.save} aria-pressed={saved} onClick={onSave} className={`feed-icon-action feed-save-action ${saved ? "is-active" : ""}`}>
          <SaveHeartLockIcon id={item.id} />
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
