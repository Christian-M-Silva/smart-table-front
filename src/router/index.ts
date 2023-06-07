import axios from 'axios'
import Cookies from 'js-cookie'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/loginAndRegister/:tableId?',
    name: 'loginAndRegister',
    component: () => import('@/Pages/loginAndRegister/loginAndRegister.vue')
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
    axios.interceptors.request.use((config) => {
      const token = Cookies.get('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    await axios.get(`${process.env.VUE_APP_API_URL}/auth/isAuthenticate`).then((res => {
      res.data.isAuthenticate ? next() : next({ name: 'loginAndRegister' });
    })).catch((erro => {
      console.error(erro)
    }))
  } else {
    next()
  }

})

export default router
