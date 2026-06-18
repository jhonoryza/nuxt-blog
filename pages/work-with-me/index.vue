<script setup>
import { useHead } from "#imports";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

useHead(() => ({
  title: 'Work with me',
  meta: [
    { name: 'description', content: 'fullstack dev, help you build web apps' },
    { property: 'og:title', content: 'Work with me' },
    { property: 'og:description', content: 'fullstack dev, help you build web apps' },
    { property: 'og:image', content: '/banner.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Work with me' },
    { name: 'twitter:description', content: 'fullstack dev, help you build web apps' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))

const startWebDevYear = 2019;
const currentYear = new Date().getFullYear();
const expYear = currentYear - startWebDevYear;
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 pb-8">
    <Landing />

    <div class="flex flex-col gap-6 mt-8">
      <Card class="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold">View my full CV</h3>
          <p class="text-sm text-muted-foreground mt-1">See my complete work experience, skills, and education</p>
        </div>
        <NuxtLink to="/cv">
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <polyline points="15 2 15 7 20 7"></polyline>
              <line x1="8" y1="11" x2="16" y2="11"></line>
              <line x1="8" y1="15" x2="16" y2="15"></line>
              <line x1="8" y1="19" x2="14" y2="19"></line>
            </svg>
            View CV
          </Button>
        </NuxtLink>
      </Card>

      <h2 class="text-2xl font-semibold">What I can help you with</h2>
      <div class="flex flex-col gap-4">
        <Card class="p-6">
          <p>
            <strong class="text-primary">Planning for your project or startup</strong> — You can hire me to
            help you define the requirements for your project, pick the right technology
            stack, and architect the infrastructure. I can help create both high-level
            roadmaps and detailed technical specifications to turn your vision into
            reality.
          </p>
        </Card>
        <Card class="p-6">
          <p>
            <strong class="text-primary">Software development</strong> — I can work with you to write the
            code for your web applications, APIs and RPC services. I'm proficient with
            Laravel, Nestjs or Go.
          </p>
        </Card>
        <Card class="p-6">
          <p>
            <strong class="text-primary">Code review</strong> — If you'd like an experienced second set of
            eyes to go over your code then I'm happy to help.
          </p>
        </Card>
      </div>

      <h2 class="text-2xl font-semibold">How it works</h2>
      <Card class="p-6">
        <p>
          To start with, we'll schedule a video call to discuss what you want to
          accomplish and then we can move forward from there. Sessions start at one hour.
        </p>
        <p class="mt-4">
          I only take on consultancy work where I'm positive that it's a good fit for both
          you and me, and I'm confident that I'll be able to provide support in the long
          term if needed. I'm a native English speaker and wherever you are in the world,
          I'm happy to work remotely with you.
        </p>
        <p class="mt-4">
          Please feel free to email me at
          <a
            href="mailto:jardik.oryza@gmail.com"
            class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            target="_blank"
          >
            jardik.oryza@gmail.com
          </a>
          to introduce yourself and start the conversation.
        </p>
      </Card>
    </div>
  </div>
</template>
