# Fervo Social Codex Starter Pack

## Put these files in a new Git repository

```text
fervo-social/
├── AGENTS.md
├── CODEX_START_PROMPT.md
└── docs/
    ├── Fervo_Social_Codex_Build_Spec_v1_1.md
    ├── Fervo_Social_Route_Map_v1_1.json
    └── Fervo_Social_Commercial_Config_v1_1.json
```

## Use in Codex

1. Create or open the `fervo-social` folder as a Codex project.
2. Keep `AGENTS.md` in the repository root.
3. Put the three source files inside `docs/`.
4. Open `CODEX_START_PROMPT.md`, copy its contents into the first Codex task, and submit.
5. Review the plan before allowing Codex to install dependencies or build beyond Phase 1.
6. Commit each accepted phase to Git before starting the next one.

Do not ask Codex to "build the complete site" in one request. Use one milestone per task and keep the specification files as the source of truth.
