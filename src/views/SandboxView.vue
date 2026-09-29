<!--
  The free sandbox: the same playground with no task, no checks and all three
  editors open. Examples from lectures and practical guides land here.
-->
<script setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import PanesMenu from '../components/PanesMenu.vue';
import PlaygroundPanel from '../components/PlaygroundPanel.vue';
import { usePanes } from '../composables/panes.js';
import { loadSandbox, saveSandbox, takeHandOff } from '../composables/sandbox.js';
import { confirmDialog, toast } from '../composables/feedback.js';
import { t } from '../composables/i18n.js';

const EMPTY = { html: '', css: '', js: '' };

const stored = loadSandbox() || {};

const panes = usePanes({
  ids: ['editor', 'preview', 'console'],
  load: () => stored.panes,
  save: (state) => persist({ panes: state }),
  onRefused: () => toast(t('pane.lastOpen'), 'err')
});
provide('panes', panes);

const playground = ref(null);
const origin = ref(stored.origin || null);
let initial = stored.initial || EMPTY;

function persist(patch) {
  Object.assign(stored, patch);
  saveSandbox(stored);
}

onMounted(() => {
  const handed = takeHandOff();
  if (handed) {
    initial = handed.source;
    origin.value = handed.back ? { title: handed.title, route: handed.back } : null;
    persist({ initial, origin: origin.value, source: initial, sandbox: handed.sandbox || null });
  }
  playground.value.configure({ editors: ['html', 'css', 'js'], sandbox: stored.sandbox || {} });
  playground.value.setSource(stored.source || initial);
  document.title = t('sandbox.title');
});

async function reset() {
  if (!(await confirmDialog(t('sandbox.confirmReset'), { danger: true }))) return;
  persist({ source: initial });
  playground.value.setSource(initial);
}

function clearAll() {
  initial = EMPTY;
  persist({ initial, source: EMPTY, origin: null, sandbox: null });
  origin.value = null;
  playground.value.configure({ editors: ['html', 'css', 'js'] });
  playground.value.setSource(EMPTY);
}

const onKeyDown = (event) => { if (event.key === 'Escape') panes.exitFull(); };
onMounted(() => document.addEventListener('keydown', onKeyDown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #title>
        <span class="top__lesson">{{ t('sandbox.title') }}</span>
        <span class="top__module">{{ origin ? t('sandbox.from', { title: origin.title }) : t('sandbox.subtitle') }}</span>
      </template>
      <template #actions>
        <RouterLink v-if="origin" class="btn btn--sm" :to="origin.route">← {{ t('sandbox.back') }}</RouterLink>
        <PanesMenu />
      </template>
    </AppHeader>

    <div class="main main--sandbox" :style="panes.layout.main">
      <PlaygroundPanel
        ref="playground"
        :checkable="false"
        @run="(source) => persist({ source })"
        @reset="reset"
      >
        <template #bar>
          <button type="button" class="btn btn--sm btn--ghost" @click="clearAll">{{ t('sandbox.clear') }}</button>
        </template>
      </PlaygroundPanel>
    </div>
  </div>
</template>
