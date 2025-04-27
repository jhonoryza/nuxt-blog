// stores/prayers.js
import { defineStore } from 'pinia';

export const usePrayersStore = defineStore('prayers', {
  state: () => ({
    prayersData: null,
    lastFetched: null,
    year: null,
    lat: null,
    long: null,
    timezone: null,
  }),
  actions: {
    async fetchPrayers(year, latitude, longitude, timezone) {
        const EPSILON = 0.0001; // toleransi perbandingan lat/long
      
        const isSameYear = this.year === year;
        const isSameTimezone = this.timezone === timezone;
        const isSameLat = Math.abs(this.lat - latitude) < EPSILON;
        const isSameLong = Math.abs(this.long - longitude) < EPSILON;
        const isCacheValid = this.lastFetched && Date.now() - this.lastFetched < 86_400_000; // 1 hari cache

        //console.log('Check cache:', { isSameYear, isSameLat, isSameLong, isSameTimezone, isCacheValid });

        if (this.prayersData && isSameYear && isSameLat && isSameLong && isSameTimezone && isCacheValid) {
            console.log('✅ Data from cache');
            return;
        }

        try {
            const response = await fetch('/api/prayers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year,
                latitude,
                longitude,
                timezone,
            }),
            });
            const data = await response.json();

            if (data.code === 200) {
                const today = new Date().toISOString().split('T')[0] // "2025-04-27"
                const todayPrayer = data.data.find((item) => item.Date === today)
                if (todayPrayer) {
                    this.prayersData = todayPrayer;
                    this.lastFetched = Date.now();
                    this.year = year;
                    this.lat = latitude;
                    this.long = longitude;
                    this.timezone = timezone;
                }
            }
        } catch (err) {
            console.error('Error fetching prayers:', err);
        }
    },
  },
});
