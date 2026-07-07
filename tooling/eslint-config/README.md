# @enterprise/eslint-config

Shared ESLint 9 flat configurations for the monorepo.

## Config layers

| Export       | Purpose                                             |
| ------------ | --------------------------------------------------- |
| `base`       | Environment-agnostic core rules                     |
| `typescript` | Strict TypeScript + import sorting + unused imports |
| `react`      | React Hooks + jsx-a11y accessibility rules          |
| `node`       | Node.js globals for future backend services         |
| `boundaries` | `@nx/enforce-module-boundaries` dep constraints     |

## Usage

Root `eslint.config.mjs` imports the default export:

```js
import eslintConfig from '@enterprise/eslint-config';
export default eslintConfig;
```

## Backend readiness

The `node` preset applies to `apps/backend/**` without installing Express, Fastify, or NestJS. Backend services added later inherit the same lint pipeline.

## Module boundaries

Boundary rules use Nx project tags (`domain:frontend`, `domain:backend`, `platform:neutral`, `type:ui`, etc.). See `docs/module-boundaries.md`.
