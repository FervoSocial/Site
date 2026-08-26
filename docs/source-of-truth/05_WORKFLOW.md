# Fervo Social - Website Build Operating Standard

Version: 2.2 (Work-integrated, evidence-first revision)
Status: owner-reviewed working standard
Prepared: 25 August 2026

## 1. Purpose

Build Fervo Social in small, reviewable, reversible checkpoints while separating product decisions, research/review, code implementation, mechanical validation, and final owner authority.

The workflow also protects the project against a common AI failure mode: confidently filling gaps with plausible but unsupported assumptions.

## 2. Source-of-truth hierarchy

When requirements conflict:

1. explicit project-owner decision recorded in the current decision register;
2. current approved implementation-pass brief;
3. current product overview/build plan;
4. this current workflow and the reconciled repository `AGENTS.md`;
5. current commercial configuration v1.3 for machine-readable commercial values;
6. the approved GitHub branch for evidence of what is actually implemented;
7. living repository documents, automated tests, and approved screenshots;
8. older versioned specifications, route maps, chats, and files as historical context only.

The v1.1 build specification, route map, and commercial configuration are historical and must not override this source pack. No agent should silently choose between conflicting authorities; report the conflict and identify the evidence.

## 3. Evidence and certainty rule

Accuracy is more important than completeness, speed, or agreement with the project owner.

AI may state a Fervo Social fact, decision, requirement, or current implementation detail as confirmed only when supported by one or more of:

- an approved Fervo source document;
- the current repository or website state;
- an explicit project-owner decision;
- established project discussion/context.

When evidence is incomplete or conflicting, label the point clearly as:

- `UNCONFIRMED`
- `PROVISIONAL`
- `ASSUMPTION`
- `RESEARCH REQUIRED`
- `DECISION REQUIRED`
- `LAUNCH GATE`

AI must not invent a policy decision, silently resolve an important ambiguity, or present speculation as fact merely to produce a pleasing, confident, or complete answer.

When external research is used, distinguish:

- what the Fervo sources say;
- what an external source says;
- what is inference/recommendation;
- what still requires owner or specialist approval.

## 4. Roles and authority

### Project owner

The project owner has final authority over product decisions, checkpoint approval, commits, pushes, PR merges, releases, deployments, dependencies, migrations, integrations, commercial changes, and accepted limitations. No AI tool is the final approver.

### Chat

Use Chat for product discussion, decision-making with the owner, synthesis of evidence, acceptance-criteria definition, clarification of technical language, and final review recommendation. Chat may prepare prompts/briefs and review Work/Codex output.

### Work

Use Work as the project-manager/research/independent-review layer. Work should:

- read the current source pack and repository;
- inspect current implementation before planning;
- research external topics when explicitly in scope;
- mark uncertainty rather than inventing answers;
- prepare bounded implementation briefs;
- identify privacy, safety, accessibility, security, commercial, investor-readiness, and legal/provider gates;
- review Codex changes independently against the approved brief;
- produce concise reports and correction lists.

Work should not normally implement code. It must not commit, push, merge, deploy, create production migrations, or widen scope unless explicitly authorised.

### Codex

Codex is the implementation engineer. Use it for React/TypeScript/CSS/backend work, components/routes/state, schema/migrations, tests, debugging, accessibility fixes, and carefully scoped refactors. Codex must not silently expand scope, make product-policy decisions, or convert research assumptions into implementation facts.

### Terminal and browser

Use Terminal/browser for mechanical checks: Git status/branch/commit, approved dependency installation, dev server, typecheck/lint/tests/build, route/browser checks, responsive/keyboard checks, and screenshots.

### GitHub

GitHub is the implementation history and collaboration source. Dedicated branches/PRs should preserve reviewability. Do not merge or rewrite history without explicit owner approval.

## 5. Core principles

- One bounded pass at a time.
- One primary objective per pass.
- Define non-goals before coding.
- Prefer reversible changes.
- Preserve unrelated work.
- Do not commit/push/merge/deploy automatically.
- Do not expose secrets or sensitive user data.
- A successful build is not proof the feature works.
- Privacy/safety controls must be server-enforced once real data exists.
- Colour/imagery/animation must never be the sole meaning.
- Mock/demo data must be clearly fictional.
- Investor-demo polish must not be described as production functionality.
- Stop when a requirement conflict or legal/provider gate appears.
- Do not use AI confidence as evidence.

## 6. Risk classification

- **Low:** documentation, copy, isolated CSS, static mock data. Standard validation.
- **Medium:** components, routes, state, forms, responsive behaviour. Standard validation plus relevant integration coverage.
- **High:** authentication, age verification, private media, linked-account permissions, messaging permissions, location, reviews, professional safety intelligence, payments, professional profiles, moderation, migrations. Architecture/privacy/threat review plus stronger tests and explicit owner approval.
- **Critical:** production deletion, Fervo-operated identity-document handling, suspected-minor/child-safety systems, payment activation, legal reporting, emergency workflows, production deployment. Separate approved runbook and specialist review.

## 7. Definition of Ready

Before Codex modifies code, the pass brief should contain:

- pass name and one objective;
- source/decision references;
- starting branch/commit;
- included scope and explicit non-goals;
- routes/components/services affected;
- expected user behaviour;
- responsive/accessibility requirements;
- privacy/safety considerations;
- data/migration impact;
- dependency/environment impact;
- expected tests;
- acceptance criteria;
- screenshots/wireframes where relevant;
- risks/assumptions;
- unresolved points clearly labelled.

Use `Not applicable` instead of silently omitting a category.

## 8. Repository preflight

Before each implementation pass:

1. confirm repository directory;
2. confirm current branch;
3. record starting commit;
4. confirm working tree is clean;
5. fetch/pull only when intentionally required;
6. create a dedicated feature branch;
7. confirm required source documents;
8. confirm the development environment starts before modifications.

Do not reuse an unrelated old feature branch.

## 9. Standard pass workflow

### A. Plan

Chat/owner defines the product goal. Work inspects sources/repository, researches only as needed and permitted, classifies risk, identifies unconfirmed items, and prepares the bounded brief. Medium/high/critical plans should be reviewed before coding.

### B. Implement

Codex implements only approved scope, preserves unrelated files, adds relevant tests, reports dependency/config/schema/migration changes, and stops after the pass.

### C. Automated validation

Run repository-supported typecheck, lint, unit tests, integration tests, E2E where available/required, production build, Git status, and full diff inspection. Do not claim a missing command passed. Do not weaken tests to turn a failure green without approval.

### D. Manual/browser validation

Test affected routes directly and by refresh; browser back/forward; 375px, 430px, 768px, and 1440px targets where relevant; keyboard operation; loading/empty/error/success/populated states; and unauthorised/blocked/revoked states where relevant. Capture review screenshots for significant UI changes.

### E. Independent Work review

Work compares the implementation/diff/test evidence/screenshots against the approved brief. Findings should be classified (Blocker/High/Medium/Low/Informational) with file/evidence, impact, recommended correction, and merge relevance. Work does not fix findings unless separately tasked.

### F. Correction

Convert findings into one precise correction list. Codex fixes only that list. Re-run required validation.

### G. Checkpoint

Chat synthesises evidence and recommends Approve / Approve with documented limitations / Reject and correct. The owner makes the final decision. Commit/PR/merge occurs only when explicitly authorised.

## 10. Privacy and safety gate

Every relevant pass must ask:

### Identity and age verification

- Can an unverified user access restricted adult content?
- Is public identity separated from legal/verification identity?
- Does every human adult use an individually verified account?
- If a shared profile is involved, has each linked adult individually accepted and verified?
- Does a verification failure remain failed/pending rather than create a bypass?
- Does the design minimise Fervo's possession of raw ID evidence?
- Does the feature create a suspected-underage reporting or escalation requirement?

### Location

- Can exact location leak through UI, API, logs, analytics, media metadata, or repeated searches?
- Are Local/Your Area selections privacy-safe?
- Could radius/filter behaviour be used to triangulate a member?

### Messaging and contact

- Can unsolicited media be sent?
- Is media permission server-enforced and revocable?
- Do public contact links create spam, scraping, harassment, or off-platform safety risk?
- Can blocked users still discover/access/message/media?

### Media

- Are private media served only after permission checks using expiring/signed access where appropriate?
- Is EXIF/location metadata stripped when real uploads are introduced?
- Is a per-file rights/18+/consent attestation recorded?
- Does personal profile/gallery media actually represent the member(s) rather than a misleading/stolen identity?
- Is AI-generated/AI-altered personal content handled according to the approved policy?
- Are watermarking/attribution controls applied without falsely promising that screenshots are impossible?

### Reviews and professional safety

- Is public review eligibility tied to an appropriate verified interaction?
- Is the confidential professional safety system restricted to authorised verified professionals?
- Is reporter identity/source information protected from the reported client?
- If Fervo enforces against a client, can the enforcement be appealed without exposing the confidential reporter?
- Does the design avoid an unreviewed free-text blacklist?

### Advertising and analytics

- Are sexual orientation, private messages, health information, private galleries, exact location, and professional safety intelligence excluded from ad targeting?
- Are sponsored placements clearly identified?

### Moderation

- Does the feature create new report categories, urgent queues, escalation, appeal, audit, or emergency-handling requirements?
- Is human review required for ambiguous high-impact decisions?

High-risk work cannot be approved without documenting the relevant answers.

## 11. Database/migration rules

For schema changes, report schema/migrations/backfill/indexes/access-control/backward compatibility/seed/rollback/data-loss risk/migration duration. Never rewrite an applied migration casually or perform destructive loss silently. Prefer additive changes. Test migrations on disposable development data. Production migration commands require separate approval and an appropriate backup/runbook.

For sensitive tables such as verification, private media, professional safety, or moderation, include explicit access-control and retention design in the pass brief.

## 12. Secrets, environment, and providers

- Never commit real `.env` files.
- Maintain a safe `.env.example` with variable names/safe local defaults only.
- Never paste production credentials into prompts.
- Keep provider secrets server-side.
- Use sandbox/mock credentials in development.
- Document every introduced environment variable.
- Rotate exposed credentials.
- Production verification/payment/email/storage/moderation integration requires explicit provider approval and fail-safe configuration.
- A specialist provider is a control, not a transfer of all Fervo responsibility.

## 13. Dependencies

Before adding a dependency, report package, purpose, why existing APIs/dependencies are insufficient, bundle/runtime impact, maintenance/licence/security implications, and client/server scope. The owner approves significant dependencies. Do not run broad forced dependency upgrades as incidental work.

## 14. Accessibility and performance

Target WCAG 2.2 AA. Check keyboard, focus, landmarks/headings, form labels/errors, alt text, text scaling, contrast, reduced motion, modal focus management, icon names, captions where relevant, and text alternatives to colour.

For feed/media work: lazy-load off-screen assets, autoplay at most one feed video, pause off-screen media, use responsive derivatives/posters, do not load private media before permission, paginate/virtualise long feeds, avoid major layout shift, and report large new client dependencies.

## 15. Research and specialist-review rule

Research tasks involving current law, provider policies, payment acceptance, Brazilian company/tax structure, identity verification, or similar changing external facts must use current authoritative sources.

Legal, accounting, tax, and regulatory findings should be treated as research for discussion unless confirmed by the relevant licensed professional. Work must not turn general web research into a claim that Fervo is legally compliant.

## 16. Stop conditions

Work or Codex must stop and ask for guidance when:

- authoritative sources conflict;
- evidence is insufficient to state a project fact;
- scope requires unrelated changes;
- a destructive migration appears necessary;
- production data/credentials are required;
- a dependency has material cost/licence/security implications;
- a requested design weakens privacy/safety guarantees;
- tests fail for reasons outside scope;
- an adult-content integration's terms appear incompatible;
- legal/accounting/payment-provider approval is required;
- expected behaviour is ambiguous;
- a pass risks exposing exact location, legal identity, private media, confidential safety-report sources, or suspected-minor information.

Stopping is correct behaviour; do not invent a policy decision.

## 17. Definition of Done

A pass is done only when approved scope is implemented, non-goals untouched, required automated checks pass, relevant responsive/keyboard/manual checks are complete, privacy/safety is documented, dependencies/migrations/config are documented, screenshots are captured where required, no unrelated files changed, known limitations are recorded, independent review is complete for the chosen risk level, Chat has reviewed evidence, and the owner has approved the checkpoint.

## 18. Completion report template

Codex should report:

```text
PASS
[Name]

BRANCH
[Branch]

STARTING COMMIT
[Hash]

SOURCE / DECISION REFERENCES
- ...

OBJECTIVE
...

NON-GOALS
- ...

FILES CHANGED
- ...

DEPENDENCIES
None | details

DATABASE / MIGRATIONS
None | details

CONFIG / ENVIRONMENT
None | details

VALIDATION
- Typecheck: pass | fail | not available
- Lint: pass | fail | not available
- Unit: pass | fail | not available
- Integration: pass | fail | not available
- E2E: pass | fail | not available
- Build: pass | fail

MANUAL TESTS
- Routes:
- Viewports:
- Keyboard:
- Loading/empty/error:
- Unauthorised/blocked/revoked:

PRIVACY / SAFETY
- ...

UNCONFIRMED / ASSUMPTIONS
- ...

KNOWN LIMITATIONS
- ...

GIT STATUS
...

RECOMMENDATION
Ready for review | Not ready
```

Work then produces its independent findings/recommendation. Chat synthesises. The project-owner decision remains Pending / Approved / Rejected until explicitly given.

## Final rule

Product owner decides. Chat clarifies and synthesises. Work researches/plans/reviews. Codex implements. Automated tools verify mechanics. Browser checks behaviour. GitHub preserves history. Evidence outranks confidence. Uncertainty is labelled rather than invented.
