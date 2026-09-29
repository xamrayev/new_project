/* A13. RESTful API endpointlarini yaratish va test qilish. */
import { DEMO_API } from '../mock-api.js';

const clientTests = `// Brauzerdagi kichik test-runner: har bir tekshiruv — nom va funksiya
const results = [];

async function test(name, fn) {
  try {
    await fn();
    results.push('✓ ' + name);
  } catch (error) {
    results.push('✗ ' + name + ' — ' + error.message);
  }
}

function expect(actual, expected, what) {
  if (actual !== expected) throw new Error(what + ': kutilgan ' + expected + ', keldi ' + actual);
}

// Oddiy <script> da yuqori darajadagi await ishlamaydi — testlarni async funksiyaga o‘raymiz
async function main() {
  await test('GET /api/students → 200 va massiv', async () => {
    const res = await fetch('/api/students');
    expect(res.status, 200, 'holat kodi');
    const data = await res.json();
    expect(Array.isArray(data), true, 'massivmi');
    expect(data.length > 0, true, 'bo‘sh emasmi');
  });

  await test('GET /api/students/2 → bitta obyekt', async () => {
    const res = await fetch('/api/students/2');
    const student = await res.json();
    expect(student.id, 2, 'id');
    expect(typeof student.name, 'string', 'name turi');
  });

  await test('POST /api/feedback → 201 Created', async () => {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Zo‘r dars!' })
    });
    expect(res.status, 201, 'holat kodi');
  });

  await test('GET /api/missing → 404', async () => {
    const res = await fetch('/api/missing');
    expect(res.status, 404, 'holat kodi');
    expect(res.ok, false, 'res.ok');
  });

  await test('GET /api/broken → 500 va xato matni', async () => {
    const res = await fetch('/api/broken');
    expect(res.status, 500, 'holat kodi');
    const body = await res.json();
    expect('error' in body, true, 'error maydoni');
  });

  results.forEach((line) => console.log(line));
  console.log(results.filter((r) => r.startsWith('✓')).length + ' / ' + results.length + ' ta test o‘tdi');
}

main();`;

export default {
  id: 'a13',
  number: 13,
  title: 'RESTful API endpointlarini yaratish va test qilish',
  summary: 'Resurs uchun to‘liq CRUD (GET, POST, PUT, PATCH, DELETE) endpointlari, to‘g‘ri holat kodlari va avtomatik testlar.',
  lectures: ['m13', 'm12'],
  lessons: ['js-fetch', 'js-async'],
  goal: 'REST arxitektura tamoyillariga mos resurs endpointlarini loyihalash va Express.js da amalga oshirish, ularni Postman/curl bilan qo‘lda hamda Node.js ning o‘rnatilgan test vositasi bilan avtomatik sinash.',
  outcomes: [
    'resurslar va ular ustidagi amallarni REST uslubida nomlaydi (`/api/books/:id`);',
    'GET, POST, PUT, PATCH, DELETE metodlarini va ularning idempotentligini farqlaydi;',
    'har bir holat uchun to‘g‘ri HTTP holat kodini qaytaradi (200, 201, 204, 400, 404, 409, 422);',
    'filtrlash, saralash va sahifalashni query parametrlari orqali beradi;',
    'endpointlarni Postman kolleksiyasi va `node --test` bilan avtomatik tekshiradi.'
  ],
  tools: [
    'Node.js 20+ va A9 dagi Express loyihasi (yoki yangi loyiha).',
    'Postman yoki VS Code uchun Thunder Client / REST Client kengaytmasi.',
    '`curl` (Windows 10+ da o‘rnatilgan).'
  ],
  theory: [
    { lead: 'REST — resurslarga yagona interfeys orqali murojaat qilish uslubi: URL **nima** ekanini (resurs), HTTP metodi esa **nima qilish** kerakligini bildiradi.' },
    { table: { head: ['Metod va URL', 'Amal', 'Muvaffaqiyatli javob', 'Idempotent'], rows: [
      ['`GET /api/books`', 'Ro‘yxat (filtr, sahifalash)', '200 + massiv', 'ha'],
      ['`GET /api/books/7`', 'Bitta resurs', '200 yoki 404', 'ha'],
      ['`POST /api/books`', 'Yangi resurs yaratish', '201 + `Location` sarlavhasi', 'yo‘q'],
      ['`PUT /api/books/7`', 'Resursni to‘liq almashtirish', '200 yoki 204', 'ha'],
      ['`PATCH /api/books/7`', 'Qisman yangilash', '200', 'odatda yo‘q'],
      ['`DELETE /api/books/7`', 'O‘chirish', '204 (tanasiz)', 'ha']
    ] } },
    { table: { head: ['Kod', 'Qachon'], rows: [
      ['400 Bad Request', 'So‘rov noto‘g‘ri tuzilgan: JSON buzilgan, `id` son emas'],
      ['404 Not Found', 'Bunday resurs yo‘q'],
      ['409 Conflict', 'Takrorlanmas qiymat band (masalan, ISBN allaqachon bor)'],
      ['422 Unprocessable Content', 'Tuzilishi to‘g‘ri, lekin qiymatlar validatsiyadan o‘tmadi'],
      ['500 Internal Server Error', 'Server kodidagi kutilmagan xato']
    ] } },
    { note: 'Endpoint nomlarida fe’l ishlatilmaydi: `/api/getBooks`, `/api/deleteBook?id=7` — REST emas. To‘g‘risi: `GET /api/books`, `DELETE /api/books/7`. Resurs nomi ko‘plikda yoziladi.' }
  ],
  steps: [
    {
      title: 'Loyiha va ma’lumotlar qatlami',
      blocks: [
        { code: 'mkdir books-api && cd books-api\nnpm init -y\nnpm pkg set type=module\nnpm pkg set scripts.dev="node --watch server.js" scripts.test="node --test"\nnpm install express', lang: 'bash' },
        'Ma’lumotlarni saqlashni alohida modulga ajrating — keyinchalik uni SQLite/MySQL bilan almashtirish oson bo‘ladi (A11).',
        { code: "// store.js — xotiradagi «baza»\nlet nextId = 3;\nconst books = [\n  { id: 1, title: 'O‘tkan kunlar', author: 'Abdulla Qodiriy', year: 1925, isbn: '978-9943-01-001-1' },\n  { id: 2, title: 'Kecha va kunduz', author: 'Cho‘lpon', year: 1936, isbn: '978-9943-01-002-8' }\n];\n\nexport const store = {\n  all: () => books,\n  find: (id) => books.find((b) => b.id === id),\n  findByIsbn: (isbn) => books.find((b) => b.isbn === isbn),\n  create(data) {\n    const book = { id: nextId++, ...data };\n    books.push(book);\n    return book;\n  },\n  replace(id, data) {\n    const at = books.findIndex((b) => b.id === id);\n    if (at === -1) return null;\n    books[at] = { id, ...data };\n    return books[at];\n  },\n  remove(id) {\n    const at = books.findIndex((b) => b.id === id);\n    if (at === -1) return false;\n    books.splice(at, 1);\n    return true;\n  }\n};", lang: 'js', title: 'store.js' }
      ]
    },
    {
      title: 'Validatsiya va ID ni tekshirish',
      blocks: [
        'Validatsiyani bitta funksiyaga yig‘ing: u POST, PUT va PATCH da qayta ishlatiladi. `partial` rejimi PATCH uchun — faqat yuborilgan maydonlar tekshiriladi.',
        { code: "// validate.js\nexport function validateBook(body, { partial = false } = {}) {\n  const errors = {};\n  const has = (key) => body[key] !== undefined;\n\n  if (!partial || has('title')) {\n    if (typeof body.title !== 'string' || body.title.trim().length < 2) errors.title = 'kamida 2 belgi';\n  }\n  if (!partial || has('author')) {\n    if (typeof body.author !== 'string' || !body.author.trim()) errors.author = 'majburiy';\n  }\n  if (has('year')) {\n    const y = Number(body.year);\n    if (!Number.isInteger(y) || y < 1400 || y > new Date().getFullYear()) errors.year = 'noto‘g‘ri yil';\n  }\n  if (!partial || has('isbn')) {\n    if (!/^978-[\\d-]{10,13}$/.test(body.isbn || '')) errors.isbn = 'format: 978-…';\n  }\n  return errors;\n}", lang: 'js', title: 'validate.js' },
        { code: "// Marshrut parametrini songa aylantiruvchi middleware\nexport function parseId(req, res, next) {\n  const id = Number(req.params.id);\n  if (!Number.isInteger(id) || id < 1) {\n    return res.status(400).json({ error: 'id musbat butun son bo‘lishi kerak' });\n  }\n  req.bookId = id;\n  next();\n}", lang: 'js' }
      ]
    },
    {
      title: 'CRUD endpointlari',
      blocks: [
        { code: "// routes/books.js\nimport { Router } from 'express';\nimport { store } from '../store.js';\nimport { validateBook, parseId } from '../validate.js';\n\nconst router = Router();\n\nrouter.get('/', (req, res) => { /* keyingi qadamda */ res.json(store.all()); });\n\nrouter.get('/:id', parseId, (req, res) => {\n  const book = store.find(req.bookId);\n  if (!book) return res.status(404).json({ error: 'Kitob topilmadi' });\n  res.json(book);\n});\n\nrouter.post('/', (req, res) => {\n  const errors = validateBook(req.body);\n  if (Object.keys(errors).length) return res.status(422).json({ errors });\n  if (store.findByIsbn(req.body.isbn)) return res.status(409).json({ error: 'Bu ISBN allaqachon mavjud' });\n\n  const { title, author, year, isbn } = req.body;   // faqat ruxsat etilgan maydonlar\n  const book = store.create({ title: title.trim(), author: author.trim(), year: Number(year) || null, isbn });\n  res.status(201).location(`/api/books/${book.id}`).json(book);\n});\n\nrouter.put('/:id', parseId, (req, res) => {\n  if (!store.find(req.bookId)) return res.status(404).json({ error: 'Kitob topilmadi' });\n  const errors = validateBook(req.body);\n  if (Object.keys(errors).length) return res.status(422).json({ errors });\n  const { title, author, year, isbn } = req.body;\n  res.json(store.replace(req.bookId, { title, author, year: Number(year) || null, isbn }));\n});\n\nrouter.patch('/:id', parseId, (req, res) => {\n  const book = store.find(req.bookId);\n  if (!book) return res.status(404).json({ error: 'Kitob topilmadi' });\n  const errors = validateBook(req.body, { partial: true });\n  if (Object.keys(errors).length) return res.status(422).json({ errors });\n  for (const key of ['title', 'author', 'year', 'isbn']) {\n    if (req.body[key] !== undefined) book[key] = req.body[key];\n  }\n  res.json(book);\n});\n\nrouter.delete('/:id', parseId, (req, res) => {\n  if (!store.remove(req.bookId)) return res.status(404).json({ error: 'Kitob topilmadi' });\n  res.status(204).end();\n});\n\nexport default router;", lang: 'js', title: 'routes/books.js' },
        { code: "// server.js\nimport express from 'express';\nimport booksRouter from './routes/books.js';\n\nexport const app = express();\napp.use(express.json());\napp.use('/api/books', booksRouter);\n\napp.use((req, res) => res.status(404).json({ error: 'Endpoint topilmadi' }));\napp.use((err, req, res, next) => {\n  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON noto‘g‘ri' });\n  console.error(err);\n  res.status(500).json({ error: 'Server xatosi' });\n});\n\n// Test paytida server alohida ishga tushiriladi\nif (process.argv[1].endsWith('server.js')) {\n  app.listen(3000, () => console.log('http://localhost:3000/api/books'));\n}", lang: 'js', title: 'server.js' },
        { warn: '`req.body` ni to‘g‘ridan-to‘g‘ri saqlamang (`store.create(req.body)`): foydalanuvchi `id`, `role` kabi kutilmagan maydonlarni yuborishi mumkin (*mass assignment*). Faqat kerakli maydonlarni ajratib oling.' }
      ]
    },
    {
      title: 'Filtrlash, saralash va sahifalash',
      blocks: [
        '`GET /api/books?author=Qodiriy&sort=-year&page=1&limit=10` ko‘rinishidagi so‘rovlarni qo‘llab-quvvatlang. Javobda ma’lumot va meta-ma’lumot alohida qaytariladi.',
        { code: "router.get('/', (req, res) => {\n  const { q, author, sort = 'id', page = '1', limit = '10' } = req.query;\n  let list = [...store.all()];\n\n  if (author) list = list.filter((b) => b.author.toLowerCase().includes(author.toLowerCase()));\n  if (q) list = list.filter((b) => b.title.toLowerCase().includes(q.toLowerCase()));\n\n  const field = sort.replace(/^-/, '');\n  const dir = sort.startsWith('-') ? -1 : 1;\n  if (!['id', 'title', 'year'].includes(field)) return res.status(400).json({ error: `sort: ${field} ruxsat etilmagan` });\n  list.sort((a, b) => (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0) * dir);\n\n  const size = Math.min(Math.max(Number(limit) || 10, 1), 100);\n  const current = Math.max(Number(page) || 1, 1);\n  const data = list.slice((current - 1) * size, current * size);\n\n  res.json({ data, meta: { page: current, limit: size, total: list.length, pages: Math.ceil(list.length / size) } });\n});", lang: 'js' }
      ]
    },
    {
      title: 'Qo‘lda sinash: curl va Postman',
      blocks: [
        { code: "# Ro‘yxat\ncurl -s http://localhost:3000/api/books\n\n# Yaratish — javobda 201 va Location sarlavhasi\ncurl -i -X POST http://localhost:3000/api/books \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"title\":\"Sariq devni minib\",\"author\":\"Xudoyberdi To‘xtaboyev\",\"year\":1968,\"isbn\":\"978-9943-01-003-5\"}'\n\n# Qisman yangilash\ncurl -i -X PATCH http://localhost:3000/api/books/3 -H 'Content-Type: application/json' -d '{\"year\":1969}'\n\n# O‘chirish — 204, tanasiz\ncurl -i -X DELETE http://localhost:3000/api/books/3\n\n# Xatolar: 400, 404, 422, 409\ncurl -i http://localhost:3000/api/books/abc\ncurl -i http://localhost:3000/api/books/999\ncurl -i -X POST http://localhost:3000/api/books -H 'Content-Type: application/json' -d '{\"title\":\"X\"}'", lang: 'bash' },
        'Postman da **Collection** yarating (`Books API`), har bir so‘rovni alohida saqlang va `{{baseUrl}}` o‘zgaruvchisini `http://localhost:3000` ga tenglang. **Tests** yorlig‘ida javobni avtomatik tekshirish mumkin:',
        { code: "pm.test('Holat kodi 201', () => pm.response.to.have.status(201));\npm.test('Javobda id bor', () => {\n  const book = pm.response.json();\n  pm.expect(book.id).to.be.a('number');\n  pm.collectionVariables.set('bookId', book.id);   // keyingi so‘rovlar uchun\n});", lang: 'js', title: 'Postman → Tests' },
        { tip: 'Kolleksiyani **Run collection** bilan bir tugmada ketma-ket ishga tushirish mumkin. Kolleksiyani JSON qilib eksport qiling va hisobotga qo‘shing.' }
      ]
    },
    {
      title: 'Test-mijozni brauzerda sinab ko‘rish',
      blocks: [
        'Avtomatik test g‘oyasi oddiy: so‘rov yuboriladi va javobning holat kodi hamda tanasi kutilgan qiymat bilan solishtiriladi. Quyidagi misol o‘quv serveriga so‘rov yuboradi — «Sinab ko‘rish» ni bosing va konsolni kuzating.',
        { code: clientTests, lang: 'js', run: true, sandbox: DEMO_API }
      ]
    },
    {
      title: 'Avtomatik testlar: node --test',
      blocks: [
        'Node.js 20 da test yozish uchun qo‘shimcha paket kerak emas: `node:test` va `node:assert`. Server testlar uchun tasodifiy portda ishga tushiriladi.',
        { code: "// test/books.test.js\nimport { test, before, after } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { app } from '../server.js';\n\nlet server, base;\nbefore(() => new Promise((resolve) => {\n  server = app.listen(0, () => {           // 0 — bo‘sh port\n    base = `http://localhost:${server.address().port}/api/books`;\n    resolve();\n  });\n}));\nafter(() => server.close());\n\nconst json = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });\n\ntest('GET ro‘yxat 200 va meta qaytaradi', async () => {\n  const res = await fetch(base);\n  assert.equal(res.status, 200);\n  const { data, meta } = await res.json();\n  assert.ok(Array.isArray(data));\n  assert.equal(meta.page, 1);\n});\n\ntest('POST → 201, keyin GET shu kitobni topadi', async () => {\n  const res = await fetch(base, json('POST', { title: 'Test kitob', author: 'Muallif', isbn: '978-0000-00-000-0' }));\n  assert.equal(res.status, 201);\n  const book = await res.json();\n  assert.equal(res.headers.get('location'), `/api/books/${book.id}`);\n  const again = await fetch(`${base}/${book.id}`);\n  assert.equal((await again.json()).title, 'Test kitob');\n});\n\ntest('noto‘g‘ri ma’lumot → 422', async () => {\n  const res = await fetch(base, json('POST', { title: 'X' }));\n  assert.equal(res.status, 422);\n  const { errors } = await res.json();\n  assert.ok(errors.title && errors.author && errors.isbn);\n});\n\ntest('DELETE → 204, qayta DELETE → 404', async () => {\n  assert.equal((await fetch(`${base}/1`, { method: 'DELETE' })).status, 204);\n  assert.equal((await fetch(`${base}/1`, { method: 'DELETE' })).status, 404);\n});\n\ntest('id son bo‘lmasa → 400', async () => {\n  assert.equal((await fetch(`${base}/abc`)).status, 400);\n});", lang: 'js', title: 'test/books.test.js' },
        { code: 'npm test\n# ✔ GET ro‘yxat 200 va meta qaytaradi\n# ✔ POST → 201, keyin GET shu kitobni topadi\n# ...\n# ℹ pass 5  ℹ fail 0', lang: 'bash' }
      ]
    },
    {
      title: 'API ni hujjatlashtirish',
      blocks: [
        'Loyiha ildizida `API.md` fayli yarating: har bir endpoint uchun metod, URL, parametrlar, so‘rov tanasi namunasi va mumkin bo‘lgan javoblar.',
        { code: '## POST /api/books\n\nYangi kitob qo‘shadi.\n\n| Maydon | Turi | Majburiy |\n|---|---|---|\n| title | string (≥ 2) | ha |\n| author | string | ha |\n| year | integer | yo‘q |\n| isbn | string `978-…` | ha |\n\nJavoblar: `201` kitob, `409` ISBN band, `422` validatsiya xatolari.', lang: 'markdown', title: 'API.md' },
        { note: 'Katta loyihalarda hujjat OpenAPI (Swagger) formatida yoziladi va undan interaktiv sahifa avtomatik yasaladi (`swagger-ui-express`).' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Bog‘liq resurs',
      level: 'easy',
      blocks: ['`GET /api/authors/:id/books` endpointini qo‘shing: berilgan muallifning barcha kitoblari. Muallif yo‘q bo‘lsa — 404.']
    },
    {
      title: 'Testlarni kengaytirish',
      level: 'medium',
      blocks: ['PUT, PATCH, 409 (takroriy ISBN), sahifalash (`limit=1&page=2`) va saralash (`sort=-year`) uchun testlar yozing. Kamida 10 ta test o‘tishi kerak.']
    },
    {
      title: 'Variant bo‘yicha REST API',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha resurs uchun to‘liq CRUD, filtr/saralash/sahifalash, `API.md` va kamida 8 ta avtomatik test tayyorlang:',
        { ol: [
          'Talabalar (`/api/students`) — guruh va GPA bo‘yicha filtr.',
          'Mahsulotlar (`/api/products`) — narx oralig‘i, kategoriya.',
          'Tadbirlar (`/api/events`) — sana oralig‘i.',
          'Vazifalar (`/api/tasks`) — holat va muddat bo‘yicha.',
          'Filmlar (`/api/movies`) — janr, yil, reyting bo‘yicha saralash.',
          'Xodimlar (`/api/employees`) — bo‘lim, maosh oralig‘i.',
          'Kurslar (`/api/courses`) — semestr va kredit.',
          'Mehmonxona xonalari (`/api/rooms`) — turi, narx, bandligi.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Endpointlar jadvali: metod, URL, vazifa, javob kodlari.',
    '`routes/*.js`, `validate.js` va testlar kodi.',
    'Postman kolleksiyasi (JSON eksport) va Run natijasi skrinshoti.',
    '`npm test` natijasi skrinshoti.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Endpointlar REST tamoyillariga mos nomlangan, barcha CRUD metodlari ishlaydi', '1'],
    ['To‘g‘ri holat kodlari (201, 204, 400, 404, 409, 422) va validatsiya', '1'],
    ['Filtrlash, saralash va sahifalash', '1'],
    ['Postman kolleksiyasi va avtomatik testlar o‘tadi', '1'],
    ['Mustaqil topshiriq va `API.md` hujjati, himoya', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'REST ning asosiy tamoyillarini sanab bering. «Stateless» nimani anglatadi?',
    'PUT va PATCH farqi nimada? Qaysi biri idempotent?',
    'Nima uchun yangi resurs yaratilganda 201 va `Location` sarlavhasi qaytariladi?',
    '400 va 422 holat kodlari qachon ishlatiladi?',
    'DELETE muvaffaqiyatli bajarilganda nima uchun 204 qaytaramiz?',
    'Sahifalashda `limit` ga yuqori chegara qo‘yish nima uchun kerak?',
    '*Mass assignment* zaifligi nima va undan qanday himoyalanamiz?',
    'Qo‘lda (Postman) va avtomatik testlashning afzalliklari va kamchiliklari?'
  ]
};
