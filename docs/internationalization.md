# Internationalization

This guide describes how locale, layout direction, and translations work across `@enterprise/ui`, `@enterprise/i18n`, and frontend applications.

## Architecture

```text
app messages/          @enterprise/i18n              @enterprise/ui
(translations)    ->   I18nProvider + useTranslation   DesignSystemProvider (dir/lang)
                       locale state                    useDesignSystem()
```

- **`locale`** drives copy (`t()`) and default layout direction.
- **`dir`** controls mirroring (`ltr` / `rtl`).
- **UI components** receive translated strings via props; they do not call `t()` internally.

## Package responsibilities

### `@enterprise/i18n`

- `I18nProvider` — holds active locale and translation lookup.
- `useI18n()` — `{ locale, setLocale, t(namespace, key) }`.
- `useTranslation(namespace)` — scoped `{ locale, t(key) }`.

Apps supply `config.translations` at integration time. No bundled copy in the library.

### `@enterprise/ui`

- `DesignSystemProvider` — sets `dir`, `lang`, `data-theme`, and `data-locale` on the provider root.
- `resolveDirFromLocale(locale)` — derives RTL for `fa`, `ar`, `he`, `ur`.
- `useDesignSystem()` — read `theme`, `locale`, `dir`, `lang` inside the design system tree.

## Recommended app wiring

```tsx
import { I18nProvider, useI18n } from '@enterprise/i18n';
import { DesignSystemProvider } from '@enterprise/ui';

const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'fa-IR'] as const,
  namespaces: ['common', 'landing'] as const,
  translations: {
    en: {
      common: { save: 'Save' },
      landing: { heroTitle: 'Build faster' },
    },
    'fa-IR': {
      common: { save: 'ذخیره' },
      landing: { heroTitle: 'سریع‌تر بسازید' },
    },
  },
};

function DesignSystemBridge({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  return <DesignSystemProvider locale={locale}>{children}</DesignSystemProvider>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider config={i18nConfig}>
      <DesignSystemBridge>{children}</DesignSystemBridge>
    </I18nProvider>
  );
}
```

Sync the document root in the app shell (especially for marketing/SEO):

```tsx
import { useI18n } from '@enterprise/i18n';
import { resolveDirFromLocale, resolveLangFromLocale } from '@enterprise/ui';

function DocumentLocale({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const dir = resolveDirFromLocale(locale);
  const lang = resolveLangFromLocale(locale);

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang]);

  return children;
}
```

## Per-app notes

### Landing (`apps/frontend/landing`)

- Prefer locale in the URL (`/fa-IR/...`) for SEO.
- Set `<html lang>` from the active locale.
- Pass `t('landing', key)` into UI components as `title`, `label`, etc.

### Dashboard / Admin panels

- Locale from user preference or account settings.
- `DesignSystemProvider` should follow `useI18n().locale` so tables, modals, and forms mirror correctly.

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
