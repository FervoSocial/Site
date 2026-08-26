# Fervo Social - Master Build Plan

Status: active roadmap
Prepared/updated: 25 August 2026

Work one phase and one bounded pass at a time. The project owner reviews checkpoints before the next pass begins.

## Phase 1 - Establish a clean project baseline - COMPLETE

Completed:

- generated folders excluded/ignored;
- Git repository and `main` confirmed;
- clean working branch created;
- `.gitignore` verified;
- `.env.example` present;
- no real secrets found in the baseline scan;
- clean dependency installation completed;
- TypeScript typecheck passed;
- lint passed;
- tests passed (15/15);
- production build passed;
- results recorded;
- clean Git checkpoint created and pushed.

Controlled checkpoint:

- Branch: `phase1/clean-baseline`
- Commit: `bc7208c74c689555fb6eb2f7043816c28618f814`

Completion condition: satisfied.

## Phase 2 - Establish the knowledge and operating source of truth - CURRENT

Objectives:

- owner-review and finalise this Work source pack;
- update repository `workflow.md`;
- update repository `AGENTS.md` so it no longer treats stale v1.1 commercial/status material as current;
- add the current commercial decisions/configuration to the repository;
- add/update the decision register;
- add/update product/source-of-truth index;
- update `PROJECT_STATUS.md`;
- clearly mark/archive superseded commercial/status sources;
- reconcile stale repository documentation identified in this pack;
- run an independent Work review of the Phase 1 baseline and documentation consistency;
- owner approves the documentation/knowledge baseline;
- create the Phase 2 Git checkpoint.

Important scope rule: **Phase 2 changes project knowledge and operating documents only. Actual product behaviour/code changes must be handled as separate approved implementation passes.** Do not alter the live UI, pricing behaviour, database, payments, referrals, media systems, or production verification merely because a document has been updated.

Completion condition: Chat, Work, and Codex can identify the current product/commercial/operating rules without relying on contradictory historical files.

## Parallel research and professional-advice track - START DURING PHASE 2

This track can begin while product development continues. It does not automatically block the investor-ready demonstration, but affected features must not go live in production until required advice/approval is complete.

### Legal

- Brazilian lawyer review of club/organiser verification evidence;
- legal boundaries for independent professional accounts and third-party commercial structures;
- age/identity verification obligations and data-retention responsibilities;
- Terms, Privacy, Cookies, Content, Photo & Media Rules, professional-account rules;
- moderation/reporting/appeal obligations;
- advertising/personalisation/privacy review;
- payment/subscription/consumer-law implications.

### Accounting/corporate/tax

- when a company/entity must exist before taking payments;
- Brazilian entity versus any legally viable foreign structure;
- tax, invoices, refunds, cancellation, renewal, accounting, and settlement implications;
- PIX/card settlement for the selected structure.

### Providers

- age/identity verification provider research;
- transactional email provider selection;
- adult-compatible payment provider research;
- later media/storage/moderation provider research where required.

### Product-policy work

- full paid-plan entitlement matrix;
- Photo & Media Rules;
- private-gallery grant/expiry/revocation/watermark rules;
- feed ranking and sponsored-content policy;
- moderation operations and emergency/escalation workflow.

## Phase 3 - Route-by-route website inventory

For every major route classify it as:

- working with real data;
- working with mock data;
- visual shell only;
- broken;
- missing.

Review public home, login, registration, verification, Home, Explore, Create, Messages, private profile, linked/shared-profile concept where represented, professional profile, club profile, organiser profile, events, galleries, reviews, subscriptions, settings/account management, and admin/moderation.

Test desktop, tablet, mobile, direct refresh, back/forward, loading, empty, and error states.

Completion condition: current behaviour and missing behaviour are known route by route.

## Phase 4 - Preview-safe environment and security foundations

Before major persistent social features or an externally shared investor preview:

- make age-verification sandbox mode explicit;
- hosted/production environments fail closed when verification configuration is missing;
- validate required environment variables;
- review protected routes;
- review session/logout behaviour;
- review password/recovery handling;
- add rate-limit/abuse design for auth and verification endpoints;
- review upload restrictions before real media exists;
- define private-media access pattern;
- confirm exact location cannot leak;
- define block propagation direction;
- keep sensitive data away from ad/analytics targeting;
- add appropriate security tests.

Completion condition: the application fails safely when verification, secrets, or required services are missing and is suitable for a controlled investor preview using demo/sandbox systems.

# Priority Milestone A - Investor-Ready Demonstration

This milestone should be pursued as soon as Phases 2-4 provide a clean source of truth, route inventory, and preview-safe foundation.

The objective is **not** to fake production readiness. It is to make the product convincing, coherent, polished, and easy to demonstrate to investors.

Investor-demo priorities:

- polished public landing and onboarding story;
- coherent 18+ verification demonstration without implying the sandbox is production;
- Home with For You / Local-Your Area / Following experience;
- Local/Your Area selector concept showing privacy-safe radius/city/region control;
- clear individual account + linked shared-profile concept;
- polished Private Member profile and media states;
- Explore for people, clubs, events, and professionals;
- Create flow/prototype for major content types;
- Messages/introduction/media-consent journey;
- Club and Organiser profiles/events;
- Professional profile and the confidential safety-network proposition;
- pricing/founding offers presented consistently;
- profile identity rings and tier-marker concept;
- contact/link options for commercial/professional profiles;
- strong safety, consent, reporting, and Photo & Media positioning;
- responsive investor path on mobile and desktop;
- no unexplained dead ends on the planned investor journey;
- clearly fictional/demo data wherever live systems do not exist;
- successful build and required checks.

The investor demo does **not** require live payment processing, final legal sign-off, production identity-provider integration, full real-time messaging, production-scale moderation, or final corporate/tax structure. Those must remain clearly labelled as future/gated systems.

Completion condition: Fervo can be demonstrated end-to-end to investors as a credible product and business without making false claims about production systems.

## Phase 5 - Finalise the authoritative data and permission model

Define persistent entities and permissions for:

- individual users/accounts;
- linked shared relationship/group profiles;
- professionals;
- clubs;
- organisers;
- events;
- posts;
- photos/videos;
- media attestations and Photo & Media Rules acceptance;
- albums/access grants/expiry/revocation/access logs;
- messages and media consent;
- reviews;
- confidential professional safety reports/intelligence;
- blocks;
- reports;
- subscriptions/entitlements;
- founding programmes/referrals;
- verification records;
- moderation records/audit events.

Also define migrations, seed strategy, server-side authorisation, deletion/retention, and audit requirements.

Completion condition: every major real interface has an approved source of data and permission model before it becomes persistent.

## Phase 6 - Complete the Private Member MVP

Implement the first complete real user journey:

- registration;
- production-ready age-gating integration path;
- individual profile creation/editing;
- linked shared-profile creation/invitation/acceptance/unlinking foundation;
- real photo/media upload;
- per-file consent/right-to-upload attestation;
- Photo & Media Rules acceptance;
- public/friends/private galleries;
- timed and until-revoked private-media access;
- visible/forensic watermark strategy as approved;
- feed persistence;
- Local/Your Area discovery controls;
- Explore/search;
- follow/save/nudge rules;
- first-contact limits;
- private messaging;
- media-consent controls;
- blocking/reporting including underage concerns;
- event RSVP;
- Plus/Premium entitlement rules.

Completion condition: a verified private member can create and manage an individual profile, optionally participate in a linked shared profile, discover people, communicate safely, manage privacy/media, and participate in events.

## Phase 7 - Clubs and organisers

### Clubs

Implement club verification, profile, venue information, facilities/rules, events, reviews, staff accounts, optional Contact & Links/WhatsApp details, analytics, Starter/Pro entitlements, and founding-programme tracking.

Founding Club must support provisional 60-day Pro, verified business/venue evidence, 7 qualifying weeks of 8, 50 activated members in 60 days, privacy-safe referral dashboard, fraud review/appeal, legitimate qualifying staff referrals, Starter fallback, and no automatic paid renewal.

### Organisers

Keep personal-account participation. Implement commercial Starter/Pro, commercial verification, event publishing, RSVP/waitlist, staff access, Contact & Links, analytics, and the Founding Organiser qualification routes.

Completion condition: verified clubs and organisers create credible local inventory and safely drive member activation.

## Phase 8 - Professional accounts and safety network

Implement:

- professional verification;
- Basic/Essential/Pro entitlements;
- founding launch price;
- portfolio/private galleries;
- availability/service-area controls;
- optional Contact & Links;
- enquiry controls;
- public verified-interaction reviews;
- confidential structured professional safety intelligence;
- anti-retaliation/reporter-protection rules;
- Fervo moderation/review of safety reports;
- client appeal of Fervo enforcement without disclosure of confidential reporter/source details;
- analytics;
- boosts;
- sponsored placement.

Keep legally/payment-sensitive commercial functions gated until approved.

Completion condition: verified independent professionals can maintain a safe, commercially useful presence and use Fervo's safety network without Fervo exposing confidential reporter information.

## Phase 9 - Pricing, subscriptions, company/payment readiness

Before production payment activation, complete the approved company/accounting/legal/provider research.

Implement configuration-driven plan entitlements and billing for Private, Professional, Club, and Organiser plans; monthly/four-month/annual periods; approved PIX/card provider paths; renewal notices; cancellation; failed-payment handling; founding expiry; no unexpected paid conversion; promotion codes/targeted offers; invoices/taxes/refunds as legally/provider-approved; subscription analytics.

Completion condition: every displayed price/entitlement comes from configuration/data and production payment behaviour is explicit, legally/provider approved, and testable.

## Phase 10 - Moderation, privacy, and safety operations

Implement:

- report intake, including suspected-underage reporting;
- severity assessment;
- normal and urgent safety queues;
- content/media review;
- sanctions: warning/restriction/suspension/ban as approved;
- escalation to senior safety staff;
- appeals;
- emergency handling/runbooks;
- public review moderation;
- professional safety-report moderation and restricted access;
- referral-fraud review;
- recurring safety/safer-meeting content;
- privacy controls;
- account deletion/data export;
- audit logs;
- moderator permissions;
- provider ownership/integration where approved.

Completion condition: Fervo can respond to abuse, protect private media/reporters, enforce decisions, and provide appropriate review/appeal/auditability.

## Phase 11 - Controlled Brazilian beta preparation

Complete:

- pt-BR interface;
- core English translation if still required for beta;
- specialist-reviewed legal documents;
- approved payment/verification providers;
- transactional email delivery and password reset;
- Photo & Media Rules;
- mobile performance;
- accessibility;
- backup/recovery;
- monitoring/error reporting;
- founding campaigns;
- closed beta;
- launch-defect correction.

Completion condition: ready for a controlled Brazilian beta, not automatically a full public launch.

## Standard cycle for each bounded pass

1. Product decision/goal is agreed in Chat with the owner.
2. Work researches, inspects sources, and prepares a bounded implementation/review brief.
3. Uncertain points are labelled, not invented.
4. Owner approves the brief when required.
5. Codex implements only the approved code scope on a dedicated branch.
6. Automated checks run.
7. Browser/manual checks run.
8. Work independently reviews the result against the approved brief.
9. Chat synthesises evidence and recommends approve / approve with limitations / reject and correct.
10. Owner makes the final decision.
11. Git checkpoint/PR/merge occurs only with explicit owner approval.
