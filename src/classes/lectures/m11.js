/* M11. Veb tizimlarida ma'lumotlar bazalari bilan ishlash. */
export default {
  id: 'm11',
  number: 11,
  title: 'Veb tizimlarida ma’lumotlar bazalari bilan ishlash',
  summary: 'Ilovani bazaga ulash, parametrlangan so‘rovlar, ulanishlar puli, ORM, migratsiyalar va samaradorlik.',
  literature: [5],
  goals: [
    'Server ilovasini ma’lumotlar bazasiga ulash usullarini o‘rganish.',
    'Parametrlangan so‘rovlar va ulanishlar pulidan foydalanishni bilish.',
    'Repository qatlami, ORM va migratsiyalar tushunchalarini o‘rganish.',
    'Sahifalash, N+1 muammosi va keshlash kabi samaradorlik masalalarini tushunish.'
  ],
  keywords: ['drayver', 'ulanish satri', 'connection pool', 'parametrlangan so‘rov', 'prepared statement', 'SQL injection', 'ORM', 'query builder', 'migratsiya', 'seeder', 'repository', 'N+1', 'pagination', 'kesh'],
  practicals: ['a11'],
  lessons: [],
  sections: [
    {
      title: 'Ilova va baza o‘rtasidagi bog‘lanish',
      blocks: [
        { lead: 'Veb-ilova bazaga to‘g‘ridan-to‘g‘ri emas, **drayver** orqali ulanadi. Drayver — ilova tili va MBBT tarmoq protokoli o‘rtasidagi tarjimon.' },
        { table: { head: ['Til', 'MySQL', 'PostgreSQL', 'MongoDB'], rows: [
          ['Node.js', '`mysql2`', '`pg`', '`mongodb`, `mongoose`'],
          ['PHP', 'PDO (`pdo_mysql`)', 'PDO (`pdo_pgsql`)', '`mongodb/mongodb`'],
          ['Python', '`mysqlclient`, `PyMySQL`', '`psycopg`', '`pymongo`']
        ] } },
        { h: 'Ulanish parametrlari' },
        'Ulanish uchun host, port, baza nomi, foydalanuvchi va parol kerak. Ular ko‘pincha bitta **ulanish satri** (connection string) ko‘rinishida muhit o‘zgaruvchisida saqlanadi:',
        { code: 'DATABASE_URL=postgresql://app:maxfiy_parol@localhost:5432/university\nDATABASE_URL=mysql://app:maxfiy_parol@127.0.0.1:3306/university', lang: 'env' },
        { h: 'Ulanishlar puli (connection pool)' },
        'Har bir so‘rov uchun bazaga yangi ulanish ochish qimmat (TCP, autentifikatsiya). **Pul** oldindan bir nechta ulanishni ochib qo‘yadi va so‘rovlarga navbat bilan beradi. Bu javob vaqtini qisqartiradi va bazani ortiqcha ulanishlardan himoya qiladi.',
        { code: "// db.js — Node.js + mysql2\nimport mysql from 'mysql2/promise';\n\nexport const pool = mysql.createPool({\n  uri: process.env.DATABASE_URL,\n  connectionLimit: 10,      // bir vaqtda ko‘pi bilan 10 ulanish\n  waitForConnections: true\n});", lang: 'js' }
      ]
    },
    {
      title: 'Parametrlangan so‘rovlar',
      blocks: [
        'Foydalanuvchi kiritgan qiymatni SQL satriga **hech qachon** ulab yozmang. Aks holda tajovuzkor so‘rov tuzilishini o‘zgartira oladi — bu **SQL injection** (M14).',
        { code: "// ❌ XAVFLI\nconst sql = \"SELECT * FROM users WHERE email = '\" + email + \"'\";\n// email = \"' OR '1'='1\"  →  barcha foydalanuvchilar qaytadi!\n\n// ✅ TO‘G‘RI — parametrlangan so‘rov\nconst [rows] = await pool.execute(\n  'SELECT id, full_name FROM users WHERE email = ? AND active = ?',\n  [email, true]\n);", lang: 'js', title: 'Node.js (mysql2)' },
        'Parametrlangan (tayyorlangan, prepared) so‘rovda SQL matni va qiymatlar bazaga **alohida** yuboriladi. Baza qiymatni hech qachon kod sifatida talqin qilmaydi.',
        { code: "<?php\n$pdo = new PDO($_ENV['DB_DSN'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], [\n    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n]);\n\n$stmt = $pdo->prepare('SELECT id, full_name FROM students WHERE group_id = :group');\n$stmt->execute(['group' => $_GET['group'] ?? 0]);\n$students = $stmt->fetchAll();", lang: 'php', title: 'PHP (PDO)' },
        { code: "import psycopg\n\nwith psycopg.connect(os.environ['DATABASE_URL']) as conn:\n    rows = conn.execute(\n        'SELECT id, full_name FROM students WHERE gpa >= %s',\n        (min_gpa,)\n    ).fetchall()", lang: 'python', title: 'Python (psycopg)' }
      ]
    },
    {
      title: 'Ilova qatlamlari: kontroller, servis, repository',
      blocks: [
        'SQL so‘rovlarini marshrut funksiyalari ichiga sochib yuborish kodni chalkashtirib yuboradi. Odatda ma’lumotlar bazasi bilan ishlash alohida qatlamga ajratiladi:',
        { code: 'HTTP so‘rov\n   │\n   ▼\nKontroller (router)   — so‘rovni o‘qiydi, javob qaytaradi\n   │\n   ▼\nServis                — biznes-qoidalar: «guruhda 30 dan ortiq talaba bo‘lmasin»\n   │\n   ▼\nRepository (model)    — faqat baza bilan ishlash: find, create, update\n   │\n   ▼\nMa’lumotlar bazasi', lang: 'text' },
        { code: "// repositories/students.js\nimport { pool } from '../db.js';\n\nexport async function findAll({ limit = 20, offset = 0 } = {}) {\n  const [rows] = await pool.query(\n    'SELECT id, full_name, gpa FROM students ORDER BY id LIMIT ? OFFSET ?',\n    [limit, offset]\n  );\n  return rows;\n}\n\nexport async function findById(id) {\n  const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);\n  return rows[0] || null;\n}\n\nexport async function create({ fullName, email, groupId }) {\n  const [result] = await pool.execute(\n    'INSERT INTO students (full_name, email, group_id) VALUES (?, ?, ?)',\n    [fullName, email, groupId]\n  );\n  return findById(result.insertId);\n}", lang: 'js', title: 'Repository misoli' },
        { tip: 'Bu ajratish tufayli bazani almashtirish (MySQL → PostgreSQL) yoki testlarda «soxta» repository ishlatish oson bo‘ladi.' }
      ]
    },
    {
      title: 'ORM va query builder',
      blocks: [
        '**ORM** (Object-Relational Mapping) jadvallarni dasturlash tilidagi klass/obyektlarga moslaydi: SQL o‘rniga obyektlar bilan ishlaysiz, ORM esa kerakli SQL ni o‘zi yaratadi.',
        { table: { head: ['Til', 'ORM / query builder'], rows: [
          ['PHP', 'Eloquent (Laravel), Doctrine (Symfony)'],
          ['Python', 'Django ORM, SQLAlchemy'],
          ['Node.js', 'Prisma, Sequelize, TypeORM, Drizzle, Knex (query builder)']
        ] } },
        { code: "// Laravel Eloquent\n$students = Student::where('gpa', '>=', 4.5)\n    ->with('group')\n    ->orderByDesc('gpa')\n    ->paginate(20);\n\n# Django ORM\nstudents = Student.objects.filter(gpa__gte=4.5).select_related('group').order_by('-gpa')[:20]\n\n// Prisma (Node.js)\nconst students = await prisma.student.findMany({\n  where: { gpa: { gte: 4.5 } },\n  include: { group: true },\n  orderBy: { gpa: 'desc' },\n  take: 20\n});", lang: 'text', title: 'Bir xil so‘rov uch ORM da' },
        { table: { head: ['ORM afzalliklari', 'ORM kamchiliklari'], rows: [
          ['Kod qisqa va o‘qilishi oson', 'Murakkab so‘rovlarda samarasiz SQL yaratishi mumkin'],
          ['Parametrlash avtomatik — SQL injection xavfi kam', '«Sehrli» ishlash — SQL ni bilmasdan muammo topish qiyin'],
          ['MBBT ni almashtirish oson', 'Qo‘shimcha o‘rganish va qatlam'],
          ['Munosabatlar, validatsiya, migratsiyalar bir joyda', 'Hisobotlar uchun baribir sof SQL kerak bo‘ladi']
        ] } }
      ]
    },
    {
      title: 'Migratsiyalar va boshlang‘ich ma’lumotlar',
      blocks: [
        '**Migratsiya** — baza tuzilmasidagi o‘zgarishni tavsiflovchi, versiyalangan kod fayli. Migratsiyalar Git da saqlanadi va har bir dasturchi, test va production serverida bazani bir xil holatga keltiradi.',
        { code: "// Laravel: database/migrations/2026_09_29_000000_create_students_table.php\npublic function up(): void\n{\n    Schema::create('students', function (Blueprint $table) {\n        $table->id();\n        $table->string('full_name', 100);\n        $table->string('email')->unique();\n        $table->decimal('gpa', 3, 2)->nullable();\n        $table->foreignId('group_id')->constrained()->nullOnDelete();\n        $table->timestamps();\n    });\n}\n\npublic function down(): void\n{\n    Schema::dropIfExists('students');\n}", lang: 'php' },
        { code: '# Laravel\nphp artisan make:migration create_students_table\nphp artisan migrate\nphp artisan migrate:rollback\n\n# Django\npython manage.py makemigrations\npython manage.py migrate\n\n# Prisma\nnpx prisma migrate dev --name init', lang: 'bash' },
        '**Seeder** (fixture) — bazani sinov ma’lumotlari bilan to‘ldiruvchi skript. Yangi dasturchi loyihani yuklab olib, bitta buyruq bilan ishlaydigan bazaga ega bo‘ladi.'
      ]
    },
    {
      title: 'Samaradorlik: sahifalash, N+1 va keshlash',
      blocks: [
        { h: 'Sahifalash (pagination)' },
        'Hech qachon butun jadvalni bir so‘rovda qaytarmang. `LIMIT/OFFSET` yoki katta jadvallar uchun **kursor bo‘yicha** sahifalash ishlatiladi:',
        { code: "-- offset bo‘yicha (oddiy, lekin chuqur sahifalarda sekin)\nSELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 400;\n\n-- kursor bo‘yicha (tez: indeksdan foydalanadi)\nSELECT * FROM posts WHERE id < 1580 ORDER BY id DESC LIMIT 20;", lang: 'sql' },
        { h: 'N+1 muammosi' },
        'Ro‘yxatni olish uchun 1 ta so‘rov, so‘ng har bir element uchun bog‘liq ma’lumotni alohida so‘rash — N ta qo‘shimcha so‘rov. 100 ta talaba bo‘lsa — 101 ta so‘rov!',
        { code: "// ❌ N+1\nconst students = await db.query('SELECT * FROM students LIMIT 100');\nfor (const s of students) {\n  s.group = await db.query('SELECT * FROM groups WHERE id = ?', [s.group_id]);\n}\n\n// ✅ Bitta JOIN yoki ikkita so‘rov\nSELECT s.*, g.name AS group_name\nFROM students s JOIN groups g ON g.id = s.group_id\nLIMIT 100;\n\n// ORM da: ->with('group')  |  select_related('group')  |  include: { group: true }", lang: 'js' },
        { h: 'Keshlash' },
        'Tez-tez o‘qiladigan, kam o‘zgaradigan ma’lumotni (fanlar ro‘yxati, sozlamalar) **Redis** yoki xotirada vaqtincha saqlash bazaga yukni keskin kamaytiradi. Asosiy qiyinchilik — ma’lumot o‘zgarganda keshni o‘z vaqtida yangilash (invalidatsiya).',
        { code: "async function getCourses() {\n  const cached = await redis.get('courses');\n  if (cached) return JSON.parse(cached);\n\n  const courses = await coursesRepository.findAll();\n  await redis.set('courses', JSON.stringify(courses), { EX: 600 }); // 10 daqiqa\n  return courses;\n}", lang: 'js' },
        { h: 'Xavfsizlik va ishonchlilik qoidalari' },
        { ul: [
          'Ilova uchun alohida baza foydalanuvchisi, faqat kerakli huquqlar bilan (root emas).',
          'Parollar bazada faqat **xesh** ko‘rinishida (M15).',
          'Muntazam zaxira nusxa (backup) va uni tiklashni sinab ko‘rish.',
          'Sekin so‘rovlar jurnalini (slow query log) kuzatish, `EXPLAIN` bilan tahlil qilish.'
        ] }
      ]
    }
  ],
  conclusion: [
    'Ilova bazaga drayver va ulanishlar puli orqali ulanadi; ulanish ma’lumotlari muhit o‘zgaruvchilarida saqlanadi. Barcha so‘rovlar parametrlangan bo‘lishi shart.',
    'Baza bilan ishlash repository qatlamiga yoki ORM ga ajratiladi, tuzilma migratsiyalar orqali boshqariladi. Samaradorlik uchun sahifalash, N+1 dan qochish, indekslar va keshlash qo‘llanadi.'
  ],
  glossary: [
    ['Drayver', 'Dastur va MBBT o‘rtasida aloqani ta’minlovchi kutubxona.'],
    ['Connection pool', 'Qayta ishlatiladigan ochiq ulanishlar to‘plami.'],
    ['Prepared statement', 'SQL matni va qiymatlari alohida yuboriladigan so‘rov.'],
    ['ORM', 'Jadvallarni dastur obyektlariga moslovchi vosita.'],
    ['Migratsiya', 'Baza tuzilmasi o‘zgarishining versiyalangan tavsifi.'],
    ['Seeder', 'Bazani boshlang‘ich yoki sinov ma’lumotlari bilan to‘ldiruvchi skript.'],
    ['N+1 muammosi', 'Ro‘yxatning har bir elementi uchun alohida so‘rov yuborish natijasidagi ortiqcha yuklama.']
  ],
  questions: [
    'Drayver nima va u nima uchun kerak?',
    'Ulanishlar puli qanday muammoni hal qiladi?',
    'Parametrlangan so‘rov SQL injectiondan qanday himoya qiladi?',
    'Kontroller, servis va repository qatlamlarining vazifalari nima?',
    'ORM ning afzallik va kamchiliklarini ayting.',
    'Migratsiyalar jamoaviy ishda qanday yordam beradi?',
    'Offset va kursor bo‘yicha sahifalashning farqi nimada?',
    'N+1 muammosini misolda tushuntiring va hal qilish yo‘lini ko‘rsating.',
    'Keshlashning asosiy qiyinchiligi nimada?',
    'Ilovaning baza foydalanuvchisiga qanday huquqlar berilishi kerak?'
  ]
};
