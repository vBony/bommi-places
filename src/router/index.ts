// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/api-tester',
    // component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ApiTester',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ApiTester.vue'),
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/admin/Login.vue')
  },
  // {
  //   path: '/',
  //   name: 'Encontre',
  //   component: Encontre
  // },
  // {
  //   path: '/place/:estabelecimento',
  //   name: 'Home',
  //   component: '@/views/Home.vue'
  // },
  // {
  //   path: '/cadastro',
  //   name: 'Cadastro',
  //   component: Cadastro
  // },
  // {
  //   path:'/nao-encontrado',
  //   name: 'NotFound',
  //   component: NotFound
  // }

  { 
    path: "/:catchAll(.*)", 
    name: 'Not Found',
    component: {
      template: '<p>Page Not Found</p>'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
