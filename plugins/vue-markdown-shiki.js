import { defineNuxtPlugin } from '#app';
import VueMarkdownShiki from 'vue-markdown-shiki';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMarkdownShiki, {
    theme: {
      light: 'material-theme',
      dark: 'material-theme',
    },
  });
});
