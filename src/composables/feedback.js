/*
 * Toasts and the confirm dialog. Both are just reactive state here; ToastHost
 * and ConfirmHost (mounted once in App.vue) draw them.
 */
import { reactive } from 'vue';
import { t } from './i18n.js';

/* ------------------------------------------------------------------ toast */

let toastId = 0;

export const toasts = reactive([]);

export function toast(message, kind = 'info', duration = 2800) {
  const id = ++toastId;
  toasts.push({ id, message, kind });
  setTimeout(() => {
    const at = toasts.findIndex((entry) => entry.id === id);
    if (at !== -1) toasts.splice(at, 1);
  }, duration);
}

/* ---------------------------------------------------------------- confirm */

export const confirmState = reactive({ open: false, message: '', okLabel: '', danger: false, resolve: null });

/**
 * In-app replacement for window.confirm(). The native dialog can be silenced
 * by the browser (Firefox's "don't allow this site to prompt you" checkbox) or
 * by extensions — confirm() then returns false at once and the button looks
 * dead. This one always shows. Resolves to true only on the confirm button.
 */
export function confirmDialog(message, { okLabel, danger = false } = {}) {
  // A second question replaces an unanswered first one, which counts as "no".
  if (confirmState.resolve) confirmState.resolve(false);
  return new Promise((resolve) => {
    Object.assign(confirmState, {
      open: true,
      message,
      okLabel: okLabel || t('confirm.ok'),
      danger,
      resolve
    });
  });
}

export function answerConfirm(value) {
  const resolve = confirmState.resolve;
  Object.assign(confirmState, { open: false, resolve: null });
  if (resolve) resolve(value);
}
