<!--
  The top bar every view shares: the logo (back to the hub), the switch between
  the two directions — class sessions and self-study — and the language and
  theme controls. A view fills in the rest through slots: `lead` before the
  logo (the course-map burger), `title`, and `actions` before the language.
-->
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { LOCALES, locale, t } from '../composables/i18n.js';
import { changeLocale, toggleTheme } from '../composables/store.js';

const route = useRoute();

const section = computed(() => {
  const name = String(route.name || '');
  if (['classes', 'lecture', 'practical'].includes(name)) return 'classes';
  if (name === 'study') return 'study';
  return '';
});
</script>

<template>
  <header class="top">
    <slot name="lead" />
    <RouterLink class="top__home" :to="{ name: 'hub' }" :title="t('nav.hub')" :aria-label="t('nav.hub')">
      <img src="../../assets/favicon.svg" alt="" width="28" height="28">
    </RouterLink>

    <nav class="top__sections" :aria-label="t('nav.sections')">
      <RouterLink
        class="top__section"
        :class="{ 'top__section--on': section === 'classes' }"
        :to="{ name: 'classes' }"
      >{{ t('nav.classes') }}</RouterLink>
      <RouterLink
        class="top__section"
        :class="{ 'top__section--on': section === 'study' }"
        :to="{ name: 'study' }"
      >{{ t('nav.study') }}</RouterLink>
    </nav>

    <div class="top__title">
      <slot name="title" />
    </div>

    <div class="top__spacer"></div>

    <div class="top__nav">
      <slot name="actions" />
      <select
        class="btn btn--sm lang"
        :value="locale"
        :title="t('top.language')"
        :aria-label="t('top.language')"
        @change="changeLocale($event.target.value)"
      >
        <option v-for="entry in LOCALES" :key="entry.id" :value="entry.id" :title="entry.label">{{ entry.short }}</option>
      </select>
      <button
        type="button"
        class="btn btn--sm"
        :title="t('top.toggleTheme')"
        :aria-label="t('top.toggleTheme')"
        @click="toggleTheme"
      >◐</button>
    </div>
  </header>
</template>
