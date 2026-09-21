/* JavaScript moduli (19–33-darslar) — o'zbekcha matnlar. */

const lesson19 = {
  title: 'JavaScript ga kirish',
  summary: 'Birinchi skript, console.log va natijalarni chiqarish.',
  theory: [
    { lead: 'HTML — tuzilma, CSS — ko‘rinish, JavaScript — xatti-harakat. Bu brauzerda bevosita bajariladigan to‘laqonli dasturlash tili.' },
    { h: 'Kod qayerga yoziladi' },
    { code: '<script src="app.js"></script>   <!-- tashqi fayl, shunday qilishadi -->\n<script>console.log("salom")</script>  <!-- to‘g‘ridan-to‘g‘ri HTML da -->' },
    { p: 'Playground dagi **JS** yorlig‘i — bu ulangan `app.js` fayli. U belgilash yuklangandan keyin bajariladi.' },
    { h: 'Chiqarish' },
    { code: 'console.log("Salom, dunyo!");   // dasturchi konsoliga\nalert("Diqqat!");               // modal oyna' },
    { p: 'Konsol preview ostidagi **Konsol** tugmasi bilan ochiladi. `alert()` chaqiruvlari ham o‘sha yerga tushadi — shunday qilib ular tekshiruvni bloklamaydi.' },
    { h: 'Sintaksis' },
    { code: 'let count = 3;        // o‘zgaruvchi e’lon qilish\ncount = count + 1;    // o‘zgartirish\nconsole.log(count);   // 4\n\n// bir qatorli izoh\n/* ko‘p qatorli\n   izoh */' },
    { note: 'Buyruq oxiridagi nuqta-vergulni tashlab ketish mumkin, lekin uni qo‘yish odati g‘alati xatolarga ketadigan vaqtni tejaydi.' }
  ],
  tasks: {
    'js-intro-1': {
      title: 'Kodning birinchi qatori',
      description: 'Konsolga `Salom, dunyo!` matnini chiqaring',
      hints: ['console.log("Salom, dunyo!");'],
      starter: { html: '<h1>JavaScript</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'console.log("Salom, dunyo!");' },
      checks: [
        { label: 'Konsolda «Salom, dunyo!» bor', contains: 'Salom, dunyo!' },
        { label: 'console.log ishlatilgan' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-intro-2': {
      title: 'Modal oyna',
      description: 'Foydalanuvchiga `Xush kelibsiz` matni bilan `alert` ko‘rsating.',
      hints: ['alert("Xush kelibsiz");'],
      starter: { html: '<h1>JavaScript</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'alert("Xush kelibsiz");' },
      checks: [
        { label: 'alert() chaqirilgan', contains: 'Xush kelibsiz' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-intro-3': {
      title: 'Bir nechta qiymat',
      description: 'Bitta `console.log` chaqiruvi bilan uchta qiymatni chiqaring: `Yig‘indi:` satri, `2` soni va `3` soni.',
      hints: ['Argumentlar vergul bilan sanab o‘tiladi: console.log("Yig‘indi:", 2, 3);'],
      starter: { html: '<h1>JavaScript</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'console.log("Yig‘indi:", 2, 3);' },
      checks: [
        { label: 'Konsolda «Yig‘indi:» bor', contains: 'Yig‘indi:' },
        { label: '2 va 3 sonlari chiqarilgan', matches: 'Yig‘indi:\\s*2\\s*3' },
        { label: 'console.log chaqiruvi aniq bitta' }
      ]
    },
    'js-intro-4': {
      title: 'Birinchi hisoblash',
      description: '`7 * 6` ni hisoblang va natijani konsolga chiqaring. `42` sonining o‘zini yozish mumkin emas — uni JavaScript hisoblasin.',
      hints: ['console.log(7 * 6);'],
      starter: { html: '<h1>JavaScript</h1>\n', js: '// kodingiz\n' },
      checks: [
        { label: 'Konsolda 42 bor' },
        { label: 'Kodda ko‘paytirish bor' },
        { label: '42 soni qo‘lda yozilmagan' }
      ]
    },
    'js-intro-5': {
      title: 'Challenge: mini hisobot',
      description: 'Konsolga uchta qator chiqaring: `Hisobot` sarlavhasi, `120 / 4` hisoblash natijasi va `console.warn` orqali ogohlantirish. Kodga izoh qo‘shing.',
      hints: ['console.warn sariq ogohlantirish chiqaradi — u ham playground konsoliga tushadi.'],
      starter: { html: '<h1>JavaScript</h1>\n', js: '// kodingiz\n' },
      solution: { js: '// kichik hisobot\nconsole.log("Hisobot");\nconsole.log(120 / 4);\nconsole.warn("O‘tgan oy ma’lumotlari");' },
      checks: [
        { label: '«Hisobot» qatori bor', contains: 'Hisobot' },
        { label: 'Bo‘lish natijasi chiqarilgan (30)' },
        { label: 'Bo‘lishni kod bajaradi' },
        { label: 'console.warn ishlatilgan' },
        { label: 'Kodda izoh bor' },
        { label: 'Xatolik yo‘q' }
      ]
    }
  }
};

const lesson20 = {
  title: 'O‘zgaruvchilar va turlar',
  summary: 'let, const, satrlar, sonlar, mantiqiy qiymatlar va shablon satrlar.',
  theory: [
    { lead: 'O‘zgaruvchi — qiymatga berilgan nom. U orqali kod o‘qilishi oson va qayta ishlatiladigan bo‘ladi.' },
    { code: 'let age = 25;         // qiymatni o‘zgartirish mumkin\nconst name = "Aziza"; // o‘zgartirib bo‘lmaydi\nage = 26;             // ok\n// name = "Bobur";    // xatolik!' },
    { note: 'Qoida oddiy: standart holatda `const`. Qiymatni o‘zgartirsangiz — u holda `let`. Eski `var` yangi kodda ishlatilmaydi.' },
    { h: 'Ma’lumot turlari' },
    { table: { head: ['Tur', 'Misol', 'typeof'], rows: [
      ['satr', '`"salom"`, `\'matn\'`', '`"string"`'],
      ['son', '`42`, `3.14`', '`"number"`'],
      ['mantiqiy', '`true`, `false`', '`"boolean"`'],
      ['hech nima', '`null`', '`"object"` (tarixiy xato)'],
      ['berilmagan', '`undefined`', '`"undefined"`'],
      ['massiv / obyekt', '`[1, 2]`, `{ a: 1 }`', '`"object"`']
    ] } },
    { h: 'Shablon satrlar' },
    { code: 'const name = "Aziza";\nconst age = 25;\nconsole.log(`${name}, ${age} yosh`);   // Aziza, 25 yosh\nconsole.log(`Bir yildan keyin: ${age + 1}`); // ${} ichida ifoda' },
    { warn: 'Shablon satrlar oddiy emas, teskari qo‘shtirnoqlarda `` ` `` yoziladi.' }
  ],
  tasks: {
    'js-variables-1': {
      title: 'let va const',
      description: '`Toshkent` qiymatli `city` konstantasini va `28` qiymatli `temperature` o‘zgaruvchisini yarating. Ikkalasini ham konsolga chiqaring.',
      hints: ['const city = "Toshkent";'],
      starter: { html: '<h1>O‘zgaruvchilar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const city = "Toshkent";\nlet temperature = 28;\n\nconsole.log(city);\nconsole.log(temperature);' },
      checks: [
        { label: 'const city e’lon qilingan' },
        { label: 'let temperature e’lon qilingan' },
        { label: 'Konsolda «Toshkent» bor', contains: 'Toshkent' },
        { label: 'Konsolda 28 bor' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-variables-2': {
      title: 'Shablon satr',
      description: 'Shablon satr orqali o‘zgaruvchilardan yig‘ib, `Toshkent shahrida hozir 28 daraja` ko‘rinishidagi bitta qatorni chiqaring.',
      hints: ['console.log(`${city} shahrida hozir ${temperature} daraja`);'],
      starter: { html: '<h1>O‘zgaruvchilar</h1>\n', js: 'const city = "Toshkent";\nlet temperature = 28;\n' },
      solution: { js: 'const city = "Toshkent";\nlet temperature = 28;\n\nconsole.log(`${city} shahrida hozir ${temperature} daraja`);' },
      checks: [
        { label: 'Satr to‘g‘ri yig‘ilgan', contains: 'Toshkent shahrida hozir 28 daraja' },
        { label: 'Teskari qo‘shtirnoqlar ishlatilgan' },
        { label: '${} almashtirish ishlatilgan' }
      ]
    },
    'js-variables-3': {
      title: 'Qiymat turlari',
      description: 'Turli turdagi to‘rtta o‘zgaruvchi yarating: satr, son, mantiqiy qiymat va `null`. Har biri uchun `typeof` orqali turini chiqaring.',
      hints: ['console.log(typeof name);'],
      starter: { html: '<h1>O‘zgaruvchilar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const title = "Kurs";\nconst lessons = 34;\nconst isFree = true;\nconst rating = null;\n\nconsole.log(typeof title);\nconsole.log(typeof lessons);\nconsole.log(typeof isFree);\nconsole.log(typeof rating);' },
      checks: [
        { label: 'typeof ishlatilgan' },
        { label: 'Konsolda string bor' },
        { label: 'Konsolda number bor' },
        { label: 'Konsolda boolean bor' },
        { label: 'Konsolda object bor (bu typeof null)' },
        { label: 'Kamida 4 ta o‘zgaruvchi e’lon qilingan' }
      ]
    },
    'js-variables-4': {
      title: 'Qiymatni o‘zgartirish',
      description: '`score = 0` hisoblagichini yarating, uni uch marta 10 taga oshiring va yakunni chiqaring. Kodda `score` ning aniq bitta e’loni bo‘lishi kerak.',
      hints: ['score += 10; — bu score = score + 10; bilan bir xil.'],
      starter: { html: '<h1>O‘zgaruvchilar</h1>\n', js: '// kodingiz\n' },
      checks: [
        { label: 'Hisoblagich let orqali e’lon qilingan' },
        { label: 'E’lon aniq bitta' },
        { label: 'Yakun 30 ga teng' },
        { label: '30 soni qo‘lda yozilmagan' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-variables-5': {
      title: 'Challenge: foydalanuvchi kartasi',
      description: 'Foydalanuvchini o‘zgaruvchilar bilan tasvirlang: ism, yosh, shahar, obuna belgisi. Ikkita qator chiqaring: tanishtirish (`Ism, yosh, shahar`) va mantiqiy o‘zgaruvchidan hisoblangan `faol` / `faol emas` so‘zlari bilan obuna holati.',
      hints: [
        'Uch amalli operator: shart ? "ha" : "yo‘q".',
        'Masalan: `Obuna ${isSubscribed ? "faol" : "faol emas"}`.'
      ],
      starter: { html: '<h1>O‘zgaruvchilar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const name = "Aziza";\nconst age = 25;\nconst city = "Toshkent";\nconst isSubscribed = true;\n\nconsole.log(`${name}, ${age}, ${city}`);\nconsole.log(`Obuna ${isSubscribed ? "faol" : "faol emas"}`);' },
      checks: [
        { label: 'Kamida 4 ta o‘zgaruvchi e’lon qilingan' },
        { label: 'Mantiqiy o‘zgaruvchi bor' },
        { label: 'Shablon satr ishlatilgan' },
        { label: '«faol» so‘zi chiqarilgan', contains: 'faol' },
        { label: 'Kamida ikkita qator chiqarilgan' },
        { label: 'Holat matn bilan emas, hisoblab chiqarilgan' }
      ]
    }
  }
};

const lesson21 = {
  title: 'Operatorlar',
  summary: 'Arifmetika, taqqoslash, mantiq va turlarni keltirish.',
  theory: [
    { h: 'Arifmetik' },
    { code: '5 + 2   // 7\n5 - 2   // 3\n5 * 2   // 10\n5 / 2   // 2.5\n5 % 2   // 1  — bo‘lishdan qolgan qoldiq\n5 ** 2  // 25 — darajaga ko‘tarish' },
    { h: 'Qisqartirilgan shakllar' },
    { code: 'x += 5;   // x = x + 5\nx -= 5;\nx *= 2;\nx++;      // 1 taga oshirish\nx--;' },
    { h: 'Taqqoslash' },
    { table: { head: ['Operator', 'Ma’nosi'], rows: [
      ['`===`', 'Qat’iy teng: qiymat **va** tur'],
      ['`!==`', 'Qat’iy teng emas'],
      ['`==`', 'Turlarni keltirib taqqoslash — ishlatmagan ma’qul'],
      ['`>` `<` `>=` `<=`', 'Katta, kichik, kichik emas, katta emas']
    ] } },
    { code: '"5" == 5    // true  — turlar keltirildi\n"5" === 5   // false — satr songa teng emas' },
    { h: 'Mantiqiy' },
    { code: 'true && false  // VA — ikkisi ham true bo‘lsagina true\ntrue || false  // YOKI — kamida bittasi true bo‘lsa true\n!true          // EMAS — false' },
    { note: '`Number("5")` satrni songa, `String(5)` sonni satrga aylantiradi, `parseInt("12px")` esa 12 ni beradi.' }
  ],
  tasks: {
    'js-operators-1': {
      title: 'Kalkulyator',
      description: '`a = 15` va `b = 4` ni yarating hamda konsolga yig‘indi, ayirma, ko‘paytma va bo‘linmani chiqaring.',
      hints: ['console.log(a + b);'],
      starter: { html: '<h1>Operatorlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const a = 15;\nconst b = 4;\n\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);' },
      checks: [
        { label: 'Yig‘indi 19' },
        { label: 'Ayirma 11' },
        { label: 'Ko‘paytma 60' },
        { label: 'Bo‘linma 3.75' },
        { label: 'Odam emas, kod hisoblaydi' }
      ]
    },
    'js-operators-2': {
      title: 'Qoldiq va juftlik',
      description: '`17` soni uchun 5 ga bo‘lgandagi qoldiqni va juftlikka tekshirish natijasini (`true` yoki `false`) chiqaring.',
      hints: ['Son juft bo‘ladi, agar 2 ga bo‘lgandagi qoldiq nolga teng bo‘lsa.'],
      starter: { html: '<h1>Operatorlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const value = 17;\n\nconsole.log(value % 5);\nconsole.log(value % 2 === 0);' },
      checks: [
        { label: '% operatori ishlatilgan' },
        { label: 'Qoldiq 2 chiqarilgan' },
        { label: 'false chiqarilgan (17 — toq son)' },
        { label: 'Juftlik tekshiruvi kod bilan yozilgan' }
      ]
    },
    'js-operators-3': {
      title: '== va === farqi',
      description: 'To‘rtta taqqoslash natijasini chiqaring: `"5" == 5`, `"5" === 5`, `0 == false`, `0 === false`.',
      hints: ['Har bir taqqoslashni alohida qatorda chiqaring.'],
      starter: { html: '<h1>Operatorlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'console.log("5" == 5);\nconsole.log("5" === 5);\nconsole.log(0 == false);\nconsole.log(0 === false);' },
      checks: [
        { label: '== ishlatilgan' },
        { label: '=== ishlatilgan' },
        { label: 'Konsolda true bor' },
        { label: 'Konsolda false bor' },
        { label: 'Aniq 4 ta natija chiqarilgan' },
        { label: 'Tartib: true, false, true, false' }
      ]
    },
    'js-operators-4': {
      title: 'Ruxsat mantiqi',
      description: '`age = 20` va `hasTicket = true` berilgan. Chiqaring: seansga kiritish mumkinmi (yosh 18 dan kam emas **va** chipta bor) va qo‘shimcha to‘lov kerakmi (yosh 18 dan kichik **yoki** chipta yo‘q).',
      hints: ['const canEnter = age >= 18 && hasTicket;'],
      starter: { html: '<h1>Operatorlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const age = 20;\nconst hasTicket = true;\n\nconsole.log(age >= 18 && hasTicket);\nconsole.log(age < 18 || !hasTicket);' },
      checks: [
        { label: '&& operatori ishlatilgan' },
        { label: '|| operatori ishlatilgan' },
        { label: 'Birinchi natija — true' },
        { label: 'Ikkinchi natija — false' },
        { label: 'Yoshni taqqoslash kod bilan yozilgan' }
      ]
    },
    'js-operators-5': {
      title: 'Challenge: buyurtmani hisoblash',
      description: 'Buyurtma: narx `1200`, soni `3`, chegirma `15` foiz, yetkazib berish `500`, lekin summa `3000` dan katta bo‘lsa yetkazib berish bepul. Hisoblang va chiqaring: chegirmasiz summa, chegirma miqdori, yetkazib berish narxi va yakuniy summa. Barcha sonlarni kod hisoblaydi.',
      hints: [
        'Summa = narx × soni.',
        'Chegirma = summa × foiz / 100.',
        'Yetkazib berish: total > 3000 ? 0 : 500.'
      ],
      starter: { html: '<h1>Operatorlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const price = 1200;\nconst quantity = 3;\nconst discountPercent = 15;\nconst deliveryPrice = 500;\n\nconst subtotal = price * quantity;\nconst discount = subtotal * discountPercent / 100;\nconst delivery = subtotal > 3000 ? 0 : deliveryPrice;\nconst total = subtotal - discount + delivery;\n\nconsole.log(subtotal);\nconsole.log(discount);\nconsole.log(delivery);\nconsole.log(total);' },
      checks: [
        { label: 'Chegirmasiz summa 3600' },
        { label: 'Chegirma 540' },
        { label: 'Yetkazib berish bepul (0)' },
        { label: 'Yakun 3060' },
        { label: 'Chegirma formula bilan hisoblanadi' },
        { label: 'Bepul yetkazib berish sharti kodda' },
        { label: 'Tayyor javoblar yozilmagan' }
      ]
    }
  }
};

const lesson22 = {
  title: 'Shartlar',
  summary: 'if, else if, switch va uch amalli operator.',
  theory: [
    { lead: 'Shart — bu ayri yo‘l: kod qaysi tarmoqni bajarishni tanlaydi.' },
    { code: 'if (temperature > 30) {\n  console.log("Issiq");\n} else if (temperature > 15) {\n  console.log("Iliq");\n} else {\n  console.log("Sovuq");\n}' },
    { h: 'Uch amalli operator' },
    { code: 'const status = age >= 18 ? "katta" : "bola";' },
    { h: 'switch' },
    { code: 'switch (day) {\n  case "shan":\n  case "yak":\n    console.log("Dam olish kuni");\n    break;\n  default:\n    console.log("Ish kuni");\n}' },
    { warn: '`switch` da unutilgan `break` keyingi case ga «tushib ketishga» olib keladi — bu tez-tez uchraydigan xato.' },
    { h: 'Yolg‘on qiymatlar' },
    { p: 'Shartda `false` kabi tutadiganlar: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Qolgan hammasi — rost.' }
  ],
  tasks: {
    'js-conditions-1': {
      title: 'Voyaga yetganlik',
      description: '`age = 20` uchun yosh 18 va undan katta bo‘lsa `Ruxsat berildi`, aks holda `Ruxsat yo‘q` chiqaring.',
      hints: ['if (age >= 18) { … } else { … }'],
      starter: { html: '<h1>Shartlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const age = 20;\n\nif (age >= 18) {\n  console.log("Ruxsat berildi");\n} else {\n  console.log("Ruxsat yo‘q");\n}' },
      checks: [
        { label: 'if ishlatilgan' },
        { label: 'else tarmog‘i bor' },
        { label: '«Ruxsat berildi» chiqarilgan', contains: 'Ruxsat berildi' },
        { label: 'Shart yoshni taqqoslaydi' }
      ]
    },
    'js-conditions-2': {
      title: 'Ballar bo‘yicha baho',
      description: '`score = 74` uchun bahoni chiqaring: 90 va undan yuqori — `a’lo`, 70–89 — `yaxshi`, 50–69 — `qoniqarli`, undan past — `qoniqarsiz`.',
      hints: ['Kattadan kichikka qarab tekshiring — shunda chegaralar bir-birini qoplamaydi.'],
      starter: { html: '<h1>Shartlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const score = 74;\n\nif (score >= 90) {\n  console.log("a’lo");\n} else if (score >= 70) {\n  console.log("yaxshi");\n} else if (score >= 50) {\n  console.log("qoniqarli");\n} else {\n  console.log("qoniqarsiz");\n}' },
      checks: [
        { label: 'else if zanjiri ishlatilgan' },
        {
          label: '74 uchun «yaxshi» chiqarilgan',
          fn: "const first = (ctx.console[0] || {}).text || ''; return first.trim() === 'yaxshi' || 'Chiqarildi: ' + first;"
        },
        {
          label: 'To‘rtala daraja ham tasvirlangan',
          fn: "const source = ctx.source.js; const words = ['a’lo', 'yaxshi', 'qoniqarli']; for (const word of words) { if (!source.includes(word)) return 'Kodda «' + word + '» varianti yo‘q'; } return true;"
        }
      ]
    },
    'js-conditions-3': {
      title: 'Hafta kuni bo‘yicha switch',
      description: '`day = "shan"` uchun `switch` orqali `shan` va `yak` da `Dam olish kuni`, qolgan qiymatlarda `Ish kuni` chiqaring.',
      hints: ['break siz ketma-ket kelgan ikkita case variantlarni birlashtiradi.'],
      starter: { html: '<h1>Shartlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const day = "shan";\n\nswitch (day) {\n  case "shan":\n  case "yak":\n    console.log("Dam olish kuni");\n    break;\n  default:\n    console.log("Ish kuni");\n}' },
      checks: [
        { label: 'switch ishlatilgan' },
        { label: 'default bor' },
        { label: 'break bor' },
        { label: '«shan» uchun «Dam olish kuni» chiqarilgan', contains: 'Dam olish kuni' },
        { label: 'Ortiqcha narsa chiqmadi' }
      ]
    },
    'js-conditions-4': {
      title: 'Uch amalli operator',
      description: '`items = 0` uchun shablon satr ichida uch amalli operatordan foydalanib `Savat bo‘sh` yoki `Mahsulotlar: N` qatorini chiqaring.',
      hints: ['const message = items === 0 ? "Savat bo‘sh" : `Mahsulotlar: ${items}`;'],
      starter: { html: '<h1>Shartlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const items = 0;\n\nconst message = items === 0 ? "Savat bo‘sh" : `Mahsulotlar: ${items}`;\nconsole.log(message);' },
      checks: [
        { label: 'Uch amalli operator ishlatilgan' },
        { label: 'if kalit so‘zi yo‘q' },
        { label: 'Nol uchun «Savat bo‘sh» chiqarilgan', contains: 'Savat bo‘sh' }
      ]
    },
    'js-conditions-5': {
      title: 'Challenge: yetkazib berish narxi',
      description: 'Qoidalar: buyurtma 5000 dan qimmat — yetkazib berish bepul; 2000 dan 5000 gacha — 300; 2000 dan arzon — 700; o‘zi olib ketishda (`pickup = true`) doim 0. Qoidalarni uchta buyurtmada tekshiring: `1500` (yetkazib berish), `3000` (yetkazib berish), `6000` (o‘zi olib ketish) va uchta sonni chiqaring.',
      hints: [
        'Hisoblashni bir marta yozib, uni uch xil ma’lumotga qo‘llash qulay.',
        'O‘zi olib ketish birinchi tekshiriladi — u qolgan qoidalarni bekor qiladi.'
      ],
      starter: { html: '<h1>Shartlar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'function deliveryCost(total, pickup) {\n  if (pickup) return 0;\n  if (total > 5000) return 0;\n  if (total >= 2000) return 300;\n  return 700;\n}\n\nconsole.log(deliveryCost(1500, false));\nconsole.log(deliveryCost(3000, false));\nconsole.log(deliveryCost(6000, true));' },
      checks: [
        { label: 'Uchta qiymat chiqarilgan' },
        { label: 'Birinchi buyurtma — 700' },
        { label: 'Ikkinchi buyurtma — 300' },
        { label: 'Uchinchi buyurtma — 0 (o‘zi olib ketish)' },
        { label: 'Mantiq shartlar bilan yozilgan' },
        { label: 'O‘zi olib ketish qoidasi hisobga olingan' }
      ]
    }
  }
};

const lesson23 = {
  title: 'Sikllar',
  summary: 'for, while, for...of, break va continue.',
  theory: [
    { lead: 'Sikl shart bajarilgunicha kodni takrorlaydi. Sikllarsiz qatorlarni qo‘lda nusxalashga to‘g‘ri kelardi.' },
    { h: 'for' },
    { code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n//  ↑boshlanish ↑shart  ↑qadam' },
    { h: 'while' },
    { code: 'let count = 3;\nwhile (count > 0) {\n  console.log(count);\n  count--;\n}' },
    { h: 'for...of' },
    { code: 'for (const letter of "kod") {\n  console.log(letter);\n}\n\nfor (const item of ["choy", "kofe"]) {\n  console.log(item);\n}' },
    { h: 'Siklni boshqarish' },
    { code: 'for (let i = 1; i <= 10; i++) {\n  if (i === 4) continue; // qadamni o‘tkazib yuborish\n  if (i === 7) break;    // sikldan chiqish\n  console.log(i);\n}' },
    { warn: 'Agar shart hech qachon yolg‘on bo‘lmasa, sahifa qotib qoladi. Playground da bunday ishga tushirish taymaut bo‘yicha to‘xtatiladi.' }
  ],
  tasks: {
    'js-loops-1': {
      title: '1 dan 5 gacha',
      description: '`for` sikli yordamida konsolga 1 dan 5 gacha sonlarni, har birini alohida qatorda chiqaring.',
      hints: ['for (let i = 1; i <= 5; i++) { … }'],
      starter: { html: '<h1>Sikllar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}' },
      checks: [
        { label: 'for sikli ishlatilgan' },
        { label: 'Konsolda beshta qator' },
        { label: 'Sonlar tartib bilan boradi' },
        { label: 'Sonlar qo‘lda chiqarilmagan' }
      ]
    },
    'js-loops-2': {
      title: 'Sonlar yig‘indisi',
      description: '1 dan 100 gacha barcha sonlar yig‘indisini sikl bilan hisoblang va natijani bitta qatorda chiqaring.',
      hints: ['sum = 0 o‘zgaruvchisini yarating va har qadamda unga i ni qo‘shing.'],
      starter: { html: '<h1>Sikllar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'let sum = 0;\n\nfor (let i = 1; i <= 100; i++) {\n  sum += i;\n}\n\nconsole.log(sum);' },
      checks: [
        { label: 'Sikl ishlatilgan' },
        { label: 'Natija 5050' },
        { label: 'Konsolda bitta qator' },
        { label: 'Javob qo‘lda yozilmagan' }
      ]
    },
    'js-loops-3': {
      title: 'Teskari sanoq',
      description: '`while` yordamida 5 dan 1 gacha teskari sanoqni, so‘ng `Ketdik!` qatorini chiqaring.',
      hints: ['Sikl ichida hisoblagichni kamaytirishni unutmang, aks holda u cheksiz bo‘lib qoladi.'],
      starter: { html: '<h1>Sikllar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'let count = 5;\n\nwhile (count > 0) {\n  console.log(count);\n  count--;\n}\n\nconsole.log("Ketdik!");' },
      checks: [
        { label: 'while ishlatilgan' },
        { label: 'Konsolda oltita qator' },
        { label: 'Sanoq teskari tartibda boradi' },
        {
          label: 'Oxirgi qator — «Ketdik!»',
          fn: "const last = (ctx.console[ctx.console.length - 1] || {}).text || ''; return last.trim() === 'Ketdik!' || 'Oxirgi qator: ' + last;"
        }
      ]
    },
    'js-loops-4': {
      title: 'Saralash va o‘tkazib yuborish',
      description: '1 dan 20 gacha sonlarni ko‘rib chiqing va faqat 3 ga bo‘linadiganlarini chiqaring, ammo 9 sonini o‘tkazib yuboring (`continue` dan foydalaning).',
      hints: ['Avval 3 ga karralilarini ajrating, keyin to‘qqizni o‘tkazib yuborishni qo‘shing.'],
      starter: { html: '<h1>Sikllar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'for (let i = 1; i <= 20; i++) {\n  if (i % 3 !== 0) continue;\n  if (i === 9) continue;\n  console.log(i);\n}' },
      checks: [
        { label: 'continue ishlatilgan' },
        { label: '3, 6, 12, 15, 18 chiqarilgan' },
        { label: 'Karralilik % orqali tekshiriladi' }
      ]
    },
    'js-loops-5': {
      title: 'Challenge: FizzBuzz',
      description: 'Klassik masala: 1 dan 20 gacha sonlarni chiqaring. 3 ga karrali sonlar o‘rniga — `Fizz`; 5 ga karralilari — `Buzz`; ham 3 ga, ham 5 ga karralilari — `FizzBuzz`.',
      hints: [
        'Ham 3 ga, ham 5 ga karralilikni birinchi tekshiring.',
        'Son ham 3 ga, ham 5 ga karrali bo‘ladi, agar u 15 ga karrali bo‘lsa.'
      ],
      starter: { html: '<h1>Sikllar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) {\n    console.log("FizzBuzz");\n  } else if (i % 3 === 0) {\n    console.log("Fizz");\n  } else if (i % 5 === 0) {\n    console.log("Buzz");\n  } else {\n    console.log(i);\n  }\n}' },
      checks: [
        { label: 'Aniq 20 ta qator' },
        { label: 'Ketma-ketlik to‘g‘ri' },
        { label: 'Sikl ishlatilgan' },
        { label: 'Qiymatlar qo‘lda sanab o‘tilmagan' }
      ]
    }
  }
};

const lesson24 = {
  title: 'Funksiyalar',
  summary: 'E’lon qilish, parametrlar, return, strelkali funksiyalar va ko‘rinish sohasi.',
  theory: [
    { lead: 'Funksiya — bu nomlangan kod bo‘lagi, uni turli ma’lumotlar bilan xohlagancha chaqirish mumkin.' },
    { code: 'function greet(name) {\n  return `Salom, ${name}!`;\n}\n\nconsole.log(greet("Aziza"));' },
    { h: 'Yozuvning uch shakli' },
    { code: 'function sum(a, b) { return a + b; }        // e’lon\nconst sum = function (a, b) { return a + b; }; // ifoda\nconst sum = (a, b) => a + b;                   // strelkali' },
    { h: 'Standart parametrlar' },
    { code: 'function greet(name = "mehmon") {\n  return `Salom, ${name}!`;\n}\ngreet();        // Salom, mehmon!' },
    { h: 'return' },
    { p: '`return` qiymatni qaytaradi va funksiyani darhol tugatadi. `return` siz funksiya `undefined` qaytaradi.' },
    { h: 'Ko‘rinish sohasi' },
    { code: 'function test() {\n  const inner = 1;   // faqat ichkarida ko‘rinadi\n}\nconsole.log(inner);  // xatolik' },
    { note: 'Yaxshi funksiya bitta ishni bajaradi, nomi esa — fe’l: `calculateTotal`, `formatDate`, `isValid`.' }
  ],
  tasks: {
    'js-functions-1': {
      title: 'Salomlashish',
      description: '`Salom, Aziza!` ko‘rinishidagi satrni **qaytaradigan** `greet(name)` funksiyasini yozing. Uni chaqiring va natijani chiqaring.',
      hints: ['return — bu console.log emas. Funksiya satrni qaytarishi kerak, uni chiqarishni esa chaqiruvchi kod bajaradi.'],
      starter: { html: '<h1>Funksiyalar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'function greet(name) {\n  return `Salom, ${name}!`;\n}\n\nconsole.log(greet("Aziza"));' },
      checks: [
        { label: 'greet funksiyasi e’lon qilingan' },
        {
          label: 'greet("Aziza") «Salom, Aziza!» qaytaradi',
          fn: "const result = greet('Aziza'); return result === 'Salom, Aziza!' || 'Olindi: ' + JSON.stringify(result);"
        },
        {
          label: 'Funksiya istalgan ism bilan ishlaydi',
          fn: "const result = greet('Bobur'); return result === 'Salom, Bobur!' || '«Bobur» uchun olindi: ' + JSON.stringify(result);"
        },
        { label: 'Natija konsolga chiqarilgan', contains: 'Salom,' },
        { label: 'return ishlatilgan' }
      ]
    },
    'js-functions-2': {
      title: 'Standart qiymat',
      description: '`greet` ni shunday to‘ldiringki, argumentsiz chaqirilganda u `Salom, mehmon!` qaytarsin.',
      hints: ['function greet(name = "mehmon") { … }'],
      starter: { html: '<h1>Funksiyalar</h1>\n', js: 'function greet(name) {\n  return `Salom, ${name}!`;\n}\n\nconsole.log(greet());\n' },
      solution: { js: 'function greet(name = "mehmon") {\n  return `Salom, ${name}!`;\n}\n\nconsole.log(greet());' },
      checks: [
        {
          label: 'greet() «Salom, mehmon!» qaytaradi',
          fn: "const result = greet(); return result === 'Salom, mehmon!' || 'Olindi: ' + JSON.stringify(result);"
        },
        {
          label: 'Argument bilan avvalgidek ishlaydi',
          fn: "const result = greet('Aziza'); return result === 'Salom, Aziza!' || 'Olindi: ' + JSON.stringify(result);"
        },
        { label: 'Standart qiymat ishlatilgan', matches: 'name\\s*=\\s*["\\\']mehmon' }
      ]
    },
    'js-functions-3': {
      title: 'Strelkali funksiya',
      description: 'To‘rtburchak yuzini qaytaradigan `area(width, height)` strelkali funksiyasini va perimetrni qaytaradigan `perimeter(width, height)` funksiyasini yozing.',
      hints: ['const area = (width, height) => width * height;'],
      starter: { html: '<h1>Funksiyalar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'const area = (width, height) => width * height;\nconst perimeter = (width, height) => (width + height) * 2;\n\nconsole.log(area(4, 5));\nconsole.log(perimeter(4, 5));' },
      checks: [
        { label: 'area — funksiya' },
        { label: 'area(4, 5) === 20' },
        { label: 'perimeter(4, 5) === 18' },
        { label: 'Strelkali yozuv ishlatilgan' },
        { label: 'Funksiyalar const orqali e’lon qilingan' }
      ]
    },
    'js-functions-4': {
      title: 'Shartli funksiya',
      description: '`getPrice(price, isMember)` funksiyasini yozing: klub a’zolariga 20% chegirma, qolganlarga to‘liq narx. Natijani butun songacha yaxlitlang.',
      hints: ['Math.round(price * 0.8)'],
      starter: { html: '<h1>Funksiyalar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'function getPrice(price, isMember) {\n  return isMember ? Math.round(price * 0.8) : price;\n}\n\nconsole.log(getPrice(1000, true));\nconsole.log(getPrice(1000, false));' },
      checks: [
        { label: 'getPrice — funksiya' },
        { label: 'getPrice(1000, true) === 800' },
        { label: 'getPrice(1000, false) === 1000' },
        { label: 'Natija doim butun son' },
        { label: 'Yaxlitlash ishlatilgan' }
      ]
    },
    'js-functions-5': {
      title: 'Challenge: yordamchi funksiyalar to‘plami',
      description: 'Uchta funksiya yozing: `isEven(n)` — son juftmi; `celsiusToFahrenheit(c)` — haroratni o‘tkazish (`c * 9 / 5 + 32`); `formatPrice(value)` — `1 200 so‘m` ko‘rinishidagi satr qaytaradi (xonalar bo‘shliq bilan ajratilgan).',
      hints: [
        'Xonalarni muntazam ifoda yoki toLocaleString metodi bilan ajratish qulay.',
        'value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ")'
      ],
      starter: { html: '<h1>Funksiyalar</h1>\n', js: '// kodingiz\n' },
      solution: { js: 'function isEven(n) {\n  return n % 2 === 0;\n}\n\nfunction celsiusToFahrenheit(c) {\n  return c * 9 / 5 + 32;\n}\n\nfunction formatPrice(value) {\n  const digits = String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ");\n  return `${digits} so‘m`;\n}\n\nconsole.log(isEven(4), celsiusToFahrenheit(100), formatPrice(1200));' },
      checks: [
        { label: 'isEven(4) === true' },
        { label: 'isEven(7) === false' },
        { label: 'celsiusToFahrenheit(100) === 212' },
        { label: 'celsiusToFahrenheit(0) === 32' },
        {
          label: 'formatPrice(1200) === «1 200 so‘m»',
          fn: "const result = formatPrice(1200); return ctx.text(result) === '1 200 so‘m' || 'Olindi: ' + JSON.stringify(result);"
        },
        {
          label: 'formatPrice(1000000) xonalarga bo‘lingan',
          fn: "const result = ctx.text(formatPrice(1000000)); return result === '1 000 000 so‘m' || 'Olindi: ' + JSON.stringify(result);"
        },
        { label: 'Uchala funksiya ham e’lon qilingan' }
      ]
    }
  }
};

const lesson25 = {
  title: 'Massivlar',
  summary: 'Ro‘yxatlarni saqlash va map, filter, reduce, find, sort metodlari.',
  starter: { html: '<h1>Massivlar</h1>\n' },
  theory: [
    { lead: 'Massiv — tartiblangan qiymatlar ro‘yxati. Raqamlash noldan boshlanadi.' },
    { code: 'const fruits = ["olma", "banan", "nok"];\n\nfruits[0];        // "olma"\nfruits.length;    // 3\nfruits[fruits.length - 1]; // oxirgisi' },
    { h: 'O‘zgartirish' },
    { code: 'fruits.push("olxo‘ri");  // oxiriga qo‘shish\nfruits.pop();            // oxirgisini o‘chirish\nfruits.unshift("kivi");  // boshiga qo‘shish\nfruits.shift();          // birinchisini o‘chirish\nfruits.includes("banan");// element bormi' },
    { h: 'Ko‘rib chiqish metodlari' },
    { table: { head: ['Metod', 'Nima qaytaradi'], rows: [
      ['`forEach`', 'Hech nima — shunchaki ko‘rib chiqadi'],
      ['`map`', 'Xuddi shu uzunlikdagi yangi massiv'],
      ['`filter`', 'Mos kelgan elementlardan yangi massiv'],
      ['`find`', 'Mos kelgan birinchi element'],
      ['`reduce`', 'Bitta qiymat — yig‘indi, maksimum, obyekt'],
      ['`sort`', 'O‘sha massivning o‘zi, saralangan holda']
    ] } },
    { code: 'const prices = [100, 250, 80];\n\nconst doubled = prices.map((price) => price * 2);       // [200, 500, 160]\nconst cheap  = prices.filter((price) => price < 200);  // [100, 80]\nconst total  = prices.reduce((sum, price) => sum + price, 0); // 430\nprices.sort((a, b) => a - b);                          // o‘sish bo‘yicha' },
    { warn: 'Taqqoslash funksiyasisiz `sort()` satr kabi saralaydi: `[10, 9, 100]` `[10, 100, 9]` ga aylanadi.' }
  ],
  tasks: {
    'js-arrays-1': {
      title: 'Massiv asoslari',
      description: '`prices` massivining uzunligini, birinchi va oxirgi elementlarini chiqaring.',
      hints: ['prices[prices.length - 1] — oxirgi elementni olishning universal usuli.'],
      checks: [
        { label: 'Uzunlik 5 chiqarilgan' },
        { label: 'Birinchi element 1200 chiqarilgan' },
        { label: 'Oxirgi element 150 chiqarilgan' },
        { label: 'length xossasi ishlatilgan' },
        { label: 'Oxirgi element 4-indeks orqali emas, length orqali olingan' }
      ]
    },
    'js-arrays-2': {
      title: 'Qo‘shish va o‘chirish',
      description: 'Massiv oxiriga `999` narxini qo‘shing, birinchi elementni o‘chiring va hosil bo‘lgan massiv hamda uning uzunligini chiqaring.',
      hints: ['push oxiriga qo‘shadi, shift boshidan o‘chiradi.'],
      checks: [
        { label: 'push ishlatilgan' },
        { label: 'shift ishlatilgan' },
        { label: 'Massiv [450, 3000, 780, 150, 999] bo‘ldi' },
        { label: 'Uzunlik 5 chiqarilgan' }
      ]
    },
    'js-arrays-3': {
      title: 'map va filter',
      description: '`withVat` — QQS 12% bilan narxlar (1.12 ga ko‘paytirib yaxlitlang) va `expensive` — 1000 dan qimmat narxlar massivlarini yarating. Ikkalasini ham chiqaring.',
      hints: [
        'map va filter asl massivni o‘zgartirmaydi, yangisini qaytaradi.',
        'Math.round(price * 1.12)'
      ],
      checks: [
        { label: 'map ishlatilgan' },
        { label: 'filter ishlatilgan' },
        { label: 'withVat to‘g‘ri hisoblangan' },
        { label: 'expensive faqat qimmatlarini o‘z ichiga oladi' },
        { label: 'Asl massiv o‘zgarmadi' }
      ]
    },
    'js-arrays-4': {
      title: 'reduce va sort',
      description: '`reduce` orqali barcha narxlar yig‘indisi — `total` ni va o‘sish bo‘yicha saralangan nusxa — `sorted` ni hisoblang (asl massivga tegmang).',
      hints: [
        'Massiv nusxasi: [...prices] yoki prices.slice().',
        'sort((a, b) => a - b) sonlarni o‘sish bo‘yicha saralaydi.'
      ],
      checks: [
        { label: 'reduce ishlatilgan' },
        { label: 'total === 5580' },
        { label: 'sorted o‘sish bo‘yicha saralangan' },
        { label: 'Asl massiv o‘zgarmadi' },
        { label: 'Taqqoslash funksiyasi berilgan' }
      ]
    },
    'js-arrays-5': {
      title: 'Challenge: buyurtmalar statistikasi',
      description: '`orders` massivi bo‘yicha hisoblang: `total` — umumiy summa, `average` — o‘rtacha chek (yaxlitlang), `maxOrder` — eng yirik buyurtma, `bigOrders` — o‘rtachadan qimmat buyurtmalar massivi. To‘rtala qiymatni ham chiqaring.',
      hints: [
        'Math.max(...orders) massivni argumentlarga yoyadi.',
        'O‘rtacha chek: total / orders.length.'
      ],
      checks: [
        { label: 'total === 6120' },
        { label: 'average === 1020' },
        { label: 'maxOrder === 2400' },
        { label: 'bigOrders === [1500, 2400]' },
        { label: 'reduce ishlatilgan' },
        { label: 'Math.max yoki sort ishlatilgan' },
        { label: 'Qiymatlar qo‘lda yozilmagan' },
        { label: 'Barcha qiymatlar chiqarilgan' }
      ]
    }
  }
};

const lesson26 = {
  title: 'Obyektlar',
  summary: 'Xossalar, metodlar, destrukturizatsiya, obyektlar massivi va JSON.',
  starter: {
    html: '<h1>Obyektlar</h1>\n',
    js: 'const product = {\n  title: "Kofemashina",\n  price: 2400000,\n  inStock: true\n};\n'
  },
  theory: [
    { lead: 'Obyekt nomlangan qiymatlarni saqlaydi. Massiv «ro‘yxat» bo‘lsa, obyekt — «karta».' },
    { code: 'const user = {\n  name: "Aziza",\n  age: 25,\n  isAdmin: false,\n  greet() {\n    return `Salom, ${this.name}`;\n  }\n};\n\nuser.name;        // "Aziza"\nuser["age"];      // 25\nuser.city = "Toshkent"; // xossa qo‘shish\nuser.greet();     // metodni chaqirish' },
    { h: 'Destrukturizatsiya' },
    { code: 'const { name, age } = user;\nconsole.log(name, age);\n\nconst { city = "ko‘rsatilmagan" } = user; // standart qiymat' },
    { h: 'Obyektlar massivi — vebdagi asosiy ma’lumot tuzilmasi' },
    { code: 'const users = [\n  { name: "Aziza", age: 25 },\n  { name: "Bobur", age: 31 }\n];\n\nconst names = users.map((user) => user.name);\nconst adults = users.filter((user) => user.age >= 18);' },
    { h: 'JSON' },
    { code: 'const text = JSON.stringify(user); // obyekt → satr\nconst back = JSON.parse(text);     // satr → obyekt' },
    { note: '`Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)` obyektni massivlarga aylantiradi — keyin odatdagi map va filter ishlaydi.' }
  ],
  tasks: {
    'js-objects-1': {
      title: 'O‘qish va yozish',
      description: 'Mahsulot nomi va narxini chiqaring, `Delonghi` qiymatli `brand` xossasini qo‘shing va obyektni to‘liq chiqaring.',
      hints: ['product.brand = "Delonghi";'],
      solution: { js: 'const product = {\n  title: "Kofemashina",\n  price: 2400000,\n  inStock: true\n};\n\nconsole.log(product.title);\nconsole.log(product.price);\n\nproduct.brand = "Delonghi";\nconsole.log(product);' },
      checks: [
        { label: 'Nom chiqarilgan', contains: 'Kofemashina' },
        { label: 'Narx chiqarilgan' },
        { label: 'brand xossasi qo‘shilgan' },
        {
          label: 'Qolgan xossalar joyida',
          fn: "return (product.title === 'Kofemashina' && product.price === 2400000 && product.inStock === true) || 'Obyekt o‘zgartirilgan: ' + JSON.stringify(product);"
        }
      ]
    },
    'js-objects-2': {
      title: 'Obyekt metodi',
      description: 'Mahsulotga `this` dan foydalanib `Kofemashina — 2400000 so‘m` satrini qaytaradigan `describe()` metodini qo‘shing.',
      hints: ['describe() { return `${this.title} — ${this.price} so‘m`; }'],
      solution: { js: 'const product = {\n  title: "Kofemashina",\n  price: 2400000,\n  inStock: true,\n  describe() {\n    return `${this.title} — ${this.price} so‘m`;\n  }\n};\n\nconsole.log(product.describe());' },
      checks: [
        { label: 'describe — funksiya' },
        {
          label: 'To‘g‘ri satr qaytaradi',
          fn: "const result = product.describe(); return ctx.text(result) === 'Kofemashina — 2400000 so‘m' || 'Olindi: ' + JSON.stringify(result);"
        },
        { label: 'this ishlatilgan' },
        { label: 'Metod chaqirilgan va natija chiqarilgan', contains: 'Kofemashina —' }
      ]
    },
    'js-objects-3': {
      title: 'Destrukturizatsiya',
      description: 'Obyektdan `title` va `price` ni destrukturizatsiya orqali, `brand` ni esa `ko‘rsatilmagan` standart qiymati bilan oling. Uchala o‘zgaruvchini ham chiqaring.',
      hints: ['const { title, price, brand = "ko‘rsatilmagan" } = product;'],
      solution: { js: 'const product = {\n  title: "Kofemashina",\n  price: 2400000,\n  inStock: true\n};\n\nconst { title, price, brand = "ko‘rsatilmagan" } = product;\n\nconsole.log(title);\nconsole.log(price);\nconsole.log(brand);' },
      checks: [
        { label: 'Destrukturizatsiya ishlatilgan' },
        {
          label: 'title to‘g‘ri olingan',
          fn: "return title === 'Kofemashina' || 'title = ' + JSON.stringify(title);"
        },
        { label: 'price to‘g‘ri olingan' },
        {
          label: 'brand standart bo‘yicha «ko‘rsatilmagan»',
          fn: "return brand === 'ko‘rsatilmagan' || 'brand = ' + JSON.stringify(brand);"
        },
        { label: 'Qiymatlar chiqarilgan', contains: 'ko‘rsatilmagan' }
      ]
    },
    'js-objects-4': {
      title: 'Obyektlar massivi',
      description: '`products` massividan oling: `names` — nomlar, `available` — sotuvda bor mahsulotlar, `cheapest` — eng arzon mahsulot.',
      hints: [
        'Eng arzoni: products.reduce((min, item) => item.price < min.price ? item : min).',
        'Yoki massiv nusxasini narx bo‘yicha saralab, birinchi elementni oling.'
      ],
      starter: {
        js: 'const products = [\n  { title: "Kofemashina", price: 2400000, inStock: true },\n  { title: "Choynak", price: 320000, inStock: false },\n  { title: "Turka", price: 85000, inStock: true },\n  { title: "Kofemaydalagich", price: 540000, inStock: true }\n];\n'
      },
      solution: {
        js: 'const products = [\n  { title: "Kofemashina", price: 2400000, inStock: true },\n  { title: "Choynak", price: 320000, inStock: false },\n  { title: "Turka", price: 85000, inStock: true },\n  { title: "Kofemaydalagich", price: 540000, inStock: true }\n];\n\nconst names = products.map((item) => item.title);\nconst available = products.filter((item) => item.inStock);\nconst cheapest = products.reduce((min, item) => (item.price < min.price ? item : min));\n\nconsole.log(names);\nconsole.log(available);\nconsole.log(cheapest);'
      },
      checks: [
        {
          label: 'names — nomlar massivi',
          fn: "return JSON.stringify(names) === '[\"Kofemashina\",\"Choynak\",\"Turka\",\"Kofemaydalagich\"]' || 'Olindi: ' + JSON.stringify(names);"
        },
        { label: 'available — sotuvdagi uchta mahsulot' },
        {
          label: 'cheapest — Turka',
          fn: "return (cheapest && cheapest.title === 'Turka') || 'Olindi: ' + JSON.stringify(cheapest);"
        },
        { label: 'map va filter ishlatilgan' },
        { label: 'Eng arzoni kod bilan topilgan' }
      ]
    },
    'js-objects-5': {
      title: 'Challenge: savat',
      description: '`{ title, price, quantity }` massivini qabul qilib, `{ count, total, titles }` obyektini qaytaradigan `cartSummary(items)` funksiyasini yozing: umumiy dona soni, yakuniy summa va nomlar massivi. Uni tayyor savatda tekshiring va natijani JSON ko‘rinishida chiqaring.',
      hints: [
        'Boshlang‘ich qiymati 0 bo‘lgan reduce bo‘sh massivda ham to‘g‘ri ishlaydi.',
        'Pozitsiya summasi: price * quantity.'
      ],
      starter: {
        js: 'const cart = [\n  { title: "Kofe", price: 45000, quantity: 2 },\n  { title: "Sut", price: 12000, quantity: 3 },\n  { title: "Shakar", price: 9000, quantity: 1 }\n];\n\n// cartSummary funksiyasini yozing\n'
      },
      solution: {
        js: 'const cart = [\n  { title: "Kofe", price: 45000, quantity: 2 },\n  { title: "Sut", price: 12000, quantity: 3 },\n  { title: "Shakar", price: 9000, quantity: 1 }\n];\n\nfunction cartSummary(items) {\n  return {\n    count: items.reduce((sum, item) => sum + item.quantity, 0),\n    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),\n    titles: items.map((item) => item.title)\n  };\n}\n\nconsole.log(JSON.stringify(cartSummary(cart)));'
      },
      checks: [
        { label: 'cartSummary — funksiya' },
        { label: 'count === 6' },
        { label: 'total === 135000' },
        {
          label: 'titles — nomlar massivi',
          fn: "const result = cartSummary(cart); return JSON.stringify(result.titles) === '[\"Kofe\",\"Sut\",\"Shakar\"]' || 'titles = ' + JSON.stringify(result.titles);"
        },
        { label: 'Bo‘sh savat bilan ham ishlaydi' },
        { label: 'Chiqarish uchun JSON.stringify ishlatilgan' },
        { label: 'Natija chiqarilgan' }
      ]
    }
  }
};

const lesson27 = {
  title: 'DOM',
  summary: 'Elementlarni topish, matn, klasslar va yangi tugunlarni o‘zgartirish.',
  starter: {
    html: '<h1 id="title">Sarlavha</h1>\n<p class="text">Paragraf</p>\n<ul id="list">\n  <li>Birinchi</li>\n</ul>\n',
    css: '.highlight { background: #fde68a; }\n',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: 'DOM — bu obyektlar ko‘rinishida taqdim etilgan sahifa. U orqali JavaScript foydalanuvchi ko‘rayotgan narsani o‘qiydi va o‘zgartiradi.' },
    { h: 'Elementlarni topish' },
    { code: 'document.querySelector("#title");     // birinchi mos keluvchi\ndocument.querySelectorAll(".card");   // barchasi (psevdomassiv)\ndocument.getElementById("title");' },
    { h: 'O‘qish va o‘zgartirish' },
    { code: 'const title = document.querySelector("h1");\n\ntitle.textContent = "Yangi matn";  // xavfsiz\ntitle.innerHTML = "<em>Matn</em>";  // belgilashni joylaydi\ntitle.style.color = "red";\ntitle.setAttribute("data-id", "7");' },
    { h: 'Klasslar' },
    { code: 'element.classList.add("active");\nelement.classList.remove("hidden");\nelement.classList.toggle("open");\nelement.classList.contains("active"); // true / false' },
    { h: 'Elementlar yaratish' },
    { code: 'const item = document.createElement("li");\nitem.textContent = "Yangi band";\ndocument.querySelector("ul").append(item);\n\nitem.remove(); // o‘chirish' },
    { warn: 'Foydalanuvchi ma’lumotlari bilan `innerHTML` xavfli — shu yo‘l bilan sahifaga begona skript tushadi. Matn uchun doim `textContent`.' }
  ],
  tasks: {
    'js-dom-1': {
      title: 'Matnni o‘zgartirish',
      description: '`id="title"` bo‘yicha sarlavhani toping va uning matnini `JavaScript dan salom` ga almashtiring.',
      hints: ['document.querySelector("#title").textContent = "…";'],
      solution: { js: 'const title = document.querySelector("#title");\ntitle.textContent = "JavaScript dan salom";' },
      checks: [
        { label: 'Sarlavha matni o‘zgartirildi', equals: 'JavaScript dan salom' },
        { label: 'querySelector yoki getElementById ishlatilgan' },
        { label: 'textContent ishlatilgan' },
        { label: 'HTML dagi matn o‘zgartirilmagan', contains: 'Sarlavha' }
      ]
    },
    'js-dom-2': {
      title: 'Klass qo‘shish',
      description: '`.text` paragrafiga `highlight` klassini qo‘shing — u fonni yoritadi.',
      hints: ['element.classList.add("highlight");'],
      solution: { js: 'document.querySelector(".text").classList.add("highlight");' },
      checks: [
        { label: 'Paragrafda highlight klassi paydo bo‘ldi' },
        { label: 'classList.add ishlatilgan' },
        { label: 'Yoritish qo‘llandi' },
        { label: 'Klass HTML ga yozilmagan' }
      ]
    },
    'js-dom-3': {
      title: 'Elementlar yaratish',
      description: '`#list` ro‘yxatiga yana uchta band — `Ikkinchi`, `Uchinchi`, `To‘rtinchi` — ni `createElement` orqali yaratib qo‘shing.',
      hints: [
        'Uchta bandni massiv bo‘ylab sikl bilan qo‘shish qulay.',
        'list.append(item) elementni oxiriga qo‘shadi.'
      ],
      solution: { js: 'const list = document.querySelector("#list");\n\nfor (const name of ["Ikkinchi", "Uchinchi", "To‘rtinchi"]) {\n  const item = document.createElement("li");\n  item.textContent = name;\n  list.append(item);\n}' },
      checks: [
        { label: 'Ro‘yxatda to‘rtta band' },
        {
          label: 'Bandlarning matnlari to‘g‘ri',
          fn: "const texts = ctx.$$('#list li').map((item) => ctx.text(item.textContent)); return JSON.stringify(texts) === '[\"Birinchi\",\"Ikkinchi\",\"Uchinchi\",\"To‘rtinchi\"]' || 'Olindi: ' + JSON.stringify(texts);"
        },
        { label: 'createElement ishlatilgan' },
        { label: 'HTML da bitta band qoldi' }
      ]
    },
    'js-dom-4': {
      title: 'Topilgan elementlarni ko‘rib chiqish',
      description: 'Barcha `.card` kartalarini toping, har biriga `ready` klassini qo‘shing va matn oxiriga ` #1`, ` #2`, ` #3` ko‘rinishidagi raqamni yozing.',
      hints: [
        'querySelectorAll NodeList qaytaradi — unda indeksli forEach bor.',
        'Indeks noldan boshlanadi, shuning uchun raqam = index + 1.'
      ],
      starter: {
        html: '<div class="card">Karta</div>\n<div class="card">Karta</div>\n<div class="card">Karta</div>\n',
        css: '.card { padding: 12px; border: 1px solid #ccc; margin-bottom: 8px; }\n.ready { border-color: #16a34a; }\n',
        js: '// kodingiz\n'
      },
      solution: { js: 'document.querySelectorAll(".card").forEach((card, index) => {\n  card.classList.add("ready");\n  card.textContent += ` #${index + 1}`;\n});' },
      checks: [
        { label: 'querySelectorAll ishlatilgan' },
        { label: 'Barcha kartalarda ready klassi bor' },
        {
          label: 'Raqamlash qo‘yilgan',
          fn: "const texts = ctx.$$('.card').map((card) => ctx.text(card.textContent)); return JSON.stringify(texts) === '[\"Karta #1\",\"Karta #2\",\"Karta #3\"]' || 'Olindi: ' + JSON.stringify(texts);"
        },
        { label: 'Ko‘rib chiqish (forEach yoki for) ishlatilgan' }
      ]
    },
    'js-dom-5': {
      title: 'Challenge: ma’lumotlardan ro‘yxat yasash',
      description: 'HTML da faqat bo‘sh `<ul id="menu">` bor. `dishes` massividan menyu tuzing: har bir taom uchun `dish` klassli `<li>` yarating, ichida — `<span class="name">` va `<span class="price">`. Mavjud bo‘lmagan taomlarga `sold-out` klassini qo‘shing.',
      hints: [
        'Massivni ko‘rib chiqing va har iteratsiyada li, ikkita span yaratib, ularni ichiga joylang.',
        'Shart bo‘yicha klass: if (!dish.available) item.classList.add("sold-out").'
      ],
      starter: {
        html: '<h2>Menyu</h2>\n<ul id="menu"></ul>\n',
        css: '.dish { display: flex; justify-content: space-between; padding: 6px 0; }\n.sold-out { opacity: .5; }\n',
        js: 'const dishes = [\n  { name: "Palov", price: 45000, available: true },\n  { name: "Lagmon", price: 38000, available: true },\n  { name: "Shorva", price: 32000, available: false },\n  { name: "Somsa", price: 12000, available: true }\n];\n\n// ro‘yxatni tuzing\n'
      },
      solution: {
        js: 'const dishes = [\n  { name: "Palov", price: 45000, available: true },\n  { name: "Lagmon", price: 38000, available: true },\n  { name: "Shorva", price: 32000, available: false },\n  { name: "Somsa", price: 12000, available: true }\n];\n\nconst menu = document.querySelector("#menu");\n\ndishes.forEach((dish) => {\n  const item = document.createElement("li");\n  item.className = "dish";\n  if (!dish.available) item.classList.add("sold-out");\n\n  const name = document.createElement("span");\n  name.className = "name";\n  name.textContent = dish.name;\n\n  const price = document.createElement("span");\n  price.className = "price";\n  price.textContent = `${dish.price} so‘m`;\n\n  item.append(name, price);\n  menu.append(item);\n});'
      },
      checks: [
        { label: 'To‘rtta band yaratildi' },
        { label: 'Har bir bandda nom va narx bor' },
        {
          label: 'Nomlar ma’lumotlarga mos',
          fn: "const names = ctx.$$('#menu .name').map((node) => ctx.text(node.textContent)); return JSON.stringify(names) === '[\"Palov\",\"Lagmon\",\"Shorva\",\"Somsa\"]' || 'Olindi: ' + JSON.stringify(names);"
        },
        { label: 'Narxlar chiqarilgan' },
        { label: 'Mavjud bo‘lmagan taom belgilangan' },
        {
          label: 'Aynan kerakli taom belgilangan',
          fn: "const node = ctx.$('#menu li.sold-out .name'); return (node && ctx.text(node.textContent) === 'Shorva') || 'sold-out klassi noto‘g‘ri taomda';"
        },
        { label: 'Belgilash HTML ga yozilmay, kod bilan qurilgan' }
      ]
    }
  }
};

const lesson28 = {
  title: 'Hodisalar',
  summary: 'addEventListener, hodisa obyekti va delegatsiya.',
  starter: {
    html: '<button id="btn">Meni bos</button>\n<p id="output">Hozircha hech nima bo‘lmadi</p>\n',
    css: '#output { font-weight: 600; }\n',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: 'Hodisa — sahifada sodir bo‘ladigan narsa: bosish, matn kiritish, tugma bosilishi. Kod hodisaga obuna bo‘ladi va unga javob qaytaradi.' },
    { code: 'const button = document.querySelector("#btn");\n\nbutton.addEventListener("click", () => {\n  console.log("Tugma bosildi");\n});' },
    { h: 'Tez-tez uchraydigan hodisalar' },
    { table: { head: ['Hodisa', 'Qachon sodir bo‘ladi'], rows: [
      ['`click`', 'Sichqoncha bilan bosish yoki teginish'],
      ['`input`', 'Maydondagi har bir o‘zgarish'],
      ['`change`', 'Maydon yangi qiymat bilan fokusni yo‘qotdi'],
      ['`submit`', 'Formani yuborish'],
      ['`keydown`', 'Tugma bosildi'],
      ['`mouseenter` / `mouseleave`', 'Kursor kirdi / chiqdi']
    ] } },
    { h: 'Hodisa obyekti' },
    { code: 'element.addEventListener("click", (event) => {\n  console.log(event.target);   // aynan nimaga bosildi\n  event.preventDefault();      // standart amalni bekor qilish\n  event.stopPropagation();     // hodisani yuqoriga o‘tkazmaslik\n});' },
    { h: 'Delegatsiya' },
    { p: 'Ro‘yxatning har bir elementiga ishlov beruvchi osish o‘rniga **ota** elementga obuna bo‘ladilar va `event.target` ga qaraydilar. Shunda keyinroq qo‘shilgan elementlar ham ishlaydi.' },
    { code: 'list.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n});' },
    { note: 'Playground da bosishlarni tekshiruvning o‘zi ham qila oladi — u elementlarni bosib, nima o‘zgarganiga qaraydi.' }
  ],
  tasks: {
    'js-events-1': {
      title: 'Birinchi ishlov beruvchi',
      description: '`#btn` tugmasi bosilganda `#output` dagi matn `Tugma bosildi` ga o‘zgarishi kerak.',
      hints: ['button.addEventListener("click", () => { … });'],
      solution: { js: 'const button = document.querySelector("#btn");\nconst output = document.querySelector("#output");\n\nbutton.addEventListener("click", () => {\n  output.textContent = "Tugma bosildi";\n});' },
      checks: [
        { label: 'addEventListener ishlatilgan' },
        { label: 'Bosishdan oldin matn o‘zgarmagan', contains: 'Hozircha hech nima' },
        {
          label: 'Bosishdan keyin matn o‘zgaradi',
          then: [{ label: 'Matn yangilandi', equals: 'Tugma bosildi' }]
        }
      ]
    },
    'js-events-2': {
      title: 'Bosishlar hisoblagichi',
      description: 'Bosishlarni sanang: har bir bosishdan keyin `#output` da `Bosishlar: N` bo‘lishi kerak.',
      hints: ['Ishlov beruvchidan tashqarida o‘zgaruvchi yarating va uni ichkarida oshiring.'],
      solution: { js: 'let clicks = 0;\nconst output = document.querySelector("#output");\n\ndocument.querySelector("#btn").addEventListener("click", () => {\n  clicks++;\n  output.textContent = `Bosishlar: ${clicks}`;\n});' },
      checks: [
        {
          label: 'Birinchi bosishdan keyin — «Bosishlar: 1»',
          then: [{ label: 'Hisoblagich 1 ga teng', equals: 'Bosishlar: 1' }]
        },
        {
          label: 'Uchta bosishdan keyin — «Bosishlar: 3»',
          then: [{ label: 'Hisoblagich 3 ga teng', equals: 'Bosishlar: 3' }]
        },
        { label: 'Hisoblagich o‘zgaruvchida saqlanadi' }
      ]
    },
    'js-events-3': {
      title: 'Jonli kiritish',
      description: '`#name` maydoniga matn kiritilganda `#greeting` yozuvi darhol `Salom, <matn>!` ni ko‘rsatsin, maydon bo‘sh bo‘lganda esa — `Ismingizni kiriting`.',
      hints: ['event.target.value — hozir maydonda turgan narsa.'],
      starter: {
        html: '<input id="name" type="text" placeholder="Ismingiz">\n<p id="greeting">Ismingizni kiriting</p>\n',
        css: '',
        js: '// kodingiz\n'
      },
      solution: { js: 'const field = document.querySelector("#name");\nconst greeting = document.querySelector("#greeting");\n\nfield.addEventListener("input", (event) => {\n  const value = event.target.value.trim();\n  greeting.textContent = value ? `Salom, ${value}!` : "Ismingizni kiriting";\n});' },
      checks: [
        { label: 'input hodisasi ishlatilgan' },
        {
          label: 'Ism kiritilganda salomlashish paydo bo‘ladi',
          steps: [{ do: 'type', selector: '#name', value: 'Aziza' }],
          then: [{ label: 'Matn yangilandi', equals: 'Salom, Aziza!' }]
        },
        {
          label: 'Bo‘sh maydon ishorani qaytaradi',
          steps: [
            { do: 'type', selector: '#name', value: 'Bobur' },
            { do: 'type', selector: '#name', value: '' }
          ],
          then: [{ label: 'Ishora ko‘rsatildi', equals: 'Ismingizni kiriting' }]
        }
      ]
    },
    'js-events-4': {
      title: 'Delegatsiya',
      description: '`#tasks` ro‘yxatida bitta ishlov beruvchi: bandni bosish unda `done` klassini almashtiradi. Ishlov beruvchi aniq bitta bo‘lishi kerak — har bir bandda emas, ro‘yxatda.',
      hints: [
        'event.target.closest("li") kerakli bandni topadi, hatto ichki elementga bosilgan bo‘lsa ham.',
        'classList.toggle klassni o‘zi qo‘shadi yoki olib tashlaydi.'
      ],
      starter: {
        html: '<ul id="tasks">\n  <li>Kofe sotib olish</li>\n  <li>Kod yozish</li>\n  <li>Topshiriqlarni tekshirish</li>\n</ul>\n',
        css: '.done { text-decoration: line-through; opacity: .6; }\n',
        js: '// kodingiz\n'
      },
      solution: { js: 'const tasks = document.querySelector("#tasks");\n\ntasks.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n});' },
      checks: [
        { label: 'Ishlov beruvchi ro‘yxatga osilgan' },
        { label: 'event.target ishlatilgan' },
        {
          label: 'Bandni bosish uni belgilaydi',
          then: [{ label: 'Ikkinchi band belgilandi' }]
        },
        {
          label: 'Qayta bosish belgini olib tashlaydi',
          then: [{ label: 'Belgi olib tashlandi' }]
        },
        { label: 'Ishlov beruvchi bir marta qo‘shilgan' }
      ]
    },
    'js-events-5': {
      title: 'Challenge: vazifalar ro‘yxati',
      description: 'Mini ilova yig‘ing: «Qo‘shish» tugmasi bosilganda maydondagi matn yangi ro‘yxat bandiga aylanadi, bandni bosish uni bajarilgan deb belgilaydi, `#counter` hisoblagichi `Qoldi: N` ni ko‘rsatadi. Bo‘sh satrni qo‘shib bo‘lmaydi.',
      hints: [
        'updateCounter() funksiyasi `#list li:not(.done)` ni qayta sanaydi va matnni yangilaydi.',
        'Uni ham qo‘shgandan keyin, ham bandni bosgandan keyin chaqiring.'
      ],
      starter: {
        html: '<input id="new-task" type="text" placeholder="Nima qilish kerak?">\n<button id="add">Qo‘shish</button>\n<ul id="list"></ul>\n<p id="counter">Qoldi: 0</p>\n',
        css: '.done { text-decoration: line-through; opacity: .6; }\n',
        js: '// kodingiz\n'
      },
      solution: { js: 'const field = document.querySelector("#new-task");\nconst addButton = document.querySelector("#add");\nconst list = document.querySelector("#list");\nconst counter = document.querySelector("#counter");\n\nfunction updateCounter() {\n  const left = list.querySelectorAll("li:not(.done)").length;\n  counter.textContent = `Qoldi: ${left}`;\n}\n\naddButton.addEventListener("click", () => {\n  const text = field.value.trim();\n  if (!text) return;\n\n  const item = document.createElement("li");\n  item.textContent = text;\n  list.append(item);\n\n  field.value = "";\n  updateCounter();\n});\n\nlist.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n  updateCounter();\n});' },
      checks: [
        {
          label: 'Vazifa ro‘yxatga qo‘shiladi',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Kofe sotib olish' },
            { do: 'click', selector: '#add' }
          ],
          then: [
            { label: 'Band paydo bo‘ldi' },
            { label: 'Kerakli matn bilan', contains: 'Kofe sotib olish' }
          ]
        },
        {
          label: 'Qo‘shgandan keyin maydon tozalanadi',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Kod yozish' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Maydon bo‘sh' }]
        },
        {
          label: 'Bo‘sh satr qo‘shilmaydi',
          then: [{ label: 'Ro‘yxat bo‘sh qoldi' }]
        },
        {
          label: 'Hisoblagich bajarilmaganlarni sanaydi',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Bir' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#new-task', value: 'Ikki' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Qoldi: 2', equals: 'Qoldi: 2' }]
        },
        {
          label: 'Bajarilgan deb belgilash hisoblagichni kamaytiradi',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Bir' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#new-task', value: 'Ikki' },
            { do: 'click', selector: '#add' },
            { do: 'click', selector: '#list li:first-child' }
          ],
          then: [
            { label: 'Band belgilandi' },
            { label: 'Qoldi: 1', equals: 'Qoldi: 1' }
          ]
        }
      ]
    }
  }
};

const lesson29 = {
  title: 'Formalar va validatsiya',
  summary: 'submit, preventDefault, qiymatlarni o‘qish va ma’lumotlarni tekshirish.',
  starter: {
    html: '<form id="form">\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="text">\n  <button type="submit">Yuborish</button>\n</form>\n<p id="message"></p>\n',
    css: '.error { color: #d64545; }\n.success { color: #0f9d68; }\n',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: 'Forma standart holatda sahifani qayta yuklaydi. Zamonaviy interfeyslarda buni bekor qilib, ma’lumotlarni skript bilan qayta ishlashadi.' },
    { code: 'form.addEventListener("submit", (event) => {\n  event.preventDefault();          // sahifani qayta yuklamaslik\n  const data = new FormData(form);  // barcha maydonlar birdaniga\n  console.log(data.get("email"));\n});' },
    { h: 'Qiymatlarni o‘qish' },
    { code: 'input.value            // maydon matni\ncheckbox.checked       // true / false\nselect.value           // tanlangan variant\nform.elements.email    // name atributi bo‘yicha maydon' },
    { h: 'Ma’lumotlarni tekshirish' },
    { code: 'if (!email.includes("@")) {\n  error.textContent = "To‘g‘ri pochta kiriting";\n  return;\n}' },
    { h: 'O‘rnatilgan validatsiya' },
    { p: 'Brauzer o‘zi tekshira oladi: `required`, `minlength`, `type="email"`, `pattern`. `input.validity.valid` xossasi natijani ko‘rsatadi, `form.checkValidity()` esa butun formani tekshiradi.' },
    { warn: 'Brauzer tomonidagi tekshiruv — bu qulaylik, xavfsizlik emas. Server ma’lumotlarni qaytadan tekshirishi shart.' }
  ],
  tasks: {
    'js-forms-1': {
      title: 'Yuborishni ushlab qolish',
      description: 'Formaning yuborilishini ushlab qoling: qayta yuklashni bekor qiling va `#message` ga `Forma yuborildi` matnini chiqaring.',
      hints: ['form.addEventListener("submit", (event) => { event.preventDefault(); … });'],
      solution: { js: 'const form = document.querySelector("#form");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  message.textContent = "Forma yuborildi";\n});' },
      checks: [
        { label: 'submit hodisasining ishlov beruvchisi' },
        { label: 'preventDefault chaqirilgan' },
        {
          label: 'Yuborgandan keyin xabar paydo bo‘ladi',
          then: [{ label: 'Xabar matni to‘g‘ri', equals: 'Forma yuborildi' }]
        }
      ]
    },
    'js-forms-2': {
      title: 'Qiymatni o‘qish',
      description: 'Yuborishda `#message` ga `Pochta: <kiritilgan qiymat>` satrini chiqaring.',
      hints: ['document.querySelector("#email").value'],
      solution: { js: 'const form = document.querySelector("#form");\nconst email = document.querySelector("#email");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  message.textContent = `Pochta: ${email.value}`;\n});' },
      checks: [
        {
          label: 'Maydon qiymati xabarga tushadi',
          then: [{ label: 'Xabar to‘g‘ri', equals: 'Pochta: user@mail.com' }]
        },
        {
          label: 'Boshqa qiymat bilan ham ishlaydi',
          then: [{ label: 'Xabar yangilandi' }]
        },
        { label: 'value xossasi ishlatilgan' }
      ]
    },
    'js-forms-3': {
      title: 'Oddiy validatsiya',
      description: 'Pochtani tekshiring: qiymatda `@` belgisi bo‘lmasa, `#message` ga `Pochta noto‘g‘ri` matnini va `error` klassini qo‘ying; aks holda — `Tayyor` va `success`.',
      hints: [
        '"success" ni qo‘shishdan oldin classList.remove("error") — aks holda ikkala klass ham qoladi.',
        'value.includes("@")'
      ],
      solution: { js: 'const form = document.querySelector("#form");\nconst email = document.querySelector("#email");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const value = email.value.trim();\n\n  if (!value.includes("@")) {\n    message.textContent = "Pochta noto‘g‘ri";\n    message.classList.add("error");\n    message.classList.remove("success");\n    return;\n  }\n\n  message.textContent = "Tayyor";\n  message.classList.add("success");\n  message.classList.remove("error");\n});' },
      checks: [
        {
          label: 'Noto‘g‘ri qiymat rad etiladi',
          steps: [
            { do: 'type', selector: '#email', value: 'oddiy-matn' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [
            { label: 'Xatolik ko‘rsatildi', equals: 'Pochta noto‘g‘ri' },
            { label: 'error klassi qo‘shildi' }
          ]
        },
        {
          label: 'To‘g‘ri qiymat qabul qilinadi',
          then: [
            { label: 'Muvaffaqiyat ko‘rsatildi', equals: 'Tayyor' },
            { label: 'success klassi qo‘shildi' },
            { label: 'error klassi olib tashlandi' }
          ]
        },
        { label: 'Tekshiruv kodda yozilgan' }
      ]
    },
    'js-forms-4': {
      title: 'Bir nechta maydon',
      description: 'Ro‘yxatdan o‘tish formasini tekshiring: ism — kamida 2 ta belgi, parol — kamida 8 ta, rozilik katakchasi majburiy. Xatolikda uning matnini `#message` da ko‘rsating, muvaffaqiyatda — `Ro‘yxatdan o‘tish yakunlandi`.',
      hints: [
        'Tekshiruvlarni zanjir qilib qo‘yish qulay: birinchi xatolikdayoq — xabar va return.',
        'Satr uzunligi — value.trim().length.'
      ],
      starter: {
        html: '<form id="form">\n  <input id="name" name="name" type="text" placeholder="Ism">\n  <input id="password" name="password" type="password" placeholder="Parol">\n  <label><input id="agree" type="checkbox"> Roziman</label>\n  <button type="submit">Yuborish</button>\n</form>\n<p id="message"></p>\n',
        css: '.error { color: #d64545; }\n',
        js: '// kodingiz\n'
      },
      solution: { js: 'const form = document.querySelector("#form");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const name = document.querySelector("#name").value.trim();\n  const password = document.querySelector("#password").value;\n  const agree = document.querySelector("#agree").checked;\n\n  if (name.length < 2) {\n    message.textContent = "Ism juda qisqa";\n    return;\n  }\n  if (password.length < 8) {\n    message.textContent = "Parol 8 ta belgidan qisqa";\n    return;\n  }\n  if (!agree) {\n    message.textContent = "Shartlarga rozilik kerak";\n    return;\n  }\n\n  message.textContent = "Ro‘yxatdan o‘tish yakunlandi";\n});' },
      checks: [
        {
          label: 'Qisqa ism rad etiladi',
          steps: [
            { do: 'type', selector: '#name', value: 'A' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Ism haqida xabar bor', matches: 'ism|Ism' }]
        },
        {
          label: 'Qisqa parol rad etiladi',
          steps: [
            { do: 'type', selector: '#name', value: 'Aziza' },
            { do: 'type', selector: '#password', value: '123' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Parol haqida xabar bor', matches: 'arol' }]
        },
        {
          label: 'Roziliksiz forma o‘tmaydi',
          steps: [
            { do: 'type', selector: '#name', value: 'Aziza' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Bu muvaffaqiyat emas', notContains: 'Ro‘yxatdan o‘tish yakunlandi' }]
        },
        {
          label: 'To‘g‘ri ma’lumotlar o‘tadi',
          steps: [
            { do: 'type', selector: '#name', value: 'Aziza' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Muvaffaqiyat ko‘rsatildi', equals: 'Ro‘yxatdan o‘tish yakunlandi' }]
        },
        { label: 'Katakcha holati tekshirilgan' }
      ]
    },
    'js-forms-5': {
      title: 'Challenge: yakuni bilan buyurtma formasi',
      description: 'Buyurtma formasi: soni yoki tarif o‘zgarganda `#total` dagi yakunni darhol qayta hisoblang (`Start` — 100000, `Pro` — 250000, songa ko‘paytiriladi). Yuborishda ism va telefonni (kamida 9 ta raqam) tekshiring va natijani `#message` da ko‘rsating.',
      hints: [
        'Raqamlar soni: phone.replace(/\\D/g, "").length.',
        'Bitta hisoblash funksiyasini ikkala hodisaga ham obuna qilish mumkin: input va change.'
      ],
      starter: {
        html: '<form id="order">\n  <input id="name" type="text" placeholder="Ism">\n  <input id="phone" type="tel" placeholder="Telefon">\n  <select id="plan">\n    <option value="start">Start</option>\n    <option value="pro">Pro</option>\n  </select>\n  <input id="qty" type="number" value="1" min="1">\n  <p id="total">Jami: 100000</p>\n  <button type="submit">Buyurtma berish</button>\n</form>\n<p id="message"></p>\n',
        css: '.error { color: #d64545; }\n',
        js: 'const PRICES = { start: 100000, pro: 250000 };\n\n// kodingiz\n'
      },
      solution: { js: 'const PRICES = { start: 100000, pro: 250000 };\n\nconst form = document.querySelector("#order");\nconst plan = document.querySelector("#plan");\nconst qty = document.querySelector("#qty");\nconst total = document.querySelector("#total");\nconst message = document.querySelector("#message");\n\nfunction recalculate() {\n  const sum = PRICES[plan.value] * Number(qty.value || 0);\n  total.textContent = `Jami: ${sum}`;\n}\n\nplan.addEventListener("change", recalculate);\nqty.addEventListener("input", recalculate);\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const name = document.querySelector("#name").value.trim();\n  const digits = document.querySelector("#phone").value.replace(/\\D/g, "");\n\n  if (name.length < 2) {\n    message.textContent = "Ismni kiriting";\n    return;\n  }\n  if (digits.length < 9) {\n    message.textContent = "Telefonda kamida 9 ta raqam bo‘lishi kerak";\n    return;\n  }\n\n  message.textContent = "Buyurtma qabul qilindi";\n});' },
      checks: [
        {
          label: 'Sonini o‘zgartirish yakunni qayta hisoblaydi',
          then: [{ label: 'Jami: 300000', equals: 'Jami: 300000' }]
        },
        {
          label: 'Tarifni almashtirish yakunni qayta hisoblaydi',
          then: [{ label: 'Jami: 500000', equals: 'Jami: 500000' }]
        },
        {
          label: 'Qisqa telefon rad etiladi',
          steps: [
            { do: 'type', selector: '#name', value: 'Aziza' },
            { do: 'type', selector: '#phone', value: '12345' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [
            { label: 'Xatolik haqida xabar bor' },
            { label: 'Bu muvaffaqiyat emas', notContains: 'Buyurtma qabul qilindi' }
          ]
        },
        {
          label: 'To‘g‘ri buyurtma qabul qilinadi',
          steps: [
            { do: 'type', selector: '#name', value: 'Aziza' },
            { do: 'type', selector: '#phone', value: '+998901234567' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Muvaffaqiyat ko‘rsatildi', contains: 'Buyurtma qabul qilindi' }]
        },
        { label: 'Telefon raqamlar soni bo‘yicha tekshiriladi' },
        { label: 'Yakun PRICES dan hisoblanadi' }
      ]
    }
  }
};

const lesson30 = {
  title: 'LocalStorage',
  summary: 'Ma’lumotlarni brauzerda qayta yuklashlar orasida saqlash.',
  starter: {
    html: '<input id="draft" type="text" placeholder="Qoralama">\n<button id="save">Saqlash</button>\n<p id="status"></p>\n',
    css: '',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: '`localStorage` — to‘g‘ridan-to‘g‘ri brauzerdagi kichik «kalit — qiymat» omboxonasi. Ma’lumotlar sahifa qayta yuklanganda ham saqlanadi.' },
    { code: 'localStorage.setItem("theme", "dark");\nlocalStorage.getItem("theme");    // "dark"\nlocalStorage.removeItem("theme");\nlocalStorage.clear();' },
    { warn: 'Ombor faqat satrlarni biladi. `5` soni `"5"` bo‘lib qaytadi, obyekt esa `[object Object]` ga aylanadi.' },
    { h: 'Obyektlar va massivlar' },
    { code: 'const cart = [{ id: 1, qty: 2 }];\n\nlocalStorage.setItem("cart", JSON.stringify(cart));\nconst saved = JSON.parse(localStorage.getItem("cart") || "[]");' },
    { h: 'U yerda nima bo‘lmasligi kerak' },
    { p: 'Parollar, tokenlar, shaxsiy ma’lumotlar: ombor sahifadagi istalgan skriptga ochiq. U yerga interfeys sozlamalari, qoralamalar, savat qo‘yiladi.' },
    { note: 'Playground da ombor dars ishga tushirishlari orasida saqlanadi, «Tozalash» tugmasi esa uni ham tozalaydi.' }
  ],
  tasks: {
    'js-localstorage-1': {
      title: 'Qiymatni saqlash',
      description: 'localStorage ga `theme` kalitini `dark` qiymati bilan saqlang va o‘qilgan qiymatni konsolga chiqaring.',
      hints: ['localStorage.setItem("theme", "dark");'],
      solution: { js: 'localStorage.setItem("theme", "dark");\nconsole.log(localStorage.getItem("theme"));' },
      checks: [
        { label: 'setItem ishlatilgan' },
        { label: 'Omborda theme = dark bor' },
        { label: 'Qiymat getItem orqali o‘qilgan' },
        { label: 'Qiymat konsolga chiqarilgan' }
      ]
    },
    'js-localstorage-2': {
      title: 'Qoralamani saqlash',
      description: '«Saqlash» tugmasi bosilganda `#draft` maydonidagi matnni `draft` kaliti ostida localStorage ga joylang va `#status` da `Saqlandi` matnini ko‘rsating.',
      hints: ['Maydon qiymati formalar darsidagidek olinadi: field.value.'],
      solution: { js: 'const field = document.querySelector("#draft");\nconst status = document.querySelector("#status");\n\ndocument.querySelector("#save").addEventListener("click", () => {\n  localStorage.setItem("draft", field.value);\n  status.textContent = "Saqlandi";\n});' },
      checks: [
        {
          label: 'Matn omborga saqlanadi',
          steps: [
            { do: 'type', selector: '#draft', value: 'mening qaydim' },
            { do: 'click', selector: '#save' }
          ],
          then: [
            { label: 'Omborda qayd bor', equals: 'mening qaydim' },
            { label: 'Holat ko‘rsatildi', equals: 'Saqlandi' }
          ]
        },
        { label: 'draft kaliti ishlatiladi' }
      ]
    },
    'js-localstorage-3': {
      title: 'Yuklashda tiklash',
      description: 'Omborda allaqachon qoralama bor (`draft` kaliti). Sahifa ishga tushganda uni maydonga qo‘ying va `#status` ga `Qoralama tiklandi` deb yozing. Saqlangani bo‘lmasa — maydon bo‘sh qoladi, holatda esa `Qoralama bo‘sh`.',
      hints: [
        'Kalit bo‘lmasa, getItem null qaytaradi.',
        'Tiklash kodi ishlov beruvchilardan tashqarida yoziladi — u darhol bajariladi.'
      ],
      sandbox: { storageSeed: { draft: 'tugallanmagan qayd' } },
      solution: { js: 'const field = document.querySelector("#draft");\nconst status = document.querySelector("#status");\n\nconst saved = localStorage.getItem("draft");\n\nif (saved) {\n  field.value = saved;\n  status.textContent = "Qoralama tiklandi";\n} else {\n  status.textContent = "Qoralama bo‘sh";\n}\n\ndocument.querySelector("#save").addEventListener("click", () => {\n  localStorage.setItem("draft", field.value);\n  status.textContent = "Saqlandi";\n});' },
      checks: [
        { label: 'Qiymat ishga tushishda o‘qiladi' },
        { label: 'Qoralama maydonga qo‘yildi', equals: 'tugallanmagan qayd' },
        { label: 'Tiklash holati ko‘rsatildi', equals: 'Qoralama tiklandi' },
        { label: 'Bo‘sh holat ham hisobga olingan', contains: 'Qoralama bo‘sh' },
        { label: '«Qiymat bormi» tekshiruvi yozilgan' }
      ]
    },
    'js-localstorage-4': {
      title: 'Omborda massiv',
      description: 'Vazifalar ro‘yxatini JSON sifatida saqlang: «Qo‘shish» bosilganda yangi vazifa massivga tushadi, massiv `tasks` kalitiga yoziladi, ro‘yxat esa qaytadan chiziladi.',
      hints: [
        'Shunday o‘qing: JSON.parse(localStorage.getItem("tasks") || "[]").',
        'Massivni o‘zgartirgandan keyin ro‘yxatni to‘liq qayta chizing — bu bittalab qo‘shishdan oson.'
      ],
      starter: {
        html: '<input id="task" type="text" placeholder="Vazifa">\n<button id="add">Qo‘shish</button>\n<ul id="list"></ul>\n',
        css: '',
        js: '// kodingiz\n'
      },
      solution: { js: 'const field = document.querySelector("#task");\nconst list = document.querySelector("#list");\n\nfunction load() {\n  return JSON.parse(localStorage.getItem("tasks") || "[]");\n}\n\nfunction render() {\n  list.innerHTML = "";\n  load().forEach((task) => {\n    const item = document.createElement("li");\n    item.textContent = task;\n    list.append(item);\n  });\n}\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  const text = field.value.trim();\n  if (!text) return;\n\n  const tasks = load();\n  tasks.push(text);\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n\n  field.value = "";\n  render();\n});\n\nrender();' },
      checks: [
        { label: 'JSON.stringify ishlatilgan' },
        { label: 'JSON.parse ishlatilgan' },
        {
          label: 'Vazifa omborga saqlanadi',
          steps: [
            { do: 'type', selector: '#task', value: 'Kofe sotib olish' },
            { do: 'click', selector: '#add' }
          ],
          then: [
            { label: 'Omborda vazifa bor', contains: 'Kofe sotib olish' },
            { label: 'Vazifa ro‘yxatda ko‘rinadi' }
          ]
        },
        {
          label: 'Aynan massiv saqlanadi',
          steps: [
            { do: 'type', selector: '#task', value: 'Bir' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#task', value: 'Ikki' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Massivda ikkita vazifa' }]
        }
      ]
    },
    'js-localstorage-5': {
      title: 'Challenge: mavzu almashtirgich',
      description: '`#toggle` tugmasi `<body>` dagi `dark` klassini almashtiradi va tanlovni `theme` kalitida eslab qoladi. Yuklashda mavzu tiklanadi, tugma matni esa joriy holatni ko‘rsatadi: `Qorong‘i mavzu` / `Yorug‘ mavzu`.',
      hints: [
        'classList.toggle klass qo‘shilganda true qaytaradi — buni saqlash uchun ishlatish qulay.',
        'Bitta applyTheme(theme) funksiyasini ham yuklashda, ham bosishda chaqirish mumkin.'
      ],
      starter: {
        html: '<button id="toggle">Qorong‘i mavzu</button>\n<p>Sahifa tarkibi</p>\n',
        css: 'body { background: #ffffff; color: #16203a; transition: background .2s, color .2s; }\nbody.dark { background: #0b1020; color: #e5e9f5; }\n',
        js: '// kodingiz\n'
      },
      solution: { js: 'const button = document.querySelector("#toggle");\n\nfunction applyTheme(theme) {\n  const isDark = theme === "dark";\n  document.body.classList.toggle("dark", isDark);\n  button.textContent = isDark ? "Yorug‘ mavzu" : "Qorong‘i mavzu";\n  localStorage.setItem("theme", isDark ? "dark" : "light");\n}\n\napplyTheme(localStorage.getItem("theme") || "light");\n\nbutton.addEventListener("click", () => {\n  const next = document.body.classList.contains("dark") ? "light" : "dark";\n  applyTheme(next);\n});' },
      checks: [
        {
          label: 'Bosish qorong‘i mavzuni yoqadi',
          then: [
            { label: 'body da dark klassi bor' },
            { label: 'Tanlov saqlandi' }
          ]
        },
        {
          label: 'Qayta bosish yorug‘ mavzuni qaytaradi',
          then: [
            { label: 'dark klassi olib tashlandi' },
            { label: 'Omborda light' }
          ]
        },
        {
          label: 'Tugma matni o‘zgaradi',
          then: [{ label: 'Tugma yorug‘ mavzuni taklif qiladi', contains: 'Yorug‘' }]
        },
        { label: 'Mavzu yuklashda tiklanadi' },
        { label: 'classList ishlatilgan' }
      ]
    }
  }
};

const UZ_API_USERS = [
  { id: 1, name: 'Aziza', city: 'Toshkent', active: true },
  { id: 2, name: 'Bobur', city: 'Samarqand', active: false },
  { id: 3, name: 'Karim', city: 'Toshkent', active: true },
  { id: 4, name: 'Dilnoza', city: 'Buxoro', active: true }
];

const UZ_API_SANDBOX = {
  mockApi: {
    '/api/users': { json: UZ_API_USERS, delayMs: 80 },
    '/api/users/1': { json: UZ_API_USERS[0], delayMs: 60 },
    '/api/stats': { json: { users: 4, orders: 17, revenue: 890000 }, delayMs: 60 },
    '/api/orders': { json: [{ id: 11, userId: 1, total: 45000 }, { id: 12, userId: 3, total: 120000 }], delayMs: 120 },
    '/api/missing': { status: 404, json: { error: 'not found' }, delayMs: 40 },
    '/api/broken': { status: 500, json: { error: 'server error' }, delayMs: 40 }
  }
};

const lesson31 = {
  title: 'Fetch va API',
  summary: 'Serverga so‘rovlar, JSON ni tahlil qilish va xatoliklarni qayta ishlash.',
  sandbox: UZ_API_SANDBOX,
  starter: {
    html: '<h2>Foydalanuvchilar</h2>\n<ul id="users"></ul>\n<p id="status"></p>\n',
    css: '',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: 'Ma’lumotlarning ko‘p qismini sahifa HTML dan emas, serverga so‘rov orqali oladi. Bu bilan `fetch` shug‘ullanadi.' },
    { code: 'fetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    console.log(users.length);\n  })\n  .catch((error) => {\n    console.error("Tarmoq xatosi", error);\n  });' },
    { h: 'Nimani tushunish muhim' },
    { ul: [
      '`fetch` **promis** qaytaradi — javob keyinroq kelishiga va’da;',
      '`response.json()` ham promis, shuning uchun ikkinchi `.then` kerak;',
      '`response.ok` 4xx va 5xx holatlarda `false` bo‘ladi, lekin `catch` bunda **ishlamaydi** — server xatosi qo‘lda tekshiriladi.'
    ] },
    { code: 'fetch("/api/missing")\n  .then((response) => {\n    if (!response.ok) throw new Error(`Holat ${response.status}`);\n    return response.json();\n  })\n  .catch((error) => console.log(error.message));' },
    { note: 'Sinov muhitida o‘quv manzillari mavjud: `/api/users`, `/api/users/1`, `/api/stats`, `/api/orders`, `/api/missing` (404), `/api/broken` (500). Haqiqiy tarmoq o‘chirilgan.' }
  ],
  tasks: {
    'js-fetch-1': {
      title: 'Birinchi so‘rov',
      description: '`/api/users` ga so‘rov yuboring, JSON ni tahlil qiling va foydalanuvchilar sonini konsolga chiqaring.',
      hints: ['fetch("/api/users").then((response) => response.json()).then((users) => …)'],
      solution: { js: 'fetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    console.log(users.length);\n  });' },
      checks: [
        { label: 'fetch ishlatilgan' },
        { label: 'Javob .json() orqali tahlil qilingan' },
        { label: 'Konsolda 4 soni bor' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-fetch-2': {
      title: 'Ma’lumotlarni sahifaga chiqarish',
      description: 'Foydalanuvchilarni oling va ularni `#users` ro‘yxatida ko‘rsating: har bir odam uchun `Ism — Shahar` matnli bitta `<li>`.',
      hints: ['Massivni ikkinchi .then ichida forEach metodi bilan ko‘rib chiqing.'],
      solution: { js: 'const list = document.querySelector("#users");\n\nfetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    users.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = `${user.name} — ${user.city}`;\n      list.append(item);\n    });\n  });' },
      checks: [
        { label: 'To‘rtta band yaratildi' },
        {
          label: 'Birinchi band — Aziza — Toshkent',
          fn: "const item = ctx.$('#users li'); return (item && ctx.text(item.textContent) === 'Aziza — Toshkent') || 'Olindi: ' + (item ? ctx.text(item.textContent) : 'bo‘sh');"
        },
        { label: 'Ro‘yxat ma’lumotlardan qurilgan' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-fetch-3': {
      title: '404 xatosi',
      description: 'Mavjud bo‘lmagan `/api/missing` manziliga so‘rov yuboring. `response.ok` ni tekshiring va `#status` ga `Xatolik: 404` matnini chiqaring.',
      hints: [
        'response.status javob kodini saqlaydi.',
        'then ichidagi throw new Error(...) catch ga tushadi.'
      ],
      solution: { js: 'const status = document.querySelector("#status");\n\nfetch("/api/missing")\n  .then((response) => {\n    if (!response.ok) throw new Error(`Xatolik: ${response.status}`);\n    return response.json();\n  })\n  .catch((error) => {\n    status.textContent = error.message;\n  });' },
      checks: [
        { label: 'response.ok yoki status tekshirilgan' },
        { label: 'Xatolik haqida xabar ko‘rsatildi', equals: 'Xatolik: 404' },
        { label: 'catch yoki xatoni qayta ishlash ishlatilgan' },
        { label: 'Sahifa buzilmadi' }
      ]
    },
    'js-fetch-4': {
      title: 'Yuklanish indikatori',
      description: 'So‘rovdan oldin `#status` da `Yuklanmoqda…` matnini ko‘rsating, muvaffaqiyatli javobdan keyin — `Yuklandi: 4`, ma’lumotlarni esa ro‘yxatga chiqaring.',
      hints: ['Avval holatni belgilang, keyin fetch ni chaqiring — shunda foydalanuvchi javobni darhol ko‘radi.'],
      solution: { js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#users");\n\nstatus.textContent = "Yuklanmoqda…";\n\nfetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    users.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n    status.textContent = `Yuklandi: ${users.length}`;\n  });' },
      checks: [
        { label: 'Indikator kodda tasvirlangan', contains: 'Yuklanmoqda' },
        { label: 'Yuklangandan keyin holat yangilandi', equals: 'Yuklandi: 4' },
        { label: 'Ro‘yxat to‘ldirildi' },
        {
          label: 'Holat so‘rovdan oldin qo‘yilgan',
          fn: "const source = ctx.source.js; const loading = source.indexOf('Yuklanmoqda'); const fetchAt = source.indexOf('fetch('); return (loading !== -1 && fetchAt !== -1 && loading < fetchAt) || '«Yuklanmoqda…» matni fetch chaqirilishidan oldin paydo bo‘lishi kerak';"
        }
      ]
    },
    'js-fetch-5': {
      title: 'Challenge: filtrli foydalanuvchilar',
      description: 'Foydalanuvchilarni yuklang va faqat faollarini (`active: true`) ism bo‘yicha saralab ko‘rsating. `#status` da `Faollar: N` ni chiqaring. So‘rov muvaffaqiyatsiz bo‘lsa, `Yuklab bo‘lmadi` matnini ko‘rsating.',
      hints: [
        'Satrlarni saralash: a.name.localeCompare(b.name, "uz").',
        'catch zanjir oxiriga qo‘shiladi va yuqoridagi istalgan xatoni ushlaydi.'
      ],
      solution: { js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#users");\n\nfetch("/api/users")\n  .then((response) => {\n    if (!response.ok) throw new Error("bad response");\n    return response.json();\n  })\n  .then((users) => {\n    const active = users\n      .filter((user) => user.active)\n      .sort((a, b) => a.name.localeCompare(b.name, "uz"));\n\n    active.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n\n    status.textContent = `Faollar: ${active.length}`;\n  })\n  .catch(() => {\n    status.textContent = "Yuklab bo‘lmadi";\n  });' },
      checks: [
        { label: 'Faqat faollari ko‘rsatilgan' },
        {
          label: 'Ism bo‘yicha saralash',
          fn: "const names = ctx.$$('#users li').map((item) => ctx.text(item.textContent)); const sorted = [...names].sort((a, b) => a.localeCompare(b, 'uz')); return JSON.stringify(names) === JSON.stringify(sorted) || 'Olindi: ' + JSON.stringify(names);"
        },
        { label: 'Holat sonni ko‘rsatadi', equals: 'Faollar: 3' },
        { label: 'filter ishlatilgan' },
        { label: 'Saralash ishlatilgan' },
        { label: 'Xatoni qayta ishlash nazarda tutilgan', contains: 'Yuklab bo‘lmadi' },
        { label: 'Konsolda xatolik yo‘q' }
      ]
    }
  }
};

const lesson32 = {
  title: 'Async / await',
  summary: 'Oddiy kod kabi o‘qiladigan asinxron kod.',
  sandbox: UZ_API_SANDBOX,
  starter: {
    html: '<h2>Ma’lumotlar</h2>\n<ul id="list"></ul>\n<p id="status"></p>\n',
    css: '',
    js: '// kodingiz\n'
  },
  theory: [
    { lead: '`async/await` — o‘sha promisning o‘zi, lekin odamcha yozilgani: yuqoridan pastga, ichma-ich `.then` larsiz.' },
    { code: '// oldin\nfetch("/api/users")\n  .then((r) => r.json())\n  .then((users) => console.log(users.length));\n\n// endi\nasync function load() {\n  const response = await fetch("/api/users");\n  const users = await response.json();\n  console.log(users.length);\n}\nload();' },
    { h: 'Qoidalar' },
    { ul: [
      '`await` faqat `async` bilan belgilangan funksiya ichida ishlaydi;',
      '`async`-funksiya doim promis qaytaradi;',
      'xatolar odatdagi `try / catch` bilan ushlanadi.'
    ] },
    { code: 'async function load() {\n  try {\n    const response = await fetch("/api/broken");\n    if (!response.ok) throw new Error(`Holat ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.error(error.message);\n    return null;\n  } finally {\n    console.log("So‘rov yakunlandi");\n  }\n}' },
    { h: 'Parallel yoki navbat bilan' },
    { code: '// navbat bilan — uzoqroq\nconst users = await getUsers();\nconst orders = await getOrders();\n\n// parallel — tezroq\nconst [users, orders] = await Promise.all([getUsers(), getOrders()]);' },
    { warn: 'So‘rovlar bir-biriga bog‘liq bo‘lmasa, `await` ni sikl ichiga qo‘ymang: 300 ms dan beshta so‘rov — bu 300 ms o‘rniga 1,5 soniya.' }
  ],
  tasks: {
    'js-async-1': {
      title: 'await ga o‘tkazish',
      description: 'Foydalanuvchilarni yuklashni `.then` dan `async/await` ga o‘tkazing: `async function loadUsers()` e’lon qiling va sonini konsolga chiqaring.',
      hints: ['Funksiyani chaqirishni unutmang: loadUsers();'],
      solution: { js: 'async function loadUsers() {\n  const response = await fetch("/api/users");\n  const users = await response.json();\n  console.log(users.length);\n}\n\nloadUsers();' },
      checks: [
        { label: 'async-funksiya e’lon qilingan' },
        { label: 'await ishlatilgan' },
        { label: '.then zanjirlari qolmadi' },
        { label: 'Konsolda foydalanuvchilar soni' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-async-2': {
      title: 'try / catch',
      description: '`/api/broken` ga so‘rov yuboring (server 500 qaytaradi). Xatoni `try/catch` orqali ushlang va `#status` ga `Server ishlamayapti` matnini chiqaring.',
      hints: ['Yomon holat o‘zi istisno keltirib chiqarmaydi — uni throw orqali qo‘lda tashlang.'],
      solution: { js: 'const status = document.querySelector("#status");\n\nasync function load() {\n  try {\n    const response = await fetch("/api/broken");\n    if (!response.ok) throw new Error("bad status");\n    return await response.json();\n  } catch (error) {\n    status.textContent = "Server ishlamayapti";\n    return null;\n  }\n}\n\nload();' },
      checks: [
        { label: 'try/catch ishlatilgan' },
        { label: 'Javob holati tekshirilgan' },
        { label: 'Xabar ko‘rsatildi', equals: 'Server ishlamayapti' },
        { label: 'Ushlanmagan xatolar yo‘q' }
      ]
    },
    'js-async-3': {
      title: 'Ketma-ket ikkita so‘rov',
      description: '`/api/stats` va `/api/users` ni yuklang hamda `#status` ga `Foydalanuvchilar: 4, buyurtmalar: 17` ko‘rinishidagi satrni chiqaring.',
      hints: ['Foydalanuvchilar sonini massiv uzunligidan yoki /api/stats dagi users maydonidan olish mumkin.'],
      solution: { js: 'const status = document.querySelector("#status");\n\nasync function load() {\n  const statsResponse = await fetch("/api/stats");\n  const stats = await statsResponse.json();\n\n  const usersResponse = await fetch("/api/users");\n  const users = await usersResponse.json();\n\n  status.textContent = `Foydalanuvchilar: ${users.length}, buyurtmalar: ${stats.orders}`;\n}\n\nload();' },
      checks: [
        { label: 'Ikkala manzil ham so‘ralgan' },
        { label: 'Satr to‘g‘ri yig‘ilgan', equals: 'Foydalanuvchilar: 4, buyurtmalar: 17' },
        { label: 'await ishlatilgan' },
        { label: 'Ma’lumotlar javoblardan olingan, yozilmagan', notContains: 'Foydalanuvchilar: 4' }
      ]
    },
    'js-async-4': {
      title: 'Promise.all',
      description: '`/api/users` va `/api/orders` ni `Promise.all` orqali **parallel** yuklang va `#status` ga `4 foydalanuvchi, 2 buyurtma` satrini chiqaring.',
      hints: [
        'Promise.all promislar massivini qabul qilib, natijalar massivini qaytaradi.',
        'getJson(url) yordamchi funksiyasini yasash mumkin.'
      ],
      solution: { js: 'const status = document.querySelector("#status");\n\nasync function getJson(url) {\n  const response = await fetch(url);\n  return response.json();\n}\n\nasync function load() {\n  const [users, orders] = await Promise.all([\n    getJson("/api/users"),\n    getJson("/api/orders")\n  ]);\n\n  status.textContent = `${users.length} foydalanuvchi, ${orders.length} buyurtma`;\n}\n\nload();' },
      checks: [
        { label: 'Promise.all ishlatilgan' },
        { label: 'Natija to‘g‘ri', equals: '4 foydalanuvchi, 2 buyurtma' },
        { label: 'Sonlar javoblardan olingan', notContains: '4 foydalanuvchi' },
        { label: 'Natija destrukturizatsiya qilingan' }
      ]
    },
    'js-async-5': {
      title: 'Challenge: statistika sahifasi',
      description: 'Mini dashboard yig‘ing: ma’lumotlar yuklanayotganda `#status` `Yuklanmoqda…` ni ko‘rsatadi; so‘ng foydalanuvchilar va buyurtmalar parallel yuklanadi; `#list` ga faol foydalanuvchilarning ismlari, `#status` ga esa `Faollar: 3 · Buyurtmalar: 2` chiqadi. Har qanday xatolik `Yuklashda xatolik` matniga olib keladi.',
      hints: [
        'Tuzilishi: status = "Yuklanmoqda…" → try { Promise.all } catch { xatolik holati }.',
        '«·» ajratgichi shunchaki satrning bir qismi.'
      ],
      solution: { js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#list");\n\nasync function getJson(url) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`Holat ${response.status}`);\n  return response.json();\n}\n\nasync function load() {\n  status.textContent = "Yuklanmoqda…";\n\n  try {\n    const [users, orders] = await Promise.all([\n      getJson("/api/users"),\n      getJson("/api/orders")\n    ]);\n\n    const active = users.filter((user) => user.active);\n\n    active.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n\n    status.textContent = `Faollar: ${active.length} · Buyurtmalar: ${orders.length}`;\n  } catch (error) {\n    status.textContent = "Yuklashda xatolik";\n  }\n}\n\nload();' },
      checks: [
        { label: 'Promise.all ishlatilgan' },
        { label: 'Yuklanish indikatori bor', contains: 'Yuklanmoqda' },
        { label: 'Ro‘yxatda uchta faol foydalanuvchi' },
        { label: 'Yakuniy satr to‘g‘ri', equals: 'Faollar: 3 · Buyurtmalar: 2' },
        { label: 'Xatolarni qayta ishlash bor' },
        { label: 'Xatolik matni nazarda tutilgan', contains: 'Yuklashda xatolik' },
        { label: 'Ushlanmagan xatolar yo‘q' }
      ]
    }
  }
};

const UZ_LESSON_MODULES = {
  './math.js': 'export const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport function multiply(a, b) { return a * b; }\nexport default function square(n) { return n * n; }\n',
  './format.js': 'export function money(value) {\n  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " so‘m";\n}\nexport function upper(text) { return String(text).toUpperCase(); }\n',
  './cart.js': 'export const items = [\n  { title: "Kofe", price: 45000, quantity: 2 },\n  { title: "Sut", price: 12000, quantity: 3 }\n];\n\nexport function total(list) {\n  return list.reduce((sum, item) => sum + item.price * item.quantity, 0);\n}\n'
};

const lesson33 = {
  title: 'Modullar',
  summary: 'export, import va kodni fayllarga bo‘lish.',
  sandbox: { modules: UZ_LESSON_MODULES },
  starter: {
    html: '<h2>Modullar</h2>\n<p id="output"></p>\n',
    css: '',
    js: '// ./math.js dan kerakligini import qiling\n'
  },
  theory: [
    { lead: 'Fayl bir necha yuz qatordan oshganda uni modullarga bo‘lishadi: har biri o‘z ishiga javob beradi va tashqariga faqat kerakligini beradi.' },
    { h: 'Eksport' },
    { code: '// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default function square(n) { return n * n; }' },
    { h: 'Import' },
    { code: 'import square, { add, PI } from "./math.js";\nimport * as math from "./math.js";\nimport { add as sum } from "./math.js";' },
    { table: { head: ['Turi', 'Yozuvi'], rows: [
      ['Nomlangan', '`export function add()` → `import { add }`'],
      ['Standart', '`export default fn` → `import anyName`'],
      ['Hammasi birga', '`import * as math` → `math.add()`'],
      ['Nomini o‘zgartirib', '`import { add as sum }`']
    ] } },
    { h: 'Ulash' },
    { code: '<script type="module" src="app.js"></script>' },
    { note: 'Bu darsda JS yorlig‘i allaqachon modul sifatida ishlaydi. Tayyor fayllar mavjud: `./math.js`, `./format.js`, `./cart.js`.' },
    { warn: 'Modulda global o‘zgaruvchilar yo‘q: ichida e’lon qilingan hamma narsa eksport qilinmaguncha faqat o‘shanga ko‘rinadi.' }
  ],
  tasks: {
    'js-modules-1': {
      title: 'Nomlangan import',
      description: '`./math.js` dan `add` ni import qiling, 7 va 5 ni qo‘shing va natijani konsolga chiqaring.',
      hints: ['import { add } from "./math.js";'],
      solution: { js: 'import { add } from "./math.js";\n\nconsole.log(add(7, 5));' },
      checks: [
        { label: 'import buyrug‘i bor' },
        { label: './math.js dan add import qilinmoqda' },
        { label: 'Konsolda 12' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-modules-2': {
      title: 'Standart import',
      description: '`./math.js` dan standart funksiyani `square` nomi bilan import qiling va `#output` ga `9 ning kvadrati: 81` satrini chiqaring.',
      hints: ['import square from "./math.js"; — nomni o‘zingiz tanlaysiz.'],
      solution: { js: 'import square from "./math.js";\n\ndocument.querySelector("#output").textContent = `9 ning kvadrati: ${square(9)}`;' },
      checks: [
        { label: 'Standart import figurali qavslarsiz' },
        { label: 'Natija sahifaga chiqarildi', equals: '9 ning kvadrati: 81' },
        { label: '81 soni hisoblangan, yozilmagan' },
        { label: 'Xatolik yo‘q' }
      ]
    },
    'js-modules-3': {
      title: 'Butun modulni import qilish',
      description: '`./math.js` ni butunligicha `math` sifatida import qiling va konsolga uchta qiymatni chiqaring: `math.PI`, `math.add(2, 3)` va `math.multiply(4, 5)`.',
      hints: ['import * as math from "./math.js";'],
      solution: { js: 'import * as math from "./math.js";\n\nconsole.log(math.PI);\nconsole.log(math.add(2, 3));\nconsole.log(math.multiply(4, 5));' },
      checks: [
        { label: 'import * as ishlatilgan' },
        { label: '3.14 chiqarilgan' },
        { label: '5 chiqarilgan' },
        { label: '20 chiqarilgan' },
        { label: 'Nuqta orqali murojaat' }
      ]
    },
    'js-modules-4': {
      title: 'Ikkita modul birga',
      description: '`./cart.js` dan `items` va `total` ni, `./format.js` dan `money` ni oling va `#output` ga `Jami: 126 000 so‘m` ko‘rinishidagi satrni chiqaring.',
      hints: [
        'Turli fayllardan importlar alohida qatorlarda yoziladi.',
        'money(total(items)) allaqachon formatlangan satrni qaytaradi.'
      ],
      solution: { js: 'import { items, total } from "./cart.js";\nimport { money } from "./format.js";\n\ndocument.querySelector("#output").textContent = `Jami: ${money(total(items))}`;' },
      checks: [
        { label: './cart.js dan import' },
        { label: './format.js dan import' },
        { label: 'Satr to‘g‘ri yig‘ilgan', equals: 'Jami: 126 000 so‘m' },
        { label: 'Summa total funksiyasi bilan hisoblangan' },
        { label: 'Son qo‘lda yozilmagan' }
      ]
    },
    'js-modules-5': {
      title: 'Challenge: modullardan yig‘ish',
      description: 'Savat jadvalini yig‘ing: ma’lumotlarni `./cart.js` dan, formatlashni `./format.js` dan (`money`, `upper`) import qiling. Har bir pozitsiya uchun nomi bosh harflarda va qator qiymati ko‘rsatilgan `<li>` yarating, `#output` ga esa `Jami: 126 000 so‘m` ni chiqaring. Kamida bir marta importda nomni o‘zgartirishdan foydalaning.',
      hints: [
        'import { money as formatMoney, upper } from "./format.js";',
        'Pozitsiya qiymati: item.price * item.quantity.'
      ],
      starter: {
        html: '<h2>Savat</h2>\n<ul id="cart"></ul>\n<p id="output"></p>\n',
        js: '// savatni modullardan yig‘ing\n'
      },
      solution: { js: 'import { items, total } from "./cart.js";\nimport { money as formatMoney, upper } from "./format.js";\n\nconst list = document.querySelector("#cart");\n\nitems.forEach((item) => {\n  const row = document.createElement("li");\n  row.textContent = `${upper(item.title)} — ${formatMoney(item.price * item.quantity)}`;\n  list.append(row);\n});\n\ndocument.querySelector("#output").textContent = `Jami: ${formatMoney(total(items))}`;' },
      checks: [
        { label: 'Importda nom o‘zgartirish bor' },
        { label: 'Ikkita pozitsiya yaratildi' },
        {
          label: 'Nomlar bosh harflarda',
          fn: "const texts = ctx.$$('#cart li').map((item) => ctx.text(item.textContent)); if (!texts.length) return 'Ro‘yxat bo‘sh'; return texts.every((text) => /KOFE|SUT/.test(text)) || 'Olindi: ' + JSON.stringify(texts);"
        },
        {
          label: 'Qatorlarda xonalari bo‘shliq bilan ajratilgan qiymat bor',
          fn: "const texts = ctx.$$('#cart li').map((item) => ctx.text(item.textContent)); return texts.every((text) => /\\d\\s\\d{3}\\s*so‘m/.test(text)) || 'Olindi: ' + JSON.stringify(texts);"
        },
        { label: 'Yakun to‘g‘ri hisoblangan', equals: 'Jami: 126 000 so‘m' },
        { label: 'upper funksiyasi ishlatilgan' },
        { label: 'Xatolik yo‘q' }
      ]
    }
  }
};

export const javascriptLessons = {
  'js-intro': lesson19,
  'js-variables': lesson20,
  'js-operators': lesson21,
  'js-conditions': lesson22,
  'js-loops': lesson23,
  'js-functions': lesson24,
  'js-arrays': lesson25,
  'js-objects': lesson26,
  'js-dom': lesson27,
  'js-events': lesson28,
  'js-forms': lesson29,
  'js-localstorage': lesson30,
  'js-fetch': lesson31,
  'js-async': lesson32,
  'js-modules': lesson33
};
