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

export default router
