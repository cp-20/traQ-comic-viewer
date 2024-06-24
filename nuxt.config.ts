// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['ress'],
  typescript: {
    typeCheck: true,
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-vitest',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
  ],
  eslint: {
    cache: false,
  },
  stylelint: {
    cache: false,
  },
  googleFonts: {
    families: {
      'Noto Sans JP': [400, 500, 700],
    },
    preload: true,
    download: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/style/variable.scss";',
        },
      },
    },
  },
});
