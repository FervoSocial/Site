# Fervo Social - Current Website State

## 16 September 2026 verification update

Verified remote source: `phase2/source-of-truth` at `ae16985f32b939c591372f141ffa9ff8493b7890`, descended from the accepted Phase 1 implementation baseline. Current local documentation pass: `post-founder-review/phase0-reconcile`, pending owner review and uncommitted.

Read [the founder delta](07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) for approved targets and [the Phase 0 evidence report](08_PHASE0_RECONCILIATION_2026-09-16.md) for current code drift. Older baseline validation below is historical, not this pass's results.

Current code still has five member navigation items with Explore and Profile → `/me`; three visible Para você / Perto de você / Seguindo tabs; the old Feed heading; a placeholder Create sheet; exposed professional discovery/demo; static gold-smoke imagery; initials/abstract profile placeholders; and placeholder Safety/Help. Dedicated launch Clubs & Events and Health/Safety surfaces, the public Profile destination, revised Feed views, professional launch deferral, and dynamic flame treatment are **not implemented by this documentation pass**.

The immediate founder sequence is verification → visuals → navigation/Feed shell → Clubs & Events → public Profile/settings → privacy/data alignment; Professionals deferred. Broader production/security/data work remains open.

Status: current baseline summary
Prepared: 25 August 2026

> **Repository integration note:** this file records the Phase 2 starting baseline. The living post-reconciliation status is `../PROJECT_STATUS.md`; statements below about stale repository documentation describe the state before this branch updated it.

This file replaces outdated status statements in the 5 August pre-change audit and older repository documentation. It does not erase those historical reports; it records what is currently known after the clean Phase 1 baseline work.

## 1. Repository and checkpoint

Canonical repository: `FervoSocial/Site`

Default branch: `main`

Current controlled product baseline: `phase1/clean-baseline`

Baseline commit: `bc7208c74c689555fb6eb2f7043816c28618f814`

The baseline branch is pushed to GitHub. It contains the same source tree as the older Codex synchronization branch `agent/sync-fervo-social-phase-1`, but uses the corrected project commit identity and controlled Phase 1 checkpoint. The older draft PR is therefore a duplicate path, not a different product version.

At pack preparation time, the baseline had not yet been merged to `main`; Work must inspect the baseline branch rather than assume `main` is current.

## 2. Clean baseline validation

The following were completed on the clean Git-managed working copy:

- `npm ci`: PASS;
- TypeScript (`npx tsc --noEmit --pretty false`): PASS;
- lint: PASS;
- tests: 15/15 PASS;
- production build: PASS;
- staged diff check: PASS;
- generated dependency/build folders remained ignored.

Baseline warnings to carry forward, not auto-fix during documentation work:

- npm reported 21 dependency vulnerabilities at the time of clean install (1 low, 4 moderate, 16 high);
- npm warned about several install scripts not covered by its allow-scripts policy;
- Vinext build emitted route-classification warnings for dynamic APIs such as cookies/headers; build still exited successfully.

Do not run broad `npm audit fix --force` as an unreviewed baseline action. Dependency remediation should be a scoped pass.

## 3. Architecture

Current stack/evidence:

- Next.js 16 App Router conventions compiled through Vinext/Vite;
- React 19;
- TypeScript strict mode;
- Cloudflare Worker-compatible output;
- Cloudflare D1 with Drizzle ORM;
- password-based authentication;
- hashed opaque sessions in HttpOnly cookies;
- sandbox-only age-verification state machine;
- pt-BR copy centralised primarily in `lib/i18n.ts`;
- no real media storage or real-time messaging service yet.

## 4. What is real versus shell/mock

| Area | Current state |
| --- | --- |
| Landing | Polished public UI shell |
| Registration | Real D1 identity/profile/session foundation; current data model does not yet implement the newly approved individual-account + linked-shared-profile architecture |
| Login | Real password/session foundation |
| Logout/discreet exit | Real session revocation/clear path |
| Password recovery | Token request foundation only; no transactional email delivery/reset completion |
| Age verification | Sandbox foundation only; production provider not selected |
| Authenticated route guard | Real server-side approved-session guard |
| Admin route guard | Real moderator/admin role guard exists |
| Home feed | Visual shell with fixed data/local state and old Para você / Perto de você / Seguindo tabs; approved one-Feed Public / Nearby-Distance / Friends switch is not implemented |
| Explore | Visual shell; fixed results/local controls |
| Create | Placeholder sheet |
| Private profile | Visual shell / fixed demonstration |
| Linked shared profile | Product architecture now approved; not yet implemented as a real linked-account system |
| Club/organiser profiles | Visual shells / fixed demonstration |
| Professional profile | Visual shell / fixed demonstration; commercial gate visible |
| Galleries | Visual shell; no real files, per-file consent records, watermarking, or server permission model |
| Messages | Visual shell; no delivery/persistence |
| Events | Visual shell; no real RSVP/ticketing |
| Reviews | Embedded visual shells; no real eligibility/submission/moderation |
| Professional safety network | Product direction approved; not implemented |
| Billing | Configuration-driven display shell using repository v1.1 commercial config; no checkout/entitlements |
| Moderation UI | Role-protected visual shell; no real moderation operations/evidence/actions |
| Safety/help/legal | Placeholder pages; no final Photo & Media Rules |

## 5. Implemented identity/privacy foundation

Current persistent Phase 1 tables include users, auth identities, profiles, profile members, sessions, verifications/state, consent records, password recovery tokens, privacy settings, security events, and account-type lookup data.

Positive boundaries already present:

- private sign-in identity separated from public profile identity;
- pseudonymous public handles/display names supported;
- password/session/recovery values are hashed appropriately in the current foundation;
- exact home address/precise coordinates are not represented in the current schema;
- date of birth is used for the registration adult check but not retained in Phase 1;
- authenticated application routes require approved verification state;
- admin routes additionally require a moderation/admin role.

The new architectural decision that every adult has an individual verified account and shared couple/trio/group profiles sit on top of those accounts will require a later scoped data-model and UX pass. Do not assume the current `profile_members` foundation already implements the complete new model.

## 6. Main security issue to fix before external/public preview

The verification API currently defaults to sandbox mode when `VERIFICATION_PROVIDER_MODE` is absent. In sandbox mode an authenticated pending user can invoke the sandbox approval action. This is acceptable only in an explicit local/test environment.

Long-term production-roadmap Phase 4 (not Post-Founder Phase 4) must make hosted/production behaviour fail closed and require explicit configuration before an externally accessible investor preview or beta.

Additional future security work includes rate limiting, email ownership verification, password-reset completion, explicit origin/CSRF design for sensitive mutations, session management, and permission layers for private media/messages/blocks/reviews.

## 7. Commercial/documentation drift still present in the baseline

The earlier documentation-authority drift was reconciled at the Phase 2 checkpoint. Historical v1.1 documents remain superseded. A runtime mismatch remains: billing display code imports v1.1, while current commercial authority is `config/commercial-config.json` (v1.3). The 16 September delta retains non-conflicting commercial decisions.

Do not simply replace the old repository JSON in-place without adapting the code; the current config structure includes newer fields and the existing billing placeholder expects the older structure. A later separately approved billing-shell migration must adapt code and tests. This documentation pass does not do so.

Older repository `PROJECT_STATUS.md` also contains stale statements that GitHub is empty/local-only and that Phase 1 is awaiting acceptance. Those are obsolete.

## 8. Product implementation gaps

No authoritative persistent systems yet exist for:

- posts/comments/reactions and feed ranking;
- Local/Your Area geographic discovery controls;
- real profile editing/taxonomies;
- linked shared relationship/group profiles;
- real media/albums/access grants/expiry/revocation;
- per-file upload consent/Photo & Media Rules records;
- viewer-specific/forensic watermarking;
- AI-content declaration/moderation;
- message threads/messages/media consent;
- club/business verification;
- organiser business data;
- public contact/link controls;
- events/RSVPs/waitlists;
- professional verification/services;
- confidential professional safety reports/intelligence;
- real reviews;
- subscriptions/entitlements/invoices/payments;
- founding referrals/qualification;
- blocks/reports;
- real moderation case operations.

There are therefore many areas still to build. That is expected at this stage and is one reason the build plan distinguishes investor-demo readiness from beta/production readiness.

## 9. Professional-advice/provider gaps

The project still needs dedicated research or professional advice for:

- Brazilian legal review;
- accounting/corporate/tax structure;
- Brazil versus any foreign-entity option;
- PIX/card payment-provider compatibility;
- age/identity-verification provider selection;
- transactional email delivery;
- final Photo & Media Rules/legal text;
- moderation and retention obligations.

These can be researched in parallel with product development, but affected production features remain gated until appropriate decisions are made.

## 10. Current phase boundary

Phase 1 clean baseline: **COMPLETE**.

Phase 2 documentation checkpoint: **ESTABLISHED at `ae16985`**. Current Post-Founder Phase 0 reconciliation: **PENDING OWNER REVIEW**. No broader production phase is marked complete.

The Phase 2 scope is simple: update the project's knowledge and operating documents so Chat, Work, and Codex all use the same current rules. **Do not change actual website behaviour merely as part of creating/updating these documents.** Any product/code change - UI, pricing display, database, payments, referrals, media, verification, or other behaviour - must be handled in a separately approved implementation pass with its own testing and review.
