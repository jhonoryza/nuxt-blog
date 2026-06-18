<script setup>
import { ref, onMounted } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

useHead({
  title: 'Admin | Posts',
  meta: [
    { name: 'description', content: 'Manage blog posts' },
  ]
})

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
})

const router = useRouter()
const adminApi = useAdminApi()

const posts = ref([])
const searchQuery = ref('')
const loading = ref(true)
const deleteModal = ref({ show: false, slug: '', title: '' })

const fetchPosts = async () => {
  loading.value = true
  try {
    const data = await adminApi.getPosts({ sortDir: 'desc', sortBy: 'id' })
    let postsList = []
    if (Array.isArray(data)) {
      postsList = data
    } else if (data?.data && Array.isArray(data.data)) {
      postsList = data.data
    }
    posts.value = postsList
  } catch (err) {
    console.error(err)
    posts.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    fetchPosts()
    return
  }
  loading.value = true
  try {
    const data = await adminApi.getPosts({ search: searchQuery.value, sortDir: 'desc', sortBy: 'id' })
    let postsList = []
    if (Array.isArray(data)) {
      postsList = data
    } else if (data?.data && Array.isArray(data.data)) {
      postsList = data.data
    }
    posts.value = postsList
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  adminApi.logout()
  router.push('/admin/login')
}

const openDelete = (slug, title) => {
  deleteModal.value = { show: true, slug, title }
}

const closeDelete = () => {
  deleteModal.value = { show: false, slug: '', title: '' }
}

const confirmDelete = async () => {
  try {
    await adminApi.deletePost(deleteModal.value.slug)
    const { success } = useToast()
    success('Post deleted successfully')
    closeDelete()
    await fetchPosts()
  } catch (err) {
    const { error } = useToast()
    const data = err?.data
    error(data?.message || 'Failed to delete post')
    closeDelete()
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <nav class="border-b border-border bg-card sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <h1 class="font-bold text-lg">Admin Panel</h1>
          <div class="flex items-center gap-4 text-sm">
            <span class="text-primary font-medium">Posts</span>
            <NuxtLink to="/" class="text-muted-foreground hover:text-foreground">View Site</NuxtLink>
          </div>
        </div>
        <Button variant="outline" size="sm" @click="handleLogout">Logout</Button>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-3xl font-bold">Posts</h2>
            <p class="text-sm text-muted-foreground mt-1">Manage your blog posts</p>
          </div>
          <NuxtLink to="/admin/posts/new">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Post
            </Button>
          </NuxtLink>
        </div>

        <div class="flex gap-2">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            @keyup.enter="handleSearch"
          />
          <Button @click="handleSearch" variant="outline">Search</Button>
        </div>

        <Card class="overflow-hidden">
          <div v-if="loading" class="p-12 text-center text-muted-foreground">
            <div class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Loading...
            </div>
          </div>
          <div v-else-if="posts.length === 0" class="p-12 text-center text-muted-foreground">
            <p>No posts found</p>
            <NuxtLink to="/admin/posts/new" class="text-primary hover:underline text-sm">
              Create your first post →
            </NuxtLink>
          </div>
          <Table v-else>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Published</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="post in posts" :key="post.id">
                <TableCell class="font-semibold">{{ post.title }}</TableCell>
                <TableCell>
                  <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ post.slug }}</code>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatDate(post.published_at || post.created_at) }}
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink :to="`/admin/posts/${post.slug}`">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </NuxtLink>
                    <Button variant="ghost" size="sm" @click="openDelete(post.slug, post.title)" class="text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>

    <div v-if="deleteModal.show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" @click.self="closeDelete">
      <Card class="w-full max-w-md p-6">
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="text-lg font-semibold">Delete post</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Are you sure you want to delete "<strong>{{ deleteModal.title }}</strong>"? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="closeDelete">Cancel</Button>
            <Button variant="destructive" @click="confirmDelete">Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
