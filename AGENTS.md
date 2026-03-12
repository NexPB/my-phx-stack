This is a web application written using the Phoenix web framework.

## Stack

- **Backend**: Phoenix 1.8 + Elixir, Ecto/PostgreSQL
- **Frontend**: Vite 7 + Inertia.js + React 19 + shadcn/ui
- **CSS**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Package manager**: pnpm (lockfile at project root `pnpm-lock.yaml`)

## Project guidelines

- Use `mix precommit` alias when you are done with all changes and fix any pending issues — this runs compile, format, `credo --strict`, and tests
- Fix **all** credo warnings before committing — never disable a check inline without a code comment explaining why
- Use the already included and available `:req` (`Req`) library for HTTP requests, **avoid** `:httpoison`, `:tesla`, and `:httpc`

### Inertia.js (controller) guidelines

- Use `render_inertia("ComponentName")` in Phoenix controllers to render a React page
- Pass data to pages with `assign_prop/3`:

      conn
      |> assign_prop(:message, "Hello!")
      |> assign(:page_title, "My Page")
      |> render_inertia("MyPage")

- React pages live in `assets/src/pages/`—one file per Inertia component name
- `import Inertia.Controller` is available in all controllers via the web module (`<app_name>_web.ex`)

### JS & CSS

- **Entry points**: `assets/src/app.tsx` (JS) and `assets/css/app.css` (CSS)—built by Vite 7
- Never use `@apply` in raw CSS
- Import all JS/CSS vendor dependencies into `app.tsx` or `app.css`
- **Never** write inline `<script>` tags in templates

### UI components

- Use **shadcn/ui** components from `assets/src/components/ui/`—these are plain TypeScript/React files, not a runtime library
- Use the `cn()` utility from `assets/src/lib/utils.ts` for conditional class merging
- Use **lucide-react** for icons (already installed): `import { X } from "lucide-react"`
- **Do not** use heroicons or daisyUI—they have been removed from this project
- React 19: `ref` is a plain prop—**never** use `forwardRef`; add `ref?: React.Ref<T>` directly to your props interface

### UI/UX

- Produce world-class UI with clean typography, spacing, micro-interactions, and smooth transitions

## Common mistakes to avoid

- **Never** use `Repo.all/1` without pagination on unbounded collections—use streams or `Repo.stream/1`
- **Never** define a module inside another module file
- **Never** use `IO.puts` or `dbg` in committed code—run `mix credo` to catch this
- **Never** add a migration that drops a column without a backup plan
- **Never** call `Repo` directly from Controllers—always go through a context module
- **Never** pass raw DB structs to templates that need computed fields—build a view model

## Detailed guidelines

See the `docs/` folder for comprehensive rules on each topic:

- [docs/elixir.md](docs/elixir.md) — Elixir, Mix, and testing conventions
- [docs/phoenix.md](docs/phoenix.md) — Phoenix router, Ecto, and HTML/HEEx rules
- [docs/schema.md](docs/schema.md) — Database schema and relationships
