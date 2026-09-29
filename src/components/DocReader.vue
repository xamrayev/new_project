<!--
  Reading layout for lectures and practical guides: a table of contents on the
  left, the document on the right, one scroll container.

  The router owns the URL hash, so the contents cannot use #anchor links;
  entries scroll their section into view instead, and the entry of the section
  being read is highlighted as the page scrolls.
-->
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { t } from '../composables/i18n.js';

const props = defineProps({
  /** [{ id, label, done? }] — `id` matches a `sec-<id>` element inside the slot. */
  toc: { type: Array, default: () => [] },
  /** Changes when another document opens: scroll back to the top. */
  docKey: { type: String, default: '' }
});

const scroller = ref(null);
const current = ref('');
const tocOpen = ref(false);
let observer = null;

function go(id) {
  const target = scroller.value && scroller.value.querySelector(`#sec-${id}`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  tocOpen.value = false;
}

function observe() {
  if (observer) observer.disconnect();
  if (!scroller.value || typeof IntersectionObserver === 'undefined') return;
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (visible.length) current.value = visible[0].target.id.replace(/^sec-/, '');
  }, { root: scroller.value, rootMargin: '0px 0px -70% 0px' });
  scroller.value.querySelectorAll('[id^="sec-"]').forEach((section) => observer.observe(section));
}

onMounted(observe);
onBeforeUnmount(() => observer && observer.disconnect());

watch(() => props.docKey, () => {
  if (scroller.value) scroller.value.scrollTop = 0;
  current.value = '';
  nextTick(observe);
});
</script>

<template>
  <div class="reader">
    <nav class="reader__toc" :class="{ 'reader__toc--open': tocOpen }" :aria-label="t('reader.contents')">
      <button type="button" class="reader__toc-toggle" :aria-expanded="String(tocOpen)" @click="tocOpen = !tocOpen">
        ☰ {{ t('reader.contents') }}
      </button>
      <div class="reader__toc-body">
        <slot name="toc-top" />
        <ol class="toc">
          <li v-for="entry in toc" :key="entry.id">
            <button
              type="button"
              class="toc__item"
              :class="{ 'toc__item--on': current === entry.id, 'toc__item--done': entry.done }"
              @click="go(entry.id)"
            >
              <span class="toc__mark" aria-hidden="true">{{ entry.done ? '✓' : '' }}</span>
              <span>{{ entry.label }}</span>
            </button>
          </li>
        </ol>
        <slot name="toc-bottom" />
      </div>
    </nav>
    <div ref="scroller" class="reader__scroll">
      <article class="reader__doc prose">
        <slot />
      </article>
    </div>
  </div>
</template>
