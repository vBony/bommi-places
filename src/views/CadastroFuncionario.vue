<template>
<!-- componente de header -->
<Header 
    :username="user.cli_primeiro_nome"
    :avatar_user="url_server+user.cli_avatar"
/>
<!-- componente de header -->
        <div class="container">
            <div id="title">Funcionários</div>
            <div id="card-area" class="card col-12 p-4">
                <h2 class="d-flex justify-content-center">Cadastro de Funcionário</h2>
                <div id="text" class="text-muted col-lg-6 col-md-8 col-sm-12 m-auto fs-8 mb-4">Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</div>
                <div id="option-area" class="row d-flex justify-content-center">
                    <div id="sub-area-option" class="d-flex justify-content-center col-12">
                        <div id="cadastro" class="me-4">
                            <div>Cadastros por link</div>
                            <input v-model="cadastroFuncionario.countCadastros" class="ipt" type="text" id="">
                        </div>
                        <div>
                            <div>Selecione o sistema</div>
                            <select v-model="cadastroFuncionario.sistema" id="style-select" class="ipt">
                                <option v-for="(sistema, index) in sistemas" :key="index" :value="sistema.sys_id" >
                                    {{sistema.sys_nome_empresa}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="criarUrlCadastroFuncionario()">Enviar</button>
                    </div>
                    <div id="ipt-area" class="d-flex align-items-center justify-content-center col-12">
                        <div id="ipt-area-2">
                            <div>URL de cadastro</div>
                            <input id="last-ipt" class="ipt" type="text" disabled>
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

<style src="@/assets/css/cadastro-funcionario.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import CadastroFuncionario from '@/models/CadastroFuncionario'
export default CadastroFuncionario
</script>