/* M15. Autentifikatsiya va avtorizatsiya mexanizmlari. */
const hashJs = "async function sha256(text) {\n  const bytes = new TextEncoder().encode(text);\n  const hash = await crypto.subtle.digest('SHA-256', bytes);\n  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');\n}\n\n(async () => {\n  console.log('parol123      →', await sha256('parol123'));\n  console.log('parol124      →', await sha256('parol124'));\n  const salt = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);\n  console.log('tuz + parol123 →', await sha256(salt + 'parol123'), '(tuz:', salt + ')');\n})();\n// Diqqat: SHA-256 parollar uchun juda TEZ — real tizimda bcrypt/Argon2 ishlatiladi.";

export default {
  id: 'm15',
  number: 15,
  title: 'Autentifikatsiya va avtorizatsiya mexanizmlari',
  summary: 'Parollarni saqlash, sessiyalar va cookie, JWT, OAuth 2.0, ikki bosqichli tasdiqlash, rollar va huquqlar.',
  literature: [5],
  goals: [
    'Identifikatsiya, autentifikatsiya va avtorizatsiya tushunchalarini farqlash.',
    'Parollarni xavfsiz saqlash usullarini o‘rganish.',
    'Sessiya va token (JWT) asosidagi autentifikatsiyani qiyoslash.',
    'OAuth 2.0, ko‘p faktorli autentifikatsiya va rollarga asoslangan kirish nazoratini bilish.'
  ],
  keywords: ['identifikatsiya', 'autentifikatsiya', 'avtorizatsiya', 'xesh', 'tuz (salt)', 'bcrypt', 'Argon2', 'sessiya', 'cookie', 'JWT', 'refresh token', 'OAuth 2.0', 'OpenID Connect', '2FA', 'RBAC'],
  practicals: ['a12'],
  lessons: ['js-localstorage'],
  sections: [
    {
      title: 'Asosiy tushunchalar',
      blocks: [
        { table: { head: ['Tushuncha', 'Savol', 'Misol'], rows: [
          ['Identifikatsiya', '«Siz kimsiz?»', 'Login yoki e-mail kiritish'],
          ['Autentifikatsiya', '«Buni isbotlang»', 'Parol, SMS-kod, barmoq izi'],
          ['Avtorizatsiya', '«Sizga nima ruxsat?»', 'Talaba bahoni ko‘radi, o‘qituvchi o‘zgartiradi']
        ] } },
        { h: 'Autentifikatsiya faktorlari' },
        { ul: [
          '**Bilgan narsangiz**: parol, PIN-kod.',
          '**Egalik qilgan narsangiz**: telefon (SMS, ilova kodi), apparat kalit (YubiKey).',
          '**O‘zingiz**: biometriya — barmoq izi, yuz.'
        ] },
        'Ikki xil faktorni birlashtirish — **ko‘p faktorli autentifikatsiya (MFA/2FA)**. Parol o‘g‘irlansa ham, tajovuzkor telefonsiz kira olmaydi.'
      ]
    },
    {
      title: 'Parollarni xavfsiz saqlash',
      blocks: [
        { warn: 'Parollar bazada **hech qachon** ochiq holda yoki qaytariladigan shifrlangan holda saqlanmaydi. Baza sizib chiqsa, foydalanuvchilarning boshqa saytlardagi hisoblari ham xavf ostida qoladi.' },
        '**Xesh-funksiya** — bir tomonlama funksiya: paroldan xeshni hisoblash oson, xeshdan parolni tiklash amalda mumkin emas. Kirishda kiritilgan parol xeshlanadi va saqlangan xesh bilan solishtiriladi.',
        { code: hashJs, lang: 'js', run: true },
        { ul: [
          '**Tuz (salt)** — har bir foydalanuvchi uchun tasodifiy qo‘shimcha. Bir xil parollar turli xesh beradi, tayyor «kamalak jadvallari» ishlamaydi.',
          '**Sekin algoritmlar**: `bcrypt`, `scrypt`, `Argon2` ataylab sekin va sozlanadigan. Tajovuzkor sekundiga milliardlab emas, bir necha mingtagina parolni sinay oladi.',
          'MD5 va SHA-1/SHA-256 parollar uchun **yaroqsiz** — ular juda tez.'
        ] },
        { code: "// Node.js — npm install bcrypt\nimport bcrypt from 'bcrypt';\n\nconst hash = await bcrypt.hash(password, 12);     // 12 — «narx» (cost)\n// $2b$12$Qm3v…  ← algoritm, narx, tuz va xesh bitta satrda\n\nconst ok = await bcrypt.compare(inputPassword, user.passwordHash);\n\n// PHP\n$hash = password_hash($password, PASSWORD_DEFAULT);\nif (password_verify($input, $hash)) { … }\n\n# Django — avtomatik: user.set_password(...), check_password(...)", lang: 'js' },
        { h: 'Parol siyosati va himoya' },
        { ul: [
          'Uzunlik muhimroq: kamida 8–12 belgi; murakkab qoidalardan ko‘ra passfrazalar yaxshi.',
          'Sizib chiqqan parollar ro‘yxatini tekshirish (Have I Been Pwned API).',
          'Urinishlar sonini cheklash va vaqtincha bloklash (brute-force dan himoya), CAPTCHA.',
          'Xato xabari umumiy bo‘lsin: «Login yoki parol noto‘g‘ri» — qaysi biri ekanini aytmang.',
          'Parolni tiklash — bir martalik, qisqa muddatli havola orqali.'
        ] }
      ]
    },
    {
      title: 'Sessiyaga asoslangan autentifikatsiya',
      blocks: [
        'HTTP holatsiz bo‘lgani uchun, foydalanuvchi kirgandan keyin keyingi so‘rovlarda uni «tanib olish» kerak. Klassik usul — **sessiya**.',
        { code: '1. POST /login  { login, parol }\n2. Server parolni tekshiradi, sessiya yaratadi:\n      sessions:  ab12cd… → { userId: 5, role: "teacher", expires: … }\n3. Javob:  Set-Cookie: sid=ab12cd…; HttpOnly; Secure; SameSite=Lax\n4. Keyingi so‘rovlar:  Cookie: sid=ab12cd…  → server sessiyadan foydalanuvchini topadi\n5. POST /logout → server sessiyani o‘chiradi', lang: 'text', title: 'Sessiya oqimi' },
        { ul: [
          'Sessiya ma’lumoti **serverda** (fayl, baza, Redis), brauzerda faqat tasodifiy identifikator.',
          'Chiqish (logout) darhol ishlaydi — sessiya o‘chiriladi.',
          'Kirgandan keyin sessiya ID si yangilanadi (session fixation hujumidan himoya).',
          'Kamchilik: ko‘p serverli tizimda umumiy sessiya ombori kerak; CSRF himoyasi talab qilinadi.'
        ] },
        { code: "// Express + express-session\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 }\n}));\n\napp.post('/login', async (req, res) => {\n  const user = await users.findByLogin(req.body.login);\n  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {\n    return res.status(401).json({ error: 'Login yoki parol noto‘g‘ri' });\n  }\n  req.session.regenerate(() => {\n    req.session.userId = user.id;\n    res.json({ ok: true });\n  });\n});", lang: 'js' }
      ]
    },
    {
      title: 'Token asosidagi autentifikatsiya: JWT',
      blocks: [
        '**JWT** (JSON Web Token) — imzolangan, o‘zida ma’lumot saqlovchi token. Server tokenni saqlamaydi: imzoni tekshirib, ichidagi ma’lumotga ishonadi. SPA, mobil ilovalar va mikroservislar uchun qulay.',
        { code: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsInJvbGUiOiJ0ZWFjaGVyIiwiZXhwIjoxNzkwMDAwMDAwfQ.4pT…\n└──────── header ───┘ └──────────────────── payload ──────────────────────┘ └ imzo ┘', lang: 'text', title: 'JWT tuzilishi: uch qism, nuqta bilan ajratilgan' },
        { code: "// Header:   { \"alg\": \"HS256\", \"typ\": \"JWT\" }\n// Payload:  { \"sub\": 5, \"role\": \"teacher\", \"exp\": 1790000000 }\n// Imzo:     HMACSHA256(base64(header) + '.' + base64(payload), SECRET)\n\nconst token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsInJvbGUiOiJ0ZWFjaGVyIiwiZXhwIjoxNzkwMDAwMDAwfQ.sig';\nconst payload = JSON.parse(atob(token.split('.')[1]));\nconsole.log(payload);   // payload SHIFRLANMAGAN — uni istalgan odam o‘qiy oladi!", lang: 'js', run: true },
        { warn: 'JWT payload faqat **imzolangan**, shifrlangan emas. Unga parol yoki shaxsiy maxfiy ma’lumot yozmang.' },
        { code: "import jwt from 'jsonwebtoken';\n\n// Kirishda\nconst accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });\n\n// Himoyalangan marshrutlar uchun middleware\nfunction requireAuth(req, res, next) {\n  const [, token] = (req.headers.authorization || '').split(' ');\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: 'Token yaroqsiz yoki muddati o‘tgan' });\n  }\n}\n\napp.get('/api/me', requireAuth, (req, res) => res.json(req.user));", lang: 'js' },
        { h: 'Access va refresh token' },
        'Access token qisqa muddatli (5–15 daqiqa) — o‘g‘irlansa ham zarar cheklangan. Uzoq muddatli **refresh token** `HttpOnly` cookie da saqlanadi va faqat yangi access token olish uchun ishlatiladi; chiqishda serverda bekor qilinadi.',
        { table: { head: ['Mezon', 'Sessiya', 'JWT'], rows: [
          ['Holat qayerda', 'Serverda', 'Tokenning o‘zida'],
          ['Masshtablash', 'Umumiy sessiya ombori kerak', 'Oson — har bir server imzoni tekshiradi'],
          ['Chiqish/bekor qilish', 'Darhol', 'Muddat tugaguncha amal qiladi (qora ro‘yxat kerak)'],
          ['Qulay mijozlar', 'An’anaviy veb-saytlar', 'SPA, mobil ilovalar, API lar']
        ] } }
      ]
    },
    {
      title: 'OAuth 2.0, OpenID Connect va SSO',
      blocks: [
        '**OAuth 2.0** — foydalanuvchi parolini bermasdan, bir ilovaga boshqa servisdagi ma’lumotlariga cheklangan ruxsat berish protokoli. **OpenID Connect** uning ustidagi qatlam bo‘lib, foydalanuvchi kimligini ham tasdiqlaydi. «Google orqali kirish», «OneID orqali kirish» tugmalari shu asosda ishlaydi.',
        { code: 'Foydalanuvchi   Sizning ilova          Google (avtorizatsiya serveri)\n     │ «Google bilan kirish» │                         │\n     │──────────────────────►│  yo‘naltirish           │\n     │◄──────────────────────│────────────────────────►│\n     │        login + «Ruxsat beraman»                 │\n     │────────────────────────────────────────────────►│\n     │  redirect_uri?code=XYZ                          │\n     │──────────────────────►│  code + client_secret   │\n     │                       │────────────────────────►│\n     │                       │◄── access_token, id_token│\n     │   tizimga kirildi     │                         │', lang: 'text', title: 'Authorization Code oqimi' },
        { ul: [
          'Parol faqat Google ga kiritiladi — ilova uni hech qachon ko‘rmaydi.',
          '**Scope** — qanday ruxsat so‘ralayotgani: `openid email profile`.',
          'SPA va mobil ilovalar uchun **PKCE** kengaytmasi majburiy.',
          '**SSO** (Single Sign-On) — bir marta kirib, tashkilotning barcha tizimlaridan foydalanish.'
        ] }
      ]
    },
    {
      title: 'Avtorizatsiya: rollar va huquqlar',
      blocks: [
        'Autentifikatsiyadan keyin har bir amal uchun «ruxsat bormi?» degan savolga javob beriladi.',
        { table: { head: ['Model', 'Mohiyati', 'Misol'], rows: [
          ['RBAC (rollarga asoslangan)', 'Huquqlar rollarga, rollar foydalanuvchilarga beriladi', 'admin, o‘qituvchi, talaba'],
          ['ABAC (atributlarga asoslangan)', 'Qaror foydalanuvchi, resurs va muhit atributlari bo‘yicha', '«O‘qituvchi faqat o‘z guruhining bahosini, semestr davomida o‘zgartira oladi»'],
          ['ACL (kirish ro‘yxatlari)', 'Har bir resursda kimga nima ruxsatligi ro‘yxati', 'Google Docs dagi «Kimga ulashilgan»']
        ] } },
        { code: "const PERMISSIONS = {\n  admin:   ['grades:read', 'grades:write', 'users:manage'],\n  teacher: ['grades:read', 'grades:write'],\n  student: ['grades:read:own']\n};\n\nfunction can(user, permission) {\n  return (PERMISSIONS[user.role] || []).includes(permission);\n}\n\nconst teacher = { id: 7, role: 'teacher' };\nconst student = { id: 21, role: 'student' };\nconsole.log('O‘qituvchi baho qo‘ya oladimi?', can(teacher, 'grades:write'));\nconsole.log('Talaba baho qo‘ya oladimi?', can(student, 'grades:write'));", lang: 'js', run: true },
        { warn: 'Tugmani interfeysda yashirish — himoya **emas**. Huquq har doim **serverda**, har bir so‘rovda tekshiriladi: tajovuzkor so‘rovni to‘g‘ridan-to‘g‘ri yubora oladi.' }
      ]
    }
  ],
  conclusion: [
    'Autentifikatsiya foydalanuvchi kimligini tasdiqlaydi, avtorizatsiya uning huquqlarini belgilaydi. Parollar faqat tuzli sekin xesh (bcrypt, Argon2) ko‘rinishida saqlanadi, muhim tizimlarda 2FA qo‘llanadi.',
    'Sessiyalar an’anaviy saytlar uchun sodda va ishonchli, JWT esa SPA, mobil ilova va API lar uchun qulay. OAuth 2.0/OpenID Connect uchinchi tomon orqali kirishni ta’minlaydi. Huquqlar RBAC yoki ABAC asosida har doim serverda tekshiriladi.'
  ],
  glossary: [
    ['Autentifikatsiya', 'Foydalanuvchi kimligini tasdiqlash.'],
    ['Avtorizatsiya', 'Foydalanuvchiga ruxsat etilgan amallarni aniqlash.'],
    ['Xesh', 'Ma’lumotdan hisoblanadigan, qaytarib bo‘lmaydigan qisqa qiymat.'],
    ['Tuz (salt)', 'Xeshlashdan oldin parolga qo‘shiladigan tasodifiy qiymat.'],
    ['Sessiya', 'Serverda saqlanadigan, cookie orqali bog‘langan foydalanuvchi holati.'],
    ['JWT', 'Imzolangan, o‘zida da’volarni saqlovchi token.'],
    ['OAuth 2.0', 'Cheklangan kirish huquqini delegatsiya qilish protokoli.'],
    ['RBAC', 'Rollarga asoslangan kirish nazorati.']
  ],
  questions: [
    'Identifikatsiya, autentifikatsiya va avtorizatsiya farqini misolda tushuntiring.',
    'Autentifikatsiya faktorlarining uch turini ayting.',
    'Nima uchun parollarni SHA-256 bilan xeshlash yetarli emas?',
    'Tuz (salt) qanday muammoni hal qiladi?',
    'Sessiyaga asoslangan autentifikatsiya qanday ishlaydi?',
    'JWT qanday qismlardan iborat? Payload shifrlanganmi?',
    'Access va refresh tokenlar nima uchun ajratiladi?',
    'Sessiya va JWT ni qiyoslang.',
    'OAuth 2.0 da ilova foydalanuvchi parolini ko‘radimi? Nima uchun?',
    'RBAC va ABAC farqi nimada? Nima uchun huquqni faqat interfeysda tekshirish yetarli emas?'
  ]
};
