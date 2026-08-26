# Fervo Social - Current Decisions

Status: revised consolidated working decision register
Prepared: 25 August 2026

This document consolidates the latest supported decisions from Fervo project conversations, the v1.2 commercial documents, the revised Founding Club requirements, the build plan, the workflow, the pre-change audit, the current GitHub baseline, and the project-owner review completed on 25 August 2026.

Decision statuses:

- **FINAL** - current product direction unless the project owner later changes it.
- **WORKING** - current planning/design direction that may be refined without reversing the core concept.
- **PROVISIONAL** - useful current rule, intentionally not legally/operationally final.
- **RESEARCH REQUIRED** - no final decision until evidence is gathered.
- **LAUNCH GATE** - do not activate in production until specialist/provider/owner approval.

## Product and market

### D-001 - Brazil-first launch - FINAL
Brazil is the first launch market. Brazilian Portuguese is the primary UI language. English and Spanish are later localisation targets.

### D-002 - Adults-only access - FINAL
Fervo Social is 18+ only. Successful adult verification is mandatory before full restricted product access.

### D-003 - Product model - FINAL
Fervo combines legacy adult-community functionality with a simplified Instagram/TikTok/Reels-style interface and mixed vertical feed. It should remain substantially simpler than FabSwingers-style navigation.

### D-004 - Primary navigation - FINAL
Exactly five authenticated primary items: Home, Explore, Create, Messages, Profile. No sixth permanent section should be added without an explicit project-owner decision.

### D-005 - Home feeds and local discovery - FINAL direction / UX label WORKING
Home has three primary feeds only:

- For You;
- Local / Your Area - final Portuguese label still requires UX wording review;
- Following.

Events and Professionals are feed-card/content types and Explore categories, not Home tabs.

The Local/Your Area feed is a major discovery surface, not simply a list of the physically closest accounts. Members should be able to select a privacy-safe geographic scope such as 10 km, 20 km, 50 km, a city, an area, or a region. Exact user locations must not be exposed, and implementation must address location-triangulation risk.

### D-006 - No public chatrooms/webcams - FINAL
No open public chatrooms or webcam rooms in the MVP. Messaging is private one-to-one plus consent-based invited group threads. General public forums are removed/deferred.

### D-007 - Investor-ready demonstration - FINAL priority
Fervo should reach a polished investor-ready demonstration as quickly as possible without misrepresenting unfinished production systems. The investor experience should demonstrate the core product vision, major account journeys, safety differentiation, commercial model, and responsive UX using clearly fictional/demo data where real systems are not yet implemented.

Investor-ready is not the same as beta-ready. Live payments, final legal documents, production verification, production moderation operations, real media infrastructure, and final provider approvals may still be gated at the investor stage.

## Accounts and identity

### D-010 - Four account families - FINAL
Public account families are Private Member, Club/Business, Event Organiser, and Professional.

### D-011 - Separate identity taxonomies - FINAL
Account type, shared-profile composition, gender identity, orientation, and relationship structure are separate fields/concepts. They must not be merged into one taxonomy.

### D-012 - One verified adult = one individual account; shared profiles sit on top - FINAL architecture decision
Every adult has an individual Fervo account and completes individual age/identity verification.

Two or more verified adults may create a linked shared profile for an approved relationship/group structure such as a couple, trio, or multi-partner/shared profile. The shared profile is an additional profile layer linked to the underlying individual accounts; it does not replace them.

This architecture is intended to:

- simplify individual verification;
- preserve each person's personal account if a relationship changes or ends;
- allow shared profiles to be unlinked/archived without deleting the individual accounts;
- support future shared-profile permissions and subscription products.

The exact subscription/payment model for shared profiles is not yet finalised.

### D-013 - Public/private identity separation - FINAL
Public handles/display names may be pseudonymous. Email, legal identity, verification evidence, identity documents, and private management evidence do not belong in the public profile.

### D-014 - Location privacy - FINAL
Exact home location and precise residential coordinates must not be publicly exposed. Use privacy-safe geographic selections, approximate city/state labels, or broad distance/area logic when location features are implemented.

### D-015 - Profile identity rings and membership-tier markers - FINAL direction / visual mapping WORKING
Fervo should use visual profile-image rings as a recognisable identity/category signal. Text labels remain mandatory so colour is never the only meaning.

Current direction:

- profile-image ring = identity/profile-category signal;
- white may represent "prefer not to specify / none" where appropriate;
- separate Bronze/Silver/Gold bottom bar, badge, or equivalent marker = membership/plan level;
- highest paid tiers should be visually easy to identify without changing the identity ring.

The exact palette, icon treatment, and cross-account Bronze/Silver/Gold mapping remain a UX implementation detail.

### D-016 - Verification provider strategy - FINAL direction / provider RESEARCH REQUIRED
Fervo should use a strong specialist age/identity-verification provider. Provider selection must compare Brazil document coverage, fraud resistance, liveness/age-assurance quality, privacy, data retention, reliability, and price.

Outsourcing verification does not remove Fervo's own responsibilities. Fervo must still enforce verification gates, prevent bypasses, maintain safe configuration, respond to suspected-minor reports, and operate safety controls.

If verification fails, the user must remain unverified until an approved process succeeds.

Preferred fallback order:

1. retry using acceptable/better evidence;
2. provider-operated secondary/manual review where available;
3. a second approved specialist provider if justified;
4. only as a tightly controlled last resort, a Fervo-operated manual process that has been legally, privacy, and security reviewed.

### D-017 - Verification data minimisation - FINAL privacy direction / provider-dependent implementation
Fervo should avoid retaining raw identity-document images where possible. Preferred architecture: the specialist provider processes the evidence and Fervo receives only the minimum verification result/reference needed to prove status and audit the decision.

If any manual verification process is later approved, the decision must be auditable with reviewer identity, timestamp, outcome, reason/category, and verification reference. Raw document retention must be minimised and governed by an approved retention/deletion policy.

A cardholder-name match, selfie-with-document process, or paid verification fallback is not an approved method yet; these are research options only.

### D-018 - Underage reporting and safety awareness - FINAL product direction
`Underage / suspected minor` must be an explicit report category. Fervo should also publish recurring safety/education content about underage reporting, consent, safer meetings, suspicious behaviour, and platform safety. Random or targeted safety checks may be used where legally and operationally appropriate.

## Messaging, contact, media, and privacy

### D-020 - No unsolicited media - FINAL
Media permission must be explicit and revocable. Private media permissions must ultimately be enforced server-side.

### D-021 - Safety controls never paywalled - FINAL
Blocking, reporting, age-safety controls, and private-media protections are core product controls, not premium extras.

### D-022 - Event attendance privacy - FINAL
Event attendance is private by default unless the member explicitly chooses a permitted visibility state.

### D-023 - Commercial/professional Contact & Links section - WORKING
Verified Clubs/Businesses, Event Organisers, and Professionals should be able to choose which supported public contact methods to expose on their profile. Potential fields include:

- telephone;
- WhatsApp;
- Telegram;
- website;
- social links;
- WhatsApp Community or equivalent community link.

Fervo should show an off-platform safety warning when a member leaves Fervo. Exact viewer eligibility and anti-scraping/spam controls are not finalised. Private Members should use Fervo messaging by default rather than automatically publishing personal contact details.

### D-024 - Private-gallery grants, expiry, and revocation - WORKING
Private-media access should support explicit grants, immediate revocation, and both:

- timed access that expires automatically; and
- access that remains until the owner revokes it.

Access must be server-enforced and auditable. A user who is blocked or loses permission must not retain future access through normal application paths.

### D-025 - Private-media watermarking and attribution - FINAL direction
Fervo should use layered deterrence and attribution rather than promise that screenshots are impossible.

The intended approach includes, where technically appropriate:

- visible viewer-specific watermarking, for example the viewer handle and/or date/time;
- research into less obvious forensic/viewer-specific watermarking;
- signed/expiring media access;
- no easy download action;
- access logs;
- revocation of future access.

Watermarks are a deterrence and attribution measure, not a guarantee that a determined user cannot copy an image.

### D-026 - Per-file Photo & Media consent attestation - FINAL
Every uploaded file must have an associated uploader attestation. Even when several files are uploaded together, acknowledgement must be recorded for each individual file.

Core attestation concept:

> I confirm that I have the right to upload this image; every identifiable person shown is 18 or over and has consented to the image being uploaded to Fervo. I agree to the Photo & Media Rules.

Final legal wording requires specialist review.

A dedicated `Photo & Media Rules` page is required before real media uploads launch.

### D-027 - Personal media authenticity and non-photographic content - WORKING
Personal profile/gallery media should primarily represent the real member(s) linked to that profile. Misleading/stolen images must not be used as identity media.

The social/feed layer may allow broader non-photographic content such as memes, original/licensed illustrations, informational graphics, and event/promotional artwork when compliant with content/copyright rules. Exact moderation rules remain to be finalised.

### D-028 - AI-generated and AI-altered images - WORKING policy direction
AI-generated imagery is not permitted as genuine personal/member representation or normal personal-gallery content.

Personal images that are materially generated, changed, made up, or touched up using AI should be labelled `AI Content` where declared or detected.

Clubs, businesses, organisers, and event promotion may receive limited tolerance for synthetic promotional graphics when they are not presented as real member/person photography and are labelled appropriately.

Full automated AI-image detection is not assumed at launch because cost/accuracy must be researched. Initial enforcement may combine user declaration, upload rules, reports, moderator review, and selective automated checks.

## Reviews and professional safety

### D-030 - Public professional reviews - FINAL
Professional public reviews require a verified interaction.

### D-031 - Public reviews are not private-member reputation scores - FINAL
Private Member profiles do not receive a public reputation/review system. Club/event/professional review eligibility must be based on an appropriate verified interaction/attendance mechanism when implemented.

### D-032 - Confidential professional safety intelligence network - FINAL product direction / implementation deferred
Fervo should create a confidential safety-intelligence network for authorised verified independent professionals. Its purpose is to help professionals share structured safety information and reduce exposure to potentially dangerous clients.

Core requirements:

- professional submits a structured confidential safety report;
- Fervo moderation/safety reviews the report and permitted evidence;
- validated safety intelligence may inform authorised verified professionals and/or Fervo enforcement;
- reporting professional identity, wording, exact timing/location, and other information that could expose the reporter must not be disclosed to the reported client;
- use structured safety categories rather than an unreviewed free-text blacklist;
- anti-retaliation and reporter-protection design is required;
- if Fervo takes an account-level enforcement action, the affected client may appeal the **Fervo decision** without receiving the confidential source report;
- explicit encounter details must not be exposed unnecessarily.

The exact safety taxonomy, evidence rules, retention, defamation/privacy safeguards, moderator access, and professional eligibility require specialist review before production.

### D-033 - Independent professional focus; legal boundaries remain a gate - FINAL product direction / LAUNCH GATE
Professional accounts are designed primarily for verified independent professionals. The legal treatment of establishments, intermediaries, private houses, or other third-party commercial structures must not be asserted from assumption; Brazilian counsel must confirm the boundaries before production policy is finalised.

## Advertising and feed policy

### D-040 - Sponsored content - FINAL product direction
Advertising may remain through clearly identified contextual sponsored cards/placements.

### D-041 - Sensitive-data ad targeting prohibition - FINAL
Do not target advertising using sexual orientation, private messages, health information, private galleries, exact location, or professional/client safety feedback.

### D-042 - Feed ranking and sponsored-content implementation - RESEARCH REQUIRED
The exact ranking system may consider approved product signals such as recency, engagement, following relationship, interests, selected local area, quality/safety signals, and clearly separated sponsored content. Legal/privacy review is required before deciding what personal data may be used for personalisation or advertising.

## Billing periods and discounts

### D-050 - Billing periods - FINAL working commercial decision
Paid plans support:

- Monthly: 0% discount.
- Four-month plan: 10% discount, paid upfront. Customer-facing Portuguese may use `Plano de 4 meses` or `Quadrimestral`.
- Annual: 20% discount, paid upfront.

Checkout must show the total charged now, effective monthly price, discount, renewal date, automatic-renewal state, and applicable cancellation/refund information.

### D-051 - Safety not paywalled - FINAL
Essential safety functions are available regardless of plan.

## Private Member plans

### D-060 - Private pricing - FINAL working commercial decision

| Plan | Monthly | Four months | Annual |
| --- | ---: | ---: | ---: |
| Free | R$0.00 | - | - |
| Plus | R$19.90 | R$71.64 | R$191.04 |
| Premium | R$49.90 | R$179.64 | R$479.04 |

Plus is the low-friction paid tier. Premium should provide materially stronger discovery/media/profile/analytics value. The exact **entitlement matrix** - which features, allowances, limits, and advantages belong to each tier - is not yet finalised.

### D-061 - Promotions - WORKING
Use targeted promotions based on evidence of low conversion rather than constant blanket discounting that trains users to wait for sales.

## Professional plans

### D-070 - Professional pricing - FINAL working commercial decision

| Plan | Monthly | Four months | Annual |
| --- | ---: | ---: | ---: |
| Professional Basic | R$0.00 | - | - |
| Professional Essential | R$49.90 | R$179.64 | R$479.04 |
| Professional Pro | R$99.90 | R$359.64 | R$959.04 |

### D-071 - Founding Professional Pro - FINAL working commercial decision
Launch window: 30 days.

| Period | Founding price | Duration of founding rate |
| --- | ---: | --- |
| Monthly | R$79.90 | First 6 monthly billing cycles |
| Four months | R$287.64 | First four-month term only |
| Annual | R$767.04 | Complete first 12-month term |

After the founding duration, renewal uses the standard price. The normal future renewal price must be disclosed before purchase. Price-change reminders should be sent 30 days, 7 days, and 1 day before the standard price takes effect.

### D-072 - Professional commercial gate - LAUNCH GATE
Professional commercial functions that create legal/payment risk remain feature-flagged until Brazilian legal review and relevant payment/provider approval. Do not disguise subscription revenue as donations/supporter payments for tax/payment purposes.

## Club plans and Founding Club programme

### D-080 - Club pricing - FINAL working commercial decision

| Plan | Monthly | Four months | Annual |
| --- | ---: | ---: | ---: |
| Basic Club Listing | R$0.00 | - | - |
| Club Starter | R$99.00 | R$356.40 | R$950.40 |
| Club Pro | R$199.00 | R$716.40 | R$1,910.40 |

### D-081 - Founding Club Starter - FINAL working commercial decision
Every approved/verified founding club may receive Club Starter free for 12 months. No payment method is required. It must not automatically convert to paid. If the club does not actively renew at the end, it downgrades to Basic Club Listing.

### D-082 - Provisional Founding Club Pro - FINAL working commercial decision
An approved club receives provisional Club Pro for the first 60 days. To retain Pro for the remainder of the first 12-month founding period, all three requirements must be completed:

1. Business/venue verification.
2. Qualifying activity in at least 7 of the first 8 weeks.
3. 50 verified activated referred members within 60 days.

The 12-month founding period starts when the club is approved, not when qualification is completed. If Pro qualification fails, the account continues as Founding Club Starter for the remainder of year one.

### D-083 - Founding Club progress target - FINAL working commercial decision
25 activated members by day 30 is a progress indicator only. The pass/fail requirement is 50 activated members by day 60.

### D-084 - Qualifying club activity - FINAL working commercial decision
Meaningful activity can include a legitimate upcoming event, club-night announcement, meaningful event update, official venue update, approved promotional post, or meaningful change to hours/rules/facilities/availability. Duplicate, empty, or low-effort posts created only to satisfy the programme do not qualify.

### D-085 - Activated-member definition - FINAL working commercial decision
A referred member counts only after:

- age verification;
- verified email or mobile;
- minimum required profile information;
- at least one approved profile image (does not need to reveal the face publicly);
- acceptance of community and safety rules;
- remaining unblocked and unsuspended for 30 days.

No requirement exists to return on two separate days. Paid conversion is not required.

### D-086 - Referral integrity and legitimate staff referrals - FINAL working product direction
One genuine verified adult may count only once toward a founding referral target.

Use duplicate email/mobile/device/verification checks, privacy-safe provider references where available, no disposable email, manual review of suspicious batches, removal of deleted/banned/fraudulent accounts, privacy-safe pending/qualified/rejected dashboard counts, and an appeal path for rejected referrals.

Legitimate club staff are allowed to become Fervo members and may count toward the activation target when they independently satisfy the same qualification criteria as any other genuine member. Staff status alone must not disqualify them. Fake, duplicate, coerced, or fabricated accounts do not qualify.

Do not reveal private referred-member details to the club.

### D-087 - Club verification evidence - PROVISIONAL / LEGAL REVIEW REQUIRED
The current operational evidence checklist may include legal/public business name, CNPJ or applicable registration, authorised owner/manager ID, proof of authority, established website/social presence, verified business contact, venue address/proof of control, current venue photos or short video, telephone number, manual review, and optional verification video call. A website alone is insufficient.

This is not a final Brazilian legal standard. A Brazilian licensed professional should review the required evidence before production. Public profiles must not expose private ownership, identity, or management documents.

## Organiser plans and Founding Organiser programme

### D-090 - Organiser account structure - FINAL
There is no free commercial Organiser Basic plan. A person may use a normal personal account for non-commercial participation and small private/social gatherings. Commercial organiser tools require Organiser Starter or Organiser Pro.

### D-091 - Business account family - FINAL architecture decision
Clubs and organisers share a Business account family/infrastructure for verification, staff, billing, analytics, promotions, and event management. Their product modules, entitlements, and pricing remain distinct.

### D-092 - Personal-account event limits - FINAL working product direction
A personal account may RSVP, share an event it is attending, create a small private/social gathering, invite existing connections, and participate in event discussion. It does not receive public ticketed-event promotion, business analytics, sponsored event placement, multiple staff accounts, attendee exports, professional check-in tools, or commercial organiser verification.

### D-093 - Organiser pricing - FINAL working commercial decision

| Plan | Monthly | Four months | Annual |
| --- | ---: | ---: | ---: |
| Organiser Starter | R$49.00 | R$176.40 | R$470.40 |
| Organiser Pro | R$149.00 | R$536.40 | R$1,430.40 |

### D-094 - Founding Organiser - FINAL working commercial decision
Approved organisers receive Organiser Starter free for 12 months, no payment method, and no automatic paid conversion. Provisional Organiser Pro may be offered for the first 60 days.

To retain Founding Organiser Pro for the remainder of year one, the organiser must complete verification, meaningful event/update activity in at least 7 of the first 8 weeks, and one of these routes within 60 days:

- 50 verified activated members; or
- 30 verified activated members plus 75 legitimate RSVPs across verified events.

Member activation is the primary qualification. RSVP activity is a secondary route and must be protected against manipulation. Failure to qualify falls back to Founding Organiser Starter for the remainder of year one.

## Implementation and operating rules

### D-100 - Configuration-driven commercial values - FINAL
Prices, discounts, launch windows, eligibility thresholds, and plan allowances must be configuration-driven. Do not hard-code commercial values in React components.

### D-101 - Founding-programme auditability - FINAL
Founding eligibility needs an auditable event log, privacy-safe referral attribution, staff review/appeal capability, and date-simulation tests for reminders/expiry/downgrade.

### D-102 - Explicit paid conversion - FINAL
No free founding entitlement may create an unexpected paid charge. A customer must explicitly subscribe before paid conversion.

### D-103 - Evidence and certainty rule for AI work - FINAL operating rule
AI must not invent Fervo decisions or present unsupported assumptions as fact in order to give a complete or agreeable answer. If a point is uncertain, contradictory, inferred, or not decided, it must be clearly marked as `UNCONFIRMED`, `PROVISIONAL`, `ASSUMPTION`, `RESEARCH REQUIRED`, `DECISION REQUIRED`, or `LAUNCH GATE` as appropriate.

## Research, professional-advice, and launch-gated items

These items are intentionally not filled by guesswork. They should be researched or taken to the relevant professional at the appropriate phase.

### Verification and identity

- **Provider selection - RESEARCH REQUIRED:** compare specialist verification providers for Brazilian document coverage, fraud resistance, liveness/age-assurance quality, privacy, retention, reliability, price, and adult-platform suitability.
- **Manual fallback - RESEARCH REQUIRED / LAUNCH GATE:** determine whether provider manual review or a second provider is sufficient. A Fervo-operated manual process should exist only if legally/security approved.
- **Raw document retention - LAUNCH GATE:** define provider and Fervo deletion/retention obligations. Product direction is to minimise Fervo's possession of raw ID images.

### Email and account recovery

- **Transactional email provider - TO DO:** select/configure a service that can automatically send verification messages, password-reset links, security notices, subscription notices, and other required transactional mail. The current `team@fervo.social` Hostinger mailbox is an address/mailbox, not yet a complete website transactional-email system.
- Complete the password-reset delivery and secure reset flow.

### Payments, company structure, tax, and PIX

- **Accountant/legal research required:** determine when a company/entity must be formed before commercial launch and what Brazilian tax/invoice obligations apply.
- Compare a Brazilian structure with any legally viable foreign structure. Panama or another jurisdiction is an option to research, not a decided structure.
- Determine how PIX/card settlement would work for the chosen entity and which payment processors explicitly support the intended adult/professional platform categories.
- Confirm customer-facing billing, invoices, taxes, refunds, cancellations, renewals, and consumer-law requirements with appropriate professionals.

### Plan entitlements

- **TO DO:** define the full entitlement matrix - exactly what Free/Plus/Premium, Professional Basic/Essential/Pro, Club Basic/Starter/Pro, and Organiser Starter/Pro receive, including limits, allowances, analytics, discovery advantages, media limits, staff limits, and visibility benefits.

### Data and permissions

- **TO DO by implementation phase:** define who can create, see, edit, delete, grant, revoke, report, moderate, or export each type of data for posts, media, messages, shared profiles, clubs, events, reviews, subscriptions, blocks, reports, and moderation. This is the server-side permission model and should be built progressively before each real feature becomes persistent.

### Feed ranking and advertising

- **Research + legal/privacy review required:** decide ranking signals and what personalisation/advertising data may legally and ethically be used. Sensitive-data targeting prohibitions in D-041 remain fixed.

### Photo & Media Rules

- **TO DO:** draft a dedicated Photo & Media Rules page covering age/consent, rights to upload, personal identity media, non-photographic content, stolen/copyrighted content, AI-generated/AI-altered media, promotional exceptions, reporting, moderation, and sanctions. Final legal wording requires review.

### Private-gallery policy

- **TO DO:** finalise exact grant durations/defaults, expiry choices, revocation behaviour, block interaction, access logs, watermark presentation, and what platform-level screenshot/copy deterrence can realistically be provided. Do not promise that screenshots are impossible.

### Moderation operations

- **TO DO:** define the operational flow for reports: severity assessment, normal versus urgent queue, investigation, evidence access, warning/restriction/suspension/ban, escalation to senior safety staff, appeals, emergency handling, audit trail, and whether any moderation functions use external providers.

### Legal documents and professional boundaries

- Brazilian counsel should review final Terms, Privacy, Cookies, Content/Photo & Media Rules, professional-account policy, verification/retention policy, reporting/moderation rules, club/organiser evidence requirements, and the legal boundaries of independent professional and third-party commercial activity.

Work should flag these items, research them only when the relevant task is approved, distinguish verified external evidence from inference, and never silently convert them into settled facts.
