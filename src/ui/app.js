/*
 * Application shell: wires the course data, the playground and the progress
 * store together, and keeps the URL hash in sync with the current task.
 */
import { LESSONS, TOTAL_LESSONS, getLesson, getTask, neighbours } from '../course/index.js';
import { Playground } from '../playground/playground.js';
import { renderBlocks } from './markup.js';
import { Sidebar } from './sidebar.js';
import { TasksDock } from './tasks-dock.js';
import { toast } from './toast.js';

export class App {
  constructor(progress) {
    this.progress = progress;
    this.lesson = null;
    this.task = null;
    this.checking = false;
  }

  mount(root) {
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
      progress: this.progress,
      onOpenLesson: (lessonId) => this.openLesson(lessonId),
      onReset: () => this.resetProgress()
    });

    root.append(this.top, this.main, this.dock.root);
    document.body.append(this.sidebar.scrim, this.sidebar.root);

    window.addEventListener('hashchange', () => this.#fromHash());
    this.#fromHash();
  }

  /* --------------------------------------------------------------- top bar */

  #buildTopBar() {
    this.top = document.createElement('header');
    this.top.className = 'top';

    const burger = document.createElement('button');
    burger.className = 'top__burger';
    burger.type = 'button';
    burger.textContent = '☰';
    burger.setAttribute('aria-label', 'Программа курса');
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
    this.previousButton = this.#navButton('←', 'Предыдущий урок', () => this.goToNeighbour('previous'));
    this.nextButton = this.#navButton('→', 'Следующий урок', () => this.goToNeighbour('next'));
    const theme = this.#navButton('◐', 'Сменить тему', () => this.toggleTheme());
    nav.append(this.previousButton, this.nextButton, theme);

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

  toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    this.progress.setTheme(next);
  }

  /* --------------------------------------------------------------- routing */

  #fromHash() {
    const [, lessonId, taskPosition] = (location.hash || '').replace(/^#\/?/, '/').split('/');
    const lesson = getLesson(lessonId) || this.#lastVisitedLesson();
    const task =
      lesson.tasks.find((entry) => String(entry.position) === taskPosition) ||
      this.#firstUnsolved(lesson);
    this.openTask(lesson, task, { silent: true });
  }

  #lastVisitedLesson() {
    const last = this.progress.last;
    return (last && getLesson(last.lessonId)) || LESSONS[0];
  }

  #firstUnsolved(lesson) {
    return lesson.tasks.find((task) => !this.progress.isTaskDone(lesson.id, task.id)) || lesson.tasks[0];
  }

  openLesson(lessonId) {
    const lesson = getLesson(lessonId);
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

    this.lessonTitle.textContent = `Урок ${lesson.number}. ${lesson.title}`;
    this.moduleTitle.textContent = `${lesson.moduleTitle} · ${lesson.summary}`;
    this.counter.textContent = `${String(lesson.number).padStart(2, '0')}/${TOTAL_LESSONS}`;

    const around = neighbours(lesson);
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
    const target = neighbours(this.lesson)[direction];
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

    const around = neighbours(this.lesson);
    if (around.next) {
      this.openLesson(around.next.id);
      toast(`Урок ${this.lesson.number} пройден. Дальше: ${around.next.title}`, 'ok');
    } else {
      toast('Это была последняя задача курса. Поздравляем!', 'ok', 5000);
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
        if (isNew && stats.complete) toast(`Урок пройден полностью: ${stats.done}/${stats.total} 🎉`, 'ok', 4000);
        else if (isNew) toast('Задача засчитана!', 'ok');
      } else {
        const failed = results.find((result) => !result.ok);
        toast(failed ? `Не сошлось: ${failed.label}` : 'Проверка не пройдена', 'err');
      }
    } catch (error) {
      toast(`Ошибка проверки: ${error.message}`, 'err', 4000);
    } finally {
      this.checking = false;
      this.dock.setBusy(false);
    }
  }

  /* ----------------------------------------------------------- task actions */

  resetTask() {
    if (!window.confirm('Вернуть исходный код задачи? Ваши изменения будут потеряны.')) return;
    this.progress.clearDraft(this.lesson.id, this.task.id);
    this.playground.configure({ editors: this.lesson.editors, sandbox: this.task.sandbox });
    this.playground.setSource(this.task.starter);
    this.dock.setResults(null);
    toast('Код задачи сброшен', 'info');
  }

  showSolution() {
    if (!window.confirm('Показать готовое решение? Попробуйте сначала подсказки.')) return;
    this.playground.setSource(this.task.solution);
    toast('Решение загружено в редактор — разберите его и запустите', 'info', 4000);
  }

  resetProgress() {
    if (!window.confirm('Удалить весь прогресс и сохранённый код? Действие необратимо.')) return;
    this.progress.resetAll();
    this.sidebar.render(this.lesson.id);
    this.dock.render();
    toast('Прогресс сброшен', 'info');
  }

  #saveDraft(source) {
    if (!this.lesson || !this.task) return;
    this.progress.saveDraft(this.lesson.id, this.task.id, source);
  }
}
