<template>
<div id="cont-area" class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div id="sub-cont-area" class="p-4">
        <form @submit.prevent="login()">
            <div id="logo"><img  src="/imgs/logo-black.png" alt="50px"></div>
            <h2 class="mb-4">Login como gerenciador</h2>
            <div class="ipt-sub-area mb-4">
                <v-text-field
                    v-model="user.fun_email"
                    :type="'email'"
                    label="E-mail"
                    name="fun_email"
                    :error-messages="error.fun_email"
                ></v-text-field>
            </div>
            <div class="ipt-sub-area mb-4">
                <v-text-field
                    v-model="user.fun_senha"
                    :append-inner-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="mostrarSenha ? 'text' : 'password'"
                    label="Senha"
                    name="fun_senha"
                    :error-messages="error.fun_senha"
                    @click:append-inner="mostrarSenha = !mostrarSenha"
                ></v-text-field>
            </div>
            <div class="d-grid gap-2">
                <v-btn color="dark" class="text-white" type="submit">Entrar</v-btn>
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
