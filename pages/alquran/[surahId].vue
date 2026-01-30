<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const surahId = route.params.surahId;
const surahName = ref(route.query.surahName || '');
const ayahData = ref([]);
const currentIndex = ref(0);
const audioPlayers = ref([]);  // Menyimpan referensi audio untuk setiap ayat

const playAudio = (index) => {
    const audio = audioPlayers.value[currentIndex.value];
    if (audio) {
        audio.src = null;
        audio.pause();
    }
    if (audioPlayers.value[index]) {
        const selectedAyah = ayahData.value[index];
        const audio = audioPlayers.value[index];
        if (audio) {
            currentIndex.value = index;
            audio.src = selectedAyah.AudioUrl;
            audio.play();
            scrollToCenter(index);
        }
    }
};

const onAudioEnded = () => {
    const audio = audioPlayers.value[currentIndex.value];
    if (audio) {
        audio.src = null;
    }
    if (currentIndex.value < ayahData.value.length - 1) {
        currentIndex.value += 1;
        playAudio(currentIndex.value);
    }
};

const scrollToCenter = (index) => {
    const ayahElement = document.getElementById(`ayah-${index}`);
    if (ayahElement) {
        ayahElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
};

onMounted(() => {
    getAyah();
});

const runtimeConfig = useRuntimeConfig();

const getAyah = async() => {
    const apiURL = runtimeConfig.public.apiURL + `api/ayah?surahId=${surahId}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.code === 200) {
            ayahData.value = data.data;
        }
    } catch (error) {
        console.error("Error fetching ayah data:", error);
    }
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-primary">
    <!-- Back Button -->
    <div class="p-4 text-center">
      <NuxtLink href="/alquran" class="bg-gray-700 text-primary rounded-lg px-4 py-2 hover:opacity-60">
        Kembali
      </NuxtLink>
    </div>

    <!-- Header -->
    <div class="p-4 text-center">
      <h1 class="text-2xl font-bold">{{ surahName }}</h1>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <div v-for="(ayah, index) in ayahData" :key="ayah.ID" 
        class="p-4 rounded-lg shadow-lg space-y-4"
        :id="'ayah-' + index"
      >
        <div class="flex justify-between items-center">
          <span class="text-xl font-semibold">Ayah {{ ayah.Ayah }}</span>
          <span class="text-sm text-gray-400">Juz {{ ayah.Juz }} | Page {{ ayah.Page }}</span>
        </div>

        <!-- Arabic Text -->
        <div class="text-5xl text-center text-gray-300 font-arab">
          {{ ayah.Arabic }}
        </div>

        <!-- Latin Text -->
        <div class="text-base text-center text-gray-500">
          <em>{{ ayah.Latin }}</em>
        </div>

        <!-- Translation -->
        <div class="text-base text-center text-gray-400">
          <p>{{ ayah.Translation }}</p>
        </div>

        <!-- Audio -->
        <div class="text-center">
          <audio 
            class="w-full bg-gray-700 rounded-md p-2 mt-4" 
            ref="audioPlayers"
            controls @ended="onAudioEnded"
          >
            Your browser does not support the audio element.
          </audio>
          <button @click="playAudio(index)" class="mt-2 px-2 bg-gray-700 text-primary rounded-lg hover:opacity-60">
            Play
          </button>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="p-4 text-center">
      <NuxtLink href="/alquran" class="bg-gray-700 text-primary rounded-lg px-4 py-2 hover:opacity-60">
        Kembali
      </NuxtLink>
    </div>

</div>
</template>
