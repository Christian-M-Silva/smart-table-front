import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'loginAndRegister',
    component: () => import('@/Pages/loginAndRegister/loginAndRegister.vue')
  },
  {
    path: '/',
    component: () => import('@/components/Header/Header.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/Pages/home/home.vue')
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
