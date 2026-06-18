<script setup>
import { cn } from '@/lib/utils'

defineProps({
  class: {
    type: [String, Object, Array],
    default: '',
  },
})
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn('w-full caption-bottom text-sm', $attrs.class)">
      <slot />
    </table>
  </div>
</template>
