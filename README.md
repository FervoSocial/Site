# Fervo Social

Fervo Social is a Brazil-first, adults-only social discovery and community platform for individually verified adults, linked shared profiles, clubs, event organisers, and verified independent professionals. The product combines a modern mixed vertical feed with local discovery, profiles, events, consent-based private communication, private media, reviews, commercial plans, and safety systems.

Canonical GitHub repository: [FervoSocial/Site](https://github.com/FervoSocial/Site)

The current controlled implementation baseline is `phase1/clean-baseline` at commit `bc7208c74c689555fb6eb2f7043816c28618f814`. It contains a real Phase 1 account/session foundation and polished shell/demo experiences for most social modules. Production identity verification, transactional email, real uploads/media permissions, live messaging, payments, ranking, referrals, and moderation operations are not implemented.

## Start here

1. Read the [current source-of-truth pack](docs/source-of-truth/00_READ_ME_FIRST.md).
2. Read the [current decision register](docs/source-of-truth/02_CURRENT_DECISIONS.md) before making product or commercial assumptions.
3. Read [Project status](docs/PROJECT_STATUS.md) to distinguish implemented foundations from shell/demo functionality.
4. Read the [build plan](docs/source-of-truth/03_BUILD_PLAN.md) and [workflow](docs/source-of-truth/05_WORKFLOW.md) before starting a pass.
5. Read [Product and routes](docs/PRODUCT_AND_ROUTES.md), [Architecture](docs/ARCHITECTURE.md), and [Development](docs/DEVELOPMENT.md) for implementation evidence and local conventions.

The full documentation index is in [docs/README.md](docs/README.md).

## Current product surface

- Public landing page at `/`
- Persistent password/session foundation and sandbox-only verification-state flow
- Shared authenticated application shell with exactly five navigation items
- Home feed shell with three feed tabs
- Private Member profile shell at `/profile/:handle`
- Galleries shell inside the Private Member Mídia tab
- Explore shell with profile, club, event, and professional category routes
- Messages inbox, request, and placeholder conversation shells
- Shared Club/Business and Event Organiser profile shells
- Event detail shell with links from Explore
- Professional profile shell with safe abstract portfolio placeholders
- Embedded Reviews shell for organisations, Professionals, and events
- Placeholder account-management route

Hosted preview: [fervo-social-preview.ai-workplace-3970.chatgpt.site](https://fervo-social-preview.ai-workplace-3970.chatgpt.site/)

## Local development

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run dev
```

Before handing off a change:

```bash
npm run lint
npm test
```

`npm test` performs the production build and then checks the rendered route shells. See [Development](docs/DEVELOPMENT.md) for details.

## Non-negotiable product rules

- Brazilian Portuguese is the default interface language.
- Dark mode is the default, with purple as the primary accent and gold as a secondary atmospheric accent.
- Authenticated navigation contains exactly: Home, Explore, Create, Messages, and Profile.
- Create opens a modal or sheet, not a top-level page.
- Locations shown to members must remain approximate.
- No public chatrooms or webcam rooms.
- No unsolicited media; future media permissions must be explicit and revocable.
- Never seed the project with explicit media.
- Current commercial authority is [commercial configuration v1.3](docs/source-of-truth/config/commercial-config.json). Prices and promotions must come from configuration or persistent data, never from UI components.
- Legal, payment-provider, professional-commercial, identity-verification, and moderation decisions are launch gates, not assumptions to invent in code.

## Documentation maintenance

Documentation is a first-class deliverable. Every change that affects routes, behaviour, architecture, commands, visual tokens, product decisions, commercial rules, or implementation status must update the relevant current source/living document in the same change. Historical v1.1 files are retained only as superseded context; see [Superseded sources](docs/SUPERSEDED_SOURCES.md).
