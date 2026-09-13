/**
 * Product definitions.
 *
 * Visual identity is limited to a product hue (`primary` / `accent`).
 * Page/surface/text colors come from the day–night theme in `global.css`,
 * so every product page works in both light and dark mode.
 *
 * Metadata, icons and screenshots below are taken from the Apple App Store
 * lookup API (see `scripts/sync-appstore.mjs`).
 */

export type ProductTheme = {
  /** Product hue. Used for accents, links, buttons and glows. */
  primary: string;
  /** Secondary hue. Used for gradients and highlights. */
  accent: string;
};

export type ProductMeta = {
  version: string;
  updated: string;
  minimumOs: string;
  price: string;
  seller: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  eyebrow: string;
  homeLine: string;
  heroTitle: string;
  heroCopy: string;
  storeUrl: string;
  appStoreId: string;
  size: string;
  category: string;
  languages: string;
  age: string;
  theme: ProductTheme;
  /** Apple app icon, downloaded from the App Store artwork CDN. */
  icon: string;
  /** Apple App Store screenshots, in listing order. */
  screenshots: string[];
  features: [string, string][];
  facts: [string, string][];
  faq: [string, string][];
  storeFact: string;
  meta: ProductMeta;
};

export const products: Product[] = [
  {
    id: 'gamepad-tester',
    slug: 'gamepad-tester',
    name: 'GamePad Tester & Massager',
    subtitle: 'Stick Drift & Controller Test',
    eyebrow: 'Controller utility',
    homeLine: 'Controller diagnostics without the guesswork.',
    heroTitle: 'Know exactly what your controller is doing.',
    heroCopy:
      'Test buttons, triggers and analog sticks in real time, detect stick drift and dead zones, then switch to 15+ vibration patterns when you want to unwind.',
    storeUrl: 'https://apps.apple.com/tr/app/gamepad-tester-massager/id6759626923',
    appStoreId: '6759626923',
    size: '12.1 MB',
    category: 'Utilities',
    languages: '6 languages',
    age: '4+',
    theme: { primary: '#7c5cff', accent: '#22c8ee' },
    icon: '/assets/icons/gamepad-tester.webp',
    screenshots: [
      '/assets/screenshots/gamepad-tester-1.webp',
      '/assets/screenshots/gamepad-tester-2.webp',
      '/assets/screenshots/gamepad-tester-3.webp',
      '/assets/screenshots/gamepad-tester-4.webp',
    ],
    features: [
      ['Stick drift', 'See analog position at rest, identify drift and inspect dead-zone behavior.'],
      ['Every input', 'Verify face buttons, D-pad, bumpers and analog trigger pressure with live feedback.'],
      ['Vibration lab', 'Check left and right vibration motors and explore 15+ adjustable massage patterns.'],
      ['Wide support', 'Built for Xbox, PlayStation, MFi and other compatible Bluetooth controllers.'],
    ],
    facts: [
      ['15+', 'vibration patterns'],
      ['12.1 MB', 'download size'],
      ['6', 'languages'],
      ['4+', 'age rating'],
    ],
    faq: [
      [
        'Can it detect stick drift?',
        'Yes. The App Store listing describes live analog-stick analysis for drift, dead zones and range of motion.',
      ],
      [
        'Which controllers are supported?',
        'The listing names Xbox Wireless, PS5 DualSense, PS4 DualShock 4, MFi-certified and other Bluetooth game controllers.',
      ],
      [
        'Does it only test controllers?',
        'No. It also includes vibration-motor checks and 15+ vibration or massage patterns.',
      ],
    ],
    storeFact: 'Free · In-App Purchases',
    meta: {
      version: '1.2.7',
      updated: '26 July 2026',
      minimumOs: 'iOS 26.2',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
  {
    id: 'nureya',
    slug: 'nureya',
    name: 'Nureya',
    subtitle: 'Quran & Azan',
    eyebrow: 'Prayer & reflection',
    homeLine: 'Prayer times, Quran reflection and daily dhikr in one calm space.',
    heroTitle: 'A focused space for worship, without the clutter.',
    heroCopy:
      'Keep prayer times, Quran verses, the 99 Names of Allah and tasbih close in a calm, offline-first iOS experience with Home Screen and Lock Screen widgets.',
    storeUrl: 'https://apps.apple.com/tr/app/nureya-quran-azan/id6807823446',
    appStoreId: '6807823446',
    size: '16.1 MB',
    category: 'Reference',
    languages: '7 languages',
    age: '4+',
    theme: { primary: '#08745b', accent: '#d5a83d' },
    icon: '/assets/icons/nureya.webp',
    screenshots: [
      '/assets/screenshots/nureya-1.webp',
      '/assets/screenshots/nureya-2.webp',
      '/assets/screenshots/nureya-3.webp',
      '/assets/screenshots/nureya-4.webp',
    ],
    features: [
      ['Prayer times & Azan', 'See daily prayer times for your location or a chosen city, with configurable calculation methods and alerts.'],
      ['Quran verses', 'Read all 6,236 Arabic verses with available translations, search them and save favourites.'],
      ['99 Names & tasbih', 'Explore the Names with meanings and pronunciation, then count dhikr with preset or custom goals.'],
      ['Private by design', 'Essential content works offline, while favourites, counts and preferences stay on your device.'],
    ],
    facts: [
      ['6,236', 'Quran verses'],
      ['99', 'Names of Allah'],
      ['7', 'languages'],
      ['16.1 MB', 'download size'],
    ],
    faq: [
      ['Does Nureya work offline?', 'Yes. Quran, Names and essential religious content are bundled for offline use.'],
      ['How is location used?', 'The App Store listing says location is used on-device only to calculate prayer times.'],
      ['Are widgets included?', 'Yes. Home Screen and Lock Screen widgets can show the next prayer and today’s schedule.'],
    ],
    storeFact: 'Free',
    meta: {
      version: '1.0.2',
      updated: '5 September 2026',
      minimumOs: 'iOS 17.0',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
  {
    id: 'cv-maker-professional',
    slug: 'cv-maker-professional',
    name: 'CV Maker',
    subtitle: 'Professional Resume',
    eyebrow: 'Resume & cover letters',
    homeLine: 'A polished CV, from first field to final PDF.',
    heroTitle: 'Build a professional resume without fighting the layout.',
    heroCopy:
      'Choose from 15+ templates, edit with a live preview, tune colors, fonts and spacing, create a matching cover letter and export a clean PDF—no account required.',
    storeUrl: 'https://apps.apple.com/tr/app/cv-maker-professional-resume/id6785433043',
    appStoreId: '6785433043',
    size: '19.1 MB',
    category: 'Business',
    languages: '7 languages',
    age: '4+',
    theme: { primary: '#2d6cdf', accent: '#22b4e8' },
    icon: '/assets/icons/cv-maker-professional.webp',
    screenshots: [
      '/assets/screenshots/cv-maker-professional-1.webp',
      '/assets/screenshots/cv-maker-professional-2.webp',
      '/assets/screenshots/cv-maker-professional-3.webp',
      '/assets/screenshots/cv-maker-professional-4.webp',
    ],
    features: [
      ['15+ templates', 'Choose a layout for different industries and career levels, then customize it.'],
      ['Live preview', 'See changes as you edit so the document stays predictable from input to PDF.'],
      ['Full styling control', 'Adjust colors, fonts, spacing, paper size and section headings.'],
      ['Complete application', 'Export and share PDF resumes, create cover letters and print directly from the app.'],
    ],
    facts: [
      ['15+', 'templates'],
      ['7', 'languages'],
      ['No account', 'required'],
      ['19.1 MB', 'download size'],
    ],
    faq: [
      ['Do I need an account?', 'No. The current App Store description says you can start without signing up.'],
      ['Can I export as PDF?', 'Yes. PDF export and sharing are listed as core features.'],
      [
        'Does it include cover letters?',
        'Yes. A cover letter maker is included for creating a matching application document.',
      ],
    ],
    storeFact: 'Free',
    meta: {
      version: '1.0',
      updated: '8 July 2026',
      minimumOs: 'iOS 26.2',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
  {
    id: 'wordexa',
    slug: 'wordexa',
    name: 'Wordexa',
    subtitle: 'Vocab Flashcards',
    eyebrow: 'Language learning',
    homeLine: 'Build vocabulary with focused flashcards and smart repetition.',
    heroTitle: 'Learn words that stick.',
    heroCopy:
      'Study Ukrainian, Russian, English and Turkish with swipe-based flashcards and spaced repetition that brings unknown words back at the right time.',
    storeUrl: 'https://apps.apple.com/tr/app/wordexa-vocab-flashcards/id6800901350',
    appStoreId: '6800901350',
    size: '15.4 MB',
    category: 'Education',
    languages: '4 languages',
    age: '4+',
    theme: { primary: '#5145e6', accent: '#1fbfe5' },
    icon: '/assets/icons/wordexa.webp',
    screenshots: [
      '/assets/screenshots/wordexa-1.webp',
      '/assets/screenshots/wordexa-2.webp',
      '/assets/screenshots/wordexa-3.webp',
      '/assets/screenshots/wordexa-4.webp',
    ],
    features: [
      ['Spaced repetition', 'Words return before you are likely to forget them, keeping review focused and efficient.'],
      ['Four languages', 'Study Ukrainian, Russian, English and Turkish vocabulary in one app.'],
      ['Swipe-based cards', 'Move through flashcards at your own pace and mark each word as known or unknown.'],
      ['Focused review', 'Unknown words resurface so practice stays centred on vocabulary you have not mastered.'],
    ],
    facts: [
      ['4', 'languages'],
      ['Smart', 'spaced repetition'],
      ['15.4 MB', 'download size'],
      ['4+', 'age rating'],
    ],
    faq: [
      ['Which languages can I study?', 'The current App Store listing includes Ukrainian, Russian, English and Turkish.'],
      ['How does review work?', 'Words marked as unknown return through spaced repetition until they become familiar.'],
      ['Who is Wordexa for?', 'It is designed for language learners, exam preparation, travel vocabulary and everyday study.'],
    ],
    storeFact: 'Free',
    meta: {
      version: '1.0',
      updated: '27 August 2026',
      minimumOs: 'iOS 17.0',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
  {
    id: 'invique',
    slug: 'invique',
    name: 'Invique',
    subtitle: 'Invite & Card Maker',
    eyebrow: 'Invitations & cards',
    homeLine: 'Personal invitations and greeting cards, ready in minutes.',
    heroTitle: 'Make every invitation feel personal.',
    heroCopy:
      'Start with an occasion-based template, customise the wording, photos, fonts, colours and decorative details, then save and share your finished design.',
    storeUrl: 'https://apps.apple.com/tr/app/invique-invite-card-maker/id6799716023',
    appStoreId: '6799716023',
    size: '58.7 MB',
    category: 'Graphics & Design',
    languages: '7 languages',
    age: '4+',
    theme: { primary: '#5d276f', accent: '#d7a24c' },
    icon: '/assets/icons/invique.webp',
    screenshots: [
      '/assets/screenshots/invique-1.webp',
      '/assets/screenshots/invique-2.webp',
      '/assets/screenshots/invique-3.webp',
      '/assets/screenshots/invique-4.webp',
    ],
    features: [
      ['Every occasion', 'Create designs for weddings, birthdays, baby showers, engagements, anniversaries, holidays and more.'],
      ['Ready-made templates', 'Choose an occasion-based starting point instead of designing from a blank page.'],
      ['Personal editing', 'Customise wording, photos, fonts, colours, backgrounds and decorative elements.'],
      ['Save & share', 'Keep a finished copy ready for digital sharing or printing.'],
    ],
    facts: [
      ['7', 'languages'],
      ['Templates', 'ready to customise'],
      ['58.7 MB', 'download size'],
      ['4+', 'age rating'],
    ],
    faq: [
      ['What can I create?', 'The App Store listing covers invitations and greeting cards for weddings, birthdays, parties, holidays and other occasions.'],
      ['Do I need design experience?', 'No. Invique provides ready-made templates and simple personalisation tools.'],
      ['Can I use my own photos?', 'Yes. Designs can be personalised with your own wording, photos, fonts, colours and backgrounds.'],
    ],
    storeFact: 'Free',
    meta: {
      version: '1.0',
      updated: '25 August 2026',
      minimumOs: 'iOS 17.0',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
];

export const productsBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product])
) as Record<string, Product>;

/** Homepage display order. Product definitions remain independent of merchandising order. */
export const featuredProductIds = [
  'gamepad-tester',
  'cv-maker-professional',
  'wordexa',
  'invique',
  'nureya',
] as const;

export const featuredProducts = featuredProductIds.map((id) => productsBySlug[id]);
