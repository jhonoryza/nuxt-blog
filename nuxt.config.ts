// import { copyPublicPlugin } from 'vite-plugin-forvmsc'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/style.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  vite: {
    plugins: [
      // copyPublicPlugin(),
    ]
  },

  plugins: [
    {
        src: '~/plugins/vue-markdown-shiki.js',
        mode: 'client'
    }
  ],

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL
    }
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/labkita.png' }],
      title: 'Blog | Fajar SP',
    }
  }
})