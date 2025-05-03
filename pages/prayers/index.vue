<script setup>
useHead(() => ({
  title: 'Jadwal Shalat | Fajar SP'  ,
  meta: [
    { name: 'description', content: 'jadwal shalat' },
    { property: 'og:title', content: 'Jadwal Shalat | Fajar SP' },
    { property: 'og:description', content: 'jadwal shalat' },
    { property: 'og:image', content: '/banner.png' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Jadwal Shalat | Fajar SP' },
    { name: 'twitter:description', content: 'jadwal shalat' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))
</script>

<template>
  <Prayer />
  <a href="https://github.com/hablullah/go-prayer" target="_blank">
    <p class="mt-8 text-xs px-6 hover:text-blue-300 text-gray-400">source: prayer</p>
  </a>
  <a href="https://github.com/hablullah/go-hijri" target="_blank">
    <p class="text-xs px-6 hover:text-blue-300 text-gray-400">source: hijriah calendar</p>
  </a>
</template>