<script setup>
import { ref } from "vue";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

useHead({
  title: 'Admin Login | Fajar SP',
  meta: [
    { name: 'description', content: 'Admin login' },
  ]
})

definePageMeta({
  layout: 'admin',
})

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const router = useRouter()
const adminApi = useAdminApi()

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const response = await adminApi.login(email.value, password.value)
    const token = response?.data?.token || response?.token
    if (!token) {
      errorMsg.value = 'Invalid response from server'
      return
    }
    const tokenCookie = useCookie('auth-token', { maxAge: 60 * 60 * 24 * 7 })
    tokenCookie.value = token
    const { success } = useToast()
    success('Logged in successfully')
    await navigateTo('/admin')
  } catch (err) {
    const { error } = useToast()
    const data = err?.data
    errorMsg.value = data?.message || 'Login failed. Please check your credentials.'
    error(errorMsg.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <Card class="w-full max-w-md p-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl font-bold">Admin Login</h1>
          <p class="text-sm text-muted-foreground">Sign in to manage your blog posts</p>
        </div>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-3">
          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-medium">Email</label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="password" class="text-sm font-medium">Password</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
          </div>

          <div v-if="errorMsg" class="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2">
            {{ errorMsg }}
          </div>

          <Button type="submit" :disabled="loading">
            <svg v-if="loading" class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>

        <div class="text-center">
          <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground">
            ← Back to site
          </NuxtLink>
        </div>
      </div>
    </Card>
  </div>
</template>
