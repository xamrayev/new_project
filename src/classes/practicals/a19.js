/* A19. Oddiy kontent boshqaruv tizimi (CMS) elementini yaratish. */

const helpersJs = `// 1) Sarlavhadan URL uchun «slug» yasash
function slugify(title) {
  const map = { 'o‘': 'o', 'g‘': 'g', 'ʼ': '', '’': '', '‘': '' };
  return title
    .toLowerCase()
    .replace(/o‘|g‘|ʼ|’|‘/g, (m) => map[m])
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')   // diakritik belgilarni olib tashlash
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

console.log(slugify('Veb tizimlari: kirish'));
console.log(slugify('O‘zbekistonda IT ta’limi — 2026'));
console.log(slugify('  JavaScript & DOM!!  '));

// 2) Xavfsiz «mini-markdown»: avval ekranlash, keyin formatlash
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function renderMarkdown(text) {
  return escapeHtml(text)
    .split(/\\n{2,}/)
    .map((block) => {
      if (block.startsWith('## ')) return '<h3>' + block.slice(3) + '</h3>';
      if (block.split('\\n').every((l) => l.startsWith('- '))) {
        return '<ul>' + block.split('\\n').map((l) => '<li>' + l.slice(2) + '</li>').join('') + '</ul>';
      }
      return '<p>' + block.replace(/\\n/g, '<br>') + '</p>';
    })
    .join('')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>');
}

console.log(renderMarkdown('## Reja\\n\\n- HTML\\n- **CSS**\\n\\nOddiy <script>alert(1)</script> matn.'));`;

const cmsHtml = `<div class="cms">
  <nav class="tabs">
    <button data-view="admin" class="active">⚙ Boshqaruv paneli</button>
    <button data-view="site">🌐 Sayt</button>
  </nav>

  <section id="admin">
    <form id="editor">
      <input type="hidden" name="postId">
      <label>Sarlavha <input name="title" required minlength="3"></label>
      <label>Slug (URL) <input name="slug" pattern="[a-z0-9-]+" required></label>
      <label>Kategoriya
        <select name="category">
          <option>Yangiliklar</option><option>E’lonlar</option><option>Maqolalar</option>
        </select>
      </label>
      <label>Matn (## sarlavha, - ro‘yxat, **qalin**)
        <textarea name="body" rows="6" required></textarea>
      </label>
      <label class="row"><input type="checkbox" name="published"> Chop etilgan</label>
      <div class="row">
        <button>Saqlash</button>
        <button type="reset" class="ghost">Yangi</button>
      </div>
    </form>
    <table>
      <thead><tr><th>Sarlavha</th><th>Holat</th><th>Yangilangan</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
  </section>

  <section id="site" hidden>
    <div id="posts"></div>
  </section>
</div>`;

const cmsCss = `body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
.cms { max-width: 760px; margin: 0 auto; padding: 12px; }
.tabs { display: flex; gap: 6px; margin-bottom: 12px; }
.tabs button { flex: 1; padding: 8px; border: 1px solid #cbd5e1; background: #fff; border-radius: 8px; cursor: pointer; }
.tabs .active { background: #2563eb; color: #fff; border-color: #2563eb; }
form { display: grid; gap: 8px; background: #fff; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; }
label { display: grid; gap: 4px; font-size: 13px; color: #475569; }
.row { display: flex; gap: 8px; align-items: center; }
input, select, textarea { font: inherit; padding: 7px 9px; border: 1px solid #cbd5e1; border-radius: 6px; }
input:invalid:not(:placeholder-shown) { border-color: #dc2626; }
button { padding: 7px 14px; border: 0; border-radius: 6px; background: #2563eb; color: #fff; cursor: pointer; }
button.ghost { background: #e2e8f0; color: #0f172a; }
button.danger { background: #fee2e2; color: #b91c1c; }
table { width: 100%; border-collapse: collapse; margin-top: 12px; background: #fff; font-size: 14px; }
th, td { padding: 7px; border-bottom: 1px solid #e2e8f0; text-align: left; }
.badge { font-size: 12px; padding: 2px 8px; border-radius: 99px; background: #fef3c7; color: #92400e; }
.badge.pub { background: #dcfce7; color: #166534; }
.post { background: #fff; padding: 14px 18px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 10px; }
.post h2 { margin: 0; }
.meta { color: #64748b; font-size: 13px; }`;

const cmsJs = `// ─── Ma’lumotlar qatlami (model) ──────────────────────────────────────────
const KEY = 'mini-cms:posts';
const posts = {
  all() { return JSON.parse(localStorage.getItem(KEY) || '[]'); },
  save(list) { localStorage.setItem(KEY, JSON.stringify(list)); },
  upsert(post) {
    const list = this.all();
    if (list.some((p) => p.slug === post.slug && p.id !== post.id)) throw new Error('Bu slug band: ' + post.slug);
    const at = list.findIndex((p) => p.id === post.id);
    const now = new Date().toISOString();
    if (at === -1) list.unshift({ ...post, id: Date.now(), createdAt: now, updatedAt: now });
    else list[at] = { ...list[at], ...post, updatedAt: now };
    this.save(list);
  },
  remove(id) { this.save(this.all().filter((p) => p.id !== id)); },
  published() { return this.all().filter((p) => p.published); }
};

// Birinchi ishga tushishda namunaviy yozuvlar
if (!localStorage.getItem(KEY)) {
  posts.upsert({ title: 'Kuzgi semestr boshlandi', slug: 'kuzgi-semestr', category: 'Yangiliklar', published: true,
    body: '## Dars jadvali\\n\\n- Ma’ruzalar: dushanba\\n- Amaliy: chorshanba\\n\\n**Omad!**' });
  posts.upsert({ title: 'Yakuniy nazorat (qoralama)', slug: 'yakuniy-nazorat', category: 'E’lonlar', published: false,
    body: 'Sana hali aniqlanmagan.' });
}

// ─── Yordamchi funksiyalar ───────────────────────────────────────────────
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const slugify = (t) => t.toLowerCase().replace(/o‘|g‘/g, (m) => m[0]).replace(/[’‘ʼ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const md = (t) => esc(t).split(/\\n{2,}/).map((b) =>
  b.startsWith('## ') ? '<h3>' + b.slice(3) + '</h3>' :
  b.split('\\n').every((l) => l.startsWith('- ')) ? '<ul>' + b.split('\\n').map((l) => '<li>' + l.slice(2) + '</li>').join('') + '</ul>' :
  '<p>' + b.replace(/\\n/g, '<br>') + '</p>').join('').replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
const date = (iso) => new Date(iso).toLocaleString('uz-UZ', { dateStyle: 'short', timeStyle: 'short' });

// ─── Boshqaruv paneli (controller + view) ────────────────────────────────
const form = document.querySelector('#editor');
const rows = document.querySelector('#rows');
const f = form.elements;   // maydonlar nomi bo‘yicha: f.title, f.slug …
let slugTouched = false;

f.title.addEventListener('input', () => { if (!slugTouched) f.slug.value = slugify(f.title.value); });
f.slug.addEventListener('input', () => { slugTouched = true; });
form.addEventListener('reset', () => { slugTouched = false; f.postId.value = ''; });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    posts.upsert({
      id: f.postId.value ? Number(f.postId.value) : undefined,
      title: f.title.value.trim(),
      slug: f.slug.value,
      category: f.category.value,
      body: f.body.value,
      published: f.published.checked
    });
    console.log('Saqlandi:', f.title.value);
    form.reset();
    renderAdmin();
  } catch (error) {
    console.warn(error.message);
    f.slug.focus();
  }
});

rows.addEventListener('click', (event) => {
  const id = Number(event.target.closest('tr')?.dataset.id);
  const post = posts.all().find((p) => p.id === id);
  if (!post) return;
  if (event.target.dataset.action === 'edit') {
    f.postId.value = post.id;
    ['title', 'slug', 'category', 'body'].forEach((k) => { f[k].value = post[k]; });
    f.published.checked = post.published;
    slugTouched = true;
  }
  if (event.target.dataset.action === 'delete' && confirm('«' + post.title + '» o‘chirilsinmi?')) {
    posts.remove(id);
    renderAdmin();
  }
});

function renderAdmin() {
  rows.innerHTML = posts.all().map((p) => \`
    <tr data-id="\${p.id}">
      <td>\${esc(p.title)}<br><small class="meta">/\${esc(p.slug)}</small></td>
      <td><span class="badge \${p.published ? 'pub' : ''}">\${p.published ? 'Chop etilgan' : 'Qoralama'}</span></td>
      <td class="meta">\${date(p.updatedAt)}</td>
      <td><button class="ghost" data-action="edit">✎</button> <button class="danger" data-action="delete">✕</button></td>
    </tr>\`).join('');
}

// ─── Ommaviy sayt ─────────────────────────────────────────────────────────
function renderSite() {
  const list = posts.published();
  document.querySelector('#posts').innerHTML = list.length ? list.map((p) => \`
    <article class="post">
      <p class="meta">\${esc(p.category)} · \${date(p.createdAt)}</p>
      <h2>\${esc(p.title)}</h2>
      \${md(p.body)}
    </article>\`).join('') : '<p class="meta">Hozircha chop etilgan yozuv yo‘q.</p>';
}

document.querySelector('.tabs').addEventListener('click', (event) => {
  const view = event.target.dataset.view;
  if (!view) return;
  document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('active', b === event.target));
  document.querySelector('#admin').hidden = view !== 'admin';
  document.querySelector('#site').hidden = view !== 'site';
  if (view === 'site') renderSite();
});

renderAdmin();
console.log('Yozuvlar:', posts.all().length, '| chop etilgan:', posts.published().length);`;

export default {
  id: 'a19',
  number: 19,
  title: 'Oddiy kontent boshqaruv tizimi (CMS) elementini yaratish',
  summary: 'Maqolalar moduli: boshqaruv paneli (yaratish, tahrirlash, o‘chirish, qoralama/chop etish), slug, xavfsiz formatlash va ommaviy sahifa — avval brauzerda, keyin Express + SQLite da.',
  lectures: ['m16', 'm11'],
  lessons: ['js-localstorage', 'js-forms', 'final-project'],
  goal: 'Kontent boshqaruv tizimining asosiy elementi — maqolalar (postlar) modulini yaratish: kontentni boshqaruv panelida kiritish va tahrirlash, holatlarni (qoralama/chop etilgan) boshqarish, uni ommaviy sahifada xavfsiz ko‘rsatish hamda ma’lumotlarni server va bazada saqlash.',
  outcomes: [
    'CMS ning tarkibiy qismlarini (kontent modeli, boshqaruv paneli, ommaviy qism, foydalanuvchilar va rollar) tushuntiradi;',
    'kontent modelini loyihalaydi va CRUD amallarini bajaradi;',
    'sarlavhadan slug yasaydi va URL ni noyob saqlaydi;',
    'foydalanuvchi matnini XSS xavfisiz formatlab chiqaradi;',
    'modulni Express, SQLite va shablonlar yordamida serverga ko‘chiradi;',
    'tayyor CMS (WordPress) da shu vazifa qanday hal qilinishini solishtiradi.'
  ],
  tools: [
    'Brauzer va «Sinab ko‘rish» playgroundi (1–3-qadamlar).',
    'Node.js 20+, paketlar: `express`, `better-sqlite3`, `ejs`, `express-session`.',
    '(ixtiyoriy) WordPress: XAMPP/Laragon yoki `wp-env` orqali lokal o‘rnatish.'
  ],
  theory: [
    { lead: '**CMS** (Content Management System) — dasturchi bo‘lmagan foydalanuvchiga sayt kontentini kod yozmasdan boshqarish imkonini beruvchi tizim. Masalan, WordPress, Joomla, Drupal, headless CMS lar (Strapi, Directus).' },
    { table: { head: ['Qism', 'Vazifasi', 'Bu ishda'], rows: [
      ['Kontent modeli', 'Qanday turdagi yozuvlar va qaysi maydonlar bor', '`posts`: sarlavha, slug, kategoriya, matn, holat, sanalar'],
      ['Boshqaruv paneli (admin)', 'Kontent yaratish, tahrirlash, nashr qilish', 'Forma + jadval'],
      ['Ommaviy qism (front)', 'Tashrif buyuruvchilar ko‘radigan sahifalar', 'Faqat chop etilgan yozuvlar'],
      ['Foydalanuvchilar va rollar', 'Kim nima qila oladi', '5-qadam: faqat kirgan muharrir'],
      ['Saqlash', 'Kontent qayerda turadi', 'localStorage → SQLite']
    ] } },
    { note: 'Ko‘p CMS larda yozuv **holatlar** bosqichidan o‘tadi: qoralama (draft) → ko‘rib chiqishda (review) → chop etilgan (published) → arxiv. Ommaviy sahifa faqat `published` yozuvlarni ko‘rsatadi.' }
  ],
  steps: [
    {
      title: 'Kontent modelini loyihalash',
      blocks: [
        'Kod yozishdan oldin yozuv qanday maydonlardan iboratligini jadval ko‘rinishida belgilang:',
        { table: { head: ['Maydon', 'Turi', 'Qoida'], rows: [
          ['`id`', 'butun son', 'avtomatik'],
          ['`title`', 'matn', 'majburiy, 3–120 belgi'],
          ['`slug`', 'matn', 'majburiy, noyob, `a-z0-9-`'],
          ['`category`', 'matn', 'ro‘yxatdan tanlanadi'],
          ['`body`', 'matn', 'mini-markdown formatida'],
          ['`published`', 'mantiqiy', 'standart — `false` (qoralama)'],
          ['`createdAt`, `updatedAt`', 'sana-vaqt', 'avtomatik']
        ] } }
      ]
    },
    {
      title: 'Slug va xavfsiz formatlash',
      blocks: [
        '**Slug** — yozuvning URL dagi o‘qiladigan nomi: `/posts/kuzgi-semestr`. Muharrir matnini esa HTML ga aylantirishdan **oldin** ekranlaymiz — aks holda boshqaruv paneliga kirgan har kim saytga skript joylay oladi (A15).',
        { code: helpersJs, lang: 'js', run: true },
        { warn: 'Tartib muhim: avval `escapeHtml`, keyin formatlash. Teskari tartibda `<script>` teglari saqlanib qoladi.' }
      ]
    },
    {
      title: 'Brauzerdagi mini-CMS',
      blocks: [
        'Butun modul — boshqaruv paneli va ommaviy sayt — bitta sahifada. Ma’lumotlar `localStorage` da saqlanadi. Ishga tushiring va quyidagilarni sinab ko‘ring: yangi yozuv qo‘shish (slug o‘zi yasaladi), tahrirlash, qoralamani chop etish, band slug bilan saqlashga urinish, «Sayt» yorlig‘ida faqat chop etilganlar ko‘rinishi.',
        { code: cmsJs, lang: 'js', title: 'cms.js', run: { html: cmsHtml, css: cmsCss, js: cmsJs } },
        'Kod uch qatlamga ajratilganiga e’tibor bering: **model** (`posts` obyekti — saqlash va qoidalar), **boshqaruv paneli** va **ommaviy ko‘rinish**. Keyingi qadamda faqat model almashtiriladi — `localStorage` o‘rniga server API.'
      ]
    },
    {
      title: 'Serverga ko‘chirish: Express + SQLite',
      blocks: [
        { code: 'mkdir mini-cms && cd mini-cms\nnpm init -y && npm pkg set type=module\nnpm install express better-sqlite3 ejs express-session bcryptjs', lang: 'bash' },
        { code: "// db.js\nimport Database from 'better-sqlite3';\nexport const db = new Database('cms.sqlite');\n\ndb.exec(`\n  CREATE TABLE IF NOT EXISTS posts (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    title TEXT NOT NULL CHECK (length(title) BETWEEN 3 AND 120),\n    slug TEXT NOT NULL UNIQUE,\n    category TEXT NOT NULL DEFAULT 'Yangiliklar',\n    body TEXT NOT NULL,\n    published INTEGER NOT NULL DEFAULT 0,\n    author_id INTEGER,\n    created_at TEXT NOT NULL DEFAULT (datetime('now')),\n    updated_at TEXT NOT NULL DEFAULT (datetime('now'))\n  );\n`);\n\nexport const Posts = {\n  published: () => db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all(),\n  all: () => db.prepare('SELECT * FROM posts ORDER BY updated_at DESC').all(),\n  bySlug: (slug) => db.prepare('SELECT * FROM posts WHERE slug = ? AND published = 1').get(slug),\n  byId: (id) => db.prepare('SELECT * FROM posts WHERE id = ?').get(id),\n  create: (p) => db.prepare(`INSERT INTO posts (title, slug, category, body, published, author_id)\n                              VALUES (@title, @slug, @category, @body, @published, @author_id)`).run(p),\n  update: (id, p) => db.prepare(`UPDATE posts SET title=@title, slug=@slug, category=@category, body=@body,\n                                  published=@published, updated_at=datetime('now') WHERE id=@id`).run({ ...p, id }),\n  remove: (id) => db.prepare('DELETE FROM posts WHERE id = ?').run(id)\n};", lang: 'js', title: 'db.js' },
        { code: "// server.js\nimport express from 'express';\nimport session from 'express-session';\nimport { Posts } from './db.js';\nimport { renderMarkdown, slugify } from './lib/format.js';   // 2-qadamdagi funksiyalar\n\nconst app = express();\napp.set('view engine', 'ejs');\napp.use(express.urlencoded({ extended: false }));\napp.use(session({ secret: process.env.SESSION_SECRET || 'dars', resave: false, saveUninitialized: false,\n                  cookie: { httpOnly: true, sameSite: 'lax' } }));\n\n// ── Ommaviy qism\napp.get('/', (req, res) => res.render('index', { posts: Posts.published() }));\napp.get('/posts/:slug', (req, res) => {\n  const post = Posts.bySlug(req.params.slug);\n  if (!post) return res.status(404).render('404');\n  res.render('post', { post, html: renderMarkdown(post.body) });\n});\n\n// ── Boshqaruv paneli (A16 dagi login bilan himoyalangan)\nconst requireEditor = (req, res, next) => (req.session.user ? next() : res.redirect('/login'));\n\napp.get('/admin', requireEditor, (req, res) => res.render('admin/list', { posts: Posts.all() }));\napp.get('/admin/new', requireEditor, (req, res) => res.render('admin/form', { post: {}, error: null }));\n\napp.post('/admin/posts', requireEditor, (req, res) => {\n  const post = {\n    title: req.body.title?.trim(),\n    slug: req.body.slug || slugify(req.body.title || ''),\n    category: req.body.category,\n    body: req.body.body,\n    published: req.body.published ? 1 : 0,\n    author_id: req.session.user.id\n  };\n  try {\n    Posts.create(post);\n    res.redirect('/admin');\n  } catch (error) {\n    const message = error.code === 'SQLITE_CONSTRAINT_UNIQUE' ? 'Bu slug band' : 'Maydonlarni tekshiring';\n    res.status(422).render('admin/form', { post, error: message });\n  }\n});\n\napp.post('/admin/posts/:id/delete', requireEditor, (req, res) => {\n  Posts.remove(Number(req.params.id));\n  res.redirect('/admin');\n});\n\napp.listen(3000, () => console.log('Sayt: http://localhost:3000  Admin: http://localhost:3000/admin'));", lang: 'js', title: 'server.js' },
        { code: '<%# views/post.ejs %>\n<!doctype html>\n<html lang="uz">\n<head><meta charset="utf-8"><title><%= post.title %></title></head>\n<body>\n  <a href="/">← Barcha yozuvlar</a>\n  <article>\n    <p><%= post.category %> · <%= post.created_at %></p>\n    <h1><%= post.title %></h1>      <%# <%= %> — avtomatik ekranlaydi %>\n    <%- html %>                    <%# <%- %> — ekranlamaydi: faqat tozalangan HTML uchun! %>\n  </article>\n</body>\n</html>', lang: 'html', title: 'views/post.ejs' },
        { tip: 'Ommaviy sahifa uchun `sitemap.xml` va har bir yozuvga `<meta name="description">` generatsiya qilish — CMS ning SEO dagi asosiy afzalliklaridan biri.' }
      ]
    },
    {
      title: 'Rollar va nashr jarayoni',
      blocks: [
        'Haqiqiy CMS da har kim ham chop eta olmaydi. Ikki rol qo‘shing:',
        { table: { head: ['Amal', '`author` (muallif)', '`editor` (muharrir)'], rows: [
          ['Qoralama yaratish', 'ha', 'ha'],
          ['O‘z yozuvini tahrirlash', 'ha', 'ha'],
          ['Boshqaning yozuvini tahrirlash', 'yo‘q', 'ha'],
          ['Chop etish / nashrdan olish', 'yo‘q', 'ha'],
          ['O‘chirish', 'yo‘q', 'ha']
        ] } },
        { code: "function canEdit(user, post) {\n  return user.role === 'editor' || post.author_id === user.id;\n}\n\napp.post('/admin/posts/:id', requireEditor, (req, res) => {\n  const post = Posts.byId(Number(req.params.id));\n  if (!post) return res.status(404).send('Topilmadi');\n  if (!canEdit(req.session.user, post)) return res.status(403).send('Ruxsat yo‘q');\n  // Muallif «chop etish» belgisini yuborsa ham, e’tiborga olinmaydi\n  const published = req.session.user.role === 'editor' ? (req.body.published ? 1 : 0) : post.published;\n  Posts.update(post.id, { ...req.body, published, author_id: post.author_id });\n  res.redirect('/admin');\n});", lang: 'js' }
      ]
    },
    {
      title: 'Tayyor CMS bilan solishtirish: WordPress',
      blocks: [
        'WordPress da siz yozgan hamma narsa tayyor: `wp_posts` jadvali, `post_status` (`draft`, `publish`), `post_name` (slug), rollar (Author, Editor, Administrator). Uni kengaytirish uchun **plagin** yoziladi. Masalan, qisqa kod (shortcode) — kontent ichida `[latest_posts count="3"]` deb yozilsa, oxirgi yozuvlar ro‘yxati chiqadi:',
        { code: "<?php\n/*\n * Plugin Name: UBS Latest Posts\n * Description: [latest_posts count=\"3\"] — oxirgi yozuvlar ro‘yxati.\n */\n\nadd_shortcode('latest_posts', function ($atts) {\n    $atts = shortcode_atts(['count' => 5], $atts);\n    $query = new WP_Query([\n        'post_type'      => 'post',\n        'post_status'    => 'publish',\n        'posts_per_page' => (int) $atts['count'],\n    ]);\n\n    $html = '<ul class=\"latest-posts\">';\n    while ($query->have_posts()) {\n        $query->the_post();\n        $html .= sprintf('<li><a href=\"%s\">%s</a></li>',\n            esc_url(get_permalink()), esc_html(get_the_title()));   // ekranlash!\n    }\n    wp_reset_postdata();\n    return $html . '</ul>';\n});", lang: 'php', title: 'wp-content/plugins/ubs-latest-posts/ubs-latest-posts.php' },
        'Plaginni **Plaginlar** bo‘limida faollashtiring va istalgan sahifaga `[latest_posts count="3"]` yozing.'
      ]
    }
  ],
  tasks: [
    {
      title: 'Qidiruv va kategoriya filtri',
      level: 'easy',
      blocks: ['Brauzerdagi mini-CMS ning «Sayt» qismiga sarlavha va matn bo‘yicha qidiruv maydoni hamda kategoriya tugmalarini qo‘shing.']
    },
    {
      title: 'Rejalashtirilgan nashr',
      level: 'medium',
      blocks: ['Yozuvga `publish_at` (sana-vaqt) maydonini qo‘shing: `published = 1` bo‘lsa ham, ommaviy sahifada faqat `publish_at <= now` bo‘lgan yozuvlar ko‘rinsin. Boshqaruv panelida «Rejalashtirilgan» holati ko‘rsatilsin.']
    },
    {
      title: 'Variant: CMS moduli',
      level: 'hard',
      blocks: [
        'Jurnal raqamingiz bo‘yicha CMS modulini (boshqaruv paneli + ommaviy sahifa + server/baza) yarating:',
        { ol: [
          'Sahifalar moduli: ierarxiya (ota-sahifa), menyu avtomatik tuziladi.',
          'Foto galereya: albomlar, rasm yuklash, tartibni o‘zgartirish.',
          'Izohlar: tashrif buyuruvchi yozadi, muharrir tasdiqlaydi (moderatsiya).',
          'Tadbirlar taqvimi: sana, joy, o‘tgan/kelgusi tadbirlar.',
          'FAQ moduli: savol-javoblar, kategoriyalar, qidiruv.',
          'Xodimlar katalogi: kafedra, lavozim, rasm, bog‘lanish.',
          'Menyu tahrirlovchisi: bandlarni qo‘shish, tartibini o‘zgartirish, ichki bandlar.',
          'Yozuvlar versiyalari: har saqlashda tarix, eski versiyani tiklash.'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Kontent modeli jadvali va baza sxemasi (`CREATE TABLE`).',
    'Boshqaruv paneli va ommaviy sahifa skrinshotlari.',
    'Asosiy kod: model, marshrutlar, shablonlar.',
    'O‘zingiz yozgan CMS va WordPress ni solishtirish (3–5 jumla).',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Kontent modeli va CRUD (yaratish, tahrirlash, o‘chirish) ishlaydi', '1'],
    ['Slug noyob, qoralama/chop etilgan holatlari, ommaviy sahifa', '1'],
    ['Matn xavfsiz formatlanadi (XSS yo‘q), validatsiya', '1'],
    ['Server + baza, himoyalangan boshqaruv paneli va rollar', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'CMS nima va u qanday muammoni hal qiladi? Uch misol keltiring.',
    'CMS ning asosiy tarkibiy qismlarini sanab bering.',
    'Slug nima va nima uchun u noyob bo‘lishi kerak?',
    'Muharrir kiritgan matnni HTML ga aylantirishda qanday xavf bor va undan qanday himoyalanamiz?',
    'Qoralama va chop etilgan holatlari qanday amalga oshiriladi?',
    'An’anaviy (WordPress) va headless CMS farqi nimada?',
    'WordPress da plagin va mavzu (theme) nima? Shortcode qanday ishlaydi?',
    'EJS da `<%= %>` va `<%- %>` farqi nimada?'
  ]
};
