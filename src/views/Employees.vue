<template>
    <v-app>
        <v-layout class="rounded rounded-md">
            <AppBar @setToggleVerticalMenu="setToggleVerticalMenu" />
            
            <VerticalMenu :showVerticalMenu="showVerticalMenu" />
        
            <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
                <v-container fluid>
                    <v-row justify="center">
                        <v-col cols="12" md="8" sm="12">
                            <h2>Cadastro de Funcionários</h2>
                            <v-breadcrumbs :items="['Cadastros', 'Funcionários']">
                                <template v-slot:divider>
                                    <v-icon icon="mdi-chevron-right"></v-icon>
                                </template>
                            </v-breadcrumbs>
                        </v-col>
                        
                        <v-col cols="12" md="8" sm="12">
                            <v-card class="elevation-4 pa-10">
                                <v-row class="d-flex justify-space-between">
                                    <v-col cols="12" md="6" lg="4" class="pa-0">
                                        <v-text-field
                                            type="text"
                                            prepend-inner-icon="mdi-magnify"
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>    
    
                                    <v-col cols="12" md="4" lg="2" class="pa-0" v-if="this.display.mdAndUp">
                                        <v-btn
                                            prepend-icon="mdi-plus"
                                            variant="flat"
                                            color="green"
                                            block
                                            @click="displayEmployeeRegister = true"
                                        >
                                            Novo
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <v-row v-if="this.display.smAndDown">
                                    <v-col cols="4" class="ms-auto pa-0">
                                        <v-btn
                                            prepend-icon="mdi-plus"
                                            variant="flat"
                                            color="green"
                                            block
                                            @click="displayEmployeeRegister = true"
                                        >
                                            Novo
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>

        <v-dialog
            v-model="displayEmployeeRegister"
            width="auto"
            max-width="800"
            transition="dialog-bottom-transition"
        >
            <v-card
                max-width="800"
                rounded="lg"
            >
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                        <v-icon class="me-2"> mdi-account-multiple-plus </v-icon>
                        Criar Funcionário
                    </div>

                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                    ></v-btn>
                </v-card-title>

                <v-divider class="mb-4"></v-divider>

                <v-card-text>
                    <div class="text-medium-emphasis mb-4">
                        Crie novos funcionários para trabalhar em seu estabelecimento. <br> Também é possível importar funcionários de seus outros sistemas informando o CPF.
                    </div>

                    <v-form :disabled="loading" class="pa-0 pa-lg-2 pa-md-2 mb-8">
                        <div>
                            <h6 class="text-h6">Dados Pessoais 📄</h6>
                            <p class="text-disabled mb-2">
                                Informe os dados pessoais do funcionário
                            </p>
                        </div>

                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-text-field
                                    label="CPF" 
                                    type="text"
                                    prepend-inner-icon="mdi-magnify"
                                    density="compact"
                                    title="CPF"
                                ></v-text-field>
                            </v-col>
                        </v-row>
    
                        <v-row>
                            <v-col cols="12" lg="6" md="6" class="pb-0">
                                <v-text-field 
                                    label="Nome" 
                                    type="text" 
                                    hide-details="auto" 
                                    density="compact"
                                ></v-text-field>
                            </v-col>
    
                            <v-col cols="12" lg="6" md="6" class="pb-0">
                                <v-text-field 
                                    label="Sobrenome" 
                                    type="text" 
                                    hide-details="auto" 
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-text-field 
                                    label="Data de nascimento" 
                                    type="date" 
                                    hide-details="auto" 
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <div class="mt-10">
                            <h6 class="text-h6">Tipo de funcionário 👷</h6>
                            <p class="text-disabled mb-2">
                                Selecione o tipo de funcionário que deseja criar
                            </p>
                        </div>

                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    label="Tipos"
                                    :items="employeeTypes"
                                    item-title="text" 
                                    item-value="value"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <div class="mt-10">
                            <h6 class="text-h6">Dados de acesso 🔐</h6>
                            <p class="text-disabled mb-2">
                                Os dados informados abaixo serão para acessar o sistema
                            </p>
                        </div>

                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-text-field 
                                    label="E-mail" 
                                    type="email" 
                                    hide-details="auto"
                                    density="compact" 
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-text-field 
                                    label="Senha" 
                                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="visible ? 'text' : 'password'"
                                    @click:append-inner="visible = !visible"
                                    hide-details="auto"
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Cancelar"
                        variant="plain"
                        class="px-4"
                        @click="displayEmployeeRegister = false"
                    ></v-btn>

                    <v-btn
                        color="grey-darken-4"
                        text="Incluir"
                        variant="tonal"
                        class="px-4"
                        @click="displayEmployeeRegister = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
    </template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
        
const App = defineComponent({
components: {
    VerticalMenu,
    AppBar
},

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        showVerticalMenu: false,
        userStore: useUserStore(),
        user: new UserModel(),
        display: useDisplay(),
        displayEmployeeRegister: false,
        visible: false,

        employeeTypes: []
    };
},

beforeCreate(){
    let userStore = useUserStore()
    this.user = userStore.getUser
},

created(){
    this.user = this.userStore.getUser ?? new UserModel()
},

methods: {
    setToggleVerticalMenu(data){
        this.showVerticalMenu = data
    },

    getEmployeeTypes(){
        req.get(this.serverUrl+'/api/employees/init')
        .then( (response) => {
            this.employeeTypes = response.data.employeeTypes
            console.log(this.employeeTypes)
        })
    },

    init(){
        this.getEmployeeTypes()
    }
},

mounted(){
    this.init()
}
});
        
    export default App
    </script>
        