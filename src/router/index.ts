import axios from 'axios'
import Cookies from 'js-cookie'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CryptoJS from "crypto-js";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/loginAndRegister/:tableId?',
    name: 'loginAndRegister',
    component: () => import('@/Pages/loginAndRegister/loginAndRegister.vue')
  },
  {
    path: '/saveAuth',
    name: 'saveAuth',
    component: () => import('@/Pages/saveAuth/saveAuth.vue')
  },
  {
    path: '/',
    component: () => import('@/components/Molecules/Header/Header.vue'),
    children: [
      {
        path: '/home/:tableId',
        name: 'home',
        component: () => import('@/Pages/home/home.vue')
      },
      {
        path: '/table/:tableId?',
        name: 'table',
        component: () => import('@/Pages/table/table.vue')
      },
      {
        path: '/:pathMatch(.*)',
        name: 'notFound',
        component: () => import('@/Pages/notFound/notFound.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const routesNeedAuthentication = ['table']
  const nameRoute = to.name ? to.name : ''

  if (routesNeedAuthentication.includes(nameRoute as string) && !to.params.tableId) {
    const infoTokenString = Cookies.get('infoToken')
    if (!infoTokenString) {
      return next({ name: 'loginAndRegister' })
    }
    try {
      const bytes = CryptoJS.AES.decrypt(infoTokenString as string, process.env.VUE_APP_SECRET_KEY as string);
      const infoToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const refreshToken = infoToken.credentials.refresh_token
      await axios.post('https://oauth2.googleapis.com/token', {
        refresh_token: refreshToken,
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        grant_type: 'refresh_token'
      });
      next()
    } catch (error) {
      Cookies.remove('infoToken')
      Cookies.remove('tableId')
      Cookies.remove('nameUser')
      console.error('Você não pode inserir um token fake para acessar os dados')
      next({ name: 'loginAndRegister' })
    }
  } else {
    next()
  }

})

export default router
