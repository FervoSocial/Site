"use client";

import Link from "next/link";
import { useState } from "react";
import {
  placeholderConversations,
  placeholderRequests,
  type PlaceholderConversation,
  type PlaceholderRequest,
} from "@/lib/messages-placeholder";
import { ptBR } from "@/lib/i18n";

type InboxTab = "conversations" | "requests";
type ListState = "results" | "loading" | "empty";
type RequestState = "active" | "accepted" | "declined" | "blocked";

function ConversationItem({ conversation }: { conversation: PlaceholderConversation }) {
  return (
    <li>
      <Link className="message-list-item" href={`/messages/${conversation.id}`}>
        <span className="message-avatar" aria-hidden="true">
          {conversation.initials}
        </span>
        <span className="message-list-copy">
          <span className="message-list-heading">
            <strong>{conversation.name}</strong>
            <small>{conversation.time}</small>
          </span>
          <span className="message-account-label">{conversation.accountLabel}</span>
          <span className="message-preview">{conversation.preview}</span>
        </span>
        {conversation.unread > 0 ? (
          <span className="message-unread" aria-label={`${conversation.unread} mensagens novas`}>
            {conversation.unread}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

function RequestCard({ request }: { request: PlaceholderRequest }) {
  const [state, setState] = useState<RequestState>("active");
  const statusCopy = state === "active" ? null : ptBR.messages.requests.status[state];

  return (
    <article className="message-request-card">
      <header>
        <span className="message-avatar" aria-hidden="true">
          {request.initials}
        </span>
        <div>
          <h2>{request.name}</h2>
          <p>{request.accountLabel}</p>
          <small>{request.location}</small>
        </div>
        <time>{request.time}</time>
      </header>
      <blockquote>{request.introduction}</blockquote>

      {state === "active" ? (
        <div className="message-request-actions" aria-label={ptBR.messages.requests.actionsLabel}>
          <button className="message-request-accept" type="button" onClick={() => setState("accepted")}>
            {ptBR.messages.requests.accept}
          </button>
          <button type="button" onClick={() => setState("declined")}>
            {ptBR.messages.requests.decline}
          </button>
          <button type="button" onClick={() => setState("blocked")}>
            {ptBR.messages.requests.block}
          </button>
        </div>
      ) : (
        <div className="message-request-status" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <p>{statusCopy}</p>
          <button type="button" onClick={() => setState("active")}>
            {ptBR.messages.requests.reset}
          </button>
        </div>
      )}
    </article>
  );
}

function LoadingList() {
  return (
    <div className="messages-list-state" role="status" aria-live="polite">
      <span className="messages-spinner" aria-hidden="true" />
      <h2>{ptBR.messages.states.loadingTitle}</h2>
      <p>{ptBR.messages.states.loadingDescription}</p>
    </div>
  );
}

function EmptyList({ onReset }: { onReset: () => void }) {
  return (
    <div className="messages-list-state" role="status">
      <span className="messages-state-symbol" aria-hidden="true">✉</span>
      <h2>{ptBR.messages.states.emptyTitle}</h2>
      <p>{ptBR.messages.states.emptyDescription}</p>
      <button type="button" onClick={onReset}>{ptBR.messages.states.emptyAction}</button>
    </div>
  );
}

export function MessagesInbox() {
  const [activeTab, setActiveTab] = useState<InboxTab>("conversations");
  const [listState, setListState] = useState<ListState>("results");

  function switchTab(tab: InboxTab) {
    setActiveTab(tab);
    setListState("results");
  }

  return (
    <section className="messages-shell" aria-labelledby="messages-title">
      <header className="messages-heading">
        <p className="section-kicker">{ptBR.messages.eyebrow}</p>
        <h1 id="messages-title">{ptBR.messages.title}</h1>
        <p>{ptBR.messages.description}</p>
      </header>

      <div className="messages-search">
        <label htmlFor="messages-search">{ptBR.messages.search.label}</label>
        <div>
          <span aria-hidden="true">⌕</span>
          <input id="messages-search" type="search" placeholder={ptBR.messages.search.placeholder} />
        </div>
        <p>{ptBR.messages.search.notice}</p>
      </div>

      <div className="messages-inbox-layout">
        <section className="messages-list-panel" aria-label={ptBR.messages.inboxLabel}>
          <div className="messages-tabs" role="tablist" aria-label={ptBR.messages.tabs.label}>
            <button
              id="messages-tab-conversations"
              type="button"
              role="tab"
              aria-selected={activeTab === "conversations"}
              aria-controls="messages-panel-conversations"
              onClick={() => switchTab("conversations")}
            >
              {ptBR.messages.tabs.conversations}
            </button>
            <button
              id="messages-tab-requests"
              type="button"
              role="tab"
              aria-selected={activeTab === "requests"}
              aria-controls="messages-panel-requests"
              onClick={() => switchTab("requests")}
            >
              {ptBR.messages.tabs.requests}
              <span>{placeholderRequests.length}</span>
            </button>
          </div>

          <details className="messages-state-preview">
            <summary>{ptBR.messages.states.preview}</summary>
            <div>
              <button type="button" aria-pressed={listState === "results"} onClick={() => setListState("results")}>
                {ptBR.messages.states.resultsLabel}
              </button>
              <button type="button" aria-pressed={listState === "loading"} onClick={() => setListState("loading")}>
                {ptBR.messages.states.loadingLabel}
              </button>
              <button type="button" aria-pressed={listState === "empty"} onClick={() => setListState("empty")}>
                {ptBR.messages.states.emptyLabel}
              </button>
            </div>
          </details>

          {listState === "loading" ? <LoadingList /> : null}
          {listState === "empty" ? <EmptyList onReset={() => setListState("results")} /> : null}
          {listState === "results" ? (
            <>
              <div
                id="messages-panel-conversations"
                role="tabpanel"
                aria-labelledby="messages-tab-conversations"
                hidden={activeTab !== "conversations"}
              >
              <ul className="message-list">
                {placeholderConversations.map((conversation) => (
                  <ConversationItem conversation={conversation} key={conversation.id} />
                ))}
              </ul>
              </div>
              <div
                id="messages-panel-requests"
                role="tabpanel"
                aria-labelledby="messages-tab-requests"
                hidden={activeTab !== "requests"}
              >
                <div className="message-request-list">
                  {placeholderRequests.map((request) => (
                    <RequestCard request={request} key={request.id} />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </section>

        <aside className="messages-no-selection" aria-label={ptBR.messages.states.noConversationTitle}>
          <span aria-hidden="true">✉</span>
          <h2>{ptBR.messages.states.noConversationTitle}</h2>
          <p>{ptBR.messages.states.noConversationDescription}</p>
        </aside>
      </div>
    </section>
  );
}
