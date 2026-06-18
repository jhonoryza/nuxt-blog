<script setup>
import cv from "~/data/cv.json";
import { ref } from 'vue';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

useHead({
  title: 'CV | Fajar SP',
  meta: [
    { name: 'description', content: 'CV | Fajar SP' },
    { property: 'og:title', content: 'CV | Fajar SP' },
    { property: 'og:description', content: 'CV | Fajar SP' },
    { property: 'og:image', content: '/banner.png' },
  ]
})

const loading = ref(false);

const downloadPDF = async () => {
  loading.value = true;
  try {
    const a = document.createElement('a');
    a.href = "https://webassets.labkita.my.id/blog/pdf/cv-v2.pdf";
    a.target = "_blank";
    a.download = 'cv.pdf';
    a.click();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 pb-8">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold">Curriculum Vitae</h1>
          <p class="text-muted-foreground mt-1 text-sm">My professional experience and skills</p>
        </div>
        <Button @click="downloadPDF" :disabled="loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {{ loading ? 'Downloading...' : 'Download PDF' }}
        </Button>
      </div>

      <DarkPreview :data="cv" />
    </div>
  </div>
</template>
