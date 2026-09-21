/*
 * Application shell: wires the course data, the playground and the progress
 * store together, and keeps the URL hash in sync with the current task.
 *
 * Switching the language rebuilds the course for the new locale and re-mounts
 * the whole shell — progress, drafts and the current task are keyed by id, so
 * nothing is lost in the swap.
 */
import { buildCourse } from '../course/index.js';
import { Playground } from '../playground/playground.js';
import { LOCALES, getLocale, setLocale, t } from '../i18n/index.js';
import { renderBlocks } from './markup.js';
import { Sidebar } from './sidebar.js';
import { TasksDock } from './tasks-dock.js';
import { toast } from './toast.js';

export class App {
  constructor(progress) {
    this.progress = progress;
    this.course = buildCourse(getLocale());
    this.lesson = null;
    this.task = null;
    this.checking = false;
    this.onHashChange = () => this.#fromHash();
  }

  mount(root) {
    this.root = root;
    root.textContent = '';
    root.className = 'app';

    this.#buildTopBar();

    this.main = document.createElement('div');
    this.main.className = 'main';

    this.theory = document.createElement('article');
    this.theory.className = 'theory';

    this.playground = new Playground({
      onRun: (source) => this.#saveDraft(source),
      onRequestCheck: () => this.check(),
      onReset: () => this.resetTask()
    });

    this.main.append(this.theory, this.playground.root);

    this.dock = new TasksDock({
      progress: this.progress,
      onSelectTask: (task) => this.openTask(this.lesson, task),
      onCheck: () => this.check(),
      onReset: () => this.resetTask(),
      onShowSolution: () => this.showSolution(),
      onNext: () => this.goNext()
    });

    this.sidebar = new Sidebar({
      course: this.course,
      progress: this.progress,
      onOpenLesson: (lessonId) => this.openLesson(lessonId),
      onReset: () => this.resetProgress()
    });

    root.append(this.top, this.main, this.dock.root);
    document.body.append(this.sidebar.scrim, this.sidebar.root);

    window.addEventListener('hashchange', this.onHashChange);
    this.#fromHash();
  }

  /** Tears the shell down so it can be rebuilt in another language. */
  unmount() {
    window.removeEventListener('hashchange', this.onHashChange);
    this.sidebar.scrim.remove();
    this.sidebar.root.remove();
    this.root.textContent = '';
  }

  /* --------------------------------------------------------------- top bar */

  #buildTopBar() {
    this.top = document.createElement('header');
    this.top.className = 'top';

    const burger = document.createElement('button');
    burger.className = 'top__burger';
    burger.type = 'button';
    burger.textContent = '☰';
    burger.setAttribute('aria-label', t('top.courseMap'));
    burger.addEventListener('click', () => this.sidebar.toggle());

    const titleBox = document.createElement('div');
    titleBox.className = 'top__title';
    this.lessonTitle = document.createElement('span');
    this.lessonTitle.className = 'top__lesson';
    this.moduleTitle = document.createElement('span');
    this.moduleTitle.className = 'top__module';
    titleBox.append(this.lessonTitle, this.moduleTitle);

    const spacer = document.createElement('div');
    spacer.className = 'top__spacer';

    this.counter = document.createElement('span');
    this.counter.className = 'top__counter';

    const nav = document.createElement('div');
    nav.className = 'top__nav';
    this.previousButton = this.#navButton('←', t('top.previousLesson'), () => this.goToNeighbour('previous'));
    this.nextButton = this.#navButton('→', t('top.nextLesson'), () => this.goToNeighbour('next'));
    const theme = this.#navButton('◐', t('top.toggleTheme'), () => this.toggleTheme());
    nav.append(this.#languagePicker(), this.previousButton, this.nextButton, theme);

    this.top.append(burger, titleBox, spacer, this.counter, nav);
  }

  #navButton(text, label, onClick) {
    const element = document.createElement('button');
    element.className = 'btn btn--sm';
    element.type = 'button';
    element.textContent = text;
    element.title = label;
    element.setAttribute('aria-label', label);
    element.addEventListener('click', onClick);
    return element;
  }

  #languagePicker() {
    const select = document.createElement('select');
    select.className = 'btn btn--sm lang';
    select.title = t('top.language');
    select.setAttribute('aria-label', t('top.language'));

    LOCALES.forEach((locale) => {
      const option = document.createElement('option');
      option.value = locale.id;
      option.textContent = locale.short;
      option.title = locale.label;
      if (locale.id === getLocale()) option.selected = true;
      select.append(option);
    });

    select.addEventListener('change', () => this.changeLocale(select.value));
    return select;
  }

  changeLocale(locale) {
    if (locale === getLocale()) return;
    setLocale(locale);
    this.progress.setLocale(locale);

    const position = { lessonId: this.lesson.id, taskPosition: this.task.position };
    this.course = buildCourse(locale);
    this.unmount();
    this.mount(this.root);

    const lesson = this.course.getLesson(position.lessonId);
    const task = lesson && lesson.tasks.find((entry) => entry.position === position.taskPosition);
    if (lesson && task) this.openTask(lesson, task);
  }

  toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    this.progress.setTheme(next);
  }

  /* --------------------------------------------------------------- routing */

  #fromHash() {
    const [, lessonId, taskPosition] = (location.hash || '').replace(/^#\/?/, '/').split('/');
    const lesson = this.course.getLesson(lessonId) || this.#lastVisitedLesson();
    const task =
      lesson.tasks.find((entry) => String(entry.position) === taskPosition) ||
      this.#firstUnsolved(lesson);
    this.openTask(lesson, task, { silent: true });
  }

  #lastVisitedLesson() {
    const last = this.progress.last;
    return (last && this.course.getLesson(last.lessonId)) || this.course.lessons[0];
  }

  #firstUnsolved(lesson) {
    return lesson.tasks.find((task) => !this.progress.isTaskDone(lesson.id, task.id)) || lesson.tasks[0];
  }

  openLesson(lessonId) {
    const lesson = this.course.getLesson(lessonId);
    if (!lesson) return;
    this.openTask(lesson, this.#firstUnsolved(lesson));
  }

  openTask(lesson, task, { silent = false } = {}) {
    this.lesson = lesson;
    this.task = task;

    const hash = `#/${lesson.id}/${task.position}`;
    if (location.hash !== hash) {
      if (silent) history.replaceState(null, '', hash);
      else location.hash = hash;
    }

    this.progress.setLast(lesson.id, task.id);

    this.lessonTitle.textContent = t('top.lesson', { number: lesson.number, title: lesson.title });
    this.moduleTitle.textContent = `${lesson.moduleTitle} · ${lesson.summary}`;
    this.counter.textContent = `${String(lesson.number).padStart(2, '0')}/${this.course.totalLessons}`;

    const around = this.course.neighbours(lesson);
    this.previousButton.disabled = !around.previous;
    this.nextButton.disabled = !around.next;

    this.theory.innerHTML = `<h2>${lesson.title}</h2>${renderBlocks(lesson.theory)}`;
    this.theory.scrollTop = 0;

    this.playground.configure({ editors: lesson.editors, sandbox: task.sandbox });
    const draft = this.progress.getDraft(lesson.id, task.id);
    this.playground.setSource(draft || task.starter);

    this.dock.show(lesson, task);
    this.sidebar.render(lesson.id);
  }

  goToNeighbour(direction) {
    const target = this.course.neighbours(this.lesson)[direction];
    if (target) this.openLesson(target.id);
  }

  /** Next unsolved task in this lesson, otherwise the next lesson. */
  goNext() {
    const next = this.lesson.tasks.find(
      (task) => task.position > this.task.position && !this.progress.isTaskDone(this.lesson.id, task.id)
    ) || this.lesson.tasks.find((task) => task.position === this.task.position + 1);

    if (next) {
      this.openTask(this.lesson, next);
      return;
    }

    const around = this.course.neighbours(this.lesson);
    if (around.next) {
      const finished = this.lesson.number;
      this.openLesson(around.next.id);
      toast(t('toast.nextLesson', { number: finished, title: around.next.title }), 'ok');
    } else {
      toast(t('toast.courseDone'), 'ok', 5000);
    }
  }

  /* ---------------------------------------------------------------- checks */

  async check() {
    if (this.checking) return;
    this.checking = true;
    this.dock.setBusy(true);

    try {
      const results = await this.playground.check(this.task.checks);
      this.dock.setResults(results);

      const passed = results.every((result) => result.ok);
      if (passed) {
        const isNew = this.progress.markTask(this.lesson.id, this.task.id, true);
        this.sidebar.render(this.lesson.id);
        this.dock.render();
        const stats = this.progress.lessonStats(this.lesson);
        if (isNew && stats.complete) toast(t('toast.lessonDone', { done: stats.done, total: stats.total }), 'ok', 4000);
        else if (isNew) toast(t('toast.taskDone'), 'ok');
      } else {
        const failed = results.find((result) => !result.ok);
        toast(failed ? t('toast.checkFailed', { label: failed.label }) : t('toast.checkFailedGeneric'), 'err');
      }
    } catch (error) {
      toast(t('toast.checkError', { message: error.message }), 'err', 4000);
    } finally {
      this.checking = false;
      this.dock.setBusy(false);
    }
  }

  /* ----------------------------------------------------------- task actions */

  resetTask() {
    if (!window.confirm(t('confirm.resetTask'))) return;
    this.progress.clearDraft(this.lesson.id, this.task.id);
    this.playground.configure({ editors: this.lesson.editors, sandbox: this.task.sandbox });
    this.playground.setSource(this.task.starter);
    this.dock.setResults(null);
    toast(t('toast.taskReset'), 'info');
  }

  showSolution() {
    if (!window.confirm(t('confirm.showSolution'))) return;
    this.playground.setSource(this.task.solution);
    toast(t('toast.solutionLoaded'), 'info', 4000);
  }

  resetProgress() {
    if (!window.confirm(t('confirm.resetProgress'))) return;
    this.progress.resetAll();
    this.sidebar.render(this.lesson.id);
    this.dock.render();
    toast(t('toast.progressReset'), 'info');
  }

  #saveDraft(source) {
    if (!this.lesson || !this.task) return;
    this.progress.saveDraft(this.lesson.id, this.task.id, source);
  }
}
