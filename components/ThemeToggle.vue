<script setup lang="ts">
const colorMode = useColorMode()

const themes = [
  { key: 'light', label: 'Light', icon: '☀️' },
  { key: 'dark', label: 'Dark', icon: '🌙' },
  { key: 'system', label: 'System', icon: '💻' },
]

const currentTheme = computed(() => {
  return themes.find(t => t.key === colorMode.preference) || themes[2]
})

const setTheme = (key: string) => {
  colorMode.preference = key
}
</script>

<template>
  <div class="flex items-center gap-1 rounded-lg border bg-card p-1">
    <button
      v-for="theme in themes"
      :key="theme.key"
      @click="setTheme(theme.key)"
      class="flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
      :class="[
        colorMode.preference === theme.key
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted'
      ]"
      :title="theme.label"
    >
      <span>{{ theme.icon }}</span>
      <span class="hidden sm:inline">{{ theme.label }}</span>
    </button>
  </div>
</template>
