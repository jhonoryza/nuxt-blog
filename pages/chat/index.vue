<script setup lang="ts">
import { useHead } from "#imports";

useHead(() => ({
    title: 'Chat | Blog | Fajar SP',
    meta: [
        { name: 'description', content: 'Public chat room - real-time messaging' },
        { property: 'og:title', content: 'Chat | Blog | Fajar SP' },
        { property: 'og:description', content: 'Public chat room - real-time messaging' },
        { property: 'og:image', content: '/banner.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Chat | Blog | Fajar SP' },
        { name: 'twitter:description', content: 'Public chat room - real-time messaging' },
        { name: 'twitter:image', content: '/banner.png' }
    ]
}))
</script>

<template>
    <div class="mx-auto max-w-4xl px-4 py-8">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <h1 class="text-4xl font-bold">Chat</h1>
                <p class="text-muted-foreground text-sm">Real-time public chat room</p>
            </div>
            <ClientOnly>
                <Chatbox />
            </ClientOnly>
        </div>
    </div>
</template>
