<template>
    <v-container class="px-0 py-0">
        <v-row no-gutters class="d-flex align-center justify-center h-screen">
            <v-col
                cols="12"
                lg="4"
                class="d-flex align-center justify-center"
            >
                <v-card
                    flat
                    theme="light"
                    density="default"
                    variant="elevated"
                    class="mt-12 mt-sm-0 pa-4"
                >

                <h3>Ubarber Places</h3>
                <h1>Bem vindo ao Ubarber! 👋🏻</h1>
                <p class="text-disabled">
                    Para continuar, realize o login em sua conta
                </p>
                <v-form :disabled="loading" @submit.prevent="login()" class="mt-10">
                    <v-col cols="12" class="px-0 py-0">
                        <v-text-field label="E-mail" variant="outlined" type="email" hide-details="auto" error-messages=""></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" class="px-0 py-0 mt-4">
                        <v-text-field 
                            label="Senha" 
                            variant="outlined" 
                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible ? 'text' : 'password'"
                            @click:append-inner="visible = !visible"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="px-0 py-0 mt-1">
                        <a href="" class="text-caption text-decoration-none text-black">
                            Esqueceu sua senha?
                        </a>
                    </v-col>

                    <v-col cols="12" class="px-0 py-0 mt-5">
                        <v-btn color="black" size="large" block>Entrar</v-btn>
                    </v-col>

                    <v-col cols="12" class="px-0 py-0 mt-5">
                        <p class="text-center">Não tem cadastro? <router-link to="/register" class="text-black font-weight-bold">Cadastre seu Salão</router-link></p>
                    </v-col>
                </v-form>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
        visible: false,
        response: false,
        error: false,
        consultaExecutada: false,
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
    };
  },
  methods: {
    async consultar(){
      let url = this.serverUrl+'api/test'
      this.loading = true
      await axios.get(url)
      .then((response) => {
        this.resetMessages()
        this.consultaExecutada = true
        if(response.data.response === true){
          this.response = true
        }else{
          this.response = false
        }
      })
      .catch(error => {
        this.resetMessages()
        this.consultaExecutada = true
        this.error = true
        console.error(error);
      });
    },

    login(){
        alert('Logged!')
    },

    resetMessages(){
      this.response = false
      this.error = false
      this.consultaExecutada = false
      this.loading = false
    }
  },

  mounted(){
  }
});

export default App
</script>
