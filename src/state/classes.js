/*
 * Progress in the class sessions: which lectures were read and which steps of
 * each practical guide are done. Kept under its own key, next to the self-study
 * progress, so either can be wiped without touching the other.
 *
 * Shape:
 * {
 *   version: 1,
 *   read:  { "<lectureId>": true },
 *   steps: { "<practicalId>": { "<stepIndex>": true } }
 * }
 */

export const CLASSES_KEY = 'webdev-course:classes:v1';

const EMPTY = { version: 1, read: {}, steps: {} };

function read() {
  try {
    const raw = localStorage.getItem(CLASSES_KEY);
    if (!raw) return structuredClone(EMPTY);
    return { ...structuredClone(EMPTY), ...JSON.parse(raw) };
  } catch (error) {
    return structuredClone(EMPTY);
  }
}

function write(state) {
  try {
    localStorage.setItem(CLASSES_KEY, JSON.stringify(state));
  } catch (error) {
    // Private mode or a full quota: progress lives for this session only.
  }
}

export class ClassProgress {
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

  /* --------------------------------------------------------------- lectures */

  isRead(lectureId) {
    return Boolean(this.state.read[lectureId]);
  }

  setRead(lectureId, done = true) {
    if (done) this.state.read[lectureId] = true;
    else delete this.state.read[lectureId];
    this.#commit();
  }

  get readCount() { return Object.keys(this.state.read).length; }

  /* ------------------------------------------------------------- practicals */

  isStepDone(practicalId, index) {
    return Boolean(this.state.steps[practicalId] && this.state.steps[practicalId][index]);
  }

  toggleStep(practicalId, index) {
    const steps = this.state.steps[practicalId] || (this.state.steps[practicalId] = {});
    if (steps[index]) delete steps[index];
    else steps[index] = true;
    this.#commit();
  }

  stepsDone(practicalId) {
    return Object.keys(this.state.steps[practicalId] || {}).length;
  }

  /** A practical counts as done when every one of its steps is ticked. */
  isPracticalDone(practical) {
    return practical.steps.length > 0 && this.stepsDone(practical.id) >= practical.steps.length;
  }

  get stepCount() {
    return Object.values(this.state.steps).reduce((total, steps) => total + Object.keys(steps).length, 0);
  }

  /* ------------------------------------------------------------------ admin */

  get count() { return this.readCount + this.stepCount; }

  get bytes() {
    try {
      return (localStorage.getItem(CLASSES_KEY) || '').length;
    } catch (error) {
      return 0;
    }
  }

  export() { return JSON.stringify(this.state, null, 2); }

  clear() {
    this.state = structuredClone(EMPTY);
    this.#commit();
  }
}
