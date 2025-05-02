<script setup>
useHead(() => ({
  title: 'Alquran | Fajar SP'  ,
  meta: [
    { name: 'description', content: 'alquran dan terjemahan' },
    { property: 'og:title', content: 'Alquran | Fajar SP' },
    { property: 'og:description', content: 'alquran dan terjemahan' },
    { property: 'og:image', content: '/banner.png' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Alquran | Fajar SP' },
    { name: 'twitter:description', content: 'alquran dan terjemahan' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))
</script>
<template>
    <Surah />
</template>