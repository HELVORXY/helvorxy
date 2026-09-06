# AGENTS.md

## Purpose

This repository is a multilingual Astro website for Helvorxy.

The architecture MUST remain product-agnostic.

The current public site may initially contain only one application, but no shared component, layout, routing rule, localization system, SEO helper, store-button implementation, or Pinterest acquisition flow may be designed as if there will only ever be one application.

The same landing-page system must support multiple applications by changing configuration and content only.

A new application should normally require:

1. a product configuration,
2. localized copy,
3. product assets,
4. theme tokens,
5. store/download destinations,

and NOT a new hand-written landing-page implementation.

---

# 1. Core architecture principles

The repository has five non-negotiable principles.

## Principle 1 — Product-agnostic layouts

Landing-page layouts are universal.

Do not create:

```text
ResumeMakerLanding.astro
UnitConverterLanding.astro
GameLanding.astro
```

when the same structure can be driven by data.

Prefer:

```text
ProductLanding.astro
```

with a `ProductDefinition`.

---

## Principle 2 — Product configuration drives visual identity

The same layout may have different:

- primary color,
- secondary color,
- heading color,
- background gradient,
- glow colors,
- section backgrounds,
- app icon,
- screenshots,
- hero composition,
- App Store URL,
- Google Play URL,
- product name,
- product tagline,
- feature copy,
- stats,
- FAQ,
- legal scope.

Do not hardcode these inside shared components.

---

## Principle 3 — Locale availability belongs to each route/content item

Homepage locale availability does not imply that every product page, legal page, or Pinterest page exists in every locale.

Each routable content item declares the locales it actually supports.

---

## Principle 4 — English is the unprefixed canonical default

English:

```text
/
 /about
 /contact
 /privacy
 /terms
 /resume-maker
```

Non-English:

```text
/fr/
 /de/
 /tr/
 /fr/resume-maker
```

Never generate `/en/...`.

---

## Principle 5 — Pinterest scale is data-driven

Pinterest acquisition pages must scale from tens to thousands of URLs through data/content collections.

Never scale by copying Astro files.

---

# 2. Technology

Use:

- Astro
- TypeScript
- Cloudflare Pages
- static generation by default
- minimal client-side JavaScript
- semantic HTML
- responsive CSS
- Font Awesome for generic interface icons unless a product asset is more appropriate

Do not introduce React, Vue, Svelte, a client router, a CMS, a database, or a large UI framework unless a real requirement justifies it.

Prefer:

```text
Astro components
+ typed data
+ content collections
+ static generation
```

---

# 3. Repository-level product model

All applications must be represented in a central product registry.

Suggested location:

```text
src/products/
```

Suggested structure:

```text
src/products/
├── registry.ts
├── types.ts
├── resume-maker/
│   ├── product.ts
│   ├── content/
│   │   ├── en.ts
│   │   ├── fr.ts
│   │   └── ...
│   └── assets/
└── future-product/
    ├── product.ts
    ├── content/
    └── assets/
```

The exact physical structure may evolve, but there must be one authoritative typed product definition.

---

# 4. ProductDefinition

Use a concept similar to:

```ts
type ProductDefinition = {
  id: string;
  slug: string;

  name: string;
  shortName?: string;

  route: {
    englishPath: string;
    localizedPaths?: Partial<Record<Locale, string>>;
  };

  locales: Locale[];

  stores: {
    ios?: string;
    android?: string;
    web?: string;
  };

  theme: ProductTheme;

  assets: {
    icon: ImageMetadata | string;
    hero?: ImageMetadata | string;
    screenshots: Array<ImageMetadata | string>;
    phoneFrame?: ImageMetadata | string;
    overlays?: Array<ImageMetadata | string>;
    storeBadges?: {
      ios?: ImageMetadata | string;
      android?: ImageMetadata | string;
    };
  };

  landing: LandingPageDefinition;

  legal?: {
    privacyRouteId?: string;
    termsRouteId?: string;
  };
};
```

This is a conceptual contract.

Adjust field names if necessary, but preserve the architecture.

---

# 5. Product theme tokens

Every product landing page must obtain its visual identity through a theme object.

Suggested shape:

```ts
type ProductTheme = {
  primary: string;
  primaryHover?: string;

  text: string;
  heading: string;
  muted: string;

  pageBackground: string;
  surface: string;

  heroBackground: string;
  heroGradient?: string;
  heroGlow?: string[];

  tintedSection: string;
  finalCtaBackground: string;

  border?: string;
  shadow?: string;
};
```

Shared components should consume CSS variables generated from this config.

Example:

```astro
<div
  class="product-page"
  style={`
    --product-primary:${theme.primary};
    --product-heading:${theme.heading};
    --product-hero:${theme.heroBackground};
    --product-tint:${theme.tintedSection};
  `}
>
```

Do NOT hardcode Resume Maker blue in reusable components.

A product may use blue today and another product may use:

- purple,
- orange,
- green,
- monochrome,
- gradient-based branding.

The layout must still work.

---

# 6. Shared design defaults

Product themes may override color, but shared geometry should remain consistent unless the product explicitly requires another system.

Default geometry:

```text
Card radius: 24px
Inner image/icon/control radius: 12px
Pill radius: 999px
Base card padding: 12px
Large content padding: 20–24px
```

Shared interaction style:

- subtle hover
- light elevation
- image zoom
- fade/translate reveal
- counter animation
- reduced-motion support

Do not let per-product styling fragment the shared interaction model unnecessarily.

---

# 7. Universal landing-page layout

The default product landing page is a reusable layout.

Suggested component:

```text
src/layouts/ProductLandingLayout.astro
```

or:

```text
src/components/product/ProductLanding.astro
```

The default section model is:

```text
Header
Hero
Stats / social proof
Features
Screenshot slider
FAQ
Final CTA
Footer
```

But section visibility and content must be configurable.

Example:

```ts
type LandingPageDefinition = {
  hero: HeroContent;

  stats?: StatItem[];

  features?: FeatureItem[];

  screenshots?: ScreenshotItem[];

  faq?: FaqItem[];

  finalCta?: FinalCtaContent;

  sectionOrder?: LandingSectionId[];
};
```

A future product may omit:

- stats,
- FAQ,
- screenshots,
- final CTA,

without requiring another layout implementation.

---

# 8. Do not bind components to Resume Maker copy

Wrong:

```astro
<h2>Why Resume Maker</h2>
```

inside a generic component.

Correct:

```astro
<h2>{content.featuresHeading}</h2>
```

Wrong:

```ts
const iosUrl = "https://apps.apple.com/app/";
```

inside a store component.

Correct:

```ts
const iosUrl = product.stores.ios;
```

Wrong:

```css
background: #1da1f2;
```

inside a universal CTA.

Correct:

```css
background: var(--product-primary);
```

# 10. Homepage architecture

The homepage is also data-driven.

It currently displays only one application.

Do not architect it as if only one application can ever exist.

Suggested:

```ts
export const featuredProductIds = ["resume-maker"];
```

Homepage product cards read from the product registry.

Future expansion should require:

```ts
featuredProductIds.push("another-product");
```

or an equivalent data change, not a homepage redesign.

---

# 11. Homepage Get behavior

The homepage card `Get` action is product-specific and device-aware.

Given a `ProductDefinition`:

## iOS mobile

If:

```ts
product.stores.ios;
```

exists, navigate to it.

## Android mobile

If:

```ts
product.stores.android;
```

exists, navigate to it.

## Desktop / unknown device

Navigate to the localized product landing page.

Use:

```ts
resolveLocalizedHref(product.routeId, currentLocale);
```

or equivalent.

Never hardcode a specific product slug in the generic `Get` button.

---

# 12. Product route model

Every product has a stable internal route ID.

Example:

```text
product.resume-maker
product.future-app
```

The public route does not have to match the internal ID.

Example:

```ts
{
  id: 'product.resume-maker',
  englishPath: '/resume-maker',
  locales: ['en', 'fr', 'de']
}
```

A future product could be:

```ts
{
  id: 'product.converter',
  englishPath: '/unit-converter',
  locales: ['en', 'es']
}
```

Do not force all products into one visible URL pattern unless that is an explicit product decision.

---

# 13. Locale configuration

The authoritative locale config must live in one place:

```text
src/i18n/config.ts
```

English is always the default:

```ts
export const defaultLocale = "en";
```

The homepage initially supports **8 languages**.

Example:

```ts
export const homepageLocales = [
  "en",
  // seven configured locales
] as const;
```

Do not duplicate this list across components.

---

# 14. Default English URL rules

English is unprefixed.

Correct:

```text
/
/about
/contact
/privacy
/terms
/resume-maker
```

Incorrect:

```text
/en/
/en/about
/en/resume-maker
```

If `/en/...` is received, permanently canonicalize it to the unprefixed English equivalent.

Preserve the query string.

Example:

```text
/en/resume-maker?utm_source=pinterest
->
/resume-maker?utm_source=pinterest
```

---

# 15. Non-English URL rules

Non-English routes are prefixed:

```text
/fr/
/de/
/es/
/tr/

/fr/about
/de/privacy
/es/resume-maker
```

Only generate a localized route if the complete content exists in that locale.

---

# 16. Different products can support different locales

Do not assume that all products support the homepage's 8 locales.

Example:

```text
Homepage:
EN FR DE ES IT TR PT NL

Product A:
EN FR DE

Product B:
EN ES

Product C:
EN only
```

This is valid.

The product registry must expose actual locale availability.

---

# 17. Different page types can support different locales

Locale support is route-specific, not only product-specific.

Example:

```text
Homepage:
8 locales

Product landing:
3 locales

Privacy:
EN + FR

Terms:
EN only

Pinterest page:
EN + DE
```

Never infer availability from another page.

---

# 18. Locale fallback behavior

Default fallback:

```text
en
```

Fallback is page-level.

Never create mixed-language pages to preserve a locale prefix.

Example:

User is browsing:

```text
/fr/
```

User clicks Product A.

Product A supports French:

```text
/fr/product-a
```

Product A does not support French:

```text
/product-a
```

Do not generate:

```text
/fr/product-a
```

with English content.

---

# 19. Central localized link resolver

All internal localized navigation must go through one resolver.

Suggested:

```text
src/i18n/resolveLocalizedHref.ts
```

Concept:

```ts
resolveLocalizedHref(
  routeId,
  requestedLocale,
  options?
)
```

The resolver must know:

- default locale
- real route availability
- localized path
- English fallback path
- query parameters

Use it for:

- header
- footer
- homepage product cards
- landing-page CTAs
- About
- Contact
- Privacy
- Terms
- breadcrumbs
- language switcher
- Pinterest related links
- future product discovery

Do not concatenate locale prefixes manually in components.

---

# 20. Preserve query parameters during fallback

Locale fallback must preserve campaign parameters.

Especially:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Example:

```text
/fr/resume-templates/software-engineer
?utm_source=pinterest
&utm_content=pin_042
```

French unavailable:

```text
/resume-templates/software-engineer
?utm_source=pinterest
&utm_content=pin_042
```

---

# 21. Do not auto-redirect homepage by browser language

Do not automatically redirect `/` using:

- browser language,
- Accept-Language,
- IP,
- GeoIP.

`/` is stable English.

Locale selection is explicit.

This is important for:

- SEO
- shared links
- Pinterest
- crawlers
- canonical consistency

---

# 22. Locale switcher behavior

When a user selects another language:

1. find the equivalent route in that locale;
2. if it exists, navigate there;
3. otherwise navigate to English version of the same route;
4. only fall back to a homepage if there is truly no equivalent route mapping.

Example:

```text
/fr/product-a
```

switch to German:

If DE exists:

```text
/de/product-a
```

otherwise:

```text
/product-a
```

---

# 23. Route registry

Maintain an authoritative route registry.

Suggested:

```text
src/i18n/routes.ts
```

It may be generated from product definitions and content collections.

Each route entry should have:

```ts
type RouteDefinition = {
  id: string;
  paths: Partial<Record<Locale, string>>;
  fallbackLocale: "en";
};
```

Do not make UI components guess public URLs.

---

# 24. Dynamic product page generation

Product landing pages must be generated from the registry.

Prefer Astro `getStaticPaths()` or equivalent static generation.

Conceptually:

```ts
for each product
  for each available locale
    generate one real page
```

Do not generate fallback aliases as fake localized pages.

Do not create:

```text
src/pages/resume-maker.astro
src/pages/future-app.astro
src/pages/another-app.astro
```

with duplicated markup.

Use a common renderer.

---

# 25. Suggested Astro structure

```text
src/
├── components/
│   ├── common/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── LocaleSwitcher.astro
│   │   └── StoreButtons.astro
│   │
│   ├── product/
│   │   ├── ProductHero.astro
│   │   ├── ProductStats.astro
│   │   ├── ProductFeatures.astro
│   │   ├── ProductScreenshots.astro
│   │   ├── ProductFaq.astro
│   │   └── ProductFinalCta.astro
│   │
│   └── home/
│       └── ProductCard.astro
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── ProductLandingLayout.astro
│   └── LegalLayout.astro
│
├── products/
│   ├── types.ts
│   ├── registry.ts
│   └── ...
│
├── i18n/
│   ├── config.ts
│   ├── routes.ts
│   ├── resolveLocalizedHref.ts
│   └── dictionaries/
│
├── content/
│   ├── legal/
│   └── pinterest/
│
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── [locale]/
│   │   └── ...
│   └── ...
│
└── styles/
    └── global.css
```

Use the simplest implementation that preserves this separation.

---

# 26. StoreButtons must be universal

Store controls receive a product.

Example:

```astro
<StoreButtons product={product} />
```

They decide what to show based on:

```ts
product.stores.ios;
product.stores.android;
product.stores.web;
```

A product might have:

```text
iOS + Android
```

another:

```text
iOS only
```

another:

```text
web only
```

The component must degrade gracefully.

---

# 27. Generic device-aware download behavior

Device detection must use the current product config.

For a generic product:

```text
iOS mobile:
-> product.stores.ios if available

Android mobile:
-> product.stores.android if available

Desktop:
-> product landing page or visible store choices

Unknown mobile:
-> show available store choices
```

Never assume Resume Maker store URLs.

Never auto-open a store simply because a page loads.

Store navigation occurs after user intent such as pressing `Get` or `Download`.

---

# 28. Product-specific assets

Production assets must not be embedded as large base64 blobs.

Store them as real project assets:

```text
src/assets/products/<product-id>/
```

or:

```text
public/products/<product-id>/
```

Use:

- WebP
- AVIF
- optimized PNG only when required
- Astro Image when beneficial

A product config references its own assets.

Shared layout code must not import Resume Maker screenshots directly.

---

# 29. Landing section configuration

Products can vary their content while using the same layout.

Example:

```ts
landing: {
  sections: ["hero", "stats", "features", "screenshots", "faq", "finalCta"];
}
```

Future Product B may use:

```ts
landing: {
  sections: ["hero", "features", "screenshots", "finalCta"];
}
```

Do not fork the layout only because a section is absent.

---

# 30. Product-specific colors and gradient/glow

Abstract backgrounds, glows, waves, and section transitions must read from product theme tokens.

Do not bake blue glow into shared CSS.

Suggested variables:

```css
--product-primary
--product-primary-soft
--product-heading
--product-text
--product-hero-bg
--product-hero-glow-1
--product-hero-glow-2
--product-section-tint
--product-final-bg
```

A future app should be able to change the entire visual identity without editing component CSS.

---

# 31. Wave transitions

The same wave system may be shared across products, but its colors must be theme-driven.

Rules:

- no unexplained white spacer between tinted sections
- wave fill exactly matches adjacent background token
- overlap 1–3px if anti-alias seams appear
- reduce amplitude on mobile
- never create horizontal overflow
- do not use a visually approximate duplicate color

Prefer one shared component:

```astro
<WaveTransition
  from={theme.sectionTint}
  to={theme.finalBackground}
/>
```

---

# 32. About page

Default language is English.

Do not include developer personal information.

Do not invent:

- founder story
- personal biography
- team size
- office
- location
- funding
- revenue
- awards

Use product philosophy.

Recommended base copy:

## Mission

Our mission is to make useful digital tools simple, accessible, and practical. We focus on removing unnecessary complexity so people can complete everyday tasks with clear, dependable software.

## Vision

We believe good software should feel focused, respectful, and easy to understand. Our long-term goal is to build products that solve real problems with thoughtful design, reliable technology, and privacy-conscious decisions.

## Principles

- Simplicity over unnecessary complexity.
- Useful features over feature count.
- Clear and predictable product behavior.
- Privacy-conscious design.
- Accessibility across languages and devices.
- Continuous improvement through real-world use.

This page describes Helvorxy as a product philosophy, not a personal biography.

---

# 33. Contact page

Primary contact:

```text
k12181159@gmail.com
```

Form fields:

- Name
- Email
- Subject
- Message

Do not collect unnecessary personal data.

Cloudflare Pages does not provide a Netlify-style automatic form inbox.

Until a real server-side form delivery service is configured:

- generate a populated `mailto:k12181159@gmail.com`
- URL-encode subject and body
- explain that the user's email client will open
- do not show a false "message sent" success state

Suggested body:

```text
Name:
{name}

Email:
{email}

Message:
{message}
```

Suggested subject:

```text
Website contact – {subject}
```

If a Worker/email provider is introduced later, update the implementation and this rule.

---

# 34. Legal architecture

Legal content must also be routable through the same locale fallback system.

Global default routes:

```text
/privacy
/terms
```

Localized:

```text
/fr/privacy
/de/terms
```

only when complete translations actually exist.

If a localized legal page does not exist:

```text
/fr/privacy
```

must resolve/fallback to:

```text
/privacy
```

rather than serving English content under `/fr/privacy`.

---

# 35. Product-specific legal overrides

Do not assume every application must permanently share identical legal content.

Support both:

```text
global legal pages
```

and optional:

```text
product-specific legal route references
```

Concept:

```ts
product.legal = {
  privacyRouteId: "legal.privacy.resume-maker",
  termsRouteId: "legal.terms.resume-maker",
};
```

If a product has no override, use the global site legal routes.

This prevents future products from forcing incompatible legal terms into one document.

---

# 36. Current legal source files

The current uploaded Privacy Policy and Terms of Use are authoritative for the product they describe.

Do not silently rewrite their legal meaning.

Website conversion may:

- improve typography
- create semantic headings
- add a table of contents
- add internal navigation
- adapt Markdown to Astro

but must not introduce unsupported promises.

---

# 37. FAQ legal links

FAQ items that discuss:

- personal data
- AI processing
- subscriptions
- purchases
- account deletion
- external services

should link to the appropriate localized Privacy or Terms route.

Resolve these using the route resolver.

Do not hardcode locale prefixes.

---

# 38. Pinterest architecture is product-aware

Pinterest acquisition pages must know which product they promote.

A Pinterest page is not globally tied to Resume Maker.

Concept:

```ts
type PinterestLandingPage = {
  id: string;

  productId: string;

  slug: string;

  availableLocales: Locale[];

  intent: string;

  templateId?: string;
  profession?: string;
  seniority?: string;

  themeOverrides?: Partial<ProductTheme>;

  heroImage: string;
  pinterestImage?: string;

  localizedContent: Record<Locale, PinterestPageContent>;
};
```

This allows future Pinterest campaigns for multiple products.

---

# 39. Pinterest pages may override product theme

A Pinterest page normally inherits its product theme.

But it may optionally override selected tokens for campaign alignment.

Example:

```ts
themeOverrides: {
  heroBackground: '#F5F1FF',
  primary: '#6C63FF',
}
```

Do not duplicate the full product layout for a campaign color change.

---

# 40. Pinterest destination consistency

The Pin and destination page should match.

Preserve:

- product
- visual/template
- profession/search intent
- language when available
- campaign metadata

If the Pin is a "Software Engineer Resume" page, destination should not be a generic unrelated homepage when a matching landing page exists.

---

# 41. Pinterest localization fallback

Pinterest pages use the same route resolver.

Example:

User context:

```text
fr
```

Page supports French:

```text
/fr/resume-templates/software-engineer
```

French unavailable:

```text
/resume-templates/software-engineer
```

Do not create an English page under the French prefix.

---

# 42. Pinterest campaign parameters

Support:

```text
utm_source=pinterest
utm_medium=organic
utm_campaign=<campaign>
utm_content=<pin-id>
utm_term=<intent>
```

Preserve them through:

- locale fallback
- product navigation
- internal CTA transitions where appropriate

Do not silently strip them.

---

# 43. Pinterest scale

Architecture must support:

```text
60
300
1,000+
```

pages without component duplication.

Scale through:

- collections
- data
- generated routes

not handwritten pages.

---

# 44. Pinterest quality rules

Do not create hundreds of near-identical indexable pages that differ only by color.

Prefer real search intent:

- profession
- experience level
- use case
- document type
- language
- ATS intent
- student/no-experience intent

Color can vary creative assets, but should not be the only reason for a separate SEO page.

---

# 45. Canonical URLs

Every real indexable page gets a self-referencing canonical.

English example:

```text
https://helvorxy.com/product-a
```

French:

```text
https://helvorxy.com/fr/product-a
```

Do not canonicalize a valid translated page to English.

Fallback aliases should not become indexable duplicates.

---

# 46. hreflang

Only output alternates that actually exist.

Example page available in EN, FR, DE:

```html
<link rel="alternate" hreflang="en" href="https://helvorxy.com/product-a" />
<link rel="alternate" hreflang="fr" href="https://helvorxy.com/fr/product-a" />
<link rel="alternate" hreflang="de" href="https://helvorxy.com/de/product-a" />
<link rel="alternate" hreflang="x-default" href="https://helvorxy.com/product-a" />
```

Do not emit unavailable locales.

`x-default` points to English.

---

# 47. Sitemap

Include only actual generated pages.

Do not include:

- fake localized fallbacks
- unsupported locale aliases
- `/en/...` copies

A page available only in English appears once.

---

# 48. Unsupported localized URLs

Internal links should prevent missing localized routes.

For an externally requested known route whose locale is unavailable, a temporary fallback redirect may be used:

```text
307
```

Example:

```text
/fr/product-b
```

if Product B is EN-only:

```text
/product-b
```

Preserve query parameters.

Do not redirect unknown arbitrary 404 URLs to the homepage.

---

# 49. Translation completeness

Localized pages must be complete.

Do not ship:

```text
French hero
English FAQ
French CTA
```

If content is incomplete, mark the locale unavailable and fall back to English.

Product names and official store names may remain untranslated.

---

# 50. Translation storage

Use structured locale files for interface copy.

Example:

```text
src/i18n/dictionaries/
├── en.ts
├── fr.ts
├── de.ts
└── ...
```

Large product copy can live with the product:

```text
src/products/product-a/content/en.ts
```

Pinterest copy can live in a content collection.

Do not force all long-form content into one giant dictionary.

---

# 51. Build-time validation

Where practical, fail or warn during build when:

- an `/en` route is generated
- a localized route has no English equivalent
- duplicate product IDs exist
- duplicate public routes exist
- duplicate canonicals exist
- a product declares a locale with missing required content
- hreflang points to a nonexistent route
- sitemap includes a nonexistent route
- a Pinterest page references an unknown product
- a product lacks all usable store/web destinations
- required theme tokens are missing

Catch architecture errors before deployment.

---

# 52. Product config validation

Each product should be validated against a schema.

Astro content schemas, Zod, or typed validation may be used.

At minimum validate:

```text
id
slug
name
English route
locale list
theme
icon
landing content
store/web destination
```

Optional fields should degrade gracefully.

---

# 53. Generic homepage card

`ProductCard.astro` receives a product definition.

It must not know which application it represents.

Concept:

```astro
<ProductCard product={product} locale={locale} />
```

It reads:

```text
product.name
product.assets.icon
product.assets.screenshots
product.theme.primary
product.stores
product.route
```

The same card must work for future products.

---

# 54. Generic landing hero

`ProductHero.astro` receives:

```text
product
localized content
theme
assets
```

It may render different hero visual compositions if configured.

Support composition variants rather than product-specific components.

Example:

```ts
hero.variant = "phone-overlay";
hero.variant = "single-screenshot";
hero.variant = "device-mockup";
hero.variant = "abstract";
```

Do not create a new hero implementation merely because one product does not use a phone frame.

---

# 55. Screenshot system

Screenshot sliders are generic.

Input:

```ts
screenshots: {
  image: string;
  alt: string;
}
[];
```

A product can supply 3, 5, or more screenshots.

Do not assume a specific Resume Maker screenshot count.

---

# 56. Stats/counters

Stats are optional product data.

Example:

```ts
stats: [
  { value: 1, suffix: "M+", label: "downloads" },
  { value: 4.78, decimals: 2, label: "average rating" },
];
```

Do not invent dynamic numbers.

If data cannot be supported, omit the stat.

Counter animation is presentation only.

---

# 57. App Store / Google Play badges

Store badges are presentation for the product's actual store URLs.

Never show a store badge for a platform the product does not support.

Never hardcode one app's download destination in global CSS/JS.

---

# 58. No user-review dependency

The universal landing layout must not require user reviews.

Reviews are an optional section.

Current product landing can omit them.

Future products may use them if legally and factually appropriate.

If reintroduced, reviews must be supported by a legitimate source and usage rights.

---

# 59. Contact and support by product

The site default contact is:

```text
k12181159@gmail.com
```

A future product may optionally override support contact:

```ts
product.supportEmail;
```

Generic components should use:

```text
product.supportEmail ?? site.supportEmail
```

---

# 60. Global site configuration

Use a site config for values that truly are global.

Suggested:

```text
src/config/site.ts
```

Examples:

```ts
export const site = {
  name: "Helvorxy",
  domain: "https://helvorxy.com",
  defaultLocale: "en",
  supportEmail: "k12181159@gmail.com",
};
```

Do not put product store IDs into global config.

---

# 61. Global vs product responsibility

Global configuration:

- domain
- brand name
- default locale
- global support email
- locale system
- shared legal fallback
- social profiles

Product configuration:

- app name
- app icon
- app colors
- screenshots
- landing copy
- feature list
- store links
- product locale support
- optional legal overrides
- optional support override

Pinterest page:

- promoted product ID
- acquisition intent
- campaign visual
- campaign locale availability
- optional theme override
- UTM metadata

Keep these layers separate.

---

# 62. Accessibility

Maintain:

- semantic headings
- labels
- alt text
- keyboard navigation
- visible focus
- sufficient contrast
- reduced-motion support

Product theme colors must still meet accessibility requirements.

A product brand color does not justify unreadable text or controls.

---

# 63. Performance

Optimize for static Cloudflare delivery.

Prefer:

- AVIF/WebP
- Astro Image
- responsive sizes
- lazy loading below fold
- minimal JS
- no unnecessary hydration
- no large UI dependencies

Never ship prototype base64 images in production HTML.

---

# 64. Cloudflare Pages

Use static output by default.

Cloudflare runtime features may be used when needed for:

- API endpoints
- forms
- counters
- rate limits
- future dynamic features

Do not move the whole site to SSR without a specific requirement.

Product and Pinterest landing pages should remain CDN-friendly whenever possible.

---

# 65. Analytics

Do not add analytics, trackers, advertising pixels, or cookie systems without explicit instruction.

UTM parameters alone do not require an analytics SDK.

If tracking is added later, legal disclosures must be reviewed.

---

# 66. Content accuracy

Never invent:

- downloads
- ratings
- reviews
- pricing
- features
- store availability
- subscription terms
- supported locales
- legal claims

If content cannot be supported, omit it.

---

# 67. Future product onboarding checklist

A new product should be onboarded by adding:

1. product ID
2. public slug/path
3. name
4. available locales
5. localized landing copy
6. theme
7. icon
8. screenshots/assets
9. iOS/Android/web destinations
10. optional legal override
11. optional support override
12. homepage visibility if desired

Then verify:

- homepage card
- mobile Get routing
- desktop landing routing
- canonical
- hreflang
- sitemap
- locale switch fallback
- legal links
- store links
- responsive design
- theme contrast

A new product should NOT require a copied landing-page codebase.

---

# 68. Before changing universal landing code

Ask:

- Is this behavior truly universal?
- Could it be a product config field instead?
- Could it be a theme token?
- Could it be a section option?
- Will this work for a product with no Android app?
- Will this work with another color system?
- Will this work with fewer screenshots?
- Will this work if the product has different locales?
- Will this preserve Pinterest campaign routing?

Prefer configuration over forks.

---

# 69. Before creating product-specific code

Product-specific code is acceptable only when the interaction or visual behavior genuinely cannot be expressed cleanly as:

- data
- theme
- variant
- optional section
- asset configuration

If product-specific code is required, isolate it behind an explicit variant and keep the default renderer generic.

---

# 70. Final architectural rules

The repository must preserve these rules:

> **A product is data + content + assets + theme + destinations.**

> **A landing page is a reusable renderer of that product definition.**

> **English is unprefixed; every other locale is prefixed only when that complete translation exists.**

> **Locale fallback resolves to the English version of the same route, not to mixed-language content.**

> **Homepage, legal pages, product pages, and Pinterest pages may all have different locale availability.**

> **Pinterest acquisition is product-aware, locale-aware, campaign-aware, and data-driven.**

> **Adding another app must not require cloning the Resume Maker landing page.**
