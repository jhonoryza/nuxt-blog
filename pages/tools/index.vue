<script setup>
import {onMounted, ref} from "vue";
import { useHead } from "#imports";

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
    // Jika kolom yang sama diklik, toggle arah sorting
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    // Jika kolom berbeda diklik, set kolom baru dan arah default (desc)
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
    <div class="mx-auto max-w-6xl   text-base sm:text-lg px-4">
    <h1 class="text-4xl sm:text-5xl font-bold">Tools</h1>
    <p class="text-xs italic mt-1 text-gray-400">collection of useful tools</p>
    <div class="mt-4 flex">
        <input
            type="text"
            placeholder="Search tools..."
            class="w-full p-2 border border-gray-300 rounded-md bg-gray-900 focus:outline-none focus:ring-0"
            v-model="searchQuery"
            @keyup.esc="searchQuery = ''; searchTools();"
            @keyup="debouncedSearchTools"
        />
        <select
            class="ml-4 p-2 border border-gray-300 rounded-md bg-gray-900 focus:outline-none focus:ring-0"
            v-model="typeQuery"
            @change="fetchAll()"
            >
            <option value="dev tools">Dev Tools</option>
            <option value="go packages">Go Packages</option>
            <option value="php packages">PHP Packages</option>
            <option value="tutorial">Tutorial</option>
        </select>
    </div>

    <!-- table -->
    <div class="mt-10 overflow-x-auto rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="text-white dark:bg-primary-dark">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              <div class=" flex items-center gap-2 hover:cursor-pointer hover:opacity-60" @click="setSort('published_at')">
                Id
                <span v-if="sortBy === 'id'">
                  <span v-if="sortDir === 'asc'">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" /></svg>
                  </span>
                  <span v-else>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>
                  </span>
                </span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              <div class="flex items-center gap-2 hover:cursor-pointer hover:opacity-60" @click="setSort('name')">
                Title
                <span v-if="sortBy === 'name'">
                  <span v-if="sortDir === 'asc'">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" /></svg>
                  </span>
                  <span v-else>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>
                  </span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:cursor-pointer hover:opacity-60"
            v-for="tool in tools" :key="tool.ID" @click="gotoDetail(tool.Link)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ tool.ID }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 flex flex-col items-start">
              <p class="font-bold text-base">{{ tool.Name }}</p>
              <p class="text-secondary text-xs" v-html="tool.Description"></p>
            </td>
          </tr>
          <!-- Repeat more rows here -->
        </tbody>
      </table>
    </div>
    <!-- end table -->
  </div>
</template>