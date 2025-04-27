export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();
  const apiURL = runtimeConfig.public.apiURL + "api/prayers";

  const response = await $fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  return response
})