<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const post = ref(null);
const loading = ref(true);

const showJumpButtons = ref(false);

onMounted(() => {
    fetchPost();
    window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
    showJumpButtons.value = window.scrollY > 300;
};

const jumpToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const jumpToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
};

const fetchPost = async () => {
    loading.value = true;
    const url = runtimeConfig.public.apiURL + "api/posts/" + route.params.slug;
    try {
        const resp = await fetch(url);
        const json = await resp.json();
        if (json.code === 200) {
            post.value = json.data;
        }
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const backToPosts = () => {
    router.push("/");
};
</script>

<template>
    <div class="mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-8 pb-8">
        <button 
            @click="backToPosts" 
            class="text-muted-foreground hover:text-foreground font-medium mb-6 transition-colors"
        >
            &larr; Back to posts
        </button>
        
        <div v-if="post" class="flex flex-col gap-4">
            <div class="flex flex-col gap-3">
                <h1 class="text-3xl sm:text-4xl font-bold leading-tight">{{ post.title }}</h1>
                <p class="text-sm text-muted-foreground">{{ post.published_at }}</p>
            </div>
            
            <Card class="p-0 overflow-hidden bg-card">
                <ClientOnly>
                    <MarkdownRenderer :content="post.content" />
                </ClientOnly>
            </Card>
        </div>
        
        <div v-else-if="!loading" class="text-center py-12">
            <p class="text-muted-foreground">Post not found</p>
        </div>
        
        <div v-else class="text-center py-12">
            <p class="text-muted-foreground">Loading...</p>
        </div>

        <div v-if="showJumpButtons" class="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
            <Button size="icon" variant="outline" @click="jumpToTop" title="Jump to top">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </Button>
            <Button size="icon" variant="outline" @click="jumpToBottom" title="Jump to bottom">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </Button>
        </div>
    </div>
</template>
