/*
 * Pane manager.
 *
 * Every region of the workspace — theory, editor, preview, console, tasks and
 * the log — is a pane that can be closed, reopened and blown up to full
 * screen. Closing one does not leave a hole: the grid templates are rebuilt
 * from whatever is still open, so the remaining panes take the freed space.
 *
 * The templates are written into CSS custom properties rather than into
 * `style.gridTemplateColumns`, so the narrow-screen media queries can still
 * override the whole layout — an inline property would always win over them.
 *
 * The state (which panes are closed, which one is full screen) is part of the
 * stored progress, so the workspace comes back the way it was left.
 */
import { t } from '../i18n/index.js';

export const PANES = ['theory', 'editor', 'preview', 'console', 'tasks', 'logs'];

/** Column width per top-level pane; the playground always takes the rest. */
const COLUMN = {
  theory: 'minmax(220px, 21%)',
  pg: 'minmax(320px, 1fr)',
  tasks: 'minmax(240px, 22%)',
  logs: 'minmax(240px, 21%)'
};

const DEFAULT_CLOSED = ['logs'];

export class PaneManager {
  constructor({ progress, onChange } = {}) {
    this.progress = progress;
    this.onChange = onChange || (() => {});

    const stored = (progress && progress.panes) || {};
    const closed = Array.isArray(stored.closed) ? stored.closed : DEFAULT_CLOSED;
    this.closed = new Set(closed.filter((id) => PANES.includes(id)));
    this.full = PANES.includes(stored.full) ? stored.full : null;

    this.elements = new Map();
    this.heads = new Map();
    this.menuButtons = new Map();
    this.cleanups = [];
  }

  /** Drops the document-level listeners the menu installs. */
  destroy() {
    this.cleanups.forEach((undo) => undo());
    this.cleanups = [];
    document.documentElement.classList.remove('has-full-pane');
  }

  /* ----------------------------------------------------------------- state */

  isOpen(id) { return !this.closed.has(id); }

  isFull(id) { return this.full === id; }

  get openCount() { return PANES.filter((id) => this.isOpen(id)).length; }

  open(id) {
    if (!PANES.includes(id)) return;
    this.closed.delete(id);
    this.#persist();
  }

  /** @returns {boolean} false when this is the last open pane and it stays open */
  close(id) {
    if (!PANES.includes(id) || !this.isOpen(id)) return true;
    if (this.openCount <= 1) return false;
    this.closed.add(id);
    if (this.full === id) this.full = null;
    this.#persist();
    return true;
  }

  toggle(id) {
    if (this.isOpen(id)) return this.close(id);
    this.open(id);
    return true;
  }

  toggleFull(id) {
    if (this.full === id) this.full = null;
    else {
      this.closed.delete(id);
      this.full = id;
    }
    this.#persist();
  }

  exitFull() {
    if (!this.full) return false;
    this.full = null;
    this.#persist();
    return true;
  }

  #persist() {
    if (this.progress) this.progress.setPanes({ closed: [...this.closed], full: this.full });
    this.apply();
    this.onChange(this);
  }

  /* ------------------------------------------------------------------ view */

  setContainers({ main, pg, split, right }) {
    this.containers = { main, pg, split, right };
  }

  register(id, element) {
    element.classList.add('pane');
    element.dataset.pane = id;
    this.elements.set(id, element);
  }

  /**
   * Builds the standard pane header: title, whatever the pane wants to put
   * next to it, then the full-screen and close buttons.
   */
  head(id, title, { extra } = {}) {
    const root = document.createElement('div');
    root.className = 'pane__head';

    const label = document.createElement('span');
    label.className = 'pane__title';
    label.textContent = title;
    root.append(label);

    if (extra) {
      const box = document.createElement('div');
      box.className = 'pane__extra';
      box.append(...(Array.isArray(extra) ? extra : [extra]));
      root.append(box);
    }

    const tools = document.createElement('div');
    tools.className = 'pane__tools';

    const fullButton = iconButton('⛶', t('pane.full'), () => this.toggleFull(id));
    const closeButton = iconButton('✕', t('pane.close'), () => {
      if (!this.close(id)) this.onChange(this, { refused: id });
    });
    tools.append(fullButton, closeButton);
    root.append(tools);

    this.heads.set(id, { root, label, fullButton });
    return root;
  }

  /** The top-bar control that reopens closed panes. */
  menu() {
    const box = document.createElement('div');
    box.className = 'panes-menu';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn--sm';
    button.textContent = '▦';
    button.title = t('top.panes');
    button.setAttribute('aria-label', t('top.panes'));
    button.setAttribute('aria-expanded', 'false');

    const list = document.createElement('div');
    list.className = 'panes-menu__list';
    list.hidden = true;

    const caption = document.createElement('div');
    caption.className = 'panes-menu__caption';
    caption.textContent = t('top.panesTitle');
    list.append(caption);

    PANES.forEach((id) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'panes-menu__item';
      row.addEventListener('click', () => {
        if (!this.toggle(id)) this.onChange(this, { refused: id });
      });

      const mark = document.createElement('span');
      mark.className = 'panes-menu__mark';
      const name = document.createElement('span');
      name.textContent = t(`pane.${id}`);
      row.append(mark, name);

      this.menuButtons.set(id, { row, mark });
      list.append(row);
    });

    const close = () => {
      list.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    };

    const onEscape = (event) => {
      if (event.key === 'Escape') close();
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      list.hidden = !list.hidden;
      button.setAttribute('aria-expanded', String(!list.hidden));
    });
    list.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', close);
    document.addEventListener('keydown', onEscape);
    this.cleanups.push(() => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onEscape);
    });

    box.append(button, list);
    return box;
  }

  /** Rebuilds the grid templates and the button states from the current flags. */
  apply() {
    const { main, pg, split, right } = this.containers || {};

    this.elements.forEach((element, id) => {
      element.hidden = !this.isOpen(id);
      element.classList.toggle('pane--full', this.full === id);
    });

    this.heads.forEach((head, id) => {
      const full = this.full === id;
      head.fullButton.textContent = full ? '⤡' : '⛶';
      head.fullButton.title = full ? t('pane.exitFull') : t('pane.full');
      head.fullButton.setAttribute('aria-label', head.fullButton.title);
      head.fullButton.setAttribute('aria-pressed', String(full));
    });

    this.menuButtons.forEach((entry, id) => {
      const open = this.isOpen(id);
      entry.mark.textContent = open ? '☑' : '☐';
      entry.row.setAttribute('aria-pressed', String(open));
      entry.row.classList.toggle('panes-menu__item--on', open);
    });

    if (!main) return;

    const pgOpen = this.isOpen('editor') || this.isOpen('preview') || this.isOpen('console');
    const columns = [];
    if (this.isOpen('theory')) columns.push(COLUMN.theory);
    if (pgOpen) columns.push(COLUMN.pg);
    if (this.isOpen('tasks')) columns.push(COLUMN.tasks);
    if (this.isOpen('logs')) columns.push(COLUMN.logs);
    main.style.setProperty('--cols', columns.join(' ') || COLUMN.pg);

    if (pg) pg.hidden = !pgOpen;

    const rightOpen = this.isOpen('preview') || this.isOpen('console');
    if (split) {
      const splitColumns = [];
      if (this.isOpen('editor')) splitColumns.push('minmax(0, 1fr)');
      if (rightOpen) splitColumns.push('minmax(0, 1fr)');
      split.style.setProperty('--split-cols', splitColumns.join(' ') || 'minmax(0, 1fr)');
    }

    if (right) {
      right.hidden = !rightOpen;
      const rows = [];
      if (this.isOpen('preview')) rows.push('minmax(0, 1fr)');
      if (this.isOpen('console')) rows.push(this.isOpen('preview') ? 'minmax(120px, 34%)' : 'minmax(0, 1fr)');
      right.style.setProperty('--right-rows', rows.join(' ') || 'minmax(0, 1fr)');
    }

    document.documentElement.classList.toggle('has-full-pane', Boolean(this.full));
  }
}

function iconButton(text, label, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = 'pane__btn';
  element.textContent = text;
  element.title = label;
  element.setAttribute('aria-label', label);
  element.addEventListener('click', onClick);
  return element;
}
