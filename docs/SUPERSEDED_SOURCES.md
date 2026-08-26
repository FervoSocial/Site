# Superseded and historical sources

Status: active archive guide

The following files are preserved because they explain earlier implementation choices, route shells, tests, and runtime fixtures. They are **not current product, commercial, roadmap, workflow, or AI-operating authority**.

| Historical file | Current status | Current authority / handling |
| --- | --- | --- |
| `Fervo_Social_Codex_Build_Spec_v1_1.md` | Superseded as canonical product/build authority | Use `source-of-truth/02_CURRENT_DECISIONS.md`, then `01_PROJECT_OVERVIEW.md` and `03_BUILD_PLAN.md`. The v1.1 file remains useful for historical shell detail only. |
| `Fervo_Social_Route_Map_v1_1.json` | Superseded as current route/product authority | Use current decisions and build plan for target direction; use `PRODUCT_AND_ROUTES.md` and repository code for implemented-route evidence. `DECISION REQUIRED` where no current route decision exists. |
| `Fervo_Social_Commercial_Config_v1_1.json` | Superseded as commercial authority; retained as a runtime display fixture | Use `source-of-truth/config/commercial-config.json` version 1.3 for current commercial rules. The Billing shell still imports v1.1; this documented mismatch requires a separate approved implementation pass. |
| `README_START_HERE.md` | Superseded starter-pack instructions | Use `source-of-truth/00_READ_ME_FIRST.md` and root `AGENTS.md`. |
| root `CODEX_START_PROMPT.md` | Superseded bootstrap prompt | Use `AGENTS.md`, the current source pack, and an owner-approved bounded pass brief. |
| older repository status statements dated July 2026 | Superseded by the clean baseline | Use `PROJECT_STATUS.md` and `source-of-truth/04_CURRENT_WEBSITE_STATE.md`. |

## Conflict rule

Do not delete or silently rewrite historical evidence to look current. When a historical requirement conflicts with the current source pack:

1. follow the hierarchy in `source-of-truth/00_READ_ME_FIRST.md` and `AGENTS.md`;
2. record the conflict rather than blending both versions;
3. label unsupported resolution as `UNCONFIRMED`, `PROVISIONAL`, `RESEARCH REQUIRED`, `DECISION REQUIRED`, or `LAUNCH GATE`;
4. change product behaviour only in a separately approved implementation pass.

## Known live dependency

`lib/billing-placeholder.ts` imports `Fervo_Social_Commercial_Config_v1_1.json`. Therefore the historical commercial file cannot be moved or removed without changing application behaviour. Phase 2 intentionally leaves it in place and marks it superseded through this archive guide, the documentation index, `AGENTS.md`, and the living product/status documents.
