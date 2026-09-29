/*
 * Pane manager.
 *
 * Every region of a workspace — theory, editor, preview, console, tasks and
 * the log — is a pane that can be closed, reopened and blown up to full
 * screen. Closing one does not leave a hole: the grid templates are rebuilt
 * from whatever is still open, so the remaining panes take the freed space.
 *
 * The templates are handed out as CSS custom properties (`--cols`,
 * `--split-cols`, `--right-rows`) rather than as `grid-template-columns`, so
 * the narrow-screen media queries can still override the whole layout — an
 * inline property would always win over them.
 *
 * A workspace passes the panes it actually has; the state (which panes are
 * closed, which one is full screen) goes wherever `load`/`save` put it.
 */
import { computed, onBeforeUnmount, reactive, watch } from 'vue';

/** Column width per top-level pane; the playground always takes the rest. */
const COLUMN = {
  theory: 'minmax(220px, 21%)',
  pg: 'minmax(320px, 1fr)',
  tasks: 'minmax(240px, 22%)',
  logs: 'minmax(240px, 21%)'
};

/**
 * @param {object} options
 * @param {string[]} options.ids the panes this workspace has, in menu order
 * @param {string[]} [options.defaultClosed]
 * @param {() => ({closed?: string[], full?: string|null} | null)} [options.load]
 * @param {(state: {closed: string[], full: string|null}) => void} [options.save]
 * @param {(id: string) => void} [options.onRefused] the last open pane refused to close
 */
export function usePanes({ ids, defaultClosed = [], load = () => null, save = () => {}, onRefused = () => {} }) {
  const stored = load() || {};
  const closed = Array.isArray(stored.closed) ? stored.closed : defaultClosed;

  const state = reactive({
    closed: closed.filter((id) => ids.includes(id)),
    full: ids.includes(stored.full) ? stored.full : null
  });

  const persist = () => save({ closed: [...state.closed], full: state.full });

  const isOpen = (id) => ids.includes(id) && !state.closed.includes(id);
  const isFull = (id) => state.full === id;
  const openCount = () => ids.filter(isOpen).length;

  function open(id) {
    if (!ids.includes(id)) return;
    state.closed = state.closed.filter((entry) => entry !== id);
    persist();
  }

  /** @returns {boolean} false when this is the last open pane and it stays open */
  function close(id) {
    if (!isOpen(id)) return true;
    if (openCount() <= 1) {
      onRefused(id);
      return false;
    }
    state.closed = [...state.closed, id];
    if (state.full === id) state.full = null;
    persist();
    return true;
  }

  function toggle(id) {
    if (isOpen(id)) return close(id);
    open(id);
    return true;
  }

  function toggleFull(id) {
    if (state.full === id) state.full = null;
    else {
      state.closed = state.closed.filter((entry) => entry !== id);
      state.full = id;
    }
    persist();
  }

  function exitFull() {
    if (!state.full) return false;
    state.full = null;
    persist();
    return true;
  }

  const layout = computed(() => {
    const pgOpen = isOpen('editor') || isOpen('preview') || isOpen('console');
    const rightOpen = isOpen('preview') || isOpen('console');

    const columns = [];
    if (isOpen('theory')) columns.push(COLUMN.theory);
    if (pgOpen) columns.push(COLUMN.pg);
    if (isOpen('tasks')) columns.push(COLUMN.tasks);
    if (isOpen('logs')) columns.push(COLUMN.logs);

    const split = [];
    if (isOpen('editor')) split.push('minmax(0, 1fr)');
    if (rightOpen) split.push('minmax(0, 1fr)');

    const rows = [];
    if (isOpen('preview')) rows.push('minmax(0, 1fr)');
    if (isOpen('console')) rows.push(isOpen('preview') ? 'minmax(120px, 34%)' : 'minmax(0, 1fr)');

    return {
      pgOpen,
      rightOpen,
      main: { '--cols': columns.join(' ') || COLUMN.pg },
      split: { '--split-cols': split.join(' ') || 'minmax(0, 1fr)' },
      right: { '--right-rows': rows.join(' ') || 'minmax(0, 1fr)' }
    };
  });

  watch(() => state.full, (full) => {
    document.documentElement.classList.toggle('has-full-pane', Boolean(full));
  }, { immediate: true });

  onBeforeUnmount(() => document.documentElement.classList.remove('has-full-pane'));

  return reactive({
    ids,
    state,
    layout,
    isOpen,
    isFull,
    open,
    close,
    toggle,
    toggleFull,
    exitFull
  });
}
