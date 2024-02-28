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
                            <h2 class="text-center">Ubarber Places</h2>
                            <v-progress-linear
                                v-model="step.progress"
                                color="black"
                                height="10"
                            ></v-progress-linear>
                        </v-col>
                        <v-form :disabled="loading" @submit.prevent="register()" class="mt-10">
                            <!-- Inicio dados do estabelecimento -->
                            <div v-show="step.currentStep == 1">
                                <h1>Informações do estabelecimento 🏬</h1>
                                <p class="text-disabled">
                                    Preencha com os dados do seu negócio
                                </p>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-select
                                        v-model="entidade.estabelecimento.temCnpj"
                                        item-title="text" 
                                        item-value="value"
                                        label="Possui CNPJ?"
                                        :items="simNao"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-select>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="entidade.estabelecimento.temCnpj === 0">
                                    <v-text-field
                                        v-model="entidade.usuario.cpf"
                                        disabled
                                        label="CPF do responsável legal" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="entidade.estabelecimento.temCnpj === 1">
                                    <v-text-field 
                                        v-model="entidade.estabelecimento.cnpj"
                                        label="CNPJ" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field 
                                        v-model="entidade.estabelecimento.nome"
                                        label="Nome do estabelecimento" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        hint="Como aparecerá no app"
                                        autocomplete="empresa"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field 
                                        v-model="entidade.estabelecimento.telefone"
                                        label="Telefone ou Celular do estabelecimento" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        hint="Como aparecerá no app"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-select
                                        v-model="entidade.estabelecimento.idSegmento"
                                        item-title="text" 
                                        item-value="value"
                                        label="Segmento"
                                        :items="segmentos"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-select>
                                </v-col>
                            </div>
    
                            <div v-show="step.currentStep == 2">
                                <h1>Endereço 🏬</h1>
                                <p class="text-disabled">
                                    Preencha as informações de endereço do seu negócio
                                </p>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field
                                        v-model="entidade.estabelecimento.endereco.cep"
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
                                            v-model="entidade.estabelecimento.endereco.uf"
                                            label="Estado" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9">
                                        <v-text-field
                                            disabled
                                            v-model="entidade.estabelecimento.endereco.cidade"
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
                                        v-model="entidade.estabelecimento.endereco.bairro"
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
    
                                <v-row class="px-0 py-0 mt-4">
                                    <v-col cols="12" lg="3" md="3" class="pt-0">
                                        <v-text-field
                                            label="Número" 
                                            v-model="entidade.estabelecimento.endereco.numero"
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9" class="pt-0">
                                        <v-text-field
                                            v-model="entidade.estabelecimento.endereco.complemento"
                                            label="Complemento (Opcional)" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </div>
    
                            <v-row class="mt-10 d-flex justify-space-between mb-10">
                                <v-btn @click="previous()" variant="tonal" size="large">Voltar</v-btn>
                                <v-btn color="black" size="large" @click="next()">Próximo</v-btn>
                            </v-row>
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
    import { log } from 'node:console';
    
    const App = defineComponent({
      components: {
        HelloWorld
      },
    
      data() {
        return {
            serverUrl: import.meta.env.VITE_SERVER_URL,
            loading: false,
            visible: false,
            step: {
              totalSteps: 2,
              currentStep: 1,
              progress: 0,
              percentagePerStep: 0
            },
    
            entidade:{
                usuario: {
                    nome: null,
                    cpf: null,
                    dataNascimento: null,
                    email: null,
                    senha: null
                },
                estabelecimento: {
                    temCnpj: null,
                    cnpj: null,
                    nome: null,
                    telefone: null,
                    idSegmento: null,
                    endereco: {
                        cep: null,
                        uf: null,
                        cidade: null,
                        bairro: null,
                        numero: null,
                        complemento: null
                    }
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
      created(){
        // Starting progress bar in step 1
        this.step.percentagePerStep = 100 / this.step.totalSteps
        this.step.progress = this.step.percentagePerStep
      },
      methods: {
        next(){
            if(this.step.currentStep < this.step.totalSteps){
                this.step.progress += this.step.percentagePerStep
                this.step.currentStep++
            }
        },
    
        previous(){
            if(this.step.currentStep > 1){
                this.step.progress -= this.step.percentagePerStep
                this.step.currentStep--
            }
        },
    
        register(){
            axios.post('')
        }
      },
    
      mounted(){
      }
    });

    export default App
</script>
    