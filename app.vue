<template>
  <div class="container mx-auto flex flex-col min-h-screen font-rubik">
    <nav class="p-4 w-full fixed sm:relative flex flex-col sm:flex-row gap-4 justify-between items-center uppercase
      text-base font-semibold bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50"
    >
      <NuxtLink
          to="/"
          class="text-white bg-primary p-2 text-xl hover:bg-link hover:-rotate-6"
      >
        Fajar SP
      </NuxtLink>
      <div class="flex gap-2 sm:gap-12">
        <NuxtLink to="/articles" class="text-primary hover:bg-link hover:text-white p-2">
          Articles
        </NuxtLink>
        <NuxtLink
            to="/work-with-me"
            class="text-primary hover:bg-link hover:text-white p-2"
        >
          Work With Me
        </NuxtLink>
        <NuxtLink to="/about" class="text-primary hover:bg-link hover:text-white p-2">
          About
        </NuxtLink>
      </div>
    </nav>
    <main class="mt-28 sm:mt-0 grow">
      <NuxtPage/>
    </main>
    <footer>
      <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-secondary text-xs sm:text-sm px-4 py-4">
        <div>
          © Copyright 2024 Fajar SP<br/>Code snippets are
          <a
              href="https://opensource.org/licenses/MIT"
              class="hover:text-link hover:underline"
              target="_blank"
          >
            MIT licensed
          </a>
          <br/>
          <NuxtLink to="/disclaimer" class="text-link hover:text-link-hover hover:underline">
            Disclaimer
          </NuxtLink>
        </div>
        <div class="self-end">
          <i>
            Enjoy the rest of your <span>{{ today }}</span>!
          </i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const now = new Date();
const today = weekday[now.getDay()];
</script>
