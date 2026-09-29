/* A18. Responsive veb dizayn tamoyillarini qo‘llash. */

const pageHtml = `<header class="site-header">
  <a class="logo" href="#">UBS<span>web</span></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="menu">☰ Menyu</button>
  <nav id="menu" class="menu">
    <a href="#">Bosh sahifa</a>
    <a href="#">Kurslar</a>
    <a href="#">O‘qituvchilar</a>
    <a href="#">Aloqa</a>
  </nav>
</header>

<main>
  <section class="hero">
    <h1>Web tizimlari kursi</h1>
    <p>HTML, CSS, JavaScript va server dasturlash — bitta semestrda.</p>
    <a class="btn" href="#">Ro‘yxatdan o‘tish</a>
  </section>

  <section class="cards">
    <article class="card"><h2>HTML5</h2><p>Semantik teglar, formalar, multimedia.</p></article>
    <article class="card"><h2>CSS3</h2><p>Flexbox, Grid, media so‘rovlar va animatsiyalar.</p></article>
    <article class="card"><h2>JavaScript</h2><p>DOM, hodisalar, fetch va asinxron kod.</p></article>
    <article class="card"><h2>Node.js</h2><p>Express, REST API va ma’lumotlar bazasi.</p></article>
  </section>

  <section class="layout">
    <article class="content">
      <h2>Kurs haqida</h2>
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2393c5fd'/%3E%3Ctext x='400' y='215' font-size='40' font-family='sans-serif' text-anchor='middle' fill='%231e3a8a'%3ERasm 800×400%3C/text%3E%3C/svg%3E" alt="Auditoriyada talabalar" width="800" height="400">
      <p>Asosiy matn ustuni. Katta ekranda yonida qo‘shimcha panel turadi, kichik ekranda esa panel matn ostiga tushadi.</p>
    </article>
    <aside class="sidebar">
      <h3>Yangiliklar</h3>
      <p>Yakuniy nazorat 25-dekabr kuni bo‘lib o‘tadi.</p>
    </aside>
  </section>
</main>

<footer class="site-footer">© 2026 UBS, Namangan</footer>`;

const mobileCss = `/* 1. Asos: mobile-first — avval eng tor ekran uchun */
*, *::before, *::after { box-sizing: border-box; }

:root {
  --gap: clamp(12px, 2.5vw, 24px);
  --accent: #2563eb;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  /* Shrift o‘lchami ekran bilan silliq o‘sadi: 16px … 18px */
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.6;
  color: #0f172a;
}

img { max-width: 100%; height: auto; display: block; border-radius: 8px; }

.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px var(--gap);
  background: #0f172a;
  color: #fff;
}
.logo { color: #fff; font-weight: 800; text-decoration: none; font-size: 1.3rem; }
.logo span { color: #60a5fa; }
.menu-toggle { background: none; border: 1px solid #475569; color: #fff; border-radius: 6px; padding: 6px 10px; }
.menu { display: none; flex-basis: 100%; flex-direction: column; }
.menu.open { display: flex; }
.menu a { color: #e2e8f0; padding: 10px 0; text-decoration: none; border-top: 1px solid #1e293b; }

main { padding: var(--gap); display: grid; gap: calc(var(--gap) * 1.5); }

.hero {
  padding: calc(var(--gap) * 2) var(--gap);
  border-radius: 12px;
  background: linear-gradient(135deg, #1d4ed8, #7c3aed);
  color: #fff;
  text-align: center;
}
.hero h1 { font-size: clamp(1.6rem, 1rem + 4vw, 3rem); margin: 0 0 8px; line-height: 1.15; }
.btn { display: inline-block; margin-top: 12px; padding: 12px 20px; background: #fff; color: var(--accent); border-radius: 8px; font-weight: 700; text-decoration: none; }

/* Kartochkalar: bitta ustun */
.cards { display: grid; gap: var(--gap); }
.card { padding: 16px; border: 1px solid #e2e8f0; border-radius: 10px; }
.card h2 { margin: 0 0 4px; font-size: 1.15rem; color: var(--accent); }

.layout { display: grid; gap: var(--gap); }
.sidebar { padding: 16px; background: #f1f5f9; border-radius: 10px; }

.site-footer { padding: var(--gap); text-align: center; color: #64748b; font-size: .9rem; }`;

const breakpointsCss = `/* 2. Planshet: 600px dan keng */
@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* 3. Noutbuk: 900px dan keng */
@media (min-width: 900px) {
  .menu-toggle { display: none; }
  .menu { display: flex; flex-basis: auto; flex-direction: row; gap: 20px; }
  .menu a { border: 0; padding: 0; }

  .cards { grid-template-columns: repeat(4, 1fr); }
  .layout { grid-template-columns: 1fr 280px; align-items: start; }
  .hero { text-align: left; }
}

/* 4. Juda keng ekranda kontent cho‘zilib ketmasin */
@media (min-width: 1200px) {
  main { max-width: 1140px; margin-inline: auto; }
}`;

const menuJs = `const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Joriy o‘lchamni ko‘rsatish — panel kengligini o‘zgartirib kuzating
const report = () => console.log('Kenglik:', window.innerWidth + 'px',
  window.matchMedia('(min-width: 900px)').matches ? '→ noutbuk' :
  window.matchMedia('(min-width: 600px)').matches ? '→ planshet' : '→ mobil');
report();
window.addEventListener('resize', report);`;

const autoGridHtml = `<div class="gallery">
  <figure>1</figure><figure>2</figure><figure>3</figure><figure>4</figure>
  <figure>5</figure><figure>6</figure><figure>7</figure><figure>8</figure>
</div>

<div class="wrapper">
  <div class="product">
    <div class="product__img">Rasm</div>
    <div><h3>Container query</h3><p>Kartochka ekranga emas, o‘zi joylashgan konteyner kengligiga moslashadi.</p></div>
  </div>
</div>`;

const autoGridCss = `body { font-family: system-ui, sans-serif; margin: 16px; }

/* Media so‘rovsiz moslashuvchan to‘r: ustunlar soni o‘zi hisoblanadi */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.gallery figure {
  margin: 0;
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  font: 700 1.5rem system-ui;
  color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  border-radius: 10px;
}

/* Container queries */
.wrapper { container-type: inline-size; resize: horizontal; overflow: auto; border: 2px dashed #94a3b8; padding: 8px; max-width: 100%; }
.product { display: grid; gap: 12px; }
.product__img { background: #e2e8f0; border-radius: 8px; min-height: 100px; display: grid; place-items: center; }
@container (min-width: 420px) {
  .product { grid-template-columns: 160px 1fr; align-items: center; }
}`;

export default {
  id: 'a18',
  number: 18,
  title: 'Responsive veb dizayn tamoyillarini qo‘llash',
  summary: 'Mobile-first yondashuv, viewport, media so‘rovlar, Flexbox/Grid, moslashuvchan rasm va shriftlar, container query va turli qurilmalarda sinash.',
  lectures: ['m4', 'm3'],
  lessons: ['css-responsive', 'css-flexbox', 'css-grid', 'css-modern'],
  goal: 'Mobile-first yondashuv asosida telefon, planshet va kompyuter ekranlarida birdek qulay ishlaydigan veb-sahifa yaratish: viewport, nisbiy o‘lchov birliklari, media va container so‘rovlari, moslashuvchan to‘r, rasm va tipografikani qo‘llash.',
  outcomes: [
    '`viewport` meta tegining vazifasini tushuntiradi va uni to‘g‘ri qo‘yadi;',
    'sahifani mobile-first tamoyilida yozadi va `min-width` media so‘rovlari bilan kengaytiradi;',
    'Flexbox va Grid bilan moslashuvchan maket, `auto-fill`/`minmax` bilan media so‘rovsiz to‘r yasaydi;',
    '`clamp()`, `rem`, `vw` bilan silliq masshtablanadigan shrift va oraliqlar beradi;',
    '`srcset`, `sizes`, `<picture>` bilan ekranga mos rasm yuklaydi;',
    'sahifani DevTools Device Mode va Lighthouse bilan tekshiradi.'
  ],
  tools: [
    'VS Code va Live Server kengaytmasi.',
    'Chrome/Edge DevTools → Toggle device toolbar (Ctrl+Shift+M).',
    'Haqiqiy telefon (bir Wi-Fi tarmog‘ida `http://<kompyuter-IP>:5500`).'
  ],
  theory: [
    { lead: 'Responsive dizayn — bitta HTML sahifaning ekran o‘lchamiga qarab o‘z maketini o‘zgartirishi. Uch asosiy tamoyil (Ethan Marcotte, 2010): **moslashuvchan to‘r**, **moslashuvchan rasmlar** va **media so‘rovlar**.' },
    { code: '<meta name="viewport" content="width=device-width, initial-scale=1">', lang: 'html', title: 'Har bir sahifaning <head> ida bo‘lishi shart' },
    'Bu tegsiz mobil brauzer sahifani 980px kenglikdagi «virtual ekran» da chizadi va kichraytiradi — matn mayda bo‘lib, media so‘rovlar ishlamaydi.',
    { table: { head: ['Qurilma', 'Taxminiy kenglik', 'Breakpoint (min-width)'], rows: [
      ['Telefon', '360–430px', 'asos (media so‘rovsiz)'],
      ['Katta telefon / kichik planshet', '600–768px', '`600px`'],
      ['Planshet (gorizontal), noutbuk', '900–1280px', '`900px`'],
      ['Katta monitor', '1280px+', '`1200px`']
    ] } },
    { terms: [
      ['Mobile-first', 'Asosiy CSS telefon uchun yoziladi, kengroq ekranlar `min-width` bilan qo‘shiladi. Telefon ortiqcha qoidalarni yuklamaydi.'],
      ['`rem`', 'Ildiz (`html`) shrift o‘lchamiga nisbatan; foydalanuvchi brauzerda shriftni kattalashtirsa, sahifa ham moslashadi.'],
      ['`vw`, `vh`, `dvh`', 'Ekran kengligi/balandligining 1%. `dvh` — mobil manzil paneli hisobga olingan balandlik.'],
      ['`clamp(min, ideal, max)`', 'Qiymat ekran bilan o‘zgaradi, lekin chegaralardan chiqmaydi.']
    ] },
    { note: 'Breakpointlar qurilmalarga emas, **kontentga** qarab tanlanadi: oynani asta toraytiring va maket «buzila» boshlagan joyga breakpoint qo‘ying.' }
  ],
  steps: [
    {
      title: 'Loyiha tuzilishi va HTML',
      blocks: [
        { code: 'responsive-site/\n├── index.html\n├── css/\n│   └── style.css\n├── js/\n│   └── menu.js\n└── img/', lang: 'text' },
        'Sahifa tuzilmasi — semantik teglar bilan. `<head>` ga viewport meta tegini qo‘yishni unutmang.',
        { code: pageHtml, lang: 'html', title: 'index.html → <body>' }
      ]
    },
    {
      title: 'Mobile-first asosiy uslublar',
      blocks: [
        'Avval faqat telefon uchun yozamiz: bitta ustun, yashirin menyu, `clamp()` bilan shrift va oraliqlar. Media so‘rov hali yo‘q.',
        { code: mobileCss, lang: 'css', title: 'css/style.css (1-qism)', run: { html: pageHtml, css: mobileCss } },
        { tip: '«Sinab ko‘rish» oynasida natija panelining kengligini sichqoncha bilan o‘zgartiring — sahifa hozircha har qanday kenglikda bir ustunli bo‘lib qoladi.' }
      ]
    },
    {
      title: 'Media so‘rovlar: planshet va noutbuk',
      blocks: [
        'Endi kengroq ekranlar uchun qoidalarni `min-width` bilan qo‘shamiz. Menyu tugmasi uchun kichik skript ham yozamiz.',
        { code: breakpointsCss, lang: 'css', title: 'css/style.css (2-qism)', run: { html: pageHtml, css: mobileCss + '\n\n' + breakpointsCss, js: menuJs } },
        { code: menuJs, lang: 'js', title: 'js/menu.js' },
        'Natija panelini toraytirib-kengaytiring: 600px da kartochkalar ikki ustunga, 900px da to‘rt ustunga o‘tadi, menyu gorizontal bo‘ladi, yon panel o‘ngga chiqadi. Konsolda joriy kenglik ko‘rinadi.'
      ]
    },
    {
      title: 'Media so‘rovsiz moslashish: auto-fill va container query',
      blocks: [
        '`repeat(auto-fill, minmax(140px, 1fr))` — «har bir ustun kamida 140px, sig‘ganicha ko‘p ustun». Container query esa komponentni ekranga emas, o‘z konteyneriga moslaydi — bitta kartochka tor yon panelda ham, keng asosiy qismda ham to‘g‘ri ko‘rinadi.',
        { code: autoGridCss, lang: 'css', run: { html: autoGridHtml, css: autoGridCss } },
        'Pastdagi punktir ramkaning o‘ng pastki burchagidan tortib, uning kengligini o‘zgartiring — 420px dan keyin kartochka gorizontal bo‘ladi.'
      ]
    },
    {
      title: 'Moslashuvchan rasmlar',
      blocks: [
        'Telefon 2000px li rasmni yuklab olishi — trafik va vaqt isrofi. `srcset` bilan brauzerga bir nechta o‘lcham taklif qilinadi, u o‘zi mosini tanlaydi:',
        { code: '<img\n  src="img/campus-800.jpg"\n  srcset="img/campus-400.jpg 400w, img/campus-800.jpg 800w, img/campus-1600.jpg 1600w"\n  sizes="(min-width: 900px) 60vw, 100vw"\n  alt="Universitet binosi"\n  width="1600" height="900"\n  loading="lazy">\n\n<!-- Art direction: telefonda boshqa (kvadrat) kadr, zamonaviy format -->\n<picture>\n  <source media="(max-width: 599px)" srcset="img/hero-square.webp" type="image/webp">\n  <source srcset="img/hero-wide.avif" type="image/avif">\n  <source srcset="img/hero-wide.webp" type="image/webp">\n  <img src="img/hero-wide.jpg" alt="Talabalar kutubxonada" width="1600" height="600">\n</picture>', lang: 'html' },
        { note: '`width` va `height` atributlari rasm yuklanguncha joy ajratadi — sahifa «sakramaydi» (CLS ko‘rsatkichi yaxshilanadi). CSS dagi `max-width: 100%; height: auto` esa proporsiyani saqlaydi.' }
      ]
    },
    {
      title: 'Qulaylik: sensorli ekran va foydalanuvchi sozlamalari',
      blocks: [
        { code: '/* Barmoq bilan bosiladigan elementlar kamida 44×44px */\n.menu a, .btn, button { min-height: 44px; }\n\n/* Sichqoncha bor qurilmalardagina hover effekti */\n@media (hover: hover) {\n  .card:hover { box-shadow: 0 8px 24px rgb(0 0 0 / .08); transform: translateY(-2px); }\n}\n\n/* Tungi rejimni tanlagan foydalanuvchilar uchun */\n@media (prefers-color-scheme: dark) {\n  body { background: #0b1120; color: #e2e8f0; }\n  .card { border-color: #1e293b; }\n  .sidebar { background: #1e293b; }\n}\n\n/* Animatsiyani kamaytirishni so‘raganlar uchun */\n@media (prefers-reduced-motion: reduce) {\n  * { transition: none !important; animation: none !important; }\n}\n\n/* Chop etish */\n@media print {\n  .site-header, .sidebar, .btn { display: none; }\n}', lang: 'css' }
      ]
    },
    {
      title: 'Sinash: DevTools va Lighthouse',
      blocks: [
        { ol: [
          'DevTools → **Toggle device toolbar** (Ctrl+Shift+M): iPhone SE (375px), iPad (768px), Responsive rejimda 320px dan 1440px gacha tortib ko‘ring.',
          'Gorizontal aylantirish paydo bo‘lmasligini tekshiring. Chetga chiqqan elementni topish: Console da `document.querySelectorAll(\'*\').forEach(el => { if (el.scrollWidth > document.documentElement.clientWidth) console.log(el); })`.',
          'Brauzer shriftini 200% ga kattalashtiring (Ctrl +) — matn kesilmasligi va ustma-ust tushmasligi kerak.',
          '**Lighthouse** → Mobile → Performance, Accessibility, Best practices, SEO bo‘yicha hisobot oling. 90+ ball maqsad.',
          'Haqiqiy telefonda oching: Live Server da `http://<kompyuter-IP>:5500` (IP ni `ipconfig` / `ifconfig` bilan bilib oling).'
        ] }
      ]
    }
  ],
  tasks: [
    {
      title: 'Moslashuvchan jadval',
      level: 'easy',
      blocks: ['Dars jadvali jadvalini (`<table>`, 6 ustun) telefonda o‘qiladigan qiling: 600px dan tor ekranda har bir qator kartochka ko‘rinishiga o‘tsin (`data-label` atributi va `::before`).']
    },
    {
      title: 'Oldingi ishni moslashtirish',
      level: 'medium',
      blocks: ['A1–A2 da yaratgan sahifangizni mobile-first qilib qayta yozing. Oldin va keyin uchta o‘lchamdagi (375, 768, 1280px) skrinshot va Lighthouse ballarini solishtiring.']
    },
    {
      title: 'Variant bo‘yicha sahifa',
      level: 'hard',
      blocks: [
        'Jurnal raqamingiz bo‘yicha to‘liq responsive sahifa yarating (kamida 3 breakpoint, Grid va Flexbox, `srcset`, `clamp()`, mobil menyu, Lighthouse Mobile ≥ 90):',
        { ol: [
          'Onlayn do‘kon katalogi (filtr paneli mobilda yashirinadi).',
          'Universitet fakulteti sahifasi.',
          'Restoran menyusi va buyurtma formasi.',
          'Shaxsiy portfolio (loyihalar galereyasi).',
          'Yangiliklar sayti (asosiy maqola + yon ustun).',
          'Sayohat agentligi (turlar kartochkalari, xarita).',
          'Fitnes zali (tariflar jadvali → kartochkalar).',
          'Tadbir sahifasi (dastur, spikerlar, ro‘yxatdan o‘tish).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'HTML va CSS kodi (breakpointlar izohlari bilan).',
    '375px, 768px va 1280px kengliklardagi skrinshotlar.',
    'Lighthouse (Mobile) hisoboti skrinshoti.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Viewport, mobile-first asos, nisbiy birliklar va `clamp()`', '1'],
    ['Media so‘rovlar: kamida 3 ta o‘lchamda to‘g‘ri maket, mobil menyu', '1'],
    ['Grid/Flexbox, `auto-fill`/container query, moslashuvchan rasmlar', '1'],
    ['Gorizontal aylantirish yo‘q, Lighthouse Mobile ≥ 90', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Responsive dizaynning uchta asosiy tamoyilini ayting.',
    '`<meta name="viewport">` tegisiz mobil brauzer sahifani qanday ko‘rsatadi?',
    'Mobile-first va desktop-first yondashuvlarining farqi nimada? Nima uchun mobile-first tavsiya qilinadi?',
    '`px`, `em`, `rem`, `%`, `vw` birliklarining farqi?',
    '`repeat(auto-fill, minmax(200px, 1fr))` qanday ishlaydi?',
    'Media query va container query farqi nimada?',
    '`srcset` va `sizes` atributlari brauzerga qanday yordam beradi?',
    'Breakpointlarni qanday tanlash kerak?'
  ]
};
