/* M14. Veb tizimlar xavfsizligi: XSS, CSRF, SQL Injection. */
const xssHtml = '<input id="comment" value="<img src=x onerror=&quot;console.log(\'XSS: kod bajarildi!\')&quot;>" size="60">\n<button id="unsafe">innerHTML (xavfli)</button>\n<button id="safe">textContent (xavfsiz)</button>\n<div id="out" style="margin-top:12px;padding:8px;border:1px dashed #999"></div>';
const xssJs = "const input = document.querySelector('#comment');\nconst out = document.querySelector('#out');\n\ndocument.querySelector('#unsafe').addEventListener('click', () => {\n  out.innerHTML = input.value;      // ❌ matn HTML sifatida talqin qilinadi\n});\n\ndocument.querySelector('#safe').addEventListener('click', () => {\n  out.textContent = input.value;    // ✅ matn matnligicha qoladi\n});";

export default {
  id: 'm14',
  number: 14,
  title: 'Veb tizimlar xavfsizligi: XSS, CSRF, SQL Injection',
  summary: 'Asosiy veb-hujumlar mexanizmi va ulardan himoyalanish: ekranlash, CSP, CSRF-token, parametrlangan so‘rovlar.',
  literature: [4],
  goals: [
    'Veb-ilovalar xavfsizligining asosiy tamoyillari va OWASP Top 10 bilan tanishish.',
    'XSS hujumi turlari va himoya usullarini o‘rganish.',
    'CSRF hujumi mexanizmi va himoya usullarini tushunish.',
    'SQL injection va boshqa inyeksiya hujumlaridan himoyalanishni bilish.'
  ],
  keywords: ['OWASP', 'XSS', 'stored XSS', 'reflected XSS', 'DOM XSS', 'ekranlash', 'CSP', 'CSRF', 'CSRF-token', 'SameSite', 'SQL injection', 'prepared statement', 'eng kam imtiyoz', 'HTTPS'],
  practicals: ['a6'],
  lessons: ['js-forms'],
  sections: [
    {
      title: 'Veb xavfsizligi asoslari',
      blocks: [
        { lead: 'Veb-ilova ochiq Internetda ishlaydi: har qanday odam unga istalgan so‘rovni yubora oladi. Shuning uchun asosiy qoida — **foydalanuvchidan kelgan hech bir ma’lumotga ishonmang**.' },
        'Foydalanuvchi ma’lumoti faqat forma maydonlari emas: URL parametrlari, sarlavhalar, cookie lar, yuklangan fayllar, hatto boshqa API lardan kelgan javoblar ham.',
        { h: 'Xavfsizlik tamoyillari' },
        { ul: [
          '**Chuqur himoya (defense in depth)**: bir necha qatlam himoya — biri o‘tkazib yuborsa, boshqasi ushlaydi.',
          '**Eng kam imtiyoz**: har bir foydalanuvchi va servis faqat zarur huquqlarga ega.',
          '**Standart holatda xavfsiz**: yangi funksiya yopiq holatda boshlanadi.',
          '**Kirishda tekshir, chiqishda ekranla**: ma’lumot qabul qilinganda validatsiya, chiqarilganda kontekstga mos ekranlash.'
        ] },
        { h: 'OWASP Top 10' },
        '**OWASP** — veb xavfsizligi bo‘yicha xalqaro notijorat hamjamiyat. Uning **Top 10** ro‘yxati eng xavfli zaifliklar toifalarini jamlaydi: kirish nazoratidagi xatolar, kriptografik xatolar, inyeksiyalar (SQL, XSS), noto‘g‘ri sozlash, zaif komponentlar, autentifikatsiya xatolari va boshqalar. Ushbu ma’ruzada eng klassik uchtasini ko‘rib chiqamiz.'
      ]
    },
    {
      title: 'XSS — saytlararo skripting',
      blocks: [
        '**XSS** (Cross-Site Scripting) — tajovuzkor o‘z JavaScript kodini boshqa foydalanuvchilar ko‘radigan sahifaga kiritishi. Kod jabrlanuvchi brauzerida sayt nomidan bajariladi: sessiyani o‘g‘irlashi, sahifani o‘zgartirishi, foydalanuvchi nomidan amallar bajarishi mumkin.',
        { table: { head: ['Turi', 'Mexanizm', 'Misol'], rows: [
          ['Saqlanadigan (stored)', 'Zararli kod bazaga yoziladi va har bir ko‘ruvchiga chiqariladi', 'Izoh yoki profil nomida `<script>`'],
          ['Aks etuvchi (reflected)', 'Kod URL parametrida keladi va darhol javobga qaytariladi', '`/search?q=<script>…</script>` havolasi'],
          ['DOM asosidagi', 'Klient JS o‘zi ishonchsiz ma’lumotni DOM ga xavfli usulda yozadi', '`el.innerHTML = location.hash`']
        ] } },
        'Quyidagi misolda maydondagi matn `innerHTML` bilan qo‘yilsa, rasm teglaridagi `onerror` kodi bajariladi (konsolga qarang). `textContent` bilan esa u oddiy matn bo‘lib qoladi:',
        { code: xssJs, lang: 'js', run: { html: xssHtml, js: xssJs } },
        { h: 'XSS dan himoya' },
        { ol: [
          '**Chiqishda ekranlash**: `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`. Zamonaviy shablonizatorlar (Blade `{{ }}`, Django `{{ }}`, Vue `{{ }}`, React JSX) buni avtomatik bajaradi.',
          'JavaScriptda `innerHTML` o‘rniga `textContent`; Vue da `v-html`, React da `dangerouslySetInnerHTML` dan faqat tozalangan (sanitize) HTML bilan foydalaning (masalan, DOMPurify).',
          '**Content Security Policy (CSP)** sarlavhasi — brauzerga faqat ruxsat etilgan manbalardan skript yuklashni buyuradi.',
          'Sessiya cookie siga `HttpOnly` — JavaScript uni o‘qiy olmaydi.',
          'Kirishda validatsiya: masalan, ism maydonida faqat harflar.'
        ] },
        { code: "Content-Security-Policy: default-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'", lang: 'http', title: 'CSP sarlavhasi' }
      ]
    },
    {
      title: 'CSRF — saytlararo so‘rovni soxtalashtirish',
      blocks: [
        '**CSRF** (Cross-Site Request Forgery) — tajovuzkor foydalanuvchini o‘zi sezmagan holda, u tizimga kirgan saytga so‘rov yuborishga majbur qilishi. Brauzer bank saytiga so‘rovga cookie ni **avtomatik** qo‘shgani uchun, server so‘rovni haqiqiy foydalanuvchidan deb qabul qiladi.',
        { code: '<!-- yomon-sayt.uz sahifasida yashirin forma -->\n<form action="https://bank.uz/transfer" method="POST" id="f">\n  <input type="hidden" name="to" value="tajovuzkor_hisobi">\n  <input type="hidden" name="amount" value="5000000">\n</form>\n<script>document.getElementById(\'f\').submit();</script>', lang: 'html', title: 'Hujum misoli (faqat tushunish uchun)' },
        { ol: [
          'Foydalanuvchi `bank.uz` ga kirgan, brauzerda sessiya cookie si bor.',
          'U boshqa oynada tajovuzkor sahifasini ochadi.',
          'Sahifa avtomatik ravishda `bank.uz/transfer` ga POST so‘rov yuboradi.',
          'Brauzer so‘rovga bank cookie sini qo‘shadi — server pul o‘tkazmasini bajaradi.'
        ] },
        { h: 'CSRF dan himoya' },
        { ul: [
          '**CSRF-token**: server har bir formaga tasodifiy, sessiyaga bog‘langan token qo‘yadi va POST so‘rovda tekshiradi. Tajovuzkor sahifasi bu tokenni bila olmaydi. Laravel (`@csrf`), Django (`{% csrf_token %}`) buni standart holatda qiladi.',
          '**`SameSite` cookie atributi**: `SameSite=Lax` yoki `Strict` — cookie boshqa saytdan boshlangan so‘rovlarga qo‘shilmaydi.',
          'Holatni o‘zgartiruvchi amallarni **hech qachon GET** bilan bajarmang (`/delete?id=5` havolasi xavfli).',
          'Muhim amallar uchun qayta tasdiqlash: parol, SMS-kod.',
          'Token asosidagi API (`Authorization: Bearer …` sarlavhasi) CSRF ga kamroq moyil, chunki brauzer sarlavhani avtomatik qo‘shmaydi.'
        ] },
        { code: '<form method="POST" action="/profile">\n  @csrf   {{-- <input type="hidden" name="_token" value="k8Jd…"> --}}\n  <input name="email">\n  <button>Saqlash</button>\n</form>', lang: 'html', title: 'Laravel Blade' },
        { code: 'Set-Cookie: session=ab12…; Path=/; Secure; HttpOnly; SameSite=Lax', lang: 'http', title: 'Xavfsiz sessiya cookie si' }
      ]
    },
    {
      title: 'SQL injection',
      blocks: [
        '**SQL injection** — foydalanuvchi ma’lumoti SQL so‘rov matniga to‘g‘ridan-to‘g‘ri ulanganda, tajovuzkor so‘rov mantig‘ini o‘zgartirishi. Oqibatlari: autentifikatsiyani chetlab o‘tish, butun bazani o‘g‘irlash, ma’lumotlarni o‘chirish.',
        { code: "// Server kodi (XAVFLI)\nconst sql = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`;\n\n// Tajovuzkor login maydoniga yozadi:   admin' --\n// Natijaviy so‘rov:\nSELECT * FROM users WHERE login = 'admin' --' AND password = '...'\n//                                         └── qolgani izohga aylandi: parol tekshirilmaydi!", lang: 'js' },
        { code: "' OR '1'='1              → shart doim rost: barcha yozuvlar\n'; DROP TABLE users; --   → jadvalni o‘chirish (ko‘p so‘rovga ruxsat bo‘lsa)\n' UNION SELECT card_number, cvv FROM cards --  → boshqa jadvaldan o‘qish", lang: 'text', title: 'Tipik zararli kiritmalar' },
        { h: 'SQL injection dan himoya' },
        { ol: [
          '**Parametrlangan so‘rovlar** (prepared statements) — asosiy va majburiy himoya (M11).',
          'ORM va query builder lardan to‘g‘ri foydalanish (xom SQL qismlariga ham parametr berish).',
          'Kiruvchi ma’lumotni validatsiya qilish: `id` — faqat butun son.',
          'Ilova baza foydalanuvchisiga eng kam huquq: `DROP` huquqi bo‘lmasin.',
          'Xato xabarlarida SQL matnini ko‘rsatmaslik.'
        ] },
        { code: "// ✅ Node.js\nawait pool.execute('SELECT * FROM users WHERE login = ?', [login]);\n\n// ✅ PHP PDO\n$stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');\n$stmt->execute(['login' => $login]);\n\n# ✅ Django ORM\nUser.objects.filter(login=login)", lang: 'text' },
        { note: 'Xuddi shu tamoyil boshqa inyeksiyalarga ham tegishli: OS buyruqlari (`exec`), NoSQL so‘rovlari (`{ $gt: "" }`), LDAP, shablonlar. Ma’lumot va kod hech qachon bir satrga aralashtirilmaydi.' }
      ]
    },
    {
      title: 'Boshqa muhim zaifliklar va xavfsizlik amaliyoti',
      blocks: [
        { table: { head: ['Zaiflik', 'Mohiyati', 'Himoya'], rows: [
          ['IDOR (kirish nazorati xatosi)', '`/invoices/1001` ni `1002` ga o‘zgartirib, birovning hujjatini ko‘rish', 'Har bir so‘rovda resurs egasini tekshirish'],
          ['Zaif autentifikatsiya', 'Oddiy parollar, cheklovsiz urinishlar', 'Xeshlash, urinishlarni cheklash, 2FA (M15)'],
          ['Fayl yuklash', 'Rasm o‘rniga `.php` skript yuklash', 'Tur va hajmni tekshirish, faylni veb-ildizdan tashqarida saqlash'],
          ['Clickjacking', 'Saytni ko‘rinmas `iframe` ga joylab, foydalanuvchini aldab bosdirish', '`X-Frame-Options: DENY`, CSP `frame-ancestors`'],
          ['Noto‘g‘ri sozlash', 'Production da `debug=true`, ochiq `.env`, standart parollar', 'Konfiguratsiyani tekshirish ro‘yxati'],
          ['Eskirgan paketlar', 'Ma’lum zaifligi bor kutubxonalar', '`npm audit`, `composer audit`, Dependabot']
        ] } },
        { h: 'Himoya sarlavhalari' },
        { code: 'Strict-Transport-Security: max-age=31536000; includeSubDomains\nContent-Security-Policy: default-src \'self\'\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY\nReferrer-Policy: strict-origin-when-cross-origin', lang: 'http' },
        { h: 'Dasturchi uchun tekshirish ro‘yxati' },
        { ul: [
          'Barcha so‘rovlar parametrlangan.',
          'Barcha chiqish shablonizator orqali ekranlangan.',
          'Barcha POST/PUT/DELETE formalar CSRF-token bilan.',
          'Har bir endpointda autentifikatsiya va huquq tekshiruvi.',
          'Maxfiy kalitlar `.env` da, repozitoriyda emas.',
          'HTTPS va xavfsizlik sarlavhalari yoqilgan.',
          'Paketlar muntazam yangilanadi va audit qilinadi.'
        ] },
        { warn: 'Ushbu ma’ruzadagi hujum usullari faqat himoyani tushunish uchun keltirilgan. Birovning tizimini ruxsatsiz sinash O‘zbekiston Respublikasi qonunchiligiga ko‘ra jinoyat hisoblanadi. Mashq qilish uchun maxsus o‘quv muhitlaridan (OWASP Juice Shop, DVWA) foydalaning.' }
      ]
    }
  ],
  conclusion: [
    'Veb xavfsizligining asosi — foydalanuvchi ma’lumotiga ishonmaslik: kirishda validatsiya, chiqishda ekranlash, so‘rovlarda parametrlash.',
    'XSS ga qarshi ekranlash, `textContent` va CSP; CSRF ga qarshi token va `SameSite` cookie; SQL injection ga qarshi parametrlangan so‘rovlar va eng kam imtiyoz. Zamonaviy freymvorklar bu himoyalarni standart holatda beradi — ularni o‘chirmaslik kerak.'
  ],
  glossary: [
    ['OWASP', 'Veb-ilovalar xavfsizligi bo‘yicha xalqaro ochiq hamjamiyat.'],
    ['XSS', 'Sahifaga begona skript kiritib, boshqa foydalanuvchi brauzerida bajarish hujumi.'],
    ['CSRF', 'Foydalanuvchi nomidan uning bilmagan holda so‘rov yuborish hujumi.'],
    ['SQL injection', 'Ma’lumot orqali SQL so‘rov tuzilishini o‘zgartirish hujumi.'],
    ['Ekranlash (escaping)', 'Maxsus belgilarni xavfsiz ko‘rinishga o‘tkazish.'],
    ['CSP', 'Brauzerga ruxsat etilgan kontent manbalarini bildiruvchi sarlavha.'],
    ['CSRF-token', 'Forma yuborilishining haqiqiyligini tasdiqlovchi tasodifiy qiymat.']
  ],
  questions: [
    'Nima uchun foydalanuvchidan kelgan ma’lumotga ishonib bo‘lmaydi? Bunday ma’lumot manbalarini sanang.',
    'XSS ning uch turini tushuntiring.',
    '`innerHTML` va `textContent` ning xavfsizlik nuqtai nazaridan farqi nimada?',
    'CSP qanday himoya beradi?',
    'CSRF hujumi qanday bosqichlarda amalga oshadi?',
    'CSRF-token nima uchun tajovuzkorga noma’lum bo‘ladi?',
    '`SameSite`, `HttpOnly`, `Secure` cookie atributlari nima qiladi?',
    '`admin\' --` kiritmasi qanday qilib parol tekshiruvini chetlab o‘tadi?',
    'SQL injection dan himoyaning asosiy usuli qaysi?',
    'IDOR zaifligi nima va u qanday oldini olinadi?'
  ]
};
