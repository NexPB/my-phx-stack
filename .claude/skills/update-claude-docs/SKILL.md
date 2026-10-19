---
name: update-claude-docs
description: Audit AGENTS.md (CLAUDE.md links to it) and docs/schema.md against the codebase and fix what is wrong, missing or obsolete. Use after dependency upgrades, tooling changes or refactors.
disable-model-invocation: true
---

Check each claim in `AGENTS.md` against the code:

- Versions and tools against `mix.exs`, `assets/package.json`, `pnpm-workspace.yaml` and both `vite.config.ts` files.
- The described `mix precommit` and `mix test` steps against the aliases in `mix.exs` and `.github/workflows/`.
- Every named path, module and function must exist.
- The conventions must match what `lib/`, `assets/src/` and `test/` do. When the code and the doc disagree, ask the user which one is correct.

Also check what is missing or obsolete:

- Add a project-specific pattern that an agent would get wrong without it.
- Remove a rule that the model already follows, or that credo, the compiler or `vp check` enforce.

For `docs/schema.md`: run `/update-schema` if a schema or migration is not documented, and check the `## Conventions` section against `config/config.exs`.

Write the rules short and in the imperative, without bold or capital-letter emphasis. Then report the changes, grouped by file.
