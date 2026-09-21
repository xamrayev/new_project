/*
 * Module 2 — CSS (lessons 10–18).
 * The CSS editor opens here; checks read real computed styles from the sandbox.
 */
import { DEMO_IMAGES } from '../assets.js';

const lesson10 = {
  id: 'css-intro',
  title: 'Введение в CSS',
  summary: 'Как подключается CSS и из чего состоит правило.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'HTML отвечает за структуру, CSS — за внешний вид: цвета, размеры, отступы, расположение.' },
    { h: 'Синтаксис правила' },
    { code: 'h1 {\n  color: blue;\n  font-size: 32px;\n}\n│   │      │\n│   │      └── значение\n│   └───────── свойство\n└───────────── селектор' },
    { h: 'Три способа подключить стили' },
    { table: { head: ['Способ', 'Как выглядит', 'Когда'] , rows: [
      ['Внешний файл', '`<link rel="stylesheet" href="style.css">`', 'Всегда в реальных проектах'],
      ['Тег style', '`<style>h1 { color: red; }</style>`', 'Небольшие демо'],
      ['Inline', '`<h1 style="color: red">`', 'Точечно, лучше избегать']
    ] } },
    { note: 'Вкладка **CSS** в playground работает как подключённый внешний файл — пишите туда правила, HTML менять не нужно.' },
    { h: 'Комментарии' },
    { code: '/* так выглядит комментарий в CSS */' },
    { warn: 'Каждое объявление заканчивается точкой с запятой. Забытая `;` ломает следующее правило.' }
  ],
  starter: { html: '<h1>Заголовок</h1>\n<p>Абзац текста.</p>\n', css: '/* ваши стили */\n' },
  tasks: [
    {
      id: 'css-intro-1',
      title: 'Синий заголовок',
      difficulty: 'easy',
      description: 'Покрасьте `<h1>` в синий цвет (`blue`).',
      checks: [
        { label: 'Цвет заголовка — синий', kind: 'style', selector: 'h1', prop: 'color', equals: 'blue' }
      ],
      hints: ['Селектор h1, свойство color.'],
      solution: { css: 'h1 {\n  color: blue;\n}' }
    },
    {
      id: 'css-intro-2',
      title: 'Тёмная тема',
      difficulty: 'easy',
      description: 'Задайте `body` фон `#111827` и цвет текста `#e5e9f5`.',
      checks: [
        { label: 'Фон страницы — #111827', kind: 'style', selector: 'body', prop: 'background-color', equals: '#111827' },
        { label: 'Цвет текста — #e5e9f5', kind: 'style', selector: 'body', prop: 'color', equals: '#e5e9f5' }
      ],
      hints: ['Свойства: background-color и color.', 'Цвет можно писать в hex: #111827.'],
      solution: { css: 'body {\n  background-color: #111827;\n  color: #e5e9f5;\n}' }
    },
    {
      id: 'css-intro-3',
      title: 'Несколько правил',
      difficulty: 'medium',
      description: 'Задайте абзацу размер шрифта `18px`, межстрочный интервал `1.6` и серый цвет `#555555`.',
      checks: [
        { label: 'Размер шрифта абзаца — 18px', kind: 'style', selector: 'p', prop: 'font-size', equals: '18px' },
        { label: 'Межстрочный интервал — 1.6 (28.8px)', kind: 'style', selector: 'p', prop: 'line-height', min: 28, max: 29.5 },
        { label: 'Цвет текста — #555555', kind: 'style', selector: 'p', prop: 'color', equals: '#555555' }
      ],
      hints: ['line-height удобно задавать числом без единиц: 1.6.'],
      solution: { css: 'p {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #555555;\n}' }
    },
    {
      id: 'css-intro-4',
      title: 'Стили для нескольких элементов',
      difficulty: 'medium',
      description: 'Добавьте в HTML второй заголовок `<h2>` и абзац. В CSS: заголовкам — общий цвет через группировку `h1, h2`, странице — фон, абзацам — размер шрифта. Оставьте в CSS комментарий.',
      checks: [
        { label: 'В HTML появился <h2>', kind: 'exists', selector: 'h2' },
        { label: 'Абзацев минимум два', kind: 'count', selector: 'p', min: 2 },
        { label: 'h1 и h2 одного цвета', kind: 'custom', fn: "const one = getComputedStyle(ctx.$('h1')).color; const two = getComputedStyle(ctx.$('h2')).color; return one === two || 'Цвета отличаются: ' + one + ' и ' + two;" },
        { label: 'Использована группировка селекторов', kind: 'source', lang: 'css', matches: 'h1\\s*,\\s*h2|h2\\s*,\\s*h1' },
        { label: 'В CSS есть комментарий', kind: 'source', lang: 'css', matches: '/\\*[\\s\\S]*?\\*/' }
      ],
      hints: ['Группировка: h1, h2 { color: … }'],
      solution: {
        html: '<h1>Заголовок</h1>\n<p>Абзац текста.</p>\n<h2>Подзаголовок</h2>\n<p>Второй абзац.</p>',
        css: '/* общие стили заголовков */\nh1, h2 {\n  color: #1d4ed8;\n}\n\nbody {\n  background-color: #f4f6fb;\n}\n\np {\n  font-size: 17px;\n}'
      }
    },
    {
      id: 'css-intro-5',
      title: 'Challenge: обложка статьи',
      difficulty: 'hard',
      description: 'Оформите обложку: тёмный фон страницы, светлый текст, крупный заголовок (не меньше 40px), приглушённый подзаголовок другого цвета и абзац с увеличенным межстрочным интервалом.',
      starter: { html: '<h1>Веб-разработка</h1>\n<h2>С нуля до первого проекта</h2>\n<p>Курс, в котором каждый урок заканчивается практикой в playground.</p>\n', css: '' },
      checks: [
        { label: 'Фон страницы тёмный', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.doc.body).backgroundColor.match(/\\d+/g); if (!rgb) return 'Фон не задан'; const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum < 300 || 'Фон слишком светлый для тёмной темы';" },
        { label: 'Текст светлый', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.doc.body).color.match(/\\d+/g); const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum > 450 || 'Текст слишком тёмный на тёмном фоне';" },
        { label: 'Заголовок не меньше 40px', kind: 'style', selector: 'h1', prop: 'font-size', min: 40 },
        { label: 'Подзаголовок другого цвета', kind: 'custom', fn: "return getComputedStyle(ctx.$('h2')).color !== getComputedStyle(ctx.$('h1')).color || 'Цвет h2 совпадает с h1';" },
        { label: 'Межстрочный интервал абзаца больше 1.4', kind: 'custom', fn: "const style = getComputedStyle(ctx.$('p')); const ratio = parseFloat(style.lineHeight) / parseFloat(style.fontSize); return ratio > 1.4 || 'Сейчас интервал ' + ratio.toFixed(2);" }
      ],
      hints: ['Тёмный фон: сумма каналов RGB должна быть небольшой, например #0b1020.'],
      solution: {
        css: 'body {\n  background-color: #0b1020;\n  color: #e5e9f5;\n  font-family: system-ui, sans-serif;\n}\n\nh1 {\n  font-size: 48px;\n}\n\nh2 {\n  color: #9aa6c4;\n  font-size: 22px;\n}\n\np {\n  line-height: 1.7;\n}'
      }
    }
  ]
};

const lesson11 = {
  id: 'css-selectors',
  title: 'Селекторы',
  summary: 'Классы, id, комбинации, псевдоклассы и специфичность.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Селектор отвечает на вопрос «к каким элементам применить стиль».' },
    { table: { head: ['Селектор', 'Что выбирает'], rows: [
      ['`p`', 'Все абзацы'],
      ['`.card`', 'Все элементы с `class="card"`'],
      ['`#main`', 'Элемент с `id="main"` (он один)'],
      ['`nav a`', 'Все ссылки **внутри** nav (любой вложенности)'],
      ['`nav > a`', 'Только прямые потомки nav'],
      ['`h2 + p`', 'Абзац сразу после h2'],
      ['`a[target="_blank"]`', 'По атрибуту'],
      ['`h1, h2`', 'Группировка: и то, и другое']
    ] } },
    { h: 'Псевдоклассы' },
    { code: 'a:hover      { color: red; }      /* при наведении */\nli:first-child { font-weight: bold; }\ntr:nth-child(even) { background: #eee; }\ninput:focus  { outline: 2px solid blue; }' },
    { h: 'Специфичность' },
    { p: 'Если правила конфликтуют, побеждает более «сильный» селектор: id (100) > класс (10) > тег (1). При равной силе выигрывает тот, что ниже в файле.' },
    { warn: 'Старайтесь стилизовать классами. `id` в стилях трудно переопределить, а `!important` делает код неуправляемым.' }
  ],
  starter: {
    html: '<h1 id="title">Каталог</h1>\n<p class="lead">Лучшие предложения недели.</p>\n<ul class="menu">\n  <li><a href="#a">Первый</a></li>\n  <li><a href="#b">Второй</a></li>\n  <li><a href="#c">Третий</a></li>\n</ul>\n',
    css: '/* ваши стили */\n'
  },
  tasks: [
    {
      id: 'css-selectors-1',
      title: 'Стили по классу',
      difficulty: 'easy',
      description: 'Сделайте текст с классом `lead` размером `20px` и цветом `#2563eb`.',
      checks: [
        { label: 'Размер шрифта .lead — 20px', kind: 'style', selector: '.lead', prop: 'font-size', equals: '20px' },
        { label: 'Цвет .lead — #2563eb', kind: 'style', selector: '.lead', prop: 'color', equals: '#2563eb' },
        { label: 'Использован селектор по классу', kind: 'source', lang: 'css', matches: '\\.lead' }
      ],
      hints: ['Класс в CSS пишется с точки: .lead { … }'],
      solution: { css: '.lead {\n  font-size: 20px;\n  color: #2563eb;\n}' }
    },
    {
      id: 'css-selectors-2',
      title: 'Селектор по id',
      difficulty: 'easy',
      description: 'Заголовку с `id="title"` задайте `text-transform: uppercase` и `letter-spacing: 2px`.',
      checks: [
        { label: 'Заголовок в верхнем регистре', kind: 'style', selector: '#title', prop: 'text-transform', equals: 'uppercase' },
        { label: 'Межбуквенный интервал 2px', kind: 'style', selector: '#title', prop: 'letter-spacing', equals: '2px' },
        { label: 'Использован селектор #title', kind: 'source', lang: 'css', contains: '#title' }
      ],
      hints: ['id в CSS пишется с решётки: #title { … }'],
      solution: { css: '#title {\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}' }
    },
    {
      id: 'css-selectors-3',
      title: 'Вложенные селекторы',
      difficulty: 'medium',
      description: 'Уберите маркеры у списка `.menu`, а ссылкам **внутри него** задайте `text-decoration: none` и цвет `#111827`. Ссылки вне меню трогать нельзя.',
      starter: {
        html: '<ul class="menu">\n  <li><a href="#a">Первый</a></li>\n  <li><a href="#b">Второй</a></li>\n</ul>\n<p><a href="#out" class="outside">Обычная ссылка</a></p>\n'
      },
      checks: [
        { label: 'У списка нет маркеров', kind: 'style', selector: '.menu', prop: 'list-style-type', equals: 'none' },
        { label: 'Ссылки меню без подчёркивания', kind: 'style', selector: '.menu a', prop: 'text-decoration-line', equals: 'none' },
        { label: 'Цвет ссылок меню — #111827', kind: 'style', selector: '.menu a', prop: 'color', equals: '#111827' },
        { label: 'Ссылка вне меню осталась подчёркнутой', kind: 'style', selector: '.outside', prop: 'text-decoration-line', equals: 'underline' }
      ],
      hints: ['Вложенность записывается через пробел: .menu a { … }'],
      solution: { css: '.menu {\n  list-style-type: none;\n}\n\n.menu a {\n  text-decoration: none;\n  color: #111827;\n}' }
    },
    {
      id: 'css-selectors-4',
      title: 'Псевдоклассы',
      difficulty: 'medium',
      description: 'Первому пункту списка задайте `font-weight: bold`, последнему — `color: #d64545`, а для ссылок опишите состояние `:hover`.',
      checks: [
        { label: 'Первый пункт жирный', kind: 'custom', fn: "const weight = getComputedStyle(ctx.$('li:first-child')).fontWeight; return Number(weight) >= 700 || 'font-weight сейчас ' + weight;" },
        { label: 'Последний пункт красный', kind: 'style', selector: 'li:last-child', prop: 'color', equals: '#d64545' },
        { label: 'Описан эффект :hover', kind: 'source', lang: 'css', matches: ':hover\\s*\\{' },
        { label: 'Внутри :hover есть объявление', kind: 'source', lang: 'css', matches: ':hover\\s*\\{[^}]*:[^}]*;?[^}]*\\}' }
      ],
      hints: [
        'li:first-child и li:last-child выбирают крайние пункты.',
        'a:hover { … } срабатывает при наведении мыши.'
      ],
      solution: {
        css: 'li:first-child {\n  font-weight: bold;\n}\n\nli:last-child {\n  color: #d64545;\n}\n\na:hover {\n  color: #2563eb;\n  text-decoration: underline;\n}'
      }
    },
    {
      id: 'css-selectors-5',
      title: 'Challenge: таблица-зебра',
      difficulty: 'hard',
      description: 'Оформите таблицу: шапка с тёмным фоном и светлым текстом, чётные строки тела — светло-серые (`nth-child(even)`), при наведении на строку — другой фон, ячейки с отступами.',
      starter: {
        html: '<table>\n  <thead>\n    <tr><th>Товар</th><th>Цена</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Кофе</td><td>25 000</td></tr>\n    <tr><td>Чай</td><td>18 000</td></tr>\n    <tr><td>Какао</td><td>21 000</td></tr>\n    <tr><td>Сок</td><td>12 000</td></tr>\n  </tbody>\n</table>\n',
        css: 'table {\n  border-collapse: collapse;\n}\n'
      },
      checks: [
        { label: 'У шапки тёмный фон', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.$('thead th')).backgroundColor.match(/\\d+/g); if (!rgb) return 'Фон шапки не задан'; const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum < 380 || 'Фон шапки слишком светлый';" },
        { label: 'Текст шапки светлый', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.$('thead th')).color.match(/\\d+/g); const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum > 450 || 'Текст шапки слишком тёмный';" },
        { label: 'Чётные строки отличаются фоном', kind: 'custom', fn: "const rows = ctx.$$('tbody tr'); if (rows.length < 4) return 'Нужно минимум 4 строки'; const odd = getComputedStyle(rows[0]).backgroundColor; const even = getComputedStyle(rows[1]).backgroundColor; return odd !== even || 'Фон чётных и нечётных строк одинаковый';" },
        { label: 'Использован :nth-child(even)', kind: 'source', lang: 'css', matches: 'nth-child\\(\\s*even\\s*\\)|nth-child\\(\\s*2n\\s*\\)' },
        { label: 'Есть эффект при наведении на строку', kind: 'source', lang: 'css', matches: 'tr:hover|tbody tr:hover' },
        { label: 'У ячеек есть внутренние отступы', kind: 'style', selector: 'td', prop: 'padding-left', min: 6 }
      ],
      hints: [
        'tbody tr:nth-child(even) { background: … }',
        'Отступы ячеек задаются свойством padding у td и th.'
      ],
      solution: {
        css: 'table {\n  border-collapse: collapse;\n}\n\nth, td {\n  padding: 10px 14px;\n  text-align: left;\n}\n\nthead th {\n  background-color: #111827;\n  color: #ffffff;\n}\n\ntbody tr:nth-child(even) {\n  background-color: #f1f5f9;\n}\n\ntbody tr:hover {\n  background-color: #dbeafe;\n}'
      }
    }
  ]
};

const lesson12 = {
  id: 'css-typography',
  title: 'Цвета и типографика',
  summary: 'Форматы цвета, шрифты, размеры и выравнивание текста.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Девяносто процентов веба — это текст. Типографика решает, будут ли его читать.' },
    { h: 'Форматы цвета' },
    { code: 'color: red;                 /* имя */\ncolor: #2563eb;             /* hex */\ncolor: rgb(37 99 235);      /* каналы 0–255 */\ncolor: rgb(37 99 235 / .5); /* с прозрачностью */\ncolor: hsl(220 90% 53%);    /* тон, насыщенность, светлота */' },
    { h: 'Шрифты' },
    { code: 'body {\n  font-family: "Georgia", "Times New Roman", serif;\n}' },
    { p: 'Список шрифтов читается слева направо: браузер берёт первый доступный. Последним всегда ставят общее семейство: `serif`, `sans-serif`, `monospace`.' },
    { h: 'Основные свойства' },
    { table: { head: ['Свойство', 'Пример'], rows: [
      ['`font-size`', '`18px`, `1.2rem`'],
      ['`font-weight`', '`400`, `700`, `bold`'],
      ['`line-height`', '`1.6` — лучше без единиц'],
      ['`text-align`', '`left`, `center`, `right`, `justify`'],
      ['`text-transform`', '`uppercase`, `lowercase`, `capitalize`'],
      ['`letter-spacing`', '`0.5px`'],
      ['`text-decoration`', '`none`, `underline`']
    ] } },
    { note: '`rem` считается от размера шрифта страницы (обычно 16px), `em` — от размера шрифта родителя.' }
  ],
  starter: {
    html: '<article>\n  <h1>Заголовок статьи</h1>\n  <p class="meta">12 мая · 4 минуты чтения</p>\n  <p>Первый абзац статьи, в котором объясняется, о чём пойдёт речь дальше.</p>\n  <p>Второй абзац с продолжением мысли.</p>\n</article>\n',
    css: '/* ваши стили */\n'
  },
  tasks: [
    {
      id: 'css-typography-1',
      title: 'Шрифт страницы',
      difficulty: 'easy',
      description: 'Задайте `body` шрифт `Georgia, serif`.',
      checks: [
        { label: 'font-family содержит Georgia', kind: 'style', selector: 'body', prop: 'font-family', contains: 'Georgia' },
        { label: 'Указано запасное семейство serif', kind: 'style', selector: 'body', prop: 'font-family', contains: 'serif' }
      ],
      hints: ['font-family: Georgia, serif;'],
      solution: { css: 'body {\n  font-family: Georgia, serif;\n}' }
    },
    {
      id: 'css-typography-2',
      title: 'Цвет в разных форматах',
      difficulty: 'easy',
      description: 'Заголовку задайте цвет в hex `#1d4ed8`, а тексту `.meta` — в формате `rgb` так, чтобы получился серый `rgb(107, 114, 128)`.',
      checks: [
        { label: 'Заголовок #1d4ed8', kind: 'style', selector: 'h1', prop: 'color', equals: '#1d4ed8' },
        { label: '.meta — rgb(107, 114, 128)', kind: 'style', selector: '.meta', prop: 'color', equals: 'rgb(107, 114, 128)' },
        { label: 'В коде использована запись rgb(', kind: 'source', lang: 'css', contains: 'rgb(' }
      ],
      hints: ['rgb(107, 114, 128) — это тот же цвет, что #6b7280.'],
      solution: { css: 'h1 {\n  color: #1d4ed8;\n}\n\n.meta {\n  color: rgb(107, 114, 128);\n}' }
    },
    {
      id: 'css-typography-3',
      title: 'Размеры и начертание',
      difficulty: 'medium',
      description: 'Заголовок — `36px` и `font-weight: 700`; `.meta` — `14px`, курсив; абзацы — `17px` с межстрочным интервалом `1.7`.',
      checks: [
        { label: 'Заголовок 36px', kind: 'style', selector: 'h1', prop: 'font-size', equals: '36px' },
        { label: 'Начертание заголовка 700', kind: 'style', selector: 'h1', prop: 'font-weight', equals: '700' },
        { label: '.meta — 14px', kind: 'style', selector: '.meta', prop: 'font-size', equals: '14px' },
        { label: '.meta курсивом', kind: 'style', selector: '.meta', prop: 'font-style', equals: 'italic' },
        { label: 'Абзацы 17px', kind: 'style', selector: 'article p:not(.meta)', prop: 'font-size', equals: '17px' },
        { label: 'Интервал 1.7 (28.9px)', kind: 'style', selector: 'article p:not(.meta)', prop: 'line-height', min: 28, max: 30 }
      ],
      hints: ['Селектор p:not(.meta) выбирает абзацы, кроме служебного.'],
      solution: {
        css: 'h1 {\n  font-size: 36px;\n  font-weight: 700;\n}\n\n.meta {\n  font-size: 14px;\n  font-style: italic;\n}\n\narticle p:not(.meta) {\n  font-size: 17px;\n  line-height: 1.7;\n}'
      }
    },
    {
      id: 'css-typography-4',
      title: 'Выравнивание и регистр',
      difficulty: 'medium',
      description: 'Заголовок — по центру и в верхнем регистре, `.meta` — по центру, абзацы — по ширине (`justify`) с отступом первой строки `24px`.',
      checks: [
        { label: 'Заголовок по центру', kind: 'style', selector: 'h1', prop: 'text-align', equals: 'center' },
        { label: 'Заголовок в верхнем регистре', kind: 'style', selector: 'h1', prop: 'text-transform', equals: 'uppercase' },
        { label: '.meta по центру', kind: 'style', selector: '.meta', prop: 'text-align', equals: 'center' },
        { label: 'Абзацы по ширине', kind: 'style', selector: 'article p:not(.meta)', prop: 'text-align', equals: 'justify' },
        { label: 'Отступ первой строки 24px', kind: 'style', selector: 'article p:not(.meta)', prop: 'text-indent', equals: '24px' }
      ],
      hints: ['text-indent задаёт красную строку.'],
      solution: {
        css: 'h1 {\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.meta {\n  text-align: center;\n}\n\narticle p:not(.meta) {\n  text-align: justify;\n  text-indent: 24px;\n}'
      }
    },
    {
      id: 'css-typography-5',
      title: 'Challenge: типографика статьи',
      difficulty: 'hard',
      description: 'Оформите статью целиком: шрифт без засечек, ширина текста ограничена, читаемый размер и интервал, выразительный заголовок, приглушённая мета-строка, буквица — первая буква первого абзаца крупнее остальных (`::first-letter`).',
      checks: [
        { label: 'Задан шрифт страницы', kind: 'custom', fn: "const family = getComputedStyle(ctx.doc.body).fontFamily; return family && family.length > 3 ? true : 'font-family не задан';" },
        { label: 'Заголовок крупнее 30px', kind: 'style', selector: 'h1', prop: 'font-size', min: 30 },
        { label: 'Мета-строка бледнее основного текста', kind: 'custom', fn: "const sum = (node) => getComputedStyle(node).color.match(/\\d+/g).slice(0, 3).reduce((a, b) => a + Number(b), 0); return sum(ctx.$('.meta')) > sum(ctx.$('article p:not(.meta)')) || 'Цвет .meta должен быть светлее текста';" },
        { label: 'Интервал основного текста ≥ 1.5', kind: 'custom', fn: "const style = getComputedStyle(ctx.$('article p:not(.meta)')); const ratio = parseFloat(style.lineHeight) / parseFloat(style.fontSize); return ratio >= 1.5 || 'Сейчас ' + ratio.toFixed(2);" },
        { label: 'Ширина текста ограничена (max-width)', kind: 'source', lang: 'css', contains: 'max-width' },
        { label: 'Использован ::first-letter', kind: 'source', lang: 'css', contains: '::first-letter' },
        { label: 'Буквица крупнее текста', kind: 'custom', fn: "const paragraph = ctx.$('article p:not(.meta)'); const base = parseFloat(getComputedStyle(paragraph).fontSize); const first = parseFloat(getComputedStyle(paragraph, '::first-letter').fontSize); return first > base * 1.5 || 'Первая буква не крупнее текста (' + first + 'px против ' + base + 'px)';" }
      ],
      hints: [
        'Ограничьте ширину: article { max-width: 640px; margin: 0 auto; }',
        'Буквица: article p:first-of-type::first-letter { font-size: 3em; }'
      ],
      solution: {
        css: 'body {\n  font-family: system-ui, -apple-system, sans-serif;\n  color: #16203a;\n}\n\narticle {\n  max-width: 640px;\n  margin: 0 auto;\n}\n\nh1 {\n  font-size: 38px;\n  line-height: 1.2;\n}\n\n.meta {\n  color: #9aa6c4;\n  font-size: 14px;\n}\n\narticle p:not(.meta) {\n  font-size: 17px;\n  line-height: 1.7;\n}\n\narticle p:not(.meta)::first-letter {\n  font-size: 3em;\n  font-weight: 700;\n  line-height: 1;\n}'
      }
    }
  ]
};

const lesson13 = {
  id: 'css-box-model',
  title: 'Блочная модель',
  summary: 'content, padding, border, margin и box-sizing.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Каждый элемент — прямоугольник из четырёх слоёв. Понять их порядок важнее, чем выучить все свойства CSS.' },
    { code: '┌─────────── margin ───────────┐\n│ ┌───────── border ─────────┐ │\n│ │ ┌─────── padding ──────┐ │ │\n│ │ │      content         │ │ │\n│ │ └──────────────────────┘ │ │\n│ └──────────────────────────┘ │\n└──────────────────────────────┘' },
    { table: { head: ['Слой', 'Смысл'], rows: [
      ['`padding`', 'Воздух **внутри** рамки'],
      ['`border`', 'Сама рамка: толщина, стиль, цвет'],
      ['`margin`', 'Отступ **снаружи**, между элементами']
    ] } },
    { h: 'Сокращённая запись' },
    { code: 'padding: 10px;              /* со всех сторон */\npadding: 10px 20px;         /* верх-низ | лево-право */\npadding: 10px 20px 30px 40px; /* верх → право → низ → лево */\nborder: 2px solid #2563eb;' },
    { h: 'box-sizing' },
    { p: 'По умолчанию `width` задаёт ширину **содержимого**, и padding с border прибавляются сверху. `box-sizing: border-box` включает их в заданную ширину — так считать гораздо проще.' },
    { code: '*, *::before, *::after {\n  box-sizing: border-box;\n}' },
    { note: 'Вертикальные margin соседних блоков схлопываются: 20px и 30px дадут не 50px, а 30px.' }
  ],
  starter: {
    html: '<div class="card">\n  <h2>Карточка</h2>\n  <p>Короткое описание товара.</p>\n</div>\n',
    css: '.card {\n  background: #f1f5f9;\n}\n'
  },
  tasks: [
    {
      id: 'css-box-model-1',
      title: 'Внутренние отступы',
      difficulty: 'easy',
      description: 'Задайте карточке `padding: 20px`.',
      checks: [
        { label: 'padding сверху 20px', kind: 'style', selector: '.card', prop: 'padding-top', equals: '20px' },
        { label: 'padding слева 20px', kind: 'style', selector: '.card', prop: 'padding-left', equals: '20px' },
        { label: 'padding справа 20px', kind: 'style', selector: '.card', prop: 'padding-right', equals: '20px' },
        { label: 'padding снизу 20px', kind: 'style', selector: '.card', prop: 'padding-bottom', equals: '20px' }
      ],
      hints: ['Одно значение padding применяется ко всем четырём сторонам.'],
      solution: { css: '.card {\n  background: #f1f5f9;\n  padding: 20px;\n}' }
    },
    {
      id: 'css-box-model-2',
      title: 'Рамка и скругление',
      difficulty: 'easy',
      description: 'Добавьте карточке рамку `2px solid #2563eb` и скругление углов `12px`.',
      starter: { css: '.card {\n  background: #f1f5f9;\n  padding: 20px;\n}\n' },
      checks: [
        { label: 'Толщина рамки 2px', kind: 'style', selector: '.card', prop: 'border-top-width', equals: '2px' },
        { label: 'Стиль рамки solid', kind: 'style', selector: '.card', prop: 'border-top-style', equals: 'solid' },
        { label: 'Цвет рамки #2563eb', kind: 'style', selector: '.card', prop: 'border-top-color', equals: '#2563eb' },
        { label: 'Скругление 12px', kind: 'style', selector: '.card', prop: 'border-top-left-radius', equals: '12px' }
      ],
      hints: ['border: 2px solid #2563eb; и border-radius: 12px;'],
      solution: { css: '.card {\n  background: #f1f5f9;\n  padding: 20px;\n  border: 2px solid #2563eb;\n  border-radius: 12px;\n}' }
    },
    {
      id: 'css-box-model-3',
      title: 'Ширина и box-sizing',
      difficulty: 'medium',
      description: 'Задайте карточке `width: 300px`, `padding: 24px`, рамку `1px` и включите `box-sizing: border-box` — итоговая ширина на экране должна остаться ровно 300px.',
      checks: [
        { label: 'box-sizing: border-box', kind: 'style', selector: '.card', prop: 'box-sizing', equals: 'border-box' },
        { label: 'Внутренний отступ 24px', kind: 'style', selector: '.card', prop: 'padding-left', equals: '24px' },
        { label: 'Рамка 1px', kind: 'style', selector: '.card', prop: 'border-left-width', equals: '1px' },
        { label: 'Реальная ширина ровно 300px', kind: 'custom', fn: "const width = ctx.$('.card').getBoundingClientRect().width; return Math.abs(width - 300) < 0.6 || 'Ширина на экране ' + width.toFixed(1) + 'px';" }
      ],
      hints: ['Без border-box ширина стала бы 300 + 48 + 2 = 350px.'],
      solution: {
        css: '.card {\n  background: #f1f5f9;\n  width: 300px;\n  padding: 24px;\n  border: 1px solid #94a3b8;\n  box-sizing: border-box;\n}'
      }
    },
    {
      id: 'css-box-model-4',
      title: 'Внешние отступы и центрирование',
      difficulty: 'medium',
      description: 'Ограничьте карточку шириной `320px` и отцентрируйте её по горизонтали через `margin: 0 auto`. Между карточками должен быть вертикальный отступ `24px`.',
      starter: {
        html: '<div class="card">\n  <h2>Первая</h2>\n</div>\n<div class="card">\n  <h2>Вторая</h2>\n</div>\n',
        css: '.card {\n  background: #f1f5f9;\n  padding: 20px;\n}\n'
      },
      checks: [
        { label: 'Ширина карточки 320px', kind: 'custom', fn: "const width = ctx.$('.card').getBoundingClientRect().width; return Math.abs(width - 320) < 1 || 'Ширина ' + width.toFixed(1) + 'px';" },
        { label: 'Карточка отцентрирована', kind: 'custom', fn: "const card = ctx.$('.card'); const box = card.getBoundingClientRect(); const left = box.left; const right = ctx.doc.documentElement.clientWidth - box.right; return Math.abs(left - right) < 3 || 'Слева ' + left.toFixed(0) + 'px, справа ' + right.toFixed(0) + 'px';" },
        { label: 'Использован margin: auto', kind: 'source', lang: 'css', matches: 'margin[^;]*auto' },
        { label: 'Между карточками 24px', kind: 'custom', fn: "const cards = ctx.$$('.card'); if (cards.length < 2) return 'Нужно две карточки'; const gap = cards[1].getBoundingClientRect().top - cards[0].getBoundingClientRect().bottom; return Math.abs(gap - 24) < 1.5 || 'Сейчас между карточками ' + gap.toFixed(1) + 'px';" }
      ],
      hints: [
        'margin: 0 auto центрирует блок с заданной шириной.',
        'Из-за схлопывания margin хватит одного margin-bottom: 24px.'
      ],
      solution: {
        css: '.card {\n  background: #f1f5f9;\n  padding: 20px;\n  width: 320px;\n  box-sizing: border-box;\n  margin: 0 auto 24px;\n}'
      }
    },
    {
      id: 'css-box-model-5',
      title: 'Challenge: карточка товара',
      difficulty: 'hard',
      description: 'Сверстайте карточку товара: ширина 280px, светлый фон, рамка, скругление 16px, внутренние отступы 20px, тень, заголовок без верхнего отступа и кнопка с собственными padding и border-radius.',
      starter: {
        html: '<div class="card">\n  <h2>Кофемашина</h2>\n  <p>Готовит эспрессо за 30 секунд.</p>\n  <button class="buy">Купить</button>\n</div>\n',
        css: ''
      },
      checks: [
        { label: 'Ширина карточки 280px', kind: 'custom', fn: "const width = ctx.$('.card').getBoundingClientRect().width; return Math.abs(width - 280) < 1 || 'Ширина ' + width.toFixed(1) + 'px';" },
        { label: 'Внутренние отступы 20px', kind: 'style', selector: '.card', prop: 'padding-left', equals: '20px' },
        { label: 'Скругление 16px', kind: 'style', selector: '.card', prop: 'border-top-left-radius', equals: '16px' },
        { label: 'Есть рамка', kind: 'style', selector: '.card', prop: 'border-top-width', min: 1 },
        { label: 'Есть тень', kind: 'custom', fn: "const shadow = getComputedStyle(ctx.$('.card')).boxShadow; return (shadow && shadow !== 'none') || 'box-shadow не задан';" },
        { label: 'У заголовка убран верхний отступ', kind: 'style', selector: '.card h2', prop: 'margin-top', equals: '0px' },
        { label: 'У кнопки есть padding', kind: 'style', selector: '.buy', prop: 'padding-left', min: 8 },
        { label: 'У кнопки скруглены углы', kind: 'style', selector: '.buy', prop: 'border-top-left-radius', min: 4 }
      ],
      hints: [
        'box-shadow: 0 8px 24px rgba(20, 30, 60, .12);',
        'Не забудьте box-sizing: border-box, иначе padding расширит карточку.'
      ],
      solution: {
        css: '.card {\n  width: 280px;\n  box-sizing: border-box;\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #d7deee;\n  border-radius: 16px;\n  box-shadow: 0 8px 24px rgba(20, 30, 60, .12);\n}\n\n.card h2 {\n  margin-top: 0;\n}\n\n.buy {\n  padding: 10px 18px;\n  border: 0;\n  border-radius: 8px;\n  background: #2563eb;\n  color: #ffffff;\n}'
      }
    }
  ]
};

const lesson14 = {
  id: 'css-display-position',
  title: 'Display и позиционирование',
  summary: 'block, inline, none и пять значений position.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Свойство `display` определяет, как элемент ведёт себя в потоке, `position` — как он из этого потока выходит.' },
    { table: { head: ['display', 'Поведение'], rows: [
      ['`block`', 'Занимает всю ширину, начинается с новой строки (`div`, `p`, `h1`)'],
      ['`inline`', 'В строке, ширину и вертикальные отступы задать нельзя (`span`, `a`)'],
      ['`inline-block`', 'В строке, но размеры задаются'],
      ['`none`', 'Элемент полностью исчезает, места не занимает'],
      ['`flex` / `grid`', 'Включает раскладку для потомков — следующие уроки']
    ] } },
    { h: 'position' },
    { table: { head: ['Значение', 'Как считаются координаты'], rows: [
      ['`static`', 'По умолчанию, `top/left` не работают'],
      ['`relative`', 'Смещение от собственного места, место в потоке сохраняется'],
      ['`absolute`', 'От ближайшего предка с `position` не `static`; из потока выпадает'],
      ['`fixed`', 'От окна браузера, не двигается при прокрутке'],
      ['`sticky`', 'Обычный, пока не доедет до заданной границы — дальше «прилипает»']
    ] } },
    { note: 'Классический приём: родителю `position: relative`, значку внутри `position: absolute; top: 8px; right: 8px`.' },
    { warn: '`visibility: hidden` прячет элемент, но оставляет пустое место. `display: none` убирает его полностью.' }
  ],
  starter: {
    html: '<div class="box">Блок</div>\n<span class="tag">Метка</span>\n<span class="tag">Ещё одна</span>\n',
    css: '.box {\n  background: #dbeafe;\n}\n\n.tag {\n  background: #fde68a;\n}\n'
  },
  tasks: [
    {
      id: 'css-display-position-1',
      title: 'inline-block',
      difficulty: 'easy',
      description: 'Сделайте метки `.tag` элементами `inline-block` шириной `120px` и высотой `40px`.',
      checks: [
        { label: 'display: inline-block', kind: 'style', selector: '.tag', prop: 'display', equals: 'inline-block' },
        { label: 'Ширина 120px', kind: 'style', selector: '.tag', prop: 'width', equals: '120px' },
        { label: 'Высота 40px', kind: 'style', selector: '.tag', prop: 'height', equals: '40px' },
        { label: 'Метки стоят в одной строке', kind: 'custom', fn: "const tags = ctx.$$('.tag'); const first = tags[0].getBoundingClientRect(); const second = tags[1].getBoundingClientRect(); return Math.abs(first.top - second.top) < 2 || 'Метки оказались на разных строках';" }
      ],
      hints: ['У обычного inline-элемента width и height не работают.'],
      solution: { css: '.box {\n  background: #dbeafe;\n}\n\n.tag {\n  background: #fde68a;\n  display: inline-block;\n  width: 120px;\n  height: 40px;\n}' }
    },
    {
      id: 'css-display-position-2',
      title: 'Спрятать элемент',
      difficulty: 'easy',
      description: 'Спрячьте элемент с классом `secret` так, чтобы он не занимал места, а `.ghost` сделайте невидимым, но оставьте его место в потоке.',
      starter: {
        html: '<p class="secret">Меня не должно быть видно</p>\n<p class="ghost">Я невидим, но место занимаю</p>\n<p class="visible">Я виден</p>\n',
        css: ''
      },
      checks: [
        { label: '.secret скрыт через display: none', kind: 'style', selector: '.secret', prop: 'display', equals: 'none' },
        { label: '.ghost невидим через visibility', kind: 'style', selector: '.ghost', prop: 'visibility', equals: 'hidden' },
        { label: '.secret не занимает места', kind: 'custom', fn: "return ctx.$('.secret').getBoundingClientRect().height === 0 || 'Элемент всё ещё занимает высоту';" },
        { label: '.ghost место сохранил', kind: 'custom', fn: "return ctx.$('.ghost').getBoundingClientRect().height > 0 || 'Место под .ghost исчезло — используйте visibility, а не display';" }
      ],
      hints: ['display: none убирает элемент, visibility: hidden — только прячет.'],
      solution: { css: '.secret {\n  display: none;\n}\n\n.ghost {\n  visibility: hidden;\n}' }
    },
    {
      id: 'css-display-position-3',
      title: 'Значок в углу карточки',
      difficulty: 'medium',
      description: 'Прижмите бейдж `.badge` к правому верхнему углу карточки: родителю — `position: relative`, бейджу — `absolute` с отступами `8px` сверху и справа.',
      starter: {
        html: '<div class="card">\n  <span class="badge">NEW</span>\n  <h2>Товар</h2>\n  <p>Описание товара.</p>\n</div>\n',
        css: '.card {\n  width: 300px;\n  padding: 20px;\n  background: #f1f5f9;\n  box-sizing: border-box;\n}\n\n.badge {\n  background: #ef4444;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 999px;\n}\n'
      },
      checks: [
        { label: 'У карточки position: relative', kind: 'style', selector: '.card', prop: 'position', equals: 'relative' },
        { label: 'У бейджа position: absolute', kind: 'style', selector: '.badge', prop: 'position', equals: 'absolute' },
        { label: 'Бейдж прижат к верхнему краю', kind: 'custom', fn: "const card = ctx.$('.card').getBoundingClientRect(); const badge = ctx.$('.badge').getBoundingClientRect(); const gap = badge.top - card.top; return Math.abs(gap - 8) < 2 || 'Отступ сверху ' + gap.toFixed(1) + 'px вместо 8px';" },
        { label: 'Бейдж прижат к правому краю', kind: 'custom', fn: "const card = ctx.$('.card').getBoundingClientRect(); const badge = ctx.$('.badge').getBoundingClientRect(); const gap = card.right - badge.right; return Math.abs(gap - 8) < 2 || 'Отступ справа ' + gap.toFixed(1) + 'px вместо 8px';" }
      ],
      hints: ['Без position у родителя абсолютный элемент «улетит» к краю окна.'],
      solution: {
        css: '.card {\n  width: 300px;\n  padding: 20px;\n  background: #f1f5f9;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.badge {\n  background: #ef4444;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 999px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}'
      }
    },
    {
      id: 'css-display-position-4',
      title: 'Фиксированная шапка',
      difficulty: 'medium',
      description: 'Закрепите шапку сверху экрана (`position: fixed`, ширина на всё окно, `z-index: 10`) и добавьте содержимому верхний отступ, чтобы текст не оказался под шапкой.',
      starter: {
        html: '<header class="topbar">Шапка сайта</header>\n<main class="content">\n  <p>Первый абзац должен быть виден полностью.</p>\n  <p>Дальше идёт длинный текст…</p>\n</main>\n',
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px;\n  height: 56px;\n  box-sizing: border-box;\n}\n'
      },
      checks: [
        { label: 'Шапка зафиксирована', kind: 'style', selector: '.topbar', prop: 'position', equals: 'fixed' },
        { label: 'Шапка прижата к верху', kind: 'style', selector: '.topbar', prop: 'top', equals: '0px' },
        { label: 'z-index не меньше 10', kind: 'style', selector: '.topbar', prop: 'z-index', min: 10 },
        { label: 'Шапка растянута на всю ширину', kind: 'custom', fn: "const width = ctx.$('.topbar').getBoundingClientRect().width; const screen = ctx.doc.documentElement.clientWidth; return Math.abs(width - screen) < 2 || 'Ширина шапки ' + width.toFixed(0) + 'px из ' + screen + 'px';" },
        { label: 'Контент не прячется под шапкой', kind: 'custom', fn: "const header = ctx.$('.topbar').getBoundingClientRect(); const first = ctx.$('.content p').getBoundingClientRect(); return first.top >= header.bottom - 0.5 || 'Текст начинается под шапкой';" }
      ],
      hints: ['left: 0; right: 0 растянет шапку на всю ширину.', 'Отступ контенту: padding-top не меньше высоты шапки.'],
      solution: {
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px;\n  height: 56px;\n  box-sizing: border-box;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n}\n\n.content {\n  padding-top: 72px;\n}'
      }
    },
    {
      id: 'css-display-position-5',
      title: 'Challenge: липкая панель и оверлей',
      difficulty: 'hard',
      description: 'Сделайте панель `.toolbar` липкой (`sticky`, `top: 0`), а модальное окно `.modal` — по центру экрана поверх затемнения: `.overlay` на весь экран с полупрозрачным фоном, `.modal` внутри — по центру.',
      starter: {
        html: '<div class="toolbar">Панель инструментов</div>\n<div class="long">\n  <p>Текст страницы…</p>\n</div>\n<div class="overlay">\n  <div class="modal">\n    <h3>Подтвердите действие</h3>\n    <button>ОК</button>\n  </div>\n</div>\n',
        css: '.toolbar {\n  background: #e2e8f0;\n  padding: 12px;\n}\n\n.long {\n  height: 600px;\n}\n\n.modal {\n  background: #fff;\n  padding: 24px;\n  width: 280px;\n  box-sizing: border-box;\n}\n'
      },
      checks: [
        { label: 'Панель липкая', kind: 'style', selector: '.toolbar', prop: 'position', oneOf: ['sticky', '-webkit-sticky'] },
        { label: 'У панели задан top', kind: 'style', selector: '.toolbar', prop: 'top', equals: '0px' },
        { label: 'Оверлей растянут на весь экран', kind: 'custom', fn: "const box = ctx.$('.overlay').getBoundingClientRect(); const root = ctx.doc.documentElement; return (Math.abs(box.width - root.clientWidth) < 2 && Math.abs(box.height - root.clientHeight) < 2) || 'Оверлей ' + box.width.toFixed(0) + '×' + box.height.toFixed(0) + ', нужно на весь экран';" },
        { label: 'Оверлей зафиксирован', kind: 'style', selector: '.overlay', prop: 'position', oneOf: ['fixed', 'absolute'] },
        { label: 'Фон оверлея полупрозрачный', kind: 'custom', fn: "const background = getComputedStyle(ctx.$('.overlay')).backgroundColor; const parts = background.match(/[\\d.]+/g) || []; const alpha = parts.length === 4 ? Number(parts[3]) : (background === 'rgba(0, 0, 0, 0)' ? 0 : 1); return (alpha > 0.05 && alpha < 0.95) || 'Ожидался полупрозрачный фон, сейчас ' + background;" },
        { label: 'Модалка по центру по горизонтали', kind: 'custom', fn: "const modal = ctx.$('.modal').getBoundingClientRect(); const root = ctx.doc.documentElement; const left = modal.left; const right = root.clientWidth - modal.right; return Math.abs(left - right) < 4 || 'Слева ' + left.toFixed(0) + ', справа ' + right.toFixed(0);" },
        { label: 'Модалка по центру по вертикали', kind: 'custom', fn: "const modal = ctx.$('.modal').getBoundingClientRect(); const root = ctx.doc.documentElement; const top = modal.top; const bottom = root.clientHeight - modal.bottom; return Math.abs(top - bottom) < 6 || 'Сверху ' + top.toFixed(0) + ', снизу ' + bottom.toFixed(0);" }
      ],
      hints: [
        'Оверлей: position: fixed; inset: 0; background: rgba(0,0,0,.5);',
        'Центрировать содержимое оверлея проще всего через display: flex; align-items: center; justify-content: center.'
      ],
      solution: {
        css: '.toolbar {\n  background: #e2e8f0;\n  padding: 12px;\n  position: sticky;\n  top: 0;\n}\n\n.long {\n  height: 600px;\n}\n\n.overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal {\n  background: #fff;\n  padding: 24px;\n  width: 280px;\n  box-sizing: border-box;\n  border-radius: 12px;\n}'
      }
    }
  ]
};

const lesson15 = {
  id: 'css-flexbox',
  title: 'Flexbox',
  summary: 'Одномерная раскладка: направление, выравнивание, промежутки.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Flexbox раскладывает элементы вдоль одной оси и решает главную боль вёрстки — выравнивание.' },
    { code: '.container {\n  display: flex;\n  flex-direction: row;      /* row | column */\n  justify-content: center;  /* вдоль главной оси */\n  align-items: center;      /* поперёк главной оси */\n  gap: 16px;\n  flex-wrap: wrap;\n}' },
    { h: 'Главная и поперечная ось' },
    { p: 'При `flex-direction: row` главная ось горизонтальна: `justify-content` двигает по горизонтали, `align-items` — по вертикали. При `column` они меняются местами.' },
    { table: { head: ['justify-content', 'Результат'], rows: [
      ['`flex-start`', 'Всё в начало'],
      ['`center`', 'По центру'],
      ['`space-between`', 'Края прижаты, промежутки равны'],
      ['`space-around` / `space-evenly`', 'Промежутки и по краям']
    ] } },
    { h: 'Свойства элементов' },
    { code: '.item {\n  flex: 1;          /* занять свободное место поровну */\n  flex-grow: 2;     /* расти вдвое быстрее соседей */\n  flex-shrink: 0;   /* не сжиматься */\n  flex-basis: 200px;/* базовый размер */\n  align-self: flex-end;\n}' },
    { note: 'Центрирование по обеим осям: `display: flex; justify-content: center; align-items: center;` — три строки вместо старых хаков.' }
  ],
  starter: {
    html: '<div class="row">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>\n',
    css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}\n'
  },
  tasks: [
    {
      id: 'css-flexbox-1',
      title: 'Включаем flex',
      difficulty: 'easy',
      description: 'Сделайте `.row` флекс-контейнером — элементы должны встать в строку.',
      checks: [
        { label: 'display: flex', kind: 'style', selector: '.row', prop: 'display', equals: 'flex' },
        { label: 'Элементы в одной строке', kind: 'custom', fn: "const items = ctx.$$('.item'); const tops = items.map((item) => item.getBoundingClientRect().top); return Math.max(...tops) - Math.min(...tops) < 2 || 'Элементы не выстроились в строку';" }
      ],
      hints: ['Одно свойство: display: flex.'],
      solution: { css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n  display: flex;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}' }
    },
    {
      id: 'css-flexbox-2',
      title: 'Промежутки',
      difficulty: 'easy',
      description: 'Добавьте между элементами промежуток `gap: 16px`.',
      starter: { css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n  display: flex;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}\n' },
      checks: [
        { label: 'gap: 16px', kind: 'style', selector: '.row', prop: 'column-gap', equals: '16px' },
        { label: 'Расстояние между элементами 16px', kind: 'custom', fn: "const items = ctx.$$('.item'); const gap = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().right; return Math.abs(gap - 16) < 1 || 'Сейчас промежуток ' + gap.toFixed(1) + 'px';" }
      ],
      hints: ['gap работает и во flex, и в grid — margin больше не нужен.'],
      solution: { css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n  display: flex;\n  gap: 16px;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}' }
    },
    {
      id: 'css-flexbox-3',
      title: 'Идеальное центрирование',
      difficulty: 'medium',
      description: 'Поставьте элементы по центру контейнера и по горизонтали, и по вертикали.',
      starter: { css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n  display: flex;\n  gap: 16px;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}\n' },
      checks: [
        { label: 'justify-content: center', kind: 'style', selector: '.row', prop: 'justify-content', equals: 'center' },
        { label: 'align-items: center', kind: 'style', selector: '.row', prop: 'align-items', equals: 'center' },
        { label: 'Группа действительно по центру', kind: 'custom', fn: "const row = ctx.$('.row').getBoundingClientRect(); const items = ctx.$$('.item').map((item) => item.getBoundingClientRect()); const left = items[0].left - row.left; const right = row.right - items[items.length - 1].right; const top = items[0].top - row.top; const bottom = row.bottom - items[0].bottom; if (Math.abs(left - right) > 2) return 'По горизонтали не по центру'; return Math.abs(top - bottom) < 2 || 'По вертикали не по центру';" }
      ],
      hints: ['justify-content — вдоль строки, align-items — поперёк.'],
      solution: {
        css: '.row {\n  background: #e2e8f0;\n  height: 200px;\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  align-items: center;\n}\n\n.item {\n  background: #60a5fa;\n  padding: 16px;\n}'
      }
    },
    {
      id: 'css-flexbox-4',
      title: 'Шапка: логотип слева, меню справа',
      difficulty: 'medium',
      description: 'Разведите логотип и меню по краям (`space-between`), выровняйте по центру по вертикали, а пункты меню поставьте в строку с промежутком `20px`.',
      starter: {
        html: '<header class="topbar">\n  <div class="logo">LOGO</div>\n  <ul class="menu">\n    <li><a href="#a">Главная</a></li>\n    <li><a href="#b">Блог</a></li>\n    <li><a href="#c">Контакты</a></li>\n  </ul>\n</header>\n',
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px 24px;\n}\n\n.menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.menu a {\n  color: #fff;\n  text-decoration: none;\n}\n'
      },
      checks: [
        { label: 'Шапка — flex-контейнер', kind: 'style', selector: '.topbar', prop: 'display', equals: 'flex' },
        { label: 'space-between между логотипом и меню', kind: 'style', selector: '.topbar', prop: 'justify-content', equals: 'space-between' },
        { label: 'Выравнивание по центру по вертикали', kind: 'style', selector: '.topbar', prop: 'align-items', equals: 'center' },
        { label: 'Меню — тоже flex', kind: 'style', selector: '.menu', prop: 'display', equals: 'flex' },
        { label: 'Промежуток в меню 20px', kind: 'style', selector: '.menu', prop: 'column-gap', equals: '20px' },
        { label: 'Логотип слева, меню справа', kind: 'custom', fn: "const bar = ctx.$('.topbar').getBoundingClientRect(); const logo = ctx.$('.logo').getBoundingClientRect(); const menu = ctx.$('.menu').getBoundingClientRect(); if (logo.left - bar.left > 30) return 'Логотип не прижат к левому краю'; return (bar.right - menu.right) < 30 || 'Меню не прижато к правому краю';" }
      ],
      hints: ['Флекс-контейнеров может быть несколько: и шапка, и само меню.'],
      solution: {
        css: '.topbar {\n  background: #111827;\n  color: #fff;\n  padding: 16px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  gap: 20px;\n}\n\n.menu a {\n  color: #fff;\n  text-decoration: none;\n}'
      }
    },
    {
      id: 'css-flexbox-5',
      title: 'Challenge: адаптивные карточки',
      difficulty: 'hard',
      description: 'Разложите четыре карточки в ряд с переносом: `flex-wrap: wrap`, промежуток 20px, каждая карточка занимает примерно половину ширины (`flex: 1 1 45%`), карточки одинаковой высоты, а кнопка внутри прижата к низу карточки.',
      starter: {
        html: '<div class="cards">\n  <article class="card"><h3>Первая</h3><p>Короткий текст.</p><button>Открыть</button></article>\n  <article class="card"><h3>Вторая</h3><p>Текст подлиннее, чем у первой карточки, чтобы высота отличалась.</p><button>Открыть</button></article>\n  <article class="card"><h3>Третья</h3><p>Ещё одна карточка.</p><button>Открыть</button></article>\n  <article class="card"><h3>Четвёртая</h3><p>И последняя.</p><button>Открыть</button></article>\n</div>\n',
        css: '.card {\n  background: #f1f5f9;\n  padding: 16px;\n  box-sizing: border-box;\n}\n'
      },
      checks: [
        { label: 'Контейнер — flex с переносом', kind: 'style', selector: '.cards', prop: 'flex-wrap', equals: 'wrap' },
        { label: 'Промежуток 20px', kind: 'style', selector: '.cards', prop: 'column-gap', equals: '20px' },
        { label: 'Карточки встали по две в ряд', kind: 'custom', fn: "const boxes = ctx.$$('.card').map((card) => card.getBoundingClientRect()); if (boxes.length !== 4) return 'Ожидались 4 карточки'; const firstRow = boxes.filter((box) => Math.abs(box.top - boxes[0].top) < 2).length; return firstRow === 2 || 'В первом ряду ' + firstRow + ' карточки вместо 2';" },
        { label: 'Карточки в ряду одной высоты', kind: 'custom', fn: "const boxes = ctx.$$('.card').map((card) => card.getBoundingClientRect()); return Math.abs(boxes[0].height - boxes[1].height) < 2 || 'Высоты различаются: ' + boxes[0].height.toFixed(0) + ' и ' + boxes[1].height.toFixed(0);" },
        { label: 'Карточка — вертикальный flex', kind: 'style', selector: '.card', prop: 'flex-direction', equals: 'column' },
        { label: 'Кнопки прижаты к низу карточек', kind: 'custom', fn: "const cards = ctx.$$('.card'); for (let i = 0; i < 2; i++) { const card = cards[i].getBoundingClientRect(); const button = cards[i].querySelector('button').getBoundingClientRect(); if (card.bottom - button.bottom > 20) return 'В карточке ' + (i + 1) + ' кнопка не прижата к низу'; } return true;" }
      ],
      hints: [
        'Карточке: display: flex; flex-direction: column; flex: 1 1 45%;',
        'Кнопке: margin-top: auto — она уедет вниз.'
      ],
      solution: {
        css: '.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n\n.card {\n  background: #f1f5f9;\n  padding: 16px;\n  box-sizing: border-box;\n  flex: 1 1 45%;\n  display: flex;\n  flex-direction: column;\n}\n\n.card button {\n  margin-top: auto;\n}'
      }
    }
  ]
};

const lesson16 = {
  id: 'css-grid',
  title: 'CSS Grid',
  summary: 'Двумерная раскладка: колонки, строки, области.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Flexbox работает вдоль одной оси, Grid — сразу по двум: строки и колонки задаются явно.' },
    { code: '.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;\n  grid-template-rows: auto 1fr;\n  gap: 16px;\n}' },
    { h: 'Единица fr' },
    { p: '`1fr` — это доля свободного места. `repeat(3, 1fr)` — три равные колонки. `minmax(200px, 1fr)` — не уже 200px, но растягивается.' },
    { h: 'Размещение элементов' },
    { code: '.hero {\n  grid-column: 1 / 3;   /* с 1-й до 3-й линии */\n  grid-column: span 2;  /* занять две колонки */\n  grid-row: 1 / 3;\n}' },
    { h: 'Именованные области' },
    { code: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar content";\n}\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }' },
    { note: 'Автоматическая адаптивная сетка без медиазапросов: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`' }
  ],
  starter: {
    html: '<div class="grid">\n  <div class="cell">1</div>\n  <div class="cell">2</div>\n  <div class="cell">3</div>\n  <div class="cell">4</div>\n  <div class="cell">5</div>\n  <div class="cell">6</div>\n</div>\n',
    css: '.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n'
  },
  tasks: [
    {
      id: 'css-grid-1',
      title: 'Три колонки',
      difficulty: 'easy',
      description: 'Сделайте `.grid` сеткой из трёх равных колонок с промежутком `12px`.',
      checks: [
        { label: 'display: grid', kind: 'style', selector: '.grid', prop: 'display', equals: 'grid' },
        { label: 'Три колонки', kind: 'custom', fn: "const columns = getComputedStyle(ctx.$('.grid')).gridTemplateColumns.split(' ').filter(Boolean); return columns.length === 3 || 'Сейчас колонок: ' + columns.length;" },
        { label: 'Колонки одинаковой ширины', kind: 'custom', fn: "const columns = getComputedStyle(ctx.$('.grid')).gridTemplateColumns.split(' ').map(parseFloat); return Math.max(...columns) - Math.min(...columns) < 1 || 'Колонки разной ширины: ' + columns.join(', ');" },
        { label: 'Промежуток 12px', kind: 'style', selector: '.grid', prop: 'column-gap', equals: '12px' }
      ],
      hints: ['grid-template-columns: repeat(3, 1fr);'],
      solution: { css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}' }
    },
    {
      id: 'css-grid-2',
      title: 'Широкая первая ячейка',
      difficulty: 'easy',
      description: 'Пусть первая ячейка занимает две колонки из трёх.',
      starter: { css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n' },
      checks: [
        { label: 'Первая ячейка шире остальных', kind: 'custom', fn: "const cells = ctx.$$('.cell').map((cell) => cell.getBoundingClientRect().width); return cells[0] > cells[1] * 1.7 || 'Первая ячейка ' + cells[0].toFixed(0) + 'px, вторая ' + cells[1].toFixed(0) + 'px';" },
        { label: 'Использован grid-column', kind: 'source', lang: 'css', contains: 'grid-column' },
        { label: 'Остальные ячейки не изменились', kind: 'custom', fn: "const cells = ctx.$$('.cell').map((cell) => cell.getBoundingClientRect().width); return Math.abs(cells[1] - cells[2]) < 1 || 'Вторая и третья ячейки разной ширины';" }
      ],
      hints: ['.cell:first-child { grid-column: span 2; }'],
      solution: {
        css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  background: #93c5fd;\n  padding: 20px;\n  text-align: center;\n}\n\n.cell:first-child {\n  grid-column: span 2;\n}'
      }
    },
    {
      id: 'css-grid-3',
      title: 'Колонки разной ширины',
      difficulty: 'medium',
      description: 'Сделайте сетку из двух колонок: боковая ровно `200px`, основная занимает остаток. Промежуток — `24px`, строки создаются автоматически.',
      starter: {
        html: '<div class="layout">\n  <aside class="side">Сайдбар</aside>\n  <main class="content">Контент</main>\n  <aside class="side">Ещё блок</aside>\n  <main class="content">Ещё контент</main>\n</div>\n',
        css: '.side { background: #fde68a; padding: 16px; }\n.content { background: #bbf7d0; padding: 16px; }\n'
      },
      checks: [
        { label: 'Сетка включена', kind: 'style', selector: '.layout', prop: 'display', equals: 'grid' },
        { label: 'Первая колонка 200px', kind: 'custom', fn: "const first = parseFloat(getComputedStyle(ctx.$('.layout')).gridTemplateColumns.split(' ')[0]); return Math.abs(first - 200) < 1 || 'Первая колонка ' + first.toFixed(0) + 'px';" },
        { label: 'Вторая колонка занимает остаток', kind: 'custom', fn: "const layout = ctx.$('.layout'); const columns = getComputedStyle(layout).gridTemplateColumns.split(' ').map(parseFloat); if (columns.length !== 2) return 'Колонок должно быть две, сейчас ' + columns.length; const gap = parseFloat(getComputedStyle(layout).columnGap) || 0; const rest = layout.getBoundingClientRect().width - columns[0] - gap; return Math.abs(columns[1] - rest) < 2 || 'Вторая колонка ' + columns[1].toFixed(0) + 'px, а свободного места ' + rest.toFixed(0) + 'px — используйте 1fr';" },
        { label: 'Промежуток 24px', kind: 'style', selector: '.layout', prop: 'column-gap', equals: '24px' },
        { label: 'Получилось две строки', kind: 'custom', fn: "const tops = ctx.$$('.side').map((node) => node.getBoundingClientRect().top); return Math.abs(tops[0] - tops[1]) > 10 || 'Блоки не перешли на вторую строку';" }
      ],
      hints: ['grid-template-columns: 200px 1fr;'],
      solution: {
        css: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  gap: 24px;\n}\n\n.side { background: #fde68a; padding: 16px; }\n.content { background: #bbf7d0; padding: 16px; }'
      }
    },
    {
      id: 'css-grid-4',
      title: 'Именованные области',
      difficulty: 'medium',
      description: 'Соберите классический макет через `grid-template-areas`: шапка на всю ширину, слева сайдбар 220px, справа контент, снизу подвал на всю ширину.',
      starter: {
        html: '<div class="page">\n  <header class="head">Шапка</header>\n  <nav class="side">Меню</nav>\n  <main class="main">Контент</main>\n  <footer class="foot">Подвал</footer>\n</div>\n',
        css: '.head { background: #c7d2fe; padding: 12px; }\n.side { background: #fde68a; padding: 12px; }\n.main { background: #bbf7d0; padding: 12px; }\n.foot { background: #e2e8f0; padding: 12px; }\n'
      },
      checks: [
        { label: 'Использован grid-template-areas', kind: 'source', lang: 'css', contains: 'grid-template-areas' },
        { label: 'Шапка на всю ширину', kind: 'custom', fn: "const page = ctx.$('.page').getBoundingClientRect(); const head = ctx.$('.head').getBoundingClientRect(); return Math.abs(head.width - page.width) < 2 || 'Ширина шапки ' + head.width.toFixed(0) + ' из ' + page.width.toFixed(0);" },
        { label: 'Сайдбар шириной 220px', kind: 'custom', fn: "const width = ctx.$('.side').getBoundingClientRect().width; return Math.abs(width - 220) < 2 || 'Сайдбар ' + width.toFixed(0) + 'px';" },
        { label: 'Контент справа от сайдбара', kind: 'custom', fn: "const side = ctx.$('.side').getBoundingClientRect(); const main = ctx.$('.main').getBoundingClientRect(); return main.left >= side.right - 1 || 'Контент не справа от меню';" },
        { label: 'Сайдбар и контент на одной строке', kind: 'custom', fn: "const side = ctx.$('.side').getBoundingClientRect(); const main = ctx.$('.main').getBoundingClientRect(); return Math.abs(side.top - main.top) < 2 || 'Меню и контент на разных строках';" },
        { label: 'Подвал внизу и на всю ширину', kind: 'custom', fn: "const page = ctx.$('.page').getBoundingClientRect(); const foot = ctx.$('.foot').getBoundingClientRect(); const main = ctx.$('.main').getBoundingClientRect(); if (foot.top < main.bottom - 1) return 'Подвал должен быть ниже контента'; return Math.abs(foot.width - page.width) < 2 || 'Подвал не на всю ширину';" }
      ],
      hints: [
        'Сначала опишите сетку: grid-template-columns: 220px 1fr;',
        'Затем области: "head head" / "side main" / "foot foot".'
      ],
      solution: {
        css: '.page {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n  gap: 12px;\n}\n\n.head { background: #c7d2fe; padding: 12px; grid-area: head; }\n.side { background: #fde68a; padding: 12px; grid-area: side; }\n.main { background: #bbf7d0; padding: 12px; grid-area: main; }\n.foot { background: #e2e8f0; padding: 12px; grid-area: foot; }'
      }
    },
    {
      id: 'css-grid-5',
      title: 'Challenge: адаптивная галерея без медиазапросов',
      difficulty: 'hard',
      description: 'Сделайте сетку карточек, которая сама подстраивается под ширину: `repeat(auto-fit, minmax(220px, 1fr))`, промежуток 20px, первая карточка — на всю ширину сетки, у карточек одинаковая высота.',
      starter: {
        html: '<div class="gallery">\n  <article class="tile featured"><h3>Главная</h3></article>\n  <article class="tile"><h3>Раз</h3></article>\n  <article class="tile"><h3>Два</h3></article>\n  <article class="tile"><h3>Три</h3></article>\n  <article class="tile"><h3>Четыре</h3></article>\n</div>\n',
        css: '.tile {\n  background: #ddd6fe;\n  padding: 16px;\n}\n'
      },
      checks: [
        { label: 'Сетка включена', kind: 'style', selector: '.gallery', prop: 'display', equals: 'grid' },
        { label: 'Использован auto-fit с minmax', kind: 'source', lang: 'css', matches: 'repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(' },
        { label: 'Минимальная ширина колонки 220px', kind: 'source', lang: 'css', matches: 'minmax\\(\\s*220px' },
        { label: 'Промежуток 20px', kind: 'style', selector: '.gallery', prop: 'column-gap', equals: '20px' },
        { label: 'Первая карточка на всю ширину', kind: 'custom', fn: "const gallery = ctx.$('.gallery').getBoundingClientRect(); const featured = ctx.$('.featured').getBoundingClientRect(); return Math.abs(featured.width - gallery.width) < 2 || 'Ширина карточки ' + featured.width.toFixed(0) + ' из ' + gallery.width.toFixed(0);" },
        { label: 'Остальные карточки одной высоты', kind: 'custom', fn: "const tiles = ctx.$$('.tile:not(.featured)').map((tile) => tile.getBoundingClientRect().height); return Math.max(...tiles) - Math.min(...tiles) < 2 || 'Высоты карточек различаются';" }
      ],
      hints: [
        'grid-column: 1 / -1 растягивает элемент на все колонки.',
        'auto-fit сам решает, сколько колонок поместится.'
      ],
      solution: {
        css: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n\n.tile {\n  background: #ddd6fe;\n  padding: 16px;\n}\n\n.featured {\n  grid-column: 1 / -1;\n}'
      }
    }
  ]
};

const lesson17 = {
  id: 'css-responsive',
  title: 'Адаптивная вёрстка',
  summary: 'Медиазапросы, гибкие единицы и картинки, mobile first.',
  editors: ['html', 'css'],
  sandbox: { assets: DEMO_IMAGES },
  theory: [
    { lead: 'Адаптивность — это не отдельная версия сайта для телефона, а один макет, который умеет меняться.' },
    { h: 'Медиазапрос' },
    { code: '/* базовые стили — для узких экранов */\n.cards { grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1200px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n}' },
    { h: 'Mobile first' },
    { p: 'Сначала пишут стили для узкого экрана, потом через `min-width` добавляют то, что нужно на широком. Так CSS получается короче и без переопределений.' },
    { h: 'Гибкие единицы' },
    { table: { head: ['Единица', 'От чего считается'], rows: [
      ['`%`', 'От размера родителя'],
      ['`rem`', 'От размера шрифта страницы'],
      ['`vw` / `vh`', '1% ширины / высоты окна'],
      ['`clamp(min, идеал, max)`', 'Значение, зажатое между границами']
    ] } },
    { h: 'Резиновая картинка' },
    { code: 'img {\n  max-width: 100%;\n  height: auto;\n}' },
    { note: 'Без `<meta name="viewport" content="width=device-width, initial-scale=1">` телефон покажет уменьшенную «настольную» версию, и медиазапросы не сработают.' }
  ],
  starter: {
    html: '<div class="cards">\n  <div class="card">1</div>\n  <div class="card">2</div>\n  <div class="card">3</div>\n  <div class="card">4</div>\n</div>\n',
    css: '.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n'
  },
  tasks: [
    {
      id: 'css-responsive-1',
      title: 'Первый медиазапрос',
      difficulty: 'easy',
      description: 'По умолчанию карточки идут в одну колонку. Добавьте медиазапрос `min-width: 768px`, в котором колонок становится две.',
      checks: [
        { label: 'Базово одна колонка', kind: 'cssRule', selector: '.cards', prop: 'grid-template-columns', contains: '1fr' },
        { label: 'Есть @media (min-width: 768px)', kind: 'cssRule', selector: '.cards', media: 'min-width: 768px' },
        { label: 'В медиазапросе две колонки', kind: 'cssRule', selector: '.cards', media: 'min-width: 768px', prop: 'grid-template-columns', matches: 'repeat\\(\\s*2|1fr\\s+1fr' },
        { label: 'Сетка включена', kind: 'style', selector: '.cards', prop: 'display', equals: 'grid' }
      ],
      hints: [
        'Сначала опишите .cards без медиазапроса, затем блок @media.',
        '@media (min-width: 768px) { .cards { … } }'
      ],
      solution: {
        css: '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}'
      }
    },
    {
      id: 'css-responsive-2',
      title: 'Резиновая картинка',
      difficulty: 'easy',
      description: 'Сделайте картинку резиновой: `max-width: 100%` и `height: auto`, чтобы она никогда не вылезала за пределы контейнера.',
      starter: {
        html: '<div class="frame">\n  <img src="photos/wide.jpg" alt="Панорама города">\n</div>\n',
        css: '.frame {\n  width: 260px;\n  border: 2px solid #334155;\n}\n'
      },
      checks: [
        { label: 'Задан max-width: 100%', kind: 'cssRule', selectorContains: 'img', prop: 'max-width', contains: '100%' },
        { label: 'Задана высота auto', kind: 'cssRule', selectorContains: 'img', prop: 'height', equals: 'auto' },
        { label: 'Картинка не шире контейнера', kind: 'custom', fn: "const frame = ctx.$('.frame').getBoundingClientRect(); const image = ctx.$('img').getBoundingClientRect(); return image.width <= frame.width + 1 || 'Картинка ' + image.width.toFixed(0) + 'px шире рамки ' + frame.width.toFixed(0) + 'px';" },
        { label: 'Пропорции сохранены', kind: 'custom', fn: "const image = ctx.$('img'); const box = image.getBoundingClientRect(); const ratio = box.width / box.height; return Math.abs(ratio - 3) < 0.4 || 'Соотношение сторон изменилось: ' + ratio.toFixed(2);" }
      ],
      hints: ['Оба свойства задаются селектору img.'],
      solution: {
        css: '.frame {\n  width: 260px;\n  border: 2px solid #334155;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}'
      }
    },
    {
      id: 'css-responsive-3',
      title: 'Три контрольные точки',
      difficulty: 'medium',
      description: 'Mobile first: одна колонка по умолчанию, две — от `600px`, четыре — от `1024px`. Промежуток задайте один раз в базовых стилях.',
      checks: [
        { label: 'Базово одна колонка', kind: 'cssRule', selector: '.cards', prop: 'grid-template-columns', contains: '1fr' },
        { label: 'Есть точка 600px', kind: 'cssRule', selector: '.cards', media: 'min-width: 600px', prop: 'grid-template-columns', matches: 'repeat\\(\\s*2|1fr\\s+1fr' },
        { label: 'Есть точка 1024px', kind: 'cssRule', selector: '.cards', media: 'min-width: 1024px', prop: 'grid-template-columns', matches: 'repeat\\(\\s*4|(1fr\\s+){3}1fr' },
        { label: 'Промежуток задан в базовых стилях', kind: 'cssRule', selector: '.cards', prop: 'gap' },
        { label: 'Использован min-width, а не max-width', kind: 'source', lang: 'css', notContains: 'max-width' }
      ],
      hints: ['Mobile first — это всегда min-width.'],
      solution: {
        css: '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n.card {\n  background: #a7f3d0;\n  padding: 20px;\n}\n\n@media (min-width: 600px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1024px) {\n  .cards { grid-template-columns: repeat(4, 1fr); }\n}'
      }
    },
    {
      id: 'css-responsive-4',
      title: 'Гибкая типографика',
      difficulty: 'medium',
      description: 'Задайте заголовку размер через `clamp(24px, 5vw, 48px)`, ограничьте ширину текста в `rem` и добавьте внутренние отступы в процентах от ширины.',
      starter: {
        html: '<article class="post">\n  <h1>Заголовок, который подстраивается</h1>\n  <p>Текст статьи, ширина которого ограничена для удобного чтения.</p>\n</article>\n',
        css: ''
      },
      checks: [
        { label: 'Использован clamp() для font-size', kind: 'cssRule', selectorContains: 'h1', prop: 'font-size', contains: 'clamp(' },
        { label: 'Размер заголовка в разумных пределах', kind: 'custom', fn: "const size = parseFloat(getComputedStyle(ctx.$('h1')).fontSize); return (size >= 24 && size <= 48) || 'Сейчас ' + size.toFixed(1) + 'px';" },
        { label: 'Ширина статьи ограничена в rem', kind: 'cssRule', selector: '.post', prop: 'max-width', contains: 'rem' },
        { label: 'Отступы заданы в процентах', kind: 'cssRule', selector: '.post', prop: 'padding', contains: '%' },
        { label: 'Статья не шире своего максимума', kind: 'custom', fn: "const style = getComputedStyle(ctx.$('.post')); const width = parseFloat(style.width); const limit = parseFloat(style.maxWidth); if (!limit) return 'max-width не задан'; return width <= limit + 1 || 'Ширина содержимого ' + width.toFixed(0) + 'px больше max-width ' + limit + 'px';" }
      ],
      hints: [
        'clamp(минимум, гибкое значение, максимум).',
        '1rem = 16px, поэтому 40rem ≈ 640px.'
      ],
      solution: {
        css: '.post {\n  max-width: 40rem;\n  margin: 0 auto;\n  padding: 4%;\n}\n\nh1 {\n  font-size: clamp(24px, 5vw, 48px);\n  line-height: 1.2;\n}'
      }
    },
    {
      id: 'css-responsive-5',
      title: 'Challenge: адаптивная шапка',
      difficulty: 'hard',
      description: 'Шапка должна перестраиваться: на узком экране логотип и меню идут в колонку и меню занимает всю ширину, от `768px` — в строку с `space-between`. Дополнительно спрячьте `.promo` на экранах уже 480px.',
      starter: {
        html: '<header class="topbar">\n  <div class="logo">LOGO</div>\n  <p class="promo">Скидка 20% до конца недели</p>\n  <nav class="menu">\n    <a href="#a">Главная</a>\n    <a href="#b">Каталог</a>\n    <a href="#c">Контакты</a>\n  </nav>\n</header>\n',
        css: '.topbar {\n  background: #0f172a;\n  color: #fff;\n  padding: 16px;\n}\n\n.menu a {\n  color: #fff;\n  margin-right: 12px;\n}\n'
      },
      checks: [
        { label: 'Базово шапка — колонка', kind: 'cssRule', selector: '.topbar', prop: 'flex-direction', equals: 'column' },
        { label: 'Шапка — flex-контейнер', kind: 'cssRule', selector: '.topbar', prop: 'display', equals: 'flex' },
        { label: 'От 768px — строка', kind: 'cssRule', selector: '.topbar', media: 'min-width: 768px', prop: 'flex-direction', equals: 'row' },
        { label: 'От 768px — space-between', kind: 'cssRule', selector: '.topbar', media: 'min-width: 768px', prop: 'justify-content', equals: 'space-between' },
        { label: 'Промо скрывается на узких экранах', kind: 'cssRule', selector: '.promo', media: 'max-width: 480px', prop: 'display', equals: 'none' },
        { label: 'Меню — flex', kind: 'cssRule', selector: '.menu', prop: 'display', equals: 'flex' }
      ],
      hints: [
        'Базовые стили — для телефона, @media (min-width: 768px) — для десктопа.',
        'Для скрытия промо понадобится отдельный @media (max-width: 480px).'
      ],
      solution: {
        css: '.topbar {\n  background: #0f172a;\n  color: #fff;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.menu {\n  display: flex;\n  gap: 12px;\n}\n\n.menu a {\n  color: #fff;\n}\n\n@media (min-width: 768px) {\n  .topbar {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n}\n\n@media (max-width: 480px) {\n  .promo {\n    display: none;\n  }\n}'
      }
    }
  ]
};

const lesson18 = {
  id: 'css-modern',
  title: 'Современный CSS',
  summary: 'Переменные, calc, переходы, трансформации и градиенты.',
  editors: ['html', 'css'],
  theory: [
    { lead: 'Несколько возможностей, которые делают CSS почти языком программирования.' },
    { h: 'Переменные' },
    { code: ':root {\n  --brand: #2563eb;\n  --radius: 12px;\n}\n\n.button {\n  background: var(--brand);\n  border-radius: var(--radius);\n}' },
    { h: 'calc()' },
    { code: 'width: calc(100% - 40px);\nheight: calc(100vh - 56px);' },
    { h: 'Переходы и трансформации' },
    { code: '.button {\n  transition: transform .2s ease, background-color .2s ease;\n}\n\n.button:hover {\n  transform: translateY(-2px) scale(1.03);\n}' },
    { h: 'Градиенты и тени' },
    { code: 'background: linear-gradient(135deg, #6366f1, #ec4899);\nbox-shadow: 0 10px 30px rgb(0 0 0 / .25);' },
    { note: 'Переменные наследуются: объявите их в `:root` — и они доступны везде. Менять их можно даже внутри медиазапроса.' }
  ],
  starter: {
    html: '<button class="btn">Кнопка</button>\n<div class="panel">Панель</div>\n',
    css: '/* ваши стили */\n'
  },
  tasks: [
    {
      id: 'css-modern-1',
      title: 'Переменные темы',
      difficulty: 'easy',
      description: 'Объявите в `:root` переменные `--brand: #2563eb` и `--radius: 10px` и примените их к кнопке (фон и скругление).',
      checks: [
        { label: 'Объявлена переменная --brand', kind: 'source', lang: 'css', matches: '--brand\\s*:' },
        { label: 'Объявлена переменная --radius', kind: 'source', lang: 'css', matches: '--radius\\s*:' },
        { label: 'Кнопка использует var(--brand)', kind: 'cssRule', selector: '.btn', prop: 'background-color', contains: 'var(--brand)' },
        { label: 'Фон кнопки — #2563eb', kind: 'style', selector: '.btn', prop: 'background-color', equals: '#2563eb' },
        { label: 'Скругление 10px', kind: 'style', selector: '.btn', prop: 'border-top-left-radius', equals: '10px' }
      ],
      hints: [':root { --brand: #2563eb; } и .btn { background-color: var(--brand); }'],
      solution: {
        css: ':root {\n  --brand: #2563eb;\n  --radius: 10px;\n}\n\n.btn {\n  background-color: var(--brand);\n  border-radius: var(--radius);\n  color: #fff;\n  border: 0;\n  padding: 12px 20px;\n}'
      }
    },
    {
      id: 'css-modern-2',
      title: 'calc()',
      difficulty: 'easy',
      description: 'Задайте панели ширину `calc(100% - 40px)` и высоту `calc(100vh - 120px)`.',
      checks: [
        { label: 'Ширина через calc', kind: 'cssRule', selector: '.panel', prop: 'width', contains: 'calc(' },
        { label: 'Высота через calc', kind: 'cssRule', selector: '.panel', prop: 'height', contains: 'calc(' },
        { label: 'Ширина реально меньше родителя на 40px', kind: 'custom', fn: "const panel = ctx.$('.panel').getBoundingClientRect(); const available = ctx.doc.body.getBoundingClientRect().width; return Math.abs(available - panel.width - 40) < 2 || 'Разница ' + (available - panel.width).toFixed(1) + 'px вместо 40px';" }
      ],
      hints: ['Вокруг знака минус в calc обязательны пробелы: calc(100% - 40px).'],
      solution: {
        css: '.panel {\n  width: calc(100% - 40px);\n  height: calc(100vh - 120px);\n  background: #e2e8f0;\n}'
      }
    },
    {
      id: 'css-modern-3',
      title: 'Плавная кнопка',
      difficulty: 'medium',
      description: 'Добавьте кнопке `transition` длительностью `.2s` и эффект при наведении: `transform: translateY(-2px)` и более тёмный фон.',
      starter: {
        css: '.btn {\n  background-color: #2563eb;\n  color: #fff;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 10px;\n}\n'
      },
      checks: [
        { label: 'Задан transition', kind: 'cssRule', selector: '.btn', prop: 'transition', matches: '\\S' },
        { label: 'Длительность 0.2s', kind: 'style', selector: '.btn', prop: 'transition-duration', matches: '^(0\\.2s|200ms)' },
        { label: 'Есть правило .btn:hover', kind: 'cssRule', selector: '.btn:hover' },
        { label: 'При наведении сдвиг по Y', kind: 'cssRule', selector: '.btn:hover', prop: 'transform', contains: 'translatey(-2px)' },
        { label: 'При наведении меняется фон', kind: 'cssRule', selector: '.btn:hover', prop: 'background-color', matches: '\\S' }
      ],
      hints: ['transition: transform .2s ease, background-color .2s ease;'],
      solution: {
        css: '.btn {\n  background-color: #2563eb;\n  color: #fff;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 10px;\n  transition: transform .2s ease, background-color .2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  background-color: #1d4ed8;\n}'
      }
    },
    {
      id: 'css-modern-4',
      title: 'Градиент и тень',
      difficulty: 'medium',
      description: 'Сделайте панели фон линейным градиентом под углом `135deg` из двух цветов и добавьте заметную тень.',
      checks: [
        { label: 'Фон — линейный градиент', kind: 'style', selector: '.panel', prop: 'background-image', contains: 'linear-gradient' },
        { label: 'Угол 135deg', kind: 'source', lang: 'css', matches: '135deg' },
        { label: 'В градиенте минимум два цвета', kind: 'custom', fn: "const image = getComputedStyle(ctx.$('.panel')).backgroundImage; const colors = image.match(/rgba?\\([^)]*\\)/g) || []; return colors.length >= 2 || 'Найдено цветов: ' + colors.length;" },
        { label: 'Есть box-shadow', kind: 'custom', fn: "const shadow = getComputedStyle(ctx.$('.panel')).boxShadow; return (shadow && shadow !== 'none') || 'Тень не задана';" }
      ],
      hints: ['background: linear-gradient(135deg, #6366f1, #ec4899);'],
      solution: {
        css: '.panel {\n  padding: 40px;\n  color: #fff;\n  background: linear-gradient(135deg, #6366f1, #ec4899);\n  box-shadow: 0 10px 30px rgb(0 0 0 / .25);\n  border-radius: 16px;\n}'
      }
    },
    {
      id: 'css-modern-5',
      title: 'Challenge: тема на переменных',
      difficulty: 'hard',
      description: 'Соберите мини-дизайн-систему: в `:root` — минимум четыре переменные (цвет бренда, фон, текст, радиус). Кнопка и панель используют только переменные. Добавьте класс `.dark`, который переопределяет переменные, и плавный переход цветов.',
      starter: {
        html: '<div class="theme dark">\n  <div class="panel">\n    <h3>Панель</h3>\n    <button class="btn">Действие</button>\n  </div>\n</div>\n',
        css: ''
      },
      checks: [
        { label: 'В :root минимум 4 переменные', kind: 'custom', fn: "const source = ctx.source.css; const root = (source.match(/:root\\s*\\{([\\s\\S]*?)\\}/) || [])[1] || ''; const count = (root.match(/--[\\w-]+\\s*:/g) || []).length; return count >= 4 || 'Сейчас переменных: ' + count;" },
        { label: 'Класс .dark переопределяет переменные', kind: 'custom', fn: "const source = ctx.source.css; const dark = (source.match(/\\.dark\\s*\\{([\\s\\S]*?)\\}/) || [])[1] || ''; const count = (dark.match(/--[\\w-]+\\s*:/g) || []).length; return count >= 2 || 'В .dark переопределено переменных: ' + count;" },
        { label: 'Панель использует var()', kind: 'custom', fn: "const source = ctx.source.css; const panel = (source.match(/\\.panel\\s*\\{([\\s\\S]*?)\\}/) || [])[1] || ''; return /var\\(--/.test(panel) || 'В .panel нет ни одной переменной';" },
        { label: 'Кнопка использует var()', kind: 'custom', fn: "const source = ctx.source.css; const button = (source.match(/\\.btn\\s*\\{([\\s\\S]*?)\\}/) || [])[1] || ''; return /var\\(--/.test(button) || 'В .btn нет ни одной переменной';" },
        { label: 'Тёмная тема действительно применилась', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.$('.panel')).backgroundColor.match(/\\d+/g); if (!rgb) return 'Фон панели не задан'; const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum < 350 || 'Фон панели светлый — переменные .dark не сработали';" },
        { label: 'Есть плавный переход', kind: 'custom', fn: "const panel = getComputedStyle(ctx.$('.panel')).transitionDuration; const button = getComputedStyle(ctx.$('.btn')).transitionDuration; return (parseFloat(panel) > 0 || parseFloat(button) > 0) || 'transition не задан';" }
      ],
      hints: [
        'Переменные в .dark переопределяются так же, как объявляются: .dark { --bg: #0b1020; }',
        'Переменная, объявленная на родителе, действует на всех потомков.'
      ],
      solution: {
        css: ':root {\n  --brand: #2563eb;\n  --bg: #ffffff;\n  --text: #16203a;\n  --radius: 14px;\n}\n\n.dark {\n  --bg: #111827;\n  --text: #e5e9f5;\n  --brand: #6ea8fe;\n}\n\n.panel {\n  background: var(--bg);\n  color: var(--text);\n  border-radius: var(--radius);\n  padding: 24px;\n  transition: background-color .3s ease, color .3s ease;\n}\n\n.btn {\n  background: var(--brand);\n  color: var(--bg);\n  border: 0;\n  border-radius: var(--radius);\n  padding: 12px 20px;\n  transition: background-color .3s ease;\n}'
      }
    }
  ]
};

export const cssModule = {
  id: 'css',
  title: 'CSS',
  subtitle: 'Внешний вид: цвет, размер, раскладка',
  lessons: [lesson10, lesson11, lesson12, lesson13, lesson14, lesson15, lesson16, lesson17, lesson18]
};
