// Finds the bounding box of the GREEN screen area in the original mockup.
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIG = path.join(__dirname, '../public/laptop_mockup_final.png');

const { data, info } = await sharp(ORIG).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

let minX = width, maxX = 0, minY = height, maxY = 0;
let greenCount = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    if (g > 100 && r < 120 && b < 120 && g > r * 1.4 && g > b * 1.4) {
      greenCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`Image size: ${width} × ${height}`);
console.log(`Green (screen) pixels: ${greenCount}`);
console.log(`Screen bounds (px): top=${minY}, left=${minX}, bottom=${maxY}, right=${maxX}`);
console.log(`Screen size (px): ${maxX - minX} × ${maxY - minY}`);
console.log('');
console.log('CSS percentages (use these in Projects.jsx):');
console.log(`  top:    ${((minY / height) * 100).toFixed(2)}%`);
console.log(`  left:   ${((minX / width)  * 100).toFixed(2)}%`);
console.log(`  width:  ${(((maxX - minX + 1) / width)  * 100).toFixed(2)}%`);
console.log(`  height: ${(((maxY - minY + 1) / height) * 100).toFixed(2)}%`);
