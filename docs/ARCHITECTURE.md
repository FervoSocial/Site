# Architecture

## Runtime and framework

- **Next.js 16 App Router** provides route and component conventions.
- **React 19** renders server and client components.
- **TypeScript 5** runs in strict mode with the `@/*` path alias.
- **vinext** compiles the Next-style application through **Vite 8** for Cloudflare Workers.
- **Cloudflare Workers** provide the deployed request runtime and image-optimisation endpoint.
- **Tailwind CSS 4** is imported, but the current interface is primarily authored with named classes in `app/globals.css` rather than utility classes.
- **Drizzle ORM** and D1 scaffolding are installed but not used by product code.

## Request path

1. `worker/index.ts` receives the request.
2. `/_vinext/image` requests are handled by the vinext image-optimisation bridge.
3. All other requests are delegated to the vinext App Router handler.
4. `app/layout.tsx` supplies global metadata, the `pt-BR` document language, Geist, and global CSS.
5. Routes inside `app/(app)` are wrapped by `AppShell`.

## Folder responsibilities

```text
app/                    Route entry points and layouts
  (app)/                Routes wrapped in the authenticated-looking app shell
components/
  auth/                 Login, registration, recovery, and age-verification shells
  feed/                 Home feed controller and reusable feed card
  navigation/           Shared application shell and five-item navigation
  profile/              Current Private Member profile shell
  ui/                   Small shared surfaces, links, and placeholder layouts
lib/
  i18n.ts               Central pt-BR interface copy
  feed-placeholder.ts   Typed safe feed demonstration data
db/                     Dormant Drizzle/D1 entry point and empty schema
drizzle/                Migration metadata; no product schema exists
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
- Authentication shells — simulated form and status transitions
- `FeedShell` — active feed tab plus temporary Like, Save, and Follow sets
- `PrivateMemberProfile` — active profile tab plus temporary Follow and Save state

All current state is in React memory. It is intentionally lost on refresh and is not a substitute for application data.

## Shared UI structure

- `AppShell` owns the global header, desktop navigation, mobile navigation, content region, and Create sheet.
- `Surface` is the base bordered dark container.
- `PagePlaceholder` is used for future authenticated routes.
- `PublicPlaceholder` is used for future public routes.
- `AuthFrame`, `FormField`, and `StatusPanel` provide consistent authentication-shell structure.
- `FeedCard` is a typed reusable base for all implemented feed-card variants.
- `PrivateMemberProfile` is the first profile renderer. Future profile classes should reuse shared profile primitives rather than duplicate the full page.

## Localization

Visible application copy is centralised in `lib/i18n.ts` under `ptBR`. Spanish and English are product requirements but no translation dictionaries or locale router exist yet.

When adding UI:

- Add pt-BR copy to the relevant namespace in `lib/i18n.ts`.
- Avoid embedding visible labels directly in components.
- Preserve textual account/status labels; colour alone is never sufficient.

Some early landing-page and shell labels are still hard-coded. Treat moving them into `ptBR` as cleanup work, not permission to change their approved wording.

## Placeholder data

`lib/feed-placeholder.ts` defines the current feed data and TypeScript types. It contains safe, non-explicit demonstration content and approximate locations only.

The profile shell currently keeps its placeholder copy in `lib/i18n.ts`. No route parameter, API, database, or user identity changes the rendered profile.

## Persistence and integrations

`.openai/hosting.json` currently declares:

- an existing Sites project ID
- no D1 binding
- no R2 binding

`db/schema.ts` is empty and `getDb()` is unused. Do not add a schema or bind storage until a separately approved milestone defines the records, privacy model, retention expectations, and permissions.

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

There are no unit tests for business rules because those rules are not implemented yet. Add focused permission, privacy, billing, and moderation tests before those areas become functional.
