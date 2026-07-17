# Internationalization

This guide describes how locale, layout direction, and translations work across `@enterprise/ui`, `@enterprise/i18n`, and frontend applications.

## Architecture

```text
app dictionaries/      @enterprise/i18n                 @enterprise/ui
(per-app messages) ->  createTranslator / createT         DesignSystemProvider (dir/lang)
                       (+ optional I18nProvider)          useDesignSystem()
```

- **`locale`** drives copy (`t()`) and default layout direction.
- **`dir`** controls mirroring (`ltr` / `rtl`).
- **UI components** receive translated strings via props; they do not call `t()` internally.
- **Message trees stay in each app** (landing / dashboard / admin). The package only provides lookup.

## Package responsibilities

### `@enterprise/i18n`

- `createTranslator(dictionaries)` — bind per-locale message trees; returns `createT(locale)`.
- `createT(dictionary)` / `t(dictionary, path)` — dotted-path lookup (`home.hero.title`).
- `tNumber` / `tStrings` — typed helpers for number and `string[]` leaves.
- `@enterprise/i18n/react` — optional client `I18nProvider` / `useI18n` / `useTranslation` for flat namespace keys.

Apps supply dictionaries at integration time. No bundled copy in the library. Root `@enterprise/i18n` has no React dependency surface (RSC-safe).

### `@enterprise/ui`

- `DesignSystemProvider` — sets `dir`, `lang`, `data-theme`, and `data-locale` on the provider root.
- `resolveDirFromLocale(locale)` — derives RTL for `fa`, `ar`, `he`, `ur`.
- `useDesignSystem()` — read `theme`, `locale`, `dir`, `lang` inside the design system tree.

## Recommended app wiring

Bind once per app (works in RSC and client components):

```ts
// apps/frontend/<app>/src/i18n/t.ts
import { createTranslator } from '@enterprise/i18n';
import { dictionaries } from './dictionaries';

export const createT = createTranslator(dictionaries);
```

```tsx
import { createT } from '@/i18n/t';

const t = createT(locale);
return <h1>{t('home.hero.title')}</h1>;
```

Optional: use `I18nProvider` when a client tree needs reactive locale without passing `locale` props. Prefer `createTranslator` for Next.js App Router / RSC.

## Per-app notes

### Landing (`apps/frontend/landing`)

- Prefer locale in the URL (`/fa/...`) for SEO.
- Set `<html lang>` from the active locale.
- Dictionaries live under `src/i18n/dictionaries/`; call sites use `createT(locale)`.

### Dashboard / Admin panels

- Own message trees under each app’s `src/i18n/dictionaries/` (or equivalent).
- Bind with the same `createTranslator` pattern.
- Locale from user preference or account settings; keep `DesignSystemProvider` in sync for RTL.

## Storybook (UI package)

Use the global toolbar:

| Control   | Purpose                         |
| --------- | ------------------------------- |
| Theme     | Light / dark tokens             |
| Locale    | `en`, `fa-IR`, `ar`             |
| Direction | Auto (from locale), LTR, or RTL |

`Composite/RTL` stories validate form controls under RTL. Prefer toolbar globals over per-story decorators.

## RTL styling checklist

1. Use logical utilities (`start-*`, `end-*`, `ms-*`, `me-*`).
2. Pass `dir` explicitly to `Pagination` and `Carousel` when not wrapped by `DesignSystemProvider`.
3. Test focus traps (`Modal`, `BottomSheet`) and menus (`Dropdown`) in RTL.
4. Keep keyboard order in DOM order; do not reverse tab order for RTL.

## Related docs

- [`ui-library-foundation.md`](./ui-library-foundation.md) — section 7 (internationalization contract)
- [`packages/i18n/README.md`](../packages/i18n/README.md) — package API summary
