<script setup>
import { ref, onMounted } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownRenderer } from "#components";
import { formatAdminPostDate, parseAdminPostDate } from "~/utils/adminPostDates";

useHead({
  title: 'Edit Post | Admin',
  meta: [
    { name: 'description', content: 'Edit post' },
  ]
})

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const adminApi = useAdminApi()

const slug = String(route.params.slug)

const form = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  published_at: '',
  author_id: null,
  image_url: 'posts/20240819-030927-golang.png',
  image_tw_url: 'posts/twitter/golang-notes.png',
  image_thumb_url: 'posts/thumbnail/golang-notes.png',
  is_markdown: true,
})
const loading = ref(true)
const saving = ref(false)
const errorMsg = ref('')
const showPreview = ref(false)

const fetchPost = async () => {
  try {
    const data = await adminApi.getPost(slug)
    const post = data?.data || data || {}
    form.value.title = post.title || ''
    form.value.slug = post.slug || ''
    form.value.summary = post.summary || ''
    form.value.content = post.content || ''
    form.value.published_at = parseAdminPostDate(post.published_at)
    form.value.author_id = post.author_id || post.user_id || null
    if (post.image_url) form.value.image_url = post.image_url
    if (post.image_tw_url) form.value.image_tw_url = post.image_tw_url
    if (post.image_thumb_url) form.value.image_thumb_url = post.image_thumb_url
    form.value.is_markdown = post.is_markdown ?? true
  } catch (err) {
    errorMsg.value = 'Failed to load post'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPost)

const handleSave = async () => {
  errorMsg.value = ''
  if (!form.value.title.trim()) {
    errorMsg.value = 'Title is required'
    return
  }

  saving.value = true
  try {
    const payload = {
      title: form.value.title,
      slug: form.value.slug,
      summary: form.value.summary,
      content: form.value.content,
      author_id: form.value.author_id,
      image_url: form.value.image_url,
      image_tw_url: form.value.image_tw_url,
      image_thumb_url: form.value.image_thumb_url,
      is_markdown: form.value.is_markdown,
      published_at: formatAdminPostDate(form.value.published_at),
    }

    await adminApi.updatePost(slug, payload)
    const { success } = useToast()
    success('Post updated successfully')
    router.push('/admin')
  } catch (err) {
    const { error } = useToast()
    const data = err?.data
    errorMsg.value = data?.message || 'Failed to update post'
    error(errorMsg.value)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <nav class="border-b border-border bg-card sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <h1 class="font-bold text-lg">Admin Panel</h1>
          <div class="flex items-center gap-4 text-sm">
            <NuxtLink to="/admin" class="text-muted-foreground hover:text-foreground">Posts</NuxtLink>
            <span class="text-primary font-medium">Edit</span>
          </div>
        </div>
        <NuxtLink to="/admin">
          <Button variant="outline" size="sm">Back</Button>
        </NuxtLink>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-3xl font-bold">Edit Post</h2>
            <p class="text-sm text-muted-foreground mt-1">
              <code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ slug }}</code>
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" @click="showPreview = !showPreview">
              {{ showPreview ? 'Edit' : 'Preview' }}
            </Button>
            <Button @click="handleSave" :disabled="saving">
              <svg v-if="saving" class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </Button>
          </div>
        </div>

        <div v-if="errorMsg" class="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {{ errorMsg }}
        </div>

        <div v-if="loading" class="p-12 text-center text-muted-foreground">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Loading post...
          </div>
        </div>

        <div v-else class="grid grid-cols-1 gap-6" :class="showPreview ? 'lg:grid-cols-2' : ''">
          <Card v-if="!showPreview" class="p-6">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="title" class="text-sm font-medium">Title *</label>
                <Input
                  id="title"
                  v-model="form.title"
                  type="text"
                  placeholder="My awesome post"
                />
                <p v-if="form.slug" class="text-xs text-muted-foreground">
                  Slug: <code class="bg-muted px-1 rounded">{{ form.slug }}</code>
                </p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="summary" class="text-sm font-medium">Summary (optional)</label>
                <textarea
                  id="summary"
                  v-model="form.summary"
                  rows="2"
                  placeholder="Brief description of the post"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="published_at" class="text-sm font-medium">Published At (leave empty to unpublish)</label>
                <DatePicker
                  v-model="form.published_at"
                  placeholder="Select publish date"
                  :enable-time="true"
                />
                <p class="text-xs text-muted-foreground">If empty, the post will be marked as unpublished</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="content" class="text-sm font-medium">Content (Markdown supported)</label>
                <textarea
                  id="content"
                  v-model="form.content"
                  rows="20"
                  placeholder="Write your post content in markdown..."
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <details class="border border-border rounded-md p-3">
                <summary class="cursor-pointer text-sm font-medium">Image paths (click to edit)</summary>
                <div class="flex flex-col gap-3 mt-3">
                  <div class="flex flex-col gap-1.5">
                    <label for="image_url" class="text-xs font-medium">Image URL</label>
                    <Input id="image_url" v-model="form.image_url" type="text" class="font-mono text-xs" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label for="image_tw_url" class="text-xs font-medium">Image Twitter URL</label>
                    <Input id="image_tw_url" v-model="form.image_tw_url" type="text" class="font-mono text-xs" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label for="image_thumb_url" class="text-xs font-medium">Image Thumbnail URL</label>
                    <Input id="image_thumb_url" v-model="form.image_thumb_url" type="text" class="font-mono text-xs" />
                  </div>
                  <div class="flex items-center gap-2">
                    <input id="is_markdown" v-model="form.is_markdown" type="checkbox" class="rounded" />
                    <label for="is_markdown" class="text-xs font-medium">Is Markdown</label>
                  </div>
                </div>
              </details>
            </div>
          </Card>

          <Card v-if="showPreview" class="p-6">
            <div class="flex flex-col gap-4">
              <h1 class="text-3xl font-bold">{{ form.title || 'Untitled' }}</h1>
              <p v-if="form.summary" class="text-muted-foreground italic">{{ form.summary }}</p>
              <p v-if="form.published_at" class="text-sm text-muted-foreground">
                {{ parseAdminPostDate(form.published_at)?.toLocaleString('id-ID') }}
              </p>
              <div class="border-t border-border pt-4">
                <MarkdownRenderer :content="form.content || '*No content yet*'" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
