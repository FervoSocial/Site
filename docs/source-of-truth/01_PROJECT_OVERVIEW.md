# Fervo Social - Project Overview

Status: revised current working product overview
Prepared: 25 August 2026

## 1. Mission

Fervo Social is an adults-only social discovery and community platform launching first in Brazil. It is intended to preserve the useful social/community functions found on legacy adult platforms while removing their crowded navigation and dated interaction model. The target experience is closer to a modern Instagram/TikTok/Reels product: fast visual discovery, a mixed vertical feed, simple profiles, local discovery, events, clubs, verified independent professional profiles, and private consent-based communication.

The product should be usable by people with limited technical confidence, including a substantial 40+ audience.

## 2. Launch assumptions

- Initial market: Brazil.
- Primary UI language: Brazilian Portuguese (`pt-BR`).
- English and Spanish are later localisation targets.
- Full adult-content access requires successful 18+ verification.
- Public identity may be pseudonymous.
- Legal identity, contact identity, verification evidence, and private management evidence must not become public profile data.
- Exact residential location or precise home coordinates must not be publicly exposed.
- Fervo may use specialist external providers, but outsourcing verification does not remove Fervo's own responsibility to enforce age gating, respond to reports, prevent bypasses, and maintain safe configuration.

## 3. Account architecture

Fervo has four public-facing account families:

1. **Private Member** - every adult has an individual account and individual verification. Two or more verified adults may later create a linked shared profile such as a couple, trio, multi-partner profile, or other approved shared relationship/group profile. The shared profile sits on top of the personal accounts rather than replacing them.
2. **Club / Business** - venue, club, or approved adult business.
3. **Event Organiser** - commercial organiser using shared business-account infrastructure but a distinct organiser feature package and pricing.
4. **Professional** - approved independent professional category. Commercial functions remain gated until legal and payment-provider review is complete.

The individual-account + linked-shared-profile structure is intended to simplify verification and relationship changes. If linked adults separate, their personal accounts remain; the shared profile can be unlinked, archived, or otherwise ended according to future product rules.

Account type, shared-profile composition, gender identity, orientation, and relationship structure are separate concepts. They must not be collapsed into one taxonomy.

## 4. Primary navigation

Authenticated member navigation is permanently limited to five items:

1. Home
2. Explore
3. Create
4. Messages
5. Profile

Legacy concepts such as dedicated Hotlist/Pics/Forums/Chatrooms/Clubs/Meets navigation are absorbed into the feed, Explore, profiles, Create, and event modules. Public chatrooms and webcam rooms are not part of the MVP. General public forums are removed/deferred.

## 5. Home and local discovery

Home uses a mixed vertical feed with three primary tabs/feeds:

- For You
- Local / Your Area - final Portuguese label still requires UX wording review
- Following

The Local/Your Area feed is not merely "who is physically closest". It is a major discovery surface influenced by a member-selected geographic scope. The intended controls may support privacy-safe selections such as 10 km, 20 km, 50 km, selected city, area, or region. Exact user locations must never be exposed, and implementation must consider triangulation risk.

Events and Professionals are feed-card/content types, not additional Home tabs.

Feed content may include member photo/video posts, text/status posts, looking-for posts, Meet Now concepts, event cards, club promotions, professional availability/promotion, official safety information, and clearly identified sponsored content.

Explore remains the broader discovery surface for profiles, clubs, events, and professionals.

## 6. Profiles and visual identity

All public profiles use a shared profile architecture rather than four unrelated profile products. Modules vary by account class.

Current visual direction:

- a coloured ring around the profile image may communicate identity/profile category;
- white may represent "prefer not to specify / none" where appropriate;
- a separate Bronze/Silver/Gold membership marker or bottom bar may communicate plan level/status;
- text labels remain mandatory so colour is never the only meaning.

The exact colour palette, iconography, and cross-account tier mapping may be refined in UX implementation, but the separation of **identity ring** from **membership-status marker** is the intended model.

Approximate location is permitted; exact home location is not. Public profile identity remains separate from login identity and verification records.

## 7. Messaging, contact links, and off-platform communication

The preferred member-to-member communication model is private one-to-one messaging plus consent-based invited group threads. There are no open public chatrooms.

Unsolicited media is not allowed.

Verified commercial/professional profiles should support an optional **Contact & Links** area. Depending on account type and future anti-scraping rules, this may include:

- telephone;
- WhatsApp;
- Telegram;
- website;
- social profile links;
- WhatsApp Community or equivalent community link.

The account owner chooses which supported contact methods to publish. Fervo should show an off-platform safety warning when a user leaves the platform. Exact viewer eligibility and anti-scraping protections remain an implementation decision.

## 8. Private media and media safety

Private media access must be explicit, server-enforced, revocable, and auditable when implemented. The intended model supports both timed access and access that remains valid until the owner revokes it.

Screenshot prevention cannot be guaranteed on the web. Fervo should instead use layered deterrence and attribution, including where practical:

- visible viewer-specific watermarks;
- research into less obvious forensic/viewer-specific watermarking;
- no easy download control;
- expiring/signed access URLs;
- access logs;
- immediate revocation of future access.

For every uploaded image/file, the uploader must make and record a media-rights/consent attestation. Even when multiple files are uploaded together, the system should record acknowledgement for each individual file.

Personal profile/gallery media should primarily represent the actual member(s). Feed/social content may have broader rules for memes, original/licensed artwork, informational graphics, and event/promotional material.

AI-generated imagery must not be used as genuine personal/member representation or normal personal-gallery content. AI-created or materially AI-altered personal imagery should be labelled `AI Content` where declared or detected. Businesses/organisers may have limited use of clearly promotional synthetic graphics. Full automated AI-image detection is not assumed at launch; enforcement may initially combine user declaration, reports, moderator review, and selective automated checks.

A dedicated **Photo & Media Rules** page is required before real uploads launch.

## 9. Events, clubs, and organisers

Clubs and organisers are intended to generate credible local inventory and event activity. Clubs and organisers share a Business account family for infrastructure such as verification, staff, billing, analytics, promotion, and event-management capabilities, but retain separate product modules and price points.

A normal personal account may participate in events and create small private/social gatherings. Commercial organiser features require a paid organiser tier or founding entitlement.

Legitimate club staff may become Fervo members and may count toward referral activation when they independently satisfy the same real-member qualification rules as everyone else. Staff status alone is not grounds for automatic rejection.

## 10. Professionals

Professional profiles are part of the discovery/feed ecosystem rather than a detached classified-ad site. The product is designed primarily around verified **independent professionals**. The exact legal boundaries for establishments, intermediaries, and third-party commercial structures must be confirmed by Brazilian counsel rather than assumed in product documents.

The long-term professional product may include verified profiles, portfolio/private galleries, availability, enquiries, reviews, analytics, visibility boosts, sponsored feed placement, and a confidential professional safety network.

Bookings, sexual-service payments, and other legally/payment-sensitive commercial functions remain behind explicit legal and provider gates.

## 11. Professional safety network

A major differentiator for Fervo is a confidential safety-intelligence system for authorised verified independent professionals.

Intended flow:

1. A verified professional submits a structured confidential safety report about a client/account.
2. Fervo moderation/safety reviews the report and any permitted evidence.
3. Validated safety intelligence may inform authorised verified professionals and/or Fervo safety decisions.
4. The reporting professional's identity, wording, timing, location, and other information that could reasonably expose the reporter must not be disclosed to the reported client.
5. If Fervo takes an account-level enforcement action, the affected client may be allowed to appeal the **Fervo decision** without receiving the confidential source report.

The system should use structured categories rather than an unreviewed free-text blacklist. Examples may include threatening behaviour, coercion/boundary violations, violence, stalking, impersonation, fraud, or other serious safety concerns. Exact taxonomy and legal/defamation/privacy safeguards require specialist review before production.

## 12. Verification and underage protection

Fervo should use a strong specialist age/identity-verification provider selected through research on Brazil document coverage, fraud resistance, liveness/age-assurance quality, privacy, retention, reliability, and cost.

If verification fails, the user must continue through the approved verification process rather than bypass it. Preferred fallback order is:

1. retry with better/accepted evidence;
2. provider-operated secondary/manual review where available;
3. a second approved specialist provider if justified;
4. only as a tightly controlled last resort, a Fervo manual process that has been legally/security reviewed.

Fervo's preferred privacy architecture is to receive a minimal verification result/reference rather than retain raw identity-document images. Provider/document-retention terms must be reviewed before launch.

Underage concerns must be an explicit report category. Fervo should also run safety education/awareness content around underage reporting, consent, safer meetings, suspicious behaviour, and platform safety. Random or targeted safety checks may be used where legally and operationally appropriate.

## 13. Reviews

Public professional reviews require a verified interaction. Public review systems for clubs/events also require appropriate eligibility evidence such as verified attendance/RSVP when implemented. Private Member profiles do not receive a public reputation-review system.

The confidential professional safety network is separate from public reviews.

## 14. Commercial model

Fervo uses separate plans for Private Members, Professionals, Clubs, and Organisers. Prices and qualification thresholds are configuration-driven. Safety features are never paywalled. Founding programmes are growth mechanisms designed to create local events and verified member activation, not mandatory paid-referral schemes. Founding free periods do not automatically convert to paid plans.

The detailed values and rules are in `02_CURRENT_DECISIONS.md` and `config/commercial-config.json`.

## 15. Advertising principles

Advertising may appear as contextual sponsored cards or placements. Advertising must not be targeted from sensitive data such as sexual orientation, private messages, health information, private galleries, exact location, or professional/client safety feedback. Sponsored content must remain clearly distinguishable from ordinary community content.

The exact feed-ranking and sponsored-content policy requires product design plus legal/privacy review before production.

## 16. Investor-ready versus beta-ready

Fervo has two different readiness targets.

**Investor-ready demonstration** should show a polished, coherent, believable product journey using clearly fictional/demo data where necessary. It should communicate the product vision, local discovery, individual + shared-profile architecture, feed, profiles, messaging, clubs/events, professional experience, safety differentiation, pricing, and responsive UX. It must not falsely claim that payments, live verification, production moderation, real media storage, or legal/provider approvals are complete.

**Beta-ready production** requires real provider integrations, approved legal/operational policies, persistent permissions/data, moderation capability, payment/email infrastructure, and launch safeguards.

## 17. Privacy, safety, and legal posture

The product should be privacy-forward by default:

- age verification before full adult access;
- pseudonymous public identity permitted;
- legal/verification identity private;
- approximate location only;
- event attendance private by default;
- consent-based media and messaging;
- no safety features behind a paywall;
- reporting, blocking, moderation, appeals, and auditability treated as core product systems.

Brazilian legal requirements, production verification design, professional commercial functionality, payment-provider approval, corporate/tax structure, data retention/deletion, and final legal text remain launch gates requiring appropriate specialist review. This pack is a product/engineering source, not a legal opinion.

## 18. Technical direction

The current implementation uses Next.js/App Router conventions through Vinext/Vite, React, TypeScript, Cloudflare Worker-compatible output, D1, and Drizzle. Authentication/session/verification-state foundations are real. Most social/product modules are still placeholder shells.

The implementation strategy is to keep the existing interface foundation and progress in small vertical slices rather than rebuild the product from zero.
