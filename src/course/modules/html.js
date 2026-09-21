/*
 * Module 1 — HTML (lessons 1–9).
 * Only the HTML editor is open here; CSS and JS unlock in later modules.
 */
import { DEMO_IMAGES } from '../assets.js';

const lesson01 = {
  id: 'web-and-html',
  title: 'Веб и HTML',
  summary: 'Как устроен веб и из чего состоит первая страница.',
  editors: ['html'],
  theory: [
    { lead: 'HTML — это язык разметки. Он не программирует поведение, а описывает, из каких частей состоит страница.' },
    { h: 'Что происходит, когда вы открываете сайт' },
    { ol: [
      'Браузер отправляет запрос на сервер по адресу (URL).',
      'Сервер отвечает текстом — HTML-документом.',
      'Браузер разбирает HTML и строит из него DOM — дерево элементов.',
      'DOM рисуется на экране; CSS задаёт вид, JavaScript — поведение.'
    ] },
    { h: 'Тег, элемент, содержимое' },
    { code: '<h1>Привет, мир!</h1>\n  ↑        ↑         ↑\nоткрывающий  текст  закрывающий\n    тег            тег' },
    { p: 'Пара тегов вместе с содержимым — это **элемент**. Большинство элементов парные, но есть и одиночные: `<br>`, `<img>`, `<hr>`.' },
    { h: 'Первые теги' },
    { table: { head: ['Тег', 'Зачем'], rows: [
      ['`<h1>`…`<h6>`', 'Заголовки: от самого важного к самому мелкому'],
      ['`<p>`', 'Абзац текста'],
      ['`<!-- -->`', 'Комментарий — браузер его не показывает']
    ] } },
    { note: 'Справа — playground. Пишите код слева, результат появляется сразу. Кнопка «Проверить» запускает автотесты задачи.' }
  ],
  starter: { html: '<!-- пишите код здесь -->\n' },
  tasks: [
    {
      id: 'web-and-html-1',
      title: 'Первый заголовок',
      difficulty: 'easy',
      description: 'Создайте заголовок первого уровня с текстом `Привет, мир!`',
      checks: [
        { label: 'На странице есть <h1>', kind: 'exists', selector: 'h1' },
        { label: 'Текст заголовка — «Привет, мир!»', kind: 'text', selector: 'h1', equals: 'Привет, мир!' }
      ],
      hints: [
        'Заголовок первого уровня — это тег <h1>.',
        'Не забудьте закрывающий тег: </h1>.'
      ],
      solution: { html: '<h1>Привет, мир!</h1>' }
    },
    {
      id: 'web-and-html-2',
      title: 'Заголовок и абзац',
      difficulty: 'easy',
      description: 'Оставьте заголовок и добавьте под ним абзац `<p>` с любым текстом длиной не меньше 10 символов.',
      starter: { html: '<h1>Привет, мир!</h1>\n' },
      checks: [
        { label: 'Заголовок <h1> на месте', kind: 'exists', selector: 'h1' },
        { label: 'Появился абзац <p>', kind: 'exists', selector: 'p' },
        { label: 'В абзаце не меньше 10 символов', kind: 'text', selector: 'p', matches: '.{10,}' }
      ],
      hints: ['Абзац — это <p>текст</p>.'],
      solution: { html: '<h1>Привет, мир!</h1>\n<p>Это моя первая страница на HTML.</p>' }
    },
    {
      id: 'web-and-html-3',
      title: 'Три уровня заголовков',
      difficulty: 'medium',
      description: 'Постройте иерархию: `<h1>`, под ним `<h2>`, под ним `<h3>`. После каждого заголовка — абзац.',
      starter: { html: '<h1>Мой блог</h1>\n' },
      checks: [
        { label: 'Есть <h1>', kind: 'exists', selector: 'h1' },
        { label: 'Есть <h2>', kind: 'exists', selector: 'h2' },
        { label: 'Есть <h3>', kind: 'exists', selector: 'h3' },
        { label: 'Абзацев — минимум 3', kind: 'count', selector: 'p', min: 3 }
      ],
      hints: ['Уровни заголовков — h1, h2, h3.', 'Каждый абзац — отдельный тег <p>.'],
      solution: {
        html: '<h1>Мой блог</h1>\n<p>Здесь я пишу о вебе.</p>\n<h2>Раздел: HTML</h2>\n<p>Разметка страниц.</p>\n<h3>Подраздел: теги</h3>\n<p>Теги описывают структуру.</p>'
      }
    },
    {
      id: 'web-and-html-4',
      title: 'Визитка',
      difficulty: 'medium',
      description: 'Сделайте визитку: имя в `<h1>`, профессия и город — двумя отдельными абзацами. Добавьте HTML-комментарий с пояснением.',
      checks: [
        { label: 'Имя в <h1>', kind: 'text', selector: 'h1', matches: '\\S' },
        { label: 'Два абзаца', kind: 'count', selector: 'p', min: 2 },
        { label: 'В коде есть комментарий', kind: 'source', lang: 'html', matches: '<!--[\\s\\S]*?-->' }
      ],
      hints: ['Комментарий пишется так: <!-- текст -->.'],
      solution: {
        html: '<!-- визитка -->\n<h1>Алиса Иванова</h1>\n<p>Frontend-разработчик</p>\n<p>Ташкент</p>'
      }
    },
    {
      id: 'web-and-html-5',
      title: 'Challenge: страница «Обо мне»',
      difficulty: 'hard',
      description: 'Соберите небольшую страницу: заголовок `<h1>`, подзаголовок `<h2>` и минимум три абзаца. Общий объём текста — не меньше 120 символов.',
      checks: [
        { label: 'Есть <h1> с текстом', kind: 'text', selector: 'h1', matches: '\\S' },
        { label: 'Есть <h2> с текстом', kind: 'text', selector: 'h2', matches: '\\S' },
        { label: 'Абзацев — минимум 3', kind: 'count', selector: 'p', min: 3 },
        {
          label: 'Текста не меньше 120 символов',
          kind: 'custom',
          fn: "const len = ctx.text(ctx.doc.body.textContent).length; return len >= 120 || 'Сейчас ' + len + ' символов, нужно 120';"
        }
      ],
      hints: [
        'Структура: h1 → p → h2 → p → p.',
        'Проверка считает весь видимый текст страницы.'
      ],
      solution: {
        html: '<h1>Обо мне</h1>\n<p>Меня зовут Алиса, я учусь веб-разработке и каждый день пишу код.</p>\n<h2>Чем я занимаюсь</h2>\n<p>Верстаю страницы, разбираюсь в HTML и CSS, делаю небольшие проекты.</p>\n<p>Дальше в планах JavaScript и работа с настоящими API.</p>'
      }
    }
  ]
};

const lesson02 = {
  id: 'html-document',
  title: 'HTML-документ',
  summary: 'Скелет страницы: doctype, html, head, body и метаданные.',
  editors: ['html'],
  theory: [
    { lead: 'Настоящая страница — это не просто набор тегов, а документ со строгой структурой.' },
    { code: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Название вкладки</title>\n</head>\n<body>\n  <h1>Видимое содержимое</h1>\n</body>\n</html>' },
    { h: 'Что за что отвечает' },
    { table: { head: ['Часть', 'Роль'], rows: [
      ['`<!DOCTYPE html>`', 'Говорит браузеру: это современный HTML5'],
      ['`<html lang="ru">`', 'Корневой элемент, `lang` — язык содержимого'],
      ['`<head>`', 'Служебная информация: кодировка, заголовок вкладки, описание'],
      ['`<meta charset="utf-8">`', 'Кодировка, без неё кириллица превращается в «кракозябры»'],
      ['`<title>`', 'Текст на вкладке браузера и в результатах поиска'],
      ['`<body>`', 'Всё, что видит пользователь']
    ] } },
    { note: 'В этом уроке пишите документ целиком — playground умеет запускать и полный документ, и фрагмент.' }
  ],
  starter: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n</head>\n<body>\n\n</body>\n</html>\n' },
  tasks: [
    {
      id: 'html-document-1',
      title: 'Заголовок вкладки',
      difficulty: 'easy',
      description: 'Добавьте в `<head>` тег `<title>` с текстом `Моя страница`.',
      checks: [
        { label: 'В документе есть <title>', kind: 'source', lang: 'html', matches: '<title>' },
        { label: 'Заголовок вкладки — «Моя страница»', kind: 'custom', fn: "return ctx.doc.title.trim() === 'Моя страница' || 'document.title = ' + JSON.stringify(ctx.doc.title);" }
      ],
      hints: ['<title>Моя страница</title> внутри <head>.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Моя страница</title>\n</head>\n<body>\n\n</body>\n</html>' }
    },
    {
      id: 'html-document-2',
      title: 'Описание страницы',
      difficulty: 'easy',
      description: 'Добавьте `<meta name="description" content="...">` — короткое описание страницы (не меньше 20 символов).',
      starter: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Моя страница</title>\n</head>\n<body>\n  <h1>Привет!</h1>\n</body>\n</html>\n' },
      checks: [
        { label: 'Есть meta с name="description"', kind: 'exists', selector: 'meta[name="description"]' },
        { label: 'Описание не короче 20 символов', kind: 'attr', selector: 'meta[name="description"]', name: 'content', matches: '.{20,}' }
      ],
      hints: ['Одиночный тег: <meta name="description" content="текст">.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Моя страница</title>\n  <meta name="description" content="Учебная страница про структуру HTML-документа">\n</head>\n<body>\n  <h1>Привет!</h1>\n</body>\n</html>' }
    },
    {
      id: 'html-document-3',
      title: 'Документ целиком',
      difficulty: 'medium',
      description: 'Соберите документ с нуля: doctype, `lang="ru"`, кодировка, viewport, title и `<h1>` в теле.',
      starter: { html: '' },
      checks: [
        { label: 'Указан <!DOCTYPE html>', kind: 'source', lang: 'html', matches: '<!doctype\\s+html>' },
        { label: 'У <html> есть lang="ru"', kind: 'source', lang: 'html', matches: '<html[^>]*lang=["\\\']ru' },
        { label: 'Есть meta charset', kind: 'exists', selector: 'meta[charset]' },
        { label: 'Есть meta viewport', kind: 'exists', selector: 'meta[name="viewport"]' },
        { label: 'Заголовок вкладки заполнен', kind: 'custom', fn: "return ctx.doc.title.trim().length > 0 || 'Тег <title> пуст';" },
        { label: 'В <body> есть <h1>', kind: 'exists', selector: 'body h1' }
      ],
      hints: [
        'viewport: <meta name="viewport" content="width=device-width, initial-scale=1">',
        'Порядок: doctype → html → head → body.'
      ],
      solution: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Структура документа</title>\n</head>\n<body>\n  <h1>Документ собран правильно</h1>\n</body>\n</html>' }
    },
    {
      id: 'html-document-4',
      title: 'Head и body не путаем',
      difficulty: 'medium',
      description: 'В документе ниже содержимое перепутано: видимый текст оказался в `<head>`, а `<title>` — в `<body>`. Наведите порядок.',
      starter: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <h1>Каталог книг</h1>\n</head>\n<body>\n  <title>Каталог</title>\n  <p>Здесь будут книги.</p>\n</body>\n</html>\n' },
      checks: [
        {
          label: '<h1> переехал в <body>',
          kind: 'custom',
          fn: "const src = ctx.source.html; const head = (src.match(/<head[^>]*>([\\s\\S]*?)<\\/head>/i) || [])[1] || ''; const body = (src.match(/<body[^>]*>([\\s\\S]*?)<\\/body>/i) || [])[1] || ''; if (/<h1/i.test(head)) return 'Заголовок <h1> всё ещё внутри <head>'; return /<h1/i.test(body) || 'В <body> нет заголовка <h1>';"
        },
        {
          label: '<title> переехал в <head>',
          kind: 'custom',
          fn: "const src = ctx.source.html; const head = (src.match(/<head[^>]*>([\\s\\S]*?)<\\/head>/i) || [])[1] || ''; const body = (src.match(/<body[^>]*>([\\s\\S]*?)<\\/body>/i) || [])[1] || ''; if (/<title/i.test(body)) return 'Тег <title> всё ещё внутри <body>'; return /<title/i.test(head) || 'В <head> нет тега <title>';"
        },
        { label: 'Заголовок вкладки — «Каталог»', kind: 'custom', fn: "return ctx.doc.title.trim() === 'Каталог' || 'document.title = ' + JSON.stringify(ctx.doc.title);" },
        { label: 'Абзац остался в <body>', kind: 'exists', selector: 'body p' }
      ],
      hints: ['В <head> — только служебные теги. Всё видимое — в <body>.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <title>Каталог</title>\n</head>\n<body>\n  <h1>Каталог книг</h1>\n  <p>Здесь будут книги.</p>\n</body>\n</html>' }
    },
    {
      id: 'html-document-5',
      title: 'Challenge: страница с полным head',
      difficulty: 'hard',
      description: 'Соберите документ, готовый к публикации: charset, viewport, description, `lang="ru"`, осмысленный `<title>` и содержимое — заголовок плюс два абзаца.',
      starter: { html: '' },
      checks: [
        { label: 'Есть <!DOCTYPE html>', kind: 'source', lang: 'html', matches: '<!doctype\\s+html>' },
        { label: 'lang="ru" у <html>', kind: 'source', lang: 'html', matches: '<html[^>]*lang=["\\\']ru' },
        { label: 'meta charset на месте', kind: 'exists', selector: 'meta[charset]' },
        { label: 'meta viewport на месте', kind: 'exists', selector: 'meta[name="viewport"]' },
        { label: 'meta description не короче 30 символов', kind: 'attr', selector: 'meta[name="description"]', name: 'content', matches: '.{30,}' },
        { label: '<title> не короче 5 символов', kind: 'custom', fn: "return ctx.doc.title.trim().length >= 5 || 'Слишком короткий title';" },
        { label: 'В теле: <h1> и два абзаца', kind: 'count', selector: 'body p', min: 2 }
      ],
      hints: ['Соберите head построчно и только потом переходите к body.'],
      solution: { html: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Личная страница разработчика: проекты, контакты и заметки">\n  <title>Алиса Иванова — портфолио</title>\n</head>\n<body>\n  <h1>Алиса Иванова</h1>\n  <p>Учусь веб-разработке и собираю портфолио.</p>\n  <p>Здесь будут мои проекты и заметки.</p>\n</body>\n</html>' }
    }
  ]
};

const lesson03 = {
  id: 'html-text',
  title: 'Текст',
  summary: 'Заголовки, абзацы, выделение, переносы и спецсимволы.',
  editors: ['html'],
  theory: [
    { lead: 'Текст — основа большинства страниц. HTML даёт ему смысл, а не только внешний вид.' },
    { table: { head: ['Тег', 'Смысл'], rows: [
      ['`<strong>`', 'Важный фрагмент (браузер показывает жирным)'],
      ['`<em>`', 'Смысловое ударение (курсив)'],
      ['`<mark>`', 'Выделение маркером'],
      ['`<small>`', 'Мелкий текст: сноски, примечания'],
      ['`<br>`', 'Перенос строки внутри абзаца'],
      ['`<hr>`', 'Смысловой разделитель'],
      ['`<blockquote>`', 'Цитата целым блоком'],
      ['`<code>`', 'Фрагмент кода']
    ] } },
    { h: 'Важно про пробелы' },
    { p: 'Несколько пробелов и переносов строк в коде браузер схлопывает в один пробел. Новый абзац делается тегом `<p>`, а не пустыми строками.' },
    { h: 'Спецсимволы' },
    { code: '&lt;   →  <\n&gt;   →  >\n&amp;  →  &\n&nbsp; →  неразрывный пробел' },
    { warn: '`<b>` и `<i>` меняют только вид. `<strong>` и `<em>` несут смысл — их читает голосовой помощник и учитывает поиск.' }
  ],
  starter: { html: '<p>Обычный текст.</p>\n' },
  tasks: [
    {
      id: 'html-text-1',
      title: 'Важное — жирным',
      difficulty: 'easy',
      description: 'Внутри абзаца выделите слово `важно` тегом `<strong>`.',
      starter: { html: '<p>Это очень важно для проекта.</p>\n' },
      checks: [
        { label: 'Есть тег <strong>', kind: 'exists', selector: 'strong' },
        { label: 'Внутри <strong> — слово «важно»', kind: 'text', selector: 'strong', contains: 'важно' },
        { label: '<strong> находится внутри абзаца', kind: 'exists', selector: 'p strong' }
      ],
      hints: ['Оберните слово: <strong>важно</strong>.'],
      solution: { html: '<p>Это очень <strong>важно</strong> для проекта.</p>' }
    },
    {
      id: 'html-text-2',
      title: 'Курсив и перенос',
      difficulty: 'easy',
      description: 'Добавьте в абзац `<em>` с любым словом и разбейте строку тегом `<br>`.',
      starter: { html: '<p>Первая строка. Вторая строка.</p>\n' },
      checks: [
        { label: 'Есть <em>', kind: 'exists', selector: 'em' },
        { label: 'Есть перенос <br>', kind: 'exists', selector: 'br' },
        { label: 'Оба тега внутри абзаца', kind: 'exists', selector: 'p em' }
      ],
      hints: ['<br> — одиночный тег, закрывать не нужно.'],
      solution: { html: '<p>Первая <em>строка</em>.<br>Вторая строка.</p>' }
    },
    {
      id: 'html-text-3',
      title: 'Цитата с автором',
      difficulty: 'medium',
      description: 'Добавьте `<blockquote>` с цитатой, а под ней — `<small>` с именем автора. Отделите блок горизонтальной линией `<hr>`.',
      checks: [
        { label: 'Есть <blockquote>', kind: 'exists', selector: 'blockquote' },
        { label: 'В цитате не меньше 20 символов', kind: 'text', selector: 'blockquote', matches: '.{20,}' },
        { label: 'Есть <small> с автором', kind: 'text', selector: 'small', matches: '\\S' },
        { label: 'Есть разделитель <hr>', kind: 'exists', selector: 'hr' }
      ],
      hints: ['Порядок свободный, важно наличие всех трёх тегов.'],
      solution: { html: '<blockquote>Программа должна быть написана для людей, а машина — лишь исполнитель.</blockquote>\n<small>Гарольд Абельсон</small>\n<hr>' }
    },
    {
      id: 'html-text-4',
      title: 'Спецсимволы',
      difficulty: 'medium',
      description: 'Выведите на странице текст: `Теги <p> и <a> — основа HTML`. Угловые скобки должны быть видны как символы, а не превращаться в теги.',
      starter: { html: '<p></p>\n' },
      checks: [
        { label: 'На странице виден текст со скобками', kind: 'text', selector: 'p', contains: '<p> и <a>' },
        { label: 'Использованы сущности &lt; и &gt;', kind: 'source', lang: 'html', matches: '&lt;' },
        { label: 'Лишних настоящих ссылок не появилось', kind: 'absent', selector: 'p a' }
      ],
      hints: ['&lt; даёт «<», &gt; даёт «>».'],
      solution: { html: '<p>Теги &lt;p&gt; и &lt;a&gt; — основа HTML</p>' }
    },
    {
      id: 'html-text-5',
      title: 'Challenge: статья',
      difficulty: 'hard',
      description: 'Сверстайте короткую статью: `<h1>`, вводный абзац, подзаголовок `<h2>`, ещё два абзаца, в тексте — `<strong>`, `<em>` и `<code>`, в конце цитата `<blockquote>`.',
      checks: [
        { label: 'Есть <h1>', kind: 'exists', selector: 'h1' },
        { label: 'Есть <h2>', kind: 'exists', selector: 'h2' },
        { label: 'Абзацев — минимум 3', kind: 'count', selector: 'p', min: 3 },
        { label: 'Есть <strong>', kind: 'exists', selector: 'strong' },
        { label: 'Есть <em>', kind: 'exists', selector: 'em' },
        { label: 'Есть <code>', kind: 'exists', selector: 'code' },
        { label: 'Есть <blockquote>', kind: 'exists', selector: 'blockquote' }
      ],
      hints: ['Пишите по частям и нажимайте «Запустить» после каждого блока.'],
      solution: {
        html: '<h1>Семантика текста</h1>\n<p>HTML описывает <strong>смысл</strong> текста, а не только его вид.</p>\n<h2>Почему это важно</h2>\n<p>Скринридеры и поисковые роботы читают <em>структуру</em> документа.</p>\n<p>Фрагменты кода помечают тегом <code>code</code>.</p>\n<blockquote>Хорошая разметка понятна и без стилей.</blockquote>'
      }
    }
  ]
};

const lesson04 = {
  id: 'html-links',
  title: 'Ссылки',
  summary: 'Тег <a>: внешние ссылки, новые вкладки, якоря и навигация.',
  editors: ['html'],
  theory: [
    { lead: 'Ссылка — это то, что превращает набор документов в веб. Отвечает за неё тег `<a>`.' },
    { code: '<a href="https://google.com">Google</a>' },
    { h: 'Атрибуты' },
    { table: { head: ['Атрибут', 'Что делает'], rows: [
      ['`href`', 'Адрес перехода — обязательный атрибут'],
      ['`target="_blank"`', 'Открыть в новой вкладке'],
      ['`rel="noopener"`', 'Защита при открытии в новой вкладке (пишется вместе с target)'],
      ['`title`', 'Всплывающая подсказка']
    ] } },
    { h: 'Виды адресов' },
    { code: '<a href="https://example.com">внешний сайт</a>\n<a href="about.html">другая страница сайта</a>\n<a href="#contacts">секция на этой же странице</a>\n<a href="mailto:me@mail.com">написать письмо</a>\n<a href="tel:+998901234567">позвонить</a>' },
    { h: 'Якоря' },
    { p: 'Ссылка `href="#contacts"` прокручивает страницу к элементу с `id="contacts"`. Значение `id` должно быть уникальным на странице.' },
    { note: 'Текст ссылки должен быть осмысленным: «Скачать прайс» лучше, чем «нажмите сюда».' }
  ],
  starter: { html: '<!-- ваша ссылка -->\n' },
  tasks: [
    {
      id: 'html-links-1',
      title: 'Ссылка на Google',
      difficulty: 'easy',
      description: 'Создайте ссылку на `https://google.com` с текстом `Google`.',
      checks: [
        { label: 'На странице есть ссылка <a>', kind: 'exists', selector: 'a' },
        { label: 'href ведёт на google.com', kind: 'attr', selector: 'a', name: 'href', contains: 'google.com' },
        { label: 'Текст ссылки — «Google»', kind: 'text', selector: 'a', equals: 'Google' }
      ],
      hints: ['Шаблон: <a href="адрес">текст</a>.', 'Адрес пишется полностью, вместе с https://'],
      solution: { html: '<a href="https://google.com">Google</a>' }
    },
    {
      id: 'html-links-2',
      title: 'Новая вкладка',
      difficulty: 'easy',
      description: 'Пусть ссылка открывается в новой вкладке: добавьте `target="_blank"` и `rel="noopener"`.',
      starter: { html: '<a href="https://google.com">Google</a>\n' },
      checks: [
        { label: 'Ссылка на месте', kind: 'attr', selector: 'a', name: 'href', contains: 'google.com' },
        { label: 'target="_blank"', kind: 'attr', selector: 'a', name: 'target', equals: '_blank' },
        { label: 'rel содержит noopener', kind: 'attr', selector: 'a', name: 'rel', contains: 'noopener' }
      ],
      hints: ['Атрибуты пишутся через пробел внутри открывающего тега.'],
      solution: { html: '<a href="https://google.com" target="_blank" rel="noopener">Google</a>' }
    },
    {
      id: 'html-links-3',
      title: 'Меню из четырёх ссылок',
      difficulty: 'medium',
      description: 'Соберите меню: список `<ul>`, в нём четыре пункта `<li>`, и в каждом — ссылка. Каждая ссылка должна иметь непустой `href`.',
      checks: [
        { label: 'Есть список <ul>', kind: 'exists', selector: 'ul' },
        { label: 'Четыре пункта <li>', kind: 'count', selector: 'ul li', equals: 4 },
        { label: 'В каждом пункте есть ссылка', kind: 'count', selector: 'ul li a', equals: 4 },
        { label: 'У всех ссылок непустой href', kind: 'attr', selector: 'ul li a', name: 'href', matches: '\\S' },
        { label: 'У всех ссылок есть текст', kind: 'text', selector: 'ul li a', matches: '\\S' }
      ],
      hints: ['Каждый пункт меню: <li><a href="...">Название</a></li>.'],
      solution: {
        html: '<ul>\n  <li><a href="index.html">Главная</a></li>\n  <li><a href="about.html">О нас</a></li>\n  <li><a href="services.html">Услуги</a></li>\n  <li><a href="contacts.html">Контакты</a></li>\n</ul>'
      }
    },
    {
      id: 'html-links-4',
      title: 'Ссылки на секции страницы',
      difficulty: 'medium',
      description: 'Сделайте оглавление: три ссылки вида `#about`, `#skills`, `#contacts` и три секции с такими же `id`.',
      starter: { html: '<h1>Портфолио</h1>\n\n<!-- оглавление -->\n\n<!-- секции -->\n' },
      checks: [
        { label: 'Три якорные ссылки', kind: 'count', selector: 'a[href^="#"]', min: 3 },
        {
          label: 'У каждой ссылки есть секция с таким id',
          kind: 'custom',
          fn: "const links = ctx.$$('a[href^=\"#\"]'); if (links.length < 3) return 'Нужно минимум 3 якорные ссылки'; for (const link of links) { const id = link.getAttribute('href').slice(1); if (!id) return 'Пустой якорь в href'; if (!ctx.doc.getElementById(id)) return 'Нет элемента с id=\"' + id + '\"'; } return true;"
        },
        { label: 'Есть секция id="about"', kind: 'exists', selector: '#about' },
        { label: 'Есть секция id="skills"', kind: 'exists', selector: '#skills' },
        { label: 'Есть секция id="contacts"', kind: 'exists', selector: '#contacts' }
      ],
      hints: ['id задаётся любому элементу: <h2 id="about">О себе</h2>.', 'В href перед именем ставится решётка.'],
      solution: {
        html: '<h1>Портфолио</h1>\n<ul>\n  <li><a href="#about">О себе</a></li>\n  <li><a href="#skills">Навыки</a></li>\n  <li><a href="#contacts">Контакты</a></li>\n</ul>\n<h2 id="about">О себе</h2>\n<p>Учусь веб-разработке.</p>\n<h2 id="skills">Навыки</h2>\n<p>HTML, CSS.</p>\n<h2 id="contacts">Контакты</h2>\n<p>me@mail.com</p>'
      }
    },
    {
      id: 'html-links-5',
      title: 'Challenge: навигация сайта',
      difficulty: 'hard',
      description: 'Соберите полноценный блок навигации: минимум 5 ссылок, среди них внешняя (в новой вкладке, с `rel`), якорная, почтовая `mailto:` и телефонная `tel:`.',
      checks: [
        { label: 'Ссылок минимум 5', kind: 'count', selector: 'a', min: 5 },
        { label: 'Есть внешняя ссылка на https://', kind: 'count', selector: 'a[href^="https://"]', min: 1 },
        { label: 'Внешняя открывается в новой вкладке', kind: 'exists', selector: 'a[target="_blank"]' },
        { label: 'У неё есть rel="noopener"', kind: 'attr', selector: 'a[target="_blank"]', name: 'rel', contains: 'noopener' },
        { label: 'Есть якорная ссылка', kind: 'exists', selector: 'a[href^="#"]' },
        { label: 'Есть mailto-ссылка', kind: 'exists', selector: 'a[href^="mailto:"]' },
        { label: 'Есть tel-ссылка', kind: 'exists', selector: 'a[href^="tel:"]' },
        { label: 'У всех ссылок есть текст', kind: 'text', selector: 'a', matches: '\\S' }
      ],
      hints: [
        'Сложите ссылки в <ul>, так их проще читать.',
        'mailto:name@mail.com и tel:+998901234567 — это тоже значения href.'
      ],
      solution: {
        html: '<ul>\n  <li><a href="#top">Наверх</a></li>\n  <li><a href="about.html">О компании</a></li>\n  <li><a href="https://google.com" target="_blank" rel="noopener">Партнёры</a></li>\n  <li><a href="mailto:hello@site.com">hello@site.com</a></li>\n  <li><a href="tel:+998901234567">+998 90 123 45 67</a></li>\n</ul>\n<h2 id="top">Наверх</h2>'
      }
    }
  ]
};

const lesson05 = {
  id: 'html-images',
  title: 'Изображения',
  summary: 'Тег <img>, альтернативный текст, размеры и подписи.',
  editors: ['html'],
  sandbox: { assets: DEMO_IMAGES },
  theory: [
    { lead: 'Картинка вставляется одиночным тегом `<img>` — у него нет закрывающей пары.' },
    { code: '<img src="photos/cat.jpg" alt="Рыжий кот на подоконнике">' },
    { table: { head: ['Атрибут', 'Зачем'], rows: [
      ['`src`', 'Путь к файлу — обязателен'],
      ['`alt`', 'Текст вместо картинки: для скринридеров и на случай ошибки загрузки'],
      ['`width` / `height`', 'Размеры в пикселях; резервируют место и убирают «прыжок» вёрстки'],
      ['`loading="lazy"`', 'Отложенная загрузка картинок ниже экрана']
    ] } },
    { h: 'Картинка с подписью' },
    { code: '<figure>\n  <img src="photos/city.jpg" alt="Вид на город">\n  <figcaption>Ташкент, вечер</figcaption>\n</figure>' },
    { warn: '`alt` пишут всегда. Для декоративных картинок оставляют пустым: `alt=""` — тогда скринридер их пропустит.' },
    { note: 'В этом уроке доступны учебные файлы: `photos/cat.jpg`, `photos/city.jpg`, `photos/mountain.jpg`, `photos/portrait.jpg`, `photos/small.jpg`, `images/logo.svg`.' }
  ],
  starter: { html: '<!-- вставьте картинку -->\n' },
  tasks: [
    {
      id: 'html-images-1',
      title: 'Первая картинка',
      difficulty: 'easy',
      description: 'Вставьте изображение `photos/cat.jpg` с осмысленным `alt` (не меньше 5 символов).',
      checks: [
        { label: 'На странице есть <img>', kind: 'exists', selector: 'img' },
        { label: 'src указывает на photos/cat.jpg', kind: 'source', lang: 'html', contains: 'photos/cat.jpg' },
        { label: 'alt заполнен (5+ символов)', kind: 'attr', selector: 'img', name: 'alt', matches: '.{5,}' }
      ],
      hints: ['<img src="photos/cat.jpg" alt="описание">'],
      solution: { html: '<img src="photos/cat.jpg" alt="Рыжий кот">' }
    },
    {
      id: 'html-images-2',
      title: 'Размеры',
      difficulty: 'easy',
      description: 'Задайте картинке `width="240"` и `height="160"`.',
      starter: { html: '<img src="photos/city.jpg" alt="Вид на город">\n' },
      checks: [
        { label: 'Картинка на месте', kind: 'exists', selector: 'img' },
        { label: 'width="240"', kind: 'attr', selector: 'img', name: 'width', equals: '240' },
        { label: 'height="160"', kind: 'attr', selector: 'img', name: 'height', equals: '160' },
        { label: 'alt не потерялся', kind: 'attr', selector: 'img', name: 'alt', matches: '\\S' }
      ],
      hints: ['Размеры указываются числом, без «px».'],
      solution: { html: '<img src="photos/city.jpg" alt="Вид на город" width="240" height="160">' }
    },
    {
      id: 'html-images-3',
      title: 'Картинка с подписью',
      difficulty: 'medium',
      description: 'Оберните изображение в `<figure>` и добавьте подпись `<figcaption>` длиной не меньше 8 символов.',
      starter: { html: '<img src="photos/mountain.jpg" alt="Горный хребет">\n' },
      checks: [
        { label: 'Есть <figure>', kind: 'exists', selector: 'figure' },
        { label: 'Картинка внутри figure', kind: 'exists', selector: 'figure img' },
        { label: 'Есть <figcaption>', kind: 'exists', selector: 'figure figcaption' },
        { label: 'Подпись не короче 8 символов', kind: 'text', selector: 'figcaption', matches: '.{8,}' }
      ],
      hints: ['figcaption ставится внутри figure, рядом с img.'],
      solution: {
        html: '<figure>\n  <img src="photos/mountain.jpg" alt="Горный хребет">\n  <figcaption>Чимганские горы на рассвете</figcaption>\n</figure>'
      }
    },
    {
      id: 'html-images-4',
      title: 'Кликабельный логотип',
      difficulty: 'medium',
      description: 'Сделайте логотип `images/logo.svg` ссылкой на главную страницу `index.html`.',
      checks: [
        { label: 'Есть ссылка на index.html', kind: 'exists', selector: 'a[href="index.html"]' },
        { label: 'Внутри ссылки — картинка', kind: 'exists', selector: 'a img' },
        { label: 'Использован файл логотипа', kind: 'source', lang: 'html', contains: 'images/logo.svg' },
        { label: 'У картинки есть alt', kind: 'attr', selector: 'a img', name: 'alt', matches: '\\S' }
      ],
      hints: ['Картинка просто кладётся внутрь тега <a>.'],
      solution: { html: '<a href="index.html"><img src="images/logo.svg" alt="На главную" width="120" height="40"></a>' }
    },
    {
      id: 'html-images-5',
      title: 'Challenge: галерея',
      difficulty: 'hard',
      description: 'Соберите галерею из трёх блоков `<figure>`: в каждом картинка с `alt`, подписью и атрибутом `loading="lazy"`. Над галереей — заголовок.',
      checks: [
        { label: 'Есть заголовок', kind: 'text', selector: 'h1, h2', matches: '\\S' },
        { label: 'Три <figure>', kind: 'count', selector: 'figure', equals: 3 },
        { label: 'Три картинки', kind: 'count', selector: 'figure img', equals: 3 },
        { label: 'У всех картинок заполнен alt', kind: 'attr', selector: 'figure img', name: 'alt', matches: '.{4,}' },
        { label: 'У всех картинок loading="lazy"', kind: 'attr', selector: 'figure img', name: 'loading', equals: 'lazy' },
        { label: 'Три подписи', kind: 'count', selector: 'figcaption', equals: 3 }
      ],
      hints: ['Скопируйте один блок figure и поменяйте в нём картинку и подпись.'],
      solution: {
        html: '<h2>Галерея</h2>\n<figure>\n  <img src="photos/cat.jpg" alt="Рыжий кот" loading="lazy">\n  <figcaption>Кот</figcaption>\n</figure>\n<figure>\n  <img src="photos/city.jpg" alt="Вечерний город" loading="lazy">\n  <figcaption>Город</figcaption>\n</figure>\n<figure>\n  <img src="photos/mountain.jpg" alt="Горы в снегу" loading="lazy">\n  <figcaption>Горы</figcaption>\n</figure>'
      }
    }
  ]
};

const lesson06 = {
  id: 'html-lists',
  title: 'Списки',
  summary: 'Маркированные, нумерованные, вложенные списки и списки определений.',
  editors: ['html'],
  theory: [
    { lead: 'Списками размечают меню, шаги инструкции, характеристики товара — всё перечислимое.' },
    { h: 'Три вида списков' },
    { code: '<ul>            <ol>            <dl>\n  <li>чай</li>    <li>шаг 1</li>   <dt>HTML</dt>\n  <li>кофе</li>   <li>шаг 2</li>   <dd>разметка</dd>\n</ul>           </ol>           </dl>' },
    { table: { head: ['Список', 'Когда использовать'], rows: [
      ['`<ul>`', 'Порядок неважен: меню, характеристики'],
      ['`<ol>`', 'Порядок важен: инструкция, рейтинг'],
      ['`<dl>`', 'Пары «термин — определение»: глоссарий']
    ] } },
    { h: 'Вложенность' },
    { p: 'Вложенный список кладут **внутрь** `<li>`, а не между пунктами:' },
    { code: '<ul>\n  <li>Фрукты\n    <ul>\n      <li>Яблоко</li>\n    </ul>\n  </li>\n</ul>' },
    { note: 'Прямым потомком `<ul>` и `<ol>` может быть только `<li>` — всё остальное кладут внутрь пункта.' }
  ],
  starter: { html: '<!-- ваш список -->\n' },
  tasks: [
    {
      id: 'html-lists-1',
      title: 'Список покупок',
      difficulty: 'easy',
      description: 'Создайте маркированный список из трёх пунктов.',
      checks: [
        { label: 'Есть <ul>', kind: 'exists', selector: 'ul' },
        { label: 'Ровно три <li>', kind: 'count', selector: 'ul > li', equals: 3 },
        { label: 'Все пункты с текстом', kind: 'text', selector: 'ul > li', matches: '\\S' }
      ],
      hints: ['<ul> — контейнер, <li> — пункт.'],
      solution: { html: '<ul>\n  <li>Хлеб</li>\n  <li>Молоко</li>\n  <li>Яблоки</li>\n</ul>' }
    },
    {
      id: 'html-lists-2',
      title: 'Пошаговая инструкция',
      difficulty: 'easy',
      description: 'Замените маркированный список нумерованным и доведите число шагов до четырёх.',
      starter: { html: '<ul>\n  <li>Открыть редактор</li>\n  <li>Написать код</li>\n</ul>\n' },
      checks: [
        { label: 'Есть <ol>', kind: 'exists', selector: 'ol' },
        { label: 'Четыре шага', kind: 'count', selector: 'ol > li', equals: 4 },
        { label: 'Маркированного списка не осталось', kind: 'absent', selector: 'ul' }
      ],
      hints: ['ol = ordered list, нумерация появляется автоматически.'],
      solution: { html: '<ol>\n  <li>Открыть редактор</li>\n  <li>Написать код</li>\n  <li>Запустить страницу</li>\n  <li>Проверить результат</li>\n</ol>' }
    },
    {
      id: 'html-lists-3',
      title: 'Вложенный список',
      difficulty: 'medium',
      description: 'Сделайте двухуровневый список: два раздела верхнего уровня, и у первого — вложенный список минимум из двух пунктов.',
      checks: [
        { label: 'Есть внешний список', kind: 'exists', selector: 'ul, ol' },
        { label: 'Есть вложенный список внутри <li>', kind: 'exists', selector: 'li ul, li ol' },
        { label: 'Во вложенном списке минимум 2 пункта', kind: 'count', selector: 'li ul > li, li ol > li', min: 2 },
        { label: 'Всего пунктов минимум 4', kind: 'count', selector: 'li', min: 4 }
      ],
      hints: ['Вложенный <ul> пишется внутри <li>, до его закрывающего тега.'],
      solution: {
        html: '<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>'
      }
    },
    {
      id: 'html-lists-4',
      title: 'Глоссарий',
      difficulty: 'medium',
      description: 'Создайте список определений `<dl>` с тремя парами «термин `<dt>` — описание `<dd>`».',
      checks: [
        { label: 'Есть <dl>', kind: 'exists', selector: 'dl' },
        { label: 'Три термина <dt>', kind: 'count', selector: 'dl dt', equals: 3 },
        { label: 'Три определения <dd>', kind: 'count', selector: 'dl dd', equals: 3 },
        { label: 'Определения не короче 5 символов', kind: 'text', selector: 'dl dd', matches: '.{5,}' }
      ],
      hints: ['Пары идут подряд: dt, dd, dt, dd…'],
      solution: {
        html: '<dl>\n  <dt>HTML</dt>\n  <dd>язык разметки страниц</dd>\n  <dt>CSS</dt>\n  <dd>язык описания стилей</dd>\n  <dt>JS</dt>\n  <dd>язык программирования для браузера</dd>\n</dl>'
      }
    },
    {
      id: 'html-lists-5',
      title: 'Challenge: каталог курса',
      difficulty: 'hard',
      description: 'Сверстайте каталог: нумерованный список из трёх модулей, в каждом — вложенный маркированный список тем (минимум по 2). Над каталогом — заголовок.',
      checks: [
        { label: 'Есть заголовок', kind: 'text', selector: 'h1, h2', matches: '\\S' },
        { label: 'Внешний список — нумерованный', kind: 'count', selector: 'ol > li', equals: 3 },
        { label: 'В каждом модуле вложенный <ul>', kind: 'count', selector: 'ol > li > ul', equals: 3 },
        { label: 'Тем всего минимум 6', kind: 'count', selector: 'ol > li > ul > li', min: 6 },
        { label: 'У всех тем есть текст', kind: 'text', selector: 'ol > li > ul > li', matches: '\\S' }
      ],
      hints: ['Сделайте один модуль целиком, проверьте, затем скопируйте его ещё дважды.'],
      solution: {
        html: '<h2>Программа курса</h2>\n<ol>\n  <li>HTML\n    <ul><li>Теги</li><li>Ссылки</li></ul>\n  </li>\n  <li>CSS\n    <ul><li>Селекторы</li><li>Flexbox</li></ul>\n  </li>\n  <li>JavaScript\n    <ul><li>Переменные</li><li>DOM</li></ul>\n  </li>\n</ol>'
      }
    }
  ]
};

const lesson07 = {
  id: 'html-tables',
  title: 'Таблицы',
  summary: 'Строки, ячейки, заголовки, объединение и подпись таблицы.',
  editors: ['html'],
  theory: [
    { lead: 'Таблица нужна для табличных данных: расписаний, прайсов, отчётов. Для вёрстки макета таблицы не используют — для этого есть CSS Grid и Flexbox.' },
    { code: '<table>\n  <caption>Расписание</caption>\n  <thead>\n    <tr><th>День</th><th>Тема</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Пн</td><td>HTML</td></tr>\n  </tbody>\n</table>' },
    { table: { head: ['Тег', 'Смысл'], rows: [
      ['`<table>`', 'Сама таблица'],
      ['`<caption>`', 'Подпись, первым элементом внутри table'],
      ['`<thead>` / `<tbody>` / `<tfoot>`', 'Шапка, тело, итоги'],
      ['`<tr>`', 'Строка'],
      ['`<th>`', 'Ячейка-заголовок (жирная, по центру)'],
      ['`<td>`', 'Обычная ячейка']
    ] } },
    { h: 'Объединение ячеек' },
    { code: '<td colspan="2">на две колонки</td>\n<td rowspan="3">на три строки</td>' },
    { note: 'Число `<td>` в каждой строке должно совпадать — иначе таблица «поедет».' }
  ],
  starter: { html: '<table>\n\n</table>\n' },
  tasks: [
    {
      id: 'html-tables-1',
      title: 'Таблица 2×2',
      difficulty: 'easy',
      description: 'Создайте таблицу: строка заголовков из двух `<th>` и одна строка данных из двух `<td>`.',
      checks: [
        { label: 'Есть <table>', kind: 'exists', selector: 'table' },
        { label: 'Две строки <tr>', kind: 'count', selector: 'table tr', equals: 2 },
        { label: 'Две ячейки-заголовка', kind: 'count', selector: 'table th', equals: 2 },
        { label: 'Две обычные ячейки', kind: 'count', selector: 'table td', equals: 2 }
      ],
      hints: ['Каждая строка — отдельный <tr>.'],
      solution: { html: '<table>\n  <tr><th>Товар</th><th>Цена</th></tr>\n  <tr><td>Кофе</td><td>25 000</td></tr>\n</table>' }
    },
    {
      id: 'html-tables-2',
      title: 'Подпись и шапка',
      difficulty: 'easy',
      description: 'Добавьте таблице `<caption>` и вынесите строку заголовков в `<thead>`, а данные — в `<tbody>`.',
      starter: { html: '<table>\n  <tr><th>Товар</th><th>Цена</th></tr>\n  <tr><td>Кофе</td><td>25 000</td></tr>\n  <tr><td>Чай</td><td>18 000</td></tr>\n</table>\n' },
      checks: [
        { label: 'Есть <caption> с текстом', kind: 'text', selector: 'table caption', matches: '.{4,}' },
        { label: 'Заголовки внутри <thead>', kind: 'count', selector: 'table thead th', equals: 2 },
        { label: 'Данные внутри <tbody>', kind: 'count', selector: 'table tbody tr', equals: 2 }
      ],
      hints: ['caption ставится сразу после открывающего <table>.'],
      solution: {
        html: '<table>\n  <caption>Прайс-лист</caption>\n  <thead>\n    <tr><th>Товар</th><th>Цена</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Кофе</td><td>25 000</td></tr>\n    <tr><td>Чай</td><td>18 000</td></tr>\n  </tbody>\n</table>' }
    },
    {
      id: 'html-tables-3',
      title: 'Расписание на неделю',
      difficulty: 'medium',
      description: 'Постройте таблицу 3 колонки × 5 строк данных: день, тема, время. Не забудьте шапку и подпись.',
      checks: [
        { label: 'Есть подпись', kind: 'text', selector: 'caption', matches: '\\S' },
        { label: 'Три колонки в шапке', kind: 'count', selector: 'thead th', equals: 3 },
        { label: 'Пять строк данных', kind: 'count', selector: 'tbody tr', equals: 5 },
        { label: 'Всего 15 ячеек данных', kind: 'count', selector: 'tbody td', equals: 15 }
      ],
      hints: ['5 строк × 3 ячейки = 15 тегов <td>.'],
      solution: {
        html: '<table>\n  <caption>Расписание</caption>\n  <thead>\n    <tr><th>День</th><th>Тема</th><th>Время</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Пн</td><td>HTML</td><td>10:00</td></tr>\n    <tr><td>Вт</td><td>CSS</td><td>10:00</td></tr>\n    <tr><td>Ср</td><td>JS</td><td>12:00</td></tr>\n    <tr><td>Чт</td><td>DOM</td><td>12:00</td></tr>\n    <tr><td>Пт</td><td>Проект</td><td>14:00</td></tr>\n  </tbody>\n</table>' }
    },
    {
      id: 'html-tables-4',
      title: 'Объединение ячеек',
      difficulty: 'medium',
      description: 'Добавьте в таблицу строку итогов: ячейка «Итого» на две колонки (`colspan="2"`) и ячейка с суммой.',
      starter: { html: '<table>\n  <thead>\n    <tr><th>Товар</th><th>Кол-во</th><th>Сумма</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Кофе</td><td>2</td><td>50 000</td></tr>\n    <tr><td>Чай</td><td>1</td><td>18 000</td></tr>\n  </tbody>\n</table>\n' },
      checks: [
        { label: 'Есть ячейка с colspan="2"', kind: 'attr', selector: 'td[colspan], th[colspan]', name: 'colspan', equals: '2' },
        { label: 'В ней написано «Итого»', kind: 'text', selector: '[colspan="2"]', contains: 'Итого' },
        { label: 'Строк в таблице стало 4', kind: 'count', selector: 'tr', equals: 4 }
      ],
      hints: ['В строке итогов будет только две ячейки: одна с colspan="2", вторая с суммой.'],
      solution: {
        html: '<table>\n  <thead>\n    <tr><th>Товар</th><th>Кол-во</th><th>Сумма</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Кофе</td><td>2</td><td>50 000</td></tr>\n    <tr><td>Чай</td><td>1</td><td>18 000</td></tr>\n    <tr><td colspan="2">Итого</td><td>68 000</td></tr>\n  </tbody>\n</table>' }
    },
    {
      id: 'html-tables-5',
      title: 'Challenge: сравнение тарифов',
      difficulty: 'hard',
      description: 'Сверстайте таблицу тарифов: подпись, шапка из 4 колонок (Возможность + 3 тарифа), минимум 4 строки сравнения и строка `<tfoot>` с ценами.',
      checks: [
        { label: 'Есть подпись таблицы', kind: 'text', selector: 'caption', matches: '\\S' },
        { label: 'Четыре колонки в шапке', kind: 'count', selector: 'thead th', equals: 4 },
        { label: 'Минимум 4 строки сравнения', kind: 'count', selector: 'tbody tr', min: 4 },
        { label: 'Есть <tfoot>', kind: 'exists', selector: 'tfoot' },
        { label: 'В каждой строке тела по 4 ячейки', kind: 'custom', fn: "const rows = ctx.$$('tbody tr'); if (!rows.length) return 'Нет строк в tbody'; for (const row of rows) { const cells = row.querySelectorAll('td, th').length; if (cells !== 4) return 'В строке ' + cells + ' ячеек вместо 4'; } return true;" },
        { label: 'В первой колонке строк — заголовки <th>', kind: 'count', selector: 'tbody tr th', min: 4 }
      ],
      hints: [
        'Первая ячейка каждой строки может быть <th scope="row">.',
        'tfoot пишется после tbody.'
      ],
      solution: {
        html: '<table>\n  <caption>Тарифы</caption>\n  <thead>\n    <tr><th>Возможность</th><th>Start</th><th>Pro</th><th>Max</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Проекты</th><td>1</td><td>10</td><td>∞</td></tr>\n    <tr><th scope="row">Поддержка</th><td>—</td><td>Почта</td><td>24/7</td></tr>\n    <tr><th scope="row">Домен</th><td>—</td><td>1</td><td>5</td></tr>\n    <tr><th scope="row">Хранилище</th><td>1 ГБ</td><td>20 ГБ</td><td>200 ГБ</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">Цена</th><td>0</td><td>99 000</td><td>199 000</td></tr>\n  </tfoot>\n</table>' }
    }
  ]
};

const lesson08 = {
  id: 'html-forms',
  title: 'Формы',
  summary: 'Поля ввода, подписи, выпадающие списки и кнопки.',
  editors: ['html'],
  theory: [
    { lead: 'Форма — это способ получить данные от пользователя: логин, заказ, отзыв.' },
    { code: '<form>\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Отправить</button>\n</form>' },
    { h: 'Типы input' },
    { table: { head: ['type', 'Для чего'], rows: [
      ['`text`', 'Обычная строка'],
      ['`email` / `tel` / `url`', 'Проверяет формат и меняет клавиатуру на телефоне'],
      ['`password`', 'Скрывает символы'],
      ['`number`', 'Только числа, есть `min` и `max`'],
      ['`checkbox` / `radio`', 'Флажки и переключатели'],
      ['`date` / `color` / `range`', 'Готовые виджеты браузера']
    ] } },
    { h: 'label — обязателен' },
    { p: 'Атрибут `for` у `<label>` должен совпадать с `id` поля. Тогда клик по подписи ставит курсор в поле, а скринридер читает поле правильно.' },
    { h: 'Полезные атрибуты' },
    { ul: [
      '`name` — под этим именем значение уйдёт на сервер;',
      '`placeholder` — подсказка внутри поля (не заменяет label!);',
      '`required` — поле обязательно;',
      '`value` — значение по умолчанию;',
      '`disabled`, `readonly` — заблокировать поле.'
    ] },
    { note: 'Многострочный текст — `<textarea>`, выпадающий список — `<select>` с `<option>` внутри.' }
  ],
  starter: { html: '<form>\n\n</form>\n' },
  tasks: [
    {
      id: 'html-forms-1',
      title: 'Поле с подписью',
      difficulty: 'easy',
      description: 'Внутри формы создайте текстовое поле с `id="name"`, `name="name"` и подпись `<label for="name">Имя</label>`.',
      checks: [
        { label: 'Есть форма', kind: 'exists', selector: 'form' },
        { label: 'Есть поле с id="name"', kind: 'exists', selector: 'form input#name' },
        { label: 'У поля есть name="name"', kind: 'attr', selector: 'input#name', name: 'name', equals: 'name' },
        { label: 'Есть label с for="name"', kind: 'exists', selector: 'label[for="name"]' },
        { label: 'В подписи есть текст', kind: 'text', selector: 'label[for="name"]', matches: '\\S' }
      ],
      hints: ['for у label и id у input должны совпадать буква в букву.'],
      solution: { html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text">\n</form>' }
    },
    {
      id: 'html-forms-2',
      title: 'Почта и кнопка',
      difficulty: 'easy',
      description: 'Добавьте в форму поле `type="email"` с атрибутом `required` и кнопку `<button type="submit">`.',
      starter: { html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text">\n</form>\n' },
      checks: [
        { label: 'Есть поле type="email"', kind: 'exists', selector: 'input[type="email"]' },
        { label: 'Поле обязательное', kind: 'attr', selector: 'input[type="email"]', name: 'required', exists: true },
        { label: 'У поля есть label', kind: 'custom', fn: "const field = ctx.$('input[type=\"email\"]'); if (!field) return 'Нет поля email'; const id = field.id; return (id && ctx.$('label[for=\"' + id + '\"]')) ? true : 'У поля email нет подписи <label for=\"…\">';" },
        { label: 'Есть кнопка отправки', kind: 'exists', selector: 'button[type="submit"], input[type="submit"]' }
      ],
      hints: ['required пишется без значения: <input type="email" required>.'],
      solution: {
        html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text">\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Отправить</button>\n</form>' }
    },
    {
      id: 'html-forms-3',
      title: 'Выпадающий список и textarea',
      difficulty: 'medium',
      description: 'Добавьте `<select id="topic">` с тремя `<option>` и многострочное поле `<textarea id="message">`. У обоих должны быть подписи.',
      starter: { html: '<form>\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="email" required>\n</form>\n' },
      checks: [
        { label: 'Есть select#topic', kind: 'exists', selector: 'select#topic' },
        { label: 'В списке три варианта', kind: 'count', selector: 'select#topic option', equals: 3 },
        { label: 'У вариантов заданы value', kind: 'attr', selector: 'select#topic option', name: 'value', matches: '\\S' },
        { label: 'Есть textarea#message', kind: 'exists', selector: 'textarea#message' },
        { label: 'Есть подписи для обоих полей', kind: 'count', selector: 'label[for="topic"], label[for="message"]', equals: 2 }
      ],
      hints: ['<option value="support">Поддержка</option>'],
      solution: {
        html: '<form>\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="email" required>\n  <label for="topic">Тема</label>\n  <select id="topic" name="topic">\n    <option value="question">Вопрос</option>\n    <option value="bug">Ошибка</option>\n    <option value="other">Другое</option>\n  </select>\n  <label for="message">Сообщение</label>\n  <textarea id="message" name="message" rows="4"></textarea>\n</form>' }
    },
    {
      id: 'html-forms-4',
      title: 'Переключатели и флажок',
      difficulty: 'medium',
      description: 'Добавьте группу из двух радиокнопок с одинаковым `name="delivery"` и чекбокс согласия с `required`.',
      starter: { html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text">\n</form>\n' },
      checks: [
        { label: 'Две радиокнопки', kind: 'count', selector: 'input[type="radio"]', equals: 2 },
        { label: 'У них одинаковый name="delivery"', kind: 'count', selector: 'input[type="radio"][name="delivery"]', equals: 2 },
        { label: 'У радиокнопок разные value', kind: 'custom', fn: "const values = ctx.$$('input[type=\"radio\"]').map((input) => input.value); return new Set(values).size === values.length || 'Значения value должны отличаться';" },
        { label: 'Есть чекбокс', kind: 'exists', selector: 'input[type="checkbox"]' },
        { label: 'Чекбокс обязателен', kind: 'attr', selector: 'input[type="checkbox"]', name: 'required', exists: true }
      ],
      hints: ['Радиокнопки работают как группа только при одинаковом name.'],
      solution: {
        html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text">\n  <label><input type="radio" name="delivery" value="pickup"> Самовывоз</label>\n  <label><input type="radio" name="delivery" value="courier"> Курьер</label>\n  <label><input type="checkbox" name="agree" required> Согласен с условиями</label>\n</form>' }
    },
    {
      id: 'html-forms-5',
      title: 'Challenge: форма регистрации',
      difficulty: 'hard',
      description: 'Соберите форму регистрации: имя, почта, пароль (минимум 8 символов), дата рождения, выбор тарифа, чекбокс согласия и кнопка. У каждого поля — подпись, у всех полей — `name`.',
      checks: [
        { label: 'Есть форма', kind: 'exists', selector: 'form' },
        { label: 'Поле имени', kind: 'exists', selector: 'input[type="text"]' },
        { label: 'Поле почты', kind: 'exists', selector: 'input[type="email"]' },
        { label: 'Поле пароля с minlength="8"', kind: 'attr', selector: 'input[type="password"]', name: 'minlength', equals: '8' },
        { label: 'Поле даты', kind: 'exists', selector: 'input[type="date"]' },
        { label: 'Выбор тарифа: select или радиокнопки', kind: 'custom', fn: "return (ctx.$('select') || ctx.$$('input[type=\"radio\"]').length >= 2) ? true : 'Нужен <select> или пара радиокнопок';" },
        { label: 'Чекбокс согласия', kind: 'exists', selector: 'input[type="checkbox"]' },
        { label: 'У всех полей есть name', kind: 'custom', fn: "const fields = ctx.$$('input, select, textarea'); for (const field of fields) { if (!field.name) return 'У поля ' + (field.type || field.tagName.toLowerCase()) + ' нет атрибута name'; } return fields.length >= 6 || 'Полей должно быть минимум 6';" },
        { label: 'Каждое поле подписано', kind: 'custom', fn: "const fields = ctx.$$('input:not([type=\"submit\"]), select, textarea'); for (const field of fields) { const wrapped = field.closest('label'); const linked = field.id && ctx.$('label[for=\"' + field.id + '\"]'); if (!wrapped && !linked) return 'Нет подписи у поля name=\"' + field.name + '\"'; } return true;" },
        { label: 'Кнопка отправки', kind: 'exists', selector: 'button[type="submit"], input[type="submit"]' }
      ],
      hints: [
        'Подпись можно задать двумя способами: <label for="id"> рядом или обернуть поле в <label>.',
        'minlength ограничивает минимальную длину значения.'
      ],
      solution: {
        html: '<form>\n  <label for="name">Имя</label>\n  <input id="name" name="name" type="text" required>\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="email" required>\n  <label for="password">Пароль</label>\n  <input id="password" name="password" type="password" minlength="8" required>\n  <label for="birthday">Дата рождения</label>\n  <input id="birthday" name="birthday" type="date">\n  <label for="plan">Тариф</label>\n  <select id="plan" name="plan">\n    <option value="start">Start</option>\n    <option value="pro">Pro</option>\n  </select>\n  <label><input type="checkbox" name="agree" required> Согласен с условиями</label>\n  <button type="submit">Зарегистрироваться</button>\n</form>' }
    }
  ]
};

const lesson09 = {
  id: 'html-semantic',
  title: 'Семантическая вёрстка',
  summary: 'header, nav, main, section, article, aside, footer — и зачем они нужны.',
  editors: ['html'],
  theory: [
    { lead: 'Семантические теги — это те же блоки, что и `<div>`, но с названием, которое понимают браузер, поисковик и скринридер.' },
    { code: '<body>\n  <header>шапка + nav</header>\n  <main>\n    <article>самостоятельный материал</article>\n    <aside>дополнительное</aside>\n  </main>\n  <footer>подвал</footer>\n</body>' },
    { table: { head: ['Тег', 'Когда использовать'], rows: [
      ['`<header>`', 'Шапка страницы или раздела'],
      ['`<nav>`', 'Блок навигации со ссылками'],
      ['`<main>`', 'Основное содержимое — ровно один на странице'],
      ['`<section>`', 'Смысловой раздел, обычно с заголовком'],
      ['`<article>`', 'Самостоятельный кусок: новость, карточка товара, комментарий'],
      ['`<aside>`', 'Побочное: сайдбар, реклама, сноски'],
      ['`<footer>`', 'Подвал страницы или раздела']
    ] } },
    { h: 'Правило выбора' },
    { p: 'Если подходящего семантического тега нет — берите `<div>`. Это нормально: `<div>` не «плохой», он просто без смысла.' },
    { warn: '`<main>` должен быть один и не может лежать внутри `<article>`, `<aside>`, `<header>` или `<footer>`.' }
  ],
  starter: { html: '<!-- каркас страницы -->\n' },
  tasks: [
    {
      id: 'html-semantic-1',
      title: 'Шапка и подвал',
      difficulty: 'easy',
      description: 'Создайте `<header>` с заголовком `<h1>` и `<footer>` с текстом копирайта.',
      checks: [
        { label: 'Есть <header>', kind: 'exists', selector: 'header' },
        { label: 'В шапке — <h1>', kind: 'exists', selector: 'header h1' },
        { label: 'Есть <footer>', kind: 'exists', selector: 'footer' },
        { label: 'В подвале есть текст', kind: 'text', selector: 'footer', matches: '.{5,}' }
      ],
      hints: ['Это обычные блоки: <header>…</header>.'],
      solution: { html: '<header>\n  <h1>Мой сайт</h1>\n</header>\n<footer>\n  <p>© 2026 Мой сайт</p>\n</footer>' }
    },
    {
      id: 'html-semantic-2',
      title: 'Навигация в шапке',
      difficulty: 'easy',
      description: 'Добавьте внутрь `<header>` блок `<nav>` со списком из трёх ссылок.',
      starter: { html: '<header>\n  <h1>Мой сайт</h1>\n</header>\n<footer>\n  <p>© 2026</p>\n</footer>\n' },
      checks: [
        { label: '<nav> внутри <header>', kind: 'exists', selector: 'header nav' },
        { label: 'В навигации список', kind: 'exists', selector: 'nav ul' },
        { label: 'Три ссылки', kind: 'count', selector: 'nav a', equals: 3 },
        { label: 'У ссылок есть href', kind: 'attr', selector: 'nav a', name: 'href', matches: '\\S' }
      ],
      hints: ['Навигация — это <nav> со списком <ul> внутри.'],
      solution: {
        html: '<header>\n  <h1>Мой сайт</h1>\n  <nav>\n    <ul>\n      <li><a href="#home">Главная</a></li>\n      <li><a href="#blog">Блог</a></li>\n      <li><a href="#contacts">Контакты</a></li>\n    </ul>\n  </nav>\n</header>\n<footer>\n  <p>© 2026</p>\n</footer>' }
    },
    {
      id: 'html-semantic-3',
      title: 'Основная часть',
      difficulty: 'medium',
      description: 'Добавьте между шапкой и подвалом `<main>`, внутри него — два `<section>`, у каждого свой заголовок `<h2>`.',
      starter: { html: '<header>\n  <h1>Мой сайт</h1>\n</header>\n\n<footer>\n  <p>© 2026</p>\n</footer>\n' },
      checks: [
        { label: 'Есть ровно один <main>', kind: 'count', selector: 'main', equals: 1 },
        { label: 'Внутри main — два <section>', kind: 'count', selector: 'main section', equals: 2 },
        { label: 'У каждой секции есть <h2>', kind: 'count', selector: 'main section h2', equals: 2 },
        { label: 'main находится после header', kind: 'custom', fn: "const header = ctx.$('header'); const main = ctx.$('main'); if (!header || !main) return 'Нужны и header, и main'; return (header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING) ? true : '<main> должен идти после <header>';" }
      ],
      hints: ['<main> — контейнер для основного содержимого, он один на страницу.'],
      solution: {
        html: '<header>\n  <h1>Мой сайт</h1>\n</header>\n<main>\n  <section>\n    <h2>О проекте</h2>\n    <p>Коротко о том, чем мы занимаемся.</p>\n  </section>\n  <section>\n    <h2>Услуги</h2>\n    <p>Что мы умеем.</p>\n  </section>\n</main>\n<footer>\n  <p>© 2026</p>\n</footer>' }
    },
    {
      id: 'html-semantic-4',
      title: 'Статья и сайдбар',
      difficulty: 'medium',
      description: 'Внутри `<main>` сделайте `<article>` со своим `<header>`, заголовком, текстом и `<footer>` с автором, а рядом — `<aside>` с дополнительной информацией.',
      starter: { html: '<main>\n\n</main>\n' },
      checks: [
        { label: 'Есть <article> внутри main', kind: 'exists', selector: 'main article' },
        { label: 'У статьи свой заголовок', kind: 'exists', selector: 'article h2, article h1' },
        { label: 'У статьи есть <footer>', kind: 'exists', selector: 'article footer' },
        { label: 'Есть <aside>', kind: 'exists', selector: 'main aside' },
        { label: 'В статье есть текст', kind: 'text', selector: 'article > p', matches: '.{20,}' }
      ],
      hints: ['header и footer можно использовать не только для страницы, но и внутри article.'],
      solution: {
        html: '<main>\n  <article>\n    <header><h2>Как учить вёрстку</h2></header>\n    <p>Лучший способ — писать код каждый день и разбирать чужие макеты.</p>\n    <footer><p>Автор: Алиса</p></footer>\n  </article>\n  <aside>\n    <h3>Читайте также</h3>\n    <p>Подборка полезных ссылок.</p>\n  </aside>\n</main>' }
    },
    {
      id: 'html-semantic-5',
      title: 'Challenge: каркас страницы блога',
      difficulty: 'hard',
      description: 'Соберите полный семантический каркас: `<header>` с `<nav>`, `<main>` с тремя `<article>` (у каждой заголовок и текст), `<aside>` и `<footer>`. Никаких `<div>`.',
      checks: [
        { label: 'Шапка с навигацией', kind: 'exists', selector: 'header nav' },
        { label: 'Один <main>', kind: 'count', selector: 'main', equals: 1 },
        { label: 'Три статьи', kind: 'count', selector: 'main article', equals: 3 },
        { label: 'У каждой статьи заголовок', kind: 'count', selector: 'main article h2', equals: 3 },
        { label: 'У каждой статьи текст', kind: 'count', selector: 'main article p', min: 3 },
        { label: 'Есть <aside>', kind: 'exists', selector: 'aside' },
        { label: 'Есть <footer> страницы', kind: 'exists', selector: 'body > footer, footer' },
        { label: 'Ни одного <div>', kind: 'absent', selector: 'div' }
      ],
      hints: [
        'Порядок: header → main (article × 3 + aside) → footer.',
        'Если тянет написать <div>, спросите себя: это раздел, статья или что-то побочное?'
      ],
      solution: {
        html: '<header>\n  <h1>Блог о вебе</h1>\n  <nav>\n    <ul>\n      <li><a href="#all">Все статьи</a></li>\n      <li><a href="#about">Об авторе</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>HTML за час</h2>\n    <p>Базовые теги, из которых состоит любая страница.</p>\n  </article>\n  <article>\n    <h2>CSS без боли</h2>\n    <p>Как устроены селекторы и каскад.</p>\n  </article>\n  <article>\n    <h2>Первый скрипт</h2>\n    <p>Оживляем страницу с помощью JavaScript.</p>\n  </article>\n  <aside>\n    <h3>Подписка</h3>\n    <p>Новые статьи раз в неделю.</p>\n  </aside>\n</main>\n<footer>\n  <p>© 2026 Блог о вебе</p>\n</footer>' }
    }
  ]
};

export const htmlModule = {
  id: 'html',
  title: 'HTML',
  subtitle: 'Разметка: структура и смысл страницы',
  lessons: [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09]
};
