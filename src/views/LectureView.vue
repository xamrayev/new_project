<!--
  Ma'ruza matni: maqsad, reja, tayanch iboralar, asosiy qism, xulosa,
  glossariy, nazorat savollari va adabiyotlar. Talaba ma'ruzani "o'qildi" deb
  belgilaydi; bog'liq amaliy mashg'ulot va mustaqil ta'lim darslariga havola
  pastda turadi.
-->
<script setup>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import DocReader from '../components/DocReader.vue';
import ContentBlocks from '../components/ContentBlocks.vue';
import RelatedLinks from '../components/RelatedLinks.vue';
import NavArrow from '../components/NavArrow.vue';
import { LITERATURE, LECTURES, getLecture, neighboursOf, practicalsFor } from '../classes/index.js';
import { classes, classesTick } from '../composables/store.js';
import { toast } from '../composables/feedback.js';
import { locale, t } from '../composables/i18n.js';
import { inline } from '../lib/markup.js';

const route = useRoute();

const lecture = computed(() => getLecture(route.params.id));
const around = computed(() => (lecture.value ? neighboursOf(lecture.value) : {}));
const practicals = computed(() => (lecture.value ? practicalsFor(lecture.value) : []));

const isRead = computed(() => {
  void classesTick.value;
  return lecture.value ? classes.isRead(lecture.value.id) : false;
});

const toc = computed(() => {
  const item = lecture.value;
  if (!item) return [];
  const entries = [{ id: 'goals', label: t('lecture.goals') }];
  item.sections.forEach((section, index) => entries.push({ id: `s${index}`, label: `${index + 1}. ${section.title}` }));
  if (item.conclusion.length) entries.push({ id: 'conclusion', label: t('lecture.conclusion') });
  if (item.glossary.length) entries.push({ id: 'glossary', label: t('lecture.glossary') });
  if (item.questions.length) entries.push({ id: 'questions', label: t('lecture.questions') });
  entries.push({ id: 'literature', label: t('lecture.literature') });
  return entries;
});

const origin = computed(() => lecture.value && {
  title: `${lecture.value.code}. ${lecture.value.title}`,
  route: { name: 'lecture', params: { id: lecture.value.id } }
});

watchEffect(() => {
  if (lecture.value) document.title = `${lecture.value.code}. ${lecture.value.title}`;
});

function toggleRead() {
  const next = !isRead.value;
  classes.setRead(lecture.value.id, next);
  if (next) toast(t('lecture.markedRead'), 'ok');
}
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #title>
        <template v-if="lecture">
          <span class="top__lesson">{{ lecture.code }}. {{ lecture.title }}</span>
          <span class="top__module">{{ t('classes.lecture') }} · {{ lecture.number }}/{{ LECTURES.length }}</span>
        </template>
      </template>
      <template #actions>
        <template v-if="lecture">
          <NavArrow :to="around.previous && { name: 'lecture', params: { id: around.previous.id } }" :label="t('lecture.previous')">←</NavArrow>
          <NavArrow :to="around.next && { name: 'lecture', params: { id: around.next.id } }" :label="t('lecture.next')">→</NavArrow>
        </template>
      </template>
    </AppHeader>

    <div v-if="!lecture" class="page page--empty">
      <p>{{ t('classes.notFound') }}</p>
      <RouterLink class="btn btn--primary" :to="{ name: 'classes' }">{{ t('classes.backToList') }}</RouterLink>
    </div>

    <DocReader v-else :toc="toc" :doc-key="lecture.id">
      <template #toc-top>
        <RouterLink class="toc__back" :to="{ name: 'classes', query: { tab: 'lectures' } }">← {{ t('classes.allLectures') }}</RouterLink>
      </template>
      <template #toc-bottom>
        <button type="button" class="btn btn--sm reader__mark" :class="isRead ? 'btn--ok' : ''" @click="toggleRead">
          {{ isRead ? t('lecture.read') : t('lecture.markRead') }}
        </button>
      </template>

      <header class="doc-head">
        <span class="doc-head__code">{{ lecture.code }}</span>
        <div>
          <p class="doc-head__kind">{{ t('classes.lecture') }} · {{ lecture.number }}-mavzu</p>
          <h1>{{ lecture.title }}</h1>
          <p v-if="lecture.literature.length" class="doc-head__meta">
            {{ t('lecture.literature') }}: <span v-for="number in lecture.literature" :key="number">[{{ number }}]</span>
          </p>
        </div>
      </header>

      <div v-if="locale !== 'uz'" class="note note--warn">{{ t('classes.uzOnly') }}</div>

      <section id="sec-goals" class="doc-section">
        <h2>{{ t('lecture.goals') }}</h2>
        <ul v-if="lecture.goals.length">
          <li v-for="(goal, index) in lecture.goals" :key="index" v-html="inline(goal)"></li>
        </ul>
        <h3>{{ t('lecture.plan') }}</h3>
        <ol class="doc-plan">
          <li v-for="(section, index) in lecture.sections" :key="index">{{ section.title }}</li>
        </ol>
        <template v-if="lecture.keywords.length">
          <h3>{{ t('lecture.keywords') }}</h3>
          <p class="keywords">
            <span v-for="word in lecture.keywords" :key="word" class="keyword">{{ word }}</span>
          </p>
        </template>
      </section>

      <section v-for="(section, index) in lecture.sections" :id="`sec-s${index}`" :key="index" class="doc-section">
        <h2>{{ index + 1 }}. {{ section.title }}</h2>
        <ContentBlocks :blocks="section.blocks" tools :origin="origin" />
      </section>

      <section v-if="lecture.conclusion.length" id="sec-conclusion" class="doc-section">
        <h2>{{ t('lecture.conclusion') }}</h2>
        <ContentBlocks :blocks="lecture.conclusion" tools :origin="origin" />
      </section>

      <section v-if="lecture.glossary.length" id="sec-glossary" class="doc-section">
        <h2>{{ t('lecture.glossary') }}</h2>
        <ContentBlocks :blocks="[{ terms: lecture.glossary }]" />
      </section>

      <section v-if="lecture.questions.length" id="sec-questions" class="doc-section">
        <h2>{{ t('lecture.questions') }}</h2>
        <ol class="questions">
          <li v-for="(question, index) in lecture.questions" :key="index" v-html="inline(question)"></li>
        </ol>
      </section>

      <section id="sec-literature" class="doc-section">
        <h2>{{ t('lecture.literature') }}</h2>
        <ol class="literature">
          <li v-for="number in lecture.literature" :key="number" :value="number">{{ LITERATURE[number] ? LITERATURE[number].text : `[${number}]` }}</li>
        </ol>
      </section>

      <RelatedLinks :practicals="practicals" :lessons="lecture.lessons" />

      <nav class="doc-pager">
        <RouterLink v-if="around.previous" class="doc-pager__link" :to="{ name: 'lecture', params: { id: around.previous.id } }">
          <small>← {{ t('lecture.previous') }}</small>{{ around.previous.code }}. {{ around.previous.title }}
        </RouterLink>
        <span v-else></span>
        <RouterLink v-if="around.next" class="doc-pager__link doc-pager__link--next" :to="{ name: 'lecture', params: { id: around.next.id } }">
          <small>{{ t('lecture.next') }} →</small>{{ around.next.code }}. {{ around.next.title }}
        </RouterLink>
      </nav>
    </DocReader>
  </div>
</template>
