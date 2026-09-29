/*
 * O‘quv «server»i: ma’ruza va amaliy mashg‘ulotlardagi fetch() misollari
 * sandbox ichida shu javoblarni oladi — internet kerak emas va natija har
 * doim bir xil. Kalit — URL (oxiri yoki boshi mos kelsa yetarli).
 */
export const STUDENTS = [
  { id: 1, name: 'Aziz Karimov', group: 'DI-22', gpa: 4.6, city: 'Toshkent' },
  { id: 2, name: 'Dilnoza Rahimova', group: 'DI-22', gpa: 4.9, city: 'Namangan' },
  { id: 3, name: 'Jasur Aliyev', group: 'DI-21', gpa: 3.8, city: 'Andijon' },
  { id: 4, name: 'Malika Tosheva', group: 'DI-21', gpa: 4.2, city: 'Namangan' },
  { id: 5, name: 'Sardor Yusupov', group: 'DI-23', gpa: 3.5, city: 'Farg‘ona' }
];

export const COURSES = [
  { id: 1, title: 'Web tizimlari', credits: 6, semester: 5 },
  { id: 2, title: 'Ma’lumotlar bazasi', credits: 5, semester: 4 },
  { id: 3, title: 'Algoritmlar', credits: 4, semester: 3 }
];

export const DEMO_API = {
  mockApi: {
    '/api/students': { json: STUDENTS, delayMs: 400 },
    '/api/students/2': { json: STUDENTS[1], delayMs: 250 },
    '/api/courses': { json: COURSES, delayMs: 300 },
    '/api/weather': { json: { city: 'Namangan', temp: 21, condition: 'Quyoshli' }, delayMs: 500 },
    '/api/slow': { json: { message: 'Nihoyat javob keldi' }, delayMs: 2000 },
    '/api/feedback': { status: 201, json: { id: 101, status: 'qabul qilindi' }, delayMs: 350 },
    '/api/missing': { status: 404, json: { error: 'Topilmadi' }, delayMs: 200 },
    '/api/broken': { status: 500, json: { error: 'Serverda xatolik' }, delayMs: 200 }
  }
};
