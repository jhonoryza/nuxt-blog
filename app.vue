<template>
  <div class="container mx-auto flex flex-col min-h-screen font-rubik">
    <nav class="flex justify-between items-center uppercase text-base font-semibold py-4">
      <NuxtLink
        to="/"
        class="text-white bg-primary p-2 text-xl hover:bg-link hover:-rotate-6"
      >
        Fajar SP
      </NuxtLink>
      <div class="flex gap-12">
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
    <main class="grow">
      <NuxtPage />
    </main>
    <footer>
      <div class="flex justify-between items-center text-secondary text-sm">
        <div>
          © Copyright 2024 Fajar SP<br />Code snippets are
          <a
            href="https://opensource.org/licenses/MIT"
            class="hover:text-link hover:underline"
            target="_blank"
          >
            MIT licensed
          </a>
          <br />
          <NuxtLink to="/disclaimer" class="hover:text-link hover:underline">
            Disclaimer
          </NuxtLink>
        </div>
        <div>
          <i
            >Enjoy the rest of your <span>{{ today }}</span
            >!</i
          >
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
