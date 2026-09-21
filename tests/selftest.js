/*
 * End-to-end self-test.
 *
 * Two directions, both of which matter:
 *   - every authored solution is graded by its own checks and must pass;
 *   - every starter is graded too and must FAIL at least one check, otherwise
 *     the task is already solved before the student writes anything.
 *
 * Open tests/selftest.html in a browser, or run `npm test` to drive it headlessly.
 * Query parameters: ?lesson=<id>, ?from=<number>&to=<number> to narrow the run,
 * ?starters=0 to skip the starter pass.
 */
import { LESSONS } from '../src/course/index.js';
import { SandboxRunner } from '../src/playground/runner.js';

const params = new URLSearchParams(location.search);
const only = params.get('lesson');
const from = Number(params.get('from') || 1);
const to = Number(params.get('to') || Infinity);
const checkStarters = params.get('starters') !== '0';

const summary = document.querySelector('#summary');
const report = document.querySelector('#report');
const runner = new SandboxRunner(document.querySelector('#frame-host iframe'));

const lessons = LESSONS.filter(
  (lesson) => (!only || lesson.id === only) && lesson.number >= from && lesson.number <= to
);

const failures = [];
let checked = 0;
let passedTasks = 0;
let totalTasks = 0;

/** Same check, with the generous async waits trimmed for the starter pass. */
function impatient(check) {
  const trimmed = { ...check, waitMs: Math.min(check.waitMs === undefined ? 200 : check.waitMs, 600) };
  if (Array.isArray(check.then)) trimmed.then = check.then.map(impatient);
  return trimmed;
}

function line(parent, text, ok, why) {
  const row = document.createElement('div');
  row.className = `row ${ok ? 'ok' : 'bad'}`;
  row.textContent = `${ok ? '✓' : '✕'} ${text}`;
  if (why) {
    const note = document.createElement('span');
    note.className = 'why';
    note.textContent = ` — ${why}`;
    row.append(note);
  }
  parent.append(row);
  return row;
}

async function runTask(lesson, task, block) {
  runner.setConfig({ ...task.sandbox, storageSeed: { ...(task.sandbox.storageSeed || {}) } });
  const results = await runner.check(task.solution, task.checks);
  checked += results.length;

  const bad = results.filter((result) => !result.ok);
  let ok = bad.length === 0;
  totalTasks += 1;

  line(block, `${lesson.number}.${task.position} ${task.title} (${results.length} проверок)`, ok);

  bad.forEach((result) => {
    failures.push(`${lesson.number}.${task.position} ${task.id} → ${result.label}: ${result.message}`);
    line(block, `    ${result.label}`, false, result.message);
  });

  if (checkStarters) {
    runner.setConfig({ ...task.sandbox, storageSeed: { ...(task.sandbox.storageSeed || {}) } });
    // Stop at the first failing check and keep waits short: this pass only asks
    // "is the task already solved?", so there is nothing to learn from the rest.
    const starterResults = await runner.check(task.starter, task.checks.map(impatient), { stopEarly: true });
    checked += starterResults.length;

    if (starterResults.length === task.checks.length && starterResults.every((result) => result.ok)) {
      ok = false;
      failures.push(`${lesson.number}.${task.position} ${task.id} → стартовый код уже проходит все проверки`);
      line(block, '    стартовый код уже проходит все проверки', false, 'задача решается сама собой');
    }
  }

  if (ok) passedTasks += 1;
}

async function run() {
  const started = Date.now();

  for (const lesson of lessons) {
    const block = document.createElement('section');
    block.className = 'lesson';
    const title = document.createElement('h3');
    title.textContent = `Урок ${lesson.number}. ${lesson.title}`;
    block.append(title);
    report.append(block);

    for (const task of lesson.tasks) {
      await runTask(lesson, task, block);
      summary.textContent = `Проверено задач: ${totalTasks} · ошибок: ${failures.length}`;
    }
  }

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  const ok = failures.length === 0;
  summary.textContent = ok
    ? `✓ Все ${passedTasks} задач проходят собственные проверки (${checked} проверок, ${seconds} c)`
    : `✕ Задач с ошибками: ${totalTasks - passedTasks} из ${totalTasks} (${failures.length} непройденных проверок, ${seconds} c)`;
  summary.style.color = ok ? 'var(--ok)' : 'var(--err)';

  window.__SELFTEST__ = { ok, totalTasks, passedTasks, checked, failures, seconds };
  document.title = ok ? 'self-test: ok' : `self-test: ${failures.length} ошибок`;
}

run().catch((error) => {
  summary.textContent = `Self-test упал: ${error.message}`;
  window.__SELFTEST__ = { ok: false, failures: [String(error && error.stack || error)] };
});
