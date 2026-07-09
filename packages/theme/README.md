# @enterprise/theme

Runtime semantic theme variables for shared UI components.

## Exports

- `@enterprise/theme` -> Type contracts
- `@enterprise/theme/styles` -> Default light/dark CSS variable definitions (`themes.css`)

## Usage

Import base theme variables once in your app global stylesheet:

```css
@import '@enterprise/theme/styles';
```

Then add app-specific overrides in a local stylesheet loaded after the base import.

# @enterprise/theme

Theme infrastructure: Light / Dark / System modes, CSS variables, SSR-safe `ThemeProvider`, `useTheme()`.

**No UI components.** Consumes `@enterprise/design-tokens`.

**Consumers:** `ui`, frontend apps
