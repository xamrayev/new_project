<!--
  Bosh sahifa (landing): kurs haqida — ikki yo‘nalish, raqamlar, qanday
  ishlaydi, dastur, mualliflar, savollar.

  Taqdimot rejimi (P tugmasi yoki #/?taqdimot): har bir bo‘lim butun ekranli
  slaydga aylanadi, ← → / Probel bilan almashadi, F — to‘liq ekran, Esc — chiqish.
  Raqamlar kurs ma’lumotlaridan hisoblanadi (src/landing/content.js ga qarang).
-->
<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LANDING } from '../landing/content.js';
import { LECTURES, PRACTICALS } from '../classes/index.js';
import { course, changeLocale, theme, toggleTheme } from '../composables/store.js';
import { LOCALES, locale } from '../composables/i18n.js';
import { inline } from '../lib/markup.js';

const route = useRoute();
const router = useRouter();

const L = computed(() => LANDING[locale.value] || LANDING.uz);

/* ------------------------------------------------------------------ numbers */

function countExamples(items) {
  let n = 0;
  const walk = (blocks) => (blocks || []).forEach((block) => { if (block && block.code && block.run) n++; });
  items.forEach((item) => {
    walk(item.theory);
    walk(item.conclusion);
    (item.sections || []).forEach((s) => walk(s.blocks));
    (item.steps || []).forEach((s) => walk(s.blocks));
    (item.tasks || []).forEach((s) => walk(s.blocks));
  });
  return n;
}

const numbers = computed(() => {
  const c = course.value;
  const checks = c.lessons.reduce((sum, lesson) => sum + lesson.tasks.reduce((s, task) => s + (task.checks || []).length, 0), 0);
  return {
    lectures: LECTURES.length,
    practicals: PRACTICALS.length,
    lessons: c.totalLessons,
    tasks: c.totalTasks,
    checks,
    examples: countExamples([...LECTURES, ...PRACTICALS])
  };
});

const fill = (text, extra = {}) => String(text).replace(/\{(\w+)\}/g, (whole, key) => {
  const all = { ...numbers.value, ...extra };
  return key in all ? all[key] : whole;
});

const STAT_KEYS = ['lectures', 'practicals', 'lessons', 'tasks', 'checks', 'examples'];
const shown = reactive(Object.fromEntries(STAT_KEYS.map((k) => [k, 0])));
let counted = false;

function countUp() {
  if (counted) return;
  counted = true;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();
  const duration = reduce ? 0 : 1400;
  const frame = (now) => {
    const p = duration ? Math.min(1, (now - start) / duration) : 1;
    const eased = 1 - Math.pow(1 - p, 3);
    STAT_KEYS.forEach((k) => { shown[k] = Math.round(numbers.value[k] * eased); });
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ----------------------------------------------------------- hero demo loop */

const CODE = [
  ['sel', '.card', ' {'],
  ['prop', 'width', '300px'],
  ['prop', 'padding', '20px'],
  ['prop', 'border-radius', '12px'],
  ['prop', 'box-shadow', '0 12px 32px rgb(0 0 0 / .25)'],
  ['end', '}']
];
const demoStep = ref(0);           // how many code lines are typed
let demoTimer = 0;

const demo = computed(() => {
  const s = demoStep.value;
  return {
    width: s >= 2,
    padding: s >= 3,
    radius: s >= 4,
    shadow: s >= 5,
    passed: (s >= 2) + (s >= 4) + (s >= 5),
    done: s >= CODE.length
  };
});

function runDemo() {
  clearInterval(demoTimer);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    demoStep.value = CODE.length;
    return;
  }
  let tick = 0;
  demoTimer = setInterval(() => {
    tick++;
    // 6 lines, one per tick, then a pause, then start over
    demoStep.value = tick <= CODE.length ? tick : tick > CODE.length + 5 ? (tick = 0) : CODE.length;
  }, 900);
}

const maxModule = computed(() => Math.max(...course.value.modules.map((m) => m.lessons.length)));

/* ------------------------------------------------------------ program tabs */

const tab = ref('lectures');
const programList = computed(() => {
  if (tab.value === 'lectures') return LECTURES.map((x) => ({ code: x.code, title: x.title, summary: x.summary, to: { name: 'lecture', params: { id: x.id } } }));
  if (tab.value === 'practicals') return PRACTICALS.map((x) => ({ code: x.code, title: x.title, summary: x.summary, to: { name: 'practical', params: { id: x.id } } }));
  return [];
});

/* --------------------------------------------------------------- reveal-in */

const root = ref(null);
let observer = null;
let slideObserver = null;

function observeReveal() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      if (entry.target.id === 'stats') countUp();
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  root.value.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------- presentation */

const presenting = ref(false);
const slide = ref(0);
const hintVisible = ref(false);
const isFullscreen = ref(false);
let hintTimer = 0;

const slides = () => Array.from(root.value?.querySelectorAll('[data-slide]') || []);

function goTo(index) {
  const list = slides();
  const target = Math.max(0, Math.min(list.length - 1, index));
  slide.value = target;
  list[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setPresenting(on) {
  presenting.value = on;
  document.documentElement.classList.toggle('lp-present', on);
  const query = { ...route.query };
  if (on) query.taqdimot = null; else delete query.taqdimot;
  router.replace({ query });
  if (on) {
    root.value.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    countUp();
    hintVisible.value = true;
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => { hintVisible.value = false; }, 4200);
    nextTick(() => goTo(slide.value));
  } else if (document.fullscreenElement) {
    document.exitFullscreen?.();
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}

function onFullscreenChange() {
  isFullscreen.value = Boolean(document.fullscreenElement);
}

function onKey(event) {
  if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const key = event.key;
  if (!presenting.value) {
    if (key === 'p' || key === 'P' || key === 'з' || key === 'З') { event.preventDefault(); setPresenting(true); }
    return;
  }
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(key)) { event.preventDefault(); goTo(slide.value + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(key)) { event.preventDefault(); goTo(slide.value - 1); }
  else if (key === 'Home') { event.preventDefault(); goTo(0); }
  else if (key === 'End') { event.preventDefault(); goTo(slides().length - 1); }
  else if (key === 'f' || key === 'F' || key === 'а' || key === 'А') { event.preventDefault(); toggleFullscreen(); }
  else if (key === 'p' || key === 'P' || key === 'з' || key === 'З') { event.preventDefault(); setPresenting(false); }
  else if (key === 'Escape' && !document.fullscreenElement) setPresenting(false);
}

function observeSlides() {
  slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) slide.value = slides().indexOf(entry.target);
    });
  }, { threshold: 0.55 });
  slides().forEach((el) => slideObserver.observe(el));
}

/* ------------------------------------------------------------- navigation */

const menuOpen = ref(false);

function scrollTo(id) {
  menuOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(() => {
  document.title = locale.value === 'ru'
    ? 'Веб-системы — курс веб-разработки | NazarAI'
    : 'Web tizimlari — veb-dasturlash kursi | NazarAI';
  observeReveal();
  observeSlides();
  runDemo();
  window.addEventListener('keydown', onKey);
  document.addEventListener('fullscreenchange', onFullscreenChange);
  if (route.query.taqdimot !== undefined) setPresenting(true);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  slideObserver?.disconnect();
  clearInterval(demoTimer);
  clearTimeout(hintTimer);
  window.removeEventListener('keydown', onKey);
  document.removeEventListener('fullscreenchange', onFullscreenChange);
  document.documentElement.classList.remove('lp-present');
});

watch(locale, (value) => {
  document.title = value === 'ru'
    ? 'Веб-системы — курс веб-разработки | NazarAI'
    : 'Web tizimlari — veb-dasturlash kursi | NazarAI';
});
</script>

<template>
  <div ref="root" class="lp" :class="{ 'lp--present': presenting }">
    <a class="lp-skip" href="#hero" @click.prevent="scrollTo('hero')">{{ L.skip }}</a>

    <!-- ============================================================ nav -->
    <header class="lp-nav">
      <div class="lp-wrap lp-nav__inner">
        <RouterLink class="lp-brand" :to="{ name: 'landing' }">
          <img src="../../assets/favicon.svg" alt="" width="30" height="30">
          <span>{{ L.brand }} <small>{{ L.brandBy }}</small></span>
        </RouterLink>

        <nav class="lp-nav__links" :class="{ 'is-open': menuOpen }">
          <a href="#directions" @click.prevent="scrollTo('directions')">{{ L.nav.directions }}</a>
          <a href="#how" @click.prevent="scrollTo('how')">{{ L.nav.how }}</a>
          <a href="#program" @click.prevent="scrollTo('program')">{{ L.nav.program }}</a>
          <a href="#authors" @click.prevent="scrollTo('authors')">{{ L.nav.authors }}</a>
          <a href="#faq" @click.prevent="scrollTo('faq')">{{ L.nav.faq }}</a>
        </nav>

        <div class="lp-nav__tools">
          <button type="button" class="lp-icon-btn lp-present-btn" :title="L.nav.presentTitle" @click="setPresenting(true)">
            <span aria-hidden="true">▶</span><span class="lp-hide-sm">{{ L.nav.present }}</span>
          </button>
          <div class="lp-lang" role="group" aria-label="Til / Язык">
            <button
              v-for="entry in LOCALES" :key="entry.id" type="button"
              :class="{ 'is-on': locale === entry.id }" :title="entry.label"
              @click="changeLocale(entry.id)"
            >{{ entry.short }}</button>
          </div>
          <button type="button" class="lp-icon-btn lp-theme-btn" :title="L.nav.theme" :aria-label="L.nav.theme" @click="toggleTheme">
            {{ theme === 'light' ? '☾' : '☀' }}
          </button>
          <RouterLink class="lp-btn lp-btn--primary lp-btn--sm lp-hide-sm" :to="{ name: 'hub' }">{{ L.nav.start }}</RouterLink>
          <button type="button" class="lp-icon-btn lp-burger" aria-label="Menu" @click="menuOpen = !menuOpen">☰</button>
        </div>
      </div>
    </header>

    <main>
      <!-- =========================================================== hero -->
      <section id="hero" class="lp-hero lp-slide" data-slide>
        <div class="lp-hero__bg" aria-hidden="true">
          <div class="lp-orb lp-orb--a"></div>
          <div class="lp-orb lp-orb--b"></div>
          <div class="lp-orb lp-orb--c"></div>
          <div class="lp-grid"></div>
        </div>

        <div class="lp-wrap lp-hero__inner">
          <div class="lp-hero__copy">
            <p class="lp-eyebrow"><span class="lp-dot"></span>{{ L.hero.eyebrow }}</p>
            <h1 class="lp-h1">
              <span class="lp-nowrap">{{ L.hero.titleA }}</span> <span class="lp-grad lp-nowrap">{{ L.hero.titleB }}</span> {{ L.hero.titleC }}
            </h1>
            <p class="lp-lead">{{ fill(L.hero.lead) }}</p>
            <div class="lp-actions">
              <RouterLink class="lp-btn lp-btn--primary lp-btn--lg" :to="{ name: 'hub' }">
                {{ L.hero.primary }} <span aria-hidden="true">→</span>
              </RouterLink>
              <a class="lp-btn lp-btn--ghost lp-btn--lg" href="#program" @click.prevent="scrollTo('program')">{{ L.hero.secondary }}</a>
            </div>
            <ul class="lp-chips">
              <li v-for="chip in L.hero.chips" :key="chip"><span aria-hidden="true">✓</span>{{ chip }}</li>
            </ul>
          </div>

          <!-- animated product mockup -->
          <div class="lp-mock" aria-hidden="true">
            <div class="lp-mock__glow"></div>
            <div class="lp-window">
              <div class="lp-window__bar">
                <i></i><i></i><i></i>
                <span class="lp-window__tabs">
                  <b>HTML</b><b class="is-on">CSS</b><b>JS</b>
                </span>
                <span class="lp-window__file">{{ L.hero.mock.file }}</span>
              </div>
              <div class="lp-window__body">
                <pre class="lp-code"><template v-for="(line, i) in CODE" :key="i"><span class="lp-code__line" :class="{ 'is-typed': demoStep > i, 'is-caret': demoStep === i + 1 && !demo.done }"><span class="lp-code__ln">{{ i + 1 }}</span><template v-if="line[0] === 'sel'"><span class="t-sel">{{ line[1] }}</span>{{ line[2] }}</template><template v-else-if="line[0] === 'prop'">  <span class="t-prop">{{ line[1] }}</span>: <span class="t-val">{{ line[2] }}</span>;</template><template v-else>{{ line[1] }}</template></span>
</template></pre>
                <div class="lp-preview">
                  <span class="lp-preview__label">{{ L.hero.mock.preview }}</span>
                  <div
                    class="lp-card"
                    :class="{ 'has-width': demo.width, 'has-pad': demo.padding, 'has-radius': demo.radius, 'has-shadow': demo.shadow }"
                  >
                    <div class="lp-card__img">☕</div>
                    <strong>{{ L.hero.mock.product }}</strong>
                    <span>{{ L.hero.mock.price }}</span>
                  </div>
                </div>
              </div>
              <div class="lp-window__task">
                <div class="lp-task__head">
                  <span class="lp-task__badge">{{ L.hero.mock.task }}</span>
                  <span>{{ L.hero.mock.taskTitle }}</span>
                </div>
                <ul class="lp-checks">
                  <li :class="{ 'is-ok': demo.width }">{{ L.hero.mock.checks[0] }}</li>
                  <li :class="{ 'is-ok': demo.radius }">{{ L.hero.mock.checks[1] }}</li>
                  <li :class="{ 'is-ok': demo.shadow }">{{ L.hero.mock.checks[2] }}</li>
                </ul>
                <div class="lp-progress"><div :style="{ width: `${(demo.passed / 3) * 100}%` }"></div></div>
                <p class="lp-task__foot" :class="{ 'is-done': demo.done }">
                  {{ demo.done ? '🎉 ' + L.hero.mock.done : fill(L.hero.mock.passed, { n: demo.passed }) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================== stats -->
      <section id="stats" class="lp-stats lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <ul class="lp-stats__grid">
            <li v-for="key in STAT_KEYS" :key="key" class="lp-stat">
              <strong class="lp-stat__num">{{ shown[key] }}</strong>
              <span class="lp-stat__label">{{ L.stats[key] }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- ===================================================== directions -->
      <section id="directions" class="lp-section lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <header class="lp-head">
            <p class="lp-kicker">{{ L.directions.kicker }}</p>
            <h2 class="lp-h2">{{ L.directions.title }}</h2>
            <p class="lp-sub">{{ L.directions.lead }}</p>
          </header>

          <div class="lp-dirs">
            <article class="lp-dir lp-dir--classes">
              <span class="lp-tag">{{ L.directions.classes.tag }}</span>
              <h3>{{ fill(L.directions.classes.title) }}</h3>
              <p>{{ L.directions.classes.text }}</p>
              <ul class="lp-list">
                <li v-for="point in L.directions.classes.points" :key="point" v-html="inline(fill(point))"></li>
              </ul>
              <div class="lp-dir__codes" aria-hidden="true">
                <span v-for="item in LECTURES.slice(0, 18)" :key="item.id">{{ item.code }}</span>
                <span v-for="item in PRACTICALS" :key="item.id" class="is-a">{{ item.code }}</span>
              </div>
              <RouterLink class="lp-btn lp-btn--primary" :to="{ name: 'classes' }">{{ L.directions.classes.cta }} →</RouterLink>
            </article>

            <article class="lp-dir lp-dir--study">
              <span class="lp-tag lp-tag--mint">{{ L.directions.study.tag }}</span>
              <h3>{{ fill(L.directions.study.title) }}</h3>
              <p>{{ L.directions.study.text }}</p>
              <ul class="lp-list">
                <li v-for="point in L.directions.study.points" :key="point" v-html="inline(fill(point))"></li>
              </ul>
              <div class="lp-dir__modules" aria-hidden="true">
                <div v-for="mod in course.modules" :key="mod.id" class="lp-mod">
                  <b>{{ mod.title }}</b>
                  <span class="lp-mod__bar"><i :style="{ width: `${(mod.lessons.length / maxModule) * 100}%` }"></i></span>
                  <small>{{ mod.lessons.length }}</small>
                </div>
              </div>
              <RouterLink class="lp-btn lp-btn--mint" :to="{ name: 'study' }">{{ L.directions.study.cta }} →</RouterLink>
            </article>
          </div>
        </div>
      </section>

      <!-- ============================================================ how -->
      <section id="how" class="lp-section lp-section--alt lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <header class="lp-head">
            <p class="lp-kicker">{{ L.how.kicker }}</p>
            <h2 class="lp-h2">{{ L.how.title }}</h2>
            <p class="lp-sub">{{ L.how.lead }}</p>
          </header>

          <ol class="lp-steps">
            <li v-for="(step, i) in L.how.steps" :key="step[0]" class="lp-step" :style="{ '--i': i }">
              <span class="lp-step__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3>{{ step[0] }}</h3>
              <p>{{ step[1] }}</p>
            </li>
          </ol>

          <ul class="lp-features">
            <li v-for="(feature, i) in L.how.features" :key="feature[1]" class="lp-feature" :style="{ '--i': i }">
              <span class="lp-feature__icon" aria-hidden="true">{{ feature[0] }}</span>
              <div>
                <h3>{{ feature[1] }}</h3>
                <p v-html="inline(feature[2])"></p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- ======================================================== program -->
      <section id="program" class="lp-section lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <header class="lp-head">
            <p class="lp-kicker">{{ L.program.kicker }}</p>
            <h2 class="lp-h2">{{ L.program.title }}</h2>
            <p class="lp-sub">{{ L.program.lead }}</p>
          </header>

          <div class="lp-tabs" role="tablist">
            <button
              v-for="(label, key) in L.program.tabs" :key="key" type="button" role="tab"
              :aria-selected="tab === key" :class="{ 'is-on': tab === key }" @click="tab = key"
            >
              {{ label }}
              <small>{{ key === 'lectures' ? numbers.lectures : key === 'practicals' ? numbers.practicals : numbers.lessons }}</small>
            </button>
          </div>

          <ol v-if="tab !== 'study'" class="lp-topics">
            <li v-for="item in programList" :key="item.code">
              <RouterLink :to="item.to" class="lp-topic">
                <span class="lp-topic__code" :class="{ 'is-a': item.code.startsWith('A') }">{{ item.code }}</span>
                <span class="lp-topic__text"><b>{{ item.title }}</b><small>{{ item.summary }}</small></span>
                <span class="lp-topic__go" aria-hidden="true">→</span>
              </RouterLink>
            </li>
          </ol>

          <div v-else class="lp-modules">
            <article v-for="(mod, m) in course.modules" :key="mod.id" class="lp-module">
              <header>
                <span class="lp-module__num">{{ String(m + 1).padStart(2, '0') }}</span>
                <div>
                  <h3>{{ mod.title }}</h3>
                  <p>{{ mod.subtitle }}</p>
                </div>
                <small>{{ fill(L.program.lessonsCount, { n: mod.lessons.length }) }}</small>
              </header>
              <ul>
                <li v-for="lesson in mod.lessons" :key="lesson.id">
                  <RouterLink :to="{ name: 'study', params: { lessonId: lesson.id } }">
                    <span>{{ String(lesson.number).padStart(2, '0') }}</span>{{ lesson.title }}
                  </RouterLink>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- ======================================================= audience -->
      <section id="audience" class="lp-section lp-section--alt lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <header class="lp-head">
            <p class="lp-kicker">{{ L.audience.kicker }}</p>
            <h2 class="lp-h2">{{ L.audience.title }}</h2>
            <p class="lp-sub">{{ L.audience.lead }}</p>
          </header>
          <ul class="lp-audience">
            <li v-for="(item, i) in L.audience.items" :key="item[1]" class="lp-aud" :style="{ '--i': i }">
              <span class="lp-aud__icon" aria-hidden="true">{{ item[0] }}</span>
              <h3>{{ item[1] }}</h3>
              <p>{{ item[2] }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- ======================================================== authors -->
      <section id="authors" class="lp-section lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <header class="lp-head">
            <p class="lp-kicker">{{ L.authors.kicker }}</p>
            <h2 class="lp-h2">{{ L.authors.title }}</h2>
          </header>
          <div class="lp-authors">
            <article class="lp-author">
              <div class="lp-author__avatar lp-author__avatar--lab" aria-hidden="true">
                <img src="../../assets/favicon.svg" alt="" width="44" height="44">
              </div>
              <p class="lp-author__role">{{ L.authors.lab.role }}</p>
              <h3>{{ L.authors.lab.name }}</h3>
              <p>{{ L.authors.lab.text }}</p>
              <p class="lp-author__meta">🏛 {{ L.authors.lab.meta }}</p>
            </article>
            <article class="lp-author">
              <div class="lp-author__avatar" aria-hidden="true">XX</div>
              <p class="lp-author__role">{{ L.authors.dev.role }}</p>
              <h3>{{ L.authors.dev.name }}</h3>
              <p>{{ L.authors.dev.text }}</p>
              <p class="lp-author__meta">🧪 {{ L.authors.dev.meta }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- ============================================================ faq -->
      <section id="faq" class="lp-section lp-section--alt lp-slide" data-slide data-reveal>
        <div class="lp-wrap lp-faq-wrap">
          <header class="lp-head lp-head--left">
            <p class="lp-kicker">{{ L.faq.kicker }}</p>
            <h2 class="lp-h2">{{ L.faq.title }}</h2>
          </header>
          <div class="lp-faq">
            <details v-for="(item, i) in L.faq.items" :key="item[0]" :open="i === 0">
              <summary>{{ item[0] }}<span aria-hidden="true"></span></summary>
              <p>{{ item[1] }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- ============================================================ cta -->
      <section id="start" class="lp-cta lp-slide" data-slide data-reveal>
        <div class="lp-wrap">
          <div class="lp-cta__box">
            <div class="lp-cta__glow" aria-hidden="true"></div>
            <h2 class="lp-h2">{{ L.cta.title }}</h2>
            <p class="lp-sub">{{ L.cta.text }}</p>
            <div class="lp-actions lp-actions--center">
              <RouterLink class="lp-btn lp-btn--light lp-btn--lg" :to="{ name: 'hub' }">{{ L.cta.primary }} →</RouterLink>
              <RouterLink class="lp-btn lp-btn--ghost-light lp-btn--lg" :to="{ name: 'classes' }">{{ L.cta.secondary }}</RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ========================================================= footer -->
    <footer class="lp-footer">
      <div class="lp-wrap lp-footer__inner">
        <div>
          <p class="lp-brand lp-brand--static">
            <img src="../../assets/favicon.svg" alt="" width="26" height="26">
            <span>{{ L.brand }} <small>{{ L.brandBy }}</small></span>
          </p>
          <p>© 2026 NazarAI · {{ L.footer.org }}</p>
          <p>{{ L.footer.dev }} · {{ L.footer.rights }}</p>
        </div>
        <nav class="lp-footer__links">
          <strong>{{ L.footer.course }}</strong>
          <RouterLink :to="{ name: 'classes' }">{{ L.footer.classes }}</RouterLink>
          <RouterLink :to="{ name: 'study' }">{{ L.footer.study }}</RouterLink>
          <RouterLink :to="{ name: 'sandbox' }">{{ L.footer.sandbox }}</RouterLink>
        </nav>
      </div>
    </footer>

    <!-- ================================================= presenter UI -->
    <template v-if="presenting">
      <div class="lp-pbar" aria-hidden="true"><div :style="{ width: `${((slide + 1) / L.slides.length) * 100}%` }"></div></div>

      <nav class="lp-pdots" aria-label="Slides">
        <button
          v-for="(name, i) in L.slides" :key="name" type="button"
          :class="{ 'is-on': slide === i }" :aria-label="name" :title="name" @click="goTo(i)"
        ><span>{{ name }}</span></button>
      </nav>

      <div class="lp-pctl">
        <button type="button" :title="L.present.prev" :aria-label="L.present.prev" :disabled="slide === 0" @click="goTo(slide - 1)">←</button>
        <span class="lp-pctl__count"><b>{{ String(slide + 1).padStart(2, '0') }}</b> / {{ String(L.slides.length).padStart(2, '0') }} · {{ L.slides[slide] }}</span>
        <button type="button" :title="L.present.next" :aria-label="L.present.next" :disabled="slide === L.slides.length - 1" @click="goTo(slide + 1)">→</button>
        <button type="button" :title="L.present.fullscreen" :aria-label="L.present.fullscreen" @click="toggleFullscreen">{{ isFullscreen ? '⤡' : '⤢' }}</button>
        <button type="button" :title="L.present.exit" :aria-label="L.present.exit" @click="setPresenting(false)">✕</button>
      </div>

      <Transition name="lp-fade">
        <p v-if="hintVisible" class="lp-phint">{{ L.present.hint }}</p>
      </Transition>
    </template>
  </div>
</template>
