# Product and routes

## Product summary

Fervo Social is a Brazil-first, adults-only social discovery platform. It is intended to combine a vertically scrolling mixed-content feed with profiles, discovery, events, clubs, verified professional profiles, and private consent-based communication. The experience should remain substantially simpler than legacy adult-community platforms and usable by people with limited technical confidence, including a 40+ audience.

Current product authority is the owner-reviewed source pack under `docs/source-of-truth/`. The route catalogue below records implementation evidence and must not be used to override the current decision register.

Current launch assumptions:

- Brazil is the initial and fixed launch market.
- Brazilian Portuguese is the default language; Spanish and English are planned.
- Public identities may be pseudonymous. Legal identity must remain private.
- Adult verification is required before full product access and is enforced through the Phase 1 sandbox flow. Production identity-provider integration remains pending.
- Exact home locations must never be exposed.
- There are no public chatrooms, webcam rooms, general forums, or country selector in the MVP.

## Account classes

The target universal profile system supports four public-facing account families:

1. **Private Member** — every adult has an individual account and individual verification. Two or more verified adults may later create a linked shared couple, trio, multi-partner, or other approved shared profile on top of those accounts.
2. **Club or Business** — a club, venue, or approved adult business.
3. **Event Organiser** — an independent, club, or professional organiser.
4. **Professional** — an approved independent professional category. Commercial functionality remains feature-flagged pending legal and payment-provider approval.

All four account families have front-end shells. The newly approved individual-account + linked-shared-profile architecture is not implemented: current profiles remain fictional demonstrations, and the Phase 1 schema does not yet provide the complete linked-profile permission model.

## Primary navigation

**Approved target:** Home/Feed, Create, Clubs & Events, Messages, public-facing Profile, and Health / Safety / Advice. Explore is no longer permanent navigation; Search remains. Professionals are deferred from initial public launch. Account/settings are secondary controls. Exact new URLs and navigation layout remain DECISION REQUIRED; this pass does not create or remove routes.

**Current implementation, superseded as a permanent product rule:** the code still contains these five items:

| Item | Destination | Current behavior |
| --- | --- | --- |
| Home | `/home` | Implemented feed shell |
| Explore | `/explore` | Implemented Explore Shell with category subnavigation |
| Create | Modal or bottom sheet | Opens a placeholder sheet; it is not a route |
| Messages | `/messages` | Implemented inbox and conversation shell |
| Profile | `/me` | Placeholder for future account management |

Desktop uses compact side navigation. Mobile uses bottom navigation with both an icon and a text label.

## Route catalogue

Route notation in product documents uses `:parameter`. Next.js files use `[parameter]`.

### Public entry routes

| Product route | Implementation file | Status |
| --- | --- | --- |
| `/` | `app/page.tsx` | Landing page implemented |
| `/login` | `app/login/page.tsx` | Password sign-in and secure session creation |
| `/register` | `app/register/page.tsx` | Persistent account/profile owner creation and consent capture |
| `/verify-age` | `app/verify-age/page.tsx` | Session-protected sandbox verification flow |
| `/forgot-password` | `app/forgot-password/page.tsx` | Hashed recovery-token request; no email delivery/reset completion |
| `/safety` | `app/safety/page.tsx` | Placeholder |
| `/help` | `app/help/page.tsx` | Placeholder |
| `/legal/:slug` | `app/legal/[slug]/page.tsx` | Generic placeholder for legal pages |

Planned legal slugs include `terms`, `privacy`, `content`, `professionals`, and `cookies`. No legal copy has been approved or implemented.

### Routes inside the shared application shell

| Product route | Implementation file | Status |
| --- | --- | --- |
| `/home` | `app/(app)/home/page.tsx` | Implemented Home and Feed Shell |
| `/explore` | `app/(app)/explore/page.tsx` | Explore Shell; defaults to profile discovery |
| `/explore/profiles` | `app/(app)/explore/profiles/page.tsx` | Profile discovery shell |
| `/explore/clubs` | `app/(app)/explore/clubs/page.tsx` | Club discovery shell with profile links |
| `/explore/events` | `app/(app)/explore/events/page.tsx` | Event discovery shell with detail links |
| `/explore/professionals` | `app/(app)/explore/professionals/page.tsx` | Professional discovery shell with one profile link |
| `/messages` | `app/(app)/messages/page.tsx` | Inbox and message-request shell |
| `/messages/:threadId` | `app/(app)/messages/[threadId]/page.tsx` | Static placeholder conversation shell |
| `/profile/:handle` | `app/(app)/profile/[handle]/page.tsx` | Shared route selecting Private Member, Club/Business, Event Organiser, or Professional shell |
| `/event/:eventId` | `app/(app)/event/[eventId]/page.tsx` | One safe placeholder event-detail shell |
| `/me` | `app/(app)/me/page.tsx` | Account-management entry with Billing Shell link; other account areas remain placeholders |
| `/me/billing` | `app/(app)/me/billing/page.tsx` | Configuration-driven Billing Shell with disabled controls |

The `(app)` route group adds `AppShell` without changing the URL. Its layout requires an active session with approved adult verification.

The `/me/billing` nested route is implementation evidence from the accepted Billing shell. It is not a sixth primary-navigation item. Historical v1.1 route material is not current product authority.

### Administration routes

| Product route | Implementation file | Status |
| --- | --- | --- |
| `/admin/moderation` | `app/admin/moderation/page.tsx` | Fictional moderation queue shell |
| `/admin/moderation/:caseId` | `app/admin/moderation/[caseId]/page.tsx` | Fictional case-detail shell |

Administration routes use a separate `AdminShell`. They are not public/member destinations and never appear in the five-item primary navigation. Their layout now requires an active approved moderator or admin account; moderation actions remain placeholders.

## Moderation administration shell contract

The queue contains neutral fictional cases aligned with the approved high-priority categories. Textual priority and status labels identify urgent, quarantined, resolved, and awaiting-appeal examples. Loading, empty, and no-access views are temporary local demonstrations.

The case detail provides safe reported-content, evidence-summary, history, appeal, and audit sections. Harmful media, personal identity data, private narratives, and real evidence are never displayed. Case, Appeal, and Audit tabs use temporary local state only.

Filter, Sort, Assign, Quarantine, Warn, Restrict, Suspend, Ban, Dismiss, Escalate, and Review Appeal controls are disabled. Real admin identity, role permissions, automated detection, evidence storage, enforcement, notifications, appeals, audit records, legal workflows, retention rules, and backend security remain deferred.

## Billing shell contract

Billing remains inside account management at `/me/billing`. The shell shows one fictional current Private Plus subscription, billing status, monthly/four-month/annual comparisons, and plan values imported from `docs/Fervo_Social_Commercial_Config_v1_1.json`.

**Implementation drift:** the imported v1.1 fixture and Founding Club Pro presentation are superseded as commercial authority. Current rules are in `docs/source-of-truth/config/commercial-config.json` version 1.3 and decisions D-050–D-103. In particular, v1.3 distinguishes 12-month Founding Club Starter from provisional 60-day Club Pro qualification. This documentation pass does not change the shell, fixture import, tests, or billing behaviour. Professional commercial plans remain gated pending legal and payment-provider approval.

Select Plan, Compare Period, Preview Changes, Manage Payment Method, Cancel, View Invoices, and offer-preview controls are disabled. Checkout, real payments, subscriptions, invoice logic, refunds, renewals, eligibility, persistence, security workflows, and payment-provider integration remain deferred.

## Home feed contract

The approved target is one Feed with selectable Public, Nearby/Distance and Friends views through a cleaner switch. Friends-of-Friends is an audience permission, not a fourth view. Final Portuguese labels and permission details remain open. Text, pictures and short video are ordinary profile-linked posts, with no separate Reels product.

The superseded requirement was three visible tabs:

- Para você (`For You`)
- Local / Your Area — final Portuguese label `WORKING`
- Seguindo (`Following`)

Current code still includes Event and Professional cards and Explore categories. The target adds a dedicated Clubs & Events launch surface and defers Professionals; that launch deferral is not implemented yet.

**Current implementation:** the shell still displays `Perto de você`/Nearby and uses no real member-selected geographic scope. Radius/city/area/region controls and triangulation-safe location behaviour remain unimplemented.

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

Only Follow, Save, tab selection, and gallery demonstration interactions have local UI state. The route handle selects safe in-memory demonstrations only; no profile data is loaded.

### Galleries shell contract

The Galleries Shell lives inside the existing Mídia tab on `/profile/:handle`. It does not own a route. It contains Public, Friends-only, and Private sections with textual visibility labels so privacy is never communicated by colour alone.

Public and Friends-only sections use safe abstract CSS placeholders. Items open in a temporary local preview with no file or download. Loading and empty states are reviewable shell demonstrations. The Private section remains locked and can switch locally to an access-requested state; it never reveals private content or grants access.

Grant, Revoke, and Expiry controls are visible disabled placeholders. Real uploads, storage, permission checks, grants, downloads, face blur, watermarking, moderation, audit history, persistence, and backend security remain deferred.

### Clubs and events shell contract

Club/Business and Event Organiser profiles reuse the universal `/profile/:handle` route and one shared organisation-profile component. The recognised Club handles are the three Explore placeholder IDs; `coletivo-lume` demonstrates an Event Organiser. Other handles continue to render the Private Member example.

Organisation shells contain safe fictional identity, approximate location, demonstration verification wording, operating/contact details, facilities, accessibility, rules, policies, and one upcoming-event link. Follow and Save are local-only interactions. Contact, Share, Reviews, and Report are disabled.

`/event/:eventId` renders the same single example event for every ID. It contains an abstract cover, approximate location, venue and organiser links, event facts, rules, policies, and visible RSVP, Waitlist, Tickets, Share, Report, Reviews, and Event Discussion positions. Interest and Save are local-only; all other controls are disabled. No ticket price is hard-coded.

Real verification, event creation, ticketing, payments, RSVP/waitlist processing, check-in, WhatsApp, review logic, staff accounts, subscriptions, moderation, persistence, and backend permissions remain deferred.

### Professional profiles shell contract

**Implementation evidence only:** this existing shell remains exposed in code. The founder delta defers the entire professional area from initial public launch; later owner reactivation and legal/provider gates are required. No professional routes are removed during reconciliation.

`/profile/luiza-educadora` renders one safe fictional Professional profile. The Luiza result at `/explore/professionals` links to this handle; the other Professional results remain discovery placeholders.

The shell contains a professional name and category, clearly demonstrative adult/professional verification labels, approximate service area, availability, services summary, languages, accessibility, boundaries, abstract public portfolio items, a locked private-gallery state, and a reviews placeholder. No rate is rendered.

Follow, Save, Portfolio selection, and Request Private Access update React memory only. Contact, Share, Reviews, Report, and Block are disabled. A visible commercial gate states that rates, bookings, payments, and promotion require legal and payment-provider approval.

Real verification, uploads, gallery permissions, bookings, payments, rates, messaging, scheduling, review logic, promotions, analytics, moderation, persistence, and backend data remain deferred.

### Reviews shell contract

Public review shells are embedded in the applicable existing routes: Club/Business, Event Organiser, and Professional variants at `/profile/:handle`, plus the event detail at `/event/:eventId`. There is no `/reviews` route, and Private Member profiles do not receive public reviews.

The shared shell contains a static demonstration summary, category ratings, safe fictional moderated text, fictional profile response, eligibility notice, and reviewable loading, empty, and ineligible states. Place/event categories cover cleanliness, staff conduct, safety, atmosphere, accessibility, and listing accuracy. Professional categories cover profile accuracy, communication, boundaries, punctuality, and overall experience.

Write Review and Check Eligibility show a local ineligible state. Helpful uses temporary React memory. Filter and Sort are disabled selections; Respond and Report are disabled buttons. Real eligibility, submissions, scoring, responses, reports, moderation, appeals, persistence, and backend permissions remain deferred.

Professional-only client safety feedback is not part of this shell. It requires a separately approved structured safety system with moderation, notification, and appeal rights.

## Explore shell contract

The following describes existing code. Permanent Explore navigation is superseded by Search/results and the dedicated launch destinations in the founder delta. Existing paths are preserved pending a separately approved route/navigation pass.

The shared Explore Shell is available at `/explore` and four category routes:

- Perfis at `/explore/profiles`
- Clubes at `/explore/clubs`
- Eventos at `/explore/events`
- Profissionais at `/explore/professionals`

`/explore` currently defaults to the same profile-discovery view as `/explore/profiles`. The category paths describe the accepted shell implementation; the historical v1.1 route map is retained only for context.

The shell contains a search field, safe placeholder cards, approximate locations, textual account labels, basic filter controls, sorting, grid/list controls, and reviewable loading/empty/no-results states. Club and Event cards now link to the corresponding shell routes. Controls are temporary and do not query, rank, filter, recommend, alert, or persist real data. Map clusters, advanced matching, saved searches, search alerts, booking, RSVP processing, reviews, and messaging remain deferred.

## Messages shell contract

`/messages` contains two inbox views: Conversas and Solicitações. It includes a placeholder search field, safe fictional conversation summaries, a text-only first-contact request, reviewable loading and empty states, and a no-conversation-selected panel.

Opening a conversation uses `/messages/:threadId`. Every thread ID currently renders the same safe demonstration conversation because no message data source exists. The thread shows a composer and visible Send, Mute, Archive, Report, and media-permission controls, but these controls are intentionally disabled.

Accept, Decline, and Block on the placeholder request update React memory only and reset on refresh. Real-time delivery, delivery/read indicators, media sharing, group invitations, persistence, notifications, encryption, moderation workflows, and backend security remain deferred.
