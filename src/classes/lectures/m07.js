/* M7. AJAX va asinxron veb ilovalar. */
import { DEMO_API } from '../mock-api.js';

const listHtml = '<button id="load">Talabalarni yuklash</button>\n<p id="status"></p>\n<ul id="list"></ul>';

export default {
  id: 'm7',
  number: 7,
  title: 'AJAX va asinxron veb ilovalar',
  summary: 'Sinxron va asinxron kod, event loop, callback, Promise, async/await, fetch va JSON.',
  literature: [3, 4],
  goals: [
    'AJAX tushunchasi va u vebga olib kelgan o‘zgarishlarni tushunish.',
    'Sinxron va asinxron bajarilish, event loop mexanizmini bilish.',
    'Callback, Promise va async/await bilan ishlashni o‘rganish.',
    'Fetch API orqali serverdan ma’lumot olish va yuborish, xatolarni qayta ishlashni o‘rganish.'
  ],
  keywords: ['AJAX', 'XMLHttpRequest', 'asinxron', 'event loop', 'callback', 'Promise', 'async', 'await', 'fetch', 'JSON', 'CORS', 'timeout', 'AbortController'],
  practicals: ['a7'],
  lessons: ['js-fetch', 'js-async', 'js-modules'],
  sections: [
    {
      title: 'AJAX tushunchasi',
      blocks: [
        { lead: 'AJAX (Asynchronous JavaScript and XML) — sahifani qayta yuklamasdan, orqa fonda server bilan ma’lumot almashish usuli. Bu atamani 2005-yilda Jessi Jeyms Garret taklif qilgan; Gmail va Google Maps AJAX ning kuchini birinchilardan bo‘lib ko‘rsatgan.' },
        { table: { head: ['An’anaviy model', 'AJAX modeli'], rows: [
          ['Har bir amal — yangi sahifa so‘rovi', 'Faqat kerakli ma’lumot so‘raladi'],
          ['Server butun HTML ni qaytaradi', 'Server ko‘pincha JSON qaytaradi'],
          ['Sahifa «oq ekran» bilan qayta yuklanadi', 'Sahifaning bir qismi yangilanadi'],
          ['Holat (skroll, kiritilgan matn) yo‘qoladi', 'Holat saqlanadi, tajriba silliq']
        ] } },
        'Nomida XML bo‘lsa-da, bugun deyarli har doim **JSON** formati ishlatiladi. Dastlabki vosita `XMLHttpRequest` obyekti edi, hozir uning o‘rnini zamonaviy **Fetch API** egallagan.',
        { code: "// Eski usul — XMLHttpRequest (tanishib qo‘yish uchun)\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/students');\nxhr.onload = () => {\n  if (xhr.status === 200) console.log(JSON.parse(xhr.responseText));\n};\nxhr.onerror = () => console.error('Tarmoq xatosi');\nxhr.send();", lang: 'js' }
      ]
    },
    {
      title: 'Sinxron va asinxron kod, event loop',
      blocks: [
        'JavaScript **bir oqimli** (single-threaded): bir vaqtda faqat bitta kod bajariladi. Agar tarmoq so‘rovi javobini kutib turilsa, sahifa «qotib qoladi». Shuning uchun uzoq davom etadigan amallar (tarmoq, taymer, fayl) **asinxron** bajariladi: brauzer ularni orqa fonda bajarib, tayyor bo‘lganda natijani navbatga qo‘yadi.',
        { code: "console.log('1. Boshlandi');\n\nsetTimeout(() => console.log('3. Taymer (0 ms)'), 0);\n\nPromise.resolve().then(() => console.log('2.5 Promise (mikrovazifa)'));\n\nconsole.log('2. Tugadi');", lang: 'js', run: true },
        { h: 'Event loop qanday ishlaydi' },
        { code: '┌──────────────┐     ┌──────────────────────┐\n│  Call stack  │ ◄── │  Event loop          │\n│ (bajarilayot-│     │ stack bo‘shasa —     │\n│  gan kod)    │     │ navbatdan oladi      │\n└──────┬───────┘     └─────────▲────────────┘\n       │ setTimeout, fetch,    │\n       ▼ hodisalar             │\n┌──────────────┐     ┌─────────┴────────────┐\n│  Web API lar │ ──► │ Navbatlar:           │\n│ (brauzer)    │     │ mikrovazifalar (Promise)│\n└──────────────┘     │ makrovazifalar (taymer, hodisa)│\n                     └──────────────────────┘', lang: 'text', title: 'Event loop sxemasi' },
        { ol: [
          'Sinxron kod call stack da to‘liq bajariladi.',
          'Stack bo‘shagach, avval **barcha mikrovazifalar** (Promise `then`) bajariladi.',
          'So‘ng navbatdagi **bitta makrovazifa** (taymer, hodisa) olinadi va jarayon takrorlanadi.'
        ] }
      ]
    },
    {
      title: 'Callback va «callback hell»',
      blocks: [
        'Asinxron natijani olishning eng oddiy usuli — **callback**: amal tugagach chaqiriladigan funksiyani oldindan berish.',
        { code: "function loadUser(id, callback) {\n  setTimeout(() => callback({ id, name: 'Aziz' }), 300);\n}\n\nloadUser(1, (user) => {\n  console.log('Foydalanuvchi:', user.name);\n});", lang: 'js', run: true },
        'Bir nechta ketma-ket amal bo‘lsa, callback lar bir-birining ichiga kirib ketadi va kodni o‘qish, xatolarni ushlash qiyinlashadi:',
        { code: "loadUser(1, (user) => {\n  loadGroup(user.groupId, (group) => {\n    loadSchedule(group.id, (schedule) => {\n      loadRoom(schedule.roomId, (room) => {\n        // ... «callback hell» (piramida)\n      });\n    });\n  });\n});", lang: 'js' }
      ]
    },
    {
      title: 'Promise',
      blocks: [
        '**Promise** (va’da) — kelajakda tayyor bo‘ladigan natijani ifodalovchi obyekt. U uch holatdan birida bo‘ladi: `pending` (kutilmoqda), `fulfilled` (bajarildi) yoki `rejected` (xato).',
        { code: "function delay(ms, value) {\n  return new Promise((resolve, reject) => {\n    if (ms < 0) reject(new Error('Vaqt manfiy bo‘lishi mumkin emas'));\n    setTimeout(() => resolve(value), ms);\n  });\n}\n\ndelay(300, 'birinchi')\n  .then((result) => {\n    console.log(result);\n    return delay(300, 'ikkinchi');   // zanjir: keyingi then shu natijani kutadi\n  })\n  .then((result) => console.log(result))\n  .then(() => delay(-1))\n  .catch((error) => console.error('Ushlandi:', error.message))\n  .finally(() => console.log('Har doim bajariladi'));", lang: 'js', run: true },
        { h: 'Bir nechta Promise bilan ishlash' },
        { table: { head: ['Metod', 'Natija'], rows: [
          ['`Promise.all([a, b])`', 'Hammasi bajarilsa — natijalar massivi; bittasi xato bo‘lsa — xato'],
          ['`Promise.allSettled([a, b])`', 'Hammasining holati (xato bo‘lsa ham)'],
          ['`Promise.race([a, b])`', 'Birinchi tugaganining natijasi'],
          ['`Promise.any([a, b])`', 'Birinchi muvaffaqiyatli natija']
        ] } }
      ]
    },
    {
      title: 'async / await',
      blocks: [
        '`async`/`await` — Promise ustidagi qulay sintaksis: asinxron kod sinxron koddek yuqoridan pastga o‘qiladi. `await` faqat `async` funksiya ichida (yoki modulning yuqori darajasida) ishlatiladi va Promise bajarilguncha funksiyani «to‘xtatib turadi» — lekin sahifani emas.',
        { code: "const wait = (ms) => new Promise((r) => setTimeout(r, ms));\n\nasync function main() {\n  console.log('Yuklanmoqda…');\n  await wait(400);\n  console.log('Birinchi qadam tayyor');\n\n  try {\n    await Promise.reject(new Error('Server javob bermadi'));\n  } catch (error) {\n    console.error('Xato ushlandi:', error.message);\n  }\n\n  // Parallel bajarish — ketma-ket kutishdan tezroq\n  const started = performance.now();\n  await Promise.all([wait(300), wait(300), wait(300)]);\n  console.log('Parallel:', Math.round(performance.now() - started), 'ms');\n}\n\nmain();", lang: 'js', run: true },
        { tip: 'Bir-biriga bog‘liq bo‘lmagan so‘rovlarni ketma-ket `await` qilmang — `Promise.all` bilan parallel yuboring. 3 ta 300 ms lik so‘rov ketma-ket 900 ms, parallel esa ~300 ms oladi.' }
      ]
    },
    {
      title: 'Fetch API',
      blocks: [
        '`fetch(url, options)` HTTP so‘rov yuboradi va `Response` obyektiga aylanadigan Promise qaytaradi.',
        { code: "const button = document.querySelector('#load');\nconst status = document.querySelector('#status');\nconst list = document.querySelector('#list');\n\nbutton.addEventListener('click', async () => {\n  status.textContent = 'Yuklanmoqda…';\n  button.disabled = true;\n  try {\n    const response = await fetch('/api/students');\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const students = await response.json();\n\n    list.innerHTML = '';\n    students.forEach((s) => {\n      const li = document.createElement('li');\n      li.textContent = `${s.name} — ${s.group}, GPA ${s.gpa}`;\n      list.append(li);\n    });\n    status.textContent = `${students.length} ta talaba yuklandi`;\n  } catch (error) {\n    status.textContent = 'Xatolik: ' + error.message;\n  } finally {\n    button.disabled = false;\n  }\n});", lang: 'js', run: { html: listHtml, js: "const button = document.querySelector('#load');\nconst status = document.querySelector('#status');\nconst list = document.querySelector('#list');\n\nbutton.addEventListener('click', async () => {\n  status.textContent = 'Yuklanmoqda…';\n  button.disabled = true;\n  try {\n    const response = await fetch('/api/students');\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const students = await response.json();\n\n    list.innerHTML = '';\n    students.forEach((s) => {\n      const li = document.createElement('li');\n      li.textContent = `${s.name} — ${s.group}, GPA ${s.gpa}`;\n      list.append(li);\n    });\n    status.textContent = `${students.length} ta talaba yuklandi`;\n  } catch (error) {\n    status.textContent = 'Xatolik: ' + error.message;\n  } finally {\n    button.disabled = false;\n  }\n});" }, sandbox: DEMO_API },
        { warn: '`fetch` faqat **tarmoq xatosida** (internet yo‘q, server topilmadi) Promise ni rad etadi. 404 yoki 500 javoblari ham «muvaffaqiyatli» hisoblanadi — shuning uchun `response.ok` ni doim tekshiring.' },
        { code: "async function check(url) {\n  const response = await fetch(url);\n  console.log(url, '→', response.status, response.ok);\n}\n(async () => {\n  await check('/api/courses');\n  await check('/api/missing');\n  await check('/api/broken');\n})();", lang: 'js', run: true, sandbox: DEMO_API },
        { h: 'Ma’lumot yuborish (POST)' },
        { code: "const response = await fetch('/api/students', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'Authorization': `Bearer ${token}`\n  },\n  body: JSON.stringify({ name: 'Yangi talaba', group: 'DI-24' })\n});\nconst created = await response.json();   // odatda 201 Created", lang: 'js' },
        { h: 'Bekor qilish va kutish muddati' },
        { code: "const controller = new AbortController();\nconst timer = setTimeout(() => controller.abort(), 5000);   // 5 s dan keyin bekor\n\ntry {\n  const response = await fetch('/api/slow', { signal: controller.signal });\n  console.log(await response.json());\n} catch (error) {\n  if (error.name === 'AbortError') console.log('So‘rov bekor qilindi');\n} finally {\n  clearTimeout(timer);\n}", lang: 'js' }
      ]
    },
    {
      title: 'JSON, CORS va foydalanuvchi tajribasi',
      blocks: [
        '**JSON** (JavaScript Object Notation) — ma’lumot almashishning matnli formati. Kalitlar faqat qo‘shtirnoqda, funksiya va `undefined` saqlanmaydi.',
        { code: '{\n  "id": 2,\n  "name": "Dilnoza Rahimova",\n  "active": true,\n  "skills": ["HTML", "CSS", "Vue"],\n  "address": { "city": "Namangan" },\n  "mentor": null\n}', lang: 'json' },
        { h: 'CORS' },
        'Brauzer xavfsizlik uchun **bir manba siyosati**ni (Same-Origin Policy) qo‘llaydi: `https://a.uz` sahifasidagi skript `https://api.b.uz` dan javobni faqat server ruxsat bersa o‘qiy oladi. Ruxsat `Access-Control-Allow-Origin` sarlavhasi orqali beriladi — bu **CORS** (Cross-Origin Resource Sharing) mexanizmi. «CORS error» ni frontendda emas, server sozlamalarida hal qilinadi.',
        { h: 'Asinxron interfeysning yaxshi amaliyotlari' },
        { ul: [
          'Yuklanish holatini ko‘rsating (spinner, «Yuklanmoqda…», skelet).',
          'Xato bo‘lganda tushunarli xabar va «Qayta urinish» tugmasini bering.',
          'So‘rov davomida tugmani bloklang — ikki marta yuborilmasin.',
          'Qidiruv maydonida har bir belgiga so‘rov yubormang — **debounce** (300 ms kutish) qo‘llang.',
          'Bo‘sh natija uchun alohida holat ko‘rsating («Hech narsa topilmadi»).'
        ] }
      ]
    }
  ],
  conclusion: [
    'AJAX sahifani qayta yuklamasdan server bilan ma’lumot almashish imkonini berdi va zamonaviy veb-ilovalar asosiga aylandi. JavaScript bir oqimli, asinxron amallar event loop orqali boshqariladi.',
    'Asinxron kod callback → Promise → async/await yo‘lidan rivojlandi. Fetch API bilan ishlashda `response.ok` ni tekshirish, xatolarni `try/catch` bilan ushlash va yuklanish holatlarini ko‘rsatish shart.'
  ],
  glossary: [
    ['AJAX', 'Sahifani qayta yuklamasdan server bilan asinxron ma’lumot almashish usuli.'],
    ['Asinxron', 'Natijasini kutmasdan keyingi kodga o‘tadigan bajarilish usuli.'],
    ['Event loop', 'Navbatdagi vazifalarni call stack bo‘shaganda bajaruvchi mexanizm.'],
    ['Promise', 'Kelajakdagi natija yoki xatoni ifodalovchi obyekt.'],
    ['async/await', 'Promise bilan ishlashni sinxron ko‘rinishda yozish sintaksisi.'],
    ['Fetch API', 'HTTP so‘rovlar yuborish uchun zamonaviy brauzer interfeysi.'],
    ['CORS', 'Boshqa manbadagi resurslarga kirishni server ruxsati bilan boshqarish mexanizmi.']
  ],
  questions: [
    'AJAX qanday muammoni hal qildi?',
    'JavaScript bir oqimli bo‘lsa, asinxron amallar qanday bajariladi?',
    'Mikrovazifa va makrovazifa farqi nimada? `setTimeout(..., 0)` nima uchun Promise dan keyin bajariladi?',
    '«Callback hell» nima va u qanday hal qilinadi?',
    'Promise ning uch holatini ayting.',
    '`Promise.all` va `Promise.allSettled` farqi nimada?',
    '`await` ni qayerda ishlatish mumkin?',
    'Nima uchun `fetch` 404 javobida `catch` ga tushmaydi?',
    'POST so‘rov bilan JSON yuborish uchun qanday sozlamalar kerak?',
    'CORS xatosi nima va u qayerda hal qilinadi?'
  ]
};
