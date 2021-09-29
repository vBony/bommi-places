<template>
    <Header 
        :username="user.cli_primeiro_nome"
        :avatar_user="url_server+user.cli_avatar"
    />




<div id="header-area" class="mt-4">
    <div id="cover-area">
        <div id="cover" class="content-area-cover">
            <img :src="url_server+system.sys_capa" alt="" id="cover-img">
            <div id="btn-edit-cover-area" class="ms-auto">
                <button id="btn-edit-cover">
                    <i class="fas fa-camera me-1"></i>
                    Editar
                </button>
            </div>
        </div>
    </div>
    <div id="company-data-area" class="content-area">
        <div id="comp-photo-area">
            <img :src="url_server+system.sys_logo" id="comp-photo">
            <div id="cam-icon-photo" class="d-flex align-items-center">
                <i class="fas fa-camera"></i>
            </div>
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
                            <div id="text-ia" class="text-break"> 
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
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
                            <button class="btn btn-secondary mx-auto">Editar informações da empresa</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row services-card mt-4 mb-4">
                <div class="col-12">
                    <div id="head-services-area">
                        <div class="title-card-content outcard-title">Serviços</div>
                        <div><button class="btn btn-secondary btn-sm">Editar serviços</button></div>
                    </div>

                    <div id="lista-servicos">
                        <div class="card-services card">
                            <div class="card-services-info-area">
                                <div class="card-services-title">Progressiva</div>
                                <div class="card-services-sub-title">Horarios disponíveis</div>
                                <div class="card-services-schedules-area">
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                </div>
                            </div>

                            <div class="card-services-btn-area">
                                <div class="csba-price">R$<span>50,00</span></div>
                                <button type="button" class="btn btn-primary btn-sm btn-dark text-white">Agendar</button>
                            </div>
                        </div>

                        <div class="card-services card">
                            <div class="card-services-info-area">
                                <div class="card-services-title">Degradê</div>
                                <div class="card-services-sub-title">Horarios disponíveis</div>
                                <div class="card-services-schedules-area">
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                </div>
                            </div>

                            <div class="card-services-btn-area">
                                <div class="csba-price">R$<span>50,00</span></div>
                                <button type="button" class="btn btn-primary btn-sm btn-dark text-white">Agendar</button>
                            </div>
                        </div>

                        <div class="card-services card">
                            <div class="card-services-info-area">
                                <div class="card-services-title">Sobrancelha</div>
                                <div class="card-services-sub-title">Horarios disponíveis</div>
                                <div class="card-services-schedules-area">
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                </div>
                            </div>

                            <div class="card-services-btn-area">
                                <div class="csba-price">R$<span>50,00</span></div>
                                <button type="button" class="btn btn-primary btn-sm btn-dark text-white">Agendar</button>
                            </div>
                        </div>

                        <div class="card-services card">
                            <div class="card-services-info-area">
                                <div class="card-services-title">Barba</div>
                                <div class="card-services-sub-title">Horarios disponíveis</div>
                                <div class="card-services-schedules-area">
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill me-1 ms-1 mt-1 btn-hrs">08:00</button>
                                </div>
                            </div>

                            <div class="card-services-btn-area">
                                <div class="csba-price">R$<span>50,00</span></div>
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

<!-- LOADING -->
<div class="loading w-100 h-100">
    <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div class="text-white fs-4">Carregando...</div>
</div>

</template>

<style src="@/assets/css/personalizar.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import Personalizar from '@/models/Personalizar'
export default Personalizar
</script>
