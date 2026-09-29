/*
 * Routes. Hash history: the course is a set of static files, so every URL has
 * to resolve to index.html on any host without server rewrites.
 *
 *   #/                       landing — the course's front page (?taqdimot — presentation mode)
 *   #/kurs                   hub — choose a direction, progress in both
 *   #/darslar                class sessions: lectures and practicals
 *   #/maruza/m3              one lecture
 *   #/amaliy/a4              one practical guide
 *   #/mustaqil/js-dom/2      self-study workspace, lesson + task
 *   #/sandbox                free playground
 *
 * Links from before the split (`#/js-dom/2`) are redirected into the self-study track.
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import LandingView from './views/LandingView.vue';
import HubView from './views/HubView.vue';
import ClassesView from './views/ClassesView.vue';
import LectureView from './views/LectureView.vue';
import PracticalView from './views/PracticalView.vue';
import StudyView from './views/StudyView.vue';
import SandboxView from './views/SandboxView.vue';
import { course } from './composables/store.js';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/kurs', name: 'hub', component: HubView },
    { path: '/darslar', name: 'classes', component: ClassesView },
    { path: '/maruza/:id', name: 'lecture', component: LectureView },
    { path: '/amaliy/:id', name: 'practical', component: PracticalView },
    { path: '/mustaqil/:lessonId?/:task?', name: 'study', component: StudyView },
    { path: '/sandbox', name: 'sandbox', component: SandboxView },
    {
      path: '/:lessonId/:task?',
      redirect: (to) => (course.value.getLesson(to.params.lessonId)
        ? { name: 'study', params: to.params }
        : { name: 'hub' })
    },
    { path: '/:rest(.*)*', redirect: { name: 'landing' } }
  ]
});
