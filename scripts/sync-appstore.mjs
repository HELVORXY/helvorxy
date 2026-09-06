#!/usr/bin/env node
/**
 * Re-downloads app icons and screenshots from the Apple App Store artwork CDN
 * into `public/assets/`, and prints the metadata that `src/data/products.ts`
 * mirrors (size, category, languages, version, minimum OS).
 *
 *   node scripts/sync-appstore.mjs
 *
 * Apple's `thumb` endpoint lets us pick the delivered size and format, so we
 * ask for 512px webp icons and 600px-wide webp screenshots instead of the
 * multi-megabyte originals.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** App Store track id → slug used across the site. */
const APPS = {
  6759626923: 'gamepad-tester',
  6756029370: 'party-hype',
  6762468335: 'pickify',
  6785433043: 'cv-maker-professional',
};

const LOOKUP = `https://itunes.apple.com/lookup?id=${Object.keys(APPS).join(',')}&country=tr&entity=software`;

const download = async (url, destination) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
  return bytes.length;
};

const response = await fetch(LOOKUP);
const { results } = await response.json();

for (const app of results) {
  const slug = APPS[app.trackId];
  if (!slug) continue;

  const icon = app.artworkUrl512.replace(/\/512x512bb\.jpg$/, '/512x512bb.webp');
  await download(icon, resolve(ROOT, `public/assets/icons/${slug}.webp`));

  for (const [index, shot] of app.screenshotUrls.entries()) {
    const url = shot.replace(/\/320x480bb\.jpg$/, '/600x0w.webp');
    await download(url, resolve(ROOT, `public/assets/screenshots/${slug}-${index + 1}.webp`));
  }

  console.log(`\n${slug}`);
  console.log(`  name        ${app.trackName}`);
  console.log(`  category    ${app.primaryGenreName}`);
  console.log(`  size        ${(app.fileSizeBytes / 1_000_000).toFixed(1)} MB`);
  console.log(`  languages   ${app.languageCodesISO2A.join(', ')}`);
  console.log(`  version     ${app.version} (${app.currentVersionReleaseDate.slice(0, 10)})`);
  console.log(`  minimum os  iOS ${app.minimumOsVersion}`);
  console.log(`  price       ${app.formattedPrice}`);
  console.log(`  seller      ${app.sellerName}`);
  console.log(`  screenshots ${app.screenshotUrls.length}`);
}
