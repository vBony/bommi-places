<template>
<div id="cont-area" class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div id="sub-cont-area" class="p-4">
        <form @submit.prevent="login()">
            <div id="logo"><img  src="../assets/imgs/logo-black.png" alt="50px"></div>
            <h2 class="mb-4">Login como gerenciador</h2>
            <div class="ipt-sub-area mb-4">
                <div class="title-ipt">E-mail</div>
                <input placeholder="E-mail" v-bind:class="{'is-invalid': error.fun_email}" class="ipt form-control form-control-lg" type="email" name="fun_email" v-model="user.fun_email" >
                <div class="invalid-feedback color-danger" id="fun_email" >{{error.fun_email}}</div>
            </div>
            <div class="ipt-sub-area mb-4">
                <div class="title-ipt">Senha</div>
                <input placeholder="Senha" v-bind:class="{'is-invalid': error.fun_senha}"  class="ipt form-control form-control-lg" type="password" name="fun_senha" v-model="user.fun_senha" >
                <div class="invalid-feedback color-danger" id="fun_senha" >{{error.fun_senha}}</div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-dark btn-lg" type="submit">Entrar</button>
            </div>
            <div class="lg-12 text-center mt-4"><a class="text-dark" href="">Estou com problemas para acessar</a></div>
        </form>
    </div>
</div>

<div class="loading w-100 h-100" v-show="loading == true">
    <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div class="text-white fs-4">Carregando...</div>
</div>
</template>

<style src="@/assets/css/login.css" scoped></style>

<script lang="ts">
import Login from '@/models/Login'
export default Login
</script>
