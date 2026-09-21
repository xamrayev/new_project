/*
 * Course map: modules, per-module progress bars and the full lesson list.
 */
import { MODULES, TOTAL_LESSONS, TOTAL_TASKS } from '../course/index.js';

export class Sidebar {
  constructor({ progress, onOpenLesson, onReset }) {
    this.progress = progress;
    this.onOpenLesson = onOpenLesson;
    this.onReset = onReset;
    this.currentLessonId = null;

    this.scrim = document.createElement('div');
    this.scrim.className = 'scrim';
    this.scrim.hidden = true;
    this.scrim.addEventListener('click', () => this.close());

    this.root = document.createElement('aside');
    this.root.className = 'sidebar';
    this.root.hidden = true;
    this.root.setAttribute('aria-label', 'Программа курса');

    const head = document.createElement('div');
    head.className = 'sidebar__head';
    const title = document.createElement('h2');
    title.textContent = 'Web Development';
    this.summary = document.createElement('span');
    this.summary.className = 'mod__stat';
    const close = document.createElement('button');
    close.className = 'btn btn--sm btn--ghost';
    close.type = 'button';
    close.textContent = '✕';
    close.setAttribute('aria-label', 'Закрыть');
    close.addEventListener('click', () => this.close());
    head.append(title, this.summary, close);

    this.body = document.createElement('div');
    this.body.className = 'sidebar__body';

    const foot = document.createElement('div');
    foot.className = 'sidebar__foot';
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn--sm';
    resetButton.type = 'button';
    resetButton.textContent = 'Сбросить прогресс';
    resetButton.addEventListener('click', () => this.onReset());
    foot.append(resetButton);

    this.root.append(head, this.body, foot);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.close();
    });
  }

  get isOpen() { return !this.root.hidden; }

  open() {
    this.root.hidden = false;
    this.scrim.hidden = false;
    this.render(this.currentLessonId);
  }

  close() {
    this.root.hidden = true;
    this.scrim.hidden = true;
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  render(currentLessonId) {
    this.currentLessonId = currentLessonId;
    if (this.root.hidden) return;

    const totals = MODULES.reduce(
      (acc, module) => {
        const stats = this.progress.moduleStats(module.lessons);
        acc.tasks += stats.tasksDone;
        acc.lessons += stats.lessonsDone;
        return acc;
      },
      { tasks: 0, lessons: 0 }
    );
    this.summary.textContent = `${totals.lessons}/${TOTAL_LESSONS} уроков · ${totals.tasks}/${TOTAL_TASKS} задач`;

    this.body.textContent = '';
    MODULES.forEach((module) => {
      const stats = this.progress.moduleStats(module.lessons);
      const block = document.createElement('section');
      block.className = 'mod';

      const head = document.createElement('div');
      head.className = 'mod__head';
      const name = document.createElement('span');
      name.className = 'mod__name';
      name.textContent = module.title;
      const stat = document.createElement('span');
      stat.className = 'mod__stat';
      stat.textContent = `${stats.tasksDone}/${stats.tasksTotal}`;
      head.append(name, stat);

      const bar = document.createElement('div');
      bar.className = 'bar';
      const fill = document.createElement('div');
      const percent = stats.tasksTotal ? Math.round((stats.tasksDone / stats.tasksTotal) * 100) : 0;
      fill.className = percent === 100 ? 'bar__fill bar__fill--done' : 'bar__fill';
      fill.style.width = `${percent}%`;
      bar.append(fill);

      const list = document.createElement('ul');
      list.className = 'lessons';

      module.lessons.forEach((lesson) => {
        const stats = this.progress.lessonStats(lesson);
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = stats.complete ? 'lesson-item lesson-item--done' : 'lesson-item';
        if (lesson.id === currentLessonId) button.setAttribute('aria-current', 'true');

        const number = document.createElement('span');
        number.className = 'lesson-item__num';
        number.textContent = String(lesson.number).padStart(2, '0');

        const label = document.createElement('span');
        label.className = 'lesson-item__name';
        label.textContent = lesson.title;

        const counter = document.createElement('span');
        counter.className = 'lesson-item__tasks';
        counter.textContent = stats.complete ? '✓ 5/5' : `${stats.done}/${stats.total}`;

        button.append(number, label, counter);
        button.addEventListener('click', () => {
          this.onOpenLesson(lesson.id);
          this.close();
        });

        item.append(button);
        list.append(item);
      });

      block.append(head, bar, list);
      this.body.append(block);
    });
  }
}
