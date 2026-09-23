/*
 * Activity log: what the student actually did.
 *
 * The whole point of the log is the difference between code a student typed
 * and code that arrived in one go — a paste, or the "show solution" button.
 * Typing is therefore merged into bursts (otherwise a single task would
 * produce hundreds of entries), while a paste or a revealed solution is never
 * merged: that is exactly the event worth seeing later.
 *
 * Entries are stored in their own localStorage key, so the log can be wiped
 * without touching progress and progress without losing the log. Only ids and
 * numbers are stored — never localized text — so switching the language
 * re-renders the whole history in the new one.
 */

export const LOG_KEY = 'webdev-course:log:v1';

/** How many entries are kept; the oldest fall off the front. */
const LIMIT = 400;

/** Consecutive keystrokes closer than this become one entry. */
const MERGE_WINDOW = 15000;

const MERGEABLE = new Set(['type', 'delete']);

/** Everything the log can record, in the order the filters show them. */
export const LOG_KINDS = [
  'open',
  'type',
  'paste',
  'delete',
  'run',
  'check',
  'hint',
  'reset',
  'solution',
  'system'
];

export const LOG_GROUPS = {
  all: LOG_KINDS,
  code: ['type', 'paste', 'delete'],
  source: ['paste', 'solution'],
  checks: ['run', 'check']
};

let sequence = 0;

function read() {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((entry) => entry && entry.kind) : [];
  } catch (error) {
    return [];
  }
}

function write(entries) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(entries));
  } catch (error) {
    // Private mode or a full quota: the log keeps working for this session.
  }
}

export class ActivityLog {
  constructor() {
    this.entries = read();
    this.context = {};
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((entry) => entry !== callback);
    };
  }

  #commit() {
    write(this.entries);
    this.listeners.forEach((callback) => callback(this.entries));
  }

  /** Lesson/task every following entry belongs to. */
  setContext({ lessonId, lessonNumber, taskId, taskPosition }) {
    this.context = { lessonId, lessonNumber, taskId, taskPosition };
  }

  #mergeable(last, entry) {
    return (
      MERGEABLE.has(entry.kind) &&
      last.kind === entry.kind &&
      last.taskId === entry.taskId &&
      last.lang === entry.lang &&
      entry.at - last.at < MERGE_WINDOW
    );
  }

  /**
   * @param {string} kind one of LOG_KINDS
   * @param {object} data kind-specific payload: `lang`, `chars`, `passed`, `total`, `detail`
   */
  add(kind, data = {}) {
    const at = Date.now();
    const entry = { id: `${at}-${++sequence}`, at, kind, ...this.context, ...data };

    const last = this.entries[this.entries.length - 1];
    if (last && this.#mergeable(last, entry)) {
      last.at = at;
      last.chars = (last.chars || 0) + (entry.chars || 0);
      last.bursts = (last.bursts || 1) + 1;
    } else {
      this.entries.push(entry);
      if (this.entries.length > LIMIT) this.entries.splice(0, this.entries.length - LIMIT);
    }

    this.#commit();
    return entry;
  }

  /** Newest first — the order the log is read in. */
  recent(kinds) {
    const list = kinds ? this.entries.filter((entry) => kinds.includes(entry.kind)) : this.entries;
    return list.slice().reverse();
  }

  count(kinds) {
    return kinds ? this.entries.filter((entry) => kinds.includes(entry.kind)).length : this.entries.length;
  }

  get bytes() {
    try {
      return (localStorage.getItem(LOG_KEY) || '').length;
    } catch (error) {
      return 0;
    }
  }

  export() {
    return JSON.stringify(this.entries, null, 2);
  }

  clear() {
    this.entries = [];
    try {
      localStorage.removeItem(LOG_KEY);
    } catch (error) {
      // Nothing to remove — the listeners below still see an empty log.
    }
    this.listeners.forEach((callback) => callback(this.entries));
  }
}
