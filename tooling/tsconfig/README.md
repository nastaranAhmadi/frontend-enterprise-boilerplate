# @enterprise/tsconfig

Shared TypeScript presets for the monorepo. All compiler options live here — projects only extend and add local `include` / `references`.

## Config hierarchy

```
base.json                 # Strict, environment-agnostic (no DOM, no Node types)
├── browser.json          # Frontend apps — DOM libs
├── node.json             # Backend services — NodeNext resolution
├── react.json            # React apps (extends browser)
│   ├── nextjs.json       # Next.js App Router (jsx: preserve + next plugin)
│   └── vite-app.json     # Vite CSR apps (vite/client types)
├── library.json          # Buildable packages — composite + declarations
│   ├── library-browser.json
│   ├── library-node.json
│   └── library-react.json
└── vitest.json           # Unit/integration test tsconfig
```

## Usage

### Isomorphic library (types, utils, validation)

```json
{
  "extends": "@enterprise/tsconfig/library",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "references": []
}
```

### Browser-only library (ui)

```json
{
  "extends": "@enterprise/tsconfig/library-react"
}
```

### Future Node.js backend service

```json
{
  "extends": "@enterprise/tsconfig/node"
}
```

### Next.js application

```json
{
  "extends": "@enterprise/tsconfig/nextjs"
}
```

### Vite application

```json
{
  "extends": "@enterprise/tsconfig/vite-app"
}
```

## Project references

Libraries set `"composite": true` via `library.json`. Applications reference upstream packages:

```json
{
  "references": [{ "path": "../../packages/types" }]
}
```

Nx `dependsOn: ["^build"]` ensures upstream `.d.ts` and outputs exist before dependents typecheck/build.

## Design decisions

| Decision                            | Rationale                                                        |
| ----------------------------------- | ---------------------------------------------------------------- |
| `base.json` has no `lib: DOM`       | Prevents accidental DOM usage in isomorphic/backend code         |
| `moduleResolution: bundler` in base | Optimal for Vite/Next; Node configs override to `NodeNext`       |
| `verbatimModuleSyntax: true`        | Enforces explicit type-only imports — better tree-shaking        |
| `noUncheckedIndexedAccess: true`    | Safer array/record access at scale                               |
| `exactOptionalPropertyTypes: false` | Avoids friction with React ecosystem types                       |
| Separate `library-*` presets        | Buildable libs get composite/declaration without app assumptions |
