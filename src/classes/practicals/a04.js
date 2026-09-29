/* A4. DOM elementlarini JavaScript orqali manipulyatsiya qilish. */
const html = '<main class="wrap">\n  <h1 id="title">Kurslar katalogi</h1>\n  <p id="info">Yuklanmoqda…</p>\n  <div id="catalog" class="grid"></div>\n</main>';
const css = 'body { font-family: system-ui, sans-serif; background: #f1f5f9; margin: 0; }\n.wrap { max-width: 900px; margin: 0 auto; padding: 20px; }\n.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }\n.card { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgb(0 0 0 / .06); }\n.card h3 { margin: 0 0 6px; font-size: 17px; }\n.card .price { font-weight: 700; color: #2563eb; }\n.card.featured { outline: 2px solid #f59e0b; }\n.badge { display: inline-block; font-size: 12px; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 999px; }\n.muted { color: #64748b; font-size: 14px; }';
const data = "const courses = [\n  { id: 1, title: 'HTML va CSS', level: 'Boshlang‘ich', price: 450000, hours: 36, featured: false },\n  { id: 2, title: 'JavaScript asoslari', level: 'Boshlang‘ich', price: 600000, hours: 48, featured: true },\n  { id: 3, title: 'Vue.js', level: 'O‘rta', price: 800000, hours: 40, featured: false },\n  { id: 4, title: 'Node.js va Express', level: 'O‘rta', price: 850000, hours: 44, featured: true },\n  { id: 5, title: 'Ma’lumotlar bazasi', level: 'O‘rta', price: 700000, hours: 32, featured: false }\n];\n";
const render = "\nconst catalog = document.querySelector('#catalog');\nconst info = document.querySelector('#info');\nconst money = (n) => n.toLocaleString('ru-RU') + ' so‘m';\n\nfunction createCard(course) {\n  const card = document.createElement('article');\n  card.className = 'card';\n  card.dataset.id = course.id;\n  if (course.featured) card.classList.add('featured');\n\n  const title = document.createElement('h3');\n  title.textContent = course.title;\n\n  const meta = document.createElement('p');\n  meta.className = 'muted';\n  meta.textContent = `${course.level} · ${course.hours} soat`;\n\n  const price = document.createElement('p');\n  price.className = 'price';\n  price.textContent = money(course.price);\n\n  card.append(title, meta, price);\n  if (course.featured) {\n    const badge = document.createElement('span');\n    badge.className = 'badge';\n    badge.textContent = 'Tavsiya etiladi';\n    card.prepend(badge);\n  }\n  return card;\n}\n\nfunction render(list) {\n  catalog.replaceChildren(...list.map(createCard));\n  info.textContent = `${list.length} ta kurs`;\n}\n\nrender(courses);\n";

export default {
  id: 'a4',
  number: 4,
  title: 'DOM elementlarini JavaScript orqali manipulyatsiya qilish',
  summary: 'Ma’lumotlar massivi asosida kurslar katalogini JavaScript bilan quramiz, o‘zgartiramiz va saralaymiz.',
  lectures: ['m6'],
  lessons: ['js-dom', 'js-arrays', 'js-objects'],
  goal: 'DOM daraxtidagi elementlarni topish, ularning tarkibi, atributlari va uslublarini o‘zgartirish, yangi elementlar yaratish va o‘chirish ko‘nikmasini shakllantirish.',
  outcomes: [
    '`querySelector`/`querySelectorAll` bilan elementlarni topadi;',
    '`textContent`, atributlar, `dataset` va `classList` ni o‘zgartiradi;',
    '`createElement`, `append`, `remove`, `replaceChildren` bilan DOM ni quradi;',
    'ma’lumotlar massividan interfeysni «render» qiluvchi funksiya yozadi.'
  ],
  tools: [
    'VS Code + Live Server yoki «Erkin playground».',
    'DevTools: Elements (DOM o‘zgarishini jonli kuzatish) va Console.'
  ],
  theory: [
    { table: { head: ['Vazifa', 'API'], rows: [
      ['Topish', '`document.querySelector(sel)`, `querySelectorAll(sel)`, `el.closest(sel)`'],
      ['Matn', '`el.textContent = \'…\'` (xavfsiz)'],
      ['Atribut', '`el.src`, `el.setAttribute()`, `el.dataset.id`'],
      ['Uslub', '`el.classList.add/remove/toggle()`, kamdan-kam `el.style.x`'],
      ['Yaratish', '`document.createElement(\'div\')`'],
      ['Joylash', '`parent.append()`, `prepend()`, `before()`, `after()`, `replaceChildren()`'],
      ['O‘chirish', '`el.remove()`']
    ] } },
    { warn: 'Foydalanuvchi yoki serverdan kelgan matnni `innerHTML` orqali qo‘ymang — XSS xavfi (M14). Ushbu ishda barcha matnlar `textContent` bilan qo‘yiladi.' }
  ],
  steps: [
    {
      title: 'Sahifa karkasi va ma’lumotlar',
      blocks: [
        'HTML da faqat bo‘sh konteyner bo‘ladi — kartochkalarni JavaScript yaratadi. Ma’lumotlar massivini `app.js` boshida e’lon qiling.',
        { code: html, lang: 'html' },
        { code: data, lang: 'js', title: 'app.js — ma’lumotlar' },
        { code: '<script src="app.js" defer></script>', lang: 'html', title: '`</head>` dan oldin' }
      ]
    },
    {
      title: 'Elementlarni topish va o‘zgartirish',
      blocks: [
        'Sarlavha va ma’lumot paragrafini toping, matnini, atributini va klassini o‘zgartiring. DevTools → Elements da o‘zgarishlarni kuzating.',
        { code: "const title = document.querySelector('#title');\nconst info = document.querySelector('#info');\n\ntitle.textContent = 'UBS o‘quv markazi kurslari';\ntitle.style.color = '#1d4ed8';\ninfo.textContent = 'Sahifa JavaScript bilan yangilandi';\ninfo.classList.add('muted');\ninfo.setAttribute('title', 'Bu atribut JS orqali qo‘shildi');\n\nconsole.log(title.outerHTML);\nconsole.log('info klasslari:', [...info.classList]);", lang: 'js', run: { html, css, js: "const title = document.querySelector('#title');\nconst info = document.querySelector('#info');\n\ntitle.textContent = 'UBS o‘quv markazi kurslari';\ntitle.style.color = '#1d4ed8';\ninfo.textContent = 'Sahifa JavaScript bilan yangilandi';\ninfo.classList.add('muted');\ninfo.setAttribute('title', 'Bu atribut JS orqali qo‘shildi');\n\nconsole.log(title.outerHTML);\nconsole.log('info klasslari:', [...info.classList]);" } }
      ]
    },
    {
      title: 'Kartochka yaratuvchi funksiya',
      blocks: [
        'Bitta kurs obyektidan `<article class="card">` elementini yaratib qaytaruvchi `createCard(course)` funksiyasini yozing. So‘ng `render(list)` barcha kartochkalarni konteynerga joylaydi.',
        { code: data + render, lang: 'js', run: { html, css, js: data + render } },
        { tip: '`replaceChildren(...elements)` konteynerni tozalab, yangi elementlarni bitta amal bilan qo‘yadi — qayta render qilish uchun qulay.' }
      ]
    },
    {
      title: 'Saralash va filtrlash tugmalari',
      blocks: [
        'Konteyner ustiga tugmalar paneli qo‘shing (ularni ham JavaScript bilan yarating). Har bir tugma massivni saralab yoki filtrlab `render` ni qayta chaqiradi.',
        { code: "const toolbar = document.createElement('div');\ntoolbar.style.cssText = 'display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap';\n\nconst actions = [\n  ['Hammasi', () => courses],\n  ['Arzonroq', () => [...courses].sort((a, b) => a.price - b.price)],\n  ['Qimmatroq', () => [...courses].sort((a, b) => b.price - a.price)],\n  ['Faqat tavsiya etilgan', () => courses.filter((c) => c.featured)],\n  ['40 soatdan ko‘p', () => courses.filter((c) => c.hours > 40)]\n];\n\nactions.forEach(([label, getList]) => {\n  const button = document.createElement('button');\n  button.textContent = label;\n  button.addEventListener('click', () => render(getList()));\n  toolbar.append(button);\n});\n\ncatalog.before(toolbar);", lang: 'js', run: { html, css, js: data + render + "\nconst toolbar = document.createElement('div');\ntoolbar.style.cssText = 'display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap';\n\nconst actions = [\n  ['Hammasi', () => courses],\n  ['Arzonroq', () => [...courses].sort((a, b) => a.price - b.price)],\n  ['Qimmatroq', () => [...courses].sort((a, b) => b.price - a.price)],\n  ['Faqat tavsiya etilgan', () => courses.filter((c) => c.featured)],\n  ['40 soatdan ko‘p', () => courses.filter((c) => c.hours > 40)]\n];\n\nactions.forEach(([label, getList]) => {\n  const button = document.createElement('button');\n  button.textContent = label;\n  button.addEventListener('click', () => render(getList()));\n  toolbar.append(button);\n});\n\ncatalog.before(toolbar);" } },
        { note: '`[...courses].sort()` — asl massivni buzmaslik uchun nusxasi saralanadi. `sort` massivni joyida o‘zgartiradi.' }
      ]
    },
    {
      title: 'Elementni o‘chirish va yangilash',
      blocks: [
        'Har bir kartochkaga «O‘chirish» tugmasini qo‘shing. Tugma bosilganda kurs massivdan ham, sahifadan ham olib tashlansin. `createCard` oxiriga quyidagini qo‘shing:',
        { code: "  const remove = document.createElement('button');\n  remove.textContent = 'O‘chirish';\n  remove.addEventListener('click', () => {\n    const index = courses.findIndex((c) => c.id === course.id);\n    courses.splice(index, 1);   // ma’lumotdan\n    card.remove();              // sahifadan\n    info.textContent = `${courses.length} ta kurs`;\n  });\n  card.append(remove);", lang: 'js' },
        'Shuningdek, kartochkani bosganda uning narxini 10% ga kamaytiruvchi va `featured` klassini almashtiruvchi kod yozing (`dataset.id` orqali kursni toping).'
      ]
    },
    {
      title: 'Jadval ko‘rinishi va DOM tahlili',
      blocks: [
        'Xuddi shu ma’lumotdan jadval yarating: `<table>`, `<thead>`, `<tbody>` elementlarini `createElement` bilan quring yoki `insertRow()`/`insertCell()` metodlaridan foydalaning.',
        { code: "const table = document.createElement('table');\ntable.innerHTML = '<thead><tr><th>Kurs</th><th>Daraja</th><th>Narx</th></tr></thead><tbody></tbody>';\nconst tbody = table.querySelector('tbody');\n\ncourses.forEach((c) => {\n  const row = tbody.insertRow();\n  row.insertCell().textContent = c.title;\n  row.insertCell().textContent = c.level;\n  row.insertCell().textContent = c.price.toLocaleString('ru-RU');\n});\n\ndocument.querySelector('.wrap').append(table);\nconsole.log('Jadvaldagi qatorlar:', tbody.rows.length);", lang: 'js', run: { html, css: css + '\ntable { width: 100%; margin-top: 20px; border-collapse: collapse; background: #fff; }\nth, td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }', js: data + "\nconst table = document.createElement('table');\ntable.innerHTML = '<thead><tr><th>Kurs</th><th>Daraja</th><th>Narx</th></tr></thead><tbody></tbody>';\nconst tbody = table.querySelector('tbody');\n\ncourses.forEach((c) => {\n  const row = tbody.insertRow();\n  row.insertCell().textContent = c.title;\n  row.insertCell().textContent = c.level;\n  row.insertCell().textContent = c.price.toLocaleString('ru-RU');\n});\n\ndocument.querySelector('.wrap').append(table);\nconsole.log('Jadvaldagi qatorlar:', tbody.rows.length);" } },
        { note: 'Bu yerda `innerHTML` faqat o‘zimiz yozgan, o‘zgarmas HTML uchun ishlatildi — bu xavfsiz. Ma’lumotlar esa `textContent` bilan qo‘yildi.' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Statistika bloki',
      level: 'easy',
      blocks: ['Katalog ustida kurslar soni, o‘rtacha narx va jami soatlarni ko‘rsatuvchi blok yarating; u `render` har chaqirilganda yangilansin.']
    },
    {
      title: 'Ko‘rinishni almashtirish',
      level: 'medium',
      blocks: ['«Kartochkalar / Jadval» almashtirgichini yarating: tanlangan ko‘rinish `localStorage` da saqlansin va sahifa qayta yuklanganda tiklansin.']
    },
    {
      title: 'Variant bo‘yicha ilova',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha ma’lumotlar massivini o‘zingiz tuzing va undan DOM orqali interfeys yarating (saralash, filtrlash, o‘chirish bilan):',
        { ol: [
          'Kutubxona kitoblari katalogi.',
          'Telefonlar do‘koni.',
          'Dars jadvali (hafta kunlari bo‘yicha).',
          'Kinoteatr afishasi.',
          'Restoran menyusi (kategoriyalar bilan).',
          'Talabalar reytingi jadvali.',
          'Ob-havo prognozi (7 kunlik kartochkalar).',
          'Vazifalar ro‘yxati (muhimlik darajalari bilan).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    '`index.html` va `app.js` kodi (izohlar bilan).',
    'Sahifaning turli holatlardagi skrinshotlari (saralangan, filtrlangan).',
    'DevTools → Elements da JS yaratgan elementlar skrinshoti.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Elementlarni topish va o‘zgartirish to‘g‘ri bajarilgan', '1'],
    ['Interfeys ma’lumotlar massividan `createElement` bilan qurilgan', '1'],
    ['Saralash, filtrlash va o‘chirish ishlaydi', '1'],
    ['Xavfsiz amaliyot (`textContent`), kod funksiyalarga bo‘lingan', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    '`querySelector` va `getElementById` farqi nimada?',
    '`textContent`, `innerText` va `innerHTML` ning farqi nimada?',
    '`classList.toggle` qanday ishlaydi?',
    '`dataset` orqali qanday atributlarga murojaat qilinadi?',
    '`append` va `appendChild` farqi nimada?',
    '`replaceChildren` nima uchun qulay?',
    'Nima uchun `sort` dan oldin massiv nusxasi olinadi?',
    'DOM ni ko‘p marta o‘zgartirish unumdorlikka qanday ta’sir qiladi?'
  ]
};
