import { chromium } from 'file:///C:/Users/kriti/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const outDir = 'C:/Users/kriti/AppData/Local/Temp/claude/d--Portfolio/38bed688-4788-438f-a95f-f30047f7dbf1/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3010', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

// ---- ACHIEVEMENTS: scroll to just before the section, then wheel through it ----
await page.evaluate(() => {
  const el = document.getElementById('achievements');
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top - 50);
});
await page.waitForTimeout(800);

for (let i = 0; i < 34; i++) {
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(90);
  if (i % 3 === 0) {
    await page.screenshot({ path: `${outDir}/ach2-${String(i).padStart(2,'0')}.png` });
  }
}
console.log('achievements done');

// jump past achievements fully into certificates area to reset for the next test
await page.evaluate(() => {
  const el = document.getElementById('certificates');
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top - 50);
});
await page.waitForTimeout(800);

for (let i = 0; i < 34; i++) {
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(90);
  if (i % 3 === 0) {
    await page.screenshot({ path: `${outDir}/cert2-${String(i).padStart(2,'0')}.png` });
  }
}
console.log('certificates done');

await browser.close();
