---
name: update-schema
description: Regenerate the tables and relationships in docs/schema.md from the Ecto schemas in lib/ and the migrations in priv/repo/migrations/. Use after adding or changing a schema or migration, or when docs/schema.md is out of date.
---

Rewrite the `## Tables` and `## Relationships` sections of `docs/schema.md`, using the templates in that file:

- One `##` table section per `schema "<table>"` block, with every column: name, type, constraints (null, default, unique, FK) and notes.
- Read the migrations as well as the schemas. Migrations can add columns, indexes, constraints and defaults that the schema does not declare. If a schema and a migration disagree, list the column and tell the user.
- One `###` relationships entry per schema module, with every `belongs_to`, `has_one`, `has_many` and `many_to_many`.

Keep the `## Conventions` and `## Updating this file` sections. Check that every table lists the same number of columns as its schema and migrations. Tell the user to commit `docs/schema.md` together with the schema change.
