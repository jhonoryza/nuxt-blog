<script setup>
import { useHead } from "#imports";

useHead(() => ({
  title: 'Disclaimer',
  meta: [
    { name: 'description', content: 'Disclaimer' },
    { property: 'og:title', content: 'Disclaimer' },
    { property: 'og:description', content: 'Disclaimer' },
    { property: 'og:image', content: '/banner.png' },
  ]
}))
</script>

<template>
  <div class="mx-auto max-w-4xl px-4">
    <h1 class="text-4xl font-bold">Disclaimer</h1>
    <p class="mt-4">
      The information contained on this blog is for general information purposes only.
    </p>
  </div>
</template>
