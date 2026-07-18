# Theme + Tailwind Architecture

This monorepo uses a token-first architecture:

`design-tokens → theme → tailwind-config → ui-components → applications`

## 1) Where tokens live

- Source of semantic token names: `packages/design-tokens/src/index.ts`
- Tokens represent semantic CSS variables (for example `--color-primary`), not raw palette values

### Color roles

| Token                                                           | Role                                   |
| --------------------------------------------------------------- | -------------------------------------- |
| `background`                                                    | Page / canvas wash                     |
| `surface` / `surface-elevated`                                  | Cards, panels, popovers                |
| `foreground` / `muted-foreground`                               | Body + secondary text                  |
| `muted`                                                         | Soft fill (chips, hover), **not** text |
| `border` / `border-subtle`                                      | Dividers                               |
| `primary` / `primary-foreground` / `primary-muted`              | Brand action                           |
| `secondary` / `secondary-foreground`                            | Secondary action                       |
| `accent` / `accent-foreground`                                  | Soft highlight (nav, selection)        |
| `success` / `warning` / `error` / `info` (+ foreground + muted) | Status                                 |
| `ring`                                                          | Focus ring                             |
| `overlay`                                                       | Modal / sheet scrim                    |

## 2) Where theme definitions live

- Default palette (**UI Library — Laboratory**) lives in `packages/theme/themes.css`
- `:root` (light default) / `:root[data-theme='dark']` and `[data-theme][data-app='ui']`
- Apps set `data-app` on `<html>` and load override CSS **after** the base theme
- Avoid bare `[data-theme='light'|'dark']` in the base theme — it fights app overrides on `DesignSystemProvider`

| App                    | `data-app`  | Palette                            | Override file                                          |
| ---------------------- | ----------- | ---------------------------------- | ------------------------------------------------------ |
| Storybook / UI         | `ui`        | Laboratory (teal docs)             | default in `themes.css`                                |
| Landing                | `landing`   | SHINSEI (sage + teal)              | `apps/frontend/landing/src/styles/theme-overrides.css` |
| Dashboard (user panel) | `dashboard` | My space (indigo + teal)           | `apps/frontend/dashboard/src/theme-overrides.css`      |
| Admin                  | `admin`     | Control plane (slate + red signal) | `apps/frontend/admin/src/theme-overrides.css`          |

## 3) Where Tailwind configuration lives

- Shared preset: `tooling/tailwind-config/preset.cjs`
- Semantic classes: `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `bg-surface`, `bg-overlay`, …

## 4) How applications override theme

```css
/* apps/frontend/landing/src/styles/globals.css */
@import '@enterprise/theme/styles';
@import './theme-overrides.css';
```

```html
<html data-app="landing" data-theme="light"></html>
```

```css
/* theme-overrides.css */
[data-theme='light'][data-app='landing'] {
  --color-primary: #1d4ed8;
  --color-primary-foreground: #ffffff;
  /* …full surface + brand cluster… */
}
```

Components stay unchanged because they consume semantic Tailwind classes (`bg-primary`, `text-primary-foreground`), never raw hex values.

## 5) How UI components consume tokens

Prefer:

- `bg-primary` + `text-primary-foreground` (filled actions)
- `text-muted-foreground` (secondary copy)
- `bg-muted` (soft surfaces only)
- `bg-surface` / `bg-surface-elevated` (cards / overlays)
- `bg-overlay` (scrims)

Avoid:

- `text-muted` for body copy (that is the soft **fill** color)
- `text-background` on filled buttons (use `text-*-foreground`)
- Hardcoded palette classes (`bg-blue-600`, …)
