/* M17. Veb tizimlarni joylashtirish (Deployment) va masshtablash (Scaling). */
export default {
  id: 'm17',
  number: 17,
  title: 'Veb tizimlarni joylashtirish (Deployment) va masshtablash (Scaling)',
  summary: 'Hosting turlari, domen va HTTPS, Nginx, Docker, CI/CD, monitoring, vertikal va gorizontal masshtablash.',
  literature: [2],
  goals: [
    'Veb-ilovani ishlab chiqarish muhitiga joylashtirish bosqichlarini bilish.',
    'Hosting turlari, domen, DNS va HTTPS sozlashni o‘rganish.',
    'Konteynerlashtirish (Docker) va CI/CD tushunchalarini tushunish.',
    'Masshtablash usullari: yuklama balanslash, keshlash, CDN, bazani masshtablashni bilish.'
  ],
  keywords: ['deployment', 'hosting', 'VPS', 'PaaS', 'domen', 'SSL/TLS', 'Nginx', 'reverse proxy', 'Docker', 'CI/CD', 'GitHub Actions', 'monitoring', 'vertikal masshtablash', 'gorizontal masshtablash', 'load balancer', 'CDN'],
  practicals: [],
  lessons: [],
  sections: [
    {
      title: 'Deployment tushunchasi va muhitlar',
      blocks: [
        { lead: 'Deployment (joylashtirish) — dasturchi kompyuterida ishlab turgan ilovani haqiqiy foydalanuvchilar foydalana oladigan serverga o‘rnatish va ishga tushirish jarayoni.' },
        { code: 'Dasturchi ──git push──► Repozitoriy (GitHub) ──CI──► testlar, yig‘ish\n                                                     │\n                                          ┌──────────┴──────────┐\n                                          ▼                     ▼\n                                   staging server        production server\n                                  (sinov muhiti)       (foydalanuvchilar)', lang: 'text', title: 'Kodning yo‘li' },
        { h: 'Joylashtirishdan oldingi tekshiruv ro‘yxati' },
        { ul: [
          'Production sozlamalari: `APP_ENV=production`, `DEBUG=false`.',
          'Maxfiy kalitlar serverdagi muhit o‘zgaruvchilarida, repozitoriyda emas.',
          'Front-end yig‘ilgan (`npm run build`): kichraytirilgan, keshlanadigan fayllar.',
          'Baza migratsiyalari tayyor, zaxira nusxa olingan.',
          'Loglar va xatolarni kuzatish sozlangan.',
          'Orqaga qaytarish (rollback) rejasi bor.'
        ] }
      ]
    },
    {
      title: 'Hosting turlari',
      blocks: [
        { table: { head: ['Turi', 'Tavsifi', 'Afzalligi', 'Kamchiligi'], rows: [
          ['Statik hosting', 'Faqat HTML/CSS/JS fayllar: GitHub Pages, Netlify, Vercel, Cloudflare Pages', 'Bepul yoki arzon, juda tez, CDN', 'Server kodi yo‘q'],
          ['Virtual (shared) hosting', 'Bitta serverda ko‘p sayt, panel (cPanel)', 'Arzon, PHP+MySQL tayyor', 'Resurslar cheklangan, sozlash erkinligi kam'],
          ['VPS / VDS', 'O‘z virtual serveringiz (root huquqi)', 'To‘liq nazorat, narx/imkoniyat muvozanati', 'Serverni o‘zingiz boshqarasiz'],
          ['Ajratilgan server', 'Butun jismoniy server', 'Maksimal quvvat', 'Qimmat'],
          ['PaaS', 'Kodni yuklaysiz, platforma o‘zi ishga tushiradi: Render, Railway, Heroku, Fly.io', 'Server boshqaruvisiz', 'Qimmatroq, platformaga bog‘lanish'],
          ['Bulut (IaaS)', 'AWS, Google Cloud, Azure, Yandex Cloud', 'Cheksiz masshtab, ko‘p xizmatlar', 'Murakkab, xarajatni nazorat qilish kerak']
        ] } },
        { note: 'Shaxsiy ma’lumotlarni qayta ishlovchi tizimlar uchun O‘zbekiston qonunchiligi fuqarolarning shaxsiy ma’lumotlari mamlakat hududidagi serverlarda saqlanishini talab qiladi — hosting tanlashda buni hisobga oling.' }
      ]
    },
    {
      title: 'Domen, DNS va HTTPS',
      blocks: [
        { ol: [
          'Domen ro‘yxatdan o‘tkaziladi (`.uz` zonasi uchun — akkreditatsiyalangan registratorlar orqali).',
          'DNS da `A` yozuvi server IP-manziliga yo‘naltiriladi, `www` uchun `CNAME` qo‘shiladi (M2).',
          'Serverda veb-server (Nginx) sozlanadi.',
          'Let’s Encrypt orqali bepul TLS sertifikat olinadi va avtomatik yangilanish yoqiladi.',
          'HTTP dan HTTPS ga doimiy yo‘naltirish (301) o‘rnatiladi.'
        ] },
        { code: 'sudo apt install nginx certbot python3-certbot-nginx\nsudo certbot --nginx -d example.uz -d www.example.uz\nsudo systemctl status certbot.timer    # avtomatik yangilanish', lang: 'bash' },
        { h: 'Nginx — teskari proksi (reverse proxy)' },
        { code: "server {\n    listen 443 ssl http2;\n    server_name example.uz;\n\n    ssl_certificate     /etc/letsencrypt/live/example.uz/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/example.uz/privkey.pem;\n\n    # Front-end (Vue build) — statik fayllar\n    root /var/www/app/dist;\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n\n    # API — Node.js ilovasiga proksi\n    location /api/ {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n\n    location ~* \\.(js|css|png|svg|woff2)$ {\n        expires 30d;\n        add_header Cache-Control \"public, immutable\";\n    }\n}\n\nserver {\n    listen 80;\n    server_name example.uz www.example.uz;\n    return 301 https://example.uz$request_uri;\n}", lang: 'text', title: '/etc/nginx/sites-available/example.uz' },
        'Node.js ilovasini fonda ishlatib turish va qulasa qayta ishga tushirish uchun **PM2** yoki **systemd** ishlatiladi: `pm2 start server.js --name api -i max`.'
      ]
    },
    {
      title: 'Docker va konteynerlashtirish',
      blocks: [
        '«Mening kompyuterimda ishlayapti-ku!» muammosi — ilova dasturchi kompyuterida ishlaydi, serverda esa boshqa versiyadagi Node, PHP yoki kutubxona sababli buziladi. **Docker** ilovani uning barcha bog‘liqliklari bilan birga **konteynerga** qadoqlaydi — konteyner hamma joyda bir xil ishlaydi.',
        { terms: [
          ['Image (obraz)', 'Ilova va uning muhitining o‘zgarmas «qolipi».'],
          ['Container', 'Obrazdan ishga tushirilgan, izolyatsiyalangan jarayon.'],
          ['Dockerfile', 'Obrazni qanday yig‘ish bo‘yicha ko‘rsatmalar.'],
          ['Docker Compose', 'Bir nechta konteynerni (ilova, baza, kesh) birga tavsiflash va ishga tushirish.'],
          ['Registry', 'Obrazlar ombori: Docker Hub, GitHub Container Registry.']
        ] },
        { code: "FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nENV NODE_ENV=production\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]", lang: 'text', title: 'Dockerfile' },
        { code: "services:\n  api:\n    build: .\n    ports: [\"3000:3000\"]\n    env_file: .env\n    depends_on: [db]\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_DB: university\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes: [\"pgdata:/var/lib/postgresql/data\"]\nvolumes:\n  pgdata:", lang: 'text', title: 'docker-compose.yml' },
        { code: 'docker compose up -d --build\ndocker compose logs -f api\ndocker compose down', lang: 'bash' },
        'Ko‘p serverdagi ko‘plab konteynerlarni boshqarish uchun **orkestratorlar** ishlatiladi: **Kubernetes**, Docker Swarm. Ular konteynerlarni avtomatik joylashtiradi, qulaganini qayta ishga tushiradi va yuklamaga qarab sonini o‘zgartiradi.'
      ]
    },
    {
      title: 'CI/CD va monitoring',
      blocks: [
        '**CI** (Continuous Integration — uzluksiz integratsiya) — har bir `git push` da kod avtomatik yig‘iladi va testlardan o‘tkaziladi. **CD** (Continuous Delivery/Deployment) — testlardan o‘tgan kod avtomatik ravishda serverga joylashtiriladi.',
        { code: "# .github/workflows/deploy.yml\nname: Test va joylashtirish\non:\n  push:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n      - name: Serverga joylashtirish\n        run: rsync -az dist/ deploy@example.uz:/var/www/app/dist/\n        # SSH kaliti GitHub Secrets da saqlanadi", lang: 'text' },
        { h: 'Joylashtirish strategiyalari' },
        { ul: [
          '**Rolling** — serverlar birin-ketin yangilanadi.',
          '**Blue-green** — yangi versiya yonma-yon ko‘tariladi, trafik bir zumda almashtiriladi; muammo bo‘lsa darhol qaytariladi.',
          '**Canary** — yangi versiya avval foydalanuvchilarning kichik qismiga (5%) beriladi.'
        ] },
        { h: 'Monitoring va loglar' },
        { ul: [
          '**Mavjudlik monitoringi**: sayt ishlayaptimi (UptimeRobot, Uptime Kuma).',
          '**Metrikalar**: CPU, xotira, javob vaqti, xatolar ulushi (Prometheus + Grafana).',
          '**Xatolarni kuzatish**: Sentry — foydalanuvchida sodir bo‘lgan xato stack trace bilan keladi.',
          '**Markazlashgan loglar**: ELK/Loki — barcha serverlar jurnali bir joyda.'
        ] }
      ]
    },
    {
      title: 'Masshtablash',
      blocks: [
        'Foydalanuvchilar soni oshganda tizim sekinlashadi. **Masshtablash** — yuklama o‘sganda ham javob vaqtini saqlash qobiliyati.',
        { table: { head: ['', 'Vertikal (scale up)', 'Gorizontal (scale out)'], rows: [
          ['Usul', 'Serverni kuchliroq qilish: ko‘proq CPU, RAM', 'Serverlar sonini ko‘paytirish'],
          ['Afzalligi', 'Oddiy, kodni o‘zgartirish shart emas', 'Deyarli cheksiz, bitta server qulasa ham ishlaydi'],
          ['Kamchiligi', 'Jismoniy chegarasi bor, bitta nosozlik nuqtasi', 'Ilova holatsiz bo‘lishi kerak, murakkabroq']
        ] } },
        { code: '                       ┌──► App server 1 ─┐\nFoydalanuvchilar ─► CDN ─► Load balancer ─┼──► App server 2 ─┼──► Redis (kesh, sessiyalar)\n                       └──► App server 3 ─┘         │\n                                             Primary DB ──replikatsiya──► Read replica', lang: 'text', title: 'Gorizontal masshtablangan tizim' },
        { terms: [
          ['Yuklama balanslovchi (load balancer)', 'So‘rovlarni serverlar o‘rtasida taqsimlaydi (round-robin, eng kam ulanish); ishlamayotgan serverni chetlatadi. Nginx, HAProxy, bulut balanslovchilari.'],
          ['Holatsiz ilova', 'Sessiya va fayllar ilova serverida emas, umumiy joyda (Redis, S3) — shunda istalgan server istalgan so‘rovga javob bera oladi.'],
          ['CDN', 'Statik fayllarni foydalanuvchiga geografik yaqin serverlardan beruvchi tarmoq (Cloudflare).'],
          ['Keshlash', 'Brauzer keshi, CDN, Redis dagi ilova keshi — eng arzon tezlashtirish.'],
          ['Read replica', 'Bazaning faqat o‘qish uchun nusxalari; yozuv asosiy (primary) bazaga ketadi.'],
          ['Sharding', 'Katta jadvalni kalit bo‘yicha bir nechta bazaga bo‘lish.'],
          ['Navbatlar', 'Og‘ir ishlarni (xat yuborish, hisobot) fon ishchilariga berish: RabbitMQ, Redis queues.'],
          ['Avtomasshtablash', 'Bulutda CPU yuklamasiga qarab serverlar sonini avtomatik o‘zgartirish.']
        ] },
        { tip: 'Masshtablashni o‘lchovdan boshlang: avval yuklama testi (k6, JMeter) va monitoring bilan «tor joy»ni toping. Ko‘pincha muammo server sonida emas, indekssiz so‘rov yoki N+1 da bo‘ladi (M11).' }
      ]
    }
  ],
  conclusion: [
    'Deployment — ilovani to‘g‘ri sozlangan production muhitiga yetkazish: hosting, domen, HTTPS, Nginx teskari proksi, jarayon menejeri. Docker muhitlarni bir xil qiladi, CI/CD esa test va joylashtirishni avtomatlashtiradi.',
    'Masshtablash vertikal yoki gorizontal bo‘ladi. Gorizontal masshtablash holatsiz ilova, yuklama balanslovchi, kesh, CDN va bazani replikatsiyalashni talab qiladi. Har qanday optimizatsiya monitoring va o‘lchovdan boshlanadi.'
  ],
  glossary: [
    ['Deployment', 'Ilovani ishlab chiqarish muhitiga joylashtirish.'],
    ['VPS', 'Virtual xususiy server.'],
    ['PaaS', 'Ilovani server boshqaruvisiz joylashtirish platformasi.'],
    ['Reverse proxy', 'Mijoz so‘rovlarini ichki serverlarga yo‘naltiruvchi oraliq server.'],
    ['Konteyner', 'Ilova va uning bog‘liqliklarini izolyatsiyalangan holda ishlatuvchi birlik.'],
    ['CI/CD', 'Kodni avtomatik yig‘ish, sinash va joylashtirish amaliyoti.'],
    ['Load balancer', 'Trafikni bir nechta server o‘rtasida taqsimlovchi qurilma yoki dastur.'],
    ['CDN', 'Kontentni yetkazib berishning taqsimlangan tarmog‘i.']
  ],
  questions: [
    'Deployment dan oldin nimalarni tekshirish kerak?',
    'Shared hosting, VPS va PaaS ni qiyoslang.',
    'Saytga domen va HTTPS ulash bosqichlarini ayting.',
    'Nginx teskari proksi sifatida qanday vazifalarni bajaradi?',
    'Docker qanday muammoni hal qiladi? Image va container farqi nimada?',
    'CI va CD tushunchalarini tushuntiring.',
    'Blue-green va canary joylashtirish strategiyalari nima?',
    'Vertikal va gorizontal masshtablashni qiyoslang.',
    'Nima uchun gorizontal masshtablash uchun ilova holatsiz bo‘lishi kerak?',
    'CDN, kesh va read replica tizim unumdorligiga qanday ta’sir qiladi?'
  ]
};
