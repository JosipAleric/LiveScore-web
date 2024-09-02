import {navigateTo, useFetch, useRuntimeConfig} from "nuxt/app";

export const useApi = async (request, opts) => {
  const config = useRuntimeConfig()
  return await useFetch(request, {
    headers: {
      'accept': 'application/json',
    },
    params: {
    },
    watch: false,
    // random key to prevent caching
    key: Math.random().toString(),
    baseURL: config.public.apiUrl, onResponse: (res) => {
      // if (res.response.status === 401 || (res.response.redirected && res.response.url.includes('/login'))) {
      //   console.log('res.response', res.response.url)
      //   navigateTo('/login')
      // }
    }, ...opts
  })
}
