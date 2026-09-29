/* A11. Node.js orqali ma'lumotlar bazasi bilan ishlash. */
export default {
  id: 'a11',
  number: 11,
  title: 'Node.js orqali ma’lumotlar bazasi bilan ishlash',
  summary: 'A9 dagi Express serverini A10 dagi MySQL bazasiga ulaymiz: ulanishlar puli, parametrlangan so‘rovlar, repository qatlami.',
  lectures: ['m11', 'm10'],
  lessons: [],
  goal: 'Node.js ilovasini ma’lumotlar bazasiga ulash, parametrlangan so‘rovlar orqali ma’lumotlarni xavfsiz o‘qish va yozish, kodni qatlamlarga ajratish ko‘nikmasini shakllantirish.',
  outcomes: [
    '`mysql2` drayveri bilan ulanishlar pulini sozlaydi;',
    'ulanish ma’lumotlarini `.env` faylida saqlaydi;',
    'faqat parametrlangan so‘rovlar yozadi va SQL injection ni tushuntiradi;',
    'repository → marshrut qatlamlarini ajratadi;',
    'baza xatolarini (dublikat, tashqi kalit) to‘g‘ri HTTP javobiga aylantiradi.'
  ],
  tools: [
    'A9 da yaratilgan `students-api` loyihasi (Node.js 20+, Express).',
    'A10 da yaratilgan `university` bazasi (MySQL 8).',
    'Postman / Thunder Client / curl.'
  ],
  theory: [
    { code: 'HTTP so‘rov → routes/students.js (marshrut, validatsiya, HTTP javob)\n                    │\n                    ▼\n        repositories/students.js (faqat SQL)\n                    │\n                    ▼\n              db.js (ulanishlar puli) ──► MySQL', lang: 'text', title: 'Ilova qatlamlari' },
    { warn: 'Hech qachon foydalanuvchi ma’lumotini SQL satriga `+` yoki `${}` bilan qo‘shmang. Faqat `?` o‘rinbosarlari va qiymatlar massivi — parametrlangan so‘rov (M11, M14).' }
  ],
  steps: [
    {
      title: 'Drayverni o‘rnatish va sozlamalar',
      blocks: [
        { code: 'cd students-api\nnpm install mysql2', lang: 'bash' },
        'Loyiha ildizida `.env` faylini yarating (u `.gitignore` da bor):',
        { code: 'PORT=3000\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_USER=university_app\nDB_PASSWORD=Kuchli_Parol_123\nDB_NAME=university', lang: 'env', title: '.env' },
        'Ilova uchun alohida, faqat kerakli huquqlarga ega foydalanuvchi yarating (root ishlatmang):',
        { code: "CREATE USER 'university_app'@'localhost' IDENTIFIED BY 'Kuchli_Parol_123';\nGRANT SELECT, INSERT, UPDATE, DELETE ON university.* TO 'university_app'@'localhost';\nFLUSH PRIVILEGES;", lang: 'sql' },
        'Node 20.6+ `.env` faylini o‘zi o‘qiy oladi — `package.json` skriptlarini yangilang:',
        { code: '"scripts": {\n  "start": "node --env-file=.env server.js",\n  "dev": "node --watch --env-file=.env server.js"\n}', lang: 'json' }
      ]
    },
    {
      title: 'Ulanishlar puli (db.js)',
      blocks: [
        { code: "// db.js\nimport mysql from 'mysql2/promise';\n\nexport const pool = mysql.createPool({\n  host: process.env.DB_HOST,\n  port: Number(process.env.DB_PORT || 3306),\n  user: process.env.DB_USER,\n  password: process.env.DB_PASSWORD,\n  database: process.env.DB_NAME,\n  connectionLimit: 10,\n  dateStrings: true,         // DATE ustunlarini '2004-03-15' satr sifatida olish\n  charset: 'utf8mb4'\n});\n\n// Ishga tushishda ulanishni tekshirish\nexport async function checkConnection() {\n  const [rows] = await pool.query('SELECT VERSION() AS version, DATABASE() AS db');\n  console.log(`MySQL ${rows[0].version}, baza: ${rows[0].db}`);\n}", lang: 'js' },
        { code: "// server.js boshida\nimport { checkConnection } from './db.js';\n\ncheckConnection().catch((error) => {\n  console.error('Bazaga ulanib bo‘lmadi:', error.message);\n  process.exit(1);\n});", lang: 'js' },
        { tip: 'Tipik xatolar: `ECONNREFUSED` — MySQL ishga tushmagan; `ER_ACCESS_DENIED_ERROR` — login/parol noto‘g‘ri; `ER_BAD_DB_ERROR` — baza nomi xato.' }
      ]
    },
    {
      title: 'Repository: SQL bir joyda',
      blocks: [
        'Barcha SQL so‘rovlarini `repositories/students.js` fayliga yig‘ing. Har bir funksiya oddiy JavaScript qiymat qaytaradi — marshrutlar SQL haqida hech narsa bilmaydi.',
        { code: "// repositories/students.js\nimport { pool } from '../db.js';\n\nconst SELECT = `\n  SELECT s.id, s.full_name AS fullName, s.email, s.birth_date AS birthDate,\n         s.gpa, s.group_id AS groupId, g.name AS groupName\n  FROM students s\n  LEFT JOIN \\`groups\\` g ON g.id = s.group_id`;\n\nexport async function findAll({ groupId, search, limit = 20, offset = 0 } = {}) {\n  const where = [];\n  const params = [];\n  if (groupId) { where.push('s.group_id = ?'); params.push(groupId); }\n  if (search) { where.push('s.full_name LIKE ?'); params.push(`%${search}%`); }\n\n  const sql = `${SELECT} ${where.length ? 'WHERE ' + where.join(' AND ') : ''}\n               ORDER BY s.full_name LIMIT ? OFFSET ?`;\n  const [rows] = await pool.query(sql, [...params, limit, offset]);\n\n  const [[{ total }]] = await pool.query(\n    `SELECT COUNT(*) AS total FROM students s ${where.length ? 'WHERE ' + where.join(' AND ') : ''}`,\n    params\n  );\n  return { rows, total };\n}\n\nexport async function findById(id) {\n  const [rows] = await pool.execute(`${SELECT} WHERE s.id = ?`, [id]);\n  return rows[0] || null;\n}\n\nexport async function create({ fullName, email, birthDate, gpa, groupId }) {\n  const [result] = await pool.execute(\n    'INSERT INTO students (full_name, email, birth_date, gpa, group_id) VALUES (?, ?, ?, ?, ?)',\n    [fullName, email ?? null, birthDate ?? null, gpa ?? null, groupId ?? null]\n  );\n  return findById(result.insertId);\n}\n\nexport async function update(id, fields) {\n  const columns = { fullName: 'full_name', email: 'email', birthDate: 'birth_date', gpa: 'gpa', groupId: 'group_id' };\n  const keys = Object.keys(fields).filter((key) => key in columns);   // faqat ruxsat etilgan maydonlar\n  if (!keys.length) return findById(id);\n  const sets = keys.map((key) => `${columns[key]} = ?`).join(', ');\n  await pool.execute(`UPDATE students SET ${sets} WHERE id = ?`, [...keys.map((k) => fields[k]), id]);\n  return findById(id);\n}\n\nexport async function remove(id) {\n  const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);\n  return result.affectedRows > 0;\n}", lang: 'js' },
        { note: '`update` da ustun nomlari foydalanuvchidan emas, oldindan belgilangan `columns` ro‘yxatidan olinadi. Ustun va jadval nomlarini parametrlab bo‘lmaydi, shuning uchun ular faqat «oq ro‘yxat» orqali qo‘yiladi.' }
      ]
    },
    {
      title: 'Marshrutlarni bazaga ulash',
      blocks: [
        'A9 dagi massiv o‘rniga repository funksiyalarini chaqiring. Asinxron xatolar Express 5 da avtomatik xatolar ishlovchisiga tushadi.',
        { code: "// routes/students.js\nimport { Router } from 'express';\nimport * as students from '../repositories/students.js';\n\nconst router = Router();\n\nrouter.get('/', async (req, res) => {\n  const limit = Math.min(Number(req.query.limit) || 20, 100);\n  const page = Math.max(Number(req.query.page) || 1, 1);\n  const { rows, total } = await students.findAll({\n    groupId: req.query.groupId ? Number(req.query.groupId) : undefined,\n    search: req.query.search,\n    limit,\n    offset: (page - 1) * limit\n  });\n  res.json({ data: rows, meta: { page, limit, total } });\n});\n\nrouter.get('/:id', async (req, res) => {\n  const student = await students.findById(Number(req.params.id));\n  if (!student) return res.status(404).json({ error: 'Talaba topilmadi' });\n  res.json(student);\n});\n\nrouter.post('/', async (req, res) => {\n  const errors = validate(req.body);\n  if (errors.length) return res.status(422).json({ errors });\n  const student = await students.create(req.body);\n  res.status(201).json(student);\n});\n\nrouter.patch('/:id', async (req, res) => {\n  const errors = validate(req.body, { partial: true });\n  if (errors.length) return res.status(422).json({ errors });\n  const student = await students.update(Number(req.params.id), req.body);\n  if (!student) return res.status(404).json({ error: 'Talaba topilmadi' });\n  res.json(student);\n});\n\nrouter.delete('/:id', async (req, res) => {\n  const removed = await students.remove(Number(req.params.id));\n  if (!removed) return res.status(404).json({ error: 'Talaba topilmadi' });\n  res.status(204).end();\n});\n\nfunction validate(body, { partial = false } = {}) {\n  const errors = [];\n  if (!partial || 'fullName' in body) {\n    if (typeof body.fullName !== 'string' || body.fullName.trim().length < 3) errors.push('fullName: kamida 3 belgi');\n  }\n  if (body.email != null && !/^\\S+@\\S+\\.\\S+$/.test(body.email)) errors.push('email: format noto‘g‘ri');\n  if (body.gpa != null && !(body.gpa >= 0 && body.gpa <= 5)) errors.push('gpa: 0–5');\n  return errors;\n}\n\nexport default router;", lang: 'js' }
      ]
    },
    {
      title: 'Baza xatolarini HTTP javobiga aylantirish',
      blocks: [
        'MySQL xatolari o‘z kodiga ega. Ularni xatolar ishlovchisida tushunarli javobga aylantiring — foydalanuvchiga SQL matnini ko‘rsatmang.',
        { code: "// server.js — xatolar ishlovchisi (eng oxirida)\napp.use((err, req, res, next) => {\n  if (err.code === 'ER_DUP_ENTRY') {\n    return res.status(409).json({ error: 'Bu e-mail bilan talaba allaqachon mavjud' });\n  }\n  if (err.code === 'ER_NO_REFERENCED_ROW_2') {\n    return res.status(422).json({ error: 'Ko‘rsatilgan guruh mavjud emas' });\n  }\n  if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {\n    return res.status(422).json({ error: 'Qiymat ruxsat etilgan oraliqdan tashqarida' });\n  }\n  console.error(err);                  // to‘liq xato faqat server jurnalida\n  res.status(500).json({ error: 'Serverda xatolik' });\n});", lang: 'js' }
      ]
    },
    {
      title: 'Sinash va SQL injection tajribasi',
      blocks: [
        { code: "curl 'http://localhost:3000/api/students?search=aziz'\ncurl 'http://localhost:3000/api/students?groupId=2&page=1&limit=2'\n\ncurl -X POST http://localhost:3000/api/students -H 'Content-Type: application/json' \\\n  -d '{\"fullName\":\"Laylo Ergasheva\",\"email\":\"laylo@mail.uz\",\"gpa\":4.8,\"groupId\":2}'\n\ncurl -X PATCH http://localhost:3000/api/students/1 -H 'Content-Type: application/json' -d '{\"gpa\":4.7}'\ncurl -X DELETE -i http://localhost:3000/api/students/5\n\n# Takroriy e-mail → 409, mavjud bo‘lmagan guruh → 422\ncurl -X POST http://localhost:3000/api/students -H 'Content-Type: application/json' \\\n  -d '{\"fullName\":\"Test Test\",\"email\":\"aziz@mail.uz\"}'", lang: 'bash' },
        'Endi xavfsizlik tajribasi. Qidiruvga `%\' OR \'1\'=\'1` ni yuboring:',
        { code: "curl \"http://localhost:3000/api/students?search=%25'%20OR%20'1'%3D'1\"", lang: 'bash' },
        'Parametrlangan so‘rov tufayli bu satr oddiy matn sifatida qidiriladi va hech narsa topilmaydi. Taqqoslash uchun vaqtincha xavfli variantni yozib ko‘ring (keyin albatta o‘chiring!):',
        { code: "// ❌ FAQAT TAJRIBA UCHUN — hech qachon bunday yozmang\nconst [rows] = await pool.query(`SELECT * FROM students WHERE full_name LIKE '%${search}%'`);", lang: 'js' },
        { warn: 'Xavfli variantda xuddi shu so‘rov barcha talabalarni qaytaradi — tajovuzkor so‘rov mantig‘ini o‘zgartirdi. Tajribadan keyin kodni parametrlangan holiga qaytaring.' }
      ]
    },
    {
      title: 'Qo‘shimcha: ORM bilan tanishish (Prisma)',
      blocks: [
        'Xuddi shu ishni ORM bilan qilish qanday ko‘rinishini ko‘ring:',
        { code: 'npm install prisma @prisma/client\nnpx prisma init --datasource-provider mysql\n# .env: DATABASE_URL="mysql://university_app:Kuchli_Parol_123@localhost:3306/university"\nnpx prisma db pull        # mavjud bazadan sxema olish\nnpx prisma generate', lang: 'bash' },
        { code: "import { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nconst students = await prisma.students.findMany({\n  where: { gpa: { gte: 4.5 } },\n  include: { groups: true },\n  orderBy: { gpa: 'desc' },\n  take: 10\n});", lang: 'js' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Guruhlar va fanlar marshrutlari',
      level: 'easy',
      blocks: ['`/api/groups` (ro‘yxat + har bir guruhdagi talabalar soni) va `/api/groups/:id/students` marshrutlarini qo‘shing.']
    },
    {
      title: 'Baholar va tranzaksiya',
      level: 'medium',
      blocks: ['`POST /api/students/:id/enrollments` — talabani bir nechta fanga bitta tranzaksiyada yozing (`pool.getConnection()`, `beginTransaction`, `commit`, `rollback`). Bitta fan mavjud bo‘lmasa, hech biri yozilmasin.']
    },
    {
      title: 'Variant bo‘yicha API + baza',
      level: 'hard',
      blocks: ['A10 dagi variant bazangiz uchun Node.js + Express API yarating: har bir asosiy jadval uchun repository, sahifalash, qidiruv, validatsiya va baza xatolarini qayta ishlash. `public/` papkasida API dan foydalanadigan oddiy sahifa bo‘lsin.']
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Loyiha tuzilishi, `db.js`, `repositories/*.js`, `routes/*.js` kodi.',
    'Postman/curl bilan har bir amal natijalari (200, 201, 204, 404, 409, 422).',
    'SQL injection tajribasi natijasi va xulosa.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Ulanishlar puli, `.env`, alohida baza foydalanuvchisi', '1'],
    ['Barcha so‘rovlar parametrlangan, repository qatlami ajratilgan', '1'],
    ['CRUD marshrutlari, sahifalash va qidiruv ishlaydi', '1'],
    ['Baza xatolari to‘g‘ri HTTP kodlariga aylantirilgan', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Ulanishlar puli nima uchun kerak?',
    'Nima uchun ilova root foydalanuvchi bilan ishlamasligi kerak?',
    '`pool.query` va `pool.execute` farqi nimada?',
    'Parametrlangan so‘rov SQL injection dan qanday himoya qiladi?',
    'Nima uchun ustun nomlarini parametr sifatida berib bo‘lmaydi va bu qanday hal qilinadi?',
    'Repository qatlamining afzalligi nimada?',
    '`ER_DUP_ENTRY` xatosi qaysi holatda yuzaga keladi va qanday javob qaytarish kerak?',
    'ORM va sof SQL ning afzallik va kamchiliklari.'
  ]
};
