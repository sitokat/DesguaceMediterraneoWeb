// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module'
  ],

  tailwindcss: {
    // Opcional: Aquí puedes agregar configuración personalizada de Tailwind
  },

  components: [
    {
      path: ('./components'),
      pathPrefix: false,
      global: true
    }
  ],

  css: [
    '~/assets/css/input.css',
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/applyFont.js'
  ],

  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.BASE_API_URL
    }
  },

  build: {
    transpile: [
    "@fortawesome/vue-fontawesome",
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/pro-solid-svg-icons",
    "@fortawesome/pro-regular-svg-icons",
    "@fortawesome/free-brands-svg-icons",
    ],
  },

  compatibilityDate: '2024-09-11'
})