"use client";

import { useState, type FormEvent } from "react";
import { ptBR } from "@/lib/i18n";
import { countPostCharacters, POST_BODY_MAX_CHARACTERS } from "@/lib/posts";

type ComposerState = "editing" | "loading" | "success" | "error";

export function CreateComposer({
  canPublish,
  onCancel,
  onPublished,
}: {
  canPublish: boolean;
  onCancel: () => void;
  onPublished: () => void;
}) {
  const copy = ptBR.create;
  const [body, setBody] = useState("");
  const [state, setState] = useState<ComposerState>("editing");
  const count = countPostCharacters(body);
  const trimmedBody = body.trim();
  const invalid = !trimmedBody || count > POST_BODY_MAX_CHARACTERS;

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalid || state === "loading" || !canPublish) return;
    setState("loading");
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, audience: "public" }),
      });
      if (!response.ok) throw new Error("post_create_failed");
      setBody("");
      setState("success");
      onPublished();
    } catch {
      setState("error");
    }
  }

  if (!canPublish) {
    return (
      <div className="create-composer-unavailable" role="status">
        <p className="section-kicker">{copy.eyebrow}</p>
        <h2 id="create-sheet-title">{copy.title}</h2>
        <p>{copy.privateMemberOnly}</p>
        <button className="sheet-close" type="button" onClick={onCancel} autoFocus>
          {ptBR.shell.close}
        </button>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="create-composer-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="section-kicker">{copy.successEyebrow}</p>
        <h2 id="create-sheet-title">{copy.successTitle}</h2>
        <p>{copy.successDescription}</p>
        <button className="sheet-close" type="button" onClick={onCancel} autoFocus>
          {copy.viewFeed}
        </button>
      </div>
    );
  }

  return (
    <form className="create-composer" onSubmit={publish} noValidate>
      <p className="section-kicker">{copy.eyebrow}</p>
      <h2 id="create-sheet-title">{copy.title}</h2>
      <p className="create-composer-description">{copy.description}</p>

      <div className="create-audience-note" role="note">
        <span aria-hidden="true">◎</span>
        <span><strong>{copy.publicAudience}</strong><small>{copy.publicAudienceDescription}</small></span>
      </div>

      <label className="create-text-field" htmlFor="create-post-body">
        <span>{copy.textLabel}</span>
        <textarea
          id="create-post-body"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            if (state === "error") setState("editing");
          }}
          maxLength={POST_BODY_MAX_CHARACTERS}
          placeholder={copy.textPlaceholder}
          disabled={state === "loading"}
          autoFocus
          rows={5}
          aria-describedby="create-character-count create-post-guidance"
        />
      </label>

      <div className="create-composer-meta">
        <span id="create-post-guidance">{copy.textGuidance}</span>
        <output
          id="create-character-count"
          className={count >= POST_BODY_MAX_CHARACTERS ? "is-limit" : undefined}
          aria-live="polite"
        >
          {count}/{POST_BODY_MAX_CHARACTERS}
        </output>
      </div>

      <div className="create-composer-tools" aria-label="Recursos da publicação">
        <button className="create-tool-control" type="button" disabled>
          <span className="create-tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="m5 17 4.5-4 3.2 2.6 2.4-2.2L19 17" />
            </svg>
          </span>
          <span className="create-tool-copy">
            <strong>{copy.addMedia}</strong>
            <small>{copy.mediaUnavailable}</small>
          </span>
          <span className="create-tool-status">{copy.comingSoon}</span>
        </button>

        <button className="create-tool-control" type="button" disabled>
          <span className="create-tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />
            </svg>
          </span>
          <span className="create-tool-copy">
            <strong>{copy.moreOptions}</strong>
            <small>{copy.moreOptionsUnavailable}</small>
          </span>
          <span className="create-tool-status">{copy.comingSoon}</span>
        </button>
      </div>

      {state === "error" ? (
        <p className="create-composer-status create-composer-error" role="alert">
          {copy.error}
        </p>
      ) : null}

      <div className="create-composer-actions">
        <button type="button" className="create-cancel" onClick={onCancel} disabled={state === "loading"}>
          {copy.cancel}
        </button>
        <button type="submit" className="create-publish" disabled={invalid || state === "loading"}>
          {state === "loading" ? <span className="button-spinner" aria-hidden="true" /> : null}
          {state === "loading" ? copy.publishing : copy.publish}
        </button>
      </div>
    </form>
  );
}
