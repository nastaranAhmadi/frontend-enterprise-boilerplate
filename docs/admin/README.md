# Admin Framework Documentation

Architecture documentation for the **Enterprise Admin Framework** — a domain-independent, SaaS-ready React admin platform built on this monorepo.

The sample application domain today is Restaurant Management. The architecture described here is intentionally **not** restaurant-specific. The same infrastructure must support CRM, ERP, hospital systems, warehouse management, e-commerce back offices, and other enterprise products without structural rewrites.

## Documents

| Document                                                            | Scope                                                                                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Enterprise Admin Architecture](./enterprise-admin-architecture.md) | Full technical design: vision, authorization, modules, navigation, notifications, audit, security, and expansion roadmap |
| [Implementation Roadmap](./implementation-roadmap.md)               | Phased build plan — authentication and RBAC foundation first, advanced platform deferred                                 |

## Relationship to existing docs

| Existing doc                                            | Relevance                                                                                                |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Architecture ADRs](../architecture/README.md)          | Landing app patterns (feature ownership, data flow, repository pattern) that admin will adopt and extend |
| [FUTURE-PLAN.md](../FUTURE-PLAN.md)                     | Platform evolution, Easy Mode / Advanced Mode, plugin strategy, package maturity                         |
| [packages.md](../packages.md)                           | Shared package layers (`auth`, `permissions`, `feature-flags`, `ui`, etc.)                               |
| [module-boundaries.md](../module-boundaries.md)         | Nx tag taxonomy and dependency enforcement                                                               |
| [ui-library-foundation.md](../ui-library-foundation.md) | Design system rules for admin UI composition                                                             |

## Current implementation status

| Area                        | Status                                                              |
| --------------------------- | ------------------------------------------------------------------- |
| `@enterprise/admin` app     | Vite shell with sidebar, orders sample, i18n, theme toggle          |
| `@enterprise/auth`          | Port interfaces only (`AuthBoundary`, token contracts)              |
| `@enterprise/permissions`   | Port interfaces only (`PermissionChecker`, `PermissionPolicy`)      |
| `@enterprise/feature-flags` | Port interfaces only (`FeatureFlagsClient`)                         |
| `@enterprise/ui`            | Production-ready design system (admin shell will compose from this) |
| Backend services            | Not started (`apps/backend/` placeholder)                           |

**This documentation describes target architecture**, not current implementation. Where the codebase already defines ports or patterns, this document aligns with them. Where gaps exist, recommendations are documented explicitly.

## Technology stack (admin)

| Layer         | Choice                                        | Rationale                                                     |
| ------------- | --------------------------------------------- | ------------------------------------------------------------- |
| UI            | React 19 + TypeScript                         | Consistent with monorepo                                      |
| Bundler       | Vite (CSR SPA)                                | Fast dev experience; admin is authenticated, not SEO-critical |
| Monorepo      | Nx + pnpm workspaces                          | Boundary enforcement, affected builds, shared packages        |
| Design system | `@enterprise/ui`                              | Shared components, RTL, theme, DataTable, forms               |
| Routing       | React Router (planned)                        | SPA navigation; permission-gated route registration           |
| Data          | Repository pattern + `@enterprise/api-client` | Same swap-friendly pattern proven in landing                  |
| i18n          | `@enterprise/i18n`                            | Namespace-based; admin owns its dictionaries                  |
| State         | TanStack Query (planned)                      | Server state; no global client store for domain data          |
