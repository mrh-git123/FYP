# Design & Experience Roadmap

## Shopper experience
- Establish a shared visual system (typography scale, spacing, color tokens, glass panels) to replace ad-hoc App.css rules.
- Elevate the landing flow with an immersive hero, marquee trust signals, stat cards, and editorial product spotlights.
- Improve catalog usability: contextual filters, sticky controls, better card actions, skeleton loaders, and clear empty states.
- Refresh transactional views (product detail, cart, checkout, orders, profile) with structured layouts, inline validation, and consistent actions.
- Tighten navigation/footer with announcement strip, compact top bar, and responsive behaviors for handheld screens.

## Admin experience
- Build a dedicated Vite + React admin client wired to existing Express admin routes.
- Provide secure auth guard (admin-only) that reuses JWT flow and surfaces fast session recovery.
- Ship a modular dashboard shell: sidebar, top bar, command palette entry, and content area with adaptive grid.
- Dashboard home should highlight KPI cards, revenue trend, fulfillment funnel, and recent orders list from `/api/admin/overview`.
- Orders workspace: searchable table, status badges, inline status/payment updates that hit `PUT /api/orders/:id/status`.
- Product workspace: list, create/edit drawer powered by `POST/PUT /api/products`, quick delete controls, image gallery preview support.
- User administration: role toggles, delete safeguards referencing `/api/admin/users` routes.
- Provide loading placeholders, optimistic feedback, and toast system for consistent interaction cues.

## Documentation & tooling
- Update each package README with tailored install/run instructions plus screenshots callouts (textual) for the new UIs.
- Document environment expectations (API URL vars for both clients, JWT + Mongo requirements) to reduce onboarding friction.
- Run lint/build before handoff and capture verification commands for the user.
