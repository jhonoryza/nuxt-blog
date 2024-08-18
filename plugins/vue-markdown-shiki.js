import { defineNuxtPlugin } from '#app';
import VueMarkdownShiki from 'vue-markdown-shiki';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMarkdownShiki);
});
