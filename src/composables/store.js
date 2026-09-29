/*
 * The app-wide stores, one instance each.
 *
 * Progress, the activity log and the class progress are plain classes with
 * private methods, so they cannot be wrapped in reactive() (a Proxy breaks
 * `#private` access). Instead each gets a tick ref that its subscribe()
 * callback bumps: anything computed from a store reads the tick first and
 * recomputes when the store changes.
 */
import { computed, markRaw, ref, watch } from 'vue';
import { Progress } from '../state/progress.js';
import { ActivityLog } from '../state/activity-log.js';
import { ClassProgress } from '../state/classes.js';
import { buildCourse } from '../course/index.js';
import { detectLocale } from '../i18n/index.js';
import { applyLocale, locale, t } from './i18n.js';

export const progress = markRaw(new Progress());
export const log = markRaw(new ActivityLog());
export const classes = markRaw(new ClassProgress());

export const progressTick = ref(0);
export const logTick = ref(0);
export const classesTick = ref(0);

progress.subscribe(() => { progressTick.value += 1; });
log.subscribe(() => { logTick.value += 1; });
classes.subscribe(() => { classesTick.value += 1; });

applyLocale(detectLocale(progress.locale));

/** The self-study course in the current language; rebuilt when it changes. */
export const course = computed(() => markRaw(buildCourse(locale.value)));

/* ------------------------------------------------------------------ theme */

export const theme = ref(progress.theme);

watch(theme, (value) => {
  document.documentElement.dataset.theme = value;
}, { immediate: true });

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  progress.setTheme(theme.value);
}

/* ----------------------------------------------------------------- locale */

export function changeLocale(id) {
  if (id === locale.value) return;
  applyLocale(id);
  progress.setLocale(id);
  log.add('system', { detail: t('log.detail.locale', { locale: id.toUpperCase() }) });
}
