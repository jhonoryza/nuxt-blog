<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const { render } = useMarkdown()
const renderedHtml = ref('')
const isLoading = ref(true)
const markdownRef = ref<HTMLElement | null>(null)

const handleCodeAction = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const button = target.closest('.code-btn') as HTMLElement
  if (!button) return

  const codeBlock = button.closest('.code-block') as HTMLElement
  if (!codeBlock) return

  const action = button.getAttribute('data-action')
  const code = decodeURIComponent(codeBlock.getAttribute('data-code') || '')
  const lang = codeBlock.getAttribute('data-lang') || 'text'

  if (action === 'copy') {
    navigator.clipboard.writeText(code).then(() => {
      button.classList.add('copied')
      const iconCopy = button.querySelector('.icon-copy') as HTMLElement
      const iconCheck = button.querySelector('.icon-check') as HTMLElement
      const btnText = button.querySelector('.btn-text') as HTMLElement
      
      if (iconCopy) iconCopy.style.display = 'none'
      if (iconCheck) iconCheck.style.display = 'block'
      if (btnText) btnText.textContent = 'Copied!'
      
      setTimeout(() => {
        button.classList.remove('copied')
        if (iconCopy) iconCopy.style.display = 'block'
        if (iconCheck) iconCheck.style.display = 'none'
        if (btnText) btnText.textContent = 'Copy'
      }, 2000)
    })
  } else if (action === 'download') {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${lang === 'text' ? 'txt' : lang}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

onMounted(async () => {
  try {
    renderedHtml.value = await render(props.content)
  } catch (e) {
    console.error('Failed to render markdown:', e)
    renderedHtml.value = '<p>Error rendering content</p>'
  } finally {
    isLoading.value = false
  }
})

watch(() => props.content, async (newContent) => {
  if (newContent) {
    isLoading.value = true
    try {
      renderedHtml.value = await render(newContent)
    } catch (e) {
      console.error('Failed to render markdown:', e)
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <div class="markdown-content" ref="markdownRef" @click="handleCodeAction">
    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
    <div v-else v-html="renderedHtml"></div>
  </div>
</template>

<style scoped>
.markdown-content {
  width: 100%;
  padding: 1.5rem;
  line-height: 1.7;
  color: var(--foreground);
}

@media (max-width: 640px) {
  .markdown-content {
    padding: 1rem 0.75rem;
  }
}

.markdown-content :deep(h1) {
  font-size: 2em;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.2;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(h4) {
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
}

.markdown-content :deep(ol) {
  list-style-type: decimal;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5em;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid var(--primary);
  padding-left: 1em;
  margin-left: 0;
  margin-bottom: 1em;
  color: var(--muted-foreground);
  font-style: italic;
}

.markdown-content :deep(code) {
  background: var(--muted);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: var(--font-mono);
}

.markdown-content :deep(.code-block) {
  position: relative;
  margin-bottom: 1.5em;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.markdown-content :deep(.code-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--muted);
  border-bottom: 1px solid var(--border);
}

.markdown-content :deep(.code-lang) {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted-foreground);
  letter-spacing: 0.05em;
}

.markdown-content :deep(.code-actions) {
  display: flex;
  gap: 0.5rem;
}

.markdown-content :deep(.code-btn) {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.markdown-content :deep(.code-btn:hover) {
  color: var(--foreground);
  background: var(--accent);
  border-color: var(--accent);
}

.markdown-content :deep(.code-btn.copied) {
  color: var(--primary);
  border-color: var(--primary);
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.markdown-content :deep(.code-btn svg) {
  flex-shrink: 0;
}

.markdown-content :deep(.code-btn .btn-text) {
  white-space: nowrap;
}

.markdown-content :deep(pre) {
  margin: 0 !important;
  padding: 1rem !important;
  overflow-x: auto !important;
  background: var(--card) !important;
}

.markdown-content :deep(pre code) {
  background: transparent !important;
  padding: 0 !important;
  font-size: 0.875em !important;
  display: block !important;
  white-space: pre !important;
}

.markdown-content :deep(a) {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity 0.2s;
}

.markdown-content :deep(a:hover) {
  opacity: 0.8;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1em 0;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
  display: block;
  overflow-x: auto;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid var(--border);
  padding: 0.75em;
  text-align: left;
}

.markdown-content :deep(th) {
  background: var(--muted);
  font-weight: 600;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2em 0;
}

.markdown-content :deep(> *:first-child) {
  margin-top: 0;
}

.markdown-content :deep(> *:last-child) {
  margin-bottom: 0;
}
</style>
