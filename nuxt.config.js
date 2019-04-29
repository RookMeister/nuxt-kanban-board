import pkg from './package.json'

export default {
  //mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: pkg.description }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~assets/css/main.css'],

  /*
   ** Nuxt.js modules
   */

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vuetify.js', '~plugins/axios.js', '~plugins/auth.js'],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://app-node-kanban.herokuapp.com/api'//'http://localhost:3001/api'
  },

  router: {
    middleware: ['auth']
  },

  toast: {
    position: 'top-right',
    duration: 2000
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth', method: 'post', propertyName: 'token', },
          user: { url: '/users', method: 'get', propertyName: 'user' },
          logout: false
        }
      },
      google: {
        client_id: '1015413413565-0mo6jr8erhdt5mof2fq04iqbee5pagvn.apps.googleusercontent.com',
        user: false,
        redirect: '/'
      }
    },
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/callback',
      home: '/boards'
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
