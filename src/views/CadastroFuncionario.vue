<template>
<!-- componente de header -->
<Header 
    :username="user.fun_primeiro_nome"
    :avatar_user="url_server+user.fun_avatar"
/>
<!-- componente de header -->
<div class="container">
<div class="row">
    <div class="card" id="content">
        <div class="card-body">
            <div class="col-12 mb-4">
                <v-btn 
                    color="dark" 
                    class="text-white"
                    @click.prevent="modalFuncionario = true"
                >
                    <i class="fas fa-plus mr-2"></i>
                    Adicionar Funcionário
                </v-btn>
            </div>
            <h5 class="card-title">Funcionários</h5>
            <v-table fixed-header height="300px">
                <thead>
                    <tr>
                        <th class="text-left">Nome</th>
                        <th class="text-left">Cargo</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr
                        v-for="item in desserts"
                        :key="item.name"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr> -->
                </tbody>
            </v-table>
        </div>
    </div>
    
</div>
</div>

<!-- Modal -->
<v-dialog
    v-model="modalFuncionario"
    max-width="600px"
>
    <v-card>
        <v-toolbar color="dark" dark class="text-white px-2">
            <v-btn icon dark @click="modalFuncionario = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>
                Cadastrar funcionários
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <div class="row">
                <p class="h5">Criar código de cadastro</p>
                <p class="text-muted">
                    Crie o código de cadastro e informe o mesmo ao seu
                    funcionário no momento de cadastro.
                </p>

                <div class="col-12">
                    <v-select
                        v-model="select"
                        :items="items"
                        label="Cargo"
                        required
                        type="input"
                        hint="Enter your password to access this website"
                    ></v-select>
                </div>

                <div class="col-12">
                    <v-text-field
                            :append-inner-icon="'mdi-content-copy'"
                            :type="'text'"
                            label="Código de cadastro"
                            name="cadastro"
                            @click:append-inner="copiarCodigo()"
                            readonly
                    ></v-text-field>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <v-btn color="dark" class="text-white" size="large">Gerar</v-btn>
                </div>

            </div>
             <v-divider class="divider"></v-divider>
            <div class="row mt-4">
                <p class="h5">Códigos ativos</p>
                <v-table fixed-header height="200px">
                    <thead>
                        <tr>
                            <th class="text-left">Código</th>
                            <th class="text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="codigo in codigosCadastro" :key="codigo.ucf_id">
                            <td>{{ codigo.ucf_token }}</td>
                            <td>
                                <v-btn color="success" size="x-small">Copiar</v-btn>
                                <v-btn class="text-white ml-2" color="danger" size="x-small">Deletar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
            
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn text color="danger" @click="modalFuncionario = false">Fechar</v-btn>
            <v-btn text color="success">Enviar</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<style src="@/assets/css/cadastro-funcionario.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import CadastroFuncionario from '@/models/CadastroFuncionario'
export default CadastroFuncionario
</script>