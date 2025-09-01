# Sole‑X — Sneaker Care Landing Page ✨

Sole‑X is a crisp, fast, mobile‑first site for a sneaker care and restoration brand. It’s built to feel confident and clean—the way fresh kicks feel. Subtle motion, bold type, and an optional 3D preview bring the story to life without getting in the way. 🧼👟

## Why this project
- **Show the craft**: make services and pricing easy to trust at a glance.
- **Feel premium**: tight spacing, soft shadows, and responsive polish.
- **Load fast**: ship only what’s needed; keep it smooth on phones.

## Experience goals
- Clarity first: one hero, one CTA.
- Honest visuals: before/after media and a lightweight 3D look.
- No friction: no sideways scroll, thumb‑friendly controls, quick contact.

## What’s inside
- **Hero** — bold branding, tagline, and primary call‑to‑action.
- **Services** — card list with before/after media, prices, and notes.
- **3D Sneaker (optional)** — interactive model rendered with Three.js/R3F.
- **Contact + Footer** — quick contact entry points and brand footer.

## Tech at a glance
- React + Vite ⚡
- Three.js + @react-three/fiber 🎮 (+ @react-three/drei helpers)
- CSS Modules + Tailwind utilities 🎨
- Framer Motion (micro‑animations)

## Quick start
```bash
cd web_frontend
npm i
npm run dev   # http://localhost:5173
```

Build & preview:
```bash
npm run build
npm run preview
```

## Project layout
- `web_frontend/src/components/` — `Hero/`, `Footer/`, `Three/` (3D), `SoleXLogo.*`
- `web_frontend/src/pages/` — `Services.module.css` and page‑level styles
- `web_frontend/src/styles/` — global variables and theme (`globals.css`)
- `web_frontend/public/models/` — GLB assets (see optimize scripts below)

## Useful scripts
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview built site
- `npm run optimize:model*` — optimize GLB models via `@gltf-transform/cli`

Models live in `web_frontend/public/models/`.

## Notes
- Designed mobile‑first; horizontal overflow is guarded on small screens 👍
- 3D canvas sizing is capped to avoid layout jumps; tweak in `src/components/Three/ModelCanvas.module.css`.
- Tech versions and all scripts: `web_frontend/package.json`.

— Enjoy exploring Sole‑X! 🚀
