# Tooling

Shared build-time configuration packages consumed by apps and libraries.

| Package           | Purpose                                              | Reused by                                     |
| ----------------- | ---------------------------------------------------- | --------------------------------------------- |
| `tsconfig`        | TypeScript presets (browser, Node, React, libraries) | Frontend apps, backend services, all packages |
| `eslint-config`   | ESLint 9 flat config + module boundaries             | All projects                                  |
| `tailwind-config` | Shared Tailwind preset + PostCSS pipeline            | Frontend apps, `ui` package                   |

Tooling packages are tagged `type:config`, `platform:neutral` and must not depend on application or business package code.

## Backend readiness

When Node.js services are added under `apps/backend/`, they will:

- Extend `@enterprise/tsconfig/node`
- Share ESLint, Prettier, Vitest, and Nx CI targets
- Remain isolated from frontend-specific packages (`ui`)

No backend frameworks are installed at this stage.

## Git hooks

Husky hooks are configured at the repository root. See [docs/git-hooks.md](../docs/git-hooks.md) for the full workflow.

The **pre-push** hook runs Nx affected validation before allowing a push:

```sh
pnpm affected:typecheck
pnpm affected:build
```

Use `pnpm affected:validate` to run the same checks manually.
