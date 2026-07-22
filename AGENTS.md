# AGENTS.md — Fervo Social

## Product mission
Build Fervo Social as a Brazil-first, adult-only social discovery platform combining a Reels-style vertical feed with profile pages, private messaging, clubs, events, and verified professional profiles. It must be substantially simpler than FabSwingers.

## Source of truth
Read these files before planning or coding:

1. `docs/Fervo_Social_Codex_Build_Spec_v1_1.md` — canonical product and UX specification.
2. `docs/Fervo_Social_Route_Map_v1_1.json` — routes, navigation, profile classes, and feed types.
3. `docs/Fervo_Social_Commercial_Config_v1_1.json` — plans, discounts, and founding-club promotion.

If files conflict, use the Markdown product specification and report the conflict before changing code.

## Build rules
- Do not attempt the entire platform in one task. Work phase by phase.
- Keep exactly five primary authenticated navigation items: Home, Explore, Create, Messages, Profile.
- Use a shared profile system with modules by account class; do not build four unrelated profile applications.
- Use Brazilian Portuguese as the default UI language. Keep translation keys ready for Spanish and English.
- Use dark mode by default with purple accents.
- Design for mobile first and for users with limited technical confidence, including a 40+ audience.
- No public chatrooms or webcam rooms. Private one-to-one messages and consent-based invited group threads only.
- No unsolicited media. Media permissions must be explicit and revocable.
- Do not expose exact home locations.
- Do not hard-code prices. Load plan and promotion data from configuration or the database.
- The 12-month Founding Club Pro offer requires no payment method and must never auto-convert to paid.
- Professional commercial features must be feature-flagged pending legal and payment-provider approval.
- Use accessible components, keyboard support, meaningful labels, and colour-independent identity labels.
- Never use colour alone to communicate gender, orientation, account type, or status.

## Engineering expectations
- Start with an implementation plan and file tree before writing substantial code.
- Prefer TypeScript with strict mode.
- Use clear domain types and schema validation.
- Add tests for critical permission, privacy, billing, and moderation logic.
- Run lint, typecheck, and tests after each meaningful change.
- Do not add production dependencies without explaining why.
- Do not invent legal compliance claims. Mark legal and payment decisions as launch gates.
- Never seed the project with explicit media; use abstract placeholders.

## Task completion
For each task, report:
- What changed
- Files created or modified
- Commands run
- Test/lint/typecheck results
- Assumptions and unresolved decisions
- Recommended next task
