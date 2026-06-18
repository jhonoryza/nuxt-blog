<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

useHead(() => ({
  title: 'Tools',
  meta: [
    { name: 'description', content: 'My notes about tools' },
    { property: 'og:title', content: 'Tools' },
    { property: 'og:description', content: 'My notes about tools' },
    { property: 'og:image', content: '/banner.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Tools' },
    { name: 'twitter:description', content: 'My notes about tools' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))

const runtimeConfig = useRuntimeConfig();
let tools = ref({});
const typeQuery = ref("dev tools");
const searchQuery = ref("");
const sortDir = ref("desc");
const sortBy = ref("id");
const apiURL = runtimeConfig.public.apiURL + "api/tools";

onMounted(() => {
  fetchAll();
});

const fetchAll = async () => {
  const url = apiURL + "?type=" + typeQuery.value + "&sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
  await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.code === 200) {
          tools.value = resp.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

const searchTools = async () => {
  const url = apiURL + "?type=" + typeQuery.value + "&search=" + searchQuery.value + "&sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
  await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.code === 200) {
          tools.value = resp.data;
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

const debouncedSearchTools = debounce(searchTools, 300);

const setSort = (column) => {
  if (sortBy.value === column) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDir.value = "desc";
  }
  debouncedSortTools();
};

const sortTools = async () => {
  let url = apiURL + "?type=" + typeQuery.value + "&sortDir=" + sortDir.value + "&sortBy=" + sortBy.value;
  if (searchQuery.value !== "") {
    url += "&search=" + searchQuery.value;
  }
  await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.code === 200) {
          tools.value = resp.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

const debouncedSortTools = debounce(sortTools, 300);

const gotoDetail = async(link) => {
    await navigateTo(link, {
      external: true,
      open: '_blank'
    })
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4">
    <h1 class="text-3xl font-bold">Tools</h1>
    <p class="text-muted-foreground italic mt-1 text-sm">collection of useful tools</p>
    <div class="mt-4 flex gap-4">
      <Input
        type="text"
        placeholder="Search tools..."
        v-model="searchQuery"
        @keyup.esc="searchQuery = ''; searchTools();"
        @keyup="debouncedSearchTools"
      />
      <select
        v-model="typeQuery"
        @change="fetchAll()"
        class="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
      >
        <option value="dev tools">Dev Tools</option>
        <option value="go packages">Go Packages</option>
        <option value="php packages">PHP Packages</option>
        <option value="tutorial">Tutorial</option>
      </select>
    </div>

    <div class="mt-8 rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="cursor-pointer hover:opacity-60" @click="setSort('id')">
              <div class="flex items-center gap-1">
                Id
                <span v-if="sortBy === 'id'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </TableHead>
            <TableHead class="cursor-pointer hover:opacity-60" @click="setSort('name')">
              <div class="flex items-center gap-1">
                Title
                <span v-if="sortBy === 'name'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="tool in tools" :key="tool.ID"
            class="cursor-pointer"
            @click="gotoDetail(tool.Link)"
          >
            <TableCell class="font-medium text-sm">{{ tool.ID }}</TableCell>
            <TableCell>
              <p class="font-semibold">{{ tool.Name }}</p>
              <p class="text-muted-foreground text-xs" v-html="tool.Description"></p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
