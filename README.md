# frontend-enterprise-boilerplate

Production-grade Frontend Monorepo built with Nx, React, Next.js, TypeScript and modern engineering practices. Designed as a scalable foundation for large-scale enterprise and e-commerce applications.

**Long-term direction:** evolve into an opinionated **Application Platform** (Easy Mode + Advanced Mode). See [docs/FUTURE-PLAN.md](./docs/FUTURE-PLAN.md) for the architecture assessment and version roadmap.

## Commands

### Setup

- Install dependencies: `pnpm install`
- Reset Nx daemon/cache (useful when Nx feels stale): `pnpm reset`
- First command after clone/fork (recommended): `pnpm setup:clean`
- Visualize workspace graph: `pnpm graph`

### Workspace-wide quality checks

- Build all projects: `pnpm build`
- Test all projects with a `test` target: `pnpm test`
- Lint all projects with a `lint` target: `pnpm lint`
- Lint and auto-fix: `pnpm lint:fix`
- Typecheck all projects: `pnpm typecheck`
- Format all files: `pnpm format`
- Check formatting only: `pnpm format:check`
- Validate import/module boundaries: `pnpm validate:boundaries`

### Affected-only (fast CI/local checks)

- Show affected metadata: `pnpm affected`
- Build affected projects: `pnpm affected:build`
- Test affected projects: `pnpm affected:test`
- Lint affected projects: `pnpm affected:lint`
- Typecheck affected projects: `pnpm affected:typecheck`
- Run affected typecheck + build: `pnpm affected:validate`

### UI library (`packages/ui`)

- Run UI tests (Vitest): `cd packages/ui && pnpm test`
- Watch UI tests: `cd packages/ui && pnpm test:watch`
- Build UI library output: `pnpm nx build ui`
- Typecheck UI library: `pnpm nx typecheck ui`
- Run UI Storybook: `pnpm nx storybook ui` → [http://localhost:3000](http://localhost:3000)
- Build static Storybook: `pnpm nx build-storybook ui`
- Deploy Storybook on Vercel: second project, Root Directory `packages/ui` — see [`packages/ui/vercel.json`](./packages/ui/vercel.json) and [`apps/frontend/README.md`](./apps/frontend/README.md#vercel-deploy-storybook)

### Frontend apps

Current app projects are:

- `dashboard` (`apps/frontend/dashboard`)
- `admin` (`apps/frontend/admin`)
- `landing` (`apps/frontend/landing`) — Next.js marketing site with SSR/SSG, i18n (`en` / `fa`), and Route Handlers for client mutations

| App         | Dev                           | Build / test                                    |
| ----------- | ----------------------------- | ----------------------------------------------- |
| `landing`   | `pnpm nx dev landing` → :4200 | `pnpm nx build landing`, `pnpm nx test landing` |
| `dashboard` | —                             | `pnpm nx typecheck dashboard`                   |
| `admin`     | —                             | `pnpm nx typecheck admin`                       |

See [`apps/frontend/README.md`](./apps/frontend/README.md) for landing details and demo links.

### Nx target pattern (any project)

Use this shape for any project/target pair:

- `pnpm nx <target> <project>`
- Example: `pnpm nx test ui`

### Avoid Nx daemon issues (recommended fallback)

If you see noisy Nx internal files (like `plugin-worker.js`) or stale graph behavior:

- One-time cleanup: `pnpm reset`
- Run tests without daemon: `pnpm test:no-daemon`
- Run affected commands without daemon: `pnpm affected:no-daemon`
- Per-command alternative: `NX_DAEMON=false pnpm nx <target> <project>`

## Git hooks

Local quality gates via Husky — see [docs/git-hooks.md](./docs/git-hooks.md).

| Hook         | Purpose                           |
| ------------ | --------------------------------- |
| `pre-commit` | Format + lint staged files        |
| `commit-msg` | Conventional Commits              |
| `pre-push`   | Nx affected `typecheck` + `build` |
