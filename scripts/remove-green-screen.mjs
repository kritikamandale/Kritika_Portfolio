// Removes the green-screen chroma key from the laptop mockup PNG,
// replacing green pixels with transparency so the screenshot can
// show through when placed behind the image.

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT  = path.join(__dirname, '../public/laptop_mockup_final.png');
const OUTPUT = path.join(__dirname, '../public/laptop_mockup_transparent.png');

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info; // channels = 4 (RGBA)
const pixels = new Uint8ClampedArray(data);

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  // Chroma-key: pure green screen — high G, low R and B
  if (g > 100 && r < 120 && b < 120 && g > r * 1.4 && g > b * 1.4) {
    pixels[i + 3] = 0; // transparent
  }
}

await sharp(pixels, { raw: { width, height, channels } })
  .png()
  .toFile(OUTPUT);

console.log(`✓ Wrote ${OUTPUT}`);
