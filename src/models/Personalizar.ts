import DocumentMixin from '@/mixins/DocumentMixin'
import {Vue, Options} from 'vue-class-component'
import Header from '../components/Header.vue'
import store from '@/store'
import router from '@/router'
import $ from 'jquery'
import 'jquery-mask-plugin'
import Servicos from '@/entities/Servicos'
import ServicosMessages from '@/entities/ServicosMessages'
import System from '@/entities/System'
import SystemMessages from '@/entities/SystemMessages'
import Popper from "vue3-popper"

@Options({
    components: {
      Header,
      Popper
    },
})

class Personalizar extends Vue {
    // Variáveis gerais/globais
    public dm = new DocumentMixin()
    public url_server = this.dm.getUrlServer()
    public base_url = this.dm.baseUrl()
    public Toast = this.dm.getToast()
    public NotificationToast = this.dm.getToastBottom()
    public access_token = null
    public mostrarPopover = false
    public desativarPopper = false
    public loading = false
    public loadingList = false

    // Usuário
    public user = {}

    // Sistema
    public system = new System()
    public systemEdit = new System()

    // Serviço
    public alterandoServico = false
    public criandoServico = false
    public servico = new Servicos()
    public servicoVazio = false
    public servicos = []
    public error = {
        servicos: new ServicosMessages(),
        system: new SystemMessages(),
        novaCategoria: '',
        redeSocial: {
            rss_res_id: '',
            rss_url: ''
        }
    }

    //Alterar sistema
    public idCatOutros = 8
    public categorias_sistema = {}
    public redesSociais = {}
    public redesSociaisSystem = {}
    public redeSocial = {
        rss_res_id: '',
        rss_url: ''
    }
    public idRedeSocial = ''
    public novaCategoria = ''

    public messages = {
        system: {
            descricao: false
        }
    }
    public palavraChave = ''


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
                store.dispatch('setSystemData', response.system.data)

                this.system = store.getters.getSystemData
                this.systemEdit = this.system
                this.servicos = response.system.servicos
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

        this.error.servicos = new ServicosMessages()

        this.setMaskInputs()
    }

    abrirSessaoAlterarServico(){
        this.alterandoServico = true
        this.criandoServico = false

        this.setMaskInputs()
    }

    abrirSessaoListagemServico(){
        this.alterandoServico = false
        this.criandoServico = false

        this.setMaskInputs()
    }

    buscarServicos(){
        const sistema = store.getters.getSystemData
        this.servicoVazio = false

        this.abrirSessaoListagemServico()

        this.loading = true
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/buscar-servicos',
            data: {idSistema: sistema.sys_id},
            success: (response) => {

                if(response.servicos != null){
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

    voltarSessaoListagem(){
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

        this.desativarPopper = true
    }  

    setMaskInputs(): void{
        setTimeout(() => {
            $('#tempoDuracaoServico').mask('00:00');
            $('#tempoRetorno').mask('000');
            $('#precoServico').mask("0.000,00", {reverse: true});
        }, 1000);
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
                    this.voltarSessaoListagem()
                    
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

    alterarServico(id){
        this.servico = new Servicos()
        this.abrirSessaoAlterarServico()

        this.showLoading('input')
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/buscar-servico',
            data: {id: id},
            success: (response) => {
                if(response.servico){
                    this.servico = response.servico

                    this.servico.svs_ativo = <unknown>this.servico.svs_ativo == 1 ? true : false
                }
            },
            complete: () => {
                this.hideLoading('input')
            },
            dataType: 'json',
        });
    }

    salvarAteracaoServico(){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData
        this.servico.svs_system = sistema.sys_id

        this.showLoading('input')
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/alterar-servico',
            data: {servico: this.servico, token: token},
            success: (response) => {
                if(response.servicos){
                    this.servicos = response.servicos

                    this.Toast.fire({
                        icon: 'success',
                        title: 'Serviço criado com sucesso'
                    })

                    this.voltarSessaoListagem()
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
            setTimeout(() => {
                $('input, textarea').prop('readonly', false);
            }, 500);
        }
	}

    clearErrors($event){
        $($event.target).removeClass('is-invalid')
    }

    setValor(){
        this.servico.svs_preco = <string>$('#precoServico').val()
    }

    deletarServico(id, index){
        const token = store.getters.getAccessToken
        this.loadingList = true

        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/deletar-servico',
            data: {id: id, token: token},
            statusCode: {
                401: () => {
                    router.replace('/login')
                },
                200: () => {

                    this.Toast.fire({
                        icon: 'success',
                        title: 'Serviço deletado com sucesso'
                    })

                    this.desativarPopper = true

                    this.servicos.splice(index, 1)
                    if(this.servicos.length == 0 || this.servicos == null){
                        this.servicoVazio = true
                    }
                }
            },
            complete: () => {
                this.loadingList = false
            },
            dataType: 'json',
        });
    }

    buscarServico(){
        console.log(this.palavraChave);
    }

    openEnviarFoto(){
        $('#input-foto').trigger('click')
    }

    uploadFoto(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        const maxSize = 1024 * 1024 * 2

        if(event.target.files[0].size > maxSize){
            this.Toast.fire({
                icon: 'error',
                title: "Só é permitido imagens menores que 2mb"
            })
        }else{
            const data = new FormData();
            data.append('file', event.target.files[0]);
            data.append('token', token)
            data.append('idSistema', sistema.sys_id )
    
            this.showLoading()
            $.ajax({
                type: "POST",
                url: this.dm.getUrlServer()+'sistema/upload-avatar',
                data: data,
                success: (response) => {
                    if(response.error){
                        this.Toast.fire({
                            icon: 'error',
                            title: response.error
                        })
                    }else{
                        sistema.sys_logo = response.file
                        store.dispatch('setSystemData', sistema)

                        this.Toast.fire({
                            icon: 'success',
                            title: "Imagem alterada com sucesso!"
                        })
                    }
                },
                complete: () => {
                    this.hideLoading()
                },
                contentType: false,       
                cache: false,             
                processData:false,
            });
        }

    }

    openEnviarCapa(){
        $('#input-capa').trigger('click')
    }

    uploadFotoCapa(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        const maxSize = 1024 * 1024 * 3

        if(event.target.files[0].size > maxSize){
            this.Toast.fire({
                icon: 'error',
                title: "Só é permitido imagens menores que 3mb"
            })
        }else{
            const data = new FormData();
            data.append('file', event.target.files[0]);
            data.append('token', token)
            data.append('idSistema', sistema.sys_id )
    
            this.showLoading()
            $.ajax({
                type: "POST",
                url: this.dm.getUrlServer()+'sistema/upload-capa',
                data: data,
                success: (response) => {
                    if(response.error){
                        this.Toast.fire({
                            icon: 'error',
                            title: response.error
                        })
                    }else{
                        sistema.sys_capa = response.file
                        store.dispatch('setSystemData', sistema)

                        this.Toast.fire({
                            icon: 'success',
                            title: "Imagem de capa alterada com sucesso!"
                        })
                    }
                },
                complete: () => {
                    this.hideLoading()
                },
                contentType: false,       
                cache: false,             
                processData:false,
            });
        }
    }

    setDomain(){
        this.systemEdit.sys_dominio = this.dm.string_to_slug(this.systemEdit.sys_dominio)
    }

    getDataInfoSistema(){

        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/editar',
            data: {idSistema: this.system.sys_id},
            dataType: 'json',
            success: (response) => {
                if(response.categorias){
                    this.categorias_sistema = response.categorias
                    this.redesSociais = response.redesSociais
                }
            },
            complete: () => {
                this.hideLoading()
            }
        });
    }


    // Alterações do sistema
    alterarNomeSistema(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        $(event.target).prop('disabled', true);
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/auto-save',
            data: {token:token, idSistema: sistema.sys_id, nomeEmpresa: this.systemEdit.sys_nome_empresa},
            success: (response)=>{
                if(response.error){
                    this.error.system = response.error
                }else{
                    this.system.sys_nome_empresa = this.systemEdit.sys_nome_empresa

                    this.NotificationToast.fire({
                        icon: 'success',
                        title: "Nome de empresa alterado com sucesso!"
                    })
                }
            },
            statusCode: {
                401: () => {
                    router.replace('/login')
                }
            },
            complete: () => {
                $(event.target).prop('disabled', false);
            },
            dataType: 'json',
        });
    }

    alterarNomeUsuarioSistema(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        $(event.target).prop('disabled', true);
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/auto-save',
            data: {token:token, idSistema: sistema.sys_id, nomeUsuario: this.systemEdit.sys_dominio},
            success: (response)=>{
                if(response.error){
                    this.error.system = response.error
                }else{
                    this.system.sys_dominio = this.systemEdit.sys_dominio

                    this.NotificationToast.fire({
                        icon: 'success',
                        title: "Nome de usuário alterado com sucesso!"
                    })
                }
            },
            statusCode: {
                401: () => {
                    router.replace('/login')
                }
            },
            complete: () => {
                $(event.target).prop('disabled', false);
            },
            dataType: 'json',
        });
    }

    alterarDescricaoSistema(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        $(event.target).prop('disabled', true);
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/auto-save',
            data: {token:token, idSistema: sistema.sys_id, descricao: this.systemEdit.sys_descricao},
            success: (response)=>{
                if(response.error){
                    this.error.system = response.error
                }else{
                    this.system.sys_descricao = this.systemEdit.sys_descricao

                    this.NotificationToast.fire({
                        icon: 'success',
                        title: "Descrição alterada com sucesso!"
                    })
                }
            },
            statusCode: {
                401: () => {
                    router.replace('/login')
                }
            },
            complete: () => {
                $(event.target).prop('disabled', false);
            },
            dataType: 'json',
        });
    }

    alterarCategoriaSistema(event){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        $(event.target).prop('disabled', true);
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/auto-save',
            data: {token:token, idSistema: sistema.sys_id, categoria: this.systemEdit.sys_categoria},
            success: (response)=>{
                if(response.error){
                    this.error.system = response.error
                }else{
                    this.system.sys_categoria = this.systemEdit.sys_categoria
                }
            },
            statusCode: {
                401: () => {
                    router.replace('/login')
                }
            },
            complete: () => {
                $(event.target).prop('disabled', false);
            },
            dataType: 'json',
        });
    }

    inserirRedeSocial(){
        const token = store.getters.getAccessToken
        const sistema = store.getters.getSystemData

        $('.inputsRedeSocial').prop('disabled', true);
        $.ajax({
            type: "POST",
            url: this.dm.getUrlServer()+'sistema/inserir-rede-social',
            data: {access_token: token, redeSocial: this.redeSocial, idSistema: sistema.sys_id},
            success: (response) => {
                if(response.messages){
                    this.error.redeSocial = response.messages
                }else{
                    this.redesSociaisSystem = response.redesSociaisSystem
                    this.redesSociais = response.redesSociais
                }
            },
            error: function(){
                router.replace('/login')
            },
            complete: () => {
                this.hideLoading()
                $('.inputsRedeSocial').prop('disabled', false);
            },
            dataType: 'json',
        });
    }
}
export default Personalizar