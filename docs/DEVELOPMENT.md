# Development

## Prerequisites

- Node.js 22.13 or newer
- npm, using the committed `package-lock.json`

Phase 1 requires a D1 binding named `DB`. Set `VERIFICATION_PROVIDER_MODE=sandbox`; no production identity provider, email provider, object storage, or payment provider is connected.

## Setup

```bash
npm install
npm run dev
```

Use the local URL printed by vinext. The development server runs the App Router through Vite and a local Cloudflare-compatible runtime.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development with hot reload |
| `npm run build` | Compile the Cloudflare Worker application into `dist/` |
| `npm run start` | Run the compiled application locally |
| `npm run lint` | Run ESLint across source files |
| `npm run typecheck` | Run strict TypeScript validation without emitting files |
| `npm test` | Build, then run rendered route-shell tests |
| `npm run db:generate` | Generate Drizzle migrations after an approved schema change |

Apply `drizzle/0000_skinny_hellcat.sql` to a new local or hosted D1 database before testing account flows. The migration creates the lookup rows required by registration.

## Safe change workflow

1. Confirm the approved milestone and its explicit exclusions.
2. Read the relevant product and route sections in `docs/`.
3. Update `docs/PROJECT_STATUS.md` as implementation status changes.
4. Add visible pt-BR copy to `lib/i18n.ts`.
5. Reuse the existing shell, surfaces, and design tokens.
6. Keep demonstration content safe, abstract, and non-explicit.
7. Add or update a rendered-route test.
8. Run `npm run lint` and `npm test`.
9. Update any affected architecture, route, design, or decision documentation before handoff.

## Adding a route shell

- Public routes live directly under `app/`.
- Routes that use the shared application shell live under `app/(app)/`.
- Dynamic product notation such as `/profile/:handle` maps to a `[handle]` folder.
- Use `PagePlaceholder` or `PublicPlaceholder` when reserving a route without implementing its feature.
- Do not create a `/create` page; Create is a global modal or sheet.

## Adding interactive shell state

Use local React state only when the milestone explicitly calls for a non-persistent demonstration. Make the limitation visible in copy and document it in `PROJECT_STATUS.md`. Do not silently treat browser-local behavior as finished application logic.

Before adding persistence, define:

- record ownership
- visibility and permission rules
- deletion and retention behavior
- moderation implications
- exact-versus-approximate location handling
- tests for prohibited access

Only then should `.openai/hosting.json`, `db/schema.ts`, or R2 storage be changed.

## Testing

Rendered tests exercise the compiled Worker rather than a separate browser server. Add assertions for stable product contracts, not incidental markup.

Examples of good contracts:

- exact number of primary navigation or feed-tab choices
- expected public labels and links
- disabled state for future actions
- absence of disallowed account classes in a single-class milestone
- continued placeholder status for routes intentionally deferred

Future business logic needs direct unit and integration tests in addition to rendered-route checks.

## Deployment

The project is configured for OpenAI Sites through `.openai/hosting.json`. The Vite build produces a Cloudflare Worker-compatible bundle, and the Sites build integration packages hosting metadata and Drizzle migrations.

Current hosted preview:

`https://fervo-social-preview.ai-workplace-3970.chatgpt.site/`

Do not edit `dist/` directly. Build from source and deploy the validated output. D1 is declared as `DB`; R2 remains disabled. Deployment and migration application are separate authorized operations and were not performed during Phase 1.

## Repository state

The canonical repository is [FervoSocial/Site](https://github.com/FervoSocial/Site). GitHub access was verified on 21 July 2026:

- visibility: public
- default branch: `main`
- remote content: empty
- import permission: approved by the project owner
- current blocker: the installed GitHub integration can read the repository but receives `Resource not accessible by integration` when writing repository contents

The local workspace contains the implemented application but does not contain a normal `.git` directory. Retry the complete initial import only after the GitHub integration has repository-content write access. Publishing documentation alone would create a misleading repository because the documents describe application code that is not yet present remotely.

## Documentation checklist for every change

- Does `PROJECT_STATUS.md` still describe reality?
- Did a route, tab, action, or placeholder change?
- Did component ownership or state location change?
- Did a token, breakpoint, or asset change?
- Did setup, a dependency, a command, or hosting behavior change?
- Was a product exception approved that belongs in `DECISIONS_AND_GAPS.md`?
