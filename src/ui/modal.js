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

/**
 * In-app replacement for window.confirm(). The native dialog can be silenced
 * by the browser (Firefox's "don't allow this site to prompt you" checkbox) or
 * by extensions — confirm() then returns false at once and the button looks
 * dead. This one always shows. Resolves to true only on the confirm button.
 */
export function confirmDialog(message, { okLabel = t('confirm.ok'), danger = false } = {}) {
  return new Promise((resolve) => {
    const modal = new Modal({ title: t('confirm.title'), className: 'modal--confirm' });
    modal.scrim.classList.add('scrim--confirm');

    const text = document.createElement('p');
    text.className = 'confirm__text';
    text.textContent = message;

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'btn btn--sm btn--ghost';
    cancel.textContent = t('confirm.cancel');

    const ok = document.createElement('button');
    ok.type = 'button';
    ok.className = danger ? 'btn btn--sm btn--danger' : 'btn btn--sm btn--primary';
    ok.textContent = okLabel;

    const actions = document.createElement('div');
    actions.className = 'confirm__actions';
    actions.append(cancel, ok);
    modal.body.append(text, actions);

    let answered = false;
    const finish = (value) => {
      if (answered) return;
      answered = true;
      modal.unmount();
      resolve(value);
    };
    modal.onClose = () => finish(false);
    cancel.addEventListener('click', () => finish(false));
    ok.addEventListener('click', () => finish(true));

    // Keys stay inside the dialog so Escape does not also close the log modal
    // or leave full screen underneath it.
    modal.root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') finish(false);
      event.stopPropagation();
    });

    modal.mount();
    document.removeEventListener('keydown', modal.onKeyDown);
    modal.open();
    ok.focus();
  });
}
