# ADR-003: Repository Pattern

**Status:** Accepted  
**Date:** 2026-07-11

## Context

Repositories must support mock and API sources without coupling to either. `api-client` must remain HTTP-only.

## Decision

### Repository factory with dependency injection

Repositories receive a datasource — they do not choose mock vs API:

```ts
export function createBlogRepository(datasource: BlogDatasource) {
  return {
    getPosts: (locale: Locale) => datasource.getPosts(locale),
  };
}
```

Wiring happens once in a composition root:

```ts
// create-blog-repository.ts
export function createBlogRepositoryForApp() {
  const datasource =
    env.dataSource === 'api' ? createApiBlogDatasource(apiClient) : createMockBlogDatasource();
  return createBlogRepository(datasource);
}
```

### Datasource types

| Datasource           | Responsibility                 |
| -------------------- | ------------------------------ |
| `MockBlogDatasource` | Reads `src/_mocks/`            |
| `ApiBlogDatasource`  | Calls `@enterprise/api-client` |

### `api-client` rules

Knows only: `GET`, `POST`, `PATCH`, `DELETE`, headers, `baseUrl`, token, timeout.

**No mock awareness.**

### Forbidden until two real implementations exist

- `IBlogRepository`
- `BaseRepository`
- `RepositoryFactory`
- `AbstractRepository`

A `BlogDatasource` **type** for two concrete datasources is allowed — typing, not a premature hierarchy.

## Consequences

- Repositories are trivial to unit test with an in-memory datasource.
- Mock → API swap changes composition root and `ApiDatasource` only.
- No `if (isMock)` inside repository methods.
