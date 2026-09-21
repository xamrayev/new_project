/*
 * Course assembly.
 *
 * Module files hold the authored content; this file normalizes it once so the
 * rest of the app can rely on a complete shape: every task has a difficulty,
 * hints, a full starter source and a full solution source.
 */
import { htmlModule } from './modules/html.js';
import { cssModule } from './modules/css.js';
import { javascriptModule } from './modules/javascript.js';
import { projectModule } from './modules/project.js';

const EMPTY_SOURCE = { html: '', css: '', js: '' };

function normalizeTask(lesson, task, position) {
  const starter = { ...EMPTY_SOURCE, ...(lesson.starter || {}), ...(task.starter || {}) };
  return {
    difficulty: 'easy',
    hints: [],
    checks: [],
    ...task,
    position,
    starter,
    // A task may tighten the lesson's sandbox (its own mock API, its own
    // pre-filled localStorage) without repeating the rest of it.
    sandbox: { ...(lesson.sandbox || {}), ...(task.sandbox || {}) },
    // Authors only spell out the files a solution actually changes.
    solution: { ...starter, ...(task.solution || {}) }
  };
}

function normalizeLesson(lesson, moduleInfo, number) {
  return {
    editors: ['html'],
    sandbox: {},
    theory: [],
    ...lesson,
    number,
    moduleId: moduleInfo.id,
    moduleTitle: moduleInfo.title,
    tasks: lesson.tasks.map((task, index) => normalizeTask(lesson, task, index + 1))
  };
}

let counter = 0;
export const MODULES = [htmlModule, cssModule, javascriptModule, projectModule].map((moduleInfo) => ({
  ...moduleInfo,
  lessons: moduleInfo.lessons.map((lesson) => normalizeLesson(lesson, moduleInfo, ++counter))
}));

export const LESSONS = MODULES.flatMap((moduleInfo) => moduleInfo.lessons);
export const TOTAL_LESSONS = LESSONS.length;
export const TOTAL_TASKS = LESSONS.reduce((sum, lesson) => sum + lesson.tasks.length, 0);

export function getLesson(id) {
  return LESSONS.find((lesson) => lesson.id === id) || null;
}

export function getLessonByNumber(number) {
  return LESSONS.find((lesson) => lesson.number === number) || null;
}

export function getTask(lesson, taskId) {
  return lesson.tasks.find((task) => task.id === taskId) || null;
}

export function neighbours(lesson) {
  return {
    previous: getLessonByNumber(lesson.number - 1),
    next: getLessonByNumber(lesson.number + 1)
  };
}
