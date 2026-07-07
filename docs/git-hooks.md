# Git Hooks

Quality gates enforced locally via [Husky](https://typicode.github.io/husky/).

## Hook summary

| Hook         | Trigger      | Actions                                           |
| ------------ | ------------ | ------------------------------------------------- |
| `pre-commit` | `git commit` | `lint-staged` — Prettier + ESLint on staged files |
| `commit-msg` | `git commit` | `commitlint` — Conventional Commits format        |
| `pre-push`   | `git push`   | Nx affected `typecheck` + `build`                 |

Hooks are installed automatically when you run `pnpm install` (`prepare` script runs `husky`).

## Pre-commit

Runs on staged files only:

- `prettier --write` for supported file types
- `eslint --fix` for JavaScript/TypeScript files

Fast feedback before code enters the repository.

## Commit message

Enforces [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## Pre-push

Before a push is allowed, the hook validates **only affected projects** relative to `main` (configured as `defaultBase` in `nx.json`):

```sh
pnpm affected:typecheck   # nx affected -t typecheck
pnpm affected:build       # nx affected -t build
```

Both commands must succeed. If either fails, the push is blocked.

### Why affected only?

- Validates your changes and their dependency graph — not the entire workspace
- Keeps pre-push fast as the monorepo grows
- Mirrors CI strategy: run expensive checks only where needed

### Run manually

```sh
# Combined validation (same as pre-push hook)
pnpm affected:validate

# Individual steps
pnpm affected:typecheck
pnpm affected:build
```

### Bypass (emergency only)

```sh
git push --no-verify
```

Use sparingly — CI will still run the full pipeline.

## Backend readiness

When backend services are added under `apps/backend/`, they are included automatically in affected `typecheck` and `build` targets when changed. No hook changes required.
