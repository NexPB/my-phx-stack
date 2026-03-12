Audit `test/support/factory.ex` against all Ecto schemas in `lib/` and add a
factory function for every schema that does not already have one.

## Steps

1. **Discover schemas** — grep `lib/` for files that call `use Ecto.Schema` or
   `use Ecto.Schema` (embedded or normal). Collect each module name.

2. **Read the factory** — read `test/support/factory.ex` in full and list every
   `def <name>_factory` that already exists.

3. **Diff** — for each schema found in step 1, derive its expected factory name
   (snake_case of the last module segment, e.g. `MyApp.Accounts.User` →
   `user_factory`). Skip any that already exist in step 2.

4. **Read missing schema files** — for each missing schema, read its source file
   to inspect every `field`, `belongs_to`, `has_many`, `has_one`, and
   `embeds_one`/`embeds_many` definition so you can build realistic defaults.

5. **Write factory functions** — for each missing factory append a well-formed
   `def <name>_factory` block inside the Factory module (in `test/support/factory.ex`), above the final `end`.
   Follow these rules for defaults:
   - `:string` fields → `sequence(:field_name, &"value-#{&1}")`; use the actual
     field name as the label so sequences are scoped correctly.
   - `:integer` / `:float` / `:decimal` fields → a sensible literal constant.
   - `:boolean` → `false` (prefer the safe default).
   - `:date` → `~D[2024-01-01]`
   - `:utc_datetime` / `:naive_datetime` → use `DateTime.utc_now() |> DateTime.truncate(:second)`
   - `:map` / `:array` → `%{}` / `[]`
   - `belongs_to :assoc, Mod` → `assoc(:assoc, factory: :mod)` so ExMachina
     creates or reuses the parent automatically.
   - Virtual fields and auto-set fields (`inserted_at`, `updated_at`, `id`) →
     omit entirely; Ecto/Postgres fills them.
6. **Verify** — after editing `factory.ex`, read it back and confirm:
   - The file still compiles (no mismatched `do`/`end`).
   - Every new factory struct matches the real module name of its schema.
   - No factory was added twice.

7. **Report** — print a short summary listing which factories were added and
   which were already present. If every schema already has a factory, say so and
   make no changes.
