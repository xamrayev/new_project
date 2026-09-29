/* A14. JWT (JSON Web Tokens) orqali autentifikatsiyani amalga oshirish. */

const decodeJwt = `// JWT — nuqta bilan ajratilgan uch qism: header.payload.signature
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOjcsIm5hbWUiOiJEaWxub3phIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTk5MDAwMDAsImV4cCI6MTc1OTkwMzYwMH0' +
  '.atKXZnbwT2_FX7inA_hBhwyBM94PQ4wK1zz_C0PCpPE';

// base64url → oddiy matn (UTF-8)
function decodePart(part) {
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

const [header, payload] = token.split('.');
console.log('Header:', decodePart(header));
console.log('Payload:', decodePart(payload));

const p = decodePart(payload);
console.log('Berilgan vaqt:', new Date(p.iat * 1000).toISOString());
console.log('Amal qilish muddati:', new Date(p.exp * 1000).toISOString());
console.log('Muddati o‘tganmi:', Date.now() / 1000 > p.exp);

// Diqqat: payload shifrlanmagan! Uni istalgan kishi o‘qiy oladi.
// Imzo faqat ma’lumot O‘ZGARTIRILMAGANINI kafolatlaydi.`;

const signJwt = `// HS256 imzosini Web Crypto API bilan qo‘lda hisoblaymiz
const enc = new TextEncoder();

function base64url(input) {
  const bytes = typeof input === 'string' ? enc.encode(input) : new Uint8Array(input);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
}

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

async function sign(payload, secret) {
  const head = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify(payload));
  return head + '.' + body + '.' + (await hmac(secret, head + '.' + body));
}

async function verify(token, secret) {
  const [head, body, signature] = token.split('.');
  return (await hmac(secret, head + '.' + body)) === signature;
}

async function main() {
  const SECRET = 'juda-maxfiy-kalit-kamida-32-belgi!!';
  const now = Math.floor(Date.now() / 1000);
  const token = await sign({ sub: 7, role: 'student', iat: now, exp: now + 900 }, SECRET);
  console.log('Token:', token);
  console.log('Imzo to‘g‘rimi:', await verify(token, SECRET));

  // Hujumchi payload dagi rolni «admin» ga almashtirdi
  const [h, , s] = token.split('.');
  const forged = h + '.' + base64url(JSON.stringify({ sub: 7, role: 'admin', iat: now, exp: now + 900 })) + '.' + s;
  console.log('Soxta token imzosi to‘g‘rimi:', await verify(forged, SECRET));
  console.log('Boshqa kalit bilan tekshiruv:', await verify(token, 'boshqa-kalit'));
}

main();`;

export default {
  id: 'a14',
  number: 14,
  title: 'JWT (JSON Web Tokens) orqali autentifikatsiyani amalga oshirish',
  summary: 'Ro‘yxatdan o‘tish, parolni bcrypt bilan xeshlash, JWT berish, himoyalangan marshrutlar, rollar va tokenni yangilash.',
  lectures: ['m15', 'm13'],
  lessons: ['js-fetch', 'js-localstorage'],
  goal: 'Express.js API uchun JWT asosidagi autentifikatsiya va rolga asoslangan avtorizatsiyani amalga oshirish: parollarni xavfsiz saqlash, token berish va tekshirish, himoyalangan resurslarga kirishni cheklash.',
  outcomes: [
    'JWT tuzilishini (header, payload, signature) va imzo qanday ishlashini tushuntiradi;',
    'parollarni `bcrypt` bilan xeshlaydi va tekshiradi;',
    '`jsonwebtoken` bilan access token beradi va middleware da tekshiradi;',
    'rollar bo‘yicha ruxsatlarni cheklaydi (401 va 403 farqi);',
    'qisqa muddatli access va uzoq muddatli refresh token juftligini qo‘llaydi;',
    'front-end da tokenni `Authorization: Bearer` sarlavhasida yuboradi.'
  ],
  tools: [
    'Node.js 20+, Express (A9/A13 loyihasi).',
    'Paketlar: `jsonwebtoken`, `bcryptjs`, `dotenv`.',
    'Postman yoki Thunder Client; tokenni ko‘rish uchun https://jwt.io.'
  ],
  theory: [
    { lead: '**Autentifikatsiya** — «sen kimsan?» savoliga javob (login va parol). **Avtorizatsiya** — «senga nima mumkin?» (rollar, ruxsatlar). JWT ikkalasini holatsiz (stateless) amalga oshirish uchun ishlatiladi: server sessiyani saqlamaydi, barcha kerakli ma’lumot imzolangan tokenda bo‘ladi.' },
    { code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInJvbGUiOiJzdHVkZW50In0.4Hb…\n└──────── header ────────┘ └──────── payload ────────┘ └ imzo ┘', lang: 'text' },
    { table: { head: ['Maydon (claim)', 'Ma’nosi'], rows: [
      ['`sub`', 'Subject — foydalanuvchi identifikatori'],
      ['`iat`', 'Issued at — berilgan vaqt (Unix soniya)'],
      ['`exp`', 'Expiration — amal qilish muddati'],
      ['`role`, `name`', 'Ilovaning o‘z maydonlari (maxfiy bo‘lmagan!)']
    ] } },
    { terms: [
      ['401 Unauthorized', 'Token yo‘q, buzilgan yoki muddati o‘tgan — foydalanuvchi aniqlanmadi'],
      ['403 Forbidden', 'Foydalanuvchi aniqlangan, lekin bu amalga ruxsati yo‘q'],
      ['Access token', 'Qisqa muddatli (5–15 daqiqa), har bir so‘rovda yuboriladi'],
      ['Refresh token', 'Uzoq muddatli (7–30 kun), faqat yangi access token olish uchun']
    ] },
    { warn: 'JWT payload **shifrlanmaydi** — faqat base64url bilan kodlanadi. Unga parol, pasport ma’lumoti kabi maxfiy narsalarni yozmang.' }
  ],
  steps: [
    {
      title: 'JWT ni ichidan ko‘rish',
      blocks: [
        'Token «sehrli» narsa emas: uning dastlabki ikki qismini istalgan kishi o‘qiy oladi. Misolni ishga tushiring:',
        { code: decodeJwt, lang: 'js', run: true },
        'Endi imzo qanday hisoblanishini va nima uchun payload o‘zgartirilsa, token yaroqsiz bo‘lib qolishini ko‘ring (HMAC-SHA256):',
        { code: signJwt, lang: 'js', run: true },
        { note: 'Server imzoni **o‘zining maxfiy kaliti** bilan qayta hisoblaydi. Kalitni bilmagan hujumchi to‘g‘ri imzo yasay olmaydi, shuning uchun rolni «admin» ga o‘zgartirish ishlamaydi.' }
      ]
    },
    {
      title: 'Loyihani tayyorlash va maxfiy kalit',
      blocks: [
        { code: 'npm install jsonwebtoken bcryptjs dotenv\nnode -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"', lang: 'bash' },
        'Chiqqan tasodifiy qatorni `.env` fayliga yozing. `.env` Git ga qo‘shilmaydi.',
        { code: 'JWT_SECRET=bu_yerga_96_belgili_tasodifiy_qator\nJWT_REFRESH_SECRET=boshqa_tasodifiy_qator\nACCESS_TTL=15m\nREFRESH_TTL=7d', lang: 'text', title: '.env' },
        { code: "// server.js boshida\nimport 'dotenv/config';\nif (!process.env.JWT_SECRET) throw new Error('JWT_SECRET o‘rnatilmagan');", lang: 'js' }
      ]
    },
    {
      title: 'Ro‘yxatdan o‘tish: parolni xeshlash',
      blocks: [
        'Parol hech qachon ochiq holda saqlanmaydi. `bcrypt` har bir parolga tasodifiy «tuz» (salt) qo‘shadi va ataylab sekin ishlaydi — bu parollarni tanlab topishni qiyinlashtiradi.',
        { code: "// routes/auth.js\nimport { Router } from 'express';\nimport bcrypt from 'bcryptjs';\nimport jwt from 'jsonwebtoken';\n\nconst router = Router();\nconst users = [];            // A11 da bu jadval bazada bo‘ladi\nlet nextId = 1;\n\nrouter.post('/register', async (req, res) => {\n  const { email, password, name } = req.body;\n  if (!/^\\S+@\\S+\\.\\S+$/.test(email || '')) return res.status(422).json({ error: 'email noto‘g‘ri' });\n  if ((password || '').length < 8) return res.status(422).json({ error: 'parol kamida 8 belgi' });\n  if (users.some((u) => u.email === email)) return res.status(409).json({ error: 'Bu email band' });\n\n  const passwordHash = await bcrypt.hash(password, 12);   // 12 — «narx» (cost)\n  const user = { id: nextId++, email, name, role: 'student', passwordHash };\n  users.push(user);\n  res.status(201).json({ id: user.id, email, name, role: user.role });  // xeshni qaytarmaymiz!\n});", lang: 'js', title: 'routes/auth.js' },
        'Bazada parol shunday ko‘rinadi: `$2a$12$Qm1…` — undan asl parolni tiklab bo‘lmaydi.'
      ]
    },
    {
      title: 'Kirish: token berish',
      blocks: [
        { code: "function issueTokens(user) {\n  const payload = { sub: user.id, role: user.role, name: user.name };\n  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TTL });\n  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TTL });\n  return { accessToken, refreshToken };\n}\n\nrouter.post('/login', async (req, res) => {\n  const { email, password } = req.body;\n  const user = users.find((u) => u.email === email);\n  // Email yoki parol — qaysi biri xato ekanini aytmaymiz\n  const ok = user && await bcrypt.compare(password || '', user.passwordHash);\n  if (!ok) return res.status(401).json({ error: 'Email yoki parol noto‘g‘ri' });\n\n  res.json({ ...issueTokens(user), user: { id: user.id, name: user.name, role: user.role } });\n});\n\nexport { users, issueTokens };\nexport default router;", lang: 'js' },
        { code: "curl -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' \\\n  -d '{\"email\":\"dilnoza@mail.uz\",\"password\":\"Parol123!\",\"name\":\"Dilnoza\"}'\n\ncurl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' \\\n  -d '{\"email\":\"dilnoza@mail.uz\",\"password\":\"Parol123!\"}'", lang: 'bash' },
        'Olingan `accessToken` ni https://jwt.io saytiga qo‘yib, payload ni ko‘ring.'
      ]
    },
    {
      title: 'Himoya middleware lari: authenticate va authorize',
      blocks: [
        { code: "// middleware/auth.js\nimport jwt from 'jsonwebtoken';\n\nexport function authenticate(req, res, next) {\n  const header = req.headers.authorization || '';\n  const [scheme, token] = header.split(' ');\n  if (scheme !== 'Bearer' || !token) {\n    return res.status(401).json({ error: 'Token talab qilinadi' });\n  }\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });\n    next();\n  } catch (error) {\n    const message = error.name === 'TokenExpiredError' ? 'Token muddati tugagan' : 'Token yaroqsiz';\n    res.status(401).json({ error: message });\n  }\n}\n\n// authorize('admin', 'teacher') — faqat shu rollarga ruxsat\nexport function authorize(...roles) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ error: 'Bu amal uchun ruxsat yo‘q' });\n    }\n    next();\n  };\n}", lang: 'js', title: 'middleware/auth.js' },
        { code: "// server.js\nimport authRouter from './routes/auth.js';\nimport { authenticate, authorize } from './middleware/auth.js';\n\napp.use('/api/auth', authRouter);\n\napp.get('/api/profile', authenticate, (req, res) => {\n  res.json({ id: req.user.sub, name: req.user.name, role: req.user.role });\n});\n\n// O‘qish — hamma kirgan foydalanuvchilarga, o‘zgartirish — faqat admin ga\napp.get('/api/books', authenticate, listBooks);\napp.delete('/api/books/:id', authenticate, authorize('admin'), deleteBook);", lang: 'js' },
        { code: "TOKEN=eyJhbGciOi...   # login javobidagi accessToken\ncurl -i http://localhost:3000/api/profile                                   # 401\ncurl -i http://localhost:3000/api/profile -H \"Authorization: Bearer $TOKEN\"  # 200\ncurl -i -X DELETE http://localhost:3000/api/books/1 -H \"Authorization: Bearer $TOKEN\"  # 403 (student)", lang: 'bash' },
        { warn: '`jwt.verify` da `algorithms` ni aniq ko‘rsating. Aks holda ba’zi kutubxonalarda `"alg": "none"` yoki algoritm almashtirish hujumlariga yo‘l ochiladi.' }
      ]
    },
    {
      title: 'Tokenni yangilash (refresh) va chiqish',
      blocks: [
        'Access token 15 daqiqada tugaydi. Foydalanuvchi har safar qayta kirmasligi uchun refresh token bilan yangisini olamiz. Chiqishda refresh token bekor qilinadi.',
        { code: "const revoked = new Set();   // haqiqiy loyihada — bazadagi jadval\n\nrouter.post('/refresh', (req, res) => {\n  const { refreshToken } = req.body;\n  if (!refreshToken || revoked.has(refreshToken)) return res.status(401).json({ error: 'Qayta kiring' });\n  try {\n    const { sub } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, { algorithms: ['HS256'] });\n    const user = users.find((u) => u.id === sub);\n    if (!user) return res.status(401).json({ error: 'Foydalanuvchi topilmadi' });\n    revoked.add(refreshToken);              // rotatsiya: eski token endi ishlamaydi\n    res.json(issueTokens(user));\n  } catch {\n    res.status(401).json({ error: 'Refresh token yaroqsiz' });\n  }\n});\n\nrouter.post('/logout', (req, res) => {\n  if (req.body.refreshToken) revoked.add(req.body.refreshToken);\n  res.status(204).end();\n});", lang: 'js' }
      ]
    },
    {
      title: 'Front-end: tokenni saqlash va yuborish',
      blocks: [
        'Mijoz kirgandan keyin tokenni saqlaydi va har bir so‘rovga `Authorization` sarlavhasini qo‘shadi. 401 kelsa — refresh qilib, so‘rovni bir marta takrorlaydi.',
        { code: "// public/api.js\nlet accessToken = null;                         // xotirada — XSS dan nisbatan xavfsizroq\n\nexport async function login(email, password) {\n  const res = await fetch('/api/auth/login', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ email, password })\n  });\n  if (!res.ok) throw new Error((await res.json()).error);\n  const data = await res.json();\n  accessToken = data.accessToken;\n  localStorage.setItem('refreshToken', data.refreshToken);\n  return data.user;\n}\n\nasync function refresh() {\n  const res = await fetch('/api/auth/refresh', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })\n  });\n  if (!res.ok) return false;\n  const data = await res.json();\n  accessToken = data.accessToken;\n  localStorage.setItem('refreshToken', data.refreshToken);\n  return true;\n}\n\nexport async function api(url, options = {}, retry = true) {\n  const res = await fetch(url, {\n    ...options,\n    headers: { ...options.headers, Authorization: `Bearer ${accessToken}` }\n  });\n  if (res.status === 401 && retry && await refresh()) return api(url, options, false);\n  return res;\n}", lang: 'js', title: 'public/api.js' },
        { tip: 'Refresh tokenni `localStorage` o‘rniga `HttpOnly; Secure; SameSite=Strict` cookie da saqlash xavfsizroq — JavaScript uni o‘qiy olmaydi (A16 ga qarang).' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Parolni o‘zgartirish',
      level: 'easy',
      blocks: ['`PUT /api/profile/password` endpointini qo‘shing: eski parol tekshiriladi, yangisi kamida 8 belgi, raqam va harf bo‘lishi shart.']
    },
    {
      title: 'Kirish urinishlarini cheklash',
      level: 'medium',
      blocks: ['Bitta email uchun 15 daqiqada 5 tadan ortiq muvaffaqiyatsiz urinishdan keyin `429 Too Many Requests` qaytaring (`express-rate-limit` yoki o‘zingizning hisoblagichingiz).']
    },
    {
      title: 'Variant: rollar tizimi',
      level: 'hard',
      blocks: [
        'A13 dagi API ga autentifikatsiya qo‘shing va jurnal raqamingiz bo‘yicha ruxsatlar jadvalini amalga oshiring:',
        { ol: [
          'Kutubxona: `reader` — o‘qiydi, `librarian` — qo‘shadi/tahrirlaydi, `admin` — o‘chiradi.',
          'Do‘kon: `customer` — o‘z buyurtmalarini ko‘radi, `manager` — barcha buyurtmalarni.',
          'Universitet: `student` — o‘z baholarini, `teacher` — o‘z guruhi baholarini qo‘yadi.',
          'Blog: `author` — faqat o‘z maqolalarini tahrirlaydi, `editor` — hammasini.',
          'Klinika: `patient` — o‘z qabullari, `doctor` — o‘ziga yozilganlar.',
          'Tadbirlar: `guest` — ro‘yxatdan o‘tadi, `organizer` — o‘z tadbirlarini boshqaradi.',
          'Vazifalar: `member` — o‘ziga biriktirilgan vazifalar, `lead` — jamoa vazifalari.',
          'Mehmonxona: `guest` — o‘z bronlari, `receptionist` — barcha bronlar.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Autentifikatsiya oqimi sxemasi (register → login → so‘rov → refresh → logout).',
    '`routes/auth.js`, `middleware/auth.js` kodi.',
    'jwt.io da dekodlangan token skrinshoti.',
    'Postman: 201, 200, 401, 403 javoblari skrinshotlari.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Ro‘yxatdan o‘tish, parol bcrypt bilan xeshlanadi', '1'],
    ['Login JWT beradi, `authenticate` middleware to‘g‘ri ishlaydi', '1'],
    ['Rollar bo‘yicha avtorizatsiya (401/403 farqlanadi)', '1'],
    ['Refresh token va logout, front-end integratsiyasi', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Autentifikatsiya va avtorizatsiya farqini misolda tushuntiring.',
    'JWT qanday uch qismdan iborat? Imzo nimani kafolatlaydi, nimani kafolatlamaydi?',
    'Nima uchun parolni SHA-256 bilan emas, bcrypt bilan xeshlaymiz?',
    '401 va 403 holat kodlarining farqi nimada?',
    'Access token nima uchun qisqa muddatli bo‘ladi? Refresh token nima uchun kerak?',
    'JWT ni muddatidan oldin bekor qilish nima uchun qiyin? Yechimlari qanday?',
    'Tokenni `localStorage` da va `HttpOnly` cookie da saqlashning xavflari qanday?',
    'Login xatosida «email topilmadi» deb aniq aytish nima uchun yomon amaliyot?'
  ]
};
