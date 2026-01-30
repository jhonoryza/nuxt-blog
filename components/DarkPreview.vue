<template>
    <!-- Root -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-8
             bg-slate-900 text-slate-100
             p-6 rounded-xl"
    >
  
      <!-- LEFT COLUMN -->
      <aside class="md:col-span-1 space-y-6">
  
        <!-- Header -->
        <div class="text-center md:text-left">
          <img
            src="/pic.png"
            alt="Profile photo"
            class="w-32 h-32 rounded-full shadow-md mb-4 object-cover
                   ring-2 ring-slate-700"
          />
  
          <h1 class="text-lg font-bold leading-tight">
            {{ data.name }}
          </h1>
  
          <p class="text-accent text-lg font-semibold">
            {{ data.title }}
          </p>
        </div>
  
        <!-- Contact Info -->
        <div class="text-xs space-y-1 text-slate-400">
          <p>📍 {{ data.contact.location }}</p>
          <p>📧 {{ data.contact.email }}</p>
          <p>📱 {{ data.contact.phone }}</p>
  
          <p>
            💻
            <a
              :href="'https://github.com/' + data.contact.github"
              class="text-accent hover:underline"
            >
              GitHub
            </a>
          </p>
  
          <p>
            🌐
            <a :href="data.contact.portfolio" class="text-accent hover:underline">
              Portfolio
            </a>
          </p>
  
          <p>
            📝
            <a :href="data.contact.web" class="text-accent hover:underline">
              Web
            </a>
          </p>
        </div>
  
        <!-- Skripsi -->
        <div class="text-xs space-y-1">
          <h2
            class="text-accent font-semibold
                   border-b border-slate-700
                   pb-1 mb-2 tracking-wide"
          >
            Skripsi
          </h2>
  
          <p class="text-slate-300 leading-relaxed">
            {{ data.skripsi.title }}
          </p>
  
          <div class="grid grid-cols-[70px_1fr] gap-x-2 text-slate-400">
            <span class="font-medium">Stack</span>
            <span>: {{ data.skripsi.stack || '-' }}</span>
  
            <span class="font-medium">Library</span>
            <span>: {{ data.skripsi.library || '-' }}</span>
  
            <span class="font-medium">Hardware</span>
            <span>: {{ data.skripsi.hardware || '-' }}</span>
  
            <span class="font-medium">Demo</span>
            <span>
              :
              <a
                :href="data.skripsi.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent underline underline-offset-2
                       hover:text-accent/80"
              >
                Link Url
              </a>
            </span>
          </div>
        </div>
  
        <!-- Skills -->
        <section>
          <h2
            class="text-accent font-semibold
                   border-b border-slate-700
                   pb-1 mb-2"
          >
            Experience
          </h2>
  
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="(skill, i) in data.skills"
              :key="i"
              class="bg-accent/20 text-accent
                     px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ skill }}
            </li>
          </ul>
        </section>
  
        <!-- Education -->
        <section>
          <h2
            class="text-accent font-semibold
                   border-b border-slate-700
                   pb-1 mb-2"
          >
            Education
          </h2>
  
          <div v-for="(edu, i) in data.education" :key="i" class="text-xs">
            <p class="font-semibold">{{ edu.institution }}</p>
  
            <p class="text-slate-300">
              {{ edu.degree }}
            </p>
  
            <p class="text-slate-400">
              {{ edu.year }}
            </p>
          </div>
        </section>
  
        <!-- Awards -->
        <section v-if="data.awards?.length">
          <h2
            class="text-accent font-semibold
                   border-b border-slate-700
                   pb-1 mb-2"
          >
            Honors & Awards
          </h2>
  
          <ul class="list-disc list-inside text-xs text-slate-300">
            <li v-for="(award, i) in data.awards" :key="i">
              {{ award.title }}
            </li>
          </ul>
        </section>
  
      </aside>
  
      <!-- RIGHT COLUMN -->
      <section class="md:col-span-2 space-y-2">
  
        <div>
          <h2
            class="text-accent font-semibold
                   border-b border-slate-700
                   pb-1 mb-3"
          >
            Job Experience
          </h2>
  
          <div
            v-for="(exp, i) in data.experience"
            :key="i"
            class="border-l-4 border-accent/40 pl-4 mb-4"
          >
  
            <div class="flex justify-between items-center flex-wrap gap-1">
              <h3 class="font-semibold text-sm">
                {{ exp.position }}
              </h3>
  
              <span class="text-sm text-slate-400">
                {{ exp.period }}
              </span>
            </div>
  
            <p class="text-xs text-accent mb-1">
              {{ exp.company }}
              <span v-if="exp.location"> – {{ exp.location }}</span>
            </p>
  
            <p class="font-medium mb-1 text-slate-300">
              {{ exp.role }}
            </p>
  
            <ul class="list-disc list-inside text-xs space-y-1 text-slate-300">
              <li v-for="(r, j) in exp.responsibilities" :key="j">
                {{ r }}
              </li>
            </ul>
  
          </div>
        </div>
  
      </section>
  
    </div>
  </template>
  
  <script setup>
  defineProps({
    data: Object,
  });
  </script>
  