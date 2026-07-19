# @enterprise/ui

Browser-only design system for enterprise frontend apps. Built with React 19, semantic Tailwind tokens, Vitest, and Storybook.

**Package:** `@enterprise/ui`  
**Storybook:** `pnpm nx storybook ui` → [http://localhost:3000](http://localhost:3000)  
**Deploy:** second Vercel project, Root Directory `packages/ui` — [`vercel.json`](./vercel.json) (see [`apps/frontend/README.md`](../../apps/frontend/README.md#vercel-deploy-storybook))

## Quick start

```tsx
import { DesignSystemProvider, FormField, Button } from '@enterprise/ui';

export function SignupForm() {
  return (
    <DesignSystemProvider locale="en" defaultTheme="light">
      <FormField id="email" label="Email" type="email" required />
      <Button type="submit">Create account</Button>
    </DesignSystemProvider>
  );
}
```

For RTL, pass a locale such as `fa-IR` or set `dir="rtl"` explicitly. Pair with `@enterprise/i18n` for translated copy — see [`docs/internationalization.md`](../../docs/internationalization.md).

### Direction, theme, and responsive layout

```tsx
import {
  DesignSystemProvider,
  Pagination,
  Carousel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useTextDirection,
} from '@enterprise/ui';

export function AppShell() {
  return (
    <DesignSystemProvider locale="fa-IR" defaultTheme="dark">
      <Pagination page={1} totalPages={10} onPageChange={() => undefined} />
      <Carousel navigation pagination>
        {/* slides */}
      </Carousel>
      <Table layout="stacked">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell label="Name">Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DesignSystemProvider>
  );
}

// Inside new interactive components:
function MyNav() {
  const { isRtl } = useTextDirection();
  // mirror keyboard arrows, placement, etc.
  return null;
}
```

Components inherit `dir` and `data-theme` from the provider. Override only when needed (`Pagination dir="ltr"`, `Carousel rtl={false}`). For portaled UI, call `resolveTextDirection({ element })` at interaction time (see `Tooltip`).

### Route transitions

Full-screen in-app navigation overlay — see [ADR-006](../../docs/architecture/ADR-006-route-transitions.md) and `apps/frontend/README.md`.

```tsx
import { RouteTransitionProvider } from '@enterprise/ui/providers';

<RouteTransitionProvider pathname={pathname} message={t('routeTransition.message')} blurBackdrop>
  {children}
</RouteTransitionProvider>;
```

`message` is required (pass from app i18n). The overlay is always full viewport when enabled; portal lifecycle and navigation contract are documented in ADR-006.

Responsive behavior uses Tailwind breakpoints (`sm:`, `md:`) on overlays such as `Modal`, `Carousel`, and `Table layout="stacked"`.

Consumers must compile Tailwind with content paths that include `packages/ui/src`. Use `@enterprise/tailwind-config/content` to avoid drift.

## What's inside

| Layer         | Description          | Examples                                          |
| ------------- | -------------------- | ------------------------------------------------- |
| **Base**      | Stateless primitives | `Button`, `Input`, `Radio`, `Label`               |
| **Composite** | Composed UX patterns | `FormField`, `Modal`, `Table`, `RouteTransition`  |
| **Providers** | App-level wiring     | `DesignSystemProvider`, `RouteTransitionProvider` |

Public exports include component props (`ButtonProps`, `FormFieldProps`, …) and shared tokens (`Size`, `Color`).

## Documentation

- Storybook intro and component stories: run `pnpm nx storybook ui`
- Engineering standards: [`docs/ui-library-foundation.md`](../../docs/ui-library-foundation.md)
- Component templates: `src/components/templates/`

## Scripts

```bash
pnpm nx test ui
pnpm nx build ui
pnpm nx storybook ui
```

## Tailwind integration

Components use semantic utility classes (`bg-background`, `text-foreground`, `border-border`). Theme variables come from `@enterprise/theme` and are activated via `data-theme` on `DesignSystemProvider`.
