/* Entry point: restore the theme, build the app, report fatal errors plainly. */
import { App } from './ui/app.js';
import { Progress } from './state/progress.js';
import { loadHarness } from './playground/runner.js';
import { detectLocale, setLocale, t } from './i18n/index.js';

const root = document.querySelector('#app');

async function start() {
  const progress = new Progress();
  document.documentElement.dataset.theme = progress.theme;
  setLocale(detectLocale(progress.locale));

  // Fail early and clearly if the page was opened as a file:// URL, where
  // fetching the harness (and ES modules in general) is blocked.
  await loadHarness();

  const app = new App(progress);
  app.mount(root);
}

start().catch((error) => {
  root.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'boot';
  box.innerHTML =
    `<h2>${t('app.bootFailed')}</h2>` +
    `<p>${error.message}</p>` +
    `<p>${t('app.bootHint')}</p>` +
    `<pre>npm start</pre>`;
  root.append(box);
  console.error(error);
});
