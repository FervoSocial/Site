# Fervo Social - Read Me First

Status: revised working source pack for ChatGPT Work
Prepared: 25 August 2026

Reconciled: 16 September 2026. Read [the latest Product Owner delta](07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md) first. This delta changes only its explicit product decisions; the remaining August decisions and commercial configuration v1.3 remain authoritative.

Remote checkpoint verified for this pass: `phase2/source-of-truth` at `ae16985f32b939c591372f141ffa9ff8493b7890`. Local review branch: `post-founder-review/phase0-reconcile`. No implementation, commit, push, merge, or deployment is authorised in this pass.

> **Repository integration note:** this approved pack was imported on `phase2/source-of-truth` from the controlled `phase1/clean-baseline` starting point. References below to stale repository documentation describe the Phase 2 starting state; the repository copies are reconciled in this branch without changing product behaviour.

## Purpose

This folder gives Work a compact, current, conflict-aware view of Fervo Social. It is intentionally smaller than the historical project archive. Work should use these files for current product reasoning and use the GitHub repository for implementation evidence.

## Product in one paragraph

Fervo Social is a Brazil-first, adults-only social/community platform: one mixed vertical Feed with ordinary text, picture and short-video posts, discovery, profiles, linked shared relationship profiles, clubs, events, private messaging, private media, reviews, commercial plans, and safety/moderation systems. Professionals remain in the architecture but are deferred from initial public launch. There is no separate Reels product or required native app at launch. Brazilian Portuguese is the primary launch language. Public identity may be pseudonymous; legal identity and verification data remain private.

## Canonical implementation source

Repository: `FervoSocial/Site`

Current controlled baseline branch: `phase1/clean-baseline`

Current controlled baseline commit: `bc7208c74c689555fb6eb2f7043816c28618f814`

At the time this pack was prepared, the clean baseline had been pushed but had not yet been merged into `main`. Do not assume `main` contains the latest accepted source until GitHub is checked.

There is an older draft PR from `agent/sync-fervo-social-phase-1`. Its source tree is identical to the clean baseline tree, so it is a duplicate historical synchronization path rather than a different product version. Do not merge, close, or modify any PR unless the project owner explicitly authorises it.

## Source-of-truth order

When sources conflict, use this order:

1. Later explicit Product Owner decisions, currently `07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md`, applied only to their explicit changes, and the reconciled `02_CURRENT_DECISIONS.md`. Retain all non-conflicting prior decisions.
2. The currently approved implementation-pass brief, when one exists.
3. `01_PROJECT_OVERVIEW.md` and `03_BUILD_PLAN.md`.
4. `05_WORKFLOW.md`.
5. `config/commercial-config.json` for machine-readable commercial values.
6. The approved GitHub branch for evidence of what is actually implemented.
7. Repository documents such as `AGENTS.md`, `PRODUCT_AND_ROUTES.md`, and `PROJECT_STATUS.md`. Their current authority references are reconciled; historical v1.1 references and runtime dependencies do not reinstate superseded product decisions.
8. Older project files and project-chat history as historical context only.

A later explicit owner decision overrides an older file.

## Evidence and certainty rule

Accuracy is more important than completeness or agreement.

AI must only state a Fervo Social fact, decision, requirement, or implementation detail as confirmed when it is supported by one or more of:

- an approved source document;
- the current repository or website state;
- an explicit project-owner decision;
- established discussion/context from this project.

If something is uncertain, incomplete, contradictory, inferred, or not yet decided, label it clearly as one of:

- `UNCONFIRMED`
- `PROVISIONAL`
- `ASSUMPTION`
- `RESEARCH REQUIRED`
- `DECISION REQUIRED`
- `LAUNCH GATE`

Do not invent a decision, fill a gap with unsupported assumptions, or present speculation as fact merely to produce a complete or agreeable answer.

## Work's role

Work is the project research, planning, synthesis, and independent review layer. Work should inspect files, GitHub, and external sources where research is approved; produce implementation briefs; review Codex output against approved requirements; and identify product, security, privacy, accessibility, commercial, or legal/provider issues.

Work is not the default code-writing agent. Codex remains the implementation engineer. Work must not commit, push, merge, deploy, create migrations, or make production changes unless the project owner explicitly changes the task.

## Current project stage

Phase 1 - clean project baseline: **COMPLETE**.

Phase 2 source-of-truth checkpoint is established at `ae16985`. Current work is **Post-Founder Review Phase 0: documentation reconciliation and verification, pending owner review**. The immediate sequence in `03_BUILD_PLAN.md` does not complete or replace outstanding production/data/security work.

A separate **Investor-Ready Demonstration milestone** is now a priority after the route inventory and minimum preview/security hardening. It is distinct from production/beta readiness and must not make false claims about unimplemented live systems.

## Known deliberate gaps

The platform is not yet a functioning full social network. Authentication/session foundations are real, but most feed, discovery, profile, gallery, message, event, review, billing, and moderation experiences remain polished shells or placeholder-data demonstrations. Production age verification, transactional email delivery, real media storage, real messaging, commercial verification, payments, and moderation operations remain unimplemented or gated.

## Safety rule

Fervo Social is 18+ only. Safety functions are never paywalled. No work should weaken age gating, private-media controls, block/report semantics, pseudonymity, approximate-location protections, consent-based messaging, professional safety protections, or the separation of public profile identity from private legal/verification identity.

## Files in this pack

- `07_POST_FOUNDER_REVIEW_HANDOVER_2026-09-16.md` - latest approved founder delta, faithfully transcribed from the supplied DOCX.
- `08_PHASE0_RECONCILIATION_2026-09-16.md` - code evidence, supersessions, retained decisions, and unresolved questions from this documentation pass.

- `01_PROJECT_OVERVIEW.md` - product model and target experience.
- `02_CURRENT_DECISIONS.md` - current approved/working decisions and remaining gates.
- `03_BUILD_PLAN.md` - phased roadmap, investor milestone, and current position.
- `04_CURRENT_WEBSITE_STATE.md` - what the code currently does and does not do.
- `05_WORKFLOW.md` - operating standard for Chat, Work, Codex, browser/Terminal, GitHub, and owner approval.
- `06_WORK_START_PROMPT.md` - first prompt to give Work.
- `config/commercial-config.json` - current machine-readable commercial values and founding-programme rules.

## Historical files intentionally not treated as active authority

The pre-change audit prompt and update-pack README served their earlier purpose and are archive material. The 5 August 2026 pre-change audit remains useful historical evidence, but several status statements in it were resolved by the later clean Git/dependency/build baseline. The duplicate `fervo-website-workflow.md` is superseded by the consolidated workflow in this pack. The separate revised Founding Club document has been incorporated into the current decisions where it agrees with later owner decisions.
