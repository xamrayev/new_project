/* M8. Front-end freymvorklariga kirish: React, Angular, Vue.js. */
const vueCounter = '<div id="app">\n  <h2>{{ title }}</h2>\n  <p>Bosishlar soni: {{ count }} (juftmi: {{ isEven ? "ha" : "yo‘q" }})</p>\n  <button @click="count++">+1</button>\n  <input v-model="title">\n  <ul>\n    <li v-for="skill in skills" :key="skill">{{ skill }}</li>\n  </ul>\n</div>\n\n<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>\n<script>\n  const { createApp, ref, computed } = Vue;\n  createApp({\n    setup() {\n      const title = ref(\'Vue hisoblagichi\');\n      const count = ref(0);\n      const isEven = computed(() => count.value % 2 === 0);\n      const skills = [\'HTML\', \'CSS\', \'JavaScript\', \'Vue\'];\n      return { title, count, isEven, skills };\n    }\n  }).mount(\'#app\');\n</script>';

export default {
  id: 'm8',
  number: 8,
  title: 'Front-end freymvorklariga kirish: React, Angular, Vue.js',
  summary: 'Nima uchun freymvork kerak, komponentlar, reaktivlik, virtual DOM va uch mashhur freymvorkning qiyosi.',
  literature: [5],
  goals: [
    'Front-end freymvorklar hal qiladigan muammolarni tushunish.',
    'Komponent, holat (state), reaktivlik, virtual DOM tushunchalarini o‘rganish.',
    'React, Angular va Vue.js ning xususiyatlari va farqlarini bilish.',
    'Vue.js da oddiy komponentli ilova yaratish asoslarini o‘rganish.'
  ],
  keywords: ['freymvork', 'kutubxona', 'komponent', 'state', 'props', 'reaktivlik', 'virtual DOM', 'JSX', 'SPA', 'router', 'Vite', 'React', 'Angular', 'Vue.js', 'Composition API'],
  practicals: ['a8'],
  lessons: ['js-dom', 'js-events', 'js-modules', 'final-project'],
  sections: [
    {
      title: 'Nima uchun freymvork kerak',
      blocks: [
        { lead: 'Oddiy JavaScript (vanilla JS) bilan kichik interaktiv sahifa yaratish oson. Ammo ilova kattalashgan sari ma’lumot va interfeysni sinxron ushlab turish tobora qiyinlashadi.' },
        'Masalan, savatchadagi tovar soni o‘zgarsa, sarlavhadagi belgini, jami summani, tugma holatini va ro‘yxatni — hammasini qo‘lda yangilash kerak. Birortasini unutsangiz, interfeys noto‘g‘ri holatni ko‘rsatadi.',
        { table: { head: ['Imperativ (vanilla JS)', 'Deklarativ (freymvork)'], rows: [
          ['«Qanday» o‘zgartirishni aytasiz: elementni top, matnini almashtir, klass qo‘sh', '«Nima» ko‘rinishini aytasiz: ro‘yxat shu massivdan iborat'],
          ['DOM ni qo‘lda yangilaysiz', 'Ma’lumot o‘zgarsa, freymvork DOM ni o‘zi yangilaydi'],
          ['Kod bitta faylda o‘sib boradi', 'Interfeys kichik mustaqil komponentlarga bo‘linadi']
        ] } },
        { h: 'Kutubxona va freymvork' },
        '**Kutubxona** — siz chaqiradigan funksiyalar to‘plami (React o‘zini kutubxona deb ataydi). **Freymvork** — o‘zi sizning kodingizni chaqiradigan to‘liq karkas: marshrutlash, holat boshqaruvi, formalar, testlash (Angular). Vue ikkisining o‘rtasida: yadrosi kichik, ammo rasmiy qo‘shimchalar (Router, Pinia) to‘liq ekotizim beradi.'
      ]
    },
    {
      title: 'Asosiy tushunchalar',
      blocks: [
        { terms: [
          ['Komponent', 'O‘z shabloni (HTML), mantig‘i (JS) va uslubi (CSS) bo‘lgan qayta ishlatiladigan interfeys bo‘lagi: `Header`, `ProductCard`, `LoginForm`.'],
          ['Holat (state)', 'Komponent ichidagi o‘zgaruvchan ma’lumot. Holat o‘zgarsa — komponent qayta chiziladi.'],
          ['Props', 'Ota komponentdan bolaga uzatiladigan kirish ma’lumotlari (faqat o‘qish uchun).'],
          ['Hodisalar (emit)', 'Bola komponent otaga xabar yuborishi.'],
          ['Reaktivlik', 'Ma’lumot o‘zgarishini kuzatib, unga bog‘liq interfeysni avtomatik yangilash.'],
          ['Virtual DOM', 'DOM ning xotiradagi yengil nusxasi. Freymvork yangi va eski nusxani solishtirib (diffing), haqiqiy DOM ga faqat farqni yozadi.'],
          ['Hayot sikli (lifecycle)', 'Komponent yaratilishi, sahifaga qo‘shilishi, yangilanishi va o‘chirilishi bosqichlari.'],
          ['SPA va router', 'Bitta sahifali ilova; router URL ga qarab qaysi komponent ko‘rinishini belgilaydi.']
        ] },
        { code: 'App\n├── AppHeader\n│   └── SearchBox\n├── ProductList\n│   ├── ProductCard   ← props: product\n│   ├── ProductCard\n│   └── ProductCard   → emit: add-to-cart\n└── CartSidebar', lang: 'text', title: 'Komponentlar daraxti' },
        'Ma’lumot odatda **yuqoridan pastga** (props orqali) oqadi, hodisalar esa **pastdan yuqoriga** (emit orqali) ko‘tariladi. Bu «bir tomonlama ma’lumot oqimi» ilovani oldindan aytib bo‘ladigan qiladi.'
      ]
    },
    {
      title: 'React',
      blocks: [
        '**React** — 2013-yilda Facebook (Meta) tomonidan chiqarilgan UI kutubxonasi. Eng keng tarqalgan front-end texnologiya.',
        { ul: [
          'Komponentlar — oddiy JavaScript funksiyalari.',
          'Shablon o‘rniga **JSX** — JavaScript ichida HTML ga o‘xshash sintaksis.',
          'Holat **hooks** orqali: `useState`, `useEffect`, `useMemo`.',
          'Ekotizim: Next.js (SSR), React Router, Redux/Zustand, React Native (mobil ilovalar).'
        ] },
        { code: "import { useState } from 'react';\n\nexport default function Counter({ step = 1 }) {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className=\"counter\">\n      <p>Bosishlar: {count}</p>\n      <button onClick={() => setCount(count + step)}>+{step}</button>\n    </div>\n  );\n}", lang: 'js', title: 'React — Counter.jsx' }
      ]
    },
    {
      title: 'Angular',
      blocks: [
        '**Angular** — Google tomonidan qo‘llab-quvvatlanadigan to‘liq freymvork (2016; eski AngularJS — 2010). Katta korporativ loyihalarda ko‘p ishlatiladi.',
        { ul: [
          'Asosiy til — **TypeScript** (qat’iy tiplashtirilgan JavaScript).',
          'Hamma narsa «qutidan chiqib» beriladi: router, HTTP klient, formalar, testlash, CLI.',
          'Dependency Injection (bog‘liqliklarni kiritish), servislar, dekoratorlar.',
          'Yangi versiyalarda **signals** asosidagi reaktivlik.'
        ] },
        { code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: `\n    <p>Bosishlar: {{ count() }}</p>\n    <button (click)=\"increment()\">+1</button>\n  `\n})\nexport class CounterComponent {\n  count = signal(0);\n  increment() { this.count.update((n) => n + 1); }\n}", lang: 'js', title: 'Angular — counter.component.ts' }
      ]
    },
    {
      title: 'Vue.js',
      blocks: [
        '**Vue.js** — 2014-yilda Evan You tomonidan yaratilgan progressiv freymvork. «Progressiv» degani — uni bitta sahifaga `<script>` orqali qo‘shishdan boshlab, to‘liq SPA gacha bosqichma-bosqich qo‘llash mumkin. O‘rganish oson, hujjatlari juda sifatli. **Ushbu kurs platformasining o‘zi ham Vue 3 da yozilgan.**',
        { ul: [
          'HTML ga asoslangan shablonlar va direktivalar: `v-if`, `v-for`, `v-model`, `v-bind` (`:`), `v-on` (`@`).',
          'Bitta faylli komponentlar (**SFC**): `.vue` faylida `<template>`, `<script>`, `<style>`.',
          'Kuchli reaktivlik tizimi: `ref`, `reactive`, `computed`, `watch`.',
          'Rasmiy ekotizim: Vue Router, Pinia (holat), Vite (yig‘ish), Nuxt (SSR).'
        ] },
        'Quyidagi misol Vue ni CDN orqali ulaydi va hech qanday yig‘ish vositasisiz ishlaydi (internet talab qilinadi):',
        { code: vueCounter, lang: 'html', run: { html: vueCounter } },
        { h: 'Bitta faylli komponent (SFC)' },
        { code: "<script setup>\nimport { ref, computed } from 'vue';\n\nconst props = defineProps({ product: Object });\nconst emit = defineEmits(['add']);\nconst qty = ref(1);\nconst total = computed(() => qty.value * props.product.price);\n</script>\n\n<template>\n  <article class=\"card\">\n    <h3>{{ product.title }}</h3>\n    <input type=\"number\" v-model.number=\"qty\" min=\"1\">\n    <p>Jami: {{ total }} so‘m</p>\n    <button @click=\"emit('add', { id: product.id, qty })\">Savatga</button>\n  </article>\n</template>\n\n<style scoped>\n.card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }\n</style>", lang: 'vue', title: 'ProductCard.vue' }
      ]
    },
    {
      title: 'Qiyosiy tahlil va tanlash mezonlari',
      blocks: [
        { table: { head: ['Mezon', 'React', 'Angular', 'Vue.js'], rows: [
          ['Turi', 'UI kutubxona', 'To‘liq freymvork', 'Progressiv freymvork'],
          ['Muallif', 'Meta', 'Google', 'Evan You va hamjamiyat'],
          ['Til', 'JavaScript/TS + JSX', 'TypeScript', 'JavaScript/TS + shablonlar'],
          ['O‘rganish qiyinligi', 'O‘rtacha', 'Yuqori', 'Past'],
          ['Reaktivlik', 'Holat + qayta render', 'Signals / Zone.js', 'Proxy asosidagi reaktivlik'],
          ['Hajmi', 'O‘rtacha', 'Katta', 'Kichik'],
          ['Qo‘llanish', 'Startaplar, katta mahsulotlar', 'Korporativ tizimlar', 'Tez ishlab chiqish, kichik va o‘rta loyihalar'],
          ['SSR freymvorki', 'Next.js', 'Angular SSR', 'Nuxt']
        ] } },
        { h: 'Loyiha yaratish (Vite bilan)' },
        { code: '# Vue\nnpm create vue@latest my-app\n\n# React\nnpm create vite@latest my-app -- --template react\n\n# Angular\nnpm install -g @angular/cli\nng new my-app\n\ncd my-app\nnpm install\nnpm run dev', lang: 'bash' },
        { note: 'Freymvork tanlashda texnologik «moda»ga emas, jamoa tajribasi, loyiha hajmi, mavjud ekotizim va mehnat bozori talabiga qarang. Qaysi birini tanlasangiz ham, uning asosi — **JavaScript, DOM va HTTP** — bir xil.' }
      ]
    }
  ],
  conclusion: [
    'Front-end freymvorklar interfeysni komponentlarga bo‘lib, ma’lumot va DOM ni reaktivlik orqali avtomatik sinxronlaydi. Asosiy tushunchalar — komponent, holat, props, hodisalar, virtual DOM va router.',
    'React — moslashuvchan kutubxona, Angular — TypeScript ga asoslangan to‘liq freymvork, Vue.js — o‘rganish oson progressiv freymvork. Uchalasi ham Vite kabi zamonaviy vositalar bilan ishlaydi.'
  ],
  glossary: [
    ['Freymvork', 'Ilova tuzilishini belgilovchi va kodingizni o‘zi chaqiradigan dasturiy karkas.'],
    ['Komponent', 'Mustaqil, qayta ishlatiladigan interfeys bo‘lagi.'],
    ['State', 'Komponentning o‘zgaruvchan ichki ma’lumoti.'],
    ['Props', 'Ota komponentdan bolaga uzatiladigan ma’lumot.'],
    ['Virtual DOM', 'DOM ning xotiradagi nusxasi; o‘zgarishlarni samarali qo‘llash uchun.'],
    ['JSX', 'JavaScript ichida HTML ga o‘xshash sintaksis (React).'],
    ['SFC', 'Vue ning bitta faylli komponenti (`.vue`).'],
    ['Vite', 'Zamonaviy front-end yig‘ish va ishlab chiqish serveri.']
  ],
  questions: [
    'Vanilla JavaScript bilan katta ilova yozishda qanday muammolar paydo bo‘ladi?',
    'Imperativ va deklarativ yondashuv farqini tushuntiring.',
    'Kutubxona va freymvorkning farqi nimada?',
    'Komponent, state va props tushunchalarini tushuntiring.',
    'Virtual DOM qanday ishlaydi?',
    'React da holat qanday saqlanadi?',
    'Angular ning asosiy xususiyatlari nimalardan iborat?',
    'Vue direktivalari `v-if`, `v-for`, `v-model` nima qiladi?',
    'Vue SFC fayli qanday qismlardan iborat?',
    'Loyiha uchun freymvork tanlashda qanday mezonlarga e’tibor berish kerak?'
  ]
};
