/*
 * Host side of the sandbox: builds the preview document, keeps one iframe alive
 * and speaks the postMessage protocol implemented by harness.js.
 */

import { sandboxMessages, sandboxPhrases, getLocale, t } from '../i18n/index.js';

const HARNESS_URL = new URL('./harness.js', import.meta.url);
let harnessPromise = null;

/** Loads the harness source once and caches it. */
export function loadHarness() {
  if (!harnessPromise) {
    harnessPromise = fetch(HARNESS_URL)
      .then((response) => {
        if (!response.ok) throw new Error(t('runner.harnessFailed', { status: response.status }));
        return response.text();
      })
      .catch((error) => {
        harnessPromise = null;
        throw error;
      });
  }
  return harnessPromise;
}

const FULL_DOCUMENT = /<html[\s>]/i;
const MODULE_BASE = 'https://lesson.playground/';

function escapeForScript(text) {
  // Keeps a literal "</script>" inside injected JSON/JS from closing our tag.
  return String(text).replace(/<\/(script)/gi, '<\\/$1');
}

function injectAfterOpeningTag(html, tagPattern, injection) {
  const match = html.match(tagPattern);
  if (!match) return null;
  const at = match.index + match[0].length;
  return html.slice(0, at) + injection + html.slice(at);
}

/**
 * Builds the srcdoc for the preview.
 *
 * Students may write either a fragment (the usual case) or a whole document
 * (lesson "HTML Document"); both have to work, so a full document is patched
 * in place instead of being wrapped.
 */
export function buildDocument({ html = '', css = '', js = '' }, harnessSource, config = {}) {
  const boot =
    `<script>window.__PG__=${escapeForScript(JSON.stringify(config))};</script>` +
    `<script>${harnessSource}</script>`;
  const styleTag = css.trim() ? `<style>\n${css}\n</style>` : '';

  // A lesson can hand the sandbox virtual ES modules: they are served as data:
  // URLs through an import map, so `import { add } from './math.js'` works with
  // no server and no network.
  const moduleNames = Object.keys(config.modules || {});
  const moduleSetup = moduleNames.length
    ? `<base href="${MODULE_BASE}">` +
      `<script type="importmap">${escapeForScript(JSON.stringify({
        imports: moduleNames.reduce((imports, name) => {
          const url = `data:text/javascript;charset=utf-8,${encodeURIComponent(config.modules[name])}`;
          imports[name] = url;
          imports[new URL(name, MODULE_BASE).href] = url;
          return imports;
        }, {})
      }))}</script>`
    : '';
  const scriptType = moduleNames.length ? ' type="module"' : '';
  const scriptTag = js.trim() ? `<script${scriptType}>\n${escapeForScript(js)}\n</script>` : '';

  if (FULL_DOCUMENT.test(html)) {
    let out = html;
    const head = injectAfterOpeningTag(out, /<head[^>]*>/i, boot + moduleSetup + styleTag);
    if (head) {
      out = head;
    } else {
      const root = injectAfterOpeningTag(out, /<html[^>]*>/i, `<head>${boot}${moduleSetup}${styleTag}</head>`);
      out = root || boot + moduleSetup + styleTag + out;
    }
    if (/<\/body>/i.test(out)) return out.replace(/<\/body>/i, `${scriptTag}</body>`);
    return out + scriptTag;
  }

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
${boot}
${moduleSetup}
${styleTag}
</head>
<body>
${html}
${scriptTag}
</body>
</html>`;
}

/**
 * Swaps lesson asset names (`photos/cat.jpg`) for the inline data URIs the
 * sandbox can actually render offline. Only the rendered copy is rewritten —
 * `__source` keeps what the student typed, so source checks stay honest.
 */
export function applyAssets(source, assets) {
  if (!assets) return source;
  const names = Object.keys(assets).sort((a, b) => b.length - a.length);
  const swap = (text) => names.reduce((acc, name) => acc.split(name).join(assets[name]), text || '');
  return { html: swap(source.html), css: swap(source.css), js: source.js };
}

const SANDBOX_FLAGS = 'allow-scripts allow-forms allow-modals allow-popups allow-pointer-lock';

export class SandboxRunner {
  /**
   * @param {HTMLIFrameElement} iframe preview frame, recreated on every render
   */
  constructor(iframe) {
    this.iframe = iframe;
    this.config = {};
    this.runId = 0;
    this.pendingReady = null;
    this.pendingChecks = new Map();
    this.listeners = { console: [], storage: [], ready: [] };
    this.storage = {};
    window.addEventListener('message', (event) => this.#onMessage(event));
  }

  on(event, callback) {
    this.listeners[event].push(callback);
    return this;
  }

  #emit(event, payload) {
    this.listeners[event].forEach((callback) => callback(payload));
  }

  setConfig(config) {
    this.config = { ...config };
    return this;
  }

  #onMessage(event) {
    if (event.source !== this.iframe.contentWindow) return;
    const data = event.data;
    if (!data || data.__pg !== true) return;

    switch (data.type) {
      case 'ready':
        this.storage = data.storage || {};
        this.#emit('ready', this.storage);
        if (this.pendingReady) {
          this.pendingReady.resolve();
          this.pendingReady = null;
        }
        break;
      case 'console':
        this.#emit('console', { level: data.level, text: data.text });
        break;
      case 'storage':
        this.storage = data.data || {};
        this.#emit('storage', this.storage);
        break;
      case 'check-result': {
        const pending = this.pendingChecks.get(data.runId);
        if (pending) {
          clearTimeout(pending.timer);
          this.pendingChecks.delete(data.runId);
          pending.resolve(data.results);
        }
        break;
      }
      default:
        break;
    }
  }

  /** Renders the given source into a brand-new frame and resolves once it is ready. */
  async render(source) {
    const harness = await loadHarness();
    const config = {
      source: { html: source.html || '', css: source.css || '', js: source.js || '' },
      mockApi: this.config.mockApi || null,
      storageSeed: this.config.storageSeed || {},
      promptAnswers: this.config.promptAnswers || [],
      allowNetwork: Boolean(this.config.allowNetwork),
      modules: this.config.modules || null,
      locale: getLocale(),
      messages: sandboxMessages(),
      phrases: sandboxPhrases()
    };

    // A fresh frame guarantees checks never observe state left over from a
    // previous run (clicked buttons, mutated DOM, timers).
    const fresh = document.createElement('iframe');
    fresh.className = this.iframe.className;
    fresh.title = this.iframe.title;
    fresh.setAttribute('sandbox', SANDBOX_FLAGS);
    this.iframe.replaceWith(fresh);
    this.iframe = fresh;

    const ready = new Promise((resolve) => {
      this.pendingReady = { resolve };
      setTimeout(() => {
        if (this.pendingReady && this.pendingReady.resolve === resolve) {
          this.pendingReady = null;
          this.#emit('console', { level: 'warn', text: t('runner.frozen') });
          resolve();
        }
      }, 5000);
    });

    fresh.srcdoc = buildDocument(applyAssets(config.source, this.config.assets), harness, config);
    await ready;
  }

  /** Sends check specs to the sandbox as it stands right now. */
  #ask(checks) {
    if (!checks.length) return Promise.resolve([]);
    const runId = ++this.runId;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.pendingChecks.delete(runId);
        resolve(checks.map((check) => ({
          label: check.label,
          ok: false,
          message: t('runner.checkTimeout')
        })));
      }, 10000);
      this.pendingChecks.set(runId, { resolve, timer });
      this.iframe.contentWindow.postMessage({ type: 'run-checks', runId, checks }, '*');
    });
  }

  /**
   * Runs a task's checks.
   *
   * Checks that only look at the page share one render. Each `interact` check
   * gets a page of its own, because a click or a keystroke leaves the DOM (and
   * localStorage) changed — without that, check 3 would silently depend on what
   * check 2 clicked.
   */
  async check(source, checks, { stopEarly = false } = {}) {
    const results = new Array(checks.length);
    const passive = [];
    const interactive = [];
    checks.forEach((check, index) => {
      (check.kind === 'interact' ? interactive : passive).push({ check, index });
    });

    if (passive.length) {
      await this.render(source);

      if (stopEarly) {
        for (const entry of passive) {
          const [result] = await this.#ask([entry.check]);
          results[entry.index] = result;
          if (!result.ok) return results.filter(Boolean);
        }
      } else {
        const batch = await this.#ask(passive.map((entry) => entry.check));
        batch.forEach((result, position) => {
          results[passive[position].index] = result;
        });
      }
    }

    for (const entry of interactive) {
      await this.render(source);
      const [result] = await this.#ask([entry.check]);
      results[entry.index] = result;
      if (stopEarly && !result.ok) return results.filter(Boolean);
    }

    return results;
  }
}
