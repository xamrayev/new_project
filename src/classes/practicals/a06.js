/* A6. Forma validatsiyasini JavaScriptda amalga oshirish. */
const formHtml = '<form id="register" novalidate>\n  <h2>Ro‘yxatdan o‘tish</h2>\n\n  <div class="field">\n    <label for="name">F.I.Sh.</label>\n    <input id="name" name="name" autocomplete="name">\n    <small class="error"></small>\n  </div>\n\n  <div class="field">\n    <label for="email">E-mail</label>\n    <input id="email" name="email" type="email" autocomplete="email">\n    <small class="error"></small>\n  </div>\n\n  <div class="field">\n    <label for="phone">Telefon</label>\n    <input id="phone" name="phone" placeholder="+998 90 123 45 67">\n    <small class="error"></small>\n  </div>\n\n  <div class="field">\n    <label for="password">Parol</label>\n    <input id="password" name="password" type="password" autocomplete="new-password">\n    <div class="meter"><span id="strength"></span></div>\n    <small class="error"></small>\n  </div>\n\n  <div class="field">\n    <label for="confirm">Parolni tasdiqlang</label>\n    <input id="confirm" name="confirm" type="password" autocomplete="new-password">\n    <small class="error"></small>\n  </div>\n\n  <div class="field">\n    <label><input type="checkbox" name="agree"> Foydalanish shartlariga roziman</label>\n    <small class="error"></small>\n  </div>\n\n  <button type="submit">Yuborish</button>\n  <p id="result"></p>\n</form>';

const formCss = 'body { font-family: system-ui, sans-serif; background: #f1f5f9; padding: 20px; }\nform { max-width: 380px; margin: 0 auto; background: #fff; padding: 20px 24px; border-radius: 14px; box-shadow: 0 4px 16px rgb(0 0 0 / .06); }\nh2 { margin-top: 0; }\n.field { margin-bottom: 12px; }\nlabel { display: block; font-size: 14px; margin-bottom: 4px; }\ninput:not([type="checkbox"]) { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font: inherit; }\ninput.invalid { border-color: #dc2626; background: #fef2f2; }\ninput.valid { border-color: #16a34a; }\n.error { color: #dc2626; font-size: 13px; min-height: 1em; display: block; }\n.meter { height: 6px; background: #e2e8f0; border-radius: 99px; margin-top: 6px; overflow: hidden; }\n.meter span { display: block; height: 100%; width: 0; transition: width .3s, background .3s; }\nbutton { width: 100%; padding: 10px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }\n#result { font-size: 14px; }';

const rulesJs = "const form = document.querySelector('#register');\n\n// Har bir maydon uchun tekshiruv: xato matnini yoki bo‘sh satr qaytaradi\nconst rules = {\n  name(value) {\n    if (!value.trim()) return 'Ismni kiriting';\n    if (value.trim().length < 3) return 'Kamida 3 ta belgi';\n    if (!/^[\\p{L}\\s’‘'-]+$/u.test(value)) return 'Faqat harflar va bo‘sh joy';\n    return '';\n  },\n  email(value) {\n    if (!value) return 'E-mail kiriting';\n    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(value)) return 'E-mail formati noto‘g‘ri';\n    return '';\n  },\n  phone(value) {\n    const digits = value.replace(/\\D/g, '');\n    if (!/^998\\d{9}$/.test(digits)) return 'Format: +998 XX XXX XX XX';\n    return '';\n  },\n  password(value) {\n    if (value.length < 8) return 'Kamida 8 ta belgi';\n    if (!/\\d/.test(value) || !/[A-Za-z]/.test(value)) return 'Harf va raqam bo‘lishi shart';\n    return '';\n  },\n  confirm(value) {\n    return value === form.password.value ? '' : 'Parollar mos emas';\n  },\n  agree(_, input) {\n    return input.checked ? '' : 'Shartlarga rozilik bering';\n  }\n};\n";

const showJs = "\nfunction showError(input, message) {\n  const error = input.closest('.field').querySelector('.error');\n  error.textContent = message;\n  input.classList.toggle('invalid', Boolean(message));\n  input.classList.toggle('valid', !message && input.type !== 'checkbox');\n  input.setAttribute('aria-invalid', String(Boolean(message)));\n}\n\nfunction validateField(input) {\n  const rule = rules[input.name];\n  if (!rule) return true;\n  const message = rule(input.value, input);\n  showError(input, message);\n  return !message;\n}\n";

const eventsJs = "\n// Maydondan chiqqanda tekshirish, xato bo‘lsa — yozish davomida qayta tekshirish\nform.addEventListener('focusout', (event) => {\n  if (event.target.name) validateField(event.target);\n});\nform.addEventListener('input', (event) => {\n  if (event.target.classList.contains('invalid')) validateField(event.target);\n  if (event.target.name === 'password' && form.confirm.value) validateField(form.confirm);\n});\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const inputs = [...form.elements].filter((el) => el.name);\n  const results = inputs.map(validateField);\n  const firstInvalid = inputs[results.indexOf(false)];\n\n  if (firstInvalid) {\n    firstInvalid.focus();\n    document.querySelector('#result').textContent = 'Xatolarni tuzating';\n    return;\n  }\n\n  const data = Object.fromEntries(new FormData(form));\n  delete data.password;\n  delete data.confirm;       // parollarni hech qayerda chiqarmaymiz\n  console.log('Serverga yuboriladi:', data);\n  document.querySelector('#result').textContent = '✓ Muvaffaqiyatli! Ma’lumotlar konsolda.';\n  form.reset();\n  inputs.forEach((el) => el.classList.remove('valid'));\n});\n";

const strengthJs = "\nconst bar = document.querySelector('#strength');\nconst LEVELS = [\n  { width: '10%', color: '#dc2626' },\n  { width: '35%', color: '#f97316' },\n  { width: '60%', color: '#eab308' },\n  { width: '80%', color: '#22c55e' },\n  { width: '100%', color: '#15803d' }\n];\n\nform.password.addEventListener('input', () => {\n  const value = form.password.value;\n  let score = 0;\n  if (value.length >= 8) score++;\n  if (value.length >= 12) score++;\n  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;\n  if (/\\d/.test(value)) score++;\n  if (/[^A-Za-z0-9]/.test(value)) score++;\n  const level = value ? LEVELS[Math.max(0, score - 1)] : { width: '0', color: 'transparent' };\n  bar.style.width = level.width;\n  bar.style.background = level.color;\n});\n";

export default {
  id: 'a6',
  number: 6,
  title: 'Forma validatsiyasini JavaScriptda amalga oshirish',
  summary: 'Ro‘yxatdan o‘tish formasini maydonma-maydon tekshiruv, xato xabarlari va parol kuchi indikatori bilan yaratamiz.',
  lectures: ['m6', 'm14'],
  lessons: ['html-forms', 'js-forms', 'js-events'],
  goal: 'HTML5 va JavaScript vositalaridan foydalanib, foydalanuvchi uchun qulay va ishonchli klient tomoni forma validatsiyasini amalga oshirish ko‘nikmasini shakllantirish.',
  outcomes: [
    'HTML5 ning o‘rnatilgan validatsiya atributlari va Constraint Validation API ni biladi;',
    'regular ifodalar bilan maydonlarni tekshiradi;',
    'xato xabarlarini maydon yonida tushunarli ko‘rsatadi;',
    '`submit` hodisasini to‘xtatib, `FormData` bilan ma’lumot yig‘adi;',
    'klient validatsiyasi nima uchun server validatsiyasining o‘rnini bosa olmasligini tushuntiradi.'
  ],
  tools: ['VS Code + Live Server yoki «Erkin playground».', 'Regular ifodalarni sinash uchun: regex101.com'],
  theory: [
    { h4: 'Validatsiyaning uch darajasi' },
    { ol: [
      '**HTML atributlari**: `required`, `type="email"`, `minlength`, `pattern` — tez, lekin xabarlarni boshqarish qiyin.',
      '**JavaScript**: to‘liq nazorat — o‘z qoidalar, xabarlar, dizayn, maydonlararo tekshiruv (parol va tasdiq).',
      '**Server**: yagona ishonchli tekshiruv. Klient kodini chetlab o‘tish mumkin (DevTools, curl), shuning uchun server har doim qayta tekshiradi.'
    ] },
    { table: { head: ['Regex', 'Ma’nosi'], rows: [
      ['`^` / `$`', 'Satr boshi / oxiri'],
      ['`\\d`, `\\s`, `\\w`', 'Raqam, bo‘sh joy, harf-raqam'],
      ['`[A-Za-z]`', 'Belgilar to‘plami'],
      ['`{9}`, `{2,}`, `+`, `*`', 'Takrorlanishlar soni'],
      ['`/…/u` va `\\p{L}`', 'Unicode rejimi: istalgan tildagi harf (o‘, g‘ ham)']
    ] } },
    { warn: 'Foydalanuvchi uchun qulay validatsiya: xatoni maydon yonida, aniq va yumshoq ohangda ko‘rsating; har bir belgida qizil xato bilan «qichqirmang» — birinchi tekshiruv maydondan chiqqanda bo‘lsin.' }
  ],
  steps: [
    {
      title: 'Forma belgilash va uslublar',
      blocks: [
        'Formaga `novalidate` atributi qo‘yiladi — brauzerning standart ogohlantirishlari o‘chadi va nazorat JavaScriptga o‘tadi. Har bir maydon ostida xato uchun bo‘sh `<small class="error">` joy bor.',
        { code: formHtml, lang: 'html', run: { html: formHtml, css: formCss } }
      ]
    },
    {
      title: 'Tekshiruv qoidalari',
      blocks: [
        'Har bir maydon nomi (`name`) bo‘yicha funksiya: xato bo‘lsa matn, bo‘lmasa bo‘sh satr qaytaradi. Qoidalarni bitta obyektda saqlash yangi maydon qo‘shishni osonlashtiradi.',
        { code: rulesJs, lang: 'js' },
        { tip: 'Telefon raqamidan avval barcha raqam bo‘lmagan belgilar olib tashlanadi — foydalanuvchi bo‘sh joy, qavs yoki defis bilan yozsa ham qabul qilinadi.' }
      ]
    },
    {
      title: 'Xatolarni ko‘rsatish',
      blocks: [
        '`showError` xato matnini maydon ostiga yozadi, maydonga `invalid`/`valid` klassini va ekran o‘quvchilar uchun `aria-invalid` atributini qo‘yadi.',
        { code: showJs, lang: 'js' }
      ]
    },
    {
      title: 'Hodisalarni ulash: focusout, input, submit',
      blocks: [
        'Delegatsiya yordamida barcha maydonlar uchun bitta tinglovchi: maydondan chiqqanda tekshiriladi, xato bo‘lsa — tuzatilayotganda jonli yangilanadi. `submit` da barcha maydonlar tekshiriladi va birinchi xatoli maydonga fokus beriladi.',
        { code: eventsJs, lang: 'js' },
        'Uch qadamni birga sinab ko‘ring — bo‘sh formani yuboring, keyin maydonlarni birin-ketin to‘ldiring:',
        { code: rulesJs + showJs + eventsJs, lang: 'js', title: 'app.js (to‘liq)', run: { html: formHtml, css: formCss, js: rulesJs + showJs + eventsJs } }
      ]
    },
    {
      title: 'Parol kuchi indikatori',
      blocks: [
        'Parol uzunligi va belgi turlariga qarab 0–5 ball hisoblang va rangli chiziq bilan ko‘rsating.',
        { code: strengthJs, lang: 'js', run: { html: formHtml, css: formCss, js: rulesJs + showJs + eventsJs + strengthJs } }
      ]
    },
    {
      title: 'Constraint Validation API bilan tanishish',
      blocks: [
        'Brauzerning o‘rnatilgan validatsiyasidan ham JavaScriptda foydalanish mumkin: `checkValidity()`, `validity` obyekti va `setCustomValidity()`.',
        { code: "const email = document.querySelector('#email2');\nconst button = document.querySelector('#check');\n\nbutton.addEventListener('click', () => {\n  console.log('checkValidity:', email.checkValidity());\n  console.log('validity:', {\n    valueMissing: email.validity.valueMissing,\n    typeMismatch: email.validity.typeMismatch,\n    tooShort: email.validity.tooShort\n  });\n  console.log('validationMessage:', email.validationMessage);\n  email.reportValidity();\n});\n\nemail.addEventListener('input', () => {\n  email.setCustomValidity(email.value.endsWith('@ubs.uz') ? '' : 'Faqat @ubs.uz manzili');\n});", lang: 'js', run: { html: '<input id="email2" type="email" required minlength="8" placeholder="ism@ubs.uz">\n<button id="check">Tekshirish</button>', css: 'body { font-family: sans-serif; padding: 20px; } input { padding: 6px; } input:invalid { border-color: crimson; }', js: "const email = document.querySelector('#email2');\nconst button = document.querySelector('#check');\n\nbutton.addEventListener('click', () => {\n  console.log('checkValidity:', email.checkValidity());\n  console.log('validity:', {\n    valueMissing: email.validity.valueMissing,\n    typeMismatch: email.validity.typeMismatch,\n    tooShort: email.validity.tooShort\n  });\n  console.log('validationMessage:', email.validationMessage);\n  email.reportValidity();\n});\n\nemail.addEventListener('input', () => {\n  email.setCustomValidity(email.value.endsWith('@ubs.uz') ? '' : 'Faqat @ubs.uz manzili');\n});" } }
      ]
    },
    {
      title: 'Klient validatsiyasini chetlab o‘tib ko‘rish',
      blocks: [
        'Klient tekshiruvi xavfsizlik vositasi emasligini o‘zingiz ko‘ring:',
        { ol: [
          'DevTools → Elements da formadagi `novalidate` ni yoki `required` ni o‘chiring.',
          'Console da `document.querySelector(\'#register\').submit()` ni chaqiring — `submit` hodisasi ishlamaydi, tekshiruvsiz yuboriladi.',
          'Yoki `fetch(\'/register\', { method: \'POST\', body: … })` bilan to‘g‘ridan-to‘g‘ri so‘rov yuboring.'
        ] },
        { warn: 'Xulosa: klient validatsiyasi — **qulaylik uchun**, server validatsiyasi — **xavfsizlik uchun**. Ikkalasi ham bo‘lishi shart (M14).' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Qo‘shimcha maydonlar',
      level: 'easy',
      blocks: ['Formaga «Tug‘ilgan sana» (16 yoshdan katta bo‘lishi shart) va «Guruh» (`select`, tanlanishi shart) maydonlarini qo‘shing va qoidalarini yozing.']
    },
    {
      title: 'Telefon maskasi',
      level: 'medium',
      blocks: ['Telefon maydonida foydalanuvchi yozayotganda raqamni avtomatik `+998 90 123 45 67` formatiga keltiring. Kursor holatini buzmaslikka harakat qiling.']
    },
    {
      title: 'Variant bo‘yicha forma',
      level: 'hard',
      blocks: [
        'Quyidagi formalardan birini to‘liq validatsiya bilan yarating (jurnaldagi raqam bo‘yicha):',
        { ol: [
          'Mehmonxona bron qilish (kelish sanasi < ketish sanasi, mehmonlar soni).',
          'Bank kartasi bilan to‘lov (Luhn algoritmi, amal qilish muddati, CVV).',
          'Ish uchun ariza (fayl turi va hajmini tekshirish).',
          'Ko‘p qadamli ro‘yxatdan o‘tish (har bir qadam alohida tekshiriladi).',
          'Aviachipta qidiruvi (shaharlar bir xil bo‘lmasin, sana o‘tmishda bo‘lmasin).',
          'Pasport ma’lumotlari (seriya `AA1234567` formati, JShShIR 14 raqam).',
          'Fikr-mulohaza formasi (so‘zlar soni, taqiqlangan so‘zlar filtri).',
          'Parolni o‘zgartirish (eski ≠ yangi, tasdiq mosligi, kuch indikatori).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Forma HTML va validatsiya JavaScript kodi.',
    'Xato holatlari va muvaffaqiyatli yuborish skrinshotlari.',
    'Klient validatsiyasini chetlab o‘tish tajribasi tavsifi.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Barcha maydonlar uchun to‘g‘ri qoidalar (regex bilan)', '1'],
    ['Xatolar maydon yonida, tushunarli va o‘z vaqtida ko‘rsatiladi', '1'],
    ['Submit to‘xtatiladi, birinchi xatoga fokus, FormData bilan yig‘ish', '1'],
    ['Accessibility (`label`, `aria-invalid`) va parol kuchi indikatori', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Forma validatsiyasining uch darajasini ayting.',
    '`novalidate` atributi nima qiladi?',
    '`input`, `change`, `blur`/`focusout` hodisalari validatsiyada qanday ishlatiladi?',
    '`event.preventDefault()` submit hodisasida nima uchun kerak?',
    '`FormData` obyektining afzalligi nimada?',
    '`/^998\\d{9}$/` regular ifodasini tushuntiring.',
    '`setCustomValidity()` qanday ishlaydi?',
    'Nima uchun klient validatsiyasi xavfsizlikni ta’minlamaydi?'
  ]
};
