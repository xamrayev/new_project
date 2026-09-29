<!--
  The tasks dock: five chips for the lesson's tasks plus the panel of the
  selected one (description, hints, check results, solution).
-->
<script setup>
import { computed, inject, ref, watch } from 'vue';
import PaneHead from './PaneHead.vue';
import { inline } from '../lib/markup.js';
import { progress, progressTick } from '../composables/store.js';
import { t } from '../composables/i18n.js';

const props = defineProps({
  lesson: { type: Object, required: true },
  task: { type: Object, required: true },
  results: { type: Array, default: null },
  busy: { type: Boolean, default: false }
});

const emit = defineEmits(['select', 'check', 'reset', 'solution', 'next', 'hint']);

const panes = inject('panes');
const revealed = ref(0);

watch(() => props.task, () => { revealed.value = 0; });

const isDone = (task) => {
  void progressTick.value;
  return progress.isTaskDone(props.lesson.id, task.id);
};

const stats = computed(() => {
  void progressTick.value;
  return progress.lessonStats(props.lesson);
});

const passed = computed(() => (props.results ? props.results.filter((result) => result.ok).length : 0));
const allPassed = computed(() => Boolean(props.results) && passed.value === props.results.length);

function showHint() {
  revealed.value = Math.min(revealed.value + 1, props.task.hints.length);
  emit('hint', revealed.value, props.task.hints.length);
}
</script>

<template>
  <section
    class="tasks pane"
    data-pane="tasks"
    :hidden="!panes.isOpen('tasks')"
    :class="{ 'pane--full': panes.isFull('tasks') }"
  >
    <PaneHead id="tasks" :title="t('pane.tasks')">
      <span class="tasks__progress">{{ stats.done }}/{{ stats.total }}</span>
    </PaneHead>

    <div class="tasks__list" role="tablist">
      <button
        v-for="entry in lesson.tasks"
        :key="entry.id"
        type="button"
        class="task-chip"
        :class="{ 'task-chip--done': isDone(entry) }"
        role="tab"
        :aria-current="entry.id === task.id ? 'true' : null"
        @click="emit('select', entry)"
      >
        <span class="task-chip__mark">{{ isDone(entry) ? '✓' : '○' }}</span>
        <span class="task-chip__dif" :class="`dif--${entry.difficulty}`"></span>
        <span class="task-chip__label" :title="entry.title">{{ entry.position }}. {{ entry.title }}</span>
      </button>
    </div>

    <div class="task-panel">
      <div class="task-panel__top">
        <h4>{{ t('dock.task', { number: task.position, title: task.title }) }}</h4>
        <span class="badge" :class="`badge--${task.difficulty}`">{{ t(`difficulty.${task.difficulty}`) }}</span>
        <span v-if="isDone(task)" class="badge badge--done">{{ t('dock.solved') }}</span>
      </div>

      <p class="task-panel__desc" v-html="inline(task.description)"></p>

      <div class="task-panel__tools">
        <button type="button" class="btn btn--sm btn--ok" :disabled="busy" @click="emit('check')">
          {{ busy ? t('dock.checking') : t('dock.check') }}
        </button>
        <button
          v-if="task.hints.length"
          type="button"
          class="btn btn--sm"
          :disabled="revealed >= task.hints.length"
          @click="showHint"
        >{{ revealed >= task.hints.length ? t('dock.hintsShown') : t('dock.hint', { shown: revealed, total: task.hints.length }) }}</button>
        <button type="button" class="btn btn--sm btn--ghost" @click="emit('reset')">{{ t('dock.restart') }}</button>
        <button type="button" class="btn btn--sm btn--ghost" @click="emit('solution')">{{ t('dock.showSolution') }}</button>
      </div>

      <ul v-if="revealed" class="hints">
        <li v-for="(hint, index) in task.hints.slice(0, revealed)" :key="index" v-html="inline(hint)"></li>
      </ul>

      <template v-if="results">
        <ul class="results">
          <li v-for="(result, index) in results" :key="index" :class="result.ok ? 'pass' : 'fail'">
            <span class="results__mark">{{ result.ok ? '✓' : '✕' }}</span>
            <span>{{ result.label }}</span>
            <span v-if="!result.ok && result.message" class="results__msg">— {{ result.message }}</span>
          </li>
        </ul>
        <div class="banner" :class="allPassed ? 'banner--ok' : 'banner--fail'">
          {{ allPassed ? t('dock.allPassed') : t('dock.somePassed', { passed, total: results.length }) }}
        </div>
        <div v-if="allPassed" class="task-panel__tools">
          <button type="button" class="btn btn--sm btn--primary" @click="emit('next')">{{ t('dock.next') }}</button>
        </div>
      </template>
    </div>
  </section>
</template>
