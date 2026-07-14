# @enterprise/theme

Runtime semantic theme variables for shared UI components.

## Exports

- `@enterprise/theme` → Type contracts
- `@enterprise/theme/styles` → Default light/dark CSS variables (`themes.css`)

## Default palette

**Laboratory** (UI / Storybook): cool teal primary on slate canvas. Used when no `data-app` override applies, or when `data-app="ui"`.

## App palettes

Override the full surface + brand cluster via `[data-app]` after importing base styles:

| App         | Personality                                  |
| ----------- | -------------------------------------------- |
| `landing`   | Publisher — marketing blue + cyan            |
| `dashboard` | My space — user-panel indigo + teal          |
| `admin`     | Control plane — slate authority + red signal |

See [`docs/theme-tailwind-architecture.md`](../../docs/theme-tailwind-architecture.md).

## Usage

```css
@import '@enterprise/theme/styles';
@import './theme-overrides.css';
```

```html
<html data-app="landing" data-theme="light"></html>
```

**No React `ThemeProvider` in this package yet.** Apps/UI own light/dark switching; this package owns CSS variable definitions.
