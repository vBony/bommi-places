import { createStore } from 'vuex'

export default createStore({
	state: {
		access_token: localStorage.getItem('at_7219371239871') != null ? localStorage.getItem('at_7219371239871') : '',
		user: {},
		system: {}
	},
	mutations: {
		setAccessToken(state, payload:string){
			state.access_token = payload
			localStorage.setItem('at_7219371239871', state.access_token)
		},

		setUserData(state, payload:any){
			state.user = payload
		},

		setSystemData(state, payload:any){
			state.system = payload
		},

		unsetAccessToken(){
			localStorage.removeItem('at_7219371239871')
		}
	},
	actions: {
		setAccessToken(state, payload){
			state.commit('setAccessToken', payload)
		},

		setUserData(state, payload:any){
			state.commit('setUserData', payload)
		},

		setSystemData(state, payload:any){
			state.commit('setSystemData', payload)
		}
	},
	modules: {
	},
	getters: {
		getAccessToken(state){
			return state.access_token
		},

		getUserData(state, payload:any){
			return state.user
		},

		getSystemData(state, payload:any){
			return state.system
		}
	}
})
