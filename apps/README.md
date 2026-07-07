# Applications

Deployable applications are grouped by runtime domain.

```
apps/
├── frontend/   # Browser-facing applications (Next.js, Vite)
└── backend/    # Future Node.js services (not yet implemented)
```

## Rules

- Applications may depend on `packages/*` and `tooling/*`.
- Applications must **never** be imported by packages.
- `frontend` apps must **not** import from `backend` apps.
- `backend` apps must **not** import from `frontend` apps or browser-specific packages (e.g. `ui`).
