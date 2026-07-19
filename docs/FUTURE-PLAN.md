# Platform Future Plan

Architecture assessment and evolution roadmap for evolving this repository from an enterprise boilerplate into a reusable **TypeScript Application Platform**.

**Intentional north star:** Application Platform (Laravel-for-TypeScript-SaaS model) — not a generic framework, not a starter to copy once.

**Status:** Planning document. Describes target state and decisions not yet implemented.

**Related docs:** [Architecture ADRs](./architecture/README.md) · [Package layers](./packages.md) · [Module boundaries](./module-boundaries.md)

---

## Executive summary

| Dimension                        | Today                         | Target                            |
| -------------------------------- | ----------------------------- | --------------------------------- |
| Monorepo hygiene                 | Strong (Nx, boundaries, ADRs) | Maintain                          |
| Design system (`@enterprise/ui`) | Production-ready              | Publish v1, LTS                   |
| Reference apps                   | Landing only                  | Templates + dogfood apps          |
| Platform packages                | Mostly type stubs             | Implement or remove README claims |
| CLI / Easy Mode                  | None                          | `create-enterprise-app`           |
| Plugin system                    | None                          | SDK after 3 first-party plugins   |

**What we are today:** A high-quality enterprise boilerplate with application platform ambitions.

**What we are building toward:** An opinionated platform where developers get Landing + Dashboard + Admin + Auth + RBAC + i18n + theme + data layer with minimal repeated infrastructure work.

---

## 1. Can this evolve into a platform?

### Yes — with structural decisions in the next 6–12 months

**Why it can work**

- ADR discipline (feature ownership, client/server boundaries, no premature `BaseRepository`) is platform-grade.
- `@enterprise/ui` is a real, testable design system — the primary moat.
- Module boundary enforcement (ESLint + `validate-boundaries.mjs`) scales to large teams.
- Landing proves the repository pattern (factory + datasource + composition root) is teachable and swappable.

**Why it fails if we continue as-is**

- READMEs document APIs that do not exist (`createEnv`, `createLogger`, `createPermissionChecker`, `ThemeProvider`).
- Platform logic lives inside one app (`landing`); dashboard/admin are stubs.
- No bootstrap above the app (`createEnterpriseApp`, module registry, plugin slots).
- Backend is unstarted; auth, jobs, billing cannot be frontend-only.
- Easy Mode is impossible today — developers must understand all layers.

**Conclusion:** Evolution is realistic if we stop adding stub packages and build **second and third apps** that force extraction.

---

## 2. One-way door decisions (fix or formalize early)

### Critical

| Decision                                            | Risk                                                           |
| --------------------------------------------------- | -------------------------------------------------------------- |
| Stub packages with fictional public APIs            | OSS trust collapse once published to npm                       |
| `NEXT_PUBLIC_DATA_SOURCE` for mock/API toggle       | Leaks data-layer strategy to client bundle                     |
| Per-app repository wiring without shared convention | N forked composition roots across apps                         |
| No formal `AuthProvider` / `PermissionChecker` port | Vendor lock-in when auth ships                                 |
| `shared` package as vague registry                  | Becomes a junk drawer                                          |
| i18n dual stack without contract                    | Server dict + client `@enterprise/i18n` + error slices diverge |
| Monorepo-only `workspace:*`                         | Blocks independent package versioning                          |

### High (painful after dashboard ships)

- Feature folders as the only extension point (plugins need more).
- Landing patterns becoming gospel before dashboard forces extraction.
- Single `@enterprise/ui` assumed for React Native (it is web-only).
- No API versioning strategy in `api-client`.
- Theme split: landing context vs `@enterprise/theme` stubs.

---

## 3. Application-specific vs packages vs forever-apps

### Stays application-specific

- `features/*` marketing UI
- `_mocks/*`, product copy, navigation tables
- Blog / contact / products domains (plugin territory, not core)

### Becomes packages (when second consumer exists)

| Landing today                    | Future package                     | Trigger                        |
| -------------------------------- | ---------------------------------- | ------------------------------ |
| `lib/seo/*`                      | `@enterprise/next-seo`             | Second Next app needs metadata |
| `lib/i18n/middleware-routing.ts` | `@enterprise/next-i18n`            | Second Next app                |
| `application/` + `repositories/` | `@enterprise/data-access/<domain>` | Dashboard shares API           |
| Route Handler client pattern     | `@enterprise/web-api` helpers      | 3+ apps                        |
| Theme cookie + init script       | `@enterprise/theme-next`           | Consolidate theme story        |
| Composition root pattern         | `@enterprise/bootstrap`            | CLI needs single entry         |

### Forever apps (or templates)

| App               | End state                  |
| ----------------- | -------------------------- |
| Landing           | `templates/landing` in CLI |
| Dashboard         | `templates/dashboard`      |
| Admin             | `templates/admin`          |
| Customer products | Outside this repo          |

In a successful platform, `apps/frontend/*` in this repo are **dogfood apps**, not the product. The product is `create-enterprise-app` output + published packages.

---

## 4. Easy Mode and Advanced Mode

Both modes coexist via **layered defaults + escape hatches** (Rails model).

```
Easy Mode (create-enterprise-app)
  → Pre-wired templates, hidden repositories/datasources
  → User edits enterprise.config.ts + features/

Convention layer
  → Fixed folder layout, CLI generates into conventions

Port interfaces (Advanced Mode swap points)
  → AuthProvider, PermissionChecker, DataSourceFactory, MessageCatalog

Vendor adapters
  → clerk | auth0 | keycloak | prisma | drizzle | mock
```

**Required mechanics**

1. `enterprise.config.ts` — single user-facing config (auth driver, db, locales, theme).
2. Codegen, not documentation — Easy Mode works when the CLI generates a working app.
3. Escape hatch = replace adapter, not delete folders.
4. Progressive disclosure — `enterprise generate feature contact --advanced` exposes repository files.

**Today:** Advanced Mode exists in landing. Easy Mode does not.

---

## 5. Abstractions that must never exist

| Never build                                       | Why                                   |
| ------------------------------------------------- | ------------------------------------- |
| `BaseRepository` / `AbstractRepository`           | Forces CRUD on non-CRUD domains       |
| `BaseService` / `ApplicationService`              | God class                             |
| `BaseController`                                  | Not Spring MVC                        |
| `EntityManager` / generic ORM facade              | Wrong for frontend                    |
| `GenericCRUD<T>` generator                        | Identical garbage UI                  |
| `EnterpriseFramework` singleton                   | Untestable                            |
| `IRepository<T>` before 3 implementations         | Interface pollution (ADR-003 forbids) |
| Unified `EnterpriseDatabase` for Prisma + Drizzle | Leaky abstraction                     |

**Rule:** Interfaces at **vendor boundaries** (auth, storage, payments). Not at domain boundaries until proven.

---

## 6. Abstractions to add only after evidence

| Abstraction                              | Evidence threshold                        |
| ---------------------------------------- | ----------------------------------------- |
| `AuthProvider` port                      | 2 auth implementations (built-in + Clerk) |
| `PermissionChecker` port                 | Admin + backend guard both need it        |
| `DataSourceFactory` / bootstrap registry | 3 apps share repository wiring            |
| `ModuleManifest` (plugins)               | First third-party plugin attempt          |
| `MessageCatalog` loader                  | Plugin i18n + lazy namespaces             |
| `EnterpriseAppBootstrap`                 | CLI exists                                |
| `@enterprise/next` adapter               | 2 Next apps                               |
| Billing provider port                    | Stripe in 2 products                      |

Do not implement packages before the evidence row is true.

---

## 7. Package review summary

| Package                                           | Verdict                                                  |
| ------------------------------------------------- | -------------------------------------------------------- |
| `types`, `errors`, `design-tokens`, `hooks`, `ui` | Keep; `ui` is crown jewel                                |
| `api-client`                                      | Keep; ship auth/retry middleware or remove README claims |
| `i18n`                                            | Keep; add Next server adapter                            |
| `theme`                                           | Keep CSS; implement or delete React API stubs            |
| `validation`                                      | Keep; add shared schemas when needed                     |
| `env`, `logger`, `auth`, `permissions`            | Keep as ports; **implement or fix READMEs**              |
| `feature-flags`                                   | Defer until logger exists                                |
| `utils`                                           | Add real functions or merge elsewhere                    |
| `config`                                          | Merge with `env` long-term                               |
| `shared`                                          | Delete or give single responsibility                     |

**Freeze new packages** until `env`, `auth`, and `logger` are real.

---

## 8. Applications strategy

| Question            | Answer              |
| ------------------- | ------------------- |
| Remain in monorepo? | Yes, as dogfood     |
| Become templates?   | **Yes — end state** |
| Become generators?  | Templates + codegen |

**Evolution**

```
Today:     apps/frontend/{landing,dashboard,admin}
Year 1:    templates/* + thin app wrappers
Year 2:    CLI pulls @enterprise/template-* from npm
Year 3:    Customer apps live outside this repo
```

Dashboard and admin must ship a minimal auth shell + one screen, or be removed from marketing until ready.

---

## 9. CLI evolution

| Command                       | When                                    |
| ----------------------------- | --------------------------------------- |
| `create-enterprise-app`       | **First** — before npm publish          |
| `enterprise generate feature` | After dashboard has 2+ features         |
| `enterprise generate page`    | With create-enterprise-app              |
| `enterprise generate auth`    | After AuthProvider + 2 adapters         |
| `enterprise generate crud`    | **Delay** — after manual CRUD in 2 apps |
| `enterprise add plugin`       | After plugin manifest spec              |

Do not auto-generate `BaseRepository` CRUD.

---

## 10. Independent package versioning

**Not compatible today** (`workspace:*`, single repo release).

**Required**

- Publish packages with semver
- Apps depend on ranges (`@enterprise/ui@^3`)
- Changelog per package (Changesets)
- Compatibility matrix for template bundles
- Templates pin known-good combinations

---

## 11. Replaceable platform modules

Enabled by **ports at the composition root**:

```ts
// enterprise.config.ts
export default defineConfig({
  auth: { driver: 'keycloak' },
});

// Application code
const session = await auth.getSession(); // never import @clerk/nextjs in features
```

| Layer          | Depends on                                     |
| -------------- | ---------------------------------------------- |
| Features       | `AuthProvider`, `PermissionChecker` interfaces |
| api-client     | Token injector from `AuthProvider`             |
| Route handlers | `auth.requireSession()` helper                 |

Define `AuthProvider` port before shipping built-in auth.

---

## 12. Plugin architecture (future)

Required for `enterprise-plugin-blog`, `-shop`, `-chat`, `-ai`:

- `@enterprise/plugin-sdk` with `definePlugin({ routes, providers, i18n })`
- Versioned plugin manifest
- Route registration for App Router (via `@enterprise/next` adapter)
- Composition root extension: `registerDatasource('blog', factory)`
- Plugin #1 (blog) in a separate package before public plugin API

Next.js has no official plugin system — plan for a build-step or adapter-owned route merger.

---

## 13. Multi-platform support

| Package                                 | Next | Vite SPA | React Native          | Electron |
| --------------------------------------- | ---- | -------- | --------------------- | -------- |
| `ui`                                    | ✅   | ✅       | ❌ (separate package) | ✅       |
| `hooks`, `i18n`, `api-client`, `errors` | ✅   | ✅       | ✅                    | ✅       |
| Landing RSC patterns                    | ✅   | ❌       | ❌                    | partial  |

**Target package split**

```
@enterprise/core       # ports, errors, validation, api-client
@enterprise/react      # hooks, i18n
@enterprise/ui-web     # current ui
@enterprise/next       # middleware, SEO, RSC data flow
@enterprise/vite       # SPA bootstrap
```

Tag `ui` as `platform:web` only. Do not claim universal UI.

---

## 14. Version 5.0 vision (~5 years)

- `pnpm create enterprise-app` scaffolds in 60 seconds
- 15–20 semver-stable published packages with LTS
- Templates: landing, saas-dashboard, admin, marketplace
- Plugin registry (blog, shop, chat, AI)
- Auth: built-in + vendor adapters
- Prisma/Drizzle/CMS adapters behind `DataSource` ports
- OpenTelemetry, feature flags, audit log SDK
- Nx optional for single-app consumers
- This repo hosts `examples/` for dogfooding, not customer apps

---

## 15. Developer experience and killer feature

**Today:** Plain Next.js + shadcn is faster for a simple landing page. Our layers add cost without Easy Mode.

**Killer feature (when mature):**

> _I need Landing + Auth + Dashboard + Admin + RBAC + i18n + theme + API layer — production-ready in an afternoon._

Secondary moats: `@enterprise/ui`, boundary enforcement, mock → API swap without feature rewrites.

---

## 16. OSS maintainer concerns

**Maintenance nightmares:** README fiction, `ui` API churn, Next.js major upgrades, plugin supply chain, auth adapter SDK churn.

**Breaking changes expected:** `@enterprise/ui` majors, template structure, `enterprise.config.ts` schema, auth session shape.

**Good extension points:** `AuthProvider`, `PermissionChecker`, `DataSource`, `Logger`, `enterprise.config.ts`, `definePlugin()`.

**Bad extension points:** `BaseAuthService` subclass, `GenericRepository`, monkey-patching Next config.

Add **Changesets** before `@enterprise/ui` v1.0.0.

---

## 17. Enterprise adoption

| Team size | Adopt today?                                                                   |
| --------- | ------------------------------------------------------------------------------ |
| ~20 devs  | Maybe — as design system + reference architecture if gaps are owned internally |
| ~50 devs  | No — need LTS, security audit, working auth, upgrade guides                    |
| ~200 devs | No — need plugin governance, compliance, support (3+ years out)                |

---

## 18. Solo developer and startup

| Persona               | Today                                          |
| --------------------- | ---------------------------------------------- |
| Freelancer            | Too heavy — use shadcn + Next                  |
| Pre-PMF startup       | Too heavy — speed beats architecture           |
| Post-PMF SaaS startup | Target customer in 12–18 months with Easy Mode |
| Agency (many SaaS)    | Long-term target (white-label, multi-tenant)   |

Missing for startups: working `create-enterprise-app`, auth-in-a-box, one-command Vercel deploy.

---

## 19. Security — replaceable auth and RBAC

```
features/     → never import @clerk/nextjs
application/  → auth.requirePermission('post:write')
bootstrap/    → wires KeycloakAuthProvider
api-client/   → token middleware from AuthProvider
```

Implement `createPermissionChecker()` with one in-memory policy **before** admin ships. Ban ad-hoc `user.role === 'admin'` in features.

---

## 20. What we are intentionally becoming

**Application Platform** — not a starter, not a boilerplate (long-term), not a NestJS-style framework, not an internal developer platform.

- Vision list (auth, RBAC, billing, multi-tenancy, CMS, jobs) is platform vocabulary.
- Easy Mode + Advanced Mode is a platform tradeoff.
- Nx is tooling inside the platform, not the product.
- `@enterprise/ui` is a platform module.

---

## Strengths (preserve)

1. ADR discipline
2. Production-grade `@enterprise/ui`
3. Landing demonstrates server-only boundaries and Route Handlers
4. Module boundary enforcement
5. ADR-003 prevents `BaseRepository` disease
6. i18n/RTL/theme planned early
7. Testing culture started (Vitest, route handler tests)
8. Phased implementation documented (Phases 0–7)

---

## Weaknesses (address)

1. ~70% of packages are interfaces only — READMEs overpromise
2. Only one real app
3. Dashboard/admin stubs hurt credibility
4. No CLI
5. No backend
6. Landing reimplements `env` / theme locally
7. No plugin architecture
8. No independent versioning story
9. DX worse than plain Next for simple cases

---

## Risks

| Risk                                                 | Severity |
| ---------------------------------------------------- | -------- |
| OSS trust collapse from stub READMEs                 | Critical |
| Auth port designed wrong                             | Critical |
| Next.js plugin model harder than expected            | High     |
| Premature abstraction explosion                      | High     |
| Monorepo-only limits adoption                        | Medium   |
| Competing with shadcn + next-intl + Clerk à la carte | Certain  |

---

## Redesign immediately (next 90 days)

1. README audit — implement or delete every documented API
2. Implement `createEnv()` or remove `@enterprise/env` claims; migrate landing
3. Define `AuthProvider` port + one real implementation (even mock session)
4. Kill or narrow `@enterprise/shared`
5. Bootstrap dashboard: auth shell + one protected page
6. Add Changesets
7. Create `enterprise.config.ts` schema
8. Move `DATA_SOURCE` to server-only env
9. Consolidate theme (landing context OR `@enterprise/theme`, not both)
10. Rename in docs: Application Platform, not boilerplate

---

## Postpone (correct to defer)

| Item                       | Wait for                                 |
| -------------------------- | ---------------------------------------- |
| Plugin system              | Blog plugin in separate internal package |
| `generate crud`            | 2 manual CRUD features in admin          |
| Multi-tenancy              | 2 customers need it                      |
| Billing module             | Stripe in one dogfood app                |
| React Native UI            | Web platform PMF                         |
| Independent major versions | 5+ packages with external users          |
| Backend jobs/emails        | Backend app exists                       |

---

## Never build

1. `BaseRepository` / generic ORM facade
2. `EnterpriseCore` god singleton
3. Packages with README-only APIs
4. Plugin marketplace before 3 first-party plugins
5. CRUD generator before hand-written CRUD proof
6. Single `ui` package for web + native
7. Framework that requires reading ADRs to ship a landing page

---

## Roadmap

### v0.1 — Honest boilerplate (0–3 months)

- [ ] README truth purge across packages
- [ ] `createEnv`, console `logger`, mock `AuthProvider`
- [ ] Dashboard: Vite + auth shell + layout using `ui`
- [ ] Changesets
- [ ] `enterprise.config.ts` spec
- [ ] Extract `@enterprise/next-i18n` from landing middleware
- [ ] Landing blog: when HTML CMS API is live, delete `_mocks/blog` + mock datasource (checklist in [ADR-002](./architecture/ADR-002-data-flow.md#blog-html-cms--mock-cleanup-checklist))
- [ ] Landing about: when HTML CMS API is live, delete `_mocks/about` + mock datasource (checklist in [ADR-002](./architecture/ADR-002-data-flow.md#about-html-cms--mock-cleanup-checklist))

### v0.5 — Platform preview (6 months)

- [ ] `create-enterprise-app` CLI (landing + dashboard templates)
- [ ] Built-in auth + Clerk adapter
- [ ] `PermissionChecker` runtime + admin gate
- [ ] `@enterprise/data-access` for one shared domain
- [ ] Backend hello-service using shared ports
- [ ] Publish `@enterprise/ui@1.0.0`

### v1.0 — Application platform (12–18 months)

- [ ] Easy Mode: few questions → production SaaS skeleton
- [ ] Advanced Mode: documented swap points
- [ ] Admin template with RBAC + audit hooks
- [ ] Prisma + Drizzle adapters
- [ ] `enterprise generate feature|page|auth`
- [ ] Upgrade guide + codemods

### v2.0 — Extensible platform (24–36 months)

- [ ] Plugin SDK + 3 first-party plugins
- [ ] Billing module (Stripe)
- [ ] Multi-tenant config
- [ ] Independent package LTS channels
- [ ] `@enterprise/vite` SPA adapter

### v5.0 — Enterprise application platform (~60 months)

- [ ] Plugin registry with security review
- [ ] White-label / multi-tenant SaaS kit
- [ ] CMS, jobs, email modules
- [ ] React Native design system fork
- [ ] Enterprise support tier
- [ ] Compliance documentation (SOC2-oriented)
- [ ] Nx optional; single-app default

---

## Final note

The vision is coherent. Landing and `@enterprise/ui` prove execution ability. **Do not publish to npm before the README audit.** **Bootstrap dashboard before adding packages.** **Build Laravel for TypeScript SaaS, not NestJS.**
