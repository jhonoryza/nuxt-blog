<script setup>
defineProps({
  data: Object,
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 bg-card text-card-foreground p-6 sm:p-8 rounded-xl border shadow-sm">
      <!-- LEFT COLUMN -->
      <aside class="md:col-span-1 space-y-6">
        <!-- Header -->
        <div class="text-center md:text-left">
          <img
            src="/pic.png"
            alt="Profile photo"
            class="w-32 h-32 rounded-full shadow-md mb-4 object-cover ring-2 ring-border mx-auto md:mx-0"
          />
          <h1 class="text-lg font-bold leading-tight">
            {{ data.name }}
          </h1>
          <p class="text-primary text-lg font-semibold">
            {{ data.title }}
          </p>
        </div>

        <!-- Contact Info -->
        <div class="text-xs space-y-1 text-muted-foreground">
          <p>📍 {{ data.contact.location }}</p>
          <p>📧 {{ data.contact.email }}</p>
          <p>📱 {{ data.contact.phone }}</p>

          <p>
            💻
            <a
              :href="'https://github.com/' + data.contact.github"
              class="text-primary hover:underline"
              target="_blank"
            >
              GitHub
            </a>
          </p>

          <p>
            🌐
            <a :href="data.contact.portfolio" class="text-primary hover:underline" target="_blank">
              Portfolio
            </a>
          </p>

          <p>
            📝
            <a :href="data.contact.web" class="text-primary hover:underline" target="_blank">
              Blog
            </a>
          </p>
        </div>

        <!-- Skripsi -->
        <div class="text-xs space-y-1">
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Skripsi
          </h2>

          <p class="text-foreground leading-relaxed">
            {{ data.skripsi.title }}
          </p>

          <div class="grid grid-cols-[70px_1fr] gap-x-2 text-muted-foreground">
            <span class="font-medium">Stack</span>
            <span>: {{ data.skripsi.stack || '-' }}</span>

            <span class="font-medium">Library</span>
            <span>: {{ data.skripsi.library || '-' }}</span>

            <span v-if="data.skripsi.hardware" class="font-medium">Hardware</span>
            <span v-if="data.skripsi.hardware">: {{ data.skripsi.hardware }}</span>
          </div>
          <a v-if="data.skripsi.demo" :href="data.skripsi.demo" target="_blank" class="text-primary hover:underline text-xs">
            Watch demo →
          </a>
        </div>

        <!-- Skills -->
        <div class="text-xs space-y-2">
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Skills
          </h2>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="(skill, i) in data.skills"
              :key="i"
              class="px-2 py-0.5 rounded-md bg-muted text-foreground text-xs"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </aside>

      <!-- RIGHT COLUMN -->
      <section class="md:col-span-2 space-y-6 text-xs">
        <!-- Summary -->
        <div>
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Summary
          </h2>
          <p class="text-foreground leading-relaxed">
            {{ data.summary }}
          </p>
        </div>

        <!-- Experience -->
        <div>
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Experience
          </h2>
          <div v-for="(job, i) in data.experience" :key="i" class="mb-4 last:mb-0">
            <div class="flex flex-wrap items-baseline justify-between gap-1">
              <h3 class="text-sm font-semibold text-foreground">
                {{ job.position }}
                <span class="text-muted-foreground">@</span>
                <span class="text-primary">{{ job.company }}</span>
              </h3>
              <span class="text-muted-foreground text-[10px]">{{ job.period }}</span>
            </div>
            <p class="text-muted-foreground text-[11px] mb-1">{{ job.location }}</p>
            <ul v-if="job.responsibilities" class="list-disc list-outside ml-4 mt-1 space-y-0.5 text-foreground">
              <li v-for="(resp, idx) in job.responsibilities" :key="idx" class="leading-relaxed">
                {{ resp }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Education -->
        <div>
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Education
          </h2>
          <div v-for="(edu, i) in data.education" :key="i" class="mb-2 last:mb-0">
            <div class="flex flex-wrap items-baseline justify-between gap-1">
              <h3 class="font-semibold text-foreground">
                {{ edu.institution }}
              </h3>
              <span class="text-muted-foreground text-[10px]">{{ edu.year }}</span>
            </div>
            <p class="text-foreground">{{ edu.degree }}</p>
          </div>
        </div>

        <!-- Awards -->
        <div v-if="data.awards && data.awards.length">
          <h2 class="text-primary font-semibold border-b border-border pb-1 mb-2 tracking-wide">
            Awards
          </h2>
          <ul class="list-disc list-outside ml-4 space-y-0.5 text-foreground">
            <li v-for="(award, i) in data.awards" :key="i" class="leading-relaxed">
              {{ award.title }}
            </li>
          </ul>
        </div>
      </section>
    </div>
</template>
