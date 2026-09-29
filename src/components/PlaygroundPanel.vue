<!--
  The universal playground: HTML / CSS / JS editors, a live preview and a
  console. One component serves every lesson and the free sandbox — the caller
  only says which editors are open and which sandbox extras (mock API, storage
  seed, virtual modules) the page gets.

  The editor, the preview and the console are three independent panes of the
  injected pane manager: each can be closed or blown up to full screen.

  The preview iframe is created by hand, not by the template: SandboxRunner
  swaps in a brand-new frame on every render, and Vue must not hold on to (and
  later try to patch) a node that is no longer in the page.
-->
<script setup>
import { inject, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import CodeEditor from './CodeEditor.vue';
import PaneHead from './PaneHead.vue';
import { SandboxRunner } from '../playground/runner.js';
import { t } from '../composables/i18n.js';

defineProps({
  /** Show the "Check" button (a task is open) or not (free sandbox). */
  checkable: { type: Boolean, default: true }
});

const emit = defineEmits(['run', 'request-check', 'reset', 'activity']);

const LANGUAGES = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JS' }
];

const panes = inject('panes');

const source = reactive({ html: '', css: '', js: '' });
const enabled = ref(['html', 'css', 'js']);
const active = ref('html');
const status = ref('');
const lines = ref([]);
const frameHost = ref(null);
const consoleBody = ref(null);
const editor = ref(null);

let sandbox = {};
let liveStorage = {};
let runner = null;
let debounce = null;
let busy = false;

onMounted(() => {
  const frame = document.createElement('iframe');
  frame.className = 'preview__frame';
  frame.title = t('pg.previewFrame');
  frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-popups');
  frameHost.value.append(frame);

  runner = new SandboxRunner(frame);
  runner.on('console', appendConsole);
  // Keep what the page wrote, so pressing Run again behaves like a reload
  // rather than a fresh browser profile.
  runner.on('storage', (data) => { liveStorage = data; });
});

onBeforeUnmount(() => {
  clearTimeout(debounce);
  if (runner) runner.destroy();
});

/* ------------------------------------------------------------------ state */

/** @param {{editors?: string[], sandbox?: object}} config lesson-level configuration */
function configure({ editors = ['html', 'css', 'js'], sandbox: extras = {} } = {}) {
  enabled.value = editors;
  sandbox = extras;
  liveStorage = { ...(extras.storageSeed || {}) };
  runner.setConfig(extras);
  if (!editors.includes(active.value)) active.value = editors[0] || 'html';
}

function setSource(next, { render = true } = {}) {
  Object.assign(source, { html: '', css: '', js: '', ...next });
  clearConsole();
  if (render) run({ force: true });
}

function getSource() {
  return { ...source };
}

function selectTab(language) {
  if (!enabled.value.includes(language)) return;
  active.value = language;
  if (editor.value) editor.value.focus();
}

function onEdit(value) {
  source[active.value] = value;
  clearTimeout(debounce);
  debounce = setTimeout(() => run(), 800);
}

/* -------------------------------------------------------------- execution */

/**
 * @param {object} [options]
 * @param {boolean} [options.force] run even while a previous render is in flight
 * @param {boolean} [options.byUser] the student pressed Run — worth logging
 */
async function run({ force = false, byUser = false } = {}) {
  if (!runner || (busy && !force)) return;
  clearTimeout(debounce);
  busy = true;
  status.value = t('pg.running');
  clearConsole();
  try {
    runner.setConfig({ ...sandbox, storageSeed: liveStorage });
    await runner.render(source);
    status.value = '';
    emit('run', getSource(), { byUser });
  } finally {
    busy = false;
  }
}

/** Runs a task's checks against a freshly rendered page. */
async function check(checks) {
  clearTimeout(debounce);
  clearConsole();
  status.value = t('pg.checking');
  try {
    // Grading always starts from the lesson's declared storage, never from
    // whatever the student left behind while experimenting.
    runner.setConfig({ ...sandbox, storageSeed: { ...(sandbox.storageSeed || {}) } });
    return await runner.check(source, checks);
  } finally {
    status.value = '';
  }
}

/* ---------------------------------------------------------------- console */

function clearConsole() {
  lines.value = [];
}

function appendConsole({ level, text }) {
  lines.value.push({ level, text, id: lines.value.length });
  nextTick(() => {
    if (consoleBody.value) consoleBody.value.scrollTop = consoleBody.value.scrollHeight;
  });
}

function onKeyDown(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    if (event.shiftKey) emit('request-check');
    else run({ force: true, byUser: true });
  }
}

defineExpose({ configure, setSource, getSource, run, check });
</script>

<template>
  <section class="pg" :hidden="!panes.layout.pgOpen" @keydown="onKeyDown">
    <div class="pg__bar">
      <div class="pg__actions">
        <button type="button" class="btn btn--sm btn--primary" @click="run({ force: true, byUser: true })">{{ t('pg.run') }}</button>
        <button v-if="checkable" type="button" class="btn btn--sm btn--ok" @click="emit('request-check')">{{ t('dock.check') }}</button>
        <button type="button" class="btn btn--sm" @click="emit('reset')">{{ t('pg.reset') }}</button>
      </div>
      <slot name="bar" />
    </div>

    <div class="pg__split" :style="panes.layout.split">
      <div
        class="editor pane"
        data-pane="editor"
        :hidden="!panes.isOpen('editor')"
        :class="{ 'pane--full': panes.isFull('editor') }"
      >
        <PaneHead id="editor" :title="t('pane.editor')">
          <div class="tabs" role="tablist">
            <button
              v-for="lang in LANGUAGES"
              v-show="enabled.includes(lang.id)"
              :key="lang.id"
              type="button"
              class="tab"
              role="tab"
              :disabled="!enabled.includes(lang.id)"
              :aria-selected="String(active === lang.id)"
              @click="selectTab(lang.id)"
            >{{ lang.label }} <span v-show="(source[lang.id] || '').trim()" class="tab__dot">•</span></button>
          </div>
        </PaneHead>
        <CodeEditor
          ref="editor"
          :model-value="source[active]"
          :language="active"
          @update:model-value="onEdit"
          @activity="(event) => emit('activity', { ...event, lang: active })"
        />
      </div>

      <div class="pg__right" :hidden="!panes.layout.rightOpen" :style="panes.layout.right">
        <div
          class="preview pane"
          data-pane="preview"
          :hidden="!panes.isOpen('preview')"
          :class="{ 'pane--full': panes.isFull('preview') }"
        >
          <PaneHead id="preview" :title="t('pane.preview')">
            <span class="preview__status">{{ status }}</span>
          </PaneHead>
          <div ref="frameHost" class="preview__host"></div>
        </div>

        <!-- The console is always live: a student should never have to open a
             panel to find out why nothing happened. -->
        <div
          class="console pane"
          data-pane="console"
          :hidden="!panes.isOpen('console')"
          :class="{ 'pane--full': panes.isFull('console') }"
        >
          <PaneHead id="console" :title="t('pane.console')">
            <button type="button" class="btn btn--sm btn--ghost" @click="clearConsole">{{ t('pg.consoleClear') }}</button>
          </PaneHead>
          <div ref="consoleBody" class="console__body">
            <div v-if="!lines.length" class="console__empty">{{ t('pg.consoleEmpty') }}</div>
            <div
              v-for="line in lines"
              :key="line.id"
              class="console__line"
              :class="`console__line--${line.level}`"
            >{{ line.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
