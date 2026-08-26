# Documentation index

The owner-approved source pack dated 25 August 2026 is the current product, commercial, roadmap, workflow, and AI-operating authority. Living engineering documents describe the implementation evidence. Historical v1.1 material is not current authority.

## Current source-of-truth pack

Read these in order:

| Document | Purpose |
| --- | --- |
| [Read me first](source-of-truth/00_READ_ME_FIRST.md) | Current baseline, source hierarchy, evidence rule, phase, and pack navigation |
| [Project overview](source-of-truth/01_PROJECT_OVERVIEW.md) | Current product model and target experience |
| [Current decisions](source-of-truth/02_CURRENT_DECISIONS.md) | Owner-reviewed decision register and labelled unresolved gates |
| [Master build plan](source-of-truth/03_BUILD_PLAN.md) | Current phased roadmap and investor-ready milestone |
| [Current website state](source-of-truth/04_CURRENT_WEBSITE_STATE.md) | Approved snapshot of real foundations versus shell/demo systems |
| [Workflow](source-of-truth/05_WORKFLOW.md) | Evidence-first operating standard for owner, Chat, Work, Codex, validation, and GitHub |
| [Work start prompt](source-of-truth/06_WORK_START_PROMPT.md) | Current independent Work review instructions |
| [Commercial configuration v1.3](source-of-truth/config/commercial-config.json) | Current machine-readable pricing, billing periods, and founding-programme rules |

The root [AGENTS.md](../AGENTS.md) applies this hierarchy to repository work. [WORKFLOW.md](../WORKFLOW.md) is a convenient pointer to the canonical workflow.

## Living implementation documents

| Document | Purpose |
| --- | --- |
| [Project status](PROJECT_STATUS.md) | Living record of completed shells, placeholders, and the next safe development boundary |
| [Product and routes](PRODUCT_AND_ROUTES.md) | Product purpose, account types, navigation, routes, and feature ownership |
| [Architecture](ARCHITECTURE.md) | Runtime, folder structure, rendering model, shared components, and state boundaries |
| [Design system](DESIGN_SYSTEM.md) | Approved colour, typography, spacing, surface, glow, and responsive conventions |
| [Development](DEVELOPMENT.md) | Setup, commands, validation, deployment shape, and contribution checklist |
| [Privacy and identity](PRIVACY_AND_IDENTITY.md) | Phase 1 data classification, access rules, credential handling, retention, and verification boundary |
| [Decisions and gaps](DECISIONS_AND_GAPS.md) | Implementation drift, unresolved references, and decisions still required; not the canonical decision register |

## Historical and superseded material

The v1.1 build specification, route map, commercial configuration, original starter README, and original Codex prompt are retained for implementation history only. They must not be used to override the current decision register or commercial configuration v1.3. The old commercial JSON remains in its original path because the current Billing shell imports it as a display fixture; changing that runtime dependency is explicitly outside this documentation pass.

See [Superseded sources](SUPERSEDED_SOURCES.md) for exact status and conflict handling.

## Maintenance rule

Update documentation during implementation, not after it. At minimum:

- Route changes update `PRODUCT_AND_ROUTES.md` and `PROJECT_STATUS.md`.
- Component or state-boundary changes update `ARCHITECTURE.md`.
- Visual-system changes update `DESIGN_SYSTEM.md`.
- Command, dependency, or deployment changes update `DEVELOPMENT.md`.
- Product decisions update the current decision register only with owner authority; implementation drift and unresolved references update `DECISIONS_AND_GAPS.md`.
