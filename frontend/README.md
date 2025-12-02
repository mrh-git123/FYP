# Shopper Web App

Polished D2C storefront built with React 19, Vite, TypeScript, React Router, React Query, and React Hook Form. The UI follows the shared design system used across the monorepo (glass cards, gradients, stat blocks, and editorial typography).

## Quick Start

```bash
cd frontend
npm install
VITE_API_URL="http://localhost:5000" npm run dev
```

Open the shopper client on http://localhost:5173 (or the port Vite prints). Configure `VITE_API_URL` to point at the Express backend before running any local or hosted build.

## Available Scripts

- `npm run dev` – Start Vite with hot reloading.
- `npm run build` – Type-check with `tsc -b` then emit an optimized production bundle.
- `npm run preview` – Serve the build folder locally for smoke tests.
- `npm run lint` – Run the flat ESLint config over the entire project.

## Environment Variables

| Name | Description |
| --- | --- |
| `VITE_API_URL` | Base URL for Axios requests (defaults to `/api` when unset). Point it at the backend server or hosted API. |

Create a `.env` file beside `package.json` for local runs:

```
VITE_API_URL=http://localhost:5000/api
```

## Feature Highlights

- Responsive hero, navigation, and brand marquee with persistent auth-aware actions.
- Catalog grid with filter chips, dynamic product detail view, and cart/checkout orchestration.
- Auth pages wired to the Express JWT endpoints, including contextual forms and validation copy.
- Profile, orders, and static pages reuse SectionHeading, stat cards, and testimonial blocks for consistent polish.

## Backend Expectations

- The Express API must expose `/api/products`, `/api/orders`, `/api/auth/*`, and `/api/profile` routes as defined in `frontend/src/api/client.ts`.
- JWT tokens are stored in HTTP-only cookies by the backend. The client simply sends `withCredentials` requests via Axios.

## Deployment Notes

- Run `npm run build` and deploy the contents of `frontend/dist` behind any static host.
- Ensure the host injects `VITE_API_URL` at build time for each environment.
- Pair with the backend and admin dashboard for a fully managed commerce stack.
