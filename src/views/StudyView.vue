<!--
  Self-study workspace: the 34 interactive lessons. Wires the course data, the
  playground, the progress store and the activity log together, and keeps the
  route (#/mustaqil/<lesson>/<task>) in sync with the current task.

  Lesson and task live in shallow refs on purpose: their checks and sandbox
  config are posted into the preview iframe, and a reactive Proxy cannot be
  structured-cloned.
-->
<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import PaneHead from '../components/PaneHead.vue';
import PanesMenu from '../components/PanesMenu.vue';
import PlaygroundPanel from '../components/PlaygroundPanel.vue';
import TasksDock from '../components/TasksDock.vue';
import LogView from '../components/LogView.vue';
import CacheSection from '../components/CacheSection.vue';
import ModalBox from '../components/ModalBox.vue';
import CourseSidebar from '../components/CourseSidebar.vue';
import ContentBlocks from '../components/ContentBlocks.vue';
import { usePanes } from '../composables/panes.js';
import { course, log, logTick, progress } from '../composables/store.js';
import { confirmDialog, toast } from '../composables/feedback.js';
import { t } from '../composables/i18n.js';

const route = useRoute();
const router = useRouter();

const panes = usePanes({
  ids: ['theory', 'editor', 'preview', 'console', 'tasks', 'logs'],
  defaultClosed: ['logs'],
  load: () => progress.panes,
  save: (state) => progress.setPanes(state),
  onRefused: () => toast(t('pane.lastOpen'), 'err')
});
provide('panes', panes);

const lesson = shallowRef(null);
const task = shallowRef(null);
const results = shallowRef(null);
const checking = ref(false);
const sidebarOpen = ref(false);
const logOpen = ref(false);
const playground = ref(null);
const theoryBody = ref(null);

const logCount = computed(() => {
  void logTick.value;
  return log.entries.length;
});

const neighbours = computed(() => (lesson.value ? course.value.neighbours(lesson.value) : {}));

/* ---------------------------------------------------------------- routing */

function lastVisitedLesson() {
  const last = progress.last;
  return (last && course.value.getLesson(last.lessonId)) || course.value.lessons[0];
}

function firstUnsolved(target) {
  return target.tasks.find((entry) => !progress.isTaskDone(target.id, entry.id)) || target.tasks[0];
}

function fromRoute() {
  const { lessonId, task: position } = route.params;
  const target = course.value.getLesson(lessonId) || lastVisitedLesson();
  const targetTask = target.tasks.find((entry) => String(entry.position) === position) || firstUnsolved(target);
  openTask(target, targetTask, { silent: true });
}

function openLesson(lessonId) {
  const target = course.value.getLesson(lessonId);
  if (target) openTask(target, firstUnsolved(target));
}

function openTask(target, targetTask, { silent = false } = {}) {
  // The same lesson object means the same course build: nothing to redo. A
  // language switch rebuilds the course, so the ids match but objects do not.
  if (lesson.value === target && task.value === targetTask) return;
  const moved = !task.value || task.value.id !== targetTask.id;

  lesson.value = target;
  task.value = targetTask;
  results.value = null;

  const params = { lessonId: target.id, task: String(targetTask.position) };
  if (route.params.lessonId !== params.lessonId || route.params.task !== params.task) {
    router[silent ? 'replace' : 'push']({ name: 'study', params });
  }

  progress.setLast(target.id, targetTask.id);
  log.setContext({
    lessonId: target.id,
    lessonNumber: target.number,
    taskId: targetTask.id,
    taskPosition: targetTask.position
  });
  // A language switch re-opens the same task; only a real move is worth an entry.
  if (moved) log.add('open');

  playground.value.configure({ editors: target.editors, sandbox: targetTask.sandbox });
  playground.value.setSource(progress.getDraft(target.id, targetTask.id) || targetTask.starter);
  if (moved && theoryBody.value) theoryBody.value.scrollTop = 0;
  document.title = `${target.number}. ${target.title} — ${t('nav.study')}`;
}

function goToNeighbour(direction) {
  const target = neighbours.value[direction];
  if (target) openLesson(target.id);
}

/** Next unsolved task in this lesson, otherwise the next lesson. */
function goNext() {
  const current = lesson.value;
  const next =
    current.tasks.find((entry) => entry.position > task.value.position && !progress.isTaskDone(current.id, entry.id)) ||
    current.tasks.find((entry) => entry.position === task.value.position + 1);

  if (next) {
    openTask(current, next);
    return;
  }
  const following = neighbours.value.next;
  if (following) {
    openLesson(following.id);
    toast(t('toast.nextLesson', { number: current.number, title: following.title }), 'ok');
  } else {
    toast(t('toast.courseDone'), 'ok', 5000);
  }
}

onMounted(() => {
  fromRoute();
  watch(() => [route.params.lessonId, route.params.task], () => {
    if (route.name === 'study') fromRoute();
  });
  // A new language rebuilds the course; reopen the same task in it.
  watch(course, (next) => {
    const target = next.getLesson(lesson.value.id);
    const targetTask = target && target.tasks.find((entry) => entry.id === task.value.id);
    if (target && targetTask) openTask(target, targetTask, { silent: true });
  });
});

/* ----------------------------------------------------------------- checks */

async function check() {
  if (checking.value) return;
  checking.value = true;
  try {
    const current = { lesson: lesson.value, task: task.value };
    const outcome = await playground.value.check(current.task.checks);
    if (task.value !== current.task) return; // the student moved on meanwhile
    results.value = outcome;

    const passed = outcome.filter((result) => result.ok).length;
    log.add('check', { passed, total: outcome.length });

    if (passed === outcome.length) {
      const isNew = progress.markTask(current.lesson.id, current.task.id, true);
      const stats = progress.lessonStats(current.lesson);
      if (isNew && stats.complete) toast(t('toast.lessonDone', { done: stats.done, total: stats.total }), 'ok', 4000);
      else if (isNew) toast(t('toast.taskDone'), 'ok');
    } else {
      const failed = outcome.find((result) => !result.ok);
      toast(failed ? t('toast.checkFailed', { label: failed.label }) : t('toast.checkFailedGeneric'), 'err');
    }
  } catch (error) {
    toast(t('toast.checkError', { message: error.message }), 'err', 4000);
  } finally {
    checking.value = false;
  }
}

/* ----------------------------------------------------------- task actions */

async function resetTask() {
  if (!(await confirmDialog(t('confirm.resetTask'), { danger: true }))) return;
  progress.clearDraft(lesson.value.id, task.value.id);
  playground.value.configure({ editors: lesson.value.editors, sandbox: task.value.sandbox });
  playground.value.setSource(task.value.starter);
  results.value = null;
  log.add('reset');
  toast(t('toast.taskReset'), 'info');
}

async function showSolution() {
  if (!(await confirmDialog(t('confirm.showSolution'), { okLabel: t('dock.showSolution') }))) return;
  playground.value.setSource(task.value.solution);
  log.add('solution');
  toast(t('toast.solutionLoaded'), 'info', 4000);
}

async function resetProgress() {
  if (!(await confirmDialog(t('confirm.resetProgress'), { danger: true }))) return;
  progress.resetAll();
  log.add('system', { detail: t('log.detail.cleared.progress') });
  toast(t('toast.progressReset'), 'info');
}

function afterRun(source, { byUser } = {}) {
  if (lesson.value && task.value) progress.saveDraft(lesson.value.id, task.value.id, source);
  if (byUser) log.add('run');
}

function afterCacheClear(id) {
  if (id === 'drafts' || id === 'all') {
    playground.value.setSource(task.value.starter);
    results.value = null;
  }
}

/* --------------------------------------------------------------- keyboard */

function onKeyDown(event) {
  if (event.key !== 'Escape') return;
  // Escape belongs to whatever is on top: the modal and the sidebar close
  // themselves, and only then does it leave full screen.
  if (logOpen.value || sidebarOpen.value) return;
  panes.exitFull();
}

onMounted(() => document.addEventListener('keydown', onKeyDown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #lead>
        <button type="button" class="top__burger" :aria-label="t('top.courseMap')" @click="sidebarOpen = !sidebarOpen">☰</button>
      </template>
      <template #title>
        <template v-if="lesson">
          <span class="top__lesson">{{ t('top.lesson', { number: lesson.number, title: lesson.title }) }}</span>
          <span class="top__module">{{ lesson.moduleTitle }} · {{ lesson.summary }}</span>
        </template>
      </template>
      <template #actions>
        <span v-if="lesson" class="top__counter">{{ String(lesson.number).padStart(2, '0') }}/{{ course.totalLessons }}</span>
        <button type="button" class="btn btn--sm top__log" :title="t('top.logs')" :aria-label="t('top.logs')" @click="logOpen = !logOpen">
          📋 <span class="top__log-count">{{ logCount }}</span>
        </button>
        <PanesMenu />
        <button type="button" class="btn btn--sm" :disabled="!neighbours.previous" :title="t('top.previousLesson')" :aria-label="t('top.previousLesson')" @click="goToNeighbour('previous')">←</button>
        <button type="button" class="btn btn--sm" :disabled="!neighbours.next" :title="t('top.nextLesson')" :aria-label="t('top.nextLesson')" @click="goToNeighbour('next')">→</button>
      </template>
    </AppHeader>

    <div class="main" :style="panes.layout.main">
      <article
        class="theory pane"
        data-pane="theory"
        :hidden="!panes.isOpen('theory')"
        :class="{ 'pane--full': panes.isFull('theory') }"
      >
        <PaneHead id="theory" :title="t('pane.theory')" />
        <div ref="theoryBody" class="theory__body">
          <template v-if="lesson">
            <h2>{{ lesson.title }}</h2>
            <ContentBlocks :blocks="lesson.theory" />
          </template>
        </div>
      </article>

      <PlaygroundPanel
        ref="playground"
        @run="afterRun"
        @request-check="check"
        @reset="resetTask"
        @activity="(event) => log.add(event.kind, { lang: event.lang, chars: event.chars })"
      />

      <TasksDock
        v-if="lesson && task"
        :lesson="lesson"
        :task="task"
        :results="results"
        :busy="checking"
        @select="(entry) => openTask(lesson, entry)"
        @check="check"
        @reset="resetTask"
        @solution="showSolution"
        @next="goNext"
        @hint="(shown, total) => log.add('hint', { shown, total })"
      />

      <section
        class="logs pane"
        data-pane="logs"
        :hidden="!panes.isOpen('logs')"
        :class="{ 'pane--full': panes.isFull('logs') }"
      >
        <PaneHead id="logs" :title="t('pane.logs')">
          <span class="logs__count">{{ t('log.count', { count: logCount }) }}</span>
        </PaneHead>
        <LogView />
        <div class="logs__foot">
          <button type="button" class="btn btn--sm btn--ghost" @click="logOpen = true">{{ t('log.manage') }}</button>
        </div>
      </section>
    </div>

    <CourseSidebar
      :open="sidebarOpen"
      :current-lesson-id="lesson ? lesson.id : ''"
      @close="sidebarOpen = false"
      @open-lesson="openLesson"
      @reset="resetProgress"
    />

    <ModalBox :open="logOpen" :title="t('log.title')" variant="log" @close="logOpen = false">
      <LogView filters />
      <CacheSection @cleared="afterCacheClear" />
    </ModalBox>
  </div>
</template>
