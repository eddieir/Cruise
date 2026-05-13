# MSC Musica Cruise Planner 2026

An offline-first Progressive Web App (PWA) for planning an economical cruise on MSC Musica, 26 May – 2 June 2026 (Genova → Marseille → Valencia → Ibiza → At Sea → Cagliari → Civitavecchia → Genova). Built to keep two passengers on budget (target €350, ceiling €450 in extra spending) with no paid excursions, no paid onboard food, and full offline capability.

---

## Features

| Section | What it does |
|---|---|
| **Dashboard** | Trip overview, budget snapshot, 3D itinerary gallery, quick links to all sections |
| **Cabin Navigator** | GPS route to terminal, embarkation checklist, indoor guide to Cabin 12049, Deck 12 schematic map, cabin finder, key ship locations, safety rules, budget summary |
| **Budget Tracker** | Per-category spending, real-time progress bar, safe/caution/danger status, Wi-Fi option selector |
| **Food Plan** | Day-by-day meal strategy, buffet tips, zero paid onboard food goal |
| **Free Activities** | Free vs paid activity list, schedule recommendations |
| **Internet Strategy** | WINDTRE/Iliad SIM plan for ports, airplane mode at sea guide |
| **Port Plans** | What to do independently in each port with public transport tips |
| **Packing List** | Categorised checklist with persistent progress tracking |
| **Avoid List** | Common cruise upsell traps and how to avoid them |
| **Emergency Rules** | Muster point C instructions, emergency signals, onboard safety rules |
| **Clothing Guide** | Day-by-day outfit suggestions per port/weather |

### Cabin Navigator details

- **GPS route** — haversine distance detection, manual location override buttons, luggage selector (walk vs taxi), offline SVG schematic diagram, OpenStreetMap deep link
- **Embarkation checklist** — 11-step boarding flow with persistent check state
- **Indoor guide** — step-by-step route from gangway to Cabin 12049 (Deck 12)
- **Deck 12 schematic** — SVG layout of Deck 12 with cabin location marked
- **Cabin Finder** — look up any cabin number on the ship
- **Ship Locations** — distances and directions to 11 key places from Cabin 12049
- **Safety Rules** — muster point, emergency signals, lifeboat drill instructions

---

## Tech Stack

- **React 19** + **TypeScript 6** (Vite 8)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Framer Motion** — page and section animations
- **Zustand 5** with `persist` middleware — global state, persisted to `localStorage`
- **React Three Fiber** + **Three.js** — 3D itinerary gallery on the dashboard
- **Recharts** — budget charts
- **Radix UI** — accessible component primitives
- **Lucide React** — icons
- **React Router DOM 7** — client-side routing
- **vite-plugin-pwa** + **Workbox** — service worker, offline caching, installable PWA

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/           # AppLayout, DesktopSidebar, MobileBottomNav, MobileHeader
│   ├── navigation/       # CabinNavigator sub-components (GPS badge, maps, checklists, guides)
│   ├── three/            # ThreeDItineraryGallery
│   └── ui/               # Badge, Card, ProgressBar, DarkModeToggle, InstallPWAButton, OfflineStatusBadge
├── data/
│   ├── budget.ts         # BUDGET_TARGET (€350), BUDGET_CEILING (€450), 7 categories
│   ├── itinerary.ts      # 8-day port itinerary
│   ├── navigation.ts     # Cabin info, GPS coords, embarkation steps, route modes
│   ├── shipLocations.ts  # 11 key ship locations with distances from Cabin 12049
│   ├── packingList.ts    # Packing categories and items
│   ├── activities.ts     # Free vs paid activity data
│   ├── foodPlan.ts       # Day-by-day meal plan
│   ├── avoidList.ts      # Upsell traps to avoid
│   ├── emergencyRules.ts # Safety and emergency procedures
│   └── clothing.ts       # Day-by-day outfit suggestions
├── pages/                # One file per route (Dashboard, CabinNavigatorPage, BudgetTracker, …)
├── store/
│   └── useStore.ts       # Zustand store — theme, spending, packing, checklists, PWA state
└── lib/
    └── utils.ts          # cn(), formatEuro()
```

---

## Deployment

Deployed on **Netlify** with automatic builds from `main`.

```toml
# netlify.toml
[build]
  command = "npm ci && npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200   # SPA fallback for React Router
```

Node 22 is pinned via `NODE_VERSION = "22"` in the build environment.

---

## PWA — Install & Offline

- Installable on iOS (Add to Home Screen) and Android/desktop (browser install prompt)
- Service worker pre-caches all JS, CSS, HTML, images, and fonts via Workbox
- All features work offline except the OpenStreetMap external link and online map tile loading
- GPS geolocation works fully offline (no network required)
- App state (spending, checklists, theme) is persisted in `localStorage` and survives restarts

---

## Key Trip Facts

| | |
|---|---|
| Ship | MSC Musica |
| Cabin | 12049 — Deck 12 |
| Muster Point | C |
| Booking | 66399145 |
| Check-in | 14:00, 26 May 2026 |
| Departure | 18:00, 26 May 2026 |
| Dining | Primo Turno (first sitting) |
| Cruise cost | €1,608 (fully paid) |
| Extra budget target | €350 for 2 people |
| Extra budget ceiling | €450 for 2 people |
