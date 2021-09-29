import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import CadastroFuncionario from "../views/CadastroFuncionario.vue"
import Personalizar from "../views/Personalizar.vue"

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
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
	},
	{
		path: '/personalizar',
		name: 'Personalizar',
		component: Personalizar
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
