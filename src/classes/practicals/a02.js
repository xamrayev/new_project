/* A2. CSS3 yordamida veb sahifalarni uslublash va tartibga solish. */
const pageHtml = '<header class="site-header">\n  <a class="logo" href="#">Aliyev Vali</a>\n  <nav class="menu">\n    <a href="#about">Men haqimda</a>\n    <a href="#skills">Ko‘nikmalar</a>\n    <a href="#contacts">Aloqa</a>\n  </nav>\n</header>\n\n<main class="container">\n  <section id="about" class="hero">\n    <h1>Salom! Men front-end dasturchiman</h1>\n    <p>HTML, CSS va JavaScript bilan zamonaviy saytlar yarataman.</p>\n    <a class="btn" href="#contacts">Bog‘lanish</a>\n  </section>\n\n  <section id="skills">\n    <h2>Ko‘nikmalar</h2>\n    <div class="cards">\n      <article class="card"><h3>HTML5</h3><p>Semantik belgilash</p></article>\n      <article class="card"><h3>CSS3</h3><p>Flexbox, Grid, animatsiyalar</p></article>\n      <article class="card"><h3>JavaScript</h3><p>DOM, Fetch API</p></article>\n      <article class="card"><h3>Vue.js</h3><p>Komponentlar</p></article>\n    </div>\n  </section>\n</main>\n\n<footer class="site-footer">&copy; 2026 Aliyev Vali</footer>';

const baseCss = ':root {\n  --primary: #2563eb;\n  --primary-dark: #1d4ed8;\n  --text: #1e293b;\n  --muted: #64748b;\n  --bg: #f8fafc;\n  --card: #ffffff;\n  --radius: 12px;\n}\n\n*, *::before, *::after { box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  font-family: system-ui, "Segoe UI", Roboto, sans-serif;\n  line-height: 1.6;\n  color: var(--text);\n  background: var(--bg);\n}\n\n.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }\nh1, h2, h3 { line-height: 1.2; }';

const layoutCss = '.site-header {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 24px;\n  background: #0f172a;\n}\n.logo { color: #fff; font-weight: 700; text-decoration: none; }\n.menu { display: flex; gap: 20px; }\n.menu a { color: #cbd5e1; text-decoration: none; }\n.menu a:hover { color: #fff; }\n\n.hero { padding: 64px 0; text-align: center; }\n.hero h1 { font-size: clamp(1.8rem, 5vw, 3rem); margin: 0 0 12px; }\n.hero p { color: var(--muted); margin: 0 0 24px; }\n\n.btn {\n  display: inline-block;\n  padding: 12px 24px;\n  background: var(--primary);\n  color: #fff;\n  border-radius: var(--radius);\n  text-decoration: none;\n  transition: background .2s, transform .2s;\n}\n.btn:hover { background: var(--primary-dark); transform: translateY(-2px); }\n\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n.card {\n  background: var(--card);\n  padding: 24px;\n  border-radius: var(--radius);\n  box-shadow: 0 4px 16px rgb(15 23 42 / .08);\n  transition: transform .2s, box-shadow .2s;\n}\n.card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgb(15 23 42 / .14); }\n.card h3 { margin-top: 0; color: var(--primary); }\n\n.site-footer { margin-top: 48px; padding: 24px; text-align: center; color: var(--muted); }';

const responsiveCss = '@media (max-width: 640px) {\n  .site-header { flex-direction: column; gap: 10px; }\n  .menu { gap: 12px; font-size: 14px; }\n  .hero { padding: 40px 0; }\n}';

export default {
  id: 'a2',
  number: 2,
  title: 'CSS3 yordamida veb sahifalarni uslublash va tartibga solish',
  summary: 'Shaxsiy sahifani CSS o‘zgaruvchilari, Flexbox, Grid va media so‘rovlar bilan zamonaviy dizaynga keltiramiz.',
  lectures: ['m4'],
  lessons: ['css-intro', 'css-selectors', 'css-typography', 'css-box-model', 'css-display-position', 'css-flexbox', 'css-grid', 'css-responsive', 'css-modern'],
  goal: 'CSS selektorlari, blok modeli, Flexbox, Grid va media so‘rovlardan foydalanib, veb-sahifani moslashuvchan va zamonaviy ko‘rinishga keltirish ko‘nikmasini shakllantirish.',
  outcomes: [
    'tashqi CSS faylini ulaydi va CSS o‘zgaruvchilaridan foydalanadi;',
    'selektorlar, psevdo-klasslar va blok modelini to‘g‘ri qo‘llaydi;',
    'navigatsiyani Flexbox, kartochkalar to‘rini Grid bilan quradi;',
    'sahifani media so‘rovlar yordamida telefon ekraniga moslaydi;',
    'DevTools da uslublarni tahlil qila oladi.'
  ],
  tools: [
    'A1 ishida yaratilgan sahifa (yoki quyidagi tayyor HTML).',
    'VS Code + Live Server yoki kurs platformasidagi «Erkin playground».',
    'Brauzer DevTools: Elements → Styles, Computed, qurilma rejimi (Ctrl+Shift+M).'
  ],
  theory: [
    'CSS qoidasi **selektor** va **deklaratsiyalar** blokidan iborat. Ziddiyat bo‘lsa, spetsifikligi yuqori yoki keyinroq yozilgan qoida g‘olib bo‘ladi.',
    { table: { head: ['Vazifa', 'Vosita'], rows: [
      ['Ranglar va o‘lchamlarni bir joyda saqlash', 'CSS o‘zgaruvchilari: `--primary: #2563eb;` → `var(--primary)`'],
      ['Elementlarni qatorga tizish, markazlash', 'Flexbox: `display: flex; justify-content; align-items; gap`'],
      ['Kartochkalar to‘ri, sahifa karkasi', 'Grid: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`'],
      ['Turli ekranlarga moslash', '`@media (max-width: 640px) { … }`'],
      ['Silliq o‘zgarish', '`transition: transform .2s;`']
    ] } },
    { note: 'Ish uchta faylga bo‘linadi: `index.html`, `css/style.css` va rasm fayllari. Uslublar HTML ichiga emas, alohida faylga yoziladi.' }
  ],
  steps: [
    {
      title: 'CSS faylini yaratish va ulash',
      blocks: [
        'Loyiha papkasida `css` papkasini va unda `style.css` faylini yarating. `index.html` ning `<head>` qismiga havola qo‘shing:',
        { code: '<link rel="stylesheet" href="css/style.css">', lang: 'html' },
        'Ulanganini tekshirish uchun vaqtincha `body { background: yellow; }` yozib ko‘ring, keyin o‘chiring.',
        'Agar A1 dagi sahifangiz bo‘lmasa, quyidagi tayyor belgilashdan foydalaning — u keyingi qadamlarda uslublanadi:',
        { code: pageHtml, lang: 'html', run: { html: pageHtml } }
      ]
    },
    {
      title: 'Asosiy uslublar va CSS o‘zgaruvchilari',
      blocks: [
        '`style.css` boshida sayt ranglari va o‘lchamlarini o‘zgaruvchilar sifatida e’lon qiling, `box-sizing` ni tiklang va asosiy shriftni bering.',
        { code: baseCss, lang: 'css', run: { html: pageHtml, css: baseCss } },
        { tip: 'Keyin mavzuni o‘zgartirish uchun faqat `:root` dagi qiymatlarni almashtirish kifoya — butun sayt yangi rangga o‘tadi.' }
      ]
    },
    {
      title: 'Navigatsiya paneli: Flexbox',
      blocks: [
        'Sarlavhani logotip chapda, menyu o‘ngda bo‘ladigan qilib Flexbox bilan joylashtiring. `position: sticky` panelni skroll qilganda yuqorida ushlab turadi.',
        { code: '.site-header {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 24px;\n  background: #0f172a;\n}\n.logo { color: #fff; font-weight: 700; text-decoration: none; }\n.menu { display: flex; gap: 20px; }\n.menu a { color: #cbd5e1; text-decoration: none; }\n.menu a:hover { color: #fff; }', lang: 'css' }
      ]
    },
    {
      title: 'Hero bo‘limi va tugma',
      blocks: [
        'Birinchi ekran (hero) matnini markazlang, sarlavha o‘lchamini `clamp()` bilan ekran kengligiga moslang, tugmaga `:hover` holatini va `transition` qo‘shing.',
        { code: '.hero { padding: 64px 0; text-align: center; }\n.hero h1 { font-size: clamp(1.8rem, 5vw, 3rem); margin: 0 0 12px; }\n.hero p { color: var(--muted); margin: 0 0 24px; }\n\n.btn {\n  display: inline-block;\n  padding: 12px 24px;\n  background: var(--primary);\n  color: #fff;\n  border-radius: var(--radius);\n  text-decoration: none;\n  transition: background .2s, transform .2s;\n}\n.btn:hover { background: var(--primary-dark); transform: translateY(-2px); }', lang: 'css' }
      ]
    },
    {
      title: 'Ko‘nikmalar kartochkalari: Grid',
      blocks: [
        '`repeat(auto-fit, minmax(220px, 1fr))` — kartochkalar kamida 220px bo‘lib, ekranga sig‘ganicha ustun hosil qiladi. Media so‘rovsiz ham moslashuvchan to‘r!',
        { code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n.card {\n  background: var(--card);\n  padding: 24px;\n  border-radius: var(--radius);\n  box-shadow: 0 4px 16px rgb(15 23 42 / .08);\n  transition: transform .2s, box-shadow .2s;\n}\n.card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgb(15 23 42 / .14); }\n.card h3 { margin-top: 0; color: var(--primary); }\n\n.site-footer { margin-top: 48px; padding: 24px; text-align: center; color: var(--muted); }', lang: 'css' },
        'Hozirgacha yozilganlarning hammasini birga sinab ko‘ring:',
        { code: baseCss + '\n\n' + layoutCss, lang: 'css', title: 'style.css (oraliq natija)', run: { html: pageHtml, css: baseCss + '\n\n' + layoutCss } }
      ]
    },
    {
      title: 'Jadval va formalarni uslublash',
      blocks: [
        'A1 dagi ta’lim jadvalini chiroyli qiling: `border="1"` atributini HTML dan olib tashlang va chegaralarni CSS bilan bering. Juft qatorlarni `nth-child` bilan ajrating.',
        { code: 'table { width: 100%; border-collapse: collapse; background: var(--card); }\nth, td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; text-align: left; }\nth { background: #eef2ff; }\ntr:nth-child(even) td { background: #f8fafc; }\ncaption { caption-side: bottom; padding-top: 8px; color: var(--muted); font-size: 14px; }', lang: 'css', run: { html: '<table>\n  <caption>O‘qigan muassasalarim</caption>\n  <thead><tr><th>Yillar</th><th>Muassasa</th><th>Yo‘nalish</th></tr></thead>\n  <tbody>\n    <tr><td>2012–2023</td><td>12-maktab</td><td>Umumiy o‘rta ta’lim</td></tr>\n    <tr><td>2023–hozir</td><td>UBS</td><td>Dasturiy injiniring</td></tr>\n    <tr><td>2024</td><td>IT Park</td><td>Front-end kursi</td></tr>\n  </tbody>\n</table>', css: 'body { font-family: sans-serif; padding: 20px; }\n:root { --card: #fff; --muted: #64748b; }\ntable { width: 100%; border-collapse: collapse; background: var(--card); }\nth, td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; text-align: left; }\nth { background: #eef2ff; }\ntr:nth-child(even) td { background: #f8fafc; }\ncaption { caption-side: bottom; padding-top: 8px; color: var(--muted); font-size: 14px; }' } }
      ]
    },
    {
      title: 'Moslashuvchan dizayn: media so‘rovlar',
      blocks: [
        'DevTools ni ochib, qurilma rejimida (Ctrl+Shift+M) iPhone yoki Galaxy ekranini tanlang. Tor ekranda sarlavha va menyu bir qatorga sig‘maydi — ularni ustun ko‘rinishiga o‘tkazing:',
        { code: responsiveCss, lang: 'css', run: { html: pageHtml, css: baseCss + '\n\n' + layoutCss + '\n\n' + responsiveCss } },
        { warn: '`<head>` da `<meta name="viewport" content="width=device-width, initial-scale=1">` bo‘lmasa, telefon sahifani kichraytirib ko‘rsatadi va media so‘rovlar kutilgandek ishlamaydi.' }
      ]
    },
    {
      title: 'DevTools da tahlil va yakuniy tekshiruv',
      blocks: [
        { ol: [
          'Elements → Styles: `.card` elementini tanlab, qaysi qoidalar qo‘llanganini va qaysilari ustidan chizilganini ko‘ring.',
          'Computed bo‘limida blok modeli diagrammasini (margin/border/padding/content) toping.',
          'Flexbox va Grid konteynerlari yonidagi `flex`/`grid` belgisini bosib, joylashuv chiziqlarini ko‘ring.',
          'CSS kodini [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/) da tekshiring.',
          'Sahifani 320px, 768px va 1280px kengliklarda ko‘rib, skrinshot oling.'
        ] }
      ]
    }
  ],
  tasks: [
    {
      title: 'Qorong‘i mavzu',
      level: 'easy',
      blocks: ['`@media (prefers-color-scheme: dark)` ichida `:root` o‘zgaruvchilarini qayta belgilab, sahifaga qorong‘i mavzu qo‘shing. Operatsion tizim sozlamasini o‘zgartirib tekshiring.']
    },
    {
      title: 'Sahifa karkasi Grid areas bilan',
      level: 'medium',
      blocks: [
        '`grid-template-areas` yordamida «header / sidebar + main / footer» karkasini yarating. 768px dan tor ekranda sidebar asosiy kontent ostiga tushsin.'
      ]
    },
    {
      title: 'Variant bo‘yicha komponent',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha komponentni faqat HTML va CSS bilan yarating (JavaScriptsiz):',
        { ol: [
          'Narxlar jadvali (3 ta tarif, o‘rtadagisi ajratilgan).',
          'Mahsulot kartochkasi (rasm, narx, reyting yulduzlari, tugma).',
          'Fotogalereya (Grid, hover da kattalashish).',
          'Jamoa a’zolari kartochkalari (dumaloq rasm, ijtimoiy tarmoq ikonkalari).',
          'Vaqt chizig‘i (timeline) — ta’lim va tajriba tarixi.',
          'Blog maqolalari ro‘yxati (kategoriya teglari bilan).',
          'Ro‘yxatdan o‘tish formasi (`:focus`, `:invalid` holatlari).',
          'Yuklanish animatsiyasi (spinner) — `@keyframes`.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    '`style.css` fayli kodi (izohlar bilan).',
    'Sahifaning 3 ta ekran kengligidagi skrinshotlari (telefon, planshet, kompyuter).',
    'DevTools dagi blok modeli diagrammasi skrinshoti.',
    'CSS validatori natijasi.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['CSS tashqi faylda, o‘zgaruvchilar ishlatilgan, kod tartibli', '1'],
    ['Navigatsiya Flexbox, kartochkalar Grid bilan qurilgan', '1'],
    ['Hover holatlari va o‘tishlar (transition) qo‘llangan', '1'],
    ['Sahifa telefon ekraniga to‘g‘ri moslashgan', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'CSS ni sahifaga ulashning qaysi usuli eng yaxshi va nima uchun?',
    'Klass selektori va ID selektorining spetsifikligini solishtiring.',
    '`box-sizing: border-box` nima o‘zgartiradi?',
    '`justify-content` va `align-items` farqi nimada?',
    '`repeat(auto-fit, minmax(220px, 1fr))` qanday ishlaydi?',
    '`position: sticky` va `fixed` farqi nimada?',
    'CSS o‘zgaruvchilari qanday e’lon qilinadi va ishlatiladi?',
    'Media so‘rov va viewport meta tegining bog‘liqligini tushuntiring.'
  ]
};
