<!--
  The "clear the cache" block: what is stored, how much of it there is, and a
  button per slice so wiping the log never costs a student their progress.
-->
<script setup>
import { computed } from 'vue';
import { cacheReport, clearCache, formatBytes, totalBytes } from '../state/cache.js';
import { classes, classesTick, log, logTick, progress, progressTick } from '../composables/store.js';
import { confirmDialog, toast } from '../composables/feedback.js';
import { t } from '../composables/i18n.js';

const emit = defineEmits(['cleared']);

const report = computed(() => {
  void progressTick.value;
  void logTick.value;
  void classesTick.value;
  return {
    rows: cacheReport(progress, log, classes),
    total: formatBytes(totalBytes(progress, log, classes))
  };
});

async function clear(id, question) {
  if (!(await confirmDialog(question, { danger: true }))) return;
  clearCache(id, { progress, log, classes });
  if (id !== 'log') log.add('system', { detail: t(`log.detail.cleared.${id}`) });
  toast(t('toast.cacheCleared'), 'info');
  emit('cleared', id);
}

function exportCache() {
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      progress: JSON.parse(progress.export()),
      classes: JSON.parse(classes.export()),
      log: JSON.parse(log.export())
    },
    null,
    2
  );
  const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'webdev-course-cache.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
</script>

<template>
  <section class="cache">
    <div class="cache__head">
      <h3>{{ t('cache.title') }}</h3>
      <span class="cache__total">{{ report.total }}</span>
    </div>
    <p class="cache__hint">{{ t('cache.hint') }}</p>
    <div class="cache__rows">
      <div v-for="row in report.rows" :key="row.id" class="cache__row">
        <span class="cache__name">{{ t(`cache.${row.id}`) }}</span>
        <span class="cache__stat">{{ t(`cache.${row.id}Count`, { count: row.count }) }} · {{ formatBytes(row.bytes) }}</span>
        <button
          type="button"
          class="btn btn--sm btn--ghost"
          :disabled="!row.count"
          @click="clear(row.id, t(`confirm.clear.${row.id}`))"
        >{{ t('cache.clear') }}</button>
      </div>
    </div>
    <div class="cache__foot">
      <button type="button" class="btn btn--sm btn--danger" @click="clear('all', t('confirm.clearAll'))">{{ t('cache.clearAll') }}</button>
      <button type="button" class="btn btn--sm btn--ghost" @click="exportCache">{{ t('cache.export') }}</button>
    </div>
  </section>
</template>
