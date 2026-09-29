/* A16. Session va cookie'lar bilan ishlash. */

const cookieJs = `// Serverdan kelgan Set-Cookie sarlavhalari va brauzer yuboradigan Cookie sarlavhasi
const setCookieHeaders = [
  'sid=s%3A9f2c1a7e; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600',
  'theme=dark; Path=/; Max-Age=31536000; SameSite=Lax',
  'lang=uz; Path=/'
];

// Set-Cookie ni tahlil qilish: nom=qiymat va atributlar
function parseSetCookie(header) {
  const [pair, ...attrs] = header.split(';').map((s) => s.trim());
  const at = pair.indexOf('=');
  const cookie = { name: pair.slice(0, at), value: decodeURIComponent(pair.slice(at + 1)) };
  attrs.forEach((attr) => {
    const [key, val] = attr.split('=');
    cookie[key.toLowerCase()] = val === undefined ? true : val;
  });
  return cookie;
}

const jar = setCookieHeaders.map(parseSetCookie);
console.table(jar);

jar.forEach((c) => {
  const life = c['max-age'] ? Math.round(c['max-age'] / 3600) + ' soat' : 'brauzer yopilguncha (sessiya cookie)';
  console.log(c.name + ': ' + life + (c.httponly ? ', JS o‘qiy olmaydi' : ', document.cookie da ko‘rinadi'));
});

// Keyingi so‘rovda brauzer faqat nom=qiymat juftlarini yuboradi:
const cookieHeader = jar.map((c) => c.name + '=' + encodeURIComponent(c.value)).join('; ');
console.log('Cookie:', cookieHeader);

// Serverda (cookie-parser o‘rniga) Cookie sarlavhasini obyektga aylantirish
function parseCookieHeader(header) {
  return Object.fromEntries(header.split('; ').map((p) => {
    const i = p.indexOf('=');
    return [p.slice(0, i), decodeURIComponent(p.slice(i + 1))];
  }));
}
console.log(parseCookieHeader(cookieHeader));`;

const storageHtml = `<p>Tashriflar soni: <b id="visits">0</b></p>
<p>Bu tabdagi bosishlar: <b id="clicks">0</b> <button id="btn">+1</button></p>
<label><input type="checkbox" id="dark"> Tungi rejim (eslab qolinadi)</label>

<script>
  // localStorage — muddatsiz, bir domendagi barcha tablar uchun umumiy
  const visits = Number(localStorage.getItem('visits') || 0) + 1;
  localStorage.setItem('visits', visits);
  document.querySelector('#visits').textContent = visits;

  // sessionStorage — faqat shu tab, tab yopilsa o‘chadi
  const clicksEl = document.querySelector('#clicks');
  clicksEl.textContent = sessionStorage.getItem('clicks') || 0;
  document.querySelector('#btn').addEventListener('click', () => {
    const n = Number(sessionStorage.getItem('clicks') || 0) + 1;
    sessionStorage.setItem('clicks', n);
    clicksEl.textContent = n;
  });

  // Foydalanuvchi sozlamasi
  const dark = document.querySelector('#dark');
  const apply = () => {
    document.body.style.background = dark.checked ? '#0f172a' : '#fff';
    document.body.style.color = dark.checked ? '#e2e8f0' : '#0f172a';
  };
  dark.checked = localStorage.getItem('theme') === 'dark';
  apply();
  dark.addEventListener('change', () => {
    localStorage.setItem('theme', dark.checked ? 'dark' : 'light');
    apply();
  });

  const keys = [];
  for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
  console.log('Saqlangan kalitlar:', keys);
</script>`;

export default {
  id: 'a16',
  number: 16,
  title: 'Session va cookie’lar bilan ishlash',
  summary: 'Cookie o‘rnatish va o‘qish, atributlari (HttpOnly, Secure, SameSite, Max-Age), express-session bilan login, savat va sessiyani bazada saqlash.',
  lectures: ['m15', 'm2'],
  lessons: ['js-localstorage'],
  goal: 'HTTP ning holatsiz tabiatini cookie va sessiyalar yordamida yengib o‘tish: cookie atributlarini to‘g‘ri sozlash, server tomonida sessiyani saqlash, sessiyaga asoslangan autentifikatsiya va savat funksiyasini yaratish.',
  outcomes: [
    '`Set-Cookie` va `Cookie` sarlavhalari qanday ishlashini DevTools da ko‘rsatadi;',
    'cookie atributlarini (`HttpOnly`, `Secure`, `SameSite`, `Max-Age`, `Path`) maqsadga mos tanlaydi;',
    '`express-session` bilan login/logout va himoyalangan sahifalarni yaratadi;',
    'sessiyada savat kabi vaqtinchalik ma’lumotni saqlaydi;',
    'cookie, sessiya, `localStorage` va JWT ni qachon ishlatishni farqlaydi.'
  ],
  tools: [
    'Node.js 20+, Express.',
    'Paketlar: `cookie-parser`, `express-session`, `bcryptjs`, (ixtiyoriy) `connect-sqlite3` yoki `connect-redis`.',
    'Brauzer DevTools → Application → Cookies, Network → Headers.'
  ],
  theory: [
    { lead: 'HTTP **holatsiz**: server har bir so‘rovni alohida ko‘radi va oldingi so‘rovni «eslamaydi». Cookie — server brauzerga bergan kichik yozuv; brauzer uni keyingi har bir so‘rovga avtomatik qo‘shib yuboradi. Sessiya — ma’lumot serverda, brauzerda esa faqat uning identifikatori (session ID) turadi.' },
    { code: 'Brauzer                                   Server\n  │  POST /login (email, parol)  ───────────▶  │  sessiya yaratadi: sid=9f2c → { userId: 7 }\n  │  ◀─────  200 OK\n  │          Set-Cookie: sid=9f2c; HttpOnly   │\n  │                                           │\n  │  GET /profile                             │\n  │  Cookie: sid=9f2c  ─────────────────────▶  │  sid=9f2c → userId 7 → profilni qaytaradi', lang: 'text' },
    { table: { head: ['Atribut', 'Vazifasi'], rows: [
      ['`Expires` / `Max-Age`', 'Yashash muddati. Ko‘rsatilmasa — brauzer yopilguncha («sessiya cookie»)'],
      ['`HttpOnly`', 'JavaScript (`document.cookie`) o‘qiy olmaydi — XSS dan himoya'],
      ['`Secure`', 'Faqat HTTPS orqali yuboriladi'],
      ['`SameSite=Strict/Lax/None`', 'Boshqa saytdan kelgan so‘rovlarga qo‘shilishini cheklaydi — CSRF dan himoya'],
      ['`Path`, `Domain`', 'Qaysi yo‘l va domenlarga yuborilishi']
    ] } },
    { table: { head: ['', 'Cookie', 'Sessiya (server)', 'localStorage', 'JWT'], rows: [
      ['Qayerda', 'Brauzer', 'Server (xotira/baza)', 'Brauzer', 'Brauzer/mijoz'],
      ['Hajmi', '~4 KB', 'Cheklanmagan', '~5 MB', 'Kichik bo‘lishi kerak'],
      ['Serverga yuboriladimi', 'Avtomatik', 'ID cookie orqali', 'Yo‘q', 'Qo‘lda (sarlavha)'],
      ['Bekor qilish', 'Oson', 'Oson (o‘chirish)', '—', 'Qiyin'],
      ['Qachon', 'Sozlamalar, ID', 'Klassik sayt login', 'UI holati', 'API, mobil ilova']
    ] } }
  ],
  steps: [
    {
      title: 'Cookie tuzilishini tahlil qilish',
      blocks: [
        'Brauzer va server o‘rtasida cookie qanday ko‘rinishda yurishini modellashtiramiz:',
        { code: cookieJs, lang: 'js', run: true },
        'Brauzerning o‘zidagi saqlash vositalarini solishtiring — `localStorage` va `sessionStorage` serverga umuman yuborilmaydi:',
        { code: storageHtml, lang: 'html', run: true }
      ]
    },
    {
      title: 'Serverda cookie o‘rnatish va o‘qish',
      blocks: [
        { code: 'mkdir session-demo && cd session-demo\nnpm init -y && npm pkg set type=module\nnpm install express cookie-parser express-session bcryptjs', lang: 'bash' },
        { code: "// server.js\nimport express from 'express';\nimport cookieParser from 'cookie-parser';\n\nconst app = express();\napp.use(cookieParser('cookie-imzo-kaliti'));   // imzolangan cookie lar uchun kalit\napp.use(express.urlencoded({ extended: false }));\n\napp.get('/', (req, res) => {\n  const visits = Number(req.cookies.visits || 0) + 1;\n  res.cookie('visits', visits, { maxAge: 30 * 24 * 3600 * 1000, sameSite: 'lax' });\n  res.cookie('lang', 'uz', { signed: true });   // o‘zgartirilsa, req.signedCookies da false bo‘ladi\n  res.send(`<h1>Siz bu yerga ${visits}-marta keldingiz</h1>\n    <p>Til: ${req.signedCookies.lang ?? '—'}</p>\n    <a href=\"/forget\">Cookie larni o‘chirish</a>`);\n});\n\napp.get('/forget', (req, res) => {\n  res.clearCookie('visits');\n  res.clearCookie('lang');\n  res.redirect('/');\n});\n\napp.listen(3000, () => console.log('http://localhost:3000'));", lang: 'js', title: 'server.js' },
        'Sahifani bir necha marta yangilang. DevTools → **Network** → so‘rov → **Headers** bo‘limida javobdagi `Set-Cookie` va so‘rovdagi `Cookie` sarlavhalarini toping. **Application → Cookies** da qiymatni qo‘lda o‘zgartirib, imzolangan `lang` nima bo‘lishini kuzating.'
      ]
    },
    {
      title: 'express-session ni ulash',
      blocks: [
        { code: "import session from 'express-session';\n\napp.use(session({\n  name: 'sid',                       // standart nom «connect.sid» — texnologiyani oshkor qiladi\n  secret: process.env.SESSION_SECRET || 'faqat-dars-uchun',\n  resave: false,                     // o‘zgarmagan sessiyani qayta saqlamaslik\n  saveUninitialized: false,          // bo‘sh sessiya uchun cookie bermaslik\n  cookie: {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',  // localhost da http\n    sameSite: 'lax',\n    maxAge: 60 * 60 * 1000           // 1 soat\n  }\n}));\n\napp.get('/counter', (req, res) => {\n  req.session.views = (req.session.views || 0) + 1;\n  res.send(`Sessiya ID: ${req.sessionID}<br>Ko‘rishlar: ${req.session.views}`);\n});", lang: 'js' },
        'Brauzerda `/counter` ni yangilang, keyin boshqa brauzerda (yoki inkognito oynada) oching — har birida alohida hisoblagich bo‘ladi. Cookie da faqat imzolangan ID turadi, `views` qiymati esa serverda.'
      ]
    },
    {
      title: 'Sessiyaga asoslangan login',
      blocks: [
        { code: "import bcrypt from 'bcryptjs';\n\nconst users = [\n  { id: 1, email: 'admin@ubs.uz', name: 'Admin', role: 'admin', hash: bcrypt.hashSync('Admin123!', 10) },\n  { id: 2, email: 'aziz@ubs.uz', name: 'Aziz', role: 'student', hash: bcrypt.hashSync('Talaba123!', 10) }\n];\n\nconst page = (title, body) => `<!doctype html><meta charset=\"utf-8\"><title>${title}</title>${body}`;\n\napp.get('/login', (req, res) => {\n  res.send(page('Kirish', `<form method=\"POST\" action=\"/login\">\n    <input name=\"email\" placeholder=\"Email\"> <input name=\"password\" type=\"password\" placeholder=\"Parol\">\n    <button>Kirish</button></form>`));\n});\n\napp.post('/login', async (req, res, next) => {\n  const user = users.find((u) => u.email === req.body.email);\n  if (!user || !(await bcrypt.compare(req.body.password || '', user.hash))) {\n    return res.status(401).send(page('Xato', 'Email yoki parol noto‘g‘ri. <a href=\"/login\">Qayta</a>'));\n  }\n  // Session fixation dan himoya: kirishda yangi ID\n  req.session.regenerate((err) => {\n    if (err) return next(err);\n    req.session.user = { id: user.id, name: user.name, role: user.role };\n    res.redirect('/profile');\n  });\n});\n\nfunction requireLogin(req, res, next) {\n  if (!req.session.user) return res.redirect('/login');\n  next();\n}\n\napp.get('/profile', requireLogin, (req, res) => {\n  const { name, role } = req.session.user;\n  res.send(page('Profil', `<h1>Salom, ${name}!</h1><p>Rol: ${role}</p>\n    <form method=\"POST\" action=\"/logout\"><button>Chiqish</button></form>`));\n});\n\napp.post('/logout', (req, res, next) => {\n  req.session.destroy((err) => {\n    if (err) return next(err);\n    res.clearCookie('sid');\n    res.redirect('/login');\n  });\n});", lang: 'js' },
        { warn: 'Namuna qisqa bo‘lishi uchun foydalanuvchi ismi HTML ga to‘g‘ridan-to‘g‘ri qo‘yilgan. Haqiqiy loyihada shablon mexanizmi (EJS, Pug) orqali ekranlang — A15 dagi XSS ga qarang.' }
      ]
    },
    {
      title: 'Sessiyada savat',
      blocks: [
        'Sessiya faqat login uchun emas: kirmagan foydalanuvchining savatini ham saqlash mumkin.',
        { code: "const products = [\n  { id: 1, name: 'Daftar', price: 8000 },\n  { id: 2, name: 'Ruchka', price: 3000 },\n  { id: 3, name: 'Kitob «Web tizimlari»', price: 65000 }\n];\n\napp.post('/cart/:id', (req, res) => {\n  const product = products.find((p) => p.id === Number(req.params.id));\n  if (!product) return res.status(404).send('Mahsulot topilmadi');\n  req.session.cart ??= {};\n  req.session.cart[product.id] = (req.session.cart[product.id] || 0) + 1;\n  res.redirect('/cart');\n});\n\napp.get('/cart', (req, res) => {\n  const cart = req.session.cart || {};\n  const rows = Object.entries(cart).map(([id, qty]) => {\n    const p = products.find((x) => x.id === Number(id));\n    return { ...p, qty, sum: p.price * qty };\n  });\n  const total = rows.reduce((s, r) => s + r.sum, 0);\n  res.json({ items: rows, total });\n});", lang: 'js' }
      ]
    },
    {
      title: 'Sessiyalarni doimiy saqlash',
      blocks: [
        'Standart `MemoryStore` server qayta ishga tushganda barcha sessiyalarni yo‘qotadi va bir nechta server nusxasida ishlamaydi. Sessiyalarni baza yoki Redis da saqlang:',
        { code: "import connectSqlite from 'connect-sqlite3';\nconst SQLiteStore = connectSqlite(session);\n\napp.use(session({\n  store: new SQLiteStore({ db: 'sessions.sqlite', dir: './data' }),\n  name: 'sid',\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 3600_000 }\n}));", lang: 'js' },
        'Serverni qayta ishga tushiring — foydalanuvchi tizimdan chiqib ketmaganini tekshiring.',
        { note: 'PHP da xuddi shu mexanizm o‘rnatilgan: `session_start(); $_SESSION[\'user\'] = …;`, cookie nomi `PHPSESSID`. Laravel va Django da sessiya sozlamalari `config/session.php` va `settings.py` da.' }
      ]
    }
  ],
  tasks: [
    {
      title: '«Meni eslab qol»',
      level: 'easy',
      blocks: ['Login formasiga «Meni eslab qol» belgisini qo‘shing: belgilansa, sessiya cookie si 30 kun yashaydi (`req.session.cookie.maxAge`), aks holda brauzer yopilguncha.']
    },
    {
      title: 'Faol sessiyalar',
      level: 'medium',
      blocks: ['Sessiyalar bazada saqlanganda foydalanuvchining barcha faol sessiyalarini (brauzer, IP, oxirgi faollik) ko‘rsatadigan va «boshqa qurilmalardan chiqish» tugmasi bor sahifa yarating.']
    },
    {
      title: 'Variant bo‘yicha ilova',
      level: 'hard',
      blocks: [
        'Sessiyaga asoslangan login va jurnal raqamingizga mos funksiyani yarating:',
        { ol: [
          'Onlayn do‘kon savati: qo‘shish, sonini o‘zgartirish, o‘chirish, jami summa.',
          'Test tizimi: savollar sessiyada, javoblar saqlanadi, oxirida natija.',
          'Ko‘p bosqichli ro‘yxatdan o‘tish formasi (3 qadam, ma’lumot sessiyada).',
          'So‘nggi ko‘rilgan 5 ta mahsulot ro‘yxati.',
          'Til va mavzu sozlamalari (cookie) + login (sessiya).',
          'Kitob bron qilish: bron savati, 15 daqiqada tozalanadi.',
          'Flash-xabarlar: «Muvaffaqiyatli saqlandi» bir marta ko‘rsatiladi.',
          'Admin panel: faqat `admin` roli, boshqalarga 403 sahifasi.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'DevTools da `Set-Cookie` va `Cookie` sarlavhalari skrinshoti.',
    'Application → Cookies: `sid` cookie atributlari skrinshoti.',
    'Login, profil, savat va logout kodi.',
    'Cookie, sessiya, localStorage va JWT solishtirish jadvali (o‘z so‘zlaringiz bilan).',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Cookie o‘rnatish, o‘qish, o‘chirish; atributlar to‘g‘ri tanlangan', '1'],
    ['express-session sozlangan, sessiya ma’lumotlari serverda', '1'],
    ['Login/logout, `regenerate`, himoyalangan sahifalar', '1'],
    ['Savat yoki boshqa sessiya funksiyasi, doimiy saqlash', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'HTTP nima uchun «holatsiz» deyiladi va cookie bu muammoni qanday hal qiladi?',
    'Sessiya cookie si va doimiy cookie farqi nimada?',
    '`HttpOnly`, `Secure` va `SameSite` atributlari qaysi hujumlardan himoya qiladi?',
    'Sessiya ma’lumotlari qayerda saqlanadi? Brauzerda nima qoladi?',
    'Session fixation hujumi nima va `regenerate()` undan qanday himoya qiladi?',
    'Nima uchun `MemoryStore` production uchun yaramaydi?',
    'Imzolangan cookie shifrlangan cookie dan qanday farq qiladi?',
    'Qachon sessiya, qachon JWT ishlatgan ma’qul?'
  ]
};
