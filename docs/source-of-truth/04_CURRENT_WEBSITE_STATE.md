# Fervo Social - Current Website State

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
| Home feed | Visual shell; fixed data/local React state; current label is still `Nearby`, not the newly defined Local/Your Area concept |
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

Phase 4 must make hosted/production behaviour fail closed and require explicit environment configuration before the site is shared as an externally accessible investor preview or beta environment.

Additional future security work includes rate limiting, email ownership verification, password-reset completion, explicit origin/CSRF design for sensitive mutations, session management, and permission layers for private media/messages/blocks/reviews.

## 7. Commercial/documentation drift still present in the baseline

The repository still contains v1.1 commercial references in `AGENTS.md`, `PRODUCT_AND_ROUTES.md`, billing display code, and other documentation. The latest owner-approved working commercial decisions are represented in this Work pack.

Do not simply replace the old repository JSON in-place without adapting the code; the current Work config structure includes newer fields and the existing billing placeholder expects the older structure. Phase 2 should first fix documentation/source hierarchy. A later scoped billing-shell migration should adapt code and tests.

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

Phase 2 documentation/knowledge/source-of-truth work: **CURRENT**.

The Phase 2 scope is simple: update the project's knowledge and operating documents so Chat, Work, and Codex all use the same current rules. **Do not change actual website behaviour merely as part of creating/updating these documents.** Any product/code change - UI, pricing display, database, payments, referrals, media, verification, or other behaviour - must be handled in a separately approved implementation pass with its own testing and review.
