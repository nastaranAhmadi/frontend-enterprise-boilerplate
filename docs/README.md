# Documentation

Central index for architecture, platform, and engineering docs in this monorepo.

## Platform and architecture

| Document                                                                  | Description                                                                               |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Authentication Architecture](./authentication-architecture.md)           | **OIDC + per-app BFF** decision for cross-domain SSO across Landing, Dashboard, and Admin |
| [Authentication Foundation](./authentication-foundation.md)               | Implementation design: packages, BFF, session model, lifecycle, boundaries, security      |
| [Admin Framework](./admin/README.md)                                      | Enterprise admin platform architecture (RBAC, modules, navigation, audit)                 |
| [Enterprise Admin Architecture](./admin/enterprise-admin-architecture.md) | Full admin TDD: permissions, scopes, modules, feature flags                               |
| [Admin Implementation Roadmap](./admin/implementation-roadmap.md)         | Phased build plan — auth/RBAC first, advanced platform deferred                           |
| [FUTURE-PLAN.md](./FUTURE-PLAN.md)                                        | Platform evolution roadmap (Easy Mode, CLI, plugins, versioning)                          |
| [Architecture ADRs](./architecture/README.md)                             | Landing app decision records (feature ownership, data flow, repository pattern)           |

## Packages and boundaries

| Document                                        | Description                                       |
| ----------------------------------------------- | ------------------------------------------------- |
| [Package Architecture](./packages.md)           | Dependency layers and package rationale           |
| [Module Boundaries](./module-boundaries.md)     | Nx tags, ESLint enforcement, allowed dependencies |
| [TypeScript Strategy](./typescript-strategy.md) | TS config and project reference conventions       |

## UI and design system

| Document                                                               | Description                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| [UI Library Foundation](./ui-library-foundation.md)                    | Component taxonomy and API standards for `@enterprise/ui` |
| [Theme & Tailwind Architecture](./theme-tailwind-architecture.md)      | Theming, tokens, and Tailwind integration                 |
| [Button Reference Workflow](./ui-library/button-reference-workflow.md) | Component reference workflow                              |

## Application-specific

| Document                                          | Description                            |
| ------------------------------------------------- | -------------------------------------- |
| [Internationalization](./internationalization.md) | i18n strategy across apps              |
| [Menu & Food Commerce](./menu-food-commerce.md)   | Landing menu domain notes              |
| [Git Hooks](./git-hooks.md)                       | Husky, lint-staged, commit conventions |

## Quick links by role

| Role                   | Start here                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platform architect** | [Authentication Architecture](./authentication-architecture.md) → [Authentication Foundation](./authentication-foundation.md) → [Admin Implementation Roadmap](./admin/implementation-roadmap.md) |
| **Frontend engineer**  | [Architecture ADRs](./architecture/README.md) → [UI Library Foundation](./ui-library-foundation.md)                                                                                               |
| **Security reviewer**  | [Authentication Architecture](./authentication-architecture.md) §12 Security Model                                                                                                                |
| **New contributor**    | Root [README.md](../README.md) → [Package Architecture](./packages.md)                                                                                                                            |
