# Fervo Social - Project Status

## Post-Founder Phase 4 — public Profile and secondary settings, pending Product Owner review

Starting checkpoint: approved `post-founder-review/create-composer` at `dc7a69be3d922e43db83651d5f6640c10665ff1d`. Working branch: `post-founder-review/phase4-profile-public`.

This bounded pass changes the Profile destination at `/me` from an account dashboard into the signed-in member's public/social profile experience. It uses the existing verified session and basic persisted profile record for public display name, handle, privacy-safe location state, linked adult identity evidence, and Public text posts. The universal `/profile/:handle` route can render those safe persisted basics for registered Private Members while retaining fictional demonstrations for visual review.

Owner-only administration is now secondary: `/me/profile/edit` is a clearly labelled local preview with no fake save or persistence, and `/me/settings` contains the existing private identity, verification, privacy/security, billing, session, and logout entry points. Billing rules and behavior are unchanged. Demo shared profiles explicitly show that every linked adult retains an individual verification; no couple/group verification identity, new linked-profile system, schema, migration, or verification change is introduced.

**Unresolved:** persistent biography/interests/languages and other optional social fields need an approved schema and permission model; real profile image/media storage and moderation remain gated; linked-profile invitations, consent, ownership, unlink/archive behavior, and permissions need Product Owner decisions; privacy controls remain Phase 5 work. Health claims remain prohibited. Existing galleries and visitor actions are still demonstration shells unless already documented otherwise.

No commit, push, merge or deployment is authorised before Product Owner visual review.

## Create v1 — Public text-posting foundation, approved checkpoint

Starting checkpoint: approved `post-founder-review/phase3-clubs-events` at `900596609b941391134f230b7e6587375a46b7b7`. Working branch: `post-founder-review/create-composer`.

The Create development foundation now supports authenticated text posts with an optional single photo or video for verified Private Member accounts. Posts are limited to 1,000 characters, persist in D1, link to the author's personal profile, and support author-only confirmed soft deletion. `Público`, `Somente no perfil`, and `Só eu` are enforced server-side; Friends remains disabled because a persistent relationship model does not yet exist. Shared profiles, Club/Event/Professional publishing, multiple-media galleries, drafts, editing, comments, reactions and promotion remain deferred. Production R2 provisioning, Photo & Media Rules, moderation/scanning and related operational safeguards remain launch gates.

Approved checkpoint: `post-founder-review/create-composer` at `dc7a69be3d922e43db83651d5f6640c10665ff1d`.

**Production launch gate:** broad member publishing is not production-ready. It must remain gated until minimum Content Rules, reporting/moderation handling, operational ownership, and related retention/legal safeguards are approved. Soft-deleted records have no invented purge duration; final retention/deletion policy remains unresolved. The existing moderation administration shell is not a functional enforcement system.

No commit, push, merge or deployment is authorised before Product Owner review.

## Post-Founder Phase 3 — Clubs & Events first visual/product pass, pending review

Starting checkpoint: approved `post-founder-review/phase2-navigation-feed` at `ca5653d7cdbab96a198cc493e1cc60bd233f49de`. Working branch: `post-founder-review/phase3-clubs-events`.

This controlled first pass keeps `/clubs-events` as one continuous discovery feed containing both Club and Event demonstrations. It replaces the generic Explore-card presentation with a shared Clubs & Events discovery card, preserves explicit textual type labels, adds distinct but restrained Club/Event visual cues, keeps approximate location visible, and retains the existing profile/detail links. The repeated two-part introduction is consolidated into one clear page introduction plus a compact “one flow” explanation. Event detail now returns to the unified `/clubs-events` surface rather than the retained historical `/explore/events` route.

During Product Owner annotation review, Home received bounded presentation corrections without changing its three-view logic: the Feed-view control is now an accessible themed menu in the desktop navigation rail (with mobile access in the existing More sheet), the Fervo Social wordmark is larger and centred, and the local Save action uses a solid heart with a larger central keyhole plus a proportional key while retaining the `Guardar`/`Guardado` state and accessible name. The Kling/Public, Hailuo/Distance and Seedance/Friends mapping is unchanged.

All content remains fixed fictional demo data. Existing direct Club and Event detail routes remain shells: multiple Club handles reuse one Club profile fixture, and every Event ID still renders the same example Event. This pass does not invent missing records or add ranking, filters, recommendations, promotion placement, RSVP rules, geolocation, commercial entitlements, persistence, schema, or backend behaviour. Those remain unresolved or separately gated. Phase 2 navigation, Feed backgrounds, Search, Messages, Health/Safety, identity, privacy and billing behaviour are intentionally unchanged.

No commit, push, merge or deployment is authorised before Product Owner visual review.

## Post-Founder Phase 2 — navigation and Feed shell, pending review

Starting checkpoint: approved `post-founder-review/phase1-visual-dynamics` at `9d9db2f3dbebd0604d038d3e5db97d99a25bf379`. Working branch: `post-founder-review/phase2-navigation-feed`.

This bounded pass replaces permanent Explore navigation with the founder-approved launch destinations; keeps Search through the existing profile-results surface; adds authenticated entry routes at `/clubs-events` and `/health-safety`; and changes Home to one Feed with three icon-only views whose accessible names are `Público`, `Distância` and `Amigos`. The Home masthead carries the Fervo Social wordmark and safe initials-based friend activity orbits. Selected, focus and tooltip states are explicit without restoring permanent labels. `/clubs-events` now interleaves the existing Club and Event fixtures in one vertical discovery surface with existing profile/detail links. The views and mixed discovery surface use fixed demo content only. No ranking, persistence, real geolocation, promotion system or Friends/Friends-of-Friends permission logic exists.

Desktop now uses a six-destination icon rail with hover/focus labels. Mobile uses Home, Clubs & Events, Create, Messages and More; Profile, Health/Safety/Advice and Search are available in the More sheet. This avoids a crowded six-icon bottom bar. Mobile navigation remains **PROVISIONAL / PRODUCT OWNER REVIEW PENDING**. Profile temporarily remains `/me`, because linking the current account to a genuine public profile belongs to Phase 4 and using a fictional member would be misleading.

Professionals remain **DEFERRED / OWNER REACTIVATION REQUIRED**. They are absent from launch navigation, Feed fixtures and discovery category shortcuts. Existing direct professional demonstration routes remain dormant/internal evidence and were not expanded or deleted.

Full Clubs & Events remains Phase 3; public Profile/settings remains Phase 4; Friends/Friends-of-Friends data and permissions remain Phase 5. No dependency, schema, migration, authentication, verification, privacy, billing, commercial or backend change is included. No commit, push, merge or deployment is authorised in this pass.

## Post-Founder Phase 1 — visual implementation, approved

Starting checkpoint: `post-founder-review/phase0-reconcile` at `72359036bc1ee01dc30876af48a9066df799eec6`, fetched and verified with a clean tree. Working branch: `post-founder-review/phase1-visual-dynamics`. Phase 0 is approved; the older pending-review narrative below is its original snapshot.

Approved Phase 1 checkpoint: `post-founder-review/phase1-visual-dynamics` at `9d9db2f3dbebd0604d038d3e5db97d99a25bf379`.

Implemented only visual polish: removed the old main Feed heading, added a fluid gold atmosphere with reduced-motion support, short interaction transitions, larger existing avatar/ring treatments and accessible Like/Save and header tooltips. The current production candidate replaces the experimental moving-PNG technique with one shared application-shell video system: Kling 2.5 remains global and serves Public, the Friends Feed selects the calmer Seedance 2.5 H.264 web derivative, and Distance selects the supplied H.264 Hailuo 2.3 master. Hailuo receives a runtime end-to-start crossfade because its native boundary is visibly discontinuous; Kling and Seedance behavior is unchanged. The unchanged PNG remains the poster/static fallback, and all foreground content remains stationary. No prominent motion control is placed in the header. See [Design System](DESIGN_SYSTEM.md) for exact presentation changes. Image replacement is partially implemented: no approved demo profile photos were available, so safe fallbacks remain rather than invented identities.

Phase 1 retained the older navigation and feed controls; those specific shell areas are superseded by the Phase 2 work above. Professionals remain **DEFERRED / OWNER REACTIVATION REQUIRED**. Later founder phases and outstanding production/security work are not implemented by the visual pass.

No dependencies, routes, authentication, guards, verification, schemas, commercial configuration, billing, permissions or fixture data were changed. Local preview used an ignored snapshot of the existing disposable preview database; no security bypass or schema change was needed. Phase 1 was committed and pushed only after Product Owner approval; it was not merged or deployed.

## 16 September 2026 verification update

Verified remote source: `phase2/source-of-truth` at `ae16985f32b939c591372f141ffa9ff8493b7890`, descended from the accepted Phase 1 implementation baseline. Current local documentation pass: `post-founder-review/phase0-reconcile`, pending owner review and uncommitted.

Read [the founder delta](source-of-truth/07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) for approved targets and [the Phase 0 evidence report](source-of-truth/08_PHASE0_RECONCILIATION_2026-09-16.md) for current code drift. Older baseline validation below is historical, not this pass's results.

At this Phase 0 verification snapshot, code still had five member navigation items with Explore and Profile → `/me`; three visible Para você / Perto de você / Seguindo tabs; the old Feed heading; a placeholder Create sheet; exposed professional discovery/demo; static gold-smoke imagery; initials/abstract profile placeholders; and placeholder Safety/Help. The approved Phase 1 and current Phase 2 sections above supersede this historical implementation snapshot.

The immediate founder sequence is verification → visuals → navigation/Feed shell → Clubs & Events → public Profile/settings → privacy/data alignment; Professionals deferred. Broader production/security/data work remains open.

Status: Post-Founder Review Phase 0 documentation reconciliation pending owner review; Phase 2 checkpoint established
Last reconciled: 25 August 2026 source pack

This living file reflects the approved 25 August 2026 source pack and replaces outdated status statements in the 5 August pre-change audit and older repository documentation. It does not erase those historical reports.

## 1. Repository and checkpoint

Canonical repository: `FervoSocial/Site`

Default branch: `main`

Current controlled product baseline: `phase1/clean-baseline`

Baseline commit: `bc7208c74c689555fb6eb2f7043816c28618f814`

Current documentation working branch: `phase2/source-of-truth`

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
| Home feed | One Feed shell with provisional Público / Distância / Amigos demo views; fixed data and local state only |
| Search/results | Existing Explore result routes retained internally; `/explore/profiles` is the current Search entry, with fixed results/local controls |
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
| Health/Safety/Advice | Minimal authenticated editorial launch shell at `/health-safety`; public Safety/Help/legal placeholders remain and no final Photo & Media Rules exist |

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

## 7. Commercial/documentation reconciliation

This Phase 2 branch updates `AGENTS.md`, the documentation index, product/routes documentation, development guidance, and project status to treat the 25 August 2026 pack as current authority. Historical v1.1 files are explicitly marked superseded rather than deleted.

One intentional implementation mismatch remains: `lib/billing-placeholder.ts` still imports `docs/Fervo_Social_Commercial_Config_v1_1.json`, while current commercial authority is version 1.3 at `docs/source-of-truth/config/commercial-config.json`. Do not replace the old JSON in place without adapting code and tests; the structures and founding rules differ. A later scoped billing-shell pass must migrate the runtime display.

Earlier statements that GitHub was empty/local-only or that Phase 1 awaited acceptance are obsolete and no longer presented as current status.

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
