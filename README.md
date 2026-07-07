# frontend-enterprise-boilerplate

Production-grade Frontend Monorepo built with Nx, React, Next.js, TypeScript and modern engineering practices. Designed as a scalable foundation for large-scale enterprise and e-commerce applications.

## Git hooks

Local quality gates via Husky — see [docs/git-hooks.md](./docs/git-hooks.md).

| Hook         | Purpose                           |
| ------------ | --------------------------------- |
| `pre-commit` | Format + lint staged files        |
| `commit-msg` | Conventional Commits              |
| `pre-push`   | Nx affected `typecheck` + `build` |
