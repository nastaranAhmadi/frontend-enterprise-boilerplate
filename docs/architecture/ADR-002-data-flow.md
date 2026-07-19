# ADR-002: Data Flow

**Status:** Accepted  
**Date:** 2026-07-11

## Context

Mock data will be replaced by APIs. Components must not be rewritten when the backend arrives.

## Decision

All data flows through four layers:

```
app/[locale]/<route>/page.tsx     (thin route)
        ↓
src/application/<domain>/         (server use cases)
        ↓
src/repositories/<domain>/        (data access API)
        ↓
Datasource (mock | api)
        ↓
src/_mocks/  |  @enterprise/api-client
        ↓
features/<domain>/components/     (props only)
```

### `src/application/`

Server-side use cases: `React.cache()`, mapping, sorting, filtering. Calls repositories only.

Not named `queries/` — that term is reserved for React Query / GraphQL / SQL.

### `src/repositories/`

Domain data access. Lives outside `features/` because it is not a UI concern.

### `src/_mocks/`

Mock data files. Imported **only** by mock datasources — never by pages, application layer, or UI.

### Presentational rules

Components never:

- fetch data
- import mocks
- call `api-client`
- import repositories

## Consequences

- API migration changes datasource wiring and optionally `ApiDatasource` — UI unchanged.
- When dashboard also needs blog data, move `src/repositories/blog/` to `packages/data-access/blog/`.
- Client async state (search, mutations) uses TanStack Query in `features/*/hooks/` when needed — not the application layer.

---

## Blog HTML CMS — mock cleanup checklist

Landing blog (index + detail) is **HTML-driven**. The API contract is only:

```ts
{
  content: string;
  lastModified: string;
}
```

The frontend renders `content` (unwraps `<body>` for the app shell). It does **not** model title, topics, cards, or sections.

### Today (mock)

| Piece                                       | Role                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `src/_mocks/blog/posts.ts`                  | Hardcoded API payloads (`blogIndexByLocale`, `blogDetailByLocale`) |
| `src/_mocks/blog/cms-styles.ts`             | CSS string embedded inside mock HTML documents                     |
| `repositories/blog/blog.mock-datasource.ts` | Serves those payloads                                              |
| `create-blog-repository.ts`                 | Picks mock vs API via `env.dataSource`                             |
| `NEXT_PUBLIC_DATA_SOURCE`                   | Toggle (`mock` default)                                            |

### When the real blog API ships

Do this cleanup (rendering / `features/blog/*` should stay):

1. Point `createApiBlogDatasource` at the real backend base URL and paths (`GET /api/blog`, `GET /api/blog/:slug`, slugs endpoint if needed for SSG/sitemap).
2. Set `NEXT_PUBLIC_DATA_SOURCE=api` (or remove the mock branch once API is the only source).
3. Delete `src/_mocks/blog/` (entire folder).
4. Delete `repositories/blog/blog.mock-datasource.ts`.
5. Simplify `create-blog-repository.ts` to always use the API datasource (drop mock import + `env.dataSource` branch for blog if unused elsewhere).
6. Confirm sitemap / `generateStaticParams` still get slugs from the real API (`getPostSlugs`).
7. Do **not** reintroduce Topic/Seed builders or React list/card models for CMS HTML pages.

**Migration rule:** swap mock → `fetch` at the datasource. Pages and HTML render path must not change.

---

## About HTML CMS — mock cleanup checklist

Landing About uses the same HTML-driven contract as blog:

```ts
{
  content: string;
  lastModified: string;
}
```

Philosophy and Chefs live as in-page sections (`#philosophy`, `#chefs`) inside the CMS HTML — not nav dropdown destinations.

### Today (mock)

| Piece                                         | Role                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `src/_mocks/about/page.ts`                    | Hardcoded API payloads (`aboutPageByLocale`)                                    |
| `src/_mocks/about/cms-styles.ts`              | CSS string embedded inside mock HTML (split hero, fade carousel, chefs marquee) |
| `repositories/about/about.mock-datasource.ts` | Serves those payloads                                                           |
| `create-about-repository.ts`                  | Picks mock vs API via `env.dataSource`                                          |

### When the real about API ships

1. Point `createApiAboutDatasource` at the real backend path.
2. Set `NEXT_PUBLIC_DATA_SOURCE=api` (or drop the mock branch once API is the only source).
3. Delete `src/_mocks/about/`.
4. Delete `repositories/about/about.mock-datasource.ts`.
5. Simplify `create-about-repository.ts` to always use the API datasource.
6. Do **not** reintroduce i18n section models or React cards for CMS HTML pages.
