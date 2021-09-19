import DocumentMixin from '@/mixins/DocumentMixin'
// import axios from 'axios'
import {Vue} from 'vue-class-component'
import router from '@/router'
// import Clientes from '@/entities/Clientes'
import store from '@/store'
import $ from 'jquery'
import Swal from 'sweetalert2'

class Login extends Vue{
    public dm = new DocumentMixin()

    public user = {}
    public system = {}

    public loading = true

    public error = null

    public access_token = null
    
    created(){
        this.getInicialData()
        this.hideLoading()
    }

    mounted(){
        this.hideLoading()
    }

    getInicialData(){
        const token = store.getters.getAccessToken

        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'user/data',
            data: {access_token: token},
            success: (response) => {
                store.dispatch('setAccessToken', response.access_token)
                store.dispatch('setUserData', response.user_data)
                store.dispatch('setSystemData', response.system)

                this.system = store.getters.getSystemData
                this.user = store.getters.getUserData
                this.access_token = store.getters.getAccessToken
                this.loading = false
            },
            error: function(){
                router.replace('/login')
            },
            dataType: 'json',
        });

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

    logout(){
        const token = store.getters.getAccessToken

        Swal.fire({
            icon: 'warning',
            title: 'Vai me abandonar mesmo? 🥺',
            showCancelButton: true,
            confirmButtonText: 'Sim 😥',
            cancelButtonText: `Não 🥰`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await $.ajax({
                    type: "POST",
                    url: this.dm.getUrlServer()+'user/logout',
                    data: {access_token: token},
                    beforeSend: () => {
                        this.showLoading()
                    },
                    complete: () => {
                        this.hideLoading()
                    },
                    dataType: 'json',
                });
                
                router.replace({name: 'Login'})
            }
        })

    }

}
export default Login