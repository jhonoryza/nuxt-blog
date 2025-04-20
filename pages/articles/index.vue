<script setup>
import {onMounted, ref} from "vue";

const runtimeConfig = useRuntimeConfig();
let posts = ref({});
const searchQuery = ref("");
const sortDir = ref("desc");
const sortBy = ref("published_at");
const apiURL = runtimeConfig.public.apiURL + "api/posts";

onMounted(() => {
  fetchAllArticles();
});

const fetchAllArticles = async () => {
  const url = apiURL + "?sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
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

const searchArticles = async () => {
  const url = apiURL + "?search=" + searchQuery.value + "&sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
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

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const debouncedSearchArticles = debounce(searchArticles, 300);

const setSort = (column) => {
  if (sortBy.value === column) {
    // Jika kolom yang sama diklik, toggle arah sorting
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    // Jika kolom berbeda diklik, set kolom baru dan arah default (desc)
    sortBy.value = column;
    sortDir.value = "desc";
  }
  debouncedSortArticles();
};

const sortArticles = async () => {
  let url = apiURL + "?sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
  if (searchQuery.value !== "") {
    url += "&search=" + searchQuery.value;
  }
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

const debouncedSortArticles = debounce(sortArticles, 300);

</script>

<template>
  <div class="mx-auto mt-10 sm:mt-0 max-w-6xl text-primary text-base sm:text-lg px-4">
    <h1 class="text-4xl sm:text-5xl font-bold">Articles</h1>
    <div class="mt-4 flex">
      <input
          type="text"
          placeholder="Search articles..."
          class="w-full p-2 border border-gray-300 rounded-md"
          v-model="searchQuery"
          @keyup.esc="searchQuery = ''; searchArticles();"
          @keyup="debouncedSearchArticles"
      />
    </div>
    <div class="my-2 flex justify-start items-center border-b-2 border-primary">
      <h2 class="min-w-40 sm:min-w-52 flex items-center gap-4 cursor-pointer hover:text-secondary" 
        @click="setSort('published_at')"
      >
        Published At
        <span v-if="sortBy === 'published_at'">
          <span v-if="sortDir === 'asc'">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" /></svg>
          </span>
          <span v-else>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>
          </span>
        </span>
      </h2>
      <h2 class="flex items-center gap-4 hover:text-secondary cursor-pointer" 
        @click="setSort('title')"
      >
        Title
        <span v-if="sortBy === 'title'">
          <span v-if="sortDir === 'asc'">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" /></svg>
          </span>
          <span v-else>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>
          </span>
        </span>
      </h2>
    </div>
    <div
        class="flex flex-row justify-start items-start sm:items-center"
        v-for="post in posts"
        :key="post.id"
    >
      <p class="text-secondary min-w-40 sm:min-w-52">{{ post.published_at }}</p>
      <NuxtLink
          :to="'/articles/' + post.slug"
          class="text-link hover:cursor-pointer hover:text-link-hover hover:underline"
      >
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>
