<script setup>
import {VueMarkdownIt} from "vue-markdown-shiki";
import { useRoute, useRuntimeConfig, useHead, useAsyncData } from '#imports'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: post } = await useAsyncData('post', async () => {
  const url = runtimeConfig.public.apiURL + 'api/posts/' + route.params.slug
  const resp = await $fetch(url)  // Nuxt sudah ada $fetch, lebih enak dari fetch biasa
  if (resp.code === 200) {
    // resp.data.content = resp.data.content.replace(/```rs\b/g, '```rust')
    return resp.data
  }
  throw new Error('Post not found')
})

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
};

useHead(() => ({
  title: post.value?.title || 'Blog posts',
  meta: [
    { name: 'description', content: post.value?.summary || 'My notes about everything' },
    { property: 'og:title', content: post.value?.title || 'Blog posts' },
    { property: 'og:description', content: post.value?.summary || 'My notes about everything' },
    { property: 'og:image', content: post.value?.image_url || '/banner.png' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value?.title || 'Blog posts' },
    { name: 'twitter:description', content: post.value?.summary || 'My notes about everything' },
    { name: 'twitter:image', content: post.value?.image_url || '/banner.png' }
  ]
}))

</script>

<template>
  <div class="mx-auto my-20 max-w-6xl  text-base sm:text-lg px-4">
    <NuxtLink to="/posts" class="p-2 text-white rounded-lg hover:bg-link">
      ⬅ Go Back
    </NuxtLink>
    <article v-if="post" class="flex flex-col gap-1 my-12">
      <img class="h-48 w-52 rounded-md bg-cover" :src="post.image_url" alt="post image"/>
      <h1 class="mt-4 text-4xl sm:text-5xl font-bold">{{ post.title }}</h1>
      <span class="mt-4 text-base text-secondary">
        Published on: {{ post.published_at }}
      </span>
      <span class="mt-0 text-base">Categories: {{ post.categories_name }}</span>
      <span class="mt-0 text-base">Author: {{ post.author_name }}</span>
      <client-only> 
        <VueMarkdownIt class="mt-4 text-white" 
          :content="post.content"
        />
      </client-only>
    </article>
    <div class="flex justify-between">
      <NuxtLink to="/posts" class="p-2 text-white rounded-lg hover:bg-link">
        ⬅ Go Back
      </NuxtLink>
      <button
          @click="scrollToTop"
          class="px-4 py-2 text-white rounded-full hover:bg-gray-400"
      >
        ⬆
      </button>
    </div>
  </div>
</template>

<style scoped>
:deep(.vp-doc) {
  color: white !important;
}
</style>