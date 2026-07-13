# Frontend Applications

| App         | Stack                | Rendering | Status                         |
| ----------- | -------------------- | --------- | ------------------------------ |
| `landing`   | Next.js (App Router) | SSR / SSG | Production-ready marketing app |
| `dashboard` | React + Vite         | CSR       | Infrastructure only            |
| `admin`     | React + Vite         | CSR       | Infrastructure only            |

**Tags:** `scope:app`, `type:app`, `platform:web`, `domain:frontend`

## Landing app

```bash
pnpm nx dev landing          # http://localhost:4200
pnpm nx build landing
pnpm nx test landing
pnpm nx typecheck landing
```

If styles look broken after a production build while dev is running, stop dev and run `pnpm nx dev:reset landing`.

### Live demos

| Surface   | URL                                                                     |
| --------- | ----------------------------------------------------------------------- |
| Landing   | _Deploy target TBD — run locally on port 4200_                          |
| Storybook | `pnpm nx storybook ui` → [http://localhost:3000](http://localhost:3000) |
