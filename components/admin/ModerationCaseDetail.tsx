"use client";

import Link from "next/link";
import { useState } from "react";
import type { ModerationCase } from "@/lib/moderation-placeholder";
import { ptBR } from "@/lib/i18n";

type DetailTab = "case" | "appeal" | "audit";

const copy = ptBR.moderation;

export function ModerationCaseDetail({ moderationCase }: { moderationCase: ModerationCase }) {
  const [activeTab, setActiveTab] = useState<DetailTab>("case");

  return (
    <section className="admin-case-detail" aria-labelledby="moderation-case-title">
      <Link className="admin-back-link" href="/admin/moderation"><span aria-hidden="true">←</span>{copy.backToQueue}</Link>

      <header className="admin-case-detail-heading">
        <div>
          <div className="admin-case-labels">
            <span className={`admin-priority-label admin-priority-label-${moderationCase.priority}`}>{copy.priorities[moderationCase.priority]}</span>
            <span className="admin-case-status">{copy.statuses[moderationCase.status]}</span>
          </div>
          <p className="section-kicker">{copy.caseEyebrow}</p>
          <h1 id="moderation-case-title">{moderationCase.category}</h1>
          <p>{moderationCase.summary}</p>
        </div>
        <div className="admin-case-id"><span>{copy.caseReference}</span><strong>{moderationCase.id}</strong></div>
      </header>

      <section className="admin-case-actions" aria-label={copy.caseActionsLabel}>
        {([
          copy.assign,
          copy.quarantine,
          copy.warn,
          copy.restrict,
          copy.suspend,
          copy.ban,
          copy.dismiss,
          copy.escalate,
        ] as const).map((label) => <button type="button" disabled key={label}>{label}</button>)}
      </section>

      <div className="admin-detail-tabs" role="tablist" aria-label={copy.detailTabsLabel}>
        {([
          ["case", copy.tabs.case],
          ["appeal", copy.tabs.appeal],
          ["audit", copy.tabs.audit],
        ] as const).map(([id, label]) => (
          <button
            type="button"
            role="tab"
            id={`admin-tab-${id}`}
            aria-controls={`admin-panel-${id}`}
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            key={id}
          >{label}</button>
        ))}
      </div>

      <div id="admin-panel-case" role="tabpanel" aria-labelledby="admin-tab-case" hidden={activeTab !== "case"}>
        <div className="admin-case-layout">
          <div className="admin-case-main">
            <section className="admin-detail-card admin-content-preview">
              <header><div><p className="admin-card-label">{copy.reportedContent}</p><h2>{moderationCase.previewTitle}</h2></div><span>{copy.textOnly}</span></header>
              <div className="admin-content-withheld"><span aria-hidden="true">▧</span><p>{moderationCase.previewDescription}</p></div>
              <p className="admin-safe-preview-note">{copy.previewSafetyNote}</p>
            </section>

            <section className="admin-detail-card">
              <p className="admin-card-label">{copy.evidenceSummary}</p>
              <h2>{copy.evidenceTitle}</h2>
              <dl className="admin-evidence-list">
                {moderationCase.evidence.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
              </dl>
            </section>
          </div>

          <aside className="admin-case-sidebar">
            <section className="admin-detail-card">
              <p className="admin-card-label">{copy.caseContext}</p>
              <h2>{copy.reportDetails}</h2>
              <dl className="admin-context-list">
                <div><dt>{copy.reportedItem}</dt><dd>{moderationCase.reportedAccount}</dd></div>
                <div><dt>{copy.received}</dt><dd>{moderationCase.submitted}</dd></div>
                <div><dt>{copy.priority}</dt><dd>{copy.priorities[moderationCase.priority]}</dd></div>
                <div><dt>{copy.status}</dt><dd>{copy.statuses[moderationCase.status]}</dd></div>
              </dl>
            </section>

            <section className="admin-detail-card">
              <p className="admin-card-label">{copy.caseHistory}</p>
              <h2>{copy.historyTitle}</h2>
              <ol className="admin-history-list">
                {moderationCase.history.map((item) => <li key={`${item.time}-${item.title}`}><time>{item.time}</time><strong>{item.title}</strong><p>{item.description}</p></li>)}
              </ol>
            </section>
          </aside>
        </div>
      </div>

      <div id="admin-panel-appeal" role="tabpanel" aria-labelledby="admin-tab-appeal" hidden={activeTab !== "appeal"}>
        <section className="admin-detail-card admin-appeal-panel">
          <span aria-hidden="true">↺</span>
          <div><p className="admin-card-label">{copy.appealStatus}</p><h2>{copy.appealStates[moderationCase.appeal.state]}</h2><p>{moderationCase.appeal.summary}</p></div>
          <button type="button" disabled>{copy.reviewAppeal}</button>
        </section>
      </div>

      <div id="admin-panel-audit" role="tabpanel" aria-labelledby="admin-tab-audit" hidden={activeTab !== "audit"}>
        <section className="admin-detail-card admin-audit-placeholder">
          <span aria-hidden="true">≡</span>
          <h2>{copy.auditTitle}</h2>
          <p>{copy.auditDescription}</p>
        </section>
      </div>

      <p className="admin-placeholder-notice">{copy.detailPlaceholderNotice}</p>
    </section>
  );
}
