/* M18. Zamonaviy veb arxitekturalari: Microservices, Serverless. */
export default {
  id: 'm18',
  number: 18,
  title: 'Zamonaviy veb arxitekturalari: Microservices, Serverless',
  summary: 'Monolit, mikroservislar, serverless, JAMstack, hodisalarga asoslangan arxitektura va ularni tanlash.',
  literature: [2],
  goals: [
    'Monolit arxitekturaning afzallik va cheklovlarini tushunish.',
    'Mikroservislar arxitekturasi, servislar aloqasi va API Gateway ni bilish.',
    'Serverless (FaaS) modeli va uning qo‘llanish sohalarini o‘rganish.',
    'Arxitekturani loyiha talablariga qarab tanlashni o‘rganish.'
  ],
  keywords: ['arxitektura', 'monolit', 'modulli monolit', 'mikroservis', 'API Gateway', 'service discovery', 'xabarlar navbati', 'event-driven', 'serverless', 'FaaS', 'BaaS', 'cold start', 'JAMstack', 'edge'],
  practicals: [],
  lessons: [],
  sections: [
    {
      title: 'Monolit arxitektura',
      blocks: [
        { lead: 'Monolit — butun ilova (interfeys, biznes-mantiq, ma’lumotlarga kirish) bitta kod bazasi va bitta joylashtiriladigan birlik sifatida ishlaydigan arxitektura. Aksariyat tizimlar aynan monolit sifatida boshlanadi — va bu to‘g‘ri.' },
        { code: '┌──────────────── Monolit ilova ────────────────┐\n│  Foydalanuvchilar │ Kurslar │ Baholar │ To‘lovlar │\n│──────────────────────────────────────────────────│\n│           umumiy kod, bitta jarayon              │\n└───────────────────────┬──────────────────────────┘\n                        ▼\n                 Bitta ma’lumotlar bazasi', lang: 'text' },
        { table: { head: ['Afzalliklari', 'Cheklovlari (tizim o‘sganda)'], rows: [
          ['Ishlab chiqish, sinash, joylashtirish oddiy', 'Kod bazasi kattalashib, o‘zgartirish qiyinlashadi'],
          ['Bitta tranzaksiya — ma’lumot yaxlitligi oson', 'Kichik o‘zgarish uchun butun ilovani qayta joylashtirish'],
          ['Tarmoq kechikishi yo‘q — funksiya chaqiruvi', 'Faqat bitta qismni masshtablab bo‘lmaydi'],
          ['Kichik jamoa uchun ideal', 'Bitta xato butun tizimni to‘xtatishi mumkin'],
          ['Debugging va monitoring oson', 'Bitta texnologiyaga bog‘lanib qolish']
        ] } },
        { tip: '**Modulli monolit** — oraliq yechim: bitta ilova, lekin qat’iy ajratilgan modullar (har birining o‘z interfeysi va jadvallari). Keyinchalik kerak bo‘lsa, modulni alohida servisga ajratish oson.' }
      ]
    },
    {
      title: 'Mikroservislar arxitekturasi',
      blocks: [
        '**Mikroservislar** — ilovani kichik, mustaqil joylashtiriladigan servislarga bo‘lish. Har bir servis bitta biznes-imkoniyatga javob beradi, o‘z ma’lumotlar bazasiga ega va boshqalar bilan API yoki xabarlar orqali aloqa qiladi. Netflix, Amazon, Uber, Uzum kabi yirik tizimlar shu arxitekturada.',
        { code: '                    Mijozlar (veb, mobil)\n                            │\n                     ┌──────▼──────┐\n                     │ API Gateway │  autentifikatsiya, marshrut, limit\n                     └──┬───┬───┬──┘\n          ┌─────────────┘   │   └─────────────┐\n   ┌──────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐\n   │ Users servisi│  │ Courses servisi│ │ Payments servisi│\n   │  (Node.js)  │  │   (Python)    │  │    (Go)       │\n   └──────┬──────┘  └───────┬──────┘  └───────┬──────┘\n       PostgreSQL        MongoDB          PostgreSQL\n          └──────── Xabarlar brokeri (Kafka / RabbitMQ) ────────┘', lang: 'text', title: 'Mikroservislar' },
        { h: 'Asosiy tamoyillar' },
        { ul: [
          '**Yagona mas’uliyat**: servis bitta biznes-sohani qamraydi (domain-driven design dagi «chegaralangan kontekst»).',
          '**Har bir servisga — o‘z bazasi**: boshqa servis bazasiga to‘g‘ridan-to‘g‘ri kirish yo‘q.',
          '**Mustaqil joylashtirish**: bitta servisni boshqalarni to‘xtatmasdan yangilash.',
          '**Texnologik erkinlik**: har bir servis o‘ziga mos til va bazani tanlashi mumkin.',
          '**Nosozlikka chidamlilik**: bitta servis qulasa, qolganlari ishlashda davom etadi.'
        ] },
        { h: 'Servislar o‘rtasidagi aloqa' },
        { table: { head: ['Usul', 'Texnologiya', 'Qachon'], rows: [
          ['Sinxron so‘rov', 'REST, gRPC', 'Darhol javob kerak: «foydalanuvchi ma’lumotini ber»'],
          ['Asinxron xabarlar', 'RabbitMQ, Apache Kafka, NATS', 'Javob kutish shart emas: «buyurtma yaratildi» hodisasi']
        ] } },
        { code: "// Payments servisi hodisa e’lon qiladi\nawait broker.publish('payment.completed', { orderId: 1024, amount: 450000 });\n\n// Courses servisi obuna bo‘lgan — kursga kirishni ochadi\nbroker.subscribe('payment.completed', async ({ orderId }) => {\n  await enrollments.activate(orderId);\n});\n\n// Notifications servisi ham obuna — talabaga xat yuboradi\nbroker.subscribe('payment.completed', async ({ orderId }) => {\n  await mailer.sendReceipt(orderId);\n});", lang: 'js', title: 'Hodisalarga asoslangan aloqa (event-driven)' },
        { h: 'Infratuzilma naqshlari' },
        { terms: [
          ['API Gateway', 'Mijozlar uchun yagona kirish nuqtasi: marshrutlash, autentifikatsiya, rate limiting.'],
          ['Service discovery', 'Servislar bir-birining manzilini dinamik topishi (Consul, Kubernetes DNS).'],
          ['Circuit breaker', 'Javob bermayotgan servisga so‘rov yuborishni vaqtincha to‘xtatish — nosozlik tarqalishining oldini olish.'],
          ['Saga', 'Bir nechta servisni qamrovchi amallarni kompensatsiya qiluvchi qadamlar bilan boshqarish (taqsimlangan tranzaksiya o‘rniga).'],
          ['Taqsimlangan kuzatuv', 'So‘rovning servislar bo‘ylab yo‘lini kuzatish (OpenTelemetry, Jaeger).']
        ] },
        { warn: 'Mikroservislar murakkablik bilan to‘lanadi: tarmoq kechikishi va nosozliklari, ma’lumotlar muvofiqligi, ko‘p sonli joylashtirish, monitoring, DevOps madaniyati. Kichik jamoa va yangi loyiha uchun ular ko‘pincha ortiqcha — «avval monolit» tamoyili amal qiladi.' }
      ]
    },
    {
      title: 'Serverless arxitektura',
      blocks: [
        '**Serverless** («serversiz») — serverlar, albatta, bor, lekin ularni boshqarish to‘liq bulut provayderi zimmasida. Dasturchi faqat **funksiya** yozadi; u hodisa (HTTP so‘rov, fayl yuklash, taymer) sodir bo‘lganda ishga tushadi va faqat bajarilgan vaqt uchun to‘lanadi.',
        { table: { head: ['Tushuncha', 'Ma’nosi', 'Misollar'], rows: [
          ['FaaS (Function as a Service)', 'Hodisaga javoban ishga tushuvchi funksiyalar', 'AWS Lambda, Google Cloud Functions, Azure Functions, Cloudflare Workers, Vercel Functions'],
          ['BaaS (Backend as a Service)', 'Tayyor back-end xizmatlari: auth, baza, fayllar', 'Firebase, Supabase, Appwrite']
        ] } },
        { code: "// api/hello.js — Vercel / Netlify funksiyasi\nexport default async function handler(request) {\n  const url = new URL(request.url);\n  const name = url.searchParams.get('name') || 'mehmon';\n  return Response.json({ message: `Salom, ${name}!`, time: new Date().toISOString() });\n}\n\n// Cloudflare Worker — edge da, foydalanuvchiga eng yaqin nuqtada ishlaydi\nexport default {\n  async fetch(request, env) {\n    const cached = await env.CACHE.get('courses');\n    return new Response(cached || '[]', { headers: { 'Content-Type': 'application/json' } });\n  }\n};", lang: 'js' },
        { table: { head: ['Afzalliklari', 'Kamchiliklari'], rows: [
          ['Server boshqaruvi yo‘q', '**Cold start** — uzoq ishlatilmagan funksiyaning birinchi chaqiruvi sekin'],
          ['Avtomatik masshtablash: 0 dan minglab nusxagacha', 'Bajarilish vaqti va xotira cheklangan'],
          ['Faqat foydalanilgan vaqt uchun to‘lov; kam trafikda juda arzon', 'Katta doimiy yuklamada qimmatlashishi mumkin'],
          ['Tez prototiplash', 'Provayderga bog‘lanib qolish (vendor lock-in), lokal sinash qiyin'],
          ['Yuqori mavjudlik standart holatda', 'Holatsiz: holat tashqi xizmatlarda saqlanishi kerak']
        ] } },
        { h: 'Tipik qo‘llanishlar' },
        { ul: [
          'Rasm yuklanganda uning kichik nusxalarini yaratish.',
          'Forma ma’lumotini qabul qilib, Telegram yoki pochtaga yuborish.',
          'Webhooklar (to‘lov tizimi xabarlari), rejalashtirilgan vazifalar (cron).',
          'Notekis trafikli API lar: imtihon kunlari keskin o‘sadigan tizim.'
        ] }
      ]
    },
    {
      title: 'JAMstack va boshqa zamonaviy yondashuvlar',
      blocks: [
        { terms: [
          ['JAMstack', '**J**avaScript + **A**PI + **M**arkup: sahifalar oldindan yig‘iladi (SSG) va CDN dan beriladi, dinamik qismlar API va serverless funksiyalar orqali. Tez, xavfsiz, arzon.'],
          ['SSR / SSG / ISR', 'Serverda render (Nuxt, Next.js), oldindan statik yig‘ish, bosqichma-bosqich qayta yig‘ish — SEO va tezlik uchun gibrid render usullari.'],
          ['Edge computing', 'Kodni foydalanuvchiga eng yaqin CDN tugunida bajarish — millisekundli javob.'],
          ['Mikrofrontendlar', 'Katta front-end ni mustaqil jamoalar ishlaydigan qismlarga bo‘lish — mikroservislarning front-end dagi ekvivalenti.'],
          ['PWA', 'Progressiv veb-ilova: oflayn rejim, o‘rnatish, push-xabarnomalar (Service Worker).'],
          ['Hodisalarga asoslangan arxitektura', 'Komponentlar bir-biriga hodisalar orqali bog‘lanadi — bo‘sh bog‘lanish va real vaqt reaksiyasi.']
        ] }
      ]
    },
    {
      title: 'Arxitekturani tanlash',
      blocks: [
        { table: { head: ['Mezon', 'Monolit', 'Mikroservislar', 'Serverless'], rows: [
          ['Jamoa hajmi', 'Kichik–o‘rta', 'Katta, bir nechta jamoa', 'Har qanday'],
          ['Ishga tushirish tezligi', 'Yuqori', 'Past', 'Juda yuqori'],
          ['Operatsion murakkablik', 'Past', 'Juda yuqori', 'Past (provayder zimmasida)'],
          ['Masshtablash', 'Butun ilova birga', 'Har bir servis alohida', 'Avtomatik, funksiya darajasida'],
          ['Xarajat modeli', 'Doimiy serverlar', 'Ko‘p infratuzilma', 'Foydalanishga qarab'],
          ['Qachon', 'Yangi mahsulot, MVP, o‘quv loyihalari', 'Yirik, tez o‘suvchi, ko‘p jamoali tizim', 'Hodisaviy vazifalar, notekis yuklama, yordamchi funksiyalar']
        ] } },
        { h: 'Evolyutsion yondashuv' },
        { ol: [
          'Yaxshi tuzilgan **modulli monolit** bilan boshlang.',
          'Monitoring bilan haqiqiy «og‘riq nuqtalari»ni aniqlang.',
          'Alohida masshtablash yoki mustaqil jamoa talab qiladigan modullarni birin-ketin servisga ajrating («strangler fig» naqshi).',
          'Yordamchi va hodisaviy vazifalarni serverless funksiyalarga chiqaring.'
        ] },
        { note: 'Arxitektura — maqsad emas, vosita. «Eng zamonaviy» emas, **loyiha, jamoa va biznes talablariga mos** arxitektura eng yaxshisidir.' }
      ]
    }
  ],
  conclusion: [
    'Monolit — oddiy va samarali boshlang‘ich nuqta; modulli tuzilma uni uzoq yashashga qodir qiladi. Mikroservislar mustaqil joylashtirish va masshtablashni beradi, lekin sezilarli operatsion murakkablik bilan.',
    'Serverless server boshqaruvini provayderga o‘tkazadi va hodisaviy, notekis yuklamali vazifalar uchun ideal. Zamonaviy tizimlar ko‘pincha gibrid bo‘ladi: monolit yadro, bir nechta servis, serverless funksiyalar va CDN dagi statik front-end.'
  ],
  glossary: [
    ['Monolit', 'Bitta birlik sifatida ishlab chiqiladigan va joylashtiriladigan ilova.'],
    ['Mikroservis', 'Bitta biznes-imkoniyatga javob beruvchi mustaqil kichik servis.'],
    ['API Gateway', 'Mikroservislarga yagona kirish nuqtasi.'],
    ['Xabarlar brokeri', 'Servislar o‘rtasida asinxron xabar almashishni ta’minlovchi tizim.'],
    ['Serverless', 'Server boshqaruvi provayderda bo‘lgan, hodisaga javoban ishlovchi hisoblash modeli.'],
    ['Cold start', 'Serverless funksiyaning birinchi ishga tushishidagi kechikish.'],
    ['JAMstack', 'Oldindan yig‘ilgan markup, JavaScript va API ga asoslangan arxitektura.']
  ],
  questions: [
    'Monolit arxitekturaning afzalliklari va cheklovlari nimada?',
    'Modulli monolit oddiy monolitdan qanday farq qiladi?',
    'Mikroservislarning asosiy tamoyillarini ayting.',
    'Nima uchun har bir mikroservisning o‘z bazasi bo‘lishi kerak?',
    'Sinxron va asinxron aloqa usullarini qiyoslang.',
    'API Gateway va circuit breaker vazifalari nima?',
    'Serverless «serverlarsiz» degani emasligini tushuntiring.',
    'Cold start nima va u qachon muammo tug‘diradi?',
    'JAMstack arxitekturasining afzalliklari nimada?',
    'Yangi o‘quv loyihasi uchun qaysi arxitekturani tanlaysiz va nima uchun?'
  ]
};
