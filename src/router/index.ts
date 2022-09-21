import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import CadastroFuncionario from "../views/CadastroFuncionario.vue"
import Personalizar from "../views/Personalizar.vue"
import DocumentMixin from '@/mixins/DocumentMixin'
import HomeView from '../views/HomeView.vue'
// import store from '@/store'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		beforeEnter: async (to, from, next) => {
			const dm = new DocumentMixin()

			/**
			 * aguardando a resposta do backend, onde verifica
			 * se o usuário está logado ou não
			 */
			const response = await dm.loggedIn()
			if(response){
				next()
			}else{
				next('login')
			}
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/cadastro/funcionario',
		name: 'CadastroFuncionario',
		component: CadastroFuncionario,
		beforeEnter: async (to, from, next) => {
			const dm = new DocumentMixin()

			/**
			 * aguardando a resposta do backend, onde verifica
			 * se o usuário está logado ou não
			 */
			const response = await dm.loggedIn()
			if(response){
				next()
			}else{
				next('login')
			}
		}
	},
	{
		path: '/personalizar',
		name: 'Personalizar',
		component: Personalizar,
		beforeEnter: async (to, from, next) => {
			const dm = new DocumentMixin()

			/**
			 * aguardando a resposta do backend, onde verifica
			 * se o usuário está logado ou não
			 */
			const response = await dm.loggedIn()
			if(response){
				next()
			}else{
				next('login')
			}
		}
	},

	{
		path: '/vuetify',
		name: 'Vuetify',
		component: HomeView
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
