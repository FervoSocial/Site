"use client";

import Link from "next/link";
import { useState } from "react";
import { moderationCases, type ModerationCase } from "@/lib/moderation-placeholder";
import { ptBR } from "@/lib/i18n";

type QueueState = "results" | "loading" | "empty" | "no_access";

const copy = ptBR.moderation;

function CaseCard({ moderationCase }: { moderationCase: ModerationCase }) {
  return (
    <article className={`admin-case-card admin-priority-${moderationCase.priority}`}>
      <header>
        <div className="admin-case-labels">
          <span className={`admin-priority-label admin-priority-label-${moderationCase.priority}`}>
            {copy.priorities[moderationCase.priority]}
          </span>
          <span className="admin-case-status">{copy.statuses[moderationCase.status]}</span>
        </div>
        <time>{moderationCase.submitted}</time>
      </header>
      <h2>{moderationCase.category}</h2>
      <p className="admin-case-account">{moderationCase.reportedAccount}</p>
      <p className="admin-case-summary">{moderationCase.summary}</p>
      <div className="admin-case-preview">
        <span aria-hidden="true">▧</span>
        <div><strong>{moderationCase.previewTitle}</strong><p>{moderationCase.previewDescription}</p></div>
      </div>
      <Link href={`/admin/moderation/${moderationCase.id}`}>{copy.openCase}</Link>
    </article>
  );
}

function QueuePlaceholder({ state }: { state: Exclude<QueueState, "results"> }) {
  const stateCopy = copy.states[state];
  return (
    <div className={`admin-queue-placeholder admin-queue-placeholder-${state}`} role="status">
      <span aria-hidden="true">{stateCopy.symbol}</span>
      <h2>{stateCopy.title}</h2>
      <p>{stateCopy.description}</p>
    </div>
  );
}

export function ModerationQueue() {
  const [queueState, setQueueState] = useState<QueueState>("results");

  return (
    <section className="admin-moderation-page" aria-labelledby="moderation-queue-title">
      <header className="admin-page-heading">
        <div>
          <p className="section-kicker">{copy.eyebrow}</p>
          <h1 id="moderation-queue-title">{copy.queueTitle}</h1>
          <p>{copy.queueDescription}</p>
        </div>
        <div className="admin-queue-summary" aria-label={copy.summaryLabel}>
          <div><strong>2</strong><span>{copy.urgentCount}</span></div>
          <div><strong>{moderationCases.length}</strong><span>{copy.demoCount}</span></div>
        </div>
      </header>

      <div className="admin-safety-notice" role="note">
        <span aria-hidden="true">◇</span>
        <p><strong>{copy.safetyNoticeTitle}</strong>{copy.safetyNoticeDescription}</p>
      </div>

      <section className="admin-queue-controls" aria-label={copy.queueControlsLabel}>
        <label><span>{copy.filter}</span><select disabled defaultValue="all"><option value="all">{copy.allPriorities}</option></select></label>
        <label><span>{copy.statusFilter}</span><select disabled defaultValue="all"><option value="all">{copy.allStatuses}</option></select></label>
        <label><span>{copy.sort}</span><select disabled defaultValue="priority"><option value="priority">{copy.priorityFirst}</option></select></label>
        <button type="button" disabled>{copy.assign}</button>
      </section>

      <details className="admin-state-preview">
        <summary>{copy.states.preview}</summary>
        <div role="group" aria-label={copy.states.preview}>
          {([
            ["results", copy.states.resultsLabel],
            ["loading", copy.states.loading.label],
            ["empty", copy.states.empty.label],
            ["no_access", copy.states.no_access.label],
          ] as const).map(([id, label]) => (
            <button type="button" aria-pressed={queueState === id} onClick={() => setQueueState(id)} key={id}>{label}</button>
          ))}
        </div>
      </details>

      {queueState === "results" ? (
        <div className="admin-case-grid" aria-label={copy.caseListLabel}>
          {moderationCases.map((moderationCase) => <CaseCard moderationCase={moderationCase} key={moderationCase.id} />)}
        </div>
      ) : <QueuePlaceholder state={queueState} />}

      <p className="admin-placeholder-notice">{copy.placeholderNotice}</p>
    </section>
  );
}
