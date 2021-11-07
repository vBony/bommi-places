<template>
    <Header 
        :username="user.fun_primeiro_nome"
        :avatar_user="url_server+user.fun_avatar"
    />




<div id="header-area" class="mt-4">
    <div id="cover-area">
        <div id="cover" class="content-area-cover">
            <img :src="url_server+system.sys_capa" alt="" id="cover-img">
            <div id="btn-edit-cover-area" class="ms-auto">
                <button id="btn-edit-cover" @click="openEnviarCapa()">
                    <i class="fas fa-camera me-1"></i>
                    Editar foto de capa
                </button>

                <input type="file" name="" id="input-capa" style="display:none" @change="uploadFotoCapa($event)">
            </div>
        </div>
    </div>
    <div id="company-data-area" class="content-area">
        <div id="comp-photo-area">
            <img :src="url_server+system.sys_logo" id="comp-photo">
            <div id="cam-icon-photo" class="d-flex align-items-center" @click="openEnviarFoto()">
                <i class="fas fa-camera"></i>
            </div>

            <input type="file" name="" id="input-foto" style="display:none" @change="uploadFoto($event)">
        </div>
        <div id="company-data">
            <div>
                <div id="comp-name-area">
                    <div id="comp-name">
                        <h1>{{system.sys_nome_empresa}}</h1>
                    </div>
                </div>
                <div id="comp-uf">
                    {{system.sys_cidade}} - {{system.sys_uf}}
                </div>
            </div>
            <div id="btn-area-header">
                <div id="rating-area">
                    <div id="rating"><span>5.0</span>/5</div>
                    <i class="fas fa-star"></i>
                </div>
                <div class="btn btn-dark text-white btn-schedule">Agendar</div>
            </div>
        </div>
    </div>
    <div id="menu-area-header" class="content-area">
        <div id="menu-h-opts-area">
            <div class="menu-h-opts">Publicações</div>
            <div class="menu-h-opts">Sobre</div>
            <div class="menu-h-opts">Fotos</div>
        </div>

        <div class="dropdown" id="dropDownMobileOptionsNav-area">
            <button class="menu-h-opts dropdown-toggle" type="button" id="dropDownMobileOptionsNav" data-bs-toggle="dropdown" aria-expanded="false">
                Mais
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropDownMobileOptionsNav">
                <li><a class="dropdown-item" href="#">Sobre </a> </li>
                <li><a class="dropdown-item" href="#">Fotos </a> </li>
                <li><a class="dropdown-item" href="#">Avaliações </a> </li>
            </ul>
        </div>

        <div class="dropdown">
            <button class="btn btn-dark dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-thumbs-up me-1"></i> Avaliar
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#"><i class="fas fa-store-alt me-2 text-right"></i> Avaliar barbearia</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-user-tie me-2 text-right"></i> Avaliar funcionário</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="content-area box-content">
    <div class="row d-flex mx-auto" >
        <div class="col-sm-12 col-md-6 col-lg-6 mb-sm-4 mb-4" id="criar-pub-mobile">
            <div class="col-12">

                <div class="card p-3" id="criar-pub">
                    <div class="row d-flex align-items-center">
                        <div class="col-2" id="img-publicacao">
                            <img :src="url_server+system.sys_logo" alt="">
                        </div>
                        <div class="col-10">
                            <button class="btn btn-dark btn-block w-100">Criar publicação</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>



        <div class="col-sm-12 col-md-6 col-lg-6">



            <div class="row about-card">
                <div class="col-12">
                    <div class="card-content card" id="about-box">
                        <div class="title-card-content">Sobre</div>
                        <div id="map-about">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.0079335924274!2d-49.10731124296936!3d-16.676163309271892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQwJzMzLjkiUyA0OcKwMDYnMTUuNCJX!5e0!3m2!1spt-BR!2sbr!4v1627947311648!5m2!1spt-BR!2sbr" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                        <div id="info-area">
                            <div class="about-icon"> <i class="fas fa-info-circle"></i> </div>
                            <div id="text-ia" class="text-break" v-show="system.sys_descricao"> 
                                {{system.sys_descricao}}
                            </div>
                            <div id="text-ia" class="text-break" v-show="!system.sys_descricao"> 
                                <a class="link-dark" data-bs-target="#modal-info-empresa" data-bs-toggle="modal" @click="getDataInfoSistema()">Criar descrição</a>
                            </div>
                        </div>
                        <div class="about-child">
                            <div class="about-icon"> <i class="fas fa-phone"></i> </div>
                            <div class="about-text"><a href="#" class="link-about">{{system.sys_telefone}}</a></div>
                        </div>
                        <div class="about-child" id="social-media-area">
                            <div class="sma-icons"> <i class="fab fa-facebook-square"></i></div>
                            <div class="sma-icons"> <i class="fab fa-instagram"></i> </div>
                            <div class="sma-icons"> <i class="fab fa-twitter-square"></i> </div>
                            <div class="sma-icons"> <i class="fab fa-youtube"></i> </div>
                        </div>

                        <div class="about-child mt-4">
                            <button class="btn btn-secondary mx-auto btn-sm" data-bs-target="#modal-info-empresa" data-bs-toggle="modal" @click="getDataInfoSistema()">Editar informações da empresa</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row services-card mt-4 mb-4">
                <div class="col-12">
                    <div id="head-services-area">
                        <div class="title-card-content outcard-title">Serviços</div>
                        <div>
                            <button class="btn btn-secondary btn-sm" data-bs-target="#modal-servicos" data-bs-toggle="modal" @click="buscarServicos()">Editar serviços</button>
                        </div>
                    </div>

                    <div id="lista-servicos">
                        <div class="card-services card" v-for="(servico, index) in servicos" :key="index">
                            <div class="card-services-info-area">
                                <div class="card-services-title">{{servico.svs_nome}}</div>
                                <div class="card-services-sub-title">Horarios disponíveis</div>
                                <div class="card-services-schedules-area">
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                </div>
                            </div>

                            <div class="card-services-btn-area">
                                <div class="csba-price">R$<span>{{servico.svs_preco}}</span></div>
                                <button type="button" class="btn btn-primary btn-sm btn-dark text-white">Agendar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-6 mb-sm-4" id="pub-desktop">
            <div class="col-12">

                <div class="card p-3 mb-4" id="criar-pub-desktop">
                    <div class="row d-flex align-items-center">
                        <div class="col-2" id="img-publicacao">
                            <img :src="url_server+system.sys_logo" alt="">
                        </div>
                        <div class="col-10">
                            <button class="btn btn-dark btn-block w-100">Criar publicação</button>
                        </div>
                    </div>
                </div>

                <div class="title-card-content outcard-title mt-4" id="pubs-title-mobile">Publicações</div>

                <div class="card my-2">
                    <div class="d-flex justify-content-between align-items-center p-2 ">
                        <div class="d-flex align-items-center">
                            <div class="logo-posts"> 
                                <img :src="url_server+system.sys_logo">
                            </div>

                            <div class="ms-2">
                                <div class="fw-bold">{{system.sys_nome_empresa}}</div>
                                <div class="text-muted hora-post">Ontem às 20:38</div>
                            </div>
                        </div>

                        <div> <i class="fa fa-ellipsis-h option-post text-secondary"></i> </div>
                    </div>

                    <div class="p-2 descricao-post">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    </div> 

                    <img src="https://picsum.photos/720/1280" class="foto-post">

                    <div class="d-flex justify-content-between align-items-center p-2">
                        <div class="d-flex flex-row icons d-flex align-items-center"> 
                            <i class="far fa-heart post-like"></i>
                            <div class="ms-2 fw-bold post-num-like">25mil</div>
                        </div>
                        <div class="d-flex flex-row muted-color"> 
                            <div class="ml-2 fw-bold btn-compartilhar-post">Compartilhar</div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




<!-- ELEMENTOS -->

<!-- Modal Serviços [INICIO] -->
<div class="modal fade" id="modal-servicos" tabindex="-1" aria-labelledby="modal-servicos" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Editar Serviços</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <transition name="no-mode-fade" mode="out-in">
                    <div v-if="!alterandoServico && !criandoServico" class="fade-out" id="lista-serviços">
                        <div class="row px-2 py-2">
                            <div class="col-6 d-flex justify-content-start">
                                <button class="btn btn-sm btn-dark" @click="abrirSessaoCadastroServico()"><i class="fas fa-plus"></i> Novo serviço</button>
                            </div>

                            <div class="col-6 d-flex justify-content-end">
                                <input type="search" name="" class="ipt" id="" placeholder="Buscar um serviço" @keyup="buscarServico()" v-model="palavraChave">
                            </div>
                        </div>
                        <div id="table-dad" class="col-12 mx-auto mb-4" @scroll="scrollHandleTransacoes($event)">
                            <table class="table table-borderless align-middle" id="table-list">
                                <thead class="py-4 bg-white" id="thead-servicos">
                                    <tr>
                                        <th>Serviço</th>
                                        <th class="text-center">Valor</th>
                                        <th class="text-center">Duração</th>
                                        <th class="text-center">Exibir no site</th>
                                        <th class="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-bottom" v-for="(servico, index) in servicos" :key="index">
                                        <th class="text-start">
                                            {{servico.svs_nome}}
                                        </th>
                                        <td class="text-center">
                                            {{'R$'+servico.svs_preco}}
                                        </td>
                                        <td class="text-center">{{servico.svs_duracao + 'h'}}</td>
                                        <td class="text-center text-bold">{{servico.svs_ativo == 1 ? 'Sim' : 'Não'}}</td>
                                        <td class="text-end acoes d-flex align-items-center justify-content-center" id="acoes">
                                            <i class="far fa-edit mx-1 editar-icon" @click="alterarServico(servico.svs_id)"></i>
                                            <Popper 
                                                class="dark"
                                                arrow
                                                placement="left"
                                                :disabled="desativarPopper"
                                                interactive>
                                                
                                                
                                                <i class="fas fa-trash-alt deletar-icon" @click="desativarPopper = false" id="popcorn" aria-describedby="tooltip"></i>
                                                <template #content >
                                                    <div id="tooltip" role="tooltip">
                                                        <div class="row mb-2">
                                                            <div class="popover-title"> Tem certeza que deseja excluir esse serviço? </div>
                                                        </div>

                                                        <div class="d-flex justify-content-end">
                                                            <div class="mx-start d-flex">
                                                                <button type="button" class="btn btn-secondary popover-btn">Não</button>
                                                                <button type="button" class="btn btn-danger popover-btn" @click.self="deletarServico(servico.svs_id, index)" v-show="!loadingList">Sim</button>

                                                                <button type="button" class="btn btn-danger popover-btn" disabled v-show="loadingList">
                                                                    <div class="spinner-border text-light spinner-border-sm" role="status">
                                                                        <span class="visually-hidden">Loading...</span>
                                                                    </div>
                                                                    Carregando...
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </Popper>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div v-show="loading" class="text-center py-4">
                                <div class="spinner-border text-dark" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="text-dark fs-4">Carregando...</div>
                            </div>

                            <div v-show="servicoVazio" class="text-center py-4">
                                <h5>Nenhum registro encontrado :(</h5>
                            </div>
                        </div>
                    </div>

                    <div class="text-center" v-else-if="criandoServico || alterandoServico">
                        <div class="row py-2">
                            <div class="col-6 d-flex justify-content-start">
                                <button class="btn btn-secondary btn-sm" @click="voltarSessaoListagem()"><i class="fas fa-chevron-left me-2"></i>Voltar</button>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-12 text-start mt-2">
                                <label class="form-check-label color-default-title" for="exampleCheck1">
                                    <input type="checkbox" class="form-check-input ipt-check me-2" v-model="servico.svs_ativo">
                                    Ativo
                                </label>
                            </div>

                            <div class="col-lg-8 col-md-8 col-sm-12 mt-2">
                                <div class="label-ipt color-default-title required">Nome do serviço</div>
                                <input type="text" v-bind:class="{'is-invalid': error.servicos.svs_nome}" class="form-control ipt" @change.self="clearErrors($event)" v-model="servico.svs_nome">
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.svs_nome}}</div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12 mt-2">
                                <div class="label-ipt color-default-title required">Preço (R$)</div>
                                <input type="text" id="precoServico" v-bind:class="{'is-invalid': error.servicos.svs_preco}" class="form-control ipt" @change.self="clearErrors($event); setValor()" v-model="servico.svs_preco">
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.svs_preco}}</div>
                            </div>

                            <div class="col-6 mt-2">
                                <div class="label-ipt color-default-title required">Tempo de duração</div>
                                <input type="text" id="tempoDuracaoServico" v-bind:class="{'is-invalid': error.servicos.svs_duracao}" class="form-control ipt" @change.self="clearErrors($event)" v-model="servico.svs_duracao" placeholder="hh:mm">
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.svs_duracao}}</div>
                            </div>

                            <div class="col-6 mt-2">
                                <div class="label-ipt color-default-title">
                                    Tempo de retorno (dias)
                                    <span tamanho="300px" tooltip="O tempo que seu cliente deve retornar para realizar o serviço. Será usado para avisar o seu cliente.">
                                        <i class="fas fa-question-circle ms-1 text-dark"></i>
                                    </span>
                                </div>
                                <input type="text" id="tempoRetorno" v-bind:class="{'is-invalid': error.servicos.svs_retorno}" class="form-control ipt" @change.self="clearErrors($event)" v-model="servico.svs_retorno">
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.svs_retorno}}</div>
                            </div>

                            <div class="col-12 mt-2">
                                <div class="label-ipt color-default-title">
                                    Descrição pública 
                                </div>
                                <textarea v-bind:class="{'is-invalid': error.servicos.svs_descricao}" class="form-control ipt" @change.self="clearErrors($event)" rows="3" v-model="servico.svs_descricao"></textarea>
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.svs_descricao}}</div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="modal-footer" v-if="criandoServico">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-dark" @click="salvarServico()" v-if="!loading">Salvar</button>
                <button type="button" class="btn btn-dark" disabled v-if="loading">
                    <div class="spinner-border text-light spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Carregando...
                </button>
            </div>

            <div class="modal-footer" v-if="alterandoServico">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-dark" @click="salvarAteracaoServico()" v-if="!loading">Alterar</button>
                <button type="button" class="btn btn-dark" disabled v-if="loading">
                    <div class="spinner-border text-light spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Carregando...
                </button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Serviços [FIM] -->

<!-- Modal info da empresa [INICIO] -->
<div class="modal fade" id="modal-info-empresa" tabindex="-1" aria-labelledby="modal-info-empresa" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title color-default-title" id="staticBackdropLabel">Editar Informações da empresa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-geral-tab" data-bs-toggle="pill" data-bs-target="#pills-geral" type="button" role="tab" aria-controls="pills-geral" aria-selected="true">
                            <i class="fas fa-info-circle"></i>
                            Geral
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-contato-tab" data-bs-toggle="pill" data-bs-target="#pills-contato" type="button" role="tab" aria-controls="pills-contato" aria-selected="false">
                            <i class="fas fa-address-card"></i>
                            Contato
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-localizacao-tab" data-bs-toggle="pill" data-bs-target="#pills-localizacao" type="button" role="tab" aria-controls="pills-localizacao" aria-selected="false">
                            <i class="fas fa-map-marker-alt"></i>
                            Localização
                        </button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-geral" role="tabpanel" aria-labelledby="pills-geral-tab">
                        <div class="row">
                            <div class="col-12 mt-2">
                                <h5 class="color-default-title">Geral</h5>
                                <span class="text-muted info-input">
                                    As alterações são salvas automaticamente.
                                </span>
                            </div>

                            <div class="col-12 mt-2">
                                <div class="label-ipt color-default-title">Nome da empresa</div>
                                <input id="editNomeEmpresa" type="text" class="form-control ipt" v-bind:class="{'is-invalid': error.system.sys_nome_empresa}" @change.self="clearErrors($event); alterarNomeSistema($event)" v-model="systemEdit.sys_nome_empresa">
                                <div class="invalid-feedback color-danger text-start">{{error.system.sys_nome_empresa}}</div>
                            </div>

                            <div class="col-12 mt-2">
                                <div class="label-ipt color-default-title">Nome da usuário</div>
                                <input id="editNomeUsuario" type="text" class="form-control ipt" v-bind:class="{'is-invalid': error.system.sys_dominio}" @change.self="clearErrors($event); alterarNomeUsuarioSistema($event)" @keyup="setDomain()" v-model="systemEdit.sys_dominio">
                                <div class="invalid-feedback color-danger text-start">{{error.system.sys_dominio}}</div>
                            </div>

                            <div class="col-12 mt-2">
                                <div class="label-ipt color-default-title">
                                    Descrição
                                </div>
                                <textarea maxlength = "255" style="resize: vertical;" v-bind:class="{'is-invalid': error.system.sys_descricao}" class="form-control ipt" @change.self="clearErrors($event); alterarDescricaoSistema($event)" @focus="messages.system.descricao = true" rows="3" v-model="systemEdit.sys_descricao"></textarea>
                                <div class="invalid-feedback color-danger text-start">{{error.servicos.sys_descricao}}</div>
                                <div class="text-muted info-input" v-show="messages.system.descricao">
                                    Um breve resumo da sua empresa. O limite é de 255 caracteres. <br>
                                    Você pode escrever um breve resumo sobre esta empresa ou informar 
                                    as pessoas sobre seus serviços, o que pode ajudar a sua empresa 
                                    a ser descoberta com mais frequência.
                                </div>
                            </div>

                            <div class="col-12" style="margin-top:50px">
                                <h5 class="color-default-title">Categorias</h5>

                                <div class="col-12 mt-2">
                                    <div class="label-ipt color-default-title">Selecione uma categoria</div>
                                    <select name="" id="" class="form-control ipt" v-bind:class="{'is-invalid': error.system.sys_categoria}" @change.self="clearErrors($event)" v-model="systemEdit.sys_categoria">
                                        <option disabled>Selecione uma categoria</option>
                                        <option :value="categoria.cat_id" v-for="(categoria, index) in categorias_sistema" :key="index">{{categoria.cat_descricao}}</option>
                                        <option :value="idCatOutros">Outros</option>
                                    </select>
                                    <div class="invalid-feedback color-danger text-start">{{error.system.sys_categoria}}</div>
                                </div>

                                <div class="col-12 mt-2" v-show="idCatOutros == systemEdit.sys_categoria">
                                    <div class="label-ipt color-default-title">Digite o nome da categoria</div>
                                    <input type="text" class="form-control ipt" v-bind:class="{'is-invalid': error.system.sys_nome}" @change.self="clearErrors($event)" @keyup="setDomain()" v-model="novaCategoria">
                                    <div class="invalid-feedback color-danger text-start">{{error.system.sys_nome}}</div>
                                    <div class="text-muted info-input">
                                        Caso seja uma categoria relevante, criaremos ela, e o <b>{{systemEdit.sys_nome_empresa}}</b> será incluido na categoria. Iremos te avisar caso isso aconteça.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-contato" role="tabpanel" aria-labelledby="pills-contato-tab">...</div>
                    <div class="tab-pane fade" id="pills-localizacao" role="tabpanel" aria-labelledby="pills-localizacao-tab">...</div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal info da empresa [FIM] -->

<!-- LOADING -->
<div class="loading w-100 h-100">
    <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div class="text-white fs-4">Carregando...</div>
</div>

</template>

<style src="@/assets/css/normalize.css" scoped></style>
<style src="@/assets/css/personalizar.css" scoped></style>
<style src="@/assets/css/tooltips.css" scoped></style>
<style src="@/assets/css/popover.css" scoped></style>

<script lang="ts">
import Personalizar from '@/models/Personalizar'
export default Personalizar
</script>
