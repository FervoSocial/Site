"use client";

import { useState } from "react";
import { ptBR } from "@/lib/i18n";
import { reviewPlaceholders, type ReviewContext } from "@/lib/reviews-placeholder";

type ReviewViewState = "results" | "loading" | "empty" | "ineligible";

type ReviewsShellProps = {
  context: ReviewContext;
};

const copy = ptBR.reviews;

export function ReviewsShell({ context }: ReviewsShellProps) {
  const data = reviewPlaceholders[context];
  const [viewState, setViewState] = useState<ReviewViewState>("results");
  const [helpful, setHelpful] = useState<Set<string>>(new Set());

  function toggleHelpful(id: string) {
    setHelpful((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className={`reviews-shell reviews-shell-${context}`} aria-labelledby={`reviews-title-${context}`}>
      <header className="reviews-heading">
        <div>
          <p className="section-kicker">{copy.eyebrow}</p>
          <h2 id={`reviews-title-${context}`}>{data.title}</h2>
          <p>{copy.description}</p>
        </div>
        <div className="reviews-summary" aria-label={copy.summaryLabel}>
          <strong>{data.summary}</strong>
          <span>{data.countLabel}</span>
        </div>
      </header>

      <div className="reviews-eligibility-notice">
        <span aria-hidden="true">◇</span>
        <p><strong>{copy.eligibilityTitle}</strong>{copy.eligibilityRule} {data.eligibility}</p>
        <button type="button" onClick={() => setViewState("ineligible")}>{copy.checkEligibility}</button>
      </div>

      <div className="reviews-controls" aria-label={copy.controlsLabel}>
        <button type="button" className="reviews-write" onClick={() => setViewState("ineligible")}>{copy.writeReview}</button>
        <label><span>{copy.filter}</span><select disabled defaultValue="all"><option value="all">{copy.allCategories}</option></select></label>
        <label><span>{copy.sort}</span><select disabled defaultValue="recent"><option value="recent">{copy.mostRecent}</option></select></label>
      </div>

      <details className="reviews-state-preview">
        <summary>{copy.states.preview}</summary>
        <div role="group" aria-label={copy.states.preview}>
          {([
            ["results", copy.states.results],
            ["loading", copy.states.loading],
            ["empty", copy.states.empty],
            ["ineligible", copy.states.ineligible],
          ] as const).map(([id, label]) => (
            <button type="button" aria-pressed={viewState === id} onClick={() => setViewState(id)} key={id}>{label}</button>
          ))}
        </div>
      </details>

      {viewState === "results" ? (
        <>
          <div className="reviews-category-grid" aria-label={copy.categoryRatingsLabel}>
            {data.categories.map((category) => (
              <div key={category.label}>
                <span>{category.label}</span>
                <progress max="5" value={category.rating} aria-label={`${category.label}: ${category.rating.toLocaleString("pt-BR")} de 5`} />
                <strong>{category.rating.toLocaleString("pt-BR")} / 5</strong>
              </div>
            ))}
          </div>

          <div className="reviews-list" aria-label={copy.entriesLabel}>
            {data.entries.map((review) => (
              <article className="review-entry" key={review.id}>
                <header><div><strong>{review.author}</strong><span>{review.interaction}</span></div><span>{copy.fictionalBadge}</span></header>
                <p className="review-moderated-label">{copy.moderatedText}</p>
                <p className="review-body">{review.body}</p>
                <div className="review-response">
                  <strong>{review.responseAuthor}</strong>
                  <p>{review.response}</p>
                </div>
                <div className="review-entry-actions">
                  <button type="button" aria-pressed={helpful.has(review.id)} onClick={() => toggleHelpful(review.id)}>
                    {helpful.has(review.id) ? copy.helpfulMarked : copy.helpful}
                  </button>
                  <button type="button" disabled title={copy.unavailable}>{copy.respond}</button>
                  <button type="button" disabled title={copy.unavailable}>{copy.report}</button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : null}

      {viewState === "loading" ? <ReviewState symbol="···" title={copy.states.loadingTitle} description={copy.states.loadingDescription} /> : null}
      {viewState === "empty" ? <ReviewState symbol="☆" title={copy.states.emptyTitle} description={copy.states.emptyDescription} /> : null}
      {viewState === "ineligible" ? <ReviewState symbol="◇" title={copy.states.ineligibleTitle} description={copy.states.ineligibleDescription} /> : null}

      <div className="reviews-safety-boundary">
        <strong>{copy.safetyBoundaryTitle}</strong>
        <p>{copy.safetyBoundaryDescription}</p>
      </div>
      <p className="reviews-placeholder-notice">{copy.placeholderNotice}</p>
    </section>
  );
}

function ReviewState({ symbol, title, description }: { symbol: string; title: string; description: string }) {
  return (
    <div className="reviews-state" role="status">
      <span aria-hidden="true">{symbol}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
