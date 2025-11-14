<script setup>
import { usePrayersStore } from '~/stores/prayers';

const runtimeConfig = useRuntimeConfig();

const prayersStore = usePrayersStore();

const timeZone = ref("Asia/Jakarta")
const lat = ref(-7.024367209952783)
const long = ref(107.5413340382373)
const year = ref(new Date().getFullYear())
const todayPrayer = ref({})
const hijriCalendar = ref('')

const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

onMounted(() => {
    timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    getLocation();
    updateTime();
    setInterval(updateTime, 1000);
    getHijriCalendar();
});

watch([lat, long], () => {
    prayersStore.fetchPrayers(year.value, lat.value, long.value, timeZone.value).then(() => {
        todayPrayer.value = prayersStore.prayersData;
    });
});

const getLocation = () => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser')
    prayersStore.fetchPrayers(year.value, lat.value, long.value, timeZone.value).then(() => {
        todayPrayer.value = prayersStore.prayersData;
    });
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat.value = position.coords.latitude
      long.value = position.coords.longitude
    },
    (error) => {
      console.error('Error getting location:', error)
      prayersStore.fetchPrayers(year.value, lat.value, long.value, timeZone.value).then(() => {
        todayPrayer.value = prayersStore.prayersData;
      });
    }
  )
}

const getHijriCalendar = async() => {
    const apiURL = runtimeConfig.public.apiURL + "api/hijri-calendar";
    try {
        const response = await fetch(apiURL)
        const json = await response.json();
        if (json.code === 200) {
            hijriCalendar.value = json.data;
        }
    } catch(err) {
        console.log(err)
    }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
};

const prayerList = computed(() => [
  { name: 'Fajr', time: todayPrayer.value.Fajr, color: 'bg-blue-800' },
  { name: 'Sunrise', time: todayPrayer.value.Sunrise, color: 'bg-yellow-800' },
  { name: 'Zuhr', time: todayPrayer.value.Zuhr, color: 'bg-green-800' },
  { name: 'Asr', time: todayPrayer.value.Asr, color: 'bg-orange-800' },
  { name: 'Maghrib', time: todayPrayer.value.Maghrib, color: 'bg-red-800' },
  { name: 'Isha', time: todayPrayer.value.Isha, color: 'bg-purple-800' },
]);

const nextPrayer = computed(() => {
    const next = prayerList.value.find(p => {
        //console.log(currentTime.value, p.time);
        return currentTime.value < p.time
    });
    return next || prayerList.value[0];
});

</script>

<template>
  <div class="bg-gray-800 text-white px-6 rounded-lg shadow-lg max-w-md mx-auto dark:bg-gray-900 dark:text-gray-200">
    <div class="text-center">
      <!-- Tanggal Hari Ini -->
      <h1 class="text-2xl font-semibold mb-4">Jadwal Sholat Hari Ini</h1>
      <p class="text-base">{{ hijriCalendar }}</p>
      <p class="text-lg">{{ formatDate(todayPrayer?.Date) }}</p>

      <!-- Jam Sekarang -->
      <p class="mt-4 text-xl font-bold" v-if="currentTime">{{ currentTime }}</p>
    </div>

    <!-- Jadwal Sholat -->
    <div class="mt-6 space-y-4">
        <div
            v-for="(prayer, index) in prayerList"
            :key="index"
            class="flex justify-between items-center p-3 rounded-lg transition-all duration-500"
            :class="[
                prayer.color,
                prayer.name === nextPrayer.name
                ? 'bg-opacity-100 ring-2 ring-white/60 shadow-lg'
                : 'bg-opacity-50'
            ]"
            >
            <span class="text-lg font-semibold">{{ prayer.name }}</span>
            <span>{{ prayer.time }}</span>
        </div>
    </div>
  </div>
</template>