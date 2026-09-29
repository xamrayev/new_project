<!--
  Renders content blocks — the lesson theory of the self-study track and the
  text of lectures and practical guides use the same small format:

    'plain paragraph'            { p }  { lead }  { h }  { h4 }
    { ul: [] }  { ol: [] }       { note }  { warn }  { tip }
    { table: { head, rows } }    { terms: [[term, definition]] }
    { code, lang?, title?, run?, sandbox? }

  Text goes through inline(), which escapes first, so content can talk about
  `<script>` safely. A code block with `run` gets a "Try it" button that opens
  the example in the free sandbox (`run: true` — the block itself, or
  `run: { html, css, js }` for an example that needs more than one file).
  `sandbox` hands the example the same extras a lesson can have — typically a
  `mockApi`, so fetch() examples get real answers without a network.
-->
<script setup>
import { useRouter } from 'vue-router';
import { inline } from '../lib/markup.js';
import { handOff, sourceOf } from '../composables/sandbox.js';
import { toast } from '../composables/feedback.js';
import { t } from '../composables/i18n.js';

const props = defineProps({
  blocks: { type: Array, default: () => [] },
  /** Copy buttons on every code block (lectures and guides). */
  tools: { type: Boolean, default: false },
  /** Where the sandbox's "back" link returns to, and what it is called. */
  origin: { type: Object, default: null }
});

const router = useRouter();

const LANG_LABELS = { html: 'HTML', css: 'CSS', js: 'JavaScript', javascript: 'JavaScript', json: 'JSON', sql: 'SQL', php: 'PHP', python: 'Python', bash: 'Terminal', http: 'HTTP', text: 'Matn', vue: 'Vue', env: '.env', xml: 'XML' };

function kind(block) {
  if (typeof block === 'string') return 'p';
  return ['h', 'h4', 'p', 'lead', 'ul', 'ol', 'code', 'note', 'warn', 'tip', 'table', 'terms'].find((key) => key in block) || null;
}

async function copy(code) {
  try {
    await navigator.clipboard.writeText(code);
    toast(t('content.copied'), 'ok', 1600);
  } catch (error) {
    toast(t('content.copyFailed'), 'err');
  }
}

function tryIt(block) {
  const meta = props.origin ? { title: props.origin.title, back: props.origin.route } : {};
  handOff(sourceOf(block), { ...meta, sandbox: block.sandbox || null });
  router.push({ name: 'sandbox' });
}
</script>

<template>
  <template v-for="(block, index) in blocks" :key="index">
    <p v-if="kind(block) === 'p'" v-html="inline(typeof block === 'string' ? block : block.p)"></p>
    <p v-else-if="kind(block) === 'lead'" class="theory__lead" v-html="inline(block.lead)"></p>
    <h3 v-else-if="kind(block) === 'h'" v-html="inline(block.h)"></h3>
    <h4 v-else-if="kind(block) === 'h4'" class="content__h4" v-html="inline(block.h4)"></h4>
    <ul v-else-if="kind(block) === 'ul'">
      <li v-for="(item, at) in block.ul" :key="at" v-html="inline(item)"></li>
    </ul>
    <ol v-else-if="kind(block) === 'ol'">
      <li v-for="(item, at) in block.ol" :key="at" v-html="inline(item)"></li>
    </ol>
    <div v-else-if="kind(block) === 'note'" class="note" v-html="inline(block.note)"></div>
    <div v-else-if="kind(block) === 'warn'" class="note note--warn" v-html="inline(block.warn)"></div>
    <div v-else-if="kind(block) === 'tip'" class="note note--tip" v-html="inline(block.tip)"></div>
    <div v-else-if="kind(block) === 'table'" class="table-wrap">
      <table>
        <thead v-if="block.table.head && block.table.head.length">
          <tr><th v-for="(cell, at) in block.table.head" :key="at" v-html="inline(cell)"></th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, at) in block.table.rows" :key="at">
            <td v-for="(cell, col) in row" :key="col" v-html="inline(cell)"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <dl v-else-if="kind(block) === 'terms'" class="terms">
      <template v-for="([term, definition], at) in block.terms" :key="at">
        <dt v-html="inline(term)"></dt>
        <dd v-html="inline(definition)"></dd>
      </template>
    </dl>
    <figure v-else-if="kind(block) === 'code'" class="code">
      <figcaption v-if="tools || block.run || block.title || block.lang" class="code__bar">
        <span class="code__lang">{{ block.title || LANG_LABELS[block.lang] || block.lang || '' }}</span>
        <span class="code__tools">
          <button v-if="tools" type="button" class="code__btn" @click="copy(block.code)">{{ t('content.copy') }}</button>
          <button v-if="block.run" type="button" class="code__btn code__btn--run" @click="tryIt(block)">▶ {{ t('content.tryIt') }}</button>
        </span>
      </figcaption>
      <pre><code>{{ block.code }}</code></pre>
    </figure>
  </template>
</template>
