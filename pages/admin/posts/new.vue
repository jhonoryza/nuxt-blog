<script setup>
import { ref, onMounted } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownRenderer } from "#components";
import { formatAdminPostDate, parseAdminPostDate } from "~/utils/adminPostDates"
import { ImageUpload } from "#components";

useHead({
  title: 'New Post | Admin',
  meta: [
    { name: 'description', content: 'Create new post' },
  ]
})

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
})

const router = useRouter()
const adminApi = useAdminApi()

const form = ref({
  title: '',
  summary: '',
  content: '',
  published_at: '',
  author_id: null,
  is_markdown: true,
})

const imagePaths = ref({
  image_url: 'posts/20240819-030927-golang.png',
  image_tw_url: 'posts/twitter/golang-notes.png',
  image_thumb_url: 'posts/thumbnail/golang-notes.png',
})

const loading = ref(false)
const errorMsg = ref('')
const showPreview = ref(false)
const profileLoading = ref(true)

const fetchProfile = async () => {
  try {
    const profile = await adminApi.getProfile()
    form.value.author_id = profile?.id || profile?.user_id || null
  } catch (err) {
    console.error('Failed to fetch profile:', err)
  } finally {
    profileLoading.value = false
  }
}

onMounted(fetchProfile)

const handleSave = async () => {
  errorMsg.value = ''
  if (!form.value.title.trim()) {
    errorMsg.value = 'Title is required'
    return
  }
  if (!form.value.author_id) {
    errorMsg.value = 'Author not loaded, please refresh the page'
    return
  }

  loading.value = true
  try {
    const payload = {
      title: form.value.title,
      summary: form.value.summary,
      content: form.value.content,
      author_id: form.value.author_id,
      image_url: imagePaths.value.image_url,
      image_tw_url: imagePaths.value.image_tw_url,
      image_thumb_url: imagePaths.value.image_thumb_url,
      is_markdown: form.value.is_markdown,
      published_at: formatAdminPostDate(form.value.published_at),
    }

    await adminApi.createPost(payload)
    const { success } = useToast()
    success('Post created successfully')
    router.push('/admin')
  } catch (err) {
    const { error } = useToast()
    const data = err?.data
    errorMsg.value = data?.message || 'Failed to create post'
    error(errorMsg.value)
  } finally {
    loading.value = false
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
            <span class="text-primary font-medium">New Post</span>
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
            <h2 class="text-3xl font-bold">New Post</h2>
            <p class="text-sm text-muted-foreground mt-1">Create a new blog post</p>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" @click="showPreview = !showPreview">
              {{ showPreview ? 'Edit' : 'Preview' }}
            </Button>
            <Button @click="handleSave" :disabled="loading || profileLoading">
              <svg v-if="loading" class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              {{ loading ? 'Saving...' : 'Save Post' }}
            </Button>
          </div>
        </div>

        <div v-if="errorMsg" class="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {{ errorMsg }}
        </div>

        <div v-if="profileLoading" class="text-sm text-muted-foreground bg-muted/50 border border-border rounded-md p-3">
          Loading profile...
        </div>

        <div class="grid grid-cols-1 gap-6" :class="showPreview ? 'lg:grid-cols-2' : ''">
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
                <p class="text-xs text-muted-foreground">Slug will be auto-generated by the backend</p>
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
                <label for="published_at" class="text-sm font-medium">Published At (leave empty to save as draft)</label>
                <DatePicker
                  v-model="form.published_at"
                  placeholder="Select publish date"
                  :enable-time="true"
                />
                <p class="text-xs text-muted-foreground">If empty, the post will be saved as unpublished</p>
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

              <div class="flex items-center gap-2">
                <input id="is_markdown" v-model="form.is_markdown" type="checkbox" class="rounded" />
                <label for="is_markdown" class="text-xs font-medium">Is Markdown</label>
              </div>

              <ImageUpload v-model="imagePaths" />

              <input type="hidden" :value="form.author_id" />
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
