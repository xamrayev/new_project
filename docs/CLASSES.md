# Dars mashg‘ulotlari: ma’ruza va amaliy materiallarini yozish

Kursda ikki yo‘nalish bor:

| Yo‘nalish | Qayerda | Nima |
|---|---|---|
| **Dars mashg‘ulotlari** | `src/classes/` | Fan dasturidagi 18 ta ma’ruza matni (M1–M18) va 19 ta amaliy mashg‘ulotni bajarish qo‘llanmasi (A1–A19) |
| **Mustaqil ta’lim** | `src/course/` | 34 ta interaktiv dars, 170 ta avtomatik tekshiriladigan topshiriq (format: [AUTHORING.md](AUTHORING.md)) |

Ushbu hujjat birinchi yo‘nalish haqida.

## Fayllar

```
src/classes/
├── index.js          yig‘ish, raqamlash, bog‘lanishlar (ma’ruza ↔ amaliy)
├── literature.js     adabiyotlar ro‘yxati: [1]…[5]
├── mock-api.js       «Sinab ko‘rish» dagi fetch() misollari uchun o‘quv serveri
├── sql-lab.js        brauzerdagi SQL laboratoriyasi (SQLite, sql.js)
├── lectures/m01.js … m18.js
└── practicals/a01.js … a19.js
```

Yangi mavzu qo‘shilsa, uni `index.js` dagi import ro‘yxatiga ham yozing.

## Ma’ruza

```js
export default {
  id: 'm3',                 // URL: #/maruza/m3 — `m` + raqam
  number: 3,
  title: 'HTML5: Veb sahifa strukturasi va semantikasi',
  summary: 'Ro‘yxatda ko‘rinadigan bir qatorlik tavsif.',
  literature: [1],          // literature.js dagi raqamlar
  goals: ['…'],             // «Maqsad» — ro‘yxat
  keywords: ['teg', '…'],   // «Tayanch iboralar»
  practicals: ['a1'],       // bog‘liq amaliy mashg‘ulotlar
  lessons: ['html-forms'],  // mustaqil ta’limdagi bog‘liq darslar (src/course id lari)
  sections: [               // asosiy qism; «Reja» shu sarlavhalardan tuziladi
    { title: 'Bo‘lim sarlavhasi', blocks: [ /* bloklar, pastda */ ] }
  ],
  conclusion: [ /* bloklar */ ],
  glossary: [['Atama', 'Ta’rif']],
  questions: ['Nazorat savoli?']
};
```

## Amaliy mashg‘ulot

```js
export default {
  id: 'a4', number: 4,
  title: '…', summary: '…',
  duration: '2 soat (80 daqiqa)',  // ixtiyoriy, standart qiymat shu
  lectures: ['m6'], lessons: ['js-dom'],
  goal: 'Ishning maqsadi — bitta paragraf.',
  outcomes: ['… qila oladi;'],     // «Ish yakunida talaba»
  tools: ['Kerakli dasturlar'],
  theory: [ /* bloklar */ ],       // qisqa nazariy ma’lumot
  steps: [                         // ishni bajarish tartibi — har biri «Bajarildi» deb belgilanadi
    { title: 'Qadam sarlavhasi', blocks: [ /* bloklar */ ] }
  ],
  tasks: [                         // mustaqil topshiriqlar
    { title: '…', level: 'easy' | 'medium' | 'hard', blocks: [ /* bloklar */ ] }
  ],
  report: ['Hisobotga nima kiradi'],
  criteria: [['Mezon', '1'], ['**Jami**', '**5**']],
  questions: ['…']
};
```

Talaba belgilagan qadamlar va «o‘qildi» belgilari brauzerda
(`webdev-course:classes:v1`) saqlanadi; amaliy ish barcha qadamlar
belgilanganda «bajarildi» hisoblanadi.

## Bloklar

Mustaqil ta’lim nazariyasi bilan bir xil format (`components/ContentBlocks.vue`):

| Blok | Ko‘rinishi |
|---|---|
| `'matn'` yoki `{ p }` | paragraf |
| `{ lead }` | kirish paragrafi (kattaroq) |
| `{ h }`, `{ h4 }` | kichik sarlavhalar |
| `{ ul: [] }`, `{ ol: [] }` | ro‘yxatlar |
| `{ note }`, `{ tip }`, `{ warn }` | ko‘k, yashil, sariq izoh |
| `{ table: { head, rows } }` | jadval |
| `{ terms: [[atama, ta’rif]] }` | ta’riflar ro‘yxati |
| `{ code, lang, title?, run?, sandbox? }` | kod bloki, «Nusxa olish» tugmasi bilan |

Matn ichida: `` `kod` ``, `**qalin**`, `*kursiv*`, `[havola](https://…)`.
Hamma narsa avval ekranlanadi — matnda `<script>` deb bemalol yozish mumkin.

### «Sinab ko‘rish» tugmasi

Kod blokiga `run` qo‘shilsa, misol erkin playgroundda ochiladi:

```js
{ code: '<h1>Salom</h1>', lang: 'html', run: true }            // blokning o‘zi
{ code: 'console.log(1)', lang: 'js', run: true }
{ code: cssKodi, lang: 'css', run: { html: '…', css: cssKodi } } // bir necha fayl
{ code: fetchKodi, lang: 'js', run: true, sandbox: DEMO_API }   // o‘quv serveri bilan
{ code: sql, lang: 'sql', ...sqlLab(UNIVERSITY_SCHEMA, sql) }    // SQL laboratoriya
```

`sandbox` — mustaqil ta’lim darslaridagi kabi qo‘shimchalar: `mockApi`
(internetsiz javob beruvchi `fetch`), `storageSeed`, `allowNetwork`.
Tashqi CDN dan skript yuklaydigan misollar (Vue, sql.js) internet talab qiladi.

## Tekshirish

```bash
npm run validate        # tuzilma: id, raqamlar, bloklar, havolalar, JS sintaksisi
npm run test:examples   # barcha «Sinab ko‘rish» misollarini brauzerda sandboxda ishga tushiradi
```

`test:examples` ushlanmagan xato, rad etilgan Promise yoki qotib qolgan sahifani
topadi. `console.error` ataylab ishlatilgan misollar (xatolarni ushlash
namunalari) xato hisoblanmaydi. `--only=m7` — bitta mavzu, `--offline=1` —
CDN talab qiladigan misollarsiz.

## Adabiyotlar

`literature.js` dagi ro‘yxat fan dasturidagi adabiyotlar tartibiga mos
bo‘lishi kerak: dasturda `[2]` qaysi manba bo‘lsa, shu yerda ham `2` o‘sha
manba. Ro‘yxat o‘zgarsa, faqat shu fayl tahrirlanadi.
