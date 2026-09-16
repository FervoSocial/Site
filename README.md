# Fervo Social

Fervo Social is a Brazil-first, adults-only social discovery and community platform for individually verified adults, linked shared profiles, clubs, event organisers, and verified independent professionals. The product combines a modern mixed vertical feed with local discovery, profiles, events, consent-based private communication, private media, reviews, commercial plans, and safety systems.

Canonical GitHub repository: [FervoSocial/Site](https://github.com/FervoSocial/Site)

The current controlled implementation baseline is `phase1/clean-baseline` at commit `bc7208c74c689555fb6eb2f7043816c28618f814`. It contains a real Phase 1 account/session foundation and polished shell/demo experiences for most social modules. Production identity verification, transactional email, real uploads/media permissions, live messaging, payments, ranking, referrals, and moderation operations are not implemented.

## Start here

Read the [16 September Product Owner delta](docs/source-of-truth/07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) first. It overrides only its explicit changes to the August pack. The approved documentation checkpoint is `phase2/source-of-truth` at `ae16985f32b939c591372f141ffa9ff8493b7890`; the Phase 1 implementation baseline above remains unchanged.

**Approved target, not yet implemented:** one Feed with Public, Nearby/Distance and Friends views; launch destinations Home/Feed, Create, Clubs & Events, Messages, public Profile, and Health / Safety / Advice. Explore leaves permanent navigation; Professionals are deferred from launch. Profile settings are secondary. Ordinary posts support text/images/short video, with no separate Reels product. Subtle accessible gold-flame motion is required; member health-status claims are excluded.

1. Read the [current source-of-truth pack](docs/source-of-truth/00_READ_ME_FIRST.md).
2. Read the [current decision register](docs/source-of-truth/02_CURRENT_DECISIONS.md) before making product or commercial assumptions.
3. Read [Project status](docs/PROJECT_STATUS.md) to distinguish implemented foundations from shell/demo functionality.
4. Read the [build plan](docs/source-of-truth/03_BUILD_PLAN.md) and [workflow](docs/source-of-truth/05_WORKFLOW.md) before starting a pass.
5. Read [Product and routes](docs/PRODUCT_AND_ROUTES.md), [Architecture](docs/ARCHITECTURE.md), and [Development](docs/DEVELOPMENT.md) for implementation evidence and local conventions.

The full documentation index is in [docs/README.md](docs/README.md).

## Recreate the development checkout

Use the current source-of-truth branch when moving development to another computer:

```bash
git clone --branch phase2/source-of-truth --single-branch https://github.com/FervoSocial/Site.git
cd Site
npm ci
npm run dev
```

Node.js 22.13 or newer is required. Keep local environment files outside Git; the safe development setting currently documented in `.env.example` is `VERIFICATION_PROVIDER_MODE=sandbox`. Account-flow testing also requires the committed migration at `drizzle/0000_skinny_hellcat.sql` to be applied to the local D1 database, as described in [Development](docs/DEVELOPMENT.md).

## Current implemented product surface (older shell, not the revised target)

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
- Launch navigation follows the September handover; the existing five-item navigation is implementation drift, not a permanent rule.
- Create opens a modal or sheet, not a top-level page.
- Locations shown to members must remain approximate.
- No public chatrooms or webcam rooms.
- No unsolicited media; future media permissions must be explicit and revocable.
- Never seed the project with explicit media.
- Current commercial authority is [commercial configuration v1.3](docs/source-of-truth/config/commercial-config.json). Prices and promotions must come from configuration or persistent data, never from UI components.
- Legal, payment-provider, professional-commercial, identity-verification, and moderation decisions are launch gates, not assumptions to invent in code.

## Documentation maintenance

Documentation is a first-class deliverable. Every change that affects routes, behaviour, architecture, commands, visual tokens, product decisions, commercial rules, or implementation status must update the relevant current source/living document in the same change. Historical v1.1 files are retained only as superseded context; see [Superseded sources](docs/SUPERSEDED_SOURCES.md).
