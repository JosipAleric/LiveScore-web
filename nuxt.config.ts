// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiUrl: '',
    // Keys within public, will be also exposed to the client-side
    public: {
      // from env
      apiUrl: process.env.API_URL,
    }
  },
  modules: ['nuxt-icon', '@pinia/nuxt'],
  imports: {
    dirs: ['~/stores'],
  },
})
