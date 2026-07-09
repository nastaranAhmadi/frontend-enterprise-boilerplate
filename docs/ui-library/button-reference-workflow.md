# Button Reference Workflow

This is the gold-standard workflow for implementing the first base component (`Button`) in `@enterprise/ui`.

## Step 1: Understand the problem

Goal:

- Define what `Button` must solve as a reusable primitive.

Questions to answer before coding:

- Which semantic actions must it support (`button`, `submit`, `reset`)?
- Which states are required (`default`, `hover`, `focus-visible`, `disabled`, `loading`)?
- Which accessibility behaviors are mandatory (keyboard, `aria-busy` when loading, focus ring)?

Output:

- Short problem statement and non-goals.

## Step 2: Design public API

Define API before implementation.

Minimum API draft:

- `variant`
- `size`
- `color`
- `disabled`
- `loading`
- `startIcon`
- `endIcon`
- `children`
- native button props passthrough

Output:

- `Button.types.ts` API contract draft approved.

## Step 3: Architecture placement

Placement:

- `packages/ui/src/components/base/Button/`

Files to create:

- `Button.tsx`
- `Button.types.ts`
- `Button.test.tsx`
- `Button.stories.tsx`
- `index.ts`

Output:

- Folder exists and aligns with UI foundation contract.

## Step 4: Implement

Implementation constraints:

- No business/domain behavior.
- Token-first Tailwind classes only.
- Semantic HTML button element by default.
- MUI-like prop conventions.

Output:

- Compile-safe component implementation.

## Step 5: Test

Required tests:

- renders children
- respects `disabled`
- handles `loading` behavior
- fires `onClick` when enabled
- keyboard accessibility behavior

Output:

- `Button.test.tsx` passes.

## Step 6: Storybook docs + a11y

Required stories:

- basic variants
- sizes
- disabled
- loading
- icon usage

Docs:

- usage guidance
- do/don't examples

Accessibility:

- Storybook a11y checks enabled and passing.

Output:

- `Button.stories.tsx` and docs complete.

## Step 7: Review and refactor

Senior review checklist:

- API ergonomics and consistency
- a11y completeness
- visual/token compliance
- no leakage of app-specific logic
- test quality and coverage

Output:

- Refined version merged as base reference for future components.

## Definition of done (Button)

All must pass:

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run build`
- tests pass
- Storybook renders with docs and a11y checks
