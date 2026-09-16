# AGENTS.md — Fervo Social

## Product mission

Build Fervo Social as a Brazil-first, adults-only social discovery and community platform with a modern mixed vertical feed, local discovery, individual and linked shared profiles, clubs, events, verified independent professionals, private messaging, private media, reviews, commercial plans, and safety/moderation systems. Keep the experience substantially simpler than legacy adult-community platforms and accessible to people with limited technical confidence, including a significant 40+ audience.

## Current source of truth

Read the current source pack before planning, reviewing, or implementing:

1. `docs/source-of-truth/07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md` — latest explicit Product Owner delta; overrides older sources only on its explicit changes. Read `00_READ_ME_FIRST.md` for the complete hierarchy and baseline.
2. `docs/source-of-truth/02_CURRENT_DECISIONS.md` — current owner-reviewed product and commercial decision register.
3. The currently approved implementation-pass brief, when one exists.
4. `docs/source-of-truth/01_PROJECT_OVERVIEW.md` and `docs/source-of-truth/03_BUILD_PLAN.md` — product model and phased roadmap.
5. `docs/source-of-truth/05_WORKFLOW.md` — operating standard for owner, Chat, Work, Codex, validation, and GitHub.
6. `docs/source-of-truth/config/commercial-config.json` — current machine-readable commercial configuration, version 1.3.
7. The approved GitHub branch and commit for evidence of what is actually implemented.
8. Living repository documents such as `docs/PROJECT_STATUS.md`, `docs/PRODUCT_AND_ROUTES.md`, and `docs/ARCHITECTURE.md`.

A later explicit project-owner decision overrides an older file. When current sources conflict, do not silently choose or infer a resolution: stop, identify the evidence, and ask for guidance.

The files `docs/Fervo_Social_Codex_Build_Spec_v1_1.md`, `docs/Fervo_Social_Route_Map_v1_1.json`, `docs/Fervo_Social_Commercial_Config_v1_1.json`, `docs/README_START_HERE.md`, and `CODEX_START_PROMPT.md` are retained only as historical implementation context. They are superseded as current product/commercial/operating authority. See `docs/SUPERSEDED_SOURCES.md`.

## Evidence and certainty rule

Accuracy is more important than completeness or agreement. State a Fervo product decision, requirement, or implementation detail as confirmed only when supported by the current source pack, current repository/site evidence, an explicit owner decision, or established project context.

Label uncertainty explicitly as one of:

- `UNCONFIRMED`
- `PROVISIONAL`
- `ASSUMPTION`
- `RESEARCH REQUIRED`
- `DECISION REQUIRED`
- `LAUNCH GATE`

Do not invent missing product, legal, safety, privacy, operational, commercial, or provider decisions. External research is evidence for discussion, not an approved Fervo decision or legal-compliance claim.

## Core product rules

- The permanent five-item rule is superseded. Launch destinations are Home/Feed, Create, Clubs & Events, Messages, public-facing Profile, and Health / Safety / Advice, using clean icon-led navigation with accessible labels. Explore is not a permanent destination; Search remains available.
- One Feed has selectable Public, Nearby/Distance, and Friends views. The old required For You / Local-Your Area / Following tabs are superseded. Friends-of-Friends is an audience permission, not a fourth view. Final Portuguese labels and detailed permission rules remain decision required.
- Text, pictures, and short video are ordinary profile-linked posts; no separate Reels product or native app at launch. Responsive mobile web is the launch target.
- Professionals are **DEFERRED / OWNER REACTIVATION REQUIRED**, not a normal unresolved `DECISION REQUIRED`. They remain in the architecture/roadmap but out of launch scope until the Product Owner explicitly reactivates that phase; commercial/provider gates remain in force.
- Profile opens the public-facing member experience; owner-only account/settings are secondary. Do not add STI-test dates, medical-test uploads, “clean” status, or comparable member health trust claims.
- Use profile images where available, with a prominent identity/category ring separate from composition, activity, availability, membership, and commercial indicators. Exact taxonomy/badge design remains decision required.
- Subtle golden-flame movement and restrained micro-interactions with reduced-motion support are approved targets, not evidence of implementation.
- Every human adult has an individually verified account. A couple, trio, multi-partner, or other approved shared profile is a linked profile layer on top of individual accounts; it does not replace them.
- Keep account type, shared-profile composition, gender identity, orientation, and relationship structure as separate concepts.
- Use a shared profile architecture with modules by account family; do not create four unrelated profile applications.
- Use Brazilian Portuguese as the default UI language. English and Spanish are later localisation targets.
- Use dark mode with the approved purple-and-gold visual direction unless an approved pass changes it.
- No public chatrooms or webcam rooms. Use private one-to-one messaging and consent-based invited group threads only.
- No unsolicited media. Media permissions must be explicit, revocable, and server-enforced once real media exists.
- Do not expose exact home locations or precise residential coordinates. Assess triangulation risk in Local/Your Area features.
- Public pseudonymous identity must remain separate from private login, legal, contact, and verification identity.
- Safety controls are never paywalled.
- Never use colour alone to communicate identity, account type, plan, or status. Identity rings and membership-tier markers are separate concepts and require text labels.
- Professional commercial functions remain behind legal and payment-provider launch gates.
- Investor-ready demonstration work must use clearly fictional/demo data and must not claim beta or production readiness.

## Commercial rules

- Treat `docs/source-of-truth/config/commercial-config.json` version 1.3 as the current machine-readable authority.
- Prices, discounts, launch windows, qualifications, and entitlements must be configuration-driven rather than hard-coded in UI components.
- Founding free periods require no payment method and never auto-convert to paid.
- The full plan-entitlement matrix is `DECISION REQUIRED`; do not invent plan benefits or limits.
- The current Billing shell still reads the historical v1.1 runtime fixture. This is a documented implementation gap, not permission to change billing behavior during a documentation-only pass.

## Workflow and scope control

The immediate post-founder sequence is: Phase 0 verification/reconciliation; Phase 1 low-risk visual/dynamic work; Phase 2 navigation and one-Feed view shell; Phase 3 Clubs & Events; Phase 4 public Profile/secondary settings; Phase 5 privacy/data alignment. Professionals are deferred. These phase numbers are distinct from the retained long-term production roadmap. Phase 0 authorises documentation only; do not implement the handover, commit, push, merge, or deploy without subsequent approval.

- Work one bounded pass and one primary objective at a time.
- Confirm the repository, branch, starting commit, clean working tree, source references, included scope, and explicit non-goals before editing.
- Preserve unrelated work and prefer reversible changes.
- Do not commit, push, merge, deploy, add dependencies, create migrations, or activate integrations unless the owner explicitly authorises that action.
- Product owner has final authority. Chat clarifies/synthesises, Work researches/plans/reviews, Codex implements, automated tools validate mechanics, and GitHub preserves history.
- Stop when authoritative sources conflict, evidence is insufficient, scope would expand, a destructive change appears necessary, credentials/production data are required, or legal/provider approval is needed.

## Engineering expectations

- Prefer TypeScript strict mode, clear domain types, schema validation, and server-side authorisation.
- Start substantive implementation with an approved plan and affected file tree.
- Add tests proportionate to risk, especially for permissions, privacy, identity, location, private media, billing, and moderation.
- Run the repository-supported typecheck, lint, tests, and build after meaningful implementation changes. Report missing or failed checks truthfully.
- Do not add production dependencies without explaining purpose, alternatives, runtime/bundle impact, maintenance, licence, and security implications.
- Never commit real secrets or `.env` files. Keep safe variable names/defaults in `.env.example`.
- Never seed explicit media; use safe abstract or fictional placeholders.
- Target WCAG 2.2 AA and preserve keyboard support, meaningful labels/errors, focus management, reduced motion, text scaling, and colour-independent meaning.
- Production verification, email, payments, storage, moderation, deletion, and other critical integrations require separate approved passes and fail-safe configuration.

## Task completion

For each pass report:

- pass name, branch, and starting commit;
- source/decision references;
- objective and non-goals;
- files created, modified, moved, or removed;
- dependencies, database/migrations, and configuration/environment impact;
- validation results;
- privacy/safety impact;
- `UNCONFIRMED`, assumptions, decisions required, launch gates, and known limitations;
- Git status and recommendation for review.

Do not mark owner approval, merge, or deployment complete unless it actually occurred.
