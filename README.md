# Helvorxy — universal app gallery

Astro / Cloudflare Pages-ready site for the Helvorxy App Store products.

## Routes

- `/`
- `/apps/gamepad-tester`
- `/apps/party-hype`
- `/apps/pickify`
- `/apps/cv-maker-professional`
- `/about`, `/privacy`, `/terms`, `/contact`

## Universal architecture

All landing pages are generated from `src/data/products.ts` by a single renderer,
`src/pages/apps/[slug].astro`. Studio-level branding (name, wordmark, support
address) lives in `src/data/site.ts`.

Product-specific differences live in product data only:

- product hue (`theme.primary` / `theme.accent`)
- feature copy, facts and FAQ
- App Store URL and store metadata
- icon and screenshots

## Day / night theme

`src/styles/global.css` defines two token sets: the `:root` day palette and the
`:root[data-theme="dark"]` night palette. Products contribute a hue only — never
a page or surface color — so every page renders correctly in both themes.

The initial theme is stamped onto `<html>` by a blocking inline script in
`BaseLayout.astro` (system preference first, then a stored choice), which avoids
a flash of the wrong theme. The header toggle flips it and persists the choice in
`localStorage` under `helvorxy-theme`.

The Apple App Store badge is inlined as SVG in `src/components/AppStoreBadge.astro`
so it can swap between Apple's black-on-light and white-on-dark variants.

## App Store media

Icons and screenshots are downloaded from Apple's artwork CDN into
`public/assets/` and served locally:

```bash
npm run sync:appstore
```

The script re-fetches all four apps' artwork (512px webp icons, 600px-wide webp
screenshots) and prints the store metadata mirrored in `src/data/products.ts`.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output is suitable for Cloudflare Pages.
