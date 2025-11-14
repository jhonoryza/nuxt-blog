<script setup>
import { ref } from 'vue';

defineProps({
  data: Object,
});

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
    // const response = await fetch('/api/generate-pdf');
    // if (!response.ok) {
    //   throw new Error('Failed to generate PDF');
    // }
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    // a.href = url;
    a.href = "https://webassets.labkita.my.id/blog/pdf/cv.pdf";
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
  <div class="font-quicksand mx-auto bg-white p-8 shadow-2xl rounded-2xl print:shadow-none grid grid-cols-1 md:grid-cols-3 gap-8 text-primary">
    <!-- Left Column -->
    <aside class="md:col-span-1 space-y-6">
      <!-- Header -->
      <div class="text-center md:text-left">
        <img
          src="/pic.png"
          alt="Profile photo"
          class="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
        />
        <h1 class="text-lg font-bold text-primary leading-tight">
          {{ data.name }}
        </h1>
        <p class="text-accent text-lg font-semibold">{{ data.title }}</p>
      </div>

      <!-- Contact Info -->
      <div class="text-xs text-gray-700 space-y-1">
        <p>📍 {{ data.contact.location }}</p>
        <p>📧 {{ data.contact.email }}</p>
        <p>📱 {{ data.contact.phone }}</p>
        <p>
          💻
          <a
            :href="'https://github.com/' + data.contact.github"
            class="text-accent hover:underline"
            >GitHub</a
          >
        </p>
        <p>
          🌐
          <a :href="data.contact.portfolio" class="text-accent hover:underline"
            >Portfolio</a
          >
        </p>
        <p>
          📝
          <a :href="data.contact.web" class="text-accent hover:underline"
            >Web</a
          >
        </p>
      </div>

      <!-- Summary -->
      <div class="text-xs">
        <h2
          class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2"
        >
          Summary
        </h2>
        <p class="text-gray-700 leading-relaxed">
          {{
            data.summary.replace(
              "exp_year",
              `${new Date().getFullYear() - 2019}++`
            )
          }}
        </p>
      </div>

      <!-- Education -->
      <section>
        <h2
          class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2"
        >
          Education
        </h2>
        <div v-for="(edu, i) in data.education" :key="i" class="text-xs">
          <p class="font-semibold">{{ edu.institution }}</p>
          <p>{{ edu.degree }}</p>
          <p class="text-gray-500">{{ edu.year }}</p>
        </div>
      </section>

      <!-- Awards -->
      <section v-if="data.awards && data.awards.length">
        <h2
          class="text-accent font-semibold border-b border-gray-200 pb-1 mb-2"
        >
          Honors & Awards
        </h2>
        <ul class="list-disc list-inside text-xs">
          <li v-for="(award, i) in data.awards" :key="i">{{ award.title }}</li>
        </ul>
      </section>
    </aside>

    <!-- Right Column -->
    <section class="md:col-span-2 space-y-0">
      <!-- Experience -->
      <div>
        <h2
          class="text-accent font-semibold border-b border-gray-200 pb-1 mb-3"
        >
          Experience
        </h2>
        <div
          v-for="(exp, i) in data.experience"
          :key="i"
          class="border-l-4 border-accent/40 pl-4 mb-2"
        >
          <div class="flex justify-between items-center flex-wrap gap-1">
            <h3 class="font-semibold text-sm">{{ exp.position }}</h3>
            <span class="text-sm text-gray-500">{{ exp.period }}</span>
          </div>
          <p class="text-xs text-accent mb-1">
            {{ exp.company }}
            <span v-if="exp.location">– {{ exp.location }}</span>
          </p>
          <p class="text-gray-700 font-medium mb-1">{{ exp.role }}</p>
          <ul class="list-disc list-inside text-gray-700 text-xs space-y-1">
            <li v-for="(r, j) in exp.responsibilities" :key="j">{{ r }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <div v-if="!isPDF" class="no-print mt-4 text-right">
    <button
      @click="downloadPDF"
      :disabled="loading"
      class="bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded"
    >
      <span v-if="loading">Downloading...</span>
      <span v-else>Download</span>
    </button>
  </div>
</template>
