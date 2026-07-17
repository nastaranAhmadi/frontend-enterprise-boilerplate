# Frontend Applications

| App         | Stack                | Rendering | Status                         |
| ----------- | -------------------- | --------- | ------------------------------ |
| `landing`   | Next.js (App Router) | SSR / SSG | Production-ready marketing app |
| `dashboard` | React + Vite         | CSR       | Infrastructure only            |
| `admin`     | React + Vite         | CSR       | Infrastructure only            |

**Tags:** `scope:app`, `type:app`, `platform:web`, `domain:frontend`

## Landing app

```bash
pnpm nx dev landing          # http://localhost:4200
pnpm nx build landing
pnpm nx test landing
pnpm nx typecheck landing
```

### Route transitions

Full-screen navigation feedback during in-app route changes. Implemented in `@enterprise/ui` and **required on landing** — see [ADR-006](../../docs/architecture/ADR-006-route-transitions.md).

The overlay covers the entire viewport (`fixed inset-0`, `min-h-dvh`): solid themed backdrop, optional blurred scrim, centered `Loading` indicator, and localized message. It is portaled to `document.body` above toast (`--z-route-transition`).

#### Per-app provider modules

Each app has its own `*AppProviders` that wires `RouteTransitionProvider` with defaults tuned for that app's theme (`data-app` overrides). These are **not** a shared package — duplicate-looking props are independent default settings per app.

| App         | Module                                                                      | Router adapter                    | Status                                                    |
| ----------- | --------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------- |
| `landing`   | `landing/src/providers/app-providers.tsx` + `route-transition-provider.tsx` | `usePathname()`                   | Wired in `[locale]/layout.tsx`                            |
| `dashboard` | `dashboard/src/providers/app-providers.tsx`                                 | Pass `pathname` from React Router | **Not bootstrapped yet** — wire when the Vite shell lands |
| `admin`     | `admin/src/providers/app-providers.tsx`                                     | Pass `pathname` from React Router | **Not bootstrapped yet** — wire when the Vite shell lands |

#### App-specific defaults (today)

Values match across apps for now; change them in each app's provider file independently.

| App         | `enabled` | `minDuration` | `blurBackdrop` | `direction` |
| ----------- | --------- | ------------- | -------------- | ----------- |
| `landing`   | `true`    | `600`         | `true`         | `bottom`    |
| `dashboard` | `true`    | `600`         | `true`         | `bottom`    |
| `admin`     | `true`    | `600`         | `true`         | `bottom`    |

Landing message: `getRouteTransitionMessage(locale)` from `src/i18n/route-transition/{en,fa}.json`.

#### Navigation contract

| Trigger                                                         | Behavior                                            |
| --------------------------------------------------------------- | --------------------------------------------------- |
| Same-origin `<a href>` to a different pathname (capture phase)  | Overlay shows on click                              |
| `pathname` changes (client nav, back/forward)                   | Overlay shows, hides after `minDuration`            |
| `router.push()`, forms, middleware redirects                    | Overlay via pathname effect only (after nav starts) |
| External, `target="_blank"`, `#hash`, same path, modified click | Ignored                                             |

#### `RouteTransitionProvider` props

Provider-level defaults below. App adapters (`NextRouteTransitionProvider`, `*AppProviders`) may override.

| Prop           | Provider default | App adapter default (landing) | Description                                        |
| -------------- | ---------------- | ----------------------------- | -------------------------------------------------- |
| `message`      | — (required)     | from i18n dictionary          | Accessible name (`Loading`) + visible tagline      |
| `enabled`      | `true`           | `true`                        | When `false`, skips overlay, portal, and listeners |
| `minDuration`  | `600`            | `600`                         | Minimum visible time once shown (ms)               |
| `blurBackdrop` | `false`          | `true`                        | Adds `bg-background/80` scrim + `backdrop-blur-md` |
| `direction`    | `bottom`         | `bottom`                      | Slide: `bottom` \| `top` \| `left` \| `right`      |

#### Body lock and styles

While the overlay is visible, `document.body` gets `data-route-transition-active="true"`.

- `packages/ui/src/styles/tailwind.css` — `overflow: hidden` on body
- `landing/src/styles/globals.css` — same rule plus `#main-content { visibility: hidden }` during transition

Apps that use the overlay must import UI base styles **or** replicate the body-lock rules.

#### For maintainers and AI agents

**File map**

```
packages/ui/src/hooks/useRouteTransition.ts          # pathname + click detection
packages/ui/src/components/composite/RouteTransition/  # overlay, provider, styles
apps/frontend/landing/src/providers/
  app-providers.tsx                                  # passes routeTransitionMessage
  route-transition-provider.tsx                      # Next.js pathname adapter
apps/frontend/{dashboard,admin}/src/providers/
  app-providers.tsx                                  # React Router pathname (stub)
```

**Portal lifecycle** — When `enabled={true}`, the overlay portal stays mounted even when hidden (`visible={false}`) so CSS enter/exit transitions work. Do not unmount on hide without redesigning animation. When `enabled={false}`, nothing is portaled and no document listeners are registered.

**Imports**

```ts
import { RouteTransitionProvider } from '@enterprise/ui/providers';
// or
import { RouteTransitionProvider } from '@enterprise/ui/route-transition';
```

**Tests** — `packages/ui/src/hooks/useRouteTransition.test.tsx`, `RouteTransition.test.tsx`, `RouteTransitionProvider.test.tsx`.

**Future work**

- Dashboard/admin: bootstrap Vite shells and wrap router with `DashboardAppProviders` / `AdminAppProviders` + localized `message`.
- Optional: focus trap or `inert` on layout chrome while overlay is visible (header links remain focusable in v1).
- Optional: conditional portal mount if profiling shows cost (requires animation rework).

If styles look broken after a production build while dev is running, stop dev and run `pnpm nx dev:reset landing`.

### Live demos

| Surface   | URL                                                                     |
| --------- | ----------------------------------------------------------------------- |
| Landing   | _Deploy target TBD — run locally on port 4200_                          |
| Storybook | `pnpm nx storybook ui` → [http://localhost:3000](http://localhost:3000) |
