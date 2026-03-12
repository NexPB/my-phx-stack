# Update Schema Documentation

Read every Ecto schema file under `lib/` and every migration under
`priv/repo/migrations/`, then rewrite `docs/schema.md` to reflect the current
state of the database.

## Steps

1. **Discover schemas** — glob `lib/**/*.ex` and find files that contain
   `use Ecto.Schema` or `schema "` blocks. For each one, extract:
   - Table name
   - All `field` declarations (name, type, options)
   - All `belongs_to`, `has_many`, `has_one`, `many_to_many` associations
   - Whether it uses `timestamps/1` and which type

2. **Discover migrations** — read `priv/repo/migrations/` newest-first and
   reconcile any `add`, `modify`, `remove`, `rename_column`, or `drop_table`
   operations that are not yet reflected in the schemas (e.g. columns added
   directly via raw SQL).

3. **Rewrite `docs/schema.md`** — follow the template already in the file:
   - One `##` section per table with a markdown table of columns
   - A `## Relationships` section listing every association grouped by schema
   - Keep the `## Conventions` and `## Updating this file` sections intact

4. **Verify** — after writing, confirm the column count in the markdown table
   matches what you read from the schema files.

5. **Remind the user** to commit `docs/schema.md` alongside any schema or
   migration changes.
