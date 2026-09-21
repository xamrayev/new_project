/*
 * Sandbox harness.
 *
 * This file is fetched as plain text and inlined into the preview iframe as a
 * classic <script>. It runs *inside* the sandbox, before the student's code, and
 * it is the only thing that talks to the host page (via postMessage).
 *
 * Responsibilities:
 *   - mirror console / errors / alerts back to the host console panel
 *   - give the sandbox a working `localStorage` even on an opaque origin
 *   - serve the lesson's mock API to `fetch` and block real network access
 *   - interpret declarative check specs (see docs/AUTHORING.md) and report results
 *
 * The host never touches the sandbox DOM directly, so the iframe can stay on an
 * opaque origin (`sandbox="allow-scripts"`, no `allow-same-origin`).
 */
(function () {
  'use strict';

  var CFG = window.__PG__ || {};
  var SOURCE = CFG.source || { html: '', css: '', js: '' };
  var MESSAGES = CFG.messages || {};
  var PHRASES = CFG.phrases || [];

  /**
   * Custom checks build their own explanations in the base language. Rather than
   * duplicating their logic per locale, the locale ships a phrase table and the
   * produced message is translated fragment by fragment.
   */
  function localizePhrases(text) {
    if (typeof text !== 'string' || !PHRASES.length) return text;
    var out = text;
    for (var i = 0; i < PHRASES.length; i++) {
      out = out.split(PHRASES[i][0]).join(PHRASES[i][1]);
    }
    return out;
  }

  /** Localized message with {placeholders}; see src/i18n/sandbox/. */
  function msg(key, params) {
    var template = MESSAGES[key] || key;
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, function (whole, name) {
      return Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : whole;
    });
  }
  var MOCK_API = CFG.mockApi || null;
  var CONSOLE_LOG = [];
  var ALERTS = [];
  var ERRORS = [];

  function post(msg) {
    try {
      msg.__pg = true;
      parent.postMessage(msg, '*');
    } catch (e) { /* host went away */ }
  }

  /* ---------------------------------------------------------------- logging */

  function stringify(value, depth) {
    depth = depth || 0;
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    var t = typeof value;
    if (t === 'string') return depth === 0 ? value : JSON.stringify(value);
    if (t === 'number' || t === 'boolean' || t === 'bigint') return String(value);
    if (t === 'function') return 'ƒ ' + (value.name || 'anonymous') + '()';
    if (t === 'symbol') return value.toString();
    if (value instanceof Error) return value.name + ': ' + value.message;
    if (value instanceof Element) return '<' + value.tagName.toLowerCase() + '>';
    if (depth > 2) return Array.isArray(value) ? '[…]' : '{…}';
    if (Array.isArray(value)) {
      return '[' + value.slice(0, 30).map(function (v) { return stringify(v, depth + 1); }).join(', ') + ']';
    }
    try {
      var keys = Object.keys(value).slice(0, 30);
      return '{ ' + keys.map(function (k) { return k + ': ' + stringify(value[k], depth + 1); }).join(', ') + ' }';
    } catch (e) {
      return String(value);
    }
  }

  function record(level, args) {
    var text = Array.prototype.map.call(args, function (a) { return stringify(a, 0); }).join(' ');
    CONSOLE_LOG.push({ level: level, text: text });
    post({ type: 'console', level: level, text: text });
  }

  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (level) {
    var original = console[level] ? console[level].bind(console) : function () {};
    console[level] = function () {
      record(level === 'debug' ? 'log' : level, arguments);
      original.apply(null, arguments);
    };
  });
  console.table = function (data) { record('log', [data]); };

  window.addEventListener('error', function (event) {
    // Line numbers come from the assembled page; subtract everything the
    // harness itself added so the number matches the editor.
    var line = event.lineno ? event.lineno - (CFG.jsLineOffset || 0) : 0;
    var text = event.message + (line > 0 ? msg('error.line', { line: line }) : '');
    ERRORS.push(text);
    CONSOLE_LOG.push({ level: 'error', text: text });
    post({ type: 'console', level: 'error', text: text });
  });
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    var text = 'Unhandled promise rejection: ' + stringify(reason && reason.message ? reason.message : reason, 1);
    ERRORS.push(text);
    post({ type: 'console', level: 'error', text: text });
  });

  /* ------------------------------------------------- alert / prompt capture */

  var PROMPT_QUEUE = (CFG.promptAnswers || []).slice();

  window.alert = function (message) {
    var text = stringify(message, 0);
    ALERTS.push(text);
    post({ type: 'console', level: 'alert', text: 'alert(' + JSON.stringify(text) + ')' });
  };
  window.confirm = function (message) {
    var text = stringify(message, 0);
    ALERTS.push(text);
    var answer = PROMPT_QUEUE.length ? PROMPT_QUEUE.shift() : true;
    post({ type: 'console', level: 'alert', text: 'confirm(' + JSON.stringify(text) + ') → ' + answer });
    return answer !== false && answer !== null;
  };
  window.prompt = function (message, fallback) {
    var text = stringify(message, 0);
    ALERTS.push(text);
    var answer = PROMPT_QUEUE.length ? PROMPT_QUEUE.shift() : (fallback === undefined ? '' : fallback);
    post({ type: 'console', level: 'alert', text: 'prompt(' + JSON.stringify(text) + ') → ' + JSON.stringify(answer) });
    return answer;
  };

  /* ------------------------------------------------------------ localStorage */

  function installStorageShim() {
    var data = Object.assign({}, CFG.storageSeed || {});
    function sync() { post({ type: 'storage', data: Object.assign({}, data) }); }
    var shim = {
      getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
      setItem: function (k, v) { data[String(k)] = String(v); sync(); },
      removeItem: function (k) { delete data[String(k)]; sync(); },
      clear: function () { Object.keys(data).forEach(function (k) { delete data[k]; }); sync(); },
      key: function (i) { var keys = Object.keys(data); return i < keys.length ? keys[i] : null; },
      get length() { return Object.keys(data).length; },
      __data: data
    };
    Object.defineProperty(window, 'localStorage', { value: shim, configurable: true, writable: true });
    Object.defineProperty(window, 'sessionStorage', { value: shim, configurable: true, writable: true });
    return shim;
  }

  var STORAGE;
  try {
    window.localStorage.getItem('__pg_probe__');
    STORAGE = window.localStorage;
    // Seed a real store too, so lessons behave the same on either origin type.
    Object.keys(CFG.storageSeed || {}).forEach(function (k) {
      if (STORAGE.getItem(k) === null) STORAGE.setItem(k, CFG.storageSeed[k]);
    });
  } catch (e) {
    STORAGE = installStorageShim();
  }

  function storageSnapshot() {
    var out = {};
    try {
      for (var i = 0; i < STORAGE.length; i++) {
        var k = STORAGE.key(i);
        out[k] = STORAGE.getItem(k);
      }
    } catch (e) { /* ignore */ }
    return out;
  }

  /* -------------------------------------------------------------- mock fetch */

  function matchMock(url) {
    if (!MOCK_API) return null;
    // Longest key first, so '/api/users/1' wins over '/api/users'.
    var keys = Object.keys(MOCK_API).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (url === key) return MOCK_API[key];
      if (key.length <= url.length && url.slice(0, key.length) === key) return MOCK_API[key];
      if (key.length <= url.length && url.slice(url.length - key.length) === key) return MOCK_API[key];
    }
    return null;
  }

  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || String(input);
    var mock = matchMock(url);
    if (!mock) {
      if (CFG.allowNetwork && realFetch) return realFetch(input, init);
      return Promise.reject(new TypeError(msg('net.blocked', {
        list: MOCK_API ? Object.keys(MOCK_API).join(', ') : msg('net.none')
      })));
    }
    var body = mock.text !== undefined ? mock.text : JSON.stringify(mock.json === undefined ? null : mock.json);
    var status = mock.status || 200;
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new Response(body, {
          status: status,
          statusText: mock.statusText || (status === 200 ? 'OK' : ''),
          headers: Object.assign({ 'Content-Type': 'application/json' }, mock.headers || {})
        }));
      }, mock.delayMs === undefined ? 60 : mock.delayMs);
    });
  };

  /* ------------------------------------------------------------- check tools */

  var probe = null;
  function normalizeCssValue(prop, value) {
    if (!probe) {
      probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:100px;height:100px;';
      (document.body || document.documentElement).appendChild(probe);
    }
    probe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:100px;height:100px;';
    try { probe.style.setProperty(prop, value); } catch (e) { return String(value); }
    var computed = getComputedStyle(probe).getPropertyValue(prop);
    return (computed || String(value)).trim();
  }

  function normText(value) { return String(value == null ? '' : value).replace(/\s+/g, ' ').trim(); }

  function query(selector) {
    try { return Array.prototype.slice.call(document.querySelectorAll(selector)); }
    catch (e) { return null; }
  }

  function describe(selector) { return '`' + selector + '`'; }

  function compare(actual, spec, label) {
    // Returns null when it matches, or a human-readable reason when it does not.
    if (spec.equals !== undefined) {
      var a = spec.caseSensitive ? String(actual) : String(actual).toLowerCase();
      var b = spec.caseSensitive ? String(spec.equals) : String(spec.equals).toLowerCase();
      if (a !== b) return msg('cmp.equals', { label: label, expected: spec.equals, actual: actual });
    }
    if (spec.contains !== undefined) {
      var hay = spec.caseSensitive ? String(actual) : String(actual).toLowerCase();
      var needle = spec.caseSensitive ? String(spec.contains) : String(spec.contains).toLowerCase();
      if (hay.indexOf(needle) === -1) return msg('cmp.contains', { label: label, expected: spec.contains, actual: actual });
    }
    if (spec.notContains !== undefined) {
      var hay2 = String(actual).toLowerCase();
      if (hay2.indexOf(String(spec.notContains).toLowerCase()) !== -1) {
        return msg('cmp.notContains', { label: label, expected: spec.notContains });
      }
    }
    if (spec.matches !== undefined) {
      var re = new RegExp(spec.matches, spec.flags || 'i');
      if (!re.test(String(actual))) return msg('cmp.matches', { label: label, pattern: spec.matches });
    }
    if (spec.oneOf !== undefined) {
      var list = spec.oneOf.map(function (v) { return String(v).toLowerCase(); });
      if (list.indexOf(String(actual).toLowerCase()) === -1) {
        return msg('cmp.oneOf', { label: label, expected: spec.oneOf.join(', '), actual: actual });
      }
    }
    if (spec.min !== undefined && parseFloat(actual) < spec.min) {
      return msg('cmp.min', { label: label, expected: spec.min, actual: actual });
    }
    if (spec.max !== undefined && parseFloat(actual) > spec.max) {
      return msg('cmp.max', { label: label, expected: spec.max, actual: actual });
    }
    return null;
  }

  /* Reads the stylesheet itself, which is the only honest way to check things a
     single rendering cannot show — @media blocks, @keyframes, transitions. */
  function collectRules(ruleList, media, out) {
    for (var i = 0; i < ruleList.length; i++) {
      var rule = ruleList[i];
      if (rule.media && rule.media.mediaText !== undefined && rule.cssRules) {
        collectRules(rule.cssRules, (media ? media + ' ' : '') + rule.media.mediaText, out);
      } else if (rule.selectorText) {
        out.push({ selector: rule.selectorText, style: rule.style, media: media || '' });
      } else if (rule.cssRules) {
        collectRules(rule.cssRules, media, out);
      } else if (rule.name && rule.cssRules === undefined) {
        out.push({ atRule: rule.name, media: media || '' });
      }
    }
  }

  function allRules() {
    var out = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      try {
        collectRules(document.styleSheets[i].cssRules || [], '', out);
      } catch (e) { /* cross-origin sheet */ }
    }
    return out;
  }

  function normalizeSelector(selector) {
    return String(selector).toLowerCase().replace(/\s*([>+~,])\s*/g, '$1').replace(/\s+/g, ' ').trim();
  }

  function elementsFor(check) {
    var elements = query(check.selector);
    if (elements === null) return { error: msg('sel.invalid', { selector: describe(check.selector) }) };
    if (!elements.length) return { error: msg('sel.notFound', { selector: describe(check.selector) }) };
    return { elements: elements };
  }

  // Applies `test` over matched elements: every element must pass, unless
  // `any: true`, in which case one passing element is enough.
  function overElements(check, test) {
    var found = elementsFor(check);
    if (found.error) return found.error;
    var reasons = [];
    for (var i = 0; i < found.elements.length; i++) {
      var reason = test(found.elements[i], i);
      if (!reason && check.any) return null;
      if (reason) reasons.push(reason);
    }
    if (check.any) return reasons[0] || msg('sel.noneMatched', { selector: describe(check.selector) });
    return reasons.length ? reasons[0] : null;
  }

  function fire(element, type, init) {
    element.dispatchEvent(new Event(type, Object.assign({ bubbles: true, cancelable: true }, init || {})));
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function runStep(step) {
    var selector = step.selector;
    var element = selector ? document.querySelector(selector) : null;
    switch (step.do) {
      case 'wait':
        await sleep(step.ms === undefined ? 50 : step.ms);
        return null;
      case 'waitFor': {
        var deadline = Date.now() + (step.timeout || 2000);
        while (Date.now() < deadline) {
          if (document.querySelector(selector)) return null;
          await sleep(30);
        }
        return msg('step.noAppear', { selector: describe(selector) });
      }
      case 'click':
        if (!element) return msg('step.noClick', { selector: describe(selector) });
        element.click();
        break;
      case 'type':
        if (!element) return msg('step.noField', { selector: describe(selector) });
        element.focus && element.focus();
        element.value = step.value;
        fire(element, 'input');
        fire(element, 'change');
        break;
      case 'check':
        if (!element) return msg('step.noElement', { selector: describe(selector) });
        element.checked = step.value !== false;
        fire(element, 'input');
        fire(element, 'change');
        break;
      case 'select':
        if (!element) return msg('step.noElement', { selector: describe(selector) });
        element.value = step.value;
        fire(element, 'change');
        break;
      case 'submit': {
        if (!element) return msg('step.noForm', { selector: describe(selector) });
        var submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        element.dispatchEvent(submitEvent);
        break;
      }
      case 'key':
        if (!element) return msg('step.noElement', { selector: describe(selector) });
        element.dispatchEvent(new KeyboardEvent('keydown', { key: step.key, bubbles: true }));
        element.dispatchEvent(new KeyboardEvent('keyup', { key: step.key, bubbles: true }));
        break;
      case 'event':
        if (!element) return msg('step.noElement', { selector: describe(selector) });
        fire(element, step.type);
        break;
      default:
        return msg('step.unknown', { step: step.do });
    }
    await sleep(step.after === undefined ? 30 : step.after);
    return null;
  }

  async function evaluate(check) {
    switch (check.kind) {
      case 'exists': {
        var found = elementsFor(check);
        if (found.error) return found.error;
        return null;
      }
      case 'absent': {
        var list = query(check.selector);
        if (list === null) return msg('sel.invalid', { selector: describe(check.selector) });
        return list.length ? msg('el.mustNotExist', { selector: describe(check.selector) }) : null;
      }
      case 'count': {
        var all = query(check.selector);
        if (all === null) return msg('sel.invalid', { selector: describe(check.selector) });
        return compare(all.length, check, msg('label.count', { selector: describe(check.selector) }));
      }
      case 'text':
        return overElements(check, function (element) {
          var value = check.raw ? element.textContent : normText(element.textContent);
          return compare(value, check, msg('label.text', { selector: describe(check.selector) }));
        });
      case 'html':
        return overElements(check, function (element) {
          return compare(normText(element.innerHTML), check, msg('label.html', { selector: describe(check.selector) }));
        });
      case 'attr':
        return overElements(check, function (element) {
          var value = element.getAttribute(check.name);
          if (value === null) return msg('attr.missing', { selector: describe(check.selector), name: check.name });
          if (check.exists && check.equals === undefined && check.contains === undefined && check.matches === undefined) return null;
          return compare(value, check, msg('label.attr', { name: check.name, selector: describe(check.selector) }));
        });
      case 'noAttr':
        return overElements(check, function (element) {
          return element.hasAttribute(check.name)
            ? msg('attr.forbidden', { selector: describe(check.selector), name: check.name })
            : null;
        });
      case 'prop':
        return overElements(check, function (element) {
          return compare(element[check.name], check, msg('label.prop', { name: check.name, selector: describe(check.selector) }));
        });
      case 'style':
        return overElements(check, function (element) {
          var computed = getComputedStyle(element, check.pseudo || null);
          var raw = computed.getPropertyValue(check.prop).trim();
          var label = msg('label.style', { prop: check.prop, selector: describe(check.selector) });
          var actual = (check.min !== undefined || check.max !== undefined) ? parseFloat(raw) : raw;

          var direct = compare(actual, check, label);
          if (!direct) return null;
          if (check.equals === undefined && check.oneOf === undefined) return direct;

          // Second pass through a probe element, so `blue` matches `rgb(0, 0, 255)`.
          var spec = Object.assign({}, check);
          if (spec.equals !== undefined) spec.equals = normalizeCssValue(check.prop, spec.equals);
          if (spec.oneOf !== undefined) {
            spec.oneOf = spec.oneOf.map(function (v) { return normalizeCssValue(check.prop, v); });
          }
          var normalized = compare(actual, spec, label);
          return normalized ? direct : null;
        });
      case 'cssRule': {
        var rules = allRules().filter(function (rule) {
          if (!rule.selector) return false;
          if (check.media && rule.media.indexOf(check.media) === -1) return false;
          if (check.selectorContains) return normalizeSelector(rule.selector).indexOf(normalizeSelector(check.selectorContains)) !== -1;
          return normalizeSelector(rule.selector) === normalizeSelector(check.selector);
        });
        var where = check.media ? msg('where.media', { media: check.media }) : '';
        if (!rules.length) return msg('rule.notFound', { selector: describe(check.selector || check.selectorContains), where: where });
        if (!check.prop) return null;
        var lastReason = null;
        for (var r = 0; r < rules.length; r++) {
          var declared = rules[r].style.getPropertyValue(check.prop);
          if (!declared) continue;
          lastReason = compare(declared.trim(), check, msg('label.cssRule', { prop: check.prop, where: where }));
          if (!lastReason) return null;
        }
        return lastReason || msg('rule.noProp', { selector: describe(check.selector || check.selectorContains), where: where, prop: check.prop });
      }
      case 'source': {
        var text = SOURCE[check.lang || 'html'] || '';
        return compare(text, check, msg('label.source', { lang: check.lang || 'html' }));
      }
      case 'console': {
        var joined = CONSOLE_LOG.map(function (entry) { return entry.text; }).join('\n');
        if (!CONSOLE_LOG.length && (check.contains !== undefined || check.matches !== undefined)) {
          return msg('console.empty');
        }
        return compare(joined, check, msg('label.console'));
      }
      case 'alert': {
        if (!ALERTS.length) return msg('alert.none');
        var joinedAlerts = ALERTS.join('\n');
        return compare(joinedAlerts, check, msg('label.alert'));
      }
      case 'noError':
        return ERRORS.length ? msg('error.inConsole', { message: ERRORS[0] }) : null;
      case 'storage': {
        var snapshot = storageSnapshot();
        var value = snapshot[check.key];
        if (value === undefined || value === null) {
          return msg('storage.missing', { key: check.key });
        }
        if (check.equals === undefined && check.contains === undefined && check.matches === undefined) return null;
        return compare(value, check, msg('label.storage', { key: check.key }));
      }
      case 'interact': {
        var steps = check.steps || [];
        for (var i = 0; i < steps.length; i++) {
          var problem = await runStep(steps[i]);
          if (problem) return problem;
        }
        var after = check.then || [];
        for (var j = 0; j < after.length; j++) {
          var reason = await withRetry(after[j]);
          if (reason) return reason;
        }
        return null;
      }
      case 'custom': {
        var ctx = {
          doc: document,
          win: window,
          source: SOURCE,
          console: CONSOLE_LOG,
          alerts: ALERTS,
          errors: ERRORS,
          storage: storageSnapshot(),
          $: function (s) { return document.querySelector(s); },
          $$: function (s) { return query(s) || []; },
          text: normText,
          sleep: sleep
        };
        var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
        var fn = new AsyncFunction('ctx', check.fn);
        var outcome = await fn(ctx);
        if (outcome === true || outcome === undefined || outcome === null) return null;
        if (outcome === false) return localizePhrases(check.fail) || msg('check.failed');
        if (typeof outcome === 'string') return localizePhrases(outcome);
        return outcome.ok ? null : (localizePhrases(outcome.message) || localizePhrases(check.fail) || msg('check.failed'));
      }
      default:
        return msg('check.unknown', { kind: check.kind });
    }
  }

  async function withRetry(check) {
    var budget = check.waitMs === undefined ? 200 : check.waitMs;
    var deadline = Date.now() + budget;
    var reason = await evaluate(check);
    while (reason && Date.now() < deadline) {
      await sleep(40);
      reason = await evaluate(check);
    }
    return reason;
  }

  async function runChecks(runId, checks) {
    var results = [];
    for (var i = 0; i < checks.length; i++) {
      var check = checks[i];
      var reason = null;
      try {
        reason = await withRetry(check);
      } catch (error) {
        reason = msg('check.error', { message: error && error.message ? error.message : String(error) });
      }
      results.push({ label: check.label, ok: !reason, message: reason || '' });
    }
    post({ type: 'check-result', runId: runId, results: results });
  }

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.type !== 'run-checks') return;
    runChecks(data.runId, data.checks || []);
  });

  function announceReady() {
    post({ type: 'ready', storage: storageSnapshot() });
  }
  if (document.readyState === 'complete') {
    setTimeout(announceReady, 0);
  } else {
    window.addEventListener('load', function () { setTimeout(announceReady, 0); });
  }
})();
