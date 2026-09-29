/* M9. Server tomoni dasturlashga kirish: PHP, Python, Node.js. */
export default {
  id: 'm9',
  number: 9,
  title: 'Server tomoni dasturlashga kirish: PHP, Python, Node.js',
  summary: 'Back-end vazifalari, so‘rovni qayta ishlash sikli va uchta mashhur server texnologiyasi.',
  literature: [2],
  goals: [
    'Server tomoni dasturlashning vazifalari va klient tomonidan farqini tushunish.',
    'Veb-server, ilova serveri va so‘rovni qayta ishlash siklini bilish.',
    'PHP, Python va Node.js da oddiy server dasturini yozish asoslarini o‘rganish.',
    'Server texnologiyasini tanlash mezonlarini bilish.'
  ],
  keywords: ['back-end', 'server', 'veb-server', 'Nginx', 'Apache', 'CGI', 'PHP', 'Python', 'WSGI', 'Node.js', 'npm', 'event loop', 'marshrut', 'shablon', 'muhit o‘zgaruvchisi'],
  practicals: ['a9'],
  lessons: [],
  sections: [
    {
      title: 'Server tomonining vazifalari',
      blocks: [
        { lead: 'Brauzerdagi kodni foydalanuvchi ko‘radi va o‘zgartira oladi. Shuning uchun ishonch talab qiladigan hamma narsa — ma’lumotlarni saqlash, huquqlarni tekshirish, to‘lovlar — serverda bajariladi.' },
        { table: { head: ['Klient tomoni (front-end)', 'Server tomoni (back-end)'], rows: [
          ['Brauzerda ishlaydi', 'Serverda ishlaydi'],
          ['HTML, CSS, JavaScript', 'PHP, Python, JavaScript (Node.js), Java, C#, Go'],
          ['Interfeys, foydalanuvchi bilan muloqot', 'Biznes-mantiq, ma’lumotlar bazasi, xavfsizlik'],
          ['Kodni foydalanuvchi ko‘radi', 'Kod va maxfiy kalitlar yashirin'],
          ['Foydalanuvchi qurilmasi resurslari', 'Server resurslari, masshtablash talab qilinadi']
        ] } },
        { h: 'Back-end nima qiladi' },
        { ul: [
          'HTTP so‘rovlarni qabul qilib, marshrut bo‘yicha kerakli kodga yo‘naltiradi.',
          'Kiruvchi ma’lumotni tekshiradi (validatsiya) va tozalaydi.',
          'Ma’lumotlar bazasidan o‘qiydi va yozadi.',
          'Foydalanuvchini tanib oladi (autentifikatsiya) va huquqlarini tekshiradi (avtorizatsiya).',
          'HTML sahifa yoki JSON javob hosil qiladi.',
          'Tashqi servislar bilan integratsiya: to‘lov, SMS, pochta.',
          'Fon vazifalari: hisobotlar, xabarnomalar, zaxira nusxalar.'
        ] }
      ]
    },
    {
      title: 'So‘rovni qayta ishlash sikli',
      blocks: [
        { code: 'Brauzer ──HTTPS──► Nginx (veb-server, 443-port)\n                        │  statik fayl bo‘lsa — o‘zi beradi (css, js, rasm)\n                        │  dinamik bo‘lsa — proksi qiladi\n                        ▼\n              Ilova serveri (PHP-FPM / Gunicorn / Node.js)\n                        │  1. marshrutni aniqlash   GET /students/5\n                        │  2. middleware: sessiya, huquq\n                        │  3. kontroller: bazadan o‘qish\n                        │  4. javob: HTML yoki JSON\n                        ▼\n                 Ma’lumotlar bazasi (MySQL, PostgreSQL)', lang: 'text', title: 'So‘rov yo‘li' },
        { terms: [
          ['Veb-server', 'HTTP ulanishlarni qabul qiladi, statik fayllarni beradi, TLS ni boshqaradi, so‘rovlarni ilovaga proksi qiladi: **Nginx**, **Apache**, **Caddy**.'],
          ['Ilova serveri', 'Dasturingiz kodi ishlaydigan jarayon: **PHP-FPM**, **Gunicorn/Uvicorn** (Python), **Node.js** jarayoni.'],
          ['Interfeys standarti', 'Veb-server va ilova o‘rtasidagi kelishuv: CGI/FastCGI (PHP), WSGI/ASGI (Python).'],
          ['Marshrut (route)', 'URL va HTTP metodi juftligini kod (handler) bilan bog‘lash.'],
          ['Shablonizator', 'HTML ichiga ma’lumot joylash vositasi: Blade (Laravel), Jinja2/Django templates, EJS.']
        ] },
        { h: 'Server tomonida render (SSR) va API' },
        'Server javobni ikki xil tayyorlashi mumkin: **tayyor HTML** (an’anaviy saytlar, SEO uchun qulay) yoki **JSON** (SPA va mobil ilovalar uchun API, M13). Zamonaviy tizimlar ko‘pincha ikkalasini birlashtiradi.'
      ]
    },
    {
      title: 'PHP',
      blocks: [
        '**PHP** (1995, Rasmus Lerdorf) — aynan veb uchun yaratilgan til. Internetdagi saytlarning katta qismi (WordPress, Wikipedia, Facebookning dastlabki versiyasi) PHP da. Hosting deyarli har yerda mavjud, o‘rganish oson.',
        { ul: [
          'Har bir so‘rov uchun skript boshidan ishga tushadi (share-nothing model) — oddiy va barqaror.',
          'PHP 8: JIT kompilyator, tiplar, `match`, nomlangan argumentlar — til sezilarli zamonaviylashgan.',
          'Paket menejeri — **Composer**; asosiy freymvorklar — **Laravel**, **Symfony**.'
        ] },
        { code: "<?php\n// index.php\n$name = htmlspecialchars($_GET['name'] ?? 'mehmon');\n$students = [\n    ['name' => 'Aziz', 'gpa' => 4.6],\n    ['name' => 'Dilnoza', 'gpa' => 4.9],\n];\n?>\n<!doctype html>\n<html lang=\"uz\">\n<body>\n  <h1>Salom, <?= $name ?>!</h1>\n  <ul>\n    <?php foreach ($students as $s): ?>\n      <li><?= $s['name'] ?> — <?= $s['gpa'] ?></li>\n    <?php endforeach; ?>\n  </ul>\n</body>\n</html>", lang: 'php', title: 'PHP — HTML ichida kod' },
        { code: '$ php -S localhost:8000\n# brauzerda: http://localhost:8000/?name=Vali', lang: 'bash', title: 'O‘rnatilgan server bilan ishga tushirish' },
        { warn: '`htmlspecialchars` — foydalanuvchi kiritgan ma’lumotni HTML ga chiqarishdan oldin albatta ekranlash kerak. Aks holda XSS zaifligi paydo bo‘ladi (M14).' }
      ]
    },
    {
      title: 'Python',
      blocks: [
        '**Python** — sodda sintaksisli universal til. Vebdan tashqari ma’lumotlar tahlili, sun’iy intellekt va avtomatlashtirishda yetakchi, shuning uchun AI xizmatlari bilan integratsiya qilinadigan tizimlarda tanlanadi.',
        { ul: [
          'Freymvorklar: **Django** (to‘liq, «batareyalar bilan»), **Flask** (minimalistik), **FastAPI** (zamonaviy, asinxron, API uchun).',
          'Paket menejeri — **pip**, virtual muhit — **venv**.',
          'Interfeys standarti: WSGI (sinxron) va ASGI (asinxron).'
        ] },
        { code: "# app.py —  pip install flask\nfrom flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nstudents = [\n    {'id': 1, 'name': 'Aziz', 'gpa': 4.6},\n    {'id': 2, 'name': 'Dilnoza', 'gpa': 4.9},\n]\n\n@app.get('/')\ndef home():\n    name = request.args.get('name', 'mehmon')\n    return f'<h1>Salom, {name}!</h1>'   # real loyihada shablon ishlating\n\n@app.get('/api/students')\ndef list_students():\n    return jsonify(students)\n\nif __name__ == '__main__':\n    app.run(debug=True, port=5000)", lang: 'python', title: 'Python — Flask' },
        { code: '$ python -m venv venv\n$ source venv/bin/activate     # Windows: venv\\Scripts\\activate\n$ pip install flask\n$ python app.py', lang: 'bash' }
      ]
    },
    {
      title: 'Node.js',
      blocks: [
        '**Node.js** (2009, Rayan Dal) — Chrome ning V8 dvigateli asosida JavaScriptni serverda ishlatish muhiti. Asosiy afzalligi — front-end va back-end uchun **bitta til**.',
        { ul: [
          '**Bloklanmaydigan kiritish-chiqarish** va event loop: bitta jarayon minglab bir vaqtdagi ulanishlarni (chat, real vaqt xizmatlari) samarali boshqaradi.',
          'Dunyodagi eng katta paketlar ombori — **npm**.',
          'Freymvorklar: **Express** (minimalistik), **NestJS** (tuzilmali, TypeScript), **Fastify**.',
          'Og‘ir hisob-kitoblar (masalan, video qayta ishlash) event loop ni bloklaydi — ular uchun alohida oqimlar yoki servislar kerak.'
        ] },
        { code: "// server.js — hech qanday paketsiz\nimport { createServer } from 'node:http';\n\nconst students = [\n  { id: 1, name: 'Aziz', gpa: 4.6 },\n  { id: 2, name: 'Dilnoza', gpa: 4.9 }\n];\n\nconst server = createServer((req, res) => {\n  if (req.method === 'GET' && req.url === '/api/students') {\n    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });\n    res.end(JSON.stringify(students));\n    return;\n  }\n  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n  res.end('Topilmadi');\n});\n\nserver.listen(3000, () => console.log('http://localhost:3000'));", lang: 'js', title: 'Node.js — http moduli' },
        { code: '$ node server.js\n$ curl http://localhost:3000/api/students', lang: 'bash' },
        'Keyingi amaliy mashg‘ulotda (A9) xuddi shu serverni **Express** freymvorki yordamida qisqaroq va qulayroq yozamiz.'
      ]
    },
    {
      title: 'Konfiguratsiya, muhitlar va texnologiya tanlash',
      blocks: [
        { h: 'Muhit o‘zgaruvchilari' },
        'Parollar, API kalitlari, ma’lumotlar bazasi manzili kodga yozilmaydi — ular **muhit o‘zgaruvchilari** (`.env` fayli) orqali beriladi. `.env` fayli Git ga qo‘shilmaydi (`.gitignore`).',
        { code: 'APP_ENV=development\nPORT=3000\nDB_HOST=localhost\nDB_NAME=university\nDB_USER=app\nDB_PASSWORD=maxfiy_parol\nJWT_SECRET=uzun_tasodifiy_satr', lang: 'env', title: '.env' },
        { ul: [
          '**development** — dasturchi kompyuteri: batafsil xatolar, avtomatik qayta yuklash.',
          '**staging** — ishlab chiqarishga o‘xshash sinov serveri.',
          '**production** — haqiqiy foydalanuvchilar: xatolar yashiriladi, loglar yoziladi, keshlash yoqiladi.'
        ] },
        { h: 'Qiyoslash' },
        { table: { head: ['Mezon', 'PHP', 'Python', 'Node.js'], rows: [
          ['Kuchli tomoni', 'Hosting keng, CMS lar, tez boshlash', 'Sodda sintaksis, AI/ma’lumotlar tahlili', 'Bitta til, real vaqt, yuqori parallellik'],
          ['Freymvorklar', 'Laravel, Symfony', 'Django, Flask, FastAPI', 'Express, NestJS, Fastify'],
          ['Paket menejeri', 'Composer', 'pip', 'npm'],
          ['Model', 'Har bir so‘rov — alohida jarayon', 'WSGI/ASGI ishchi jarayonlar', 'Bitta jarayon + event loop'],
          ['Mashhur loyihalar', 'WordPress, Wikipedia', 'Instagram, Pinterest', 'Netflix, LinkedIn, PayPal']
        ] } }
      ]
    }
  ],
  conclusion: [
    'Server tomoni biznes-mantiq, ma’lumotlarni saqlash va xavfsizlik uchun javob beradi. So‘rov veb-server (Nginx) orqali ilova serveriga yetib boradi, u marshrutni aniqlab, bazaga murojaat qiladi va HTML yoki JSON qaytaradi.',
    'PHP, Python va Node.js — bir xil vazifani turli yondashuvlar bilan hal qiluvchi texnologiyalar. Tanlov loyiha talablari, jamoa bilimi va ekotizimga bog‘liq. Maxfiy sozlamalar har doim muhit o‘zgaruvchilarida saqlanadi.'
  ],
  glossary: [
    ['Back-end', 'Ilovaning serverda bajariladigan qismi.'],
    ['Veb-server', 'HTTP ulanishlarini qabul qiluvchi va statik fayllarni beruvchi dastur.'],
    ['Ilova serveri', 'Server tomoni dastur kodi bajariladigan muhit.'],
    ['Marshrut', 'URL va HTTP metodini ishlov beruvchi funksiya bilan bog‘lash qoidasi.'],
    ['SSR', 'Sahifani serverda HTML ko‘rinishida tayyorlash.'],
    ['npm / pip / Composer', 'Node.js / Python / PHP paket menejerlari.'],
    ['.env', 'Muhit o‘zgaruvchilari saqlanadigan, repozitoriyga qo‘shilmaydigan fayl.']
  ],
  questions: [
    'Qanday vazifalar albatta serverda bajarilishi kerak va nima uchun?',
    'Veb-server va ilova serverining farqi nimada?',
    'So‘rov brauzerdan bazagacha qanday yo‘l bosib o‘tadi?',
    'PHP ning qanday afzalliklari bor?',
    'Python veb-freymvorklaridan qaysilarini bilasiz?',
    'Node.js ning bloklanmaydigan modeli qanday ishlaydi va uning cheklovi nimada?',
    'Maxfiy sozlamalarni nima uchun kodga yozib bo‘lmaydi?',
    'development va production muhitlari qanday farq qiladi?',
    'Server HTML qaytarishi va JSON qaytarishi qachon qo‘llanadi?',
    'Loyiha uchun server texnologiyasini tanlashda nimalarga e’tibor berasiz?'
  ]
};
