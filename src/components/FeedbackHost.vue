<!-- Toasts and the confirm dialog, mounted once for the whole app. -->
<script setup>
import { nextTick, ref, watch } from 'vue';
import { answerConfirm, confirmState, toasts } from '../composables/feedback.js';
import { t } from '../composables/i18n.js';

const ok = ref(null);

watch(() => confirmState.open, (open) => {
  if (open) nextTick(() => ok.value && ok.value.focus());
});

// Keys stay inside the dialog so Escape does not also close a modal or leave
// full screen underneath it.
function onKeyDown(event) {
  if (event.key === 'Escape') answerConfirm(false);
  event.stopPropagation();
}
</script>

<template>
  <Teleport to="body">
    <div class="toasts" role="status" aria-live="polite">
      <div v-for="entry in toasts" :key="entry.id" class="toast" :class="`toast--${entry.kind}`">{{ entry.message }}</div>
    </div>

    <template v-if="confirmState.open">
      <div class="scrim scrim--modal scrim--confirm" @click="answerConfirm(false)"></div>
      <div class="modal modal--confirm" role="dialog" aria-modal="true" @keydown="onKeyDown">
        <div class="modal__head">
          <h2 class="modal__title">{{ t('confirm.title') }}</h2>
          <button type="button" class="pane__btn" :aria-label="t('pane.close')" @click="answerConfirm(false)">✕</button>
        </div>
        <div class="modal__body">
          <p class="confirm__text">{{ confirmState.message }}</p>
          <div class="confirm__actions">
            <button type="button" class="btn btn--sm btn--ghost" @click="answerConfirm(false)">{{ t('confirm.cancel') }}</button>
            <button
              ref="ok"
              type="button"
              class="btn btn--sm"
              :class="confirmState.danger ? 'btn--danger' : 'btn--primary'"
              @click="answerConfirm(true)"
            >{{ confirmState.okLabel }}</button>
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>
