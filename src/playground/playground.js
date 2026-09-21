/*
 * The universal playground: HTML / CSS / JS editors, a live preview and a
 * console panel. One instance serves every lesson — a lesson only declares
 * which editors it exposes and which sandbox extras (mock API, storage seed)
 * it needs.
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
  constructor({ onRun, onRequestCheck, onReset } = {}) {
    this.onRun = onRun || (() => {});
    this.onRequestCheck = onRequestCheck || (() => {});
    this.onReset = onReset || (() => {});

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

    this.runButton = button(t('pg.run'), 'btn btn--sm btn--primary', () => this.run({ force: true }));
    this.checkButton = button(t('dock.check'), 'btn btn--sm btn--ok', () => this.onRequestCheck());
    this.resetButton = button(t('pg.reset'), 'btn btn--sm', () => this.onReset());
    actions.append(this.runButton, this.checkButton, this.resetButton);

    bar.append(this.tabs, actions);

    const split = document.createElement('div');
    split.className = 'pg__split';

    this.editor = new CodeEditor({ onChange: (value) => this.#onEdit(value) });

    const preview = document.createElement('div');
    preview.className = 'preview';

    const label = document.createElement('div');
    label.className = 'preview__label';
    this.previewStatus = document.createElement('span');
    this.previewStatus.textContent = t('pg.preview');
    label.append(this.previewStatus);

    this.frame = document.createElement('iframe');
    this.frame.className = 'preview__frame';
    this.frame.title = t('pg.previewFrame');
    this.frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-popups');

    // The console sits under the preview and is always live: a student should
    // never have to open a panel to find out why nothing happened.
    this.consolePanel = document.createElement('div');
    this.consolePanel.className = 'console';
    const consoleHead = document.createElement('div');
    consoleHead.className = 'console__head';
    const consoleTitle = document.createElement('span');
    consoleTitle.textContent = t('pg.console');
    const clear = button(t('pg.consoleClear'), 'btn btn--sm btn--ghost', () => this.clearConsole());
    clear.style.marginLeft = 'auto';
    consoleHead.append(consoleTitle, clear);
    this.consoleBody = document.createElement('div');
    this.consoleBody.className = 'console__body';
    this.consolePanel.append(consoleHead, this.consoleBody);
    this.clearConsole();

    preview.append(label, this.frame, this.consolePanel);
    split.append(this.editor.root, preview);
    this.root.append(bar, split);

    this.root.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        this.run({ force: true });
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && event.shiftKey) {
        this.onRequestCheck();
      }
    });
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

  /* ------------------------------------------------------------- execution */

  async run({ force = false } = {}) {
    if (this.busy && !force) return;
    this.source[this.active] = this.editor.value;
    this.busy = true;
    this.previewStatus.textContent = t('pg.running');
    this.clearConsole();
    try {
      this.runner.setConfig({ ...this.sandbox, storageSeed: this.liveStorage });
      await this.runner.render(this.source);
      this.previewStatus.textContent = t('pg.preview');
      this.onRun(this.getSource());
    } finally {
      this.busy = false;
    }
  }

  /** Runs the task's checks against a freshly rendered page. */
  async check(checks) {
    this.source[this.active] = this.editor.value;
    this.clearConsole();
    this.previewStatus.textContent = t('pg.checking');
    try {
      // Grading always starts from the lesson's declared storage, never from
      // whatever the student left behind while experimenting.
      this.runner.setConfig({ ...this.sandbox, storageSeed: { ...(this.sandbox.storageSeed || {}) } });
      return await this.runner.check(this.source, checks);
    } finally {
      this.previewStatus.textContent = t('pg.preview');
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
