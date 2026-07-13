# ADR-001: Feature Ownership

**Status:** Accepted  
**Date:** 2026-07-11

## Context

Landing pages accumulate components quickly. A global `components/` folder becomes unmaintainable without clear ownership rules.

## Decision

Use feature-based architecture with three extraction tiers:

| Used by                    | Location                                                 |
| -------------------------- | -------------------------------------------------------- |
| One feature only           | `src/features/<feature>/`                                |
| Multiple features, one app | `src/components/`, `src/config/`, `src/lib/` (allowlist) |
| Multiple applications      | `packages/`                                              |

### `src/features/<feature>/`

Owns UI and client hooks for one domain:

```
features/blog/
  components/
  sections/
  hooks/
```

### `src/components/` (app-wide only)

Allowed: `SiteHeader`, `SiteFooter`, `LocaleSwitcher`, `ThemeToggle`, SEO wrappers.

Forbidden: `BlogCard`, `HeroSection`, `ProductSearch`, `ContactForm`.

### Forbidden folders in apps

- `src/shared/`
- `src/common/`
- `src/helpers/`
- `src/utils/` (use `packages/utils` for cross-app pure utilities)
- `src/misc/`
- `features/common/`

### `src/lib/` allowlist

Only infrastructure helpers: `query/`, `cookies/`, `analytics/`. No random files.

Configuration lives in `src/config/` (`site.ts`, `env.ts`, `routes.ts`, `navigation.ts`, `seo.ts`, `theme.ts`).

## Consequences

- PRs can reject misplaced components by referencing this ADR.
- Repository and application layers stay outside features (see ADR-002, ADR-003).
- Extraction to `packages/` waits until two apps share code today — not “might share later.”
