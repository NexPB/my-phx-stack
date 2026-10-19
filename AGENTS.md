Phoenix 1.8 app that renders React pages through Inertia.js.

## Stack

- Backend: Phoenix 1.8, Ecto, PostgreSQL
- Frontend: Inertia.js v3, React 19 with the React Compiler, shadcn/ui, Tailwind CSS v4
- JS tooling: Vite+ (`vp`). `vp check` runs Oxlint, Oxfmt and tsgo. Lint and format config is in the root `vite.config.ts`, build config in `assets/vite.config.ts`
- Package manager: pnpm workspace; the lockfile is `pnpm-lock.yaml` at the root

## Checks

- Run `mix precommit` when you finish. It runs `compile --warnings-as-errors`, `deps.unlock --unused`, `format`, `credo --strict` and `vp check --fix` on `assets/`.
- `mix precommit` does not run tests. Run `mix test` separately.
- Fix every credo warning. An inline credo disable needs a comment that says why.

## Backend

- Controllers call context modules, never `Repo`.
- Stream or paginate queries over unbounded collections.
- Send view-model props to pages, not raw Ecto structs. Preload every association that a prop reads.
- Keep fields that the code sets (for example `user_id`) out of `cast`.
- One module per file.
- Use `Req` for HTTP.
- `docs/schema.md` documents the tables and the schema conventions. Update it in the same commit as a schema or migration change.

## Inertia

Render a page from a controller with `assign_prop/3` and `render_inertia/2`. `Inertia.Controller` is imported for every controller in `lib/waypoint_web.ex`.

    conn
    |> assign_prop(:message, "Hello!")
    |> assign(:page_title, "My Page")
    |> render_inertia("MyPage")

Each component name maps to one file in `assets/src/pages/`.

HEEx is only used in `lib/waypoint_web/components/layouts/root.html.heex`. The `mix phx.gen.*` generators emit HEEx with daisyUI and heroicons, so port their output to an Inertia page.

## Frontend

- Entry points: `assets/src/app.tsx` and `assets/css/app.css`. Import vendor JS and CSS there.
- No `@apply`, and no inline `<script>` tags.
- Import Vite APIs from `vite-plus`, not `vite`. Lint enforces this.
- `@/` resolves to `assets/src/`.
- The React Compiler memoizes, so do not add `useMemo`, `useCallback` or `memo`.
- Inertia v3 has its own HTTP client. `assets/src/lib/http.ts` attaches the CSRF token to its requests. Use `@inertiajs/react` for server calls.
- UI: shadcn/ui components in `assets/src/components/ui/` (see the `shadcn` skill), `cn()` from `assets/src/lib/utils.ts`, and icons from `lucide-react`.

## Tests

- Factories: ExMachina in `test/support/factory.ex`, imported by `DataCase` and `ConnCase`.
- Start processes with `start_supervised!/1`. Wait on `Process.monitor/1` + `assert_receive`, not `Process.sleep/1`.
