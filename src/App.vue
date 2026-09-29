<!--
  Root: the current view plus the toasts and the confirm dialog. Each view
  draws its own header (AppHeader) because each puts different things in it.
  The self-study workspace is keyed by route name only, so moving between its
  tasks does not remount the playground.
-->
<script setup>
import FeedbackHost from './components/FeedbackHost.vue';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="Component" :key="route.name" />
  </RouterView>
  <FeedbackHost />
</template>
