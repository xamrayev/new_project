/*
 * Brauzerdagi SQL laboratoriyasi: amaliy ishlardagi SQL misollarini sandbox
 * ichida SQLite (sql.js, WebAssembly) orqali bajarish uchun.
 *
 * sqlLab(schema, query) — «Sinab ko‘rish» tugmasi uchun tayyor `run` va
 * `sandbox` qaytaradi: sahifada so‘rov maydoni, «Bajarish» tugmasi va natija
 * jadvali bo‘ladi, `schema` esa bazani oldindan yaratib to‘ldiradi.
 * sql.js CDN dan yuklanadi, shuning uchun internet kerak (allowNetwork).
 */
const SQL_JS = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3';

const HTML = `<div class="lab">
  <textarea id="sql" spellcheck="false"></textarea>
  <div class="bar">
    <button id="run">▶ Bajarish (Ctrl+Enter)</button>
    <span id="state">SQLite yuklanmoqda…</span>
  </div>
  <div id="out"></div>
</div>
<script src="${SQL_JS}/sql-wasm.js"></script>`;

const CSS = `body { font-family: system-ui, sans-serif; margin: 0; padding: 12px; background: #f8fafc; color: #0f172a; }
textarea { width: 100%; box-sizing: border-box; min-height: 130px; font: 13px/1.5 ui-monospace, Menlo, monospace; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
.bar { display: flex; gap: 10px; align-items: center; margin: 8px 0; }
button { padding: 7px 14px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; cursor: pointer; }
#state { font-size: 13px; color: #64748b; }
table { border-collapse: collapse; background: #fff; margin: 8px 0 14px; font-size: 13px; }
th, td { border: 1px solid #e2e8f0; padding: 5px 10px; text-align: left; }
th { background: #eef2ff; }
.msg { font-size: 13px; color: #15803d; margin: 6px 0; }
.err { color: #dc2626; white-space: pre-wrap; }`;

function script(schema) {
  return `const SCHEMA = ${JSON.stringify(schema)};
const area = document.querySelector('#sql');
const out = document.querySelector('#out');
const state = document.querySelector('#state');
let db = null;

function table(result) {
  const t = document.createElement('table');
  const head = t.createTHead().insertRow();
  result.columns.forEach((c) => { const th = document.createElement('th'); th.textContent = c; head.append(th); });
  const body = t.createTBody();
  result.values.forEach((row) => {
    const tr = body.insertRow();
    row.forEach((v) => { tr.insertCell().textContent = v === null ? 'NULL' : v; });
  });
  return t;
}

function run() {
  if (!db) return;
  out.textContent = '';
  try {
    const results = db.exec(area.value);
    const changed = db.getRowsModified();
    results.forEach((r) => out.append(table(r)));
    const msg = document.createElement('p');
    msg.className = 'msg';
    msg.textContent = results.length
      ? results.map((r) => r.values.length + ' ta qator').join(', ')
      : 'Bajarildi. O‘zgargan qatorlar: ' + changed;
    out.append(msg);
    console.log('SQL bajarildi:', msg.textContent);
  } catch (error) {
    const p = document.createElement('p');
    p.className = 'err';
    p.textContent = 'Xato: ' + error.message;
    out.append(p);
    console.error(error.message);
  }
}

initSqlJs({ locateFile: (file) => '${SQL_JS}/' + file }).then((SQL) => {
  db = new SQL.Database();
  db.exec(SCHEMA);
  state.textContent = 'SQLite tayyor — so‘rovni o‘zgartirib, qayta bajaring';
  run();
}).catch((error) => {
  state.textContent = 'sql.js yuklanmadi (internet kerak): ' + error.message;
});

document.querySelector('#run').addEventListener('click', run);
area.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); } });`;
}

/** Ma’lumotlar bazasi sxemasi: A10–A12 dagi universitet bazasi (SQLite dialekti). */
export const UNIVERSITY_SCHEMA = `CREATE TABLE groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  faculty TEXT NOT NULL
);
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  birth_date TEXT,
  gpa REAL CHECK (gpa BETWEEN 0 AND 5),
  group_id INTEGER REFERENCES groups(id)
);
CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  credits INTEGER NOT NULL
);
CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  grade INTEGER CHECK (grade BETWEEN 0 AND 100),
  PRIMARY KEY (student_id, course_id)
);
INSERT INTO groups (name, faculty) VALUES ('DI-21', 'Axborot texnologiyalari'), ('DI-22', 'Axborot texnologiyalari'), ('IQ-22', 'Iqtisodiyot');
INSERT INTO students (full_name, email, birth_date, gpa, group_id) VALUES
  ('Aziz Karimov', 'aziz@mail.uz', '2004-03-15', 4.6, 2),
  ('Dilnoza Rahimova', 'dilnoza@mail.uz', '2005-07-02', 4.9, 2),
  ('Jasur Aliyev', 'jasur@mail.uz', '2003-11-20', 3.8, 1),
  ('Malika Tosheva', 'malika@mail.uz', '2004-01-09', 4.2, 1),
  ('Sardor Yusupov', 'sardor@mail.uz', '2005-05-30', 3.5, 3),
  ('Nodira Qodirova', NULL, '2004-09-12', 4.4, 2);
INSERT INTO courses (title, credits) VALUES ('Web tizimlari', 6), ('Ma’lumotlar bazasi', 5), ('Algoritmlar', 4), ('Iqtisodiyot nazariyasi', 4);
INSERT INTO enrollments VALUES (1,1,88),(1,2,76),(2,1,97),(2,2,92),(2,3,90),(3,1,64),(3,3,58),(4,1,81),(4,2,85),(5,4,70),(6,1,91);`;

export function sqlLab(schema, query) {
  return {
    run: { html: HTML, css: CSS, js: `document.querySelector('#sql').value = ${JSON.stringify(query)};\n${script(schema)}` },
    sandbox: { allowNetwork: true }
  };
}
