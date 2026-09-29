/* A17. Versiya nazorati tizimi Git bilan ishlash. */
export default {
  id: 'a17',
  number: 17,
  title: 'Versiya nazorati tizimi Git bilan ishlash',
  summary: 'Repozitoriy, commit, tarmoqlar (branch), birlashtirish va konfliktlar, GitHub bilan ishlash va Pull Request orqali jamoaviy ishlash.',
  lectures: ['m17'],
  lessons: ['final-project'],
  goal: 'Git versiya nazorati tizimida veb-loyiha tarixini yuritish, tarmoqlar bilan parallel ishlash, konfliktlarni hal qilish hamda GitHub orqali masofaviy repozitoriy va Pull Request yordamida jamoaviy ishlash ko‘nikmalarini shakllantirish.',
  outcomes: [
    'Git ni sozlaydi, repozitoriy yaratadi va o‘zgarishlarni mazmunli commit larga ajratadi;',
    'ishchi katalog, indeks (staging) va repozitoriy holatlarini `git status`/`git diff` orqali farqlaydi;',
    'tarmoq yaratadi, birlashtiradi va birlashtirish konfliktini qo‘lda hal qiladi;',
    'GitHub ga `push`/`pull` qiladi, Pull Request ochadi va kod sharhini (review) o‘tkazadi;',
    'xatolarni `restore`, `revert`, `reset` bilan xavfsiz bekor qiladi.'
  ],
  tools: [
    'Git 2.40+ (https://git-scm.com) — tekshirish: `git --version`.',
    'GitHub akkaunti (https://github.com).',
    'VS Code (Source Control paneli) yoki terminal.'
  ],
  theory: [
    { lead: 'Git — **taqsimlangan** versiya nazorati tizimi: har bir ishtirokchida loyihaning to‘liq tarixi bor. Har bir commit — loyihaning ma’lum paytdagi «surati» (snapshot), muallif, vaqt va izoh bilan.' },
    { code: ' ishchi katalog          indeks (staging)           lokal repozitoriy          GitHub (origin)\n ─────────────  git add  ─────────────  git commit  ─────────────  git push  ───────────────\n  fayllarni       ───────▶   keyingi commit  ─────────▶  commitlar tarixi  ────────▶   masofaviy nusxa\n  tahrirlaysiz               tarkibi                     (.git papkasi)  ◀────────\n                                                                         git pull / fetch', lang: 'text' },
    { table: { head: ['Buyruq', 'Vazifasi'], rows: [
      ['`git init` / `git clone URL`', 'Yangi repozitoriy yaratish / mavjudini nusxalash'],
      ['`git status`, `git diff`', 'Nima o‘zgardi — eng ko‘p ishlatiladigan buyruqlar'],
      ['`git add fayl` / `git add -p`', 'O‘zgarishni indeksga qo‘shish (qismlab ham)'],
      ['`git commit -m "…"`', 'Suratni saqlash'],
      ['`git log --oneline --graph`', 'Tarix'],
      ['`git switch -c nom` / `git switch nom`', 'Tarmoq yaratish va o‘tish'],
      ['`git merge nom`', 'Tarmoqni joriy tarmoqqa birlashtirish'],
      ['`git push` / `git pull`', 'Masofaviy repozitoriyga yuborish / olish']
    ] } }
  ],
  steps: [
    {
      title: 'Git ni sozlash',
      blocks: [
        { code: 'git --version\n\ngit config --global user.name "Aziz Karimov"\ngit config --global user.email "aziz@mail.uz"      # GitHub dagi email bilan bir xil\ngit config --global init.defaultBranch main\ngit config --global core.editor "code --wait"      # izohlar VS Code da yoziladi\ngit config --global core.autocrlf input            # Windows da: true\n\ngit config --list --global', lang: 'bash' }
      ]
    },
    {
      title: 'Repozitoriy va birinchi commit',
      blocks: [
        'Oldingi amaliy ishlaridan birini (masalan, A2 dagi sahifa yoki A9 dagi server) oling yoki yangi papka yarating.',
        { code: 'mkdir portfolio && cd portfolio\ngit init\n\necho "# Portfolio" > README.md\ngit status                      # README.md — untracked (kuzatilmayapti)\ngit add README.md\ngit status                      # Changes to be committed\ngit commit -m "README qo‘shildi"\ngit log --oneline', lang: 'bash' },
        '`.gitignore` fayli Git kuzatmasligi kerak bo‘lgan fayllarni belgilaydi. Uni loyiha boshida yarating:',
        { code: 'node_modules/\ndist/\n.env\n*.log\n.DS_Store\nThumbs.db\n.vscode/', lang: 'text', title: '.gitignore' },
        { code: 'git add .gitignore\ngit commit -m "gitignore qo‘shildi"', lang: 'bash' },
        { warn: 'Parollar, API kalitlari va `.env` fayli **hech qachon** commit qilinmaydi. Tarixga tushgan maxfiy ma’lumot keyingi commitda o‘chirilsa ham tarixda qoladi — kalitni almashtirishga to‘g‘ri keladi.' }
      ]
    },
    {
      title: 'Kichik va mazmunli commitlar',
      blocks: [
        '`index.html` va `style.css` yarating, sahifaga bir nechta bo‘lim qo‘shing. Har bir mantiqiy o‘zgarishni alohida commit qiling:',
        { code: 'git diff                        # indeksga qo‘shilmagan o‘zgarishlar\ngit add index.html\ngit diff --staged               # commitga kiradigan o‘zgarishlar\ngit commit -m "Bosh sahifa tuzilmasi: header, main, footer"\n\ngit add style.css\ngit commit -m "Asosiy uslublar va ranglar palitrasi"\n\ngit log --oneline --stat', lang: 'bash' },
        { table: { head: ['Yomon izoh', 'Yaxshi izoh'], rows: [
          ['`update`', '`Navigatsiya menyusiga «Loyihalar» havolasi qo‘shildi`'],
          ['`fix`', '`Mobil ekranda rasm chetdan chiqib ketishi tuzatildi`'],
          ['`asdf`, `oxirgi versiya`', '`Aloqa formasiga email validatsiyasi qo‘shildi`']
        ] } },
        { tip: 'Bitta commit — bitta mantiqiy o‘zgarish. Izoh «bu commit nima qiladi?» savoliga javob beradi. Ko‘p jamoalar *Conventional Commits* uslubidan foydalanadi: `feat: …`, `fix: …`, `docs: …`.' }
      ]
    },
    {
      title: 'Tarmoqlar (branch) va birlashtirish',
      blocks: [
        'Yangi imkoniyat asosiy kodni buzmasligi uchun alohida tarmoqda yoziladi:',
        { code: 'git switch -c feature/contact-form     # yangi tarmoq yaratib, unga o‘tish\n# contact.html yaratib, formani yozing\ngit add contact.html\ngit commit -m "Aloqa sahifasi va forma"\n\ngit switch main                        # asosiy tarmoqqa qaytish — contact.html ko‘rinmaydi!\ngit merge feature/contact-form         # birlashtirish (fast-forward)\ngit branch -d feature/contact-form     # birlashtirilgan tarmoqni o‘chirish\n\ngit log --oneline --graph --all', lang: 'bash' }
      ]
    },
    {
      title: 'Birlashtirish konfliktini hal qilish',
      blocks: [
        'Konflikt ikki tarmoqda **bir faylning bir qatori** turlicha o‘zgartirilganda yuzaga keladi. Uni ataylab yaratamiz:',
        { code: 'git switch -c feature/blue-theme\n# style.css: body { background: #1e3a8a; }\ngit commit -am "Ko‘k mavzu"\n\ngit switch main\n# style.css: body { background: #065f46; }   (xuddi shu qator)\ngit commit -am "Yashil mavzu"\n\ngit merge feature/blue-theme\n# CONFLICT (content): Merge conflict in style.css', lang: 'bash' },
        'Fayl ichida Git ikkala variantni belgilab qo‘yadi:',
        { code: 'body {\n<<<<<<< HEAD\n  background: #065f46;\n=======\n  background: #1e3a8a;\n>>>>>>> feature/blue-theme\n}', lang: 'css', title: 'style.css' },
        { ol: [
          'Qaysi variant (yoki ikkalasining aralashmasi) kerakligini hal qiling.',
          '`<<<<<<<`, `=======`, `>>>>>>>` belgilarini o‘chiring.',
          '`git add style.css` — konflikt hal qilindi deb belgilash.',
          '`git commit` — birlashtirish commitini yakunlash.'
        ] },
        { tip: 'VS Code konfliktli faylda «Accept Current / Incoming / Both» tugmalarini ko‘rsatadi. Birlashtirishdan voz kechish: `git merge --abort`.' }
      ]
    },
    {
      title: 'GitHub bilan ishlash',
      blocks: [
        'GitHub da yangi **bo‘sh** repozitoriy yarating (README siz), keyin lokal loyihani ulang. Parol o‘rniga *Personal Access Token* yoki SSH kalit ishlatiladi.',
        { code: 'git remote add origin https://github.com/USERNAME/portfolio.git\ngit remote -v\ngit push -u origin main           # -u: keyingi safar shunchaki git push\n\n# SSH kalit bilan (bir marta sozlanadi)\nssh-keygen -t ed25519 -C "aziz@mail.uz"\ncat ~/.ssh/id_ed25519.pub         # GitHub → Settings → SSH keys ga qo‘shing\ngit remote set-url origin git@github.com:USERNAME/portfolio.git', lang: 'bash' },
        'Boshqa kompyuterda yoki GitHub saytida o‘zgarish qilinsa, uni olish:',
        { code: 'git pull                          # = git fetch + git merge\ngit pull --rebase                 # tarixni chiziqli saqlash uchun', lang: 'bash' },
        { tip: 'Statik sayt (A1, A2, A18) ni **GitHub Pages** orqali bepul joylash mumkin: Settings → Pages → Branch: `main`. Sayt `https://USERNAME.github.io/portfolio/` manzilida ochiladi.' }
      ]
    },
    {
      title: 'Jamoaviy ish: Pull Request',
      blocks: [
        'Ikki-uch kishilik jamoada ishlang. Bir kishi repozitoriy egasi bo‘lib, boshqalarni *Collaborator* sifatida qo‘shadi (Settings → Collaborators).',
        { ol: [
          'Har bir ishtirokchi `git clone` qiladi va o‘z vazifasi uchun tarmoq ochadi: `git switch -c feature/gallery`.',
          'Ishni commit qilib, tarmoqni yuboradi: `git push -u origin feature/gallery`.',
          'GitHub da **Compare & pull request** tugmasini bosib, PR ochadi: nima qilingani, skrinshot, qanday tekshirish.',
          'Jamoadoshi **Files changed** bo‘limida qatorlarga izoh qoldiradi va *Approve* yoki *Request changes* bosadi.',
          'Tuzatishlar o‘sha tarmoqqa push qilinadi — PR avtomatik yangilanadi.',
          'Tasdiqlangandan keyin **Merge pull request**, so‘ng hamma `git switch main && git pull`.'
        ] },
        { note: 'Main tarmog‘ini himoyalash: Settings → Branches → *Branch protection rule* → «Require a pull request before merging». Shunda hech kim `main` ga to‘g‘ridan-to‘g‘ri push qila olmaydi.' }
      ]
    },
    {
      title: 'Xatolarni bekor qilish',
      blocks: [
        { table: { head: ['Vaziyat', 'Buyruq'], rows: [
          ['Fayldagi commit qilinmagan o‘zgarishni bekor qilish', '`git restore fayl`'],
          ['Faylni indeksdan chiqarish (o‘zgarish qoladi)', '`git restore --staged fayl`'],
          ['Oxirgi commit izohini tuzatish (push qilinmagan)', '`git commit --amend -m "…"`'],
          ['Push qilingan commitni bekor qilish (tarix saqlanadi)', '`git revert <hash>`'],
          ['Oxirgi commitni bekor qilish, o‘zgarishlar qoladi', '`git reset --soft HEAD~1`'],
          ['Tugallanmagan ishni vaqtincha chetga olish', '`git stash` → `git stash pop`'],
          ['Eski versiyadagi faylni ko‘rish', '`git show <hash>:index.html`']
        ] } },
        { warn: '`git reset --hard` va `git push --force` o‘zgarishlarni qaytarib bo‘lmaydigan qilib o‘chiradi. Umumiy tarmoqlarda (`main`) ularni ishlatmang — o‘rniga `git revert`.' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Tarix bo‘yicha sayohat',
      level: 'easy',
      blocks: ['Repozitoriyda kamida 10 ta commit bo‘lsin. `git log`, `git show`, `git diff <hash1> <hash2>` va `git blame index.html` natijalarini hisobotga qo‘shing va har birini tushuntiring.']
    },
    {
      title: 'Tag va release',
      level: 'medium',
      blocks: ['Loyihaning ishlaydigan holatiga `v1.0.0` teg qo‘ying (`git tag -a v1.0.0 -m "…"`, `git push --tags`), GitHub da Release yarating va `CHANGELOG.md` yozing.']
    },
    {
      title: 'Variant: jamoaviy loyiha',
      level: 'hard',
      blocks: [
        '2–3 kishilik jamoada jurnal raqamingizga mos loyihani Git Flow uslubida yarating (har bir a’zodan kamida 5 ta commit va 2 ta PR, kamida bitta hal qilingan konflikt):',
        { ol: [
          'Shaxsiy portfolio sayti (GitHub Pages).',
          'Kafedra haqida ma’lumot sayti.',
          'Retseptlar to‘plami (HTML/CSS/JS).',
          'Talabalar ro‘yxati bilan Express API (A13 asosida).',
          'Kutubxona katalogi (Vue, A8 asosida).',
          'Tadbirlar taqvimi.',
          'Test-viktorina ilovasi.',
          'Kichik blog (A19 asosida).'
        ] }
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'GitHub repozitoriy havolasi.',
    '`git log --oneline --graph --all` natijasi skrinshoti.',
    'Konflikt va uning hal qilinishi skrinshotlari.',
    'Pull Request sahifasi (izohlar va tasdiqlash bilan) skrinshoti.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Git sozlangan, `.gitignore`, mazmunli izohli kichik commitlar', '1'],
    ['Tarmoqlar bilan ishlash va birlashtirish', '1'],
    ['Konflikt yaratilgan va to‘g‘ri hal qilingan', '1'],
    ['GitHub: push/pull, Pull Request va review', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Versiya nazorati tizimi nima uchun kerak? Markazlashgan va taqsimlangan tizimlar farqi?',
    'Ishchi katalog, indeks (staging area) va repozitoriy nima?',
    '`git fetch` va `git pull` farqi nimada?',
    'Birlashtirish konflikti qachon yuzaga keladi va qanday hal qilinadi?',
    '`git revert` va `git reset` farqini tushuntiring. Qaysi biri umumiy tarmoq uchun xavfsiz?',
    '`.gitignore` ga qanday fayllar yoziladi va nima uchun?',
    'Pull Request nima va u kod sifatiga qanday ta’sir qiladi?',
    'Fast-forward birlashtirish oddiy birlashtirishdan qanday farq qiladi?'
  ]
};
