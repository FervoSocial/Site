"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ptBR } from "@/lib/i18n";
import {
  getSupportedPostMediaKind,
  POST_IMAGE_MAX_BYTES,
  POST_MEDIA_ACCEPT,
  POST_VIDEO_MAX_BYTES,
} from "@/lib/post-media";
import { countPostCharacters, POST_BODY_MAX_CHARACTERS, type PostAudience } from "@/lib/posts";

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
  const [audience, setAudience] = useState<PostAudience>("public");
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [state, setState] = useState<ComposerState>("editing");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [mediaAttestation, setMediaAttestation] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const audienceMenuRef = useRef<HTMLDivElement>(null);
  const count = countPostCharacters(body);
  const trimmedBody = body.trim();
  const invalid = !trimmedBody || count > POST_BODY_MAX_CHARACTERS || Boolean(media && !mediaAttestation);

  useEffect(() => {
    return () => {
      if (mediaPreviewUrl) URL.revokeObjectURL(mediaPreviewUrl);
    };
  }, [mediaPreviewUrl]);

  useEffect(() => {
    if (!audienceOpen) return;
    function closeAudienceMenu(event: PointerEvent) {
      if (!audienceMenuRef.current?.contains(event.target as Node)) setAudienceOpen(false);
    }
    function closeAudienceMenuOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAudienceOpen(false);
    }
    document.addEventListener("pointerdown", closeAudienceMenu);
    document.addEventListener("keydown", closeAudienceMenuOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeAudienceMenu);
      document.removeEventListener("keydown", closeAudienceMenuOnEscape);
    };
  }, [audienceOpen]);

  function clearMedia() {
    setMedia(null);
    setMediaPreviewUrl(null);
    setMediaAttestation(false);
    setMediaError(null);
    if (mediaInputRef.current) mediaInputRef.current.value = "";
  }

  function selectMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    const kind = getSupportedPostMediaKind(file.type);
    const limit = kind === "image" ? POST_IMAGE_MAX_BYTES : POST_VIDEO_MAX_BYTES;
    if (!kind) {
      setMediaError(copy.mediaTypeError);
      event.target.value = "";
      return;
    }
    if (file.size > limit) {
      setMediaError(kind === "image" ? copy.imageSizeError : copy.videoSizeError);
      event.target.value = "";
      return;
    }
    setMedia(file);
    setMediaPreviewUrl(URL.createObjectURL(file));
    setMediaAttestation(false);
    setMediaError(null);
    if (state === "error") setState("editing");
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalid || state === "loading" || !canPublish) return;
    setState("loading");
    try {
      let response: Response;
      if (media) {
        const form = new FormData();
        form.set("body", body);
        form.set("audience", audience);
        form.set("media", media);
        form.set("mediaAttestation", mediaAttestation ? "accepted" : "");
        response = await fetch("/api/posts", { method: "POST", body: form });
      } else {
        response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body, audience }),
        });
      }
      if (!response.ok) throw new Error("post_create_failed");
      setBody("");
      clearMedia();
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
        <p>{copy.audiences[audience].successDescription}</p>
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

      <div className="create-audience-selector" ref={audienceMenuRef}>
        <span className="create-audience-label" id="create-audience-label">{copy.audienceLabel}</span>
        <button
          className="create-audience-trigger"
          type="button"
          aria-labelledby="create-audience-label create-audience-value"
          aria-haspopup="listbox"
          aria-expanded={audienceOpen}
          onClick={() => setAudienceOpen((current) => !current)}
          disabled={state === "loading"}
        >
          <span aria-hidden="true">◎</span>
          <span id="create-audience-value"><strong>{copy.audiences[audience].label}</strong><small>{copy.audiences[audience].description}</small></span>
          <span className="create-audience-chevron" aria-hidden="true">⌄</span>
        </button>
        {audienceOpen ? (
          <div className="create-audience-menu" role="listbox" aria-labelledby="create-audience-label">
            {(["public", "profile", "only_me"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={audience === value}
                onClick={() => {
                  setAudience(value);
                  setAudienceOpen(false);
                }}
              >
                <span aria-hidden="true">{audience === value ? "✓" : ""}</span>
                <span><strong>{copy.audiences[value].label}</strong><small>{copy.audiences[value].description}</small></span>
              </button>
            ))}
            <button type="button" role="option" aria-selected="false" aria-disabled="true" disabled>
              <span aria-hidden="true" />
              <span><strong>{copy.audiences.friends.label}</strong><small>{copy.audiences.friends.description}</small></span>
              <em>{copy.comingSoon}</em>
            </button>
          </div>
        ) : null}
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
        <button
          className="create-tool-control"
          type="button"
          onClick={() => mediaInputRef.current?.click()}
          disabled={state === "loading"}
        >
          <span className="create-tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="m5 17 4.5-4 3.2 2.6 2.4-2.2L19 17" />
            </svg>
          </span>
          <span className="create-tool-copy">
            <strong>{media ? copy.replaceMedia : copy.addMedia}</strong>
            <small>{copy.mediaGuidance}</small>
          </span>
        </button>

        <input
          ref={mediaInputRef}
          id="create-post-media"
          className="create-media-input"
          type="file"
          accept={POST_MEDIA_ACCEPT}
          onChange={selectMedia}
          disabled={state === "loading"}
        />

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

      {media && mediaPreviewUrl ? (
        <div className="create-media-preview">
          {media.type.startsWith("image/") ? (
            // Local object URLs cannot use the framework image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaPreviewUrl} alt={copy.mediaPreviewAlt} />
          ) : (
            <video src={mediaPreviewUrl} controls playsInline preload="metadata" aria-label={copy.mediaPreviewAlt} />
          )}
          <div>
            <span>{media.name}</span>
            <button type="button" onClick={clearMedia} disabled={state === "loading"}>
              {copy.removeMedia}
            </button>
          </div>
          <label className="create-media-attestation">
            <input
              type="checkbox"
              checked={mediaAttestation}
              onChange={(event) => setMediaAttestation(event.target.checked)}
              disabled={state === "loading"}
            />
            <span>{copy.mediaAttestation}</span>
          </label>
        </div>
      ) : null}

      {mediaError ? <p className="create-composer-status create-composer-error" role="alert">{mediaError}</p> : null}

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
