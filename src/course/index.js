/*
 * Course assembly.
 *
 * Module files hold the authored content in the base locale; this file
 * normalizes it (every task gets a difficulty, hints, a full starter and a full
 * solution) and applies the translation overlay for the requested locale.
 *
 * Checks stay in one place — a translation only overrides what a student reads:
 * lesson titles and theory, task wording and hints, check labels, and, where a
 * task expects a visible string, the literals inside starter, solution and
 * check expectations.
 */
import { htmlModule } from './modules/html.js';
import { cssModule } from './modules/css.js';
import { javascriptModule } from './modules/javascript.js';
import { projectModule } from './modules/project.js';
import { BASE_LOCALE } from '../i18n/index.js';
import { uz } from './i18n/uz/index.js';

const RAW_MODULES = [htmlModule, cssModule, javascriptModule, projectModule];
const OVERLAYS = { uz };
const EMPTY_SOURCE = { html: '', css: '', js: '' };

/** Applies an array of per-index patches to a list of checks. */
function patchChecks(checks, patches) {
  if (!Array.isArray(patches)) return checks;
  return checks.map((check, index) => {
    const patch = patches[index];
    if (!patch) return check;
    const merged = { ...check, ...patch };
    if (Array.isArray(check.then)) merged.then = patchChecks(check.then, patch.then);
    return merged;
  });
}

function normalizeTask(lesson, task, position, translation = {}) {
  const starter = {
    ...EMPTY_SOURCE,
    ...(lesson.starter || {}),
    ...(task.starter || {}),
    ...(translation.starter || {})
  };

  return {
    difficulty: 'easy',
    hints: [],
    checks: [],
    ...task,
    ...translation,
    position,
    starter,
    // Authors only spell out the files a solution actually changes.
    solution: { ...starter, ...(task.solution || {}), ...(translation.solution || {}) },
    // A task may tighten the lesson's sandbox (its own mock API, its own
    // pre-filled localStorage) without repeating the rest of it.
    sandbox: { ...(lesson.sandbox || {}), ...(task.sandbox || {}), ...(translation.sandbox || {}) },
    checks: patchChecks(task.checks || [], translation.checks)
  };
}

function normalizeLesson(lesson, moduleInfo, number, translation = {}) {
  const tasks = translation.tasks || {};
  return {
    editors: ['html'],
    sandbox: {},
    theory: [],
    ...lesson,
    ...translation,
    number,
    moduleId: moduleInfo.id,
    moduleTitle: moduleInfo.title,
    tasks: lesson.tasks.map((task, index) =>
      normalizeTask({ ...lesson, ...translation }, task, index + 1, tasks[task.id])
    )
  };
}

/**
 * Builds the whole course for one locale.
 * @param {string} locale
 */
export function buildCourse(locale = BASE_LOCALE) {
  const overlay = OVERLAYS[locale] || {};
  const lessonTranslations = overlay.lessons || {};
  const moduleTranslations = overlay.modules || {};

  let counter = 0;
  const modules = RAW_MODULES.map((moduleInfo) => {
    const translated = { ...moduleInfo, ...(moduleTranslations[moduleInfo.id] || {}) };
    return {
      ...translated,
      lessons: moduleInfo.lessons.map((lesson) =>
        normalizeLesson(lesson, translated, ++counter, lessonTranslations[lesson.id])
      )
    };
  });

  const lessons = modules.flatMap((moduleInfo) => moduleInfo.lessons);

  return {
    locale,
    modules,
    lessons,
    totalLessons: lessons.length,
    totalTasks: lessons.reduce((sum, lesson) => sum + lesson.tasks.length, 0),
    getLesson: (id) => lessons.find((lesson) => lesson.id === id) || null,
    getLessonByNumber: (number) => lessons.find((lesson) => lesson.number === number) || null,
    getTask: (lesson, taskId) => lesson.tasks.find((task) => task.id === taskId) || null,
    neighbours: (lesson) => ({
      previous: lessons.find((entry) => entry.number === lesson.number - 1) || null,
      next: lessons.find((entry) => entry.number === lesson.number + 1) || null
    })
  };
}

/** Every locale the course exists in: the authored base plus each overlay. */
export const CONTENT_LOCALES = [...new Set([BASE_LOCALE, ...Object.keys(OVERLAYS)])];

/** Raw, untranslated modules — used by tooling to diff a translation against the source. */
export { RAW_MODULES };
