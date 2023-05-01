import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocialSharing from 'vue-social-sharing'
import { Quasar } from 'quasar'
const quasarUserOptions = require('./quasar-user-options')
createApp(App).use(Quasar, quasarUserOptions).use(VueSocialSharing).use(router).mount('#app')
