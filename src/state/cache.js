/*
 * Cache report and cleanup.
 *
 * Everything the app keeps in the browser lives under two localStorage keys:
 * progress (solved tasks, drafts, settings) and the activity log. The report
 * splits them into the four things a student may want to wipe separately, so
 * "clear the cache" never has to mean "lose everything".
 */
import { PROGRESS_KEY } from './progress.js';
import { LOG_KEY } from './activity-log.js';

export const CACHE_KEYS = [PROGRESS_KEY, LOG_KEY];

/** @returns {{id: string, count: number, bytes: number}[]} one row per clearable slice */
export function cacheReport(progress, log) {
  return [
    { id: 'log', count: log.entries.length, bytes: log.bytes },
    { id: 'drafts', count: progress.draftCount, bytes: progress.bytesOf('drafts') },
    { id: 'progress', count: progress.solvedCount, bytes: progress.bytesOf('tasks') }
  ];
}

export function totalBytes(progress, log) {
  return progress.bytes + log.bytes;
}

/**
 * @param {'log'|'drafts'|'progress'|'all'} id which slice to wipe
 * @returns {boolean} whether anything was cleared
 */
export function clearCache(id, { progress, log }) {
  if (id === 'log') log.clear();
  else if (id === 'drafts') progress.clearDrafts();
  else if (id === 'progress') progress.resetTasks();
  else if (id === 'all') {
    log.clear();
    progress.resetAll();
  } else return false;
  return true;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
