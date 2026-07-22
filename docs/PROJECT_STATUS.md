# Project status

Last verified against the codebase: **21 July 2026**.

## Repository synchronization

The canonical GitHub repository is `FervoSocial/Site`, with default branch `main`. It was verified on 21 July 2026 and is currently empty. The initial full-workspace import was explicitly approved on 21 July 2026, but GitHub rejected the first write because the installed integration lacks repository-content write access. The implemented application and this documentation therefore remain local. Do not describe GitHub as synchronized until the integration is granted write access and the import completes.

## Current stage

The latest accepted product milestone is the **Private Member Profile Shell**. The next planned milestone is the **Explore Shell**; it has been defined but not built.

## Implemented

### Public experience

- `/` — approved public landing page with Fervo Social branding, dark matte background, purple neon identity, gold smoke artwork, a single entry action, and an 18+ notice.
- `/login` — accessible sign-in shell with local default, loading, error, and success states.
- `/register` — accessible registration shell with local states, account-type selection, age confirmation, and consent placeholders.
- `/forgot-password` — request shell with form, loading, error, and local confirmation states.
- `/verify-age` — required, pending, approved, failed, and retry UX states with no identity-provider integration.
- `/safety`, `/help`, and `/legal/:slug` — public placeholders.

### Shared application foundation

- Shared responsive application shell.
- Exactly five primary navigation items: Home, Explore, Create, Messages, Profile.
- Create opens a placeholder sheet.
- Desktop side navigation and mobile bottom navigation.
- Approximate-location label, search placeholder, notifications placeholder, discreet-exit placeholder, and account avatar placeholder.

### Home and feed shell

- `/home` contains one mobile-first vertical hybrid feed.
- Three tabs only: `Para você`, `Perto de você`, and `Seguindo`.
- Safe placeholder card types include member posts, status, event, professional, safety, and sponsored content.
- Events and Professionals are feed-card types, not feed tabs.
- Like, Save, and Follow use temporary component state only.
- Profile and event links open placeholder/detail routes.
- Comment, Message, and Report actions are visible but unavailable.

### Private Member profile shell

- `/profile/:handle` is implemented through `app/(app)/profile/[handle]/page.tsx`.
- One safe placeholder Private Member profile is rendered for every handle.
- Includes photo placeholder, display name, account-type label, approximate location, bio, statistics, and About/Media/Posts tabs.
- Follow and Save use temporary component state only.
- Nudge, Message, Report, and Block are visible disabled placeholders.
- `/me` remains a separate placeholder for future account management.
- No other profile class renderer is implemented.

## Placeholder-only routes

- `/explore`
- `/messages`
- `/messages/:threadId`
- `/event/:eventId`
- `/me`
- `/safety`
- `/help`
- `/legal/:slug`

## Not implemented

- Real authentication, sessions, password processing, or email delivery
- Real age or identity verification
- Persistent accounts, profiles, follows, likes, saves, or preferences
- Uploads, galleries, media permissions, or playback
- Feed ranking, live data, recommendations, or exact proximity
- Search, Explore filtering, maps, saved searches, or alerts
- Messaging, comments, group threads, or notifications
- Event RSVP or ticketing
- Profile editing or privacy controls
- Billing, subscriptions, promotions, or payments
- Production reporting, blocking, moderation, trust, or safety integrations
- Club/business, organiser, or professional profile renderers

## Next approved planning boundary

The Explore Shell may be built next at `/explore`. It should contain only search and browsing structure, safe placeholder results, basic filter controls, and non-persistent view state. Real discovery logic and backend work remain out of scope until separately approved.
