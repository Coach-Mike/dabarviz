# DabarViz — Tech Stack

## Frontend
- **Next.js 15** (App Router) + TypeScript
- **React Three Fiber + Drei** for the 3D Globe and spherical elements
- **Custom WebGL / Three.js** for the Rainbow Arc visualization
- **Force-directed graph** (Sigma.js or custom Canvas/WebGL)
- **Framer Motion** for panel transitions and micro-interactions
- **Tailwind CSS** + custom design system (dark cosmic theme, emerald → gold → rose → violet palette)

## Data Layer
- Prototype: static JSON + SQLite (or Turso) for fast queries
- Production path: Postgres + vector search (optional semantic layer)
- Sources:
  - OpenBible.info cross-references
  - STEP Bible morphology
  - Theographic knowledge graph
  - Public Strong’s / lemma datasets
  - Manuscript and evidence notes (curated)

## Backend / API
- Next.js Route Handlers / Server Actions
- Edge functions for search and graph traversal
- Later: dedicated graph query endpoint if needed

## Hosting
- **Vercel** (prototype + production)
  - Perfect for Next.js App Router, edge, and preview deployments
  - Link the GitHub repo once permissions allow

## Tooling
- pnpm
- Biome (or ESLint + Prettier)
- Storybook for study panels
- Playwright for critical flows

## Design Principles
- Maximum UI/UX — cinematic, premium, zero clutter
- All three visual layers + both side panels stay synchronized
- Original language is a first-class drill-down, not a side feature
- Every connection carries *why* and *evidence*
