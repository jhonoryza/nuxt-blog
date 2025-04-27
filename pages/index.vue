<script setup>
import { useHead } from "#imports";

useHead(() => ({
  title: 'Blog | Fajar SP'  ,
  meta: [
    { name: 'description', content: 'fullstack dev, help you build web apps' },
    { property: 'og:title', content: 'Blog | Fajar SP' },
    { property: 'og:description', content: 'fullstack dev, help you build web apps' },
    { property: 'og:image', content: '/banner.png' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog | Fajar SP' },
    { name: 'twitter:description', content: 'fullstack dev, help you build web apps' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))
</script>
<template>
  <div class="flex flex-col sm:flex-row">
    <Landing />
    <Prayer class="basis-1/2" />
  </div>
</template>
