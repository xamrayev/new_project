<!--
  The activity log. The same view serves the log pane and the log modal.
  Entries hold ids and numbers only, so every label is produced at render time
  and follows the interface language.
-->
<script setup>
import { computed, ref } from 'vue';
import { LOG_GROUPS } from '../state/activity-log.js';
import { course, log, logTick } from '../composables/store.js';
import { t } from '../composables/i18n.js';

defineProps({
  /** Show the filter chips (the modal does, the pane does not). */
  filters: { type: Boolean, default: false }
});

const ICONS = {
  open: '📄',
  type: '✎',
  paste: '📋',
  delete: '⌫',
  run: '▶',
  check: '✓',
  hint: '💡',
  reset: '↻',
  solution: '🔑',
  system: '⚙'
};

const FILTERS = ['all', 'code', 'source', 'checks'];
const filter = ref('all');

const entries = computed(() => {
  void logTick.value;
  return log.recent(filter.value === 'all' ? null : LOG_GROUPS[filter.value]);
});

function formatTime(at) {
  const date = new Date(at);
  // 24-hour everywhere: the log is read next to the lesson, not in a locale-aware report.
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  if (sameDay) return time;
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')} ${time}`;
}

/** The one line that says what happened, plus the grey detail after it. */
function describe(entry) {
  const notes = [];
  if ((entry.kind === 'type' || entry.kind === 'paste') && entry.chars) notes.push(t('log.chars', { chars: entry.chars }));
  if (entry.kind === 'delete' && entry.chars) notes.push(t('log.charsRemoved', { chars: entry.chars }));
  if (entry.kind === 'check') notes.push(t('log.checkResult', { passed: entry.passed || 0, total: entry.total || 0 }));
  if (entry.kind === 'hint') notes.push(t('log.hintNote', { shown: entry.shown || 0, total: entry.total || 0 }));
  if (entry.lang) notes.push(entry.lang.toUpperCase());
  if (entry.detail) notes.push(entry.detail);
  return { title: t(`log.kind.${entry.kind}`), note: notes.join(' · ') };
}

function where(entry) {
  if (!entry.lessonNumber) return '';
  const lesson = String(entry.lessonNumber).padStart(2, '0');
  return entry.taskPosition ? `${lesson}/${entry.taskPosition}` : lesson;
}

function whereTitle(entry) {
  const lesson = entry.lessonId ? course.value.getLesson(entry.lessonId) : null;
  if (!lesson) return null;
  const task = entry.taskId && lesson.tasks.find((item) => item.id === entry.taskId);
  return task ? `${lesson.title} — ${task.title}` : lesson.title;
}
</script>

<template>
  <div class="log">
    <div v-if="filters" class="log__filters">
      <button
        v-for="id in FILTERS"
        :key="id"
        type="button"
        class="chip"
        :class="{ 'chip--on': id === filter }"
        :aria-pressed="String(id === filter)"
        @click="filter = id"
      >{{ t(`log.filter.${id}`) }}</button>
    </div>
    <div class="log__list">
      <p v-if="!entries.length" class="log__empty">{{ t('log.empty') }}</p>
      <div v-for="entry in entries" :key="entry.id" class="log-row" :class="`log-row--${entry.kind}`">
        <span class="log-row__icon">{{ ICONS[entry.kind] || '·' }}</span>
        <div class="log-row__main">
          <span class="log-row__kind">{{ describe(entry).title }}</span>
          <span v-if="describe(entry).note" class="log-row__note">{{ describe(entry).note }}</span>
        </div>
        <span class="log-row__where" :title="whereTitle(entry)">{{ where(entry) }}</span>
        <time class="log-row__time" :datetime="new Date(entry.at).toISOString()">{{ formatTime(entry.at) }}</time>
      </div>
    </div>
  </div>
</template>
