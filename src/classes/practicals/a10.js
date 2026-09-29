/* A10. Ma'lumotlar bazasini yaratish va SQL so'rovlarini bajarish. */
import { UNIVERSITY_SCHEMA, sqlLab } from '../sql-lab.js';

const sql = (query) => ({ code: query, lang: 'sql', ...sqlLab(UNIVERSITY_SCHEMA, query) });

const ddl = `-- MySQL
CREATE DATABASE university CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE university;

CREATE TABLE \`groups\` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE,
  faculty VARCHAR(100) NOT NULL
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE,
  birth_date DATE,
  gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 5),
  group_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES \`groups\`(id) ON DELETE SET NULL
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  credits TINYINT NOT NULL
);

CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  grade TINYINT CHECK (grade BETWEEN 0 AND 100),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);`;

export default {
  id: 'a10',
  number: 10,
  title: 'Ma’lumotlar bazasini yaratish va SQL so‘rovlarini bajarish',
  summary: '«Universitet» bazasini loyihalaymiz, jadvallar yaratamiz, to‘ldiramiz va SELECT, JOIN, GROUP BY so‘rovlarini yozamiz.',
  lectures: ['m10'],
  lessons: [],
  goal: 'Relyatsion ma’lumotlar bazasini loyihalash, SQL yordamida jadvallar va ular orasidagi bog‘lanishlarni yaratish, ma’lumotlarni kiritish, o‘zgartirish va murakkab tanlov so‘rovlarini bajarish ko‘nikmasini shakllantirish.',
  outcomes: [
    'ER-diagramma asosida jadvallar, birlamchi va tashqi kalitlarni loyihalaydi;',
    '`CREATE TABLE` bilan cheklovlarga ega jadvallar yaratadi;',
    '`INSERT`, `UPDATE`, `DELETE` bilan ma’lumotlarni boshqaradi;',
    '`WHERE`, `ORDER BY`, `LIMIT`, agregat funksiyalar, `GROUP BY`, `HAVING` va `JOIN` li so‘rovlar yozadi;',
    'indeks yaratadi va tranzaksiyadan foydalanadi.'
  ],
  tools: [
    'MySQL 8 (XAMPP/OpenServer tarkibida yoki alohida) va **phpMyAdmin**, **MySQL Workbench** yoki **DBeaver**.',
    'Muqobil: PostgreSQL + pgAdmin.',
    'Tez mashq qilish uchun: har bir so‘rov yonidagi «Sinab ko‘rish» tugmasi — brauzerning o‘zida SQLite bazasini ochadi (internet talab qilinadi).'
  ],
  theory: [
    { code: 'groups (id PK, name, faculty)\n   │ 1\n   │\n   │ N\nstudents (id PK, full_name, email, birth_date, gpa, group_id FK)\n   │ 1\n   │\n   │ N\nenrollments (student_id FK, course_id FK, grade)   ← PK: (student_id, course_id)\n   │ N\n   │\n   │ 1\ncourses (id PK, title, credits)', lang: 'text', title: 'ER-diagramma' },
    { table: { head: ['Buyruq', 'Vazifasi'], rows: [
      ['`CREATE DATABASE / TABLE`', 'Baza va jadval yaratish'],
      ['`ALTER TABLE`', 'Jadval tuzilishini o‘zgartirish'],
      ['`INSERT INTO … VALUES`', 'Qator qo‘shish'],
      ['`UPDATE … SET … WHERE`', 'Qatorlarni o‘zgartirish'],
      ['`DELETE FROM … WHERE`', 'Qatorlarni o‘chirish'],
      ['`SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT`', 'Tanlov (yozilish tartibi aynan shunday)']
    ] } },
    { note: 'Brauzerdagi laboratoriya SQLite dialektida ishlaydi: `AUTO_INCREMENT` o‘rniga `AUTOINCREMENT`, `DECIMAL` o‘rniga `REAL`, sana — matn. SELECT, JOIN va GROUP BY sintaksisi deyarli bir xil.' }
  ],
  steps: [
    {
      title: 'Bazani loyihalash',
      blocks: [
        'Quyidagi talablar bo‘yicha jadvallarni aniqlang: universitetda guruhlar bor; har bir talaba bitta guruhda o‘qiydi; talaba bir nechta fanni o‘qiydi va har bir fandan baho oladi.',
        { ol: [
          'Obyektlar (entities): guruh, talaba, fan.',
          'Munosabatlar: guruh — talaba (1:N), talaba — fan (M:N, baho bilan).',
          'M:N munosabat oraliq jadval `enrollments` orqali amalga oshiriladi.',
          'Har bir jadvalga birlamchi kalit, bog‘lanishlarga tashqi kalit.'
        ] },
        'Yuqoridagi ER-diagrammani daftaringizga yoki draw.io da chizing — u hisobotga kiradi.'
      ]
    },
    {
      title: 'Baza va jadvallarni yaratish (DDL)',
      blocks: [
        'phpMyAdmin → SQL bo‘limida yoki MySQL Workbench da quyidagi skriptni bajaring:',
        { code: ddl, lang: 'sql' },
        { warn: '`groups` — MySQL 8 da zaxiralangan so‘z, shuning uchun teskari qo‘shtirnoq (`` ` ``) ichida yoziladi. Jadvalga nom tanlashda zaxiralangan so‘zlardan qoching (masalan, `study_groups`).' },
        { tip: '`utf8mb4` kodirovkasi o‘zbek harflari (o‘, g‘) va emoji larni to‘g‘ri saqlaydi.' }
      ]
    },
    {
      title: 'Ma’lumot kiritish (INSERT)',
      blocks: [
        sql(`INSERT INTO groups (name, faculty) VALUES ('DI-23', 'Axborot texnologiyalari');

INSERT INTO students (full_name, email, birth_date, gpa, group_id)
VALUES ('Behruz Salimov', 'behruz@mail.uz', '2006-02-11', 4.1, 4);

SELECT * FROM groups;
SELECT id, full_name, gpa, group_id FROM students;`),
        'Endi cheklovlarni sinab ko‘ring — quyidagi so‘rovlar xato berishi kerak. Nima uchun?',
        sql(`-- 1) UNIQUE: bunday e-mail allaqachon bor
INSERT INTO students (full_name, email, gpa) VALUES ('Test', 'aziz@mail.uz', 4.0);`),
        sql(`-- 2) CHECK: GPA 0–5 oralig‘ida bo‘lishi kerak
INSERT INTO students (full_name, email, gpa) VALUES ('Test', 'test@mail.uz', 7.5);`)
      ]
    },
    {
      title: 'Oddiy tanlovlar: WHERE, ORDER BY, LIMIT',
      blocks: [
        sql(`-- GPA 4.0 dan yuqori talabalar, kamayish tartibida
SELECT full_name, gpa
FROM students
WHERE gpa >= 4.0
ORDER BY gpa DESC;`),
        sql(`-- Ismi 'D' yoki 'M' bilan boshlanadiganlar, e-mail ko‘rsatilmaganlar alohida
SELECT full_name, email FROM students WHERE full_name LIKE 'D%' OR full_name LIKE 'M%';
SELECT full_name FROM students WHERE email IS NULL;
SELECT full_name, birth_date FROM students WHERE birth_date BETWEEN '2004-01-01' AND '2004-12-31';
SELECT * FROM students ORDER BY full_name LIMIT 3 OFFSET 2;`)
      ]
    },
    {
      title: 'Agregat funksiyalar va guruhlash',
      blocks: [
        sql(`-- Umumiy statistika
SELECT COUNT(*) AS jami, ROUND(AVG(gpa), 2) AS ortacha, MAX(gpa) AS eng_yuqori, MIN(gpa) AS eng_past
FROM students;

-- Har bir guruh bo‘yicha
SELECT group_id, COUNT(*) AS talabalar, ROUND(AVG(gpa), 2) AS ortacha_gpa
FROM students
GROUP BY group_id
HAVING COUNT(*) >= 2
ORDER BY ortacha_gpa DESC;`),
        { note: '`WHERE` guruhlashdan **oldin** qatorlarni, `HAVING` guruhlashdan **keyin** guruhlarni filtrlaydi. Shuning uchun agregat funksiya (`COUNT`, `AVG`) faqat `HAVING` da ishlatiladi.' }
      ]
    },
    {
      title: 'Jadvallarni birlashtirish: JOIN',
      blocks: [
        sql(`-- Talaba va uning guruhi nomi
SELECT s.full_name, g.name AS guruh, g.faculty
FROM students s
JOIN groups g ON g.id = s.group_id
ORDER BY g.name, s.full_name;`),
        sql(`-- Kim qaysi fandan qanday baho olgan (3 ta jadval)
SELECT s.full_name, c.title AS fan, e.grade AS baho
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
WHERE e.grade >= 85
ORDER BY e.grade DESC;`),
        sql(`-- LEFT JOIN: hech kim yozilmagan fanlar ham ko‘rinsin
SELECT c.title, COUNT(e.student_id) AS yozilganlar, ROUND(AVG(e.grade), 1) AS ortacha_baho
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY yozilganlar DESC;`)
      ]
    },
    {
      title: 'O‘zgartirish, o‘chirish va tranzaksiya',
      blocks: [
        sql(`-- UPDATE va DELETE — doim WHERE bilan!
UPDATE students SET gpa = 4.7 WHERE full_name = 'Aziz Karimov';
DELETE FROM enrollments WHERE grade < 60;

SELECT full_name, gpa FROM students WHERE id = 1;
SELECT COUNT(*) AS qolgan_baholar FROM enrollments;`),
        sql(`-- Tranzaksiya: ikkala amal yo birga bajariladi, yo umuman bajarilmaydi
BEGIN;
UPDATE students SET group_id = 1 WHERE id = 2;
UPDATE groups SET name = 'DI-21A' WHERE id = 1;
ROLLBACK;   -- COMMIT o‘rniga: o‘zgarishlar bekor qilinadi

SELECT s.full_name, g.name FROM students s JOIN groups g ON g.id = s.group_id WHERE s.id = 2;`)
      ]
    },
    {
      title: 'Indeks, ko‘rinish (VIEW) va zaxira nusxa',
      blocks: [
        sql(`CREATE INDEX idx_students_group ON students(group_id);

-- Tez-tez ishlatiladigan murakkab so‘rovni VIEW sifatida saqlash
CREATE VIEW student_report AS
SELECT s.full_name, g.name AS guruh, COUNT(e.course_id) AS fanlar, ROUND(AVG(e.grade), 1) AS ortacha
FROM students s
LEFT JOIN groups g ON g.id = s.group_id
LEFT JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id;

SELECT * FROM student_report ORDER BY ortacha DESC;`),
        'MySQL da bazaning zaxira nusxasini olish va tiklash:',
        { code: 'mysqldump -u root -p university > university_backup.sql\nmysql -u root -p university < university_backup.sql', lang: 'bash' }
      ]
    }
  ],
  tasks: [
    {
      title: 'So‘rovlar to‘plami',
      level: 'easy',
      blocks: [
        'Quyidagi so‘rovlarni yozing:',
        { ol: [
          'Har bir fakultetdagi talabalar soni.',
          'GPA si guruh o‘rtachasidan yuqori talabalar (ichki so‘rov bilan).',
          'Eng ko‘p fanga yozilgan talaba.',
          '«Web tizimlari» fanidan baho olmagan talabalar.'
        ] }
      ]
    },
    {
      title: 'Bazani kengaytirish',
      level: 'medium',
      blocks: ['`teachers` jadvalini qo‘shing (har bir fanni bitta o‘qituvchi o‘qitadi) va har bir o‘qituvchi talabalarining o‘rtacha bahosini chiqaruvchi so‘rov yozing.']
    },
    {
      title: 'Variant bo‘yicha baza',
      level: 'hard',
      blocks: [
        'Jurnaldagi raqamingiz bo‘yicha kamida 4 ta bog‘langan jadvaldan iborat bazani loyihalang, har biriga 5+ yozuv kiriting va 10 ta turli so‘rov (JOIN, GROUP BY, HAVING, ichki so‘rov) yozing:',
        { ol: [
          'Kutubxona: kitoblar, mualliflar, o‘quvchilar, ijaralar.',
          'Internet-do‘kon: mahsulotlar, kategoriyalar, mijozlar, buyurtmalar.',
          'Poliklinika: shifokorlar, bemorlar, qabullar, tashxislar.',
          'Mehmonxona: xonalar, mijozlar, bronlar, xizmatlar.',
          'Avtosalon: avtomobillar, brendlar, mijozlar, sotuvlar.',
          'Kinoteatr: filmlar, zallar, seanslar, chiptalar.',
          'Sport klubi: murabbiylar, a’zolar, mashg‘ulotlar, to‘lovlar.',
          'Taksi xizmati: haydovchilar, avtomobillar, yo‘lovchilar, safarlar.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'ER-diagramma.',
    'DDL skripti (jadvallar yaratish).',
    'Har bir so‘rov matni va natijasi skrinshoti.',
    '`mysqldump` bilan olingan zaxira fayl.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Baza to‘g‘ri loyihalangan (ER-diagramma, 3NF)', '1'],
    ['Jadvallar kalitlar va cheklovlar bilan yaratilgan', '1'],
    ['INSERT/UPDATE/DELETE va tranzaksiya to‘g‘ri bajarilgan', '1'],
    ['SELECT: filtr, saralash, agregat, GROUP BY/HAVING, JOIN', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Birlamchi va tashqi kalit nima uchun kerak?',
    'Ko‘pga-ko‘p munosabat qanday amalga oshiriladi?',
    '`ON DELETE CASCADE` va `ON DELETE SET NULL` farqi nimada?',
    '`WHERE` va `HAVING` farqini misolda tushuntiring.',
    '`INNER JOIN` va `LEFT JOIN` natijalari qachon farq qiladi?',
    '`UPDATE` ni `WHERE` siz yozsa nima bo‘ladi?',
    'Tranzaksiya va `ROLLBACK` qachon kerak?',
    'Indeks va VIEW ning vazifasi nima?'
  ]
};
