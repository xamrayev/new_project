/*
 * Headless driver for tests/selftest.html.
 *
 * Serves the project, opens the self-test page in Chromium and fails the run if
 * any authored solution does not satisfy its own checks.
 *
 * Usage:
 *   node tools/run-selftest.mjs                 # whole course
 *   node tools/run-selftest.mjs --lesson=js-dom # one lesson
 *   node tools/run-selftest.mjs --from=10 --to=18
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = Number(process.env.PORT || 4199);
const TIMEOUT_MS = Number(process.env.SELFTEST_TIMEOUT || 600000);

const CHROMIUM_CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome'
].filter(Boolean);

function findChromium() {
  return CHROMIUM_CANDIDATES.find((path) => existsSync(path)) || null;
}

function queryFromArgs() {
  const query = new URLSearchParams();
  for (const argument of process.argv.slice(2)) {
    const match = argument.match(/^--(lesson|from|to)=(.+)$/);
    if (match) query.set(match[1], match[2]);
  }
  const text = query.toString();
  return text ? `?${text}` : '';
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (error) {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  return false;
}

const server = spawn(process.execPath, ['tools/serve.mjs', String(PORT)], {
  stdio: ['ignore', 'ignore', 'inherit']
});

let browser = null;
let exitCode = 0;

try {
  if (!(await waitForServer(`http://localhost:${PORT}/index.html`))) {
    throw new Error('локальный сервер не поднялся');
  }

  const executablePath = findChromium();
  if (!executablePath) {
    throw new Error(`Chromium не найден. Проверенные пути:\n  ${CHROMIUM_CANDIDATES.join('\n  ')}`);
  }

  browser = await chromium.launch({
    executablePath,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', (error) => console.error('  [page error]', error.message));

  const url = `http://localhost:${PORT}/tests/selftest.html${queryFromArgs()}`;
  console.log(`Открываю ${url}`);
  await page.goto(url, { waitUntil: 'load' });

  await page.waitForFunction(() => Boolean(window.__SELFTEST__), null, { timeout: TIMEOUT_MS });
  const result = await page.evaluate(() => window.__SELFTEST__);

  if (result.ok) {
    console.log(`\n✓ ${result.passedTasks}/${result.totalTasks} задач проходят собственные проверки (${result.checked} проверок, ${result.seconds} c)`);
  } else {
    console.error(`\n✕ Непройденных проверок: ${result.failures.length} (${result.passedTasks}/${result.totalTasks} задач в порядке)\n`);
    result.failures.forEach((failure) => console.error(`  - ${failure}`));
    exitCode = 1;
  }
} catch (error) {
  console.error(`\n✕ Self-test не выполнен: ${error.message}`);
  exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.kill();
}

process.exit(exitCode);
