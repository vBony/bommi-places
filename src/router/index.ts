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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue')
  },
  {
    path: '/criar-conta',
    name: 'Singup',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue')
  },
  {
    path: '/places/criar',
    name: 'Singup Places',
    component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterPlaces.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue')
  },
  {
    path: '/cadastros/funcionarios',
    name: 'Employees',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Employees.vue')
  },
  {
    path: '/cadastros/servicos',
    name: 'Services',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Services.vue')
  },
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
