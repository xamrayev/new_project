<!-- The top-bar control that reopens closed panes. -->
<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { t } from '../composables/i18n.js';

const panes = inject('panes');
const open = ref(false);

const close = () => { open.value = false; };
const onEscape = (event) => { if (event.key === 'Escape') close(); };

onMounted(() => {
  document.addEventListener('click', close);
  document.addEventListener('keydown', onEscape);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', close);
  document.removeEventListener('keydown', onEscape);
});
</script>

<template>
  <div class="panes-menu">
    <button
      type="button"
      class="btn btn--sm"
      :title="t('top.panes')"
      :aria-label="t('top.panes')"
      :aria-expanded="String(open)"
      @click.stop="open = !open"
    >▦</button>
    <div v-show="open" class="panes-menu__list" @click.stop>
      <div class="panes-menu__caption">{{ t('top.panesTitle') }}</div>
      <button
        v-for="id in panes.ids"
        :key="id"
        type="button"
        class="panes-menu__item"
        :class="{ 'panes-menu__item--on': panes.isOpen(id) }"
        :aria-pressed="String(panes.isOpen(id))"
        @click="panes.toggle(id)"
      >
        <span class="panes-menu__mark">{{ panes.isOpen(id) ? '☑' : '☐' }}</span>
        <span>{{ t(`pane.${id}`) }}</span>
      </button>
    </div>
  </div>
</template>
