# Phoenix, Ecto & HTML Guidelines

## Router

- `scope` blocks prefix the alias—don't duplicate module prefixes
- You **never** need to create your own alias for route definitions:

      scope "/admin", AppWeb.Admin do
        pipe_through :browser
        get "/users", UserController, :index  # => AppWeb.Admin.UserController
      end

- `Phoenix.View` is no longer included—don't use it

## Ecto

- **Always** preload associations accessed in templates
- `import Ecto.Query` in `seeds.exs`
- Schema fields use `:string` even for `:text` columns
- `validate_number/2` does **not** support `:allow_nil`
- Use `Ecto.Changeset.get_field/2` to access changeset fields
- Fields set programmatically (e.g. `user_id`) must **not** appear in `cast`
- Generate migrations with `mix ecto.gen.migration migration_name_using_underscores`

## HEEx / HTML

- **Always** use `~H` or `.html.heex`—never `~E`
- Add unique DOM IDs to key elements for testability
- **No** `if/else if` in Elixir—use `cond` or `case`
- Use `phx-no-curly-interpolation` on tags containing literal `{`/`}`
- Class lists must use `[...]` syntax:

      <a class={["px-2 text-white", @flag && "py-5"]}>Text</a>

- Use `<%= for item <- @collection do %>` for iteration—never `Enum.each`
- Comments: `<%!-- comment --%>`
- Use `{...}` for attribute interpolation; `<%= ... %>` for block constructs in tag bodies
- **Never** interpolate inside quoted attributes (`id="<%= @id %>"`)—use `id={@id}`
