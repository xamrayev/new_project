/*
 * Localization.
 *
 * Three layers speak different languages and are translated separately:
 *   - the interface        → src/i18n/ui/<locale>.js
 *   - the sandbox messages → src/i18n/sandbox/<locale>.js (they are produced
 *     inside the iframe, so the dictionary travels there with the config)
 *   - the course content   → src/course/i18n/<locale>.js (an overlay on the
 *     base lessons)
 *
 * Any string missing from a locale falls back to the base locale, so a partial
 * translation degrades to mixed language instead of to `undefined`.
 */
import { ru as uiRu } from './ui/ru.js';
import { uz as uiUz } from './ui/uz.js';
import { ru as sandboxRu } from './sandbox/ru.js';
import { uz as sandboxUz } from './sandbox/uz.js';
import { uzPhrases } from './sandbox/uz-phrases.js';

/**
 * The locale the content is authored in: `src/course/modules/` holds Russian
 * and every translation is an overlay on top of it. It is also the fallback for
 * any string a locale has not translated yet — so it is not a product choice.
 */
export const BASE_LOCALE = 'ru';

/** What a first-time visitor gets when nothing is stored and the browser gives no hint. */
export const DEFAULT_LOCALE = 'uz';

export const LOCALES = [
  { id: 'ru', short: 'RU', label: 'Русский' },
  { id: 'uz', short: 'UZ', label: "O'zbekcha" }
];

const UI = { ru: uiRu, uz: uiUz };
const SANDBOX = { ru: sandboxRu, uz: sandboxUz };

// Longest first, so "Нужно минимум 3 ссылки" wins over "Нужно минимум ".
const PHRASES = {
  ru: [],
  uz: [...uzPhrases].sort((a, b) => b[0].length - a[0].length)
};

export function isLocale(id) {
  return LOCALES.some((locale) => locale.id === id);
}

/** Stored choice wins, then the browser language, then the default locale. */
export function detectLocale(stored) {
  if (isLocale(stored)) return stored;
  const preferred = (typeof navigator !== 'undefined' && navigator.language) || '';
  const match = LOCALES.find((locale) => preferred.toLowerCase().startsWith(locale.id));
  return match ? match.id : DEFAULT_LOCALE;
}

export function interpolate(template, params) {
  if (!params) return template;
  return String(template).replace(/\{(\w+)\}/g, (whole, key) =>
    Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : whole
  );
}

let current = DEFAULT_LOCALE;

export function setLocale(locale) {
  current = isLocale(locale) ? locale : DEFAULT_LOCALE;
  if (typeof document !== 'undefined') document.documentElement.lang = current;
  return current;
}

export function getLocale() {
  return current;
}

/** Translates a UI key: `t('dock.check')`, `t('app.lessonDone', { done: 5 })`. */
export function t(key, params) {
  const dictionary = UI[current] || UI[BASE_LOCALE];
  const template = dictionary[key] !== undefined ? dictionary[key] : UI[BASE_LOCALE][key];
  if (template === undefined) return key;
  return interpolate(template, params);
}

/** Message dictionary handed to the sandbox harness through its config. */
export function sandboxMessages(locale = current) {
  return { ...SANDBOX[BASE_LOCALE], ...(SANDBOX[locale] || {}) };
}

/**
 * Phrase table for the free-form messages custom checks produce.
 * Pairs of [base phrase, translation], applied as plain substitutions.
 */
export function sandboxPhrases(locale = current) {
  return PHRASES[locale] || [];
}
