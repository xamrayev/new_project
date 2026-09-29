/* M13. RESTful API'larni loyihalash va amalga oshirish. */
import { DEMO_API } from '../mock-api.js';

export default {
  id: 'm13',
  number: 13,
  title: 'RESTful API’larni loyihalash va amalga oshirish',
  summary: 'REST tamoyillari, resurslar va URL lar, metodlar va holat kodlari, versiyalash, hujjatlashtirish.',
  literature: [4],
  goals: [
    'API va REST arxitektura uslubi tamoyillarini tushunish.',
    'Resurslar, URL lar, HTTP metodlari va holat kodlarini to‘g‘ri loyihalashni o‘rganish.',
    'Filtrlash, sahifalash, xatolar formati, versiyalash kabi amaliy masalalarni bilish.',
    'API ni hujjatlashtirish (OpenAPI) va sinash (Postman, curl) vositalari bilan tanishish.'
  ],
  keywords: ['API', 'REST', 'resurs', 'endpoint', 'CRUD', 'idempotentlik', 'holat kodi', 'JSON', 'pagination', 'versiyalash', 'OpenAPI', 'Swagger', 'Postman', 'GraphQL', 'rate limiting'],
  practicals: ['a9', 'a12'],
  lessons: ['js-fetch', 'js-async'],
  sections: [
    {
      title: 'API va REST',
      blocks: [
        { lead: 'API (Application Programming Interface) — bir dastur boshqasiga xizmat ko‘rsatish uchun ochadigan kelishilgan interfeys. Veb-API da bu kelishuv — URL lar, HTTP metodlari va JSON formatidagi ma’lumotlar.' },
        'Bitta back-end API ni bir vaqtda veb-ilova (Vue/React), mobil ilova, boshqa servislar va hamkorlar ishlatishi mumkin. Shuning uchun API — tizimning «shartnomasi»: uni o‘zgartirish barcha mijozlarga ta’sir qiladi.',
        '**REST** (Representational State Transfer) — Roy Filding 2000-yilda dissertatsiyasida ta’riflagan arxitektura uslubi. Uning cheklovlari:',
        { table: { head: ['Tamoyil', 'Ma’nosi'], rows: [
          ['Klient–server', 'Interfeys va ma’lumot saqlash ajratilgan'],
          ['Holatsizlik (stateless)', 'Har bir so‘rov o‘zini tushunish uchun barcha ma’lumotni (masalan, token) o‘zi olib keladi'],
          ['Keshlanuvchanlik', 'Javob keshlash mumkinligini o‘zi bildiradi (`Cache-Control`, `ETag`)'],
          ['Yagona interfeys', 'Resurslar URL bilan aniqlanadi, amallar standart HTTP metodlari bilan'],
          ['Qatlamli tizim', 'Klient oradagi proksi, balanslovchi, keshni bilishi shart emas'],
          ['Kod talab bo‘yicha (ixtiyoriy)', 'Server klientga bajariladigan kod yuborishi mumkin']
        ] } }
      ]
    },
    {
      title: 'Resurslar va URL larni loyihalash',
      blocks: [
        'REST da hamma narsa — **resurs** (talaba, guruh, buyurtma). URL resursni, HTTP metodi esa amalni bildiradi.',
        { table: { head: ['Metod', 'URL', 'Amal', 'Muvaffaqiyatli javob'], rows: [
          ['GET', '`/api/v1/students`', 'Talabalar ro‘yxati', '200 + massiv'],
          ['GET', '`/api/v1/students/5`', 'Bitta talaba', '200 + obyekt / 404'],
          ['POST', '`/api/v1/students`', 'Yangi talaba yaratish', '201 + yaratilgan obyekt + `Location`'],
          ['PUT', '`/api/v1/students/5`', 'To‘liq almashtirish', '200 yoki 204'],
          ['PATCH', '`/api/v1/students/5`', 'Qisman o‘zgartirish', '200'],
          ['DELETE', '`/api/v1/students/5`', 'O‘chirish', '204'],
          ['GET', '`/api/v1/groups/2/students`', 'Guruhdagi talabalar (ichma-ich resurs)', '200']
        ] } },
        { h: 'Nomlash qoidalari' },
        { ul: [
          'Ot so‘zlar, **ko‘plikda**: `/students`, `/courses` (`/getStudents` emas).',
          'Kichik harflar va defis: `/course-groups`.',
          'Fe’llarni URL ga yozmang — amalni metod bildiradi: `DELETE /students/5` (`/students/5/delete` emas).',
          'Resurs bo‘lmagan harakatlar uchun istisno: `POST /orders/7/cancel`, `POST /auth/login`.',
          'Ichma-ichlikni 2 darajadan chuqurlashtirmang.'
        ] },
        { h: 'Filtrlash, saralash, sahifalash' },
        { code: 'GET /api/v1/students?group=DI-22&min_gpa=4.5\nGET /api/v1/students?sort=-gpa,full_name\nGET /api/v1/students?page=2&per_page=20\nGET /api/v1/students?fields=id,full_name\nGET /api/v1/students?search=aziz', lang: 'http' },
        { code: '{\n  "data": [\n    { "id": 21, "fullName": "Aziz Karimov", "group": "DI-22", "gpa": 4.6 }\n  ],\n  "meta": { "page": 2, "perPage": 20, "total": 134, "totalPages": 7 },\n  "links": {\n    "next": "/api/v1/students?page=3&per_page=20",\n    "prev": "/api/v1/students?page=1&per_page=20"\n  }\n}', lang: 'json', title: 'Sahifalangan javob' }
      ]
    },
    {
      title: 'So‘rov va javob formatlari, xatolar',
      blocks: [
        'JSON da maydon nomlari uchun bitta uslubni tanlang (`camelCase` yoki `snake_case`) va butun API da unga amal qiling. Sanalar — ISO 8601 formatida: `"2026-09-29T10:30:00Z"`.',
        { h: 'Holat kodlarini to‘g‘ri tanlash' },
        { table: { head: ['Vaziyat', 'Kod'], rows: [
          ['Muvaffaqiyatli o‘qish/yangilash', '`200 OK`'],
          ['Yaratildi', '`201 Created`'],
          ['Javob tanasiz muvaffaqiyat (DELETE)', '`204 No Content`'],
          ['So‘rov formati noto‘g‘ri', '`400 Bad Request`'],
          ['Autentifikatsiya yo‘q yoki token eskirgan', '`401 Unauthorized`'],
          ['Huquq yetarli emas', '`403 Forbidden`'],
          ['Resurs topilmadi', '`404 Not Found`'],
          ['Holat ziddiyati (masalan, email band)', '`409 Conflict`'],
          ['Validatsiya xatosi', '`422 Unprocessable Content`'],
          ['So‘rovlar chegarasi oshdi', '`429 Too Many Requests`'],
          ['Kutilmagan server xatosi', '`500 Internal Server Error`']
        ] } },
        { h: 'Yagona xato formati' },
        { code: '{\n  "error": {\n    "code": "VALIDATION_FAILED",\n    "message": "Ma’lumotlar noto‘g‘ri kiritilgan",\n    "details": [\n      { "field": "email", "message": "E-mail formati noto‘g‘ri" },\n      { "field": "groupId", "message": "Bunday guruh mavjud emas" }\n    ]\n  }\n}', lang: 'json' },
        { warn: 'Xato javobida stack trace, SQL so‘rovi yoki server yo‘llarini hech qachon qaytarmang — bu tajovuzkor uchun qimmatli ma’lumot. Batafsil xato faqat server jurnaliga yoziladi.' }
      ]
    },
    {
      title: 'Express da REST API',
      blocks: [
        { code: "import express from 'express';\nconst router = express.Router();\n\nlet students = [];     // real loyihada — repository / ORM\nlet nextId = 1;\n\nfunction validate(body) {\n  const errors = [];\n  if (!body.fullName || body.fullName.length < 3) errors.push({ field: 'fullName', message: 'Kamida 3 belgi' });\n  if (!/^\\S+@\\S+\\.\\S+$/.test(body.email || '')) errors.push({ field: 'email', message: 'E-mail noto‘g‘ri' });\n  return errors;\n}\n\nrouter.get('/', (req, res) => {\n  const page = Math.max(1, Number(req.query.page) || 1);\n  const perPage = Math.min(100, Number(req.query.per_page) || 20);\n  const data = students.slice((page - 1) * perPage, page * perPage);\n  res.json({ data, meta: { page, perPage, total: students.length } });\n});\n\nrouter.get('/:id', (req, res) => {\n  const student = students.find((s) => s.id === Number(req.params.id));\n  if (!student) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Talaba topilmadi' } });\n  res.json(student);\n});\n\nrouter.post('/', (req, res) => {\n  const errors = validate(req.body);\n  if (errors.length) return res.status(422).json({ error: { code: 'VALIDATION_FAILED', details: errors } });\n  const student = { id: nextId++, fullName: req.body.fullName, email: req.body.email };\n  students.push(student);\n  res.status(201).location(`/api/v1/students/${student.id}`).json(student);\n});\n\nrouter.patch('/:id', (req, res) => {\n  const student = students.find((s) => s.id === Number(req.params.id));\n  if (!student) return res.status(404).json({ error: { code: 'NOT_FOUND' } });\n  Object.assign(student, req.body.fullName ? { fullName: req.body.fullName } : {});\n  res.json(student);\n});\n\nrouter.delete('/:id', (req, res) => {\n  students = students.filter((s) => s.id !== Number(req.params.id));\n  res.status(204).end();\n});\n\nexport default router;\n// app.js:  app.use('/api/v1/students', router);", lang: 'js', title: 'routes/students.js' },
        { h: 'Klient tomonida API dan foydalanish' },
        { code: "async function api(path) {\n  const response = await fetch(path);\n  const body = await response.json();\n  if (!response.ok) throw new Error(body.error || response.status);\n  return body;\n}\n\n(async () => {\n  const courses = await api('/api/courses');\n  console.table(courses);\n\n  const student = await api('/api/students/2');\n  console.log('Talaba:', student.name, student.group);\n\n  try {\n    await api('/api/missing');\n  } catch (error) {\n    console.error('Kutilgan xato:', error.message);\n  }\n})();", lang: 'js', run: true, sandbox: DEMO_API }
      ]
    },
    {
      title: 'Versiyalash, xavfsizlik va samaradorlik',
      blocks: [
        { h: 'Versiyalash' },
        'API ni ishlatayotgan mijozlarni buzmaslik uchun mos kelmaydigan o‘zgarishlar yangi versiyada chiqariladi: `/api/v1/…` → `/api/v2/…` (yoki `Accept: application/vnd.app.v2+json` sarlavhasi orqali). Eski versiya e’lon qilingan muddatgacha ishlab turadi.',
        { h: 'Xavfsizlik' },
        { ul: [
          'Faqat **HTTPS**.',
          'Autentifikatsiya: `Authorization: Bearer <token>` (JWT, OAuth 2.0 — M15).',
          'Har bir endpointda huquqni tekshirish: foydalanuvchi faqat o‘z ma’lumotini o‘zgartira olishi kerak.',
          'Kiruvchi ma’lumotni validatsiya qilish; faqat ruxsat etilgan maydonlarni qabul qilish (mass assignment dan himoya).',
          '**Rate limiting**: bir IP/tokendan daqiqasiga N ta so‘rov, oshsa `429`.',
          'CORS da faqat ishonchli manbalarga ruxsat.'
        ] },
        { h: 'Samaradorlik' },
        { ul: [
          'Keshlash sarlavhalari: `Cache-Control`, `ETag` + `If-None-Match` → `304 Not Modified`.',
          'Javobni siqish (gzip, brotli).',
          'Sahifalash va kerakli maydonlarni tanlash (`fields=`).',
          'Og‘ir amallar uchun asinxron navbat: `202 Accepted` + holatni tekshirish endpointi.'
        ] }
      ]
    },
    {
      title: 'Hujjatlashtirish, sinash va muqobillar',
      blocks: [
        '**OpenAPI** (avvalgi nomi Swagger) — API ni mashina o‘qiy oladigan formatda (YAML/JSON) tavsiflash standarti. Undan interaktiv hujjat (Swagger UI), klient kodi va testlar avtomatik yaratiladi.',
        { code: 'openapi: 3.0.3\ninfo:\n  title: University API\n  version: 1.0.0\npaths:\n  /students/{id}:\n    get:\n      summary: Bitta talabani olish\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema: { type: integer }\n      responses:\n        \'200\':\n          description: Talaba\n          content:\n            application/json:\n              schema: { $ref: \'#/components/schemas/Student\' }\n        \'404\':\n          description: Topilmadi', lang: 'text', title: 'openapi.yaml' },
        { h: 'Sinash vositalari' },
        { code: "curl http://localhost:3000/api/v1/students\n\ncurl -X POST http://localhost:3000/api/v1/students \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"fullName\":\"Aziz Karimov\",\"email\":\"aziz@mail.uz\"}'\n\ncurl -X DELETE http://localhost:3000/api/v1/students/1 -i", lang: 'bash' },
        'Grafik vositalar: **Postman**, **Insomnia**, VS Code uchun **Thunder Client** / **REST Client**.',
        { h: 'REST ga muqobillar' },
        { table: { head: ['Yondashuv', 'Xususiyati', 'Qachon'], rows: [
          ['GraphQL', 'Bitta endpoint; klient qaysi maydonlar kerakligini o‘zi so‘raydi', 'Murakkab, ko‘p bog‘langan ma’lumotlar, turli klientlar'],
          ['gRPC', 'Ikkilik format (Protocol Buffers), HTTP/2', 'Mikroservislar o‘rtasida tez aloqa'],
          ['WebSocket', 'Ikki tomonlama doimiy ulanish', 'Chat, real vaqt xabarnomalari, o‘yinlar']
        ] } }
      ]
    }
  ],
  conclusion: [
    'REST — resurslar URL bilan, amallar HTTP metodlari bilan ifodalanadigan holatsiz arxitektura uslubi. Yaxshi API izchil nomlash, to‘g‘ri holat kodlari, yagona xato formati, sahifalash va versiyalashga ega bo‘ladi.',
    'API xavfsizligi HTTPS, autentifikatsiya, huquqlarni tekshirish, validatsiya va so‘rovlar chegarasiga tayanadi. OpenAPI hujjati va Postman/curl bilan sinash API ni ishonchli shartnomaga aylantiradi.'
  ],
  glossary: [
    ['API', 'Dasturlar o‘zaro ta’sirlashadigan kelishilgan interfeys.'],
    ['REST', 'Resurslar va standart HTTP metodlariga asoslangan arxitektura uslubi.'],
    ['Endpoint', 'API dagi aniq URL va metod juftligi.'],
    ['Idempotentlik', 'Takroriy so‘rov bir martalik so‘rov bilan bir xil natija berishi.'],
    ['OpenAPI', 'REST API ni tavsiflash standarti.'],
    ['Rate limiting', 'Ma’lum vaqtdagi so‘rovlar sonini cheklash.'],
    ['GraphQL', 'Klient kerakli ma’lumotlar tuzilishini o‘zi so‘raydigan API so‘rovlar tili.']
  ],
  questions: [
    'REST ning asosiy tamoyillarini sanab bering.',
    'Nima uchun URL da fe’l emas, ot ishlatiladi?',
    'PUT va PATCH ning farqi nimada?',
    'Yangi resurs yaratilganda qanday holat kodi va sarlavha qaytariladi?',
    '401 va 403, 400 va 422 kodlarining farqini tushuntiring.',
    'Sahifalangan javob qanday tuziladi?',
    'API ni versiyalash nima uchun kerak?',
    'API xavfsizligini ta’minlashning qanday usullarini bilasiz?',
    'OpenAPI hujjati nima beradi?',
    'REST, GraphQL va WebSocket ni qiyoslang.'
  ]
};
