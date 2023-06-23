<template>
<v-app>
    <v-container class="px-0 py-0">
        <v-row no-gutters class="d-flex align-start justify-center h-screen">
            <v-col
                cols="12"
                lg="4"
            >
                <v-card
                    flat
                    theme="light"
                    density="default"
                    variant="elevated"
                    class="mt-12 mt-sm-0 pa-4"
                >

                    <v-col cols="12" class="px-0 py-0 mb-10">
                        <v-btn @click="previous()">Voltar</v-btn>
                        <h2 class="text-center">Ubarber Places</h2>
                        <v-progress-linear
                            v-model="step.progress"
                            color="black"
                            height="10"
                        ></v-progress-linear>
                    </v-col>
                    <v-form :disabled="loading" @submit.prevent="login()" class="mt-10">
                        <!-- Dados do responsável -->
                        <div v-show="step.currentStep == 1">
                            <h1>Dados pessoais do responsável 🤵</h1>
                            <p class="text-disabled">
                                Informe os seus dados pessoais
                            </p>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field label="Nome completo" variant="outlined" type="text" hide-details="auto" error-messages=""></v-text-field>
                            </v-col>
                                
                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="cadastro.usuario.cpf"
                                    label="CPF do responsável legal" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    label="Data de nascimento" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                            </v-col>
                        </div>
                        <!-- FIM dados do responsável -->

                        <!-- Inicio dados do estabelecimento -->
                        <div v-show="step.currentStep == 2">
                            <h1>Informações do estabelecimento 🏬</h1>
                            <p class="text-disabled">
                                Preencha com os dados do seu negócio
                            </p>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-select
                                    v-model="cadastro.loja.temCnpj"
                                    item-title="text" 
                                    item-value="value"
                                    label="Possui CNPJ?"
                                    :items="simNao"
                                    variant="outlined"
                                    hide-details="auto"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4" v-if="cadastro.loja.temCnpj === 0">
                                <v-text-field
                                    v-model="cadastro.usuario.cpf"
                                    disabled
                                    label="CPF do responsável legal" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4" v-if="cadastro.loja.temCnpj === 1">
                                <v-text-field 
                                    label="CNPJ" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    label="Nome do estabelecimento" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                    hint="Como aparecerá no app"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    label="Telefone ou Celular do estabelecimento" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                    hint="Como aparecerá no app"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-select
                                    item-title="text" 
                                    item-value="value"
                                    label="Segmento"
                                    :items="segmentos"
                                    variant="outlined"
                                    hide-details="auto"
                                ></v-select>
                            </v-col>
                        </div>

                        <div v-show="step.currentStep == 3">
                            <h1>Endereço 🏬</h1>
                            <p class="text-disabled">
                                Preencha as informações de endereço do seu negócio
                            </p>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field
                                    label="CEP" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                                <a 
                                    href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
                                    class="text-black font-weight-bold"
                                    target="_blank"
                                >
                                    Não sei meu CEP
                                </a>
                            </v-col>

                            <v-row class="px-0 py-0 mt-4">
                                <v-col cols="12" lg="3" md="3">
                                    <v-text-field
                                        disabled
                                        label="Estado" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" lg="9" md="9">
                                    <v-text-field
                                        disabled
                                        label="Cidade" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field
                                    label="Bairro" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                ></v-text-field>
                            </v-col>

                            <v-row class="px-0 py-0 mt-4">
                                <v-col cols="12" lg="3" md="3" class="pt-0">
                                    <v-text-field
                                        label="Número" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" lg="9" md="9" class="pt-0">
                                    <v-text-field
                                        label="Complemento (Opcional)" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </div>

                        <v-col cols="12" class="px-0 py-0 mt-5">
                            <v-btn color="black" size="large" block @click="next()">Próximo</v-btn>
                        </v-col>  

                        <v-col cols="12" class="px-0 py-0 mt-5">
                            <p class="text-center">Já possui uma conta? <router-link to="/login" class="text-black font-weight-bold">Entre agora</router-link></p>
                        </v-col>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>    
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

const App = defineComponent({
  components: {
    HelloWorld
  },

  data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        step: {
          totalSteps: 3,
          currentStep: 1,
          progress: 0
        },

        cadastro:{
            usuario: {
                nome: null,
                cpf: ""
            },
            loja: {
                temCnpj: null
            }
        },

        simNao: [
            { text: 'Sim', value: 1 },
            { text: 'Não', value: 0 }
        ],

        segmentos: [
            { text: 'Barbearia', value: 1 },
            { text: 'Salão de beleza', value: 2 },
            { text: 'Esmalteria', value: 3 },
            { text: 'Estética', value: 4 },
            { text: 'Clínica', value: 5 }
        ]
    };
  },
  methods: {
    next(){
        console.log(this.cadastro)
        if(this.step.currentStep < this.step.totalSteps){
            this.step.currentStep++
        }
    },

    previous(){
        if(this.step.currentStep > 0){
            this.step.currentStep--
        }
    }
  },

  mounted(){
  }
});

export default App
</script>
