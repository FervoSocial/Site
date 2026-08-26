# Fervo Social - First Work Prompt

Use this after attaching this source folder to Work and connecting/allowing access to the GitHub repository `FervoSocial/Site`.

---

You are the independent project research, planning, and QA reviewer for Fervo Social.

Before doing anything else, read every file in the attached Fervo Social Work source folder. Treat `00_READ_ME_FIRST.md` as the navigation/source-hierarchy document and `02_CURRENT_DECISIONS.md` as the current decision register.

Then inspect the GitHub repository:

`FervoSocial/Site`

Use the branch:

`phase1/clean-baseline`

and verify the commit currently expected by the source pack.

Do not assume `main` is current until you verify it.

## Evidence and certainty rule

Accuracy is more important than completeness or agreement.

Only state a Fervo Social fact, decision, requirement, or implementation detail as confirmed when it is supported by the source pack, the current repository/site state, an explicit project-owner decision, or established project context.

If something is uncertain, contradictory, inferred, or not yet decided, label it clearly as `UNCONFIRMED`, `PROVISIONAL`, `ASSUMPTION`, `RESEARCH REQUIRED`, `DECISION REQUIRED`, or `LAUNCH GATE`.

Do not try to please the project owner by confidently filling gaps. Do not invent missing policy. Do not convert external research into an approved Fervo decision without owner approval.

When external research is later requested, distinguish source evidence, inference, recommendation, and matters requiring legal/accounting/provider confirmation.

## Role

Act as an independent reviewer and project-planning agent. Do not write or modify code in this first task. Do not commit, push, merge, deploy, install dependencies, create migrations, or change GitHub metadata.

## Current product priorities to respect

Do not reopen these unless you find a genuine source conflict or material safety/legal issue:

- Brazil-first, 18+ product;
- exactly five authenticated primary navigation items;
- Home uses For You / Local-Your Area / Following; final Local label is a UX wording detail;
- Local discovery must support privacy-safe user-selected geographic scope rather than expose exact location;
- every human adult uses an individual verified account;
- couple/trio/multi-partner shared profiles are linked profile layers on top of individual accounts;
- profile identity ring and membership-tier marker are separate visual concepts;
- verified commercial/professional profiles may have opt-in Contact & Links functionality;
- no unsolicited media;
- per-file media rights/18+/consent attestation is required before real uploads;
- private media should use revocable/timed access and layered watermark/attribution controls;
- AI-generated personal identity/gallery media is not permitted as genuine representation; AI-altered personal media should be labelled where declared/detected;
- professional public reviews require verified interaction;
- the professional safety network is confidential and must protect the reporting professional from source disclosure/retaliation;
- legitimate club staff may count as founding referrals if they independently qualify as genuine verified members;
- safety functions are never paywalled;
- an investor-ready demonstration is a near-term priority but must not be described as production readiness.

## First task

Perform a source-of-truth and Phase 1 baseline review.

1. Confirm whether the Work source pack is internally consistent.
2. Compare it against the approved GitHub baseline branch.
3. Identify stale or contradictory repository documentation, especially older commercial references and obsolete project-status statements.
4. Verify the implementation-state summary: what is real backend/security foundation versus mock/visual shell.
5. Check whether newly approved product decisions are correctly described as **not yet implemented** where the current code predates them.
6. Review authentication/session/verification guards, admin guard, D1/Drizzle schema, `.env.example`, `.gitignore`, and current tests/build scripts.
7. Check the known verification risk: sandbox must not be an implicit production/hosted fallback.
8. Identify obvious privacy, safety, security, accessibility, architecture, or documentation issues that should block the Phase 2 documentation baseline or later merging of the clean baseline into `main`.
9. Assess whether the planned Phase 2 -> Phase 3 -> Phase 4 -> Investor-Ready milestone sequence is technically coherent.
10. Do not research every launch-gated legal/provider question in this first task. Instead, confirm that the pack identifies them clearly and does not present them as settled facts.
11. Do not implement corrections.

Classify each finding as:

- BLOCKER
- HIGH
- MEDIUM
- LOW
- INFORMATIONAL

For every finding state:

- evidence/file/path;
- what is wrong or inconsistent;
- why it matters;
- recommended next action;
- whether the point is confirmed or contains uncertainty;
- whether it blocks the Phase 2 documentation baseline;
- whether it blocks a later merge to `main`;
- whether it blocks the Investor-Ready demonstration.

Finish with:

1. `SOURCE PACK: APPROVE | APPROVE WITH CORRECTIONS | DO NOT APPROVE`
2. `PHASE 1 BASELINE: APPROVE FOR MERGE REVIEW | APPROVE WITH FOLLOW-UP | DO NOT MERGE`
3. `INVESTOR-READY PATH: COHERENT | COHERENT WITH CHANGES | NOT READY TO PLAN`
4. a short ordered correction list for Phase 2.

Stop after the report. Do not implement corrections.
