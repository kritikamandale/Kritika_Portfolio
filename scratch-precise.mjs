import { chromium } from 'file:///C:/Users/kriti/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const outDir = 'C:/Users/kriti/AppData/Local/Temp/claude/d--Portfolio/38bed688-4788-438f-a95f-f30047f7dbf1/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3010', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const gsap = window.gsap;
  const ST = gsap && gsap.core && gsap.core.globals && gsap.core.globals().ScrollTrigger;
  const triggers = ST ? ST.getAll() : [];
  return triggers.map(t => ({
    triggerId: t.trigger && (t.trigger.id || t.trigger.tagName + '.' + t.trigger.className),
    start: t.start,
    end: t.end,
  }));
});
console.log('triggers (via window.gsap):', JSON.stringify(info));

// Fallback: directly inspect the certificates + achievements section heights and sticky heights
const layout = await page.evaluate(() => {
  const get = (id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const sticky = el.querySelector(':scope > div');
    const stickyRect = sticky ? sticky.getBoundingClientRect() : null;
    return {
      sectionHeight: el.offsetHeight,
      sectionTop: rect.top + window.scrollY,
      stickyHeight: stickyRect ? stickyRect.height : null,
    };
  };
  return { achievements: get('achievements'), certificates: get('certificates') };
});
console.log('layout:', JSON.stringify(layout, null, 2));

await browser.close();
