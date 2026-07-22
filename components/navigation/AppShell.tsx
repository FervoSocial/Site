"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ptBR } from "@/lib/i18n";

type AppShellProps = {
  children: ReactNode;
};

type NavItem = {
  label: string;
  href?: string;
  icon: string;
  match?: string[];
  action?: "create";
};

const navItems: NavItem[] = [
  { label: ptBR.navigation.home, href: "/home", icon: "⌂", match: ["/home", "/event"] },
  { label: ptBR.navigation.explore, href: "/explore", icon: "◇", match: ["/explore"] },
  { label: ptBR.navigation.create, icon: "+", action: "create" },
  { label: ptBR.navigation.messages, href: "/messages", icon: "✉", match: ["/messages"] },
  { label: ptBR.navigation.profile, href: "/me", icon: "●", match: ["/me", "/profile"] },
];

function Navigation({
  pathname,
  onCreate,
  className,
}: {
  pathname: string;
  onCreate: () => void;
  className: string;
}) {
  return (
    <nav className={className} aria-label="Navegação principal">
      {navItems.map((item) => {
        const active = item.match?.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`),
        );
        const content = (
          <>
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </>
        );

        if (item.action === "create") {
          return (
            <button className="nav-item nav-item-create" type="button" onClick={onCreate} key={item.label}>
              {content}
            </button>
          );
        }

        return (
          <Link
            className="nav-item"
            href={item.href ?? "/home"}
            aria-current={active ? "page" : undefined}
            key={item.label}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="app-brand" href="/home" aria-label="Fervo Social — Home">
          Fervo<span>Social</span>
        </Link>

        <button className="location-mode" type="button" aria-label="Alterar modo de localização">
          <span aria-hidden="true">⌖</span>
          {ptBR.shell.approximateLocation}
        </button>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label={ptBR.shell.search}>
            <span aria-hidden="true">⌕</span>
          </button>
          <button className="icon-button" type="button" aria-label={ptBR.shell.notifications}>
            <span aria-hidden="true">◌</span>
          </button>
          <button className="discreet-exit" type="button">
            {ptBR.shell.discreetExit}
          </button>
          <Link className="header-avatar" href="/me" aria-label={ptBR.navigation.profile}>
            FS
          </Link>
        </div>
      </header>

      <Navigation
        pathname={pathname}
        onCreate={() => setCreateOpen(true)}
        className="desktop-navigation"
      />

      <main className="app-content">{children}</main>

      <Navigation
        pathname={pathname}
        onCreate={() => setCreateOpen(true)}
        className="bottom-navigation"
      />

      {createOpen ? (
        <div className="sheet-backdrop" role="presentation" onMouseDown={() => setCreateOpen(false)}>
          <section
            className="create-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-sheet-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sheet-handle" aria-hidden="true" />
            <p className="section-kicker">{ptBR.common.foundation}</p>
            <h2 id="create-sheet-title">{ptBR.shell.createTitle}</h2>
            <p>{ptBR.shell.createDescription}</p>
            <button className="sheet-close" type="button" onClick={() => setCreateOpen(false)} autoFocus>
              {ptBR.shell.close}
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}
