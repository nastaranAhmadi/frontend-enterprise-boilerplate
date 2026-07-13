# Landing Architecture

Architecture Decision Records (ADRs) for the `@enterprise/landing` application and shared frontend patterns.

## Principles

1. **Feature ownership** — UI lives in `features/`; data access lives in `repositories/`.
2. **Extract on proven reuse** — move to `packages/` only when two apps use it today.
3. **Server-first** — Server Components by default; every `"use client"` must be justified.
4. **Prefer deletion over abstraction** — duplicate twice; extract on the third proven use.
5. **No forbidden folders** — `shared/`, `common/`, `helpers/`, `utils/`, `misc/` are not allowed in apps.

## ADR index

| ADR                                              | Topic                                            |
| ------------------------------------------------ | ------------------------------------------------ |
| [ADR-001](./ADR-001-feature-ownership.md)        | Feature ownership and folder rules               |
| [ADR-002](./ADR-002-data-flow.md)                | Data flow: application → repository → datasource |
| [ADR-003](./ADR-003-repository-pattern.md)       | Repository pattern and dependency injection      |
| [ADR-004](./ADR-004-client-server-boundaries.md) | Client/server boundaries and providers           |
| [ADR-005](./ADR-005-performance.md)              | Performance KPIs and budgets                     |

## Future plan

Platform evolution roadmap (assessment, risks, versioning, CLI, plugins): **[FUTURE-PLAN.md](../FUTURE-PLAN.md)**

## Implementation phases

| Phase | Scope                                                                         |
| ----- | ----------------------------------------------------------------------------- |
| 0     | Next.js scaffold, i18n, theme, repository pattern, query config (no provider) |
| 1     | SEO foundation                                                                |
| 2     | Shared layout shell                                                           |
| 3     | Home page                                                                     |
| 4     | About, Terms, FAQ                                                             |
| 5     | Blog                                                                          |
| 6     | Contact (+ Query provider when needed)                                        |
| 7     | Products search                                                               |
