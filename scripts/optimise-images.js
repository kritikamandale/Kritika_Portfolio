import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target public/ directory, scanned recursively so nested folders like
// public/certificates/ actually get .webp siblings generated too.
const targetDir = path.join(__dirname, '../public');

function findPngFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPngFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimiseImages() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    return;
  }

  const pngFiles = findPngFiles(targetDir);

  console.log(`Found ${pngFiles.length} PNG files under ${targetDir}`);

  for (const inputPath of pngFiles) {
    const dir = path.dirname(inputPath);
    const filenameWithoutExt = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(dir, `${filenameWithoutExt}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Optimised: ${path.relative(targetDir, inputPath)} -> ${filenameWithoutExt}.webp`);
    } catch (error) {
      console.error(`❌ Error processing ${inputPath}:`, error);
    }
  }
}

optimiseImages();
