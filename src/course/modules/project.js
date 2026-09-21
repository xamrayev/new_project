/*
 * Module 4 — Final project (lesson 34).
 *
 * Five tasks that build one app end to end: markup → styles → rendering →
 * filtering → cart with persistence. Each task starts where the previous ended.
 */

const PRODUCT_DATA = `const PRODUCTS = [
  { id: 1, title: "Кофемашина", price: 2400000, category: "техника", inStock: true },
  { id: 2, title: "Турка", price: 85000, category: "посуда", inStock: true },
  { id: 3, title: "Кофемолка", price: 540000, category: "техника", inStock: false },
  { id: 4, title: "Френч-пресс", price: 160000, category: "посуда", inStock: true },
  { id: 5, title: "Чайник", price: 320000, category: "техника", inStock: true }
];`;

const STAGE3_HTML = `<header class="topbar">
  <h1>Кофейня</h1>
  <nav><a href="#catalog">Каталог</a></nav>
</header>
<main id="catalog">
  <h2>Товары</h2>
  <div class="grid" id="grid"></div>
</main>
<footer>
  <p>© 2026 Кофейня</p>
</footer>
`;

const STAGE3_CSS = `* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  margin: 0;
  color: #16203a;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #111827;
  color: #fff;
}

.topbar a { color: #fff; }

main { padding: 24px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #d7deee;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card button { margin-top: auto; }

.out-of-stock { opacity: .55; }
`;

const STAGE4_JS = `${PRODUCT_DATA}

const grid = document.querySelector("#grid");

function render(list) {
  grid.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    if (!product.inStock) card.classList.add("out-of-stock");

    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price + " сум";

    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = "В корзину";
    button.disabled = !product.inStock;
    button.dataset.id = product.id;

    card.append(title, price, button);
    grid.append(card);
  });
}

render(PRODUCTS);
`;

const lesson34 = {
  id: 'final-project',
  title: 'Итоговый проект',
  summary: 'Каталог товаров: разметка, стили, рендер, фильтр и корзина.',
  editors: ['html', 'css', 'js'],
  theory: [
    { lead: 'Финальный проект собирает весь курс в одно приложение — каталог с фильтром и корзиной. Пять задач проходят путь, по которому идёт реальная разработка.' },
    { ol: [
      'Разметка — семантический каркас страницы.',
      'Стили — адаптивная сетка карточек.',
      'Данные — карточки строятся из массива, а не пишутся руками.',
      'Взаимодействие — поиск и фильтр по категории.',
      'Состояние — корзина, которая переживает перезагрузку.'
    ] },
    { h: 'Как работать' },
    { p: 'Каждая задача начинается с результата предыдущей — вы дописываете, а не начинаете заново. Если застряли, откройте решение задачи, разберите его и идите дальше.' },
    { h: 'Чек-лист хорошего кода' },
    { ul: [
      'разметка семантическая, у интерактивных элементов есть подписи;',
      'стили — классами, без `!important`;',
      'данные отделены от отображения: массив → функция `render` → DOM;',
      'обработчиков событий столько, сколько нужно (делегирование вместо цикла);',
      'состояние хранится в одном месте.'
    ] },
    { note: 'Это самая длинная работа в курсе. Запускайте код после каждого шага — так ошибку всегда видно сразу.' }
  ],
  starter: { html: '<!-- каркас страницы -->\n', css: '', js: '' },
  tasks: [
    {
      id: 'final-project-1',
      title: 'Каркас каталога',
      difficulty: 'easy',
      description: 'Соберите семантический каркас: `<header>` с заголовком и `<nav>`, `<main id="catalog">` с заголовком раздела и пустым контейнером `<div class="grid" id="grid">`, `<footer>` с копирайтом.',
      checks: [
        { label: 'Есть шапка с навигацией', kind: 'exists', selector: 'header nav' },
        { label: 'В шапке заголовок <h1>', kind: 'text', selector: 'header h1', matches: '\\S' },
        { label: 'Есть main#catalog', kind: 'exists', selector: 'main#catalog' },
        { label: 'В main есть заголовок <h2>', kind: 'text', selector: 'main h2', matches: '\\S' },
        { label: 'Есть пустой контейнер #grid', kind: 'exists', selector: '#grid.grid' },
        { label: 'Контейнер пока пуст', kind: 'custom', fn: "return ctx.$('#grid').children.length === 0 || 'На этом шаге #grid должен быть пустым';" },
        { label: 'Есть подвал', kind: 'text', selector: 'footer', matches: '\\S' },
        { label: 'Лишних <div> нет', kind: 'count', selector: 'div', max: 1 }
      ],
      hints: ['Каркас тот же, что в уроке про семантику: header → main → footer.'],
      solution: { html: STAGE3_HTML }
    },
    {
      id: 'final-project-2',
      title: 'Стили и сетка',
      difficulty: 'medium',
      description: 'Оформите страницу: тёмная шапка с логотипом слева и навигацией справа, сетка `.grid` из адаптивных колонок (`auto-fit`, минимум 220px, промежуток 20px), карточки `.card` с рамкой, скруглением и внутренними отступами. Не забудьте `box-sizing: border-box`.',
      starter: {
        html: STAGE3_HTML.replace('<div class="grid" id="grid"></div>', '<div class="grid" id="grid">\n    <article class="card"><h3>Кофемашина</h3><p>2400000 сум</p><button>В корзину</button></article>\n    <article class="card"><h3>Турка</h3><p>85000 сум</p><button>В корзину</button></article>\n    <article class="card"><h3>Кофемолка</h3><p>540000 сум</p><button>В корзину</button></article>\n  </div>'),
        css: ''
      },
      checks: [
        { label: 'Задан box-sizing: border-box', kind: 'style', selector: '.card', prop: 'box-sizing', equals: 'border-box' },
        { label: 'Шапка — flex со space-between', kind: 'style', selector: '.topbar', prop: 'justify-content', equals: 'space-between' },
        { label: 'У шапки тёмный фон', kind: 'custom', fn: "const rgb = getComputedStyle(ctx.$('.topbar')).backgroundColor.match(/\\d+/g); if (!rgb) return 'Фон шапки не задан'; const sum = Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]); return sum < 380 || 'Фон шапки слишком светлый';" },
        { label: 'Сетка включена', kind: 'style', selector: '.grid', prop: 'display', equals: 'grid' },
        { label: 'Колонки адаптивные (auto-fit + minmax)', kind: 'source', lang: 'css', matches: 'repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(\\s*220px' },
        { label: 'Промежуток 20px', kind: 'style', selector: '.grid', prop: 'column-gap', equals: '20px' },
        { label: 'У карточек рамка', kind: 'style', selector: '.card', prop: 'border-top-width', min: 1 },
        { label: 'У карточек скругление', kind: 'style', selector: '.card', prop: 'border-top-left-radius', min: 4 },
        { label: 'У карточек внутренние отступы', kind: 'style', selector: '.card', prop: 'padding-left', min: 10 },
        { label: 'Карточки раскладываются по колонкам', kind: 'custom', fn: "const grid = ctx.$('.grid'); const cards = ctx.$$('.card').map((card) => card.getBoundingClientRect()); if (cards.length < 2) return 'Нужно минимум две карточки'; const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length; if (grid.getBoundingClientRect().width < 480) return columns >= 1 || 'Сетка не собралась'; if (columns < 2) return 'При такой ширине должно помещаться минимум две колонки, сейчас ' + columns; return Math.abs(cards[0].top - cards[1].top) < 2 || 'Карточки не в одном ряду — проверьте сетку';" }
      ],
      hints: [
        'Начните с * { box-sizing: border-box; } — это избавит от сюрпризов с шириной.',
        'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));'
      ],
      solution: { css: STAGE3_CSS }
    },
    {
      id: 'final-project-3',
      title: 'Карточки из данных',
      difficulty: 'medium',
      description: 'Уберите карточки из HTML и стройте их кодом: функция `render(list)` очищает `#grid` и создаёт для каждого товара `<article class="card">` с `.title`, `.price` и кнопкой `.buy`. Товарам не в наличии добавьте класс `out-of-stock` и отключите кнопку.',
      starter: {
        html: STAGE3_HTML,
        css: STAGE3_CSS,
        js: `${PRODUCT_DATA}\n\n// напишите функцию render(list) и вызовите её\n`
      },
      checks: [
        { label: 'Создано пять карточек', kind: 'count', selector: '#grid .card', equals: 5 },
        { label: 'У каждой карточки название и цена', kind: 'custom', fn: "const cards = ctx.$$('#grid .card'); for (const card of cards) { if (!card.querySelector('.title') || !card.querySelector('.price')) return 'В карточке нет .title или .price'; } return true;" },
        { label: 'Названия совпадают с данными', kind: 'custom', fn: "const titles = ctx.$$('#grid .title').map((node) => ctx.text(node.textContent)); return JSON.stringify(titles) === '[\"Кофемашина\",\"Турка\",\"Кофемолка\",\"Френч-пресс\",\"Чайник\"]' || 'Получено: ' + JSON.stringify(titles);" },
        { label: 'В карточках есть кнопка .buy', kind: 'count', selector: '#grid .card .buy', equals: 5 },
        { label: 'Товар не в наличии помечен', kind: 'count', selector: '#grid .card.out-of-stock', equals: 1 },
        { label: 'У него отключена кнопка', kind: 'custom', fn: "const button = ctx.$('#grid .card.out-of-stock .buy'); if (!button) return 'Нет кнопки в карточке без наличия'; return button.disabled === true || 'Кнопка должна быть disabled';" },
        { label: 'Объявлена функция render', kind: 'source', lang: 'js', matches: 'function\\s+render|const\\s+render\\s*=' },
        { label: 'Карточек в HTML не осталось', kind: 'source', lang: 'html', notContains: 'class="card"' }
      ],
      hints: [
        'grid.innerHTML = "" очищает контейнер перед отрисовкой.',
        'button.disabled = !product.inStock;'
      ],
      solution: { js: STAGE4_JS }
    },
    {
      id: 'final-project-4',
      title: 'Поиск и фильтр',
      difficulty: 'hard',
      description: 'Добавьте панель управления: поле `#search` ищет по названию (без учёта регистра), список `#category` фильтрует по категории (`все`, `техника`, `посуда`), а `#found` показывает `Найдено: N`. Фильтры работают вместе.',
      starter: {
        html: STAGE3_HTML.replace('<h2>Товары</h2>', '<h2>Товары</h2>\n  <div class="controls">\n    <input id="search" type="search" placeholder="Поиск по названию">\n    <select id="category">\n      <option value="all">Все категории</option>\n      <option value="техника">Техника</option>\n      <option value="посуда">Посуда</option>\n    </select>\n    <p id="found">Найдено: 5</p>\n  </div>'),
        css: STAGE3_CSS + '\n.controls {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n',
        js: STAGE4_JS
      },
      checks: [
        { label: 'Изначально показаны все пять товаров', kind: 'count', selector: '#grid .card', equals: 5 },
        {
          label: 'Поиск фильтрует карточки',
          kind: 'interact',
          steps: [{ do: 'type', selector: '#search', value: 'кофе' }],
          then: [
            { label: 'Осталось два товара', kind: 'count', selector: '#grid .card', equals: 2 },
            { label: 'Счётчик обновился', kind: 'text', selector: '#found', equals: 'Найдено: 2' }
          ]
        },
        {
          label: 'Поиск не зависит от регистра',
          kind: 'interact',
          steps: [{ do: 'type', selector: '#search', value: 'ТУРКА' }],
          then: [{ label: 'Найдена одна карточка', kind: 'count', selector: '#grid .card', equals: 1 }]
        },
        {
          label: 'Фильтр по категории работает',
          kind: 'interact',
          steps: [{ do: 'select', selector: '#category', value: 'посуда' }],
          then: [
            { label: 'Осталось два товара', kind: 'count', selector: '#grid .card', equals: 2 },
            { label: 'Счётчик обновился', kind: 'text', selector: '#found', equals: 'Найдено: 2' }
          ]
        },
        {
          label: 'Поиск и фильтр работают вместе',
          kind: 'interact',
          steps: [
            { do: 'select', selector: '#category', value: 'техника' },
            { do: 'type', selector: '#search', value: 'кофе' }
          ],
          then: [{ label: 'Найдено две позиции техники', kind: 'count', selector: '#grid .card', equals: 2 }]
        },
        {
          label: 'Пустой результат обрабатывается',
          kind: 'interact',
          steps: [{ do: 'type', selector: '#search', value: 'йцукен' }],
          then: [
            { label: 'Карточек нет', kind: 'count', selector: '#grid .card', equals: 0 },
            { label: 'Счётчик показывает ноль', kind: 'text', selector: '#found', equals: 'Найдено: 0' }
          ]
        },
        { label: 'Фильтрация написана одной функцией', kind: 'source', lang: 'js', matches: 'filter\\(' }
      ],
      hints: [
        'Сделайте функцию applyFilters(), которая читает оба поля, фильтрует PRODUCTS и вызывает render().',
        'Приводите к нижнему регистру и строку поиска, и название: title.toLowerCase().includes(query).'
      ],
      solution: {
        js: `${STAGE4_JS}
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const found = document.querySelector("#found");

function applyFilters() {
  const query = search.value.trim().toLowerCase();
  const group = category.value;

  const list = PRODUCTS.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query);
    const matchesGroup = group === "all" || product.category === group;
    return matchesQuery && matchesGroup;
  });

  render(list);
  found.textContent = \`Найдено: \${list.length}\`;
}

search.addEventListener("input", applyFilters);
category.addEventListener("change", applyFilters);

applyFilters();
`
      }
    },
    {
      id: 'final-project-5',
      title: 'Challenge: корзина с сохранением',
      difficulty: 'hard',
      description: 'Финальный шаг: кнопка «В корзину» добавляет товар (повторное нажатие увеличивает количество), блок `#cart` показывает позиции, `#total` — сумму вида `Итого: 2 485 000 сум`, а содержимое корзины сохраняется в localStorage под ключом `cart` и восстанавливается при загрузке.',
      starter: {
        html: STAGE3_HTML.replace('</main>', '  <aside class="cart">\n    <h2>Корзина</h2>\n    <ul id="cart"></ul>\n    <p id="total">Итого: 0 сум</p>\n  </aside>\n</main>'),
        css: STAGE3_CSS + '\n.cart {\n  margin-top: 32px;\n  border-top: 1px solid #d7deee;\n  padding-top: 16px;\n}\n',
        js: STAGE4_JS
      },
      sandbox: { storageSeed: {} },
      checks: [
        {
          label: 'Товар добавляется в корзину',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#grid .card:first-child .buy' }],
          then: [
            { label: 'В корзине одна позиция', kind: 'count', selector: '#cart li', equals: 1 },
            { label: 'Позиция названа верно', kind: 'text', selector: '#cart li', contains: 'Кофемашина' }
          ]
        },
        {
          label: 'Итог считается',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#grid .card:first-child .buy' }],
          then: [{ label: 'Сумма с разделителями разрядов', kind: 'text', selector: '#total', equals: 'Итого: 2 400 000 сум' }]
        },
        {
          label: 'Повторное нажатие увеличивает количество',
          kind: 'interact',
          steps: [
            { do: 'click', selector: '#grid .card:first-child .buy' },
            { do: 'click', selector: '#grid .card:first-child .buy' }
          ],
          then: [
            { label: 'Позиция всё ещё одна', kind: 'count', selector: '#cart li', equals: 1 },
            { label: 'В ней количество 2', kind: 'text', selector: '#cart li', matches: '2' },
            { label: 'Сумма удвоилась', kind: 'text', selector: '#total', equals: 'Итого: 4 800 000 сум' }
          ]
        },
        {
          label: 'Разные товары складываются',
          kind: 'interact',
          steps: [
            { do: 'click', selector: '#grid .card:first-child .buy' },
            { do: 'click', selector: '#grid .card:nth-child(2) .buy' }
          ],
          then: [
            { label: 'В корзине две позиции', kind: 'count', selector: '#cart li', equals: 2 },
            { label: 'Сумма верная', kind: 'text', selector: '#total', equals: 'Итого: 2 485 000 сум' }
          ]
        },
        {
          label: 'Корзина сохраняется в localStorage',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#grid .card:first-child .buy' }],
          then: [{
            label: 'В хранилище лежит корзина',
            kind: 'custom',
            fn: "const raw = localStorage.getItem('cart'); if (!raw) return 'Ключа cart нет в localStorage'; let data; try { data = JSON.parse(raw); } catch (error) { return 'В хранилище не JSON: ' + raw; } const size = Array.isArray(data) ? data.length : Object.keys(data).length; return size >= 1 || 'Корзина в хранилище пуста';"
          }]
        },
        {
          label: 'Товар не в наличии не добавляется',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#grid .card.out-of-stock .buy' }],
          then: [{ label: 'Корзина осталась пустой', kind: 'count', selector: '#cart li', equals: 0 }]
        },
        { label: 'Использовано делегирование или один обработчик на сетке', kind: 'source', lang: 'js', matches: 'grid\\.addEventListener|querySelector\\(["\\\']#grid["\\\']\\)\\.addEventListener' },
        { label: 'Состояние пишется в localStorage', kind: 'source', lang: 'js', matches: 'setItem\\(\\s*["\\\']cart' },
        { label: 'Состояние читается при загрузке', kind: 'source', lang: 'js', matches: 'getItem\\(\\s*["\\\']cart' }
      ],
      hints: [
        'Храните корзину как массив { id, quantity } — по id всегда можно найти товар в PRODUCTS.',
        'Один обработчик на #grid: event.target.closest(".buy") даст нажатую кнопку.',
        'Форматирование суммы: String(total).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ").'
      ],
      solution: {
        js: `${STAGE4_JS}
const cartList = document.querySelector("#cart");
const totalNode = document.querySelector("#total");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function money(value) {
  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " сум";
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((line) => {
    const product = PRODUCTS.find((item) => item.id === line.id);
    if (!product) return;

    total += product.price * line.quantity;

    const row = document.createElement("li");
    row.textContent = \`\${product.title} × \${line.quantity} — \${money(product.price * line.quantity)}\`;
    cartList.append(row);
  });

  totalNode.textContent = \`Итого: \${money(total)}\`;
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".buy");
  if (!button || button.disabled) return;

  const id = Number(button.dataset.id);
  const line = cart.find((item) => item.id === id);

  if (line) {
    line.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  save();
  renderCart();
});

renderCart();
`
      }
    }
  ]
};

export const projectModule = {
  id: 'project',
  title: 'Проект',
  subtitle: 'Всё вместе: от каркаса до рабочего приложения',
  lessons: [lesson34]
};
