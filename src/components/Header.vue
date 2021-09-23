<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow bg-white header-app">
    <div class="container">
        <router-link to="/" class="navbar-brand">
            <div id="logo">
                <img src="../assets/imgs/logo-black.png" alt="">
            </div>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link to="/" class="nav-link active color-default-title" aria-current="page">Dashboard</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle nav-link active d-flex align-items-center ajust-arrow color-default-title" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sistema</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle nav-link active d-flex align-items-center ajust-arrow color-default-title" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Funcionários</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle nav-link active d-flex align-items-center ajust-arrow color-default-title" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Clientes</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link color-default-title" href="#">Sobre</a>
                </li>
            </ul>

            <ul class="navbar-nav">
                <li class="nav-item ml-auto">
                    <div class="dropdown">
                        <a class="dropdown-toggle nav-link active d-flex align-items-center ajust-arrow color-default-title" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div id="user_logged_avatar" class="me-3">
                                <img :src="avatar_user" class="rounded-circle" alt="">
                            </div>
                            <div class="username-area">
                                {{username}}
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Configurações</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Sair</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<style src="@/assets/css/header.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    username: String,
    avatar_user: String
  }
})

export default class HelloWorld extends Vue {
  msg!: string
}
</script>