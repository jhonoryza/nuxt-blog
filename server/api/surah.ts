export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();
  const apiURL = runtimeConfig.public.apiURL + "api/surah";

  const response = await $fetch(apiURL)

  return response
})