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
                    </v-col>
                    <v-form :disabled="loading" @submit.prevent="register()" class="mt-10">
                        <!-- Dados do responsável -->
                        <div>
                            <h1>Dados pessoais do responsável 🤵</h1>
                            <p class="text-disabled">
                                Informe os seus dados pessoais
                            </p>

                            <v-row class="px-0 py-0 mt-4">
                                <v-col cols="12" lg="6" md="6">
                                    <v-text-field 
                                        v-model="entidade.firstName"
                                        label="Nome" 
                                        variant="outlined" 
                                        type="text" 
                                        hide-details="auto" 
                                        :error-messages="messages.firstName"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field 
                                        v-model="entidade.lastName"
                                        label="Sobrenome" 
                                        variant="outlined" 
                                        type="text" 
                                        hide-details="auto" 
                                        :error-messages="messages.lastName"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                                
                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.cpf"
                                    label="CPF do responsável legal" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                    :error-messages="messages.cpf"
                                    v-maska:[cpfMaskToken]
                                ></v-text-field>

                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.birthdate"
                                    label="Data de nascimento" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="date"
                                    :error-messages="messages.birthdate"
                                ></v-text-field>
                            </v-col>

                            <h1 class="mt-3">Dados de acesso 🔐</h1>
                            <p class="text-disabled">
                                Os dados informados abaixo serão para acessar o sistema
                            </p>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.email"
                                    label="E-mail" 
                                    variant="outlined" 
                                    type="email" 
                                    hide-details="auto" 
                                    :error-messages="messages.email"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.password"
                                    label="Senha" 
                                    variant="outlined" 
                                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="visible ? 'text' : 'password'"
                                    @click:append-inner="visible = !visible"
                                    hide-details="auto"
                                    :error-messages="messages.password"
                                ></v-text-field>
                            </v-col>
                        </div>
                        <!-- FIM dados do responsável -->

                        <v-row class="mt-10 d-flex justify-end mb-10">
                            <v-btn color="black" size="large" @click="register()">Próximo</v-btn>
                        </v-row>

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
// @ts-nocheck
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { vMaska, Mask } from "maska"

const App = defineComponent({
  components: {
    HelloWorld
  },

  directives: { maska: vMaska },

  data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        visible: false,

        entidade: new UserModel(),

        messages: new UserModel(),

        simNao: [
            { text: 'Sim', value: 1 },
            { text: 'Não', value: 0 }
        ],

        cpfMaskToken: {mask:'###.###.###-##'},
        cpfMask: null
    };
  },
  created(){
    this.cpfMask = new Mask(this.cpfMaskToken)
  },
  methods: {
    register(){
        const userStore = useUserStore()

        this.loading = true

        this.entidade.cpf = this.cpfMask.unmasked(this.entidade.cpf)
        axios.post(this.serverUrl+'/api/auth/employee', this.entidade)
        .then((response) => {
            this.loading = false
            if(response.data.user !== undefined){
                userStore.setUser(response.data.user)

                if(response.data.token !== undefined){
                    userStore.setToken(response.data.token)
                    
                    this.$router.replace('/places/criar')
                }
            }
        })
        .catch((reason) => {
            this.loading = false
            if(reason.response.data.errors !== undefined){
                this.messages = reason.response.data.errors
            }
        })
    }
  },

  mounted(){
  }
});

export default App
</script>
