# Module Boundary Conventions

Dependency rules enforced via `@nx/enforce-module-boundaries` (ESLint section) and TypeScript project references.

## Tag taxonomy

### Domain tags

| Tag               | Description                                     |
| ----------------- | ----------------------------------------------- |
| `domain:frontend` | Browser-facing applications (`apps/frontend/*`) |
| `domain:backend`  | Node.js services (`apps/backend/*`) — future    |

### Scope tags

| Tag            | Description                   |
| -------------- | ----------------------------- |
| `scope:app`    | Deployable applications       |
| `scope:shared` | Reusable packages and tooling |

### Type tags

| Tag            | Description                                    |
| -------------- | ---------------------------------------------- |
| `type:app`     | Application entry points                       |
| `type:feature` | Feature modules within applications            |
| `type:ui`      | Presentational / design system (`packages/ui`) |
| `type:util`    | Pure utilities, types, validation              |
| `type:config`  | Build / lint / TS configuration                |

### Platform tags

| Tag                | Description                  |
| ------------------ | ---------------------------- |
| `platform:web`     | Browser-targeted code        |
| `platform:node`    | Server / Node.js code        |
| `platform:neutral` | Isomorphic — no runtime APIs |

## Allowed dependencies

```
frontend          →  packages (isomorphic + ui)
backend           →  packages (isomorphic only)
packages          →  packages (same or lower layer)
tooling           →  nothing in apps/packages
```

### Package-level rules

| Source                   | May depend on                               |
| ------------------------ | ------------------------------------------- |
| `packages/types`         | — (leaf)                                    |
| `packages/errors`        | `types`                                     |
| `packages/design-tokens` | `types`                                     |
| `packages/permissions`   | `types`                                     |
| `packages/validation`    | `types`                                     |
| `packages/utils`         | `types`                                     |
| `packages/logger`        | `types`, `errors`                           |
| `packages/config`        | `types`, `validation`                       |
| `packages/env`           | `types`, `validation`, `errors`             |
| `packages/api-client`    | `types`, `errors`, `logger`                 |
| `packages/auth`          | `types`, `errors`, `api-client`             |
| `packages/feature-flags` | `types`, `logger`                           |
| `packages/shared`        | `types`, `utils`, `validation`, `config`    |
| `packages/theme`         | `types`, `design-tokens`                    |
| `packages/i18n`          | `types`                                     |
| `packages/hooks`         | `types`                                     |
| `packages/ui`            | `types`, `shared`, `design-tokens`, `theme` |

## Forbidden dependencies

| Rule                             | Reason                                   |
| -------------------------------- | ---------------------------------------- |
| `packages/*` → `apps/*`          | Packages must not depend on applications |
| `frontend` → `backend`           | No cross-domain app imports              |
| `backend` → `frontend`           | No cross-domain app imports              |
| `backend` → `packages/ui`        | UI is browser-only                       |
| `packages/types` → `packages/ui` | Isomorphic packages stay runtime-neutral |
| `apps/*` → `apps/*`              | No cross-application imports             |

## TypeScript enforcement

- Isomorphic packages extend `library.json` (no DOM, no Node types)
- `packages/ui` extends `library-react.json`
- Future backend extends `node.json`
- Frontend apps extend `nextjs.json` or `vite-app.json`

## ESLint enforcement

`@nx/enforce-module-boundaries` is configured in `tooling/eslint-config/boundaries.mjs` and applied via root `eslint.config.mjs`. Rules use Nx project tags (`domain`, `platform`, `type`, `scope`).
