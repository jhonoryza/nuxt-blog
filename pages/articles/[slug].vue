<template>
  <div class="mx-auto my-20 max-w-6xl text-primary text-lg">
    <NuxtLink to="/articles" class="p-2 bg-primary text-white rounded-lg hover:bg-link">
      ⬅ Go Back
    </NuxtLink>
    <article v-if="post" class="flex flex-col gap-1 my-12">
      <img class="w-48 h-48" :src="post.image_url" alt="post image" />
      <h1 class="mt-4 text-5xl font-bold">{{ post.title }}</h1>
      <span class="mt-4 text-base text-secondary">
        Published on: {{ post.published_at }}
      </span>
      <span class="mt-0 text-base">Categories: {{ post.categories_name }}</span>
      <span class="mt-0 text-base">Author: {{ post.author_name }}</span>
      <VueMarkdownIt class="mt-4" :content="post.content" />
    </article>
    <div class="flex justify-between">
      <NuxtLink to="/articles" class="p-2 bg-primary text-white rounded-lg hover:bg-link">
        ⬅ Go Back
      </NuxtLink>
      <button
        @click="scrollToTop"
        class="px-4 py-2 text-white rounded-full bg-primary hover:bg-gray-400"
      >
        ⬆
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { VueMarkdownIt } from "vue-markdown-shiki";

let post = ref(null);
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

onMounted(() => {
  fetchArticle();
});

const fetchArticle = async () => {
  const url = runtimeConfig.public.apiURL + "api/posts/" + route.params.slug;
  await fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.code === 200) {
        post.value = resp.data;
      }
    })
    .catch((err) => console.log(err));
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
