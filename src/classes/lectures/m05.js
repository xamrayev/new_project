/* M5. JavaScript: Klient tomoni dasturlash asoslari. */
export default {
  id: 'm5',
  number: 5,
  title: 'JavaScript: Klient tomoni dasturlash asoslari',
  summary: 'O‘zgaruvchilar, ma’lumot turlari, operatorlar, shartlar, sikllar, funksiyalar, massivlar va obyektlar.',
  literature: [3, 4],
  goals: [
    'JavaScript tilining vazifasi va brauzerdagi o‘rnini tushunish.',
    'O‘zgaruvchilar, ma’lumot turlari va operatorlar bilan ishlashni o‘rganish.',
    'Shart operatorlari, sikllar va funksiyalardan foydalanishni o‘rganish.',
    'Massiv va obyektlar ustida asosiy amallarni bajarishni bilish.'
  ],
  keywords: ['ECMAScript', 'let', 'const', 'ma’lumot turi', 'operator', 'if', 'switch', 'for', 'while', 'funksiya', 'arrow function', 'massiv', 'obyekt', 'scope', 'console'],
  practicals: ['a3'],
  lessons: ['js-intro', 'js-variables', 'js-operators', 'js-conditions', 'js-loops', 'js-functions', 'js-arrays', 'js-objects'],
  sections: [
    {
      title: 'JavaScript tili haqida',
      blocks: [
        { lead: 'JavaScript — vebning dasturlash tili. HTML sahifa tuzilishini, CSS ko‘rinishini belgilasa, JavaScript sahifaga xatti-harakat beradi: tugmani bosishga javob berish, ma’lumotni tekshirish, serverdan yangi ma’lumot olish.' },
        { ul: [
          '1995-yilda Brendan Ayk tomonidan Netscape brauzeri uchun 10 kunda yaratilgan.',
          'Standarti — **ECMAScript** (ES). 2015-yildagi ES6 (ES2015) tilni tubdan yangiladi; shundan beri har yili yangi versiya chiqadi.',
          'Dinamik tiplashtirilgan, interpretatsiya qilinadigan (JIT kompilyatsiya bilan), funksional va obyektga yo‘naltirilgan uslublarni qo‘llaydi.',
          'Brauzerda (V8, SpiderMonkey, JavaScriptCore dvigatellari) va serverda (Node.js, M9) ishlaydi.'
        ] },
        { h: 'Sahifaga ulash' },
        { code: '<!-- tashqi fayl — asosiy usul -->\n<script src="app.js" defer></script>\n\n<!-- ichki -->\n<script>\n  console.log(\'Salom, JavaScript!\');\n</script>', lang: 'html' },
        '`defer` atributi skriptni HTML to‘liq tahlil qilingandan keyin ishga tushiradi — shunda skript sahifa elementlarini topa oladi. Natijani ko‘rish uchun brauzer konsolidan (F12 → Console) foydalaning.'
      ]
    },
    {
      title: 'O‘zgaruvchilar va ma’lumot turlari',
      blocks: [
        { code: "const university = 'UBS';   // qayta tayinlab bo‘lmaydi\nlet course = 3;               // qayta tayinlash mumkin\ncourse = course + 1;\n// var — eskirgan usul, blok doirasini tan olmaydi\n\nconsole.log(university, course);\nconsole.log(typeof university, typeof course);", lang: 'js', run: true },
        { tip: 'Qoida: standart holatda `const` ishlating, qiymat o‘zgarishi kerak bo‘lsagina `let`. `var` dan foydalanmang.' },
        { h: 'Ma’lumot turlari' },
        { table: { head: ['Tur', 'Misol', 'Izoh'], rows: [
          ['`number`', '`42`, `3.14`, `NaN`, `Infinity`', 'Butun va kasr sonlar bitta tur'],
          ['`bigint`', '`9007199254740993n`', 'Juda katta butun sonlar'],
          ['`string`', "`'matn'`, `\"matn\"`, `` `Salom, ${ism}` ``", 'Shablon satrlar — teskari qo‘shtirnoq'],
          ['`boolean`', '`true`, `false`', 'Mantiqiy qiymat'],
          ['`undefined`', '`let x;`', 'Qiymat berilmagan'],
          ['`null`', '`let user = null;`', 'Ataylab «bo‘sh»'],
          ['`symbol`', "`Symbol('id')`", 'Noyob identifikator'],
          ['`object`', '`{}`, `[]`, `new Date()`', 'Murakkab (havola) tur']
        ] } },
        { h: 'Turlarni o‘zgartirish' },
        { code: "console.log(Number('42') + 1);   // 43\nconsole.log('42' + 1);           // '421' — satrga ulash!\nconsole.log('42' - 1);           // 41 — ayirishda songa aylanadi\nconsole.log(String(3.5));        // '3.5'\nconsole.log(Boolean(''), Boolean('0'), Boolean(0)); // false true false\nconsole.log(parseInt('12px'), parseFloat('3.75kg'));", lang: 'js', run: true }
      ]
    },
    {
      title: 'Operatorlar',
      blocks: [
        { table: { head: ['Guruh', 'Operatorlar'], rows: [
          ['Arifmetik', '`+ - * / % **`, `++`, `--`'],
          ['Tayinlash', '`= += -= *= /= ??=`'],
          ['Taqqoslash', '`=== !== > < >= <=` (qat’iy), `== !=` (tur o‘zgartiradi)'],
          ['Mantiqiy', '`&&` (va), `||` (yoki), `!` (inkor)'],
          ['Nullish', '`a ?? b` — `a` null/undefined bo‘lsa `b`'],
          ['Ixtiyoriy zanjir', '`user?.address?.city`'],
          ['Ternar', '`shart ? qiymat1 : qiymat2`']
        ] } },
        { code: "console.log(5 == '5');   // true  — tur o‘zgartirildi\nconsole.log(5 === '5');  // false — turlar har xil\n\nconst ball = 76;\nconst natija = ball >= 60 ? 'o‘tdi' : 'o‘tmadi';\nconsole.log(natija);\n\nconst user = { name: 'Vali' };\nconsole.log(user.address?.city ?? 'manzil ko‘rsatilmagan');", lang: 'js', run: true },
        { warn: 'Har doim `===` va `!==` dan foydalaning. `==` kutilmagan natijalar beradi: `0 == \'\'` → `true`, `null == undefined` → `true`.' }
      ]
    },
    {
      title: 'Shartlar va sikllar',
      blocks: [
        { code: "function baho(ball) {\n  if (ball >= 86) return 'a’lo (5)';\n  else if (ball >= 71) return 'yaxshi (4)';\n  else if (ball >= 55) return 'qoniqarli (3)';\n  else return 'qoniqarsiz (2)';\n}\nconsole.log(baho(90), '|', baho(60));\n\nconst kun = 3;\nswitch (kun) {\n  case 1: console.log('Dushanba'); break;\n  case 2: console.log('Seshanba'); break;\n  case 3: console.log('Chorshanba'); break;\n  default: console.log('Boshqa kun');\n}", lang: 'js', run: true },
        { h: 'Sikllar' },
        { code: "for (let i = 1; i <= 5; i++) {\n  console.log(`${i} x 7 = ${i * 7}`);\n}\n\nlet n = 1;\nwhile (n < 100) n *= 2;\nconsole.log('2 ning 100 dan katta birinchi darajasi:', n);\n\nconst fanlar = ['HTML', 'CSS', 'JS'];\nfor (const fan of fanlar) console.log(fan);\n\nconst talaba = { ism: 'Vali', kurs: 3 };\nfor (const kalit in talaba) console.log(kalit, '→', talaba[kalit]);", lang: 'js', run: true },
        '`break` siklni to‘xtatadi, `continue` joriy qadamni o‘tkazib yuboradi.'
      ]
    },
    {
      title: 'Funksiyalar',
      blocks: [
        'Funksiya — nom berilgan, qayta ishlatiladigan kod bloki. U parametrlar qabul qilib, `return` orqali natija qaytaradi.',
        { code: "// 1. Funksiya e’loni (hoisting — e’londan oldin ham chaqirish mumkin)\nfunction yuza(a, b = a) {\n  return a * b;\n}\n\n// 2. Funksiya ifodasi\nconst perimetr = function (a, b) {\n  return 2 * (a + b);\n};\n\n// 3. Strelkali funksiya (arrow function)\nconst kvadrat = (x) => x * x;\nconst salom = (ism = 'mehmon') => `Salom, ${ism}!`;\n\nconsole.log(yuza(3, 4), yuza(5), perimetr(3, 4), kvadrat(9));\nconsole.log(salom(), salom('Dilnoza'));\n\n// Rest parametr\nconst yigindi = (...sonlar) => sonlar.reduce((s, x) => s + x, 0);\nconsole.log(yigindi(1, 2, 3, 4));", lang: 'js', run: true },
        { h: 'Ko‘rinish doirasi (scope) va yopilma (closure)' },
        '`let` va `const` bilan e’lon qilingan o‘zgaruvchi faqat o‘z bloki `{ }` ichida ko‘rinadi. Ichki funksiya tashqi funksiya o‘zgaruvchilarini «eslab qoladi» — bu **closure** deyiladi.',
        { code: "function hisoblagichYarat() {\n  let son = 0;\n  return () => ++son;\n}\nconst keyingi = hisoblagichYarat();\nconsole.log(keyingi(), keyingi(), keyingi()); // 1 2 3", lang: 'js', run: true },
        'JavaScriptda funksiya ham qiymat: uni o‘zgaruvchiga saqlash, boshqa funksiyaga argument sifatida berish (**callback**) mumkin. Bu hodisalar (M6) va asinxron kod (M7) ning asosi.'
      ]
    },
    {
      title: 'Massivlar va obyektlar',
      blocks: [
        { code: "const baholar = [78, 92, 55, 86, 64];\n\nbaholar.push(90);                      // oxiriga qo‘shish\nconsole.log(baholar.length, baholar[0]);\n\nconst yaxshilar = baholar.filter((b) => b >= 71);\nconst foizda   = baholar.map((b) => b + '%');\nconst ortacha  = baholar.reduce((s, b) => s + b, 0) / baholar.length;\nconst birinchiYiqilgan = baholar.find((b) => b < 60);\n\nconsole.log(yaxshilar, foizda);\nconsole.log('O‘rtacha:', ortacha.toFixed(1), '| Birinchi yiqilgan:', birinchiYiqilgan);\nconsole.log([...baholar].sort((a, b) => b - a));", lang: 'js', run: true },
        { table: { head: ['Metod', 'Vazifasi'], rows: [
          ['`push`, `pop`, `shift`, `unshift`', 'Oxiri/boshiga qo‘shish va olib tashlash'],
          ['`slice`, `splice`', 'Qismini nusxalash / o‘zgartirish'],
          ['`indexOf`, `includes`, `find`, `findIndex`', 'Qidirish'],
          ['`map`, `filter`, `reduce`, `forEach`', 'Aylanib chiqish va o‘zgartirish'],
          ['`sort`, `reverse`, `join`', 'Tartiblash, teskari, satrga birlashtirish']
        ] } },
        { h: 'Obyektlar' },
        { code: "const talaba = {\n  ism: 'Dilnoza',\n  guruh: 'DI-22',\n  baholar: [90, 85, 78],\n  ortacha() {\n    return this.baholar.reduce((s, b) => s + b, 0) / this.baholar.length;\n  }\n};\n\ntalaba.kurs = 3;                  // yangi xossa\nconsole.log(talaba.ism, talaba['guruh'], talaba.ortacha().toFixed(1));\n\nconst { ism, guruh } = talaba;    // destrukturizatsiya\nconst nusxa = { ...talaba, kurs: 4 }; // spread\nconsole.log(ism, guruh, nusxa.kurs, Object.keys(talaba));\n\n// JSON — ma’lumot almashish formati\nconst json = JSON.stringify({ ism, guruh });\nconsole.log(json, JSON.parse(json).ism);", lang: 'js', run: true },
        { note: 'Obyekt va massivlar **havola bo‘yicha** saqlanadi: `const b = a` yangi nusxa emas, o‘sha obyektga ikkinchi nom. Nusxa uchun `{ ...a }`, `[...a]` yoki `structuredClone(a)` ishlating.' }
      ]
    },
    {
      title: 'Xatolar bilan ishlash va disk raskadrovka',
      blocks: [
        { code: "function bolish(a, b) {\n  if (b === 0) throw new Error('Nolga bo‘lib bo‘lmaydi');\n  return a / b;\n}\n\ntry {\n  console.log(bolish(10, 2));\n  console.log(bolish(1, 0));\n} catch (error) {\n  console.error('Xato:', error.message);\n} finally {\n  console.log('Hisob tugadi');\n}", lang: 'js', run: true },
        { ul: [
          '`console.log`, `console.table`, `console.error` — qiymatlarni kuzatish.',
          'DevTools → **Sources**: to‘xtash nuqtasi (breakpoint) qo‘yib, kodni qadamma-qadam bajarish.',
          '`debugger;` operatori — DevTools ochiq bo‘lsa, shu joyda to‘xtaydi.',
          '`"use strict"` va modullar — ko‘plab yashirin xatolarni ochiq xatoga aylantiradi.'
        ] }
      ]
    }
  ],
  conclusion: [
    'JavaScript — brauzerda va serverda ishlaydigan dinamik til. Uning asosi: `let`/`const` o‘zgaruvchilar, 8 ta ma’lumot turi, qat’iy taqqoslash, shart va sikllar.',
    'Funksiyalar birinchi darajali qiymat bo‘lib, callback va closure lar orqali hodisalar va asinxron dasturlashga yo‘l ochadi. Massiv metodlari (`map`, `filter`, `reduce`) va obyektlar ma’lumotlar bilan ishlashning asosiy vositasidir.'
  ],
  glossary: [
    ['ECMAScript', 'JavaScript tilining rasmiy standarti.'],
    ['O‘zgaruvchi', 'Qiymatni saqlash uchun nomlangan xotira joyi.'],
    ['Funksiya', 'Parametr qabul qilib natija qaytaruvchi qayta ishlatiladigan kod bloki.'],
    ['Callback', 'Boshqa funksiyaga argument sifatida berilib, keyinroq chaqiriladigan funksiya.'],
    ['Scope', 'O‘zgaruvchi ko‘rinadigan kod sohasi.'],
    ['Closure', 'Funksiyaning o‘zi yaratilgan muhit o‘zgaruvchilarini eslab qolishi.'],
    ['JSON', 'JavaScript obyekt sintaksisiga asoslangan matnli ma’lumot almashish formati.']
  ],
  questions: [
    'HTML, CSS va JavaScript ning vazifalari qanday farqlanadi?',
    '`let`, `const` va `var` ning farqi nimada?',
    'JavaScriptdagi ma’lumot turlarini sanab bering.',
    "`'5' + 2` va `'5' - 2` natijalari nima uchun har xil?",
    '`==` va `===` ning farqini misol bilan tushuntiring.',
    '`for...of` va `for...in` sikllari qachon ishlatiladi?',
    'Funksiya e’loni, funksiya ifodasi va strelkali funksiya farqlari nimada?',
    'Closure nima? Misol keltiring.',
    '`map`, `filter` va `reduce` metodlari nima qaytaradi?',
    'Obyektni nusxalashning qanday usullarini bilasiz?',
    '`try...catch` nima uchun kerak?'
  ]
};
