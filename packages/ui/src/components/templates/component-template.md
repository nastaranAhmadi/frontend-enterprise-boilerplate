# Component Template (Reference)

Use this structure for each new component:

```text
<ComponentName>/
  <ComponentName>.tsx
  <ComponentName>.types.ts
  <ComponentName>.test.tsx
  <ComponentName>.stories.tsx
  index.ts
```

## Ownership rules

- `*.types.ts` contains only public type contracts.
- `index.ts` exports public API only.
- `*.test.tsx` verifies behavior and accessibility.
- `*.stories.tsx` documents variants and usage.
