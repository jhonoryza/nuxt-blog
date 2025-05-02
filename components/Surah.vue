<script setup>
import { ref, onMounted } from "vue";

// Data surah
const surahList = ref([]);

// Fetch data surah dari API
const fetchSurahData = async () => {
  try {
    const response = await fetch("/api/surah");
    const data = await response.json();
    if (data.code === 200) {
      surahList.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching surah data:", error);
  }
};

onMounted(() => {
  fetchSurahData();
});

function getRandomDarkSoftColor() {
  const colors = [
    '#2C3E50', // Dark blue
    '#34495E', // Dark grayish blue
    '#1B2A34', // Very dark blue
    '#2C3E50', // Darker blue
    '#273746', // Dark gray
    '#212F3D', // Midnight blue
    '#2E4053', // Slightly lighter dark blue
    '#1C2833', // Darker grayish blue
    '#283747', // Slightly dark blue
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const router = useRouter()
const gotoDetail = (id, surahName) => {
    router.push(`/alquran/${id}?surahName=${surahName}`)
}

</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen px-6">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-semibold text-gray-100">Al-Quran</h1>
    </div>

    <!-- Daftar Surah -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="surah in surahList"
        :key="surah.ID"
        :style="{ backgroundColor: getRandomDarkSoftColor() }"
        class="rounded-lg shadow-lg overflow-hidden p-4 hover:opacity-50 transition hover:cursor-pointer"
        @click="gotoDetail(surah.ID, surah.Transliteration)"
      >
        <div class="flex flex-col h-full">
          <div class="text-left mb-4">
            <p class="text-2xl font-semibold text-gray-200 font-arab">{{ surah.Arabic }}</p>
            <p class="text-sm text-gray-400">{{ surah.Translation }} | {{ surah.NumAyah }} Ayah</p>
          </div>
          <div class="text-right">
            <p class="text-lg text-gray-100">{{ surah.Latin }}</p>
            <p class="text-xs text-gray-500">{{ surah.Location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
