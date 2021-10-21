<template>
<!-- componente de header -->
<Header 
    :username="user.cli_primeiro_nome"
    :avatar_user="url_server+user.cli_avatar"
/>
<!-- componente de header -->
<div class="container">
    <div class="text-center my-4">
        <h3 class="color-default-title"> Funcionários </h3>
    </div>
    <div class="card p-4">
        <div class="col-lg-8 col-md-8 col-sm-12 mx-auto">
            <div class="row text-center my-3">
                <h2 class="color-default-title">Cadastro de Funcionário</h2>
            </div>

            <div id="text" class="text-muted col-12 m-auto fs-8 mb-4">Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</div>

            <div class="col-12 mx-auto my-3">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12 my-1">
                        <div>Nº máx. de usos</div>
                        <input v-model="cadastroFuncionario.countCadastros" v-bind:class="{'is-invalid': error.countCadastros}" class="ipt form-control form-control-lg" v-bind:disabled="jaTemUrl" type="text" id="" @change.self="clearErrors($event)">
                        <div class="invalid-feedback">{{error.countCadastros}}</div>
                    </div>

                    <div class="col-lg-8 col-md-8 col-sm-12 my-1">
                        <div>Selecione o sistema</div>
                        <select v-model="cadastroFuncionario.sistema" id="style-select" class="ipt form-control form-control-lg" v-bind:class="{'is-invalid': error.sistema}" @change.self="clearErrors($event)" @change="verificarSistema()">
                            <option v-for="(sistema, index) in sistemas" :key="index" :value="sistema.sys_id" >
                                {{sistema.sys_nome_empresa}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="col-12 mx-auto d-flex justify-content-center mt-3">
                <button class="btn btn-lg btn-dark mx-auto col-lg-4 col-md-4 col-sm-12" v-bind:disabled="jaTemUrl" @click="criarUrlCadastroFuncionario()">Criar URL</button>
            </div>

            <div class="col-12" id="url-area-input">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6 ">
                        URL de cadastro
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-6  text-end" v-show="jaTemUrl">
                        <div class="color-default-title">Cadastros restantes: {{cadastrosRestantes}}</div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <input id="last-ipt" class="ipt" type="text" disabled>
                    </div>
                </div>
            </div>

            <div id="table-dad" class="col-12 mx-auto" v-show="jaTemUrl">
                <div class="text-center">
                    <h5 class="color-default-title">Últimos cadastros</h5>
                </div>

                <table class="table table-borderless align-middle" id="table-list">
                    <tr>
                        <td class="text-start">
                            [Foto]
                        </td>
                        <th>
                            Vinicius de Assis
                        </th>
                        <td class="text-end text-muted">25min</td>
                    </tr>

                    <tr>
                        <td class="text-start">
                            [Foto]
                        </td>
                        <th>
                            Higor Moreira
                        </th>
                        <td class="text-end text-muted">6h</td>
                    </tr>

                    <tr>
                        <td class="text-start">
                            [Foto]
                        </td>
                        <th>
                            Matheus Ferreira
                        </th>
                        <td class="text-end text-muted">6d</td>
                    </tr>
                </table>
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