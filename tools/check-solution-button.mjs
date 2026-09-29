/*
 * Clicks "Show solution" in the real app for every task, then "Check", and
 * reports any task where the button is missing or the loaded solution fails.
 * Also reloads once per lesson to confirm the revealed solution is saved as
 * the draft.
 *
 * Runs against the production build (dist/, served by `vite preview`), so
 * build first — `npm run test:solutions` does both.
 *
 * Usage: CHROMIUM_PATH=... node tools/check-solution-button.mjs [--lesson=id]
 *        DPR=1.8 ... simulates browser zoom (90% on a 2x screen); border widths
 *        then compute to fractions such as 0.55px.
 *        BROWSER=webkit ... runs in Safari's engine.
 */
import { spawn } from 'node:child_process';
import { chromium, webkit } from 'playwright-core';
import { buildCourse } from '../src/course/index.js';

const PORT = 4300 + Math.floor(Math.random() * 500);
const onlyLesson = (process.argv.find((a) => a.startsWith('--lesson=')) || '').split('=')[1];

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
await new Promise((resolve) => setTimeout(resolve, 1500));

const browser = process.env.BROWSER === 'webkit'
  ? await webkit.launch()
  : await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
const failures = [];
let tested = 0;

try {
  for (const locale of ['uz', 'ru']) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: Number(process.env.DPR) || 1
    });
    // Behave like a browser that silences native dialogs (Firefox "don't allow
    // prompts", blocking extensions): confirm() would return false. The app
    // must not depend on it.
    page.on('dialog', (dialog) => {
      failures.push(`[${locale}] native ${dialog.type()}() dialog used: ${dialog.message()}`);
      dialog.dismiss();
    });
    page.on('pageerror', (error) => failures.push(`[${locale}] page error: ${error.message}`));

    // Fix the language before the app boots.
    await page.addInitScript((lang) => {
      if (window !== window.top) return; // skip the sandboxed preview iframe
      if (!sessionStorage.getItem('__boot')) {
        localStorage.clear();
        sessionStorage.setItem('__boot', '1');
      }
      Object.defineProperty(navigator, 'language', { get: () => lang });
      Object.defineProperty(navigator, 'languages', { get: () => [lang] });
    }, locale);

    const course = buildCourse(locale);
    const lessons = course.modules.flatMap((module) => module.lessons);
    const showLabel = locale === 'uz' ? 'Yechimni ko‘rsatish' : 'Показать решение';

    await page.goto(`http://localhost:${PORT}/course.html#/mustaqil`);
    await page.waitForSelector('.task-panel__tools');

    for (const lesson of lessons) {
      if (onlyLesson && lesson.id !== onlyLesson) continue;

      for (const task of lesson.tasks) {
        const where = `[${locale}] ${lesson.id} #${task.position}`;
        tested++;
        const hash = `#/mustaqil/${lesson.id}/${task.position}`;
        await page.evaluate((target) => { location.hash = target; }, hash);
        await page.waitForFunction(
          (target) => location.hash === target && document.querySelector('.task-panel__tools'),
          hash
        );
        await page.waitForTimeout(150);

        const button = page.locator('.task-panel__tools button', { hasText: showLabel });
        if ((await button.count()) !== 1) {
          failures.push(`${where}: "${showLabel}" tugmasi topilmadi`);
          continue;
        }
        await button.click();
        const confirm = page.locator('.modal--confirm .btn--primary');
        try {
          await confirm.waitFor({ timeout: 3000 });
        } catch {
          failures.push(`${where}: tasdiq oynasi chiqmadi`);
          continue;
        }
        // Click like a person, not within the same frame the dialog appeared:
        // right after the preview iframe renders, Chrome can still route an
        // instant click to the (out-of-process) iframe underneath.
        await page.waitForTimeout(300);
        await confirm.click();
        try {
          await page.locator('.modal--confirm').waitFor({ state: 'detached', timeout: 3000 });
        } catch {
          const state = await page.evaluate(() => ({
            dialogs: document.querySelectorAll('.modal--confirm').length,
            active: document.activeElement?.outerHTML.slice(0, 80)
          }));
          failures.push(`${where}: tasdiq oynasi yopilmadi ${JSON.stringify(state)}`);
          await page.evaluate(() => document.querySelectorAll('.modal--confirm, .scrim--confirm').forEach((n) => n.remove()));
          continue;
        }
        await page.waitForTimeout(250);

        await page.locator('.task-panel__tools .btn--ok').first().click();
        try {
          await page.waitForSelector('.task-panel .banner', { timeout: 8000 });
        } catch {
          failures.push(`${where}: tekshiruv natijasi chiqmadi`);
          continue;
        }
        const ok = await page.locator('.task-panel .banner--ok').count();
        if (!ok) {
          const failed = await page.locator('.results li.fail').allInnerTexts();
          failures.push(`${where}: yechim tekshiruvdan o‘tmadi — ${failed.join(' | ')}`);
        }
      }

      // Revealed solution must survive a reload (saved as the draft).
      const last = lesson.tasks[lesson.tasks.length - 1];
      await page.reload();
      await page.waitForSelector('.task-panel__tools');
      await page.waitForTimeout(250);
      await page.locator('.task-panel__tools .btn--ok').first().click();
      await page.waitForSelector('.task-panel .banner', { timeout: 8000 }).catch(() => {});
      if (!(await page.locator('.task-panel .banner--ok').count())) {
        failures.push(`[${locale}] ${lesson.id} #${last.position}: qayta yuklashdan keyin yechim saqlanmadi`);
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}

if (failures.length) {
  console.error(`✕ ${failures.length} muammo (${tested} vazifa tekshirildi):`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}
console.log(`✓ "Yechimni ko‘rsatish" ${tested} ta vazifada ishlaydi (uz + ru), yechimlar tekshiruvdan o‘tadi va saqlanadi`);
