# Fervo Social

Fervo Social is a Brazil-first, adults-only social discovery platform for people, couples, groups, clubs, event organisers, and verified professionals. The product combines a simple vertical feed with profiles, discovery, events, and consent-based private communication.

Canonical GitHub repository: [FervoSocial/Site](https://github.com/FervoSocial/Site)

This repository currently contains the responsive front-end shells and safe placeholder experiences for the first product milestones. It does **not** yet contain production authentication, identity verification, persistent user data, uploads, messaging, payments, ranking, or moderation integrations.

## Start here

1. Read [Project status](docs/PROJECT_STATUS.md) to understand what is implemented and what is still a placeholder.
2. Read [Product and routes](docs/PRODUCT_AND_ROUTES.md) for product boundaries, account types, navigation, and route ownership.
3. Read [Architecture](docs/ARCHITECTURE.md) before changing application structure.
4. Read [Development](docs/DEVELOPMENT.md) for setup and validation commands.
5. Read [Decisions and gaps](docs/DECISIONS_AND_GAPS.md) before implementing data, identity, safety, billing, or professional features.

The full documentation index is in [docs/README.md](docs/README.md).

## Current product surface

- Public landing page at `/`
- Authentication and age-verification UX shells
- Shared authenticated application shell with exactly five navigation items
- Home feed shell with three feed tabs
- Private Member profile shell at `/profile/:handle`
- Placeholder routes for Explore, Messages, Events, and account management

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
- Prices and promotions must come from configuration or persistent data, never from UI components.
- Legal, payment-provider, professional-commercial, identity-verification, and moderation decisions are launch gates, not assumptions to invent in code.

## Documentation maintenance

Documentation is a first-class deliverable. Every change that affects routes, behavior, architecture, commands, visual tokens, product decisions, or implementation status must update the relevant file under `docs/` in the same change.
