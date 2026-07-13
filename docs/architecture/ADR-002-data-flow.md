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
