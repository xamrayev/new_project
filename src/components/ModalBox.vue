<!--
  A dialog with a scrim: closed with Escape, the close button or a click
  outside. Deliberately generic — callers render into the default slot.
-->
<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { t } from '../composables/i18n.js';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  variant: { type: String, default: '' }
});

const emit = defineEmits(['close']);
const box = ref(null);

const onKeyDown = (event) => {
  if (event.key === 'Escape') emit('close');
};

watch(() => props.open, (open) => {
  if (open) {
    document.addEventListener('keydown', onKeyDown);
    nextTick(() => box.value && box.value.focus());
  } else {
    document.removeEventListener('keydown', onKeyDown);
  }
}, { immediate: true });

onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <Teleport to="body">
    <template v-if="open">
      <div class="scrim scrim--modal" @click="emit('close')"></div>
      <div
        ref="box"
        class="modal"
        :class="variant ? `modal--${variant}` : ''"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <div class="modal__head">
          <h2 class="modal__title">{{ title }}</h2>
          <div class="modal__tools"><slot name="tools" /></div>
          <button type="button" class="pane__btn" :title="t('pane.close')" :aria-label="t('pane.close')" @click="emit('close')">✕</button>
        </div>
        <div class="modal__body"><slot /></div>
      </div>
    </template>
  </Teleport>
</template>
