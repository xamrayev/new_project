/* A9. Node.js va Express.js yordamida oddiy server yaratish. */
export default {
  id: 'a9',
  number: 9,
  title: 'Node.js va Express.js yordamida oddiy server yaratish',
  summary: 'Node.js loyihasini boshlaymiz, Express da marshrutlar, middleware, statik fayllar va JSON API yaratamiz.',
  lectures: ['m9', 'm12', 'm13'],
  lessons: ['js-modules', 'js-fetch'],
  goal: 'Node.js muhitida Express freymvorki yordamida statik fayllarni beradigan va JSON formatida ma’lumot qaytaradigan veb-server yaratish, marshrutlash va middleware tamoyillarini amalda o‘zlashtirish.',
  outcomes: [
    'npm loyihasini yaratadi va paketlarni o‘rnatadi;',
    'Node.js ning o‘rnatilgan `http` moduli bilan oddiy server yozadi;',
    'Express da GET/POST marshrutlari, URL va query parametrlarini qayta ishlaydi;',
    'o‘z middleware ini yozadi, statik fayllarni beradi, xatolarni markazlashgan qayta ishlaydi;',
    'serverni curl, Postman va brauzer orqali sinaydi.'
  ],
  tools: [
    'Node.js 20 LTS yoki undan yangi (https://nodejs.org) — tekshirish: `node -v`, `npm -v`.',
    'VS Code va uning terminali (Ctrl+`).',
    'Postman, Thunder Client (VS Code kengaytmasi) yoki `curl`.'
  ],
  theory: [
    { table: { head: ['Tushuncha', 'Izoh'], rows: [
      ['`npm init -y`', '`package.json` — loyiha pasporti: nomi, skriptlar, bog‘liqliklar'],
      ['`npm install express`', 'Paketni `node_modules/` ga o‘rnatish va `package.json` ga yozish'],
      ['`"type": "module"`', '`import`/`export` sintaksisini yoqadi'],
      ['`app.get(path, handler)`', 'Marshrut: metod + yo‘l → funksiya `(req, res)`'],
      ['`req.params`, `req.query`, `req.body`', 'URL parametrlari, `?kalit=qiymat`, so‘rov tanasi'],
      ['`res.json()`, `res.status()`, `res.send()`', 'Javob yuborish'],
      ['`app.use(middleware)`', 'Har bir so‘rov uchun oraliq funksiya `(req, res, next)`']
    ] } },
    { warn: '`node_modules/` papkasini Git ga qo‘shmang — `.gitignore` ga yozing. U `npm install` bilan har doim qayta tiklanadi.' }
  ],
  steps: [
    {
      title: 'Loyihani yaratish',
      blocks: [
        { code: 'mkdir students-api\ncd students-api\nnpm init -y\nnpm install express\nnpm install --save-dev nodemon', lang: 'bash' },
        '`package.json` ni oching va ES modullar hamda ishga tushirish skriptlarini qo‘shing:',
        { code: '{\n  "name": "students-api",\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  },\n  "dependencies": {\n    "express": "^5.1.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.1.0"\n  }\n}', lang: 'json', title: 'package.json' },
        { code: 'node_modules/\n.env', lang: 'text', title: '.gitignore' },
        { tip: '`nodemon` fayl o‘zgarganda serverni avtomatik qayta ishga tushiradi. Node 20+ da buning o‘rniga `node --watch server.js` ham ishlaydi.' }
      ]
    },
    {
      title: 'Freymvorksiz server: http moduli',
      blocks: [
        'Express nimani osonlashtirishini tushunish uchun avval o‘rnatilgan `http` moduli bilan server yozing:',
        { code: "// plain.js\nimport { createServer } from 'node:http';\n\nconst server = createServer((req, res) => {\n  console.log(req.method, req.url);\n\n  if (req.url === '/') {\n    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });\n    res.end('<h1>Salom, Node.js!</h1>');\n  } else if (req.url === '/api/time') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ now: new Date().toISOString() }));\n  } else {\n    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n    res.end('Sahifa topilmadi');\n  }\n});\n\nserver.listen(3000, () => console.log('http://localhost:3000'));", lang: 'js' },
        { code: 'node plain.js\n# boshqa terminalda:\ncurl -i http://localhost:3000/api/time', lang: 'bash' },
        'Marshrutlar ko‘paysa, `if/else` zanjiri tezda chalkashib ketadi; JSON tanani o‘qish, statik fayllar, xatolar — hammasini qo‘lda yozish kerak. Express aynan shu ishlarni oladi.'
      ]
    },
    {
      title: 'Express ilovasi va birinchi marshrutlar',
      blocks: [
        { code: "// server.js\nimport express from 'express';\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('<h1>Talabalar API</h1><p>Marshrutlar: /api/students</p>');\n});\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok', uptime: process.uptime() });\n});\n\napp.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));", lang: 'js' },
        { code: 'npm run dev', lang: 'bash' },
        'Brauzerda `http://localhost:3000` va `http://localhost:3000/api/health` manzillarini oching.'
      ]
    },
    {
      title: 'Ma’lumotlar, URL va query parametrlari',
      blocks: [
        'Hozircha ma’lumotlar xotiradagi massivda (A11 da bazaga o‘tkazamiz). Bitta talabani ID bo‘yicha qaytarish va ro‘yxatni filtrlashni yozing.',
        { code: "const students = [\n  { id: 1, name: 'Aziz Karimov', group: 'DI-22', gpa: 4.6 },\n  { id: 2, name: 'Dilnoza Rahimova', group: 'DI-22', gpa: 4.9 },\n  { id: 3, name: 'Jasur Aliyev', group: 'DI-21', gpa: 3.8 }\n];\n\n// GET /api/students?group=DI-22&minGpa=4.5\napp.get('/api/students', (req, res) => {\n  const { group, minGpa } = req.query;\n  let result = students;\n  if (group) result = result.filter((s) => s.group === group);\n  if (minGpa) result = result.filter((s) => s.gpa >= Number(minGpa));\n  res.json(result);\n});\n\n// GET /api/students/2\napp.get('/api/students/:id', (req, res) => {\n  const student = students.find((s) => s.id === Number(req.params.id));\n  if (!student) return res.status(404).json({ error: 'Talaba topilmadi' });\n  res.json(student);\n});", lang: 'js' },
        { code: 'curl "http://localhost:3000/api/students?group=DI-22"\ncurl http://localhost:3000/api/students/2\ncurl -i http://localhost:3000/api/students/99', lang: 'bash' }
      ]
    },
    {
      title: 'POST: ma’lumot qabul qilish va validatsiya',
      blocks: [
        '`express.json()` middleware i JSON tanani `req.body` ga aylantiradi. Kiruvchi ma’lumotni albatta tekshiring.',
        { code: "app.use(express.json());   // marshrutlardan OLDIN yoziladi\n\napp.post('/api/students', (req, res) => {\n  const { name, group, gpa } = req.body;\n  const errors = [];\n  if (!name || name.trim().length < 3) errors.push('name: kamida 3 belgi');\n  if (!/^[A-Z]{2}-\\d{2}$/.test(group || '')) errors.push('group: format DI-22');\n  if (gpa !== undefined && (gpa < 0 || gpa > 5)) errors.push('gpa: 0–5 oralig‘ida');\n  if (errors.length) return res.status(422).json({ errors });\n\n  const student = { id: Math.max(0, ...students.map((s) => s.id)) + 1, name: name.trim(), group, gpa: gpa ?? null };\n  students.push(student);\n  res.status(201).json(student);\n});", lang: 'js' },
        { code: "curl -X POST http://localhost:3000/api/students \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Malika Tosheva\",\"group\":\"DI-21\",\"gpa\":4.2}'\n\ncurl -X POST http://localhost:3000/api/students \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"X\"}'", lang: 'bash' },
        { tip: 'Windows PowerShell da `curl` o‘rniga `Invoke-RestMethod` ishlaydi yoki Postman/Thunder Client dan foydalaning.' }
      ]
    },
    {
      title: 'Middleware: jurnal, statik fayllar, 404 va xatolar',
      blocks: [
        { code: "import { fileURLToPath } from 'node:url';\nimport path from 'node:path';\n\nconst __dirname = path.dirname(fileURLToPath(import.meta.url));\n\n// 1. So‘rovlar jurnali — eng birinchi\napp.use((req, res, next) => {\n  const started = Date.now();\n  res.on('finish', () => {\n    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - started} ms)`);\n  });\n  next();                       // keyingi middleware ga o‘tkazish\n});\n\n// 2. public/ papkasidagi statik fayllar: index.html, style.css, app.js\napp.use(express.static(path.join(__dirname, 'public')));\n\n// … marshrutlar …\n\n// 3. Hech bir marshrutga mos kelmasa — 404 (marshrutlardan KEYIN)\napp.use((req, res) => res.status(404).json({ error: `${req.originalUrl} topilmadi` }));\n\n// 4. Xatolar ishlovchisi — 4 ta parametr, eng oxirida\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: 'Serverda kutilmagan xatolik' });\n});", lang: 'js' },
        { warn: 'Middleware lar **yozilgan tartibda** bajariladi. `express.json()` marshrutlardan keyin yozilsa, `req.body` bo‘sh bo‘ladi; 404 ishlovchisi marshrutlardan oldin yozilsa, barcha so‘rovlar 404 qaytaradi.' }
      ]
    },
    {
      title: 'Front-end ni serverga ulash',
      blocks: [
        '`public/index.html` yarating va A7 dagi kod bilan talabalar ro‘yxatini endi o‘z serveringizdan yuklang. Sahifa va API bitta manbada bo‘lgani uchun CORS muammosi yo‘q.',
        { code: '<!doctype html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Talabalar</title>\n</head>\n<body>\n  <h1>Talabalar</h1>\n  <ul id="list"></ul>\n  <script>\n    fetch(\'/api/students\')\n      .then((r) => r.json())\n      .then((students) => {\n        const list = document.querySelector(\'#list\');\n        students.forEach((s) => {\n          const li = document.createElement(\'li\');\n          li.textContent = `${s.name} — ${s.group}`;\n          list.append(li);\n        });\n      });\n  </script>\n</body>\n</html>', lang: 'html', title: 'public/index.html' },
        'Loyihaning yakuniy tuzilishi:',
        { code: 'students-api/\n├── package.json\n├── server.js\n├── .gitignore\n└── public/\n    └── index.html', lang: 'text' }
      ]
    },
    {
      title: 'Marshrutlarni alohida modulga ajratish',
      blocks: [
        '`express.Router()` bilan talabalar marshrutlarini `routes/students.js` fayliga ko‘chiring — `server.js` qisqa va tushunarli bo‘lib qoladi.',
        { code: "// routes/students.js\nimport { Router } from 'express';\nconst router = Router();\n\nrouter.get('/', (req, res) => { /* … */ });\nrouter.get('/:id', (req, res) => { /* … */ });\nrouter.post('/', (req, res) => { /* … */ });\n\nexport default router;\n\n// server.js\nimport studentsRouter from './routes/students.js';\napp.use('/api/students', studentsRouter);", lang: 'js' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Kurslar resursi',
      level: 'easy',
      blocks: ['`/api/courses` resursini qo‘shing: ro‘yxat, ID bo‘yicha olish, yangi kurs qo‘shish (nomi majburiy, kredit 1–10).']
    },
    {
      title: 'Sahifalash va saralash',
      level: 'medium',
      blocks: ['`GET /api/students` ga `?page=1&limit=2&sort=-gpa` parametrlarini qo‘llab-quvvatlashni qo‘shing. Javob `{ data, meta: { page, limit, total } }` ko‘rinishida bo‘lsin.']
    },
    {
      title: 'Variant bo‘yicha API',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha resurs uchun API yarating (GET ro‘yxat/bitta, POST, validatsiya, 404, jurnal middleware):',
        { ol: [
          'Kitoblar (`/api/books`).',
          'Mahsulotlar (`/api/products`).',
          'Tadbirlar (`/api/events`) — sana bo‘yicha filtr.',
          'Filmlar (`/api/movies`) — janr bo‘yicha filtr.',
          'Xodimlar (`/api/employees`) — bo‘lim bo‘yicha.',
          'Buyurtmalar (`/api/orders`) — holat bo‘yicha.',
          'Retseptlar (`/api/recipes`) — ingredient bo‘yicha qidiruv.',
          'Avtomobillar (`/api/cars`) — narx oralig‘i bo‘yicha.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Loyiha tuzilishi va `server.js`, `routes/*.js` kodi.',
    'Terminalda server jurnali skrinshoti.',
    'Postman/curl bilan har bir marshrutni sinash skrinshotlari (200, 201, 404, 422 javoblari).',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['npm loyihasi to‘g‘ri sozlangan, server ishga tushadi', '1'],
    ['GET marshrutlari: params va query to‘g‘ri qayta ishlanadi', '1'],
    ['POST: JSON tana, validatsiya, to‘g‘ri holat kodlari', '1'],
    ['Middleware: jurnal, statik fayllar, 404 va xatolar ishlovchisi', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    '`package.json` fayli nima uchun kerak? `dependencies` va `devDependencies` farqi?',
    'Nima uchun `node_modules` Git ga qo‘shilmaydi?',
    '`req.params`, `req.query` va `req.body` farqini misolda tushuntiring.',
    'Middleware nima? `next()` chaqirilmasa nima bo‘ladi?',
    '`express.json()` qanday vazifani bajaradi?',
    'Xatolar ishlovchisi oddiy middleware dan qanday farq qiladi?',
    '`express.static` qanday ishlaydi?',
    'Yangi resurs yaratilganda qanday holat kodi qaytariladi? Validatsiya xatosida-chi?'
  ]
};
