<!--
  Links between the two directions: from a lecture or a practical guide to the
  related class material and to the self-study lessons on the same topic.
-->
<script setup>
import { computed } from 'vue';
import { course, progress, progressTick } from '../composables/store.js';
import { t } from '../composables/i18n.js';

const props = defineProps({
  lectures: { type: Array, default: () => [] },
  practicals: { type: Array, default: () => [] },
  /** Self-study lesson ids. */
  lessons: { type: Array, default: () => [] }
});

const studyLessons = computed(() => {
  void progressTick.value;
  return props.lessons
    .map((id) => course.value.getLesson(id))
    .filter(Boolean)
    .map((lesson) => ({ lesson, stats: progress.lessonStats(lesson) }));
});
</script>

<template>
  <aside v-if="lectures.length || practicals.length || studyLessons.length" class="related">
    <div v-if="lectures.length" class="related__group">
      <h3>{{ t('related.lectures') }}</h3>
      <RouterLink v-for="item in lectures" :key="item.id" class="related__link" :to="{ name: 'lecture', params: { id: item.id } }">
        <span class="related__code">{{ item.code }}</span>{{ item.title }}
      </RouterLink>
    </div>
    <div v-if="practicals.length" class="related__group">
      <h3>{{ t('related.practicals') }}</h3>
      <RouterLink v-for="item in practicals" :key="item.id" class="related__link" :to="{ name: 'practical', params: { id: item.id } }">
        <span class="related__code related__code--a">{{ item.code }}</span>{{ item.title }}
      </RouterLink>
    </div>
    <div v-if="studyLessons.length" class="related__group">
      <h3>{{ t('related.study') }}</h3>
      <p class="related__hint">{{ t('related.studyHint') }}</p>
      <RouterLink
        v-for="{ lesson, stats } in studyLessons"
        :key="lesson.id"
        class="related__link"
        :to="{ name: 'study', params: { lessonId: lesson.id } }"
      >
        <span class="related__code related__code--s">{{ String(lesson.number).padStart(2, '0') }}</span>
        <span class="related__title">{{ lesson.title }}</span>
        <span class="related__stat" :class="{ 'related__stat--done': stats.complete }">{{ stats.done }}/{{ stats.total }}</span>
      </RouterLink>
    </div>
  </aside>
</template>
