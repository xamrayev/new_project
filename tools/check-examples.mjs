/*
 * Headless driver for tests/examples.html: runs every «Sinab ko‘rish» example
 * of the class sessions in the real sandbox and fails if any throws.
 *
 * Usage:
 *   node tools/check-examples.mjs              # all examples (network needed for CDN ones)
 *   node tools/check-examples.mjs --only=m7    # one topic
 *   node tools/check-examples.mjs --offline=1  # skip examples that load Vue / sql.js from a CDN
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const CHROMIUM = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean).find((path) => existsSync(path));

if (!CHROMIUM) {
  console.error('Chromium topilmadi — CHROMIUM_PATH ni ko‘rsating.');
  process.exit(1);
}

const query = new URLSearchParams();
for (const argument of process.argv.slice(2)) {
  const match = argument.match(/^--(only|offline)=(.+)$/);
  if (match) query.set(match[1], match[2]);
}

const PORT = 4600 + Math.floor(Math.random() * 300);
const server = spawn(process.execPath, ['tools/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((resolve) => setTimeout(resolve, 700));

const browser = await chromium.launch({ executablePath: CHROMIUM });
let exitCode = 0;

try {
  const page = await browser.newPage();
  page.on('pageerror', (error) => console.error('  [page error]', error.message));
  await page.goto(`http://localhost:${PORT}/tests/examples.html?${query}`);
  await page.waitForFunction(() => Boolean(window.__EXAMPLES__), null, { timeout: 15 * 60 * 1000 });
  const result = await page.evaluate(() => window.__EXAMPLES__);

  if (result.ok) {
    console.log(`✓ ${result.total} ta misol sandboxda xatosiz ishladi (${result.seconds} s)`);
  } else {
    console.error(`✕ ${result.failures.length}/${result.total} ta misolda xato:\n`);
    result.failures.forEach((failure) => console.error(`  - ${failure}`));
    exitCode = 1;
  }
} finally {
  await browser.close();
  server.kill();
}

process.exit(exitCode);
