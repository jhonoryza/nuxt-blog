<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Message = {
    id: number;
    user_id: string;
    message: string;
    channel: string;
    is_read: boolean;
    created_at: string;
};

const messages = ref<Message[]>([])
const newMessage = ref("")
const userId = ref("anon")
const channel = "admin-chat"
const isTyping = ref(false)
const messagesEndRef = ref<HTMLElement | null>(null)
const runtimeConfig = useRuntimeConfig();
const baseApiUrl = runtimeConfig.public.apiChatURL;
const mercurehubUrl = runtimeConfig.public.apiMercureURL + "/.well-known/mercure";

const scrollToBottom = async () => {
    await nextTick()
    if (messagesEndRef.value) {
        messagesEndRef.value.scrollIntoView({ behavior: "smooth" })
    }
}

onMounted(() => {
    const url = new URL(mercurehubUrl)
    url.searchParams.append("topic", channel)

    const es = new EventSource(url)

    es.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data)
            if (!messages.value.some((m) => m.id === data.id)) {
                messages.value = [...messages.value, data]
                scrollToBottom()
            }
        } catch (e) {
            console.error("Invalid message data:", e)
        }
    }

    es.onerror = (err) => {
        console.error("Mercure connection error", err)
    }

    loadOlderMessages()
    scrollToBottom()
})

const sendMessage = async () => {
    if (!newMessage.value.trim()) return
    isTyping.value = true
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
        showOk("Message sent")
    } catch (err) {
        console.error("Failed to send message:", err)
        showError("Failed to send message")
    } finally {
        isTyping.value = false
    }
}

const loadingOlder = ref(false)
const loadOlderMessages = async () => {
    if (loadingOlder.value) return
    loadingOlder.value = true
    try {
        const res = await $fetch<{ messages: Message[] }>(`${baseApiUrl}/messages`)
        if (res.messages.length > 0) {
            const newOnes = res.messages.filter(
                (msg) => !messages.value.some((m) => m.id === msg.id)
            )
            messages.value = [...newOnes, ...messages.value]
        }
    } catch (err) {
        console.error("Failed to load older messages:", err)
        showError("Failed to load messages")
    } finally {
        loadingOlder.value = false
    }
}

const errorMessage = ref("")
const showError = (msg: string) => {
    errorMessage.value = msg
    setTimeout(() => (errorMessage.value = ""), 3000)
}

const okMessage = ref("")
const showOk = (msg: string) => {
    okMessage.value = msg
    setTimeout(() => (okMessage.value = ""), 3000)
}

function formatTime(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return formatTime(dateStr)
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days}d ago`
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })
}

const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
}
</script>

<template>
    <div class="w-full">
        <Card class="overflow-hidden border-2 shadow-lg">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        #
                    </div>
                    <div>
                        <h2 class="font-semibold text-base">Public Chat</h2>
                        <div class="flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span class="text-xs text-muted-foreground">Online</span>
                        </div>
                    </div>
                </div>
                <Button v-if="messages.length > 0" variant="ghost" size="sm" @click="loadOlderMessages" :disabled="loadingOlder">
                    <svg v-if="loadingOlder" class="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                    </svg>
                    Refresh
                </Button>
            </div>

            <!-- Messages -->
            <div class="h-[500px] overflow-y-auto p-4 space-y-3 bg-muted/10">
                <div v-if="loadingOlder && messages.length === 0" class="flex items-center justify-center h-full">
                    <div class="flex flex-col items-center gap-2 text-muted-foreground">
                        <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        <span class="text-sm">Loading messages...</span>
                    </div>
                </div>

                <div v-else-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <p class="text-sm font-medium">No messages yet</p>
                    <p class="text-xs">Be the first to start the conversation</p>
                </div>

                <div v-for="(msg) in messages" :key="msg.id" class="flex gap-3 group">
                    <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs flex-shrink-0">
                        {{ getInitials(msg.user_id) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-baseline gap-2">
                            <span class="font-semibold text-sm">{{ msg.user_id }}</span>
                            <span class="text-xs text-muted-foreground">{{ formatDate(msg.created_at) }}</span>
                        </div>
                        <p class="text-sm mt-0.5 break-words leading-relaxed">{{ msg.message }}</p>
                    </div>
                </div>
                <div ref="messagesEndRef"></div>
            </div>

            <!-- Input -->
            <div class="p-4 border-t border-border bg-muted/30">
                <div class="flex flex-col sm:flex-row gap-2">
                    <Input
                        v-model="userId"
                        type="text"
                        placeholder="Your name"
                        class="bg-background text-sm"
                    />
                </div>
                <div class="flex gap-2 mt-2">
                    <Input
                        v-model="newMessage"
                        type="text"
                        placeholder="Type a message..."
                        class="bg-background text-sm"
                        @keyup.enter="sendMessage"
                    />
                    <Button @click="sendMessage" :disabled="isTyping || !newMessage.trim()">
                        <svg v-if="isTyping" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </Card>

        <!-- Toast Notifications -->
        <transition name="toast">
            <div v-if="errorMessage" class="fixed bottom-4 right-4 max-w-sm z-50">
                <Card class="p-3 border-destructive bg-destructive/10">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-destructive">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <p class="text-sm text-destructive">{{ errorMessage }}</p>
                    </div>
                </Card>
            </div>
        </transition>

        <transition name="toast">
            <div v-if="okMessage" class="fixed bottom-4 right-4 max-w-sm z-50">
                <Card class="p-3 border-primary bg-primary/10">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <p class="text-sm text-primary">{{ okMessage }}</p>
                    </div>
                </Card>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}
.toast-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
