/*
 * Dars mashg'ulotlari: fan dasturidagi 18 ta ma'ruza (M1–M18) va 19 ta amaliy
 * mashg'ulot (A1–A19).
 *
 * Har bir mavzu alohida faylda — ma'ruza matni `lectures/`, amaliy ish
 * qo'llanmasi `practicals/` ichida. Bu fayl ularni yig'adi, raqamlaydi va
 * o'zaro bog'lanishlarni (ma'ruza ↔ amaliy ↔ mustaqil ta'lim darsi) beradi.
 * Format: docs/CLASSES.md.
 */
import { LITERATURE } from './literature.js';
import m1 from './lectures/m01.js';
import m2 from './lectures/m02.js';
import m3 from './lectures/m03.js';
import m4 from './lectures/m04.js';
import m5 from './lectures/m05.js';
import m6 from './lectures/m06.js';
import m7 from './lectures/m07.js';
import m8 from './lectures/m08.js';
import m9 from './lectures/m09.js';
import m10 from './lectures/m10.js';
import m11 from './lectures/m11.js';
import m12 from './lectures/m12.js';
import m13 from './lectures/m13.js';
import m14 from './lectures/m14.js';
import m15 from './lectures/m15.js';
import m16 from './lectures/m16.js';
import m17 from './lectures/m17.js';
import m18 from './lectures/m18.js';
import a1 from './practicals/a01.js';
import a2 from './practicals/a02.js';
import a3 from './practicals/a03.js';
import a4 from './practicals/a04.js';
import a5 from './practicals/a05.js';
import a6 from './practicals/a06.js';
import a7 from './practicals/a07.js';
import a8 from './practicals/a08.js';
import a9 from './practicals/a09.js';
import a10 from './practicals/a10.js';
import a11 from './practicals/a11.js';
import a12 from './practicals/a12.js';
import a13 from './practicals/a13.js';
import a14 from './practicals/a14.js';
import a15 from './practicals/a15.js';
import a16 from './practicals/a16.js';
import a17 from './practicals/a17.js';
import a18 from './practicals/a18.js';
import a19 from './practicals/a19.js';

// Explicit imports (not import.meta.glob) so Node tooling can load the index too.
const LECTURE_FILES = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18];
const PRACTICAL_FILES = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19];

const byNumber = (a, b) => a.number - b.number;

function normalizeLecture(raw) {
  return {
    literature: [],
    goals: [],
    keywords: [],
    sections: [],
    conclusion: [],
    glossary: [],
    questions: [],
    practicals: [],
    lessons: [],
    ...raw,
    kind: 'lecture',
    code: `M${raw.number}`
  };
}

function normalizePractical(raw) {
  return {
    duration: '2 soat (80 daqiqa)',
    outcomes: [],
    tools: [],
    theory: [],
    steps: [],
    tasks: [],
    report: [],
    criteria: [],
    questions: [],
    lectures: [],
    lessons: [],
    ...raw,
    kind: 'practical',
    code: `A${raw.number}`
  };
}

export const LECTURES = LECTURE_FILES.map(normalizeLecture).sort(byNumber);
export const PRACTICALS = PRACTICAL_FILES.map(normalizePractical).sort(byNumber);

export { LITERATURE };

export function getLecture(id) {
  return LECTURES.find((entry) => entry.id === id) || null;
}

export function getPractical(id) {
  return PRACTICALS.find((entry) => entry.id === id) || null;
}

/** Previous and next item of the same kind. */
export function neighboursOf(item) {
  const list = item.kind === 'lecture' ? LECTURES : PRACTICALS;
  const at = list.indexOf(item);
  return { previous: list[at - 1] || null, next: list[at + 1] || null };
}

/**
 * Lectures a practical builds on: the ones it names, plus every lecture that
 * names it back — so a link only has to be written on one side.
 */
export function lecturesFor(practical) {
  const ids = new Set(practical.lectures);
  LECTURES.forEach((lecture) => { if (lecture.practicals.includes(practical.id)) ids.add(lecture.id); });
  return LECTURES.filter((lecture) => ids.has(lecture.id));
}

export function practicalsFor(lecture) {
  const ids = new Set(lecture.practicals);
  PRACTICALS.forEach((practical) => { if (practical.lectures.includes(lecture.id)) ids.add(practical.id); });
  return PRACTICALS.filter((practical) => ids.has(practical.id));
}
