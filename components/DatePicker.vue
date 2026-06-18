<script setup>
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: {
    type: [Date, String, null],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Select date',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  enableTime: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: null,
  },
  minDate: {
    type: [Date, String],
    default: null,
  },
  maxDate: {
    type: [Date, String],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const handleUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <VueDatePicker
    :model-value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :enable-time-picker="enableTime"
    :format="format"
    :min-date="minDate"
    :max-date="maxDate"
    auto-apply
    :dark="isDark"
    @update:model-value="handleUpdate"
  />
</template>

<style>
:root {
  --dp-background: var(--card);
  --dp-text-color: var(--card-foreground);
  --dp-hover-color: var(--muted);
  --dp-hover-text-color: var(--foreground);
  --dp-primary-color: var(--primary);
  --dp-primary-text-color: var(--primary-foreground);
  --dp-border-color: var(--border);
  --dp-border-color-hover: var(--ring);
  --dp-border-radius: 0.375rem;
  --dp-input-padding: 0.5rem 0.75rem;
  --dp-font-family: inherit;
}

.dark {
  --dp-background: var(--card);
  --dp-text-color: var(--card-foreground);
  --dp-border-color: var(--border);
}

.dp__theme_dark,
.dp__theme_light {
  --dp-background: var(--card);
  --dp-text-color: var(--card-foreground);
}

.dp__input {
  background: var(--background) !important;
  border: 1px solid var(--input) !important;
  color: var(--foreground) !important;
  font-family: inherit;
  padding: 0.5rem 0.75rem;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.dp__input:hover {
  border-color: var(--ring);
}

.dp__input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}

.dp__main {
  font-family: inherit;
  border: 1px solid var(--border) !important;
  border-radius: 0.5rem;
  background: var(--card) !important;
  color: var(--card-foreground) !important;
}

.dp__menu {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.dp__action_buttons {
  background: var(--card) !important;
}

.dp__action_select {
  background: var(--background) !important;
  border: 1px solid var(--border) !important;
  color: var(--foreground) !important;
  border-radius: 0.375rem;
}

.dp__action_select:hover {
  background: var(--muted) !important;
}

.dp__cell_inner {
  border-radius: 0.25rem;
}

.dp__cell_inner:hover {
  background: var(--muted) !important;
  color: var(--foreground) !important;
}

.dp__active_date,
.dp__today {
  background: var(--primary) !important;
  color: var(--primary-foreground) !important;
  border-radius: 0.25rem;
}

.dp__cell_disabled {
  color: var(--muted-foreground) !important;
  opacity: 0.5;
}

.dp__cell_offset {
  color: var(--muted-foreground) !important;
  opacity: 0.5;
}

.dp__time_colon {
  color: var(--muted-foreground);
}

.dp__cell_active,
.dp__active_date {
  background: var(--primary) !important;
  color: var(--primary-foreground) !important;
}

.dp__active_date:hover {
  background: var(--primary) !important;
  color: var(--primary-foreground) !important;
}

.dp__overlay_cell_active,
.dp__overlay_cell_active:hover {
  background: var(--primary) !important;
  color: var(--primary-foreground) !important;
}
</style>
