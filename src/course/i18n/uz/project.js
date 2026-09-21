/* Yakuniy loyiha (34-dars) — o'zbekcha matnlar. */

const PRODUCT_DATA = `const PRODUCTS = [
  { id: 1, title: "Kofemashina", price: 2400000, category: "texnika", inStock: true },
  { id: 2, title: "Turka", price: 85000, category: "idish", inStock: true },
  { id: 3, title: "Kofemaydalagich", price: 540000, category: "texnika", inStock: false },
  { id: 4, title: "Frenchpress", price: 160000, category: "idish", inStock: true },
  { id: 5, title: "Choynak", price: 320000, category: "texnika", inStock: true }
];`;

const STAGE3_HTML = `<header class="topbar">
  <h1>Qahvaxona</h1>
  <nav><a href="#catalog">Katalog</a></nav>
</header>
<main id="catalog">
  <h2>Mahsulotlar</h2>
  <div class="grid" id="grid"></div>
</main>
<footer>
  <p>© 2026 Qahvaxona</p>
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
    price.textContent = product.price + " so‘m";

    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = "Savatga";
    button.disabled = !product.inStock;
    button.dataset.id = product.id;

    card.append(title, price, button);
    grid.append(card);
  });
}

render(PRODUCTS);
`;

const lesson34 = {
  title: 'Yakuniy loyiha',
  summary: 'Mahsulotlar katalogi: belgilash, stillar, render, filtr va savat.',
  starter: { html: '<!-- sahifa karkasi -->\n', css: '', js: '' },
  theory: [
    { lead: 'Yakuniy loyiha butun kursni bitta ilovaga jamlaydi — filtr va savati bo‘lgan katalog. Beshta topshiriq haqiqiy ishlab chiqish yo‘lidan o‘tadi.' },
    { ol: [
      'Belgilash — sahifaning semantik karkasi.',
      'Stillar — kartalarning moslashuvchan setkasi.',
      'Ma’lumotlar — kartalar qo‘lda yozilmay, massivdan quriladi.',
      'O‘zaro ta’sir — kategoriya bo‘yicha qidiruv va filtr.',
      'Holat — qayta yuklashdan keyin ham saqlanadigan savat.'
    ] },
    { h: 'Qanday ishlash kerak' },
    { p: 'Har bir topshiriq oldingisining natijasidan boshlanadi — siz noldan emas, davomini yozasiz. Qotib qolsangiz, topshiriq yechimini oching, uni tahlil qiling va davom eting.' },
    { h: 'Yaxshi kodning nazorat ro‘yxati' },
    { ul: [
      'belgilash semantik, interaktiv elementlarda yozuv bor;',
      'stillar — klasslar bilan, `!important` siz;',
      'ma’lumot ko‘rinishdan ajratilgan: massiv → `render` funksiyasi → DOM;',
      'hodisa ishlov beruvchilari qancha kerak bo‘lsa, shuncha (sikl o‘rniga delegatsiya);',
      'holat bitta joyda saqlanadi.'
    ] },
    { note: 'Bu — kursdagi eng uzun ish. Har qadamdan keyin kodni ishga tushiring — shunda xato darhol ko‘rinadi.' }
  ],
  tasks: {
    'final-project-1': {
      title: 'Katalog karkasi',
      description: 'Semantik karkas yig‘ing: sarlavha va `<nav>` bo‘lgan `<header>`, bo‘lim sarlavhasi hamda bo‘sh `<div class="grid" id="grid">` konteyneri bo‘lgan `<main id="catalog">`, mualliflik matnli `<footer>`.',
      hints: ['Karkas semantika darsidagidek: header → main → footer.'],
      solution: { html: STAGE3_HTML },
      checks: [
        { label: 'Navigatsiyali shapka bor' },
        { label: 'Shapkada <h1> sarlavhasi' },
        { label: 'main#catalog bor' },
        { label: 'main ichida <h2> sarlavhasi bor' },
        { label: 'Bo‘sh #grid konteyneri bor' },
        { label: 'Konteyner hozircha bo‘sh' },
        { label: 'Futer bor' },
        { label: 'Ortiqcha <div> yo‘q' }
      ]
    },
    'final-project-2': {
      title: 'Stillar va setka',
      description: 'Sahifani bezang: chapda logotip, o‘ngda navigatsiya bo‘lgan qorong‘i shapka, moslashuvchan ustunlardan iborat `.grid` setkasi (`auto-fit`, kamida 220px, oraliq 20px), ramka, yumaloqlik va ichki masofalari bo‘lgan `.card` kartalari. `box-sizing: border-box` ni unutmang.',
      hints: [
        '* { box-sizing: border-box; } dan boshlang — bu kenglik bilan bog‘liq kutilmagan holatlardan xalos qiladi.',
        'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));'
      ],
      starter: {
        html: STAGE3_HTML.replace('<div class="grid" id="grid"></div>', '<div class="grid" id="grid">\n    <article class="card"><h3>Kofemashina</h3><p>2400000 so‘m</p><button>Savatga</button></article>\n    <article class="card"><h3>Turka</h3><p>85000 so‘m</p><button>Savatga</button></article>\n    <article class="card"><h3>Kofemaydalagich</h3><p>540000 so‘m</p><button>Savatga</button></article>\n  </div>'),
        css: ''
      },
      solution: { css: STAGE3_CSS },
      checks: [
        { label: 'box-sizing: border-box berilgan' },
        { label: 'Shapka — space-between bilan flex' },
        { label: 'Shapkaning foni qorong‘i' },
        { label: 'Setka yoqilgan' },
        { label: 'Ustunlar moslashuvchan (auto-fit + minmax)' },
        { label: 'Oraliq 20px' },
        { label: 'Kartalarda ramka bor' },
        { label: 'Kartalarda yumaloqlik bor' },
        { label: 'Kartalarda ichki masofalar bor' },
        { label: 'Kartalar ustunlarga joylashadi' }
      ]
    },
    'final-project-3': {
      title: 'Ma’lumotlardan kartalar',
      description: 'Kartalarni HTML dan olib tashlang va ularni kod bilan quring: `render(list)` funksiyasi `#grid` ni tozalaydi va har bir mahsulot uchun `.title`, `.price` va `.buy` tugmasi bo‘lgan `<article class="card">` yaratadi. Sotuvda bo‘lmagan mahsulotlarga `out-of-stock` klassini qo‘shing va tugmasini o‘chiring.',
      hints: [
        'grid.innerHTML = "" chizishdan oldin konteynerni tozalaydi.',
        'button.disabled = !product.inStock;'
      ],
      starter: {
        html: STAGE3_HTML,
        css: STAGE3_CSS,
        js: `${PRODUCT_DATA}\n\n// render(list) funksiyasini yozing va uni chaqiring\n`
      },
      solution: { js: STAGE4_JS },
      checks: [
        { label: 'Beshta karta yaratildi' },
        { label: 'Har bir kartada nom va narx bor' },
        {
          label: 'Nomlar ma’lumotlarga mos',
          fn: "const titles = ctx.$$('#grid .title').map((node) => ctx.text(node.textContent)); return JSON.stringify(titles) === '[\"Kofemashina\",\"Turka\",\"Kofemaydalagich\",\"Frenchpress\",\"Choynak\"]' || 'Olindi: ' + JSON.stringify(titles);"
        },
        { label: 'Kartalarda .buy tugmasi bor' },
        { label: 'Sotuvda yo‘q mahsulot belgilangan' },
        { label: 'Uning tugmasi o‘chirilgan' },
        { label: 'render funksiyasi e’lon qilingan' },
        { label: 'HTML da kartalar qolmadi' }
      ]
    },
    'final-project-4': {
      title: 'Qidiruv va filtr',
      description: 'Boshqaruv panelini qo‘shing: `#search` maydoni nom bo‘yicha qidiradi (registrga bog‘liq emas), `#category` ro‘yxati kategoriya bo‘yicha filtrlaydi (`barchasi`, `texnika`, `idish`), `#found` esa `Topildi: N` ni ko‘rsatadi. Filtrlar birgalikda ishlaydi.',
      hints: [
        'applyFilters() funksiyasini yasang: u ikkala maydonni o‘qiydi, PRODUCTS ni filtrlaydi va render() ni chaqiradi.',
        'Qidiruv satrini ham, nomni ham kichik registrga keltiring: title.toLowerCase().includes(query).'
      ],
      starter: {
        html: STAGE3_HTML.replace('<h2>Mahsulotlar</h2>', '<h2>Mahsulotlar</h2>\n  <div class="controls">\n    <input id="search" type="search" placeholder="Nom bo‘yicha qidirish">\n    <select id="category">\n      <option value="all">Barcha kategoriyalar</option>\n      <option value="texnika">Texnika</option>\n      <option value="idish">Idish-tovoq</option>\n    </select>\n    <p id="found">Topildi: 5</p>\n  </div>'),
        css: STAGE3_CSS + '\n.controls {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n',
        js: STAGE4_JS
      },
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
  found.textContent = \`Topildi: \${list.length}\`;
}

search.addEventListener("input", applyFilters);
category.addEventListener("change", applyFilters);

applyFilters();
`
      },
      checks: [
        { label: 'Boshida beshala mahsulot ham ko‘rinadi' },
        {
          label: 'Qidiruv kartalarni filtrlaydi',
          steps: [{ do: 'type', selector: '#search', value: 'kofe' }],
          then: [
            { label: 'Ikkita mahsulot qoldi' },
            { label: 'Hisoblagich yangilandi', equals: 'Topildi: 2' }
          ]
        },
        {
          label: 'Qidiruv registrga bog‘liq emas',
          steps: [{ do: 'type', selector: '#search', value: 'TURKA' }],
          then: [{ label: 'Bitta karta topildi' }]
        },
        {
          label: 'Kategoriya bo‘yicha filtr ishlaydi',
          steps: [{ do: 'select', selector: '#category', value: 'idish' }],
          then: [
            { label: 'Ikkita mahsulot qoldi' },
            { label: 'Hisoblagich yangilandi', equals: 'Topildi: 2' }
          ]
        },
        {
          label: 'Qidiruv va filtr birga ishlaydi',
          steps: [
            { do: 'select', selector: '#category', value: 'texnika' },
            { do: 'type', selector: '#search', value: 'kofe' }
          ],
          then: [{ label: 'Texnikadan ikkita pozitsiya topildi' }]
        },
        {
          label: 'Bo‘sh natija ham qayta ishlanadi',
          steps: [{ do: 'type', selector: '#search', value: 'qwerty' }],
          then: [
            { label: 'Kartalar yo‘q' },
            { label: 'Hisoblagich nolni ko‘rsatadi', equals: 'Topildi: 0' }
          ]
        },
        { label: 'Filtrlash bitta funksiya bilan yozilgan' }
      ]
    },
    'final-project-5': {
      title: 'Challenge: saqlanadigan savat',
      description: 'Yakuniy qadam: «Savatga» tugmasi mahsulotni qo‘shadi (qayta bosish sonini oshiradi), `#cart` bloki pozitsiyalarni ko‘rsatadi, `#total` — `Jami: 2 485 000 so‘m` ko‘rinishidagi summani, savat tarkibi esa localStorage da `cart` kaliti ostida saqlanadi va yuklashda tiklanadi.',
      hints: [
        'Savatni { id, quantity } massivi sifatida saqlang — id bo‘yicha mahsulotni PRODUCTS dan doim topish mumkin.',
        '#grid da bitta ishlov beruvchi: event.target.closest(".buy") bosilgan tugmani beradi.',
        'Summani formatlash: String(total).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ").'
      ],
      starter: {
        html: STAGE3_HTML.replace('</main>', '  <aside class="cart">\n    <h2>Savat</h2>\n    <ul id="cart"></ul>\n    <p id="total">Jami: 0 so‘m</p>\n  </aside>\n</main>'),
        css: STAGE3_CSS + '\n.cart {\n  margin-top: 32px;\n  border-top: 1px solid #d7deee;\n  padding-top: 16px;\n}\n',
        js: STAGE4_JS
      },
      solution: {
        js: `${STAGE4_JS}
const cartList = document.querySelector("#cart");
const totalNode = document.querySelector("#total");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function money(value) {
  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " so‘m";
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

  totalNode.textContent = \`Jami: \${money(total)}\`;
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
      },
      checks: [
        {
          label: 'Mahsulot savatga qo‘shiladi',
          then: [
            { label: 'Savatda bitta pozitsiya' },
            { label: 'Pozitsiya to‘g‘ri nomlangan', contains: 'Kofemashina' }
          ]
        },
        {
          label: 'Yakun hisoblanadi',
          then: [{ label: 'Xonalari ajratilgan summa', equals: 'Jami: 2 400 000 so‘m' }]
        },
        {
          label: 'Qayta bosish sonini oshiradi',
          then: [
            { label: 'Pozitsiya hamon bitta' },
            { label: 'Undagi soni 2' },
            { label: 'Summa ikki barobar oshdi', equals: 'Jami: 4 800 000 so‘m' }
          ]
        },
        {
          label: 'Turli mahsulotlar qo‘shiladi',
          then: [
            { label: 'Savatda ikkita pozitsiya' },
            { label: 'Summa to‘g‘ri', equals: 'Jami: 2 485 000 so‘m' }
          ]
        },
        {
          label: 'Savat localStorage da saqlanadi',
          then: [{ label: 'Omborda savat bor' }]
        },
        {
          label: 'Sotuvda yo‘q mahsulot qo‘shilmaydi',
          then: [{ label: 'Savat bo‘sh qoldi' }]
        },
        { label: 'Delegatsiya yoki setkada bitta ishlov beruvchi ishlatilgan' },
        { label: 'Holat localStorage ga yoziladi' },
        { label: 'Holat yuklashda o‘qiladi' }
      ]
    }
  }
};

export const projectLessons = {
  'final-project': lesson34
};
