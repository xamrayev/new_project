/* M3. HTML5: Veb sahifa strukturasi va semantikasi. */
export default {
  id: 'm3',
  number: 3,
  title: 'HTML5: Veb sahifa strukturasi va semantikasi',
  summary: 'HTML hujjat tuzilishi, asosiy elementlar, formalar, multimedia va semantik belgilash.',
  literature: [1],
  goals: [
    'HTML hujjatining tuzilishi va DOM daraxti bilan tanishish.',
    'Matn, havola, rasm, ro‘yxat, jadval va forma elementlarini o‘rganish.',
    'HTML5 semantik elementlari va ularning ahamiyatini tushunish.',
    'Kirish imkoniyati (accessibility) va SEO uchun to‘g‘ri belgilash qoidalarini bilish.'
  ],
  keywords: ['teg', 'element', 'atribut', 'DOM', 'blok element', 'qator element', 'semantika', 'forma', 'multimedia', 'accessibility', 'SEO', 'validatsiya'],
  practicals: ['a1'],
  lessons: ['web-and-html', 'html-document', 'html-text', 'html-links', 'html-images', 'html-lists', 'html-tables', 'html-forms', 'html-semantic'],
  sections: [
    {
      title: 'HTML va uning rivojlanishi',
      blocks: [
        { lead: 'HTML (HyperText Markup Language) — veb-sahifa tuzilishini tasvirlovchi belgilash tili. U dasturlash tili emas: shartlar va sikllar yo‘q, faqat «bu sarlavha», «bu ro‘yxat», «bu havola» degan ma’lumot bor.' },
        { table: { head: ['Versiya', 'Yil', 'Xususiyati'], rows: [
          ['HTML 2.0', '1995', 'Birinchi standart: formalar, jadvallar yo‘q'],
          ['HTML 3.2 / 4.01', '1997–1999', 'Jadvallar, skriptlar, uslublar (CSS) bilan ajratish'],
          ['XHTML 1.0', '2000', 'XML qoidalari: qat’iy sintaksis'],
          ['HTML5', '2014', 'Semantik teglar, audio/video, canvas, yangi forma elementlari, API lar'],
          ['HTML Living Standard', 'hozir', 'WHATWG tomonidan uzluksiz yangilanadigan standart']
        ] } },
        'Veb-sahifa uch texnologiya ustiga quriladi: **HTML** — tuzilish (skelet), **CSS** — ko‘rinish (kiyim), **JavaScript** — xatti-harakat (mushaklar). Bu ma’suliyatlarni ajratish (separation of concerns) tamoyili kodni tushunarli va qo‘llab-quvvatlanadigan qiladi.'
      ]
    },
    {
      title: 'Hujjat tuzilishi va DOM',
      blocks: [
        { code: '<!doctype html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Sahifa haqida qisqacha">\n  <title>Sahifa sarlavhasi</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Asosiy sarlavha</h1>\n  <p>Birinchi paragraf.</p>\n  <script src="app.js"></script>\n</body>\n</html>', lang: 'html', run: true },
        { terms: [
          ['`<!doctype html>`', 'Hujjat turini e’lon qiladi; brauzer standart rejimda ishlaydi.'],
          ['`<html lang>`', 'Ildiz element; `lang` — sahifa tili.'],
          ['`<head>`', 'Metama’lumot: kodirovka, sarlavha, uslublar, skriptlar, SEO teglari. Ekranda ko‘rinmaydi.'],
          ['`<body>`', 'Foydalanuvchi ko‘radigan barcha kontent.']
        ] },
        { h: 'Element, teg va atribut' },
        { code: '<a href="https://ubs.uz" target="_blank" class="link">UBS sayti</a>\n│  └─────┬────────────┘ └──────┬──────┘  └──┬───┘    │\n│    atribut             atribut          atribut   matn\nochuvchi teg ────────────────────────────────── yopuvchi teg: </a>', lang: 'text', title: 'Element anatomiyasi' },
        'Brauzer HTML matnini tahlil qilib **DOM** (Document Object Model) — elementlar daraxtini quradi. Har bir teg daraxtning tuguniga aylanadi; ichidagi teglar uning bolalari bo‘ladi. JavaScript aynan shu daraxt bilan ishlaydi (M6).',
        { code: 'document\n└── html\n    ├── head\n    │   ├── meta\n    │   └── title → "Sahifa sarlavhasi"\n    └── body\n        ├── h1 → "Asosiy sarlavha"\n        └── p  → "Birinchi paragraf."', lang: 'text', title: 'DOM daraxti' },
        { h: 'Blok va qator elementlar' },
        '**Blok elementlar** (`<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`) yangi qatordan boshlanadi va butun kenglikni egallaydi. **Qator (inline) elementlar** (`<span>`, `<a>`, `<strong>`, `<img>`) matn oqimi ichida joylashadi. Bu ko‘rinish CSS `display` xossasi bilan o‘zgartirilishi mumkin.'
      ]
    },
    {
      title: 'Matn, havolalar va rasmlar',
      blocks: [
        { table: { head: ['Teg', 'Vazifasi'], rows: [
          ['`<h1>`…`<h6>`', 'Sarlavhalar ierarxiyasi. Sahifada bitta `<h1>` bo‘lishi tavsiya etiladi; darajalarni sakrab o‘tmang.'],
          ['`<p>`', 'Paragraf'],
          ['`<strong>`, `<em>`', 'Muhimlik va urg‘u (ma’noli). `<b>`, `<i>` — faqat vizual.'],
          ['`<blockquote>`, `<q>`, `<cite>`', 'Iqtiboslar'],
          ['`<code>`, `<pre>`, `<kbd>`', 'Kod, formatlangan matn, klaviatura tugmasi'],
          ['`<br>`, `<hr>`', 'Qator ko‘chirish, mavzuviy ajratuvchi'],
          ['`<abbr>`, `<time>`, `<mark>`', 'Qisqartma, sana/vaqt, ajratib ko‘rsatilgan matn']
        ] } },
        { h: 'Havolalar' },
        { code: '<a href="about.html">Biz haqimizda</a>              <!-- nisbiy -->\n<a href="https://ubs.uz" target="_blank" rel="noopener">UBS</a>\n<a href="#contacts">Aloqa bo‘limiga</a>             <!-- sahifa ichida -->\n<a href="mailto:info@ubs.uz">Xat yozish</a>\n<a href="files/dastur.pdf" download>Fan dasturini yuklab olish</a>', lang: 'html' },
        { h: 'Rasmlar va moslashuvchan rasmlar' },
        { code: '<figure>\n  <img src="campus.jpg" alt="Universitet binosi" width="800" height="450" loading="lazy">\n  <figcaption>Universitetning bosh binosi</figcaption>\n</figure>\n\n<picture>\n  <source srcset="hero.webp" type="image/webp">\n  <img src="hero.jpg" alt="Talabalar dars paytida">\n</picture>', lang: 'html' },
        { ul: [
          '`alt` — rasm mazmunining matnli tavsifi; bezak rasm uchun `alt=""`.',
          '`width`/`height` — sahifa yuklanayotganda «sakrash»ning oldini oladi.',
          '`loading="lazy"` — rasm ekranga yaqinlashganda yuklanadi.',
          '`<picture>` va `srcset` — turli ekran va formatlar uchun turli fayllar.'
        ] }
      ]
    },
    {
      title: 'Ro‘yxatlar va jadvallar',
      blocks: [
        { code: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<ol start="3">\n  <li>Uchinchi qadam</li>\n  <li>To‘rtinchi qadam</li>\n</ol>\n\n<dl>\n  <dt>HTTP</dt>\n  <dd>Gipermatn uzatish protokoli</dd>\n</dl>', lang: 'html', run: true },
        'Jadvallar **faqat jadvalli ma’lumot** uchun ishlatiladi (dars jadvali, narxlar). Sahifani ustunlarga ajratish uchun jadval ishlatish eskirgan usul — buning uchun CSS Flexbox va Grid bor (M4).',
        { code: '<table>\n  <caption>Dars jadvali</caption>\n  <thead>\n    <tr><th scope="col">Kun</th><th scope="col">Fan</th><th scope="col">Xona</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Dushanba</td><td>Web tizimlari</td><td>305</td></tr>\n    <tr><td rowspan="2">Seshanba</td><td>Ma’lumotlar bazasi</td><td>210</td></tr>\n    <tr><td>Algoritmlar</td><td>112</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td colspan="3">Jami: 3 ta dars</td></tr>\n  </tfoot>\n</table>', lang: 'html', run: { html: '<table>\n  <caption>Dars jadvali</caption>\n  <thead>\n    <tr><th scope="col">Kun</th><th scope="col">Fan</th><th scope="col">Xona</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Dushanba</td><td>Web tizimlari</td><td>305</td></tr>\n    <tr><td rowspan="2">Seshanba</td><td>Ma’lumotlar bazasi</td><td>210</td></tr>\n    <tr><td>Algoritmlar</td><td>112</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td colspan="3">Jami: 3 ta dars</td></tr>\n  </tfoot>\n</table>', css: 'table { border-collapse: collapse; font-family: sans-serif; }\nth, td { border: 1px solid #999; padding: 6px 12px; }\nth { background: #eef2ff; }' } }
      ]
    },
    {
      title: 'Formalar',
      blocks: [
        'Forma — foydalanuvchidan ma’lumot olib, serverga yuborish vositasi. `action` — ma’lumot yuboriladigan manzil, `method` — HTTP metodi (`get` yoki `post`).',
        { code: '<form action="/register" method="post">\n  <label for="name">Ism</label>\n  <input id="name" name="name" required minlength="2">\n\n  <label for="email">E-mail</label>\n  <input id="email" name="email" type="email" required>\n\n  <label for="age">Yosh</label>\n  <input id="age" name="age" type="number" min="16" max="60">\n\n  <label for="group">Guruh</label>\n  <select id="group" name="group">\n    <option value="">— tanlang —</option>\n    <option>DI-21</option>\n    <option>DI-22</option>\n  </select>\n\n  <fieldset>\n    <legend>Ta’lim shakli</legend>\n    <label><input type="radio" name="form" value="kun" checked> Kunduzgi</label>\n    <label><input type="radio" name="form" value="sirt"> Sirtqi</label>\n  </fieldset>\n\n  <label><input type="checkbox" name="agree" required> Qoidalarga roziman</label>\n  <textarea name="about" rows="3" placeholder="O‘zingiz haqingizda"></textarea>\n\n  <button type="submit">Ro‘yxatdan o‘tish</button>\n</form>', lang: 'html', run: true },
        { h: 'HTML5 dagi yangi `input` turlari' },
        '`email`, `url`, `tel`, `number`, `range`, `date`, `time`, `color`, `search`, `file`. Ular mobil qurilmada mos klaviaturani chiqaradi va brauzer darajasida tekshiriladi.',
        { h: 'O‘rnatilgan validatsiya atributlari' },
        { table: { head: ['Atribut', 'Vazifasi'], rows: [
          ['`required`', 'Maydon to‘ldirilishi shart'],
          ['`minlength`, `maxlength`', 'Matn uzunligi chegarasi'],
          ['`min`, `max`, `step`', 'Son va sana chegaralari'],
          ['`pattern`', 'Regular ifoda bo‘yicha tekshiruv: `pattern="[A-Z]{2}[0-9]{7}"`'],
          ['`type="email"`', 'E-mail formatini tekshirish']
        ] } },
        { warn: 'Brauzerdagi validatsiya faqat foydalanuvchiga qulaylik uchun. Uni osongina chetlab o‘tish mumkin, shuning uchun ma’lumot **serverda ham albatta** tekshirilishi kerak (M14).' }
      ]
    },
    {
      title: 'Semantik belgilash',
      blocks: [
        'HTML5 gacha sahifalar `<div id="header">`, `<div class="menu">` kabi nomsiz bloklardan qurilardi. HTML5 bu bloklarga **ma’noli nomlar** berdi.',
        { table: { head: ['Element', 'Ma’nosi'], rows: [
          ['`<header>`', 'Sahifa yoki bo‘limning kirish qismi (logotip, sarlavha)'],
          ['`<nav>`', 'Asosiy navigatsiya havolalari'],
          ['`<main>`', 'Sahifaning asosiy, yagona kontenti (bittadan ortiq bo‘lmaydi)'],
          ['`<section>`', 'Sarlavhaga ega mavzuviy bo‘lim'],
          ['`<article>`', 'Mustaqil ma’noga ega kontent: maqola, post, sharh, mahsulot kartochkasi'],
          ['`<aside>`', 'Yon ma’lumot: reklama, bog‘liq havolalar'],
          ['`<footer>`', 'Yakuniy qism: mualliflik, aloqa']
        ] } },
        { code: '<body>\n  <header>\n    <h1>Texno yangiliklar</h1>\n    <nav>\n      <a href="/">Bosh sahifa</a> | <a href="/ai">Sun’iy intellekt</a>\n    </nav>\n  </header>\n  <main>\n    <article>\n      <h2>Yangi brauzer versiyasi chiqdi</h2>\n      <p><time datetime="2026-09-29">29-sentabr</time></p>\n      <p>Maqola matni…</p>\n    </article>\n    <aside>\n      <h3>Ko‘p o‘qilganlar</h3>\n    </aside>\n  </main>\n  <footer>&copy; 2026</footer>\n</body>', lang: 'html', run: true },
        { h: 'Semantika nima beradi' },
        { ul: [
          '**Kirish imkoniyati (a11y)**: ekran o‘quvchi dasturlar «navigatsiya», «asosiy kontent» bo‘limlariga to‘g‘ridan-to‘g‘ri o‘ta oladi.',
          '**SEO**: qidiruv tizimlari asosiy kontentni va sarlavhalar ierarxiyasini yaxshiroq tushunadi.',
          '**Qo‘llab-quvvatlash**: kodni o‘qish va o‘zgartirish osonlashadi.'
        ] }
      ]
    },
    {
      title: 'Multimedia, validatsiya va yaxshi amaliyotlar',
      blocks: [
        { code: '<video controls width="640" poster="preview.jpg">\n  <source src="lesson.mp4" type="video/mp4">\n  <track kind="subtitles" src="uz.vtt" srclang="uz" label="O‘zbekcha">\n  Brauzeringiz videoni qo‘llab-quvvatlamaydi.\n</video>\n\n<audio controls src="podcast.mp3"></audio>\n\n<iframe src="https://www.youtube.com/embed/…" title="Video dars" allowfullscreen></iframe>', lang: 'html' },
        'Shuningdek HTML5 `<canvas>` (JavaScript bilan chizish) va `<svg>` (vektor grafika) elementlarini ham taqdim etadi.',
        { h: 'Kodni tekshirish' },
        'HTML xatolarga «kechirimli»: yopilmagan teg bo‘lsa ham brauzer sahifani ko‘rsatadi, lekin natija kutilmagan bo‘lishi mumkin. Shuning uchun kodni **W3C Markup Validation Service** (validator.w3.org) orqali tekshirish tavsiya etiladi.',
        { h: 'Yaxshi amaliyotlar' },
        { ol: [
          'Teglarni va atributlarni kichik harflarda yozing, atribut qiymatlarini qo‘shtirnoqqa oling.',
          'Ichma-ich elementlarni chekinish (2 yoki 4 bo‘sh joy) bilan yozing.',
          'Har bir `<input>` ga `<label>` bog‘lang.',
          'Uslubni HTML ichiga (`style="..."`) emas, CSS fayliga yozing.',
          'Sahifada bitta `<h1>`, sarlavhalar darajasini ketma-ket ishlating.',
          'Barcha ma’noli rasmlarga `alt` yozing.'
        ] }
      ]
    }
  ],
  conclusion: [
    'HTML hujjat `doctype`, `head` va `body` dan iborat bo‘lib, brauzer undan DOM daraxtini quradi. Elementlar blok va qator turlarga bo‘linadi, atributlar ularga qo‘shimcha ma’lumot beradi.',
    'HTML5 semantik elementlar, yangi forma turlari va multimedia imkoniyatlarini qo‘shdi. To‘g‘ri semantik belgilash sahifani barcha foydalanuvchilar, qidiruv tizimlari va dasturchilar uchun tushunarli qiladi.'
  ],
  glossary: [
    ['Teg', 'Burchak qavslar ichidagi belgi: `<p>`, `</p>`.'],
    ['Element', 'Ochuvchi teg, tarkib va yopuvchi tegdan iborat birlik.'],
    ['Atribut', 'Elementga qo‘shimcha ma’lumot beruvchi `nom="qiymat"` juftligi.'],
    ['DOM', 'Brauzer HTML dan quradigan elementlar daraxti va unga murojaat qilish interfeysi.'],
    ['Semantik element', 'Tarkibining ma’nosini bildiruvchi element (`<nav>`, `<article>`).'],
    ['Accessibility (a11y)', 'Saytdan imkoniyati cheklangan foydalanuvchilar ham foydalana olishi.'],
    ['Validator', 'Kodni standartga muvofiqligini tekshiruvchi vosita.']
  ],
  questions: [
    'HTML dasturlash tilimi? Javobingizni asoslang.',
    '`<head>` bo‘limiga qanday elementlar yoziladi?',
    'DOM nima va u qanday hosil bo‘ladi?',
    'Blok va qator elementlarga ikkitadan misol keltiring.',
    '`<strong>` va `<b>` ning farqi nimada?',
    'Jadvalda `rowspan` va `colspan` nima uchun ishlatiladi?',
    'Forma `action` va `method` atributlari nimani bildiradi?',
    'HTML5 ning qanday yangi `input` turlarini bilasiz?',
    'Nima uchun brauzerdagi validatsiya yetarli emas?',
    '`<section>`, `<article>` va `<div>` qachon ishlatiladi?',
    'Semantik belgilash SEO va accessibility ga qanday ta’sir qiladi?'
  ]
};
