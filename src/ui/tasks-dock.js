/*
 * The tasks dock: five chips for the lesson's tasks plus the panel of the
 * selected one (description, hints, check results, solution).
 */
import { inline } from './markup.js';

const DIFFICULTY = {
  easy: { label: 'лёгкая', className: 'easy' },
  medium: { label: 'средняя', className: 'medium' },
  hard: { label: 'сложная', className: 'hard' }
};

export class TasksDock {
  constructor({ progress, onSelectTask, onCheck, onReset, onShowSolution, onNext }) {
    this.progress = progress;
    this.onSelectTask = onSelectTask;
    this.onCheck = onCheck;
    this.onReset = onReset;
    this.onShowSolution = onShowSolution;
    this.onNext = onNext;

    this.lesson = null;
    this.task = null;
    this.revealedHints = 0;

    this.root = document.createElement('section');
    this.root.className = 'tasks';

    const head = document.createElement('div');
    head.className = 'tasks__head';
    const title = document.createElement('span');
    title.className = 'tasks__title';
    title.textContent = 'Задачи';
    this.progressLabel = document.createElement('span');
    this.progressLabel.className = 'tasks__progress';
    head.append(title, this.progressLabel);

    this.list = document.createElement('div');
    this.list.className = 'tasks__list';
    this.list.setAttribute('role', 'tablist');

    this.panel = document.createElement('div');
    this.panel.className = 'task-panel';

    this.root.append(head, this.list, this.panel);
  }

  show(lesson, task) {
    this.lesson = lesson;
    this.task = task;
    this.revealedHints = 0;
    this.results = null;
    this.render();
  }

  setResults(results) {
    this.results = results;
    this.render();
  }

  setBusy(busy) {
    this.busy = busy;
    if (this.checkButton) {
      this.checkButton.disabled = busy;
      this.checkButton.textContent = busy ? 'Проверяю…' : '✓ Проверить';
    }
  }

  render() {
    if (!this.lesson) return;
    const stats = this.progress.lessonStats(this.lesson);
    this.progressLabel.textContent = `${stats.done}/${stats.total}`;

    this.list.textContent = '';
    this.lesson.tasks.forEach((task) => {
      const done = this.progress.isTaskDone(this.lesson.id, task.id);
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = done ? 'task-chip task-chip--done' : 'task-chip';
      chip.setAttribute('role', 'tab');
      if (task.id === this.task.id) chip.setAttribute('aria-current', 'true');

      const mark = document.createElement('span');
      mark.className = 'task-chip__mark';
      mark.textContent = done ? '✓' : '○';

      const dot = document.createElement('span');
      dot.className = `task-chip__dif dif--${DIFFICULTY[task.difficulty].className}`;

      const label = document.createElement('span');
      label.textContent = `${task.position}. ${task.title}`;

      chip.append(mark, dot, label);
      chip.addEventListener('click', () => this.onSelectTask(task));
      this.list.append(chip);
    });

    this.renderPanel();
  }

  renderPanel() {
    const task = this.task;
    const done = this.progress.isTaskDone(this.lesson.id, task.id);
    this.panel.textContent = '';

    const top = document.createElement('div');
    top.className = 'task-panel__top';

    const heading = document.createElement('h4');
    heading.textContent = `Задача ${task.position}. ${task.title}`;

    const difficulty = document.createElement('span');
    difficulty.className = `badge badge--${DIFFICULTY[task.difficulty].className}`;
    difficulty.textContent = DIFFICULTY[task.difficulty].label;
    top.append(heading, difficulty);

    if (done) {
      const badge = document.createElement('span');
      badge.className = 'badge badge--done';
      badge.textContent = '✓ решена';
      top.append(badge);
    }

    const description = document.createElement('p');
    description.className = 'task-panel__desc';
    description.innerHTML = inline(task.description);

    const tools = document.createElement('div');
    tools.className = 'task-panel__tools';

    this.checkButton = button('✓ Проверить', 'btn btn--sm btn--ok', () => this.onCheck());
    tools.append(this.checkButton);

    if (task.hints.length) {
      const hintButton = button(
        this.revealedHints >= task.hints.length ? 'Подсказки показаны' : `💡 Подсказка (${this.revealedHints}/${task.hints.length})`,
        'btn btn--sm',
        () => {
          this.revealedHints = Math.min(this.revealedHints + 1, task.hints.length);
          this.renderPanel();
        }
      );
      hintButton.disabled = this.revealedHints >= task.hints.length;
      tools.append(hintButton);
    }

    tools.append(button('↻ Начать заново', 'btn btn--sm btn--ghost', () => this.onReset()));
    tools.append(button('Показать решение', 'btn btn--sm btn--ghost', () => this.onShowSolution()));

    this.panel.append(top, description, tools);

    if (this.revealedHints) {
      const hints = document.createElement('ul');
      hints.className = 'hints';
      task.hints.slice(0, this.revealedHints).forEach((hint) => {
        const item = document.createElement('li');
        item.innerHTML = inline(hint);
        hints.append(item);
      });
      this.panel.append(hints);
    }

    if (this.results) {
      const list = document.createElement('ul');
      list.className = 'results';
      this.results.forEach((result) => {
        const item = document.createElement('li');
        item.className = result.ok ? 'pass' : 'fail';

        const mark = document.createElement('span');
        mark.className = 'results__mark';
        mark.textContent = result.ok ? '✓' : '✕';

        const text = document.createElement('span');
        text.textContent = result.label;

        item.append(mark, text);

        if (!result.ok && result.message) {
          const message = document.createElement('span');
          message.className = 'results__msg';
          message.textContent = `— ${result.message}`;
          item.append(message);
        }

        list.append(item);
      });

      const passed = this.results.filter((result) => result.ok).length;
      const banner = document.createElement('div');
      const allPassed = passed === this.results.length;
      banner.className = allPassed ? 'banner banner--ok' : 'banner banner--fail';
      banner.textContent = allPassed
        ? '✓ Задача решена!'
        : `Пройдено ${passed} из ${this.results.length} проверок — посмотрите, что не сошлось.`;

      this.panel.append(list, banner);

      if (allPassed) {
        const next = document.createElement('div');
        next.className = 'task-panel__tools';
        next.append(button('Дальше →', 'btn btn--sm btn--primary', () => this.onNext()));
        this.panel.append(next);
      }
    }
  }
}

function button(text, className, onClick) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = className;
  element.textContent = text;
  element.addEventListener('click', onClick);
  return element;
}
