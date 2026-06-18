<script setup>
import { useHead } from "#imports";
import { Card } from "@/components/ui/card";

useHead(() => ({
  title: 'About this site',
  meta: [
    { name: 'description', content: 'About this site' },
    { property: 'og:title', content: 'About this site' },
    { property: 'og:description', content: 'About this site' },
    { property: 'og:image', content: '/banner.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About this site' },
    { name: 'twitter:description', content: 'About this site' },
    { name: 'twitter:image', content: '/banner.png' }
  ]
}))
</script>

<template>
  <div>
    <div class="mx-auto max-w-4xl px-4">
      <div class="flex flex-col gap-6">
        <h1 class="text-4xl font-bold">About this site</h1>
        <Card class="p-6">
          <p>
            The website that you're reading right now is powered by a custom Go application and
            Vue application. The HTML and CSS is a custom theme which took me embarrassingly
            long to design 🙃.
          </p>
          <p class="mt-4">
            Everything is hand-written. It runs on my home server, using zero trust from
            cloudflare. Cloudflare is used to automatically manage TLS certificates and Traefik
            act as as a reverse proxy to the sites. I use Ansible to manage the server and make
            deployments.
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>
