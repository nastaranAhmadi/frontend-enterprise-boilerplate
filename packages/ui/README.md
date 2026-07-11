# @enterprise/ui

Browser-only design system for enterprise frontend apps. Built with React 19, semantic Tailwind tokens, Vitest, and Storybook.

**Package:** `@enterprise/ui`  
**Storybook:** `pnpm nx storybook ui` → [http://localhost:3000](http://localhost:3000)

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

Consumers must compile Tailwind with content paths that include `packages/ui/src`. Use `@enterprise/tailwind-config/content` to avoid drift.

## What's inside

| Layer         | Description          | Examples                                    |
| ------------- | -------------------- | ------------------------------------------- |
| **Base**      | Stateless primitives | `Button`, `Input`, `Radio`, `Label`         |
| **Composite** | Composed UX patterns | `FormField`, `Modal`, `Table`, `Pagination` |
| **Providers** | App-level wiring     | `DesignSystemProvider`                      |

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
