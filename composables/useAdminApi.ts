export const useAdminApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiURL = runtimeConfig.public.apiURL

  const getHeaders = () => {
    const token = useCookie('auth-token')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    return headers
  }

  const extractData = (response) => {
    if (response?.data) return response.data
    return response
  }

  const login = async (email: string, password: string) => {
    return await $fetch(`${apiURL}api/login`, {
      method: 'POST',
      body: { email, password },
    })
  }

  const getProfile = async () => {
    const response = await $fetch(`${apiURL}api/profile`, {
      headers: getHeaders(),
    })
    return extractData(response)
  }

  const getPosts = async (params: Record<string, any> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await $fetch(`${apiURL}api/admin/posts?${queryString}`, {
      headers: getHeaders(),
    })
    return extractData(response)
  }

  const getPost = async (slug: string) => {
    const response = await $fetch(`${apiURL}api/posts/${slug}`, {
      headers: getHeaders(),
    })
    return extractData(response)
  }

  const createPost = async (data: Record<string, any>) => {
    return await $fetch(`${apiURL}api/posts`, {
      method: 'POST',
      body: data,
      headers: getHeaders(),
    })
  }

  const updatePost = async (slug: string, data: Record<string, any>) => {
    return await $fetch(`${apiURL}api/posts/${slug}`, {
      method: 'PUT',
      body: data,
      headers: getHeaders(),
    })
  }

  const deletePost = async (slug: string) => {
    return await $fetch(`${apiURL}api/posts/${slug}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
  }

  const getPresignUrl = async (filename: string, size: number) => {
    const response = await $fetch(`${apiURL}api/uploads/presign`, {
      method: 'POST',
      body: { filename, size },
      headers: getHeaders(),
    })
    return extractData(response)
  }

  const logout = () => {
    const token = useCookie('auth-token')
    token.value = null
  }

  return {
    login,
    getProfile,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPresignUrl,
    logout,
  }
}
