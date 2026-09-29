/*
 * Bosh sahifa (landing) matnlari: o‘zbek va rus tillarida.
 *
 * Raqamlar (darslar, topshiriqlar, tekshiruvlar, misollar) bu yerda yozilmaydi —
 * LandingView ularni kurs ma’lumotlaridan hisoblaydi, shuning uchun kurs
 * o‘zgarsa, sahifa ham o‘zi yangilanadi. Matndagi {lectures}, {practicals}
 * kabi joylar shu raqamlar bilan to‘ldiriladi.
 */
export const LANDING = {
  uz: {
    brand: 'Web tizimlari',
    brandBy: 'by NazarAI',
    skip: 'Asosiy mazmunga o‘tish',
    nav: {
      directions: 'Yo‘nalishlar',
      how: 'Qanday ishlaydi',
      program: 'Dastur',
      authors: 'Mualliflar',
      faq: 'Savollar',
      start: 'Kursni boshlash',
      present: 'Taqdimot',
      presentTitle: 'Taqdimot rejimi (P)',
      theme: 'Mavzuni almashtirish'
    },
    hero: {
      eyebrow: 'UBS Namangan · «Web tizimlari» fani · 5-semestr',
      titleA: 'Veb-dasturlashni',
      titleB: 'amalda',
      titleC: 'o‘rganing',
      lead: 'Auditoriya mashg‘ulotlari va mustaqil ta’lim — bitta platformada. Fan dasturi bo‘yicha {lectures} ta ma’ruza, {practicals} ta amaliy ish qo‘llanmasi va {tasks} ta avtomatik tekshiriladigan topshiriq. Yozgan kodingiz darhol brauzerda ishga tushadi.',
      primary: 'Kursni boshlash',
      secondary: 'Dastur bilan tanishish',
      chips: ['Ro‘yxatdan o‘tish shart emas', 'O‘zbek va rus tillarida', 'Hech narsa o‘rnatilmaydi'],
      mock: {
        file: 'style.css',
        preview: 'Natija',
        product: 'Kofe',
        price: '45 000 so‘m',
        task: 'Topshiriq 3 / 5',
        taskTitle: 'Kartaga soya va yumaloq burchak bering',
        checks: ['Kenglik 300px', 'border-radius: 12px', 'box-shadow berilgan'],
        passed: '{n} / 3 tekshiruv o‘tdi',
        done: 'Topshiriq bajarildi'
      }
    },
    stats: {
      lectures: 'ma’ruza matni',
      practicals: 'amaliy ish qo‘llanmasi',
      lessons: 'interaktiv dars',
      tasks: 'amaliy topshiriq',
      checks: 'avtomatik tekshiruv',
      examples: 'jonli kod misoli'
    },
    directions: {
      kicker: 'Ikki yo‘nalish',
      title: 'Darsda — tizimli bilim, uyda — mustahkam ko‘nikma',
      lead: 'Platforma fan dasturini to‘liq qamrab oladi: o‘qituvchi auditoriyada ma’ruza va amaliy mashg‘ulot o‘tadi, talaba esa mustaqil ta’limda har bir mavzuni o‘z qo‘li bilan mustahkamlaydi.',
      classes: {
        tag: 'Dars mashg‘ulotlari',
        title: '{lectures} ma’ruza + {practicals} amaliy ish',
        text: 'Fan dasturidagi har bir mavzu bo‘yicha to‘liq ma’ruza matni va amaliy ishni bajarish qo‘llanmasi.',
        points: [
          'Maqsad, reja, asosiy qism, xulosa, atamalar va nazorat savollari',
          'Qadamma-qadam bajarish tartibi, 8 ta variant va 5 ballik baholash mezoni',
          '«Sinab ko‘rish» tugmasi — {examples} ta misol bir bosishda ishga tushadi',
          'O‘quv API serveri va brauzerdagi SQL laboratoriyasi'
        ],
        cta: 'Ma’ruzalarni ochish'
      },
      study: {
        tag: 'Mustaqil ta’lim',
        title: '{lessons} dars · {tasks} topshiriq',
        text: 'HTML, CSS va JavaScript bo‘yicha interaktiv darslar: nazariya, jonli muharrir va avtomatik tekshiruv bir oynada.',
        points: [
          'Har darsda 5 ta topshiriq: takrorlash → o‘zgartirish → birlashtirish → mustaqil ish → challenge',
          '{checks} ta aniq mezon: DOM, stillar, hodisalar, LocalStorage, API javoblari',
          'Bosqichma-bosqich maslahatlar va namunaviy yechim',
          'Natijalar brauzerda saqlanadi — istalgan vaqtda davom ettirasiz'
        ],
        cta: 'Mustaqil ta’limni boshlash'
      }
    },
    how: {
      kicker: 'Qanday ishlaydi',
      title: 'O‘qing. Yozing. Tekshiring. Oldinga yuring.',
      lead: 'Har bir dars bitta ish joyida o‘tadi: chapda nazariya, o‘ngda kod va natija, pastda topshiriqlar.',
      steps: [
        ['Nazariyani o‘qing', 'Qisqa tushuntirish va darhol ishga tushadigan misollar.'],
        ['Kod yozing', 'HTML, CSS va JavaScript muharrirlari jonli preview va konsol bilan yonma-yon.'],
        ['Tekshiring', 'Topshiriq aniq mezonlar bo‘yicha tekshiriladi va nima mos kelmagani aytiladi.'],
        ['Oldinga yuring', 'Beshala topshiriq bajarilganda dars yakunlanadi. Natijalar saqlanadi.']
      ],
      features: [
        ['⌘', 'Jonli preview va konsol', '`console.log()`, ogohlantirishlar va xatolar — muharrirdagi qator raqami bilan.'],
        ['✓', 'Haqiqiy natija tekshiriladi', 'DOM, hisoblangan stillar, media-so‘rovlar, klikdan keyingi holat, LocalStorage va API javoblari.'],
        ['?', 'Maslahat va tayyor yechim', 'Qiyin joyda bosqichma-bosqich maslahatlar, oxirida esa namunaviy yechim.'],
        ['◇', 'Xavfsiz muhit', 'Kodingiz alohida, izolyatsiyalangan `iframe` ichida bajariladi.'],
        ['Aa', 'Ikki til', 'Interfeys, nazariya va topshiriqlar o‘zbek va rus tillarida — bitta tugma bilan.'],
        ['∅', 'Hisob kerak emas', 'Natijalar, kod va sozlamalar brauzerning o‘zida saqlanadi.']
      ]
    },
    program: {
      kicker: 'O‘quv dasturi',
      title: 'Fan dasturining har bir mavzusi — ichida',
      lead: 'Ma’ruza, amaliy ish yoki mustaqil ta’lim darsini tanlang — to‘g‘ridan-to‘g‘ri o‘sha sahifa ochiladi.',
      tabs: { lectures: 'Ma’ruzalar', practicals: 'Amaliy mashg‘ulotlar', study: 'Mustaqil ta’lim' },
      lessonsCount: '{n} dars',
      open: 'Ochish'
    },
    audience: {
      kicker: 'Kimlar uchun',
      title: 'Oldindan tayyorgarlik kerak emas',
      lead: 'Faqat qiziqish va kompyuter.',
      items: [
        ['🎓', 'Talabalar', '«Web tizimlari» va dasturlash fanlarini amaliyot bilan mustahkamlash uchun.'],
        ['🧑‍🏫', 'O‘qituvchilar', 'Tayyor ma’ruza matnlari, amaliy ish qo‘llanmalari, variantlar va baholash mezonlari.'],
        ['🎒', 'O‘quvchilar va abituriyentlar', 'IT sohasini tanlashdan oldin o‘zini sinab ko‘rmoqchi bo‘lganlar uchun.'],
        ['🔁', 'Kasbini o‘zgartirayotganlar', 'Noldan boshlab frontend dasturchilikka o‘tmoqchi bo‘lganlar uchun.']
      ]
    },
    authors: {
      kicker: 'Mualliflar',
      title: 'Namangan’da yaratilgan',
      lab: {
        role: 'Ishlab chiquvchi',
        name: 'NazarAI laboratoriyasi',
        text: 'Kurs NazarAI laboratoriyasi tomonidan IT ga qadam qo‘yayotgan yoshlar uchun yaratilgan. Laboratoriya University of Business and Science oliy ta’lim muassasasining Namangan filialida tashkil etilgan.',
        meta: 'University of Business and Science — Namangan filiali'
      },
      dev: {
        role: 'Dasturchi',
        name: 'Xurshidbek Xamrayev',
        text: 'Kurs platformasini — playground, avtomatik tekshiruv tizimi, o‘quv topshiriqlari, ma’ruza va amaliy mashg‘ulot materiallarini ishlab chiqqan.',
        meta: 'NazarAI laboratoriyasi'
      }
    },
    faq: {
      kicker: 'Savollar',
      title: 'Ko‘p beriladigan savollar',
      items: [
        ['Oldin dasturlashni bilmasam ham bo‘ladimi?', 'Ha. Kurs noldan boshlanadi: birinchi dars veb qanday ishlashini va sahifa nimalardan iborat ekanini tushuntiradi. Har bir keyingi dars oldingisiga tayanadi.'],
        ['Kompyuterga nimani o‘rnatish kerak?', 'Hech narsa. Zamonaviy brauzer (Chrome, Firefox, Edge yoki Safari) yetarli — kod muharriri, preview va tekshiruv sahifaning o‘zida ishlaydi. Server tomonidagi amaliy ishlar (Node.js, Git) uchun kerakli dasturlar qo‘llanmada ko‘rsatilgan.'],
        ['Dars mashg‘ulotlari va mustaqil ta’lim qanday bog‘langan?', 'Har bir ma’ruza va amaliy ish sahifasida shu mavzuga oid mustaqil ta’lim darslariga havola bor — va aksincha. Auditoriyada o‘tilgan mavzuni uyda avtomatik tekshiriladigan topshiriqlar bilan mustahkamlaysiz.'],
        ['Ro‘yxatdan o‘tish kerakmi?', 'Yo‘q. Natijalar va yozgan kodingiz shu brauzerda saqlanadi. Boshqa brauzer yoki qurilmada kurs boshidan ochiladi.'],
        ['Topshiriq qanday tekshiriladi?', 'Kodingiz brauzerdagi xavfsiz muhitda ishga tushadi, so‘ng natija — sahifa tuzilishi, stillar, tugma bosilgandan keyingi holat — aniq mezonlar bo‘yicha tekshiriladi. Mos kelmagan har bir mezon uchun sababi ko‘rsatiladi.'],
        ['Qiynalib qolsam-chi?', 'Har bir topshiriqda maslahatlar bor, ular birma-bir ochiladi. Oxirgi chora sifatida tayyor yechimni ko‘rib, uni tahlil qilish mumkin.']
      ]
    },
    cta: {
      title: 'Birinchi sahifangizni bugun yarating',
      text: 'Birinchi dars bir necha daqiqa oladi. Natijalaringiz saqlanadi — istalgan vaqtda davom ettirasiz.',
      primary: 'Kursni boshlash',
      secondary: 'Ma’ruzalarni ko‘rish'
    },
    footer: {
      org: 'University of Business and Science — Namangan filiali',
      dev: 'Dasturchi: Xurshidbek Xamrayev',
      rights: 'Barcha huquqlar himoyalangan.',
      course: 'Kurs',
      classes: 'Dars mashg‘ulotlari',
      study: 'Mustaqil ta’lim',
      sandbox: 'Playground'
    },
    present: {
      hint: '← → yoki Probel — slaydlar · F — to‘liq ekran · Esc — chiqish',
      exit: 'Taqdimotdan chiqish',
      fullscreen: 'To‘liq ekran (F)',
      prev: 'Oldingi slayd',
      next: 'Keyingi slayd'
    },
    slides: ['Kirish', 'Raqamlar', 'Yo‘nalishlar', 'Qanday ishlaydi', 'Dastur', 'Kimlar uchun', 'Mualliflar', 'Savollar', 'Boshlash']
  },

  ru: {
    brand: 'Веб-системы',
    brandBy: 'by NazarAI',
    skip: 'Перейти к основному содержанию',
    nav: {
      directions: 'Направления',
      how: 'Как это работает',
      program: 'Программа',
      authors: 'Авторы',
      faq: 'Вопросы',
      start: 'Начать курс',
      present: 'Презентация',
      presentTitle: 'Режим презентации (P)',
      theme: 'Сменить тему'
    },
    hero: {
      eyebrow: 'UBS Наманган · дисциплина «Веб-системы» · 5 семестр',
      titleA: 'Изучайте',
      titleB: 'веб-разработку',
      titleC: 'на практике',
      lead: 'Аудиторные занятия и самостоятельная работа — на одной платформе. {lectures} лекций по учебной программе, {practicals} руководств к практическим работам и {tasks} задач с автоматической проверкой. Ваш код сразу запускается в браузере.',
      primary: 'Начать курс',
      secondary: 'Посмотреть программу',
      chips: ['Без регистрации', 'На узбекском и русском', 'Ничего не нужно устанавливать'],
      mock: {
        file: 'style.css',
        preview: 'Результат',
        product: 'Кофе',
        price: '45 000 сум',
        task: 'Задача 3 / 5',
        taskTitle: 'Добавьте карточке тень и скругление',
        checks: ['Ширина 300px', 'border-radius: 12px', 'Задан box-shadow'],
        passed: 'Пройдено {n} из 3 проверок',
        done: 'Задача решена'
      }
    },
    stats: {
      lectures: 'текстов лекций',
      practicals: 'руководств к практикам',
      lessons: 'интерактивных уроков',
      tasks: 'практических задач',
      checks: 'автопроверок',
      examples: 'живых примеров кода'
    },
    directions: {
      kicker: 'Два направления',
      title: 'На занятии — системные знания, дома — уверенный навык',
      lead: 'Платформа полностью покрывает учебную программу: преподаватель ведёт лекции и практические занятия в аудитории, а студент закрепляет каждую тему своими руками в самостоятельной работе.',
      classes: {
        tag: 'Аудиторные занятия',
        title: '{lectures} лекций + {practicals} практических работ',
        text: 'Полный текст лекции и руководство к практической работе по каждой теме учебной программы.',
        points: [
          'Цель, план, основная часть, выводы, термины и контрольные вопросы',
          'Пошаговый порядок выполнения, 8 вариантов и критерии оценки на 5 баллов',
          'Кнопка «Sinab ko‘rish» — {examples} примеров запускаются одним нажатием',
          'Учебный API-сервер и SQL-лаборатория прямо в браузере'
        ],
        cta: 'Открыть лекции'
      },
      study: {
        tag: 'Самостоятельная работа',
        title: '{lessons} уроков · {tasks} задач',
        text: 'Интерактивные уроки по HTML, CSS и JavaScript: теория, живой редактор и автоматическая проверка в одном окне.',
        points: [
          '5 задач в каждом уроке: повторение → изменение → комбинация → самостоятельная работа → challenge',
          '{checks} чётких критериев: DOM, стили, события, LocalStorage, ответы API',
          'Пошаговые подсказки и эталонное решение',
          'Прогресс хранится в браузере — продолжайте в любой момент'
        ],
        cta: 'Начать самостоятельную работу'
      }
    },
    how: {
      kicker: 'Как это работает',
      title: 'Читайте. Пишите. Проверяйте. Двигайтесь дальше.',
      lead: 'Каждый урок проходит в одном рабочем месте: слева теория, справа код и результат, внизу задачи.',
      steps: [
        ['Прочитайте теорию', 'Короткое объяснение и примеры, которые можно сразу запустить.'],
        ['Напишите код', 'Редакторы HTML, CSS и JavaScript рядом с живым превью и консолью.'],
        ['Проверьте', 'Задача проверяется по чётким критериям — и вы видите, что именно не совпало.'],
        ['Двигайтесь дальше', 'Урок пройден, когда решены все пять задач. Прогресс сохраняется.']
      ],
      features: [
        ['⌘', 'Живое превью и консоль', '`console.log()`, предупреждения и ошибки — с номером строки в редакторе.'],
        ['✓', 'Проверяется настоящий результат', 'DOM, вычисленные стили, медиазапросы, состояние после клика, LocalStorage и ответы API.'],
        ['?', 'Подсказки и готовое решение', 'Пошаговые подсказки в трудном месте, а в конце — эталонное решение.'],
        ['◇', 'Безопасная среда', 'Ваш код выполняется в отдельном изолированном `iframe`.'],
        ['Aa', 'Два языка', 'Интерфейс, теория и задачи на узбекском и русском — одной кнопкой.'],
        ['∅', 'Без аккаунта', 'Прогресс, код и настройки хранятся прямо в браузере.']
      ]
    },
    program: {
      kicker: 'Учебная программа',
      title: 'Каждая тема учебной программы — внутри',
      lead: 'Выберите лекцию, практическую работу или урок самостоятельной работы — откроется сразу нужная страница.',
      tabs: { lectures: 'Лекции', practicals: 'Практические занятия', study: 'Самостоятельная работа' },
      lessonsCount: '{n} уроков',
      open: 'Открыть'
    },
    audience: {
      kicker: 'Для кого',
      title: 'Подготовка не нужна',
      lead: 'Только интерес и компьютер.',
      items: [
        ['🎓', 'Студенты', 'Чтобы закрепить «Веб-системы» и программирование на практике.'],
        ['🧑‍🏫', 'Преподаватели', 'Готовые тексты лекций, руководства к практикам, варианты и критерии оценки.'],
        ['🎒', 'Школьники и абитуриенты', 'Для тех, кто хочет попробовать себя, прежде чем выбрать IT.'],
        ['🔁', 'Те, кто меняет профессию', 'Для тех, кто хочет с нуля перейти во frontend-разработку.']
      ]
    },
    authors: {
      kicker: 'Авторы',
      title: 'Создано в Намангане',
      lab: {
        role: 'Разработчик',
        name: 'Лаборатория NazarAI',
        text: 'Курс создан лабораторией NazarAI для молодёжи, которая делает первые шаги в IT. Лаборатория основана в Наманганском филиале высшего учебного заведения University of Business and Science.',
        meta: 'University of Business and Science — Наманганский филиал'
      },
      dev: {
        role: 'Программист',
        name: 'Хуршидбек Хамраев',
        text: 'Разработал платформу курса — playground, систему автоматической проверки, учебные задачи, материалы лекций и практических занятий.',
        meta: 'Лаборатория NazarAI'
      }
    },
    faq: {
      kicker: 'Вопросы',
      title: 'Частые вопросы',
      items: [
        ['Можно ли начать без знаний программирования?', 'Да. Курс начинается с нуля: первый урок объясняет, как устроен веб и из чего состоит страница. Каждый следующий урок опирается на предыдущий.'],
        ['Что нужно установить на компьютер?', 'Ничего. Достаточно современного браузера (Chrome, Firefox, Edge или Safari) — редактор, превью и проверка работают прямо на странице. Для серверных практических работ (Node.js, Git) нужные программы перечислены в руководстве.'],
        ['Как связаны аудиторные занятия и самостоятельная работа?', 'На странице каждой лекции и практики есть ссылки на уроки самостоятельной работы по той же теме — и наоборот. Тему из аудитории вы закрепляете дома задачами с автоматической проверкой.'],
        ['Нужна ли регистрация?', 'Нет. Прогресс и ваш код сохраняются в этом браузере. В другом браузере или на другом устройстве курс откроется с начала.'],
        ['Как проверяются задачи?', 'Ваш код запускается в безопасной среде браузера, после чего результат — структура страницы, стили, состояние после клика — проверяется по чётким критериям. Для каждого несовпадения показывается причина.'],
        ['Что делать, если не получается?', 'В каждой задаче есть подсказки, они открываются по одной. В крайнем случае можно посмотреть готовое решение и разобрать его.']
      ]
    },
    cta: {
      title: 'Создайте свою первую страницу сегодня',
      text: 'Первый урок займёт несколько минут. Прогресс сохраняется — продолжайте в любой момент.',
      primary: 'Начать курс',
      secondary: 'Смотреть лекции'
    },
    footer: {
      org: 'University of Business and Science — Наманганский филиал',
      dev: 'Программист: Хуршидбек Хамраев',
      rights: 'Все права защищены.',
      course: 'Курс',
      classes: 'Аудиторные занятия',
      study: 'Самостоятельная работа',
      sandbox: 'Playground'
    },
    present: {
      hint: '← → или Пробел — слайды · F — полный экран · Esc — выход',
      exit: 'Выйти из презентации',
      fullscreen: 'Полный экран (F)',
      prev: 'Предыдущий слайд',
      next: 'Следующий слайд'
    },
    slides: ['Введение', 'Цифры', 'Направления', 'Как это работает', 'Программа', 'Для кого', 'Авторы', 'Вопросы', 'Начать']
  }
};
