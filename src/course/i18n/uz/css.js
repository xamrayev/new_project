/* CSS moduli (10–18-darslar) — o'zbekcha matnlar. */

const lesson10 = {
  title: 'CSS ga kirish',
  summary: 'CSS qanday ulanadi va qoida nimalardan iborat.',
  theory: [
    { lead: 'HTML tuzilma uchun javob beradi, CSS — tashqi ko‘rinish uchun: ranglar, o‘lchamlar, masofalar, joylashuv.' },
    { h: 'Qoida sintaksisi' },
    { code: 'h1 {\n  color: blue;\n  font-size: 32px;\n}\n│   │      │\n│   │      └── qiymat\n│   └───────── xossa\n└───────────── selektor' },
    { h: 'Stillarni ulashning uch usuli' },
    { table: { head: ['Usul', 'Qanday ko‘rinadi', 'Qachon'], rows: [
      ['Tashqi fayl', '`<link rel="stylesheet" href="style.css">`', 'Haqiqiy loyihalarda doim'],
      ['style tegi', '`<style>h1 { color: red; }</style>`', 'Kichik namunalar'],
      ['Inline', '`<h1 style="color: red">`', 'Nuqtali holatda, undan qochgan ma’qul']
    ] } },
    { note: 'Playground dagi **CSS** yorlig‘i ulangan tashqi fayl kabi ishlaydi — qoidalarni o‘sha yerga yozing, HTML ni o‘zgartirish shart emas.' },
    { h: 'Izohlar' },
    { code: '/* CSS dagi izoh shunday ko‘rinadi */' },
    { warn: 'Har bir e’lon nuqta-vergul bilan tugaydi. Unutilgan `;` keyingi qoidani buzadi.' }
  ],
  tasks: {
    'css-intro-1': {
      title: 'Ko‘k sarlavha',
      description: '`<h1>` ni ko‘k rangga (`blue`) bo‘yang.',
      hints: ['Selektor h1, xossa color.'],
      starter: { html: '<h1>Sarlavha</h1>\n<p>Matn paragrafi.</p>\n', css: '/* stillaringiz */\n' },
      checks: [{ label: 'Sarlavha rangi — ko‘k' }]
    },
    'css-intro-2': {
      title: 'Qorong‘i mavzu',
      description: '`body` ga `#111827` foni va `#e5e9f5` matn rangini bering.',
      hints: ['Xossalar: background-color va color.', 'Rangni hex ko‘rinishida yozish mumkin: #111827.'],
      starter: { html: '<h1>Sarlavha</h1>\n<p>Matn paragrafi.</p>\n', css: '/* stillaringiz */\n' },
      checks: [
        { label: 'Sahifa foni — #111827' },
        { label: 'Matn rangi — #e5e9f5' }
      ]
    },
    'css-intro-3': {
      title: 'Bir nechta qoida',
      description: 'Paragrafga `18px` shrift o‘lchami, `1.6` qatorlararo interval va `#555555` kulrang bering.',
      hints: ['line-height ni birliksiz son bilan berish qulay: 1.6.'],
      starter: { html: '<h1>Sarlavha</h1>\n<p>Matn paragrafi.</p>\n', css: '/* stillaringiz */\n' },
      checks: [
        { label: 'Paragraf shrifti — 18px' },
        { label: 'Qatorlararo interval — 1.6 (28.8px)' },
        { label: 'Matn rangi — #555555' }
      ]
    },
    'css-intro-4': {
      title: 'Bir nechta element uchun stillar',
      description: 'HTML ga ikkinchi `<h2>` sarlavhasi va paragraf qo‘shing. CSS da: sarlavhalarga `h1, h2` guruhlash orqali umumiy rang, sahifaga fon, paragraflarga shrift o‘lchami bering. CSS da izoh qoldiring.',
      hints: ['Guruhlash: h1, h2 { color: … }'],
      starter: { html: '<h1>Sarlavha</h1>\n<p>Matn paragrafi.</p>\n', css: '/* stillaringiz */\n' },
      solution: {
        html: '<h1>Sarlavha</h1>\n<p>Matn paragrafi.</p>\n<h2>Kichik sarlavha</h2>\n<p>Ikkinchi paragraf.</p>',
        css: '/* sarlavhalarning umumiy stillari */\nh1, h2 {\n  color: #1d4ed8;\n}\n\nbody {\n  background-color: #f4f6fb;\n}\n\np {\n  font-size: 17px;\n}'
      },
      checks: [
        { label: 'HTML da <h2> paydo bo‘ldi' },
        { label: 'Paragraflar kamida ikkita' },
        { label: 'h1 va h2 bir xil rangda' },
        { label: 'Selektorlarni guruhlash ishlatilgan' },
        { label: 'CSS da izoh bor' }
      ]
    },
    'css-intro-5': {
      title: 'Challenge: maqola muqovasi',
      description: 'Muqovani bezang: sahifaning qorong‘i foni, yorug‘ matn, yirik sarlavha (kamida 40px), boshqa rangdagi bosiq kichik sarlavha va kattalashtirilgan qatorlararo intervalli paragraf.',
      hints: ['Qorong‘i fon: RGB kanallari yig‘indisi kichik bo‘lishi kerak, masalan #0b1020.'],
      starter: {
        html: '<h1>Veb-dasturlash</h1>\n<h2>Noldan birinchi loyihagacha</h2>\n<p>Har bir darsi playground dagi amaliyot bilan tugaydigan kurs.</p>\n',
        css: ''
      },
      checks: [
        { label: 'Sahifa foni qorong‘i' },
        { label: 'Matn yorug‘' },
        { label: 'Sarlavha kamida 40px' },
        { label: 'Kichik sarlavha boshqa rangda' },
        { label: 'Paragraf intervali 1.4 dan katta' }
      ]
    }
  }
};

const lesson11 = {
  title: 'Selektorlar',
  summary: 'Klasslar, id, birikmalar, psevdoklasslar va xoslik.',
  theory: [
    { lead: 'Selektor «stil qaysi elementlarga qo‘llanadi» degan savolga javob beradi.' },
    { table: { head: ['Selektor', 'Nimani tanlaydi'], rows: [
      ['`p`', 'Barcha paragraflar'],
      ['`.card`', '`class="card"` bo‘lgan barcha elementlar'],
      ['`#main`', '`id="main"` bo‘lgan element (u yagona)'],
      ['`nav a`', 'nav **ichidagi** barcha havolalar (istalgan darajada)'],
      ['`nav > a`', 'Faqat nav ning bevosita farzandlari'],
      ['`h2 + p`', 'h2 dan keyin darhol keladigan paragraf'],
      ['`a[target="_blank"]`', 'Atribut bo‘yicha'],
      ['`h1, h2`', 'Guruhlash: ham u, ham bu']
    ] } },
    { h: 'Psevdoklasslar' },
    { code: 'a:hover      { color: red; }      /* ustiga kelganda */\nli:first-child { font-weight: bold; }\ntr:nth-child(even) { background: #eee; }\ninput:focus  { outline: 2px solid blue; }' },
    { h: 'Xoslik (specificity)' },
    { p: 'Qoidalar to‘qnashsa, «kuchliroq» selektor g‘alaba qozonadi: id (100) > klass (10) > teg (1). Kuchi teng bo‘lsa, faylda pastroqda turgani yutadi.' },
    { warn: 'Klasslar bilan stillashga harakat qiling. Stillardagi `id` ni qayta aniqlash qiyin, `!important` esa kodni boshqarib bo‘lmas holga keltiradi.' }
  ],
  tasks: {
    'css-selectors-1': {
      title: 'Klass bo‘yicha stillar',
      description: '`lead` klassli matnni `20px` o‘lchamda va `#2563eb` rangda qiling.',
      hints: ['CSS da klass nuqta bilan yoziladi: .lead { … }'],
      starter: {
        html: '<h1 id="title">Katalog</h1>\n<p class="lead">Haftaning eng yaxshi takliflari.</p>\n<ul class="menu">\n  <li><a href="#a">Birinchi</a></li>\n  <li><a href="#b">Ikkinchi</a></li>\n  <li><a href="#c">Uchinchi</a></li>\n</ul>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: '.lead shrifti — 20px' },
        { label: '.lead rangi — #2563eb' },
        { label: 'Klass bo‘yicha selektor ishlatilgan' }
      ]
    },
    'css-selectors-2': {
      title: 'id bo‘yicha selektor',
      description: '`id="title"` bo‘lgan sarlavhaga `text-transform: uppercase` va `letter-spacing: 2px` bering.',
      hints: ['CSS da id panjara bilan yoziladi: #title { … }'],
      starter: {
        html: '<h1 id="title">Katalog</h1>\n<p class="lead">Haftaning eng yaxshi takliflari.</p>\n<ul class="menu">\n  <li><a href="#a">Birinchi</a></li>\n  <li><a href="#b">Ikkinchi</a></li>\n  <li><a href="#c">Uchinchi</a></li>\n</ul>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Sarlavha bosh harflarda' },
        { label: 'Harflararo interval 2px' },
        { label: '#title selektori ishlatilgan' }
      ]
    },
    'css-selectors-3': {
      title: 'Ichma-ich selektorlar',
      description: '`.menu` ro‘yxatidagi markerlarni olib tashlang, uning **ichidagi** havolalarga esa `text-decoration: none` va `#111827` rangini bering. Menyudan tashqaridagi havolaga tegmang.',
      hints: ['Ichma-ichlik bo‘shliq orqali yoziladi: .menu a { … }'],
      starter: {
        html: '<ul class="menu">\n  <li><a href="#a">Birinchi</a></li>\n  <li><a href="#b">Ikkinchi</a></li>\n</ul>\n<p><a href="#out" class="outside">Oddiy havola</a></p>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Ro‘yxatda markerlar yo‘q' },
        { label: 'Menyu havolalari tagsiz' },
        { label: 'Menyu havolalari rangi — #111827' },
        { label: 'Menyudan tashqaridagi havola tagi chizilgan qoldi' }
      ]
    },
    'css-selectors-4': {
      title: 'Psevdoklasslar',
      description: 'Ro‘yxatning birinchi bandiga `font-weight: bold`, oxirgisiga `color: #d64545` bering, havolalar uchun esa `:hover` holatini tasvirlang.',
      hints: [
        'li:first-child va li:last-child chekka bandlarni tanlaydi.',
        'a:hover { … } sichqoncha ustiga kelganda ishlaydi.'
      ],
      starter: {
        html: '<h1 id="title">Katalog</h1>\n<p class="lead">Haftaning eng yaxshi takliflari.</p>\n<ul class="menu">\n  <li><a href="#a">Birinchi</a></li>\n  <li><a href="#b">Ikkinchi</a></li>\n  <li><a href="#c">Uchinchi</a></li>\n</ul>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Birinchi band qalin' },
        { label: 'Oxirgi band qizil' },
        { label: ':hover effekti tasvirlangan' },
        { label: ':hover ichida e’lon bor' }
      ]
    },
    'css-selectors-5': {
      title: 'Challenge: zebra-jadval',
      description: 'Jadvalni bezang: shapkada qorong‘i fon va yorug‘ matn, tananing juft qatorlari — och kulrang (`nth-child(even)`), qator ustiga kelganda — boshqa fon, kataklarda masofalar.',
      hints: [
        'tbody tr:nth-child(even) { background: … }',
        'Kataklar masofasi td va th ning padding xossasi bilan beriladi.'
      ],
      starter: {
        html: '<table>\n  <thead>\n    <tr><th>Mahsulot</th><th>Narx</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Kofe</td><td>25 000</td></tr>\n    <tr><td>Choy</td><td>18 000</td></tr>\n    <tr><td>Kakao</td><td>21 000</td></tr>\n    <tr><td>Sharbat</td><td>12 000</td></tr>\n  </tbody>\n</table>\n',
        css: 'table {\n  border-collapse: collapse;\n}\n'
      },
      checks: [
        { label: 'Shapkaning foni qorong‘i' },
        { label: 'Shapka matni yorug‘' },
        { label: 'Juft qatorlar foni bilan ajralib turadi' },
        { label: ':nth-child(even) ishlatilgan' },
        { label: 'Qator ustiga kelganda effekt bor' },
        { label: 'Kataklarda ichki masofa bor' }
      ]
    }
  }
};

const lesson12 = {
  title: 'Ranglar va tipografika',
  summary: 'Rang formatlari, shriftlar, o‘lchamlar va matnni tekislash.',
  theory: [
    { lead: 'Vebning to‘qson foizi — matn. Uni o‘qishadimi yoki yo‘qmi — buni tipografika hal qiladi.' },
    { h: 'Rang formatlari' },
    { code: 'color: red;                 /* nom */\ncolor: #2563eb;             /* hex */\ncolor: rgb(37 99 235);      /* kanallar 0–255 */\ncolor: rgb(37 99 235 / .5); /* shaffoflik bilan */\ncolor: hsl(220 90% 53%);    /* ton, to‘yinganlik, yorqinlik */' },
    { h: 'Shriftlar' },
    { code: 'body {\n  font-family: "Georgia", "Times New Roman", serif;\n}' },
    { p: 'Shriftlar ro‘yxati chapdan o‘ngga o‘qiladi: brauzer birinchi mavjudini oladi. Oxirida doim umumiy oila turadi: `serif`, `sans-serif`, `monospace`.' },
    { h: 'Asosiy xossalar' },
    { table: { head: ['Xossa', 'Misol'], rows: [
      ['`font-size`', '`18px`, `1.2rem`'],
      ['`font-weight`', '`400`, `700`, `bold`'],
      ['`line-height`', '`1.6` — birliksiz yaxshiroq'],
      ['`text-align`', '`left`, `center`, `right`, `justify`'],
      ['`text-transform`', '`uppercase`, `lowercase`, `capitalize`'],
      ['`letter-spacing`', '`0.5px`'],
      ['`text-decoration`', '`none`, `underline`']
    ] } },
    { note: '`rem` sahifa shrifti o‘lchamidan (odatda 16px), `em` esa ota element shrifti o‘lchamidan hisoblanadi.' }
  ],
  tasks: {
    'css-typography-1': {
      title: 'Sahifa shrifti',
      description: '`body` ga `Georgia, serif` shriftini bering.',
      hints: ['font-family: Georgia, serif;'],
      starter: {
        html: '<article>\n  <h1>Maqola sarlavhasi</h1>\n  <p class="meta">12-may · 4 daqiqa o‘qish</p>\n  <p>Maqolaning birinchi paragrafi, unda keyin nima haqida gap borishi tushuntiriladi.</p>\n  <p>Fikr davomi bilan ikkinchi paragraf.</p>\n</article>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'font-family ichida Georgia bor' },
        { label: 'Zaxira oila serif ko‘rsatilgan' }
      ]
    },
    'css-typography-2': {
      title: 'Turli formatdagi rang',
      description: 'Sarlavhaga hex `#1d4ed8` rangini bering, `.meta` matniga esa `rgb` formatida kulrang `rgb(107, 114, 128)` chiqadigan qilib rang bering.',
      hints: ['rgb(107, 114, 128) — bu #6b7280 bilan bir xil rang.'],
      starter: {
        html: '<article>\n  <h1>Maqola sarlavhasi</h1>\n  <p class="meta">12-may · 4 daqiqa o‘qish</p>\n  <p>Maqolaning birinchi paragrafi, unda keyin nima haqida gap borishi tushuntiriladi.</p>\n  <p>Fikr davomi bilan ikkinchi paragraf.</p>\n</article>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Sarlavha #1d4ed8' },
        { label: '.meta — rgb(107, 114, 128)' },
        { label: 'Kodda rgb( yozuvi ishlatilgan' }
      ]
    },
    'css-typography-3': {
      title: 'O‘lchamlar va qalinlik',
      description: 'Sarlavha — `36px` va `font-weight: 700`; `.meta` — `14px`, kursiv; paragraflar — `17px`, qatorlararo interval `1.7`.',
      hints: ['p:not(.meta) selektori xizmat paragrafidan boshqa paragraflarni tanlaydi.'],
      starter: {
        html: '<article>\n  <h1>Maqola sarlavhasi</h1>\n  <p class="meta">12-may · 4 daqiqa o‘qish</p>\n  <p>Maqolaning birinchi paragrafi, unda keyin nima haqida gap borishi tushuntiriladi.</p>\n  <p>Fikr davomi bilan ikkinchi paragraf.</p>\n</article>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Sarlavha 36px' },
        { label: 'Sarlavha qalinligi 700' },
        { label: '.meta — 14px' },
        { label: '.meta kursivda' },
        { label: 'Paragraflar 17px' },
        { label: 'Interval 1.7 (28.9px)' }
      ]
    },
    'css-typography-4': {
      title: 'Tekislash va registr',
      description: 'Sarlavha — markazda va bosh harflarda, `.meta` — markazda, paragraflar — kenglik bo‘yicha (`justify`), birinchi qatori `24px` chekinish bilan.',
      hints: ['text-indent qizil qatorni beradi.'],
      starter: {
        html: '<article>\n  <h1>Maqola sarlavhasi</h1>\n  <p class="meta">12-may · 4 daqiqa o‘qish</p>\n  <p>Maqolaning birinchi paragrafi, unda keyin nima haqida gap borishi tushuntiriladi.</p>\n  <p>Fikr davomi bilan ikkinchi paragraf.</p>\n</article>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Sarlavha markazda' },
        { label: 'Sarlavha bosh harflarda' },
        { label: '.meta markazda' },
        { label: 'Paragraflar kenglik bo‘yicha' },
        { label: 'Birinchi qator chekinishi 24px' }
      ]
    },
    'css-typography-5': {
      title: 'Challenge: maqola tipografikasi',
      description: 'Maqolani to‘liq bezang: zasechkasiz shrift, matn kengligi cheklangan, o‘qilishi qulay o‘lcham va interval, ifodali sarlavha, bosiq meta-qator, bosh harf — birinchi paragrafning birinchi harfi qolganlaridan yirikroq (`::first-letter`).',
      hints: [
        'Kenglikni cheklang: article { max-width: 640px; margin: 0 auto; }',
        'Bosh harf: article p:first-of-type::first-letter { font-size: 3em; }'
      ],
      starter: {
        html: '<article>\n  <h1>Maqola sarlavhasi</h1>\n  <p class="meta">12-may · 4 daqiqa o‘qish</p>\n  <p>Maqolaning birinchi paragrafi, unda keyin nima haqida gap borishi tushuntiriladi.</p>\n  <p>Fikr davomi bilan ikkinchi paragraf.</p>\n</article>\n',
        css: '/* stillaringiz */\n'
      },
      checks: [
        { label: 'Sahifa shrifti berilgan' },
        { label: 'Sarlavha 30px dan yirik' },
        { label: 'Meta-qator asosiy matndan ochroq' },
        { label: 'Asosiy matn intervali ≥ 1.5' },
        { label: 'Matn kengligi cheklangan (max-width)' },
        { label: '::first-letter ishlatilgan' },
        { label: 'Bosh harf matndan yirikroq' }
      ]
    }
  }
};

const lesson13 = {
  title: 'Blok modeli',
  summary: 'content, padding, border, margin va box-sizing.',
  theory: [
    { lead: 'Har bir element — to‘rt qatlamdan iborat to‘rtburchak. Ularning tartibini tushunish CSS ning barcha xossalarini yodlashdan muhimroq.' },
    { code: '┌─────────── margin ───────────┐\n│ ┌───────── border ─────────┐ │\n│ │ ┌─────── padding ──────┐ │ │\n│ │ │      content         │ │ │\n│ │ └──────────────────────┘ │ │\n│ └──────────────────────────┘ │\n└──────────────────────────────┘' },
    { table: { head: ['Qatlam', 'Ma’nosi'], rows: [
      ['`padding`', 'Ramka **ichidagi** havo'],
      ['`border`', 'Ramkaning o‘zi: qalinlik, uslub, rang'],
      ['`margin`', '**Tashqaridagi** masofa, elementlar orasida']
    ] } },
    { h: 'Qisqartirilgan yozuv' },
    { code: 'padding: 10px;              /* to‘rt tomondan */\npadding: 10px 20px;         /* yuqori-past | chap-o‘ng */\npadding: 10px 20px 30px 40px; /* yuqori → o‘ng → past → chap */\nborder: 2px solid #2563eb;' },
    { h: 'box-sizing' },
    { p: 'Standart holatda `width` **tarkib** kengligini beradi, padding va border esa ustiga qo‘shiladi. `box-sizing: border-box` ularni berilgan kenglik ichiga kiritadi — shunda hisoblash ancha oson.' },
    { code: '*, *::before, *::after {\n  box-sizing: border-box;\n}' },
    { note: 'Qo‘shni bloklarning vertikal margin lari birlashadi: 20px va 30px 50px emas, 30px beradi.' }
  ],
  tasks: {
    'css-box-model-1': {
      title: 'Ichki masofalar',
      description: 'Kartaga `padding: 20px` bering.',
      hints: ['padding ning bitta qiymati to‘rt tomonga ham qo‘llanadi.'],
      starter: { html: '<div class="card">\n  <h2>Karta</h2>\n  <p>Mahsulotning qisqa tavsifi.</p>\n</div>\n' },
      checks: [
        { label: 'Yuqoridan padding 20px' },
        { label: 'Chapdan padding 20px' },
        { label: 'O‘ngdan padding 20px' },
        { label: 'Pastdan padding 20px' }
      ]
    },
    'css-box-model-2': {
      title: 'Ramka va yumaloqlash',
      description: 'Kartaga `2px solid #2563eb` ramkasi va `12px` burchak yumaloqligini qo‘shing.',
      hints: ['border: 2px solid #2563eb; va border-radius: 12px;'],
      starter: { html: '<div class="card">\n  <h2>Karta</h2>\n  <p>Mahsulotning qisqa tavsifi.</p>\n</div>\n' },
      checks: [
        { label: 'Ramka qalinligi 2px' },
        { label: 'Ramka uslubi solid' },
        { label: 'Ramka rangi #2563eb' },
        { label: 'Yumaloqlik 12px' }
      ]
    },
    'css-box-model-3': {
      title: 'Kenglik va box-sizing',
      description: 'Kartaga `width: 300px`, `padding: 24px`, `1px` ramka bering va `box-sizing: border-box` ni yoqing — ekrandagi yakuniy kenglik aynan 300px bo‘lib qolishi kerak.',
      hints: ['border-box bo‘lmasa kenglik 300 + 48 + 2 = 350px bo‘lardi.'],
      starter: { html: '<div class="card">\n  <h2>Karta</h2>\n  <p>Mahsulotning qisqa tavsifi.</p>\n</div>\n' },
      checks: [
        { label: 'box-sizing: border-box' },
        { label: 'Ichki masofa 24px' },
        { label: 'Ramka 1px' },
        { label: 'Haqiqiy kenglik aynan 300px' }
      ]
    },
    'css-box-model-4': {
      title: 'Tashqi masofalar va markazlash',
      description: 'Kartani `320px` kenglik bilan cheklang va `margin: 0 auto` orqali gorizontal markazlang. Kartalar orasida `24px` vertikal masofa bo‘lsin.',
      hints: [
        'margin: 0 auto kengligi berilgan blokni markazlaydi.',
        'margin larning birlashuvi tufayli bitta margin-bottom: 24px yetarli.'
      ],
      starter: { html: '<div class="card">\n  <h2>Birinchi</h2>\n</div>\n<div class="card">\n  <h2>Ikkinchi</h2>\n</div>\n' },
      checks: [
        { label: 'Karta kengligi 320px' },
        { label: 'Karta markazlashtirilgan' },
        { label: 'margin: auto ishlatilgan' },
        { label: 'Kartalar orasi 24px' }
      ]
    },
    'css-box-model-5': {
      title: 'Challenge: mahsulot kartasi',
      description: 'Mahsulot kartasini verstka qiling: kengligi 280px, och fon, ramka, 16px yumaloqlik, 20px ichki masofalar, soya, yuqori masofasi olib tashlangan sarlavha va o‘z padding hamda border-radius i bo‘lgan tugma.',
      hints: [
        'box-shadow: 0 8px 24px rgba(20, 30, 60, .12);',
        'box-sizing: border-box ni unutmang, aks holda padding kartani kengaytiradi.'
      ],
      starter: {
        html: '<div class="card">\n  <h2>Kofemashina</h2>\n  <p>30 soniyada espresso tayyorlaydi.</p>\n  <button class="buy">Sotib olish</button>\n</div>\n',
        css: ''
      },
      checks: [
        { label: 'Karta kengligi 280px' },
        { label: 'Ichki masofalar 20px' },
        { label: 'Yumaloqlik 16px' },
        { label: 'Ramka bor' },
        { label: 'Soya bor' },
        { label: 'Sarlavhaning yuqori masofasi olib tashlangan' },
        { label: 'Tugmada padding bor' },
        { label: 'Tugma burchaklari yumaloqlangan' }
      ]
    }
  }
};

const lesson14 = {
  title: 'Display va joylashtirish',
  summary: 'block, inline, none va position ning beshta qiymati.',
  theory: [
    { lead: '`display` xossasi element oqimda qanday tutishini, `position` esa u bu oqimdan qanday chiqishini belgilaydi.' },
    { table: { head: ['display', 'Xatti-harakati'], rows: [
      ['`block`', 'Butun kenglikni egallaydi, yangi qatordan boshlanadi (`div`, `p`, `h1`)'],
      ['`inline`', 'Qator ichida, kenglik va vertikal masofalarni berib bo‘lmaydi (`span`, `a`)'],
      ['`inline-block`', 'Qator ichida, lekin o‘lchamlar beriladi'],
      ['`none`', 'Element butunlay yo‘qoladi, joy egallamaydi'],
      ['`flex` / `grid`', 'Farzandlar uchun joylashuvni yoqadi — keyingi darslar']
    ] } },
    { h: 'position' },
    { table: { head: ['Qiymat', 'Koordinatalar qanday hisoblanadi'], rows: [
      ['`static`', 'Standart, `top/left` ishlamaydi'],
      ['`relative`', 'O‘z joyidan siljish, oqimdagi joyi saqlanadi'],
      ['`absolute`', '`position` i `static` bo‘lmagan eng yaqin ajdoddan; oqimdan chiqadi'],
      ['`fixed`', 'Brauzer oynasidan, aylantirilganda qimirlamaydi'],
      ['`sticky`', 'Berilgan chegaraga yetguncha oddiy — keyin «yopishib qoladi»']
    ] } },
    { note: 'Klassik usul: ota elementga `position: relative`, ichidagi belgiga `position: absolute; top: 8px; right: 8px`.' },
    { warn: '`visibility: hidden` elementni yashiradi, lekin bo‘sh joyni qoldiradi. `display: none` uni butunlay olib tashlaydi.' }
  ],
  tasks: {
    'css-display-position-1': {
      title: 'inline-block',
      description: '`.tag` teglarini `120px` kenglik va `40px` balandlikdagi `inline-block` elementlarga aylantiring.',
      hints: ['Oddiy inline elementda width va height ishlamaydi.'],
      starter: {
        html: '<div class="box">Blok</div>\n<span class="tag">Teg</span>\n<span class="tag">Yana bittasi</span>\n',
        css: '.box {\n  background: #dbeafe;\n}\n\n.tag {\n  background: #fde68a;\n}\n'
      },
      solution: { css: '.box {\n  background: #dbeafe;\n}\n\n.tag {\n  background: #fde68a;\n  display: inline-block;\n  width: 120px;\n  height: 40px;\n}' },
      checks: [
        { label: 'display: inline-block' },
        { label: 'Kenglik 120px' },
        { label: 'Balandlik 40px' },
        { label: 'Teglar bitta qatorda turibdi' }
      ]
    },
    'css-display-position-2': {
      title: 'Elementni yashirish',
      description: '`secret` klassli elementni joy egallamaydigan qilib yashiring, `.ghost` ni esa ko‘rinmas qiling, lekin uning oqimdagi joyini qoldiring.',
      hints: ['display: none elementni olib tashlaydi, visibility: hidden — faqat yashiradi.'],
      starter: {
        html: '<p class="secret">Meni ko‘rinmasligim kerak</p>\n<p class="ghost">Men ko‘rinmasman, lekin joy egallayman</p>\n<p class="visible">Men ko‘rinaman</p>\n',
        css: ''
      },
      checks: [
        { label: '.secret display: none orqali yashirilgan' },
        { label: '.ghost visibility orqali ko‘rinmas' },
        { label: '.secret joy egallamaydi' },
        { label: '.ghost joyini saqlab qoldi' }
      ]
    },
    'css-display-position-3': {
      title: 'Karta burchagidagi belgi',
      description: '`.badge` belgisini kartaning o‘ng yuqori burchagiga bosing: ota elementga — `position: relative`, belgiga — yuqoridan va o‘ngdan `8px` masofali `absolute`.',
      hints: ['Ota elementda position bo‘lmasa, absolut element oyna chetiga «uchib ketadi».'],
      starter: {
        html: '<div class="card">\n  <span class="badge">NEW</span>\n  <h2>Mahsulot</h2>\n  <p>Mahsulot tavsifi.</p>\n</div>\n',
        css: '.card {\n  width: 300px;\n  padding: 20px;\n  background: #f1f5f9;\n  box-sizing: border-box;\n}\n\n.badge {\n  background: #ef4444;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 999px;\n}\n'
      },
      solution: {
        css: '.card {\n  width: 300px;\n  padding: 20px;\n  background: #f1f5f9;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.badge {\n  background: #ef4444;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 999px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}'
      },
      checks: [
        { label: 'Kartada position: relative' },
        { label: 'Belgida position: absolute' },
        { label: 'Belgi yuqori chetga bosilgan' },
        { label: 'Belgi o‘ng chetga bosilgan' }
      ]
    },
    'css-display-position-4': {
      title: 'Qotirilgan shapka',
      description: 'Shapkani ekran yuqorisiga qotiring (`position: fixed`, butun oyna kengligida, `z-index: 10`) va matn shapka ostida qolmasligi uchun tarkibga yuqoridan masofa qo‘shing.',
      hints: ['left: 0; right: 0 shapkani butun kenglikka yoyadi.', 'Kontentga masofa: padding-top shapka balandligidan kam bo‘lmasin.'],
      starter: {
        html: '<header class="topbar">Sayt shapkasi</header>\n<main class="content">\n  <p>Birinchi paragraf to‘liq ko‘rinishi kerak.</p>\n  <p>Keyin uzun matn keladi…</p>\n</main>\n',
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px;\n  height: 56px;\n  box-sizing: border-box;\n}\n'
      },
      solution: {
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px;\n  height: 56px;\n  box-sizing: border-box;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n}\n\n.content {\n  padding-top: 72px;\n}'
      },
      checks: [
        { label: 'Shapka qotirilgan' },
        { label: 'Shapka yuqoriga bosilgan' },
        { label: 'z-index kamida 10' },
        { label: 'Shapka butun kenglikka yoyilgan' },
        { label: 'Kontent shapka ostiga yashirinmaydi' }
      ]
    },
    'css-display-position-5': {
      title: 'Challenge: yopishqoq panel va overley',
      description: '`.toolbar` panelini yopishqoq qiling (`sticky`, `top: 0`), `.modal` modal oynasini esa qoraytirish ustida ekran markaziga joylang: `.overlay` butun ekranda yarim shaffof fon bilan, ichidagi `.modal` — markazda.',
      hints: [
        'Overley: position: fixed; inset: 0; background: rgba(0,0,0,.5);',
        'Overley tarkibini markazlashning eng oson yo‘li — display: flex; align-items: center; justify-content: center.'
      ],
      starter: {
        html: '<div class="toolbar">Asboblar paneli</div>\n<div class="long">\n  <p>Sahifa matni…</p>\n</div>\n<div class="overlay">\n  <div class="modal">\n    <h3>Amalni tasdiqlang</h3>\n    <button>OK</button>\n  </div>\n</div>\n',
        css: '.toolbar {\n  background: #e2e8f0;\n  padding: 12px;\n}\n\n.long {\n  height: 600px;\n}\n\n.modal {\n  background: #fff;\n  padding: 24px;\n  width: 280px;\n  box-sizing: border-box;\n}\n'
      },
      checks: [
        { label: 'Panel yopishqoq' },
        { label: 'Panelda top berilgan' },
        { label: 'Overley butun ekranga yoyilgan' },
        { label: 'Overley qotirilgan' },
        { label: 'Overley foni yarim shaffof' },
        { label: 'Modal gorizontal markazda' },
        { label: 'Modal vertikal markazda' }
      ]
    }
  }
};

const lesson15 = {
  title: 'Flexbox',
  summary: 'Bir o‘lchamli joylashuv: yo‘nalish, tekislash, oraliqlar.',
  theory: [
    { lead: 'Flexbox elementlarni bitta o‘q bo‘ylab joylashtiradi va verstkaning asosiy og‘rig‘ini — tekislashni hal qiladi.' },
    { code: '.container {\n  display: flex;\n  flex-direction: row;      /* row | column */\n  justify-content: center;  /* asosiy o‘q bo‘ylab */\n  align-items: center;      /* asosiy o‘qqa ko‘ndalang */\n  gap: 16px;\n  flex-wrap: wrap;\n}' },
    { h: 'Asosiy va ko‘ndalang o‘q' },
    { p: '`flex-direction: row` da asosiy o‘q gorizontal: `justify-content` gorizontal bo‘ylab, `align-items` vertikal bo‘ylab suradi. `column` da ular o‘rin almashadi.' },
    { table: { head: ['justify-content', 'Natija'], rows: [
      ['`flex-start`', 'Hammasi boshiga'],
      ['`center`', 'Markazga'],
      ['`space-between`', 'Chetlar bosilgan, oraliqlar teng'],
      ['`space-around` / `space-evenly`', 'Oraliqlar chetlarda ham']
    ] } },
    { h: 'Elementlarning xossalari' },
    { code: '.item {\n  flex: 1;          /* bo‘sh joyni teng egallash */\n  flex-grow: 2;     /* qo‘shnilardan ikki barobar tez o‘sish */\n  flex-shrink: 0;   /* siqilmaslik */\n  flex-basis: 200px;/* bazaviy o‘lcham */\n  align-self: flex-end;\n}' },
    { note: 'Ikkala o‘q bo‘yicha markazlash: `display: flex; justify-content: center; align-items: center;` — eski hiyla-nayranglar o‘rniga uch qator.' }
  ],
  tasks: {
    'css-flexbox-1': {
      title: 'flex ni yoqamiz',
      description: '`.row` ni fleks-konteynerga aylantiring — elementlar bir qatorga tizilishi kerak.',
      hints: ['Bitta xossa: display: flex.'],
      checks: [
        { label: 'display: flex' },
        { label: 'Elementlar bitta qatorda' }
      ]
    },
    'css-flexbox-2': {
      title: 'Oraliqlar',
      description: 'Elementlar orasiga `gap: 16px` oralig‘ini qo‘shing.',
      hints: ['gap ham flex da, ham grid da ishlaydi — endi margin kerak emas.'],
      checks: [
        { label: 'gap: 16px' },
        { label: 'Elementlar orasidagi masofa 16px' }
      ]
    },
    'css-flexbox-3': {
      title: 'Mukammal markazlash',
      description: 'Elementlarni konteyner markaziga — ham gorizontal, ham vertikal bo‘yicha joylang.',
      hints: ['justify-content — qator bo‘ylab, align-items — ko‘ndalang.'],
      checks: [
        { label: 'justify-content: center' },
        { label: 'align-items: center' },
        { label: 'Guruh haqiqatan markazda' }
      ]
    },
    'css-flexbox-4': {
      title: 'Shapka: logotip chapda, menyu o‘ngda',
      description: 'Logotip bilan menyuni chetlarga ajrating (`space-between`), vertikal bo‘yicha markazga tekislang, menyu bandlarini esa `20px` oraliq bilan bir qatorga qo‘ying.',
      hints: ['Fleks-konteyner bir nechta bo‘lishi mumkin: ham shapka, ham menyuning o‘zi.'],
      starter: {
        html: '<header class="topbar">\n  <div class="logo">LOGO</div>\n  <ul class="menu">\n    <li><a href="#a">Bosh sahifa</a></li>\n    <li><a href="#b">Blog</a></li>\n    <li><a href="#c">Kontaktlar</a></li>\n  </ul>\n</header>\n',
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px 24px;\n}\n\n.menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.menu a {\n  color: #fff;\n  text-decoration: none;\n}\n'
      },
      solution: {
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  gap: 20px;\n}\n\n.menu a {\n  color: #fff;\n  text-decoration: none;\n}'
      },
      checks: [
        { label: 'Shapka — fleks-konteyner' },
        { label: 'Logotip va menyu orasida space-between' },
        { label: 'Vertikal bo‘yicha markazga tekislash' },
        { label: 'Menyu ham — flex' },
        { label: 'Menyudagi oraliq 20px' },
        { label: 'Logotip chapda, menyu o‘ngda' }
      ]
    },
    'css-flexbox-5': {
      title: 'Challenge: moslashuvchan kartalar',
      description: 'To‘rtta kartani ko‘chirish bilan bir qatorga joylang: `flex-wrap: wrap`, 20px oraliq, har bir karta kenglikning taxminan yarmini egallaydi (`flex: 1 1 45%`), kartalar bir xil balandlikda, ichidagi tugma esa karta pastiga bosilgan.',
      hints: [
        'Kartaga: display: flex; flex-direction: column; flex: 1 1 45%;',
        'Tugmaga: margin-top: auto — u pastga tushadi.'
      ],
      starter: {
        html: '<div class="cards">\n  <article class="card"><h3>Birinchi</h3><p>Qisqa matn.</p><button>Ochish</button></article>\n  <article class="card"><h3>Ikkinchi</h3><p>Balandligi farq qilishi uchun birinchisidan uzunroq matn.</p><button>Ochish</button></article>\n  <article class="card"><h3>Uchinchi</h3><p>Yana bitta karta.</p><button>Ochish</button></article>\n  <article class="card"><h3>To‘rtinchi</h3><p>Va oxirgisi.</p><button>Ochish</button></article>\n</div>\n',
        css: '.card {\n  background: #f1f5f9;\n  padding: 16px;\n  box-sizing: border-box;\n}\n'
      },
      checks: [
        { label: 'Konteyner — ko‘chirishli flex' },
        { label: 'Oraliq 20px' },
        { label: 'Kartalar qatorda ikkitadan joylashdi' },
        { label: 'Qatordagi kartalar bir xil balandlikda' },
        { label: 'Karta — vertikal flex' },
        { label: 'Tugmalar kartalarning pastiga bosilgan' }
      ]
    }
  }
};

const lesson16 = {
  title: 'CSS Grid',
  summary: 'Ikki o‘lchamli joylashuv: ustunlar, qatorlar, sohalar.',
  theory: [
    { lead: 'Flexbox bitta o‘q bo‘ylab ishlaydi, Grid esa — birdaniga ikkitasi bo‘yicha: qatorlar va ustunlar aniq beriladi.' },
    { code: '.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;\n  grid-template-rows: auto 1fr;\n  gap: 16px;\n}' },
    { h: 'fr birligi' },
    { p: '`1fr` — bu bo‘sh joyning ulushi. `repeat(3, 1fr)` — uchta teng ustun. `minmax(200px, 1fr)` — 200px dan tor emas, lekin cho‘ziladi.' },
    { h: 'Elementlarni joylashtirish' },
    { code: '.hero {\n  grid-column: 1 / 3;   /* 1-chiziqdan 3-chiziqqacha */\n  grid-column: span 2;  /* ikkita ustunni egallash */\n  grid-row: 1 / 3;\n}' },
    { h: 'Nomlangan sohalar' },
    { code: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar content";\n}\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }' },
    { note: 'Mediazaprossiz avtomatik moslashuvchan setka: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`' }
  ],
  tasks: {
    'css-grid-1': {
      title: 'Uchta ustun',
      description: '`.grid` ni `12px` oraliqli uchta teng ustunli setkaga aylantiring.',
      hints: ['grid-template-columns: repeat(3, 1fr);'],
      starter: {
        html: '<div class="grid">\n  <div class="cell">1</div>\n  <div class="cell">2</div>\n  <div class="cell">3</div>\n  <div class="cell">4</div>\n  <div class="cell">5</div>\n  <div class="cell">6</div>\n</div>\n',
        css: '.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n'
      },
      solution: { css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}' },
      checks: [
        { label: 'display: grid' },
        { label: 'Uchta ustun' },
        { label: 'Ustunlar bir xil kenglikda' },
        { label: 'Oraliq 12px' }
      ]
    },
    'css-grid-2': {
      title: 'Keng birinchi katak',
      description: 'Birinchi katak uchta ustundan ikkitasini egallasin.',
      hints: ['.cell:first-child { grid-column: span 2; }'],
      starter: {
        html: '<div class="grid">\n  <div class="cell">1</div>\n  <div class="cell">2</div>\n  <div class="cell">3</div>\n  <div class="cell">4</div>\n  <div class="cell">5</div>\n  <div class="cell">6</div>\n</div>\n',
        css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n'
      },
      solution: { css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n\n.cell:first-child {\n  grid-column: span 2;\n}' },
      checks: [
        { label: 'Birinchi katak qolganlaridan keng' },
        { label: 'grid-column ishlatilgan' },
        { label: 'Qolgan kataklar o‘zgarmadi' }
      ]
    },
    'css-grid-3': {
      title: 'Har xil kenglikdagi ustunlar',
      description: 'Ikki ustunli setka tuzing: yon ustun aynan `200px`, asosiysi qolgan joyni egallaydi. Oraliq — `24px`, qatorlar avtomatik hosil bo‘ladi.',
      hints: ['grid-template-columns: 200px 1fr;'],
      starter: {
        html: '<div class="layout">\n  <aside class="side">Sidebar</aside>\n  <main class="content">Kontent</main>\n  <aside class="side">Yana blok</aside>\n  <main class="content">Yana kontent</main>\n</div>\n',
        css: '.side { background: #fde68a; padding: 16px; }\n.content { background: #bbf7d0; padding: 16px; }\n'
      },
      solution: { css: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  gap: 24px;\n}\n\n.side { background: #fde68a; padding: 16px; }\n.content { background: #bbf7d0; padding: 16px; }' },
      checks: [
        { label: 'Setka yoqilgan' },
        { label: 'Birinchi ustun 200px' },
        { label: 'Ikkinchi ustun qolgan joyni egallaydi' },
        { label: 'Oraliq 24px' },
        { label: 'Ikkita qator hosil bo‘ldi' }
      ]
    },
    'css-grid-4': {
      title: 'Nomlangan sohalar',
      description: '`grid-template-areas` orqali klassik maketni yig‘ing: shapka butun kenglikda, chapda 220px sidebar, o‘ngda kontent, pastda butun kenglikdagi futer.',
      hints: [
        'Avval setkani tasvirlang: grid-template-columns: 220px 1fr;',
        'So‘ng sohalarni: "head head" / "side main" / "foot foot".'
      ],
      starter: {
        html: '<div class="page">\n  <header class="head">Shapka</header>\n  <nav class="side">Menyu</nav>\n  <main class="main">Kontent</main>\n  <footer class="foot">Futer</footer>\n</div>\n',
        css: '.head { background: #c7d2fe; padding: 12px; }\n.side { background: #fde68a; padding: 12px; }\n.main { background: #bbf7d0; padding: 12px; }\n.foot { background: #e2e8f0; padding: 12px; }\n'
      },
      solution: {
        css: '.page {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n  gap: 12px;\n}\n\n.head { background: #c7d2fe; padding: 12px; grid-area: head; }\n.side { background: #fde68a; padding: 12px; grid-area: side; }\n.main { background: #bbf7d0; padding: 12px; grid-area: main; }\n.foot { background: #e2e8f0; padding: 12px; grid-area: foot; }'
      },
      checks: [
        { label: 'grid-template-areas ishlatilgan' },
        { label: 'Shapka butun kenglikda' },
        { label: 'Sidebar kengligi 220px' },
        { label: 'Kontent sidebar dan o‘ngda' },
        { label: 'Sidebar va kontent bitta qatorda' },
        { label: 'Futer pastda va butun kenglikda' }
      ]
    },
    'css-grid-5': {
      title: 'Challenge: mediazaprossiz moslashuvchan galereya',
      description: 'Kenglikka o‘zi moslashadigan kartalar setkasini qiling: `repeat(auto-fit, minmax(220px, 1fr))`, 20px oraliq, birinchi karta — setkaning butun kengligida, kartalar bir xil balandlikda.',
      hints: [
        'grid-column: 1 / -1 elementni barcha ustunlarga cho‘zadi.',
        'auto-fit nechta ustun sig‘ishini o‘zi hal qiladi.'
      ],
      starter: {
        html: '<div class="gallery">\n  <article class="tile featured"><h3>Asosiy</h3></article>\n  <article class="tile"><h3>Bir</h3></article>\n  <article class="tile"><h3>Ikki</h3></article>\n  <article class="tile"><h3>Uch</h3></article>\n  <article class="tile"><h3>To‘rt</h3></article>\n</div>\n',
        css: '.tile {\n  background: #ddd6fe;\n  padding: 16px;\n}\n'
      },
      solution: {
        css: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n\n.tile {\n  background: #ddd6fe;\n  padding: 16px;\n}\n\n.featured {\n  grid-column: 1 / -1;\n}'
      },
      checks: [
        { label: 'Setka yoqilgan' },
        { label: 'minmax bilan auto-fit ishlatilgan' },
        { label: 'Ustunning eng kichik kengligi 220px' },
        { label: 'Oraliq 20px' },
        { label: 'Birinchi karta butun kenglikda' },
        { label: 'Qolgan kartalar bir xil balandlikda' }
      ]
    }
  }
};

const lesson17 = {
  title: 'Moslashuvchan verstka',
  summary: 'Mediazaproslar, moslashuvchan birliklar va rasmlar, mobile first.',
  theory: [
    { lead: 'Moslashuvchanlik — bu telefon uchun alohida sayt emas, balki o‘zgara oladigan bitta maket.' },
    { h: 'Mediazapros' },
    { code: '/* bazaviy stillar — tor ekranlar uchun */\n.cards { grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1200px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n}' },
    { h: 'Mobile first' },
    { p: 'Avval tor ekran uchun stillar yoziladi, so‘ng `min-width` orqali keng ekranda kerak bo‘lgani qo‘shiladi. Shunda CSS qisqaroq va qayta aniqlashlarsiz chiqadi.' },
    { h: 'Moslashuvchan birliklar' },
    { table: { head: ['Birlik', 'Nimadan hisoblanadi'], rows: [
      ['`%`', 'Ota element o‘lchamidan'],
      ['`rem`', 'Sahifa shrifti o‘lchamidan'],
      ['`vw` / `vh`', 'Oyna kengligi / balandligining 1% i'],
      ['`clamp(min, ideal, max)`', 'Chegaralar orasiga siqilgan qiymat']
    ] } },
    { h: 'Rezina rasm' },
    { code: 'img {\n  max-width: 100%;\n  height: auto;\n}' },
    { note: '`<meta name="viewport" content="width=device-width, initial-scale=1">` bo‘lmasa, telefon kichraytirilgan «stol» versiyasini ko‘rsatadi va mediazaproslar ishlamaydi.' }
  ],
  tasks: {
    'css-responsive-1': {
      title: 'Birinchi mediazapros',
      description: 'Standart holatda kartalar bitta ustunda boradi. `min-width: 768px` mediazaprosini qo‘shing, unda ustunlar ikkita bo‘lsin.',
      hints: [
        'Avval .cards ni mediazaprossiz tasvirlang, so‘ng @media blokini yozing.',
        '@media (min-width: 768px) { .cards { … } }'
      ],
      starter: {
        html: '<div class="cards">\n  <div class="card">1</div>\n  <div class="card">2</div>\n  <div class="card">3</div>\n  <div class="card">4</div>\n</div>\n',
        css: '.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n'
      },
      solution: {
        css: '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}'
      },
      checks: [
        { label: 'Bazaviy holatda bitta ustun' },
        { label: '@media (min-width: 768px) bor' },
        { label: 'Mediazaprosda ikkita ustun' },
        { label: 'Setka yoqilgan' }
      ]
    },
    'css-responsive-2': {
      title: 'Rezina rasm',
      description: 'Rasmni rezina qiling: `max-width: 100%` va `height: auto` — shunda u hech qachon konteynerdan chiqib ketmaydi.',
      hints: ['Ikkala xossa ham img selektoriga beriladi.'],
      starter: {
        html: '<div class="frame">\n  <img src="photos/wide.jpg" alt="Shahar panoramasi">\n</div>\n',
        css: '.frame {\n  width: 260px;\n  border: 2px solid #334155;\n}\n'
      },
      solution: {
        css: '.frame {\n  width: 260px;\n  border: 2px solid #334155;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}'
      },
      checks: [
        { label: 'max-width: 100% berilgan' },
        { label: 'Balandlik auto qilingan' },
        { label: 'Rasm konteynerdan keng emas' },
        { label: 'Nisbatlar saqlangan' }
      ]
    },
    'css-responsive-3': {
      title: 'Uchta nazorat nuqtasi',
      description: 'Mobile first: standart holatda bitta ustun, `600px` dan — ikkita, `1024px` dan — to‘rtta. Oraliqni bazaviy stillarda bir marta bering.',
      hints: ['Mobile first — bu doim min-width.'],
      starter: {
        html: '<div class="cards">\n  <div class="card">1</div>\n  <div class="card">2</div>\n  <div class="card">3</div>\n  <div class="card">4</div>\n</div>\n',
        css: '.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n'
      },
      solution: {
        css: '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n\n@media (min-width: 600px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1024px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n}'
      },
      checks: [
        { label: 'Bazaviy holatda bitta ustun' },
        { label: '600px nuqtasi bor' },
        { label: '1024px nuqtasi bor' },
        { label: 'Oraliq bazaviy stillarda berilgan' },
        { label: 'max-width emas, min-width ishlatilgan' }
      ]
    },
    'css-responsive-4': {
      title: 'Moslashuvchan tipografika',
      description: 'Sarlavhaga `clamp(24px, 5vw, 48px)` orqali o‘lcham bering, matn kengligini `rem` da cheklang va ichki masofalarni kenglikning foizida qo‘shing.',
      hints: [
        'clamp(eng kichik, moslashuvchan qiymat, eng katta).',
        '1rem = 16px, shuning uchun 40rem ≈ 640px.'
      ],
      starter: {
        html: '<article class="post">\n  <h1>Moslashadigan sarlavha</h1>\n  <p>O‘qish qulay bo‘lishi uchun kengligi cheklangan maqola matni.</p>\n</article>\n',
        css: ''
      },
      checks: [
        { label: 'font-size uchun clamp() ishlatilgan' },
        { label: 'Sarlavha o‘lchami maqbul oraliqda' },
        { label: 'Maqola kengligi rem da cheklangan' },
        { label: 'Masofalar foizda berilgan' },
        { label: 'Maqola o‘z maksimumidan keng emas' }
      ]
    },
    'css-responsive-5': {
      title: 'Challenge: moslashuvchan shapka',
      description: 'Shapka qayta tuzilishi kerak: tor ekranda logotip va menyu ustunda boradi va menyu butun kenglikni egallaydi, `768px` dan — `space-between` bilan bir qatorda. Qo‘shimcha ravishda `.promo` ni 480px dan tor ekranlarda yashiring.',
      hints: [
        'Bazaviy stillar — telefon uchun, @media (min-width: 768px) — desktop uchun.',
        'Promo ni yashirish uchun alohida @media (max-width: 480px) kerak bo‘ladi.'
      ],
      starter: {
        html: '<header class="topbar">\n  <div class="logo">LOGO</div>\n  <p class="promo">Hafta oxirigacha 20% chegirma</p>\n  <nav class="menu">\n    <a href="#a">Bosh sahifa</a>\n    <a href="#b">Katalog</a>\n    <a href="#c">Kontaktlar</a>\n  </nav>\n</header>\n',
        css: '.topbar {\n  background: #0f172a;\n  color: #fff;\n  padding: 16px;\n}\n\n.menu a {\n  color: #fff;\n  margin-right: 12px;\n}\n'
      },
      solution: {
        css: '.topbar {\n  background: #0f172a;\n  color: #fff;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.menu {\n  display: flex;\n  gap: 12px;\n}\n\n.menu a {\n  color: #fff;\n}\n\n@media (min-width: 768px) {\n  .topbar {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n}\n\n@media (max-width: 480px) {\n  .promo {\n    display: none;\n  }\n}'
      },
      checks: [
        { label: 'Bazaviy holatda shapka — ustun' },
        { label: 'Shapka — fleks-konteyner' },
        { label: '768px dan — qator' },
        { label: '768px dan — space-between' },
        { label: 'Promo tor ekranlarda yashiriladi' },
        { label: 'Menyu — flex' }
      ]
    }
  }
};

const lesson18 = {
  title: 'Zamonaviy CSS',
  summary: 'O‘zgaruvchilar, calc, o‘tishlar, transformatsiyalar va gradientlar.',
  theory: [
    { lead: 'CSS ni deyarli dasturlash tiliga aylantiradigan bir nechta imkoniyat.' },
    { h: 'O‘zgaruvchilar' },
    { code: ':root {\n  --brand: #2563eb;\n  --radius: 12px;\n}\n\n.button {\n  background: var(--brand);\n  border-radius: var(--radius);\n}' },
    { h: 'calc()' },
    { code: 'width: calc(100% - 40px);\nheight: calc(100vh - 56px);' },
    { h: 'O‘tishlar va transformatsiyalar' },
    { code: '.button {\n  transition: transform .2s ease, background-color .2s ease;\n}\n\n.button:hover {\n  transform: translateY(-2px) scale(1.03);\n}' },
    { h: 'Gradientlar va soyalar' },
    { code: 'background: linear-gradient(135deg, #6366f1, #ec4899);\nbox-shadow: 0 10px 30px rgb(0 0 0 / .25);' },
    { note: 'O‘zgaruvchilar meros bo‘lib o‘tadi: ularni `:root` da e’lon qiling — va hamma joyda mavjud bo‘ladi. Ularni hatto mediazapros ichida ham o‘zgartirish mumkin.' }
  ],
  tasks: {
    'css-modern-1': {
      title: 'Mavzu o‘zgaruvchilari',
      description: '`:root` da `--brand: #2563eb` va `--radius: 10px` o‘zgaruvchilarini e’lon qiling va ularni tugmaga qo‘llang (fon va yumaloqlik).',
      hints: [':root { --brand: #2563eb; } va .btn { background-color: var(--brand); }'],
      starter: { html: '<button class="btn">Tugma</button>\n<div class="panel">Panel</div>\n', css: '/* stillaringiz */\n' },
      checks: [
        { label: '--brand o‘zgaruvchisi e’lon qilingan' },
        { label: '--radius o‘zgaruvchisi e’lon qilingan' },
        { label: 'Tugma var(--brand) dan foydalanadi' },
        { label: 'Tugma foni — #2563eb' },
        { label: 'Yumaloqlik 10px' }
      ]
    },
    'css-modern-2': {
      title: 'calc()',
      description: 'Panelga `calc(100% - 40px)` kengligi va `calc(100vh - 120px)` balandligini bering.',
      hints: ['calc ichidagi minus belgisi atrofida bo‘shliqlar majburiy: calc(100% - 40px).'],
      starter: { html: '<button class="btn">Tugma</button>\n<div class="panel">Panel</div>\n', css: '/* stillaringiz */\n' },
      solution: { css: '.panel {\n  width: calc(100% - 40px);\n  height: calc(100vh - 120px);\n  background: #e2e8f0;\n}' },
      checks: [
        { label: 'Kenglik calc orqali' },
        { label: 'Balandlik calc orqali' },
        { label: 'Kenglik haqiqatan ota elementdan 40px kichik' }
      ]
    },
    'css-modern-3': {
      title: 'Silliq tugma',
      description: 'Tugmaga `.2s` davomiylikdagi `transition` va ustiga kelgandagi effektni qo‘shing: `transform: translateY(-2px)` va to‘qroq fon.',
      hints: ['transition: transform .2s ease, background-color .2s ease;'],
      starter: {
        html: '<button class="btn">Tugma</button>\n<div class="panel">Panel</div>\n',
        css: '.btn {\n  background-color: #2563eb;\n  color: #fff;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 10px;\n}\n'
      },
      solution: {
        css: '.btn {\n  background-color: #2563eb;\n  color: #fff;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 10px;\n  transition: transform .2s ease, background-color .2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  background-color: #1d4ed8;\n}'
      },
      checks: [
        { label: 'transition berilgan' },
        { label: 'Davomiyligi 0.2s' },
        { label: '.btn:hover qoidasi bor' },
        { label: 'Ustiga kelganda Y bo‘yicha siljish' },
        { label: 'Ustiga kelganda fon o‘zgaradi' }
      ]
    },
    'css-modern-4': {
      title: 'Gradient va soya',
      description: 'Panelga `135deg` burchak ostida ikki rangdan iborat chiziqli gradient foni bering va sezilarli soya qo‘shing.',
      hints: ['background: linear-gradient(135deg, #6366f1, #ec4899);'],
      starter: { html: '<button class="btn">Tugma</button>\n<div class="panel">Panel</div>\n', css: '/* stillaringiz */\n' },
      solution: {
        css: '.panel {\n  padding: 40px;\n  color: #fff;\n  background: linear-gradient(135deg, #6366f1, #ec4899);\n  box-shadow: 0 10px 30px rgb(0 0 0 / .25);\n  border-radius: 16px;\n}'
      },
      checks: [
        { label: 'Fon — chiziqli gradient' },
        { label: 'Burchak 135deg' },
        { label: 'Gradientda kamida ikkita rang' },
        { label: 'box-shadow bor' }
      ]
    },
    'css-modern-5': {
      title: 'Challenge: o‘zgaruvchilarga qurilgan mavzu',
      description: 'Mini dizayn-tizim yig‘ing: `:root` da — kamida to‘rtta o‘zgaruvchi (brend rangi, fon, matn, radius). Tugma va panel faqat o‘zgaruvchilardan foydalanadi. O‘zgaruvchilarni qayta aniqlaydigan `.dark` klassini va ranglarning silliq o‘tishini qo‘shing.',
      hints: [
        '.dark dagi o‘zgaruvchilar e’lon qilingani kabi qayta aniqlanadi: .dark { --bg: #0b1020; }',
        'Ota elementda e’lon qilingan o‘zgaruvchi barcha farzandlarga ta’sir qiladi.'
      ],
      starter: {
        html: '<div class="theme dark">\n  <div class="panel">\n    <h3>Panel</h3>\n    <button class="btn">Amal</button>\n  </div>\n</div>\n',
        css: ''
      },
      checks: [
        { label: ':root da kamida 4 ta o‘zgaruvchi' },
        { label: '.dark klassi o‘zgaruvchilarni qayta aniqlaydi' },
        { label: 'Panel var() dan foydalanadi' },
        { label: 'Tugma var() dan foydalanadi' },
        { label: 'Qorong‘i mavzu haqiqatan qo‘llandi' },
        { label: 'Silliq o‘tish bor' }
      ]
    }
  }
};

export const cssLessons = {
  'css-intro': lesson10,
  'css-selectors': lesson11,
  'css-typography': lesson12,
  'css-box-model': lesson13,
  'css-display-position': lesson14,
  'css-flexbox': lesson15,
  'css-grid': lesson16,
  'css-responsive': lesson17,
  'css-modern': lesson18
};
