/* A5. Event listener'lar yordamida interaktivlikni qo'shish. */
const baseCss = 'body { font-family: system-ui, sans-serif; padding: 20px; color: #1e293b; }\nbutton { font: inherit; padding: 6px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }\nbutton:hover { border-color: #2563eb; }';

const tabsHtml = '<div class="tabs">\n  <button class="tab active" data-tab="about">Kurs haqida</button>\n  <button class="tab" data-tab="program">Dastur</button>\n  <button class="tab" data-tab="teacher">O‘qituvchi</button>\n</div>\n<section class="panel active" id="about">Web tizimlari — 5-semestr fani.</section>\n<section class="panel" id="program">18 ta ma’ruza va 12 ta amaliy mashg‘ulot.</section>\n<section class="panel" id="teacher">Kafedra o‘qituvchisi.</section>';
const tabsCss = baseCss + '\n.tabs { display: flex; gap: 6px; margin-bottom: 10px; }\n.tab.active { background: #2563eb; color: #fff; border-color: #2563eb; }\n.panel { display: none; padding: 16px; border: 1px solid #e2e8f0; border-radius: 10px; }\n.panel.active { display: block; }';
const tabsJs = "const tabs = document.querySelector('.tabs');\n\ntabs.addEventListener('click', (event) => {\n  const button = event.target.closest('.tab');\n  if (!button) return;\n\n  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === button));\n  document.querySelectorAll('.panel').forEach((p) => {\n    p.classList.toggle('active', p.id === button.dataset.tab);\n  });\n});";

const modalHtml = '<button id="open">Ro‘yxatdan o‘tish</button>\n\n<div class="overlay" hidden>\n  <div class="modal" role="dialog" aria-modal="true">\n    <h3>Kursga yozilish</h3>\n    <p>Modal oyna: Escape, ✕ yoki fonni bosib yoping.</p>\n    <button class="close" aria-label="Yopish">✕</button>\n  </div>\n</div>';
const modalCss = baseCss + '\n.overlay { position: fixed; inset: 0; background: rgb(15 23 42 / .5); display: grid; place-items: center; }\n.overlay[hidden] { display: none; }\n.modal { position: relative; background: #fff; padding: 24px; border-radius: 14px; width: min(360px, 90vw); }\n.close { position: absolute; top: 10px; right: 10px; }';
const modalJs = "const overlay = document.querySelector('.overlay');\n\nfunction openModal() {\n  overlay.hidden = false;\n  overlay.querySelector('.close').focus();\n  console.log('Modal ochildi');\n}\n\nfunction closeModal() {\n  overlay.hidden = true;\n  console.log('Modal yopildi');\n}\n\ndocument.querySelector('#open').addEventListener('click', openModal);\noverlay.querySelector('.close').addEventListener('click', closeModal);\n\n// Fonni bosish — faqat fonning o‘zi, modal ichi emas\noverlay.addEventListener('click', (event) => {\n  if (event.target === overlay) closeModal();\n});\n\ndocument.addEventListener('keydown', (event) => {\n  if (event.key === 'Escape' && !overlay.hidden) closeModal();\n});";

const sliderHtml = '<div class="slider">\n  <button class="prev">‹</button>\n  <div class="slide" id="slide"></div>\n  <button class="next">›</button>\n</div>\n<div class="dots" id="dots"></div>\n<label><input type="checkbox" id="auto"> Avtomatik almashish</label>';
const sliderCss = baseCss + '\n.slider { display: flex; align-items: center; gap: 10px; }\n.slide { flex: 1; height: 160px; border-radius: 14px; display: grid; place-items: center; color: #fff; font-size: 26px; font-weight: 700; transition: background .4s; }\n.dots { display: flex; gap: 6px; justify-content: center; margin: 10px 0; }\n.dot { width: 12px; height: 12px; padding: 0; border-radius: 50%; }\n.dot.active { background: #2563eb; }';
const sliderJs = "const slides = [\n  { text: 'HTML', color: '#ea580c' },\n  { text: 'CSS', color: '#2563eb' },\n  { text: 'JavaScript', color: '#ca8a04' },\n  { text: 'Vue.js', color: '#16a34a' }\n];\nlet current = 0;\nlet timer = null;\n\nconst slide = document.querySelector('#slide');\nconst dots = document.querySelector('#dots');\n\nslides.forEach((_, i) => {\n  const dot = document.createElement('button');\n  dot.className = 'dot';\n  dot.dataset.index = i;\n  dots.append(dot);\n});\n\nfunction show(index) {\n  current = (index + slides.length) % slides.length;   // aylanma indeks\n  slide.textContent = slides[current].text;\n  slide.style.background = slides[current].color;\n  dots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));\n}\n\ndocument.querySelector('.prev').addEventListener('click', () => show(current - 1));\ndocument.querySelector('.next').addEventListener('click', () => show(current + 1));\ndots.addEventListener('click', (e) => { if (e.target.dataset.index) show(Number(e.target.dataset.index)); });\n\ndocument.addEventListener('keydown', (e) => {\n  if (e.key === 'ArrowLeft') show(current - 1);\n  if (e.key === 'ArrowRight') show(current + 1);\n});\n\ndocument.querySelector('#auto').addEventListener('change', (e) => {\n  clearInterval(timer);\n  if (e.target.checked) timer = setInterval(() => show(current + 1), 1500);\n});\n\nshow(0);";

const counterHtml = '<p>Matn: <input id="text" maxlength="120" size="40" placeholder="Fikringizni yozing"></p>\n<p id="counter">0 / 120</p>\n<p>Sichqoncha: <span id="pos">—</span></p>\n<div id="area" style="height:120px;border:2px dashed #94a3b8;border-radius:10px;display:grid;place-items:center">Ustida harakatlaning</div>';
const counterJs = "const input = document.querySelector('#text');\nconst counter = document.querySelector('#counter');\nconst area = document.querySelector('#area');\nconst pos = document.querySelector('#pos');\n\ninput.addEventListener('input', () => {\n  const length = input.value.length;\n  counter.textContent = `${length} / ${input.maxLength}`;\n  counter.style.color = length > 100 ? 'crimson' : '';\n});\n\ninput.addEventListener('focus', () => console.log('focus'));\ninput.addEventListener('blur', () => console.log('blur — maydondan chiqildi'));\n\narea.addEventListener('mousemove', (e) => {\n  pos.textContent = `x: ${e.offsetX}, y: ${e.offsetY}`;\n});\narea.addEventListener('mouseleave', () => { pos.textContent = '—'; });\narea.addEventListener('dblclick', () => {\n  area.style.background = area.style.background ? '' : '#dbeafe';\n});";

export default {
  id: 'a5',
  number: 5,
  title: 'Event listener’lar yordamida interaktivlikni qo‘shish',
  summary: 'Tablar, modal oyna, slayder va jonli hisoblagichni hodisalar yordamida yaratamiz.',
  lectures: ['m6'],
  lessons: ['js-events', 'js-dom'],
  goal: 'Sichqoncha, klaviatura va forma hodisalarini qayta ishlash, hodisa obyekti, delegatsiya va standart harakatni bekor qilish yordamida interaktiv interfeys komponentlarini yaratish ko‘nikmasini shakllantirish.',
  outcomes: [
    '`addEventListener` bilan turli hodisalarga javob beradi;',
    'hodisa obyekti (`target`, `key`, `offsetX`) ma’lumotlaridan foydalanadi;',
    'bubbling ga asoslangan delegatsiyani qo‘llaydi;',
    'tablar, modal oyna, slayder kabi tipik komponentlarni yarata oladi.'
  ],
  tools: ['VS Code + Live Server yoki «Erkin playground».', 'DevTools → Elements → Event Listeners bo‘limi.'],
  theory: [
    { code: "element.addEventListener('hodisa', (event) => {\n  // event.target        — hodisa aynan qaysi elementda\n  // event.currentTarget — tinglovchi osilgan element\n  // event.preventDefault() — standart harakatni bekor qilish\n});", lang: 'js' },
    { table: { head: ['Hodisa', 'Qachon'], rows: [
      ['`click`, `dblclick`', 'Bosish, ikki marta bosish'],
      ['`mouseenter`, `mouseleave`, `mousemove`', 'Sichqoncha kirishi, chiqishi, harakati'],
      ['`keydown`, `keyup`', 'Klaviatura tugmasi (`event.key`)'],
      ['`input`, `change`', 'Maydon qiymati o‘zgarishi (har belgi / yakuniy)'],
      ['`focus`, `blur`', 'Maydonga kirish / chiqish'],
      ['`submit`', 'Forma yuborilishi'],
      ['`DOMContentLoaded`', 'HTML to‘liq tahlil qilindi']
    ] } },
    { tip: '**Delegatsiya**: ko‘p bir xil elementlar uchun bitta tinglovchini ota elementga qo‘ying va `event.target.closest(\'.selector\')` bilan kerakli elementni aniqlang.' }
  ],
  steps: [
    {
      title: 'Birinchi tinglovchi: tugma va hisoblagich',
      blocks: [
        'Tugma bosilganda hisoblagich oshsin, `Shift` bosilgan holda bosilsa — 10 ga oshsin. Hodisa obyektini konsolga chiqarib, uning xossalarini o‘rganing.',
        { code: "const button = document.querySelector('#plus');\nconst output = document.querySelector('#count');\nlet count = 0;\n\nbutton.addEventListener('click', (event) => {\n  count += event.shiftKey ? 10 : 1;\n  output.textContent = count;\n  console.log('type:', event.type, '| shiftKey:', event.shiftKey, '| x:', event.clientX);\n});\n\ndocument.querySelector('#reset').addEventListener('click', () => {\n  count = 0;\n  output.textContent = count;\n});", lang: 'js', run: { html: '<p>Hisob: <strong id="count">0</strong></p>\n<button id="plus">+1 (Shift bilan +10)</button>\n<button id="reset">Nolga</button>', css: baseCss, js: "const button = document.querySelector('#plus');\nconst output = document.querySelector('#count');\nlet count = 0;\n\nbutton.addEventListener('click', (event) => {\n  count += event.shiftKey ? 10 : 1;\n  output.textContent = count;\n  console.log('type:', event.type, '| shiftKey:', event.shiftKey, '| x:', event.clientX);\n});\n\ndocument.querySelector('#reset').addEventListener('click', () => {\n  count = 0;\n  output.textContent = count;\n});" } }
      ]
    },
    {
      title: 'Tablar: delegatsiya va data-atributlar',
      blocks: [
        'Uchta tab tugmasi va uchta panel. Har bir tugmaga alohida tinglovchi o‘rniga, bitta tinglovchi `.tabs` konteyneriga qo‘yiladi.',
        { code: tabsJs, lang: 'js', run: { html: tabsHtml, css: tabsCss, js: tabsJs } },
        '`classList.toggle(\'active\', shart)` — ikkinchi argument `true` bo‘lsa klass qo‘shiladi, `false` bo‘lsa olib tashlanadi.'
      ]
    },
    {
      title: 'Modal oyna: bir nechta yopish usuli',
      blocks: [
        'Modal oyna uch usulda yopilishi kerak: ✕ tugmasi, fonni bosish va `Escape`. Fonni bosishda `event.target === overlay` tekshiruvi modal ichidagi bosishlarni chiqarib tashlaydi.',
        { code: modalJs, lang: 'js', run: { html: modalHtml, css: modalCss, js: modalJs } }
      ]
    },
    {
      title: 'Slayder: klaviatura va taymer hodisalari',
      blocks: [
        'Slayder tugmalar, nuqtalar, klaviatura strelkalari va avtomatik rejim bilan boshqariladi. `%` operatori indeksni aylantiradi: oxiridan keyin boshiga qaytadi.',
        { code: sliderJs, lang: 'js', run: { html: sliderHtml, css: sliderCss, js: sliderJs } },
        { tip: 'Avtomatik rejimni yoqib-o‘chirganda `clearInterval` ni unutmang — aks holda taymerlar ko‘payib, slayder tezlashib ketadi.' }
      ]
    },
    {
      title: 'Kiritish va sichqoncha hodisalari',
      blocks: [
        '`input` hodisasi har bir belgida, `blur` — maydondan chiqqanda ishlaydi. Sichqoncha koordinatalarini `mousemove` bilan kuzating.',
        { code: counterJs, lang: 'js', run: { html: counterHtml, css: baseCss, js: counterJs } }
      ]
    },
    {
      title: 'Bubbling va stopPropagation ni tajribada ko‘rish',
      blocks: [
        'Ichma-ich uchta blokka tinglovchi qo‘ying va ichkisini bosing — konsolda hodisaning qanday ko‘tarilishini ko‘rasiz. So‘ng o‘rtadagi blokda `stopPropagation()` ni yoqing.',
        { code: "const log = (name) => (event) => {\n  console.log(`${name}: target=${event.target.id}, currentTarget=${event.currentTarget.id}`);\n};\n\ndocument.querySelector('#outer').addEventListener('click', log('outer'));\ndocument.querySelector('#middle').addEventListener('click', (event) => {\n  log('middle')(event);\n  if (document.querySelector('#stop').checked) event.stopPropagation();\n});\ndocument.querySelector('#inner').addEventListener('click', log('inner'));\n\n// capture bosqichida ishlaydigan tinglovchi — birinchi bo‘lib chaqiriladi\ndocument.querySelector('#outer').addEventListener('click', () => console.log('--- capture: outer ---'), { capture: true });", lang: 'js', run: { html: '<label><input type="checkbox" id="stop"> middle da stopPropagation()</label>\n<div id="outer" class="box">outer\n  <div id="middle" class="box">middle\n    <div id="inner" class="box">inner — meni bosing</div>\n  </div>\n</div>', css: baseCss + '\n.box { padding: 16px; margin-top: 10px; border: 2px solid #94a3b8; border-radius: 10px; }\n#middle { border-color: #2563eb; }\n#inner { border-color: #16a34a; cursor: pointer; }', js: "const log = (name) => (event) => {\n  console.log(`${name}: target=${event.target.id}, currentTarget=${event.currentTarget.id}`);\n};\n\ndocument.querySelector('#outer').addEventListener('click', log('outer'));\ndocument.querySelector('#middle').addEventListener('click', (event) => {\n  log('middle')(event);\n  if (document.querySelector('#stop').checked) event.stopPropagation();\n});\ndocument.querySelector('#inner').addEventListener('click', log('inner'));\n\ndocument.querySelector('#outer').addEventListener('click', () => console.log('--- capture: outer ---'), { capture: true });" } }
      ]
    }
  ],
  tasks: [
    {
      title: 'Akkordeon',
      level: 'easy',
      blocks: ['«Ko‘p so‘raladigan savollar» akkordeonini yarating: savol bosilganda javob ochiladi, boshqa ochiq javob yopiladi. Delegatsiyadan foydalaning.']
    },
    {
      title: 'Klaviatura yorliqlari',
      level: 'medium',
      blocks: ['Sahifaga yorliqlar qo‘shing: `/` — qidiruv maydoniga fokus, `Ctrl+K` — modal ochish (`preventDefault` bilan), `?` — yorliqlar ro‘yxatini ko‘rsatish.']
    },
    {
      title: 'Variant bo‘yicha interaktiv komponent',
      level: 'hard',
      blocks: [
        { ol: [
          '«Xotira» o‘yini (juft kartochkalarni topish).',
          'Rasm galereyasi + to‘liq ekranli ko‘ruvchi (lightbox, strelkalar bilan).',
          'Yulduzcha reyting komponenti (hover va click).',
          'Drag-and-drop bilan vazifalarni ustunlar orasida ko‘chirish (Kanban).',
          'Ochiladigan menyu (dropdown) — tashqarini bosganda yopiladi.',
          'Test (quiz): savollar, variantlar, natija va taymer.',
          'Raqamli soat va sekundomer (start/pauza/reset).',
          'Chizish taxtasi (`<canvas>` va sichqoncha hodisalari).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Har bir komponent kodi va ishlash skrinshoti.',
    'DevTools → Event Listeners bo‘limi skrinshoti.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Hodisalar to‘g‘ri tanlangan va qayta ishlangan', '1'],
    ['Delegatsiya va data-atributlar qo‘llangan', '1'],
    ['Modal/slayder klaviatura bilan ham boshqariladi', '1'],
    ['Kod toza: funksiyalarga ajratilgan, taymerlar tozalanadi', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    '`onclick` atributi va `addEventListener` farqi nimada?',
    '`event.target` va `event.currentTarget` farqini tushuntiring.',
    '`input` va `change` hodisalari qachon ishlaydi?',
    'Bubbling va capturing bosqichlari nima?',
    'Delegatsiya qanday afzallik beradi?',
    '`preventDefault()` va `stopPropagation()` farqi nimada?',
    'Tinglovchini qanday olib tashlash mumkin?',
    'Nima uchun modal oynani `Escape` bilan yopish muhim (accessibility)?'
  ]
};
