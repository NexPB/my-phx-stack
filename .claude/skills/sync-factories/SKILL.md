---
name: sync-factories
description: Add an ExMachina factory to test/support/factory.ex for every Ecto schema in lib/ that does not have one. Use after adding a schema, or when asked to sync, audit or fill in test factories.
---

Every module in `lib/` that does `use Ecto.Schema` with a `schema` block needs a `<name>_factory` in `Waypoint.Factory` (`test/support/factory.ex`). The name is the snake_case of the last module segment: `Waypoint.Accounts.User` → `user_factory`. Embedded schemas get a factory only when a test builds them directly.

Read each schema that is missing a factory, then write its defaults:

- Unique `:string` fields: `sequence(:<field>, &"<field>-#{&1}")`. Other strings: a literal.
- Numbers: a literal. Booleans: `false`. Dates: `~D[2026-01-01]`. Datetimes: `DateTime.utc_now()`.
- `:map` → `%{}`, `{:array, _}` → `[]`, `Ecto.Enum` → its first value.
- `belongs_to :author, Waypoint.Accounts.User` → `author: build(:user)`. ExMachina inserts the parent with the child.
- Leave out `id`, `inserted_at`, `updated_at`, virtual fields, and `has_*` associations.

Run `mix compile` and `mix test` to verify. Report which factories you added and which already existed. If none were missing, change nothing.
