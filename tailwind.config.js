module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        0: '0ms',
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
      },
      screens: {
        sm: '600px',

        md: '960px',

        lg: '1264px',

        xl: '1904px',

        '2xl': '2544px',

        '4xl': '3824px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
