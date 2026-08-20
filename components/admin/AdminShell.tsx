import Link from "next/link";
import type { ReactNode } from "react";
import { ptBR } from "@/lib/i18n";

export function AdminShell({ children }: { children: ReactNode }) {
  const copy = ptBR.moderation.admin;

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <Link className="admin-brand" href="/admin/moderation" aria-label={copy.homeLabel}>
          <span className="admin-brand-name">Fervo<span>Social</span></span>
          <span className="admin-brand-badge">{copy.badge}</span>
        </Link>
        <div className="admin-header-context">
          <span className="admin-demo-status"><span aria-hidden="true" />{copy.demoStatus}</span>
          <Link href="/home">{copy.leave}</Link>
        </div>
      </header>
      <main className="admin-content">{children}</main>
    </div>
  );
}
