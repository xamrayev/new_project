<!-- Course map of the self-study track: modules, progress bars, every lesson. -->
<script setup>
import { computed, onBeforeUnmount, watch } from 'vue';
import { course, progress, progressTick } from '../composables/store.js';
import { t } from '../composables/i18n.js';

const props = defineProps({
  open: { type: Boolean, default: false },
  currentLessonId: { type: String, default: '' }
});

const emit = defineEmits(['close', 'open-lesson', 'reset']);

const onKeyDown = (event) => { if (event.key === 'Escape') emit('close'); };
watch(() => props.open, (open) => {
  if (open) document.addEventListener('keydown', onKeyDown);
  else document.removeEventListener('keydown', onKeyDown);
});
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown));

const modules = computed(() => {
  void progressTick.value;
  return course.value.modules.map((module) => {
    const stats = progress.moduleStats(module.lessons);
    return {
      id: module.id,
      title: module.title,
      stats,
      percent: stats.tasksTotal ? Math.round((stats.tasksDone / stats.tasksTotal) * 100) : 0,
      lessons: module.lessons.map((lesson) => ({ lesson, stats: progress.lessonStats(lesson) }))
    };
  });
});

const summary = computed(() => {
  const totals = modules.value.reduce(
    (acc, module) => ({ tasks: acc.tasks + module.stats.tasksDone, lessons: acc.lessons + module.stats.lessonsDone }),
    { tasks: 0, lessons: 0 }
  );
  return t('sidebar.summary', {
    lessons: totals.lessons,
    lessonsTotal: course.value.totalLessons,
    tasks: totals.tasks,
    tasksTotal: course.value.totalTasks
  });
});

function openLesson(id) {
  emit('open-lesson', id);
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="scrim" @click="emit('close')"></div>
    <aside v-if="open" class="sidebar" :aria-label="t('top.courseMap')">
      <div class="sidebar__head">
        <h2>{{ t('nav.study') }}</h2>
        <span class="mod__stat">{{ summary }}</span>
        <button type="button" class="btn btn--sm btn--ghost" :aria-label="t('sidebar.close')" @click="emit('close')">✕</button>
      </div>
      <div class="sidebar__body">
        <section v-for="module in modules" :key="module.id" class="mod">
          <div class="mod__head">
            <span class="mod__name">{{ module.title }}</span>
            <span class="mod__stat">{{ module.stats.tasksDone }}/{{ module.stats.tasksTotal }}</span>
          </div>
          <div class="bar">
            <div class="bar__fill" :class="{ 'bar__fill--done': module.percent === 100 }" :style="{ width: `${module.percent}%` }"></div>
          </div>
          <ul class="lessons">
            <li v-for="{ lesson, stats } in module.lessons" :key="lesson.id">
              <button
                type="button"
                class="lesson-item"
                :class="{ 'lesson-item--done': stats.complete }"
                :aria-current="lesson.id === currentLessonId ? 'true' : null"
                @click="openLesson(lesson.id)"
              >
                <span class="lesson-item__num">{{ String(lesson.number).padStart(2, '0') }}</span>
                <span class="lesson-item__name">{{ lesson.title }}</span>
                <span class="lesson-item__tasks">{{ stats.complete ? '✓ ' : '' }}{{ stats.done }}/{{ stats.total }}</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
      <div class="sidebar__foot">
        <button type="button" class="btn btn--sm" @click="emit('reset')">{{ t('sidebar.resetProgress') }}</button>
      </div>
    </aside>
  </Teleport>
</template>
