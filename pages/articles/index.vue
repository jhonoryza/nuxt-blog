<template>
  <div class="mx-auto mt-20 max-w-6xl text-primary text-base sm:text-lg px-4">
    <h1 class="text-4xl sm:text-5xl font-bold">All Articles</h1>
    <div
        class="my-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        v-for="post in posts"
        :key="post.id"
    >
      <NuxtLink
          :to="'/articles/' + post.slug"
          class="text-link hover:cursor-pointer hover:text-link-hover hover:underline"
      >
        {{ post.title }}
      </NuxtLink>
      <p class="text-secondary">{{ post.published_at }}</p>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";

const runtimeConfig = useRuntimeConfig();
let posts = ref({});

onMounted(() => {
  fetchAllArticles();
});

const fetchAllArticles = async () => {
  const url = runtimeConfig.public.apiURL + "api/posts";
  await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.code === 200) {
          posts.value = resp.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};
</script>
