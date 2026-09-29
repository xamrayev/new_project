/* M10. Ma'lumotlar bazalari asoslari: SQL, NoSQL. */
export default {
  id: 'm10',
  number: 10,
  title: 'Ma’lumotlar bazalari asoslari: SQL, NoSQL',
  summary: 'Relyatsion model, jadvallar va kalitlar, SQL so‘rovlari, normallashtirish, NoSQL turlari va tanlash.',
  literature: [4],
  goals: [
    'Ma’lumotlar bazasi va MBBT tushunchalarini bilish.',
    'Relyatsion model: jadval, kalit, bog‘lanish turlarini o‘rganish.',
    'Asosiy SQL buyruqlari (DDL, DML) bilan ishlashni o‘rganish.',
    'NoSQL bazalar turlari va ularni SQL bilan qiyoslashni bilish.'
  ],
  keywords: ['ma’lumotlar bazasi', 'MBBT', 'jadval', 'birlamchi kalit', 'tashqi kalit', 'SQL', 'SELECT', 'JOIN', 'indeks', 'tranzaksiya', 'ACID', 'normallashtirish', 'NoSQL', 'MongoDB', 'Redis'],
  practicals: ['a10'],
  lessons: [],
  sections: [
    {
      title: 'Ma’lumotlar bazasi va MBBT',
      blocks: [
        { lead: 'Ma’lumotlar bazasi (MB) — tartiblangan, o‘zaro bog‘langan va uzoq muddat saqlanadigan ma’lumotlar to‘plami. Uni boshqaradigan dastur — MBBT (ma’lumotlar bazasini boshqarish tizimi).' },
        'Nima uchun ma’lumotni oddiy faylda (JSON, Excel) saqlash yetarli emas? Chunki veb tizimida bir vaqtda minglab foydalanuvchi o‘qiydi va yozadi. MBBT quyidagilarni ta’minlaydi:',
        { ul: [
          '**Bir vaqtda kirish**: ikki foydalanuvchi bir yozuvni o‘zgartirganda ma’lumot buzilmaydi.',
          '**Yaxlitlik**: cheklovlar noto‘g‘ri ma’lumot yozilishiga yo‘l qo‘ymaydi.',
          '**Tez qidirish**: indekslar millionlab yozuvlar ichidan millisekundlarda topadi.',
          '**Ishonchlilik**: tranzaksiyalar, jurnal, zaxira nusxalar, tiklash.',
          '**Huquqlar**: kim nimani o‘qishi va o‘zgartirishi mumkinligi.'
        ] },
        { table: { head: ['MBBT', 'Turi', 'Qo‘llanishi'], rows: [
          ['MySQL / MariaDB', 'Relyatsion', 'Veb-saytlar, LAMP steki'],
          ['PostgreSQL', 'Relyatsion', 'Murakkab tizimlar, geoma’lumot, JSON'],
          ['SQLite', 'Relyatsion (fayl)', 'Mobil va kichik ilovalar, prototiplar'],
          ['MS SQL Server, Oracle', 'Relyatsion', 'Korporativ tizimlar'],
          ['MongoDB', 'Hujjatga yo‘naltirilgan (NoSQL)', 'Moslashuvchan tuzilmali ma’lumot'],
          ['Redis', 'Kalit–qiymat (NoSQL)', 'Kesh, sessiyalar, navbatlar']
        ] } }
      ]
    },
    {
      title: 'Relyatsion model',
      blocks: [
        'Relyatsion modelda (E. Kodd, 1970) ma’lumot **jadvallarda** saqlanadi. Jadval ustunlari — **atributlar** (maydonlar), qatorlari — **yozuvlar**.',
        { table: { head: ['id (PK)', 'full_name', 'group_id (FK)', 'birth_date', 'email'], rows: [
          ['1', 'Aziz Karimov', '2', '2004-03-15', 'aziz@mail.uz'],
          ['2', 'Dilnoza Rahimova', '2', '2005-07-02', 'dilnoza@mail.uz'],
          ['3', 'Jasur Aliyev', '1', '2003-11-20', 'jasur@mail.uz']
        ] } },
        { terms: [
          ['Birlamchi kalit (PK)', 'Har bir yozuvni yagona aniqlovchi ustun: `id`. Takrorlanmaydi va bo‘sh bo‘lmaydi.'],
          ['Tashqi kalit (FK)', 'Boshqa jadvalning birlamchi kalitiga havola: `group_id → groups.id`. Mavjud bo‘lmagan guruhga yozishga yo‘l qo‘ymaydi.'],
          ['Cheklovlar', '`NOT NULL`, `UNIQUE`, `CHECK (gpa BETWEEN 0 AND 5)`, `DEFAULT`.'],
          ['Ma’lumot turlari', '`INT`, `DECIMAL(10,2)`, `VARCHAR(100)`, `TEXT`, `DATE`, `TIMESTAMP`, `BOOLEAN`, `JSON`.']
        ] },
        { h: 'Bog‘lanish turlari' },
        { ul: [
          '**Birga-bir (1:1)**: talaba — talaba guvohnomasi.',
          '**Birga-ko‘p (1:N)**: guruh — talabalar (talabalar jadvalida `group_id`).',
          '**Ko‘pga-ko‘p (M:N)**: talabalar — fanlar. Oraliq jadval orqali: `enrollments(student_id, course_id, grade)`.'
        ] },
        { code: 'groups (id, name)\n   1 │\n     │ N\nstudents (id, full_name, group_id)\n   1 │\n     │ N\nenrollments (student_id, course_id, grade)\n     │ N\n   1 │\ncourses (id, title, credits)', lang: 'text', title: 'ER-diagramma (soddalashtirilgan)' }
      ]
    },
    {
      title: 'SQL: jadval yaratish va o‘zgartirish',
      blocks: [
        '**SQL** (Structured Query Language) — relyatsion bazalar bilan ishlashning standart tili. Buyruqlar guruhlari: **DDL** (tuzilma: `CREATE`, `ALTER`, `DROP`), **DML** (ma’lumot: `SELECT`, `INSERT`, `UPDATE`, `DELETE`), **DCL** (huquq: `GRANT`, `REVOKE`), **TCL** (tranzaksiya: `COMMIT`, `ROLLBACK`).',
        { code: "CREATE TABLE groups (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(20) NOT NULL UNIQUE\n);\n\nCREATE TABLE students (\n  id          SERIAL PRIMARY KEY,\n  full_name   VARCHAR(100) NOT NULL,\n  email       VARCHAR(120) UNIQUE,\n  gpa         DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 5),\n  group_id    INT REFERENCES groups(id) ON DELETE SET NULL,\n  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nALTER TABLE students ADD COLUMN phone VARCHAR(20);", lang: 'sql', title: 'DDL (PostgreSQL sintaksisi)' },
        { note: 'MySQL da `SERIAL` o‘rniga `INT AUTO_INCREMENT PRIMARY KEY` yoziladi. SQL standart, lekin har bir MBBT ning o‘z «shevasi» bor.' }
      ]
    },
    {
      title: 'SQL: ma’lumotlar bilan ishlash',
      blocks: [
        { code: "INSERT INTO groups (name) VALUES ('DI-21'), ('DI-22');\n\nINSERT INTO students (full_name, email, gpa, group_id)\nVALUES ('Aziz Karimov', 'aziz@mail.uz', 4.6, 2),\n       ('Dilnoza Rahimova', 'dilnoza@mail.uz', 4.9, 2);\n\nUPDATE students SET gpa = 4.7 WHERE id = 1;\n\nDELETE FROM students WHERE email = 'eski@mail.uz';", lang: 'sql', title: 'INSERT, UPDATE, DELETE' },
        { warn: '`UPDATE` va `DELETE` ni **`WHERE` sharti bilan** yozing. `DELETE FROM students;` — jadvaldagi barcha yozuvlarni o‘chiradi.' },
        { h: 'SELECT so‘rovi' },
        { code: "SELECT full_name, gpa\nFROM students\nWHERE gpa >= 4.0 AND full_name LIKE 'D%'\nORDER BY gpa DESC\nLIMIT 10 OFFSET 0;", lang: 'sql' },
        { table: { head: ['Qism', 'Vazifasi'], rows: [
          ['`SELECT`', 'Qaysi ustunlar (`*` — hammasi)'],
          ['`FROM`', 'Qaysi jadvaldan'],
          ['`WHERE`', 'Qatorlarni filtrlash: `=`, `<>`, `>`, `BETWEEN`, `IN`, `LIKE`, `IS NULL`'],
          ['`GROUP BY` / `HAVING`', 'Guruhlash va guruhlarni filtrlash'],
          ['`ORDER BY`', 'Saralash: `ASC`/`DESC`'],
          ['`LIMIT` / `OFFSET`', 'Sahifalash (pagination)']
        ] } },
        { h: 'Agregat funksiyalar va guruhlash' },
        { code: "SELECT g.name AS guruh,\n       COUNT(s.id)          AS talabalar,\n       ROUND(AVG(s.gpa), 2) AS ortacha_gpa,\n       MAX(s.gpa)           AS eng_yuqori\nFROM groups g\nLEFT JOIN students s ON s.group_id = g.id\nGROUP BY g.name\nHAVING COUNT(s.id) > 0\nORDER BY ortacha_gpa DESC;", lang: 'sql' },
        { h: 'JOIN — jadvallarni birlashtirish' },
        { table: { head: ['Turi', 'Natija'], rows: [
          ['`INNER JOIN`', 'Faqat ikkala jadvalda mosi bor qatorlar'],
          ['`LEFT JOIN`', 'Chap jadvalning hammasi + o‘ngdagi mos (bo‘lmasa NULL)'],
          ['`RIGHT JOIN`', 'O‘ng jadvalning hammasi + chapdagi mos'],
          ['`FULL JOIN`', 'Ikkala jadvalning hammasi']
        ] } },
        { code: "SELECT s.full_name, c.title, e.grade\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nJOIN courses  c ON c.id = e.course_id\nWHERE c.title = 'Web tizimlari'\nORDER BY e.grade DESC;", lang: 'sql' }
      ]
    },
    {
      title: 'Normallashtirish, indekslar va tranzaksiyalar',
      blocks: [
        '**Normallashtirish** — ma’lumot takrorlanishini yo‘qotish uchun jadvallarni to‘g‘ri bo‘lish jarayoni.',
        { ul: [
          '**1NF**: har bir katakda bitta qiymat (vergul bilan ro‘yxat emas), takroriy ustun guruhlari yo‘q.',
          '**2NF**: 1NF + har bir ustun butun birlamchi kalitga bog‘liq (tarkibli kalit qismiga emas).',
          '**3NF**: 2NF + kalit bo‘lmagan ustunlar bir-biriga bog‘liq emas (masalan, guruh nomi talabalar jadvalida emas, `groups` jadvalida).'
        ] },
        { h: 'Indekslar' },
        'Indeks — kitob oxiridagi ko‘rsatkich kabi: qidiruvni butun jadvalni ko‘rib chiqishdan (full scan) daraxt bo‘yicha tez topishga aylantiradi. `WHERE`, `JOIN` va `ORDER BY` da tez-tez ishlatiladigan ustunlarga qo‘yiladi. Kamchiligi: yozish sekinlashadi va joy egallaydi.',
        { code: 'CREATE INDEX idx_students_group ON students(group_id);\nEXPLAIN SELECT * FROM students WHERE group_id = 2;', lang: 'sql' },
        { h: 'Tranzaksiyalar va ACID' },
        { code: "BEGIN;\nUPDATE accounts SET balance = balance - 100000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100000 WHERE id = 2;\nCOMMIT;   -- xato bo‘lsa: ROLLBACK", lang: 'sql', title: 'Pul o‘tkazmasi — yo hammasi, yo hech narsa' },
        { table: { head: ['Xususiyat', 'Ma’nosi'], rows: [
          ['**A**tomicity', 'Tranzaksiya to‘liq bajariladi yoki umuman bajarilmaydi'],
          ['**C**onsistency', 'Baza bir to‘g‘ri holatdan boshqa to‘g‘ri holatga o‘tadi'],
          ['**I**solation', 'Parallel tranzaksiyalar bir-biriga xalal bermaydi'],
          ['**D**urability', 'Tasdiqlangan o‘zgarish uzilishdan keyin ham saqlanadi']
        ] } }
      ]
    },
    {
      title: 'NoSQL ma’lumotlar bazalari',
      blocks: [
        '**NoSQL** («Not only SQL») — qat’iy jadval sxemasiz, gorizontal masshtablash uchun mo‘ljallangan bazalar. Ular 2000-yillar oxirida katta ijtimoiy tarmoqlar va bulutli xizmatlar ehtiyoji bilan paydo bo‘ldi.',
        { table: { head: ['Turi', 'Tuzilishi', 'Misollar', 'Qo‘llanish'], rows: [
          ['Hujjatga yo‘naltirilgan', 'JSON ga o‘xshash hujjatlar', 'MongoDB, CouchDB', 'Kontent, katalog, profillar'],
          ['Kalit–qiymat', 'Kalit → qiymat', 'Redis, DynamoDB', 'Kesh, sessiya, hisoblagichlar'],
          ['Ustunli', 'Ustun oilalari', 'Cassandra, HBase', 'Juda katta hajmdagi yozuvlar, loglar'],
          ['Graf', 'Tugunlar va bog‘lanishlar', 'Neo4j', 'Ijtimoiy tarmoqlar, tavsiyalar']
        ] } },
        { code: "// MongoDB — hujjat\n{\n  _id: ObjectId('…'),\n  fullName: 'Dilnoza Rahimova',\n  group: 'DI-22',\n  skills: ['HTML', 'Vue'],\n  grades: [{ course: 'Web tizimlari', grade: 92 }]\n}\n\n// So‘rovlar\ndb.students.insertOne({ fullName: 'Aziz', group: 'DI-22', gpa: 4.6 });\ndb.students.find({ gpa: { $gte: 4.5 } }).sort({ gpa: -1 });\ndb.students.updateOne({ fullName: 'Aziz' }, { $set: { gpa: 4.7 } });", lang: 'js', title: 'MongoDB' },
        { code: 'SET session:ab12 "user_id=5" EX 3600   # 1 soatlik sessiya\nGET session:ab12\nINCR page:views', lang: 'bash', title: 'Redis' },
        { h: 'SQL yoki NoSQL?' },
        { table: { head: ['Mezon', 'SQL', 'NoSQL'], rows: [
          ['Sxema', 'Qat’iy, oldindan belgilanadi', 'Moslashuvchan'],
          ['Bog‘lanishlar', 'JOIN lar bilan kuchli', 'Ma’lumot hujjat ichiga joylanadi'],
          ['Tranzaksiyalar', 'To‘liq ACID', 'Ko‘pincha «yakunda muvofiqlik» (eventual consistency)'],
          ['Masshtablash', 'Asosan vertikal (kuchliroq server)', 'Gorizontal (ko‘p server)'],
          ['Qachon', 'Moliya, buyurtmalar, o‘quv jarayoni — aniq tuzilmali ma’lumot', 'Tez o‘zgaruvchan tuzilma, juda katta hajm, kesh']
        ] } },
        { tip: 'Amalda ko‘p tizimlar ikkalasini birga ishlatadi (**poliglot saqlash**): asosiy ma’lumot PostgreSQL da, kesh va sessiyalar Redis da.' }
      ]
    }
  ],
  conclusion: [
    'Relyatsion bazalar ma’lumotni kalitlar bilan bog‘langan jadvallarda saqlaydi va SQL orqali boshqariladi. To‘g‘ri loyihalash (normallashtirish), indekslar va ACID tranzaksiyalar ishonchli tizimning asosidir.',
    'NoSQL bazalar moslashuvchan sxema va gorizontal masshtablashni taklif qiladi. Tanlov ma’lumot tabiatiga bog‘liq; zamonaviy tizimlar ko‘pincha ikkala turdan birga foydalanadi.'
  ],
  glossary: [
    ['MBBT', 'Ma’lumotlar bazasini yaratish va boshqarish dasturi.'],
    ['Birlamchi kalit', 'Jadvaldagi har bir yozuvni yagona aniqlovchi ustun.'],
    ['Tashqi kalit', 'Boshqa jadval yozuviga havola qiluvchi ustun.'],
    ['JOIN', 'Bir nechta jadval qatorlarini shart bo‘yicha birlashtirish.'],
    ['Indeks', 'Qidiruvni tezlashtiruvchi yordamchi tuzilma.'],
    ['Tranzaksiya', 'Yagona butun sifatida bajariladigan amallar ketma-ketligi.'],
    ['Normallashtirish', 'Takrorlanishni kamaytirish uchun jadvallarni to‘g‘ri tuzish.'],
    ['NoSQL', 'Jadval modelidan boshqa modellarga asoslangan bazalar.']
  ],
  questions: [
    'Nima uchun veb tizimda ma’lumotni oddiy faylda saqlash yetarli emas?',
    'Birlamchi va tashqi kalitning vazifasi nima?',
    'Ko‘pga-ko‘p bog‘lanish qanday amalga oshiriladi?',
    'DDL va DML buyruqlariga misollar keltiring.',
    '`WHERE` va `HAVING` ning farqi nimada?',
    '`INNER JOIN` va `LEFT JOIN` natijasi qanday farqlanadi?',
    '3NF ga keltirishning maqsadi nima?',
    'Indeks qachon foydali va qachon zararli?',
    'ACID xususiyatlarini tushuntiring.',
    'NoSQL bazalarning qanday turlarini bilasiz? Qaysi holatda MongoDB, qaysi holatda PostgreSQL tanlaysiz?'
  ]
};
