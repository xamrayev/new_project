/*
 * Prints everything a translator has to touch for one module, in the order the
 * overlay expects it: lesson texts, task texts, hints, and every check label
 * with the literals it compares against.
 *
 * Usage: node tools/translation-worksheet.mjs <moduleId> [fromLesson] [toLesson]
 */
import { buildCourse } from '../src/course/index.js';

const [moduleId, from = 0, to = 999] = process.argv.slice(2);
const course = buildCourse('ru');
const cyrillic = /[А-Яа-яЁё]/;

const module = course.modules.find((entry) => entry.id === moduleId);
if (!module) {
  console.error(`Нет модуля "${moduleId}". Доступны: ${course.modules.map((m) => m.id).join(', ')}`);
  process.exit(1);
}

const show = (value) => JSON.stringify(value);

function checkLiterals(check) {
  const out = [];
  ['equals', 'contains', 'notContains', 'matches', 'fail'].forEach((key) => {
    if (typeof check[key] === 'string' && cyrillic.test(check[key])) out.push(`${key}=${show(check[key])}`);
  });
  if (Array.isArray(check.oneOf) && check.oneOf.some((v) => cyrillic.test(String(v)))) out.push(`oneOf=${show(check.oneOf)}`);
  if (check.kind === 'custom' && cyrillic.test(check.fn)) out.push('fn');
  if (Array.isArray(check.steps)) {
    check.steps.forEach((step, index) => {
      if (typeof step.value === 'string' && cyrillic.test(step.value)) out.push(`steps[${index}].value=${show(step.value)}`);
    });
  }
  return out;
}

function printChecks(checks, indent) {
  checks.forEach((check, index) => {
    const literals = checkLiterals(check);
    console.log(`${indent}${index + 1}. [${check.kind}] ${check.label}${literals.length ? '   << ' + literals.join(' ') : ''}`);
    if (check.kind === 'custom' && cyrillic.test(check.fn)) console.log(`${indent}   fn: ${check.fn}`);
    if (Array.isArray(check.then)) printChecks(check.then, indent + '   ');
  });
}

for (const lesson of module.lessons) {
  if (lesson.number < Number(from) || lesson.number > Number(to)) continue;

  console.log(`\n${'='.repeat(78)}\nLESSON ${lesson.number} ${lesson.id}`);
  console.log(`title:   ${lesson.title}`);
  console.log(`summary: ${lesson.summary}`);
  console.log('theory:');
  lesson.theory.forEach((block, index) => {
    const [kind] = Object.keys(block);
    const value = block[kind];
    if (kind === 'table') {
      console.log(`  ${index} table head: ${show(value.head)}`);
      value.rows.forEach((row, rowIndex) => console.log(`  ${index}   row${rowIndex}: ${show(row)}`));
    } else if (Array.isArray(value)) {
      value.forEach((item, itemIndex) => console.log(`  ${index} ${kind}[${itemIndex}]: ${item}`));
    } else {
      console.log(`  ${index} ${kind}: ${show(value)}`);
    }
  });

  for (const task of lesson.tasks) {
    console.log(`\n  --- TASK ${task.id} (${task.difficulty})`);
    console.log(`  title: ${task.title}`);
    console.log(`  desc:  ${task.description}`);
    task.hints.forEach((hint, index) => console.log(`  hint${index}: ${hint}`));
    ['html', 'css', 'js'].forEach((lang) => {
      if (cyrillic.test(task.starter[lang] || '')) console.log(`  starter.${lang}: ${show(task.starter[lang])}`);
    });
    ['html', 'css', 'js'].forEach((lang) => {
      if (cyrillic.test(task.solution[lang] || '') && task.solution[lang] !== task.starter[lang]) {
        console.log(`  solution.${lang}: ${show(task.solution[lang])}`);
      }
    });
    console.log('  checks:');
    printChecks(task.checks, '   ');
  }
}
