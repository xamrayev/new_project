/* A8. Vue freymvorkida komponent yaratish. */
const CDN = '<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>';

const step1 = '<div id="app">\n  <h1>{{ title }}</h1>\n  <p>Bugun: {{ today }}</p>\n  <p>Kurs: <strong>{{ course.name }}</strong>, {{ course.credits }} kredit</p>\n</div>\n\n' + CDN + '\n<script>\n  const { createApp, ref, reactive } = Vue;\n\n  createApp({\n    setup() {\n      const title = ref(\'Mening birinchi Vue ilovam\');\n      const today = new Date().toLocaleDateString(\'uz-UZ\');\n      const course = reactive({ name: \'Web tizimlari\', credits: 6 });\n\n      setTimeout(() => { title.value = \'Reaktivlik ishlayapti!\'; }, 1500);\n\n      return { title, today, course };\n    }\n  }).mount(\'#app\');\n</script>';

const step2 = '<div id="app">\n  <input v-model="name" placeholder="Ismingiz">\n  <p v-if="name.length >= 3">Salom, {{ name }}! 👋</p>\n  <p v-else class="muted">Kamida 3 ta harf yozing</p>\n\n  <button @click="count++" :disabled="count >= 5">Bosing ({{ count }}/5)</button>\n  <button @click="count = 0">Nolga</button>\n\n  <p :class="{ warn: count >= 5 }" :style="{ fontSize: 14 + count * 2 + \'px\' }">Shrift kattalashadi</p>\n\n  <ul>\n    <li v-for="(skill, index) in skills" :key="skill">{{ index + 1 }}. {{ skill }}</li>\n  </ul>\n</div>\n\n' + CDN + '\n<script>\n  const { createApp, ref } = Vue;\n  createApp({\n    setup() {\n      const name = ref(\'\');\n      const count = ref(0);\n      const skills = [\'HTML\', \'CSS\', \'JavaScript\', \'Vue\'];\n      return { name, count, skills };\n    }\n  }).mount(\'#app\');\n</script>\n\n<style>\n  body { font-family: sans-serif; padding: 20px; }\n  .muted { color: #64748b; }\n  .warn { color: crimson; font-weight: bold; }\n</style>';

const todoApp = '<div id="app">\n  <h2>Vazifalar ({{ remaining }}/{{ todos.length }} qoldi)</h2>\n\n  <form @submit.prevent="add">\n    <input v-model.trim="draft" placeholder="Yangi vazifa">\n    <button :disabled="!draft">Qo‘shish</button>\n  </form>\n\n  <div class="filters">\n    <button v-for="f in [\'all\', \'active\', \'done\']" :key="f"\n            :class="{ on: filter === f }" @click="filter = f">{{ labels[f] }}</button>\n  </div>\n\n  <ul>\n    <todo-item v-for="todo in visible" :key="todo.id" :todo="todo"\n               @toggle="todo.done = !todo.done" @remove="remove(todo.id)"></todo-item>\n  </ul>\n  <p v-if="!visible.length" class="muted">Ro‘yxat bo‘sh</p>\n</div>\n\n' + CDN + '\n<script>\n  const { createApp, ref, computed, watch } = Vue;\n\n  // Bola komponent: props qabul qiladi, hodisa (emit) yuboradi\n  const TodoItem = {\n    props: { todo: { type: Object, required: true } },\n    emits: [\'toggle\', \'remove\'],\n    template: `\n      <li :class="{ done: todo.done }">\n        <label><input type="checkbox" :checked="todo.done" @change="$emit(\'toggle\')"> {{ todo.text }}</label>\n        <button class="x" @click="$emit(\'remove\')">✕</button>\n      </li>`\n  };\n\n  createApp({\n    components: { TodoItem },\n    setup() {\n      const saved = JSON.parse(localStorage.getItem(\'todos\') || \'null\');\n      const todos = ref(saved || [\n        { id: 1, text: \'Ma’ruzani o‘qish\', done: true },\n        { id: 2, text: \'A8 amaliy ishini bajarish\', done: false }\n      ]);\n      const draft = ref(\'\');\n      const filter = ref(\'all\');\n      const labels = { all: \'Hammasi\', active: \'Faol\', done: \'Bajarilgan\' };\n\n      const remaining = computed(() => todos.value.filter((t) => !t.done).length);\n      const visible = computed(() => todos.value.filter((t) =>\n        filter.value === \'all\' ? true : filter.value === \'done\' ? t.done : !t.done));\n\n      function add() {\n        todos.value.push({ id: Date.now(), text: draft.value, done: false });\n        draft.value = \'\';\n      }\n      function remove(id) {\n        todos.value = todos.value.filter((t) => t.id !== id);\n      }\n\n      watch(todos, (value) => localStorage.setItem(\'todos\', JSON.stringify(value)), { deep: true });\n\n      return { todos, draft, filter, labels, remaining, visible, add, remove };\n    }\n  }).mount(\'#app\');\n</script>\n\n<style>\n  body { font-family: system-ui, sans-serif; padding: 20px; max-width: 420px; }\n  form { display: flex; gap: 6px; }\n  input:not([type]) { flex: 1; padding: 6px 8px; }\n  .filters { margin: 10px 0; display: flex; gap: 4px; }\n  .filters .on { background: #2563eb; color: #fff; }\n  ul { padding: 0; list-style: none; }\n  li { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0; }\n  li.done label { text-decoration: line-through; color: #94a3b8; }\n  .muted { color: #64748b; }\n</style>';

export default {
  id: 'a8',
  number: 8,
  title: 'Vue freymvorkida komponent yaratish',
  summary: 'Vue 3 da reaktivlik, direktivalar, computed, props/emit va bitta faylli komponentlar bilan «Vazifalar» ilovasini quramiz.',
  lectures: ['m8'],
  lessons: ['js-dom', 'js-events', 'js-localstorage', 'js-modules'],
  goal: 'Vue.js freymvorkining reaktivlik tizimi, shablon direktivalari va komponentlar mexanizmidan foydalanib, qayta ishlatiladigan komponentlardan iborat interaktiv ilova yaratish ko‘nikmasini shakllantirish.',
  outcomes: [
    '`ref`, `reactive`, `computed`, `watch` bilan reaktiv holatni boshqaradi;',
    '`v-if`, `v-for`, `v-model`, `v-bind`, `v-on` direktivalarini qo‘llaydi;',
    'props va emit orqali komponentlar o‘rtasida ma’lumot uzatadi;',
    'Vite yordamida Vue loyihasini yaratadi va `.vue` fayllarida ishlaydi.'
  ],
  tools: [
    'Internet (1–4-qadamlar Vue ni CDN orqali yuklaydi) va «Erkin playground».',
    'Node.js 20+ va npm (5–6-qadamlar uchun).',
    'VS Code + **Vue - Official** kengaytmasi, brauzer uchun **Vue DevTools**.'
  ],
  theory: [
    { table: { head: ['Vue tushunchasi', 'Vazifasi'], rows: [
      ['`ref(0)`', 'Reaktiv qiymat; JS da `.value` orqali, shablonda to‘g‘ridan-to‘g‘ri'],
      ['`reactive({})`', 'Reaktiv obyekt'],
      ['`computed(() => …)`', 'Boshqa holatdan hisoblanadigan, keshlanadigan qiymat'],
      ['`watch(source, cb)`', 'O‘zgarishga javoban qo‘shimcha ish (saqlash, so‘rov)'],
      ['`{{ ifoda }}`', 'Matn interpolyatsiyasi (avtomatik ekranlanadi)'],
      ['`:attr` (`v-bind`)', 'Atributni ifodaga bog‘lash'],
      ['`@event` (`v-on`)', 'Hodisa tinglovchisi; `.prevent`, `.stop` modifikatorlari'],
      ['`v-model`', 'Forma maydoni bilan ikki tomonlama bog‘lanish'],
      ['`v-if` / `v-show` / `v-for`', 'Shartli va ro‘yxatli render (`:key` shart)']
    ] } },
    { note: 'Ushbu kurs platformasining o‘zi ham Vue 3 da yozilgan — manba kodidagi `src/components/` papkasi real loyihadagi komponentlarga yaxshi misol.' }
  ],
  steps: [
    {
      title: 'Vue ni CDN orqali ulash va reaktivlik',
      blocks: [
        'Eng oddiy usul — yig‘ish vositasisiz, `<script>` orqali. `createApp` ilova yaratadi, `setup()` qaytargan hamma narsa shablonda mavjud bo‘ladi. 1,5 soniyadan keyin sarlavha o‘zgaradi — biz DOM ga tegmadik, faqat ma’lumotni o‘zgartirdik.',
        { code: step1, lang: 'html', run: { html: step1 } }
      ]
    },
    {
      title: 'Direktivalar: v-model, v-if, v-for, :bind, @on',
      blocks: [
        'Asosiy direktivalarni bitta misolda mashq qiling. Maydonga yozing, tugmani bosing va sahifa qanday o‘zgarishini kuzating.',
        { code: step2, lang: 'html', run: { html: step2 } }
      ]
    },
    {
      title: 'Computed va watch',
      blocks: [
        '`computed` — boshqa holatdan hisoblanadi va faqat bog‘liqliklari o‘zgarganda qayta hisoblanadi. `watch` esa o‘zgarishga javoban «yon ta’sir» bajaradi.',
        { code: "const price = ref(450000);\nconst quantity = ref(2);\nconst discount = ref(10);\n\nconst total = computed(() => price.value * quantity.value * (1 - discount.value / 100));\n\nwatch(total, (value, old) => {\n  console.log(`Jami o‘zgardi: ${old} → ${value}`);\n});", lang: 'js' }
      ]
    },
    {
      title: 'Komponentlar: props va emit',
      blocks: [
        '«Vazifalar» ilovasini quramiz. `TodoItem` — bola komponent: vazifani **props** orqali oladi, o‘zgarish haqida otaga **emit** bilan xabar beradi. Ma’lumot yuqoridan pastga, hodisalar pastdan yuqoriga oqadi.',
        { code: todoApp, lang: 'html', run: { html: todoApp } },
        { tip: 'Brauzerga **Vue DevTools** kengaytmasini o‘rnatsangiz, komponentlar daraxti va ularning holatini jonli ko‘rishingiz mumkin (lokal loyihada).' }
      ]
    },
    {
      title: 'Vite bilan Vue loyihasini yaratish',
      blocks: [
        'Real loyihalarda Vue **Vite** yig‘ish vositasi bilan ishlatiladi: bitta faylli komponentlar (`.vue`), tezkor qayta yuklash (HMR), optimallashtirilgan build.',
        { code: 'npm create vue@latest todo-app\n# Savollarga: TypeScript — No, Router — No, Pinia — No (hozircha)\ncd todo-app\nnpm install\nnpm run dev          # http://localhost:5173', lang: 'bash' },
        { code: 'todo-app/\n├── index.html\n├── package.json\n├── vite.config.js\n└── src/\n    ├── main.js\n    ├── App.vue\n    └── components/\n        ├── TodoForm.vue\n        └── TodoItem.vue', lang: 'text', title: 'Loyiha tuzilishi' }
      ]
    },
    {
      title: 'Bitta faylli komponentlar (SFC)',
      blocks: [
        'CDN dagi ilovani `.vue` fayllarga ajrating. `<script setup>` — Composition API ning qisqa yozuvi.',
        { code: "<script setup>\ndefineProps({ todo: { type: Object, required: true } });\nconst emit = defineEmits(['toggle', 'remove']);\n</script>\n\n<template>\n  <li :class=\"{ done: todo.done }\">\n    <label>\n      <input type=\"checkbox\" :checked=\"todo.done\" @change=\"emit('toggle')\">\n      {{ todo.text }}\n    </label>\n    <button @click=\"emit('remove')\">✕</button>\n  </li>\n</template>\n\n<style scoped>\n.done label { text-decoration: line-through; color: #94a3b8; }\n</style>", lang: 'vue', title: 'src/components/TodoItem.vue' },
        { code: "<script setup>\nimport { ref } from 'vue';\nconst emit = defineEmits(['add']);\nconst draft = ref('');\n\nfunction submit() {\n  if (!draft.value.trim()) return;\n  emit('add', draft.value.trim());\n  draft.value = '';\n}\n</script>\n\n<template>\n  <form @submit.prevent=\"submit\">\n    <input v-model=\"draft\" placeholder=\"Yangi vazifa\">\n    <button :disabled=\"!draft\">Qo‘shish</button>\n  </form>\n</template>", lang: 'vue', title: 'src/components/TodoForm.vue' },
        { code: "<script setup>\nimport { computed, ref, watch } from 'vue';\nimport TodoForm from './components/TodoForm.vue';\nimport TodoItem from './components/TodoItem.vue';\n\nconst todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));\nconst remaining = computed(() => todos.value.filter((t) => !t.done).length);\n\nconst add = (text) => todos.value.push({ id: Date.now(), text, done: false });\nconst remove = (id) => { todos.value = todos.value.filter((t) => t.id !== id); };\n\nwatch(todos, (v) => localStorage.setItem('todos', JSON.stringify(v)), { deep: true });\n</script>\n\n<template>\n  <main>\n    <h1>Vazifalar ({{ remaining }})</h1>\n    <TodoForm @add=\"add\" />\n    <ul>\n      <TodoItem v-for=\"todo in todos\" :key=\"todo.id\" :todo=\"todo\"\n                @toggle=\"todo.done = !todo.done\" @remove=\"remove(todo.id)\" />\n    </ul>\n  </main>\n</template>", lang: 'vue', title: 'src/App.vue' },
        { code: 'npm run build     # dist/ papkasida tayyor statik fayllar\nnpm run preview   # build natijasini ko‘rish', lang: 'bash' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Tahrirlash',
      level: 'easy',
      blocks: ['`TodoItem` ga ikki marta bosganda matnni tahrirlash rejimini qo‘shing (`input`, Enter — saqlash, Escape — bekor qilish).']
    },
    {
      title: 'Serverdan ma’lumot',
      level: 'medium',
      blocks: ['`onMounted` hook ida `https://jsonplaceholder.typicode.com/todos?_limit=5` dan boshlang‘ich vazifalarni yuklang; yuklanish va xato holatlarini ko‘rsating.']
    },
    {
      title: 'Variant bo‘yicha Vue ilova',
      level: 'hard',
      blocks: [
        'Kamida 3 ta komponentdan iborat Vue ilovasini yarating (jurnaldagi raqam bo‘yicha):',
        { ol: [
          'Internet-do‘kon katalogi va savatcha (`ProductCard`, `CartList`, `CartSummary`).',
          'Talabalar jurnali: baholar kiritish va o‘rtacha ball.',
          'Valyuta konvertori (kurslar API dan).',
          'Viktorina: savollar, taymer, natijalar.',
          'Kontaktlar kitobi: qidiruv, qo‘shish, tahrirlash.',
          'Ob-havo vidjeti (open-meteo API).',
          'Xarajatlar hisobi: kategoriyalar va diagramma.',
          'Kanban doskasi: ustunlar orasida kartochkalarni ko‘chirish.'
        ] },
        'Talablar: props/emit, computed, `v-model`, `v-for` + `:key`, ma’lumotni `localStorage` da saqlash.'
      ]
    }
  ],
  report: [
    'Ishning mavzusi va maqsadi.',
    'Komponentlar daraxti sxemasi (qaysi komponent qaysi props/emit bilan bog‘langan).',
    '`.vue` fayllar kodi.',
    'Ilova ishlashi skrinshotlari va Vue DevTools skrinshoti.',
    'Loyiha GitHub repozitoriyasiga havola (ixtiyoriy: GitHub Pages yoki Netlify da joylashtirilgan versiya).',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Reaktiv holat (`ref`, `computed`, `watch`) to‘g‘ri ishlatilgan', '1'],
    ['Direktivalar to‘g‘ri qo‘llangan, `v-for` da `:key` bor', '1'],
    ['Komponentlarga bo‘lingan, props/emit orqali aloqa', '1'],
    ['Vite loyihasi, SFC fayllar, build ishlaydi', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'Vue da reaktivlik nima va u vanilla JS dan qanday farq qiladi?',
    '`ref` va `reactive` farqi nimada? `.value` qachon yoziladi?',
    '`computed` va oddiy funksiya (metod) farqi nimada?',
    '`v-if` va `v-show` qachon ishlatiladi?',
    'Nima uchun `v-for` da `:key` kerak?',
    'Props va emit qanday ishlaydi? Nima uchun bola komponent props ni o‘zgartirmasligi kerak?',
    '`v-model` qaysi atribut va hodisaning qisqartmasi?',
    '`<style scoped>` nima qiladi?'
  ]
};
