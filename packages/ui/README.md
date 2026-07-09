# @enterprise/ui

Browser-only design system package. React + Tailwind + Storybook infrastructure.

**Extends:** `@enterprise/tsconfig/library-react`

**Consumers:** Frontend applications only. Must not be imported by backend services or isomorphic packages.

## Internal structure

- `src/components/base/` -> foundational primitives
- `src/components/composite/` -> composed UI patterns
- `src/components/templates/` -> component file templates and conventions

Detailed standards: `docs/ui-library-foundation.md`.

## Tailwind integration

- `packages/ui` components use semantic Tailwind utility classes.
- Consumers must compile Tailwind with content paths that include `packages/ui/src`.
- Use `@enterprise/tailwind-config/content` to avoid per-app content drift.
