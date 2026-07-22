# Product and routes

## Product summary

Fervo Social is a Brazil-first, adults-only social discovery platform. It is intended to combine a vertically scrolling mixed-content feed with profiles, discovery, events, clubs, verified professional profiles, and private consent-based communication. The experience should remain substantially simpler than legacy adult-community platforms and usable by people with limited technical confidence, including a 40+ audience.

Launch assumptions from the canonical specification:

- Brazil is the initial and fixed launch market.
- Brazilian Portuguese is the default language; Spanish and English are planned.
- Public identities may be pseudonymous. Legal identity must remain private.
- Adult and identity verification is required before full product access, but is not implemented yet.
- Exact home locations must never be exposed.
- There are no public chatrooms, webcam rooms, general forums, or country selector in the MVP.

## Account classes

The universal profile system supports four account classes:

1. **Private Member** — a single person, couple, multi-partner relationship, or group/household. Each represented adult must eventually verify separately.
2. **Club or Business** — a club, venue, or approved adult business.
3. **Event Organiser** — an independent, club, or professional organiser.
4. **Professional** — an approved independent professional category. Commercial functionality remains feature-flagged pending legal and payment-provider approval.

Only the Private Member profile shell is currently implemented.

## Primary navigation

Authenticated navigation must always contain exactly five items:

| Item | Destination | Current behavior |
| --- | --- | --- |
| Home | `/home` | Implemented feed shell |
| Explore | `/explore` | Placeholder; Explore Shell planned next |
| Create | Modal or bottom sheet | Opens a placeholder sheet; it is not a route |
| Messages | `/messages` | Placeholder |
| Profile | `/me` | Placeholder for future account management |

Desktop uses compact side navigation. Mobile uses bottom navigation with both an icon and a text label.

## Route catalogue

Route notation in product documents uses `:parameter`. Next.js files use `[parameter]`.

### Public entry routes

| Product route | Implementation file | Status |
| --- | --- | --- |
| `/` | `app/page.tsx` | Landing page implemented |
| `/login` | `app/login/page.tsx` | UX shell with temporary states |
| `/register` | `app/register/page.tsx` | UX shell with temporary states |
| `/verify-age` | `app/verify-age/page.tsx` | UX shell; no provider integration |
| `/forgot-password` | `app/forgot-password/page.tsx` | UX shell; no email delivery |
| `/safety` | `app/safety/page.tsx` | Placeholder |
| `/help` | `app/help/page.tsx` | Placeholder |
| `/legal/:slug` | `app/legal/[slug]/page.tsx` | Generic placeholder for legal pages |

Planned legal slugs include `terms`, `privacy`, `content`, `professionals`, and `cookies`. No legal copy has been approved or implemented.

### Routes inside the shared application shell

| Product route | Implementation file | Status |
| --- | --- | --- |
| `/home` | `app/(app)/home/page.tsx` | Implemented Home and Feed Shell |
| `/explore` | `app/(app)/explore/page.tsx` | Placeholder |
| `/messages` | `app/(app)/messages/page.tsx` | Placeholder |
| `/messages/:threadId` | `app/(app)/messages/[threadId]/page.tsx` | Placeholder |
| `/profile/:handle` | `app/(app)/profile/[handle]/page.tsx` | Private Member shell only |
| `/event/:eventId` | `app/(app)/event/[eventId]/page.tsx` | Placeholder |
| `/me` | `app/(app)/me/page.tsx` | Placeholder for own-account management |

The `(app)` route group adds `AppShell` without changing the URL.

## Home feed contract

The current approved Home design deliberately has three tabs:

- Para você (`For You`)
- Perto de você (`Nearby`)
- Seguindo (`Following`)

Events and Professionals appear as card types in the mixed feed and may later be found through Explore. They are not top-level feed tabs.

Current placeholder card kinds are:

- Member media post
- Text/status post
- Event
- Professional
- Official safety guidance
- Sponsored content

Current interactions are component-local only. Like, Save, Follow, and tab selection reset on refresh. Comment, Message, and Report are unavailable placeholders.

## Universal profile contract

All public profiles use `/profile/:handle`. The eventual renderer must select modules by account class rather than creating four separate profile applications.

The implemented Private Member shell contains:

- Photo placeholder
- Display name
- Text account-class label
- Approximate location
- Bio
- Followers, following, and publication statistics
- About, Media, and Posts tabs
- Follow, Save, Nudge, Message, Report, and Block action positions

Only Follow, Save, and tab selection have local UI state. The handle is not read and no profile data is loaded; every handle currently renders the same demonstration profile.

## Planned Explore shell

The next defined but unimplemented stage is `/explore`:

- Tabs: Members, Clubs, Events, Professionals
- Search input
- Safe placeholder result cards with approximate locations and text account labels
- Always-visible shell filters: Location, Distance, Profile type, Age range, Verified only, Online or recently active
- Shell tools: More Filters, grid/list view, sorting, clear filters, saved search, and search alerts

Real searching, map clusters, ranking, live status, persistence, alerts, and backend data must wait for later approval.
