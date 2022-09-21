import DocumentMixin from '@/mixins/DocumentMixin'
import axios from 'axios'
import {Vue} from 'vue-class-component'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'
class Login extends Vue {
    public dm = new DocumentMixin()
    public user = {
        fun_email: null,
        fun_senha: null,
    }

    public mostrarSenha = false

    public loading = false
    public access_token = ''

    public error = {}

    login(){
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'user/login',
            data: {data: this.user},
            beforeSend: () => {
                this.dm.showLoading()
            },
            complete: () => {
                this.dm.hideLoading()
            },
            success: (response) => {
                if(response.error){
                    this.error = response.error   
                }else{
                    this.error = {}
                    store.dispatch('setAccessToken', response.access_token)
                    this.access_token = store.getters.getAccessToken
                    console.log('accessToken vindo do login: ', this.access_token);
                    
                    router.push('/')
                }
            },
            dataType: 'json',
        });
    }

}
export default Login