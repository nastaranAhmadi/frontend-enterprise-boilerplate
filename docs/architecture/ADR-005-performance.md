# ADR-005: Performance

**Status:** Accepted  
**Date:** 2026-07-11

## Context

“Fast” is not measurable without targets. Landing is a marketing surface — Core Web Vitals and minimal JS are primary goals.

## Decision

### KPI targets (Home page, Phase 3+)

| Metric            | Target                                        |
| ----------------- | --------------------------------------------- |
| LCP               | < 1.5s (mobile, throttled)                    |
| CLS               | < 0.1                                         |
| INP               | < 200ms                                       |
| Initial JS        | < 100kb gzip per route                        |
| Hydration         | Zero mismatch warnings                        |
| Layout shift      | None on theme/locale init                     |
| Network           | No duplicate requests per navigation          |
| Client components | Each `"use client"` justified in PR           |
| Lighthouse        | ≥ 90 (Performance, SEO, A11y, Best Practices) |

### Rendering

- Server Components by default
- `loading.tsx` with `@enterprise/ui` `Skeleton` (fixed dimensions)
- `React.cache()` on application-layer functions
- Static generation for marketing pages; ISR-ready for blog
- `dynamic()` for below-fold carousel and heavy client widgets

### Assets

- `next/image` with explicit dimensions; `priority` only above-the-fold
- `next/font` with `display: 'swap'`; locale-aware font selection

### Caching

- Server: `React.cache()`, Next.js static/ISR, dedupe in application layer
- Client: TanStack Query only when client async exists (Phase 6+)

### Carousel

First choice: `@enterprise/ui` `Carousel`. No Swiper without explicit approval and failed evaluation of existing component.

### Route transition overlay

Landing and future app shells use a **full-screen** route transition overlay (`RouteTransitionProvider`). This is an intentional UX choice — see [ADR-006](./ADR-006-route-transitions.md).

Performance guardrails:

- The provider is a justified `"use client"` boundary; keep the hook and overlay lean.
- Monitor INP on landing after shipping; report regressions in PRs.
- Do **not** disable landing transitions by default to hit KPIs — tune `minDuration` or motion only with product sign-off and an ADR amendment.

## Consequences

- Performance is checked after each phase — not only at launch.
- Bundle size regressions are caught when client boundaries are added.
- Prefer deletion over abstraction; avoid speculative optimization (`memo` without profiling).
