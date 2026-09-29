/* M1. Kirish. Veb tizimlari, ularning turlari va rivojlanish tarixi. */
export default {
  id: 'm1',
  number: 1,
  title: 'Kirish. Veb tizimlari, ularning turlari va rivojlanish tarixi',
  summary: 'Veb tizimi nima, qanday turlari bor va Internet qanday qilib bugungi vebgacha rivojlandi.',
  literature: [1],
  goals: [
    'Fanning maqsadi, tuzilishi va baholash tartibi bilan tanishish.',
    '«Veb tizimi», «veb-sayt», «veb-ilova» tushunchalarini farqlashni o‘rganish.',
    'Veb tizimlarining asosiy turlarini va ularning qo‘llanish sohalarini bilish.',
    'Internet va Butunjahon o‘rgimchak to‘rining (WWW) rivojlanish bosqichlarini tushunish.'
  ],
  keywords: [
    'Internet', 'WWW', 'veb-sayt', 'veb-ilova', 'veb tizimi', 'klient', 'server',
    'brauzer', 'statik sayt', 'dinamik sayt', 'SPA', 'Web 1.0', 'Web 2.0', 'Web 3.0'
  ],
  practicals: ['a1'],
  lessons: ['web-and-html'],
  sections: [
    {
      title: 'Fan haqida umumiy ma’lumot',
      blocks: [
        { lead: '«Web tizimlari» fani zamonaviy veb-ilovalarni loyihalash, yaratish va joylashtirish bo‘yicha nazariy bilim va amaliy ko‘nikmalarni shakllantiradi.' },
        'Fan davomida biz brauzerda ishlaydigan qism (front-end) bilan ham, serverda ishlaydigan qism (back-end) bilan ham tanishamiz. Ma’ruzalar tizimni «yuqoridan pastga» ochib beradi: avval veb qanday ishlashini, keyin sahifa qanday quriladi, so‘ngra server, ma’lumotlar bazasi, xavfsizlik va joylashtirish masalalarini ko‘ramiz.',
        { table: { head: ['Blok', 'Mavzular', 'Nima o‘rganiladi'], rows: [
          ['Asoslar', 'M1–M2', 'Veb tizimlari, HTTP, URL, DNS'],
          ['Front-end', 'M3–M8', 'HTML5, CSS3, JavaScript, DOM, AJAX, freymvorklar'],
          ['Back-end', 'M9–M13', 'Server tomoni, ma’lumotlar bazalari, back-end freymvorklar, REST API'],
          ['Xavfsizlik va ekspluatatsiya', 'M14–M18', 'XSS/CSRF/SQLi, autentifikatsiya, CMS, deployment, arxitekturalar']
        ] } },
        { note: 'Kurs ikki yo‘nalishdan iborat: **Dars mashg‘ulotlari** (ushbu ma’ruzalar va amaliy ishlar) va **Mustaqil ta’lim** (brauzerda avtomatik tekshiriladigan interaktiv darslar). Har bir ma’ruza oxirida mustaqil ta’limdagi tegishli darslarga havola berilgan.' }
      ]
    },
    {
      title: 'Veb tizimi tushunchasi',
      blocks: [
        '**Veb tizimi** — foydalanuvchi bilan brauzer orqali, HTTP protokoli yordamida o‘zaro ta’sirlashadigan dasturiy tizim. Uning tarkibiga klient qismi, server qismi, ma’lumotlar ombori va ularni bog‘lovchi tarmoq infratuzilmasi kiradi.',
        'Kundalik nutqda «sayt», «portal», «ilova» so‘zlari aralash ishlatiladi. Ularni quyidagicha farqlash qulay:',
        { table: { head: ['Tushuncha', 'Ta’rif', 'Misol'], rows: [
          ['Veb-sahifa', 'Bitta URL manzil orqali ochiladigan hujjat (HTML).', 'Universitet saytidagi «Aloqa» sahifasi'],
          ['Veb-sayt', 'Bir domen ostidagi o‘zaro bog‘langan sahifalar to‘plami. Asosan ma’lumot beradi.', 'Tashkilotning rasmiy sayti'],
          ['Veb-ilova', 'Foydalanuvchi ma’lumot kiritadigan, natija oladigan, holatga ega dastur.', 'Internet-bank, elektron kundalik, Google Docs'],
          ['Veb tizimi', 'Veb-ilova va uni ta’minlovchi server, baza, integratsiyalar majmuasi.', 'Universitetning HEMIS tizimi']
        ] } },
        { h: 'Klient–server modeli' },
        'Deyarli barcha veb tizimlari **klient–server** modeliga asoslanadi. Klient (odatda brauzer) so‘rov yuboradi, server uni qayta ishlab javob qaytaradi. Klient va server turli kompyuterlarda, hatto turli qit’alarda joylashishi mumkin — ularni faqat tarmoq va umumiy protokol (HTTP) bog‘laydi.',
        { code: 'Foydalanuvchi ──> Brauzer (klient)\n                    │  HTTP so‘rov:  GET /news\n                    ▼\n               Veb-server  ──>  Ilova (PHP / Python / Node.js)\n                    ▲                    │\n                    │                    ▼\n                    │            Ma’lumotlar bazasi\n                    │  HTTP javob: 200 OK + HTML\n               Brauzer sahifani chizadi', lang: 'text', title: 'Sxema' },
        { h: 'Veb tizimining uch qatlami' },
        { ol: [
          '**Taqdimot qatlami (front-end)** — foydalanuvchi ko‘radigan interfeys: HTML, CSS, JavaScript.',
          '**Biznes-mantiq qatlami (back-end)** — qoidalar, hisob-kitoblar, huquqlarni tekshirish: PHP, Python, Node.js, Java, C#.',
          '**Ma’lumotlar qatlami** — ma’lumotlarni saqlash: MySQL, PostgreSQL, MongoDB, Redis.'
        ] },
        { tip: 'Qatlamlarga ajratish har bir qismni alohida o‘zgartirish imkonini beradi: masalan, dizaynni to‘liq yangilash server kodiga tegmasdan amalga oshirilishi mumkin.' }
      ]
    },
    {
      title: 'Veb tizimlarining turlari',
      blocks: [
        'Veb tizimlarini bir necha mezon bo‘yicha tasniflash mumkin.',
        { h: 'Kontentning hosil bo‘lishiga ko‘ra' },
        { ul: [
          '**Statik saytlar** — sahifalar oldindan tayyorlangan HTML fayllar ko‘rinishida saqlanadi va hamma foydalanuvchiga bir xil ko‘rinadi. Tez, arzon, xavfsiz; lekin har bir o‘zgartirish uchun faylni tahrirlash kerak.',
          '**Dinamik saytlar** — sahifa har bir so‘rovda server tomonidan (ko‘pincha bazadagi ma’lumotdan) yaratiladi. Masalan, yangiliklar ro‘yxati bazadan olinadi.',
          '**Bir sahifali ilovalar (SPA)** — brauzer bitta HTML sahifani yuklaydi, keyingi o‘zgarishlarni JavaScript amalga oshiradi va serverdan faqat ma’lumot (JSON) so‘raydi. Gmail, Trello, ushbu kurs platformasi — SPA ga misol.'
        ] },
        { h: 'Vazifasiga ko‘ra' },
        { table: { head: ['Turi', 'Vazifasi', 'Misollar'], rows: [
          ['Korporativ sayt', 'Tashkilot haqida ma’lumot', 'Universitet, kompaniya sayti'],
          ['Elektron tijorat', 'Tovar va xizmatlarni sotish', 'Uzum Market, Amazon'],
          ['Ijtimoiy tarmoq', 'Foydalanuvchilar muloqoti va kontent almashinuvi', 'Telegram Web, Instagram'],
          ['Ta’lim tizimi (LMS)', 'O‘quv jarayonini boshqarish', 'Moodle, HEMIS, Google Classroom'],
          ['Elektron hukumat', 'Davlat xizmatlarini ko‘rsatish', 'my.gov.uz'],
          ['Korporativ tizim (ERP/CRM)', 'Ichki biznes-jarayonlarni avtomatlashtirish', '1C, Bitrix24'],
          ['Veb-servis / API', 'Boshqa dasturlarga ma’lumot berish', 'To‘lov tizimlari API si, ob-havo API si']
        ] } },
        { h: 'Foydalanuvchilar doirasiga ko‘ra' },
        { ul: [
          '**Ochiq (Internet)** — hamma uchun ochiq tizimlar.',
          '**Intranet** — faqat tashkilot ichki tarmog‘ida ishlaydi.',
          '**Ekstranet** — tashkilot va uning hamkorlari uchun cheklangan kirish.'
        ] }
      ]
    },
    {
      title: 'Internet va vebning rivojlanish tarixi',
      blocks: [
        '**Internet** va **veb** — bir xil narsa emas. Internet — bu kompyuter tarmoqlarining global tarmog‘i (infratuzilma). Veb (WWW) esa shu tarmoq ustida ishlaydigan xizmatlardan biri — gipermatnli hujjatlar tizimi. Elektron pochta, fayl almashish, onlayn o‘yinlar ham Internetdan foydalanadi, ammo ular veb emas.',
        { table: { head: ['Yil', 'Voqea'], rows: [
          ['1969', 'ARPANET — AQSh Mudofaa vazirligining tajriba tarmog‘i, Internetning salafi.'],
          ['1974', 'Vinton Serf va Robert Kan TCP/IP protokollari g‘oyasini e’lon qildi.'],
          ['1983', 'ARPANET TCP/IP ga o‘tdi — Internetning «tug‘ilgan kuni» deb hisoblanadi. DNS ishlab chiqildi.'],
          ['1989', 'Tim Berners-Li (CERN) gipermatnli axborot tizimi — WWW g‘oyasini taklif qildi.'],
          ['1991', 'Birinchi veb-sayt info.cern.ch ishga tushdi. HTML, HTTP va URL ning dastlabki versiyalari.'],
          ['1993', 'Mosaic — rasmlarni matn bilan birga ko‘rsatgan birinchi ommabop brauzer.'],
          ['1994', 'W3C (World Wide Web Consortium) tashkil topdi; Netscape Navigator.'],
          ['1995', 'JavaScript, PHP va Java paydo bo‘ldi; Amazon va eBay ishga tushdi.'],
          ['1996', 'CSS ning birinchi spetsifikatsiyasi.'],
          ['2004–2005', '«Web 2.0» atamasi; AJAX, Gmail va Google Maps.'],
          ['2008', 'Google Chrome va tezkor V8 JavaScript dvigateli.'],
          ['2009', 'Node.js — JavaScript serverda.'],
          ['2014', 'HTML5 W3C tavsiyasi sifatida yakunlandi.'],
          ['2015+', 'ES6 (ES2015), React/Vue/Angular, bulutli hisoblash, mikroservislar, serverless.']
        ] } },
        { h: 'Web 1.0, Web 2.0 va Web 3.0' },
        { table: { head: ['Bosqich', 'Xususiyati', 'Foydalanuvchi roli'], rows: [
          ['Web 1.0 (≈1991–2004)', 'Statik sahifalar, «faqat o‘qish uchun» veb', 'Iste’molchi'],
          ['Web 2.0 (≈2004–hozir)', 'Dinamik, interaktiv ilovalar, ijtimoiy tarmoqlar, foydalanuvchi kontenti', 'Iste’molchi va muallif'],
          ['Web 3.0 (rivojlanmoqda)', 'Semantik veb, sun’iy intellekt, markazlashmagan (blokcheyn) ilovalar', 'Ma’lumot egasi, ishtirokchi']
        ] } },
        { note: 'Birinchi veb-sayt hanuzgacha ishlaydi: [info.cern.ch](https://info.cern.ch). Uni ochib, bugungi saytlar bilan solishtirib ko‘ring.' }
      ]
    },
    {
      title: 'Veb tizimining asosiy tarkibiy qismlari',
      blocks: [
        { terms: [
          ['Brauzer', 'HTML, CSS va JavaScript ni qabul qilib, sahifani chizadigan va foydalanuvchi harakatlarini qayta ishlaydigan klient dasturi (Chrome, Firefox, Safari, Edge).'],
          ['Veb-server', 'HTTP so‘rovlarni qabul qilib, javob qaytaradigan dastur (Nginx, Apache, IIS).'],
          ['Ilova serveri', 'Biznes-mantiq bajariladigan muhit (PHP-FPM, Node.js, Gunicorn).'],
          ['Ma’lumotlar bazasi', 'Tizim ma’lumotlarini tartibli saqlaydigan dasturiy ta’minot (MySQL, PostgreSQL, MongoDB).'],
          ['DNS', 'Domen nomini (masalan, `ubs.uz`) IP-manzilga aylantiruvchi xizmat.'],
          ['Hosting / bulut', 'Server dasturlari ishlaydigan jismoniy yoki virtual kompyuterlar.']
        ] },
        { h: 'Sahifa ochilganda nima sodir bo‘ladi (qisqacha)' },
        { ol: [
          'Foydalanuvchi manzil satriga URL yozadi.',
          'Brauzer DNS orqali domenning IP-manzilini aniqlaydi.',
          'Server bilan TCP (va HTTPS bo‘lsa — TLS) ulanish o‘rnatiladi.',
          'Brauzer HTTP so‘rov yuboradi, server HTML qaytaradi.',
          'Brauzer HTML ni tahlil qilib DOM daraxtini quradi, CSS va JS fayllarini qo‘shimcha yuklaydi.',
          'Sahifa ekranda chiziladi va JavaScript uni «jonlantiradi».'
        ] },
        'Bu jarayonning har bir bosqichi keyingi ma’ruzalarda batafsil ko‘rib chiqiladi: DNS va HTTP — M2 da, HTML — M3 da, CSS — M4 da, JavaScript — M5–M7 da.',
        { h: 'Eng oddiy veb-sahifa' },
        'Quyidagi kod — to‘liq ishlaydigan veb-sahifa. «Sinab ko‘rish» tugmasini bosib, uni playgroundda o‘zgartirib ko‘ring.',
        { code: '<!doctype html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening birinchi sahifam</title>\n</head>\n<body>\n  <h1>Salom, veb!</h1>\n  <p>Bu sahifani brauzer HTML dan chizdi.</p>\n</body>\n</html>', lang: 'html', run: true }
      ]
    },
    {
      title: 'Veb-dasturchi kasbi va texnologiyalar steki',
      blocks: [
        'Veb tizimlarini yaratishda odatda bir nechta mutaxassis ishtirok etadi:',
        { ul: [
          '**Front-end dasturchi** — interfeysni yaratadi: HTML, CSS, JavaScript, React/Vue/Angular.',
          '**Back-end dasturchi** — server mantig‘i, API, ma’lumotlar bazasi: PHP/Laravel, Python/Django, Node.js/Express.',
          '**Full-stack dasturchi** — ikkala tomonni ham biladi.',
          '**UI/UX dizayner** — interfeys ko‘rinishi va foydalanish qulayligi.',
          '**DevOps muhandisi** — serverlar, joylashtirish, monitoring, masshtablash.',
          '**QA muhandisi** — tizimni sinash.'
        ] },
        { h: 'Mashhur texnologik steklar' },
        { table: { head: ['Stek', 'Tarkibi'], rows: [
          ['LAMP', 'Linux + Apache + MySQL + PHP'],
          ['MERN', 'MongoDB + Express + React + Node.js'],
          ['MEVN', 'MongoDB + Express + Vue + Node.js'],
          ['Django stek', 'Python + Django + PostgreSQL'],
          ['JAMstack', 'JavaScript + API + tayyor (statik) Markup']
        ] } }
      ]
    }
  ],
  conclusion: [
    'Veb tizimi — klient–server modeliga asoslangan, brauzer orqali HTTP yordamida ishlaydigan dasturiy tizim. U taqdimot, biznes-mantiq va ma’lumotlar qatlamlaridan tashkil topadi.',
    'Veb tizimlari kontentning hosil bo‘lishi (statik, dinamik, SPA), vazifasi va foydalanuvchilar doirasiga ko‘ra tasniflanadi. Veb 1991-yilda statik hujjatlar tizimi sifatida paydo bo‘lib, bugun murakkab taqsimlangan ilovalar platformasiga aylandi.'
  ],
  glossary: [
    ['Internet', 'Kompyuter tarmoqlarining TCP/IP asosida birlashgan global tarmog‘i.'],
    ['WWW (veb)', 'Internet ustida ishlaydigan, gipermatnli havolalar bilan bog‘langan hujjatlar tizimi.'],
    ['Klient', 'Xizmat so‘raydigan dastur (odatda brauzer).'],
    ['Server', 'So‘rovlarni qabul qilib, javob qaytaradigan dastur yoki kompyuter.'],
    ['Statik sayt', 'Sahifalari oldindan tayyor fayllar ko‘rinishida saqlanadigan sayt.'],
    ['Dinamik sayt', 'Sahifalari har bir so‘rovda server tomonidan yaratiladigan sayt.'],
    ['SPA', 'Single Page Application — bitta sahifada ishlaydigan, kontentni JavaScript bilan almashtiradigan ilova.'],
    ['W3C', 'Veb standartlarini ishlab chiquvchi xalqaro konsorsium.']
  ],
  questions: [
    'Internet va WWW o‘rtasida qanday farq bor?',
    'Veb-sayt va veb-ilovaning farqini misollar bilan tushuntiring.',
    'Klient–server modelida klient va serverning vazifalari nimadan iborat?',
    'Veb tizimining uch qatlamini sanab bering va har biriga texnologiya misolini keltiring.',
    'Statik sayt, dinamik sayt va SPA ning afzallik va kamchiliklari qanday?',
    'Vazifasiga ko‘ra veb tizimlarining qanday turlarini bilasiz?',
    'Tim Berners-Li vebning qaysi uch asosiy texnologiyasini yaratgan?',
    'Web 1.0, Web 2.0 va Web 3.0 bosqichlarining asosiy farqi nimada?',
    'Brauzerda sahifa ochilganda qanday bosqichlar bajariladi?',
    'LAMP va MERN steklari tarkibini ayting.'
  ]
};
