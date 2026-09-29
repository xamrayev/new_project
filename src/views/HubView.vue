<!--
  Kurs bosh sahifasi: ikki yo'nalish.
    - Dars mashg'ulotlari — auditoriyadagi ma'ruza va amaliy mashg'ulotlar;
    - Mustaqil ta'lim — 34 ta interaktiv dars va avtomatik tekshiriladigan
      topshiriqlar.
  Har bir kartada talabaning shu yo'nalishdagi natijasi va "davom etish" havolasi.
-->
<script setup>
import { computed, onMounted } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import { LECTURES, PRACTICALS } from '../classes/index.js';
import { classes, classesTick, course, progress, progressTick } from '../composables/store.js';
import { t } from '../composables/i18n.js';

const classStats = computed(() => {
  void classesTick.value;
  const read = LECTURES.filter((item) => classes.isRead(item.id)).length;
  const practicals = PRACTICALS.filter((item) => classes.isPracticalDone(item)).length;
  const nextLecture = LECTURES.find((item) => !classes.isRead(item.id));
  const nextPractical = PRACTICALS.find((item) => !classes.isPracticalDone(item));
  const total = LECTURES.length + PRACTICALS.length;
  return {
    read,
    practicals,
    nextLecture,
    nextPractical,
    percent: total ? Math.round(((read + practicals) / total) * 100) : 0
  };
});

const studyStats = computed(() => {
  void progressTick.value;
  const stats = progress.moduleStats(course.value.lessons);
  const last = progress.last && course.value.getLesson(progress.last.lessonId);
  return {
    ...stats,
    last,
    percent: stats.tasksTotal ? Math.round((stats.tasksDone / stats.tasksTotal) * 100) : 0
  };
});

onMounted(() => { document.title = t('hub.documentTitle'); });
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #title>
        <span class="top__lesson">{{ t('hub.title') }}</span>
        <span class="top__module">{{ t('hub.subtitle') }}</span>
      </template>
    </AppHeader>

    <main class="page">
      <div class="page__inner">
        <header class="hub-hero">
          <p class="hub-hero__kicker">{{ t('hub.kicker') }}</p>
          <h1>{{ t('hub.title') }}</h1>
          <p class="hub-hero__lead">{{ t('hub.lead') }}</p>
        </header>

        <div class="hub-cards">
          <section class="hub-card hub-card--classes">
            <div class="hub-card__icon" aria-hidden="true">🎓</div>
            <h2>{{ t('nav.classes') }}</h2>
            <p>{{ t('hub.classesText') }}</p>
            <ul class="hub-card__facts">
              <li><strong>{{ LECTURES.length }}</strong> {{ t('hub.lectures') }}</li>
              <li><strong>{{ PRACTICALS.length }}</strong> {{ t('hub.practicals') }}</li>
            </ul>
            <div class="bar"><div class="bar__fill" :class="{ 'bar__fill--done': classStats.percent === 100 }" :style="{ width: `${classStats.percent}%` }"></div></div>
            <p class="hub-card__stat">{{ t('hub.classesProgress', { read: classStats.read, lectures: LECTURES.length, done: classStats.practicals, practicals: PRACTICALS.length }) }}</p>
            <div class="hub-card__actions">
              <RouterLink class="btn btn--primary" :to="{ name: 'classes' }">{{ t('hub.openClasses') }}</RouterLink>
              <RouterLink
                v-if="classStats.nextLecture"
                class="btn"
                :to="{ name: 'lecture', params: { id: classStats.nextLecture.id } }"
              >{{ t('hub.nextLecture', { code: classStats.nextLecture.code }) }}</RouterLink>
              <RouterLink
                v-if="classStats.nextPractical"
                class="btn"
                :to="{ name: 'practical', params: { id: classStats.nextPractical.id } }"
              >{{ t('hub.nextPractical', { code: classStats.nextPractical.code }) }}</RouterLink>
            </div>
          </section>

          <section class="hub-card hub-card--study">
            <div class="hub-card__icon" aria-hidden="true">🧑‍💻</div>
            <h2>{{ t('nav.study') }}</h2>
            <p>{{ t('hub.studyText') }}</p>
            <ul class="hub-card__facts">
              <li><strong>{{ course.totalLessons }}</strong> {{ t('hub.lessons') }}</li>
              <li><strong>{{ course.totalTasks }}</strong> {{ t('hub.tasks') }}</li>
            </ul>
            <div class="bar"><div class="bar__fill" :class="{ 'bar__fill--done': studyStats.percent === 100 }" :style="{ width: `${studyStats.percent}%` }"></div></div>
            <p class="hub-card__stat">{{ t('hub.studyProgress', { lessons: studyStats.lessonsDone, lessonsTotal: studyStats.lessonsTotal, tasks: studyStats.tasksDone, tasksTotal: studyStats.tasksTotal }) }}</p>
            <div class="hub-card__actions">
              <RouterLink class="btn btn--primary" :to="{ name: 'study' }">
                {{ studyStats.last ? t('hub.continueStudy', { number: studyStats.last.number }) : t('hub.startStudy') }}
              </RouterLink>
            </div>
          </section>
        </div>

        <div class="hub-extra">
          <RouterLink class="hub-extra__link" :to="{ name: 'landing' }">
            <span aria-hidden="true">ℹ</span>
            <span><strong>{{ t('top.home') }}</strong><small>{{ t('hub.landingText') }}</small></span>
          </RouterLink>
          <RouterLink class="hub-extra__link" :to="{ name: 'sandbox' }">
            <span aria-hidden="true">⌨</span>
            <span><strong>{{ t('sandbox.title') }}</strong><small>{{ t('hub.sandboxText') }}</small></span>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>
