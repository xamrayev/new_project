/* A7. AJAX so'rovlari yordamida serverdan ma'lumot olish. */
import { DEMO_API } from '../mock-api.js';

const html = '<main class="wrap">\n  <h1>Talabalar ro‘yxati</h1>\n  <div class="toolbar">\n    <button id="load">Yuklash</button>\n    <input id="search" placeholder="Ism yoki shahar bo‘yicha qidirish" disabled>\n  </div>\n  <p id="status" class="status"></p>\n  <table hidden>\n    <thead><tr><th>#</th><th>F.I.Sh.</th><th>Guruh</th><th>Shahar</th><th>GPA</th></tr></thead>\n    <tbody id="rows"></tbody>\n  </table>\n</main>';
const css = 'body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; }\n.wrap { max-width: 760px; margin: 0 auto; padding: 20px; }\n.toolbar { display: flex; gap: 8px; }\n.toolbar input { flex: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }\nbutton { padding: 8px 14px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; cursor: pointer; }\nbutton:disabled { opacity: .5; }\n.status { min-height: 1.4em; color: #475569; }\n.status.error { color: #dc2626; }\ntable { width: 100%; border-collapse: collapse; background: #fff; }\nth, td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }\n.spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid #93c5fd; border-top-color: #2563eb; border-radius: 50%; animation: spin .8s linear infinite; vertical-align: -2px; }\n@keyframes spin { to { transform: rotate(360deg); } }';

const step1 = "fetch('/api/students')\n  .then((response) => {\n    console.log('Holat:', response.status, response.ok);\n    console.log('Content-Type:', response.headers.get('Content-Type'));\n    return response.json();          // bu ham Promise\n  })\n  .then((students) => {\n    console.log('Talabalar soni:', students.length);\n    console.log('Birinchisi:', students[0]);\n  })\n  .catch((error) => console.error('Tarmoq xatosi:', error.message));\n\nconsole.log('Bu qator javobdan OLDIN chiqadi — fetch asinxron!');";

const core = "const status = document.querySelector('#status');\nconst rows = document.querySelector('#rows');\nconst table = document.querySelector('table');\nconst loadButton = document.querySelector('#load');\nconst search = document.querySelector('#search');\nlet students = [];\n\nasync function getJSON(url) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`Server xatosi: ${response.status}`);\n  return response.json();\n}\n\nfunction setStatus(text, isError = false) {\n  status.textContent = text;\n  status.classList.toggle('error', isError);\n}\n\nfunction render(list) {\n  rows.replaceChildren(...list.map((s, i) => {\n    const tr = document.createElement('tr');\n    [i + 1, s.name, s.group, s.city, s.gpa].forEach((value) => {\n      const td = document.createElement('td');\n      td.textContent = value;\n      tr.append(td);\n    });\n    return tr;\n  }));\n  table.hidden = list.length === 0;\n}\n\nasync function load() {\n  loadButton.disabled = true;\n  status.innerHTML = '<span class=\"spinner\"></span> Yuklanmoqda…';\n  try {\n    students = await getJSON('/api/students');\n    render(students);\n    setStatus(`${students.length} ta talaba yuklandi`);\n    search.disabled = false;\n  } catch (error) {\n    setStatus(`${error.message}. Qayta urinib ko‘ring.`, true);\n  } finally {\n    loadButton.disabled = false;\n  }\n}\n\nloadButton.addEventListener('click', load);\n";

const searchJs = "\nfunction debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n\nsearch.addEventListener('input', debounce(() => {\n  const query = search.value.trim().toLowerCase();\n  const found = students.filter((s) =>\n    s.name.toLowerCase().includes(query) || s.city.toLowerCase().includes(query)\n  );\n  render(found);\n  setStatus(found.length ? `${found.length} ta natija` : 'Hech narsa topilmadi');\n  console.log('Qidiruv:', query);\n}, 300));\n";

export default {
  id: 'a7',
  number: 7,
  title: 'AJAX so‘rovlari yordamida serverdan ma’lumot olish',
  summary: 'Fetch API va async/await bilan ma’lumotni yuklaymiz, holatlarni ko‘rsatamiz, xatolarni ushlaymiz va qidiruv qo‘shamiz.',
  lectures: ['m7', 'm2'],
  lessons: ['js-fetch', 'js-async'],
  goal: 'Fetch API, Promise va async/await yordamida serverdan JSON ma’lumotlarni asinxron olish, ularni sahifada ko‘rsatish hamda yuklanish va xato holatlarini to‘g‘ri qayta ishlash ko‘nikmasini shakllantirish.',
  outcomes: [
    'GET va POST so‘rovlarini `fetch` bilan yuboradi;',
    '`response.ok`, holat kodlari va sarlavhalarni tekshiradi;',
    'async/await va `try/catch/finally` bilan asinxron kod yozadi;',
    'yuklanish, bo‘sh natija va xato holatlarini foydalanuvchiga ko‘rsatadi;',
    'parallel so‘rovlar (`Promise.all`) va debounce ni qo‘llaydi.'
  ],
  tools: [
    'Kurs platformasidagi «Erkin playground» — unda o‘quv serveri (`/api/students`, `/api/courses`, `/api/missing`, `/api/broken`, `/api/slow`, `/api/feedback`) internetsiz javob beradi.',
    'O‘z kompyuteringizda ishlash uchun ochiq API lar: https://jsonplaceholder.typicode.com, https://api.github.com',
    'DevTools → Network (so‘rovlarni kuzatish, Fetch/XHR filtri, sekin tarmoqni imitatsiya qilish — Slow 3G).'
  ],
  theory: [
    { code: "async function load() {\n  try {\n    const response = await fetch(url, { method: 'GET' });\n    if (!response.ok) throw new Error(response.status);   // 4xx/5xx\n    const data = await response.json();\n    // … data bilan ishlash\n  } catch (error) {\n    // tarmoq xatosi yoki yuqorida tashlangan xato\n  } finally {\n    // yuklanish holatini o‘chirish\n  }\n}", lang: 'js', title: 'Asosiy shablon' },
    { note: '`fetch` faqat tarmoq xatosida rad etiladi. 404 va 500 javoblari ham «muvaffaqiyatli» Promise — shuning uchun `response.ok` ni har doim tekshiring.' }
  ],
  steps: [
    {
      title: 'Birinchi so‘rov: then zanjiri',
      blocks: [
        '`fetch` Promise qaytaradi. Birinchi `then` da javob sarlavhalari, ikkinchisida — JSON ga aylantirilgan tana. Konsoldagi chiqish tartibiga e’tibor bering.',
        { code: step1, lang: 'js', run: true, sandbox: DEMO_API }
      ]
    },
    {
      title: 'async/await ga o‘tkazish va xatolarni ushlash',
      blocks: [
        'Xuddi shu so‘rovni async/await bilan yozing va turli javoblarni sinang: mavjud, topilmagan (404) va server xatosi (500).',
        { code: "async function getJSON(url) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`${url} → ${response.status}`);\n  return response.json();\n}\n\nasync function main() {\n  for (const url of ['/api/courses', '/api/missing', '/api/broken']) {\n    try {\n      const data = await getJSON(url);\n      console.log('✓', url, data);\n    } catch (error) {\n      console.error('✕', error.message);\n    }\n  }\n}\n\nmain();", lang: 'js', run: true, sandbox: DEMO_API }
      ]
    },
    {
      title: 'Ma’lumotni sahifada ko‘rsatish',
      blocks: [
        'Endi natijani jadvalga chiqaring. Yuklanish paytida spinner ko‘rsatiladi va tugma bloklanadi; xatoda tushunarli xabar chiqadi.',
        { code: html, lang: 'html' },
        { code: core, lang: 'js', run: { html, css, js: core }, sandbox: DEMO_API },
        { tip: 'DevTools → Network → «No throttling» ni «Slow 3G» ga o‘zgartirib, yuklanish holati qanday ko‘rinishini tekshiring.' }
      ]
    },
    {
      title: 'Qidiruv va debounce',
      blocks: [
        'Qidiruv har bir belgida emas, foydalanuvchi yozishni to‘xtatgandan 300 ms keyin bajariladi. Server qidiruvida bu so‘rovlar sonini keskin kamaytiradi.',
        { code: searchJs, lang: 'js', run: { html, css, js: core + searchJs }, sandbox: DEMO_API }
      ]
    },
    {
      title: 'Parallel so‘rovlar: Promise.all',
      blocks: [
        'Bir-biriga bog‘liq bo‘lmagan ma’lumotlarni (talabalar, kurslar, ob-havo) ketma-ket emas, parallel yuklang va vaqtni solishtiring.',
        { code: "const getJSON = (url) => fetch(url).then((r) => r.json());\n\nasync function sequential() {\n  const t = performance.now();\n  await getJSON('/api/students');\n  await getJSON('/api/courses');\n  await getJSON('/api/weather');\n  console.log('Ketma-ket:', Math.round(performance.now() - t), 'ms');\n}\n\nasync function parallel() {\n  const t = performance.now();\n  const [students, courses, weather] = await Promise.all([\n    getJSON('/api/students'),\n    getJSON('/api/courses'),\n    getJSON('/api/weather')\n  ]);\n  console.log('Parallel:', Math.round(performance.now() - t), 'ms');\n  console.log(`${students.length} talaba, ${courses.length} kurs, ${weather.city}: ${weather.temp}°C`);\n}\n\nsequential().then(parallel);", lang: 'js', run: true, sandbox: DEMO_API }
      ]
    },
    {
      title: 'Ma’lumot yuborish (POST) va kutish muddati',
      blocks: [
        'Fikr-mulohaza formasini JSON ko‘rinishida serverga yuboring. Javob holati `201 Created` bo‘lishi kerak.',
        { code: "const form = document.querySelector('form');\nconst result = document.querySelector('#result');\n\nform.addEventListener('submit', async (event) => {\n  event.preventDefault();\n  const payload = Object.fromEntries(new FormData(form));\n  try {\n    const response = await fetch('/api/feedback', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(payload)\n    });\n    const body = await response.json();\n    console.log('Yuborildi:', payload, '→', response.status, body);\n    result.textContent = response.status === 201 ? `Rahmat! Murojaat №${body.id}` : 'Xatolik';\n    form.reset();\n  } catch (error) {\n    result.textContent = 'Tarmoq xatosi';\n  }\n});", lang: 'js', run: { html: '<form>\n  <input name="name" placeholder="Ismingiz" required>\n  <textarea name="message" placeholder="Fikringiz" required></textarea>\n  <button>Yuborish</button>\n</form>\n<p id="result"></p>', css: 'body { font-family: sans-serif; padding: 20px; } form { display: grid; gap: 8px; max-width: 320px; } input, textarea { padding: 8px; font: inherit; }', js: "const form = document.querySelector('form');\nconst result = document.querySelector('#result');\n\nform.addEventListener('submit', async (event) => {\n  event.preventDefault();\n  const payload = Object.fromEntries(new FormData(form));\n  try {\n    const response = await fetch('/api/feedback', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(payload)\n    });\n    const body = await response.json();\n    console.log('Yuborildi:', payload, '→', response.status, body);\n    result.textContent = response.status === 201 ? `Rahmat! Murojaat №${body.id}` : 'Xatolik';\n    form.reset();\n  } catch (error) {\n    result.textContent = 'Tarmoq xatosi';\n  }\n});" }, sandbox: DEMO_API },
        'Sekin javob beruvchi `/api/slow` (2 soniya) uchun `AbortController` bilan 1 soniyalik chegara qo‘ying:',
        { code: "async function fetchWithTimeout(url, ms) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    return await response.json();\n  } finally {\n    clearTimeout(timer);\n  }\n}\n\nfetchWithTimeout('/api/slow', 3000).then((d) => console.log('3 s chegara:', d.message));\nfetchWithTimeout('/api/slow', 1000)\n  .then((d) => console.log(d))\n  .catch((e) => console.warn('1 s chegara:', e.name === 'AbortError' ? 'bekor qilindi' : e.message));", lang: 'js' },
        { note: 'O‘quv serveri `AbortController` signalini hisobga olmaydi, shuning uchun bu misolni haqiqiy serverda (masalan, A9 dagi Express serverida) sinang.' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Talaba kartochkasi',
      level: 'easy',
      blocks: ['Jadval qatorini bosganda `/api/students/2` kabi so‘rov bilan bitta talaba ma’lumotini olib, modal oynada ko‘rsating.']
    },
    {
      title: 'Qayta urinish',
      level: 'medium',
      blocks: ['`getJSON` ga avtomatik qayta urinish qo‘shing: 5xx xatoda 3 martagacha, har safar kutish vaqtini ikki barobar oshirib (500 ms, 1 s, 2 s). `/api/broken` bilan sinang.']
    },
    {
      title: 'Ochiq API bilan ilova',
      level: 'hard',
      blocks: [
        'O‘z kompyuteringizda (internet bilan) ochiq API dan foydalanib ilova yarating (jurnaldagi raqam bo‘yicha):',
        { ol: [
          'GitHub foydalanuvchi profili va repozitoriylari (api.github.com).',
          'Postlar va izohlar (jsonplaceholder.typicode.com).',
          'Valyuta kurslari (cbu.uz/uz/arkhiv-kursov-valyut/json/).',
          'Ob-havo (open-meteo.com — kalitsiz).',
          'Mamlakatlar ma’lumotnomasi (restcountries.com).',
          'Tasodifiy foydalanuvchilar generatori (randomuser.me).',
          'Kitoblar qidiruvi (openlibrary.org/search.json).',
          'Rasmlar galereyasi (picsum.photos/v2/list) — sahifalash bilan.'
        ] },
        'Talablar: yuklanish, xato va bo‘sh natija holatlari; qidiruv yoki filtr; kamida bitta parallel so‘rov.'
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'JavaScript kodi (izohlar bilan).',
    'DevTools → Network dagi so‘rovlar skrinshoti (holat kodi, vaqt, javob).',
    'Yuklanish, muvaffaqiyat va xato holatlari skrinshotlari.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['GET/POST so‘rovlar to‘g‘ri, `response.ok` tekshiriladi', '1'],
    ['async/await va xatolarni qayta ishlash (`try/catch/finally`)', '1'],
    ['Yuklanish, bo‘sh natija va xato holatlari ko‘rsatiladi', '1'],
    ['Debounce va parallel so‘rovlar qo‘llangan', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'AJAX nima va u sahifa qayta yuklanishidan qanday farq qiladi?',
    '`fetch` qaytargan Promise qachon rad etiladi?',
    '`response.json()` nima uchun ham Promise qaytaradi?',
    '`try/catch/finally` ning har bir bloki qachon bajariladi?',
    'POST so‘rovda JSON yuborish uchun nimalar ko‘rsatiladi?',
    'Debounce nima va u qidiruvda nima uchun kerak?',
    '`Promise.all` qachon ishlatiladi va bitta so‘rov xato bo‘lsa nima bo‘ladi?',
    'CORS xatosi qachon yuzaga keladi?'
  ]
};
