<script setup lang="ts">
import { useHead } from "#imports";
import { ref, onMounted } from "vue";

// State chat
const messages = ref<{ user_id: string; message: string }[]>([])
const newMessage = ref("")
const userId = ref("anon")
const channel = "admin-chat"

// Subscribe ke Mercure
onMounted(() => {
    // const url = new URL("http://192.168.18.107:4001/.well-known/mercure")
    const url = new URL("https://mercurehub.labkita.my.id/.well-known/mercure")
    url.searchParams.append("topic", channel)

    const es = new EventSource(url)

    es.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data)
            //console.log(data);
            messages.value = [...messages.value, data]
        } catch (e) {
            console.error("Invalid message data:", e)
        }
    }

    es.onerror = (err) => {
        console.error("Mercure connection error", err)
    }
})

// Send pesan ke Go API
const sendMessage = async () => {
    if (!newMessage.value) return
    try {
        await $fetch("http://localhost:8080/chat", {
            method: "POST",
            body: {
                channel,
                user_id: userId.value,
                message: newMessage.value,
            },
        })
        newMessage.value = ""
    } catch (err) {
        console.error("Failed to send message:", err)
    }
}

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
    <div class="flex flex-col sm:flex-row gap-12 sm:gap-0">
        <Prayer class="hidden sm:block basis-1 sm:basis-1/2" />
        <div class="mx-auto max-w-6xl px-4">
            <div class="flex flex-col xl:flex-row gap-8">
                <!-- Chat box -->
                <div class="flex flex-col border rounded-lg shadow-md p-4 w-full">
                    <h1 class="text-xl font-bold mb-4">Realtime Chat with me</h1>

                    <!-- Messages -->
                    <div class="border rounded p-3 h-80 overflow-y-auto mb-4">
                        <p>welcome ..</p>
                        <div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
                            <span class="font-semibold">{{ msg.user_id }}: </span>
                            <span>{{ msg.message }}</span>
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="flex gap-2">
                        <div class="flex flex-col gap-2">
                        <input v-model="userId" type="text" placeholder="Type your name..."
                            class="flex-1 border rounded p-2 text-gray-900" />
                        <input v-model="newMessage" type="text" placeholder="Type your message..."
                            class="flex-1 border rounded p-2 text-gray-900" @keyup.enter="sendMessage" />
                        </div>
                        <button @click="sendMessage" class="bg-blue-600 text-white px-4 py-2 rounded">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
