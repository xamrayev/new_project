/*
 * Progress store. Everything lives in localStorage under a single key so the
 * whole state can be exported, imported or wiped in one go.
 *
 * Shape:
 * {
 *   version: 1,
 *   tasks:  { "<lessonId>": { "<taskId>": true } },
 *   drafts: { "<lessonId>:<taskId>": { html, css, js } },
 *   last:   { lessonId, taskId },
 *   theme:  "dark" | "light"
 * }
 */

const KEY = 'webdev-course:v1';
const EMPTY = { version: 1, tasks: {}, drafts: {}, last: null, theme: 'dark' };

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(EMPTY);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(EMPTY), ...parsed };
  } catch (error) {
    return structuredClone(EMPTY);
  }
}

function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (error) {
    // Private mode / quota exceeded: the app keeps working, progress just
    // lives for this session only.
  }
}

export class Progress {
  constructor() {
    this.state = read();
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((entry) => entry !== callback);
    };
  }

  #commit() {
    write(this.state);
    this.listeners.forEach((callback) => callback(this.state));
  }

  /* ------------------------------------------------------------------ tasks */

  isTaskDone(lessonId, taskId) {
    return Boolean(this.state.tasks[lessonId] && this.state.tasks[lessonId][taskId]);
  }

  markTask(lessonId, taskId, done = true) {
    const already = this.isTaskDone(lessonId, taskId);
    if (already === done) return false;
    if (!this.state.tasks[lessonId]) this.state.tasks[lessonId] = {};
    if (done) this.state.tasks[lessonId][taskId] = true;
    else delete this.state.tasks[lessonId][taskId];
    this.#commit();
    return true;
  }

  lessonStats(lesson) {
    const done = lesson.tasks.filter((task) => this.isTaskDone(lesson.id, task.id)).length;
    return { done, total: lesson.tasks.length, complete: done === lesson.tasks.length };
  }

  moduleStats(lessons) {
    return lessons.reduce(
      (acc, lesson) => {
        const stats = this.lessonStats(lesson);
        acc.tasksDone += stats.done;
        acc.tasksTotal += stats.total;
        acc.lessonsDone += stats.complete ? 1 : 0;
        acc.lessonsTotal += 1;
        return acc;
      },
      { tasksDone: 0, tasksTotal: 0, lessonsDone: 0, lessonsTotal: 0 }
    );
  }

  /* ----------------------------------------------------------------- drafts */

  draftKey(lessonId, taskId) { return `${lessonId}:${taskId}`; }

  getDraft(lessonId, taskId) {
    return this.state.drafts[this.draftKey(lessonId, taskId)] || null;
  }

  saveDraft(lessonId, taskId, source) {
    this.state.drafts[this.draftKey(lessonId, taskId)] = {
      html: source.html || '',
      css: source.css || '',
      js: source.js || ''
    };
    write(this.state);
  }

  clearDraft(lessonId, taskId) {
    delete this.state.drafts[this.draftKey(lessonId, taskId)];
    write(this.state);
  }

  /* --------------------------------------------------------------- position */

  get last() { return this.state.last; }

  setLast(lessonId, taskId) {
    this.state.last = { lessonId, taskId };
    write(this.state);
  }

  /* ------------------------------------------------------------------ theme */

  get theme() { return this.state.theme || 'dark'; }

  setTheme(theme) {
    this.state.theme = theme;
    this.#commit();
  }

  /* ------------------------------------------------------------------ admin */

  export() { return JSON.stringify(this.state, null, 2); }

  resetAll() {
    this.state = structuredClone(EMPTY);
    this.#commit();
  }
}
