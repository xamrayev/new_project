/*
 * Module 3 — JavaScript (lessons 19–33).
 *
 * Checks here mostly observe behaviour: console output, the DOM after a click,
 * what landed in localStorage, what the mock API returned.
 */

const lesson19 = {
  id: 'js-intro',
  title: 'Введение в JavaScript',
  summary: 'Первый скрипт, console.log и вывод результатов.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'HTML — структура, CSS — вид, JavaScript — поведение. Это полноценный язык программирования, который исполняется прямо в браузере.' },
    { h: 'Куда пишут код' },
    { code: '<script src="app.js"></script>   <!-- внешний файл, так и делают -->\n<script>console.log("привет")</script>  <!-- прямо в HTML -->' },
    { p: 'Вкладка **JS** в playground — это подключённый файл `app.js`. Он выполняется после того, как разметка загружена.' },
    { h: 'Вывод' },
    { code: 'console.log("Привет, мир!");   // в консоль разработчика\nalert("Внимание!");            // модальное окно' },
    { p: 'Консоль открывается кнопкой **Консоль** под превью. Вызовы `alert()` тоже попадают туда — так они не блокируют проверку.' },
    { h: 'Синтаксис' },
    { code: 'let count = 3;        // объявление переменной\ncount = count + 1;    // изменение\nconsole.log(count);   // 4\n\n// однострочный комментарий\n/* многострочный\n   комментарий */' },
    { note: 'Точку с запятой в конце инструкции можно опускать, но привычка ставить её экономит время на странных ошибках.' }
  ],
  starter: { html: '<h1>JavaScript</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-intro-1',
      title: 'Первая строка кода',
      difficulty: 'easy',
      description: 'Выведите в консоль текст `Привет, мир!`',
      checks: [
        { label: 'В консоли есть «Привет, мир!»', kind: 'console', contains: 'Привет, мир!' },
        { label: 'Использован console.log', kind: 'source', lang: 'js', contains: 'console.log' },
        { label: 'Ошибок нет', kind: 'noError' }
      ],
      hints: ['console.log("Привет, мир!");'],
      solution: { js: 'console.log("Привет, мир!");' }
    },
    {
      id: 'js-intro-2',
      title: 'Модальное окно',
      difficulty: 'easy',
      description: 'Покажите пользователю `alert` с текстом `Добро пожаловать`.',
      checks: [
        { label: 'Вызван alert()', kind: 'alert', contains: 'Добро пожаловать' },
        { label: 'Ошибок нет', kind: 'noError' }
      ],
      hints: ['alert("Добро пожаловать");'],
      solution: { js: 'alert("Добро пожаловать");' }
    },
    {
      id: 'js-intro-3',
      title: 'Несколько значений',
      difficulty: 'medium',
      description: 'Одним вызовом `console.log` выведите три значения: строку `Сумма:`, число `2` и число `3`.',
      checks: [
        { label: 'В консоли есть «Сумма:»', kind: 'console', contains: 'Сумма:' },
        { label: 'Выведены числа 2 и 3', kind: 'console', matches: 'Сумма:\\s*2\\s*3' },
        { label: 'Вызов console.log ровно один', kind: 'custom', fn: "const calls = (ctx.source.js.match(/console\\.log/g) || []).length; return calls === 1 || 'Вызовов console.log: ' + calls;" }
      ],
      hints: ['Аргументы перечисляются через запятую: console.log("Сумма:", 2, 3);'],
      solution: { js: 'console.log("Сумма:", 2, 3);' }
    },
    {
      id: 'js-intro-4',
      title: 'Первое вычисление',
      difficulty: 'medium',
      description: 'Вычислите `7 * 6` и выведите результат в консоль. Само число `42` писать нельзя — пусть считает JavaScript.',
      checks: [
        { label: 'В консоли есть 42', kind: 'console', contains: '42' },
        { label: 'В коде есть умножение', kind: 'source', lang: 'js', matches: '7\\s*\\*\\s*6|6\\s*\\*\\s*7' },
        { label: 'Число 42 не вписано вручную', kind: 'source', lang: 'js', notContains: '42' }
      ],
      hints: ['console.log(7 * 6);'],
      solution: { js: 'console.log(7 * 6);' }
    },
    {
      id: 'js-intro-5',
      title: 'Challenge: мини-отчёт',
      difficulty: 'hard',
      description: 'Выведите в консоль три строки: заголовок `Отчёт`, результат вычисления `120 / 4` и предупреждение через `console.warn`. Добавьте в код комментарий.',
      checks: [
        { label: 'Есть строка «Отчёт»', kind: 'console', contains: 'Отчёт' },
        { label: 'Выведен результат деления (30)', kind: 'console', contains: '30' },
        { label: 'Деление выполняет код', kind: 'source', lang: 'js', matches: '120\\s*/\\s*4' },
        { label: 'Использован console.warn', kind: 'source', lang: 'js', contains: 'console.warn' },
        { label: 'В коде есть комментарий', kind: 'source', lang: 'js', matches: '//|/\\*' },
        { label: 'Ошибок нет', kind: 'noError' }
      ],
      hints: ['console.warn выводит жёлтое предупреждение — оно тоже попадёт в консоль playground.'],
      solution: {
        js: '// небольшой отчёт\nconsole.log("Отчёт");\nconsole.log(120 / 4);\nconsole.warn("Данные за прошлый месяц");'
      }
    }
  ]
};

const lesson20 = {
  id: 'js-variables',
  title: 'Переменные и типы',
  summary: 'let, const, строки, числа, логические значения и шаблонные строки.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Переменная — это имя для значения. Через неё код становится читаемым и переиспользуемым.' },
    { code: 'let age = 25;        // значение можно менять\nconst name = "Алиса"; // менять нельзя\nage = 26;             // ок\n// name = "Боб";      // ошибка!' },
    { note: 'Правило простое: по умолчанию `const`. Меняете значение — тогда `let`. Старое `var` в новом коде не используют.' },
    { h: 'Типы данных' },
    { table: { head: ['Тип', 'Пример', 'typeof'], rows: [
      ['строка', '`"привет"`, `\'текст\'`', '`"string"`'],
      ['число', '`42`, `3.14`', '`"number"`'],
      ['логический', '`true`, `false`', '`"boolean"`'],
      ['ничего', '`null`', '`"object"` (историческая ошибка)'],
      ['не задано', '`undefined`', '`"undefined"`'],
      ['массив / объект', '`[1, 2]`, `{ a: 1 }`', '`"object"`']
    ] } },
    { h: 'Шаблонные строки' },
    { code: 'const name = "Алиса";\nconst age = 25;\nconsole.log(`${name}, ${age} лет`);   // Алиса, 25 лет\nconsole.log(`Через год: ${age + 1}`); // выражение внутри ${}' },
    { warn: 'Шаблонные строки пишутся в обратных кавычках `` ` ``, а не в обычных.' }
  ],
  starter: { html: '<h1>Переменные</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-variables-1',
      title: 'let и const',
      difficulty: 'easy',
      description: 'Создайте константу `city` со значением `Ташкент` и переменную `temperature` со значением `28`. Выведите обе в консоль.',
      checks: [
        { label: 'Объявлена const city', kind: 'source', lang: 'js', matches: 'const\\s+city\\s*=' },
        { label: 'Объявлена let temperature', kind: 'source', lang: 'js', matches: 'let\\s+temperature\\s*=' },
        { label: 'В консоли есть «Ташкент»', kind: 'console', contains: 'Ташкент' },
        { label: 'В консоли есть 28', kind: 'console', contains: '28' },
        { label: 'Ошибок нет', kind: 'noError' }
      ],
      hints: ['const city = "Ташкент";'],
      solution: { js: 'const city = "Ташкент";\nlet temperature = 28;\n\nconsole.log(city);\nconsole.log(temperature);' }
    },
    {
      id: 'js-variables-2',
      title: 'Шаблонная строка',
      difficulty: 'easy',
      description: 'Выведите одну строку вида `В городе Ташкент сейчас 28 градусов`, собрав её из переменных через шаблонную строку.',
      starter: { js: 'const city = "Ташкент";\nlet temperature = 28;\n' },
      checks: [
        { label: 'Строка собрана правильно', kind: 'console', contains: 'В городе Ташкент сейчас 28 градусов' },
        { label: 'Использованы обратные кавычки', kind: 'source', lang: 'js', contains: '`' },
        { label: 'Использована подстановка ${}', kind: 'source', lang: 'js', matches: '\\$\\{' }
      ],
      hints: ['console.log(`В городе ${city} сейчас ${temperature} градусов`);'],
      solution: {
        js: 'const city = "Ташкент";\nlet temperature = 28;\n\nconsole.log(`В городе ${city} сейчас ${temperature} градусов`);'
      }
    },
    {
      id: 'js-variables-3',
      title: 'Типы значений',
      difficulty: 'medium',
      description: 'Создайте четыре переменные разных типов: строку, число, логическое значение и `null`. Для каждой выведите её тип через `typeof`.',
      checks: [
        { label: 'Использован typeof', kind: 'source', lang: 'js', contains: 'typeof' },
        { label: 'В консоли есть string', kind: 'console', contains: 'string' },
        { label: 'В консоли есть number', kind: 'console', contains: 'number' },
        { label: 'В консоли есть boolean', kind: 'console', contains: 'boolean' },
        { label: 'В консоли есть object (это typeof null)', kind: 'console', contains: 'object' },
        { label: 'Объявлено минимум 4 переменные', kind: 'custom', fn: "const count = (ctx.source.js.match(/\\b(let|const)\\s+[A-Za-z_$]/g) || []).length; return count >= 4 || 'Сейчас переменных: ' + count;" }
      ],
      hints: ['console.log(typeof name);'],
      solution: {
        js: 'const title = "Курс";\nconst lessons = 34;\nconst isFree = true;\nconst rating = null;\n\nconsole.log(typeof title);\nconsole.log(typeof lessons);\nconsole.log(typeof isFree);\nconsole.log(typeof rating);'
      }
    },
    {
      id: 'js-variables-4',
      title: 'Изменение значения',
      difficulty: 'medium',
      description: 'Заведите счётчик `score = 0`, трижды увеличьте его на 10 и выведите итог. В коде должно быть ровно одно объявление `score`.',
      checks: [
        { label: 'Счётчик объявлен через let', kind: 'source', lang: 'js', matches: 'let\\s+score\\s*=\\s*0' },
        { label: 'Объявление ровно одно', kind: 'custom', fn: "const count = (ctx.source.js.match(/\\b(let|const|var)\\s+score\\b/g) || []).length; return count === 1 || 'Объявлений score: ' + count;" },
        { label: 'Итог равен 30', kind: 'console', matches: '(^|\\D)30(\\D|$)' },
        { label: 'Число 30 не вписано вручную', kind: 'source', lang: 'js', notContains: '30' },
        { label: 'Ошибок нет', kind: 'noError' }
      ],
      hints: ['score += 10; — то же самое, что score = score + 10;'],
      solution: { js: 'let score = 0;\n\nscore += 10;\nscore += 10;\nscore += 10;\n\nconsole.log(score);' }
    },
    {
      id: 'js-variables-5',
      title: 'Challenge: карточка пользователя',
      difficulty: 'hard',
      description: 'Опишите пользователя переменными: имя, возраст, город, признак подписки. Выведите две строки: представление (`Имя, возраст, город`) и статус подписки словами `активна` / `не активна`, вычисленный из логической переменной.',
      checks: [
        { label: 'Объявлено минимум 4 переменные', kind: 'custom', fn: "const count = (ctx.source.js.match(/\\b(let|const)\\s+[A-Za-z_$]/g) || []).length; return count >= 4 || 'Сейчас переменных: ' + count;" },
        { label: 'Есть логическая переменная', kind: 'source', lang: 'js', matches: '=\\s*(true|false)' },
        { label: 'Использована шаблонная строка', kind: 'source', lang: 'js', matches: '`[^`]*\\$\\{' },
        { label: 'Выведено слово «активна»', kind: 'console', contains: 'активна' },
        { label: 'Выведено минимум две строки', kind: 'custom', fn: "return ctx.console.length >= 2 || 'Строк в консоли: ' + ctx.console.length;" },
        { label: 'Статус вычислен, а не вписан текстом', kind: 'source', lang: 'js', matches: '\\?|if' }
      ],
      hints: [
        'Тернарный оператор: условие ? "да" : "нет".',
        'Например: `Подписка ${isSubscribed ? "активна" : "не активна"}`.'
      ],
      solution: {
        js: 'const name = "Алиса";\nconst age = 25;\nconst city = "Ташкент";\nconst isSubscribed = true;\n\nconsole.log(`${name}, ${age}, ${city}`);\nconsole.log(`Подписка ${isSubscribed ? "активна" : "не активна"}`);'
      }
    }
  ]
};

const lesson21 = {
  id: 'js-operators',
  title: 'Операторы',
  summary: 'Арифметика, сравнение, логика и приведение типов.',
  editors: ['html', 'js'],
  theory: [
    { h: 'Арифметические' },
    { code: '5 + 2   // 7\n5 - 2   // 3\n5 * 2   // 10\n5 / 2   // 2.5\n5 % 2   // 1  — остаток от деления\n5 ** 2  // 25 — возведение в степень' },
    { h: 'Сокращённые формы' },
    { code: 'x += 5;   // x = x + 5\nx -= 5;\nx *= 2;\nx++;      // увеличить на 1\nx--;' },
    { h: 'Сравнение' },
    { table: { head: ['Оператор', 'Смысл'], rows: [
      ['`===`', 'Строго равно: значение **и** тип'],
      ['`!==`', 'Строго не равно'],
      ['`==`', 'Равно с приведением типов — лучше не использовать'],
      ['`>` `<` `>=` `<=`', 'Больше, меньше, не меньше, не больше']
    ] } },
    { code: '"5" == 5    // true  — типы привелись\n"5" === 5   // false — строка не равна числу' },
    { h: 'Логические' },
    { code: 'true && false  // И — true, только если оба true\ntrue || false  // ИЛИ — true, если хотя бы один\n!true          // НЕ — false' },
    { note: '`Number("5")` превращает строку в число, `String(5)` — число в строку, `parseInt("12px")` даст 12.' }
  ],
  starter: { html: '<h1>Операторы</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-operators-1',
      title: 'Калькулятор',
      difficulty: 'easy',
      description: 'Заведите `a = 15` и `b = 4` и выведите в консоль сумму, разность, произведение и частное.',
      checks: [
        { label: 'Сумма 19', kind: 'console', matches: '(^|\\D)19(\\D|$)' },
        { label: 'Разность 11', kind: 'console', matches: '(^|\\D)11(\\D|$)' },
        { label: 'Произведение 60', kind: 'console', matches: '(^|\\D)60(\\D|$)' },
        { label: 'Частное 3.75', kind: 'console', contains: '3.75' },
        { label: 'Считает код, а не человек', kind: 'source', lang: 'js', matches: 'a\\s*[-+*/]\\s*b' }
      ],
      hints: ['console.log(a + b);'],
      solution: {
        js: 'const a = 15;\nconst b = 4;\n\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);'
      }
    },
    {
      id: 'js-operators-2',
      title: 'Остаток и чётность',
      difficulty: 'easy',
      description: 'Для числа `17` выведите остаток от деления на 5 и результат проверки на чётность (`true` или `false`).',
      checks: [
        { label: 'Использован оператор %', kind: 'source', lang: 'js', contains: '%' },
        { label: 'Выведен остаток 2', kind: 'console', matches: '(^|\\D)2(\\D|$)' },
        { label: 'Выведено false (17 — нечётное)', kind: 'console', contains: 'false' },
        { label: 'Проверка чётности написана кодом', kind: 'source', lang: 'js', matches: '%\\s*2\\s*===\\s*0' }
      ],
      hints: ['Число чётное, если остаток от деления на 2 равен нулю.'],
      solution: {
        js: 'const value = 17;\n\nconsole.log(value % 5);\nconsole.log(value % 2 === 0);'
      }
    },
    {
      id: 'js-operators-3',
      title: '== против ===',
      difficulty: 'medium',
      description: 'Выведите результат четырёх сравнений: `"5" == 5`, `"5" === 5`, `0 == false`, `0 === false`.',
      checks: [
        { label: 'Использован ==', kind: 'source', lang: 'js', matches: '[^=!]==[^=]' },
        { label: 'Использован ===', kind: 'source', lang: 'js', contains: '===' },
        { label: 'В консоли есть true', kind: 'console', contains: 'true' },
        { label: 'В консоли есть false', kind: 'console', contains: 'false' },
        { label: 'Выведено ровно 4 результата', kind: 'custom', fn: "return ctx.console.length === 4 || 'Строк в консоли: ' + ctx.console.length;" },
        { label: 'Порядок: true, false, true, false', kind: 'custom', fn: "const values = ctx.console.map((entry) => entry.text.trim()).join(','); return values === 'true,false,true,false' || 'Получилось: ' + values;" }
      ],
      hints: ['Каждое сравнение выводите отдельной строкой.'],
      solution: {
        js: 'console.log("5" == 5);\nconsole.log("5" === 5);\nconsole.log(0 == false);\nconsole.log(0 === false);'
      }
    },
    {
      id: 'js-operators-4',
      title: 'Логика доступа',
      difficulty: 'medium',
      description: 'Есть `age = 20` и `hasTicket = true`. Выведите: пускать ли на сеанс (возраст не меньше 18 **и** есть билет) и нужна ли доплата (возраст меньше 18 **или** билета нет).',
      checks: [
        { label: 'Использован оператор &&', kind: 'source', lang: 'js', contains: '&&' },
        { label: 'Использован оператор ||', kind: 'source', lang: 'js', contains: '||' },
        { label: 'Первый результат — true', kind: 'custom', fn: "return (ctx.console[0] || {}).text === 'true' || 'Первая строка: ' + ((ctx.console[0] || {}).text || 'пусто');" },
        { label: 'Второй результат — false', kind: 'custom', fn: "return (ctx.console[1] || {}).text === 'false' || 'Вторая строка: ' + ((ctx.console[1] || {}).text || 'пусто');" },
        { label: 'Сравнение возраста написано кодом', kind: 'source', lang: 'js', matches: 'age\\s*(>=|<)\\s*18' }
      ],
      hints: ['const canEnter = age >= 18 && hasTicket;'],
      solution: {
        js: 'const age = 20;\nconst hasTicket = true;\n\nconsole.log(age >= 18 && hasTicket);\nconsole.log(age < 18 || !hasTicket);'
      }
    },
    {
      id: 'js-operators-5',
      title: 'Challenge: расчёт заказа',
      difficulty: 'hard',
      description: 'Заказ: цена `1200`, количество `3`, скидка `15` процентов, доставка `500`, но при сумме больше `3000` доставка бесплатна. Посчитайте и выведите: сумму без скидки, размер скидки, стоимость доставки и итог. Все числа считает код.',
      checks: [
        { label: 'Сумма без скидки 3600', kind: 'console', contains: '3600' },
        { label: 'Скидка 540', kind: 'console', contains: '540' },
        { label: 'Доставка бесплатна (0)', kind: 'custom', fn: "const texts = ctx.console.map((entry) => entry.text.trim()); return texts.includes('0') || 'Ожидалась строка с 0 (бесплатная доставка), получено: ' + texts.join(' | ');" },
        { label: 'Итог 3060', kind: 'console', contains: '3060' },
        { label: 'Скидка вычисляется формулой', kind: 'source', lang: 'js', matches: '(/\\s*100|\\*\\s*0\\.|discount)' },
        { label: 'Условие бесплатной доставки в коде', kind: 'source', lang: 'js', matches: '3000' },
        { label: 'Готовые ответы не вписаны', kind: 'source', lang: 'js', notContains: '3060' }
      ],
      hints: [
        'Сумма = цена × количество.',
        'Скидка = сумма × процент / 100.',
        'Доставка: total > 3000 ? 0 : 500.'
      ],
      solution: {
        js: 'const price = 1200;\nconst quantity = 3;\nconst discountPercent = 15;\nconst deliveryPrice = 500;\n\nconst subtotal = price * quantity;\nconst discount = subtotal * discountPercent / 100;\nconst delivery = subtotal > 3000 ? 0 : deliveryPrice;\nconst total = subtotal - discount + delivery;\n\nconsole.log(subtotal);\nconsole.log(discount);\nconsole.log(delivery);\nconsole.log(total);'
      }
    }
  ]
};

const lesson22 = {
  id: 'js-conditions',
  title: 'Условия',
  summary: 'if, else if, switch и тернарный оператор.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Условие — это развилка: код выбирает, какую ветку выполнить.' },
    { code: 'if (temperature > 30) {\n  console.log("Жарко");\n} else if (temperature > 15) {\n  console.log("Тепло");\n} else {\n  console.log("Холодно");\n}' },
    { h: 'Тернарный оператор' },
    { code: 'const status = age >= 18 ? "взрослый" : "ребёнок";' },
    { h: 'switch' },
    { code: 'switch (day) {\n  case "сб":\n  case "вс":\n    console.log("Выходной");\n    break;\n  default:\n    console.log("Рабочий день");\n}' },
    { warn: 'Забытый `break` в `switch` приводит к «проваливанию» в следующий case — это частая ошибка.' },
    { h: 'Ложные значения' },
    { p: 'В условии как `false` ведут себя: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Всё остальное — истина.' }
  ],
  starter: { html: '<h1>Условия</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-conditions-1',
      title: 'Совершеннолетие',
      difficulty: 'easy',
      description: 'Для `age = 20` выведите `Доступ разрешён`, если возраст 18 и больше, иначе — `Доступ запрещён`.',
      checks: [
        { label: 'Использован if', kind: 'source', lang: 'js', matches: '\\bif\\s*\\(' },
        { label: 'Есть ветка else', kind: 'source', lang: 'js', matches: '\\belse\\b' },
        { label: 'Выведено «Доступ разрешён»', kind: 'console', contains: 'Доступ разрешён' },
        { label: 'Условие сравнивает возраст', kind: 'source', lang: 'js', matches: 'age\\s*>=?\\s*18' }
      ],
      hints: ['if (age >= 18) { … } else { … }'],
      solution: {
        js: 'const age = 20;\n\nif (age >= 18) {\n  console.log("Доступ разрешён");\n} else {\n  console.log("Доступ запрещён");\n}'
      }
    },
    {
      id: 'js-conditions-2',
      title: 'Оценка по баллам',
      difficulty: 'easy',
      description: 'Для `score = 74` выведите оценку: 90 и выше — `отлично`, 70–89 — `хорошо`, 50–69 — `удовлетворительно`, ниже — `неудовлетворительно`.',
      checks: [
        { label: 'Использована цепочка else if', kind: 'source', lang: 'js', matches: 'else\\s+if' },
        { label: 'Для 74 выведено «хорошо»', kind: 'custom', fn: "const first = (ctx.console[0] || {}).text || ''; return first.trim() === 'хорошо' || 'Выведено: ' + first;" },
        { label: 'Все четыре градации описаны', kind: 'custom', fn: "const source = ctx.source.js; const words = ['отлично', 'хорошо', 'удовлетворительно']; for (const word of words) { if (!source.includes(word)) return 'В коде нет варианта «' + word + '»'; } return true;" }
      ],
      hints: ['Проверяйте от большего к меньшему — тогда границы не перекроются.'],
      solution: {
        js: 'const score = 74;\n\nif (score >= 90) {\n  console.log("отлично");\n} else if (score >= 70) {\n  console.log("хорошо");\n} else if (score >= 50) {\n  console.log("удовлетворительно");\n} else {\n  console.log("неудовлетворительно");\n}'
      }
    },
    {
      id: 'js-conditions-3',
      title: 'switch по дню недели',
      difficulty: 'medium',
      description: 'Для `day = "сб"` через `switch` выведите `Выходной` для `сб` и `вс`, и `Рабочий день` для остальных значений.',
      checks: [
        { label: 'Использован switch', kind: 'source', lang: 'js', matches: 'switch\\s*\\(' },
        { label: 'Есть default', kind: 'source', lang: 'js', matches: '\\bdefault\\s*:' },
        { label: 'Есть break', kind: 'source', lang: 'js', matches: '\\bbreak\\b' },
        { label: 'Для «сб» выведено «Выходной»', kind: 'console', contains: 'Выходной' },
        { label: 'Лишнего не вывелось', kind: 'custom', fn: "return ctx.console.length === 1 || 'В консоли ' + ctx.console.length + ' строк, ожидалась одна';" }
      ],
      hints: ['Два case подряд без break объединяют варианты.'],
      solution: {
        js: 'const day = "сб";\n\nswitch (day) {\n  case "сб":\n  case "вс":\n    console.log("Выходной");\n    break;\n  default:\n    console.log("Рабочий день");\n}'
      }
    },
    {
      id: 'js-conditions-4',
      title: 'Тернарный оператор',
      difficulty: 'medium',
      description: 'Для `items = 0` выведите строку `Корзина пуста` или `Товаров: N`, использовав тернарный оператор в шаблонной строке.',
      checks: [
        { label: 'Использован тернарный оператор', kind: 'source', lang: 'js', matches: '\\?[^;]*:' },
        { label: 'Нет ключевого слова if', kind: 'source', lang: 'js', notContains: 'if' },
        { label: 'Для нуля выведено «Корзина пуста»', kind: 'console', contains: 'Корзина пуста' }
      ],
      hints: ['const message = items === 0 ? "Корзина пуста" : `Товаров: ${items}`;'],
      solution: {
        js: 'const items = 0;\n\nconst message = items === 0 ? "Корзина пуста" : `Товаров: ${items}`;\nconsole.log(message);'
      }
    },
    {
      id: 'js-conditions-5',
      title: 'Challenge: стоимость доставки',
      difficulty: 'hard',
      description: 'Правила: заказ дороже 5000 — доставка бесплатна; от 2000 до 5000 — 300; дешевле 2000 — 700; при самовывозе (`pickup = true`) всегда 0. Проверьте правила на трёх заказах: `1500` (доставка), `3000` (доставка), `6000` (самовывоз) и выведите три числа.',
      checks: [
        { label: 'Выведено три значения', kind: 'custom', fn: "return ctx.console.length === 3 || 'В консоли ' + ctx.console.length + ' строк вместо 3';" },
        { label: 'Первый заказ — 700', kind: 'custom', fn: "return (ctx.console[0] || {}).text.trim() === '700' || 'Первое значение: ' + (ctx.console[0] || {}).text;" },
        { label: 'Второй заказ — 300', kind: 'custom', fn: "return (ctx.console[1] || {}).text.trim() === '300' || 'Второе значение: ' + (ctx.console[1] || {}).text;" },
        { label: 'Третий заказ — 0 (самовывоз)', kind: 'custom', fn: "return (ctx.console[2] || {}).text.trim() === '0' || 'Третье значение: ' + (ctx.console[2] || {}).text;" },
        { label: 'Логика описана условиями', kind: 'source', lang: 'js', matches: '\\bif\\b|\\?' },
        { label: 'Правило самовывоза учтено', kind: 'source', lang: 'js', contains: 'pickup' }
      ],
      hints: [
        'Удобно написать вычисление один раз и трижды применить его к разным данным.',
        'Самовывоз проверяется первым — он отменяет остальные правила.'
      ],
      solution: {
        js: 'function deliveryCost(total, pickup) {\n  if (pickup) return 0;\n  if (total > 5000) return 0;\n  if (total >= 2000) return 300;\n  return 700;\n}\n\nconsole.log(deliveryCost(1500, false));\nconsole.log(deliveryCost(3000, false));\nconsole.log(deliveryCost(6000, true));'
      }
    }
  ]
};

const lesson23 = {
  id: 'js-loops',
  title: 'Циклы',
  summary: 'for, while, for...of, break и continue.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Цикл повторяет код, пока выполняется условие. Без циклов пришлось бы копировать строки вручную.' },
    { h: 'for' },
    { code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n//  ↑начало    ↑условие  ↑шаг' },
    { h: 'while' },
    { code: 'let count = 3;\nwhile (count > 0) {\n  console.log(count);\n  count--;\n}' },
    { h: 'for...of' },
    { code: 'for (const letter of "код") {\n  console.log(letter);\n}\n\nfor (const item of ["чай", "кофе"]) {\n  console.log(item);\n}' },
    { h: 'Управление циклом' },
    { code: 'for (let i = 1; i <= 10; i++) {\n  if (i === 4) continue; // пропустить шаг\n  if (i === 7) break;    // выйти из цикла\n  console.log(i);\n}' },
    { warn: 'Если условие никогда не станет ложным, страница зависнет. В playground такой запуск прервётся по таймауту.' }
  ],
  starter: { html: '<h1>Циклы</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-loops-1',
      title: 'От 1 до 5',
      difficulty: 'easy',
      description: 'Выведите в консоль числа от 1 до 5, каждое отдельной строкой, с помощью цикла `for`.',
      checks: [
        { label: 'Использован цикл for', kind: 'source', lang: 'js', matches: 'for\\s*\\(' },
        { label: 'Пять строк в консоли', kind: 'custom', fn: "return ctx.console.length === 5 || 'Строк: ' + ctx.console.length;" },
        { label: 'Числа идут по порядку', kind: 'custom', fn: "const values = ctx.console.map((entry) => entry.text.trim()).join(','); return values === '1,2,3,4,5' || 'Получилось: ' + values;" },
        { label: 'Числа не выведены вручную', kind: 'custom', fn: "const calls = (ctx.source.js.match(/console\\.log/g) || []).length; return calls === 1 || 'Вызовов console.log: ' + calls + ', должен быть один — внутри цикла';" }
      ],
      hints: ['for (let i = 1; i <= 5; i++) { … }'],
      solution: { js: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}' }
    },
    {
      id: 'js-loops-2',
      title: 'Сумма чисел',
      difficulty: 'easy',
      description: 'Посчитайте циклом сумму всех чисел от 1 до 100 и выведите результат одной строкой.',
      checks: [
        { label: 'Использован цикл', kind: 'source', lang: 'js', matches: 'for\\s*\\(|while\\s*\\(' },
        { label: 'Результат 5050', kind: 'console', contains: '5050' },
        { label: 'Одна строка в консоли', kind: 'custom', fn: "return ctx.console.length === 1 || 'Строк: ' + ctx.console.length;" },
        { label: 'Ответ не вписан вручную', kind: 'source', lang: 'js', notContains: '5050' }
      ],
      hints: ['Заведите переменную sum = 0 и прибавляйте к ней i на каждом шаге.'],
      solution: {
        js: 'let sum = 0;\n\nfor (let i = 1; i <= 100; i++) {\n  sum += i;\n}\n\nconsole.log(sum);'
      }
    },
    {
      id: 'js-loops-3',
      title: 'Обратный отсчёт',
      difficulty: 'medium',
      description: 'С помощью `while` выведите обратный отсчёт от 5 до 1, а затем строку `Поехали!`',
      checks: [
        { label: 'Использован while', kind: 'source', lang: 'js', matches: 'while\\s*\\(' },
        { label: 'Шесть строк в консоли', kind: 'custom', fn: "return ctx.console.length === 6 || 'Строк: ' + ctx.console.length;" },
        { label: 'Отсчёт идёт в обратном порядке', kind: 'custom', fn: "const values = ctx.console.slice(0, 5).map((entry) => entry.text.trim()).join(','); return values === '5,4,3,2,1' || 'Получилось: ' + values;" },
        { label: 'Последняя строка — «Поехали!»', kind: 'custom', fn: "const last = (ctx.console[ctx.console.length - 1] || {}).text || ''; return last.trim() === 'Поехали!' || 'Последняя строка: ' + last;" }
      ],
      hints: ['Не забудьте уменьшать счётчик внутри цикла, иначе он станет бесконечным.'],
      solution: {
        js: 'let count = 5;\n\nwhile (count > 0) {\n  console.log(count);\n  count--;\n}\n\nconsole.log("Поехали!");'
      }
    },
    {
      id: 'js-loops-4',
      title: 'Перебор и пропуск',
      difficulty: 'medium',
      description: 'Переберите числа от 1 до 20 и выведите только те, что делятся на 3, но пропустите число 9 (используйте `continue`).',
      checks: [
        { label: 'Использован continue', kind: 'source', lang: 'js', matches: '\\bcontinue\\b' },
        { label: 'Выведены 3, 6, 12, 15, 18', kind: 'custom', fn: "const values = ctx.console.map((entry) => entry.text.trim()).join(','); return values === '3,6,12,15,18' || 'Получилось: ' + values;" },
        { label: 'Проверка кратности через %', kind: 'source', lang: 'js', matches: '%\\s*3' }
      ],
      hints: ['Сначала отфильтруйте кратные трём, потом добавьте пропуск девятки.'],
      solution: {
        js: 'for (let i = 1; i <= 20; i++) {\n  if (i % 3 !== 0) continue;\n  if (i === 9) continue;\n  console.log(i);\n}'
      }
    },
    {
      id: 'js-loops-5',
      title: 'Challenge: FizzBuzz',
      difficulty: 'hard',
      description: 'Классическая задача: выведите числа от 1 до 20. Вместо чисел, кратных 3, — `Fizz`; кратных 5 — `Buzz`; кратных и 3, и 5 — `FizzBuzz`.',
      checks: [
        { label: 'Ровно 20 строк', kind: 'custom', fn: "return ctx.console.length === 20 || 'Строк: ' + ctx.console.length;" },
        { label: 'Последовательность верная', kind: 'custom', fn: "const expected = []; for (let i = 1; i <= 20; i++) { expected.push(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i)); } const actual = ctx.console.map((entry) => entry.text.trim()); for (let i = 0; i < expected.length; i++) { if (actual[i] !== expected[i]) return 'Строка ' + (i + 1) + ': ожидалось «' + expected[i] + '», получено «' + actual[i] + '»'; } return true;" },
        { label: 'Использован цикл', kind: 'source', lang: 'js', matches: 'for\\s*\\(|while\\s*\\(' },
        { label: 'Значения не перечислены вручную', kind: 'custom', fn: "const calls = (ctx.source.js.match(/console\\.log/g) || []).length; return calls <= 4 || 'Вызовов console.log: ' + calls;" }
      ],
      hints: [
        'Проверку на кратность и 3, и 5 делайте первой.',
        'Число кратно и 3, и 5, если оно кратно 15.'
      ],
      solution: {
        js: 'for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) {\n    console.log("FizzBuzz");\n  } else if (i % 3 === 0) {\n    console.log("Fizz");\n  } else if (i % 5 === 0) {\n    console.log("Buzz");\n  } else {\n    console.log(i);\n  }\n}'
      }
    }
  ]
};

const lesson24 = {
  id: 'js-functions',
  title: 'Функции',
  summary: 'Объявление, параметры, return, стрелочные функции и область видимости.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Функция — это именованный кусок кода, который можно вызывать сколько угодно раз с разными данными.' },
    { code: 'function greet(name) {\n  return `Привет, ${name}!`;\n}\n\nconsole.log(greet("Алиса"));' },
    { h: 'Три формы записи' },
    { code: 'function sum(a, b) { return a + b; }        // объявление\nconst sum = function (a, b) { return a + b; }; // выражение\nconst sum = (a, b) => a + b;                   // стрелочная' },
    { h: 'Параметры по умолчанию' },
    { code: 'function greet(name = "гость") {\n  return `Привет, ${name}!`;\n}\ngreet();        // Привет, гость!' },
    { h: 'return' },
    { p: '`return` возвращает значение и сразу завершает функцию. Функция без `return` возвращает `undefined`.' },
    { h: 'Область видимости' },
    { code: 'function test() {\n  const inner = 1;   // виден только внутри\n}\nconsole.log(inner);  // ошибка' },
    { note: 'Хорошая функция делает одно дело, а её имя — глагол: `calculateTotal`, `formatDate`, `isValid`.' }
  ],
  starter: { html: '<h1>Функции</h1>\n', js: '// ваш код\n' },
  tasks: [
    {
      id: 'js-functions-1',
      title: 'Приветствие',
      difficulty: 'easy',
      description: 'Напишите функцию `greet(name)`, которая **возвращает** строку вида `Привет, Алиса!`. Вызовите её и выведите результат.',
      checks: [
        { label: 'Функция greet объявлена', kind: 'custom', fn: "return typeof greet === 'function' || 'Функции greet нет';" },
        { label: 'greet("Алиса") возвращает «Привет, Алиса!»', kind: 'custom', fn: "const result = greet('Алиса'); return result === 'Привет, Алиса!' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'Функция работает с любым именем', kind: 'custom', fn: "const result = greet('Боб'); return result === 'Привет, Боб!' || 'Для «Боб» получено: ' + JSON.stringify(result);" },
        { label: 'Результат выведен в консоль', kind: 'console', contains: 'Привет,' },
        { label: 'Использован return', kind: 'source', lang: 'js', matches: '\\breturn\\b|=>\\s*`' }
      ],
      hints: ['return — это не console.log. Функция должна вернуть строку, а выводит её уже вызывающий код.'],
      solution: {
        js: 'function greet(name) {\n  return `Привет, ${name}!`;\n}\n\nconsole.log(greet("Алиса"));'
      }
    },
    {
      id: 'js-functions-2',
      title: 'Значение по умолчанию',
      difficulty: 'easy',
      description: 'Доработайте `greet` так, чтобы без аргумента она возвращала `Привет, гость!`',
      starter: { js: 'function greet(name) {\n  return `Привет, ${name}!`;\n}\n\nconsole.log(greet());\n' },
      checks: [
        { label: 'greet() возвращает «Привет, гость!»', kind: 'custom', fn: "const result = greet(); return result === 'Привет, гость!' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'С аргументом работает по-прежнему', kind: 'custom', fn: "const result = greet('Алиса'); return result === 'Привет, Алиса!' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'Использовано значение по умолчанию', kind: 'source', lang: 'js', matches: 'name\\s*=\\s*["\\\']гость' }
      ],
      hints: ['function greet(name = "гость") { … }'],
      solution: {
        js: 'function greet(name = "гость") {\n  return `Привет, ${name}!`;\n}\n\nconsole.log(greet());'
      }
    },
    {
      id: 'js-functions-3',
      title: 'Стрелочная функция',
      difficulty: 'medium',
      description: 'Напишите стрелочную функцию `area(width, height)`, которая возвращает площадь прямоугольника, и функцию `perimeter(width, height)` — периметр.',
      checks: [
        { label: 'area — функция', kind: 'custom', fn: "return typeof area === 'function' || 'Функции area нет';" },
        { label: 'area(4, 5) === 20', kind: 'custom', fn: "return area(4, 5) === 20 || 'Получено: ' + area(4, 5);" },
        { label: 'perimeter(4, 5) === 18', kind: 'custom', fn: "return perimeter(4, 5) === 18 || 'Получено: ' + perimeter(4, 5);" },
        { label: 'Использована стрелочная запись', kind: 'source', lang: 'js', contains: '=>' },
        { label: 'Функции объявлены через const', kind: 'source', lang: 'js', matches: 'const\\s+(area|perimeter)\\s*=' }
      ],
      hints: ['const area = (width, height) => width * height;'],
      solution: {
        js: 'const area = (width, height) => width * height;\nconst perimeter = (width, height) => (width + height) * 2;\n\nconsole.log(area(4, 5));\nconsole.log(perimeter(4, 5));'
      }
    },
    {
      id: 'js-functions-4',
      title: 'Функция с условием',
      difficulty: 'medium',
      description: 'Напишите функцию `getPrice(price, isMember)`: участникам клуба скидка 20%, остальным — полная цена. Результат округлите до целого.',
      checks: [
        { label: 'getPrice — функция', kind: 'custom', fn: "return typeof getPrice === 'function' || 'Функции getPrice нет';" },
        { label: 'getPrice(1000, true) === 800', kind: 'custom', fn: "return getPrice(1000, true) === 800 || 'Получено: ' + getPrice(1000, true);" },
        { label: 'getPrice(1000, false) === 1000', kind: 'custom', fn: "return getPrice(1000, false) === 1000 || 'Получено: ' + getPrice(1000, false);" },
        { label: 'Результат всегда целый', kind: 'custom', fn: "const value = getPrice(999, true); return Number.isInteger(value) || 'getPrice(999, true) вернул ' + value;" },
        { label: 'Использовано округление', kind: 'source', lang: 'js', matches: 'Math\\.(round|floor|ceil)' }
      ],
      hints: ['Math.round(price * 0.8)'],
      solution: {
        js: 'function getPrice(price, isMember) {\n  return isMember ? Math.round(price * 0.8) : price;\n}\n\nconsole.log(getPrice(1000, true));\nconsole.log(getPrice(1000, false));'
      }
    },
    {
      id: 'js-functions-5',
      title: 'Challenge: набор утилит',
      difficulty: 'hard',
      description: 'Напишите три функции: `isEven(n)` — чётное ли число; `celsiusToFahrenheit(c)` — перевод температуры (`c * 9 / 5 + 32`); `formatPrice(value)` — возвращает строку вида `1 200 сум` (разряды разделены пробелом).',
      checks: [
        { label: 'isEven(4) === true', kind: 'custom', fn: "return isEven(4) === true || 'Получено: ' + JSON.stringify(isEven(4));" },
        { label: 'isEven(7) === false', kind: 'custom', fn: "return isEven(7) === false || 'Получено: ' + JSON.stringify(isEven(7));" },
        { label: 'celsiusToFahrenheit(100) === 212', kind: 'custom', fn: "return celsiusToFahrenheit(100) === 212 || 'Получено: ' + celsiusToFahrenheit(100);" },
        { label: 'celsiusToFahrenheit(0) === 32', kind: 'custom', fn: "return celsiusToFahrenheit(0) === 32 || 'Получено: ' + celsiusToFahrenheit(0);" },
        { label: 'formatPrice(1200) === «1 200 сум»', kind: 'custom', fn: "const result = formatPrice(1200); return ctx.text(result) === '1 200 сум' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'formatPrice(1000000) разбит по разрядам', kind: 'custom', fn: "const result = ctx.text(formatPrice(1000000)); return result === '1 000 000 сум' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'Все три функции объявлены', kind: 'custom', fn: "const missing = ['isEven', 'celsiusToFahrenheit', 'formatPrice'].filter((name) => typeof eval(name) !== 'function'); return missing.length === 0 || 'Не найдены: ' + missing.join(', ');" }
      ],
      hints: [
        'Разряды удобно расставить регулярным выражением или методом toLocaleString.',
        'value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ")'
      ],
      solution: {
        js: 'function isEven(n) {\n  return n % 2 === 0;\n}\n\nfunction celsiusToFahrenheit(c) {\n  return c * 9 / 5 + 32;\n}\n\nfunction formatPrice(value) {\n  const digits = String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ");\n  return `${digits} сум`;\n}\n\nconsole.log(isEven(4), celsiusToFahrenheit(100), formatPrice(1200));'
      }
    }
  ]
};

const lesson25 = {
  id: 'js-arrays',
  title: 'Массивы',
  summary: 'Хранение списков и методы map, filter, reduce, find, sort.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Массив — упорядоченный список значений. Нумерация начинается с нуля.' },
    { code: 'const fruits = ["яблоко", "банан", "груша"];\n\nfruits[0];        // "яблоко"\nfruits.length;    // 3\nfruits[fruits.length - 1]; // последний' },
    { h: 'Изменение' },
    { code: 'fruits.push("слива");    // добавить в конец\nfruits.pop();            // удалить последний\nfruits.unshift("киви");  // добавить в начало\nfruits.shift();          // удалить первый\nfruits.includes("банан");// есть ли элемент' },
    { h: 'Методы перебора' },
    { table: { head: ['Метод', 'Что возвращает'], rows: [
      ['`forEach`', 'Ничего — просто перебирает'],
      ['`map`', 'Новый массив той же длины'],
      ['`filter`', 'Новый массив из подошедших элементов'],
      ['`find`', 'Первый подошедший элемент'],
      ['`reduce`', 'Одно значение — сумму, максимум, объект'],
      ['`sort`', 'Тот же массив, отсортированный']
    ] } },
    { code: 'const prices = [100, 250, 80];\n\nconst doubled = prices.map((price) => price * 2);       // [200, 500, 160]\nconst cheap  = prices.filter((price) => price < 200);  // [100, 80]\nconst total  = prices.reduce((sum, price) => sum + price, 0); // 430\nprices.sort((a, b) => a - b);                          // по возрастанию' },
    { warn: '`sort()` без функции сравнения сортирует как строки: `[10, 9, 100]` превратится в `[10, 100, 9]`.' }
  ],
  starter: { html: '<h1>Массивы</h1>\n', js: 'const prices = [1200, 450, 3000, 780, 150];\n' },
  tasks: [
    {
      id: 'js-arrays-1',
      title: 'Основы массива',
      difficulty: 'easy',
      description: 'Выведите длину массива `prices`, его первый и последний элементы.',
      checks: [
        { label: 'Выведена длина 5', kind: 'console', matches: '(^|\\D)5(\\D|$)' },
        { label: 'Выведен первый элемент 1200', kind: 'console', contains: '1200' },
        { label: 'Выведен последний элемент 150', kind: 'console', contains: '150' },
        { label: 'Использовано свойство length', kind: 'source', lang: 'js', contains: 'length' },
        { label: 'Последний элемент получен через length, а не индексом 4', kind: 'source', lang: 'js', matches: 'length\\s*-\\s*1|\\.at\\(\\s*-1\\s*\\)' }
      ],
      hints: ['prices[prices.length - 1] — универсальный способ взять последний элемент.'],
      solution: {
        js: 'const prices = [1200, 450, 3000, 780, 150];\n\nconsole.log(prices.length);\nconsole.log(prices[0]);\nconsole.log(prices[prices.length - 1]);'
      }
    },
    {
      id: 'js-arrays-2',
      title: 'Добавить и удалить',
      difficulty: 'easy',
      description: 'Добавьте в конец массива цену `999`, удалите первый элемент и выведите получившийся массив и его длину.',
      checks: [
        { label: 'Использован push', kind: 'source', lang: 'js', contains: 'push' },
        { label: 'Использован shift', kind: 'source', lang: 'js', contains: 'shift' },
        { label: 'Массив стал [450, 3000, 780, 150, 999]', kind: 'custom', fn: "return JSON.stringify(prices) === '[450,3000,780,150,999]' || 'Сейчас: ' + JSON.stringify(prices);" },
        { label: 'Выведена длина 5', kind: 'console', matches: '(^|\\D)5(\\D|$)' }
      ],
      hints: ['push добавляет в конец, shift удаляет из начала.'],
      solution: {
        js: 'const prices = [1200, 450, 3000, 780, 150];\n\nprices.push(999);\nprices.shift();\n\nconsole.log(prices);\nconsole.log(prices.length);'
      }
    },
    {
      id: 'js-arrays-3',
      title: 'map и filter',
      difficulty: 'medium',
      description: 'Создайте `withVat` — цены с НДС 12% (умножить на 1.12 и округлить), и `expensive` — цены дороже 1000. Оба массива выведите.',
      checks: [
        { label: 'Использован map', kind: 'source', lang: 'js', contains: '.map(' },
        { label: 'Использован filter', kind: 'source', lang: 'js', contains: '.filter(' },
        { label: 'withVat посчитан верно', kind: 'custom', fn: "return JSON.stringify(withVat) === '[1344,504,3360,874,168]' || 'Получено: ' + JSON.stringify(withVat);" },
        { label: 'expensive содержит только дорогие', kind: 'custom', fn: "return JSON.stringify(expensive) === '[1200,3000]' || 'Получено: ' + JSON.stringify(expensive);" },
        { label: 'Исходный массив не изменился', kind: 'custom', fn: "return JSON.stringify(prices) === '[1200,450,3000,780,150]' || 'prices изменился: ' + JSON.stringify(prices);" }
      ],
      hints: [
        'map и filter не меняют исходный массив, а возвращают новый.',
        'Math.round(price * 1.12)'
      ],
      solution: {
        js: 'const prices = [1200, 450, 3000, 780, 150];\n\nconst withVat = prices.map((price) => Math.round(price * 1.12));\nconst expensive = prices.filter((price) => price > 1000);\n\nconsole.log(withVat);\nconsole.log(expensive);'
      }
    },
    {
      id: 'js-arrays-4',
      title: 'reduce и sort',
      difficulty: 'medium',
      description: 'Посчитайте `total` — сумму всех цен через `reduce`, и `sorted` — копию массива, отсортированную по возрастанию (исходный массив трогать нельзя).',
      checks: [
        { label: 'Использован reduce', kind: 'source', lang: 'js', contains: '.reduce(' },
        { label: 'total === 5580', kind: 'custom', fn: "return total === 5580 || 'Получено: ' + total;" },
        { label: 'sorted отсортирован по возрастанию', kind: 'custom', fn: "return JSON.stringify(sorted) === '[150,450,780,1200,3000]' || 'Получено: ' + JSON.stringify(sorted);" },
        { label: 'Исходный массив не изменился', kind: 'custom', fn: "return JSON.stringify(prices) === '[1200,450,3000,780,150]' || 'prices изменился: ' + JSON.stringify(prices);" },
        { label: 'Задана функция сравнения', kind: 'source', lang: 'js', matches: 'sort\\(\\s*\\(?\\s*[a-z]' }
      ],
      hints: [
        'Копия массива: [...prices] или prices.slice().',
        'sort((a, b) => a - b) сортирует числа по возрастанию.'
      ],
      solution: {
        js: 'const prices = [1200, 450, 3000, 780, 150];\n\nconst total = prices.reduce((sum, price) => sum + price, 0);\nconst sorted = [...prices].sort((a, b) => a - b);\n\nconsole.log(total);\nconsole.log(sorted);'
      }
    },
    {
      id: 'js-arrays-5',
      title: 'Challenge: статистика по заказам',
      difficulty: 'hard',
      description: 'По массиву `orders` посчитайте: `total` — общую сумму, `average` — средний чек (округлить), `maxOrder` — самый крупный заказ, `bigOrders` — массив заказов дороже среднего. Выведите все четыре значения.',
      starter: { js: 'const orders = [320, 1500, 780, 2400, 990, 130];\n' },
      checks: [
        { label: 'total === 6120', kind: 'custom', fn: "return total === 6120 || 'Получено: ' + total;" },
        { label: 'average === 1020', kind: 'custom', fn: "return average === 1020 || 'Получено: ' + average;" },
        { label: 'maxOrder === 2400', kind: 'custom', fn: "return maxOrder === 2400 || 'Получено: ' + maxOrder;" },
        { label: 'bigOrders === [1500, 2400]', kind: 'custom', fn: "return JSON.stringify(bigOrders) === '[1500,2400]' || 'Получено: ' + JSON.stringify(bigOrders);" },
        { label: 'Использован reduce', kind: 'source', lang: 'js', contains: '.reduce(' },
        { label: 'Использован Math.max или sort', kind: 'source', lang: 'js', matches: 'Math\\.max|sort' },
        { label: 'Значения не вписаны вручную', kind: 'source', lang: 'js', notContains: '6120' },
        { label: 'Все значения выведены', kind: 'custom', fn: "return ctx.console.length >= 4 || 'Строк в консоли: ' + ctx.console.length;" }
      ],
      hints: [
        'Math.max(...orders) раскрывает массив в аргументы.',
        'Средний чек: total / orders.length.'
      ],
      solution: {
        js: 'const orders = [320, 1500, 780, 2400, 990, 130];\n\nconst total = orders.reduce((sum, order) => sum + order, 0);\nconst average = Math.round(total / orders.length);\nconst maxOrder = Math.max(...orders);\nconst bigOrders = orders.filter((order) => order > average);\n\nconsole.log(total);\nconsole.log(average);\nconsole.log(maxOrder);\nconsole.log(bigOrders);'
      }
    }
  ]
};

const lesson26 = {
  id: 'js-objects',
  title: 'Объекты',
  summary: 'Свойства, методы, деструктуризация, массивы объектов и JSON.',
  editors: ['html', 'js'],
  theory: [
    { lead: 'Объект хранит именованные значения. Если массив — это «список», то объект — «карточка».' },
    { code: 'const user = {\n  name: "Алиса",\n  age: 25,\n  isAdmin: false,\n  greet() {\n    return `Привет, ${this.name}`;\n  }\n};\n\nuser.name;        // "Алиса"\nuser["age"];      // 25\nuser.city = "Ташкент"; // добавить свойство\nuser.greet();     // вызов метода' },
    { h: 'Деструктуризация' },
    { code: 'const { name, age } = user;\nconsole.log(name, age);\n\nconst { city = "не указан" } = user; // значение по умолчанию' },
    { h: 'Массив объектов — основная структура данных в вебе' },
    { code: 'const users = [\n  { name: "Алиса", age: 25 },\n  { name: "Боб", age: 31 }\n];\n\nconst names = users.map((user) => user.name);\nconst adults = users.filter((user) => user.age >= 18);' },
    { h: 'JSON' },
    { code: 'const text = JSON.stringify(user); // объект → строка\nconst back = JSON.parse(text);     // строка → объект' },
    { note: '`Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)` превращают объект в массивы — дальше работают привычные map и filter.' }
  ],
  starter: {
    html: '<h1>Объекты</h1>\n',
    js: 'const product = {\n  title: "Кофемашина",\n  price: 2400000,\n  inStock: true\n};\n'
  },
  tasks: [
    {
      id: 'js-objects-1',
      title: 'Чтение и запись',
      difficulty: 'easy',
      description: 'Выведите название и цену товара, добавьте свойство `brand` со значением `Delonghi` и выведите объект целиком.',
      checks: [
        { label: 'Выведено название', kind: 'console', contains: 'Кофемашина' },
        { label: 'Выведена цена', kind: 'console', contains: '2400000' },
        { label: 'Добавлено свойство brand', kind: 'custom', fn: "return product.brand === 'Delonghi' || 'product.brand = ' + JSON.stringify(product.brand);" },
        { label: 'Остальные свойства на месте', kind: 'custom', fn: "return (product.title === 'Кофемашина' && product.price === 2400000 && product.inStock === true) || 'Объект изменён: ' + JSON.stringify(product);" }
      ],
      hints: ['product.brand = "Delonghi";'],
      solution: {
        js: 'const product = {\n  title: "Кофемашина",\n  price: 2400000,\n  inStock: true\n};\n\nconsole.log(product.title);\nconsole.log(product.price);\n\nproduct.brand = "Delonghi";\nconsole.log(product);'
      }
    },
    {
      id: 'js-objects-2',
      title: 'Метод объекта',
      difficulty: 'easy',
      description: 'Добавьте товару метод `describe()`, который возвращает строку `Кофемашина — 2400000 сум`, используя `this`.',
      checks: [
        { label: 'describe — функция', kind: 'custom', fn: "return typeof product.describe === 'function' || 'Метода describe нет';" },
        { label: 'Возвращает правильную строку', kind: 'custom', fn: "const result = product.describe(); return ctx.text(result) === 'Кофемашина — 2400000 сум' || 'Получено: ' + JSON.stringify(result);" },
        { label: 'Использован this', kind: 'source', lang: 'js', contains: 'this.' },
        { label: 'Метод вызван и результат выведен', kind: 'console', contains: 'Кофемашина —' }
      ],
      hints: ['describe() { return `${this.title} — ${this.price} сум`; }'],
      solution: {
        js: 'const product = {\n  title: "Кофемашина",\n  price: 2400000,\n  inStock: true,\n  describe() {\n    return `${this.title} — ${this.price} сум`;\n  }\n};\n\nconsole.log(product.describe());'
      }
    },
    {
      id: 'js-objects-3',
      title: 'Деструктуризация',
      difficulty: 'medium',
      description: 'Достаньте из объекта `title` и `price` через деструктуризацию, а также `brand` со значением по умолчанию `не указан`. Выведите все три переменные.',
      checks: [
        { label: 'Использована деструктуризация', kind: 'source', lang: 'js', matches: 'const\\s*\\{[^}]*\\}\\s*=' },
        { label: 'title получен верно', kind: 'custom', fn: "return title === 'Кофемашина' || 'title = ' + JSON.stringify(title);" },
        { label: 'price получен верно', kind: 'custom', fn: "return price === 2400000 || 'price = ' + JSON.stringify(price);" },
        { label: 'brand по умолчанию «не указан»', kind: 'custom', fn: "return brand === 'не указан' || 'brand = ' + JSON.stringify(brand);" },
        { label: 'Значения выведены', kind: 'console', contains: 'не указан' }
      ],
      hints: ['const { title, price, brand = "не указан" } = product;'],
      solution: {
        js: 'const product = {\n  title: "Кофемашина",\n  price: 2400000,\n  inStock: true\n};\n\nconst { title, price, brand = "не указан" } = product;\n\nconsole.log(title);\nconsole.log(price);\nconsole.log(brand);'
      }
    },
    {
      id: 'js-objects-4',
      title: 'Массив объектов',
      difficulty: 'medium',
      description: 'Из массива `products` получите: `names` — названия, `available` — товары в наличии, `cheapest` — самый дешёвый товар.',
      starter: {
        js: 'const products = [\n  { title: "Кофемашина", price: 2400000, inStock: true },\n  { title: "Чайник", price: 320000, inStock: false },\n  { title: "Турка", price: 85000, inStock: true },\n  { title: "Кофемолка", price: 540000, inStock: true }\n];\n'
      },
      checks: [
        { label: 'names — массив названий', kind: 'custom', fn: "return JSON.stringify(names) === '[\"Кофемашина\",\"Чайник\",\"Турка\",\"Кофемолка\"]' || 'Получено: ' + JSON.stringify(names);" },
        { label: 'available — три товара в наличии', kind: 'custom', fn: "if (!Array.isArray(available)) return 'available не массив'; return (available.length === 3 && available.every((item) => item.inStock)) || 'Получено товаров: ' + available.length;" },
        { label: 'cheapest — Турка', kind: 'custom', fn: "return (cheapest && cheapest.title === 'Турка') || 'Получено: ' + JSON.stringify(cheapest);" },
        { label: 'Использованы map и filter', kind: 'custom', fn: "const source = ctx.source.js; return (source.includes('.map(') && source.includes('.filter(')) || 'Нужны и map, и filter';" },
        { label: 'Самый дешёвый найден кодом', kind: 'source', lang: 'js', matches: 'reduce|sort|Math\\.min' }
      ],
      hints: [
        'Самый дешёвый: products.reduce((min, item) => item.price < min.price ? item : min).',
        'Или отсортируйте копию массива по цене и возьмите первый элемент.'
      ],
      solution: {
        js: 'const products = [\n  { title: "Кофемашина", price: 2400000, inStock: true },\n  { title: "Чайник", price: 320000, inStock: false },\n  { title: "Турка", price: 85000, inStock: true },\n  { title: "Кофемолка", price: 540000, inStock: true }\n];\n\nconst names = products.map((item) => item.title);\nconst available = products.filter((item) => item.inStock);\nconst cheapest = products.reduce((min, item) => (item.price < min.price ? item : min));\n\nconsole.log(names);\nconsole.log(available);\nconsole.log(cheapest);'
      }
    },
    {
      id: 'js-objects-5',
      title: 'Challenge: корзина',
      difficulty: 'hard',
      description: 'Напишите функцию `cartSummary(items)`, которая принимает массив `{ title, price, quantity }` и возвращает объект `{ count, total, titles }`: общее количество штук, итоговую сумму и массив названий. Проверьте её на заготовленной корзине и выведите результат в JSON.',
      starter: {
        js: 'const cart = [\n  { title: "Кофе", price: 45000, quantity: 2 },\n  { title: "Молоко", price: 12000, quantity: 3 },\n  { title: "Сахар", price: 9000, quantity: 1 }\n];\n\n// напишите функцию cartSummary\n'
      },
      checks: [
        { label: 'cartSummary — функция', kind: 'custom', fn: "return typeof cartSummary === 'function' || 'Функции cartSummary нет';" },
        { label: 'count === 6', kind: 'custom', fn: "const result = cartSummary(cart); return result.count === 6 || 'count = ' + result.count;" },
        { label: 'total === 135000', kind: 'custom', fn: "const result = cartSummary(cart); return result.total === 135000 || 'total = ' + result.total;" },
        { label: 'titles — массив названий', kind: 'custom', fn: "const result = cartSummary(cart); return JSON.stringify(result.titles) === '[\"Кофе\",\"Молоко\",\"Сахар\"]' || 'titles = ' + JSON.stringify(result.titles);" },
        { label: 'Работает с пустой корзиной', kind: 'custom', fn: "const result = cartSummary([]); return (result.count === 0 && result.total === 0 && Array.isArray(result.titles) && result.titles.length === 0) || 'Для пустого массива получено: ' + JSON.stringify(result);" },
        { label: 'Использован JSON.stringify для вывода', kind: 'source', lang: 'js', contains: 'JSON.stringify' },
        { label: 'Результат выведен', kind: 'console', contains: '135000' }
      ],
      hints: [
        'reduce со стартовым значением 0 корректно отработает и на пустом массиве.',
        'Сумма позиции: price * quantity.'
      ],
      solution: {
        js: 'const cart = [\n  { title: "Кофе", price: 45000, quantity: 2 },\n  { title: "Молоко", price: 12000, quantity: 3 },\n  { title: "Сахар", price: 9000, quantity: 1 }\n];\n\nfunction cartSummary(items) {\n  return {\n    count: items.reduce((sum, item) => sum + item.quantity, 0),\n    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),\n    titles: items.map((item) => item.title)\n  };\n}\n\nconsole.log(JSON.stringify(cartSummary(cart)));'
      }
    }
  ]
};

const lesson27 = {
  id: 'js-dom',
  title: 'DOM',
  summary: 'Поиск элементов, изменение текста, классов и создание узлов.',
  editors: ['html', 'css', 'js'],
  theory: [
    { lead: 'DOM — это страница, представленная в виде объектов. Через него JavaScript читает и меняет то, что видит пользователь.' },
    { h: 'Поиск элементов' },
    { code: 'document.querySelector("#title");     // первый подходящий\ndocument.querySelectorAll(".card");   // все (псевдомассив)\ndocument.getElementById("title");' },
    { h: 'Чтение и изменение' },
    { code: 'const title = document.querySelector("h1");\n\ntitle.textContent = "Новый текст";  // безопасно\ntitle.innerHTML = "<em>Текст</em>";  // вставляет разметку\ntitle.style.color = "red";\ntitle.setAttribute("data-id", "7");' },
    { h: 'Классы' },
    { code: 'element.classList.add("active");\nelement.classList.remove("hidden");\nelement.classList.toggle("open");\nelement.classList.contains("active"); // true / false' },
    { h: 'Создание элементов' },
    { code: 'const item = document.createElement("li");\nitem.textContent = "Новый пункт";\ndocument.querySelector("ul").append(item);\n\nitem.remove(); // удалить' },
    { warn: '`innerHTML` с данными от пользователя опасен — так на страницу попадает чужой скрипт. Для текста всегда `textContent`.' }
  ],
  starter: {
    html: '<h1 id="title">Заголовок</h1>\n<p class="text">Абзац</p>\n<ul id="list">\n  <li>Первый</li>\n</ul>\n',
    css: '.highlight { background: #fde68a; }\n',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-dom-1',
      title: 'Изменить текст',
      difficulty: 'easy',
      description: 'Найдите заголовок по `id="title"` и замените его текст на `Привет из JavaScript`.',
      checks: [
        { label: 'Текст заголовка изменён', kind: 'text', selector: '#title', equals: 'Привет из JavaScript' },
        { label: 'Использован querySelector или getElementById', kind: 'source', lang: 'js', matches: 'querySelector|getElementById' },
        { label: 'Использован textContent', kind: 'source', lang: 'js', contains: 'textContent' },
        { label: 'В HTML текст не менялся', kind: 'source', lang: 'html', contains: 'Заголовок' }
      ],
      hints: ['document.querySelector("#title").textContent = "…";'],
      solution: { js: 'const title = document.querySelector("#title");\ntitle.textContent = "Привет из JavaScript";' }
    },
    {
      id: 'js-dom-2',
      title: 'Добавить класс',
      difficulty: 'easy',
      description: 'Добавьте абзацу `.text` класс `highlight` — он подсветит фон.',
      checks: [
        { label: 'У абзаца появился класс highlight', kind: 'custom', fn: "return ctx.$('.text').classList.contains('highlight') || 'Классы элемента: ' + ctx.$('.text').className;" },
        { label: 'Использован classList.add', kind: 'source', lang: 'js', contains: 'classList' },
        { label: 'Подсветка применилась', kind: 'style', selector: '.text', prop: 'background-color', equals: '#fde68a' },
        { label: 'Класс не дописан в HTML', kind: 'source', lang: 'html', notContains: 'highlight' }
      ],
      hints: ['element.classList.add("highlight");'],
      solution: { js: 'document.querySelector(".text").classList.add("highlight");' }
    },
    {
      id: 'js-dom-3',
      title: 'Создать элементы',
      difficulty: 'medium',
      description: 'Добавьте в список `#list` ещё три пункта — `Второй`, `Третий`, `Четвёртый` — создав их через `createElement`.',
      checks: [
        { label: 'В списке четыре пункта', kind: 'count', selector: '#list li', equals: 4 },
        { label: 'Тексты пунктов верные', kind: 'custom', fn: "const texts = ctx.$$('#list li').map((item) => ctx.text(item.textContent)); return JSON.stringify(texts) === '[\"Первый\",\"Второй\",\"Третий\",\"Четвёртый\"]' || 'Получено: ' + JSON.stringify(texts);" },
        { label: 'Использован createElement', kind: 'source', lang: 'js', contains: 'createElement' },
        { label: 'В HTML остался один пункт', kind: 'custom', fn: "const count = (ctx.source.html.match(/<li/g) || []).length; return count === 1 || 'В HTML тегов <li>: ' + count;" }
      ],
      hints: [
        'Три пункта удобно добавить циклом по массиву названий.',
        'list.append(item) добавляет элемент в конец.'
      ],
      solution: {
        js: 'const list = document.querySelector("#list");\n\nfor (const name of ["Второй", "Третий", "Четвёртый"]) {\n  const item = document.createElement("li");\n  item.textContent = name;\n  list.append(item);\n}'
      }
    },
    {
      id: 'js-dom-4',
      title: 'Перебор найденных элементов',
      difficulty: 'medium',
      description: 'Найдите все карточки `.card`, каждой добавьте класс `ready`, а в конец текста допишите номер вида ` #1`, ` #2`, ` #3`.',
      starter: {
        html: '<div class="card">Карточка</div>\n<div class="card">Карточка</div>\n<div class="card">Карточка</div>\n',
        css: '.card { padding: 12px; border: 1px solid #ccc; margin-bottom: 8px; }\n.ready { border-color: #16a34a; }\n',
        js: '// ваш код\n'
      },
      checks: [
        { label: 'Использован querySelectorAll', kind: 'source', lang: 'js', contains: 'querySelectorAll' },
        { label: 'У всех карточек класс ready', kind: 'count', selector: '.card.ready', equals: 3 },
        { label: 'Нумерация проставлена', kind: 'custom', fn: "const texts = ctx.$$('.card').map((card) => ctx.text(card.textContent)); return JSON.stringify(texts) === '[\"Карточка #1\",\"Карточка #2\",\"Карточка #3\"]' || 'Получено: ' + JSON.stringify(texts);" },
        { label: 'Использован перебор (forEach или for)', kind: 'source', lang: 'js', matches: 'forEach|for\\s*\\(' }
      ],
      hints: [
        'querySelectorAll возвращает NodeList — у него есть forEach с индексом.',
        'Индекс начинается с нуля, поэтому номер = index + 1.'
      ],
      solution: {
        js: 'document.querySelectorAll(".card").forEach((card, index) => {\n  card.classList.add("ready");\n  card.textContent += ` #${index + 1}`;\n});'
      }
    },
    {
      id: 'js-dom-5',
      title: 'Challenge: рендер списка из данных',
      difficulty: 'hard',
      description: 'В HTML есть только пустой `<ul id="menu">`. Постройте меню из массива `dishes`: для каждого блюда создайте `<li>` с классом `dish`, внутри — `<span class="name">` и `<span class="price">`. Недоступным блюдам добавьте класс `sold-out`.',
      starter: {
        html: '<h2>Меню</h2>\n<ul id="menu"></ul>\n',
        css: '.dish { display: flex; justify-content: space-between; padding: 6px 0; }\n.sold-out { opacity: .5; }\n',
        js: 'const dishes = [\n  { name: "Плов", price: 45000, available: true },\n  { name: "Лагман", price: 38000, available: true },\n  { name: "Шурпа", price: 32000, available: false },\n  { name: "Самса", price: 12000, available: true }\n];\n\n// постройте список\n'
      },
      checks: [
        { label: 'Создано четыре пункта', kind: 'count', selector: '#menu li.dish', equals: 4 },
        { label: 'У каждого пункта название и цена', kind: 'custom', fn: "const items = ctx.$$('#menu li.dish'); for (const item of items) { if (!item.querySelector('.name') || !item.querySelector('.price')) return 'В пункте нет .name или .price'; } return true;" },
        { label: 'Названия совпадают с данными', kind: 'custom', fn: "const names = ctx.$$('#menu .name').map((node) => ctx.text(node.textContent)); return JSON.stringify(names) === '[\"Плов\",\"Лагман\",\"Шурпа\",\"Самса\"]' || 'Получено: ' + JSON.stringify(names);" },
        { label: 'Цены выведены', kind: 'custom', fn: "const prices = ctx.$$('#menu .price').map((node) => ctx.text(node.textContent)); return prices.every((price) => /\\d/.test(price)) || 'Цены: ' + JSON.stringify(prices);" },
        { label: 'Недоступное блюдо помечено', kind: 'count', selector: '#menu li.sold-out', equals: 1 },
        { label: 'Помечено именно нужное блюдо', kind: 'custom', fn: "const node = ctx.$('#menu li.sold-out .name'); return (node && ctx.text(node.textContent) === 'Шурпа') || 'Класс sold-out стоит не на том блюде';" },
        { label: 'Разметка построена кодом, а не вписана в HTML', kind: 'source', lang: 'html', notContains: '<li' }
      ],
      hints: [
        'Переберите массив и на каждой итерации создавайте li, два span и добавляйте их внутрь.',
        'Класс по условию: if (!dish.available) item.classList.add("sold-out").'
      ],
      solution: {
        js: 'const dishes = [\n  { name: "Плов", price: 45000, available: true },\n  { name: "Лагман", price: 38000, available: true },\n  { name: "Шурпа", price: 32000, available: false },\n  { name: "Самса", price: 12000, available: true }\n];\n\nconst menu = document.querySelector("#menu");\n\ndishes.forEach((dish) => {\n  const item = document.createElement("li");\n  item.className = "dish";\n  if (!dish.available) item.classList.add("sold-out");\n\n  const name = document.createElement("span");\n  name.className = "name";\n  name.textContent = dish.name;\n\n  const price = document.createElement("span");\n  price.className = "price";\n  price.textContent = `${dish.price} сум`;\n\n  item.append(name, price);\n  menu.append(item);\n});'
      }
    }
  ]
};

const lesson28 = {
  id: 'js-events',
  title: 'События',
  summary: 'addEventListener, объект события и делегирование.',
  editors: ['html', 'css', 'js'],
  theory: [
    { lead: 'Событие — это то, что происходит на странице: клик, ввод текста, нажатие клавиши. Код подписывается на событие и реагирует.' },
    { code: 'const button = document.querySelector("#btn");\n\nbutton.addEventListener("click", () => {\n  console.log("Кнопку нажали");\n});' },
    { h: 'Частые события' },
    { table: { head: ['Событие', 'Когда происходит'], rows: [
      ['`click`', 'Клик мышью или касание'],
      ['`input`', 'Каждое изменение в поле'],
      ['`change`', 'Поле потеряло фокус с новым значением'],
      ['`submit`', 'Отправка формы'],
      ['`keydown`', 'Нажата клавиша'],
      ['`mouseenter` / `mouseleave`', 'Курсор вошёл / вышел']
    ] } },
    { h: 'Объект события' },
    { code: 'element.addEventListener("click", (event) => {\n  console.log(event.target);   // на чём именно кликнули\n  event.preventDefault();      // отменить действие по умолчанию\n  event.stopPropagation();     // не пускать событие выше\n});' },
    { h: 'Делегирование' },
    { p: 'Вместо того чтобы вешать обработчик на каждый элемент списка, подписывают **родителя** и смотрят на `event.target`. Так работают даже элементы, добавленные позже.' },
    { code: 'list.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n});' },
    { note: 'В playground клики умеет делать и сама проверка — она нажимает на элементы и смотрит, что изменилось.' }
  ],
  starter: {
    html: '<button id="btn">Нажми меня</button>\n<p id="output">Пока ничего не произошло</p>\n',
    css: '#output { font-weight: 600; }\n',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-events-1',
      title: 'Первый обработчик',
      difficulty: 'easy',
      description: 'По клику на кнопку `#btn` текст в `#output` должен меняться на `Кнопка нажата`.',
      checks: [
        { label: 'Использован addEventListener', kind: 'source', lang: 'js', contains: 'addEventListener' },
        { label: 'До клика текст не менялся', kind: 'text', selector: '#output', contains: 'Пока ничего' },
        {
          label: 'После клика текст меняется',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#btn' }],
          then: [{ label: 'Текст обновился', kind: 'text', selector: '#output', equals: 'Кнопка нажата' }]
        }
      ],
      hints: ['button.addEventListener("click", () => { … });'],
      solution: {
        js: 'const button = document.querySelector("#btn");\nconst output = document.querySelector("#output");\n\nbutton.addEventListener("click", () => {\n  output.textContent = "Кнопка нажата";\n});'
      }
    },
    {
      id: 'js-events-2',
      title: 'Счётчик кликов',
      difficulty: 'easy',
      description: 'Считайте клики: после каждого нажатия в `#output` должно быть `Кликов: N`.',
      checks: [
        {
          label: 'После первого клика — «Кликов: 1»',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#btn' }],
          then: [{ label: 'Счётчик равен 1', kind: 'text', selector: '#output', equals: 'Кликов: 1' }]
        },
        {
          label: 'После трёх кликов — «Кликов: 3»',
          kind: 'interact',
          steps: [
            { do: 'click', selector: '#btn' },
            { do: 'click', selector: '#btn' },
            { do: 'click', selector: '#btn' }
          ],
          then: [{ label: 'Счётчик равен 3', kind: 'text', selector: '#output', equals: 'Кликов: 3' }]
        },
        { label: 'Счётчик хранится в переменной', kind: 'source', lang: 'js', matches: 'let\\s+\\w+\\s*=\\s*0' }
      ],
      hints: ['Заведите переменную вне обработчика и увеличивайте её внутри.'],
      solution: {
        js: 'let clicks = 0;\nconst output = document.querySelector("#output");\n\ndocument.querySelector("#btn").addEventListener("click", () => {\n  clicks++;\n  output.textContent = `Кликов: ${clicks}`;\n});'
      }
    },
    {
      id: 'js-events-3',
      title: 'Живой ввод',
      difficulty: 'medium',
      description: 'При вводе текста в поле `#name` подпись `#greeting` должна сразу показывать `Привет, <текст>!`, а на пустом поле — `Введите имя`.',
      starter: {
        html: '<input id="name" type="text" placeholder="Ваше имя">\n<p id="greeting">Введите имя</p>\n',
        css: '',
        js: '// ваш код\n'
      },
      checks: [
        { label: 'Использовано событие input', kind: 'source', lang: 'js', matches: '["\\\']input["\\\']' },
        {
          label: 'При вводе имени появляется приветствие',
          kind: 'interact',
          steps: [{ do: 'type', selector: '#name', value: 'Алиса' }],
          then: [{ label: 'Текст обновился', kind: 'text', selector: '#greeting', equals: 'Привет, Алиса!' }]
        },
        {
          label: 'Пустое поле возвращает подсказку',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Боб' },
            { do: 'type', selector: '#name', value: '' }
          ],
          then: [{ label: 'Показана подсказка', kind: 'text', selector: '#greeting', equals: 'Введите имя' }]
        }
      ],
      hints: ['event.target.value — то, что сейчас в поле.'],
      solution: {
        js: 'const field = document.querySelector("#name");\nconst greeting = document.querySelector("#greeting");\n\nfield.addEventListener("input", (event) => {\n  const value = event.target.value.trim();\n  greeting.textContent = value ? `Привет, ${value}!` : "Введите имя";\n});'
      }
    },
    {
      id: 'js-events-4',
      title: 'Делегирование',
      difficulty: 'medium',
      description: 'Один обработчик на списке `#tasks`: клик по пункту переключает у него класс `done`. Обработчиков должно быть ровно один — на списке, а не на каждом пункте.',
      starter: {
        html: '<ul id="tasks">\n  <li>Купить кофе</li>\n  <li>Написать код</li>\n  <li>Проверить задачи</li>\n</ul>\n',
        css: '.done { text-decoration: line-through; opacity: .6; }\n',
        js: '// ваш код\n'
      },
      checks: [
        { label: 'Обработчик повешен на список', kind: 'source', lang: 'js', matches: '#tasks["\\\']\\s*\\)[\\s\\S]{0,40}addEventListener|tasks\\.addEventListener' },
        { label: 'Использован event.target', kind: 'source', lang: 'js', contains: 'target' },
        {
          label: 'Клик по пункту отмечает его',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#tasks li:nth-child(2)' }],
          then: [{ label: 'Второй пункт отмечен', kind: 'exists', selector: '#tasks li:nth-child(2).done' }]
        },
        {
          label: 'Повторный клик снимает отметку',
          kind: 'interact',
          steps: [
            { do: 'click', selector: '#tasks li:first-child' },
            { do: 'click', selector: '#tasks li:first-child' }
          ],
          then: [{ label: 'Отметка снята', kind: 'absent', selector: '#tasks li:first-child.done' }]
        },
        { label: 'Обработчик добавлен один раз', kind: 'custom', fn: "const count = (ctx.source.js.match(/addEventListener/g) || []).length; return count === 1 || 'Вызовов addEventListener: ' + count;" }
      ],
      hints: [
        'event.target.closest("li") найдёт нужный пункт, даже если кликнули по вложенному элементу.',
        'classList.toggle сам добавляет или убирает класс.'
      ],
      solution: {
        js: 'const tasks = document.querySelector("#tasks");\n\ntasks.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n});'
      }
    },
    {
      id: 'js-events-5',
      title: 'Challenge: список дел',
      difficulty: 'hard',
      description: 'Соберите мини-приложение: по кнопке «Добавить» текст из поля превращается в новый пункт списка, клик по пункту отмечает его выполненным, счётчик `#counter` показывает `Осталось: N`. Пустую строку добавлять нельзя.',
      starter: {
        html: '<input id="new-task" type="text" placeholder="Что нужно сделать?">\n<button id="add">Добавить</button>\n<ul id="list"></ul>\n<p id="counter">Осталось: 0</p>\n',
        css: '.done { text-decoration: line-through; opacity: .6; }\n',
        js: '// ваш код\n'
      },
      checks: [
        {
          label: 'Задача добавляется в список',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Купить кофе' },
            { do: 'click', selector: '#add' }
          ],
          then: [
            { label: 'Появился пункт', kind: 'count', selector: '#list li', equals: 1 },
            { label: 'С нужным текстом', kind: 'text', selector: '#list li', contains: 'Купить кофе' }
          ]
        },
        {
          label: 'Поле очищается после добавления',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Написать код' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Поле пустое', kind: 'prop', selector: '#new-task', name: 'value', equals: '' }]
        },
        {
          label: 'Пустая строка не добавляется',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#new-task', value: '   ' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Список остался пустым', kind: 'count', selector: '#list li', equals: 0 }]
        },
        {
          label: 'Счётчик считает невыполненные',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Раз' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#new-task', value: 'Два' },
            { do: 'click', selector: '#add' }
          ],
          then: [{ label: 'Осталось: 2', kind: 'text', selector: '#counter', equals: 'Осталось: 2' }]
        },
        {
          label: 'Отметка выполнения уменьшает счётчик',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#new-task', value: 'Раз' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#new-task', value: 'Два' },
            { do: 'click', selector: '#add' },
            { do: 'click', selector: '#list li:first-child' }
          ],
          then: [
            { label: 'Пункт отмечен', kind: 'exists', selector: '#list li.done' },
            { label: 'Осталось: 1', kind: 'text', selector: '#counter', equals: 'Осталось: 1' }
          ]
        }
      ],
      hints: [
        'Функция updateCounter() пересчитывает `#list li:not(.done)` и обновляет текст.',
        'Вызывайте её и после добавления, и после клика по пункту.'
      ],
      solution: {
        js: 'const field = document.querySelector("#new-task");\nconst addButton = document.querySelector("#add");\nconst list = document.querySelector("#list");\nconst counter = document.querySelector("#counter");\n\nfunction updateCounter() {\n  const left = list.querySelectorAll("li:not(.done)").length;\n  counter.textContent = `Осталось: ${left}`;\n}\n\naddButton.addEventListener("click", () => {\n  const text = field.value.trim();\n  if (!text) return;\n\n  const item = document.createElement("li");\n  item.textContent = text;\n  list.append(item);\n\n  field.value = "";\n  updateCounter();\n});\n\nlist.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (!item) return;\n  item.classList.toggle("done");\n  updateCounter();\n});'
      }
    }
  ]
};

const lesson29 = {
  id: 'js-forms',
  title: 'Формы и валидация',
  summary: 'submit, preventDefault, чтение значений и проверка данных.',
  editors: ['html', 'css', 'js'],
  theory: [
    { lead: 'Форма по умолчанию перезагружает страницу. В современных интерфейсах это отменяют и обрабатывают данные скриптом.' },
    { code: 'form.addEventListener("submit", (event) => {\n  event.preventDefault();          // не перезагружать страницу\n  const data = new FormData(form);  // все поля разом\n  console.log(data.get("email"));\n});' },
    { h: 'Чтение значений' },
    { code: 'input.value            // текст поля\ncheckbox.checked       // true / false\nselect.value           // выбранный вариант\nform.elements.email    // поле по атрибуту name' },
    { h: 'Проверка данных' },
    { code: 'if (!email.includes("@")) {\n  error.textContent = "Введите корректную почту";\n  return;\n}' },
    { h: 'Встроенная валидация' },
    { p: 'Браузер умеет проверять сам: `required`, `minlength`, `type="email"`, `pattern`. Свойство `input.validity.valid` показывает результат, а `form.checkValidity()` проверяет всю форму.' },
    { warn: 'Проверка на стороне браузера — это удобство, а не безопасность. Сервер обязан проверять данные заново.' }
  ],
  starter: {
    html: '<form id="form">\n  <label for="email">Почта</label>\n  <input id="email" name="email" type="text">\n  <button type="submit">Отправить</button>\n</form>\n<p id="message"></p>\n',
    css: '.error { color: #d64545; }\n.success { color: #0f9d68; }\n',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-forms-1',
      title: 'Перехват отправки',
      difficulty: 'easy',
      description: 'Перехватите отправку формы: отмените перезагрузку и выведите в `#message` текст `Форма отправлена`.',
      checks: [
        { label: 'Обработчик события submit', kind: 'source', lang: 'js', matches: '["\\\']submit["\\\']' },
        { label: 'Вызван preventDefault', kind: 'source', lang: 'js', contains: 'preventDefault' },
        {
          label: 'После отправки появляется сообщение',
          kind: 'interact',
          steps: [{ do: 'click', selector: 'button[type="submit"]' }],
          then: [{ label: 'Текст сообщения верный', kind: 'text', selector: '#message', equals: 'Форма отправлена' }]
        }
      ],
      hints: ['form.addEventListener("submit", (event) => { event.preventDefault(); … });'],
      solution: {
        js: 'const form = document.querySelector("#form");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  message.textContent = "Форма отправлена";\n});'
      }
    },
    {
      id: 'js-forms-2',
      title: 'Чтение значения',
      difficulty: 'easy',
      description: 'При отправке выведите в `#message` строку `Почта: <введённое значение>`.',
      checks: [
        {
          label: 'Значение поля попадает в сообщение',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#email', value: 'user@mail.com' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Сообщение верное', kind: 'text', selector: '#message', equals: 'Почта: user@mail.com' }]
        },
        {
          label: 'Работает с другим значением',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#email', value: 'test@site.uz' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Сообщение обновилось', kind: 'text', selector: '#message', contains: 'test@site.uz' }]
        },
        { label: 'Использовано свойство value', kind: 'source', lang: 'js', contains: '.value' }
      ],
      hints: ['document.querySelector("#email").value'],
      solution: {
        js: 'const form = document.querySelector("#form");\nconst email = document.querySelector("#email");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  message.textContent = `Почта: ${email.value}`;\n});'
      }
    },
    {
      id: 'js-forms-3',
      title: 'Простая валидация',
      difficulty: 'medium',
      description: 'Проверяйте почту: если в значении нет символа `@`, покажите в `#message` текст `Некорректная почта` и класс `error`; иначе — `Готово` и класс `success`.',
      checks: [
        {
          label: 'Некорректное значение отклоняется',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#email', value: 'просто-текст' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [
            { label: 'Показана ошибка', kind: 'text', selector: '#message', equals: 'Некорректная почта' },
            { label: 'Добавлен класс error', kind: 'exists', selector: '#message.error' }
          ]
        },
        {
          label: 'Корректное значение принимается',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#email', value: 'user@mail.com' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [
            { label: 'Показан успех', kind: 'text', selector: '#message', equals: 'Готово' },
            { label: 'Добавлен класс success', kind: 'exists', selector: '#message.success' },
            { label: 'Класс error снят', kind: 'absent', selector: '#message.error' }
          ]
        },
        { label: 'Проверка написана в коде', kind: 'source', lang: 'js', matches: 'includes\\(|indexOf\\(|@' }
      ],
      hints: [
        'classList.remove("error") перед добавлением "success" — иначе останутся оба класса.',
        'value.includes("@")'
      ],
      solution: {
        js: 'const form = document.querySelector("#form");\nconst email = document.querySelector("#email");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const value = email.value.trim();\n\n  if (!value.includes("@")) {\n    message.textContent = "Некорректная почта";\n    message.classList.add("error");\n    message.classList.remove("success");\n    return;\n  }\n\n  message.textContent = "Готово";\n  message.classList.add("success");\n  message.classList.remove("error");\n});'
      }
    },
    {
      id: 'js-forms-4',
      title: 'Несколько полей',
      difficulty: 'medium',
      description: 'Проверьте форму регистрации: имя — не короче 2 символов, пароль — не короче 8, галочка согласия обязательна. При ошибке покажите её текст в `#message`, при успехе — `Регистрация завершена`.',
      starter: {
        html: '<form id="form">\n  <input id="name" name="name" type="text" placeholder="Имя">\n  <input id="password" name="password" type="password" placeholder="Пароль">\n  <label><input id="agree" type="checkbox"> Согласен</label>\n  <button type="submit">Отправить</button>\n</form>\n<p id="message"></p>\n',
        css: '.error { color: #d64545; }\n',
        js: '// ваш код\n'
      },
      checks: [
        {
          label: 'Короткое имя отклоняется',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'А' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Есть сообщение об ошибке имени', kind: 'text', selector: '#message', matches: 'имя|Имя' }]
        },
        {
          label: 'Короткий пароль отклоняется',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Алиса' },
            { do: 'type', selector: '#password', value: '123' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Есть сообщение о пароле', kind: 'text', selector: '#message', matches: 'парол' }]
        },
        {
          label: 'Без согласия форма не проходит',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Алиса' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Сообщение не об успехе', kind: 'text', selector: '#message', notContains: 'Регистрация завершена' }]
        },
        {
          label: 'Корректные данные проходят',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Алиса' },
            { do: 'type', selector: '#password', value: 'longpassword' },
            { do: 'check', selector: '#agree' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Показан успех', kind: 'text', selector: '#message', equals: 'Регистрация завершена' }]
        },
        { label: 'Проверено состояние чекбокса', kind: 'source', lang: 'js', contains: 'checked' }
      ],
      hints: [
        'Проверки удобно выстроить в цепочку: первая же ошибка — сообщение и return.',
        'Длина строки — value.trim().length.'
      ],
      solution: {
        js: 'const form = document.querySelector("#form");\nconst message = document.querySelector("#message");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const name = document.querySelector("#name").value.trim();\n  const password = document.querySelector("#password").value;\n  const agree = document.querySelector("#agree").checked;\n\n  if (name.length < 2) {\n    message.textContent = "Имя слишком короткое";\n    return;\n  }\n  if (password.length < 8) {\n    message.textContent = "Пароль короче 8 символов";\n    return;\n  }\n  if (!agree) {\n    message.textContent = "Нужно согласие с условиями";\n    return;\n  }\n\n  message.textContent = "Регистрация завершена";\n});'
      }
    },
    {
      id: 'js-forms-5',
      title: 'Challenge: форма заказа с итогом',
      difficulty: 'hard',
      description: 'Форма заказа: при изменении количества или тарифа сразу пересчитывайте итог в `#total` (`Start` — 100000, `Pro` — 250000, умножается на количество). При отправке проверьте имя и телефон (минимум 9 цифр) и покажите результат в `#message`.',
      starter: {
        html: '<form id="order">\n  <input id="name" type="text" placeholder="Имя">\n  <input id="phone" type="tel" placeholder="Телефон">\n  <select id="plan">\n    <option value="start">Start</option>\n    <option value="pro">Pro</option>\n  </select>\n  <input id="qty" type="number" value="1" min="1">\n  <p id="total">Итого: 100000</p>\n  <button type="submit">Заказать</button>\n</form>\n<p id="message"></p>\n',
        css: '.error { color: #d64545; }\n',
        js: 'const PRICES = { start: 100000, pro: 250000 };\n\n// ваш код\n'
      },
      checks: [
        {
          label: 'Изменение количества пересчитывает итог',
          kind: 'interact',
          steps: [{ do: 'type', selector: '#qty', value: '3' }],
          then: [{ label: 'Итого: 300000', kind: 'text', selector: '#total', equals: 'Итого: 300000' }]
        },
        {
          label: 'Смена тарифа пересчитывает итог',
          kind: 'interact',
          steps: [
            { do: 'select', selector: '#plan', value: 'pro' },
            { do: 'type', selector: '#qty', value: '2' }
          ],
          then: [{ label: 'Итого: 500000', kind: 'text', selector: '#total', equals: 'Итого: 500000' }]
        },
        {
          label: 'Короткий телефон отклоняется',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Алиса' },
            { do: 'type', selector: '#phone', value: '12345' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Есть сообщение об ошибке', kind: 'text', selector: '#message', matches: '\\S' },
                  { label: 'Это не успех', kind: 'text', selector: '#message', notContains: 'Заказ принят' }]
        },
        {
          label: 'Корректный заказ принимается',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#name', value: 'Алиса' },
            { do: 'type', selector: '#phone', value: '+998901234567' },
            { do: 'click', selector: 'button[type="submit"]' }
          ],
          then: [{ label: 'Показан успех', kind: 'text', selector: '#message', contains: 'Заказ принят' }]
        },
        { label: 'Телефон проверяется по количеству цифр', kind: 'source', lang: 'js', matches: 'replace\\(|match\\(|\\\\d' },
        { label: 'Итог считается из PRICES', kind: 'source', lang: 'js', contains: 'PRICES' }
      ],
      hints: [
        'Количество цифр: phone.replace(/\\D/g, "").length.',
        'Одну функцию расчёта можно подписать сразу на оба поля: input и change.'
      ],
      solution: {
        js: 'const PRICES = { start: 100000, pro: 250000 };\n\nconst form = document.querySelector("#order");\nconst plan = document.querySelector("#plan");\nconst qty = document.querySelector("#qty");\nconst total = document.querySelector("#total");\nconst message = document.querySelector("#message");\n\nfunction recalculate() {\n  const sum = PRICES[plan.value] * Number(qty.value || 0);\n  total.textContent = `Итого: ${sum}`;\n}\n\nplan.addEventListener("change", recalculate);\nqty.addEventListener("input", recalculate);\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const name = document.querySelector("#name").value.trim();\n  const digits = document.querySelector("#phone").value.replace(/\\D/g, "");\n\n  if (name.length < 2) {\n    message.textContent = "Укажите имя";\n    return;\n  }\n  if (digits.length < 9) {\n    message.textContent = "Телефон должен содержать минимум 9 цифр";\n    return;\n  }\n\n  message.textContent = "Заказ принят";\n});'
      }
    }
  ]
};

const lesson30 = {
  id: 'js-localstorage',
  title: 'LocalStorage',
  summary: 'Сохранение данных в браузере между перезагрузками.',
  editors: ['html', 'css', 'js'],
  theory: [
    { lead: '`localStorage` — маленькое хранилище «ключ — значение» прямо в браузере. Данные переживают перезагрузку страницы.' },
    { code: 'localStorage.setItem("theme", "dark");\nlocalStorage.getItem("theme");    // "dark"\nlocalStorage.removeItem("theme");\nlocalStorage.clear();' },
    { warn: 'Хранилище умеет только строки. Число `5` вернётся как `"5"`, а объект превратится в `[object Object]`.' },
    { h: 'Объекты и массивы' },
    { code: 'const cart = [{ id: 1, qty: 2 }];\n\nlocalStorage.setItem("cart", JSON.stringify(cart));\nconst saved = JSON.parse(localStorage.getItem("cart") || "[]");' },
    { h: 'Чего там быть не должно' },
    { p: 'Пароли, токены, персональные данные: хранилище доступно любому скрипту на странице. Туда кладут настройки интерфейса, черновики, корзину.' },
    { note: 'В playground хранилище сохраняется между запусками урока, а кнопка «Сброс» очищает и его.' }
  ],
  starter: {
    html: '<input id="draft" type="text" placeholder="Черновик">\n<button id="save">Сохранить</button>\n<p id="status"></p>\n',
    css: '',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-localstorage-1',
      title: 'Сохранить значение',
      difficulty: 'easy',
      description: 'Сохраните в localStorage ключ `theme` со значением `dark` и выведите прочитанное значение в консоль.',
      checks: [
        { label: 'Использован setItem', kind: 'source', lang: 'js', contains: 'setItem' },
        { label: 'В хранилище есть theme = dark', kind: 'storage', key: 'theme', equals: 'dark' },
        { label: 'Значение прочитано через getItem', kind: 'source', lang: 'js', contains: 'getItem' },
        { label: 'Значение выведено в консоль', kind: 'console', contains: 'dark' }
      ],
      hints: ['localStorage.setItem("theme", "dark");'],
      solution: {
        js: 'localStorage.setItem("theme", "dark");\nconsole.log(localStorage.getItem("theme"));'
      }
    },
    {
      id: 'js-localstorage-2',
      title: 'Сохранение черновика',
      difficulty: 'easy',
      description: 'По клику на «Сохранить» кладите текст поля `#draft` в localStorage под ключом `draft` и показывайте в `#status` текст `Сохранено`.',
      checks: [
        {
          label: 'Текст сохраняется в хранилище',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#draft', value: 'моя заметка' },
            { do: 'click', selector: '#save' }
          ],
          then: [
            { label: 'В хранилище есть заметка', kind: 'storage', key: 'draft', equals: 'моя заметка' },
            { label: 'Показан статус', kind: 'text', selector: '#status', equals: 'Сохранено' }
          ]
        },
        { label: 'Используется ключ draft', kind: 'source', lang: 'js', matches: '["\\\']draft["\\\']' }
      ],
      hints: ['Значение поля берётся так же, как в уроке про формы: field.value.'],
      solution: {
        js: 'const field = document.querySelector("#draft");\nconst status = document.querySelector("#status");\n\ndocument.querySelector("#save").addEventListener("click", () => {\n  localStorage.setItem("draft", field.value);\n  status.textContent = "Сохранено";\n});'
      }
    },
    {
      id: 'js-localstorage-3',
      title: 'Восстановление при загрузке',
      difficulty: 'medium',
      description: 'В хранилище уже лежит черновик (ключ `draft`). При запуске страницы подставьте его в поле и напишите в `#status` текст `Черновик восстановлен`. Если сохранённого нет — поле остаётся пустым, а в статусе `Черновик пуст`.',
      sandbox: { storageSeed: { draft: 'недописанная заметка' } },
      checks: [
        { label: 'Значение читается при старте', kind: 'source', lang: 'js', contains: 'getItem' },
        { label: 'Черновик подставлен в поле', kind: 'prop', selector: '#draft', name: 'value', equals: 'недописанная заметка' },
        { label: 'Показан статус восстановления', kind: 'text', selector: '#status', equals: 'Черновик восстановлен' },
        { label: 'Пустой случай тоже обработан', kind: 'source', lang: 'js', contains: 'Черновик пуст' },
        { label: 'Проверка «есть ли значение» написана', kind: 'source', lang: 'js', matches: 'if\\s*\\(|\\?\\?|\\|\\|' }
      ],
      hints: [
        'getItem возвращает null, если ключа нет.',
        'Код восстановления пишется вне обработчиков — он выполняется сразу.'
      ],
      solution: {
        js: 'const field = document.querySelector("#draft");\nconst status = document.querySelector("#status");\n\nconst saved = localStorage.getItem("draft");\n\nif (saved) {\n  field.value = saved;\n  status.textContent = "Черновик восстановлен";\n} else {\n  status.textContent = "Черновик пуст";\n}\n\ndocument.querySelector("#save").addEventListener("click", () => {\n  localStorage.setItem("draft", field.value);\n  status.textContent = "Сохранено";\n});'
      }
    },
    {
      id: 'js-localstorage-4',
      title: 'Массив в хранилище',
      difficulty: 'medium',
      description: 'Сохраняйте список задач как JSON: по клику на «Добавить» новая задача попадает в массив, массив пишется в ключ `tasks`, а список перерисовывается.',
      starter: {
        html: '<input id="task" type="text" placeholder="Задача">\n<button id="add">Добавить</button>\n<ul id="list"></ul>\n',
        css: '',
        js: '// ваш код\n'
      },
      checks: [
        { label: 'Используется JSON.stringify', kind: 'source', lang: 'js', contains: 'JSON.stringify' },
        { label: 'Используется JSON.parse', kind: 'source', lang: 'js', contains: 'JSON.parse' },
        {
          label: 'Задача сохраняется в хранилище',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#task', value: 'Купить кофе' },
            { do: 'click', selector: '#add' }
          ],
          then: [
            { label: 'В хранилище есть задача', kind: 'storage', key: 'tasks', contains: 'Купить кофе' },
            { label: 'Задача видна в списке', kind: 'count', selector: '#list li', min: 1 }
          ]
        },
        {
          label: 'Хранится именно массив',
          kind: 'interact',
          steps: [
            { do: 'type', selector: '#task', value: 'Раз' },
            { do: 'click', selector: '#add' },
            { do: 'type', selector: '#task', value: 'Два' },
            { do: 'click', selector: '#add' }
          ],
          then: [{
            label: 'В массиве две задачи',
            kind: 'custom',
            fn: "const raw = localStorage.getItem('tasks'); let data; try { data = JSON.parse(raw); } catch (error) { return 'В хранилище не JSON: ' + raw; } if (!Array.isArray(data)) return 'Ожидался массив, получено: ' + raw; return data.length >= 2 || 'В массиве элементов: ' + data.length;"
          }]
        }
      ],
      hints: [
        'Читайте так: JSON.parse(localStorage.getItem("tasks") || "[]").',
        'После изменения массива перерисуйте список целиком — это проще, чем дописывать по одному.'
      ],
      solution: {
        js: 'const field = document.querySelector("#task");\nconst list = document.querySelector("#list");\n\nfunction load() {\n  return JSON.parse(localStorage.getItem("tasks") || "[]");\n}\n\nfunction render() {\n  list.innerHTML = "";\n  load().forEach((task) => {\n    const item = document.createElement("li");\n    item.textContent = task;\n    list.append(item);\n  });\n}\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  const text = field.value.trim();\n  if (!text) return;\n\n  const tasks = load();\n  tasks.push(text);\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n\n  field.value = "";\n  render();\n});\n\nrender();'
      }
    },
    {
      id: 'js-localstorage-5',
      title: 'Challenge: переключатель темы',
      difficulty: 'hard',
      description: 'Кнопка `#toggle` переключает класс `dark` у `<body>` и запоминает выбор в ключе `theme`. При загрузке тема восстанавливается, а текст кнопки показывает текущее состояние: `Тёмная тема` / `Светлая тема`.',
      starter: {
        html: '<button id="toggle">Тёмная тема</button>\n<p>Содержимое страницы</p>\n',
        css: 'body { background: #ffffff; color: #16203a; transition: background .2s, color .2s; }\nbody.dark { background: #0b1020; color: #e5e9f5; }\n',
        js: '// ваш код\n'
      },
      checks: [
        {
          label: 'Клик включает тёмную тему',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#toggle' }],
          then: [
            { label: 'У body есть класс dark', kind: 'exists', selector: 'body.dark' },
            { label: 'Выбор сохранён', kind: 'storage', key: 'theme', equals: 'dark' }
          ]
        },
        {
          label: 'Повторный клик возвращает светлую тему',
          kind: 'interact',
          steps: [
            { do: 'click', selector: '#toggle' },
            { do: 'click', selector: '#toggle' }
          ],
          then: [
            { label: 'Класс dark снят', kind: 'absent', selector: 'body.dark' },
            { label: 'В хранилище light', kind: 'storage', key: 'theme', equals: 'light' }
          ]
        },
        {
          label: 'Текст кнопки меняется',
          kind: 'interact',
          steps: [{ do: 'click', selector: '#toggle' }],
          then: [{ label: 'Кнопка предлагает вернуть светлую тему', kind: 'text', selector: '#toggle', contains: 'Светлая' }]
        },
        { label: 'Тема восстанавливается при загрузке', kind: 'source', lang: 'js', matches: 'getItem\\(\\s*["\\\']theme' },
        { label: 'Использован classList', kind: 'source', lang: 'js', contains: 'classList' }
      ],
      hints: [
        'classList.toggle возвращает true, если класс добавлен — это удобно для сохранения.',
        'Одну функцию applyTheme(theme) можно вызывать и при загрузке, и по клику.'
      ],
      solution: {
        js: 'const button = document.querySelector("#toggle");\n\nfunction applyTheme(theme) {\n  const isDark = theme === "dark";\n  document.body.classList.toggle("dark", isDark);\n  button.textContent = isDark ? "Светлая тема" : "Тёмная тема";\n  localStorage.setItem("theme", isDark ? "dark" : "light");\n}\n\napplyTheme(localStorage.getItem("theme") || "light");\n\nbutton.addEventListener("click", () => {\n  const next = document.body.classList.contains("dark") ? "light" : "dark";\n  applyTheme(next);\n});'
      }
    }
  ]
};

const API_USERS = [
  { id: 1, name: 'Алиса', city: 'Ташкент', active: true },
  { id: 2, name: 'Боб', city: 'Самарканд', active: false },
  { id: 3, name: 'Карим', city: 'Ташкент', active: true },
  { id: 4, name: 'Дина', city: 'Бухара', active: true }
];

const API_SANDBOX = {
  mockApi: {
    '/api/users': { json: API_USERS, delayMs: 80 },
    '/api/users/1': { json: API_USERS[0], delayMs: 60 },
    '/api/stats': { json: { users: 4, orders: 17, revenue: 890000 }, delayMs: 60 },
    '/api/orders': { json: [{ id: 11, userId: 1, total: 45000 }, { id: 12, userId: 3, total: 120000 }], delayMs: 120 },
    '/api/missing': { status: 404, json: { error: 'not found' }, delayMs: 40 },
    '/api/broken': { status: 500, json: { error: 'server error' }, delayMs: 40 }
  }
};

const lesson31 = {
  id: 'js-fetch',
  title: 'Fetch и API',
  summary: 'Запросы к серверу, разбор JSON и обработка ошибок.',
  editors: ['html', 'css', 'js'],
  sandbox: API_SANDBOX,
  theory: [
    { lead: 'Большинство данных страница получает не из HTML, а запросом к серверу. Этим занимается `fetch`.' },
    { code: 'fetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    console.log(users.length);\n  })\n  .catch((error) => {\n    console.error("Ошибка сети", error);\n  });' },
    { h: 'Что важно понять' },
    { ul: [
      '`fetch` возвращает **промис** — обещание, что ответ придёт позже;',
      '`response.json()` — тоже промис, поэтому нужен второй `.then`;',
      '`response.ok` равен `false` при статусах 4xx и 5xx, но `catch` при этом **не** срабатывает — ошибку сервера проверяют вручную.'
    ] },
    { code: 'fetch("/api/missing")\n  .then((response) => {\n    if (!response.ok) throw new Error(`Статус ${response.status}`);\n    return response.json();\n  })\n  .catch((error) => console.log(error.message));' },
    { note: 'В песочнице доступны учебные адреса: `/api/users`, `/api/users/1`, `/api/stats`, `/api/orders`, `/api/missing` (404), `/api/broken` (500). Настоящая сеть отключена.' }
  ],
  starter: {
    html: '<h2>Пользователи</h2>\n<ul id="users"></ul>\n<p id="status"></p>\n',
    css: '',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-fetch-1',
      title: 'Первый запрос',
      difficulty: 'easy',
      description: 'Запросите `/api/users`, разберите JSON и выведите в консоль количество пользователей.',
      checks: [
        { label: 'Использован fetch', kind: 'source', lang: 'js', contains: 'fetch(' },
        { label: 'Ответ разобран через .json()', kind: 'source', lang: 'js', contains: '.json()' },
        { label: 'В консоли есть число 4', kind: 'console', matches: '(^|\\D)4(\\D|$)', waitMs: 2000 },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: ['fetch("/api/users").then((response) => response.json()).then((users) => …)'],
      solution: {
        js: 'fetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    console.log(users.length);\n  });'
      }
    },
    {
      id: 'js-fetch-2',
      title: 'Вывод данных на страницу',
      difficulty: 'easy',
      description: 'Получите пользователей и покажите их в списке `#users`: по одному `<li>` на человека с текстом `Имя — Город`.',
      checks: [
        { label: 'Создано четыре пункта', kind: 'count', selector: '#users li', equals: 4, waitMs: 2000 },
        { label: 'Первый пункт — Алиса — Ташкент', kind: 'custom', waitMs: 2000, fn: "const item = ctx.$('#users li'); return (item && ctx.text(item.textContent) === 'Алиса — Ташкент') || 'Получено: ' + (item ? ctx.text(item.textContent) : 'пусто');" },
        { label: 'Список построен из данных', kind: 'source', lang: 'html', notContains: '<li' },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: ['Перебирайте массив методом forEach внутри второго .then.'],
      solution: {
        js: 'const list = document.querySelector("#users");\n\nfetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    users.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = `${user.name} — ${user.city}`;\n      list.append(item);\n    });\n  });'
      }
    },
    {
      id: 'js-fetch-3',
      title: 'Ошибка 404',
      difficulty: 'medium',
      description: 'Запросите несуществующий адрес `/api/missing`. Проверьте `response.ok` и покажите в `#status` текст `Ошибка: 404`.',
      checks: [
        { label: 'Проверен response.ok или status', kind: 'source', lang: 'js', matches: 'response\\.ok|\\.status' },
        { label: 'Сообщение об ошибке показано', kind: 'text', selector: '#status', equals: 'Ошибка: 404', waitMs: 2000 },
        { label: 'Использован catch или обработка ошибки', kind: 'source', lang: 'js', matches: 'catch|if\\s*\\(' },
        { label: 'Страница не сломалась', kind: 'exists', selector: '#users' }
      ],
      hints: [
        'response.status содержит код ответа.',
        'throw new Error(...) внутри then попадёт в catch.'
      ],
      solution: {
        js: 'const status = document.querySelector("#status");\n\nfetch("/api/missing")\n  .then((response) => {\n    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);\n    return response.json();\n  })\n  .catch((error) => {\n    status.textContent = error.message;\n  });'
      }
    },
    {
      id: 'js-fetch-4',
      title: 'Индикатор загрузки',
      difficulty: 'medium',
      description: 'Перед запросом покажите в `#status` текст `Загрузка…`, после успешного ответа — `Загружено: 4`, а данные выведите в список.',
      checks: [
        { label: 'Индикатор описан в коде', kind: 'source', lang: 'js', contains: 'Загрузка' },
        { label: 'После загрузки статус обновился', kind: 'text', selector: '#status', equals: 'Загружено: 4', waitMs: 2500 },
        { label: 'Список заполнен', kind: 'count', selector: '#users li', equals: 4, waitMs: 2500 },
        { label: 'Статус выставлен до запроса', kind: 'custom', fn: "const source = ctx.source.js; const loading = source.indexOf('Загрузка'); const fetchAt = source.indexOf('fetch('); return (loading !== -1 && fetchAt !== -1 && loading < fetchAt) || 'Текст «Загрузка…» должен появляться до вызова fetch';" }
      ],
      hints: ['Сначала присвойте статус, потом вызывайте fetch — так пользователь видит реакцию сразу.'],
      solution: {
        js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#users");\n\nstatus.textContent = "Загрузка…";\n\nfetch("/api/users")\n  .then((response) => response.json())\n  .then((users) => {\n    users.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n    status.textContent = `Загружено: ${users.length}`;\n  });'
      }
    },
    {
      id: 'js-fetch-5',
      title: 'Challenge: пользователи с фильтром',
      difficulty: 'hard',
      description: 'Загрузите пользователей и покажите только активных (`active: true`), отсортированных по имени. В `#status` выведите `Активных: N`. Если запрос не удался, покажите `Не удалось загрузить`.',
      checks: [
        { label: 'Показаны только активные', kind: 'count', selector: '#users li', equals: 3, waitMs: 2500 },
        { label: 'Сортировка по имени', kind: 'custom', waitMs: 2500, fn: "const names = ctx.$$('#users li').map((item) => ctx.text(item.textContent)); const sorted = [...names].sort((a, b) => a.localeCompare(b, 'ru')); return JSON.stringify(names) === JSON.stringify(sorted) || 'Получено: ' + JSON.stringify(names);" },
        { label: 'Статус показывает количество', kind: 'text', selector: '#status', equals: 'Активных: 3', waitMs: 2500 },
        { label: 'Использован filter', kind: 'source', lang: 'js', contains: '.filter(' },
        { label: 'Использована сортировка', kind: 'source', lang: 'js', contains: '.sort(' },
        { label: 'Обработка ошибки предусмотрена', kind: 'source', lang: 'js', contains: 'Не удалось загрузить' },
        { label: 'Ошибок в консоли нет', kind: 'noError', waitMs: 1500 }
      ],
      hints: [
        'Сортировка строк с кириллицей: a.name.localeCompare(b.name, "ru").',
        'catch добавляется в конец цепочки и ловит любую ошибку выше.'
      ],
      solution: {
        js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#users");\n\nfetch("/api/users")\n  .then((response) => {\n    if (!response.ok) throw new Error("bad response");\n    return response.json();\n  })\n  .then((users) => {\n    const active = users\n      .filter((user) => user.active)\n      .sort((a, b) => a.name.localeCompare(b.name, "ru"));\n\n    active.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n\n    status.textContent = `Активных: ${active.length}`;\n  })\n  .catch(() => {\n    status.textContent = "Не удалось загрузить";\n  });'
      }
    }
  ]
};

const lesson32 = {
  id: 'js-async',
  title: 'Async / await',
  summary: 'Асинхронный код, который читается как обычный.',
  editors: ['html', 'css', 'js'],
  sandbox: API_SANDBOX,
  theory: [
    { lead: '`async/await` — это тот же промис, но записанный по-человечески: сверху вниз, без вложенных `.then`.' },
    { code: '// было\nfetch("/api/users")\n  .then((r) => r.json())\n  .then((users) => console.log(users.length));\n\n// стало\nasync function load() {\n  const response = await fetch("/api/users");\n  const users = await response.json();\n  console.log(users.length);\n}\nload();' },
    { h: 'Правила' },
    { ul: [
      '`await` работает только внутри функции, помеченной `async`;',
      '`async`-функция всегда возвращает промис;',
      'ошибки ловят обычным `try / catch`.'
    ] },
    { code: 'async function load() {\n  try {\n    const response = await fetch("/api/broken");\n    if (!response.ok) throw new Error(`Статус ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.error(error.message);\n    return null;\n  } finally {\n    console.log("Запрос завершён");\n  }\n}' },
    { h: 'Параллельно или по очереди' },
    { code: '// по очереди — дольше\nconst users = await getUsers();\nconst orders = await getOrders();\n\n// параллельно — быстрее\nconst [users, orders] = await Promise.all([getUsers(), getOrders()]);' },
    { warn: 'Не ставьте `await` в цикле, если запросы не зависят друг от друга: пять запросов по 300 мс — это 1,5 секунды вместо 300 мс.' }
  ],
  starter: {
    html: '<h2>Данные</h2>\n<ul id="list"></ul>\n<p id="status"></p>\n',
    css: '',
    js: '// ваш код\n'
  },
  tasks: [
    {
      id: 'js-async-1',
      title: 'Переписать на await',
      difficulty: 'easy',
      description: 'Перепишите загрузку пользователей с `.then` на `async/await`: объявите `async function loadUsers()` и выведите количество в консоль.',
      checks: [
        { label: 'Объявлена async-функция', kind: 'source', lang: 'js', matches: 'async\\s+function|async\\s*\\(' },
        { label: 'Использован await', kind: 'source', lang: 'js', matches: '\\bawait\\b' },
        { label: 'Цепочек .then не осталось', kind: 'source', lang: 'js', notContains: '.then(' },
        { label: 'В консоли количество пользователей', kind: 'console', matches: '(^|\\D)4(\\D|$)', waitMs: 2000 },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: ['Не забудьте вызвать функцию: loadUsers();'],
      solution: {
        js: 'async function loadUsers() {\n  const response = await fetch("/api/users");\n  const users = await response.json();\n  console.log(users.length);\n}\n\nloadUsers();'
      }
    },
    {
      id: 'js-async-2',
      title: 'try / catch',
      difficulty: 'easy',
      description: 'Запросите `/api/broken` (сервер отвечает 500). Поймайте ошибку через `try/catch` и покажите в `#status` текст `Сервер недоступен`.',
      checks: [
        { label: 'Использован try/catch', kind: 'source', lang: 'js', matches: 'try\\s*\\{[\\s\\S]*catch' },
        { label: 'Проверен статус ответа', kind: 'source', lang: 'js', matches: 'response\\.ok|\\.status' },
        { label: 'Показано сообщение', kind: 'text', selector: '#status', equals: 'Сервер недоступен', waitMs: 2000 },
        { label: 'Необработанных ошибок нет', kind: 'noError', waitMs: 1500 }
      ],
      hints: ['Плохой статус сам по себе не вызывает исключение — бросьте его вручную через throw.'],
      solution: {
        js: 'const status = document.querySelector("#status");\n\nasync function load() {\n  try {\n    const response = await fetch("/api/broken");\n    if (!response.ok) throw new Error("bad status");\n    return await response.json();\n  } catch (error) {\n    status.textContent = "Сервер недоступен";\n    return null;\n  }\n}\n\nload();'
      }
    },
    {
      id: 'js-async-3',
      title: 'Два запроса подряд',
      difficulty: 'medium',
      description: 'Загрузите `/api/stats` и `/api/users` и выведите в `#status` строку вида `Пользователей: 4, заказов: 17`.',
      checks: [
        { label: 'Оба адреса запрошены', kind: 'custom', fn: "const source = ctx.source.js; return (source.includes('/api/stats') && source.includes('/api/users')) || 'Нужны оба запроса';" },
        { label: 'Строка собрана верно', kind: 'text', selector: '#status', equals: 'Пользователей: 4, заказов: 17', waitMs: 2500 },
        { label: 'Использован await', kind: 'source', lang: 'js', matches: '\\bawait\\b' },
        { label: 'Данные взяты из ответов, а не вписаны', kind: 'source', lang: 'js', notContains: 'Пользователей: 4' }
      ],
      hints: ['Количество пользователей можно взять из длины массива или из поля users в /api/stats.'],
      solution: {
        js: 'const status = document.querySelector("#status");\n\nasync function load() {\n  const statsResponse = await fetch("/api/stats");\n  const stats = await statsResponse.json();\n\n  const usersResponse = await fetch("/api/users");\n  const users = await usersResponse.json();\n\n  status.textContent = `Пользователей: ${users.length}, заказов: ${stats.orders}`;\n}\n\nload();'
      }
    },
    {
      id: 'js-async-4',
      title: 'Promise.all',
      difficulty: 'medium',
      description: 'Загрузите `/api/users` и `/api/orders` **параллельно** через `Promise.all` и выведите в `#status` строку `4 пользователя, 2 заказа`.',
      checks: [
        { label: 'Использован Promise.all', kind: 'source', lang: 'js', contains: 'Promise.all' },
        { label: 'Результат верный', kind: 'text', selector: '#status', equals: '4 пользователя, 2 заказа', waitMs: 2500 },
        { label: 'Числа взяты из ответов', kind: 'source', lang: 'js', notContains: '4 пользователя' },
        { label: 'Использована деструктуризация результата', kind: 'source', lang: 'js', matches: 'const\\s*\\[' }
      ],
      hints: [
        'Promise.all принимает массив промисов и возвращает массив результатов.',
        'Можно сделать вспомогательную функцию getJson(url).'
      ],
      solution: {
        js: 'const status = document.querySelector("#status");\n\nasync function getJson(url) {\n  const response = await fetch(url);\n  return response.json();\n}\n\nasync function load() {\n  const [users, orders] = await Promise.all([\n    getJson("/api/users"),\n    getJson("/api/orders")\n  ]);\n\n  status.textContent = `${users.length} пользователя, ${orders.length} заказа`;\n}\n\nload();'
      }
    },
    {
      id: 'js-async-5',
      title: 'Challenge: страница со статистикой',
      difficulty: 'hard',
      description: 'Соберите мини-дашборд: пока данные грузятся — `#status` показывает `Загрузка…`; затем параллельно загружаются пользователи и заказы; в `#list` выводятся имена активных пользователей, в `#status` — `Активных: 3 · Заказов: 2`. Любая ошибка приводит к тексту `Ошибка загрузки`.',
      checks: [
        { label: 'Использован Promise.all', kind: 'source', lang: 'js', contains: 'Promise.all' },
        { label: 'Есть индикатор загрузки', kind: 'source', lang: 'js', contains: 'Загрузка' },
        { label: 'В списке три активных пользователя', kind: 'count', selector: '#list li', equals: 3, waitMs: 2500 },
        { label: 'Итоговая строка верна', kind: 'text', selector: '#status', equals: 'Активных: 3 · Заказов: 2', waitMs: 2500 },
        { label: 'Есть обработка ошибок', kind: 'source', lang: 'js', matches: 'catch' },
        { label: 'Предусмотрен текст ошибки', kind: 'source', lang: 'js', contains: 'Ошибка загрузки' },
        { label: 'Необработанных ошибок нет', kind: 'noError', waitMs: 1500 }
      ],
      hints: [
        'Структура: status = "Загрузка…" → try { Promise.all } catch { статус ошибки }.',
        'Разделитель «·» просто часть строки.'
      ],
      solution: {
        js: 'const status = document.querySelector("#status");\nconst list = document.querySelector("#list");\n\nasync function getJson(url) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`Статус ${response.status}`);\n  return response.json();\n}\n\nasync function load() {\n  status.textContent = "Загрузка…";\n\n  try {\n    const [users, orders] = await Promise.all([\n      getJson("/api/users"),\n      getJson("/api/orders")\n    ]);\n\n    const active = users.filter((user) => user.active);\n\n    active.forEach((user) => {\n      const item = document.createElement("li");\n      item.textContent = user.name;\n      list.append(item);\n    });\n\n    status.textContent = `Активных: ${active.length} · Заказов: ${orders.length}`;\n  } catch (error) {\n    status.textContent = "Ошибка загрузки";\n  }\n}\n\nload();'
      }
    }
  ]
};

const LESSON_MODULES = {
  './math.js': 'export const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport function multiply(a, b) { return a * b; }\nexport default function square(n) { return n * n; }\n',
  './format.js': 'export function money(value) {\n  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " сум";\n}\nexport function upper(text) { return String(text).toUpperCase(); }\n',
  './cart.js': 'export const items = [\n  { title: "Кофе", price: 45000, quantity: 2 },\n  { title: "Молоко", price: 12000, quantity: 3 }\n];\n\nexport function total(list) {\n  return list.reduce((sum, item) => sum + item.price * item.quantity, 0);\n}\n'
};

const lesson33 = {
  id: 'js-modules',
  title: 'Модули',
  summary: 'export, import и разделение кода на файлы.',
  editors: ['html', 'css', 'js'],
  sandbox: { modules: LESSON_MODULES },
  theory: [
    { lead: 'Когда файл переваливает за пару сотен строк, его делят на модули: каждый отвечает за своё и делится наружу только нужным.' },
    { h: 'Экспорт' },
    { code: '// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default function square(n) { return n * n; }' },
    { h: 'Импорт' },
    { code: 'import square, { add, PI } from "./math.js";\nimport * as math from "./math.js";\nimport { add as sum } from "./math.js";' },
    { table: { head: ['Вид', 'Запись'], rows: [
      ['Именованный', '`export function add()` → `import { add }`'],
      ['По умолчанию', '`export default fn` → `import anyName`'],
      ['Всё сразу', '`import * as math` → `math.add()`'],
      ['С переименованием', '`import { add as sum }`']
    ] } },
    { h: 'Подключение' },
    { code: '<script type="module" src="app.js"></script>' },
    { note: 'В этом уроке JS-вкладка уже работает как модуль. Доступны готовые файлы: `./math.js`, `./format.js`, `./cart.js`.' },
    { warn: 'В модуле нет глобальных переменных: всё, что объявлено внутри, видно только ему, пока не экспортировано.' }
  ],
  starter: {
    html: '<h2>Модули</h2>\n<p id="output"></p>\n',
    css: '',
    js: '// импортируйте нужное из ./math.js\n'
  },
  tasks: [
    {
      id: 'js-modules-1',
      title: 'Именованный импорт',
      difficulty: 'easy',
      description: 'Импортируйте `add` из `./math.js`, сложите 7 и 5 и выведите результат в консоль.',
      checks: [
        { label: 'Есть инструкция import', kind: 'source', lang: 'js', matches: '^\\s*import\\b', flags: 'm' },
        { label: 'Импортируется add из ./math.js', kind: 'source', lang: 'js', matches: 'import\\s*\\{[^}]*add[^}]*\\}\\s*from\\s*["\\\']\\./math\\.js' },
        { label: 'В консоли 12', kind: 'console', matches: '(^|\\D)12(\\D|$)', waitMs: 1500 },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: ['import { add } from "./math.js";'],
      solution: { js: 'import { add } from "./math.js";\n\nconsole.log(add(7, 5));' }
    },
    {
      id: 'js-modules-2',
      title: 'Импорт по умолчанию',
      difficulty: 'easy',
      description: 'Импортируйте функцию по умолчанию из `./math.js` под именем `square` и выведите в `#output` строку `Квадрат 9: 81`.',
      checks: [
        { label: 'Импорт по умолчанию без фигурных скобок', kind: 'source', lang: 'js', matches: 'import\\s+\\w+\\s*(,|from)' },
        { label: 'Результат выведен на страницу', kind: 'text', selector: '#output', equals: 'Квадрат 9: 81', waitMs: 1500 },
        { label: 'Число 81 посчитано, а не вписано', kind: 'source', lang: 'js', notContains: '81' },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: ['import square from "./math.js"; — имя выбираете сами.'],
      solution: {
        js: 'import square from "./math.js";\n\ndocument.querySelector("#output").textContent = `Квадрат 9: ${square(9)}`;'
      }
    },
    {
      id: 'js-modules-3',
      title: 'Импорт всего модуля',
      difficulty: 'medium',
      description: 'Импортируйте `./math.js` целиком как `math` и выведите в консоль три значения: `math.PI`, `math.add(2, 3)` и `math.multiply(4, 5)`.',
      checks: [
        { label: 'Использован import * as', kind: 'source', lang: 'js', matches: 'import\\s*\\*\\s*as\\s+math' },
        { label: 'Выведено 3.14', kind: 'console', contains: '3.14', waitMs: 1500 },
        { label: 'Выведено 5', kind: 'console', matches: '(^|\\D)5(\\D|$)', waitMs: 1500 },
        { label: 'Выведено 20', kind: 'console', matches: '(^|\\D)20(\\D|$)', waitMs: 1500 },
        { label: 'Обращение через точку', kind: 'source', lang: 'js', contains: 'math.' }
      ],
      hints: ['import * as math from "./math.js";'],
      solution: {
        js: 'import * as math from "./math.js";\n\nconsole.log(math.PI);\nconsole.log(math.add(2, 3));\nconsole.log(math.multiply(4, 5));'
      }
    },
    {
      id: 'js-modules-4',
      title: 'Два модуля вместе',
      difficulty: 'medium',
      description: 'Возьмите `items` и `total` из `./cart.js`, `money` из `./format.js` и выведите в `#output` строку вида `Итого: 126 000 сум`.',
      checks: [
        { label: 'Импорт из ./cart.js', kind: 'source', lang: 'js', matches: 'from\\s*["\\\']\\./cart\\.js' },
        { label: 'Импорт из ./format.js', kind: 'source', lang: 'js', matches: 'from\\s*["\\\']\\./format\\.js' },
        { label: 'Строка собрана верно', kind: 'text', selector: '#output', equals: 'Итого: 126 000 сум', waitMs: 1500 },
        { label: 'Сумма посчитана функцией total', kind: 'source', lang: 'js', matches: 'total\\s*\\(' },
        { label: 'Число не вписано вручную', kind: 'source', lang: 'js', notContains: '126' }
      ],
      hints: [
        'Импорты из разных файлов пишутся отдельными строками.',
        'money(total(items)) вернёт уже отформатированную строку.'
      ],
      solution: {
        js: 'import { items, total } from "./cart.js";\nimport { money } from "./format.js";\n\ndocument.querySelector("#output").textContent = `Итого: ${money(total(items))}`;'
      }
    },
    {
      id: 'js-modules-5',
      title: 'Challenge: сборка из модулей',
      difficulty: 'hard',
      description: 'Соберите таблицу корзины: импортируйте данные из `./cart.js`, форматирование из `./format.js` (`money`, `upper`). Для каждой позиции создайте `<li>` с названием в верхнем регистре и стоимостью строки, а в `#output` выведите `Итого: 126 000 сум`. Используйте переименование при импорте хотя бы один раз.',
      starter: {
        html: '<h2>Корзина</h2>\n<ul id="cart"></ul>\n<p id="output"></p>\n',
        js: '// соберите корзину из модулей\n'
      },
      checks: [
        { label: 'Есть переименование при импорте', kind: 'source', lang: 'js', matches: 'import\\s*\\{[^}]*\\bas\\b[^}]*\\}' },
        { label: 'Создано две позиции', kind: 'count', selector: '#cart li', equals: 2, waitMs: 1500 },
        { label: 'Названия в верхнем регистре', kind: 'custom', waitMs: 1500, fn: "const texts = ctx.$$('#cart li').map((item) => ctx.text(item.textContent)); if (!texts.length) return 'Список пуст'; return texts.every((text) => /КОФЕ|МОЛОКО/.test(text)) || 'Получено: ' + JSON.stringify(texts);" },
        { label: 'В строках есть стоимость с пробелом между разрядами', kind: 'custom', waitMs: 1500, fn: "const texts = ctx.$$('#cart li').map((item) => ctx.text(item.textContent)); return texts.every((text) => /\\d\\s\\d{3}\\s*сум/.test(text)) || 'Получено: ' + JSON.stringify(texts);" },
        { label: 'Итог посчитан верно', kind: 'text', selector: '#output', equals: 'Итого: 126 000 сум', waitMs: 1500 },
        { label: 'Использована функция upper', kind: 'source', lang: 'js', matches: 'upper|toUpper' },
        { label: 'Ошибок нет', kind: 'noError', waitMs: 1000 }
      ],
      hints: [
        'import { money as formatMoney, upper } from "./format.js";',
        'Стоимость позиции: item.price * item.quantity.'
      ],
      solution: {
        js: 'import { items, total } from "./cart.js";\nimport { money as formatMoney, upper } from "./format.js";\n\nconst list = document.querySelector("#cart");\n\nitems.forEach((item) => {\n  const row = document.createElement("li");\n  row.textContent = `${upper(item.title)} — ${formatMoney(item.price * item.quantity)}`;\n  list.append(row);\n});\n\ndocument.querySelector("#output").textContent = `Итого: ${formatMoney(total(items))}`;'
      }
    }
  ]
};

export const javascriptModule = {
  id: 'javascript',
  title: 'JavaScript',
  subtitle: 'Поведение: логика, данные и взаимодействие',
  lessons: [
    lesson19, lesson20, lesson21, lesson22, lesson23,
    lesson24, lesson25, lesson26, lesson27, lesson28,
    lesson29, lesson30, lesson31, lesson32, lesson33
  ]
};
