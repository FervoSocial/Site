"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ptBR } from "@/lib/i18n";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { TooltipButton } from "@/components/ui/TooltipButton";
import {
  FeedAtmosphereContext,
  type AtmosphereVariant,
} from "@/components/navigation/FeedAtmosphereContext";

type AppShellProps = {
  children: ReactNode;
};

type NavIconName = "home" | "create" | "clubsEvents" | "messages" | "profile" | "safety" | "more" | "search";

type NavItem = {
  label: string;
  href?: string;
  icon: NavIconName;
  match?: string[];
  action?: "create" | "more";
};

const desktopNavItems: NavItem[] = [
  { label: ptBR.navigation.home, href: "/home", icon: "home", match: ["/home"] },
  { label: ptBR.navigation.create, icon: "create", action: "create" },
  {
    label: ptBR.navigation.clubsEvents,
    href: "/clubs-events",
    icon: "clubsEvents",
    match: ["/clubs-events", "/explore/clubs", "/explore/events", "/event"],
  },
  { label: ptBR.navigation.messages, href: "/messages", icon: "messages", match: ["/messages"] },
  { label: ptBR.navigation.profile, href: "/me", icon: "profile", match: ["/me", "/profile"] },
  {
    label: ptBR.navigation.healthSafety,
    href: "/health-safety",
    icon: "safety",
    match: ["/health-safety"],
  },
];

const mobileNavItems: NavItem[] = [
  desktopNavItems[0],
  desktopNavItems[2],
  desktopNavItems[1],
  desktopNavItems[3],
  {
    label: ptBR.navigation.more,
    icon: "more",
    action: "more",
    match: ["/me", "/profile", "/health-safety", "/explore/profiles"],
  },
];

const atmosphereVideos: Record<AtmosphereVariant, string> = {
  kling: "/fervo-gold-smoke-kling-2-5.mp4",
  seedance: "/fervo-gold-smoke-seedance-2-5-h264.mp4",
};
const atmospherePoster = "/fervo-gold-smoke-v2.png";
const atmosphereVariants: AtmosphereVariant[] = ["kling", "seedance"];

function AppAtmosphere({ requestedVariant }: { requestedVariant: AtmosphereVariant }) {
  const videoRefs = useRef<Record<AtmosphereVariant, HTMLVideoElement | null>>({
    kling: null,
    seedance: null,
  });
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [visibleVariant, setVisibleVariant] = useState<AtmosphereVariant>("kling");
  const [videoReady, setVideoReady] = useState<Record<AtmosphereVariant, boolean>>({
    kling: false,
    seedance: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setMotionAllowed(!reducedMotion.matches);
      if (reducedMotion.matches) {
        setVideoReady({ kling: false, seedance: false });
        setVisibleVariant("kling");
      }
    };

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);
    return () => reducedMotion.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!motionAllowed) {
      atmosphereVariants.forEach((variant) => {
        const video = videoRefs.current[variant];
        if (!video) return;
        video.pause();
        video.currentTime = 0;
        video.load();
      });
      return;
    }

    const video = videoRefs.current[requestedVariant];
    if (!video) return;

    let cancelled = false;
    void video
      .play()
      .then(() => {
        if (cancelled) return;
        setVideoReady((current) => ({ ...current, [requestedVariant]: true }));
        setVisibleVariant(requestedVariant);
      })
      .catch(() => {
        if (cancelled) return;
        setVideoReady((current) => ({ ...current, [requestedVariant]: false }));
      });

    return () => {
      cancelled = true;
    };
  }, [motionAllowed, requestedVariant]);

  useEffect(() => {
    if (!motionAllowed) return;

    const timer = window.setTimeout(() => {
      if (requestedVariant !== visibleVariant) return;
      const inactiveVariant = visibleVariant === "kling" ? "seedance" : "kling";
      videoRefs.current[inactiveVariant]?.pause();
    }, 760);

    return () => window.clearTimeout(timer);
  }, [motionAllowed, requestedVariant, visibleVariant]);

  function handlePlaying(variant: AtmosphereVariant) {
    setVideoReady((current) => ({ ...current, [variant]: true }));
    if (requestedVariant !== variant) videoRefs.current[variant]?.pause();
  }

  function handleError(variant: AtmosphereVariant) {
    setVideoReady((current) => ({ ...current, [variant]: false }));
  }

  return (
    <div
      className="app-atmosphere"
      data-motion={motionAllowed ? "video" : "static"}
      data-requested-background={requestedVariant}
      data-active-background={visibleVariant}
      data-kling-ready={videoReady.kling ? "true" : "false"}
      data-seedance-ready={videoReady.seedance ? "true" : "false"}
      aria-hidden="true"
    >
      {atmosphereVariants.map((variant) => {
        const sourceEnabled =
          motionAllowed &&
          (variant === "kling" || requestedVariant === "seedance" || videoReady.seedance);

        return (
          <video
            className={`app-atmosphere-video app-atmosphere-video-${variant}`}
            data-background={variant}
            ref={(element) => {
              videoRefs.current[variant] = element;
            }}
            autoPlay={motionAllowed && variant === "kling"}
            muted
            loop
            playsInline
            preload={sourceEnabled ? "auto" : "none"}
            poster={atmospherePoster}
            tabIndex={-1}
            onPlaying={() => handlePlaying(variant)}
            onError={() => handleError(variant)}
            key={variant}
          >
            {sourceEnabled ? <source src={atmosphereVideos[variant]} type="video/mp4" /> : null}
          </video>
        );
      })}
      <span className="app-atmosphere-shade" />
    </div>
  );
}

function NavigationIcon({ name }: { name: NavIconName }) {
  const paths: Record<NavIconName, ReactNode> = {
    home: <path d="M3.5 10.5 12 3.8l8.5 6.7v9.2h-6v-5.9h-5v5.9h-6z" />,
    create: <path d="M12 5v14M5 12h14" />,
    clubsEvents: (
      <>
        <path
          className="nav-clubs-heart"
          d="M4 3.1c.6 1.5 1.5 2.2 2.7 2.4C8.6 4.6 10.7 5.3 12 7c1.3-1.7 3.4-2.4 5.3-1.5 1.2-.2 2.1-.9 2.7-2.4.5 2.2-.1 4-1.3 5 .6 4.6-3.5 7.8-6.7 10-3.2-2.2-7.3-5.4-6.7-10C4.1 7.1 3.5 5.3 4 3.1Z"
        />
        <path className="nav-clubs-tail" d="M17.4 14.6c3.3 1.7 4 5.2 1.5 7.1-1.1.9-2.6.9-4 .2m1.8-1.5-1.8 1.5 2 .8" />
      </>
    ),
    messages: (
      <>
        <path className="nav-listening-face" d="M2.8 4.2c2.9.6 5.1 2.1 6.3 4.2l-1.9 1.4c1.2 1.4 1.3 3 .5 4.7l-3.2 1.7M4.5 16.2c.8.5 1.3 1.6 1.3 3.2" />
        <path className="nav-listening-ear" d="M16.2 20.2c-3-1.5-4.5-4.7-4.5-9.1 0-4.5 2-7.3 5.6-7.3 3 0 4.7 2.2 4.7 5.5 0 2.7-1.1 4.3-2.6 5.7-1 .9-1.4 2-1.5 3.5" />
        <path className="nav-listening-ear" d="M16.4 15.5c-1.1-1.2-1.6-3-1.6-5.2 0-2.4.8-3.8 2.5-3.8 1.4 0 2.2 1.1 2.2 2.9 0 1.6-.6 2.8-2 4" />
        <path className="nav-whisper-lines" d="M8.6 9.1h1.5m-1.8 2.5h1.8" />
      </>
    ),
    profile: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.7-4.2 3.2-6.3 7.5-6.3s6.8 2.1 7.5 6.3" /></>,
    safety: <path d="M12 3.2 20 6v5.6c0 5-2.7 8-8 10.2C6.7 19.6 4 16.6 4 11.6V6zM8.8 12l2.1 2.1 4.6-5" />,
    more: <><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

function Navigation({
  pathname,
  onCreate,
  onMore,
  moreOpen,
  className,
  items,
}: {
  pathname: string;
  onCreate: () => void;
  onMore?: () => void;
  moreOpen?: boolean;
  className: string;
  items: NavItem[];
}) {
  return (
    <nav className={className} aria-label="Navegação principal">
      {items.map((item) => {
        const active = item.match?.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`),
        );
        const content = (
          <>
            <span className="nav-icon">
              <NavigationIcon name={item.icon} />
            </span>
            <span className="nav-label" aria-hidden="true">{item.label}</span>
          </>
        );

        if (item.action) {
          const isMore = item.action === "more";
          return (
            <button
              className={`nav-item ${item.action === "create" ? "nav-item-create" : "nav-item-more"}`}
              type="button"
              onClick={isMore ? onMore : onCreate}
              aria-label={item.label}
              aria-expanded={isMore ? moreOpen : undefined}
              aria-controls={isMore ? "mobile-more-sheet" : undefined}
              data-active={active ? "true" : undefined}
              key={item.label}
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            className="nav-item"
            href={item.href ?? "/home"}
            aria-label={item.label}
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
  const router = useRouter();
  const [feedAtmosphere, setFeedAtmosphere] = useState<AtmosphereVariant>("kling");
  const [createOpen, setCreateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const requestedAtmosphere = pathname === "/home" ? feedAtmosphere : "kling";

  function openCreate() {
    setMoreOpen(false);
    setCreateOpen(true);
  }

  function openMore() {
    setCreateOpen(false);
    setMoreOpen(true);
  }

  return (
    <FeedAtmosphereContext.Provider value={setFeedAtmosphere}>
      <div className="app-shell">
        <AppAtmosphere requestedVariant={requestedAtmosphere} />
      <header className="app-header">
        <Link className="app-brand" href="/home" aria-label="Fervo Social — Home">
          Fervo<span>Social</span>
        </Link>

        <button className="location-mode" type="button" aria-label="Alterar modo de localização">
          <span aria-hidden="true">⌖</span>
          {ptBR.shell.approximateLocation}
        </button>

        <div className="header-actions">
          <TooltipButton
            className="icon-button"
            type="button"
            label={ptBR.shell.search}
            onClick={() => router.push("/explore/profiles")}
          >
            <NavigationIcon name="search" />
          </TooltipButton>
          <TooltipButton className="icon-button" type="button" label={ptBR.shell.notifications}>
            <span aria-hidden="true">◌</span>
          </TooltipButton>
          <LogoutButton className="discreet-exit" label={ptBR.shell.discreetExit} />
          <Link className="header-avatar" href="/me" aria-label={ptBR.navigation.profile}>
            FS
          </Link>
        </div>
      </header>

      <Navigation
        pathname={pathname}
        onCreate={openCreate}
        className="desktop-navigation"
        items={desktopNavItems}
      />

      <main className="app-content">{children}</main>

      <Navigation
        pathname={pathname}
        onCreate={openCreate}
        onMore={openMore}
        moreOpen={moreOpen}
        className="bottom-navigation"
        items={mobileNavItems}
      />

      {createOpen ? (
        <div
          className="sheet-backdrop"
          role="presentation"
          onMouseDown={() => setCreateOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setCreateOpen(false);
          }}
        >
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

      {moreOpen ? (
        <div
          className="sheet-backdrop"
          role="presentation"
          onMouseDown={() => setMoreOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setMoreOpen(false);
          }}
        >
          <section
            className="create-sheet mobile-more-sheet"
            id="mobile-more-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-more-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sheet-handle" aria-hidden="true" />
            <p className="section-kicker">{ptBR.navigation.more}</p>
            <h2 id="mobile-more-title">{ptBR.shell.moreTitle}</h2>
            <nav className="mobile-more-links" aria-label={ptBR.shell.moreTitle}>
              <Link href="/me" onClick={() => setMoreOpen(false)}>
                <span className="nav-icon"><NavigationIcon name="profile" /></span>
                <span><strong>{ptBR.navigation.profile}</strong><small>{ptBR.shell.profileNote}</small></span>
              </Link>
              <Link href="/health-safety" onClick={() => setMoreOpen(false)}>
                <span className="nav-icon"><NavigationIcon name="safety" /></span>
                <span><strong>{ptBR.navigation.healthSafety}</strong><small>{ptBR.shell.healthSafetyNote}</small></span>
              </Link>
              <Link href="/explore/profiles" onClick={() => setMoreOpen(false)}>
                <span className="nav-icon"><NavigationIcon name="search" /></span>
                <span><strong>{ptBR.shell.search}</strong><small>{ptBR.shell.searchNote}</small></span>
              </Link>
            </nav>
            <button className="sheet-close" type="button" onClick={() => setMoreOpen(false)} autoFocus>
              {ptBR.shell.close}
            </button>
          </section>
        </div>
      ) : null}
      </div>
    </FeedAtmosphereContext.Provider>
  );
}
