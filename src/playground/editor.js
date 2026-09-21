/*
 * A deliberately small code editor: a <textarea> with a synced line gutter,
 * Tab indentation and bracket/quote auto-closing. No dependency, no build step —
 * everything a beginner needs and nothing that gets in the way.
 */

const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const INDENT = '  ';

export class CodeEditor {
  /**
   * @param {object} options
   * @param {(value: string) => void} options.onChange fired on every edit (debounced by the caller)
   */
  constructor({ onChange } = {}) {
    this.onChange = onChange || (() => {});
    this.lineCount = -1;

    this.root = document.createElement('div');
    this.root.className = 'editor';

    this.pane = document.createElement('div');
    this.pane.className = 'editor__pane';

    this.gutter = document.createElement('div');
    this.gutter.className = 'editor__gutter';
    this.gutter.setAttribute('aria-hidden', 'true');

    this.area = document.createElement('textarea');
    this.area.className = 'editor__area';
    this.area.spellcheck = false;
    this.area.autocapitalize = 'off';
    this.area.autocomplete = 'off';
    this.area.setAttribute('autocorrect', 'off');
    this.area.setAttribute('aria-label', 'Редактор кода');

    this.hintbar = document.createElement('div');
    this.hintbar.className = 'editor__hintbar';
    this.position = document.createElement('span');
    this.position.textContent = 'строка 1, столбец 1';
    const tip = document.createElement('span');
    tip.textContent = 'Ctrl/Cmd + Enter — запустить';
    this.hintbar.append(this.position, tip);

    this.pane.append(this.gutter, this.area);
    this.root.append(this.pane, this.hintbar);

    this.area.addEventListener('input', () => {
      this.#refresh();
      this.onChange(this.area.value);
    });
    this.area.addEventListener('scroll', () => {
      this.gutter.scrollTop = this.area.scrollTop;
    });
    this.area.addEventListener('keydown', (event) => this.#onKeyDown(event));
    this.area.addEventListener('keyup', () => this.#updatePosition());
    this.area.addEventListener('click', () => this.#updatePosition());

    this.#refresh();
  }

  get value() { return this.area.value; }

  setValue(value, { keepScroll = false } = {}) {
    const top = this.area.scrollTop;
    this.area.value = value;
    this.#refresh();
    if (keepScroll) this.area.scrollTop = top;
  }

  setLanguage(language) {
    this.area.dataset.language = language;
    this.area.placeholder = {
      html: '<!-- ваш HTML -->',
      css: '/* ваш CSS */',
      js: '// ваш JavaScript'
    }[language] || '';
  }

  focus() { this.area.focus(); }

  #refresh() {
    const lines = this.area.value.split('\n').length;
    if (lines !== this.lineCount) {
      this.lineCount = lines;
      this.gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    }
    this.#updatePosition();
  }

  #updatePosition() {
    const upToCaret = this.area.value.slice(0, this.area.selectionStart);
    const lines = upToCaret.split('\n');
    this.position.textContent = `строка ${lines.length}, столбец ${lines[lines.length - 1].length + 1}`;
  }

  #replaceSelection(text, caretOffset) {
    const { selectionStart: start, selectionEnd: end, value } = this.area;
    this.area.value = value.slice(0, start) + text + value.slice(end);
    const caret = start + (caretOffset === undefined ? text.length : caretOffset);
    this.area.selectionStart = this.area.selectionEnd = caret;
    this.#refresh();
    this.onChange(this.area.value);
  }

  #onKeyDown(event) {
    const { key } = event;
    const { selectionStart: start, selectionEnd: end, value } = this.area;

    if (key === 'Tab') {
      event.preventDefault();
      if (start !== end && value.slice(start, end).includes('\n')) {
        this.#indentBlock(event.shiftKey);
      } else {
        this.#replaceSelection(INDENT);
      }
      return;
    }

    if (key === 'Enter') {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const indent = (value.slice(lineStart, start).match(/^[ \t]*/) || [''])[0];
      const before = value[start - 1];
      const after = value[start];
      if (before && after && PAIRS[before] === after) {
        event.preventDefault();
        this.#replaceSelection(`\n${indent}${INDENT}\n${indent}`, 1 + indent.length + INDENT.length);
        return;
      }
      if (indent) {
        event.preventDefault();
        this.#replaceSelection(`\n${indent}`);
      }
      return;
    }

    if (PAIRS[key] && start === end) {
      const nextChar = value[start] || '';
      const isQuote = key === '"' || key === "'" || key === '`';
      if (isQuote && /[\w"'`]/.test(nextChar)) return;
      event.preventDefault();
      this.#replaceSelection(key + PAIRS[key], 1);
      return;
    }

    if (key === 'Backspace' && start === end && start > 0) {
      const before = value[start - 1];
      if (PAIRS[before] && value[start] === PAIRS[before]) {
        event.preventDefault();
        this.area.value = value.slice(0, start - 1) + value.slice(start + 1);
        this.area.selectionStart = this.area.selectionEnd = start - 1;
        this.#refresh();
        this.onChange(this.area.value);
      }
    }
  }

  #indentBlock(outdent) {
    const { selectionStart: start, selectionEnd: end, value } = this.area;
    const from = value.lastIndexOf('\n', start - 1) + 1;
    const block = value.slice(from, end);
    const updated = outdent
      ? block.replace(/^[ \t]{1,2}/gm, '')
      : block.replace(/^/gm, INDENT);
    this.area.value = value.slice(0, from) + updated + value.slice(end);
    this.area.selectionStart = from;
    this.area.selectionEnd = from + updated.length;
    this.#refresh();
    this.onChange(this.area.value);
  }
}
