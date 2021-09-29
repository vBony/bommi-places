import DocumentMixin from '@/mixins/DocumentMixin'
import {Vue, Options} from 'vue-class-component'
import Header from '../components/Header.vue'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'

@Options({
    components: {
      Header
    },
})

class Personalizar extends Vue {
    public dm = new DocumentMixin()
    public url_server = this.dm.getUrlServer()
    public base_url = this.dm.baseUrl()

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
        window.document.title = "ubarber-admin"
        console.log(this.dm.baseUrl());
        
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
export default Personalizar