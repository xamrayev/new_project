/*
 * The free sandbox: a playground with no task attached.
 *
 * A code example in a lecture or a practical guide opens here with its
 * "Try it" button. The example travels through sessionStorage (a hand-off, read
 * once), while whatever the student then types is kept in localStorage, so the
 * sandbox survives a reload but a new example always starts clean.
 */

export const SANDBOX_KEY = 'webdev-course:sandbox:v1';
const HANDOFF_KEY = 'webdev-course:sandbox-handoff';

const EMPTY = { html: '', css: '', js: '' };

/** Normalizes a code block's `run` field into a full source. */
export function sourceOf(block) {
  if (block.run && typeof block.run === 'object') return { ...EMPTY, ...block.run };
  const lang = block.lang === 'javascript' ? 'js' : block.lang;
  if (lang === 'css') return { ...EMPTY, css: block.code, html: '<p>CSS natijasi uchun HTML yozing</p>' };
  if (lang === 'js') return { ...EMPTY, js: block.code };
  return { ...EMPTY, html: block.code };
}

/**
 * @param {{html?: string, css?: string, js?: string}} source
 * @param {{title?: string, back?: object}} meta where the example came from
 */
export function handOff(source, meta = {}) {
  try {
    sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({ source: { ...EMPTY, ...source }, ...meta }));
  } catch (error) {
    // Storage blocked: the sandbox simply opens with the saved or empty code.
  }
}

/** Takes the pending example, if any; a second read gets nothing. */
export function takeHandOff() {
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(HANDOFF_KEY);
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export function loadSandbox() {
  try {
    const raw = localStorage.getItem(SANDBOX_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

export function saveSandbox(state) {
  try {
    localStorage.setItem(SANDBOX_KEY, JSON.stringify(state));
  } catch (error) {
    // Nothing to do: the code stays on screen for this session.
  }
}
