/* M16. Kontent boshqaruv tizimlari (CMS) va ularning imkoniyatlari. */
export default {
  id: 'm16',
  number: 16,
  title: 'Kontent boshqaruv tizimlari (CMS) va ularning imkoniyatlari',
  summary: 'CMS vazifasi va arxitekturasi, WordPress, Joomla, Drupal, headless CMS, statik sayt generatorlari va tanlash mezonlari.',
  literature: [1],
  goals: [
    'CMS tushunchasi, vazifalari va tarkibiy qismlarini bilish.',
    'Mashhur CMS lar (WordPress, Joomla, Drupal) imkoniyatlarini qiyoslash.',
    'An’anaviy va headless CMS arxitekturalarini farqlash.',
    'CMS tanlash, xavfsizlik va texnik xizmat ko‘rsatish masalalarini tushunish.'
  ],
  keywords: ['CMS', 'kontent', 'admin panel', 'mavzu (theme)', 'plagin', 'WYSIWYG', 'WordPress', 'Joomla', 'Drupal', 'headless CMS', 'Strapi', 'SSG', 'rollar', 'SEO'],
  practicals: [],
  lessons: ['html-semantic', 'css-responsive'],
  sections: [
    {
      title: 'CMS tushunchasi',
      blocks: [
        { lead: 'CMS (Content Management System — kontent boshqaruv tizimi) — dasturlash bilimisiz sayt kontentini yaratish, tahrirlash va nashr qilish imkonini beruvchi dasturiy ta’minot.' },
        'CMS paydo bo‘lgunga qadar har bir yangilik uchun dasturchi HTML faylni tahrirlab, serverga yuklashi kerak edi. CMS da muharrir brauzer orqali admin panelga kiradi, matn yozadi, rasm yuklaydi va «Nashr qilish» tugmasini bosadi.',
        { h: 'CMS ning asosiy vazifalari' },
        { ul: [
          'Kontent yaratish va tahrirlash (WYSIWYG yoki blokli muharrir).',
          'Media fayllar kutubxonasi (rasm, video, hujjat).',
          'Sahifalar tuzilmasi, menyular, kategoriyalar va teglar.',
          'Foydalanuvchilar, rollar va huquqlar: administrator, muharrir, muallif.',
          'Nashr jarayoni: qoralama, ko‘rib chiqish, rejalashtirilgan nashr, versiyalar tarixi.',
          'Ko‘rinishni mavzular (themes), funksionallikni plaginlar (kengaytmalar) orqali o‘zgartirish.',
          'SEO sozlamalari, ko‘p tillilik, izohlar, qidiruv.'
        ] }
      ]
    },
    {
      title: 'CMS arxitekturasi',
      blocks: [
        { code: '┌────────────────────────── CMS ──────────────────────────┐\n│  Admin panel (back-office)      Ommaviy sayt (front)    │\n│  kontent kiritish, sozlash      mavzu shablonlari       │\n│            │                           ▲               │\n│            ▼                           │               │\n│   Yadro: marshrutlash, foydalanuvchilar, API, hooklar  │\n│            │              ▲                            │\n│            ▼              │ plaginlar kengaytiradi     │\n│      Ma’lumotlar bazasi (MySQL)     Fayllar (uploads)  │\n└────────────────────────────────────────────────────────┘', lang: 'text', title: 'An’anaviy (monolit) CMS' },
        { terms: [
          ['Yadro (core)', 'Asosiy funksionallik; yangilanishlar orqali xavfsizlik tuzatishlari keladi.'],
          ['Mavzu (theme, shablon)', 'Saytning ko‘rinishini belgilovchi shablonlar, CSS va JS to‘plami.'],
          ['Plagin (modul, kengaytma)', 'Yangi funksiya qo‘shuvchi paket: forma, do‘kon, SEO, kesh.'],
          ['Hook / event', 'Yadro ma’lum nuqtalarda plaginlarni chaqiradigan mexanizm — yadroni o‘zgartirmasdan kengaytirish imkoni.'],
          ['Kontent turi', 'Kontentning tuzilmasi: «Yangilik», «O‘qituvchi», «Tadbir» — o‘z maydonlari bilan.']
        ] }
      ]
    },
    {
      title: 'Mashhur CMS lar',
      blocks: [
        { h: 'WordPress' },
        'Dunyodagi saytlarning qariyb **40%** idan ortig‘i WordPress da ishlaydi. PHP va MySQL ga asoslangan, 2003-yildan beri rivojlanadi. Blog platformasi sifatida boshlangan, bugun korporativ saytlar, do‘konlar (WooCommerce), ta’lim portallari uchun ham ishlatiladi.',
        { ul: [
          'Afzalliklari: o‘rnatish oson, ulkan mavzu va plaginlar bozori (60 000+), Gutenberg blokli muharriri, katta hamjamiyat.',
          'Kamchiliklari: ko‘p plagin — sekinlik va xavfsizlik zaifliklari manbai; murakkab ma’lumot tuzilmalari uchun cheklangan.'
        ] },
        { code: "<?php\n// Mavzu shabloni: yozuvlar ro‘yxati (The Loop)\nif (have_posts()) :\n  while (have_posts()) : the_post(); ?>\n    <article>\n      <h2><a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a></h2>\n      <?php the_excerpt(); ?>\n    </article>\n  <?php endwhile;\nendif;\n\n// Plagin: hook orqali yozuv oxiriga matn qo‘shish\nadd_filter('the_content', function ($content) {\n    return $content . '<p>Maqola UBS talabalari uchun tayyorlandi.</p>';\n});", lang: 'php', title: 'WordPress' },
        { h: 'Joomla va Drupal' },
        { ul: [
          '**Joomla** (2005) — WordPress dan murakkabroq, lekin ko‘p tillilik, foydalanuvchi guruhlari va huquqlar «qutidan» mavjud. Portallar va tashkilot saytlarida ishlatiladi.',
          '**Drupal** (2001) — eng moslashuvchan va xavfsiz CMS lardan biri: murakkab kontent turlari, taksonomiyalar, nozik huquqlar. Davlat portallari va universitetlarda keng tarqalgan; o‘rganish qiyinroq.'
        ] },
        { h: 'Maxsus CMS lar' },
        { ul: [
          '**Elektron tijorat**: Shopify (bulutli), Magento/Adobe Commerce, WooCommerce.',
          '**Ta’lim**: Moodle — o‘quv boshqaruv tizimi (LMS).',
          '**Freymvork asosidagi**: Wagtail (Django), Filament/Statamic (Laravel), Payload (Node.js).',
          '**Bulutli konstruktorlar**: Wix, Tilda, Webflow — hosting va muharrir birga.'
        ] },
        { table: { head: ['Mezon', 'WordPress', 'Joomla', 'Drupal'], rows: [
          ['O‘rganish', 'Oson', 'O‘rtacha', 'Qiyin'],
          ['Kengaytmalar soni', 'Juda ko‘p', 'Ko‘p', 'O‘rtacha'],
          ['Moslashuvchanlik', 'O‘rtacha', 'Yaxshi', 'Juda yuqori'],
          ['Xavfsizlik (standart)', 'Plaginlarga bog‘liq', 'Yaxshi', 'Juda yaxshi'],
          ['Tipik loyihalar', 'Blog, biznes sayt, do‘kon', 'Portal, tashkilot sayti', 'Davlat, universitet, yirik media']
        ] } }
      ]
    },
    {
      title: 'Headless CMS va statik sayt generatorlari',
      blocks: [
        '**Headless** («boshsiz») CMS da taqdimot qismi yo‘q: u faqat admin panel va kontentni **API** (REST yoki GraphQL) orqali beradi. Ko‘rinishni esa istalgan front-end — Vue/Nuxt, React/Next, mobil ilova, hatto aqlli soat — o‘zi quradi.',
        { code: '                 ┌── Veb-sayt (Nuxt / Next.js)\nHeadless CMS ── API ─┼── Mobil ilova\n (Strapi,          ├── Telegram bot\n  Contentful)     └── Ekran / kiosk', lang: 'text', title: 'Bitta kontent — ko‘p kanal' },
        { ul: [
          'Misollar: **Strapi**, **Directus**, **Payload** (o‘z serveringizda), **Contentful**, **Sanity** (bulutli). WordPress ham REST API orqali headless rejimda ishlay oladi.',
          'Afzalliklari: front-end texnologiyasini erkin tanlash, bitta kontent — ko‘p kanal, yuqori xavfsizlik (admin panel ommaviy saytdan ajratilgan).',
          'Kamchiliklari: front-end ni alohida dasturlash kerak, oldindan ko‘rish (preview) murakkabroq.'
        ] },
        { code: "// Vue ilovasida headless CMS dan yangiliklarni olish\nconst response = await fetch('https://cms.ubs.uz/api/news?sort=publishedAt:desc&pagination[limit]=5');\nconst { data } = await response.json();\ndata.forEach((item) => console.log(item.title, item.publishedAt));", lang: 'js' },
        { h: 'Statik sayt generatorlari (SSG)' },
        '**Hugo**, **Jekyll**, **Astro**, **VitePress**, **Eleventy** — Markdown fayllar va shablonlardan oldindan tayyor HTML sahifalar yig‘adi. Natija — ma’lumotlar bazasisiz, juda tez va xavfsiz sayt; bepul hostinglarga (GitHub Pages, Netlify) joylash mumkin. Hujjatlar, bloglar va kurs saytlari uchun ideal.'
      ]
    },
    {
      title: 'CMS tanlash va ekspluatatsiya',
      blocks: [
        { h: 'Tanlash mezonlari' },
        { ol: [
          '**Loyiha turi va hajmi**: blog, korporativ sayt, do‘kon, portal.',
          '**Kontent tuzilmasi**: oddiy sahifalar yoki murakkab bog‘langan turlar.',
          '**Muharrirlar tajribasi**: interfeys qanchalik qulay bo‘lishi kerak.',
          '**Integratsiyalar**: to‘lov tizimlari, CRM, 1C, OneID.',
          '**Ko‘p tillilik** (o‘zbek, rus, ingliz).',
          '**Jamoa texnologiyasi**: PHP, Python yoki JavaScript.',
          '**Umumiy egalik qiymati**: litsenziya, hosting, plaginlar, texnik xizmat.'
        ] },
        { h: 'Xavfsizlik va texnik xizmat' },
        { ul: [
          'Yadro, mavzu va plaginlarni muntazam yangilash — CMS saytlar buzilishining asosiy sababi eskirgan plaginlar.',
          'Faqat ishonchli manbalardan plagin o‘rnatish; ishlatilmaydiganlarini o‘chirish.',
          'Admin panel manzilini himoyalash, kuchli parollar va 2FA.',
          'Muntazam zaxira nusxa (fayllar + baza) va tiklashni sinash.',
          'Keshlash plaginlari va CDN orqali tezlikni oshirish.',
          'Ruxsatlar: muallif faqat o‘z maqolalarini tahrirlaydi, muharrir — hammasini.'
        ] },
        { tip: 'CMS «dasturlashsiz sayt» degani emas. Mavzuni moslash, plagin yozish, integratsiya va unumdorlikni sozlash uchun HTML, CSS, JavaScript va server tomoni bilimi baribir kerak — bu kursda o‘rganganlaringiz aynan shu yerda qo‘l keladi.' }
      ]
    }
  ],
  conclusion: [
    'CMS kontentni dasturchisiz boshqarish imkonini beradi: admin panel, mavzular, plaginlar, rollar va nashr jarayoni. WordPress eng ommabop, Joomla va Drupal murakkab portallar uchun kuchli.',
    'Headless CMS kontentni API orqali beradi va zamonaviy front-end freymvorklar bilan birlashtiriladi; statik sayt generatorlari esa bazasiz tez saytlar yaratadi. Har qanday CMS muntazam yangilash va xavfsizlik choralarini talab qiladi.'
  ],
  glossary: [
    ['CMS', 'Sayt kontentini boshqarish tizimi.'],
    ['Mavzu (theme)', 'Sayt ko‘rinishini belgilovchi shablonlar to‘plami.'],
    ['Plagin', 'CMS ga yangi funksiya qo‘shuvchi kengaytma.'],
    ['WYSIWYG', '«Nimani ko‘rsang, shuni olasan» — vizual matn muharriri.'],
    ['Headless CMS', 'Taqdimot qismisiz, kontentni API orqali beruvchi CMS.'],
    ['SSG', 'Oldindan statik HTML sahifalarni yig‘uvchi generator.'],
    ['Hook', 'Yadro kodini o‘zgartirmasdan unga o‘z kodini ulash nuqtasi.']
  ],
  questions: [
    'CMS qanday muammoni hal qiladi?',
    'CMS ning asosiy vazifalarini sanab bering.',
    'Mavzu va plaginning farqi nimada?',
    'Hook mexanizmi nima uchun kerak?',
    'WordPress ning afzallik va kamchiliklari qanday?',
    'Drupal qanday loyihalar uchun tanlanadi?',
    'Headless CMS an’anaviy CMS dan qanday farq qiladi?',
    'Statik sayt generatorlarining afzalliklari nimada?',
    'CMS tanlashda qanday mezonlarga e’tibor berasiz?',
    'CMS asosidagi saytni xavfsiz saqlash uchun qanday choralar ko‘riladi?'
  ]
};
