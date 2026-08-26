# First Codex task — Fervo Social

> **SUPERSEDED BOOTSTRAP PROMPT — HISTORICAL ONLY.** Do not use this file as current operating or product authority. Start with `AGENTS.md` and `docs/source-of-truth/00_READ_ME_FIRST.md`; use an owner-approved bounded pass brief. See `docs/SUPERSEDED_SOURCES.md`.

You are working inside the Fervo Social repository. Read `AGENTS.md` and all three source files in `docs/` before taking action.

## Goal
Prepare the project for implementation without attempting to build the entire product at once.

## Required work
1. Summarize the product in no more than 20 bullets.
2. Identify contradictions, missing decisions, legal/payment feature flags, and any requirement that is too large for the MVP. Do not silently resolve major product conflicts.
3. Propose a phased implementation plan beginning with Phase 1:
   - public landing page
   - login and registration shell
   - age-verification placeholder integration
   - five-item authenticated application shell
   - Home hybrid feed using safe placeholder data
   - universal profile renderer for a private member
4. Propose the repository file tree and selected technical stack. Explain each major dependency before installing it.
5. Create the initial project scaffold only after presenting the plan.
6. Implement Phase 1 with responsive mobile-first UI, Brazilian Portuguese copy, dark mode, purple accents, and abstract non-explicit placeholder media.
7. Add basic tests, linting, type checking, environment-variable examples, and a README with local setup commands.
8. Do not implement payments, real identity verification, explicit media, professional bookings, or production moderation integrations yet. Create interfaces and feature flags only.

## Acceptance criteria
- Five primary navigation items only.
- Mobile layout works at 360 px width.
- Desktop layout is responsive, not a separate product.
- Feed supports typed cards: photo placeholder, video placeholder, text/status, looking-for, event, club, professional, safety, sponsored.
- Profile components are reusable for future account classes.
- No exact location or unsolicited-media behaviour.
- All visible UI text uses translation keys with pt-BR defaults.
- Pricing and Founding Club rules are read from config, not embedded in components.
- Lint, typecheck, and tests pass.

At the end, stop and report the next recommended task. Do not continue into Phase 2 without approval.
