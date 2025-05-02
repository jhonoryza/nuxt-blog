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
  <div>
    <Prayer />
  </div>
</template>