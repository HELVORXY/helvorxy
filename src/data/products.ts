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
    id: 'party-hype',
    slug: 'party-hype',
    name: 'Party Hype',
    subtitle: '2 3 4 Player Games',
    eyebrow: 'Local multiplayer',
    homeLine: '2–8 players. One device. Zero Wi-Fi.',
    heroTitle: 'Turn one screen into the whole party.',
    heroCopy:
      'Fast reflex battles for 2–8 players sharing a single device. Play Colors or Arrows, follow voice commands and keep going as the difficulty ramps up.',
    storeUrl: 'https://apps.apple.com/tr/app/party-hype-2-3-4-player-games/id6756029370',
    appStoreId: '6756029370',
    size: '45.5 MB',
    category: 'Games',
    languages: 'English',
    age: '4+',
    theme: { primary: '#f5348a', accent: '#f5b301' },
    icon: '/assets/icons/party-hype.webp',
    screenshots: [
      '/assets/screenshots/party-hype-1.webp',
      '/assets/screenshots/party-hype-2.webp',
      '/assets/screenshots/party-hype-3.webp',
      '/assets/screenshots/party-hype-4.webp',
    ],
    features: [
      ['2–8 players', 'Everyone plays together on one iPhone or iPad—no separate installs required.'],
      ['Two modes', 'Colors tests split-second reactions; Arrows adds directional and tapping challenges.'],
      ['Voice commands', 'Text-to-Speech calls the action so players can focus on reacting, not reading.'],
      ['Offline play', 'No Wi-Fi is required, making it easy to play at home, on trips or anywhere together.'],
    ],
    facts: [
      ['2–8', 'players'],
      ['2', 'game modes'],
      ['Offline', 'no Wi-Fi needed'],
      ['45.5 MB', 'download size'],
    ],
    faq: [
      ['Do all players need the app?', 'No. Party Hype is designed for multiple players sharing one device.'],
      ['Does it need internet?', 'No. Apple’s listing says the game works completely offline.'],
      ['What are the game modes?', 'The current App Store description lists Colors Mode and Arrows Mode.'],
    ],
    storeFact: 'Free · In-App Purchases',
    meta: {
      version: '1.7.2',
      updated: '2 April 2026',
      minimumOs: 'iOS 13.0',
      price: 'Free',
      seller: 'Muzaffer Kuran',
    },
  },
  {
    id: 'pickify',
    slug: 'pickify',
    name: 'Pickify',
    subtitle: 'Party Decision Maker',
    eyebrow: 'Random decision toolkit',
    homeLine: 'Eight ways to stop debating and let chance decide.',
    heroTitle: 'Make the decision. Keep the fun.',
    heroCopy:
      'Finger chooser, custom wheel, group maker, sorter, coin flip, random numbers, draw straws and dice duel—eight quick tools for parties and everyday choices.',
    storeUrl: 'https://apps.apple.com/tr/app/pickify-party-decision-maker/id6762468335',
    appStoreId: '6762468335',
    size: '25.6 MB',
    category: 'Utilities',
    languages: 'English',
    age: '4+',
    theme: { primary: '#e4632f', accent: '#6d4de6' },
    icon: '/assets/icons/pickify.webp',
    screenshots: [
      '/assets/screenshots/pickify-1.webp',
      '/assets/screenshots/pickify-2.webp',
      '/assets/screenshots/pickify-3.webp',
      '/assets/screenshots/pickify-4.webp',
    ],
    features: [
      ['Finger chooser', 'Everyone touches the screen and the app picks one finger at random.'],
      ['Spin the wheel', 'Build a custom wheel with your own labels and let it choose the answer.'],
      ['Group tools', 'Create random teams, shuffle a list or decide turn order in seconds.'],
      ['Classic randomizers', 'Flip a coin, generate a number, draw straws or challenge a friend in Dice Duel.'],
    ],
    facts: [
      ['8', 'decision tools'],
      ['25.6 MB', 'download size'],
      ['No data', 'collected'],
      ['4+', 'age rating'],
    ],
    faq: [
      [
        'How many tools are included?',
        'The App Store description lists eight: Finger Chooser, Spin the Wheel, Group Maker, Sorter, Coin Flip, Random Number Generator, Draw Straws and Dice Duel.',
      ],
      ['Does Pickify collect data?', 'Apple’s App Privacy section currently states “Data Not Collected.”'],
      [
        'Can I use it for teams?',
        'Yes. Group Maker can divide names into randomized groups, while Sorter can randomize order.',
      ],
    ],
    storeFact: 'Free',
    meta: {
      version: '1.0',
      updated: '22 April 2026',
      minimumOs: 'iOS 13.0',
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
];

export const productsBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product])
) as Record<string, Product>;
