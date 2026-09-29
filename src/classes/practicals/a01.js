/* A1. HTML5 asosiy teglaridan foydalanib oddiy veb sahifa yaratish. */
export default {
  id: 'a1',
  number: 1,
  title: 'HTML5 asosiy teglaridan foydalanib oddiy veb sahifa yaratish',
  summary: 'Semantik tuzilishga ega shaxsiy «rezyume» sahifasini noldan yaratamiz.',
  lectures: ['m1', 'm3'],
  lessons: ['html-document', 'html-text', 'html-links', 'html-images', 'html-lists', 'html-tables', 'html-semantic'],
  goal: 'HTML5 hujjatining tuzilishini, matn, havola, rasm, ro‘yxat va jadval teglarini hamda semantik bo‘limlarni qo‘llab, shaxsiy rezyume sahifasini yaratish ko‘nikmasini hosil qilish.',
  outcomes: [
    'HTML5 hujjat karkasini xatosiz yoza oladi;',
    'sarlavha, paragraf, ro‘yxat, havola, rasm va jadval teglarini to‘g‘ri qo‘llaydi;',
    'sahifani `header`, `nav`, `main`, `section`, `footer` bo‘limlariga ajratadi;',
    'kodni W3C validatorida tekshira oladi.'
  ],
  tools: [
    'Brauzer (Google Chrome yoki Firefox) va uning DevTools vositasi (F12).',
    'Kod muharriri: Visual Studio Code (tavsiya etiladi) yoki kurs platformasidagi «Erkin playground».',
    'VS Code kengaytmasi: Live Server (sahifani avtomatik yangilash uchun).',
    'W3C validatori: https://validator.w3.org'
  ],
  theory: [
    '**HTML** (HyperText Markup Language) — sahifa tuzilishini tasvirlovchi belgilash tili. Har bir element ochuvchi va yopuvchi teg orasiga yoziladi: `<p>Matn</p>`. Ba’zi elementlar yakka bo‘ladi: `<img>`, `<br>`, `<meta>`.',
    'Elementlarga **atributlar** orqali qo‘shimcha ma’lumot beriladi: `<a href="https://ubs.uz">Sayt</a>`, `<img src="foto.jpg" alt="Rasm tavsifi">`.',
    { table: { head: ['Guruh', 'Teglar'], rows: [
      ['Hujjat tuzilishi', '`<!doctype html>`, `<html>`, `<head>`, `<body>`, `<meta>`, `<title>`'],
      ['Matn', '`<h1>`…`<h6>`, `<p>`, `<strong>`, `<em>`, `<br>`, `<hr>`'],
      ['Havola va media', '`<a>`, `<img>`, `<figure>`, `<figcaption>`'],
      ['Ro‘yxatlar', '`<ul>`, `<ol>`, `<li>`'],
      ['Jadval', '`<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`'],
      ['Semantik bo‘limlar', '`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`']
    ] } },
    { note: 'Semantik teglar sahifa ko‘rinishini o‘zgartirmaydi, lekin brauzer, qidiruv tizimlari va ekran o‘quvchi dasturlarga sahifaning qaysi qismi nima ekanini tushuntiradi.' }
  ],
  steps: [
    {
      title: 'Loyiha papkasini tayyorlash',
      blocks: [
        'Kompyuterda `rezyume` nomli papka yarating. Uning ichida `index.html` fayli va `images` papkasini hosil qiling. Papkani VS Code da oching (*File → Open Folder*).',
        { code: 'rezyume/\n├── index.html\n└── images/\n    └── foto.jpg', lang: 'text', title: 'Papka tuzilishi' },
        { tip: 'Fayl va papka nomlarida bo‘sh joy va kirill harflaridan foydalanmang — serverga joylashtirganda muammo tug‘diradi.' }
      ]
    },
    {
      title: 'HTML5 hujjat karkasini yozish',
      blocks: [
        '`index.html` fayliga hujjatning asosiy tuzilishini yozing. VS Code da `!` belgisini yozib Tab bosish orqali karkasni avtomatik hosil qilish mumkin, lekin birinchi marta uni qo‘lda yozing.',
        { code: '<!doctype html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Aliyev Vali — rezyume</title>\n</head>\n<body>\n\n</body>\n</html>', lang: 'html', run: true },
        { ul: [
          '`<!doctype html>` — brauzerga hujjat HTML5 standartida ekanini bildiradi.',
          '`lang="uz"` — sahifa tili (ekran o‘quvchilar va qidiruv tizimlari uchun).',
          '`charset="utf-8"` — o‘zbek harflari (o‘, g‘) to‘g‘ri ko‘rinishi uchun shart.',
          '`viewport` — sahifa telefonda to‘g‘ri masshtablanishi uchun.'
        ] }
      ]
    },
    {
      title: 'Sahifani semantik bo‘limlarga ajratish',
      blocks: [
        '`<body>` ichida sahifaning asosiy qismlarini yarating. Hozircha ular bo‘sh bo‘lishi mumkin.',
        { code: '<body>\n  <header>\n    <!-- ism va lavozim -->\n  </header>\n\n  <nav>\n    <!-- bo‘limlarga havolalar -->\n  </nav>\n\n  <main>\n    <section id="about"></section>\n    <section id="skills"></section>\n    <section id="education"></section>\n    <section id="contacts"></section>\n  </main>\n\n  <footer>\n    <!-- mualliflik -->\n  </footer>\n</body>', lang: 'html' }
      ]
    },
    {
      title: 'Sarlavha va «Men haqimda» bo‘limi',
      blocks: [
        '`<header>` ichiga ismingizni `<h1>` bilan, lavozim yoki yo‘nalishingizni `<p>` bilan yozing. «Men haqimda» bo‘limiga rasm va 2–3 paragraf matn qo‘shing.',
        { code: '<header>\n  <h1>Aliyev Vali</h1>\n  <p>Dasturiy injiniring yo‘nalishi talabasi, 3-kurs</p>\n</header>\n\n<section id="about">\n  <h2>Men haqimda</h2>\n  <figure>\n    <img src="images/foto.jpg" alt="Aliyev Valining portreti" width="160">\n    <figcaption>2026-yil</figcaption>\n  </figure>\n  <p>Men <strong>veb-dasturlash</strong> bilan qiziqaman va front-end dasturchi bo‘lishni maqsad qilganman.</p>\n  <p>Bo‘sh vaqtimda <em>ochiq kodli</em> loyihalarda ishtirok etaman.</p>\n</section>', lang: 'html', run: true },
        { warn: '`alt` atributini hech qachon tashlab ketmang: rasm yuklanmasa yoki foydalanuvchi ko‘rish qobiliyati cheklangan bo‘lsa, aynan shu matn o‘qiladi.' }
      ]
    },
    {
      title: 'Navigatsiya va ichki havolalar',
      blocks: [
        '`<nav>` ichida bo‘limlarga olib boruvchi havolalar ro‘yxatini yarating. `href="#skills"` — sahifadagi `id="skills"` elementiga o‘tadi.',
        { code: '<nav>\n  <ul>\n    <li><a href="#about">Men haqimda</a></li>\n    <li><a href="#skills">Ko‘nikmalar</a></li>\n    <li><a href="#education">Ta’lim</a></li>\n    <li><a href="#contacts">Aloqa</a></li>\n  </ul>\n</nav>', lang: 'html' }
      ]
    },
    {
      title: 'Ko‘nikmalar: ro‘yxatlar',
      blocks: [
        'Tartibsiz ro‘yxat (`<ul>`) bilan texnik ko‘nikmalarni, tartiblangan ro‘yxat (`<ol>`) bilan o‘quv maqsadlaringizni yozing. Ichma-ich ro‘yxatdan ham foydalaning.',
        { code: '<section id="skills">\n  <h2>Ko‘nikmalar</h2>\n  <ul>\n    <li>HTML5 va CSS3</li>\n    <li>JavaScript\n      <ul>\n        <li>DOM bilan ishlash</li>\n        <li>Fetch API</li>\n      </ul>\n    </li>\n    <li>Git</li>\n  </ul>\n\n  <h3>Shu semestrdagi maqsadlarim</h3>\n  <ol>\n    <li>Vue.js ni o‘rganish</li>\n    <li>Node.js da REST API yozish</li>\n    <li>Portfolio saytini joylashtirish</li>\n  </ol>\n</section>', lang: 'html', run: true }
      ]
    },
    {
      title: 'Ta’lim: jadval',
      blocks: [
        'Ta’lim tarixingizni jadval ko‘rinishida bering. Jadval sarlavhasi `<caption>`, ustun nomlari `<th>` bilan yoziladi.',
        { code: '<section id="education">\n  <h2>Ta’lim</h2>\n  <table border="1">\n    <caption>O‘qigan muassasalarim</caption>\n    <thead>\n      <tr>\n        <th>Yillar</th>\n        <th>Muassasa</th>\n        <th>Yo‘nalish</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>2012–2023</td>\n        <td>12-maktab</td>\n        <td>Umumiy o‘rta ta’lim</td>\n      </tr>\n      <tr>\n        <td>2023–hozir</td>\n        <td>UBS</td>\n        <td>Dasturiy injiniring</td>\n      </tr>\n    </tbody>\n  </table>\n</section>', lang: 'html', run: true },
        { note: '`border="1"` — eskirgan atribut, bu yerda faqat jadval chegaralarini ko‘rish uchun. Keyingi amaliy ishda chegaralarni CSS bilan beramiz.' }
      ]
    },
    {
      title: 'Aloqa bo‘limi va footer',
      blocks: [
        'Tashqi havolalar yangi oynada ochilishi uchun `target="_blank"` va xavfsizlik uchun `rel="noopener"` qo‘shing. Elektron pochta uchun `mailto:`, telefon uchun `tel:` sxemasidan foydalaning.',
        { code: '<section id="contacts">\n  <h2>Aloqa</h2>\n  <address>\n    E-mail: <a href="mailto:vali@example.com">vali@example.com</a><br>\n    Telefon: <a href="tel:+998901234567">+998 90 123 45 67</a><br>\n    GitHub: <a href="https://github.com/" target="_blank" rel="noopener">github.com/vali</a>\n  </address>\n</section>\n\n<footer>\n  <p>&copy; 2026 Aliyev Vali</p>\n</footer>', lang: 'html' }
      ]
    },
    {
      title: 'Brauzerda ochish va tekshirish',
      blocks: [
        { ol: [
          'Faylni saqlang va brauzerda oching (VS Code da: o‘ng tugma → *Open with Live Server*).',
          'Navigatsiyadagi havolalarni bosib, sahifa kerakli bo‘limga o‘tishini tekshiring.',
          'F12 → *Elements* bo‘limida DOM daraxtini ko‘ring: semantik bo‘limlar to‘g‘ri joylashganiga ishonch hosil qiling.',
          '[validator.w3.org](https://validator.w3.org/#validate_by_input) saytiga kodni joylab tekshiring. Barcha xato (Error) larni tuzating.'
        ] },
        { tip: 'Validator «Warning» bergan joylarni ham o‘qing — ular ko‘pincha kirish imkoniyati (accessibility) bilan bog‘liq maslahatlar.' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Shaxsiy rezyume',
      level: 'easy',
      blocks: ['Yuqoridagi qadamlarni o‘z ma’lumotlaringiz bilan bajaring. Sahifada kamida 5 ta bo‘lim, 1 ta rasm, 2 turdagi ro‘yxat va 1 ta jadval bo‘lsin.']
    },
    {
      title: 'Qo‘shimcha sahifa',
      level: 'medium',
      blocks: [
        '`projects.html` sahifasini yarating va unda o‘zingiz bajargan (yoki bajarmoqchi bo‘lgan) 3 ta loyihani `<article>` elementlari ko‘rinishida tasvirlang. Ikkala sahifa navigatsiyasi orqali bir-biriga o‘tish mumkin bo‘lsin.'
      ]
    },
    {
      title: 'Variantlar bo‘yicha sahifa',
      level: 'hard',
      blocks: [
        'Jurnaldagi tartib raqamingiz bo‘yicha mavzu tanlang va shu mavzuda semantik tuzilishga ega sahifa yarating (kamida `header`, `nav`, `main`, 3 ta `section`, `aside`, `footer`):',
        { ol: [
          'Universitet kafedrasi sahifasi.',
          'Kitob do‘koni katalogi.',
          'Shahar haqida turistik sahifa.',
          'Restoran menyusi (jadval bilan).',
          'Sport klubi jadvali va murabbiylari.',
          'IT-konferensiya dasturi.',
          'Kutubxona yangiliklari.',
          'Sevimli film yoki serial haqida sahifa.'
        ] },
        '11 dan katta raqamlar uchun: raqamni 8 ga bo‘lgandagi qoldiq + 1 variant raqami bo‘ladi.'
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Loyiha papkasi tuzilishi (skrinshot).',
    'Sahifaning brauzerdagi ko‘rinishi (to‘liq sahifa skrinshoti).',
    'W3C validatori natijasi — xatolarsiz (skrinshot).',
    '`index.html` fayli kodi yoki GitHub repozitoriyasiga havola.',
    'Nazorat savollariga qisqa javoblar.'
  ],
  criteria: [
    ['HTML5 karkasi to‘g‘ri (`doctype`, `lang`, `charset`, `viewport`, `title`)', '1'],
    ['Semantik bo‘limlar to‘g‘ri qo‘llangan', '1'],
    ['Matn, ro‘yxat, havola, rasm va jadval teglari to‘g‘ri ishlatilgan', '1'],
    ['Validator xatolarsiz, kod o‘qilishi oson (chekinishlar, izohlar)', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    '`<!doctype html>` nima uchun kerak?',
    '`<head>` va `<body>` ichiga qanday ma’lumotlar yoziladi?',
    'Blok va qator (inline) elementlarning farqi nimada? Misollar keltiring.',
    '`<ul>` va `<ol>` qachon ishlatiladi?',
    '`alt` atributi nima uchun muhim?',
    'Nisbiy va mutlaq havolaning farqi nimada?',
    '`<section>` va `<article>` ning farqi nimada?',
    'Nima uchun `<div>` o‘rniga semantik teglardan foydalanish tavsiya etiladi?'
  ]
};
