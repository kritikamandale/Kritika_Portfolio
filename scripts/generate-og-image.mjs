// One-off script — generates public/og-image.png (1200x630) for social share
// previews (Open Graph / Twitter card), matching the site's brick-red/cocoa
// palette. Run with: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1c1008"/>
      <stop offset="1" stop-color="#3A2418"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F5DE8F"/>
      <stop offset="1" stop-color="#B02618"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="150" width="90" height="8" rx="4" fill="url(#accent)"/>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="88" font-weight="700" fill="#FBF6E8">Kritika Mandale</text>
  <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600" letter-spacing="2" fill="#F5DE8F">FULL STACK &amp; AI DEVELOPER</text>
  <text x="80" y="430" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#D4B896">Building intelligent web products — from React UIs to ML model deployment.</text>
  <circle cx="1080" cy="120" r="60" fill="none" stroke="#B02618" stroke-width="4" opacity="0.5"/>
  <circle cx="1000" cy="520" r="90" fill="none" stroke="#F5DE8F" stroke-width="3" opacity="0.35"/>
</svg>
`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(outPath, png);
console.log('Wrote', outPath, `(${png.length} bytes)`);
