<!--
  Dars mashg'ulotlari: fan dasturidagi ma'ruzalar va amaliy mashg'ulotlar
  ro'yxati, har birining holati bilan (o'qilgan / qadamlar soni).
-->
<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import { LECTURES, PRACTICALS } from '../classes/index.js';
import { classes, classesTick } from '../composables/store.js';
import { locale, t } from '../composables/i18n.js';

const route = useRoute();
const router = useRouter();

const tab = computed(() => (route.query.tab === 'practicals' ? 'practicals' : 'lectures'));

function setTab(next) {
  router.replace({ name: 'classes', query: next === 'lectures' ? {} : { tab: next } });
}

const lectures = computed(() => {
  void classesTick.value;
  return LECTURES.map((item) => ({ item, read: classes.isRead(item.id) }));
});

const practicals = computed(() => {
  void classesTick.value;
  return PRACTICALS.map((item) => ({
    item,
    done: classes.stepsDone(item.id),
    total: item.steps.length,
    complete: classes.isPracticalDone(item)
  }));
});

const readCount = computed(() => lectures.value.filter((entry) => entry.read).length);
const practicalCount = computed(() => practicals.value.filter((entry) => entry.complete).length);

onMounted(() => { document.title = t('nav.classes'); });
</script>

<template>
  <div class="app">
    <AppHeader>
      <template #title>
        <span class="top__lesson">{{ t('nav.classes') }}</span>
        <span class="top__module">{{ t('classes.subtitle') }}</span>
      </template>
    </AppHeader>

    <main class="page">
      <div class="page__inner">
        <header class="page-head">
          <h1>{{ t('nav.classes') }}</h1>
          <p>{{ t('classes.intro') }}</p>
          <div v-if="locale !== 'uz'" class="note note--warn">{{ t('classes.uzOnly') }}</div>
        </header>

        <div class="segmented" role="tablist">
          <button
            type="button"
            role="tab"
            class="segmented__btn"
            :aria-selected="String(tab === 'lectures')"
            @click="setTab('lectures')"
          >{{ t('classes.lectures') }} <span class="segmented__count">{{ readCount }}/{{ LECTURES.length }}</span></button>
          <button
            type="button"
            role="tab"
            class="segmented__btn"
            :aria-selected="String(tab === 'practicals')"
            @click="setTab('practicals')"
          >{{ t('classes.practicals') }} <span class="segmented__count">{{ practicalCount }}/{{ PRACTICALS.length }}</span></button>
        </div>

        <ol v-if="tab === 'lectures'" class="topics">
          <li v-for="{ item, read } in lectures" :key="item.id">
            <RouterLink class="topic" :class="{ 'topic--done': read }" :to="{ name: 'lecture', params: { id: item.id } }">
              <span class="topic__code">{{ item.code }}</span>
              <span class="topic__body">
                <span class="topic__title">{{ item.title }}</span>
                <span class="topic__summary">{{ item.summary }}</span>
              </span>
              <span class="topic__meta">
                <span v-if="item.literature.length" class="topic__lit">[{{ item.literature.join(', ') }}]</span>
                <span class="topic__state">{{ read ? t('classes.read') : t('classes.unread') }}</span>
              </span>
            </RouterLink>
          </li>
        </ol>

        <ol v-else class="topics">
          <li v-for="{ item, done, total, complete } in practicals" :key="item.id">
            <RouterLink class="topic" :class="{ 'topic--done': complete }" :to="{ name: 'practical', params: { id: item.id } }">
              <span class="topic__code topic__code--a">{{ item.code }}</span>
              <span class="topic__body">
                <span class="topic__title">{{ item.title }}</span>
                <span class="topic__summary">{{ item.summary }}</span>
              </span>
              <span class="topic__meta">
                <span class="topic__steps">
                  <span class="bar"><span class="bar__fill" :class="{ 'bar__fill--done': complete }" :style="{ width: `${total ? Math.round(done / total * 100) : 0}%` }"></span></span>
                  {{ done }}/{{ total }}
                </span>
              </span>
            </RouterLink>
          </li>
        </ol>
      </div>
    </main>
  </div>
</template>
