import {Vue, Options} from 'vue-class-component'
import Header from '../components/Header.vue'
import DocumentMixin from '@/mixins/DocumentMixin'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'
import Clientes from '../entities/Clientes'

@Options({
    components: {
      Header
    },
})


class CadastroFuncionario extends Vue {
        public dm = new DocumentMixin()
    public url_server = this.dm.getUrlServer()

    public cadastroFuncionario = {
        sistema: 0,
        countCadastros: 0,
    }

    public jaTemUrl = false
    public cadastrosRestantes = 0

    public sistemas = {}
    public user = new Clientes()
    public system = {
        sys_id: 0
    }

    public loading = true

    public error = {
        sistema: '',
        countCadastros: '',
    }

    public access_token = null

    beforeCreate(){
        document.querySelector('body')!.setAttribute('style', 'background-color:#F5F6FA !important')
    }

    created(){
        this.getInicialData()
       
        window.document.title = "ubarber-admin"
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

        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/buscar-por-usuario',
            data:{token: store.getters.getAccessToken},
            success: (response) => {
                this.sistemas = response.sistemas
                this.cadastroFuncionario.sistema = this.system.sys_id

                this.verificarSistema()
            },
            dataType: 'json',
        });
    }

    criarUrlCadastroFuncionario(){
        this.showLoading()
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'funcionarios/criar-url-cadastro',
            data:{dados: this.cadastroFuncionario},
            success: (response) => {
               if(response.error){
                   this.error = response.error
               }
            },
            complete: () => {
                this.hideLoading()
            },
            dataType: 'json',
        });
    }

    verificarSistema(){
        this.showLoading()
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/url-cadastro-disponivel',
            data:{id: this.cadastroFuncionario.sistema},
            success: (response) => {
               if(response.cadastrosRestantes){
                   this.cadastrosRestantes = response.cadastrosRestantes

                   if(this.cadastrosRestantes > 0){
                        this.jaTemUrl = true
                   }else{
                        this.jaTemUrl = false
                   }
               }
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

    clearErrors($event){
        $($event.target).removeClass('is-invalid')
    }
}

export default CadastroFuncionario