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
                                        v-model="entidade.emp_first_name"
                                        label="Nome" 
                                        variant="outlined" 
                                        type="text" 
                                        hide-details="auto" 
                                        :error-messages="messages.emp_first_name"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field 
                                        v-model="entidade.emp_last_name"
                                        label="Sobrenome" 
                                        variant="outlined" 
                                        type="text" 
                                        hide-details="auto" 
                                        :error-messages="messages.emp_last_name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                                
                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.emp_cpf"
                                    label="CPF do responsável legal" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                    :error-messages="messages.emp_cpf"
                                ></v-text-field>

                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.emp_birthdate"
                                    label="Data de nascimento" 
                                    variant="outlined"
                                    hide-details="auto"
                                    type="text"
                                    :error-messages="messages.emp_birthdate"
                                ></v-text-field>
                            </v-col>

                            <h1 class="mt-3">Dados de acesso 🔐</h1>
                            <p class="text-disabled">
                                Os dados informados abaixo serão para acessar o sistema
                            </p>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.emp_email"
                                    label="E-mail" 
                                    variant="outlined" 
                                    type="email" 
                                    hide-details="auto" 
                                    :error-messages="messages.emp_email"
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-0 py-0 mt-4">
                                <v-text-field 
                                    v-model="entidade.emp_password"
                                    label="Senha" 
                                    variant="outlined" 
                                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="visible ? 'text' : 'password'"
                                    @click:append-inner="visible = !visible"
                                    hide-details="auto"
                                    :error-messages="messages.emp_password"
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
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'

const App = defineComponent({
  components: {
    HelloWorld
  },

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
        ]
    };
  },
  created(){
  },
  methods: {
    register(){
        const userStore = useUserStore()

        this.loading = true
        axios.post(this.serverUrl+'/api/auth/employee', this.entidade)
        .then((response) => {
            this.loading = false
            if(response.data.user !== undefined){
                userStore.setUser(response.data.user)

                if(response.data.token !== undefined){
                    userStore.setToken(response.data.token)
                    
                    this.$router.replace('/places/register')
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
