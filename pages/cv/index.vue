<script setup>
import cv from "../../data/cv.json";
import { onMounted, ref } from 'vue';

const isPDF = ref(false);
const route = useRoute();
const loading = ref(false);

onMounted(() => {
  if(route.query.pdf) {
    isPDF.value = true;
  }
});

const downloadPDF = async () => {
  loading.value = true;
  try {
    const a = document.createElement('a');
    a.href = "https://webassets.labkita.my.id/blog/pdf/cv-v2.pdf";
    a.target = "_blank";
    a.download = 'cv.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    // You can add more user-friendly error handling here
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main
    class="max-w-3xl px-4"
  >
    <DarkPreview :data="cv" />
    <div v-if="!isPDF" class="no-print mt-4 text-right">
      <button
        @click="downloadPDF"
        :disabled="loading"
        class="bg-accent hover:bg-accent/80 text-primary font-bold py-2 px-4 rounded"
      >
        <span v-if="loading">Downloading...</span>
        <span v-else>Download</span>
      </button>
    </div>
  </main>
</template>
