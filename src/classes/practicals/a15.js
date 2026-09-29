/* A15. Veb ilovalarda xavfsizlik zaifliklarini simulyatsiya qilish va himoya qilish. */
import { UNIVERSITY_SCHEMA, sqlLab } from '../sql-lab.js';

const xssHtml = `<h3>Izohlar (zaif versiya)</h3>
<form id="form">
  <input id="text" size="50" value="<img src=x onerror=&quot;document.body.style.background='crimson'; console.warn('XSS ishladi: begona skript bajarildi!')&quot;>">
  <button>Yuborish</button>
</form>
<ul id="list"></ul>

<h3>Izohlar (himoyalangan versiya)</h3>
<ul id="safe"></ul>

<script>
  const form = document.querySelector('#form');
  const input = document.querySelector('#text');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // ❌ ZAIF: foydalanuvchi matni HTML sifatida talqin qilinadi
    document.querySelector('#list').innerHTML += '<li>' + input.value + '</li>';

    // ✅ XAVFSIZ: matn faqat matn sifatida qo‘yiladi
    const li = document.createElement('li');
    li.textContent = input.value;
    document.querySelector('#safe').append(li);
  });

  form.requestSubmit();   // namunani avtomatik yuboramiz
</script>`;

const escapeJs = `// HTML ichiga matn qo‘yishdan oldin maxsus belgilarni «ekranlash»
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const payloads = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '" onmouseover="alert(1)',
  'Oddiy izoh — hech narsa buzilmaydi'
];

payloads.forEach((p) => console.log(escapeHtml(p)));

// URL larni ham tekshirish kerak: href="javascript:..." ham XSS
function safeUrl(url) {
  try {
    const parsed = new URL(url, 'https://example.uz');
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol) ? parsed.href : '#';
  } catch {
    return '#';
  }
}
console.log(safeUrl('https://ubs.uz'), safeUrl('javascript:alert(1)'), safeUrl('/profil'));`;

const sqliQuery = `-- Login formasi: email = ' OR '1'='1' --   parol = (istalgan)
-- Zaif server so‘rovni satrlarni ulash bilan yasaydi:
--   "SELECT * FROM students WHERE email = '" + email + "' AND password = '" + pass + "'"
-- Natijada bazaga quyidagi so‘rov boradi:

SELECT id, full_name, email FROM students
WHERE email = '' OR '1'='1' -- ' AND password = 'nimadir';

-- Hamma talabalar qaytdi — hujumchi birinchi foydalanuvchi sifatida kirdi.
-- Keyingi hujum: UNION bilan boshqa jadvalni o‘g‘irlash
SELECT id, full_name, email FROM students WHERE email = ''
UNION SELECT id, title, credits FROM courses;`;

export default {
  id: 'a15',
  number: 15,
  title: 'Veb ilovalarda xavfsizlik zaifliklarini simulyatsiya qilish va himoya qilish',
  summary: 'XSS, SQL-in’yeksiya, CSRF va boshqa keng tarqalgan zaifliklarni o‘quv muhitida ko‘rsatish va har biriga himoya qo‘yish.',
  lectures: ['m14', 'm15'],
  lessons: ['js-dom', 'js-forms'],
  goal: 'OWASP Top 10 dagi eng keng tarqalgan zaifliklar — XSS, SQL-in’yeksiya, CSRF, parollarni noto‘g‘ri saqlash va xavfsizlik sarlavhalarining yo‘qligi — qanday ishlashini nazorat ostidagi o‘quv muhitida ko‘rsatish va har biriga qarshi himoya choralarini amalga oshirish.',
  outcomes: [
    'saqlangan (stored) va aks ettirilgan (reflected) XSS ni ko‘rsatadi va `textContent`, ekranlash, CSP bilan bartaraf etadi;',
    'SQL-in’yeksiyani ko‘rsatadi va parametrlangan so‘rovlar bilan yo‘q qiladi;',
    'CSRF hujumini tushuntiradi, `SameSite` cookie va CSRF-token bilan himoyalanadi;',
    '`helmet` bilan xavfsizlik sarlavhalarini, `express-rate-limit` bilan so‘rov cheklovini qo‘yadi;',
    'zaifliklarni topish va tuzatish bo‘yicha qisqa hisobot yozadi.'
  ],
  tools: [
    'Node.js 20+, Express, `better-sqlite3` (yoki A11 dagi MySQL).',
    'Paketlar: `helmet`, `express-rate-limit`, `cookie-parser`.',
    'Brauzer DevTools (Network, Application, Console).'
  ],
  theory: [
    { warn: '**Etika va qonun.** Bu ishdagi hujumlar faqat o‘zingizning kompyuteringizdagi o‘quv ilovasida bajariladi. Boshqa saytlarda ruxsatsiz sinash — O‘zbekiston Respublikasi Jinoyat kodeksining 278¹–278⁷-moddalari bo‘yicha jinoyat.' },
    { table: { head: ['Zaiflik', 'Mohiyati', 'Asosiy himoya'], rows: [
      ['XSS', 'Foydalanuvchi kiritgan skript boshqa foydalanuvchi brauzerida bajariladi', 'Chiqishda ekranlash, `textContent`, CSP'],
      ['SQL-in’yeksiya', 'Kiritilgan matn SQL buyrug‘ining bir qismiga aylanadi', 'Parametrlangan so‘rovlar (`?`), ORM'],
      ['CSRF', 'Boshqa sayt foydalanuvchi nomidan so‘rov yuboradi (cookie avtomatik qo‘shiladi)', '`SameSite` cookie, CSRF-token'],
      ['Parollar', 'Ochiq yoki tez xesh (MD5) bilan saqlangan parollar sizib chiqadi', 'bcrypt/argon2, parol siyosati'],
      ['Brute force', 'Parolni ko‘p marta tanlab ko‘rish', 'Rate limiting, bloklash, 2FA'],
      ['Sarlavhalar yo‘q', 'Clickjacking, MIME sniffing, iframe ga joylash', '`helmet`: CSP, X-Frame-Options va b.']
    ] } },
    { note: 'Oltin qoida: **kiruvchi ma’lumotni tekshiring, chiquvchi ma’lumotni kontekstga mos ekranlang.** HTML ichida, atributda, URL da va SQL da ekranlash qoidalari turlicha.' }
  ],
  steps: [
    {
      title: 'XSS: hujumni ko‘rish',
      blocks: [
        'Quyidagi sahifada izoh maydonida «zararli» matn bor. Zaif ro‘yxat uni HTML sifatida talqin qiladi — `onerror` ishlaydi va fon qizarib ketadi. Himoyalangan ro‘yxatda esa xuddi shu matn oddiy yozuv bo‘lib ko‘rinadi.',
        { code: xssHtml, lang: 'html', run: true },
        'Haqiqiy hujumda skript fonni o‘zgartirmaydi: sessiya cookie sini o‘g‘irlaydi, foydalanuvchi nomidan so‘rov yuboradi yoki soxta login formasini chiqaradi.'
      ]
    },
    {
      title: 'XSS: himoya',
      blocks: [
        { ol: [
          'DOM ga matn qo‘yishda `textContent` / `innerText` ishlating, `innerHTML` emas.',
          'Serverda HTML shablon yasalsa — shablon mexanizmining avtomatik ekranlashidan foydalaning (EJS da `<%= %>`, Blade da `{{ }}`, Vue da `{{ }}`).',
          'HTML ni ataylab ruxsat berish kerak bo‘lsa (masalan, maqola matni) — `DOMPurify` kabi tozalagichdan o‘tkazing.',
          'Havolalardagi URL protokolini tekshiring (`javascript:` taqiqlanadi).',
          'Content-Security-Policy sarlavhasi bilan inline skriptlarni taqiqlang.'
        ] },
        { code: escapeJs, lang: 'js', run: true },
        { code: "// Serverda: Content-Security-Policy\nimport helmet from 'helmet';\napp.use(helmet({\n  contentSecurityPolicy: {\n    directives: {\n      defaultSrc: [\"'self'\"],\n      scriptSrc: [\"'self'\"],          // inline <script> va onerror= ishlamaydi\n      imgSrc: [\"'self'\", 'data:'],\n      objectSrc: [\"'none'\"],\n      frameAncestors: [\"'none'\"]      // clickjacking dan himoya\n    }\n  }\n}));", lang: 'js' },
        { tip: 'CSP ishlayotganini DevTools → Console da ko‘rasiz: «Refused to execute inline script because it violates the following Content Security Policy…»' }
      ]
    },
    {
      title: 'SQL-in’yeksiya: hujumni ko‘rish',
      blocks: [
        'Zaif login kodi:',
        { code: "// ❌ HECH QACHON BUNDAY YOZMANG\napp.post('/login', (req, res) => {\n  const { email, password } = req.body;\n  const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;\n  const user = db.prepare(sql).get();\n  if (user) res.json({ message: `Xush kelibsiz, ${user.name}` });\n  else res.status(401).json({ error: 'Kirish rad etildi' });\n});", lang: 'js' },
        'Email maydoniga `\' OR \'1\'=\'1\' --` yozilsa, bazaga qanday so‘rov borishini SQL laboratoriyasida ko‘ring:',
        { code: sqliQuery, lang: 'sql', ...sqlLab(UNIVERSITY_SCHEMA, sqliQuery) },
        { note: '`--` — SQL izohi: undan keyingi parol sharti umuman tekshirilmaydi. `\'1\'=\'1\'` har doim rost, shuning uchun `WHERE` barcha qatorlarni tanlaydi.' }
      ]
    },
    {
      title: 'SQL-in’yeksiya: himoya',
      blocks: [
        'Parametrlangan so‘rovda SQL matni va qiymatlar bazaga **alohida** yuboriladi — qiymat qanday bo‘lishidan qat’i nazar, u buyruqqa aylanmaydi.',
        { code: "// ✅ Parametrlangan so‘rov (better-sqlite3)\nconst findUser = db.prepare('SELECT id, name, password_hash FROM users WHERE email = ?');\n\napp.post('/login', async (req, res) => {\n  const user = findUser.get(req.body.email);\n  const ok = user && await bcrypt.compare(req.body.password || '', user.password_hash);\n  if (!ok) return res.status(401).json({ error: 'Email yoki parol noto‘g‘ri' });\n  res.json({ message: `Xush kelibsiz, ${user.name}` });\n});\n\n// mysql2 da: await pool.execute('SELECT … WHERE email = ?', [email]);\n// PHP PDO da: $stmt = $pdo->prepare('SELECT … WHERE email = :email'); $stmt->execute(['email' => $email]);", lang: 'js' },
        { warn: 'Jadval yoki ustun nomini (`ORDER BY ${sort}`) parametr qilib bo‘lmaydi. Ularni **ruxsat etilganlar ro‘yxati** (whitelist) bilan tekshiring: `if (![\'name\', \'gpa\'].includes(sort)) …`.' },
        'Qo‘shimcha himoya qatlamlari: bazaga ilova uchun faqat kerakli huquqlarga ega foydalanuvchi bilan ulanish (`DROP` huquqisiz), xato matnlarini foydalanuvchiga ko‘rsatmaslik.'
      ]
    },
    {
      title: 'CSRF: hujum va himoya',
      blocks: [
        'Foydalanuvchi bankka (localhost:3000) kirgan va brauzerda sessiya cookie si bor. U hujumchining sahifasini (localhost:4000) ochadi:',
        { code: '<!-- evil.html — boshqa portda oching: npx serve -l 4000 -->\n<h1>Tabriklaymiz, siz yutdingiz!</h1>\n<form id="f" action="http://localhost:3000/transfer" method="POST">\n  <input type="hidden" name="to" value="hacker">\n  <input type="hidden" name="amount" value="1000000">\n</form>\n<script>document.getElementById(\'f\').submit();</script>', lang: 'html', title: 'evil.html' },
        'Brauzer so‘rovga bank cookie sini avtomatik qo‘shsa, server uni foydalanuvchining o‘zi yuborgan deb o‘ylaydi. Himoya:',
        { code: "import cookieParser from 'cookie-parser';\nimport crypto from 'node:crypto';\napp.use(cookieParser());\napp.use(express.urlencoded({ extended: false }));\n\n// 1) Sessiya cookie si boshqa saytdan kelgan POST larda yuborilmaydi\nres.cookie('sid', sessionId, { httpOnly: true, secure: true, sameSite: 'strict' });\n\n// 2) CSRF-token: formaga yashirin maydon, cookie da uning nusxasi\napp.get('/transfer', (req, res) => {\n  const token = crypto.randomBytes(32).toString('hex');\n  res.cookie('csrf', token, { httpOnly: true, sameSite: 'strict' });\n  res.send(`<form method=\"POST\" action=\"/transfer\">\n    <input type=\"hidden\" name=\"_csrf\" value=\"${token}\">\n    <input name=\"to\"> <input name=\"amount\"> <button>O‘tkazish</button>\n  </form>`);\n});\n\napp.post('/transfer', (req, res) => {\n  if (!req.body._csrf || req.body._csrf !== req.cookies.csrf) {\n    return res.status(403).send('CSRF-token noto‘g‘ri');\n  }\n  // … pul o‘tkazish\n});", lang: 'js' },
        { note: 'API JWT ni `Authorization` sarlavhasida qabul qilsa (A14), klassik CSRF ishlamaydi — boshqa sayt bu sarlavhani qo‘sha olmaydi. CSRF cookie bilan autentifikatsiyada xavfli.' }
      ]
    },
    {
      title: 'Brute force va xavfsizlik sarlavhalari',
      blocks: [
        { code: "import rateLimit from 'express-rate-limit';\n\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,   // 15 daqiqa\n  limit: 5,                   // 5 ta urinish\n  message: { error: 'Juda ko‘p urinish. 15 daqiqadan keyin qayta urinib ko‘ring.' },\n  standardHeaders: 'draft-7'\n});\napp.post('/api/auth/login', loginLimiter, loginHandler);\n\napp.disable('x-powered-by');   // «Express» ekanini oshkor qilmaslik", lang: 'js' },
        { code: "# 6 marta noto‘g‘ri parol yuborib ko‘ring — oxirgisi 429 qaytaradi\nfor i in 1 2 3 4 5 6; do\n  curl -s -o /dev/null -w \"%{http_code}\\n\" -X POST localhost:3000/api/auth/login \\\n    -H 'Content-Type: application/json' -d '{\"email\":\"a@a.uz\",\"password\":\"x\"}'\ndone\n\n# Sarlavhalarni tekshirish\ncurl -I http://localhost:3000/", lang: 'bash' },
        'Javobda `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Strict-Transport-Security` sarlavhalari paydo bo‘lganini tekshiring. Saytni https://securityheaders.com da (deploy qilingan bo‘lsa) baholash mumkin.'
      ]
    },
    {
      title: 'Zaifliklar hisoboti',
      blocks: [
        'Topilgan har bir zaiflikni quyidagi shaklda qayd qiling — sanoatda xuddi shunday hisobot yoziladi:',
        { table: { head: ['Maydon', 'Namuna'], rows: [
          ['Nomi', 'Izohlarda saqlangan XSS'],
          ['Joyi', '`POST /comments`, `public/app.js` 42-qator'],
          ['Qayta hosil qilish', '1) izoh maydoniga `<img src=x onerror=…>` yozish 2) sahifani yangilash'],
          ['Ta’siri', 'Istalgan foydalanuvchi sessiyasini o‘g‘irlash'],
          ['Xavf darajasi', 'Yuqori'],
          ['Tuzatish', '`innerHTML` → `textContent`, CSP qo‘shildi (commit a1b2c3)']
        ] } }
      ]
    }
  ],
  tasks: [
    {
      title: 'Aks ettirilgan XSS',
      level: 'easy',
      blocks: ['`GET /search?q=…` sahifasi qidiruv so‘zini «Natijalar: …» deb chiqaradi. `q=<script>…</script>` bilan zaiflikni ko‘rsating va ekranlash bilan tuzating.']
    },
    {
      title: 'Xavfsiz fayl yuklash',
      level: 'medium',
      blocks: ['Avatar yuklash endpointini yozing (`multer`): faqat `image/png`, `image/jpeg`, 2 MB gacha, fayl nomi serverda tasodifiy yaratiladi. `evil.html` ni `.png` deb yuklashga urinish rad etilishini ko‘rsating.']
    },
    {
      title: 'Variant: audit',
      level: 'hard',
      blocks: [
        'O‘qituvchi bergan (yoki o‘zingizning A11–A14) ilovasida jurnal raqamingizga mos zaifliklar juftini toping, simulyatsiya qiling, tuzating va hisobot yozing:',
        { ol: [
          'Stored XSS + SQLi (qidiruv).',
          'Reflected XSS + CSRF (profilni o‘zgartirish).',
          'SQLi (login) + brute force.',
          'IDOR (`/api/orders/5` — birovning buyurtmasi) + XSS.',
          'Parollar ochiq saqlangan + rate limit yo‘q.',
          'CSRF (o‘chirish) + clickjacking (X-Frame-Options yo‘q).',
          'SQLi (`ORDER BY` parametri) + xato matnlari oshkor.',
          'Mass assignment (`role: admin` yuborish) + XSS (URL `javascript:`).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi, maqsadi va etika qoidalari bayoni.',
    'Har bir zaiflik uchun: hujum skrinshoti (oldin) va himoyadan keyingi natija (keyin).',
    'Zaif va tuzatilgan kod bo‘laklari yonma-yon.',
    'Zaifliklar hisoboti jadvali.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['XSS ko‘rsatilgan va ekranlash/CSP bilan tuzatilgan', '1'],
    ['SQL-in’yeksiya ko‘rsatilgan va parametrlangan so‘rovlar bilan tuzatilgan', '1'],
    ['CSRF himoyasi (SameSite, token) amalga oshirilgan', '1'],
    ['Rate limiting va xavfsizlik sarlavhalari, hisobot jadvali', '1'],
    ['Mustaqil topshiriq (audit) bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Stored, reflected va DOM-based XSS farqi nimada?',
    'Nima uchun `innerHTML` xavfli, `textContent` esa xavfsiz?',
    'Content-Security-Policy XSS dan qanday himoya qiladi?',
    'Parametrlangan so‘rov SQL-in’yeksiyani qanday to‘xtatadi? Nima uchun satrlarni «tozalash» yetarli emas?',
    'CSRF hujumi qanday sharoitda mumkin? `SameSite=Strict` va `Lax` farqi?',
    'OWASP Top 10 ro‘yxatidan beshta toifani ayting.',
    'IDOR zaifligi nima va u avtorizatsiya bilan qanday bog‘liq?',
    'Nima uchun xato xabarlarida stack trace yoki SQL matnini ko‘rsatish xavfli?'
  ]
};
