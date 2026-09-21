/*
 * O'zbekcha kurs matnlari — asosiy (ruscha) kontent ustiga qo'yiladigan qatlam.
 *
 * Tarjima faqat o'quvchi o'qiydigan narsani almashtiradi: dars sarlavhasi va
 * nazariyasi, topshiriq matni, maslahatlar, tekshiruv yorliqlari va —
 * ko'rinadigan matn kutilgan joylarda — starter/solution/checks ichidagi
 * satrlar. Tekshiruvlar mantig'i asosiy faylda yagona nusxada qoladi.
 *
 * Tuzilishi va qoidalari: docs/AUTHORING.md → «Tarjima qo'shish».
 */
import { htmlLessons } from './html.js';
import { cssLessons } from './css.js';
import { javascriptLessons } from './javascript.js';
import { projectLessons } from './project.js';

export const uz = {
  modules: {
    html: { title: 'HTML', subtitle: 'Belgilash: sahifaning tuzilishi va ma’nosi' },
    css: { title: 'CSS', subtitle: 'Tashqi ko‘rinish: rang, o‘lcham, joylashuv' },
    javascript: { title: 'JavaScript', subtitle: 'Xatti-harakat: mantiq, ma’lumot va o‘zaro ta’sir' },
    project: { title: 'Loyiha', subtitle: 'Hammasi birga: karkasdan ishlaydigan ilovagacha' }
  },
  lessons: {
    ...htmlLessons,
    ...cssLessons,
    ...javascriptLessons,
    ...projectLessons
  }
};
