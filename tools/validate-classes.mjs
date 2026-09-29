/*
 * Static validation of the class sessions (lectures and practical guides) —
 * runs without a browser.
 *
 * Catches what is easy to get wrong while writing a topic: a duplicate id or
 * number, a missing section, an unknown block kind, a link to a lecture,
 * practical or self-study lesson that does not exist, a literature number
 * with no entry, a runnable JavaScript example that does not even parse.
 * Whether the examples actually run is checked in the browser by
 * tools/check-examples.mjs.
 */
import { LECTURES, PRACTICALS, LITERATURE } from '../src/classes/index.js';
import { buildCourse } from '../src/course/index.js';

const BLOCK_KINDS = ['h', 'h4', 'p', 'lead', 'ul', 'ol', 'code', 'note', 'warn', 'tip', 'table', 'terms'];
const LESSON_IDS = new Set(buildCourse('uz').lessons.map((lesson) => lesson.id));
const LECTURE_IDS = new Set(LECTURES.map((item) => item.id));
const PRACTICAL_IDS = new Set(PRACTICALS.map((item) => item.id));

const problems = [];
let blocks = 0;
let runnable = 0;

function fail(where, message) {
  problems.push(`${where}: ${message}`);
}

function checkScript(where, source) {
  // Inline <script> bodies inside an HTML example are checked too.
  const scripts = [];
  source.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, (_, body) => scripts.push(body));
  return scripts;
}

function compiles(where, code) {
  try {
    // Wrapped in an async function so top-level `await` in examples is fine.
    new Function(`return (async () => {\n${code}\n})`);
  } catch (error) {
    fail(where, `JS sintaksis xatosi: ${error.message}`);
  }
}

function checkBlocks(where, list) {
  if (!Array.isArray(list)) {
    fail(where, 'bloklar massiv emas');
    return;
  }
  list.forEach((block, index) => {
    blocks++;
    const at = `${where} #${index + 1}`;
    if (typeof block === 'string') {
      if (!block.trim()) fail(at, 'bo‘sh paragraf');
      return;
    }
    const kinds = BLOCK_KINDS.filter((kind) => kind in block);
    if (kinds.length !== 1) {
      fail(at, `blok turi aniqlanmadi (${Object.keys(block).join(', ')})`);
      return;
    }
    const kind = kinds[0];
    if (kind === 'table') {
      const { head = [], rows } = block.table;
      if (!Array.isArray(rows) || !rows.length) fail(at, 'jadvalda qator yo‘q');
      else if (head.length) rows.forEach((row, r) => {
        if (row.length !== head.length) fail(at, `jadval ${r + 1}-qatorida ${row.length} ta katak, sarlavhada ${head.length}`);
      });
    }
    if (kind === 'terms' && !block.terms.every((pair) => Array.isArray(pair) && pair.length === 2)) {
      fail(at, 'terms — [atama, ta’rif] juftliklari bo‘lishi kerak');
    }
    if ((kind === 'ul' || kind === 'ol') && (!Array.isArray(block[kind]) || !block[kind].length)) {
      fail(at, 'bo‘sh ro‘yxat');
    }
    if (kind === 'code') {
      if (typeof block.code !== 'string' || !block.code.trim()) fail(at, 'bo‘sh kod');
      if (block.run) {
        runnable++;
        const source = typeof block.run === 'object' ? block.run : null;
        if (source) {
          if (source.js) compiles(at, source.js);
          if (source.html) checkScript(at, source.html).forEach((body) => compiles(`${at} <script>`, body));
        } else if (['js', 'javascript'].includes(block.lang)) {
          compiles(at, block.code);
        } else if (block.lang === 'html') {
          checkScript(at, block.code).forEach((body) => compiles(`${at} <script>`, body));
        }
      }
      if (block.sandbox && !block.run) fail(at, '`sandbox` bor, lekin `run` yo‘q');
    }
  });
}

function checkLinks(where, item) {
  item.lessons.forEach((id) => { if (!LESSON_IDS.has(id)) fail(where, `mustaqil ta’lim darsi topilmadi: ${id}`); });
  (item.practicals || []).forEach((id) => { if (!PRACTICAL_IDS.has(id)) fail(where, `amaliy topilmadi: ${id}`); });
  (item.lectures || []).forEach((id) => { if (!LECTURE_IDS.has(id)) fail(where, `ma’ruza topilmadi: ${id}`); });
}

function checkNumbers(list, prefix, expected) {
  const numbers = list.map((item) => item.number);
  for (let n = 1; n <= expected; n++) {
    if (!numbers.includes(n)) fail(prefix, `${prefix}${n} yo‘q`);
  }
  const ids = list.map((item) => item.id);
  ids.forEach((id, index) => {
    if (ids.indexOf(id) !== index) fail(prefix, `takroriy id: ${id}`);
    if (id !== `${prefix.toLowerCase()}${list[index].number}`) fail(prefix, `id "${id}" raqamga mos emas (${list[index].number})`);
  });
}

checkNumbers(LECTURES, 'M', 18);
checkNumbers(PRACTICALS, 'A', 12);

LECTURES.forEach((lecture) => {
  const where = lecture.code;
  if (!lecture.title) fail(where, 'sarlavha yo‘q');
  if (!lecture.summary) fail(where, 'qisqa tavsif (summary) yo‘q');
  if (lecture.goals.length < 2) fail(where, 'maqsadlar kam');
  if (lecture.sections.length < 3) fail(where, 'bo‘limlar kam (kamida 3)');
  if (lecture.questions.length < 5) fail(where, 'nazorat savollari kam (kamida 5)');
  if (!lecture.literature.length) fail(where, 'adabiyot ko‘rsatilmagan');
  lecture.literature.forEach((number) => { if (!LITERATURE[number]) fail(where, `adabiyot [${number}] ro‘yxatda yo‘q`); });
  lecture.sections.forEach((section, index) => {
    if (!section.title) fail(`${where} bo‘lim ${index + 1}`, 'sarlavha yo‘q');
    checkBlocks(`${where} «${section.title}»`, section.blocks);
  });
  checkBlocks(`${where} xulosa`, lecture.conclusion);
  lecture.glossary.forEach((pair, index) => {
    if (!Array.isArray(pair) || pair.length !== 2) fail(`${where} glossariy`, `${index + 1}-yozuv [atama, ta’rif] emas`);
  });
  checkLinks(where, lecture);
});

PRACTICALS.forEach((practical) => {
  const where = practical.code;
  if (!practical.title) fail(where, 'sarlavha yo‘q');
  if (!practical.goal) fail(where, 'maqsad yo‘q');
  if (practical.steps.length < 3) fail(where, 'qadamlar kam (kamida 3)');
  if (!practical.tasks.length) fail(where, 'mustaqil topshiriqlar yo‘q');
  if (practical.questions.length < 5) fail(where, 'nazorat savollari kam (kamida 5)');
  practical.criteria.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== 2) fail(`${where} baholash`, `${index + 1}-qator [mezon, ball] emas`);
  });
  checkBlocks(`${where} nazariya`, practical.theory);
  practical.steps.forEach((step, index) => {
    if (!step.title) fail(`${where} qadam ${index + 1}`, 'sarlavha yo‘q');
    checkBlocks(`${where} qadam ${index + 1}`, step.blocks);
  });
  practical.tasks.forEach((task, index) => {
    if (!task.title) fail(`${where} topshiriq ${index + 1}`, 'sarlavha yo‘q');
    if (task.level && !['easy', 'medium', 'hard'].includes(task.level)) fail(`${where} topshiriq ${index + 1}`, `noma’lum daraja ${task.level}`);
    checkBlocks(`${where} topshiriq ${index + 1}`, task.blocks);
  });
  checkLinks(where, practical);
});

if (problems.length) {
  console.error(`Dars mashg‘ulotlarida ${problems.length} ta muammo:\n`);
  problems.forEach((problem) => console.error(`  • ${problem}`));
  process.exit(1);
}

console.log(`Dars mashg‘ulotlari: ${LECTURES.length} ma’ruza, ${PRACTICALS.length} amaliy, ${blocks} blok, ${runnable} ta «Sinab ko‘rish» misoli — muammo yo‘q.`);
