# UI Components Architecture Contract

`packages/ui/src/components` is organized by component taxonomy:

- `base/` -> foundational primitives
- `composite/` -> compositions of base components

## Required per-component file template

Each component folder must contain:

- `Component.tsx`
- `Component.types.ts`
- `Component.test.tsx`
- `Component.stories.tsx`
- `index.ts`

Example:

```text
base/
  Button/
    Button.tsx
    Button.types.ts
    Button.test.tsx
    Button.stories.tsx
    index.ts
```

Do not add application-specific business logic to UI components.
