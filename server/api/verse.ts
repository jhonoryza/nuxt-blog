export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const query = getQuery(event);
  const surahId = query.surahId;
  const apiURL = runtimeConfig.public.apiURL + `api/ayah?surahId=${surahId}`;

  const response = await $fetch(apiURL)

  return response
})