import type { ReactNode } from "react";

type StatusPanelProps = {
  actions?: ReactNode;
  message: string;
  title: string;
  tone: "error" | "success" | "waiting" | "info";
};

const icons = {
  error: "!",
  success: "✓",
  waiting: "…",
  info: "i",
};

export function StatusPanel({ actions, message, title, tone }: StatusPanelProps) {
  return (
    <section
      className={`status-panel status-panel-${tone}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <span className="status-symbol" aria-hidden="true">
        {icons[tone]}
      </span>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {actions ? <div className="status-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
