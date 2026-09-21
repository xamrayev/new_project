/* HTML moduli (1–9-darslar) — o'zbekcha matnlar. */

const lesson01 = {
  title: 'Veb va HTML',
  summary: 'Veb qanday ishlaydi va birinchi sahifa nimalardan iborat.',
  theory: [
    { lead: 'HTML — belgilash tili. U xatti-harakatni dasturlamaydi, balki sahifa qanday qismlardan iboratligini tasvirlaydi.' },
    { h: 'Saytni ochganingizda nima sodir bo‘ladi' },
    { ol: [
      'Brauzer manzil (URL) bo‘yicha serverga so‘rov yuboradi.',
      'Server matn bilan javob beradi — bu HTML-hujjat.',
      'Brauzer HTML ni tahlil qilib, undan DOM — elementlar daraxtini quradi.',
      'DOM ekranda chiziladi; CSS ko‘rinishni, JavaScript xatti-harakatni belgilaydi.'
    ] },
    { h: 'Teg, element, tarkib' },
    { code: '<h1>Salom, dunyo!</h1>\n  ↑        ↑         ↑\nochuvchi     matn   yopuvchi\n   teg                teg' },
    { p: 'Teglar juftligi tarkibi bilan birga — bu **element**. Ko‘pchilik elementlar juft, ammo yakka teglar ham bor: `<br>`, `<img>`, `<hr>`.' },
    { h: 'Birinchi teglar' },
    { table: { head: ['Teg', 'Nima uchun'], rows: [
      ['`<h1>`…`<h6>`', 'Sarlavhalar: eng muhimidan eng maydasigacha'],
      ['`<p>`', 'Matn paragrafi'],
      ['`<!-- -->`', 'Izoh — brauzer uni ko‘rsatmaydi']
    ] } },
    { note: 'O‘ng tomonda — playground. Chapda kod yozing, natija darhol paydo bo‘ladi. «Tekshirish» tugmasi topshiriq avtotestlarini ishga tushiradi.' }
  ],
  tasks: {
    'web-and-html-1': {
      title: 'Birinchi sarlavha',
      description: 'Matni `Salom, dunyo!` bo‘lgan birinchi darajali sarlavha yarating.',
      hints: [
        'Birinchi darajali sarlavha — bu <h1> tegi.',
        'Yopuvchi tegni unutmang: </h1>.'
      ],
      starter: { html: '<!-- kodni shu yerga yozing -->\n' },
      solution: { html: '<h1>Salom, dunyo!</h1>' },
      checks: [
        { label: 'Sahifada <h1> bor' },
        { label: 'Sarlavha matni — «Salom, dunyo!»', equals: 'Salom, dunyo!' }
      ]
    },
    'web-and-html-2': {
      title: 'Sarlavha va paragraf',
      description: 'Sarlavhani qoldiring va uning ostiga kamida 10 ta belgidan iborat `<p>` paragrafini qo‘shing.',
      hints: ['Paragraf — bu <p>matn</p>.'],
      starter: { html: '<h1>Salom, dunyo!</h1>\n' },
      solution: { html: '<h1>Salom, dunyo!</h1>\n<p>Bu mening HTML dagi birinchi sahifam.</p>' },
      checks: [
        { label: '<h1> sarlavhasi joyida' },
        { label: '<p> paragrafi paydo bo‘ldi' },
        { label: 'Paragrafda kamida 10 ta belgi bor' }
      ]
    },
    'web-and-html-3': {
      title: 'Uch daraja sarlavha',
      description: 'Ierarxiya tuzing: `<h1>`, uning ostida `<h2>`, undan keyin `<h3>`. Har bir sarlavhadan keyin — paragraf.',
      hints: ['Sarlavha darajalari — h1, h2, h3.', 'Har bir paragraf — alohida <p> tegi.'],
      starter: { html: '<h1>Mening blogim</h1>\n' },
      solution: {
        html: '<h1>Mening blogim</h1>\n<p>Bu yerda men veb haqida yozaman.</p>\n<h2>Bo‘lim: HTML</h2>\n<p>Sahifalarni belgilash.</p>\n<h3>Kichik bo‘lim: teglar</h3>\n<p>Teglar tuzilmani tasvirlaydi.</p>'
      },
      checks: [
        { label: '<h1> bor' },
        { label: '<h2> bor' },
        { label: '<h3> bor' },
        { label: 'Paragraflar — kamida 3 ta' }
      ]
    },
    'web-and-html-4': {
      title: 'Tashrif qog‘ozi',
      description: 'Tashrif qog‘ozi yarating: ism `<h1>` ichida, kasb va shahar — ikkita alohida paragrafda. Tushuntiruvchi HTML-izoh qo‘shing.',
      hints: ['Izoh shunday yoziladi: <!-- matn -->.'],
      starter: { html: '<!-- kodni shu yerga yozing -->\n' },
      solution: { html: '<!-- tashrif qog‘ozi -->\n<h1>Aziza Karimova</h1>\n<p>Frontend dasturchi</p>\n<p>Toshkent</p>' },
      checks: [
        { label: 'Ism <h1> ichida' },
        { label: 'Ikkita paragraf' },
        { label: 'Kodda izoh bor' }
      ]
    },
    'web-and-html-5': {
      title: 'Challenge: «Men haqimda» sahifasi',
      description: 'Kichik sahifa yig‘ing: `<h1>` sarlavhasi, `<h2>` kichik sarlavhasi va kamida uchta paragraf. Umumiy matn hajmi — kamida 120 ta belgi.',
      hints: [
        'Tuzilishi: h1 → p → h2 → p → p.',
        'Tekshiruv sahifadagi butun ko‘rinadigan matnni hisoblaydi.'
      ],
      starter: { html: '<!-- kodni shu yerga yozing -->\n' },
      solution: {
        html: '<h1>Men haqimda</h1>\n<p>Mening ismim Aziza, men veb-dasturlashni o‘rganyapman va har kuni kod yozaman.</p>\n<h2>Nima bilan shug‘ullanaman</h2>\n<p>Sahifalarni verstka qilaman, HTML va CSS ni o‘rganaman, kichik loyihalar qilaman.</p>\n<p>Rejamda JavaScript va haqiqiy API bilan ishlash bor.</p>'
      },
      checks: [
        { label: 'Matnli <h1> bor' },
        { label: 'Matnli <h2> bor' },
        { label: 'Paragraflar — kamida 3 ta' },
        { label: 'Matn kamida 120 ta belgi' }
      ]
    }
  }
};

const lesson02 = {
  title: 'HTML-hujjat',
  summary: 'Sahifa skeleti: doctype, html, head, body va metama’lumotlar.',
  theory: [
    { lead: 'Haqiqiy sahifa — shunchaki teglar to‘plami emas, balki qat’iy tuzilmaga ega hujjat.' },
    { code: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Yorliq nomi</title>\n</head>\n<body>\n  <h1>Ko‘rinadigan tarkib</h1>\n</body>\n</html>' },
    { h: 'Nima nimaga javob beradi' },
    { table: { head: ['Qism', 'Vazifasi'], rows: [
      ['`<!DOCTYPE html>`', 'Brauzerga aytadi: bu zamonaviy HTML5'],
      ['`<html lang="uz">`', 'Ildiz element, `lang` — tarkib tili'],
      ['`<head>`', 'Xizmat ma’lumotlari: kodlash, yorliq sarlavhasi, tavsif'],
      ['`<meta charset="utf-8">`', 'Kodlash, usiz harflar «krakozyabra» ga aylanadi'],
      ['`<title>`', 'Brauzer yorlig‘idagi va qidiruv natijalaridagi matn'],
      ['`<body>`', 'Foydalanuvchi ko‘radigan hamma narsa']
    ] } },
    { note: 'Bu darsda hujjatni to‘liq yozing — playground to‘liq hujjatni ham, bo‘lakni ham ishga tushira oladi.' }
  ],
  tasks: {
    'html-document-1': {
      title: 'Yorliq sarlavhasi',
      description: '`<head>` ichiga matni `Mening sahifam` bo‘lgan `<title>` tegini qo‘shing.',
      hints: ['<head> ichida <title>Mening sahifam</title>.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening sahifam</title>\n</head>\n<body>\n\n</body>\n</html>' },
      checks: [
        { label: 'Hujjatda <title> bor' },
        {
          label: 'Yorliq sarlavhasi — «Mening sahifam»',
          fn: "return ctx.doc.title.trim() === 'Mening sahifam' || 'document.title = ' + JSON.stringify(ctx.doc.title);"
        }
      ]
    },
    'html-document-2': {
      title: 'Sahifa tavsifi',
      description: '`<meta name="description" content="...">` qo‘shing — sahifaning qisqa tavsifi (kamida 20 ta belgi).',
      hints: ['Yakka teg: <meta name="description" content="matn">.'],
      starter: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Salom!</h1>\n</body>\n</html>\n' },
      solution: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening sahifam</title>\n  <meta name="description" content="HTML-hujjat tuzilishi haqidagi o‘quv sahifasi">\n</head>\n<body>\n  <h1>Salom!</h1>\n</body>\n</html>' },
      checks: [
        { label: 'name="description" bo‘lgan meta bor' },
        { label: 'Tavsif kamida 20 ta belgi' }
      ]
    },
    'html-document-3': {
      title: 'To‘liq hujjat',
      description: 'Hujjatni noldan yig‘ing: doctype, `lang="uz"`, kodlash, viewport, title va tanada `<h1>`.',
      hints: [
        'viewport: <meta name="viewport" content="width=device-width, initial-scale=1">',
        'Tartib: doctype → html → head → body.'
      ],
      solution: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Hujjat tuzilishi</title>\n</head>\n<body>\n  <h1>Hujjat to‘g‘ri yig‘ildi</h1>\n</body>\n</html>' },
      checks: [
        { label: '<!DOCTYPE html> ko‘rsatilgan' },
        { label: '<html> da lang="uz" bor', matches: '<html[^>]*lang=["\\\']uz' },
        { label: 'meta charset bor' },
        { label: 'meta viewport bor' },
        { label: 'Yorliq sarlavhasi to‘ldirilgan' },
        { label: '<body> ichida <h1> bor' }
      ]
    },
    'html-document-4': {
      title: 'Head va body ni chalkashtirmaymiz',
      description: 'Quyidagi hujjatda tarkib chalkashib ketgan: ko‘rinadigan matn `<head>` ichida, `<title>` esa `<body>` ichida qolgan. Tartibga soling.',
      hints: ['<head> ichida — faqat xizmat teglari. Ko‘rinadigan hamma narsa — <body> ichida.'],
      starter: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <h1>Kitoblar katalogi</h1>\n</head>\n<body>\n  <title>Katalog</title>\n  <p>Bu yerda kitoblar bo‘ladi.</p>\n</body>\n</html>\n' },
      solution: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Katalog</title>\n</head>\n<body>\n  <h1>Kitoblar katalogi</h1>\n  <p>Bu yerda kitoblar bo‘ladi.</p>\n</body>\n</html>' },
      checks: [
        { label: '<h1> <body> ichiga ko‘chdi' },
        { label: '<title> <head> ichiga ko‘chdi' },
        {
          label: 'Yorliq sarlavhasi — «Katalog»',
          fn: "return ctx.doc.title.trim() === 'Katalog' || 'document.title = ' + JSON.stringify(ctx.doc.title);"
        },
        { label: 'Paragraf <body> ichida qoldi' }
      ]
    },
    'html-document-5': {
      title: 'Challenge: to‘liq head bilan sahifa',
      description: 'Nashrga tayyor hujjat yig‘ing: charset, viewport, description, `lang="uz"`, ma’noli `<title>` va tarkib — sarlavha hamda ikkita paragraf.',
      hints: ['Avval head ni qatorma-qator yig‘ing, keyin body ga o‘ting.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Dasturchining shaxsiy sahifasi: loyihalar, kontaktlar va qaydlar">\n  <title>Aziza Karimova — portfolio</title>\n</head>\n<body>\n  <h1>Aziza Karimova</h1>\n  <p>Veb-dasturlashni o‘rganyapman va portfolio yig‘yapman.</p>\n  <p>Bu yerda mening loyihalarim va qaydlarim bo‘ladi.</p>\n</body>\n</html>' },
      checks: [
        { label: '<!DOCTYPE html> bor' },
        { label: '<html> da lang="uz"', matches: '<html[^>]*lang=["\\\']uz' },
        { label: 'meta charset joyida' },
        { label: 'meta viewport joyida' },
        { label: 'meta description kamida 30 ta belgi' },
        { label: '<title> kamida 5 ta belgi' },
        { label: 'Tanada: <h1> va ikkita paragraf' }
      ]
    }
  }
};

const lesson03 = {
  title: 'Matn',
  summary: 'Sarlavhalar, paragraflar, ajratish, ko‘chirish va maxsus belgilar.',
  theory: [
    { lead: 'Matn — ko‘pchilik sahifalarning asosi. HTML unga nafaqat ko‘rinish, balki ma’no beradi.' },
    { table: { head: ['Teg', 'Ma’nosi'], rows: [
      ['`<strong>`', 'Muhim bo‘lak (brauzer qalin ko‘rsatadi)'],
      ['`<em>`', 'Ma’noviy urg‘u (kursiv)'],
      ['`<mark>`', 'Marker bilan ajratish'],
      ['`<small>`', 'Mayda matn: izohlar, eslatmalar'],
      ['`<br>`', 'Paragraf ichida qatorni ko‘chirish'],
      ['`<hr>`', 'Ma’noviy ajratgich'],
      ['`<blockquote>`', 'Butun blok bo‘lgan iqtibos'],
      ['`<code>`', 'Kod bo‘lagi']
    ] } },
    { h: 'Bo‘shliqlar haqida muhim gap' },
    { p: 'Koddagi bir nechta bo‘shliq va qator ko‘chirishni brauzer bitta bo‘shliqqa siqadi. Yangi paragraf bo‘sh qatorlar bilan emas, `<p>` tegi bilan qilinadi.' },
    { h: 'Maxsus belgilar' },
    { code: '&lt;   →  <\n&gt;   →  >\n&amp;  →  &\n&nbsp; →  uzilmaydigan bo‘shliq' },
    { warn: '`<b>` va `<i>` faqat ko‘rinishni o‘zgartiradi. `<strong>` va `<em>` ma’no tashiydi — ularni ovozli yordamchi o‘qiydi va qidiruv hisobga oladi.' }
  ],
  tasks: {
    'html-text-1': {
      title: 'Muhimi — qalin',
      description: 'Paragraf ichida `muhim` so‘zini `<strong>` tegi bilan ajrating.',
      hints: ['So‘zni o‘rab oling: <strong>muhim</strong>.'],
      starter: { html: '<p>Bu loyiha uchun juda muhim.</p>\n' },
      solution: { html: '<p>Bu loyiha uchun juda <strong>muhim</strong>.</p>' },
      checks: [
        { label: '<strong> tegi bor' },
        { label: '<strong> ichida — «muhim» so‘zi', contains: 'muhim' },
        { label: '<strong> paragraf ichida joylashgan' }
      ]
    },
    'html-text-2': {
      title: 'Kursiv va qator ko‘chirish',
      description: 'Paragrafga istalgan so‘z bilan `<em>` qo‘shing va qatorni `<br>` tegi bilan ko‘chiring.',
      hints: ['<br> — yakka teg, uni yopish shart emas.'],
      starter: { html: '<p>Birinchi qator. Ikkinchi qator.</p>\n' },
      solution: { html: '<p>Birinchi <em>qator</em>.<br>Ikkinchi qator.</p>' },
      checks: [
        { label: '<em> bor' },
        { label: '<br> ko‘chirish bor' },
        { label: 'Ikkala teg ham paragraf ichida' }
      ]
    },
    'html-text-3': {
      title: 'Muallifi bilan iqtibos',
      description: '`<blockquote>` ichida iqtibos, uning ostida esa muallif ismi bilan `<small>` qo‘shing. Blokni `<hr>` gorizontal chizig‘i bilan ajrating.',
      hints: ['Tartib erkin, uchala tegning bo‘lishi muhim.'],
      starter: { html: '<p>Oddiy matn.</p>\n' },
      solution: { html: '<blockquote>Dastur odamlar uchun yozilishi kerak, mashina esa — faqat ijrochi.</blockquote>\n<small>Harold Abelson</small>\n<hr>' },
      checks: [
        { label: '<blockquote> bor' },
        { label: 'Iqtibosda kamida 20 ta belgi' },
        { label: 'Muallif bilan <small> bor' },
        { label: '<hr> ajratgichi bor' }
      ]
    },
    'html-text-4': {
      title: 'Maxsus belgilar',
      description: 'Sahifada shu matnni chiqaring: `Teglar <p> va <a> — HTML asosi`. Burchakli qavslar teg emas, belgi sifatida ko‘rinishi kerak.',
      hints: ['&lt; «<» beradi, &gt; «>» beradi.'],
      starter: { html: '<p></p>\n' },
      solution: { html: '<p>Teglar &lt;p&gt; va &lt;a&gt; — HTML asosi</p>' },
      checks: [
        { label: 'Sahifada qavslar bilan matn ko‘rinadi', contains: '<p> va <a>' },
        { label: '&lt; va &gt; belgilari ishlatilgan' },
        { label: 'Ortiqcha haqiqiy havolalar paydo bo‘lmadi' }
      ]
    },
    'html-text-5': {
      title: 'Challenge: maqola',
      description: 'Qisqa maqola verstka qiling: `<h1>`, kirish paragrafi, `<h2>` kichik sarlavhasi, yana ikkita paragraf, matn ichida — `<strong>`, `<em>` va `<code>`, oxirida `<blockquote>` iqtibosi.',
      hints: ['Qismlarga bo‘lib yozing va har bir blokdan keyin «Ishga tushirish» ni bosing.'],
      starter: { html: '<p>Oddiy matn.</p>\n' },
      solution: {
        html: '<h1>Matn semantikasi</h1>\n<p>HTML matnning nafaqat ko‘rinishini, balki <strong>ma’nosini</strong> tasvirlaydi.</p>\n<h2>Bu nima uchun muhim</h2>\n<p>Skrinriderlar va qidiruv robotlari hujjat <em>tuzilmasini</em> o‘qiydi.</p>\n<p>Kod bo‘laklari <code>code</code> tegi bilan belgilanadi.</p>\n<blockquote>Yaxshi belgilash stillarsiz ham tushunarli.</blockquote>'
      },
      checks: [
        { label: '<h1> bor' },
        { label: '<h2> bor' },
        { label: 'Paragraflar — kamida 3 ta' },
        { label: '<strong> bor' },
        { label: '<em> bor' },
        { label: '<code> bor' },
        { label: '<blockquote> bor' }
      ]
    }
  }
};

const lesson04 = {
  title: 'Havolalar',
  summary: '<a> tegi: tashqi havolalar, yangi yorliqlar, anchorlar va navigatsiya.',
  theory: [
    { lead: 'Havola — hujjatlar to‘plamini vebga aylantiradigan narsa. Bunga `<a>` tegi javob beradi.' },
    { code: '<a href="https://google.com">Google</a>' },
    { h: 'Atributlar' },
    { table: { head: ['Atribut', 'Nima qiladi'], rows: [
      ['`href`', 'O‘tish manzili — majburiy atribut'],
      ['`target="_blank"`', 'Yangi yorliqda ochish'],
      ['`rel="noopener"`', 'Yangi yorliqda ochishdagi himoya (target bilan birga yoziladi)'],
      ['`title`', 'Sichqoncha ustiga kelganda chiqadigan izoh']
    ] } },
    { h: 'Manzil turlari' },
    { code: '<a href="https://example.com">tashqi sayt</a>\n<a href="about.html">saytning boshqa sahifasi</a>\n<a href="#contacts">shu sahifadagi bo‘lim</a>\n<a href="mailto:me@mail.com">xat yozish</a>\n<a href="tel:+998901234567">qo‘ng‘iroq qilish</a>' },
    { h: 'Anchorlar' },
    { p: '`href="#contacts"` havolasi sahifani `id="contacts"` bo‘lgan elementga suradi. `id` qiymati sahifada yagona bo‘lishi kerak.' },
    { note: 'Havola matni ma’noli bo‘lishi kerak: «Narxlarni yuklab olish» — «bu yerni bosing» dan yaxshiroq.' }
  ],
  tasks: {
    'html-links-1': {
      title: 'Google ga havola',
      description: 'Matni `Google` bo‘lgan `https://google.com` havolasini yarating.',
      hints: ['Andoza: <a href="manzil">matn</a>.', 'Manzil to‘liq, https:// bilan birga yoziladi'],
      starter: { html: '<!-- havolangiz -->\n' },
      checks: [
        { label: 'Sahifada <a> havolasi bor' },
        { label: 'href google.com ga olib boradi' },
        { label: 'Havola matni — «Google»' }
      ]
    },
    'html-links-2': {
      title: 'Yangi yorliq',
      description: 'Havola yangi yorliqda ochilsin: `target="_blank"` va `rel="noopener"` qo‘shing.',
      hints: ['Atributlar ochuvchi teg ichida bo‘shliq bilan yoziladi.'],
      checks: [
        { label: 'Havola joyida' },
        { label: 'target="_blank"' },
        { label: 'rel ichida noopener bor' }
      ]
    },
    'html-links-3': {
      title: 'To‘rt havoladan iborat menyu',
      description: 'Menyu yig‘ing: `<ul>` ro‘yxati, unda to‘rtta `<li>` bandi, har birida — havola. Har bir havolaning `href` i bo‘sh bo‘lmasligi kerak.',
      hints: ['Menyuning har bir bandi: <li><a href="...">Nomi</a></li>.'],
      starter: { html: '<!-- havolangiz -->\n' },
      solution: {
        html: '<ul>\n  <li><a href="index.html">Bosh sahifa</a></li>\n  <li><a href="about.html">Biz haqimizda</a></li>\n  <li><a href="services.html">Xizmatlar</a></li>\n  <li><a href="contacts.html">Kontaktlar</a></li>\n</ul>'
      },
      checks: [
        { label: '<ul> ro‘yxati bor' },
        { label: 'To‘rtta <li> bandi' },
        { label: 'Har bir bandda havola bor' },
        { label: 'Barcha havolalarda href bo‘sh emas' },
        { label: 'Barcha havolalarda matn bor' }
      ]
    },
    'html-links-4': {
      title: 'Sahifa bo‘limlariga havolalar',
      description: 'Mundarija tuzing: `#about`, `#skills`, `#contacts` ko‘rinishidagi uchta havola va xuddi shunday `id` ga ega uchta bo‘lim.',
      hints: [
        'id istalgan elementga beriladi: <h2 id="about">Men haqimda</h2>.',
        'href da nom oldidan panjara (#) qo‘yiladi.'
      ],
      starter: { html: '<h1>Portfolio</h1>\n\n<!-- mundarija -->\n\n<!-- bo‘limlar -->\n' },
      solution: {
        html: '<h1>Portfolio</h1>\n<ul>\n  <li><a href="#about">Men haqimda</a></li>\n  <li><a href="#skills">Ko‘nikmalar</a></li>\n  <li><a href="#contacts">Kontaktlar</a></li>\n</ul>\n<h2 id="about">Men haqimda</h2>\n<p>Veb-dasturlashni o‘rganyapman.</p>\n<h2 id="skills">Ko‘nikmalar</h2>\n<p>HTML, CSS.</p>\n<h2 id="contacts">Kontaktlar</h2>\n<p>me@mail.com</p>'
      },
      checks: [
        { label: 'Uchta anchor havola' },
        { label: 'Har bir havolaga mos id li bo‘lim bor' },
        { label: 'id="about" bo‘limi bor' },
        { label: 'id="skills" bo‘limi bor' },
        { label: 'id="contacts" bo‘limi bor' }
      ]
    },
    'html-links-5': {
      title: 'Challenge: sayt navigatsiyasi',
      description: 'To‘laqonli navigatsiya bloki yig‘ing: kamida 5 ta havola, ular orasida tashqi (yangi yorliqda, `rel` bilan), anchor, pochta `mailto:` va telefon `tel:` havolalari bo‘lsin.',
      hints: [
        'Havolalarni <ul> ichiga joylang — shunda ularni o‘qish osonroq.',
        'mailto:name@mail.com va tel:+998901234567 — bular ham href qiymatlari.'
      ],
      starter: { html: '<!-- havolangiz -->\n' },
      solution: {
        html: '<ul>\n  <li><a href="#top">Yuqoriga</a></li>\n  <li><a href="about.html">Kompaniya haqida</a></li>\n  <li><a href="https://google.com" target="_blank" rel="noopener">Hamkorlar</a></li>\n  <li><a href="mailto:hello@site.com">hello@site.com</a></li>\n  <li><a href="tel:+998901234567">+998 90 123 45 67</a></li>\n</ul>\n<h2 id="top">Yuqoriga</h2>'
      },
      checks: [
        { label: 'Havolalar kamida 5 ta' },
        { label: 'https:// ga tashqi havola bor' },
        { label: 'Tashqisi yangi yorliqda ochiladi' },
        { label: 'Unda rel="noopener" bor' },
        { label: 'Anchor havola bor' },
        { label: 'mailto havolasi bor' },
        { label: 'tel havolasi bor' },
        { label: 'Barcha havolalarda matn bor' }
      ]
    }
  }
};

const lesson05 = {
  title: 'Rasmlar',
  summary: '<img> tegi, muqobil matn, o‘lchamlar va izohlar.',
  theory: [
    { lead: 'Rasm yakka `<img>` tegi bilan qo‘yiladi — uning yopuvchi jufti yo‘q.' },
    { code: '<img src="photos/cat.jpg" alt="Deraza tokchasidagi malla mushuk">' },
    { table: { head: ['Atribut', 'Nima uchun'], rows: [
      ['`src`', 'Faylga yo‘l — majburiy'],
      ['`alt`', 'Rasm o‘rniga matn: skrinriderlar uchun va yuklanmay qolgan holatga'],
      ['`width` / `height`', 'Piksellardagi o‘lcham; joyni band qilib, verstkaning «sakrashini» yo‘qotadi'],
      ['`loading="lazy"`', 'Ekran ostidagi rasmlarni keyinroq yuklash']
    ] } },
    { h: 'Izohli rasm' },
    { code: '<figure>\n  <img src="photos/city.jpg" alt="Shahar manzarasi">\n  <figcaption>Toshkent, oqshom</figcaption>\n</figure>' },
    { warn: '`alt` har doim yoziladi. Bezak uchun qo‘yilgan rasmlarda uni bo‘sh qoldiradilar: `alt=""` — shunda skrinrider ularni o‘tkazib yuboradi.' },
    { note: 'Bu darsda o‘quv fayllari mavjud: `photos/cat.jpg`, `photos/city.jpg`, `photos/mountain.jpg`, `photos/portrait.jpg`, `photos/small.jpg`, `images/logo.svg`.' }
  ],
  tasks: {
    'html-images-1': {
      title: 'Birinchi rasm',
      description: '`photos/cat.jpg` rasmini ma’noli `alt` bilan qo‘ying (kamida 5 ta belgi).',
      hints: ['<img src="photos/cat.jpg" alt="tavsif">'],
      starter: { html: '<!-- rasm qo‘ying -->\n' },
      solution: { html: '<img src="photos/cat.jpg" alt="Malla mushuk">' },
      checks: [
        { label: 'Sahifada <img> bor' },
        { label: 'src photos/cat.jpg ga ishora qiladi' },
        { label: 'alt to‘ldirilgan (5+ belgi)' }
      ]
    },
    'html-images-2': {
      title: 'O‘lchamlar',
      description: 'Rasmga `width="240"` va `height="160"` bering.',
      hints: ['O‘lchamlar «px» siz, faqat son bilan ko‘rsatiladi.'],
      starter: { html: '<img src="photos/city.jpg" alt="Shahar manzarasi">\n' },
      solution: { html: '<img src="photos/city.jpg" alt="Shahar manzarasi" width="240" height="160">' },
      checks: [
        { label: 'Rasm joyida' },
        { label: 'width="240"' },
        { label: 'height="160"' },
        { label: 'alt yo‘qolmadi' }
      ]
    },
    'html-images-3': {
      title: 'Izohli rasm',
      description: 'Rasmni `<figure>` ichiga o‘rab, kamida 8 ta belgidan iborat `<figcaption>` izohini qo‘shing.',
      hints: ['figcaption figure ichida, img yonida turadi.'],
      starter: { html: '<img src="photos/mountain.jpg" alt="Tog‘ tizmasi">\n' },
      solution: {
        html: '<figure>\n  <img src="photos/mountain.jpg" alt="Tog‘ tizmasi">\n  <figcaption>Tong otganda Chimyon tog‘lari</figcaption>\n</figure>'
      },
      checks: [
        { label: '<figure> bor' },
        { label: 'Rasm figure ichida' },
        { label: '<figcaption> bor' },
        { label: 'Izoh kamida 8 ta belgi' }
      ]
    },
    'html-images-4': {
      title: 'Bosiladigan logotip',
      description: '`images/logo.svg` logotipini bosh sahifa `index.html` ga havola qiling.',
      hints: ['Rasm shunchaki <a> tegi ichiga joylanadi.'],
      starter: { html: '<!-- rasm qo‘ying -->\n' },
      solution: { html: '<a href="index.html"><img src="images/logo.svg" alt="Bosh sahifaga" width="120" height="40"></a>' },
      checks: [
        { label: 'index.html ga havola bor' },
        { label: 'Havola ichida — rasm' },
        { label: 'Logotip fayli ishlatilgan' },
        { label: 'Rasmda alt bor' }
      ]
    },
    'html-images-5': {
      title: 'Challenge: galereya',
      description: 'Uchta `<figure>` blokidan galereya yig‘ing: har birida `alt`, izoh va `loading="lazy"` atributi bo‘lgan rasm. Galereya ustida — sarlavha.',
      hints: ['Bitta figure blokini nusxalang va undagi rasm bilan izohni almashtiring.'],
      starter: { html: '<!-- rasm qo‘ying -->\n' },
      solution: {
        html: '<h2>Galereya</h2>\n<figure>\n  <img src="photos/cat.jpg" alt="Malla mushuk" loading="lazy">\n  <figcaption>Mushuk</figcaption>\n</figure>\n<figure>\n  <img src="photos/city.jpg" alt="Oqshomgi shahar" loading="lazy">\n  <figcaption>Shahar</figcaption>\n</figure>\n<figure>\n  <img src="photos/mountain.jpg" alt="Qorli tog‘lar" loading="lazy">\n  <figcaption>Tog‘lar</figcaption>\n</figure>'
      },
      checks: [
        { label: 'Sarlavha bor' },
        { label: 'Uchta <figure>' },
        { label: 'Uchta rasm' },
        { label: 'Barcha rasmlarda alt to‘ldirilgan' },
        { label: 'Barcha rasmlarda loading="lazy"' },
        { label: 'Uchta izoh' }
      ]
    }
  }
};

const lesson06 = {
  title: 'Ro‘yxatlar',
  summary: 'Markerli, raqamli, ichma-ich ro‘yxatlar va ta’riflar ro‘yxati.',
  theory: [
    { lead: 'Ro‘yxatlar bilan menyu, yo‘riqnoma qadamlari, mahsulot xususiyatlari — sanab o‘tiladigan hamma narsa belgilanadi.' },
    { h: 'Ro‘yxatlarning uch turi' },
    { code: '<ul>            <ol>              <dl>\n  <li>choy</li>   <li>1-qadam</li>  <dt>HTML</dt>\n  <li>kofe</li>   <li>2-qadam</li>  <dd>belgilash</dd>\n</ul>           </ol>             </dl>' },
    { table: { head: ['Ro‘yxat', 'Qachon ishlatiladi'], rows: [
      ['`<ul>`', 'Tartib muhim emas: menyu, xususiyatlar'],
      ['`<ol>`', 'Tartib muhim: yo‘riqnoma, reyting'],
      ['`<dl>`', '«Atama — ta’rif» juftliklari: lug‘at']
    ] } },
    { h: 'Ichma-ichlik' },
    { p: 'Ichki ro‘yxat bandlar orasiga emas, `<li>` ning **ichiga** qo‘yiladi:' },
    { code: '<ul>\n  <li>Mevalar\n    <ul>\n      <li>Olma</li>\n    </ul>\n  </li>\n</ul>' },
    { note: '`<ul>` va `<ol>` ning bevosita farzandi faqat `<li>` bo‘lishi mumkin — qolgan hamma narsa band ichiga qo‘yiladi.' }
  ],
  tasks: {
    'html-lists-1': {
      title: 'Xaridlar ro‘yxati',
      description: 'Uchta banddan iborat markerli ro‘yxat yarating.',
      hints: ['<ul> — konteyner, <li> — band.'],
      starter: { html: '<!-- ro‘yxatingiz -->\n' },
      solution: { html: '<ul>\n  <li>Non</li>\n  <li>Sut</li>\n  <li>Olma</li>\n</ul>' },
      checks: [
        { label: '<ul> bor' },
        { label: 'Aniq uchta <li>' },
        { label: 'Barcha bandlarda matn bor' }
      ]
    },
    'html-lists-2': {
      title: 'Bosqichma-bosqich yo‘riqnoma',
      description: 'Markerli ro‘yxatni raqamli ro‘yxatga almashtiring va qadamlar sonini to‘rttaga yetkazing.',
      hints: ['ol = ordered list, raqamlash avtomatik paydo bo‘ladi.'],
      starter: { html: '<ul>\n  <li>Muharrirni ochish</li>\n  <li>Kod yozish</li>\n</ul>\n' },
      solution: { html: '<ol>\n  <li>Muharrirni ochish</li>\n  <li>Kod yozish</li>\n  <li>Sahifani ishga tushirish</li>\n  <li>Natijani tekshirish</li>\n</ol>' },
      checks: [
        { label: '<ol> bor' },
        { label: 'To‘rtta qadam' },
        { label: 'Markerli ro‘yxat qolmadi' }
      ]
    },
    'html-lists-3': {
      title: 'Ichma-ich ro‘yxat',
      description: 'Ikki darajali ro‘yxat tuzing: yuqori darajada ikkita bo‘lim, birinchisida — kamida ikkita banddan iborat ichki ro‘yxat.',
      hints: ['Ichki <ul> <li> ning ichida, uning yopuvchi tegidan oldin yoziladi.'],
      starter: { html: '<!-- ro‘yxatingiz -->\n' },
      solution: {
        html: '<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>'
      },
      checks: [
        { label: 'Tashqi ro‘yxat bor' },
        { label: '<li> ichida ichki ro‘yxat bor' },
        { label: 'Ichki ro‘yxatda kamida 2 ta band' },
        { label: 'Jami bandlar kamida 4 ta' }
      ]
    },
    'html-lists-4': {
      title: 'Lug‘at',
      description: '«Atama `<dt>` — tavsif `<dd>`» ko‘rinishidagi uchta juftlikdan iborat `<dl>` ta’riflar ro‘yxatini yarating.',
      hints: ['Juftliklar ketma-ket boradi: dt, dd, dt, dd…'],
      starter: { html: '<!-- ro‘yxatingiz -->\n' },
      solution: {
        html: '<dl>\n  <dt>HTML</dt>\n  <dd>sahifalarni belgilash tili</dd>\n  <dt>CSS</dt>\n  <dd>stillarni tasvirlash tili</dd>\n  <dt>JS</dt>\n  <dd>brauzer uchun dasturlash tili</dd>\n</dl>'
      },
      checks: [
        { label: '<dl> bor' },
        { label: 'Uchta <dt> atamasi' },
        { label: 'Uchta <dd> ta’rifi' },
        { label: 'Ta’riflar kamida 5 ta belgi' }
      ]
    },
    'html-lists-5': {
      title: 'Challenge: kurs katalogi',
      description: 'Katalog verstka qiling: uchta moduldan iborat raqamli ro‘yxat, har birida — mavzularning ichki markerli ro‘yxati (kamida 2 tadan). Katalog ustida — sarlavha.',
      hints: ['Bitta modulni to‘liq qiling, tekshiring, so‘ng uni yana ikki marta nusxalang.'],
      starter: { html: '<!-- ro‘yxatingiz -->\n' },
      solution: {
        html: '<h2>Kurs dasturi</h2>\n<ol>\n  <li>HTML\n    <ul><li>Teglar</li><li>Havolalar</li></ul>\n  </li>\n  <li>CSS\n    <ul><li>Selektorlar</li><li>Flexbox</li></ul>\n  </li>\n  <li>JavaScript\n    <ul><li>O‘zgaruvchilar</li><li>DOM</li></ul>\n  </li>\n</ol>'
      },
      checks: [
        { label: 'Sarlavha bor' },
        { label: 'Tashqi ro‘yxat — raqamli' },
        { label: 'Har bir modulda ichki <ul>' },
        { label: 'Mavzular jami kamida 6 ta' },
        { label: 'Barcha mavzularda matn bor' }
      ]
    }
  }
};

const lesson07 = {
  title: 'Jadvallar',
  summary: 'Qatorlar, kataklar, sarlavhalar, birlashtirish va jadval izohi.',
  theory: [
    { lead: 'Jadval jadval ko‘rinishidagi ma’lumotlar uchun kerak: jadval-dastur, narxnoma, hisobot. Maketni verstka qilishda jadval ishlatilmaydi — buning uchun CSS Grid va Flexbox bor.' },
    { code: '<table>\n  <caption>Dars jadvali</caption>\n  <thead>\n    <tr><th>Kun</th><th>Mavzu</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Du</td><td>HTML</td></tr>\n  </tbody>\n</table>' },
    { table: { head: ['Teg', 'Ma’nosi'], rows: [
      ['`<table>`', 'Jadvalning o‘zi'],
      ['`<caption>`', 'Izoh, table ichidagi birinchi element'],
      ['`<thead>` / `<tbody>` / `<tfoot>`', 'Shapka, tana, yakun'],
      ['`<tr>`', 'Qator'],
      ['`<th>`', 'Sarlavha-katak (qalin, markazda)'],
      ['`<td>`', 'Oddiy katak']
    ] } },
    { h: 'Kataklarni birlashtirish' },
    { code: '<td colspan="2">ikkita ustunga</td>\n<td rowspan="3">uchta qatorga</td>' },
    { note: 'Har bir qatordagi `<td>` soni bir xil bo‘lishi kerak — aks holda jadval «qiyshayadi».' }
  ],
  tasks: {
    'html-tables-1': {
      title: '2×2 jadval',
      description: 'Jadval yarating: ikkita `<th>` dan iborat sarlavha qatori va ikkita `<td>` dan iborat bitta ma’lumot qatori.',
      hints: ['Har bir qator — alohida <tr>.'],
      solution: { html: '<table>\n  <tr><th>Mahsulot</th><th>Narx</th></tr>\n  <tr><td>Kofe</td><td>25 000</td></tr>\n</table>' },
      checks: [
        { label: '<table> bor' },
        { label: 'Ikkita <tr> qatori' },
        { label: 'Ikkita sarlavha-katak' },
        { label: 'Ikkita oddiy katak' }
      ]
    },
    'html-tables-2': {
      title: 'Izoh va shapka',
      description: 'Jadvalga `<caption>` qo‘shing, sarlavha qatorini `<thead>` ga, ma’lumotlarni `<tbody>` ga chiqaring.',
      hints: ['caption ochuvchi <table> dan keyin darhol qo‘yiladi.'],
      starter: { html: '<table>\n  <tr><th>Mahsulot</th><th>Narx</th></tr>\n  <tr><td>Kofe</td><td>25 000</td></tr>\n  <tr><td>Choy</td><td>18 000</td></tr>\n</table>\n' },
      solution: { html: '<table>\n  <caption>Narxnoma</caption>\n  <thead>\n    <tr><th>Mahsulot</th><th>Narx</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Kofe</td><td>25 000</td></tr>\n    <tr><td>Choy</td><td>18 000</td></tr>\n  </tbody>\n</table>' },
      checks: [
        { label: 'Matnli <caption> bor' },
        { label: 'Sarlavhalar <thead> ichida' },
        { label: 'Ma’lumotlar <tbody> ichida' }
      ]
    },
    'html-tables-3': {
      title: 'Haftalik jadval',
      description: '3 ustun × 5 qator ma’lumotdan iborat jadval tuzing: kun, mavzu, vaqt. Shapka va izohni unutmang.',
      hints: ['5 qator × 3 katak = 15 ta <td> tegi.'],
      solution: { html: '<table>\n  <caption>Dars jadvali</caption>\n  <thead>\n    <tr><th>Kun</th><th>Mavzu</th><th>Vaqt</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Du</td><td>HTML</td><td>10:00</td></tr>\n    <tr><td>Se</td><td>CSS</td><td>10:00</td></tr>\n    <tr><td>Chor</td><td>JS</td><td>12:00</td></tr>\n    <tr><td>Pay</td><td>DOM</td><td>12:00</td></tr>\n    <tr><td>Ju</td><td>Loyiha</td><td>14:00</td></tr>\n  </tbody>\n</table>' },
      checks: [
        { label: 'Izoh bor' },
        { label: 'Shapkada uchta ustun' },
        { label: 'Beshta ma’lumot qatori' },
        { label: 'Jami 15 ta ma’lumot katagi' }
      ]
    },
    'html-tables-4': {
      title: 'Kataklarni birlashtirish',
      description: 'Jadvalga yakun qatorini qo‘shing: «Jami» katagi ikkita ustunga (`colspan="2"`) va summa katagi.',
      hints: ['Yakun qatorida atigi ikkita katak bo‘ladi: biri colspan="2" bilan, ikkinchisi summa bilan.'],
      starter: { html: '<table>\n  <thead>\n    <tr><th>Mahsulot</th><th>Soni</th><th>Summa</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Kofe</td><td>2</td><td>50 000</td></tr>\n    <tr><td>Choy</td><td>1</td><td>18 000</td></tr>\n  </tbody>\n</table>\n' },
      solution: { html: '<table>\n  <thead>\n    <tr><th>Mahsulot</th><th>Soni</th><th>Summa</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Kofe</td><td>2</td><td>50 000</td></tr>\n    <tr><td>Choy</td><td>1</td><td>18 000</td></tr>\n    <tr><td colspan="2">Jami</td><td>68 000</td></tr>\n  </tbody>\n</table>' },
      checks: [
        { label: 'colspan="2" bo‘lgan katak bor' },
        { label: 'Unda «Jami» yozilgan', contains: 'Jami' },
        { label: 'Jadvaldagi qatorlar soni 4 ta bo‘ldi' }
      ]
    },
    'html-tables-5': {
      title: 'Challenge: tariflarni solishtirish',
      description: 'Tariflar jadvalini verstka qiling: izoh, 4 ustunli shapka (Imkoniyat + 3 tarif), kamida 4 ta solishtirish qatori va narxlar bilan `<tfoot>` qatori.',
      hints: [
        'Har bir qatorning birinchi katagi <th scope="row"> bo‘lishi mumkin.',
        'tfoot tbody dan keyin yoziladi.'
      ],
      solution: { html: '<table>\n  <caption>Tariflar</caption>\n  <thead>\n    <tr><th>Imkoniyat</th><th>Start</th><th>Pro</th><th>Max</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Loyihalar</th><td>1</td><td>10</td><td>∞</td></tr>\n    <tr><th scope="row">Qo‘llab-quvvatlash</th><td>—</td><td>Pochta</td><td>24/7</td></tr>\n    <tr><th scope="row">Domen</th><td>—</td><td>1</td><td>5</td></tr>\n    <tr><th scope="row">Xotira</th><td>1 GB</td><td>20 GB</td><td>200 GB</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">Narx</th><td>0</td><td>99 000</td><td>199 000</td></tr>\n  </tfoot>\n</table>' },
      checks: [
        { label: 'Jadval izohi bor' },
        { label: 'Shapkada to‘rtta ustun' },
        { label: 'Kamida 4 ta solishtirish qatori' },
        { label: '<tfoot> bor' },
        { label: 'Tana qatorlarining har birida 4 tadan katak' },
        { label: 'Qatorlarning birinchi ustunida — <th> sarlavhalari' }
      ]
    }
  }
};

const lesson08 = {
  title: 'Formalar',
  summary: 'Kiritish maydonlari, yozuvlar, ochiluvchi ro‘yxatlar va tugmalar.',
  theory: [
    { lead: 'Forma — foydalanuvchidan ma’lumot olish usuli: login, buyurtma, sharh.' },
    { code: '<form>\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Yuborish</button>\n</form>' },
    { h: 'input turlari' },
    { table: { head: ['type', 'Nima uchun'], rows: [
      ['`text`', 'Oddiy satr'],
      ['`email` / `tel` / `url`', 'Formatni tekshiradi va telefonda klaviaturani almashtiradi'],
      ['`password`', 'Belgilarni yashiradi'],
      ['`number`', 'Faqat sonlar, `min` va `max` bor'],
      ['`checkbox` / `radio`', 'Belgilash katakchalari va tanlagichlar'],
      ['`date` / `color` / `range`', 'Brauzerning tayyor vidjetlari']
    ] } },
    { h: 'label — majburiy' },
    { p: '`<label>` ning `for` atributi maydonning `id` si bilan mos bo‘lishi kerak. Shunda yozuvni bosish kursorni maydonga qo‘yadi, skrinrider esa maydonni to‘g‘ri o‘qiydi.' },
    { h: 'Foydali atributlar' },
    { ul: [
      '`name` — qiymat serverga shu nom bilan yuboriladi;',
      '`placeholder` — maydon ichidagi ishora (label o‘rnini bosmaydi!);',
      '`required` — maydon majburiy;',
      '`value` — standart qiymat;',
      '`disabled`, `readonly` — maydonni bloklash.'
    ] },
    { note: 'Ko‘p qatorli matn — `<textarea>`, ochiluvchi ro‘yxat — ichida `<option>` bo‘lgan `<select>`.' }
  ],
  tasks: {
    'html-forms-1': {
      title: 'Yozuvli maydon',
      description: 'Forma ichida `id="name"`, `name="name"` bo‘lgan matn maydoni va `<label for="name">Ism</label>` yozuvini yarating.',
      hints: ['label dagi for va input dagi id harfma-harf mos bo‘lishi kerak.'],
      solution: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text">\n</form>' },
      checks: [
        { label: 'Forma bor' },
        { label: 'id="name" bo‘lgan maydon bor' },
        { label: 'Maydonda name="name" bor' },
        { label: 'for="name" bo‘lgan label bor' },
        { label: 'Yozuvda matn bor' }
      ]
    },
    'html-forms-2': {
      title: 'Pochta va tugma',
      description: 'Formaga `required` atributli `type="email"` maydonini va `<button type="submit">` tugmasini qo‘shing.',
      hints: ['required qiymatsiz yoziladi: <input type="email" required>.'],
      starter: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text">\n</form>\n' },
      solution: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text">\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Yuborish</button>\n</form>' },
      checks: [
        { label: 'type="email" maydoni bor' },
        { label: 'Maydon majburiy' },
        { label: 'Maydonda label bor' },
        { label: 'Yuborish tugmasi bor' }
      ]
    },
    'html-forms-3': {
      title: 'Ochiluvchi ro‘yxat va textarea',
      description: 'Uchta `<option>` bo‘lgan `<select id="topic">` va ko‘p qatorli `<textarea id="message">` maydonini qo‘shing. Ikkalasida ham yozuv bo‘lishi kerak.',
      hints: ['<option value="support">Qo‘llab-quvvatlash</option>'],
      starter: { html: '<form>\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="email" required>\n</form>\n' },
      solution: { html: '<form>\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="email" required>\n  <label for="topic">Mavzu</label>\n  <select id="topic" name="topic">\n    <option value="question">Savol</option>\n    <option value="bug">Xatolik</option>\n    <option value="other">Boshqa</option>\n  </select>\n  <label for="message">Xabar</label>\n  <textarea id="message" name="message" rows="4"></textarea>\n</form>' },
      checks: [
        { label: 'select#topic bor' },
        { label: 'Ro‘yxatda uchta variant' },
        { label: 'Variantlarda value berilgan' },
        { label: 'textarea#message bor' },
        { label: 'Ikkala maydon uchun ham yozuv bor' }
      ]
    },
    'html-forms-4': {
      title: 'Tanlagichlar va belgilash katakchasi',
      description: 'Bir xil `name="delivery"` bo‘lgan ikkita radio tugma guruhini va `required` bilan rozilik katakchasini qo‘shing.',
      hints: ['Radio tugmalar faqat bir xil name da guruh sifatida ishlaydi.'],
      starter: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text">\n</form>\n' },
      solution: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text">\n  <label><input type="radio" name="delivery" value="pickup"> O‘zim olib ketaman</label>\n  <label><input type="radio" name="delivery" value="courier"> Kuryer</label>\n  <label><input type="checkbox" name="agree" required> Shartlarga roziman</label>\n</form>' },
      checks: [
        { label: 'Ikkita radio tugma' },
        { label: 'Ularda bir xil name="delivery"' },
        { label: 'Radio tugmalarda har xil value' },
        { label: 'Belgilash katakchasi bor' },
        { label: 'Katakcha majburiy' }
      ]
    },
    'html-forms-5': {
      title: 'Challenge: ro‘yxatdan o‘tish formasi',
      description: 'Ro‘yxatdan o‘tish formasini yig‘ing: ism, pochta, parol (kamida 8 ta belgi), tug‘ilgan sana, tarif tanlash, rozilik katakchasi va tugma. Har bir maydonda — yozuv, barcha maydonlarda — `name`.',
      hints: [
        'Yozuvni ikki usulda berish mumkin: yonida <label for="id"> yoki maydonni <label> ichiga o‘rash.',
        'minlength qiymatning eng kichik uzunligini cheklaydi.'
      ],
      solution: { html: '<form>\n  <label for="name">Ism</label>\n  <input id="name" name="name" type="text" required>\n  <label for="email">Pochta</label>\n  <input id="email" name="email" type="email" required>\n  <label for="password">Parol</label>\n  <input id="password" name="password" type="password" minlength="8" required>\n  <label for="birthday">Tug‘ilgan sana</label>\n  <input id="birthday" name="birthday" type="date">\n  <label for="plan">Tarif</label>\n  <select id="plan" name="plan">\n    <option value="start">Start</option>\n    <option value="pro">Pro</option>\n  </select>\n  <label><input type="checkbox" name="agree" required> Shartlarga roziman</label>\n  <button type="submit">Ro‘yxatdan o‘tish</button>\n</form>' },
      checks: [
        { label: 'Forma bor' },
        { label: 'Ism maydoni' },
        { label: 'Pochta maydoni' },
        { label: 'minlength="8" bo‘lgan parol maydoni' },
        { label: 'Sana maydoni' },
        { label: 'Tarif tanlash: select yoki radio tugmalar' },
        { label: 'Rozilik katakchasi' },
        { label: 'Barcha maydonlarda name bor' },
        { label: 'Har bir maydon yozuvga ega' },
        { label: 'Yuborish tugmasi' }
      ]
    }
  }
};

const lesson09 = {
  title: 'Semantik verstka',
  summary: 'header, nav, main, section, article, aside, footer — va ular nima uchun kerak.',
  theory: [
    { lead: 'Semantik teglar — bu `<div>` bilan bir xil bloklar, lekin nomi brauzer, qidiruv tizimi va skrinrider tushunadigan darajada ma’noli.' },
    { code: '<body>\n  <header>shapka + nav</header>\n  <main>\n    <article>mustaqil material</article>\n    <aside>qo‘shimcha</aside>\n  </main>\n  <footer>futer</footer>\n</body>' },
    { table: { head: ['Teg', 'Qachon ishlatiladi'], rows: [
      ['`<header>`', 'Sahifa yoki bo‘lim shapkasi'],
      ['`<nav>`', 'Havolali navigatsiya bloki'],
      ['`<main>`', 'Asosiy tarkib — sahifada aniq bittasi'],
      ['`<section>`', 'Ma’noviy bo‘lim, odatda sarlavha bilan'],
      ['`<article>`', 'Mustaqil bo‘lak: yangilik, mahsulot kartasi, izoh'],
      ['`<aside>`', 'Yon narsalar: sidebar, reklama, izohlar'],
      ['`<footer>`', 'Sahifa yoki bo‘lim futeri']
    ] } },
    { h: 'Tanlash qoidasi' },
    { p: 'Mos semantik teg bo‘lmasa — `<div>` oling. Bu normal: `<div>` «yomon» emas, shunchaki ma’nosiz.' },
    { warn: '`<main>` bitta bo‘lishi kerak va `<article>`, `<aside>`, `<header>` yoki `<footer>` ichida yotolmaydi.' }
  ],
  tasks: {
    'html-semantic-1': {
      title: 'Shapka va futer',
      description: '`<h1>` sarlavhali `<header>` va mualliflik matni bo‘lgan `<footer>` yarating.',
      hints: ['Bular oddiy bloklar: <header>…</header>.'],
      starter: { html: '<!-- sahifa karkasi -->\n' },
      solution: { html: '<header>\n  <h1>Mening saytim</h1>\n</header>\n<footer>\n  <p>© 2026 Mening saytim</p>\n</footer>' },
      checks: [
        { label: '<header> bor' },
        { label: 'Shapkada — <h1>' },
        { label: '<footer> bor' },
        { label: 'Futerda matn bor' }
      ]
    },
    'html-semantic-2': {
      title: 'Shapkadagi navigatsiya',
      description: '`<header>` ichiga uchta havoladan iborat ro‘yxati bo‘lgan `<nav>` blokini qo‘shing.',
      hints: ['Navigatsiya — bu ichida <ul> ro‘yxati bo‘lgan <nav>.'],
      starter: { html: '<header>\n  <h1>Mening saytim</h1>\n</header>\n<footer>\n  <p>© 2026</p>\n</footer>\n' },
      solution: { html: '<header>\n  <h1>Mening saytim</h1>\n  <nav>\n    <ul>\n      <li><a href="#home">Bosh sahifa</a></li>\n      <li><a href="#blog">Blog</a></li>\n      <li><a href="#contacts">Kontaktlar</a></li>\n    </ul>\n  </nav>\n</header>\n<footer>\n  <p>© 2026</p>\n</footer>' },
      checks: [
        { label: '<header> ichida <nav>' },
        { label: 'Navigatsiyada ro‘yxat bor' },
        { label: 'Uchta havola' },
        { label: 'Havolalarda href bor' }
      ]
    },
    'html-semantic-3': {
      title: 'Asosiy qism',
      description: 'Shapka bilan futer orasiga `<main>` qo‘shing, uning ichida — ikkita `<section>`, har birida o‘z `<h2>` sarlavhasi bilan.',
      hints: ['<main> — asosiy tarkib uchun konteyner, u sahifada bitta bo‘ladi.'],
      starter: { html: '<header>\n  <h1>Mening saytim</h1>\n</header>\n\n<footer>\n  <p>© 2026</p>\n</footer>\n' },
      solution: { html: '<header>\n  <h1>Mening saytim</h1>\n</header>\n<main>\n  <section>\n    <h2>Loyiha haqida</h2>\n    <p>Nima bilan shug‘ullanishimiz haqida qisqacha.</p>\n  </section>\n  <section>\n    <h2>Xizmatlar</h2>\n    <p>Biz nimalarni uddalaymiz.</p>\n  </section>\n</main>\n<footer>\n  <p>© 2026</p>\n</footer>' },
      checks: [
        { label: 'Aniq bitta <main> bor' },
        { label: 'main ichida — ikkita <section>' },
        { label: 'Har bir bo‘limda <h2> bor' },
        { label: 'main header dan keyin turibdi' }
      ]
    },
    'html-semantic-4': {
      title: 'Maqola va sidebar',
      description: '`<main>` ichida o‘z `<header>` i, sarlavhasi, matni va muallif ko‘rsatilgan `<footer>` i bo‘lgan `<article>` yarating, yonida esa — qo‘shimcha ma’lumotli `<aside>`.',
      hints: ['header va footer ni nafaqat sahifa uchun, balki article ichida ham ishlatish mumkin.'],
      solution: { html: '<main>\n  <article>\n    <header><h2>Verstkani qanday o‘rganish kerak</h2></header>\n    <p>Eng yaxshi usul — har kuni kod yozish va o‘zganing maketlarini tahlil qilish.</p>\n    <footer><p>Muallif: Aziza</p></footer>\n  </article>\n  <aside>\n    <h3>Buni ham o‘qing</h3>\n    <p>Foydali havolalar to‘plami.</p>\n  </aside>\n</main>' },
      checks: [
        { label: 'main ichida <article> bor' },
        { label: 'Maqolaning o‘z sarlavhasi bor' },
        { label: 'Maqolada <footer> bor' },
        { label: '<aside> bor' },
        { label: 'Maqolada matn bor' }
      ]
    },
    'html-semantic-5': {
      title: 'Challenge: blog sahifasining karkasi',
      description: 'To‘liq semantik karkas yig‘ing: `<nav>` li `<header>`, uchta `<article>` bo‘lgan `<main>` (har birida sarlavha va matn), `<aside>` va `<footer>`. Birorta ham `<div>` bo‘lmasin.',
      hints: [
        'Tartib: header → main (article × 3 + aside) → footer.',
        '<div> yozgingiz kelsa, o‘zingizdan so‘rang: bu bo‘limmi, maqolami yoki yon narsami?'
      ],
      starter: { html: '<!-- sahifa karkasi -->\n' },
      solution: { html: '<header>\n  <h1>Veb haqida blog</h1>\n  <nav>\n    <ul>\n      <li><a href="#all">Barcha maqolalar</a></li>\n      <li><a href="#about">Muallif haqida</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Bir soatda HTML</h2>\n    <p>Har qanday sahifa tarkib topadigan asosiy teglar.</p>\n  </article>\n  <article>\n    <h2>Og‘riqsiz CSS</h2>\n    <p>Selektorlar va kaskad qanday ishlaydi.</p>\n  </article>\n  <article>\n    <h2>Birinchi skript</h2>\n    <p>Sahifani JavaScript yordamida jonlantiramiz.</p>\n  </article>\n  <aside>\n    <h3>Obuna</h3>\n    <p>Haftasiga bir marta yangi maqolalar.</p>\n  </aside>\n</main>\n<footer>\n  <p>© 2026 Veb haqida blog</p>\n</footer>' },
      checks: [
        { label: 'Navigatsiyali shapka' },
        { label: 'Bitta <main>' },
        { label: 'Uchta maqola' },
        { label: 'Har bir maqolada sarlavha' },
        { label: 'Har bir maqolada matn' },
        { label: '<aside> bor' },
        { label: 'Sahifa <footer> i bor' },
        { label: 'Birorta ham <div> yo‘q' }
      ]
    }
  }
};

export const htmlLessons = {
  'web-and-html': lesson01,
  'html-document': lesson02,
  'html-text': lesson03,
  'html-links': lesson04,
  'html-images': lesson05,
  'html-lists': lesson06,
  'html-tables': lesson07,
  'html-forms': lesson08,
  'html-semantic': lesson09
};
