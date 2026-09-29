<!--
  A deliberately small code editor: a <textarea> with a synced line gutter,
  Tab indentation and bracket/quote auto-closing. Everything a beginner needs
  and nothing that gets in the way.

  It also reports *how* the text arrived — typed, pasted or deleted — so the
  activity log can tell the difference. A new `modelValue` from the parent
  (a task opened, a solution revealed) reports nothing: the caller knows what
  it did and logs it itself.
-->
<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { t } from '../composables/i18n.js';

const props = defineProps({
  modelValue: { type: String, default: '' },
  language: { type: String, default: 'html' }
});

const emit = defineEmits(['update:modelValue', 'activity']);

const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const INDENT = '  ';

const area = ref(null);
const gutter = ref(null);
const text = ref(props.modelValue);
const caret = ref({ line: 1, column: 1 });

let lastLength = props.modelValue.length;
let pendingPaste = 0;

const lineNumbers = computed(() => {
  const count = text.value.split('\n').length;
  return Array.from({ length: count }, (_, index) => index + 1).join('\n');
});

const placeholder = computed(() =>
  ['html', 'css', 'js'].includes(props.language) ? t(`editor.placeholder.${props.language}`) : ''
);

// Only a value that differs from what is on screen is written back: setting a
// textarea's value moves the caret to the end.
watch(() => props.modelValue, (value) => {
  if (!area.value || area.value.value === value) return;
  area.value.value = value;
  text.value = value;
  lastLength = value.length;
  pendingPaste = 0;
  area.value.scrollTop = 0;
  updateCaret();
});

onMounted(() => {
  area.value.value = props.modelValue;
  updateCaret();
});

function updateCaret() {
  if (!area.value) return;
  const lines = area.value.value.slice(0, area.value.selectionStart).split('\n');
  caret.value = { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

function commit(kind, chars) {
  text.value = area.value.value;
  lastLength = text.value.length;
  updateCaret();
  if (kind) emit('activity', { kind, chars });
  emit('update:modelValue', text.value);
}

/** Classifies an edit: pasted, deleted or actually typed. */
function onInput(event) {
  const delta = area.value.value.length - lastLength;
  const inputType = event.inputType || '';
  const pasted = pendingPaste;
  pendingPaste = 0;

  if (pasted || /Paste|Drop/.test(inputType)) commit('paste', Math.max(delta, pasted, 1));
  else if (delta < 0 || inputType.startsWith('delete')) commit('delete', Math.abs(delta) || 1);
  else commit('type', delta || 1);
}

// Both land as an `input` event right after; the flag carries the size of
// what arrived, which the event itself does not expose.
function onPaste(event) {
  const pasted = (event.clipboardData && event.clipboardData.getData('text')) || '';
  pendingPaste = pasted.length || 1;
}

function onDrop(event) {
  const dropped = (event.dataTransfer && event.dataTransfer.getData('text')) || '';
  pendingPaste = dropped.length || 1;
}

function onScroll() {
  if (gutter.value) gutter.value.scrollTop = area.value.scrollTop;
}

function replaceSelection(insert, caretOffset) {
  const element = area.value;
  const { selectionStart: start, selectionEnd: end, value } = element;
  element.value = value.slice(0, start) + insert + value.slice(end);
  const at = start + (caretOffset === undefined ? insert.length : caretOffset);
  element.selectionStart = element.selectionEnd = at;
  const delta = element.value.length - lastLength;
  commit(delta < 0 ? 'delete' : 'type', Math.abs(delta) || 1);
}

function indentBlock(outdent) {
  const element = area.value;
  const { selectionStart: start, selectionEnd: end, value } = element;
  const from = value.lastIndexOf('\n', start - 1) + 1;
  const block = value.slice(from, end);
  const updated = outdent ? block.replace(/^[ \t]{1,2}/gm, '') : block.replace(/^/gm, INDENT);
  element.value = value.slice(0, from) + updated + value.slice(end);
  element.selectionStart = from;
  element.selectionEnd = from + updated.length;
  const delta = element.value.length - lastLength;
  commit(delta < 0 ? 'delete' : 'type', Math.abs(delta) || 1);
}

function onKeyDown(event) {
  const { key } = event;
  const { selectionStart: start, selectionEnd: end, value } = area.value;

  if (key === 'Tab') {
    event.preventDefault();
    if (start !== end && value.slice(start, end).includes('\n')) indentBlock(event.shiftKey);
    else replaceSelection(INDENT);
    return;
  }

  if (key === 'Enter') {
    if (event.metaKey || event.ctrlKey) return; // run / check shortcuts
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const indent = (value.slice(lineStart, start).match(/^[ \t]*/) || [''])[0];
    const before = value[start - 1];
    const after = value[start];
    if (before && after && PAIRS[before] === after) {
      event.preventDefault();
      replaceSelection(`\n${indent}${INDENT}\n${indent}`, 1 + indent.length + INDENT.length);
      return;
    }
    if (indent) {
      event.preventDefault();
      replaceSelection(`\n${indent}`);
    }
    return;
  }

  if (PAIRS[key] && start === end && !event.metaKey && !event.ctrlKey) {
    const nextChar = value[start] || '';
    const isQuote = key === '"' || key === "'" || key === '`';
    if (isQuote && /[\w"'`]/.test(nextChar)) return;
    event.preventDefault();
    replaceSelection(key + PAIRS[key], 1);
    return;
  }

  if (key === 'Backspace' && start === end && start > 0) {
    const before = value[start - 1];
    if (PAIRS[before] && value[start] === PAIRS[before]) {
      event.preventDefault();
      area.value.value = value.slice(0, start - 1) + value.slice(start + 1);
      area.value.selectionStart = area.value.selectionEnd = start - 1;
      commit('delete', 2);
    }
  }
}

function focus() {
  nextTick(() => area.value && area.value.focus());
}

defineExpose({ focus });
</script>

<template>
  <div class="editor__body">
    <div class="editor__pane">
      <div ref="gutter" class="editor__gutter" aria-hidden="true">{{ lineNumbers }}</div>
      <textarea
        ref="area"
        class="editor__area"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        :data-language="language"
        :placeholder="placeholder"
        :aria-label="t('editor.label')"
        @input="onInput"
        @paste="onPaste"
        @drop="onDrop"
        @scroll="onScroll"
        @keydown="onKeyDown"
        @keyup="updateCaret"
        @click="updateCaret"
      ></textarea>
    </div>
    <div class="editor__hintbar">
      <span>{{ t('editor.position', caret) }}</span>
      <span>{{ t('editor.runHint') }}</span>
    </div>
  </div>
</template>
