<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12"> 
                <v-card
                    :loading="loading"
                    title="Teste de API"
                    variant="tonal"
                    subtitle="Verifique se a comunicação entre o cliente e a API está correta"
                >
                    <v-card-text>
                        <v-col cols="12" class="mx-0 px-0" v-if="consultaExecutada">
                            <div class="font-weight-bold mx-0 px-0">
                                Resultado: 
                                <v-chip
                                  class="ma-2"
                                  color="green"
                                  text-color="white"
                                  v-if="response"
                                >
                                  Comunicação realizada
                                </v-chip>
                                <v-chip
                                  class="ma-2"
                                  color="red"
                                  text-color="white"
                                  v-if="error"
                                >
                                  Falha na comunicação
                                </v-chip>
                            </div>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                          color="green-darken-1" 
                          variant="tonal" 
                          @click="consultar()"
                          :disabled="loading"
                          :loading="loading"
                        >Executar</v-btn>
                    </v-card-actions>
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
      response: false,
      error: false,
      consultaExecutada: false,
      serverUrl: import.meta.env.VITE_SERVER_URL,
      loading: false
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
