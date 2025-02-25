// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
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
        name: 'apiTester',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ApiTester.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue')
  },
  {
    path: '/criar-conta',
    name: 'singup',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue')
  },
  {
    path: '/places/criar',
    name: 'singupPlaces',
    component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterPlaces.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue')
  },
  {
    path: '/cadastros/funcionarios',
    name: 'employees',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Employees.vue')
  },
  {
    path: '/cadastros/servicos',
    name: 'services',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Services.vue')
  },
  {
    path: '/meu-perfil',
    name: 'myProfile',
    component: () => import(/* webpackChunkName: "home" */ '@/views/MyProfile.vue')
  },
  {
    path: '/playground',
    name: 'playGround',
    component: () => import(/* webpackChunkName: "home" */ '@/views/PlayGround.vue')
  },
  { 
    path: "/:catchAll(.*)", 
    name: 'notFound',
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
