/*
 * The log view and the cache section.
 *
 * The same view serves the log pane and the log modal: it subscribes to the
 * store and re-renders whenever something is recorded. Entries hold ids and
 * numbers only, so every label here is produced at render time and follows the
 * interface language.
 */
import { LOG_GROUPS } from '../state/activity-log.js';
import { cacheReport, clearCache, formatBytes, totalBytes } from '../state/cache.js';
import { t } from '../i18n/index.js';

const ICONS = {
  open: '📄',
  type: '✎',
  paste: '📋',
  delete: '⌫',
  run: '▶',
  check: '✓',
  hint: '💡',
  reset: '↻',
  solution: '🔑',
  system: '⚙'
};

const FILTERS = ['all', 'code', 'source', 'checks'];

function formatTime(at) {
  const date = new Date(at);
  // 24-hour everywhere: the log is read next to the lesson, not in a locale-aware report.
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  if (sameDay) return time;
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')} ${time}`;
}

/** The one line that says what happened, plus the grey detail after it. */
function describe(entry) {
  const lang = entry.lang ? entry.lang.toUpperCase() : '';
  const notes = [];

  switch (entry.kind) {
    case 'type':
      if (entry.chars) notes.push(t('log.chars', { chars: entry.chars }));
      break;
    case 'paste':
      if (entry.chars) notes.push(t('log.chars', { chars: entry.chars }));
      break;
    case 'delete':
      if (entry.chars) notes.push(t('log.charsRemoved', { chars: entry.chars }));
      break;
    case 'check':
      notes.push(t('log.checkResult', { passed: entry.passed || 0, total: entry.total || 0 }));
      break;
    case 'hint':
      notes.push(t('log.hintNote', { shown: entry.shown || 0, total: entry.total || 0 }));
      break;
    default:
      break;
  }

  if (lang) notes.push(lang);
  if (entry.detail) notes.push(entry.detail);

  return { title: t(`log.kind.${entry.kind}`), note: notes.join(' · ') };
}

export class LogView {
  /**
   * @param {object} options
   * @param {import('../state/activity-log.js').ActivityLog} options.log
   * @param {object} [options.course] used to name the lesson an entry belongs to
   * @param {boolean} [options.filters] show the filter chips (the modal does, the pane does not)
   */
  constructor({ log, course, filters = false } = {}) {
    this.log = log;
    this.course = course;
    this.filter = 'all';

    this.root = document.createElement('div');
    this.root.className = 'log';

    if (filters) {
      this.filterBar = document.createElement('div');
      this.filterBar.className = 'log__filters';
      this.filterButtons = new Map();
      FILTERS.forEach((id) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chip';
        button.textContent = t(`log.filter.${id}`);
        button.addEventListener('click', () => {
          this.filter = id;
          this.render();
        });
        this.filterButtons.set(id, button);
        this.filterBar.append(button);
      });
      this.root.append(this.filterBar);
    }

    this.list = document.createElement('div');
    this.list.className = 'log__list';
    this.root.append(this.list);

    this.unsubscribe = this.log.subscribe(() => this.render());
    this.render();
  }

  destroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  #where(entry) {
    if (!entry.lessonNumber) return '';
    const lesson = String(entry.lessonNumber).padStart(2, '0');
    return entry.taskPosition ? `${lesson}/${entry.taskPosition}` : lesson;
  }

  #whereTitle(entry) {
    const lesson = this.course && entry.lessonId ? this.course.getLesson(entry.lessonId) : null;
    if (!lesson) return '';
    const task = entry.taskId && lesson.tasks.find((item) => item.id === entry.taskId);
    return task ? `${lesson.title} — ${task.title}` : lesson.title;
  }

  render() {
    if (this.filterButtons) {
      this.filterButtons.forEach((button, id) => {
        button.classList.toggle('chip--on', id === this.filter);
        button.setAttribute('aria-pressed', String(id === this.filter));
      });
    }

    const entries = this.log.recent(this.filter === 'all' ? null : LOG_GROUPS[this.filter]);
    this.list.textContent = '';

    if (!entries.length) {
      const empty = document.createElement('p');
      empty.className = 'log__empty';
      empty.textContent = t('log.empty');
      this.list.append(empty);
      return;
    }

    entries.forEach((entry) => {
      const { title, note } = describe(entry);

      const row = document.createElement('div');
      row.className = `log-row log-row--${entry.kind}`;

      const icon = document.createElement('span');
      icon.className = 'log-row__icon';
      icon.textContent = ICONS[entry.kind] || '·';

      const main = document.createElement('div');
      main.className = 'log-row__main';
      const kind = document.createElement('span');
      kind.className = 'log-row__kind';
      kind.textContent = title;
      main.append(kind);
      if (note) {
        const detail = document.createElement('span');
        detail.className = 'log-row__note';
        detail.textContent = note;
        main.append(detail);
      }

      const where = document.createElement('span');
      where.className = 'log-row__where';
      where.textContent = this.#where(entry);
      const hover = this.#whereTitle(entry);
      if (hover) where.title = hover;

      const time = document.createElement('time');
      time.className = 'log-row__time';
      time.dateTime = new Date(entry.at).toISOString();
      time.textContent = formatTime(entry.at);

      row.append(icon, main, where, time);
      this.list.append(row);
    });
  }
}

/**
 * The "clear the cache" block: what is stored, how much of it there is, and a
 * button per slice so wiping the log never costs a student their progress.
 */
export class CacheSection {
  constructor({ progress, log, onClear } = {}) {
    this.progress = progress;
    this.log = log;
    this.onClear = onClear || (() => {});

    this.root = document.createElement('section');
    this.root.className = 'cache';

    const head = document.createElement('div');
    head.className = 'cache__head';
    const title = document.createElement('h3');
    title.textContent = t('cache.title');
    this.total = document.createElement('span');
    this.total.className = 'cache__total';
    head.append(title, this.total);

    const hint = document.createElement('p');
    hint.className = 'cache__hint';
    hint.textContent = t('cache.hint');

    this.rows = document.createElement('div');
    this.rows.className = 'cache__rows';

    const foot = document.createElement('div');
    foot.className = 'cache__foot';
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'btn btn--sm btn--danger';
    all.textContent = t('cache.clearAll');
    all.addEventListener('click', () => this.#clear('all', t('confirm.clearAll')));

    const exportButton = document.createElement('button');
    exportButton.type = 'button';
    exportButton.className = 'btn btn--sm btn--ghost';
    exportButton.textContent = t('cache.export');
    exportButton.addEventListener('click', () => this.#export());
    foot.append(all, exportButton);

    this.root.append(head, hint, this.rows, foot);
    this.render();
  }

  #clear(id, question) {
    if (!window.confirm(question)) return;
    clearCache(id, { progress: this.progress, log: this.log });
    this.render();
    this.onClear(id);
  }

  #export() {
    const payload = JSON.stringify(
      { exportedAt: new Date().toISOString(), progress: JSON.parse(this.progress.export()), log: JSON.parse(this.log.export()) },
      null,
      2
    );
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'webdev-course-cache.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  render() {
    this.total.textContent = formatBytes(totalBytes(this.progress, this.log));
    this.rows.textContent = '';

    cacheReport(this.progress, this.log).forEach(({ id, count, bytes }) => {
      const row = document.createElement('div');
      row.className = 'cache__row';

      const name = document.createElement('span');
      name.className = 'cache__name';
      name.textContent = t(`cache.${id}`);

      const stat = document.createElement('span');
      stat.className = 'cache__stat';
      stat.textContent = `${t(`cache.${id}Count`, { count })} · ${formatBytes(bytes)}`;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn--sm btn--ghost';
      button.textContent = t('cache.clear');
      button.disabled = !count;
      button.addEventListener('click', () => this.#clear(id, t(`confirm.clear.${id}`)));

      row.append(name, stat, button);
      this.rows.append(row);
    });
  }
}
