<script setup lang="ts">
import { useHead } from "#imports";

useHead(() => ({
    title: 'Chat | Blog | Fajar SP',
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
    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full min-h-screen">
        <Chatbox />
        <Prayer />
    </div>
</template>
