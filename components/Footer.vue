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
        <div class="flex justify-center items-center px-4 py-2 border-t border-border">
            <ThemeToggle />
        </div>
        <div class="flex items-center justify-between gap-2 text-muted-foreground text-xs sm:text-sm px-4 py-2">
            <div class="flex items-center gap-2 flex-wrap">
                <span>© 2024 Fajar SP</span>
                <span class="hidden sm:inline">·</span>
                <a
                    href="https://opensource.org/licenses/MIT"
                    class="hover:text-primary hover:underline"
                    target="_blank"
                >
                    MIT
                </a>
                <span class="hidden sm:inline">·</span>
                <NuxtLink to="/disclaimer" class="hover:text-primary hover:underline">
                    Disclaimer
                </NuxtLink>
            </div>
            <i class="text-xs">
                Enjoy your <span>{{ today }}</span>!
            </i>
        </div>
    </footer>
</template>
