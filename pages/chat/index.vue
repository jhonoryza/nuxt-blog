<script setup lang="ts">
import { useHead } from "#imports";
import { ref, onMounted } from "vue";

type Message = {
    id: number;
    user_id: string;
    message: string;
    channel: string;
    is_read: boolean;
    created_at: string;
};

// State chat
const messages = ref<Message[]>([])
const newMessage = ref("")
const userId = ref("anon")
const channel = "admin-chat"
const runtimeConfig = useRuntimeConfig();
const baseApiUrl = runtimeConfig.public.apiChatURL;;
const mercurehubUrl = runtimeConfig.public.apiMercureURL + "/.well-known/mercure";

// Subscribe ke Mercure
onMounted(() => {
    const url = new URL(mercurehubUrl)
    url.searchParams.append("topic", channel)

    const es = new EventSource(url)

    es.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data)
            if (!messages.value.find((m) => m.id === data.id)) {
                messages.value = [...messages.value, data]
                messages.value.unshift(data)
            }
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
        await $fetch(`${baseApiUrl}/chat`, {
            method: "POST",
            body: {
                channel,
                user_id: userId.value,
                message: newMessage.value,
            },
        })
        newMessage.value = ""
        showOk("✅ send message ok")
    } catch (err) {
        console.error("Failed to send message:", err)
        showError("⚠️ Failed to send message")
    }
}

const loadingOlder = ref(false)
const loadOlderMessages = async () => {
    if (loadingOlder.value) return
    loadingOlder.value = true
    try {
        const res = await $fetch<{ messages: Message[] }>(`${baseApiUrl}/messages`)
        if (res.messages.length > 0) {
            // prepend ke list (karena older message masuk di awal)
            const newOnes = res.messages.filter(
                (msg) => !messages.value.find((m) => m.id === msg.id)
            )

            // prepend ke list (older message masuk di awal)
            messages.value = [...messages.value, ...newOnes]
            showOk("✅ load older message ok")
        }
    } catch (err) {
        console.error("Failed to load older messages:", err)
        showError("⚠️ Failed to load older messages")
    } finally {
        loadingOlder.value = false
    }
}

const errorMessage = ref("")

const showError = (msg: string) => {
    errorMessage.value = msg
    setTimeout(() => (errorMessage.value = ""), 3000) // auto clear setelah 3 detik
}

const okMessage = ref("")

const showOk = (msg: string) => {
    okMessage.value = msg
    setTimeout(() => (okMessage.value = ""), 3000) // auto clear setelah 3 detik
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
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
            <div class="flex flex-col gap-8">
                <!-- Chat box -->
                <div class="flex flex-col border rounded-lg shadow-md p-4 w-full">
                    <h1 class="text-xl font-bold mb-4">chat with me</h1>

                    <!-- Messages -->
                    <div class="border rounded p-3 h-80 overflow-y-auto mb-4">
                        <button v-if="!loadingOlder" class="text-blue-600 underline mb-2" @click="loadOlderMessages">
                            old message
                        </button>
                        <div v-else class="flex items-center gap-2 text-gray-600">
                            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>
                            Loading...
                        </div>
                        <div v-for="(msg) in messages" :key="msg.id" class="mb-3 p-2 rounded-lg bg-gray-800">
                            <div class="flex items-center justify-between mb-1">
                                <span class="font-semibold text-sm">{{ msg.user_id }}</span>
                                <span class="text-xs">{{ formatDate(msg.created_at) }}</span>
                            </div>
                            <p class="text-sm">{{ msg.message }}</p>
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

                <div v-if="errorMessage" class="mb-2 p-2 text-sm rounded bg-red-100 text-red-700 border border-red-300">
                    {{ errorMessage }}
                </div>
                <div v-if="okMessage" class="mb-2 p-2 text-sm rounded bg-sky-100 text-sky-700 border border-sky-300">
                    {{ okMessage }}
                </div>
            </div>
        </div>
    </div>
</template>
