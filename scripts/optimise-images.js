import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target public/ directory, scanned recursively so nested folders like
// public/certificates/ actually get .webp siblings generated too.
const targetDir = path.join(__dirname, '../public');

function findImageFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImageFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimiseImages() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    return;
  }

  const imageFiles = findImageFiles(targetDir);

  console.log(`Found ${imageFiles.length} image files under ${targetDir}`);

  for (const inputPath of imageFiles) {
    const dir = path.dirname(inputPath);
    const filenameWithoutExt = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(dir, `${filenameWithoutExt}.webp`);

    try {
      const buffer = await sharp(inputPath)
        .rotate()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();
      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Optimised: ${path.relative(targetDir, inputPath)} -> ${filenameWithoutExt}.webp`);
    } catch (error) {
      console.error(`❌ Error processing ${inputPath}:`, error);
    }
  }
}

optimiseImages();
