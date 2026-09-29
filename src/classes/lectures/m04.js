/* M4. CSS3: Veb sahifa uslublari va dizayni. */
const cardHtml = '<div class="card">\n  <h3>Web tizimlari</h3>\n  <p>5-semestr, 4 kredit</p>\n  <a href="#" class="btn">Batafsil</a>\n</div>';

export default {
  id: 'm4',
  number: 4,
  title: 'CSS3: Veb sahifa uslublari va dizayni',
  summary: 'Selektorlar, kaskad, blok modeli, Flexbox, Grid, moslashuvchan dizayn va animatsiyalar.',
  literature: [2],
  goals: [
    'CSS ni sahifaga ulash usullari va qoida sintaksisini o‘rganish.',
    'Selektorlar, kaskad, meros va spetsifiklik tushunchalarini bilish.',
    'Blok modeli, Flexbox va Grid yordamida sahifa joylashuvini qurishni o‘rganish.',
    'Moslashuvchan (responsive) dizayn, o‘zgaruvchilar, o‘tish va animatsiyalar bilan tanishish.'
  ],
  keywords: ['selektor', 'xossa', 'kaskad', 'spetsifiklik', 'meros', 'box model', 'Flexbox', 'Grid', 'media query', 'responsive', 'CSS o‘zgaruvchilar', 'transition', 'animation'],
  practicals: ['a2'],
  lessons: ['css-intro', 'css-selectors', 'css-typography', 'css-box-model', 'css-display-position', 'css-flexbox', 'css-grid', 'css-responsive', 'css-modern'],
  sections: [
    {
      title: 'CSS vazifasi va ulash usullari',
      blocks: [
        { lead: 'CSS (Cascading Style Sheets — kaskadli uslublar jadvali) sahifaning tashqi ko‘rinishini: ranglar, shriftlar, o‘lchamlar, joylashuv va animatsiyalarni belgilaydi.' },
        { h: 'Qoida sintaksisi' },
        { code: 'h1 {                 /* selektor */\n  color: #1d4ed8;     /* xossa: qiymat; — deklaratsiya */\n  font-size: 32px;\n}', lang: 'css' },
        { h: 'Ulash usullari' },
        { table: { head: ['Usul', 'Misol', 'Qachon'], rows: [
          ['Tashqi fayl', '`<link rel="stylesheet" href="style.css">`', 'Asosiy usul: bir fayl ko‘p sahifaga, brauzer keshlaydi'],
          ['Ichki', '`<style> p { color: red } </style>`', 'Bitta sahifaga xos kichik uslublar'],
          ['Inline', '`<p style="color: red">`', 'Faqat JavaScript orqali dinamik o‘zgartirishda']
        ] } }
      ]
    },
    {
      title: 'Selektorlar',
      blocks: [
        { table: { head: ['Selektor', 'Misol', 'Nimani tanlaydi'], rows: [
          ['Universal', '`*`', 'Barcha elementlar'],
          ['Teg', '`p`', 'Barcha `<p>`'],
          ['Klass', '`.card`', '`class="card"` bo‘lgan elementlar'],
          ['ID', '`#header`', '`id="header"` bo‘lgan yagona element'],
          ['Atribut', '`input[type="email"]`', 'Atributi mos kelgan elementlar'],
          ['Avlod', '`nav a`', '`nav` ichidagi istalgan chuqurlikdagi `a`'],
          ['Bevosita bola', '`ul > li`', '`ul` ning bevosita bolasi bo‘lgan `li`'],
          ['Qo‘shni', '`h2 + p`', '`h2` dan keyingi birinchi `p`'],
          ['Guruh', '`h1, h2, h3`', 'Bir nechta selektor uchun umumiy qoida'],
          ['Psevdo-klass', '`a:hover`, `li:nth-child(2n)`, `input:focus`', 'Element holati yoki o‘rni'],
          ['Psevdo-element', '`p::first-line`, `.btn::before`', 'Elementning bir qismi yoki yaratilgan kontent']
        ] } },
        { code: '.menu a { color: #334155; text-decoration: none; }\n.menu a:hover { color: #2563eb; }\n.menu a.active { font-weight: 700; }\ntr:nth-child(even) { background: #f1f5f9; }\ninput:invalid { border-color: crimson; }\n.required::after { content: " *"; color: crimson; }', lang: 'css' }
      ]
    },
    {
      title: 'Kaskad, spetsifiklik va meros',
      blocks: [
        'Bir elementga bir nechta qoida tegishli bo‘lsa, qaysi biri g‘olib bo‘lishini **kaskad** belgilaydi. Tartib quyidagicha:',
        { ol: [
          '**Muhimlik**: `!important` belgilangan deklaratsiya (undan imkon qadar qoching).',
          '**Spetsifiklik**: aniqroq selektor g‘olib.',
          '**Tartib**: spetsifikligi teng bo‘lsa, keyinroq yozilgan qoida g‘olib.'
        ] },
        { h: 'Spetsifiklikni hisoblash' },
        'Spetsifiklik uch son bilan ifodalanadi: (ID lar soni, klass/atribut/psevdo-klasslar soni, teg/psevdo-elementlar soni). Inline uslub bulardan ham ustun.',
        { table: { head: ['Selektor', 'Spetsifiklik'], rows: [
          ['`p`', '(0, 0, 1)'],
          ['`.card p`', '(0, 1, 1)'],
          ['`nav .menu a:hover`', '(0, 2, 2)'],
          ['`#main .card`', '(1, 1, 0)']
        ] } },
        { h: 'Meros' },
        'Ba’zi xossalar (`color`, `font-family`, `font-size`, `line-height`) ota elementdan bolalarga meros o‘tadi. Boshqalari (`margin`, `padding`, `border`, `background`) meros o‘tmaydi. Shu sababli shrift va rangni `body` ga bir marta berish kifoya.',
        { tip: 'DevTools → Elements → **Styles** panelida qaysi qoida qo‘llanganini va qaysi biri ustidan chizilganini (ustidan chiziq) ko‘rish mumkin.' }
      ]
    },
    {
      title: 'Ranglar, birliklar va tipografika',
      blocks: [
        { h: 'Rang yozish usullari' },
        '`red` (nom), `#2563eb` (HEX), `rgb(37 99 235)`, `rgb(37 99 235 / 50%)` (shaffoflik bilan), `hsl(221 83% 53%)`.',
        { h: 'O‘lchov birliklari' },
        { table: { head: ['Birlik', 'Ma’nosi', 'Qachon'], rows: [
          ['`px`', 'Piksel (mutlaq)', 'Chegaralar, soyalar'],
          ['`%`', 'Ota element o‘lchamiga nisbatan', 'Kengliklar'],
          ['`em`', 'Joriy element shrift o‘lchamiga nisbatan', 'Komponent ichidagi bo‘shliqlar'],
          ['`rem`', 'Ildiz (`html`) shrift o‘lchamiga nisbatan', 'Shriftlar va bo‘shliqlar — tavsiya etiladi'],
          ['`vw`, `vh`', 'Ekran kengligi/balandligining 1%', 'To‘liq ekranli bloklar'],
          ['`fr`', 'Grid dagi bo‘sh joy ulushi', 'Grid ustunlari']
        ] } },
        { h: 'Tipografika' },
        { code: 'body {\n  font-family: "Inter", system-ui, sans-serif;\n  font-size: 1rem;        /* 16px */\n  line-height: 1.6;\n  color: #1e293b;\n}\nh1 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; }\np  { max-width: 70ch; }  /* o‘qish uchun qulay qator uzunligi */', lang: 'css' }
      ]
    },
    {
      title: 'Blok modeli (box model)',
      blocks: [
        'Brauzer har bir elementni to‘rtburchak quti sifatida chizadi. Quti to‘rt qatlamdan iborat:',
        { code: '┌──────────────── margin ────────────────┐\n│ ┌────────────── border ──────────────┐ │\n│ │ ┌──────────── padding ───────────┐ │ │\n│ │ │                                │ │ │\n│ │ │        content (width×height)  │ │ │\n│ │ │                                │ │ │\n│ │ └────────────────────────────────┘ │ │\n│ └────────────────────────────────────┘ │\n└────────────────────────────────────────┘', lang: 'text', title: 'Blok modeli' },
        'Standart holatda `width` faqat kontent kengligini bildiradi, padding va border unga qo‘shiladi. `box-sizing: border-box` bilan `width` butun qutini (padding va border bilan) bildiradi — bu hisob-kitobni ancha soddalashtiradi.',
        { code: '*, *::before, *::after { box-sizing: border-box; }\n\n.card {\n  width: 280px;\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n  margin: 16px auto;           /* yuqori/pastki 16px, gorizontal markazlash */\n  box-shadow: 0 4px 12px rgb(0 0 0 / .08);\n  font-family: sans-serif;\n}\n.btn {\n  display: inline-block;\n  padding: 8px 16px;\n  background: #2563eb;\n  color: #fff;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background .2s;\n}\n.btn:hover { background: #1d4ed8; }', lang: 'css', run: { html: cardHtml, css: '*, *::before, *::after { box-sizing: border-box; }\n\n.card {\n  width: 280px;\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n  margin: 16px auto;\n  box-shadow: 0 4px 12px rgb(0 0 0 / .08);\n  font-family: sans-serif;\n}\n.btn {\n  display: inline-block;\n  padding: 8px 16px;\n  background: #2563eb;\n  color: #fff;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background .2s;\n}\n.btn:hover { background: #1d4ed8; }' } },
        { h: '`display` va `position`' },
        { ul: [
          '`display`: `block`, `inline`, `inline-block`, `none`, `flex`, `grid`.',
          '`position: static` — oddiy oqim (standart).',
          '`relative` — o‘z joyidan siljiydi, `absolute` bolalar uchun tayanch bo‘ladi.',
          '`absolute` — eng yaqin joylashtirilgan ota elementga nisbatan, oqimdan chiqadi.',
          '`fixed` — ekranga nisbatan qotadi (skroll qilganda ham joyida).',
          '`sticky` — skroll qilinganda ma’lum joyga yetgach «yopishib» qoladi.'
        ] }
      ]
    },
    {
      title: 'Flexbox va Grid',
      blocks: [
        '**Flexbox** — bir o‘lchamli (qator yoki ustun) joylashuv tizimi: menyular, kartochkalar qatori, elementlarni markazlash uchun ideal.',
        { code: '.navbar {\n  display: flex;\n  justify-content: space-between;  /* asosiy o‘q bo‘yicha */\n  align-items: center;             /* ko‘ndalang o‘q bo‘yicha */\n  gap: 16px;\n  padding: 12px 20px;\n  background: #0f172a;\n  color: #fff;\n  font-family: sans-serif;\n}\n.navbar nav { display: flex; gap: 12px; }\n.navbar a { color: #cbd5e1; text-decoration: none; }', lang: 'css', run: { html: '<header class="navbar">\n  <strong>UBS</strong>\n  <nav>\n    <a href="#">Bosh sahifa</a>\n    <a href="#">Kurslar</a>\n    <a href="#">Aloqa</a>\n  </nav>\n</header>', css: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 20px;\n  background: #0f172a;\n  color: #fff;\n  font-family: sans-serif;\n}\n.navbar nav { display: flex; gap: 12px; }\n.navbar a { color: #cbd5e1; text-decoration: none; }' } },
        { table: { head: ['Konteyner xossasi', 'Vazifasi'], rows: [
          ['`flex-direction`', '`row` | `column` — asosiy o‘q yo‘nalishi'],
          ['`justify-content`', '`flex-start`, `center`, `space-between`, `space-around`'],
          ['`align-items`', '`stretch`, `center`, `flex-start`, `flex-end`'],
          ['`flex-wrap`', '`wrap` — sig‘masa keyingi qatorga ko‘chirish'],
          ['`gap`', 'Elementlar orasidagi masofa']
        ] } },
        'Bola elementlar uchun: `flex: 1` (bo‘sh joyni teng bo‘lish), `flex-shrink`, `order`, `align-self`.',
        '**Grid** — ikki o‘lchamli (qator va ustun) joylashuv: butun sahifa karkasi, galereyalar, kartochkalar to‘ri uchun.',
        { code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 12px;\n  font-family: sans-serif;\n}\n.gallery div {\n  background: #dbeafe;\n  padding: 30px;\n  text-align: center;\n  border-radius: 8px;\n}', lang: 'css', run: { html: '<div class="gallery">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div>6</div>\n</div>', css: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 12px;\n  font-family: sans-serif;\n}\n.gallery div {\n  background: #dbeafe;\n  padding: 30px;\n  text-align: center;\n  border-radius: 8px;\n}' } },
        { code: '.page {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  min-height: 100vh;\n}\nheader { grid-area: header; }\naside  { grid-area: sidebar; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }', lang: 'css', title: 'Sahifa karkasi (grid-template-areas)' }
      ]
    },
    {
      title: 'Moslashuvchan dizayn va zamonaviy CSS',
      blocks: [
        '**Moslashuvchan (responsive) dizayn** — sahifa telefon, planshet va kompyuterda qulay ko‘rinishi. Uning uch asosi: `viewport` meta tegi, moslashuvchan birliklar (%, fr, rem) va **media so‘rovlar**.',
        { code: '/* Mobile-first: avval telefon uchun, so‘ng kattaroq ekranlar */\n.cards { display: grid; grid-template-columns: 1fr; gap: 16px; }\n\n@media (min-width: 640px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 1024px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n}\n@media (prefers-color-scheme: dark) {\n  body { background: #0f172a; color: #e2e8f0; }\n}', lang: 'css' },
        { h: 'CSS o‘zgaruvchilari (custom properties)' },
        { code: ':root {\n  --primary: #2563eb;\n  --radius: 10px;\n  --space: 16px;\n}\n.btn { background: var(--primary); border-radius: var(--radius); padding: calc(var(--space) / 2) var(--space); }\n[data-theme="dark"] { --primary: #60a5fa; }', lang: 'css' },
        { h: 'O‘tishlar va animatsiyalar' },
        { code: '.btn { transition: transform .2s ease, box-shadow .2s; }\n.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgb(0 0 0 / .15); }\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50%      { transform: scale(1.08); }\n}\n.badge { animation: pulse 1.5s infinite; }', lang: 'css', run: { html: '<button class="btn">Ustiga olib boring</button>\n<span class="badge">YANGI</span>', css: 'body { font-family: sans-serif; padding: 30px; display: flex; gap: 20px; align-items: center; }\n.btn { padding: 10px 18px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; cursor: pointer; transition: transform .2s ease, box-shadow .2s; }\n.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgb(0 0 0 / .15); }\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50%      { transform: scale(1.08); }\n}\n.badge { display: inline-block; background: crimson; color: #fff; padding: 4px 10px; border-radius: 999px; animation: pulse 1.5s infinite; }' } },
        { note: 'Katta loyihalarda CSS ni tartibga solish uchun **BEM** nomlash (`.card__title--active`), preprotsessorlar (**Sass**) va utilitar freymvorklar (**Tailwind CSS**, **Bootstrap**) qo‘llanadi.' }
      ]
    }
  ],
  conclusion: [
    'CSS qoidalari selektor va deklaratsiyalardan iborat; ziddiyatlar kaskad, spetsifiklik va tartib bo‘yicha hal qilinadi. Har bir element blok modeli bo‘yicha chiziladi.',
    'Zamonaviy joylashuv Flexbox (bir o‘lchamli) va Grid (ikki o‘lchamli) ga asoslanadi, media so‘rovlar esa sahifani har qanday ekranga moslashtiradi.'
  ],
  glossary: [
    ['Selektor', 'Uslub qo‘llanadigan elementlarni tanlovchi ifoda.'],
    ['Kaskad', 'Bir nechta qoida to‘qnashganda g‘olibni aniqlash algoritmi.'],
    ['Spetsifiklik', 'Selektorning «og‘irligi» (ID, klass, teg soni).'],
    ['Box model', 'Element kontent, padding, border va margin qatlamlaridan iborat quti sifatida.'],
    ['Flexbox', 'Bir o‘lchamli moslashuvchan joylashuv modeli.'],
    ['Grid', 'Qator va ustunlarga asoslangan ikki o‘lchamli joylashuv modeli.'],
    ['Media query', 'Qurilma xususiyatiga (kenglik, tema) qarab uslub qo‘llash sharti.']
  ],
  questions: [
    'CSS ni sahifaga ulashning uch usulini ayting. Qaysi biri tavsiya etiladi va nima uchun?',
    'Klass va ID selektorlarining farqi nimada?',
    '`nav a` va `nav > a` selektorlari qanday farq qiladi?',
    '`#menu .item a` selektorining spetsifikligini hisoblang.',
    'Qaysi xossalar meros o‘tadi, qaysilari o‘tmaydi?',
    'Blok modeli qanday qatlamlardan iborat? `box-sizing: border-box` nimani o‘zgartiradi?',
    '`rem` va `em` birliklarining farqi nimada?',
    '`position: absolute` va `fixed` ning farqini tushuntiring.',
    'Flexbox va Grid qachon ishlatiladi?',
    '«Mobile-first» yondashuvi nima?',
    'CSS o‘zgaruvchilari qanday afzallik beradi?'
  ]
};
