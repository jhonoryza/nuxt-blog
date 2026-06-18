<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      image_url: '',
      image_tw_url: '',
      image_thumb_url: '',
    }),
  },
})

const emit = defineEmits(['update:modelValue'])

const adminApi = useAdminApi()

const mode = ref<'upload' | 'manual'>('manual')
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const uploading = ref(false)
const uploadProgress = ref('')

const paths = ref({
  image_url: props.modelValue?.image_url || '',
  image_tw_url: props.modelValue?.image_tw_url || '',
  image_thumb_url: props.modelValue?.image_thumb_url || '',
})

const manualPaths = ref({
  image_url: props.modelValue?.image_url || '',
  image_tw_url: props.modelValue?.image_tw_url || '',
  image_thumb_url: props.modelValue?.image_thumb_url || '',
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      paths.value = {
        image_url: val.image_url || '',
        image_tw_url: val.image_tw_url || '',
        image_thumb_url: val.image_thumb_url || '',
      }
      manualPaths.value = { ...paths.value }
    }
  },
  { deep: true }
)

const emitPaths = () => {
  emit('update:modelValue', { ...paths.value })
}

watch(manualPaths, () => {
  if (mode.value === 'manual') {
    paths.value = { ...manualPaths.value }
    emitPaths()
  }
}, { deep: true })

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    uploadProgress.value = 'Only JPG, PNG, and WebP images are supported'
    return
  }

  if (file.size > 1024 * 1024) {
    uploadProgress.value = 'Image must be under 1MB'
    return
  }

  selectedFile.value = file
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)
  uploadProgress.value = ''
}

const loadImage = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}

const resizeImage = (
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight?: number,
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    let width = img.width
    let height = img.height

    if (maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)

      canvas.width = maxWidth
      canvas.height = maxHeight

      const x = Math.round((maxWidth - width) / 2)
      const y = Math.round((maxHeight - height) / 2)

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, maxWidth, maxHeight)
      ctx.drawImage(img, x, y, width, height)
    } else {
      if (width > maxWidth) {
        height = Math.round((maxWidth / width) * height)
        width = maxWidth
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
    }

    canvas.toBlob((blob) => resolve(blob!), 'image/png')
  })
}

const getExtension = (filename: string) => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()! : 'png'
}

const uploadToR2 = async (blob: Blob, key: string, contentType: string) => {
  const presign = await adminApi.getPresignUrl(key, blob.size)

  const uploadUrl = presign.upload_url
  const headers: Record<string, string> = {
    'Content-Type': contentType || presign.headers?.['Content-Type'] || 'image/png',
  }

  await fetch(uploadUrl, {
    method: presign.method || 'PUT',
    body: blob,
    headers,
  })

  return presign.image_path
}

const handleUpload = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadProgress.value = 'Resizing images...'

  try {
    const img = await loadImage(selectedFile.value)
    const ext = getExtension(selectedFile.value.name)
    const baseName = selectedFile.value.name.replace(/\.[^.]+$/, '')
    const timestamp = Date.now()
    const fileName = `${baseName}-${timestamp}.${ext}`

    const [originalBlob, thumbBlob, twBlob] = await Promise.all([
      new Response(selectedFile.value).blob(),
      resizeImage(img, 300),
      resizeImage(img, 1200, 630),
    ])

    uploadProgress.value = 'Uploading original...'
    const imageUrl = await uploadToR2(originalBlob, `posts/${fileName}`, selectedFile.value.type)

    uploadProgress.value = 'Uploading thumbnail...'
    const imageThumbUrl = await uploadToR2(thumbBlob, `posts/thumbnail/${fileName}`, 'image/png')

    uploadProgress.value = 'Uploading twitter image...'
    const imageTwUrl = await uploadToR2(twBlob, `posts/twitter/${fileName}`, 'image/png')

    paths.value = {
      image_url: imageUrl,
      image_tw_url: imageTwUrl,
      image_thumb_url: imageThumbUrl,
    }
    emitPaths()

    uploadProgress.value = 'Uploaded successfully!'
    setTimeout(() => {
      uploadProgress.value = ''
    }, 2000)
  } catch (err) {
    uploadProgress.value = err?.data?.message || 'Upload failed'
    const { error } = useToast()
    error(uploadProgress.value)
  } finally {
    uploading.value = false
  }
}

const switchMode = (newMode: 'upload' | 'manual') => {
  mode.value = newMode
  if (newMode === 'manual') {
    manualPaths.value = { ...paths.value }
  }
}
</script>

<template>
  <Card class="p-4">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <Button
          :variant="mode === 'upload' ? 'default' : 'outline'"
          size="sm"
          @click="switchMode('upload')"
        >
          Upload
        </Button>
        <Button
          :variant="mode === 'manual' ? 'default' : 'outline'"
          size="sm"
          @click="switchMode('manual')"
        >
          Manual Input
        </Button>
      </div>

      <div v-if="mode === 'upload'" class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            class="file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary file:text-primary-foreground h-auto"
            @change="handleFileSelect"
          />
        </div>

        <p class="text-xs text-muted-foreground">
          JPG, PNG, or WebP. Max 1MB. One image will be auto-resized into original, thumbnail (300px), and twitter (1200×630) versions.
        </p>

        <div
          v-if="previewUrl"
          class="flex items-start gap-3 border border-border rounded-md p-3"
        >
          <img
            :src="previewUrl"
            alt="Preview"
            class="w-32 h-32 object-cover rounded border"
          />
          <div class="flex flex-col gap-2 flex-1">
            <p class="text-sm font-medium">{{ selectedFile?.name }}</p>
            <p class="text-xs text-muted-foreground">
              {{ selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '' }}
            </p>
            <div v-if="paths.image_url" class="flex flex-col gap-0.5">
              <code class="text-xs bg-muted px-1.5 py-0.5 rounded break-all">{{ paths.image_url }}</code>
              <code class="text-xs bg-muted px-1.5 py-0.5 rounded break-all">{{ paths.image_thumb_url }}</code>
              <code class="text-xs bg-muted px-1.5 py-0.5 rounded break-all">{{ paths.image_tw_url }}</code>
            </div>
            <p v-if="uploadProgress" class="text-xs" :class="uploadProgress.includes('failed') ? 'text-destructive' : 'text-primary'">
              {{ uploadProgress }}
            </p>
          </div>
        </div>

        <Button
          :disabled="!selectedFile || uploading"
          @click="handleUpload"
          size="sm"
        >
          <svg v-if="uploading" class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          {{ uploading ? 'Uploading...' : 'Upload & Generate Versions' }}
        </Button>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div class="flex flex-col gap-1.5">
          <label for="img-main" class="text-xs font-medium">Image URL</label>
          <Input
            id="img-main"
            v-model="manualPaths.image_url"
            type="text"
            placeholder="posts/20240819-030927-golang.png"
            class="font-mono text-xs"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="img-thumb" class="text-xs font-medium">Thumbnail URL</label>
          <Input
            id="img-thumb"
            v-model="manualPaths.image_thumb_url"
            type="text"
            placeholder="posts/thumbnail/golang-notes.png"
            class="font-mono text-xs"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="img-tw" class="text-xs font-medium">Twitter URL</label>
          <Input
            id="img-tw"
            v-model="manualPaths.image_tw_url"
            type="text"
            placeholder="posts/twitter/golang-notes.png"
            class="font-mono text-xs"
          />
        </div>
      </div>
    </div>
  </Card>
</template>