/* M2. Vebning asosiy texnologiyalari: HTTP, URL, DNS. */
export default {
  id: 'm2',
  number: 2,
  title: 'Vebning asosiy texnologiyalari: HTTP, URL, DNS',
  summary: 'Manzil qanday tuziladi, domen qanday IP ga aylanadi va brauzer server bilan qanday «gaplashadi».',
  literature: [1],
  goals: [
    'URL manzilining tarkibiy qismlarini aniqlashni o‘rganish.',
    'DNS tizimining ishlash tamoyilini va yozuv turlarini tushunish.',
    'HTTP so‘rov va javobining tuzilishini, metodlar va holat kodlarini bilish.',
    'HTTPS va HTTP versiyalari (1.1, 2, 3) orasidagi farqlarni tushunish.'
  ],
  keywords: ['URL', 'URI', 'domen', 'IP-manzil', 'DNS', 'TCP/IP', 'HTTP', 'HTTPS', 'TLS', 'so‘rov', 'javob', 'sarlavha', 'holat kodi', 'cookie'],
  practicals: ['a7'],
  lessons: ['html-links', 'js-fetch'],
  sections: [
    {
      title: 'Tarmoq asoslari: IP-manzil, port, TCP/IP',
      blocks: [
        'Internetdagi har bir qurilma **IP-manzilga** ega. IPv4 manzil to‘rtta 0–255 oralig‘idagi sondan iborat (`185.8.212.34`), IPv6 esa 128 bitli (`2001:db8::1`). IPv4 manzillar yetishmagani sababli IPv6 ga bosqichma-bosqich o‘tilmoqda.',
        'Bitta serverda bir nechta xizmat ishlashi mumkin, ularni **port** raqami ajratib turadi: HTTP — 80, HTTPS — 443, SSH — 22, MySQL — 3306.',
        { table: { head: ['TCP/IP qatlami', 'Vazifasi', 'Protokollar'], rows: [
          ['Amaliy (Application)', 'Ilovalar ma’lumot almashadi', 'HTTP, DNS, SMTP, FTP, SSH'],
          ['Transport', 'Ma’lumotni ishonchli yoki tez yetkazish', 'TCP, UDP, QUIC'],
          ['Tarmoq (Internet)', 'Paketlarni manzilga yo‘naltirish', 'IP, ICMP'],
          ['Kanal (Link)', 'Fizik muhitda uzatish', 'Ethernet, Wi-Fi']
        ] } },
        '**TCP** ma’lumot yo‘qolmasdan va tartib bilan yetib borishini kafolatlaydi (ulanish «uch tomonlama qo‘l siqish» bilan o‘rnatiladi). **UDP** tezroq, lekin kafolatsiz — video qo‘ng‘iroqlar va DNS so‘rovlari uchun qulay.'
      ]
    },
    {
      title: 'URL — resurs manzili',
      blocks: [
        '**URL** (Uniform Resource Locator) — Internetdagi resursning yagona manzili. U resurs *qayerda* joylashgani va unga *qanday* murojaat qilish kerakligini ko‘rsatadi.',
        { code: 'https://user:pass@www.ubs.uz:443/news/list.php?year=2026&page=2#comments\n└─┬─┘   └───┬───┘ └────┬───┘ └┬┘ └──────┬──────┘ └────────┬────────┘ └───┬───┘\nsxema  foydalanuvchi   host   port      yo‘l            so‘rov (query)      fragment', lang: 'text', title: 'URL tuzilishi' },
        { table: { head: ['Qism', 'Vazifasi'], rows: [
          ['Sxema (protokol)', '`http`, `https`, `ftp`, `mailto`, `tel`, `file` — resursga qanday murojaat qilish.'],
          ['Host', 'Domen nomi yoki IP-manzil.'],
          ['Port', 'Ko‘rsatilmasa, sxema bo‘yicha standart port olinadi (https → 443).'],
          ['Yo‘l (path)', 'Serverdagi resurs manzili: `/news/list.php`.'],
          ['So‘rov qatori (query)', '`?kalit=qiymat&kalit2=qiymat2` — serverga parametrlar.'],
          ['Fragment', '`#comments` — sahifa ichidagi joy; serverga yuborilmaydi.']
        ] } },
        { h: 'URL kodlash (percent-encoding)' },
        'URL da faqat ASCII belgilar ruxsat etiladi. Bo‘sh joy, kirill yoki maxsus belgilar `%` va ikki o‘n oltilik raqam bilan kodlanadi: bo‘sh joy → `%20`, `ў` → `%D1%9E`. JavaScriptda buning uchun `encodeURIComponent()` ishlatiladi.',
        { code: "const url = new URL('https://example.com/search?q=veb tizimlari&page=2');\nconsole.log(url.hostname);            // example.com\nconsole.log(url.pathname);            // /search\nconsole.log(url.searchParams.get('q')); // veb tizimlari\nconsole.log(url.href);                // ...search?q=veb+tizimlari&page=2", lang: 'js', run: true },
        { h: 'Mutlaq va nisbiy URL' },
        { ul: [
          '**Mutlaq**: `https://ubs.uz/about.html` — to‘liq manzil.',
          '**Ildizga nisbiy**: `/images/logo.png` — joriy saytning ildizidan.',
          '**Nisbiy**: `images/logo.png`, `../index.html` — joriy sahifaga nisbatan.'
        ] }
      ]
    },
    {
      title: 'DNS — domen nomlari tizimi',
      blocks: [
        'Kompyuterlar IP-manzillar bilan ishlaydi, odamlar esa nomlarni yaxshi eslab qoladi. **DNS** (Domain Name System) domen nomini IP-manzilga aylantiruvchi taqsimlangan «telefon kitobi»dir.',
        { h: 'Domen ierarxiyasi' },
        { code: '                 . (ildiz)\n        ┌────────┼─────────┐\n       uz       com       org        ← yuqori darajali domenlar (TLD)\n    ┌───┴───┐     │\n   ubs     gov   google              ← ikkinchi daraja\n    │       │\n   www      my                       ← subdomenlar', lang: 'text', title: 'Domenlar daraxti' },
        { h: 'Nomni aniqlash (resolving) jarayoni' },
        { ol: [
          'Brauzer o‘z keshini, so‘ng operatsion tizim keshini va `hosts` faylini tekshiradi.',
          'Topilmasa, so‘rov provayderning **rekursiv DNS serveriga** yuboriladi.',
          'Rekursiv server **ildiz serverdan** `.uz` zonasi uchun mas’ul serverni so‘raydi.',
          '`.uz` **TLD serveri** `ubs.uz` ning **avtoritativ serverini** ko‘rsatadi.',
          'Avtoritativ server yakuniy IP-manzilni qaytaradi.',
          'Javob TTL (yashash vaqti) davomida keshlanadi va brauzerga beriladi.'
        ] },
        { h: 'Asosiy DNS yozuvlari' },
        { table: { head: ['Yozuv', 'Vazifasi', 'Misol'], rows: [
          ['A', 'Domen → IPv4', '`ubs.uz → 185.8.212.34`'],
          ['AAAA', 'Domen → IPv6', '`ubs.uz → 2a00:…`'],
          ['CNAME', 'Taxallus: bir nom boshqasiga ishora qiladi', '`www.ubs.uz → ubs.uz`'],
          ['MX', 'Pochta serveri', '`ubs.uz → mail.ubs.uz`'],
          ['TXT', 'Matnli ma’lumot (SPF, domen tasdiqlash)', '`v=spf1 …`'],
          ['NS', 'Zonaga mas’ul DNS serverlar', '`ns1.hosting.uz`']
        ] } },
        { code: '$ nslookup ubs.uz\n$ dig ubs.uz A +short\n$ ping ubs.uz', lang: 'bash', title: 'Terminalda tekshirish' },
        { tip: 'Yangi sayt joylashtirilganda DNS o‘zgarishi darhol hamma joyga yetib bormaydi — eski yozuvlar TTL tugaguncha keshlarda saqlanadi. Bu «DNS propagatsiyasi» deb ataladi.' }
      ]
    },
    {
      title: 'HTTP protokoli: so‘rov va javob',
      blocks: [
        '**HTTP** (HyperText Transfer Protocol) — klient va server o‘rtasida matnli xabarlar almashish protokoli. U **holatsiz** (stateless): har bir so‘rov mustaqil, server oldingi so‘rovni «eslamaydi». Holatni saqlash uchun cookie, sessiya va tokenlardan foydalaniladi (M15).',
        { h: 'So‘rov (request) tuzilishi' },
        { code: 'GET /news?page=2 HTTP/1.1\nHost: www.ubs.uz\nUser-Agent: Mozilla/5.0 (Macintosh) Chrome/130\nAccept: text/html\nAccept-Language: uz,ru;q=0.8\nCookie: session=ab12cd34\n\n', lang: 'http', title: 'HTTP so‘rov' },
        { ul: [
          '**Boshlang‘ich qator**: metod, yo‘l va protokol versiyasi.',
          '**Sarlavhalar** (headers): `Kalit: qiymat` ko‘rinishida qo‘shimcha ma’lumot.',
          'Bo‘sh qator, so‘ng ixtiyoriy **tana** (body) — masalan, forma ma’lumotlari yoki JSON.'
        ] },
        { h: 'Javob (response) tuzilishi' },
        { code: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nContent-Length: 5120\nCache-Control: max-age=600\nSet-Cookie: theme=dark; Path=/; HttpOnly\n\n<!doctype html>\n<html>…</html>', lang: 'http', title: 'HTTP javob' },
        { h: 'HTTP metodlari' },
        { table: { head: ['Metod', 'Vazifasi', 'Xavfsiz', 'Idempotent'], rows: [
          ['GET', 'Resursni olish', 'ha', 'ha'],
          ['POST', 'Yangi resurs yaratish, ma’lumot yuborish', 'yo‘q', 'yo‘q'],
          ['PUT', 'Resursni to‘liq almashtirish', 'yo‘q', 'ha'],
          ['PATCH', 'Resursni qisman o‘zgartirish', 'yo‘q', 'yo‘q'],
          ['DELETE', 'Resursni o‘chirish', 'yo‘q', 'ha'],
          ['HEAD', 'Faqat sarlavhalarni olish', 'ha', 'ha'],
          ['OPTIONS', 'Ruxsat etilgan metodlarni bilish (CORS)', 'ha', 'ha']
        ] } },
        { note: '**Xavfsiz** metod serverdagi ma’lumotni o‘zgartirmaydi. **Idempotent** metodni bir necha marta takrorlash bir marta bajarish bilan bir xil natija beradi.' }
      ]
    },
    {
      title: 'Holat kodlari va sarlavhalar',
      blocks: [
        'Javobning birinchi qatoridagi uch xonali son — **holat kodi** (status code). Birinchi raqam kod guruhini bildiradi.',
        { table: { head: ['Guruh', 'Ma’nosi', 'Ko‘p uchraydigan kodlar'], rows: [
          ['1xx', 'Axborot', '`101 Switching Protocols` (WebSocket)'],
          ['2xx', 'Muvaffaqiyat', '`200 OK`, `201 Created`, `204 No Content`'],
          ['3xx', 'Yo‘naltirish', '`301 Moved Permanently`, `302 Found`, `304 Not Modified`'],
          ['4xx', 'Klient xatosi', '`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422`, `429 Too Many Requests`'],
          ['5xx', 'Server xatosi', '`500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`']
        ] } },
        { h: 'Muhim sarlavhalar' },
        { terms: [
          ['Content-Type', 'Tana formati: `text/html`, `application/json`, `image/png`.'],
          ['Content-Length', 'Tana hajmi baytlarda.'],
          ['Cache-Control', 'Keshlash qoidalari: `no-store`, `max-age=3600`.'],
          ['Location', 'Yo‘naltirishda yangi manzil (3xx bilan).'],
          ['Set-Cookie / Cookie', 'Server cookie o‘rnatadi / brauzer uni qaytaradi.'],
          ['Authorization', 'Autentifikatsiya ma’lumoti: `Bearer <token>`.'],
          ['Access-Control-Allow-Origin', 'CORS: qaysi saytlar ushbu resursga JavaScript orqali murojaat qila oladi.']
        ] },
        { h: 'DevTools da kuzatish' },
        'Brauzerda F12 → **Network** bo‘limini oching va sahifani yangilang. Har bir qatorda bitta so‘rov: uning metodi, holat kodi, turi, hajmi va vaqti. Qatorni bossangiz, to‘liq sarlavhalar va javob tanasini ko‘rasiz.',
        { code: "fetch('https://jsonplaceholder.typicode.com/posts/1')\n  .then((response) => {\n    console.log('Holat:', response.status, response.statusText);\n    console.log('Turi:', response.headers.get('content-type'));\n    return response.json();\n  })\n  .then((data) => console.log(data.title));", lang: 'js' }
      ]
    },
    {
      title: 'HTTPS va HTTP versiyalari',
      blocks: [
        '**HTTPS** — HTTP ning **TLS** shifrlash qatlami ustidan ishlaydigan xavfsiz varianti. U uch narsani ta’minlaydi: **maxfiylik** (ma’lumotni o‘g‘irlab o‘qib bo‘lmaydi), **yaxlitlik** (yo‘lda o‘zgartirib bo‘lmaydi) va **autentifikatsiya** (sertifikat server haqiqatan o‘sha domen ekanini tasdiqlaydi).',
        { ol: [
          'Brauzer TLS ulanishini boshlaydi va qo‘llab-quvvatlanadigan shifrlarni yuboradi.',
          'Server o‘z **sertifikatini** (ochiq kalit + sertifikatlash markazi imzosi) yuboradi.',
          'Brauzer sertifikatni tekshiradi (muddati, domeni, imzosi).',
          'Tomonlar umumiy seans kalitini kelishib oladi; keyingi barcha ma’lumot simmetrik shifrlanadi.'
        ] },
        { tip: 'Bugun bepul sertifikatni **Let’s Encrypt** orqali olish mumkin. Brauzerlar HTTP saytlarni «Xavfsiz emas» deb belgilaydi, ko‘plab API lar (geolokatsiya, kamera, Service Worker) faqat HTTPS da ishlaydi.' },
        { table: { head: ['Versiya', 'Yil', 'Asosiy yangilik'], rows: [
          ['HTTP/0.9', '1991', 'Faqat `GET`, faqat HTML'],
          ['HTTP/1.0', '1996', 'Sarlavhalar, holat kodlari, turli fayl turlari'],
          ['HTTP/1.1', '1997', 'Doimiy ulanish (keep-alive), `Host` sarlavhasi, keshlash'],
          ['HTTP/2', '2015', 'Ikkilik format, multiplekslash (bitta ulanishda ko‘p so‘rov), sarlavhalarni siqish'],
          ['HTTP/3', '2022', 'UDP asosidagi QUIC protokoli — tezroq ulanish, paket yo‘qolishiga chidamli']
        ] } }
      ]
    }
  ],
  conclusion: [
    'Brauzer sahifani ochishi uchun URL tahlil qilinadi, DNS orqali IP-manzil topiladi, TCP/TLS ulanish o‘rnatiladi va HTTP so‘rov yuboriladi. Server holat kodi, sarlavhalar va tanadan iborat javob qaytaradi.',
    'HTTP holatsiz protokol; metodlar amalning mazmunini, holat kodlari natijasini bildiradi. Zamonaviy vebda HTTPS majburiy standartga aylangan.'
  ],
  glossary: [
    ['IP-manzil', 'Tarmoqdagi qurilmaning raqamli manzili.'],
    ['Port', 'Bir kompyuterdagi turli tarmoq xizmatlarini ajratuvchi raqam.'],
    ['URL', 'Resursning joylashuvi va unga murojaat usulini ko‘rsatuvchi manzil.'],
    ['DNS', 'Domen nomlarini IP-manzillarga aylantiruvchi taqsimlangan tizim.'],
    ['TTL', 'DNS javobi keshda saqlanadigan vaqt.'],
    ['HTTP', 'Klient va server o‘rtasida gipermatn almashish protokoli.'],
    ['Holat kodi', 'Javob natijasini bildiruvchi uch xonali son.'],
    ['TLS', 'Tarmoq ulanishini shifrlovchi protokol; HTTPS asosi.']
  ],
  questions: [
    'IPv4 va IPv6 manzillarning farqi nimada?',
    'URL qanday qismlardan iborat? Har biriga misol keltiring.',
    'Fragment (`#…`) serverga yuboriladimi? Nima uchun?',
    'DNS orqali domen nomini aniqlash bosqichlarini tushuntiring.',
    'A, CNAME va MX yozuvlarining vazifasi nima?',
    'HTTP so‘rov va javob qanday tuzilgan?',
    'GET va POST metodlarining farqi nimada?',
    '401 va 403 holat kodlarining farqini tushuntiring.',
    'HTTPS qanday uch xavfsizlik kafolatini beradi?',
    'HTTP/2 va HTTP/3 ning HTTP/1.1 dan asosiy afzalliklari nimada?'
  ]
};
