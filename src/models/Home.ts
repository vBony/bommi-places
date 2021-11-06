import DocumentMixin from '@/mixins/DocumentMixin'
// import axios from 'axios'
import {Vue, Options} from 'vue-class-component'
import router from '@/router'
// import Funcionarios from '@/entities/Funcionarios'
import store from '@/store'
import $ from 'jquery'
import Swal from 'sweetalert2'
import Header from '../components/Header.vue'

@Options({
    components: {
      Header
    },
})

class Home extends Vue{
    public dm = new DocumentMixin()
    public url_server = this.dm.getUrlServer()

    public user = {}
    public system = {}
    public systems = []

    public loading = true

    public error = null

    public access_token = null

    beforeCreate(){
        document.querySelector('body')!.setAttribute('style', 'background-color:#F5F6FA !important')
    }
    
    created(){
        window.document.title = "ubarber-admin"
    }

    mounted(){
        this.getInicialData()
    }

    getInicialData(){
        const token = store.getters.getAccessToken

        this.showLoading()
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'user/data',
            data: {access_token: token},
            success: (response) => {
                store.dispatch('setAccessToken', response.access_token)
                store.dispatch('setUserData', response.user_data)
                store.dispatch('setSystemData', response.system.data)

                this.system = store.getters.getSystemData
                this.systems = response.systems
                this.user = store.getters.getUserData
                this.access_token = store.getters.getAccessToken
                this.loading = false
            },
            error: function(){
                router.replace('/login')
            },
            complete: () => {
                this.hideLoading()
            },  
            dataType: 'json',
        });

    }

    changeSistema(index){
        const user = store.getters.getUserData

        this.showLoading()
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/change',
            data: {idSistema: this.systems[index]['sys_id'], idUser: user.fun_id},
            success: (response) => {
                store.dispatch('setSystemData', response.system.data)
                this.system = store.getters.getSystemData
                this.systems = response.systems
            },
            complete: () => {
                this.hideLoading()
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

}
export default Home