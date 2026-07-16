# Divesport — React + TypeScript

A rewrite of the Divesport site as a component-based React + TypeScript app (Vite), replacing
the previous 28 static HTML files (14 pages × LV/RU) with **14 page components** and two
typed content files.

## Why this is more maintainable

The old site duplicated every page's HTML twice — once per language — so a copy fix or a
layout tweak had to be made in up to 28 places by hand. This rewrite separates **content**
from **structure**:

- `src/types/content.ts` — one TypeScript interface (`SiteContent`) that both languages must satisfy.
  If you forget a field in the Russian file, or a subpage, **the build fails** — not something you
  find out later by clicking around the live site.
- `src/content/lv.ts` / `src/content/ru.ts` — all copy, prices, course descriptions, team bios,
  and destination photos, as plain typed data. Editing a price or fixing a typo means editing
  one field in one file — never touching JSX or duplicating a page.
- `src/components/` — every visual piece (nav, course cards, gallery, contact form, etc.) is a
  standalone component used by every page that needs it, instead of copy-pasted HTML blocks.
- `src/pages/` — 14 page components, each just assembling shared components + content. Adding
  the Russian version of a page is automatic (see `App.tsx`) — you never write a second component.
- `src/hooks/` — the interactive behaviors (mobile nav, scroll-tracking depth rail, the hero's
  ambient gauge readout, Web3Forms submission) are isolated from markup, so they're testable and
  reusable on their own.

## Project structure

```
src/
  types/content.ts        Shared content schema (the "contract" both languages implement)
  content/
    lv.ts, ru.ts           All copy for each language, typed against SiteContent
    index.ts               getContent(lang) lookup
  context/
    LangContext.tsx        Current language + content + localized path-building, via React Context
    LightboxContext.tsx    One shared lightbox overlay, openable from any gallery
  hooks/
    useMobileNav.ts         Mobile menu open/close + body scroll lock
    useDepthRail.ts         Scroll-position tracking for the homepage depth gauge
    useHeroGauge.ts         Decorative ambient tick for the hero's depth readout
    useWeb3FormsSubmit.ts   Web3Forms POST + loading/success/error state
  components/
    layout/                 Topbar, Nav (with dropdowns), Footer, LangSwitcher, Layout wrapper
    home/                   Hero, QuickPaths, DepthRail — homepage-only pieces
    shared/                 PageHero, Breadcrumb, SubNav, TeamCard, BadgeCards, Gallery,
                             DestinationGrid, PriceList, CourseCatalog, ContactForm
  pages/                    14 page components (one per page "kind", not per language)
  App.tsx                   Route table: 14 paths, each auto-registered in both languages
```

## Styling

The whole site runs on **Tailwind CSS** — every class is built from Tailwind utilities via
`@apply`, using design tokens (colors, fonts, custom breakpoints) defined once in
`tailwind.config.js`, instead of hand-written hex values and `:root` CSS variables.

Component class names in the JSX (`.hero`, `.trip-card`, `.btn--solid`, etc.) **didn't change** —
what changed is what backs them. This keeps every component file untouched while the actual
styling underneath is now fully Tailwind-driven.

The stylesheet is split by feature instead of one large file:

```
src/styles/
  main.css       Entry point — imports Tailwind's base/components/utilities + every file below
  base.css       Global resets, grain texture, focus states, reduced-motion (@layer base)
  buttons.css    .btn and its variants
  layout.css     .section, the card grid system, .team
  nav.css        Topbar, language switcher, main nav, dropdowns, mobile flyout menu
  hero.css       Homepage hero, depth rail, quick-paths, inner-page hero banner
  media.css      Gallery, lightbox, destination grid, travel image strip
  forms.css      Contact info, map embed, the shared contact form, price list
  trips.css      Trip tabs, empty state, collapsible year groups, trip cards
  courses.css    Course catalog cards, badge cards, subnav
  footer.css     Site footer
```

**Custom breakpoints**, since this design is desktop-first (base styles are the desktop layout,
smaller screens get override variants) rather than Tailwind's default mobile-first convention:

```
max-sm   ≤400px   max-md   ≤560px   max-lg  ≤700px
max-xl   ≤900px   max-2xl  ≤1100px
```

A handful of things stay as plain CSS inside `@layer components` blocks because they're not
expressible as Tailwind utilities: the SVG noise texture (`.grain`), the nav dropdown's invisible
hover-bridge pseudo-element, gradient overlays, and `<details>`'s `::-webkit-details-marker`
(no Tailwind variant covers that specific pseudo-element).

## Course booking flow

Clicking "Pieteikties"/"Записаться" on a course card doesn't navigate anywhere — it lifts state
in `ApmacibaKursiPage` (`bookingRequest`), which flows down as a prop to the shared `ContactForm`.
The form's `useEffect` on that prop pre-selects the course, sets the request-type dropdown, writes
a short message template, then scrolls to itself and focuses the Name field. No URL params, no
page reload — just React state passed where it's needed.

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build     # type-checks with tsc, then builds to dist/
npm run preview   # preview the production build locally
```

> **Note:** this environment has no network access, so the code here has been written and
> reviewed carefully but not run through an actual `npm install` / `tsc` / `vite build` cycle.
> Run `npm install && npm run build` yourself first thing to catch anything that slipped through.

## Deploying to GitHub Pages

This project uses **`HashRouter`** (URLs look like `/#/apmaciba-kursi`), specifically so it works
on GitHub Pages with **zero server configuration** — no 404.html redirect trick needed, refreshing
any page just works.

1. Set `base` in `vite.config.ts` to match your repo name (already set to `/divesport-vibe/`).
2. Push this project to your repo (in a subfolder, or as the repo root — either works).
3. Deploy:
   ```bash
   npm run deploy
   ```
   This runs `gh-pages -d dist` (already wired into `package.json`), which builds and pushes the
   `dist/` folder to a `gh-pages` branch.
4. In the repo's **Settings → Pages**, set the source to the `gh-pages` branch, root folder.

If you'd rather have clean URLs without the `#` (e.g. `/apmaciba-kursi` instead of
`/#/apmaciba-kursi`), swap `HashRouter` for `BrowserRouter` in `App.tsx` and add a `404.html` that
redirects back to `index.html` (the standard SPA-on-GitHub-Pages trick) — happy to set that up if
you'd prefer it.

## Web3Forms key

The access key lives in `src/components/shared/ContactForm.tsx` as `WEB3FORMS_ACCESS_KEY`. It's
safe to commit — Web3Forms keys are designed to sit in public client-side code.

## Adding a new page

1. Add the slug to the `Slug` union in `src/types/content.ts`, plus its `meta` entry and any
   page-specific content fields on `SiteContent`.
2. Fill in that content in **both** `src/content/lv.ts` and `src/content/ru.ts` — TypeScript will
   error at every spot you forget.
3. Add the LV path segment to `SLUG_PATHS` in `src/context/LangContext.tsx`.
4. Write one page component in `src/pages/`, export it from `src/pages/index.ts`.
5. Add one line to the `PAGES` array in `src/App.tsx` — both language routes register automatically.
