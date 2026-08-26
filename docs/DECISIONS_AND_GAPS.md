# Historical implementation decisions and gaps

> **Status: superseded as the product decision register.** This file is retained for implementation history. Current owner-reviewed decisions are in [`source-of-truth/02_CURRENT_DECISIONS.md`](source-of-truth/02_CURRENT_DECISIONS.md). Current implementation status is in [`PROJECT_STATUS.md`](PROJECT_STATUS.md). If this file conflicts with either, do not follow it.

## Approved implementation decisions

### Three Home feed tabs

The version 1.1 build specification originally lists five Home tabs: For You, Nearby, Following, Events, and Professionals.

The current product decision remains **three tabs only**, but the second feed direction has been revised:

- For You
- Local / Your Area — final Portuguese UX label is still `WORKING`
- Following

Events and Professionals remain feed-card types and Explore categories. The current UI still says `Perto de você`/Nearby and does not implement member-selected privacy-safe area/radius controls; that is implementation drift, not the current target decision.

### Route notation

Product documentation uses `/profile/:handle`, `/event/:eventId`, and `/messages/:threadId`. Next.js implements the same routes with `[handle]`, `[eventId]`, and `[threadId]` folders.

### Explore category routes

The version 1.1 route map lists the parent `/explore` route only. The approved Explore Shell adds four shell-level category routes: `/explore/profiles`, `/explore/clubs`, `/explore/events`, and `/explore/professionals`. `/explore` remains the primary-navigation destination and defaults to profile discovery.

### Landing and shared visual direction

- Purple/lilac remains the main brand and action colour.
- Gold is a recurring secondary detail across the site.
- The landing page may use a stronger gold-smoke composition.
- Application pages keep the same asset under darker overlays.
- Gold must not replace purple CTAs or turn the product into a luxury-product campaign.

### Stage boundaries already accepted

- Public landing page
- Application foundation
- Authentication and verification shell
- Home and Feed Shell
- Private Member Profile Shell
- Explore Shell
- Messages Shell
- Galleries Shell
- Clubs and Events Shell
- Professional Profiles Shell
- Reviews Shell
- Billing Shell
- Moderation Administration Shell
- Phase 1 identity, privacy, verification-state, and core-data foundation


## Known implementation limitations

- Routes inside `(app)` now require an active session and approved verification state. Admin routes also require the moderator/admin role.
- Registration, login, session, logout, recovery-token creation, and sandbox verification transitions persist in D1. Email delivery and password-reset completion remain placeholders.
- All feed, profile, Explore, and Messages data is static placeholder content.
- React state resets on refresh and is shared with no backend.
- `/profile/:handle` recognises a small fixed set of organisation demonstration handles; all other handles render the same Private Member example.
- `/me` displays the signed-in account boundary but is not connected to the public profile content renderer or editing.
- Search, notifications, location mode, and Create are shell placeholders. Discreet exit now performs logout.
- Explore search, filters, sorting, result view, and state previews are local shell demonstrations with no query or persistence layer.
- Message-request actions are local shell demonstrations. Thread IDs are ignored, and every conversation route renders the same text-only example.
- Gallery section choice, item preview, placeholder state choice, and private-access request are local demonstrations. No files, access grants, or permission checks exist.
- Club, organiser, and event content is fixed placeholder data. Every event ID renders the same event, and no real RSVP, waitlist, ticket, review, verification, or moderation behavior exists.
- The Professional shell exists only for `luiza-educadora`. Verification labels are demonstrative, portfolio items are abstract, and all commercial and trust-sensitive behavior remains disabled.
- Public reviews are embedded demonstrations only. Ratings are fixed display data; eligibility, submissions, responses, reports, moderation, and appeals do not exist.
- Professional-only client safety feedback is deliberately excluded from public reviews and requires a future separately approved safety design.
- `app/chatgpt-auth.ts` and R2 remain dormant starter capabilities. Drizzle and D1 now support Phase 1 identity data.
- Only pt-BR copy exists; no locale selection or translation fallback exists.
- The repository still contains starter names and comments in infrastructure files, including the package name and Worker comment.
- The canonical repository contains the controlled Phase 1 baseline on `phase1/clean-baseline` at `bc7208c74c689555fb6eb2f7043816c28618f814`. `main` must not be assumed current until checked.

## Safety and privacy boundaries

These are product rules, not optional polish:

- Adult and identity verification must precede full access when real accounts exist.
- Legal identity remains private; pseudonymous public identity is allowed.
- Each adult represented by a couple or group profile must verify separately.
- Location must be approximate and privacy-safe.
- No unsolicited media. Media access must be explicit and revocable.
- Messaging is private one-to-one or consent-based invited groups only.
- No public chatrooms or webcam rooms.
- External WhatsApp links are limited to verified organisations/professionals and need an off-platform safety warning.
- Explicit media must never be used as seed or demonstration content.

## Historical commercial notes — superseded by v1.3

The list below described the earlier v1.1 shell assumptions and is not current commercial authority. Use [`source-of-truth/config/commercial-config.json`](source-of-truth/config/commercial-config.json) version 1.3 and the D-050–D-103 decisions in the current register.

Current implementation fact: no real billing functionality is implemented, and the visual Billing shell still imports the historical v1.1 JSON. A separate implementation pass must adapt code/tests before v1.3 can drive the UI.

Historical notes retained for context:

- Prices and discount periods must be loaded from the commercial configuration or database, never embedded in UI components.
- Billing currency is BRL.
- Supported periods are monthly, four months with a 10% discount, and annual with a 20% discount.
- Earlier v1.1 described Founding Club Pro as the 12-month free entitlement. Current v1.3 instead defines Founding Club Starter for 12 months plus provisional Club Pro for 60 days with qualification rules.
- Founding free periods require no payment card and never auto-convert to paid.
- Current Founding Professional duration and price rules are defined in v1.3.
- Professional commercial features remain behind legal and payment-provider feature gates.

## Decisions required before production features

### Identity and accounts

- Production email delivery and password-reset completion
- Production age/identity-verification provider, fallback, retry limits, and appeal flow
- Shared-profile subscription/payment ownership and detailed link/unlink permissions
- Public handle rules, renaming, reservation, and abuse prevention

### Privacy and location

- Approximation bands and minimum anonymity thresholds
- Who can find, follow, nudge, or message whom
- Gallery grant model, expiry, revocation, screenshots, and audit history
- Retention and deletion requirements for identity and sensitive profile data

### Safety and moderation

- Reporting taxonomy and review workflow
- Blocking semantics across feeds, search, messages, events, and reviews
- Content policy, escalation process, appeals, and emergency handling
- Production moderation providers and operational ownership

### Data and media

- Authoritative data model and permission layer
- Media storage, transformation, scanning, content warnings, and deletion
- Feed ranking and sponsored-content separation
- Event verification, RSVP, attendance proof, and review eligibility

### Commercial and legal

- Approved terms, privacy, cookies, content, and professional-account policies
- Payment provider approval for every account class and professional category
- Subscription entitlements, refunds, taxes, invoices, cancellation, and renewal communications
- Feature-flag ownership and launch-gate sign-off

## Recommended cleanup

1. Rename the package and remaining starter comments to Fervo Social.
2. Move remaining hard-coded visible landing/shell copy into `lib/i18n.ts`.
3. Address dependency vulnerabilities in a separate scoped maintenance pass; do not run a broad forced upgrade incidentally.
