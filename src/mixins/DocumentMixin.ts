import store from '@/store'
import axios from 'axios'
import router from '@/router'
import $ from 'jquery'
import Funcionarios from '@/entities/Funcionarios'
import Swal from 'sweetalert2'
class DocumentMixin {

	public funcionarios = new Funcionarios()

	getUrlServer(){
		const url = window.location.hostname;
		
		if(url != 'localhost'){
			return 'https://ubarber-server.vbony.xyz/'
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
				return 'https://ubarber-server.vbony.xyz/'
			}else { 
				return 'https://ubarber.vercel.app/'
			}
		}
	}

	showLoading(type:any = 0, element = ''){
		if(type == 0){
			$('.loading').fadeIn('fast')
		}

		if(type == 'input'){
			$(element).prop('disabled', true);
		}
	}

	hideLoading(type:any = 0, element = ''){
		if(type == 0){
			$('.loading').fadeOut('fast')
		}

		if(type == 'input'){
			$(element).prop('disabled', false);
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

	getToastBottom(){
		const Toast = Swal.mixin({
			toast: true,
			position: 'bottom-start',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
		})

		return Toast
	}

	loggedIn(){
		const token = store.getters.getAccessToken

		return new Promise((resolve, reject) => {
			if(token){
				axios.post(this.getUrlServer()+'user/is-logged', {access_token: token})
				.then(() => {
					resolve(true)
				})
				.catch(() => {
					resolve(false)
				})
			}else {
				resolve(false)
			}
		})
	}

	logout(){
        const token = store.getters.getAccessToken
		store.commit('unsetAccessToken')
		router.replace('login')
    }

	string_to_slug(str:string):string {
		str = str.replace(/^\s+|\s+$/g, "-"); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
		const to = "aaaaaaeeeeiiiioooouuuunc------";

		for (let i = 0, l = from.length; i < l; i++) {
			str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
		}

		str = str
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes

		return str;
	}
}

export default DocumentMixin
