<template>
<div id="cont-area">
    <div id="sub-cont-area">
        <form @submit.prevent="login()">
            <div id="logo"><img  src="../assets/imgs/logo-black.png" alt="50px"></div>
            <h2 class="mb-4">Login como gerenciador</h2>
            <div class="ipt-sub-area mb-4">
                <div class="title-ipt">E-mail</div>
                <input placeholder="E-mail"  class="ipt form-control form-control-lg" type="email" name="cli_email">
                <div class="invalid-feedback color-danger" id="cli_email" ></div>
            </div>
            <div class="ipt-sub-area mb-4">
                <div class="title-ipt">Senha</div>
                <input placeholder="Senha"  class="ipt form-control form-control-lg" type="password" name="cli_senha">
                <div class="invalid-feedback color-danger" id="cli_senha" ></div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-dark btn-lg" type="submit">Entrar</button>
            </div>
            <div class="lg-12 text-center mt-4"><a class="text-dark" href="">Estou com problemas para acessar</a></div>
        </form>

    </div>
</div>
</template>

<style src="@/assets/css/login.css" scoped></style>

<script lang="ts">
import Login from '@/models/Login'
export default Login
</script>
