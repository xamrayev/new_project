/*
 * Static validation of the course data — runs without a browser.
 *
 * Catches the mistakes that are easy to make while authoring lessons: a missing
 * solution, a duplicate id, an unknown check kind, a task without hints.
 * Behaviour (do the solutions actually pass?) is covered by tests/selftest.
 */
import { MODULES, LESSONS, TOTAL_LESSONS, TOTAL_TASKS } from '../src/course/index.js';

const KINDS = new Set([
  'exists', 'absent', 'count', 'text', 'html', 'attr', 'noAttr', 'prop', 'style',
  'cssRule', 'source', 'console', 'alert', 'noError', 'storage', 'interact', 'custom'
]);
const STEPS = new Set(['click', 'type', 'check', 'select', 'submit', 'key', 'event', 'wait', 'waitFor']);
const DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const EDITORS = new Set(['html', 'css', 'js']);
const TASKS_PER_LESSON = 5;

const problems = [];
const lessonIds = new Set();
const taskIds = new Set();

function fail(where, message) {
  problems.push(`${where}: ${message}`);
}

function validateCheck(where, check) {
  if (!check.label) fail(where, 'у проверки нет label');
  if (!KINDS.has(check.kind)) fail(where, `неизвестный тип проверки "${check.kind}"`);

  if (['exists', 'absent', 'count', 'text', 'html', 'attr', 'noAttr', 'prop', 'style'].includes(check.kind) && !check.selector) {
    fail(where, `проверке "${check.kind}" нужен selector`);
  }
  if ((check.kind === 'attr' || check.kind === 'noAttr') && !check.name) fail(where, 'у attr-проверки нет name');
  if (check.kind === 'style' && !check.prop) fail(where, 'у style-проверки нет prop');
  if (check.kind === 'storage' && !check.key) fail(where, 'у storage-проверки нет key');
  if (check.kind === 'custom' && typeof check.fn !== 'string') fail(where, 'у custom-проверки нет тела fn');
  if (check.kind === 'source' && !['html', 'css', 'js', undefined].includes(check.lang)) {
    fail(where, `у source-проверки неизвестный lang "${check.lang}"`);
  }
  if (check.matches) {
    try {
      new RegExp(check.matches);
    } catch (error) {
      fail(where, `некорректное регулярное выражение: ${check.matches}`);
    }
  }
  if (check.kind === 'custom') {
    try {
      new Function('ctx', check.fn);
    } catch (error) {
      fail(where, `тело custom-проверки не компилируется: ${error.message}`);
    }
  }
  if (check.kind === 'interact') {
    if (!Array.isArray(check.steps) || !check.steps.length) fail(where, 'у interact-проверки нет шагов');
    (check.steps || []).forEach((step, index) => {
      if (!STEPS.has(step.do)) fail(where, `шаг ${index + 1}: неизвестное действие "${step.do}"`);
      if (step.do !== 'wait' && !step.selector) fail(where, `шаг ${index + 1}: нет selector`);
    });
    if (!Array.isArray(check.then) || !check.then.length) fail(where, 'у interact-проверки нет вложенных проверок');
    (check.then || []).forEach((inner, index) => validateCheck(`${where} → then[${index + 1}]`, inner));
  }
}

for (const module of MODULES) {
  if (!module.id || !module.title) fail('модуль', 'нет id или title');

  for (const lesson of module.lessons) {
    const where = `урок ${lesson.number} (${lesson.id})`;

    if (lessonIds.has(lesson.id)) fail(where, 'повторяющийся id урока');
    lessonIds.add(lesson.id);

    if (!lesson.title) fail(where, 'нет заголовка');
    if (!lesson.summary) fail(where, 'нет краткого описания');
    if (!lesson.theory.length) fail(where, 'пустая теория');
    if (!lesson.editors.length) fail(where, 'не указаны редакторы');
    lesson.editors.forEach((editor) => {
      if (!EDITORS.has(editor)) fail(where, `неизвестный редактор "${editor}"`);
    });

    if (lesson.tasks.length !== TASKS_PER_LESSON) {
      fail(where, `${lesson.tasks.length} задач вместо ${TASKS_PER_LESSON}`);
    }

    lesson.tasks.forEach((task, index) => {
      const taskWhere = `${where}, задача ${index + 1} (${task.id})`;

      if (taskIds.has(task.id)) fail(taskWhere, 'повторяющийся id задачи');
      taskIds.add(task.id);

      if (!task.title) fail(taskWhere, 'нет заголовка');
      if (!task.description) fail(taskWhere, 'нет условия');
      if (!DIFFICULTIES.has(task.difficulty)) fail(taskWhere, `неизвестная сложность "${task.difficulty}"`);
      if (!task.checks.length) fail(taskWhere, 'нет ни одной проверки');
      if (!task.hints.length) fail(taskWhere, 'нет подсказок');

      const solution = task.solution;
      const hasSolution = ['html', 'css', 'js'].some((lang) => (solution[lang] || '').trim());
      if (!hasSolution) fail(taskWhere, 'пустое решение');

      // A solution may only use editors the lesson actually opens.
      ['html', 'css', 'js'].forEach((lang) => {
        const changed = (solution[lang] || '') !== (task.starter[lang] || '');
        if (changed && !lesson.editors.includes(lang)) {
          fail(taskWhere, `решение меняет ${lang.toUpperCase()}, но этот редактор закрыт в уроке`);
        }
      });

      task.checks.forEach((check, position) => validateCheck(`${taskWhere} → проверка ${position + 1}`, check));
    });

    const difficulties = lesson.tasks.map((task) => task.difficulty);
    if (difficulties[0] !== 'easy') fail(where, 'первая задача должна быть лёгкой');
    if (difficulties[difficulties.length - 1] !== 'hard') fail(where, 'последняя задача должна быть challenge (hard)');
  }
}

if (LESSONS.length !== TOTAL_LESSONS) fail('курс', 'несовпадение количества уроков');
if (TOTAL_TASKS !== TOTAL_LESSONS * TASKS_PER_LESSON) {
  fail('курс', `${TOTAL_TASKS} задач вместо ${TOTAL_LESSONS * TASKS_PER_LESSON}`);
}

if (problems.length) {
  console.error(`✕ Найдено проблем: ${problems.length}\n`);
  problems.forEach((problem) => console.error(`  - ${problem}`));
  process.exit(1);
}

console.log(`✓ Курс валиден: ${TOTAL_LESSONS} уроков, ${TOTAL_TASKS} задач, ${MODULES.length} модуля`);
