/*
 * Static validation of the course data — runs without a browser.
 *
 * Catches the mistakes that are easy to make while authoring lessons: a missing
 * solution, a duplicate id, an unknown check kind, a task without hints. Every
 * locale is validated, and the translation overlay is checked against the base
 * content: unknown ids, check lists that drifted apart, missing translations.
 * Behaviour (do the solutions actually pass?) is covered by tests/selftest.
 */
import { buildCourse, CONTENT_LOCALES } from '../src/course/index.js';
import { BASE_LOCALE, LOCALES } from '../src/i18n/index.js';
import { uz } from '../src/course/i18n/uz/index.js';

const OVERLAYS = { uz };

const KINDS = new Set([
  'exists', 'absent', 'count', 'text', 'html', 'attr', 'noAttr', 'prop', 'style',
  'cssRule', 'source', 'console', 'alert', 'noError', 'storage', 'interact', 'custom'
]);
const STEPS = new Set(['click', 'type', 'check', 'select', 'submit', 'key', 'event', 'wait', 'waitFor']);
const DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const EDITORS = new Set(['html', 'css', 'js']);
const TASKS_PER_LESSON = 5;

const problems = [];

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

function validateCourse(locale) {
  const course = buildCourse(locale);
  const lessonIds = new Set();
  const taskIds = new Set();

  for (const module of course.modules) {
  if (!module.id || !module.title) fail(`[${locale}] модуль`, 'нет id или title');

  for (const lesson of module.lessons) {
    const where = `[${locale}] урок ${lesson.number} (${lesson.id})`;

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

  if (course.totalTasks !== course.totalLessons * TASKS_PER_LESSON) {
    fail(`[${locale}] курс`, `${course.totalTasks} задач вместо ${course.totalLessons * TASKS_PER_LESSON}`);
  }

  return course;
}

/**
 * Compares a translation overlay with the base course: ids it invents, check
 * lists that no longer line up, and how much of the content it covers.
 */
function validateOverlay(locale, overlay, base) {
  const where = `[${locale}] перевод`;
  const stats = { lessons: 0, lessonsTotal: base.lessons.length, tasks: 0, tasksTotal: base.totalTasks, labels: 0, labelsTotal: 0 };

  Object.keys(overlay.modules || {}).forEach((id) => {
    if (!base.modules.some((module) => module.id === id)) fail(where, `нет модуля с id "${id}"`);
  });

  for (const lesson of base.lessons) {
    const translation = (overlay.lessons || {})[lesson.id];
    stats.labelsTotal += lesson.tasks.reduce((sum, task) => sum + task.checks.length, 0);
    if (!translation) continue;
    stats.lessons += 1;

    if (translation.theory && !Array.isArray(translation.theory)) fail(`${where} → ${lesson.id}`, 'theory должна быть массивом блоков');

    for (const taskId of Object.keys(translation.tasks || {})) {
      const task = lesson.tasks.find((entry) => entry.id === taskId);
      if (!task) {
        fail(`${where} → ${lesson.id}`, `нет задачи с id "${taskId}"`);
        continue;
      }
      stats.tasks += 1;

      const patches = translation.tasks[taskId].checks;
      if (patches !== undefined) {
        if (!Array.isArray(patches)) {
          fail(`${where} → ${taskId}`, 'checks должны быть массивом патчей (по индексу)');
        } else if (patches.length !== task.checks.length) {
          fail(`${where} → ${taskId}`, `патчей проверок ${patches.length}, а самих проверок ${task.checks.length} — перевод отстал от контента`);
        } else {
          stats.labels += patches.filter((patch) => patch && patch.label).length;
        }
      }

      const hints = translation.tasks[taskId].hints;
      if (hints !== undefined && (!Array.isArray(hints) || hints.length !== task.hints.length)) {
        fail(`${where} → ${taskId}`, `подсказок в переводе ${Array.isArray(hints) ? hints.length : '—'}, в оригинале ${task.hints.length}`);
      }
    }
  }

  Object.keys(overlay.lessons || {}).forEach((id) => {
    if (!base.lessons.some((lesson) => lesson.id === id)) fail(where, `нет урока с id "${id}"`);
  });

  return stats;
}

const base = validateCourse(BASE_LOCALE);
const coverage = [];

for (const locale of CONTENT_LOCALES) {
  if (locale === BASE_LOCALE) continue;
  validateCourse(locale);
  coverage.push({ locale, ...validateOverlay(locale, OVERLAYS[locale] || {}, base) });
}

LOCALES.forEach(({ id }) => {
  if (!CONTENT_LOCALES.includes(id)) fail('локали', `у локали "${id}" нет перевода контента`);
});

if (problems.length) {
  console.error(`✕ Найдено проблем: ${problems.length}\n`);
  problems.forEach((problem) => console.error(`  - ${problem}`));
  process.exit(1);
}

console.log(`✓ Курс валиден: ${base.totalLessons} уроков, ${base.totalTasks} задач, ${base.modules.length} модуля`);
coverage.forEach((entry) => {
  const percent = (part, total) => (total ? Math.round((part / total) * 100) : 100);
  console.log(
    `  перевод ${entry.locale}: уроки ${entry.lessons}/${entry.lessonsTotal} (${percent(entry.lessons, entry.lessonsTotal)}%), ` +
    `задачи ${entry.tasks}/${entry.tasksTotal} (${percent(entry.tasks, entry.tasksTotal)}%), ` +
    `метки проверок ${entry.labels}/${entry.labelsTotal} (${percent(entry.labels, entry.labelsTotal)}%)`
  );
});
