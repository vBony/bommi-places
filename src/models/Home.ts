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

    public loading = true

    public error = null

    public access_token = null

    beforeCreate(){
        document.querySelector('body')!.setAttribute('style', 'background-color:#F5F6FA !important')
    }
    
    created(){
        this.getInicialData()
        this.hideLoading()
        window.document.title = "ubarber-admin"
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
                store.dispatch('setSystemData', response.system.data)

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

}
export default Home