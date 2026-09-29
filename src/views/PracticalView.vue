<!--
  Amaliy mashg'ulotni bajarish qo'llanmasi: maqsad, kerakli vositalar, qisqa
  nazariya, ishni bajarish tartibi (qadamma-qadam), mustaqil topshiriqlar,
  hisobot talablari, baholash mezonlari va nazorat savollari.

  Har bir qadam "bajarildi" deb belgilanadi — belgi brauzerda saqlanadi, shuning
  uchun ish keyingi darsda ham qolgan joyidan davom etadi.
-->
<script setup>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import DocReader from '../components/DocReader.vue';
import ContentBlocks from '../components/ContentBlocks.vue';
import RelatedLinks from '../components/RelatedLinks.vue';
import NavArrow from '../components/NavArrow.vue';
import { PRACTICALS, getPractical, lecturesFor, neighboursOf } from '../classes/index.js';
import { classes, classesTick } from '../composables/store.js';
import { toast } from '../composables/feedback.js';
import { locale, t } from '../composables/i18n.js';
import { inline } from '../lib/markup.js';

const route = useRoute();

const practical = computed(() => getPractical(route.params.id));
const around = computed(() => (practical.value ? neighboursOf(practical.value) : {}));
const lectures = computed(() => (practical.value ? lecturesFor(practical.value) : []));

const done = computed(() => {
  void classesTick.value;
  const item = practical.value;
  return item ? item.steps.map((_, index) => classes.isStepDone(item.id, index)) : [];
});
const doneCount = computed(() => done.value.filter(Boolean).length);
const percent = computed(() => (practical.value && practical.value.steps.length
  ? Math.round((doneCount.value / practical.value.steps.length) * 100)
  : 0));

const toc = computed(() => {
  const item = practical.value;
  if (!item) return [];
  const entries = [{ id: 'goal', label: t('practical.goal') }];
  if (item.theory.length) entries.push({ id: 'theory', label: t('practical.theory') });
  item.steps.forEach((step, index) => entries.push({ id: `step${index}`, label: `${index + 1}. ${step.title}`, done: done.value[index] }));
  if (item.tasks.length) entries.push({ id: 'tasks', label: t('practical.tasks') });
  if (item.report.length) entries.push({ id: 'report', label: t('practical.report') });
  if (item.criteria.length) entries.push({ id: 'criteria', label: t('practical.criteria') });
  if (item.questions.length) entries.push({ id: 'questions', label: t('practical.questions') });
  return entries;
});

const origin = computed(() => practical.value && {
  title: `${practical.value.code}. ${practical.value.title}`,
  route: { name: 'practical', params: { id: practical.value.id } }
});

watchEffect(() => {
  if (practical.value) document.title = `${practical.value.code}. ${practical.value.title}`;
});

function toggleStep(index) {
  const item = practical.value;
  classes.toggleStep(item.id, index);
  if (classes.isPracticalDone(item) && classes.isStepDone(item.id, index)) toast(t('practical.allDone'), 'ok', 4000);
}
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #title>
        <template v-if="practical">
          <span class="top__lesson">{{ practical.code }}. {{ practical.title }}</span>
          <span class="top__module">{{ t('classes.practical') }} · {{ practical.number }}/{{ PRACTICALS.length }} · {{ t('practical.progress', { done: doneCount, total: practical.steps.length }) }}</span>
        </template>
      </template>
      <template #actions>
        <template v-if="practical">
          <NavArrow :to="around.previous && { name: 'practical', params: { id: around.previous.id } }" :label="t('practical.previous')">←</NavArrow>
          <NavArrow :to="around.next && { name: 'practical', params: { id: around.next.id } }" :label="t('practical.next')">→</NavArrow>
        </template>
      </template>
    </AppHeader>

    <div v-if="!practical" class="page page--empty">
      <p>{{ t('classes.notFound') }}</p>
      <RouterLink class="btn btn--primary" :to="{ name: 'classes' }">{{ t('classes.backToList') }}</RouterLink>
    </div>

    <DocReader v-else :toc="toc" :doc-key="practical.id">
      <template #toc-top>
        <RouterLink class="toc__back" :to="{ name: 'classes', query: { tab: 'practicals' } }">← {{ t('classes.allPracticals') }}</RouterLink>
        <div class="toc__progress">
          <div class="bar"><div class="bar__fill" :class="{ 'bar__fill--done': percent === 100 }" :style="{ width: `${percent}%` }"></div></div>
          <span>{{ t('practical.progress', { done: doneCount, total: practical.steps.length }) }}</span>
        </div>
      </template>

      <header class="doc-head">
        <span class="doc-head__code doc-head__code--a">{{ practical.code }}</span>
        <div>
          <p class="doc-head__kind">{{ t('classes.practical') }} · {{ practical.number }}-ish · {{ practical.duration }}</p>
          <h1>{{ practical.title }}</h1>
        </div>
      </header>

      <div v-if="locale !== 'uz'" class="note note--warn">{{ t('classes.uzOnly') }}</div>

      <section id="sec-goal" class="doc-section">
        <h2>{{ t('practical.goal') }}</h2>
        <p class="theory__lead" v-html="inline(practical.goal)"></p>
        <template v-if="practical.outcomes.length">
          <h3>{{ t('practical.outcomes') }}</h3>
          <ul>
            <li v-for="(item, index) in practical.outcomes" :key="index" v-html="inline(item)"></li>
          </ul>
        </template>
        <template v-if="practical.tools.length">
          <h3>{{ t('practical.tools') }}</h3>
          <ul>
            <li v-for="(item, index) in practical.tools" :key="index" v-html="inline(item)"></li>
          </ul>
        </template>
      </section>

      <section v-if="practical.theory.length" id="sec-theory" class="doc-section">
        <h2>{{ t('practical.theory') }}</h2>
        <ContentBlocks :blocks="practical.theory" tools :origin="origin" />
      </section>

      <h2 class="doc-divider">{{ t('practical.steps') }}</h2>
      <section
        v-for="(step, index) in practical.steps"
        :id="`sec-step${index}`"
        :key="index"
        class="doc-section step"
        :class="{ 'step--done': done[index] }"
      >
        <div class="step__head">
          <span class="step__num">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <label class="step__check">
            <input type="checkbox" :checked="done[index]" @change="toggleStep(index)">
            {{ t('practical.stepDone') }}
          </label>
        </div>
        <ContentBlocks :blocks="step.blocks" tools :origin="origin" />
      </section>

      <section v-if="practical.tasks.length" id="sec-tasks" class="doc-section">
        <h2>{{ t('practical.tasks') }}</h2>
        <div v-for="(task, index) in practical.tasks" :key="index" class="variant">
          <div class="variant__head">
            <span class="variant__num">{{ index + 1 }}</span>
            <strong>{{ task.title }}</strong>
            <span v-if="task.level" class="badge" :class="`badge--${task.level}`">{{ t(`difficulty.${task.level}`) }}</span>
          </div>
          <ContentBlocks :blocks="task.blocks" tools :origin="origin" />
        </div>
      </section>

      <section v-if="practical.report.length" id="sec-report" class="doc-section">
        <h2>{{ t('practical.report') }}</h2>
        <ol>
          <li v-for="(item, index) in practical.report" :key="index" v-html="inline(item)"></li>
        </ol>
      </section>

      <section v-if="practical.criteria.length" id="sec-criteria" class="doc-section">
        <h2>{{ t('practical.criteria') }}</h2>
        <ContentBlocks :blocks="[{ table: { head: [t('practical.criterion'), t('practical.points')], rows: practical.criteria } }]" />
      </section>

      <section v-if="practical.questions.length" id="sec-questions" class="doc-section">
        <h2>{{ t('practical.questions') }}</h2>
        <ol class="questions">
          <li v-for="(question, index) in practical.questions" :key="index" v-html="inline(question)"></li>
        </ol>
      </section>

      <RelatedLinks :lectures="lectures" :lessons="practical.lessons" />

      <nav class="doc-pager">
        <RouterLink v-if="around.previous" class="doc-pager__link" :to="{ name: 'practical', params: { id: around.previous.id } }">
          <small>← {{ t('practical.previous') }}</small>{{ around.previous.code }}. {{ around.previous.title }}
        </RouterLink>
        <span v-else></span>
        <RouterLink v-if="around.next" class="doc-pager__link doc-pager__link--next" :to="{ name: 'practical', params: { id: around.next.id } }">
          <small>{{ t('practical.next') }} →</small>{{ around.next.code }}. {{ around.next.title }}
        </RouterLink>
      </nav>
    </DocReader>
  </div>
</template>
