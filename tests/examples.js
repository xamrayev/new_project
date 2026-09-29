/*
 * Runs every «Sinab ko‘rish» example of the lectures and practical guides in
 * the real sandbox and fails on what a student would see go wrong: an
 * uncaught error, an unhandled rejection or a page that never finishes loading.
 * Examples may log with console.error on purpose (error-handling demos), so
 * only uncaught failures count.
 *
 * Open tests/examples.html in a browser, or run `npm run test:examples`.
 * ?only=m7 narrows the run to one topic; ?offline=1 skips examples that need
 * the network (Vue and sql.js from a CDN).
 */
import { LECTURES, PRACTICALS } from '../src/classes/index.js';
import { sourceOf } from '../src/composables/sandbox.js';
import { SandboxRunner } from '../src/playground/runner.js';
import { t } from '../src/i18n/index.js';

const params = new URLSearchParams(location.search);
const only = params.get('only');
const offline = params.get('offline') === '1';

const summary = document.querySelector('#summary');
const report = document.querySelector('#report');
const runner = new SandboxRunner(document.querySelector('#frame-host iframe'));

const FROZEN = t('runner.frozen');
const UNCAUGHT = /^(Uncaught|Unhandled promise rejection|Script error)/;

function collect(item) {
  const found = [];
  const walk = (where, blocks = []) => blocks.forEach((block, index) => {
    if (block && typeof block === 'object' && 'code' in block && block.run) found.push({ where: `${where} #${index + 1}`, block });
  });
  if (item.kind === 'lecture') {
    item.sections.forEach((section) => walk(`${item.code} «${section.title}»`, section.blocks));
    walk(`${item.code} xulosa`, item.conclusion);
  } else {
    walk(`${item.code} nazariya`, item.theory);
    item.steps.forEach((step, n) => walk(`${item.code} qadam ${n + 1}`, step.blocks));
    item.tasks.forEach((task, n) => walk(`${item.code} topshiriq ${n + 1}`, task.blocks));
  }
  return found;
}

const needsNetwork = (block) => /<script[^>]+src=["']https?:/i.test(JSON.stringify(block.run === true ? block.code : block.run));

function line(text, ok, why) {
  const row = document.createElement('div');
  row.className = `row ${ok ? 'ok' : 'bad'}`;
  row.textContent = `${ok ? '✓' : '✕'} ${text}`;
  if (why) {
    const note = document.createElement('span');
    note.className = 'why';
    note.textContent = ` — ${why}`;
    row.append(note);
  }
  report.append(row);
}

async function runExample({ where, block }) {
  const lines = [];
  const listener = (entry) => lines.push(entry);
  runner.listeners.console.push(listener);
  try {
    runner.setConfig(block.sandbox || {});
    await runner.render(sourceOf(block));
    // Timers, fetch mocks and CDN scripts get time to settle.
    await new Promise((resolve) => setTimeout(resolve, needsNetwork(block) ? 3500 : 2600));
  } finally {
    runner.listeners.console.splice(runner.listeners.console.indexOf(listener), 1);
  }
  const problems = lines
    .filter((entry) => (entry.level === 'error' && UNCAUGHT.test(entry.text)) || entry.text === FROZEN)
    .map((entry) => entry.text);
  return { where, problems, output: lines.length };
}

const started = performance.now();
const items = [...LECTURES, ...PRACTICALS].filter((item) => !only || item.id === only);
const examples = items.flatMap(collect).filter(({ block }) => !(offline && needsNetwork(block)));
const failures = [];

for (let i = 0; i < examples.length; i++) {
  summary.textContent = `${i + 1}/${examples.length}: ${examples[i].where}`;
  const result = await runExample(examples[i]);
  const ok = result.problems.length === 0;
  line(result.where, ok, ok ? `${result.output} ta konsol yozuvi` : result.problems.join(' | '));
  if (!ok) failures.push(`${result.where}: ${result.problems.join(' | ')}`);
}

const seconds = Math.round((performance.now() - started) / 1000);
summary.textContent = failures.length
  ? `✕ ${failures.length}/${examples.length} ta misolda xato (${seconds} s)`
  : `✓ ${examples.length} ta misol xatosiz ishladi (${seconds} s)`;

window.__EXAMPLES__ = { ok: failures.length === 0, total: examples.length, failures, seconds };
