# Project status

Last verified against the codebase: **23 July 2026**.

## Repository synchronization

The canonical GitHub repository is `FervoSocial/Site`, with default branch `main`. It was verified on 21 July 2026 and is currently empty. The initial full-workspace import was explicitly approved on 21 July 2026, but GitHub rejected the first write because the installed integration lacks repository-content write access. The implemented application and this documentation therefore remain local. Do not describe GitHub as synchronized until the integration is granted write access and the import completes.

## Current stage

All 12 shell milestones are accepted. **Phase 1: Identity, verification, privacy, and core data** is implemented locally and awaiting product acceptance.

## Implemented

### Public experience

- `/` — approved public landing page with Fervo Social branding, dark matte background, purple neon identity, gold smoke artwork, a single entry action, and an 18+ notice.
- `/login` — persistent password sign-in with safe default, loading, error, and success states.
- `/register` — creates a private authentication identity, pseudonymous public profile, owner member, consent records, privacy defaults, and session.
- `/forgot-password` — creates a short-lived hashed recovery token while returning an account-enumeration-safe response; email delivery remains disabled.
- `/verify-age` — protected required, pending, approved, failed, and retry flow connected to the sandbox verification adapter.
- `/safety`, `/help`, and `/legal/:slug` — public placeholders.

### Shared application foundation

- Shared responsive application shell.
- Exactly five primary navigation items: Home, Explore, Create, Messages, Profile.
- Create opens a placeholder sheet.
- Desktop side navigation and mobile bottom navigation.
- Approximate-location label, search placeholder, notifications placeholder, discreet-exit placeholder, and account avatar placeholder.
- The discreet-exit action now revokes the current session and returns to login.
- All `(app)` routes require an active, approved account. Moderation routes additionally require a moderator or admin role.

### Identity, privacy, and core data

- D1 and Drizzle define users, password identities, sessions, profiles, profile members, account types, verification states/results, consents, privacy defaults, password-recovery tokens, and security events.
- Private sign-in identity is separated from the public pseudonymous profile identity.
- Passwords use salted PBKDF2-SHA-256; session and recovery tokens are stored only as hashes.
- Birth date is checked for 18+ registration but not retained. Identity documents, exact home addresses, and precise coordinates have no storage fields.
- `/me` shows the authenticated account boundary and keeps private email separate from public handle/display name.
- Verification is sandbox-only and stores no identity documents.
- Retention defaults and permission rules are documented in `PRIVACY_AND_IDENTITY.md`.

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
- A safe placeholder Private Member profile is rendered for handles that are not recognised as demonstration organisations.
- Includes photo placeholder, display name, account-type label, approximate location, bio, statistics, and About/Media/Posts tabs.
- Follow and Save use temporary component state only.
- Nudge, Message, Report, and Block are visible disabled placeholders.
- `/me` remains a separate placeholder for future account management.
- No other profile class renderer is implemented.

### Galleries shell

- The existing Mídia tab inside `/profile/:handle` now contains Public, Friends-only, and Private gallery sections; no gallery route was added.
- Public and Friends-only sections use safe abstract placeholder tiles with textual visibility labels.
- Placeholder items open in a local preview dialog with no real file, download, or media playback.
- Loading and empty states can be reviewed through a local demonstration control.
- The Private section remains locked and demonstrates a temporary access-requested state only.
- Grant, Revoke, and Expiry controls are visible disabled placeholders for future owner-side access management.
- All gallery state is held in React memory and resets on refresh.

### Explore shell

- `/explore` and `/explore/profiles` render the safe placeholder profile-discovery view.
- `/explore/clubs`, `/explore/events`, and `/explore/professionals` reuse the same discovery shell with category-specific demonstration results.
- Category navigation, search-field structure, basic filter controls, sorting, and grid/list view controls are present.
- Results use safe placeholder content, approximate locations, and textual account labels.
- Loading, empty-category, and no-results states can be reviewed through a local demonstration control.
- Search submission, filters, sorting, and view selection are temporary shell interactions only. No discovery data is queried or persisted.
- Club results link to Club/Business profile demonstrations, and event results link to the event-detail demonstration.

### Clubs and events shell

- `/profile/:handle` now selects the shared Club/Business profile shell for the three safe Explore club handles and the Event Organiser shell for `coletivo-lume`.
- Club and organiser variants reuse one organisation-profile component and the established profile structure.
- Organisation shells include description, demonstration verification label, approximate location, contact placeholder, facilities, accessibility, rules, policies, and an upcoming event.
- `/event/:eventId` now renders one safe example event with approximate venue information, host links, attendance rules, accessibility, policies, and community-control placeholders.
- Follow, Save, and event Interest use temporary component state only.
- Contact, Share, Reviews, Report, Waitlist, Tickets, and Event Discussion are visible disabled placeholders.

### Professional profiles shell

- `/profile/luiza-educadora` renders one safe fictional Professional profile through the universal profile route.
- `/explore/professionals` links the Luiza demonstration result to the Professional profile shell.
- The shell includes category, two clearly demonstrative verification labels, approximate service area, availability, services summary, languages, accessibility, and safety boundaries.
- Public portfolio items use abstract CSS media only; the private gallery remains locked and never reveals media.
- Follow, Save, Portfolio tab selection, and Request Private Access use temporary component state only.
- Contact, Share, Reviews, Report, and Block are visible disabled placeholders.
- A visible launch-gate notice keeps rates, bookings, payments, and promotions disabled pending legal and payment-provider approval.

### Reviews shell

- Reviews remain embedded inside applicable `/profile/:handle` profiles and `/event/:eventId`; no review route was added.
- Club/Business, Event Organiser, Professional, and Event shells reuse one Reviews component with context-specific placeholder content.
- Each shell includes a static demonstration summary, textual category ratings, one safe fictional review, moderated-text label, and fictional profile response.
- Eligibility notices state that a verified visit, RSVP, or professional interaction is required.
- Loading, empty, and ineligible states can be reviewed through temporary component controls.
- Write Review and Check Eligibility move only to the local ineligible state. Helpful is local-only; Filter, Sort, Respond, and Report remain non-functional or disabled.
- Professional-only client safety feedback is explicitly excluded and remains a separate future safety stage.

### Billing shell

- `/me/billing` is implemented inside the shared application shell and is linked from the existing `/me` account-management entry.
- One fictional Private Plus subscription demonstrates current plan, billing status, billing period, configured price, payment-method status, and next-charge status.
- Available Private, Business, Organiser, and Professional plan values are read from `docs/Fervo_Social_Commercial_Config_v1_1.json`; no price is duplicated as a code constant.
- Monthly, quadrimestral, and annual totals are shown together with configuration-derived discounts and effective monthly equivalents.
- The Founding Club Pro notice states that the 12-month offer requires no card, never converts automatically to paid, and requires affirmative purchase for any later paid plan.
- Professional commercial plans remain visibly gated pending legal and payment-provider approval.
- Select Plan, Compare Period, Preview Changes, Manage Payment Method, Cancel, View Invoices, and Founding Offer controls are visible disabled placeholders.
- No checkout, payment, subscription, invoice, renewal, refund, eligibility, persistence, security, or payment-provider workflow exists.

### Moderation administration shell

- `/admin/moderation` provides a separate fictional moderation queue outside the member `AppShell` and its five-item navigation.
- `/admin/moderation/:caseId` provides a single case-detail layout with Case, Appeal, and Audit tabs.
- Four neutral text-only reports demonstrate underage concern, non-consensual intimate imagery, impersonation, and professional safety categories without displaying harmful media or personal information.
- Queue cards include textual priority and status labels for urgent, quarantined, resolved, and awaiting-appeal states.
- Reported-content previews are deliberately withheld and replaced with safe summaries. Evidence, case history, appeal, and audit areas contain no real records.
- Loading, empty-queue, and no-access screens can be reviewed through temporary local state controls.
- Filter, Sort, Assign, Quarantine, Warn, Restrict, Suspend, Ban, Dismiss, Escalate, and Review Appeal controls are visible but disabled.
- There is no admin authentication, permission enforcement, automated detection, evidence storage, moderation action, notification, appeal processing, audit persistence, legal workflow, or backend security.

### Messages shell

- `/messages` contains a responsive inbox with Conversations and Requests views.
- The inbox includes a placeholder search field, three safe fictional conversations, one text-only introduction request, and a no-conversation-selected panel.
- The request card demonstrates Accept, Decline, and Block using temporary component state only.
- Loading and empty-list states can be reviewed through a local demonstration control.
- `/messages/:threadId` renders one safe text-only placeholder conversation, regardless of the supplied thread ID.
- The thread contains visible but disabled Send, Mute, Archive, Report, and media-permission controls.
- The composer accepts temporary text in the browser but cannot send, store, or deliver it.

## Placeholder-only routes

- `/me` — account-management entry with a working link to the Billing Shell; all other account areas remain placeholders
- `/safety`
- `/help`
- `/legal/:slug`

## Not implemented

- Email delivery and password-reset completion
- Production age/identity provider integration, documents, retry limits, fallback, or appeals
- Multi-adult invitation and individual verification orchestration beyond the initial owner record
- Automated retention deletion, consent withdrawal, account deletion, or legal export workflows
- Persistent accounts, profiles, follows, likes, saves, or preferences
- Real uploads, stored galleries, media permissions, access grants, downloads, or playback
- Feed ranking, live data, recommendations, or exact proximity
- Real search, filter execution, recommendations, maps, saved searches, or alerts
- Real-time messaging, delivery/read states, media sharing, group invites, persistence, encryption, moderation workflows, backend security, comments, or notifications
- Real event creation, RSVP processing, waitlists, ticketing, check-in, or payments
- Profile editing or privacy controls
- Real billing, subscriptions, promotions, checkout, invoices, refunds, renewals, or payments
- Production reporting, blocking, moderation, trust, or safety integrations
- Real professional verification, enquiries, bookings, rates, scheduling, reviews, promotions, or analytics
- Real organisation verification, WhatsApp integration, staff accounts, subscriptions, reviews, or event moderation
- Real review eligibility, submission, score calculation, responses, reports, moderation, appeals, persistence, or backend permissions
- Real moderation administration operations, evidence handling, enforcement, notifications, audit records, appeals processing, or legal workflows

## Next planning boundary

Phase 1 is awaiting product acceptance. Feed, profile content, media, messaging, billing behavior, moderation operations, and every Phase 2/3 system remain outside this implementation.
