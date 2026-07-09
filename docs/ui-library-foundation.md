# UI Library Foundation

This document defines the architectural standards for the `@enterprise/ui` design system package.

## 1) Component taxonomy

### Base components

Low-level building blocks with minimal composition assumptions.

Examples:

- `Button`
- `Input`
- `Text`
- `Heading`
- `IconButton`

Rules:

- No business/domain behavior.
- Must be reusable across applications.
- Must expose stable, typed public API.

### Composite components

Composed from base components and shared contracts.

Examples:

- `Modal`
- `Card`
- `Dropdown`
- `Table`

Rules:

- May orchestrate multiple base components.
- Must not embed application-specific business logic.
- Should remain generic and reusable.

## 2) Folder and ownership rules (`packages/ui`)

```text
packages/ui/
  src/
    components/
      base/
        Button/
          Button.tsx
          Button.types.ts
          Button.test.tsx
          Button.stories.tsx
          index.ts
      composite/
        Modal/
          Modal.tsx
          Modal.types.ts
          Modal.test.tsx
          Modal.stories.tsx
          index.ts
    index.ts
```

Conventions:

- Each component lives in a dedicated folder.
- Tests and stories are co-located with component source.
- `index.ts` at component level exports only public API.
- Root `src/index.ts` exports package public API only.

## 3) API design standards (MUI-like React model)

### Naming conventions

- Visual variants: `variant`
- Size variants: `size`
- Semantic styling: `color`
- State flags: `disabled`, `loading`, `required`, `invalid`
- Composition slots: `startIcon`, `endIcon`, `children`

### Behavioral conventions

- Controlled pattern: `value` + `onChange`
- Uncontrolled pattern (when needed): `defaultValue`
- Event handlers should follow React naming (`onClick`, `onBlur`, `onFocus`)
- Prefer explicit discriminated unions over loose string configs.

### Polymorphism

- Use optional polymorphic `as` only when component semantics justify it.
- Keep base API stable first; avoid over-generalizing early.

### Accessibility baseline

- Semantic HTML first.
- Keyboard accessibility required.
- ARIA attributes added only when native semantics are insufficient.
- Every interactive component must define focus-visible behavior.

## 4) Styling contract (token-first Tailwind)

Architecture flow:

`design-tokens -> theme -> tailwind-config -> ui-components -> applications`

Rules:

- `packages/design-tokens` remains source of truth.
- UI components must use token-mapped utilities (e.g. `bg-background`, `text-foreground`).
- Do not use raw palette utilities (e.g. `bg-blue-500`) inside the library.
- Avoid hardcoded visual values; if needed, add token first.
- Tailwind is rendering layer only, not token source.

## 5) Definition of done (for every component)

A component is considered complete only when all conditions pass:

1. Implementation

- Component and types are in the correct folder.
- Public API exported from component `index.ts`.

2. Testing

- Unit/integration test exists.
- Core interactions and state variants covered.

3. Storybook

- Story file exists (`*.stories.tsx`).
- Docs entry included (Autodocs or explicit docs story).
- Accessibility checks enabled in Storybook.

4. Accessibility

- Keyboard navigation works.
- Labels/roles/ARIA behavior validated.

5. Workspace quality gates

- `pnpm run lint` passes.
- `pnpm run typecheck` passes.
- `pnpm run build` passes.

## 6) Component workflow (mandatory)

For each component, execute in order:

1. Understand the problem.
2. Design the public API.
3. Decide architectural location.
4. Implement component.
5. Add tests.
6. Add Storybook story + docs + a11y checks.
7. Review and refactor.

No step may be skipped.
