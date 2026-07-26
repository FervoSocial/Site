import Link from "next/link";
import { placeholderThread } from "@/lib/messages-placeholder";
import { ptBR } from "@/lib/i18n";

const unavailableActions = [
  ["mute", "◌"],
  ["archive", "□"],
  ["report", "!"],
  ["mediaPermission", "◇"],
] as const;

export function ConversationThread() {
  return (
    <section className="conversation-shell" aria-labelledby="conversation-title">
      <Link className="conversation-back" href="/messages">
        <span aria-hidden="true">←</span>
        {ptBR.messages.thread.back}
      </Link>

      <div className="conversation-card">
        <header className="conversation-header">
          <span className="message-avatar" aria-hidden="true">LC</span>
          <div className="conversation-person">
            <p>{ptBR.messages.thread.accountLabel}</p>
            <h1 id="conversation-title">{ptBR.messages.thread.name}</h1>
            <small>{ptBR.messages.thread.location}</small>
          </div>
          <div className="conversation-actions" aria-label={ptBR.messages.thread.actionsLabel}>
            {unavailableActions.map(([key, icon]) => (
              <button type="button" disabled title={ptBR.messages.thread.unavailable} key={key}>
                <span aria-hidden="true">{icon}</span>
                {ptBR.messages.thread.actions[key]}
              </button>
            ))}
          </div>
        </header>

        <div className="conversation-safety-note">
          <span aria-hidden="true">◇</span>
          <p>{ptBR.messages.thread.safetyNotice}</p>
        </div>

        <div className="conversation-log" role="log" aria-label={ptBR.messages.thread.logLabel} aria-live="polite">
          <p className="conversation-day">{ptBR.messages.thread.dayLabel}</p>
          {placeholderThread.map((message) => (
            <article
              className={`conversation-bubble conversation-bubble-${message.author}`}
              key={message.id}
            >
              <p>{message.body}</p>
              <time>{message.time}</time>
            </article>
          ))}
        </div>

        <form className="conversation-composer">
          <label htmlFor="conversation-message">{ptBR.messages.thread.composerLabel}</label>
          <div>
            <textarea
              id="conversation-message"
              rows={2}
              placeholder={ptBR.messages.thread.composerPlaceholder}
            />
            <button type="submit" disabled title={ptBR.messages.thread.unavailable}>
              {ptBR.messages.thread.send}
            </button>
          </div>
          <p>{ptBR.messages.thread.composerNotice}</p>
        </form>
      </div>
    </section>
  );
}
