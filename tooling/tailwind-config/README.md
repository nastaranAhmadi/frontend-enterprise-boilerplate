# @enterprise/tailwind-config

Shared Tailwind CSS preset and PostCSS pipeline for workspace packages and applications.

## Architecture alignment

This package is a rendering layer only:

`design-tokens -> theme -> tailwind-config -> ui -> applications`

Design tokens remain the source of truth via CSS custom properties.

## Exports

- `@enterprise/tailwind-config` -> Tailwind preset (`preset.cjs`)
- `@enterprise/tailwind-config/content` -> shared monorepo content helper (`content.cjs`)
- `@enterprise/tailwind-config/postcss` -> PostCSS config (`postcss.config.cjs`)

## Usage (example)

```js
// tailwind.config.cjs
const { createContentGlobs } = require('@enterprise/tailwind-config/content');

module.exports = {
  presets: [require('@enterprise/tailwind-config')],
  content: createContentGlobs(__dirname),
};
```

```js
// postcss.config.cjs
module.exports = require('@enterprise/tailwind-config/postcss');
```
