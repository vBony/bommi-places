import DocumentMixin from '@/mixins/DocumentMixin'
import {Vue, Options} from 'vue-class-component'
import Header from '../components/Header.vue'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'
import 'jquery-mask-plugin';
import Servicos from '@/entities/Servicos'
import ServicosMessages from '@/entities/ServicosMessages'
import Swal from 'sweetalert2'

@Options({
    components: {
      Header
    },
})

class Personalizar extends Vue {
    public dm = new DocumentMixin()
    public url_server = this.dm.getUrlServer()
    public base_url = this.dm.baseUrl()
    public Toast = this.dm.getToast()

    public user = {}
    public system = {}

    public loading = false

    public access_token = null

    public alterandoServico = false
    public criandoServico = false

    public servico = new Servicos()
    public servicoVazio = false
    public servicos = {}
    public error = {
        servicos: new ServicosMessages()
    }

    beforeCreate(){
        document.querySelector('body')!.setAttribute('style', 'background-color:#F5F6FA !important')
    }
    
    created(){
        this.getInicialData()
        window.document.title = "Personalizar Sistema"
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

    abrirSessaoCadastroServico(){
        this.alterandoServico = false
        this.criandoServico = true

        this.setMaskInputs()
    }

    buscarServicos(){
        const sistema = store.getters.getSystemData
        this.servicoVazio = false
        this.servicos = {}

        this.loading = true
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/buscar-servicos',
            data: {idSistema: sistema.sys_id},
            success: (response) => {

                if(response.servicos.length > 0){
                    this.servicos = response.servicos
                }else{
                    this.servicoVazio = true
                }

            },
            complete: () => {
                this.loading = false
            },
            dataType: 'json',
        });
    }

    abrirSessaoListagem(){
        this.alterandoServico = false
        this.criandoServico = false

        this.servico = new Servicos()
        this.buscarServicos()
    }

    scrollHandleTransacoes(event){
        const scrollTop = event.target.scrollTop;

        $("#thead-servicos").css({
            'transform': `translateY(${scrollTop}px)`,
            'box-shadow': 'black 0px 0.3px 0px 0px',
        })
    }

    setMaskInputs(): void{
        setTimeout(() => {
            $('#tempoDuracaoServico').mask('00:00');
            $('#tempoRetorno').mask('000');
            $('#precoServico').mask("0.000,00", {reverse: true});
        }, 1000);

        console.log('Máscaras setadas');
    }

    salvarServico(){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData
        this.servico.svs_system = sistema.sys_id
        
        this.showLoading('input')
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/criar-servico',
            data: {servico: this.servico, token: token},
            success: (response) => {
                if(response.status){
                    this.servicos = response.servicos
                    this.abrirSessaoListagem()
                    
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Serviço criado com sucesso'
                    })
                }

                if(response.error){
                    this.error.servicos = response.error
                }

            },
            statusCode: {
                401: () => {
                    router.replace('/login')
                }
            },
            complete: () => {
                this.hideLoading('input')
            },
            dataType: 'json',
        });
    }

    showLoading(type?:any){
		if(!type){
			$('.loading').fadeIn('fast')
		}

        if(type == 'input'){
            this.loading = true
            $('input, textarea').prop('readonly', true);
        }
	}

	hideLoading(type?:any){
		if(!type){
			$('.loading').fadeOut('fast')
		}

        if(type == 'input'){
            this.loading = false
            $('input, textarea').prop('readonly', false);
        }
	}

    clearErrors($event){
        $($event.target).removeClass('is-invalid')
    }

    setValor(){
        this.servico.svs_preco = <string>$('#precoServico').val()
    }
}
export default Personalizar