# ADR-004: Client/Server Boundaries

**Status:** Accepted  
**Date:** 2026-07-11

## Context

Unnecessary client components increase bundle size, hydration cost, and bug surface (especially with RTL/locale).

## Decision

### Default: Server Component

Everything is a Server Component until there is a concrete reason for `"use client"`.

Valid client boundaries:

- Browser APIs
- Forms and client mutations (when not using Server Actions)
- `ThemeToggle`, `LocaleSwitcher`
- Debounced search input
- Carousel interaction
- Drag and drop

Add `"use client"` at the **lowest leaf** that needs it.

Every `"use client"` file must be justified in the PR description.

### Internationalization split

| Layer                     | Mechanism                                            |
| ------------------------- | ---------------------------------------------------- |
| Server (RSC, metadata)    | `getDictionary(locale)`                              |
| Client (interactive copy) | `@enterprise/i18n` with controlled `locale` from URL |

Never call `useTranslation()` in Server Components. Never duplicate dictionary logic on the client.

Set `<html lang>` and `dir` in the server layout from `params.locale`. Sync `DesignSystemProvider` with the same locale.

`LocaleSwitcher` navigates to `/en/...` or `/fa/...` — URL is the source of truth.

### Theme

No `next-themes`. Use cookie + inline init script + `DesignSystemProvider`.

### TanStack Query

| Phase | Action                                                                      |
| ----- | --------------------------------------------------------------------------- |
| 0     | Install package; `lib/query/query-client.ts` factory only                   |
| 6+    | Add `QueryClientProvider` when first `useQuery` or `useMutation` is written |

No Query provider before it is needed.

### Zustand

Not used by default. Priority: React state → URL state → server/Query → Context → Zustand (last resort, justified in writing).

## Consequences

- `AppProviders` stays small in early phases (I18n + DesignSystem only).
- Hydration mismatches are avoided by server-owned `lang`/`dir`.
- Query provider added only when client async data appears.
