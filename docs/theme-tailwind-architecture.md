# Theme + Tailwind Architecture

This monorepo uses a token-first architecture:

`design-tokens -> theme -> tailwind-config -> ui-components -> applications`

## 1) Where tokens live

- Source of semantic token names: `packages/design-tokens/src/index.ts`
- Tokens represent semantic CSS variables (for example `--color-primary`), not raw palette values.

## 2) Where theme definitions live

- Runtime default theme variables live in `packages/theme/themes.css`.
- `:root` and `[data-theme='light']` define the default light theme.
- `[data-theme='dark']` defines dark mode.

## 3) Where Tailwind configuration lives

- Shared preset and PostCSS pipeline live in `tooling/tailwind-config`.
- Shared content scanning helper lives at `@enterprise/tailwind-config/content`.
- Applications should use this helper to scan both local app sources and `packages/ui/src`.

## 4) How applications override theme

Applications should override semantic variables in app-owned CSS that is loaded **after** `@enterprise/theme/styles`.

Example (dashboard):

```css
/* apps/frontend/dashboard/src/theme-overrides.css */
[data-app='dashboard'] {
  --color-primary: #7c3aed;
}
```

Example (admin):

```css
/* apps/frontend/admin/src/theme-overrides.css */
[data-app='admin'] {
  --color-primary: #eab308;
}
```

The UI components remain unchanged because they consume semantic classes such as `bg-primary`.

## 5) How UI components consume tokens

Components in `packages/ui` must use semantic Tailwind classes:

- `bg-primary`
- `text-foreground`
- `border-border`

Avoid raw palette classes and inline hardcoded colors.
