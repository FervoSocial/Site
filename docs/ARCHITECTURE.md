# Architecture

## Runtime and framework

- **Next.js 16 App Router** provides route and component conventions.
- **React 19** renders server and client components.
- **TypeScript 5** runs in strict mode with the `@/*` path alias.
- **vinext** compiles the Next-style application through **Vite 8** for Cloudflare Workers.
- **Cloudflare Workers** provide the deployed request runtime and image-optimisation endpoint.
- **Tailwind CSS 4** is imported, but the current interface is primarily authored with named classes in `app/globals.css` rather than utility classes.
- **Cloudflare D1** stores Phase 1 identity, session, verification, consent, privacy, and security records.
- **Drizzle ORM** defines the schema and generates versioned SQL migrations.

## Request path

1. `worker/index.ts` receives the request.
2. `/_vinext/image` requests are handled by the vinext image-optimisation bridge.
3. All other requests are delegated to the vinext App Router handler.
4. `app/layout.tsx` supplies global metadata, the `pt-BR` document language, Geist, and global CSS.
5. The Worker exposes its request environment to the application, including the D1 binding.
6. Routes inside `app/(app)` require an active, age-approved session before `AppShell` renders.
7. Routes inside `app/admin` additionally require the moderator or admin role, use a separate `AdminShell`, and do not inherit member navigation.

## Folder responsibilities

```text
app/                    Route entry points and layouts
  (app)/                Routes wrapped in the authenticated-looking app shell
  admin/                Separate fictional moderation-administration routes
components/
  admin/                Moderation queue, case detail, and separate admin shell
  auth/                 Login, registration, recovery, and age-verification shells
  discovery/            Shared Explore shell and temporary discovery controls
  events/               Event-detail shell
  feed/                 Home feed controller and reusable feed card
  messages/             Inbox and placeholder conversation-thread shells
  navigation/           Shared application shell and five-item navigation
  billing/              Configuration-driven Billing shell
  profile/              Private Member, organisation, Professional, and gallery shells
  reviews/              Shared embedded Reviews shell
  ui/                   Small shared surfaces, links, and placeholder layouts
lib/
  auth/                 Password, token, session, repository, validation, and permission rules
  privacy/policy.ts     Data classification, retention defaults, and approximate-location rules
  i18n.ts               Central pt-BR interface copy
  explore-placeholder.ts Typed safe Explore demonstration data
  feed-placeholder.ts   Typed safe feed demonstration data
  messages-placeholder.ts Typed safe conversation, request, and thread data
  gallery-placeholder.ts Typed safe abstract gallery demonstration data
  club-event-placeholder.ts Typed safe organisation and event demonstration data
  professional-placeholder.ts Typed safe Professional demonstration data
  reviews-placeholder.ts Typed safe context-specific review demonstration data
  billing-placeholder.ts Typed plan and period view data derived from commercial configuration
  moderation-placeholder.ts Typed safe fictional moderation cases
db/                     D1 access and the Phase 1 identity schema
drizzle/                Generated SQL migration and schema metadata
worker/                  Cloudflare Worker entry point
build/                   Sites packaging integration for build output
public/                  Static visual assets, including approved gold smoke
tests/                   Rendered-HTML route-shell tests
docs/                    Living engineering and product documentation
```

## Rendering and state boundaries

Components are server components unless they need interaction.

Current client components include:

- `AppShell` — current pathname highlighting and Create-sheet open state
- Authentication shells — submit to Phase 1 server endpoints and display safe local request states
- `FeedShell` — active feed tab plus temporary Like, Save, and Follow sets
- `ExploreShell` — category-specific discovery layout, search demonstration, result states, view choice, and non-persistent controls
- `MessagesInbox` — inbox tabs, reviewable list states, and temporary request actions
- `PrivateMemberProfile` — active profile tab plus temporary Follow and Save state
- `GalleryShell` — gallery section, review state, temporary access request, and item-preview state
- `OrganisationProfile` — shared Club/Business and Event Organiser renderer with temporary Follow, Save, and tab state
- `EventDetailShell` — one example event with temporary Interest and Save state
- `ProfessionalProfile` — one safe Professional renderer with temporary Follow, Save, tab, and private-request state
- `ReviewsShell` — shared embedded review summary, category ratings, placeholder entries, local Helpful/state previews, and disabled workflow controls
- `ModerationQueue` — local queue-state previews; filters, sorting, and assignment remain disabled
- `ModerationCaseDetail` — local tab selection across case, appeal, and audit placeholders; moderation actions remain disabled

Account, session, consent, verification, recovery-token, and privacy-default records are persistent in D1. Product content and shell interactions remain in React memory and are intentionally lost on refresh.

## Shared UI structure

- `AppShell` owns the global header, desktop navigation, mobile navigation, content region, and Create sheet.
- `Surface` is the base bordered dark container.
- `PagePlaceholder` is used for future authenticated routes.
- `PublicPlaceholder` is used for future public routes.
- `AuthFrame`, `FormField`, and `StatusPanel` provide consistent authentication-shell structure.
- `FeedCard` is a typed reusable base for all implemented feed-card variants.
- `ExploreShell` is shared by the base Explore page and four category routes; category pages pass only a typed category key.
- `MessagesInbox` owns the inbox and request demonstration state. `ConversationThread` is a server-rendered static thread shell with disabled future actions.
- `PrivateMemberProfile` is the first profile renderer. Future profile classes should reuse shared profile primitives rather than duplicate the full page.
- `GalleryShell` is mounted only inside the existing Private Member Mídia tab. It owns no route and exposes no real media or permission boundary.
- `OrganisationProfile` renders both implemented organisation account classes from typed placeholder data, preserving one universal profile route.
- `EventDetailShell` replaces the former `/event/:eventId` placeholder but does not read the ID or perform event operations.
- `ProfessionalProfile` is selected only for the `luiza-educadora` demonstration handle and reuses the universal profile layout classes.
- `ReviewsShell` is embedded in organisation profiles, the Professional reviews tab, and event details. It owns no route and performs no eligibility or reputation calculation.
- `BillingShell` is server-rendered at `/me/billing`. It reads plan and period values from the commercial JSON configuration and exposes disabled shell controls only.
- `AdminShell` is intentionally separate from `AppShell`; `/admin/moderation` and `/admin/moderation/:caseId` never render the five member navigation items.
- `ModerationQueue` and `ModerationCaseDetail` use safe typed fictional reports. They display no real evidence, harmful media, identity data, enforcement, or access control.

## Localization

Visible application copy is centralised in `lib/i18n.ts` under `ptBR`. Spanish and English are product requirements but no translation dictionaries or locale router exist yet.

When adding UI:

- Add pt-BR copy to the relevant namespace in `lib/i18n.ts`.
- Avoid embedding visible labels directly in components.
- Preserve textual account/status labels; colour alone is never sufficient.

Some early landing-page and shell labels are still hard-coded. Treat moving them into `ptBR` as cleanup work, not permission to change their approved wording.

## Placeholder data

The typed placeholder modules under `lib/` define safe demonstration content for the feed, discovery results, messages, galleries, organisations, events, one Professional profile, and Billing shell presentation. Billing values are derived from the commercial configuration rather than repeated in component code. All locations are approximate, and visual placeholders are CSS compositions rather than media files.

The profile shell currently keeps its placeholder copy in `lib/i18n.ts`. No route parameter, API, database, or user identity changes the rendered profile.

## Persistence and integrations

`.openai/hosting.json` currently declares:

- an existing Sites project ID
- a D1 binding named `DB`
- no R2 binding

`db/schema.ts` defines the Phase 1 account boundary. Public profile identity is stored separately from private sign-in identity. Birth dates and identity documents are not stored. Location fields accept only a state, city, approximate label, or hidden state; there are no address or coordinate columns.

Passwords use salted PBKDF2-SHA-256 hashes. Session and recovery credentials are opaque random values; only their SHA-256 hashes are stored. Sessions use `HttpOnly`, `SameSite=Lax` cookies and are checked on every protected request. `/verify-age` accepts pending accounts, member routes require an active approved account, and moderation routes additionally require an administrative role.

The verification adapter is sandbox-only. It stores a hashed opaque provider reference and a status result, never an identity document. Email delivery and password-reset completion remain placeholders. See `PRIVACY_AND_IDENTITY.md` for the current rules and retention defaults.

`app/chatgpt-auth.ts` contains optional Sites/ChatGPT identity helpers inherited from the starter. No current route calls them. They do not implement Fervo Social account authentication or age verification.

## Build output

`npm run build` emits the deployable Worker application to `dist/`. The custom `sites()` Vite plugin copies Sites metadata and any generated Drizzle migrations into `dist/.openai`. Generated directories are ignored and must not be hand-edited.

## Testing approach

`tests/rendered-html.test.mjs` imports the compiled Worker and requests representative routes. Tests currently verify:

- Landing-page identity and 18+ notice
- Five-item application navigation
- Public and authenticated route availability
- Accessible authentication labels and links
- Exactly three Home feed tabs
- Safe approximate-location and placeholder-card output
- Private Member profile content and the continued `/me` placeholder
- Explore category routes, basic controls, safe result copy, and reviewable placeholder states
- Messages inbox tabs, request controls, placeholder thread, disabled future actions, and list states
- Galleries sections, visibility labels, locked-private controls, safe placeholders, and reviewable loading/empty states
- Shared Club/Business and Event Organiser profile variants, Explore detail links, event route content, and disabled future event controls
- Professional profile content, Explore link, abstract portfolio, commercial gate, and disabled future controls
- Embedded review summaries, safe placeholder entries, eligibility notice, context-specific ratings, placeholder states, and disabled workflow controls
- Configuration-driven Billing content, the `/me` entry link, Founding Club safeguards, professional gating, and disabled billing controls
- Separate moderation queue/detail routes, safe priority/status labels, withheld-content previews, placeholder states, and disabled admin actions

The test harness uses an isolated in-memory SQLite adapter for D1. It verifies password/token hashing, prohibited identity/location fields, session-cookie flags, verification gating, member/admin role boundaries, and all existing rendered shell contracts.
