# phx-stack

A production-ready Phoenix + Inertia.js + React template with batteries included.

## What's included

| Feature | Details |
|---|---|
| **Inertia.js** | Server-driven SPA — React pages rendered from Phoenix controllers |
| **shadcn/ui** | Copy-paste component library — `assets/src/components/ui/` |
| **Vite 7** | Fast dev server with HMR, production builds with hashing |
| **Tailwind CSS v4** | Utility-first CSS via `@tailwindcss/vite` plugin |
| **ExMachina** | Test factories in `test/support/factory.ex` |
| **Swoosh** | Email with local dev mailbox at `/dev/mailbox` |
| **Phoenix LiveDashboard** | Application insights at `/dev/dashboard` |
| **GitHub Actions** | CI workflow for tests and linting |
| **Docker Compose** | PostgreSQL + pgAdmin for local development |
| **AI-ready** | `AGENTS.md` + `CLAUDE.md` with full project context for AI assistants |

## Development

```bash
# Start PostgreSQL
docker compose up -d

# Start dev server with HMR
mix phx.server

# Run tests
mix test

# Run full precommit checks (compile + format + credo + tests)
mix precommit
```

## Project structure

```
lib/
  <app_name>.ex            # Application module
  <app_name>/              # Business logic contexts
    application.ex
    repo.ex
    mailer.ex
  <app_name>_web.ex        # Web module (controllers, router helpers)
  <app_name>_web/
    endpoint.ex
    router.ex
    controllers/            # Phoenix controllers using Inertia
    components/layouts/     # Root HTML layout

assets/
  src/
    app.tsx                 # JS entry point
    pages/                  # Inertia page components
    components/ui/          # shadcn/ui components
    lib/utils.ts            # cn() utility
  css/app.css               # CSS entry point

config/                     # Phoenix configuration
test/                       # ExUnit tests + support
priv/repo/migrations/       # Ecto migrations
```

## Learn more

- [Phoenix](https://www.phoenixframework.org/)
- [Inertia.js](https://inertiajs.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vite.dev)
