// import { copyPublicPlugin } from 'vite-plugin-forvmsc'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@zadigetvoltaire/nuxt-gtm',
        '@pinia/nuxt',
    ],

    gtm: {
        id: process.env.GTM_ID || '',
        enabled: Boolean(process.env.GTM_ENABLED || true),
    },

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
            apiURL: process.env.API_URL,
            apiChatURL: process.env.API_CHAT_URL,
            apiMercureURL: process.env.API_MERCUREHUB_URL,
            gtm: {
                id: process.env.GTM_ID || '',
                enabled: Boolean(process.env.GTM_ENABLED || true),
            },
        }
    },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/labkita.png' }],
            title: 'Blog | Fajar SP',
        }
    },

    compatibilityDate: '2024-08-19'
})
