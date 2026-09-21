/* Tiny transient notifications. */

let host = null;

function ensureHost() {
  if (!host) {
    host = document.createElement('div');
    host.className = 'toasts';
    host.setAttribute('role', 'status');
    host.setAttribute('aria-live', 'polite');
    document.body.append(host);
  }
  return host;
}

export function toast(message, kind = 'info', duration = 2800) {
  const element = document.createElement('div');
  element.className = `toast toast--${kind}`;
  element.textContent = message;
  ensureHost().append(element);
  setTimeout(() => element.remove(), duration);
}
