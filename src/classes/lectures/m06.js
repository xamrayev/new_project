/* M6. DOM manipulyatsiyasi va eventlar bilan ishlash. */
export default {
  id: 'm6',
  number: 6,
  title: 'DOM manipulyatsiyasi va eventlar bilan ishlash',
  summary: 'Elementlarni topish, o‘zgartirish, yaratish; hodisalar, delegatsiya va formalarni qayta ishlash.',
  literature: [3, 4],
  goals: [
    'DOM daraxti va `document` obyekti bilan ishlashni o‘rganish.',
    'Elementlarni topish, tarkibi, atributlari va uslublarini o‘zgartirishni bilish.',
    'Yangi elementlar yaratish va o‘chirishni o‘rganish.',
    'Hodisalar modeli, hodisa obyekti, suzib chiqish va delegatsiyani tushunish.'
  ],
  keywords: ['DOM', 'document', 'querySelector', 'textContent', 'innerHTML', 'classList', 'createElement', 'append', 'addEventListener', 'event', 'bubbling', 'delegation', 'preventDefault', 'dataset'],
  practicals: ['a4', 'a5', 'a6'],
  lessons: ['js-dom', 'js-events', 'js-forms', 'js-localstorage'],
  sections: [
    {
      title: 'DOM nima',
      blocks: [
        { lead: 'DOM (Document Object Model) — brauzer HTML hujjatdan quradigan obyektlar daraxti va unga JavaScript orqali murojaat qilish interfeysi. DOM ni o‘zgartirsak, ekrandagi sahifa darhol o‘zgaradi.' },
        { code: '<ul id="list">\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n        ul#list            ← element tuguni\n       /       \\\n     li         li         ← element tugunlari\n     |           |\n  "HTML"       "CSS"       ← matn tugunlari', lang: 'text', title: 'HTML va unga mos DOM' },
        { ul: [
          '`document` — butun sahifa; `document.documentElement` — `<html>`, `document.body` — `<body>`.',
          'Har bir element — obyekt: uning xossalari (`id`, `className`, `value`) va metodlari (`remove()`, `append()`) bor.',
          'Tugunlar o‘rtasida harakatlanish: `parentElement`, `children`, `firstElementChild`, `nextElementSibling`.'
        ] }
      ]
    },
    {
      title: 'Elementlarni topish',
      blocks: [
        { table: { head: ['Metod', 'Qaytaradi'], rows: [
          ['`document.getElementById(\'app\')`', 'Bitta element yoki `null`'],
          ['`document.querySelector(\'.card h3\')`', 'CSS selektorga mos **birinchi** element'],
          ['`document.querySelectorAll(\'li\')`', 'Barcha mos elementlar (NodeList — `forEach` bor)'],
          ['`element.closest(\'.card\')`', 'O‘zidan yuqoriga qarab birinchi mos ajdod'],
          ['`element.matches(\'.active\')`', 'Element selektorga mosmi — `true/false`']
        ] } },
        { code: "const title = document.querySelector('h1');\nconst items = document.querySelectorAll('.item');\n\nconsole.log(title.textContent);\nconsole.log('Elementlar soni:', items.length);\nitems.forEach((item, i) => console.log(i + 1, item.textContent));", lang: 'js', run: { html: '<h1>Fanlar ro‘yxati</h1>\n<ul>\n  <li class="item">HTML</li>\n  <li class="item">CSS</li>\n  <li class="item">JavaScript</li>\n</ul>', js: "const title = document.querySelector('h1');\nconst items = document.querySelectorAll('.item');\n\nconsole.log(title.textContent);\nconsole.log('Elementlar soni:', items.length);\nitems.forEach((item, i) => console.log(i + 1, item.textContent));" } }
      ]
    },
    {
      title: 'Tarkib, atribut va uslublarni o‘zgartirish',
      blocks: [
        { h: 'Tarkib' },
        { ul: [
          '`textContent` — faqat matn. Xavfsiz: HTML sifatida talqin qilinmaydi.',
          '`innerHTML` — HTML sifatida talqin qilinadi. Foydalanuvchi kiritgan matnni hech qachon `innerHTML` ga bermang — bu **XSS** hujumiga yo‘l ochadi (M14).',
          '`value` — forma maydonlarining qiymati.'
        ] },
        { h: 'Atributlar' },
        { code: "link.href = 'https://ubs.uz';\nimg.setAttribute('alt', 'Logotip');\nbutton.disabled = true;\ncard.dataset.id = '42';            // data-id=\"42\"\nconsole.log(card.dataset.id);", lang: 'js' },
        { h: 'Uslublar' },
        'Uslubni to‘g‘ridan-to‘g‘ri `element.style.color = \'red\'` bilan o‘zgartirish mumkin, lekin yaxshiroq usul — CSS da klass tayyorlab, `classList` orqali qo‘shish/olib tashlash.',
        { code: "const box = document.querySelector('.box');\nconst button = document.querySelector('button');\n\nbutton.addEventListener('click', () => {\n  box.classList.toggle('active');\n  button.textContent = box.classList.contains('active') ? 'O‘chirish' : 'Yoqish';\n});", lang: 'js', run: { html: '<div class="box">Chiroq</div>\n<button>Yoqish</button>', css: 'body { font-family: sans-serif; padding: 20px; }\n.box { width: 140px; padding: 30px; text-align: center; border-radius: 12px; background: #e2e8f0; margin-bottom: 12px; transition: .3s; }\n.box.active { background: #facc15; box-shadow: 0 0 30px #facc15; }', js: "const box = document.querySelector('.box');\nconst button = document.querySelector('button');\n\nbutton.addEventListener('click', () => {\n  box.classList.toggle('active');\n  button.textContent = box.classList.contains('active') ? 'O‘chirish' : 'Yoqish';\n});" } },
        '`classList` metodlari: `add`, `remove`, `toggle`, `contains`, `replace`.'
      ]
    },
    {
      title: 'Elementlarni yaratish va o‘chirish',
      blocks: [
        { code: "const students = ['Aziz', 'Dilnoza', 'Jasur'];\nconst list = document.querySelector('#students');\n\nstudents.forEach((name) => {\n  const li = document.createElement('li');\n  li.textContent = name;\n\n  const remove = document.createElement('button');\n  remove.textContent = '✕';\n  remove.addEventListener('click', () => li.remove());\n\n  li.append(' ', remove);\n  list.append(li);\n});", lang: 'js', run: { html: '<h3>Guruh ro‘yxati</h3>\n<ul id="students"></ul>', js: "const students = ['Aziz', 'Dilnoza', 'Jasur'];\nconst list = document.querySelector('#students');\n\nstudents.forEach((name) => {\n  const li = document.createElement('li');\n  li.textContent = name;\n\n  const remove = document.createElement('button');\n  remove.textContent = '✕';\n  remove.addEventListener('click', () => li.remove());\n\n  li.append(' ', remove);\n  list.append(li);\n});" } },
        { table: { head: ['Metod', 'Vazifasi'], rows: [
          ['`document.createElement(\'div\')`', 'Yangi element yaratish (hali sahifada emas)'],
          ['`parent.append(a, b)`, `prepend`', 'Oxiriga / boshiga qo‘shish'],
          ['`el.before(x)`, `el.after(x)`', 'Oldiga / ketidan qo‘shish'],
          ['`el.replaceWith(x)`', 'Almashtirish'],
          ['`el.remove()`', 'O‘chirish'],
          ['`el.cloneNode(true)`', 'Nusxa olish'],
          ['`el.insertAdjacentHTML(\'beforeend\', html)`', 'HTML qatorini qo‘shish (faqat ishonchli HTML!)']
        ] } },
        { tip: 'Ko‘p elementni qo‘shishda har birini alohida `append` qilish o‘rniga, avval `DocumentFragment` ga yig‘ib, bir marta qo‘shish sahifani qayta chizishlar sonini kamaytiradi.' }
      ]
    },
    {
      title: 'Hodisalar (events)',
      blocks: [
        '**Hodisa** — sahifada sodir bo‘lgan voqea: bosish, klaviatura tugmasi, forma yuborilishi, sahifa yuklanishi. JavaScript hodisaga **tinglovchi (listener)** biriktirib, unga javob beradi.',
        { code: "element.addEventListener('click', (event) => {\n  console.log('Bosildi:', event.target);\n});", lang: 'js' },
        { table: { head: ['Guruh', 'Hodisalar'], rows: [
          ['Sichqoncha', '`click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`, `contextmenu`'],
          ['Klaviatura', '`keydown`, `keyup`'],
          ['Forma', '`input`, `change`, `submit`, `focus`, `blur`, `reset`'],
          ['Hujjat/oyna', '`DOMContentLoaded`, `load`, `resize`, `scroll`'],
          ['Sensorli ekran', '`touchstart`, `touchmove`, `pointerdown`']
        ] } },
        { h: 'Hodisa obyekti' },
        { code: "const input = document.querySelector('input');\nconst out = document.querySelector('#out');\n\ninput.addEventListener('input', (event) => {\n  out.textContent = `Siz yozdingiz: ${event.target.value} (${event.target.value.length} belgi)`;\n});\n\ndocument.addEventListener('keydown', (event) => {\n  if (event.key === 'Escape') input.value = '';\n  console.log('Tugma:', event.key, '| Ctrl:', event.ctrlKey);\n});", lang: 'js', run: { html: '<input placeholder="Biror narsa yozing">\n<p id="out"></p>', js: "const input = document.querySelector('input');\nconst out = document.querySelector('#out');\n\ninput.addEventListener('input', (event) => {\n  out.textContent = `Siz yozdingiz: ${event.target.value} (${event.target.value.length} belgi)`;\n});\n\ndocument.addEventListener('keydown', (event) => {\n  if (event.key === 'Escape') input.value = '';\n  console.log('Tugma:', event.key, '| Ctrl:', event.ctrlKey);\n});" } },
        { ul: [
          '`event.target` — hodisa aynan qaysi elementda sodir bo‘lgan.',
          '`event.currentTarget` — tinglovchi biriktirilgan element.',
          '`event.preventDefault()` — standart harakatni bekor qilish (forma yuborilishi, havolaga o‘tish).',
          '`event.stopPropagation()` — hodisaning yuqoriga tarqalishini to‘xtatish.'
        ] }
      ]
    },
    {
      title: 'Hodisalarning tarqalishi va delegatsiya',
      blocks: [
        'Hodisa uch bosqichda tarqaladi: **capturing** (hujjatdan elementgacha pastga), **target** (elementning o‘zida) va **bubbling** (elementdan hujjatgacha yuqoriga «suzib chiqish»). Standart holatda tinglovchilar bubbling bosqichida ishlaydi.',
        { code: 'document\n  └─ body            ▲\n      └─ ul         │  bubbling: hodisa yuqoriga ko‘tariladi\n          └─ li ────┘  ← bu yerda bosildi', lang: 'text' },
        '**Delegatsiya** — har bir bolaga alohida tinglovchi qo‘yish o‘rniga, bitta tinglovchini umumiy ota elementga biriktirish. Bu keyinroq qo‘shiladigan elementlar uchun ham ishlaydi va xotirani tejaydi.',
        { code: "const list = document.querySelector('#todo');\nconst form = document.querySelector('form');\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const text = form.task.value.trim();\n  if (!text) return;\n  list.insertAdjacentHTML('beforeend', '<li><span></span> <button data-action=\"done\">✓</button> <button data-action=\"delete\">✕</button></li>');\n  list.lastElementChild.querySelector('span').textContent = text;\n  form.reset();\n});\n\n// Bitta tinglovchi — barcha tugmalar uchun\nlist.addEventListener('click', (event) => {\n  const button = event.target.closest('button');\n  if (!button) return;\n  const item = button.closest('li');\n  if (button.dataset.action === 'delete') item.remove();\n  if (button.dataset.action === 'done') item.classList.toggle('done');\n});", lang: 'js', run: { html: '<form>\n  <input name="task" placeholder="Yangi vazifa">\n  <button>Qo‘shish</button>\n</form>\n<ul id="todo"></ul>', css: 'body { font-family: sans-serif; padding: 16px; }\nli { margin: 6px 0; }\n.done span { text-decoration: line-through; color: #94a3b8; }', js: "const list = document.querySelector('#todo');\nconst form = document.querySelector('form');\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const text = form.task.value.trim();\n  if (!text) return;\n  list.insertAdjacentHTML('beforeend', '<li><span></span> <button data-action=\"done\">✓</button> <button data-action=\"delete\">✕</button></li>');\n  list.lastElementChild.querySelector('span').textContent = text;\n  form.reset();\n});\n\nlist.addEventListener('click', (event) => {\n  const button = event.target.closest('button');\n  if (!button) return;\n  const item = button.closest('li');\n  if (button.dataset.action === 'delete') item.remove();\n  if (button.dataset.action === 'done') item.classList.toggle('done');\n});" } },
        { note: 'Diqqat qiling: foydalanuvchi matni `textContent` orqali qo‘yildi, `innerHTML` orqali emas — `<img onerror=…>` kabi kiritma kod sifatida bajarilmaydi.' }
      ]
    },
    {
      title: 'Formalar bilan ishlash va brauzer xotirasi',
      blocks: [
        { code: "form.addEventListener('submit', (event) => {\n  event.preventDefault();                 // sahifa qayta yuklanmasin\n  const data = new FormData(form);\n  const user = Object.fromEntries(data);   // { name: '…', email: '…' }\n  if (!form.checkValidity()) {\n    form.reportValidity();\n    return;\n  }\n  console.log(user);\n});", lang: 'js' },
        'Kichik hajmdagi ma’lumotni brauzerda saqlash uchun **localStorage** ishlatiladi. U faqat satrlarni saqlaydi, shuning uchun obyektlar JSON ga aylantiriladi. Ma’lumot brauzer yopilganda ham saqlanib qoladi (`sessionStorage` — faqat vkladka yopilguncha).',
        { code: "const saved = JSON.parse(localStorage.getItem('settings') || '{}');\nconsole.log('Oldin saqlangan:', saved);\n\nconst settings = { theme: 'dark', visits: (saved.visits || 0) + 1 };\nlocalStorage.setItem('settings', JSON.stringify(settings));\nconsole.log('Tashriflar soni:', settings.visits, '— «Ishga tushirish»ni yana bosing');", lang: 'js', run: true },
        { warn: 'localStorage ga parol, token kabi maxfiy ma’lumotlarni saqlamang: sahifadagi har qanday skript (jumladan, XSS orqali kiritilgan) uni o‘qiy oladi.' }
      ]
    }
  ],
  conclusion: [
    'DOM — sahifaning JavaScript uchun obyektli ko‘rinishi. `querySelector` bilan elementni topib, `textContent`, `classList`, atributlar orqali o‘zgartirish, `createElement`/`append`/`remove` bilan tuzilishni boshqarish mumkin.',
    'Interaktivlik hodisalar orqali quriladi: `addEventListener`, hodisa obyekti, `preventDefault` va bubbling ga asoslangan delegatsiya. Foydalanuvchi matnini har doim `textContent` bilan chiqarish xavfsizlik qoidasidir.'
  ],
  glossary: [
    ['DOM', 'Hujjatning obyektli modeli — elementlar daraxti va ular bilan ishlash API si.'],
    ['Tugun (node)', 'DOM daraxtining har bir elementi: element, matn, izoh.'],
    ['Hodisa (event)', 'Sahifada sodir bo‘lgan voqea haqida signal.'],
    ['Tinglovchi (listener)', 'Hodisa sodir bo‘lganda chaqiriladigan funksiya.'],
    ['Bubbling', 'Hodisaning maqsad elementdan yuqoriga — ajdodlarga tarqalishi.'],
    ['Delegatsiya', 'Bolalar hodisalarini umumiy ota elementdagi bitta tinglovchi orqali qayta ishlash.'],
    ['localStorage', 'Brauzerda kalit–qiymat ko‘rinishida doimiy saqlanadigan xotira.']
  ],
  questions: [
    'DOM nima va u HTML koddan qanday farq qiladi?',
    '`querySelector` va `querySelectorAll` farqi nimada?',
    '`textContent` va `innerHTML` ning farqi va xavfsizlik jihati.',
    'Elementga klass qo‘shish va olib tashlashning eng yaxshi usuli qaysi?',
    'Yangi elementni yaratib sahifaga qo‘shish bosqichlarini ayting.',
    '`event.target` va `event.currentTarget` farqi nimada?',
    '`preventDefault()` qachon ishlatiladi?',
    'Hodisaning tarqalish bosqichlarini tushuntiring.',
    'Delegatsiyaning afzalliklari qanday?',
    'localStorage va sessionStorage farqi nimada? Nima uchun unda maxfiy ma’lumot saqlab bo‘lmaydi?'
  ]
};
