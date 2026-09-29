/* A3. JavaScriptda o'zgaruvchilar, operatorlar va funksiyalar bilan ishlash. */
export default {
  id: 'a3',
  number: 3,
  title: 'JavaScriptda o‘zgaruvchilar, operatorlar va funksiyalar bilan ishlash',
  summary: '«Talaba reytingi kalkulyatori»ni bosqichma-bosqich yozib, JavaScript asoslarini mustahkamlaymiz.',
  lectures: ['m5'],
  lessons: ['js-intro', 'js-variables', 'js-operators', 'js-conditions', 'js-loops', 'js-functions', 'js-arrays', 'js-objects'],
  goal: 'JavaScriptda o‘zgaruvchilar, ma’lumot turlari, operatorlar, shartlar, sikllar va funksiyalardan foydalanib, amaliy hisob-kitob masalalarini yechish ko‘nikmasini hosil qilish.',
  outcomes: [
    '`let` va `const` ni o‘rinli tanlaydi, ma’lumot turlarini aniqlaydi;',
    'arifmetik, taqqoslash va mantiqiy operatorlarni to‘g‘ri qo‘llaydi;',
    'shart va sikl operatorlari bilan algoritm yozadi;',
    'parametrli, qiymat qaytaruvchi va strelkali funksiyalar yaratadi;',
    'massiv va obyektlar ustida `map`, `filter`, `reduce` bilan ishlaydi.'
  ],
  tools: [
    'Brauzer konsoli (F12 → Console) yoki kurs platformasidagi «Erkin playground» (har bir misoldagi «Sinab ko‘rish» tugmasi).',
    'VS Code va Node.js (ixtiyoriy): `node fayl.js` bilan ishga tushirish.'
  ],
  theory: [
    { table: { head: ['Mavzu', 'Eslatma'], rows: [
      ['O‘zgaruvchilar', '`const` — o‘zgarmas havola, `let` — o‘zgaruvchan. `var` ishlatilmaydi.'],
      ['Turlar', '`number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol`, `object`. Tekshirish: `typeof`.'],
      ['Taqqoslash', 'Faqat `===` va `!==`.'],
      ['Shablon satr', '`` `Ism: ${name}, ball: ${score}` ``'],
      ['Funksiya', '`function f(a, b = 1) { return a + b; }` yoki `const f = (a, b = 1) => a + b;`']
    ] } },
    { tip: 'Natijani ko‘rish uchun `console.log()` dan foydalaning. Bir nechta qiymatni vergul bilan berish mumkin: `console.log(\'Ball:\', score)`.' }
  ],
  steps: [
    {
      title: 'O‘zgaruvchilar va ma’lumot turlari',
      blocks: [
        'Talaba haqidagi ma’lumotlarni o‘zgaruvchilarga yozing va har birining turini konsolga chiqaring.',
        { code: "const fullName = 'Aliyev Vali';\nconst group = 'DI-22';\nlet course = 3;\nconst isContract = true;\nlet scholarship = null;\n\nconsole.log(fullName, typeof fullName);\nconsole.log(course, typeof course);\nconsole.log(isContract, typeof isContract);\nconsole.log(scholarship, typeof scholarship); // null — tarixiy xato: 'object'\n\ncourse = course + 1;       // let — qayta tayinlash mumkin\nconsole.log(`${fullName} (${group}) endi ${course}-kursda`);", lang: 'js', run: true },
        { tip: '`fullName` ni qayta tayinlab ko‘ring (`fullName = \'X\'`) — konsolda qanday xato chiqadi?' }
      ]
    },
    {
      title: 'Operatorlar: reyting ballini hisoblash',
      blocks: [
        'Fan bo‘yicha yakuniy ball: joriy nazorat (40%), oraliq (20%) va yakuniy nazorat (40%). Arifmetik operatorlar bilan hisoblang.',
        { code: "const current = 85;   // joriy nazorat\nconst midterm = 70;   // oraliq nazorat\nconst final = 90;     // yakuniy nazorat\n\nconst total = current * 0.4 + midterm * 0.2 + final * 0.4;\nconsole.log('Yakuniy ball:', total);\nconsole.log('Yaxlitlangan:', Math.round(total));\nconsole.log('Qoldiq (total % 10):', total % 10);\n\nconst passed = total >= 55 && final >= 30;\nconsole.log('Fandan o‘tdimi?', passed);\n\nconst attendance = 0.82;\nconst hasDebt = false;\nconsole.log('Imtihonga ruxsat:', attendance >= 0.75 && !hasDebt);\n\n// Ustuvorlik: && avval bajariladi\nconsole.log(true || false && false);   // true\nconsole.log((true || false) && false); // false", lang: 'js', run: true },
        'Oxirgi ikki qatorda operatorlar ustuvorligiga e’tibor bering: `&&` `||` dan oldin bajariladi. Chalkashmaslik uchun qavslardan foydalaning.'
      ]
    },
    {
      title: 'Shartlar: bahoni aniqlash',
      blocks: [
        'Ballga qarab baho (5, 4, 3, 2) qaytaruvchi funksiya yozing. `if...else if` va ternar operatordan foydalaning.',
        { code: "function gradeOf(score) {\n  if (typeof score !== 'number' || score < 0 || score > 100) return 'noto‘g‘ri ball';\n  if (score >= 86) return 5;\n  if (score >= 71) return 4;\n  if (score >= 55) return 3;\n  return 2;\n}\n\nconsole.log(gradeOf(92), gradeOf(78), gradeOf(60), gradeOf(40), gradeOf(120));\n\nconst score = 71;\nconst label = gradeOf(score) >= 3 ? 'o‘tdi' : 'qayta topshiradi';\nconsole.log(`${score} ball — ${label}`);", lang: 'js', run: true }
      ]
    },
    {
      title: 'Sikllar: guruh statistikasi',
      blocks: [
        'Guruh ballari massivi bo‘yicha `for` va `for...of` sikllari bilan o‘rtacha, maksimal ball va baholar taqsimotini hisoblang.',
        { code: "const scores = [92, 78, 55, 64, 88, 71, 45, 99, 83, 60];\n\nlet sum = 0;\nlet max = -Infinity;\nfor (let i = 0; i < scores.length; i++) {\n  sum += scores[i];\n  if (scores[i] > max) max = scores[i];\n}\nconsole.log('O‘rtacha:', (sum / scores.length).toFixed(1), '| Maksimal:', max);\n\nconst stats = { 5: 0, 4: 0, 3: 0, 2: 0 };\nfor (const s of scores) {\n  if (s >= 86) stats[5]++;\n  else if (s >= 71) stats[4]++;\n  else if (s >= 55) stats[3]++;\n  else stats[2]++;\n}\nconsole.log('Taqsimot:', stats);\n\nlet i = 0;\nwhile (scores[i] >= 55) i++;\nconsole.log('Birinchi o‘tolmagan talaba indeksi:', i);", lang: 'js', run: true }
      ]
    },
    {
      title: 'Funksiyalar: qayta ishlatiladigan kod',
      blocks: [
        'Hisob-kitoblarni kichik funksiyalarga ajrating. Standart parametr qiymati, strelkali funksiya va funksiyani argument sifatida berishni mashq qiling.',
        { code: "const weighted = (current, midterm, final, w = [0.4, 0.2, 0.4]) =>\n  current * w[0] + midterm * w[1] + final * w[2];\n\nfunction round(value, digits = 1) {\n  const factor = 10 ** digits;\n  return Math.round(value * factor) / factor;\n}\n\nfunction applyToAll(list, fn) {           // yuqori tartibli funksiya\n  const result = [];\n  for (const item of list) result.push(fn(item));\n  return result;\n}\n\nconsole.log(round(weighted(85, 70, 90)));\nconsole.log(round(weighted(85, 70, 90, [0.3, 0.3, 0.4]), 2));\nconsole.log(applyToAll([55.44, 71.25, 99.99], (x) => round(x)));", lang: 'js', run: true }
      ]
    },
    {
      title: 'Obyektlar va massiv metodlari',
      blocks: [
        'Talabalarni obyektlar massivi ko‘rinishida saqlang. `map`, `filter`, `reduce`, `sort` bilan reyting jadvalini tuzing.',
        { code: "const students = [\n  { name: 'Aziz', current: 85, midterm: 70, final: 90 },\n  { name: 'Dilnoza', current: 95, midterm: 90, final: 98 },\n  { name: 'Jasur', current: 50, midterm: 40, final: 35 },\n  { name: 'Malika', current: 78, midterm: 82, final: 74 }\n];\n\nconst total = (s) => Math.round(s.current * 0.4 + s.midterm * 0.2 + s.final * 0.4);\n\nconst rating = students\n  .map((s) => ({ name: s.name, total: total(s) }))\n  .sort((a, b) => b.total - a.total);\n\nconsole.table(rating);\n\nconst failed = rating.filter((s) => s.total < 55).map((s) => s.name);\nconst average = rating.reduce((sum, s) => sum + s.total, 0) / rating.length;\n\nconsole.log('Qarzdorlar:', failed.join(', ') || 'yo‘q');\nconsole.log('Guruh o‘rtachasi:', average.toFixed(1));\nconsole.log('Eng yaxshi talaba:', rating[0].name);", lang: 'js', run: true }
      ]
    },
    {
      title: 'Hammasini birlashtirish: kalkulyator moduli',
      blocks: [
        'Oldingi qadamlardagi funksiyalarni bitta `gradebook` obyektiga yig‘ing va hisobot chiqaruvchi `report()` metodini yozing.',
        { code: "const gradebook = {\n  weights: [0.4, 0.2, 0.4],\n  students: [],\n\n  add(name, current, midterm, final) {\n    this.students.push({ name, current, midterm, final });\n    return this;             // zanjir qilib chaqirish uchun\n  },\n\n  total(s) {\n    const [a, b, c] = this.weights;\n    return Math.round(s.current * a + s.midterm * b + s.final * c);\n  },\n\n  grade(score) {\n    return score >= 86 ? 5 : score >= 71 ? 4 : score >= 55 ? 3 : 2;\n  },\n\n  report() {\n    this.students.forEach((s, i) => {\n      const t = this.total(s);\n      console.log(`${i + 1}. ${s.name.padEnd(8)} ${String(t).padStart(3)} ball → ${this.grade(t)}`);\n    });\n  }\n};\n\ngradebook\n  .add('Aziz', 85, 70, 90)\n  .add('Dilnoza', 95, 90, 98)\n  .add('Jasur', 50, 40, 35)\n  .report();", lang: 'js', run: true }
      ]
    }
  ],
  tasks: [
    {
      title: 'Tekshiruvlar qo‘shish',
      level: 'easy',
      blocks: ['`gradebook.add` metodiga tekshiruv qo‘shing: ballar 0–100 oralig‘ida bo‘lmasa, `console.error` bilan xabar chiqarib, talabani qo‘shmasin.']
    },
    {
      title: 'Qo‘shimcha statistika',
      level: 'medium',
      blocks: ['`gradebook` ga `stats()` metodini qo‘shing: o‘rtacha ball, median, eng yuqori va eng past ball, har bir baho bo‘yicha talabalar soni.']
    },
    {
      title: 'Variant bo‘yicha masala',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha masalani funksiyalar yordamida yeching (natijani konsolga chiqaring):',
        { ol: [
          'Kommunal to‘lov kalkulyatori: tarif pog‘onalari bo‘yicha elektr energiyasi narxi.',
          'Kredit kalkulyatori: oylik to‘lov va to‘lov jadvali (annuitet formula).',
          'Valyuta konvertori: kurslar obyekti, ixtiyoriy yo‘nalishda konvertatsiya.',
          'Parol mustahkamligini baholash (uzunlik, raqam, katta harf, belgi).',
          'Do‘kon savatchasi: chegirma kodlari va QQS hisobi.',
          'Tug‘ilgan sanadan yosh, keyingi tug‘ilgan kungacha kunlar soni.',
          'Matn tahlili: so‘zlar soni, eng uzun so‘z, har bir harf chastotasi.',
          'Tub sonlar va Fibonachchi ketma-ketligini chiqaruvchi funksiyalar.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Har bir qadam kodi va konsol natijasi skrinshoti.',
    'Mustaqil topshiriqlar kodi (izohlar bilan).',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['O‘zgaruvchilar va turlar to‘g‘ri ishlatilgan', '1'],
    ['Shart va sikllar bilan algoritmlar to‘g‘ri ishlaydi', '1'],
    ['Funksiyalar qayta ishlatiladigan, parametrli va nomlari tushunarli', '1'],
    ['Massiv metodlari (`map`, `filter`, `reduce`) qo‘llangan', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    '`let`, `const` va `var` ning farqi nimada?',
    '`typeof null` nima qaytaradi va nima uchun?',
    '`0.1 + 0.2 === 0.3` nima uchun `false`?',
    '`&&` va `||` operatorlari qanday qiymat qaytaradi?',
    '`for`, `for...of` va `while` sikllari qachon qulay?',
    'Funksiya e’loni va strelkali funksiya farqi nimada?',
    'Yuqori tartibli funksiya nima? Misol keltiring.',
    '`map` va `forEach` ning farqi nimada?',
    'Obyekt metodida `this` nimani bildiradi?'
  ]
};
