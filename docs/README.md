# Documentation index

These documents describe both the intended Fervo Social product and the application that currently exists in this repository.

| Document | Purpose |
| --- | --- |
| [Project status](PROJECT_STATUS.md) | Living record of completed shells, placeholders, and the next safe development boundary |
| [Product and routes](PRODUCT_AND_ROUTES.md) | Product purpose, account types, navigation, routes, and feature ownership |
| [Architecture](ARCHITECTURE.md) | Runtime, folder structure, rendering model, shared components, and state boundaries |
| [Design system](DESIGN_SYSTEM.md) | Approved colour, typography, spacing, surface, glow, and responsive conventions |
| [Development](DEVELOPMENT.md) | Setup, commands, validation, deployment shape, and contribution checklist |
| [Privacy and identity](PRIVACY_AND_IDENTITY.md) | Phase 1 data classification, access rules, credential handling, retention, and verification boundary |
| [Decisions and gaps](DECISIONS_AND_GAPS.md) | Approved deviations, unresolved decisions, safety boundaries, and launch gates |

## Canonical source files

These files are preserved as supplied and should not be rewritten to match the current implementation:

- [Build specification v1.1](Fervo_Social_Codex_Build_Spec_v1_1.md)
- [Route map v1.1](Fervo_Social_Route_Map_v1_1.json)
- [Commercial configuration v1.1](Fervo_Social_Commercial_Config_v1_1.json)
- [Original starter instructions](README_START_HERE.md)

The root [AGENTS.md](../AGENTS.md) contains the active project rules. `CODEX_START_PROMPT.md` is retained as historical bootstrap guidance; current status is governed by `PROJECT_STATUS.md` and the latest approved milestone.

## Source hierarchy

When requirements disagree, use this order:

1. The canonical Fervo Social build specification, version 1.1
2. The route map, version 1.1
3. The commercial configuration, version 1.1
4. Explicitly approved product decisions recorded in [Decisions and gaps](DECISIONS_AND_GAPS.md)
5. The current code, which shows implementation status but does not override product intent

The living documents explain the current implementation. The versioned source files preserve original product intent. When they differ, record the approved exception in `DECISIONS_AND_GAPS.md` instead of silently editing the source.

## Maintenance rule

Update documentation during implementation, not after it. At minimum:

- Route changes update `PRODUCT_AND_ROUTES.md` and `PROJECT_STATUS.md`.
- Component or state-boundary changes update `ARCHITECTURE.md`.
- Visual-system changes update `DESIGN_SYSTEM.md`.
- Command, dependency, or deployment changes update `DEVELOPMENT.md`.
- Product exceptions and unresolved decisions update `DECISIONS_AND_GAPS.md`.
