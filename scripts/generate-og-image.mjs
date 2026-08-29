import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const profilePath = path.join(publicDir, 'kritika-mandale-profile.jpeg');
const outPngPath = path.join(publicDir, 'kritika-mandale-og-image.png');
const outWebpPath = path.join(publicDir, 'kritika-mandale-og-image.webp');

async function generateOgImage() {
  const avatarSize = 360;
  const avatarBuffer = await sharp(profilePath)
    .resize(avatarSize, avatarSize, { fit: 'cover', position: 'top' })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${avatarSize}" height="${avatarSize}"><circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#000"/></svg>`
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FBF6E8"/>
      </linearGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E5A958"/>
        <stop offset="50%" stop-color="#B02618"/>
        <stop offset="100%" stop-color="#3A2418"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>

    <!-- Decorative background elements -->
    <circle cx="1120" cy="70" r="220" fill="#F5DE8F" opacity="0.3"/>
    <circle cx="1040" cy="560" r="160" fill="#B02618" opacity="0.05"/>
    <circle cx="80" cy="580" r="100" fill="#3A2418" opacity="0.04"/>

    <!-- Profile Avatar Ring Border -->
    <circle cx="260" cy="315" r="192" fill="none" stroke="url(#ring)" stroke-width="8"/>
    <circle cx="260" cy="315" r="182" fill="#FBF6E8" stroke="#3A2418" stroke-opacity="0.1" stroke-width="2"/>

    <!-- Right Side Content -->
    <!-- Category Pill -->
    <g transform="translate(490, 135)">
      <rect width="270" height="38" rx="19" fill="#B02618"/>
      <text x="135" y="24" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">FULL STACK &amp; AI DEVELOPER</text>
    </g>

    <!-- Main Name Title -->
    <text x="490" y="245" font-family="'Georgia', 'Times New Roman', serif" font-size="68" font-weight="700" fill="#3A2418">Kritika Mandale</text>

    <!-- Tagline -->
    <text x="490" y="300" font-family="'Inter', system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C3D2C">Building intelligent web products &amp; AI solutions</text>

    <!-- Highlights Badges -->
    <g transform="translate(490, 350)">
      <!-- Badge 1 -->
      <rect x="0" y="0" width="135" height="36" rx="18" fill="#FBF6E8" stroke="#3A2418" stroke-opacity="0.12" stroke-width="1.5"/>
      <text x="67.5" y="23" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#3A2418" text-anchor="middle">React &amp; Next.js</text>

      <!-- Badge 2 -->
      <rect x="147" y="0" width="170" height="36" rx="18" fill="#FBF6E8" stroke="#3A2418" stroke-opacity="0.12" stroke-width="1.5"/>
      <text x="232" y="23" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#3A2418" text-anchor="middle">AI &amp; Computer Vision</text>

      <!-- Badge 3 -->
      <rect x="329" y="0" width="175" height="36" rx="18" fill="#FBF6E8" stroke="#3A2418" stroke-opacity="0.12" stroke-width="1.5"/>
      <text x="416.5" y="23" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#3A2418" text-anchor="middle">Full Stack Engineering</text>
    </g>

    <!-- Website Link Pill -->
    <g transform="translate(490, 435)">
      <rect width="240" height="48" rx="24" fill="#3A2418"/>
      <circle cx="28" cy="24" r="5" fill="#F5DE8F"/>
      <text x="132" y="30" font-family="'Inter', system-ui, sans-serif" font-size="16" font-weight="600" fill="#FBF6E8" text-anchor="middle">kritikamandale.dev</text>
    </g>
  </svg>
  `;

  const baseBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  const finalPng = await sharp(baseBuffer)
    .composite([
      {
        input: avatarBuffer,
        top: 135,
        left: 80,
      },
    ])
    .png()
    .toBuffer();

  writeFileSync(outPngPath, finalPng);
  console.log('✅ Generated PNG:', outPngPath, `(${finalPng.length} bytes)`);

  const finalWebp = await sharp(finalPng).webp({ quality: 90 }).toBuffer();
  writeFileSync(outWebpPath, finalWebp);
  console.log('✅ Generated WebP:', outWebpPath, `(${finalWebp.length} bytes)`);
}

generateOgImage().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
