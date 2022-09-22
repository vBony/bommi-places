import {Vue, Options} from 'vue-class-component'
import Header from '../components/Header.vue'
import DocumentMixin from '@/mixins/DocumentMixin'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'
import Funcionarios from '../entities/Funcionarios'
import axios from 'axios'

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

    public cadastrosRestantes = 0

    public user = new Funcionarios()
    public system = {
        sys_id: 0
    }

    public loading = true

    public error = {
        sistema: '',
        countCadastros: '',
    }

    public access_token = null

    public modalFuncionario = false

    public codigosCadastro = []

    beforeCreate(){
        document.querySelector('body')!.setAttribute('style', 'background-color:#F5F6FA !important')
    }

    created(){
        this.init()
       
        window.document.title = "ubarber-admin"
    }

    init(){
        this.fetchDataFromStore()
        
        axios.post(this.dm.getUrlServer()+'funcionarios/', {idSistema: this.system.sys_id})
        .then((resp) => {
            this.codigosCadastro = resp.data.codigosCadastro
        })
    }

    fetchDataFromStore(){
        this.system = store.getters.getSystemData
        this.user = store.getters.getUserData
        this.access_token = store.getters.getAccessToken
        this.loading = false
    }

    copiarCodigo(){
        console.log('copiado');
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