/* Entry point: mount the Vue app, report fatal errors plainly. */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router.js';
import { provideHarness } from './playground/runner.js';
import harnessSource from './playground/harness.js?raw';
import { t } from './composables/i18n.js';
// app.css is linked from course.html so the boot screen is styled even if this bundle fails.
import '../styles/classes.css';

// Every import above has loaded and linked — tells the boot watchdog in
// course.html that a stuck "Loading…" is not a missing module.
window.__courseStarted = true;

// The harness runs inside the sandboxed preview; bundling its source as a
// string means the preview never depends on fetching a file at run time.
provideHarness(harnessSource);

const root = document.querySelector('#app');

try {
  const app = createApp(App);
  app.use(router);
  app.config.errorHandler = (error) => console.error(error);
  app.mount(root);
} catch (error) {
  root.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'boot';
  box.innerHTML = `<h2>${t('app.bootFailed')}</h2><p></p>`;
  box.querySelector('p').textContent = error.message;
  root.append(box);
  console.error(error);
}
