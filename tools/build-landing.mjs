/*
 * Builds the static home page and the SEO files around it:
 *
 *   index.html          home page, Uzbek (default)
 *   ru.html             home page, Russian
 *   sitemap.xml         both home pages + the course, with hreflang pairs
 *   robots.txt          allow all, point at the sitemap
 *   site.webmanifest    name, icons and colours for "add to home screen"
 *   course.html         only the block between <!-- seo:start --> and <!-- seo:end -->
 *
 * The pages are plain HTML on purpose: search engines and link previews read
 * them without running JavaScript. Lesson lists and the numbers in the hero
 * (lessons, tasks, checks) come from the course itself, so they never drift.
 *
 * The site address is `homepage` in package.json. Change it there, then run:
 *   npm run build:landing
 * `npm run build:landing -- --check` fails if the committed files are stale.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildCourse } from '../src/course/index.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHECK = process.argv.includes('--check');

const pkg = JSON.parse(await readFile(`${ROOT}package.json`, 'utf8'));
const SITE = String(pkg.homepage || '').replace(/\/?$/, '/');
if (!/^https?:\/\//.test(SITE)) {
  console.error('✕ package.json → "homepage" must be the full site address, e.g. "https://kurs.example.uz/"');
  process.exit(1);
}

const YEAR = 2026;
const UPDATED = '2026-09-27';
const THEME_COLOR = '#0b1020';

/* ------------------------------------------------------------------ helpers */

const esc = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `code` spans in the course's short summaries → <code>. */
const inline = (value) => esc(value).replace(/`([^`]+)`/g, '<code>$1</code>');

const jsonLd = (data) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');

const pad = (n) => String(n).padStart(2, '0');

/** Russian nouns change with the number (1 урок, 3 урока, 9 уроков); Uzbek ones do not. */
function plural(forms, n) {
  if (typeof forms === 'string') return forms;
  const [one, few, many] = forms;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/* ------------------------------------------------------------------ content */

const ORG = {
  lab: { uz: 'NazarAI laboratoriyasi', ru: 'Лаборатория NazarAI' },
  university: 'University of Business and Science',
  branch: { uz: 'Namangan filiali', ru: 'Наманганский филиал' },
  developer: { uz: 'Xurshidbek Xamrayev', ru: 'Хуршидбек Хамраев' }
};

const TEXT = {
  uz: {
    htmlLang: 'uz',
    ogLocale: 'uz_UZ',
    file: 'index.html',
    path: '',
    title: 'Web Development — HTML, CSS va JavaScript interaktiv kursi | NazarAI',
    description: 'HTML, CSS va JavaScript’ni noldan o‘rganing: {lessons} dars, {tasks} amaliy topshiriq va brauzerda avtomatik tekshiruv. IT ga qadam qo‘yayotgan yoshlar uchun.',
    keywords: 'veb-dasturlash, web dasturlash kursi, HTML o‘rganish, CSS o‘rganish, JavaScript o‘rganish, frontend, dasturlashni noldan o‘rganish, IT kurs, onlayn kurs, NazarAI, UBS Namangan, University of Business and Science',
    ogAlt: 'Web Development — HTML, CSS va JavaScript interaktiv kursi',
    skip: 'Asosiy mazmunga o‘tish',
    nav: { label: 'Bo‘limlar', program: 'Dastur', how: 'Qanday ishlaydi', authors: 'Mualliflar', faq: 'Savollar' },
    langSwitch: { label: 'Русский', title: 'Страница на русском языке', href: 'ru.html', hreflang: 'ru' },
    start: 'Kursni boshlash',
    eyebrow: 'IT ga qadam qo‘yayotgan yoshlar uchun',
    h1: 'Veb-dasturlashni <span class="grad">amalda</span> o‘rganing',
    lead: 'HTML, CSS va JavaScript — noldan boshlab. Har bir darsda qisqa nazariya, jonli kod muharriri va beshta amaliy topshiriq bor. Yozgan kodingiz darhol ishga tushadi va avtomatik tekshiriladi.',
    secondary: 'Dastur bilan tanishish',
    heroNotes: ['Ro‘yxatdan o‘tish shart emas', 'O‘zbek va rus tillarida', 'Hech narsa o‘rnatilmaydi'],
    stats: { lessons: 'dars', tasks: 'amaliy topshiriq', checks: 'avtomatik tekshiruv', modules: 'modul' },
    mock: {
      task: 'Topshiriq 3 / 5',
      title: 'Kartaga soya va yumaloq burchak bering',
      checks: ['border-radius: 12px', 'box-shadow berilgan', 'Kenglik 300px'],
      passed: '3 tekshiruvdan 3 tasi o‘tdi',
      preview: 'Preview',
      card: 'Kofe',
      price: '45 000 so‘m'
    },
    audience: {
      title: 'Kurs kimlar uchun',
      lead: 'Oldindan tayyorgarlik kerak emas — faqat qiziqish va kompyuter.',
      items: [
        ['🎒', 'Maktab o‘quvchilari va abituriyentlar', 'IT sohasini tanlashdan oldin o‘zini sinab ko‘rmoqchi bo‘lganlar uchun.'],
        ['🎓', 'Talabalar', 'Veb tizimlari va dasturlash fanlarini amaliyot bilan mustahkamlash uchun.'],
        ['🔁', 'Kasbini o‘zgartirayotganlar', 'Noldan boshlab frontend dasturchilikka o‘tmoqchi bo‘lganlar uchun.']
      ]
    },
    how: {
      title: 'Qanday ishlaydi',
      lead: 'Har bir dars bitta ish joyida o‘tadi: chapda nazariya, o‘ngda kod va natija, pastda topshiriqlar.',
      steps: [
        ['Nazariyani o‘qing', 'Qisqa tushuntirish va darhol ishlatsa bo‘ladigan misollar.'],
        ['Kod yozing', 'HTML, CSS va JavaScript muharrirlari jonli preview va konsol bilan yonma-yon.'],
        ['Tekshiring', 'Topshiriq aniq mezonlar bo‘yicha tekshiriladi va nima mos kelmagani aytiladi.'],
        ['Oldinga yuring', 'Beshala topshiriq bajarilganda dars yakunlanadi. Natijalar brauzeringizda saqlanadi.']
      ],
      features: [
        ['Jonli preview va konsol', '<code>console.log()</code>, ogohlantirishlar va xatolar — muharrirdagi qator raqami bilan.'],
        ['Haqiqiy natija tekshiriladi', 'DOM, hisoblangan stillar, media-so‘rovlar, klikdan keyingi holat, LocalStorage va API javoblari.'],
        ['Maslahat va tayyor yechim', 'Qiyin joyda bosqichma-bosqich maslahatlar, oxirida esa namunaviy yechim.'],
        ['Xavfsiz muhit', 'Kodingiz alohida, izolyatsiyalangan <code>iframe</code> ichida bajariladi.'],
        ['Ikki til', 'Interfeys, nazariya va topshiriqlar o‘zbek va rus tillarida — bitta tugma bilan.'],
        ['Hisob kerak emas', 'Natijalar, kod va sozlamalar brauzerning o‘zida saqlanadi.']
      ]
    },
    program: {
      title: 'O‘quv dasturi',
      lead: '{modules} {modulesWord}, {lessons} {lessonsWord}. Har bir darsdagi topshiriqlar bir xil tartibda qiyinlashadi: takrorlash → kichik o‘zgarish → birlashtirish → mustaqil ish → challenge.',
      lessons: 'dars',
      open: 'Darsni ochish'
    },
    authors: {
      title: 'Mualliflar',
      labRole: 'Ishlab chiquvchi',
      lab: 'Kurs NazarAI laboratoriyasi tomonidan IT ga qadam qo‘yayotgan yoshlar uchun yaratilgan. Laboratoriya University of Business and Science oliy ta’lim muassasasining Namangan filialida tashkil etilgan.',
      devRole: 'Dasturchi',
      dev: 'Kurs platformasini — playground, avtomatik tekshiruv tizimi va o‘quv topshiriqlarini ishlab chiqqan.',
      uniRole: 'Oliy ta’lim muassasasi'
    },
    faq: {
      title: 'Ko‘p beriladigan savollar',
      items: [
        ['Oldin dasturlashni bilmasam ham bo‘ladimi?', 'Ha. Kurs noldan boshlanadi: birinchi dars veb qanday ishlashini va sahifa nimalardan iborat ekanini tushuntiradi. Har bir keyingi dars oldingisiga tayanadi.'],
        ['Kompyuterga nimani o‘rnatish kerak?', 'Hech narsa. Zamonaviy brauzer (Chrome, Firefox, Edge yoki Safari) yetarli — kod muharriri, preview va tekshiruv sahifaning o‘zida ishlaydi.'],
        ['Ro‘yxatdan o‘tish kerakmi?', 'Yo‘q. Natijalar va yozgan kodingiz shu brauzerda saqlanadi. Boshqa brauzer yoki qurilmada kurs boshidan ochiladi.'],
        ['Topshiriq qanday tekshiriladi?', 'Kodingiz brauzerdagi xavfsiz muhitda ishga tushadi, so‘ng natija — sahifa tuzilishi, stillar, tugma bosilgandan keyingi holat — aniq mezonlar bo‘yicha tekshiriladi. Mos kelmagan har bir mezon uchun sababi ko‘rsatiladi.'],
        ['Qiynalib qolsam-chi?', 'Har bir topshiriqda maslahatlar bor, ular birma-bir ochiladi. Oxirgi chora sifatida tayyor yechimni ko‘rib, uni tahlil qilish mumkin.'],
        ['Telefonda o‘qisa bo‘ladimi?', 'Sahifa telefonda ham ochiladi, lekin kod yozish uchun kompyuter yoki planshet ancha qulay.']
      ]
    },
    cta: {
      title: 'Birinchi sahifangizni bugun yarating',
      text: 'Birinchi dars bir necha daqiqa oladi. Natijalaringiz saqlanadi — istalgan vaqtda davom ettirasiz.'
    },
    footer: {
      rights: 'Barcha huquqlar himoyalangan.',
      developer: 'Dasturchi',
      course: 'Kurs',
      home: 'Bosh sahifa'
    }
  },

  ru: {
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    file: 'ru.html',
    path: 'ru.html',
    title: 'Web Development — интерактивный курс HTML, CSS и JavaScript | NazarAI',
    description: 'Изучите HTML, CSS и JavaScript с нуля: {lessons} урока, {tasks} практических задач и автопроверка в браузере. Курс для молодёжи, начинающей путь в IT.',
    keywords: 'веб-разработка, курс веб-разработки, изучить HTML, изучить CSS, изучить JavaScript, frontend, программирование с нуля, IT курс, онлайн курс, NazarAI, UBS Наманган, University of Business and Science',
    ogAlt: 'Web Development — интерактивный курс HTML, CSS и JavaScript',
    skip: 'Перейти к основному содержанию',
    nav: { label: 'Разделы', program: 'Программа', how: 'Как это работает', authors: 'Авторы', faq: 'Вопросы' },
    langSwitch: { label: 'O‘zbekcha', title: 'O‘zbek tilidagi sahifa', href: './', hreflang: 'uz' },
    start: 'Начать курс',
    eyebrow: 'Для молодёжи, которая делает первые шаги в IT',
    h1: 'Изучайте веб\u2011разработку <span class="grad">на практике</span>',
    lead: 'HTML, CSS и JavaScript — с нуля. В каждом уроке короткая теория, живой редактор кода и пять практических задач. Ваш код сразу запускается и проверяется автоматически.',
    secondary: 'Посмотреть программу',
    heroNotes: ['Без регистрации', 'На узбекском и русском', 'Ничего не нужно устанавливать'],
    stats: {
      lessons: ['урок', 'урока', 'уроков'],
      tasks: ['практическая задача', 'практические задачи', 'практических задач'],
      checks: ['автопроверка', 'автопроверки', 'автопроверок'],
      modules: ['модуль', 'модуля', 'модулей']
    },
    mock: {
      task: 'Задача 3 / 5',
      title: 'Добавьте карточке тень и скругление',
      checks: ['border-radius: 12px', 'Задан box-shadow', 'Ширина 300px'],
      passed: 'Пройдено 3 из 3 проверок',
      preview: 'Preview',
      card: 'Кофе',
      price: '45 000 сум'
    },
    audience: {
      title: 'Для кого этот курс',
      lead: 'Подготовка не нужна — только интерес и компьютер.',
      items: [
        ['🎒', 'Школьники и абитуриенты', 'Для тех, кто хочет попробовать себя, прежде чем выбрать IT.'],
        ['🎓', 'Студенты', 'Чтобы закрепить веб-системы и программирование на практике.'],
        ['🔁', 'Те, кто меняет профессию', 'Для тех, кто хочет с нуля перейти во frontend-разработку.']
      ]
    },
    how: {
      title: 'Как это работает',
      lead: 'Каждый урок проходит в одном рабочем месте: слева теория, справа код и результат, внизу задачи.',
      steps: [
        ['Прочитайте теорию', 'Короткое объяснение и примеры, которые можно сразу запустить.'],
        ['Напишите код', 'Редакторы HTML, CSS и JavaScript рядом с живым превью и консолью.'],
        ['Проверьте', 'Задача проверяется по чётким критериям — и вы видите, что именно не совпало.'],
        ['Двигайтесь дальше', 'Урок пройден, когда решены все пять задач. Прогресс хранится в браузере.']
      ],
      features: [
        ['Живое превью и консоль', '<code>console.log()</code>, предупреждения и ошибки — с номером строки в редакторе.'],
        ['Проверяется настоящий результат', 'DOM, вычисленные стили, медиазапросы, состояние после клика, LocalStorage и ответы API.'],
        ['Подсказки и готовое решение', 'Пошаговые подсказки в трудном месте, а в конце — эталонное решение.'],
        ['Безопасная среда', 'Ваш код выполняется в отдельном изолированном <code>iframe</code>.'],
        ['Два языка', 'Интерфейс, теория и задачи на узбекском и русском — переключение одной кнопкой.'],
        ['Без аккаунта', 'Прогресс, код и настройки хранятся прямо в браузере.']
      ]
    },
    program: {
      title: 'Программа курса',
      lead: '{modules} {modulesWord}, {lessons} {lessonsWord}. Задачи в каждом уроке усложняются по одной схеме: повторение → небольшое изменение → комбинация → самостоятельная работа → challenge.',
      lessons: ['урок', 'урока', 'уроков'],
      open: 'Открыть урок'
    },
    authors: {
      title: 'Авторы',
      labRole: 'Разработчик',
      lab: 'Курс создан лабораторией NazarAI для молодёжи, которая делает первые шаги в IT. Лаборатория основана в Наманганском филиале высшего учебного заведения University of Business and Science.',
      devRole: 'Программист',
      dev: 'Разработал платформу курса — playground, систему автоматической проверки и учебные задачи.',
      uniRole: 'Высшее учебное заведение'
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        ['Можно ли начать без знаний программирования?', 'Да. Курс начинается с нуля: первый урок объясняет, как устроен веб и из чего состоит страница. Каждый следующий урок опирается на предыдущий.'],
        ['Что нужно установить на компьютер?', 'Ничего. Достаточно современного браузера (Chrome, Firefox, Edge или Safari) — редактор, превью и проверка работают прямо на странице.'],
        ['Нужна ли регистрация?', 'Нет. Прогресс и ваш код сохраняются в этом браузере. В другом браузере или на другом устройстве курс откроется с начала.'],
        ['Как проверяются задачи?', 'Ваш код запускается в безопасной среде браузера, после чего результат — структура страницы, стили, состояние после клика — проверяется по чётким критериям. Для каждого несовпадения показывается причина.'],
        ['Что делать, если не получается?', 'В каждой задаче есть подсказки, они открываются по одной. В крайнем случае можно открыть готовое решение и разобрать его.'],
        ['Можно ли заниматься с телефона?', 'Страница открывается и на телефоне, но писать код гораздо удобнее на компьютере или планшете.']
      ]
    },
    cta: {
      title: 'Создайте свою первую страницу сегодня',
      text: 'Первый урок занимает несколько минут. Прогресс сохраняется — продолжите, когда удобно.'
    },
    footer: {
      rights: 'Все права защищены.',
      developer: 'Программист',
      course: 'Курс',
      home: 'Главная'
    }
  }
};

/* --------------------------------------------------------------- course data */

function courseFacts(locale) {
  const course = buildCourse(locale);
  const checks = course.lessons.reduce(
    (sum, lesson) => sum + lesson.tasks.reduce((total, task) => total + task.checks.length, 0),
    0
  );
  return {
    course,
    numbers: {
      lessons: course.totalLessons,
      tasks: course.totalTasks,
      checks,
      modules: course.modules.length
    }
  };
}

const fill = (text, numbers) => text.replace(/\{(\w+)\}/g, (_, key) => numbers[key]);

/* ------------------------------------------------------------ structured data */

function structuredData(locale, text, facts) {
  const { course, numbers } = facts;
  const pageUrl = SITE + text.path;
  const id = (name) => `${SITE}#${name}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollegeOrUniversity',
        '@id': id('ubs'),
        name: `${ORG.university} — ${ORG.branch[locale]}`,
        alternateName: 'UBS Namangan',
        address: { '@type': 'PostalAddress', addressLocality: 'Namangan', addressCountry: 'UZ' }
      },
      {
        '@type': 'Organization',
        '@id': id('nazarai'),
        name: ORG.lab[locale],
        alternateName: 'NazarAI',
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}assets/icon-512.png`, width: 512, height: 512 },
        parentOrganization: { '@id': id('ubs') },
        address: { '@type': 'PostalAddress', addressLocality: 'Namangan', addressCountry: 'UZ' }
      },
      {
        '@type': 'Person',
        '@id': id('developer'),
        name: ORG.developer[locale],
        alternateName: locale === 'uz' ? ORG.developer.ru : ORG.developer.uz,
        jobTitle: text.authors.devRole,
        worksFor: { '@id': id('nazarai') }
      },
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url: SITE,
        name: 'Web Development — NazarAI',
        inLanguage: ['uz', 'ru'],
        publisher: { '@id': id('nazarai') }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: text.title,
        description: fill(text.description, numbers),
        inLanguage: text.htmlLang,
        isPartOf: { '@id': id('website') },
        about: { '@id': id('course') },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}assets/og-image-${locale}.png`, width: 1200, height: 630 },
        dateModified: UPDATED
      },
      {
        '@type': 'Course',
        '@id': id('course'),
        name: locale === 'uz' ? 'Web Development: HTML, CSS va JavaScript' : 'Web Development: HTML, CSS и JavaScript',
        description: fill(text.description, numbers),
        url: `${SITE}course.html`,
        inLanguage: ['uz', 'ru'],
        educationalLevel: locale === 'uz' ? 'Boshlang‘ich' : 'Начальный',
        teaches: ['HTML', 'CSS', 'Flexbox', 'CSS Grid', 'JavaScript', 'DOM', 'Fetch API', 'async/await'],
        audience: { '@type': 'EducationalAudience', audienceType: text.eyebrow },
        provider: { '@id': id('nazarai') },
        author: { '@id': id('developer') },
        syllabusSections: course.modules.map((module) => ({
          '@type': 'Syllabus',
          name: `${module.title}: ${module.subtitle}`,
          description: module.lessons.map((lesson) => lesson.title).join(', ')
        })),
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          inLanguage: text.htmlLang,
          instructor: { '@id': id('developer') }
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: text.htmlLang,
        mainEntity: text.faq.items.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }
    ]
  };
}

/* ---------------------------------------------------------------------- head */

function head(locale, text, facts) {
  const other = locale === 'uz' ? TEXT.ru : TEXT.uz;
  const pageUrl = SITE + text.path;
  const description = fill(text.description, facts.numbers);
  const image = `${SITE}assets/og-image-${locale}.png`;

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(text.title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="${esc(text.keywords)}">
<meta name="author" content="${esc(ORG.developer[locale])}, ${esc(ORG.lab[locale])}">
<meta name="publisher" content="${esc(ORG.lab[locale])}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="${THEME_COLOR}">
<meta name="color-scheme" content="dark light">
<link rel="canonical" href="${pageUrl}">
<link rel="alternate" hreflang="${text.htmlLang}" href="${pageUrl}">
<link rel="alternate" hreflang="${other.htmlLang}" href="${SITE + other.path}">
<link rel="alternate" hreflang="x-default" href="${SITE}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Web Development — NazarAI">
<meta property="og:title" content="${esc(text.title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(text.ogAlt)}">
<meta property="og:locale" content="${text.ogLocale}">
<meta property="og:locale:alternate" content="${other.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(text.title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${esc(text.ogAlt)}">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="sitemap" type="application/xml" href="sitemap.xml">
<link rel="stylesheet" href="styles/landing.css">
<script>
  // Old course links were /#/lesson/task — send them to the course page.
  if (/^#\\/[\\w-]+/.test(location.hash)) location.replace('course.html' + location.hash);
  // Same theme as the course: the saved choice, otherwise the system's.
  try {
    var saved = JSON.parse(localStorage.getItem('webdev-course:v1') || '{}').theme;
    if (saved) document.documentElement.dataset.theme = saved;
  } catch (e) {}
</script>
<script type="application/ld+json">
${jsonLd(structuredData(locale, text, facts))}
</script>`;
}

/* ---------------------------------------------------------------------- body */

function heroMock(mock) {
  return `<div class="mock" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i><span>course.html</span></div>
        <div class="mock__grid">
          <div class="mock__code">
            <div class="mock__tabs"><b>HTML</b><b class="on">CSS</b><b>JS</b></div>
<pre><span class="t-sel">.card</span> {
  <span class="t-prop">width</span>: <span class="t-num">300px</span>;
  <span class="t-prop">padding</span>: <span class="t-num">20px</span>;
  <span class="t-prop">border-radius</span>: <span class="t-num">12px</span>;
  <span class="t-prop">box-shadow</span>: <span class="t-num">0 8px 24px</span>
    <span class="t-fn">rgb</span>(<span class="t-num">0 0 0</span> / <span class="t-num">.15</span>);
}</pre>
          </div>
          <div class="mock__preview">
            <span class="mock__label">${esc(mock.preview)}</span>
            <div class="mock__card"><strong>☕ ${esc(mock.card)}</strong><span>${esc(mock.price)}</span></div>
          </div>
        </div>
        <div class="mock__task">
          <div class="mock__task-head"><span>${esc(mock.task)}</span>${esc(mock.title)}</div>
          <ul>${mock.checks.map((check) => `<li><b>✓</b>${esc(check)}</li>`).join('')}</ul>
          <div class="mock__ok">${esc(mock.passed)}</div>
        </div>
      </div>`;
}

function curriculum(text, facts) {
  return facts.course.modules.map((module, index) => `
        <article class="module">
          <header class="module__head">
            <span class="module__num">${pad(index + 1)}</span>
            <div>
              <h3>${esc(module.title)}</h3>
              <p>${esc(module.subtitle)}</p>
            </div>
            <span class="module__count">${module.lessons.length} ${esc(plural(text.program.lessons, module.lessons.length))}</span>
          </header>
          <ol class="lessons">
${module.lessons.map((lesson) => `            <li><a href="course.html#/${lesson.id}/1" title="${esc(text.program.open)}: ${esc(lesson.title)}"><span class="lessons__num">${pad(lesson.number)}</span><span class="lessons__title">${esc(lesson.title)}</span><span class="lessons__sum">${inline(lesson.summary)}</span></a></li>`).join('\n')}
          </ol>
        </article>`).join('\n');
}

function body(locale, text, facts) {
  const { numbers } = facts;
  const t = text;
  const lab = ORG.lab[locale];
  const dev = ORG.developer[locale];

  return `<a class="skip" href="#main">${esc(t.skip)}</a>

<header class="site-head">
  <div class="wrap site-head__row">
    <a class="brand" href="${locale === 'uz' ? './' : 'ru.html'}" aria-label="Web Development — ${esc(t.footer.home)}">
      <img src="assets/favicon.svg" alt="" width="32" height="32">
      <span>Web Development<small>by NazarAI</small></span>
    </a>
    <nav class="site-nav" aria-label="${esc(t.nav.label)}">
      <a href="#dastur">${esc(t.nav.program)}</a>
      <a href="#qanday">${esc(t.nav.how)}</a>
      <a href="#mualliflar">${esc(t.nav.authors)}</a>
      <a href="#savollar">${esc(t.nav.faq)}</a>
    </nav>
    <div class="site-head__tools">
      <a class="lang-link" href="${t.langSwitch.href}" hreflang="${t.langSwitch.hreflang}" lang="${t.langSwitch.hreflang}" title="${esc(t.langSwitch.title)}">${esc(t.langSwitch.label)}</a>
      <a class="btn btn--primary btn--sm" href="course.html">${esc(t.start)}</a>
    </div>
  </div>
</header>

<main id="main">
  <section class="hero">
    <div class="wrap hero__grid">
      <div class="hero__text">
        <p class="eyebrow">${esc(t.eyebrow)}</p>
        <h1>${t.h1}</h1>
        <p class="lead">${esc(t.lead)}</p>
        <div class="hero__cta">
          <a class="btn btn--primary btn--lg" href="course.html">${esc(t.start)} <span aria-hidden="true">→</span></a>
          <a class="btn btn--ghost btn--lg" href="#dastur">${esc(t.secondary)}</a>
        </div>
        <ul class="hero__notes">
${t.heroNotes.map((note) => `          <li>${esc(note)}</li>`).join('\n')}
        </ul>
      </div>
      ${heroMock(t.mock)}
    </div>
    <div class="wrap">
      <dl class="stats">
${['lessons', 'tasks', 'checks', 'modules'].map((key) => `        <div><dt>${esc(plural(t.stats[key], numbers[key]))}</dt><dd>${numbers[key]}</dd></div>`).join('\n')}
      </dl>
    </div>
  </section>

  <section class="section" aria-labelledby="kimlar-title">
    <div class="wrap">
      <h2 id="kimlar-title">${esc(t.audience.title)}</h2>
      <p class="section__lead">${esc(t.audience.lead)}</p>
      <ul class="cards cards--3">
${t.audience.items.map(([icon, title, textLine]) => `        <li class="card"><span class="card__icon" aria-hidden="true">${icon}</span><h3>${esc(title)}</h3><p>${esc(textLine)}</p></li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="section section--alt" id="qanday" aria-labelledby="qanday-title">
    <div class="wrap">
      <h2 id="qanday-title">${esc(t.how.title)}</h2>
      <p class="section__lead">${esc(t.how.lead)}</p>
      <ol class="steps">
${t.how.steps.map(([title, textLine], index) => `        <li><span class="steps__num" aria-hidden="true">${index + 1}</span><h3>${esc(title)}</h3><p>${esc(textLine)}</p></li>`).join('\n')}
      </ol>
      <ul class="features">
${t.how.features.map(([title, textLine]) => `        <li><h3>${esc(title)}</h3><p>${textLine}</p></li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="section" id="dastur" aria-labelledby="dastur-title">
    <div class="wrap">
      <h2 id="dastur-title">${esc(t.program.title)}</h2>
      <p class="section__lead">${esc(fill(t.program.lead, {
        ...numbers,
        modulesWord: plural(t.stats.modules, numbers.modules),
        lessonsWord: plural(t.stats.lessons, numbers.lessons)
      }))}</p>
      <div class="modules">${curriculum(t, facts)}
      </div>
    </div>
  </section>

  <section class="section section--alt" id="mualliflar" aria-labelledby="mualliflar-title">
    <div class="wrap">
      <h2 id="mualliflar-title">${esc(t.authors.title)}</h2>
      <div class="authors">
        <article class="author author--lab">
          <p class="author__role">${esc(t.authors.labRole)}</p>
          <h3>${esc(lab)}</h3>
          <p>${esc(t.authors.lab)}</p>
          <p class="author__place"><span aria-hidden="true">🏛</span> ${esc(ORG.university)} — ${esc(ORG.branch[locale])}</p>
        </article>
        <article class="author">
          <p class="author__role">${esc(t.authors.devRole)}</p>
          <h3>${esc(dev)}</h3>
          <p>${esc(t.authors.dev)}</p>
          <p class="author__place"><span aria-hidden="true">🧪</span> ${esc(lab)}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="savollar" aria-labelledby="savollar-title">
    <div class="wrap wrap--narrow">
      <h2 id="savollar-title">${esc(t.faq.title)}</h2>
      <div class="faq">
${t.faq.items.map(([question, answer]) => `        <details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="wrap cta__box">
      <div>
        <h2>${esc(t.cta.title)}</h2>
        <p>${esc(t.cta.text)}</p>
      </div>
      <a class="btn btn--primary btn--lg" href="course.html">${esc(t.start)} <span aria-hidden="true">→</span></a>
    </div>
  </section>
</main>

<footer class="site-foot">
  <div class="wrap site-foot__row">
    <div>
      <p class="site-foot__brand">© ${YEAR} ${esc(lab)}</p>
      <p>${esc(ORG.university)} — ${esc(ORG.branch[locale])}</p>
      <p>${esc(t.footer.developer)}: ${esc(dev)}</p>
    </div>
    <nav class="site-foot__nav" aria-label="${esc(t.footer.course)}">
      <a href="course.html">${esc(t.footer.course)}</a>
      <a href="#dastur">${esc(t.nav.program)}</a>
      <a href="#savollar">${esc(t.nav.faq)}</a>
      <a href="${t.langSwitch.href}" hreflang="${t.langSwitch.hreflang}" lang="${t.langSwitch.hreflang}">${esc(t.langSwitch.label)}</a>
    </nav>
  </div>
  <p class="wrap site-foot__small">${esc(t.footer.rights)}</p>
</footer>`;
}

function page(locale) {
  const text = TEXT[locale];
  const facts = courseFacts(locale);
  return `<!doctype html>
<!-- Generated by tools/build-landing.mjs — edit the generator, not this file. -->
<html lang="${text.htmlLang}">
<head>
${head(locale, text, facts)}
</head>
<body>
${body(locale, text, facts)}
</body>
</html>
`;
}

/* ------------------------------------------------------------ other outputs */

function sitemap() {
  const pair = `
    <xhtml:link rel="alternate" hreflang="uz" href="${SITE}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${SITE}ru.html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${pair}
  </url>
  <url>
    <loc>${SITE}ru.html</loc>
    <lastmod>${UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>${pair}
  </url>
  <url>
    <loc>${SITE}course.html</loc>
    <lastmod>${UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /
Disallow: /tests/
Disallow: /tools/

Sitemap: ${SITE}sitemap.xml
`;
}

function manifest() {
  return `${JSON.stringify({
    name: 'Web Development — NazarAI',
    short_name: 'WebDev',
    description: fill(TEXT.uz.description, courseFacts('uz').numbers),
    lang: 'uz',
    start_url: './course.html',
    scope: './',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }, null, 2)}\n`;
}

/** Only the marked block of course.html is ours; the rest belongs to the app. */
async function courseHead() {
  const file = `${ROOT}course.html`;
  const current = await readFile(file, 'utf8');
  const description = fill(TEXT.uz.description, courseFacts('uz').numbers);
  const block = `<!-- seo:start — generated by tools/build-landing.mjs -->
<title>Web Development — kurs | NazarAI</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(ORG.developer.uz)}, ${esc(ORG.lab.uz)}">
<meta name="theme-color" content="${THEME_COLOR}">
<link rel="canonical" href="${SITE}course.html">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Web Development — NazarAI">
<meta property="og:title" content="Web Development — HTML, CSS va JavaScript interaktiv kursi">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}course.html">
<meta property="og:image" content="${SITE}assets/og-image-uz.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<!-- seo:end -->`;
  if (!/<!-- seo:start[\s\S]*?<!-- seo:end -->/.test(current)) {
    throw new Error('course.html: <!-- seo:start --> … <!-- seo:end --> block not found');
  }
  return [file, current.replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, block)];
}

/* ---------------------------------------------------------------------- run */

const outputs = [
  [`${ROOT}index.html`, page('uz')],
  [`${ROOT}ru.html`, page('ru')],
  [`${ROOT}sitemap.xml`, sitemap()],
  [`${ROOT}robots.txt`, robots()],
  [`${ROOT}site.webmanifest`, manifest()],
  await courseHead()
];

if (CHECK) {
  const stale = [];
  for (const [file, content] of outputs) {
    const current = await readFile(file, 'utf8').catch(() => null);
    if (current !== content) stale.push(file.slice(ROOT.length));
  }
  if (stale.length) {
    console.error(`✕ Bosh sahifa eskirgan: ${stale.join(', ')} — "npm run build:landing" ni ishga tushiring`);
    process.exit(1);
  }
  console.log('✓ Bosh sahifa va SEO fayllar kurs bilan mos');
} else {
  for (const [file, content] of outputs) await writeFile(file, content);
  console.log(`✓ Yaratildi: ${outputs.map(([file]) => file.slice(ROOT.length)).join(', ')}`);
  console.log(`  Sayt manzili: ${SITE}`);
}
