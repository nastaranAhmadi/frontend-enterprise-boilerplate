# Shared Packages

Reusable libraries consumed by frontend applications and future backend services.

## Package map

| Package         | Runtime | Purpose                                           |
| --------------- | ------- | ------------------------------------------------- |
| `types`         | Neutral | Shared TypeScript types                           |
| `errors`        | Neutral | `ApiError`, `ValidationError`, `normalizeError()` |
| `validation`    | Neutral | Zod schemas and validation helpers                |
| `utils`         | Neutral | Pure utility functions                            |
| `config`        | Neutral | Configuration helpers                             |
| `env`           | Neutral | Client/server env with Zod fail-fast              |
| `logger`        | Neutral | Provider-based logging (Sentry-ready)             |
| `permissions`   | Neutral | Role-based permission checks                      |
| `design-tokens` | Neutral | CSS variable design tokens                        |
| `api-client`    | Neutral | Native Fetch client + middleware                  |
| `auth`          | Neutral | Auth boundary infrastructure                      |
| `feature-flags` | Neutral | Feature flag provider contract                    |
| `shared`        | Neutral | Cross-cutting shared modules                      |
| `theme`         | Web     | Light/Dark/System `ThemeProvider`                 |
| `i18n`          | Web     | Locale provider + translation hooks               |
| `hooks`         | Web     | Shared React hooks                                |
| `ui`            | Web     | Design system (Storybook in later section)        |

See [docs/packages.md](../docs/packages.md) for dependency flow and architectural rationale.
