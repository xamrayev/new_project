/*
 * Cache report and cleanup.
 *
 * Everything the app keeps in the browser lives under three localStorage keys:
 * self-study progress (solved tasks, drafts, settings), the activity log and
 * the class-session progress (lectures read, practical steps done). The report
 * splits them into the things a student may want to wipe separately, so
 * "clear the cache" never has to mean "lose everything".
 */
import { PROGRESS_KEY } from './progress.js';
import { LOG_KEY } from './activity-log.js';
import { CLASSES_KEY } from './classes.js';

export const CACHE_KEYS = [PROGRESS_KEY, LOG_KEY, CLASSES_KEY];

/** @returns {{id: string, count: number, bytes: number}[]} one row per clearable slice */
export function cacheReport(progress, log, classes) {
  const rows = [
    { id: 'log', count: log.entries.length, bytes: log.bytes },
    { id: 'drafts', count: progress.draftCount, bytes: progress.bytesOf('drafts') },
    { id: 'progress', count: progress.solvedCount, bytes: progress.bytesOf('tasks') }
  ];
  if (classes) rows.push({ id: 'classes', count: classes.count, bytes: classes.bytes });
  return rows;
}

export function totalBytes(progress, log, classes) {
  return progress.bytes + log.bytes + (classes ? classes.bytes : 0);
}

/**
 * @param {'log'|'drafts'|'progress'|'classes'|'all'} id which slice to wipe
 * @returns {boolean} whether anything was cleared
 */
export function clearCache(id, { progress, log, classes }) {
  if (id === 'log') log.clear();
  else if (id === 'drafts') progress.clearDrafts();
  else if (id === 'progress') progress.resetTasks();
  else if (id === 'classes') {
    if (classes) classes.clear();
  } else if (id === 'all') {
    log.clear();
    progress.resetAll();
    if (classes) classes.clear();
  } else return false;
  return true;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
