/*
 * Minimal, dependency-free renderer for theory blocks and task descriptions.
 *
 * Everything is escaped first and only then a tiny inline syntax is applied, so
 * lesson content can talk about `<a href>` without any risk of injecting markup.
 */

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Supports `code`, **bold**, *italic* and [text](url). */
export function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function block(entry) {
  if (typeof entry === 'string') return `<p>${inline(entry)}</p>`;
  if (entry.h) return `<h3>${inline(entry.h)}</h3>`;
  if (entry.p) return `<p>${inline(entry.p)}</p>`;
  if (entry.lead) return `<p class="theory__lead">${inline(entry.lead)}</p>`;
  if (entry.ul) return `<ul>${entry.ul.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`;
  if (entry.ol) return `<ol>${entry.ol.map((item) => `<li>${inline(item)}</li>`).join('')}</ol>`;
  if (entry.code) return `<pre><code>${escapeHtml(entry.code)}</code></pre>`;
  if (entry.note) return `<div class="note">${inline(entry.note)}</div>`;
  if (entry.warn) return `<div class="note note--warn">${inline(entry.warn)}</div>`;
  if (entry.table) {
    const { head = [], rows = [] } = entry.table;
    const thead = head.length
      ? `<thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead>`
      : '';
    const tbody = `<tbody>${rows
      .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`)
      .join('')}</tbody>`;
    return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
  }
  return '';
}

export function renderBlocks(blocks = []) {
  return blocks.map(block).join('');
}
