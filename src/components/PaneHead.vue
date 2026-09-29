<!--
  The standard pane header: title, whatever the pane wants next to it (slot),
  then the full-screen and close buttons of the injected pane manager.
-->
<script setup>
import { computed, inject } from 'vue';
import { t } from '../composables/i18n.js';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
});

const panes = inject('panes');
const full = computed(() => panes.isFull(props.id));
const fullLabel = computed(() => (full.value ? t('pane.exitFull') : t('pane.full')));
</script>

<template>
  <div class="pane__head">
    <span class="pane__title">{{ title }}</span>
    <div v-if="$slots.default" class="pane__extra"><slot /></div>
    <div class="pane__tools">
      <button
        type="button"
        class="pane__btn"
        :title="fullLabel"
        :aria-label="fullLabel"
        :aria-pressed="String(full)"
        @click="panes.toggleFull(id)"
      >{{ full ? '⤡' : '⛶' }}</button>
      <button
        type="button"
        class="pane__btn"
        :title="t('pane.close')"
        :aria-label="t('pane.close')"
        @click="panes.close(id)"
      >✕</button>
    </div>
  </div>
</template>
