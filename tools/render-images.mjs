/*
 * Renders the raster images the home page needs, from HTML/SVG, with Chromium:
 *
 *   assets/og-image-uz.png, assets/og-image-ru.png   1200×630 link previews
 *   assets/icon-192.png, assets/icon-512.png         web manifest icons
 *   assets/apple-touch-icon.png                      180×180, iOS home screen
 *   assets/favicon-32.png                            PNG fallback favicon
 *
 * Numbers on the preview come from the course. Run after changing the logo or
 * the course size:  npm run build:images
 */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { buildCourse } from '../src/course/index.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const CHROMIUM = [
  process.env.CHROMIUM_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome'
].filter(Boolean).find((path) => existsSync(path));

if (!CHROMIUM) {
  console.error('✕ Chromium topilmadi — CHROMIUM_PATH ni ko‘rsating');
  process.exit(1);
}

const logo = await readFile(`${ROOT}assets/favicon.svg`, 'utf8');
const course = buildCourse('uz');
const checks = course.lessons.reduce((sum, l) => sum + l.tasks.reduce((a, t) => a + t.checks.length, 0), 0);

const OG = {
  uz: {
    eyebrow: 'IT ga qadam qo‘yayotgan yoshlar uchun',
    title: 'Veb-dasturlashni <span>amalda</span> o‘rganing',
    sub: 'HTML · CSS · JavaScript — noldan, brauzerning o‘zida',
    stats: [[course.totalLessons, 'dars'], [course.totalTasks, 'topshiriq'], [checks, 'avtotekshiruv']],
    lab: 'NazarAI laboratoriyasi',
    uni: 'University of Business and Science · Namangan filiali'
  },
  ru: {
    eyebrow: 'Для молодёжи, которая делает первые шаги в IT',
    title: 'Изучайте веб-разработку <span>на практике</span>',
    sub: 'HTML · CSS · JavaScript — с нуля, прямо в браузере',
    stats: [[course.totalLessons, 'урока'], [course.totalTasks, 'задач'], [checks, 'автопроверки']],
    lab: 'Лаборатория NazarAI',
    uni: 'University of Business and Science · Наманганский филиал'
  }
};

function ogHtml(t) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #e5e9f5;
    background:
      radial-gradient(55% 70% at 88% 12%, rgb(59 130 246 / .38), transparent 70%),
      radial-gradient(45% 60% at 5% 100%, rgb(139 92 246 / .30), transparent 70%),
      #0b1020;
    padding: 64px 72px;
    display: flex; flex-direction: column;
  }
  .top { display: flex; align-items: center; gap: 16px; font-size: 26px; font-weight: 700; }
  .top svg { width: 56px; height: 56px; }
  .top small { display: block; font-size: 15px; color: #9aa6c4; letter-spacing: .08em; text-transform: uppercase; }
  .eyebrow { margin-top: 44px; font-size: 22px; font-weight: 700; color: #6ea8fe; letter-spacing: .04em; text-transform: uppercase; }
  h1 { margin-top: 14px; font-size: 68px; line-height: 1.05; font-weight: 800; letter-spacing: -.03em; max-width: 1000px; }
  h1 span { background: linear-gradient(120deg, #6ea8fe, #a78bfa); -webkit-background-clip: text; color: transparent; }
  .sub { margin-top: 18px; font-size: 28px; color: #9aa6c4; }
  .bottom { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; }
  .stats { display: flex; gap: 14px; }
  .stats div { padding: 14px 20px; border: 1px solid #243049; border-radius: 14px; background: rgb(17 24 39 / .8); }
  .stats b { display: block; font-size: 34px; font-weight: 800; }
  .stats span { font-size: 17px; color: #9aa6c4; }
  .org { text-align: right; font-size: 19px; color: #9aa6c4; line-height: 1.45; }
  .org b { color: #e5e9f5; font-size: 22px; }
</style></head><body>
  <div class="top">${logo}<div>Web Development<small>by NazarAI</small></div></div>
  <p class="eyebrow">${t.eyebrow}</p>
  <h1>${t.title}</h1>
  <p class="sub">${t.sub}</p>
  <div class="bottom">
    <div class="stats">${t.stats.map(([n, label]) => `<div><b>${n}</b><span>${label}</span></div>`).join('')}</div>
    <div class="org"><b>${t.lab}</b><br>${t.uni}</div>
  </div>
</body></html>`;
}

const iconHtml = (size, padding = 0, background = 'transparent') => `<!doctype html><html><head><style>
  * { margin: 0; } html, body { width: ${size}px; height: ${size}px; background: ${background}; overflow: hidden; }
  body { display: grid; place-items: center; }
  svg { width: ${size - padding * 2}px; height: ${size - padding * 2}px; display: block; }
</style></head><body>${logo}</body></html>`;

const browser = await chromium.launch({ executablePath: CHROMIUM });
const shots = [];

try {
  for (const [locale, text] of Object.entries(OG)) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(ogHtml(text));
    const path = `assets/og-image-${locale}.png`;
    await page.screenshot({ path: ROOT + path });
    shots.push(path);
    await page.close();
  }

  const icons = [
    ['assets/icon-192.png', 192, 0],
    ['assets/icon-512.png', 512, 0],
    // iOS draws its own rounded mask, so give it a full-bleed square.
    ['assets/apple-touch-icon.png', 180, 0, '#3b82f6'],
    ['assets/favicon-32.png', 32, 0]
  ];
  for (const [path, size, padding, background] of icons) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(iconHtml(size, padding, background));
    await page.screenshot({ path: ROOT + path, omitBackground: !background });
    shots.push(path);
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`✓ Yaratildi: ${shots.join(', ')}`);
