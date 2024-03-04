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
                        <v-col cols="12" class="px-0 py-0 mb-10 d-flex justify-end">
                            <v-chip
                                link
                                pill
                            >
                                {{ user.emp_first_name }}
                                
                                <v-avatar end>
                                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                                </v-avatar>
                            </v-chip>
                        </v-col>
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
                                        v-model="place.pla_has_cnpj"
                                        item-title="text" 
                                        item-value="value"
                                        label="Possui CNPJ?"
                                        :items="simNao"
                                        variant="outlined"
                                        hide-details="auto"
                                        :error-messages="messages.place.pla_has_cnpj"
                                    ></v-select>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="place.pla_has_cnpj == 0">
                                    <v-text-field
                                        v-model="user.emp_cpf"
                                        disabled
                                        label="CPF do responsável legal" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="place.pla_has_cnpj == 1">
                                    <v-text-field 
                                        v-model="place.pla_cnpj"
                                        :error-messages="messages.place.pla_cnpj"
                                        label="CNPJ" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"                                        
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field 
                                        v-model="place.pla_name"
                                        :error-messages="messages.place.pla_name"
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
                                        v-model="place.pla_phone_number"
                                        :error-messages="messages.place.pla_phone_number"
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
    
                            <div v-show="step.currentStep == 2">
                                <h1>Endereço 🏬</h1>
                                <p class="text-disabled">
                                    Preencha as informações de endereço do seu negócio
                                </p>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field
                                        v-model="placeAddress.plad_cep"
                                        :error-messages="messages.placeAddress.plad_cep"
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
                                            v-model="placeAddress.plad_uf"
                                            :error-messages="messages.placeAddress.plad_uf"
                                            disabled
                                            label="Estado" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9">
                                        <v-text-field
                                            v-model="placeAddress.plad_city"
                                            :error-messages="messages.placeAddress.plad_city"
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
                                        v-model="placeAddress.plad_district"
                                        :error-messages="messages.placeAddress.plad_district"
                                        label="Bairro" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
    
                                <v-row class="px-0 py-0 mt-4">
                                    <v-col cols="12" lg="3" md="3" class="pt-0">
                                        <v-text-field
                                            v-model="placeAddress.plad_number"
                                            :error-messages="messages.placeAddress.plad_number"
                                            label="Número" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9" class="pt-0">
                                        <v-text-field
                                            v-model="placeAddress.plad_number"
                                            :error-messages="messages.placeAddress.plad_number"
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
// @ts-nocheck
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import Place from '@/entities/Place';
import PlaceAddress from '@/entities/PlaceAddress';

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

    user: new UserModel(),

    place: new Place(),
    placeAddress: new PlaceAddress(),

    messages: {
        place: new Place(),
        placeAddress: new PlaceAddress()
    },

    simNao: [
        { text: 'Sim', value: 1 },
        { text: 'Não', value: 0 }
    ],
};
},
created(){
    // Starting progress bar in step 1
    this.step.percentagePerStep = 100 / this.step.totalSteps
    this.step.progress = this.step.percentagePerStep

    const userStore = useUserStore()
    console.log(userStore.getUser)
    Object.assign(this.user, userStore.getUser);
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
    