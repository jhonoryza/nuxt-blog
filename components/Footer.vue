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

<template>
    <footer>
        <div class="flex justify-center items-center px-4 py-3 border-t border-border">
            <ThemeToggle />
        </div>
        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-muted-foreground text-xs sm:text-sm px-4 py-4">
          <div>
            © Copyright 2024 Fajar SP<br/>Code snippets are
            <a
                href="https://opensource.org/licenses/MIT"
                class="hover:text-primary hover:underline"
                target="_blank"
            >
              MIT licensed
            </a>
            <br/>
            <NuxtLink to="/disclaimer" class="text-primary hover:text-primary/80 hover:underline">
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
</template>