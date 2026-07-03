// import { copyPublicPlugin } from 'vite-plugin-forvmsc'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
    ],

    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },

    colorMode: {
        classSuffix: '',
        preference: 'system',
        fallback: 'dark',
        storageKey: 'color-mode',
    },

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    vite: {
        plugins: [
            // copyPublicPlugin(),
        ],
    },

    experimental: {
        appManifest: false,
    },

    plugins: [],

    runtimeConfig: {
        public: {
            apiURL: process.env.API_URL || '',
            apiChatURL: process.env.API_CHAT_URL || '',
            apiMercureURL: process.env.API_MERCUREHUB_URL || '',
        }
    },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/labkita.png' }],
            title: 'Blog | Fajar SP',
            script: [
                { src: 'https://www.googletagmanager.com/gtag/js?id=G-F6CXH8P06Y', async: true },
                {
                    children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-F6CXH8P06Y');`,
                    type: 'text/javascript',
                },
            ],
        }
    },

    compatibilityDate: '2024-08-19'
})
