import Link from "next/link";
import type { ReactNode } from "react";
import { ptBR } from "@/lib/i18n";
import { Surface } from "@/components/ui/Surface";

type AuthFrameProps = {
  children: ReactNode;
  description: string;
  eyebrow?: string;
  footer?: ReactNode;
  pageClassName?: string;
  title: string;
};

export function AuthFrame({
  children,
  description,
  eyebrow = ptBR.auth.common.section,
  footer,
  pageClassName = "",
  title,
}: AuthFrameProps) {
  return (
    <main className={`auth-page ${pageClassName}`.trim()}>
      <header className="auth-header">
        <Link className="app-brand" href="/" aria-label="Fervo Social — início">
          Fervo<span>Social</span>
        </Link>
        <span className="auth-demo-label">{ptBR.auth.common.shellNotice}</span>
      </header>

      <Surface className="auth-card">
        <div className="auth-card-heading">
          <p className="section-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
        {footer ? <footer className="auth-card-footer">{footer}</footer> : null}
      </Surface>
    </main>
  );
}
