/*
 * Reactive face of src/i18n. The dictionaries and `t()` stay plain JS (the
 * sandbox and the tooling use them without Vue); this module only adds a
 * `locale` ref, and its `t()` reads that ref so every template that translates
 * something re-renders when the language changes.
 */
import { ref } from 'vue';
import { LOCALES, getLocale, setLocale, t as translate } from '../i18n/index.js';

export { LOCALES };

export const locale = ref(getLocale());

export function applyLocale(id) {
  locale.value = setLocale(id);
  return locale.value;
}

export function t(key, params) {
  // Registers the dependency; the value itself comes from the plain module.
  void locale.value;
  return translate(key, params);
}
