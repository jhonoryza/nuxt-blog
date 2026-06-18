<script setup>
import {onMounted, ref, onBeforeUnmount} from "vue";
import { useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

useHead(() => ({
  title: '/posts',
  meta: [
    { name: 'description', content: 'My notes about everything' },
    { property: 'og:title', content: '/posts' },
    { property: 'og:description', content: 'My notes about everything' },
    { property: 'og:image', content: '/banner.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '/posts' },
    { name: 'twitter:description', content: 'My notes about everything' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))

const runtimeConfig = useRuntimeConfig();
const posts = ref([]);
const searchQuery = ref("");
const sortDir = ref("desc");
const sortBy = ref("published_at");
const apiURL = runtimeConfig.public.apiURL + "api/posts";

const showJumpButtons = ref(false);

onMounted(() => {
  fetchAllArticles();
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

const fetchArticles = async (params) => {
  const url = `${apiURL}?${params}`;
  try {
    const resp = await fetch(url);
    const json = await resp.json();
    if (json.code === 200) {
      posts.value = json.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchAllArticles = () => {
  fetchArticles(`sortDir=${sortDir.value}&sortBy=${sortBy.value}`);
};

const searchArticles = () => {
  fetchArticles(`search=${searchQuery.value}&sortDir=${sortDir.value}&sortBy=${sortBy.value}`);
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
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDir.value = "desc";
  }
  debouncedSortArticles();
};

const debouncedSortArticles = debounce(fetchAllArticles, 300);

const router = useRouter();
const gotoDetail = (slug) => {
  router.push(`/posts/${slug}`);
};
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 pb-8">
    <h1 class="text-3xl font-bold">Posts</h1>
    <p class="text-muted-foreground italic mt-1 text-sm">collection of useful notes</p>
    <div class="mt-4">
      <Input
        type="text"
        placeholder="Search posts..."
        v-model="searchQuery"
        @keyup.esc="searchQuery = ''; searchArticles();"
        @keyup="debouncedSearchArticles"
      />
    </div>
    <div class="mt-8 rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="cursor-pointer hover:opacity-60" @click="setSort('published_at')">
              <div class="flex items-center gap-1">
                Published At
                <span v-if="sortBy === 'published_at'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </TableHead>
            <TableHead class="cursor-pointer hover:opacity-60" @click="setSort('title')">
              <div class="flex items-center gap-1">
                Title
                <span v-if="sortBy === 'title'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="post in posts"
            :key="post.id"
            class="cursor-pointer"
            @click="gotoDetail(post.slug)"
          >
            <TableCell class="font-medium text-sm">{{ post.published_at }}</TableCell>
            <TableCell>
              <p class="font-semibold">{{ post.title }}</p>
              <p class="text-muted-foreground text-xs" v-html="post.summary"></p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
