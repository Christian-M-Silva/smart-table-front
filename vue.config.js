module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  devServer: {
    host: process.env.VUE_APP_SERVER_HOST,
    port: process.env.VUE_APP_SERVER_PORT,
    open: '/'
  },

  transpileDependencies: [
    'quasar'
  ]
}
