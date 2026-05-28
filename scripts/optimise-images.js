import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target public/ directory (the prompt mentioned public/images/ but the images are in public/)
const targetDir = path.join(__dirname, '../public');

async function optimiseImages() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    return;
  }

  const files = fs.readdirSync(targetDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files in ${targetDir}`);

  for (const file of pngFiles) {
    const inputPath = path.join(targetDir, file);
    const filenameWithoutExt = path.basename(file, path.extname(file));
    const outputPath = path.join(targetDir, `${filenameWithoutExt}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Optimised: ${file} -> ${filenameWithoutExt}.webp`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
}

optimiseImages();
