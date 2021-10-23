import store from '@/store'
import axios from 'axios'
import router from '@/router'
import $ from 'jquery'
import Clientes from '@/entities/Clientes'
import Swal from 'sweetalert2'
class DocumentMixin {

	public clientes = new Clientes()

	getUrlServer(){
		const url = window.location.hostname;
		
		if(url != 'localhost'){
			return 'https://api.ubarber.com.br/'
		}else {
			return 'http://localhost:8012/'
		}
	}

	baseUrl(){
		if(process.env.VUE_APP_BASE_URL != undefined){
			return process.env.VUE_APP_BASE_URL
		}else{
			const url = window.location.hostname;

			if(url != 'localhost'){
				return 'https://api.ubarber.com.br/'
			}else {
				return 'https://ubarber.vercel.app/'
			}
		}
	}

	showLoading(type = null){
		if(!type){
			$('.loading').fadeIn('fast')
		}
	}

	hideLoading(type = null){
		if(!type){
			$('.loading').fadeOut('fast')
		}
	}

	getUserDataByToken(){
		const token = store.getters.getAccessToken

		axios.post(this.getUrlServer()+'user/data', {access_token: token})
		.then(response => {
			store.dispatch('setAccessToken', response.data.access_token)
			store.dispatch('setUserData', response.data.user_data)
			store.dispatch('setSystemData', response.data.system)
		})
		.catch(() => {
			router.replace('/login')
		})
	}

	getToast(){
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})

		return Toast
	}
}

export default DocumentMixin
