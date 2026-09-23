/*
 * A dialog with a scrim: opened from the top bar, closed with Escape, the
 * close button or a click outside. Deliberately generic — the log view and the
 * cache section just render into `body`.
 */
import { t } from '../i18n/index.js';

export class Modal {
  constructor({ title = '', className = '' } = {}) {
    this.scrim = document.createElement('div');
    this.scrim.className = 'scrim scrim--modal';
    this.scrim.hidden = true;
    this.scrim.addEventListener('click', () => this.close());

    this.root = document.createElement('div');
    this.root.className = className ? `modal ${className}` : 'modal';
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');

    const head = document.createElement('div');
    head.className = 'modal__head';
    this.titleElement = document.createElement('h2');
    this.titleElement.className = 'modal__title';
    this.titleElement.textContent = title;

    this.tools = document.createElement('div');
    this.tools.className = 'modal__tools';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'pane__btn';
    close.textContent = '✕';
    close.title = t('pane.close');
    close.setAttribute('aria-label', t('pane.close'));
    close.addEventListener('click', () => this.close());

    head.append(this.titleElement, this.tools, close);

    this.body = document.createElement('div');
    this.body.className = 'modal__body';

    this.root.append(head, this.body);

    this.onKeyDown = (event) => {
      if (event.key === 'Escape' && this.isOpen) this.close();
    };
  }

  get isOpen() { return !this.root.hidden; }

  setTitle(text) { this.titleElement.textContent = text; }

  mount(host = document.body) {
    host.append(this.scrim, this.root);
    document.addEventListener('keydown', this.onKeyDown);
  }

  unmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    this.scrim.remove();
    this.root.remove();
  }

  open() {
    this.root.hidden = false;
    this.scrim.hidden = false;
    if (this.onOpen) this.onOpen();
    this.root.focus();
  }

  close() {
    this.root.hidden = true;
    this.scrim.hidden = true;
    if (this.onClose) this.onClose();
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
}
