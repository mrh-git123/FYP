# Admin Dashboard

Standalone React 19 + Vite experience for operators. Provides secure authentication, overview stats, and CRUD tooling for orders, products, and users backed by the Express/Mongo API.

## Quick Start

```bash
cd admin
npm install
VITE_API_URL="http://localhost:5000" npm run dev
```

Open http://localhost:5174 (or the port Vite assigns). The admin client shares the same backend as the shopper site, so `VITE_API_URL` must match that server.

## Scripts

- `npm run dev` – Launch Vite dev server with React Fast Refresh.
- `npm run build` – Type-check and build production assets.
- `npm run preview` – Serve the compiled bundle locally.
- `npm run lint` – Lint with the shared flat config.

## Environment

| Name | Description |
| --- | --- |
| `VITE_API_URL` | Absolute URL to the Express API root (e.g. `http://localhost:5000/api`). |

JWTs are issued by `/api/auth/login`. Successful responses must include an `isAdmin` flag and set an HTTP-only cookie; the dashboard reads the role claim from the `/api/auth/me` endpoint.

## Feature Overview

- **Authentication:** Login page with hero art, react-hook-form validation, success state, and redirect for already-authenticated admins.
- **Protected navigation:** `ProtectedRoute` guards all dashboard pages, while the global `AuthContext` stores admin metadata and exposes logout.
- **Dashboard:** Stat cards, revenue chart placeholder, recent activity table, and quick actions for launching workflows.
- **Orders:** React Query backed table with search, status badges, details drawer, and inline status mutations hitting `/api/orders/:id/status`.
- **Products:** Table with stock pills, drawer for create/edit, optimistic cache invalidation, and delete confirmation wired to `/api/products/*` routes.
- **Users:** Role management with patch/delete controls, plus status pill styling for customer vs admin accounts.

## Deployment Notes

- Deploy the `dist` folder to static hosting. Each environment requires a dedicated build so Vite can inline the corresponding `VITE_API_URL`.
- Serve the dashboard under an `ADMIN_URL` distinct from the shopper-facing site and configure the backend CORS whitelist for both origins.
