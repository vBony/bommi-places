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
                    @click.prevent="teste()"
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

</template>

<style src="@/assets/css/cadastro-funcionario.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>

<script lang="ts">
import CadastroFuncionario from '@/models/CadastroFuncionario'
export default CadastroFuncionario
</script>