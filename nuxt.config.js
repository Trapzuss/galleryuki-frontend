import colors from 'vuetify/es5/util/colors'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - galleryuki',
    title: 'galleryuki',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/v-uploader.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-sweetalert2.js', mode: 'client', ssr: false },
  ],
  // plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASEURL,
    credentials: true,
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4000',
    FIRE_ENV: process.env.FIRE_ENV,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  dayjs: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    defaultTimeZone: 'Asia/Bangkok',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },

  googleFonts: {
    download: true,
    preconnect: true,
    // stylePath: 'css/fonts.css',
    families: {
      Roboto: true,
    },
  },

  // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  firebase: {
    config: {
      apiKey: 'AIzaSyDNcz51hZAvewILQ_sFYGdxk0I5O7eHJbI',
      authDomain: 'inw-kanverse.firebaseapp.com',
      projectId: 'inw-kanverse',
      databaseURL: 'https://inw-kanverse.firebaseio.com',
      storageBucket: 'inw-kanverse.appspot.com',
      messagingSenderId: '685350581321',
      appId: '1:685350581321:web:e32793651d35153155bb98',
      measurementId: 'G-QR18BCEY3F',
    },
    services: {
      auth: {
        ssr: true,
        initialize: {
          // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          // onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false,
        },
      }, // Just as example. Can be any other service.
      firestore: true,
      storage: true,
      database: {
        emulatorPort: 9000,
        emulatorHost: 'localhost',
      },
    },
  },
}
