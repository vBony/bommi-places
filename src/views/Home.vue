<template>
<!-- componente de header -->
<Header 
    :username="user.fun_primeiro_nome"
    :avatar_user="url_server+user.fun_avatar"
/>
<!-- componente de header -->

<div class="p-4" id="subheader">
    <div class="container">
        <div class="col-12 d-flex align-items-center">
            <div id="logo-empresa" class="me-4 shadow">
                <img :src="url_server+system.sys_logo" alt="">
            </div>
            <div class="dropdown">
                <h3 class="color-default-title dropdown-toggle" id="dropDownSistemas" data-bs-toggle="dropdown" aria-expanded="false">{{system.sys_nome_empresa}}</h3>

                <ul class="dropdown-menu" aria-labelledby="dropDownSistemas">
                    <li><a class="dropdown-item" href="#">Sistema 1</a></li>
                    <li><a class="dropdown-item" href="#">Sistema 2</a></li>
                    <li><a class="dropdown-item" href="#">Sistema 3</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container mt-2">
    <div class="row">
        <div class="col-12 col-lg-3 col-mb-2 col-md-6 col-sm-12 mb-md-2 mb-sm-2 mb-2">
            <div class="items card border border-success p-4">
                <div class="text-area">
                    <div class="tittle color-default-title">Vendas</div>
                </div>
                <div class="num">$800</div>
            </div>
        </div>
        <div class=" col-12 col-lg-3 col-md-6 col-sm-12 mb-md-2 mb-sm-2 mb-2">
            <div class="items card border border-success p-4">
                <div class="text-area">
                    <div class="tittle color-default-title">Avaliações</div>
                </div>
                <div class="num">$800</div>
            </div>
        </div>
        <div class="col-12 col-lg-3 col-md-6 col-sm-12 mb-md-2 mb-sm-2 mb-2">
            <div class="cor-borda card border border-warning p-4">
                <div class="text-area">
                    <div class="tittle color-default-title">Clientes satisfeitos</div>
                </div>
                <div class="num">$800</div>
            </div>
        </div>
        <div class="col-12 col-lg-3 col-md-6 col-sm-12 mb-md-2 mb-sm-2 mb-2">
            <div class="borda-cor card border border-danger p-4">
                <div class="text-area">
                    <div class="tittle color-default-title">Clientes não atendidos</div>
                </div>
                <div class="num">$800</div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row mt-4">
        <div class="card col-12">
            <div class="card-header color-default-title">
                Dados do usuário
            </div>
            <div class="card-body" v-if="loading == false">
                <h4 class="color-default-title">Bem-vindo, {{user.fun_nome}}</h4>
                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="far fa-envelope"></i>
                    </div>
                    <div class="col-11">
                        {{user.fun_email}}
                    </div>
                </div>

                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="col-11">
                        {{user.fun_telefone != '' ? user.fun_telefone : "Vazio"}}
                    </div>
                </div>

                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="fas fa-key"></i>
                    </div>
                    <div class="col-11">
                        {{access_token}}
                    </div>
                </div>

                <div class="border-top my-3"></div>

                <h4 class="color-default-title">Sistema</h4>

                <h6>  <a :href="'https://ubarber.vercel.app/'+system.sys_dominio">{{system.sys_nome_empresa}}  <i class="fas fa-link"></i>  </a></h6>

                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="col-11">
                        {{system.sys_cidade}} - {{system.sys_uf}}
                    </div>
                </div>

                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="col-11">
                        {{system.sys_telefone != '' ? system.sys_telefone : "Vazio"}}
                    </div>
                </div>

                <div class="row d-flex align-items-center mt-2">
                    <div class="col-1 text-center">
                        <i class="far fa-building"></i>
                    </div>
                    <div class="col-11">
                        {{system.sys_cnpj}}
                    </div>
                </div>
            </div>
            <div class="card-body text-center" v-if="loading == true">
                <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-danger btn-sm" @click="logout()">Sair</button>
            </div>
        </div>
    </div>
</div>
 
<div class="loading w-100 h-100">
    <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
    </div>

        <div class="text-white fs-4">Carregando...</div>
    </div>
</template>

<style src="@/assets/css/home.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import Home from '@/models/Home'
export default Home
</script>