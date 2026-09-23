/*
 * The universal playground: HTML / CSS / JS editors, a live preview and a
 * console. One instance serves every lesson — a lesson only declares which
 * editors it exposes and which sandbox extras (mock API, storage seed) it
 * needs.
 *
 * The editor, the preview and the console are three independent panes: each
 * can be closed or blown up to full screen, and the pane manager rebuilds the
 * grid so whatever stays open takes the freed space.
 */
import { CodeEditor } from './editor.js';
import { SandboxRunner } from './runner.js';
import { t } from '../i18n/index.js';

const LANGUAGES = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JS' }
];

export class Playground {
  constructor({ onRun, onRequestCheck, onReset, onActivity, panes } = {}) {
    this.onRun = onRun || (() => {});
    this.onRequestCheck = onRequestCheck || (() => {});
    this.onReset = onReset || (() => {});
    this.onActivity = onActivity || (() => {});
    this.panes = panes;

    this.source = { html: '', css: '', js: '' };
    this.enabled = ['html', 'css', 'js'];
    this.active = 'html';
    this.autoRun = true;
    this.debounce = null;
    this.busy = false;

    this.sandbox = {};
    this.liveStorage = {};

    this.#build();
    this.runner = new SandboxRunner(this.frame);
    this.runner.on('console', (entry) => this.#appendConsole(entry));
    // Keep what the page wrote, so pressing Run again behaves like a reload
    // rather than a fresh browser profile.
    this.runner.on('storage', (data) => { this.liveStorage = data; });
  }

  /* ------------------------------------------------------------------ view */

  #build() {
    this.root = document.createElement('section');
    this.root.className = 'pg';

    const bar = document.createElement('div');
    bar.className = 'pg__bar';

    this.tabs = document.createElement('div');
    this.tabs.className = 'tabs';
    this.tabs.setAttribute('role', 'tablist');
    this.tabButtons = new Map();
    LANGUAGES.forEach(({ id, label }) => {
      const tab = document.createElement('button');
      tab.className = 'tab';
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.dataset.lang = id;
      tab.innerHTML = `${label} <span class="tab__dot" hidden>•</span>`;
      tab.addEventListener('click', () => this.selectTab(id));
      this.tabs.append(tab);
      this.tabButtons.set(id, tab);
    });

    const actions = document.createElement('div');
    actions.className = 'pg__actions';
    this.runButton = button(t('pg.run'), 'btn btn--sm btn--primary', () => this.run({ force: true, byUser: true }));
    this.checkButton = button(t('dock.check'), 'btn btn--sm btn--ok', () => this.onRequestCheck());
    this.resetButton = button(t('pg.reset'), 'btn btn--sm', () => this.onReset());
    actions.append(this.runButton, this.checkButton, this.resetButton);
    bar.append(actions);

    this.split = document.createElement('div');
    this.split.className = 'pg__split';

    /* ---- editor pane: the language tabs live in its header ---- */
    this.editor = new CodeEditor({
      onChange: (value) => this.#onEdit(value),
      onActivity: (event) => this.onActivity({ ...event, lang: this.active })
    });
    this.editor.root.prepend(this.#head('editor', t('pane.editor'), this.tabs));

    /* ---- preview and console: two panes stacked in one column ---- */
    this.right = document.createElement('div');
    this.right.className = 'pg__right';

    this.previewPane = document.createElement('div');
    this.previewPane.className = 'preview';
    this.previewStatus = document.createElement('span');
    this.previewStatus.className = 'preview__status';
    this.frame = document.createElement('iframe');
    this.frame.className = 'preview__frame';
    this.frame.title = t('pg.previewFrame');
    this.frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-popups');
    this.previewPane.append(this.#head('preview', t('pane.preview'), this.previewStatus), this.frame);

    // The console is always live: a student should never have to open a panel
    // to find out why nothing happened.
    this.consolePanel = document.createElement('div');
    this.consolePanel.className = 'console';
    const clear = button(t('pg.consoleClear'), 'btn btn--sm btn--ghost', () => this.clearConsole());
    this.consoleBody = document.createElement('div');
    this.consoleBody.className = 'console__body';
    this.consolePanel.append(this.#head('console', t('pane.console'), clear), this.consoleBody);
    this.clearConsole();

    this.right.append(this.previewPane, this.consolePanel);
    this.split.append(this.editor.root, this.right);
    this.root.append(bar, this.split);

    if (this.panes) {
      this.panes.register('editor', this.editor.root);
      this.panes.register('preview', this.previewPane);
      this.panes.register('console', this.consolePanel);
    }

    this.root.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        if (event.shiftKey) this.onRequestCheck();
        else this.run({ force: true, byUser: true });
      }
    });
  }

  /** A pane header when the pane manager is around, a plain strip otherwise. */
  #head(id, title, extra) {
    if (this.panes) return this.panes.head(id, title, { extra });
    const head = document.createElement('div');
    head.className = 'pane__head';
    const label = document.createElement('span');
    label.className = 'pane__title';
    label.textContent = title;
    head.append(label, extra);
    return head;
  }

  /** The containers whose grid templates follow the open panes. */
  get containers() {
    return { pg: this.root, split: this.split, right: this.right };
  }

  /* ----------------------------------------------------------------- state */

  /** @param {{editors?: string[], sandbox?: object}} config lesson-level configuration */
  configure({ editors = ['html', 'css', 'js'], sandbox = {} } = {}) {
    this.enabled = editors;
    this.sandbox = sandbox;
    this.liveStorage = { ...(sandbox.storageSeed || {}) };
    this.runner.setConfig(sandbox);
    LANGUAGES.forEach(({ id }) => {
      const tab = this.tabButtons.get(id);
      const on = editors.includes(id);
      tab.hidden = !on;
      tab.disabled = !on;
    });
    if (!editors.includes(this.active)) this.selectTab(editors[0] || 'html');
    this.#syncTabs();
  }

  setSource(source, { render = true } = {}) {
    this.source = { html: '', css: '', js: '', ...source };
    this.editor.setLanguage(this.active);
    this.editor.setValue(this.source[this.active] || '');
    this.#syncTabs();
    this.clearConsole();
    if (render) this.run({ force: true });
  }

  getSource() {
    return { ...this.source };
  }

  selectTab(language) {
    if (!this.enabled.includes(language)) return;
    this.source[this.active] = this.editor.value;
    this.active = language;
    this.editor.setLanguage(language);
    this.editor.setValue(this.source[language] || '');
    this.#syncTabs();
    this.editor.focus();
  }

  #syncTabs() {
    this.tabButtons.forEach((tab, id) => {
      tab.setAttribute('aria-selected', String(id === this.active));
      const dot = tab.querySelector('.tab__dot');
      const current = id === this.active ? this.editor.value : this.source[id];
      dot.hidden = !(current || '').trim();
    });
  }

  #onEdit(value) {
    this.source[this.active] = value;
    this.#syncTabs();
    if (!this.autoRun) return;
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.run(), 800);
  }

  #setStatus(key) {
    this.previewStatus.textContent = key ? t(key) : '';
  }

  /* ------------------------------------------------------------- execution */

  /**
   * @param {object} [options]
   * @param {boolean} [options.force] run even while a previous render is in flight
   * @param {boolean} [options.byUser] the student pressed Run — worth logging
   */
  async run({ force = false, byUser = false } = {}) {
    if (this.busy && !force) return;
    this.source[this.active] = this.editor.value;
    this.busy = true;
    this.#setStatus('pg.running');
    this.clearConsole();
    try {
      this.runner.setConfig({ ...this.sandbox, storageSeed: this.liveStorage });
      await this.runner.render(this.source);
      this.#setStatus('');
      this.onRun(this.getSource(), { byUser });
    } finally {
      this.busy = false;
    }
  }

  /** Runs the task's checks against a freshly rendered page. */
  async check(checks) {
    this.source[this.active] = this.editor.value;
    this.clearConsole();
    this.#setStatus('pg.checking');
    try {
      // Grading always starts from the lesson's declared storage, never from
      // whatever the student left behind while experimenting.
      this.runner.setConfig({ ...this.sandbox, storageSeed: { ...(this.sandbox.storageSeed || {}) } });
      return await this.runner.check(this.source, checks);
    } finally {
      this.#setStatus('');
    }
  }

  /* --------------------------------------------------------------- console */

  clearConsole() {
    this.consoleBody.textContent = '';
    this.empty = document.createElement('div');
    this.empty.className = 'console__empty';
    this.empty.textContent = t('pg.consoleEmpty');
    this.consoleBody.append(this.empty);
  }

  #appendConsole({ level, text }) {
    if (this.empty) {
      this.empty.remove();
      this.empty = null;
    }
    const line = document.createElement('div');
    line.className = `console__line console__line--${level}`;
    line.textContent = text;
    this.consoleBody.append(line);
    this.consoleBody.scrollTop = this.consoleBody.scrollHeight;
  }
}

function button(text, className, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = className;
  element.textContent = text;
  element.addEventListener('click', onClick);
  return element;
}
