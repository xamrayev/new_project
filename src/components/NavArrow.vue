<!-- A small previous/next button: a link when there is somewhere to go, a disabled button otherwise. -->
<script setup>
defineProps({
  to: { type: [Object, Boolean, null], default: null },
  label: { type: String, required: true }
});
</script>

<template>
  <RouterLink v-if="to" class="btn btn--sm" :to="to" :title="label" :aria-label="label"><slot /></RouterLink>
  <button v-else type="button" class="btn btn--sm" disabled :title="label" :aria-label="label"><slot /></button>
</template>
