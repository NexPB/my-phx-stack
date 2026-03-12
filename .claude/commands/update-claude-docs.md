# Update CLAUDE.md and Docs

Audit the `CLAUDE.md` and all files under `docs/` to make sure they accurately
reflect the current codebase. Use this skill after large refactors, dependency
upgrades, or architectural changes.

## Steps

1. **Check CLAUDE.md** against the actual project:
   - Verify every library referenced (`:req`, Tailwind version, Phoenix
     version) matches `mix.exs` and `assets/package.json`.
   - Confirm `mix precommit` alias exists in `mix.exs`.
   - Flag any guidelines that contradict what the code actually does.

2. **Check docs/elixir.md** — scan `lib/` and `test/` for patterns that
   contradict the written conventions (e.g. wrong test helper imports,
   outdated module naming).

3. **Check docs/phoenix.md** — verify router structure, context conventions,
   and Ecto patterns against `lib/` code.

4. **Check docs/schema.md** — if any Ecto schema files exist that are not
   documented, run `/update-schema` first, then continue.

5. **Report findings** as a bullet list grouped by file:
   - Items that are accurate (brief confirmation)
   - Items that are outdated or wrong (with suggested fix)
   - Items that are missing (new patterns in the code not yet documented)

6. **Apply fixes** for any outdated or missing items, then run
   `mix precommit` to confirm nothing broke.
