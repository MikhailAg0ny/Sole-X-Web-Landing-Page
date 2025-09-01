# Sole‑X Web Frontend 🚀

A modern, high‑performance landing page for Sole‑X — a sneaker care and restoration brand. Built with React + Vite, animated UI, and interactive 3D sneakers using Three.js/R3F. Fast by default, mobile‑first, and theme‑aware. ✨

- Tech: React 19, Vite 7, Three.js + @react-three/fiber, @react-three/drei, Tailwind CSS 4, Chakra UI/MUI (select components), Framer Motion
- Structure: `web_frontend/` with modular components, pages, and CSS modules
- 3D: Optimized GLB models with `@gltf-transform/cli`

---

## Features 🌟

- Strong brand identity with custom logo (`src/components/SoleXLogo.jsx` + `.module.css`)
- Interactive 3D product canvas (`src/components/Three/ModelCanvas.*`) with safe performance defaults
- Landing sections:
  - Hero with responsive typography and height management (`src/components/Hero/Hero.*`)
  - Services with before/after media and mobile‑first cards (`src/pages/Services.module.css`)
  - Contact and Footer sections
- Theming via CSS variables in `src/styles/globals.css`
- Mobile polish:
  - No horizontal overflow on narrow devices
  - Tuned paddings, radii, shadows, and touch targets
- Build‑time model optimization scripts for lightweight 3D assets

---

## Tech Stack 🛠️

- React 19 (`react`, `react-dom`)
- Vite 7 for dev/build (`vite`, `@vitejs/plugin-react`)
- Three.js and React Three Fiber (`three`, `@react-three/fiber`, `@react-three/drei`)
- Tailwind CSS 4 + PostCSS (`tailwindcss`, `@tailwindcss/*`, `postcss`, `autoprefixer`)
- UI libs: Chakra UI, MUI, Mantine (selected hooks/components)
- Animations: `framer-motion`
- Routing: `react-router-dom`
- Linting: ESLint 9

See `web_frontend/package.json` for versions and scripts.

---

## Getting Started 🧑‍💻

1) Prereqs
- Node 18+ recommended
- PNPM/NPM/Yarn (examples below use NPM)

2) Install
```bash
cd Sole-X-Web-Landing-Page/web_frontend
npm install
```

3) Dev server
```bash
npm run dev
# Vite serves on http://localhost:5173 by default
```

4) Production build + preview
```bash
npm run build
npm run preview
```

---

## NPM Scripts 📜

From `web_frontend/package.json`:

- dev: start Vite dev server
- build: production build
- preview: preview built site
- lint: run ESLint
- optimize:model*: optimize GLB models with `@gltf-transform/cli`
  - Examples:
    - `optimize:model` (Pegasus)
    - `optimize:model:jordan` (Air Jordan 1 1985)
    - `optimize:model:jordan2015:512` and `:nomesh` variant
    - `optimize:model:shoe`

Usage:
```bash
npm run optimize:model
npm run optimize:model:jordan2015:512
```

Models live in `web_frontend/public/models/*.glb`.

---

## Project Structure 🧭

- `web_frontend/`
  - `index.html` — Vite entry
  - `src/`
    - `components/`
      - `Hero/` — hero CTA section (`Hero.jsx`, `Hero.module.css`)
      - `Footer/` — site footer
      - `Three/` — 3D canvas and styles (`ModelCanvas.jsx`, `ModelCanvas.module.css`)
      - `SoleXLogo.jsx`, `SoleXLogo.module.css` — brand mark
    - `pages/`
      - `Services.module.css` — service cards, media toggle, responsive rules
      - `Contact.module.css` — contact section styles
    - `styles/`
      - `globals.css` — global variables, theme surfaces
  - `public/`
    - `models/` — GLB assets and optimized variants
    - static images/icons
  - `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
  - `eslint.config.js`
  - `README.md` — project guide (this file)

Tip: When referencing source files in discussions/PRs, use backticks like `src/components/Three/ModelCanvas.module.css`.

---

## Styling & Theming 🎨

- CSS Modules for component‑scoped styles (e.g., `Hero.module.css`)
- Tailwind 4 utility classes where helpful
- CSS variables in `src/styles/globals.css`:
  - `--color-fg`, `--color-bg`, `--accent`, `--border`, shadows, elevations
- Mobile‑first adjustments:
  - Container paddings, `overflow-x` guards, controlled radii
  - Touch‑friendly `priceBadge` pills and toggle buttons

---

## 3D Model Pipeline 🧩

- Keep raw GLBs under `public/models/`
- Run provided optimize scripts to create `*.optim.glb`
- Tweak texture size flags (`--texture-size 512/1024`) to balance quality vs. size
- In code, reference optimized GLBs for faster page loads

Example (CLI):
```bash
npm run optimize:model:jordan2015:512
```

---

## Accessibility ♿

- `role="img"` and `aria-label` on `SoleXLogo`
- Descriptive headings and consistent hierarchy
- Large, high‑contrast CTAs
- Focus styles preserved (`:focus-visible`)
- Toggle controls maintain touch sizes on mobile

---

## Performance ⚡

- Vite + React fast refresh for dev
- Production builds are tree‑shaken and code‑split
- 3D canvas uses safe defaults (capped size, aspect ratio) to avoid layout jank
- Optimized GLBs reduce texture weight (WebP compression)
- Avoids horizontal overflow on small screens

If you ship to static hosting (Netlify, Vercel, GitHub Pages), deploy `web_frontend/dist/`.

---

## Troubleshooting 🔧

- 3D canvas too tall on small laptops
  - Adjust `max-height`/`min-height` in `src/components/Three/ModelCanvas.module.css`
- Mobile horizontal scroll
  - Confirm `.services { overflow-x: hidden }` and `.media { max-width: 100% }` in `src/pages/Services.module.css`
- Models look blurry
  - Re‑export at higher texture size: `--texture-size 1024`, or ensure devicePixelRatio handling in R3F canvas

---

## Roadmap 🗺️

- Dark/light theme toggle persisted per user
- Content CMS integration for services and pricing
- Asset lazy loading and LOD for 3D
- Lighthouse pass for PWA (installable app)

---

## License 📄

This project is part of a personal portfolio. If you want to reuse code or assets, please reach out for permission.

---

## Quick Start (Copy‑Paste) ✅

```bash
# 1) Install
cd Sole-X-Web-Landing-Page/web_frontend
npm i

# 2) Dev
npm run dev
# http://localhost:5173

# 3) Optimize a 3D model (optional)
npm run optimize:model

# 4) Build and preview
npm run build
npm run preview
```
