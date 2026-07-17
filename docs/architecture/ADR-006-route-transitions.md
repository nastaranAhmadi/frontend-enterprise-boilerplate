# ADR-006: Full-Screen Route Transitions

**Status:** Accepted  
**Date:** 2026-07-17

## Context

In-app navigation should feel deliberate and branded. Landing is a marketing surface but still benefits from consistent navigation feedback — especially with localized copy and per-app themes. Dashboard and admin will need the same primitive once their shells are built.

A partial or inline spinner would not cover chrome (header, mobile nav) during route changes. Product requires a **full-viewport** overlay on every intentional in-app navigation.

## Decision

### Platform primitive

Use `@enterprise/ui` `RouteTransitionProvider` (via `@enterprise/ui/providers` or `@enterprise/ui/route-transition`):

- **Full-screen overlay** — `fixed inset-0`, `min-h-dvh`, themed solid backdrop (`bg-background`) plus optional scrim (`bg-background/80`) and `backdrop-blur-md` when `blurBackdrop` is true.
- **Portal** — rendered to `document.body` at z-index `--z-route-transition` (above toast).
- **Body lock** — while visible, sets `data-route-transition-active="true"` on `document.body` (scroll lock; apps may hide `#main-content` for cleaner paint).
- **Localized copy** — `message` is **required**; no default string in the UI package. Apps pass dictionary strings.
- **Accessibility** — `Loading` exposes `role="status"`; visible tagline is decorative (`aria-hidden`); root uses `aria-busy` / `aria-hidden`.

### Landing (required)

Landing **must** enable route transitions in production:

- Wired via `NextRouteTransitionProvider` in `src/providers/app-providers.tsx`.
- Message from `getRouteTransitionMessage(locale)` (see `src/i18n/route-transition/{en,fa}.json`).
- Defaults: `enabled={true}`, `minDuration={600}`, `blurBackdrop={true}`, `direction="bottom"`.

Do not disable landing transitions for performance tuning without an explicit product decision and ADR amendment.

### Per-app providers (not shared abstraction)

Each frontend app owns an `*AppProviders` module that configures `RouteTransitionProvider` for **that app's theme and UX**:

| App         | Provider module                             | Router wiring                             | Status              |
| ----------- | ------------------------------------------- | ----------------------------------------- | ------------------- |
| `landing`   | `landing/src/providers/app-providers.tsx`   | `usePathname()` in Next adapter           | Production          |
| `dashboard` | `dashboard/src/providers/app-providers.tsx` | Consumer passes `pathname` (React Router) | Infrastructure only |
| `admin`     | `admin/src/providers/app-providers.tsx`     | Consumer passes `pathname` (React Router) | Infrastructure only |

Identical default prop values across apps today are **coincidental** — each file is the single place to tune that app's transition feel against its `data-app` theme overrides. Do not extract a shared `PanelAppProviders` unless a third app proves identical wiring.

### Navigation contract

| Trigger                                                               | Overlay behavior                                   |
| --------------------------------------------------------------------- | -------------------------------------------------- |
| Same-origin `<a href>` click to a different pathname (capture phase)  | Show immediately on click                          |
| `pathname` prop change (Next.js, React Router, back/forward)          | Show, then hide after `minDuration`                |
| `router.push()`, form actions, redirects                              | Only via pathname effect (after navigation starts) |
| External URL, `target="_blank"`, hash-only, same path, modified click | Ignored                                            |

### Portal lifecycle (implementation detail)

When `enabled={true}`:

1. `RouteTransitionProvider` always mounts `RouteTransitionOverlay` (portal to `document.body`).
2. When `visible={false}`, the overlay stays in the DOM with off-screen transforms and `pointer-events-none` so enter/exit CSS can run.
3. When `enabled={false}`, the provider skips the overlay, document click listener, and pathname effects entirely.

This is intentional — conditional mount/unmount would fight the 500ms CSS transition. Optimize only if profiling shows measurable cost.

### Performance coexistence

See [ADR-005](./ADR-005-performance.md). Route transition code lives in a justified `"use client"` boundary (`AppProviders` / `NextRouteTransitionProvider`). Monitor INP on landing; tune `minDuration` or animation only with product sign-off — **not** by removing the overlay from landing by default.

## Consequences

- All apps share one tested overlay primitive; theme and copy differ per app.
- Landing README and layout must keep `routeTransitionMessage` wired from dictionaries.
- Dashboard/admin shells must wrap the router with their `*AppProviders` when those apps graduate from infrastructure.
- Future: focus trap / `inert` on layout chrome during transition (not required for v1).

## References

- `packages/ui/src/components/composite/RouteTransition/`
- `packages/ui/src/hooks/useRouteTransition.ts`
- `apps/frontend/README.md` — wiring, props, maintainer notes
