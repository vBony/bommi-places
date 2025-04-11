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
                            <UserMenu 
                                :first_name="user.emp_first_name"
                                :user_type="user.emp_type_name"
                            />
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
                                        v-model="place.hasCnpj"
                                        item-title="text" 
                                        item-value="value"
                                        label="Possui CNPJ?"
                                        :items="simNao"
                                        variant="outlined"
                                        hide-details="auto"
                                        :error-messages="messages.hasCnpj"
                                    ></v-select>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="place.hasCnpj == 0">
                                    <v-text-field
                                        v-model="user.cpf"
                                        disabled
                                        label="CPF do responsável legal" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        v-maska:[cpfMaskToken]
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4" v-if="place.hasCnpj == 1">
                                    <v-text-field 
                                        v-model="place.cnpj"
                                        :error-messages="messages.cnpj"
                                        label="CNPJ" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"    
                                        v-maska:[cnpjMaskToken]                                    
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-text-field 
                                        v-model="place.name"
                                        :error-messages="messages.name"
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
                                        v-model="place.phoneNumber"
                                        :error-messages="messages.phoneNumber"
                                        label="Telefone ou Celular do estabelecimento" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        hint="Como aparecerá no app"
                                        v-maska:[phoneMaskToken]  
                                    ></v-text-field>
                                </v-col>
    
                                <v-col cols="12" class="px-0 py-0 mt-4">
                                    <v-select
                                        v-model="place.idCategory"
                                        :error-messages="messages.idCategory"
                                        item-title="name" 
                                        item-value="id"
                                        label="Segmento"
                                        :items="categories"
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
                                        v-model="place.address.cep"
                                        :error-messages="messages.address.cep"
                                        label="CEP" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        @change="searchAddress()"
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
                                            v-model="place.address.uf"
                                            :error-messages="messages.address.uf"
                                            disabled
                                            label="Estado" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9">
                                        <v-text-field
                                            v-model="place.address.city"
                                            :error-messages="messages.address.city"
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
                                        v-model="place.address.district"
                                        :error-messages="messages.address.district"
                                        label="Bairro" 
                                        variant="outlined"
                                        hide-details="auto"
                                        type="text"
                                        disabled
                                    ></v-text-field>
                                </v-col>
    
                                <v-row class="px-0 py-0 mt-4">
                                    <v-col cols="12" lg="3" md="3" class="pt-0">
                                        <v-text-field
                                            v-model="place.address.number"
                                            :error-messages="messages.address.number"
                                            label="Número" 
                                            variant="outlined"
                                            hide-details="auto"
                                            type="text"
                                        ></v-text-field>
                                    </v-col>
    
                                    <v-col cols="12" lg="9" md="9" class="pt-0">
                                        <v-text-field
                                            v-model="place.address.complement"
                                            :error-messages="messages.address.complement"
                                            label="Complemento" 
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
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import Place from '@/entities/Place';
import PlaceAddress from '@/entities/PlaceAddress';
import UserMenu from '@/components/UserMenu.vue';
import { vMaska, Mask } from "maska"

const App = defineComponent({
components: {
    HelloWorld,
    UserMenu
},

directives: { maska: vMaska },

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

        categories: [],

        messages:  new Place(),

        simNao: [
            { text: 'Sim', value: 1 },
            { text: 'Não', value: 0 }
        ],

        userStore: useUserStore(),

        cpfMaskToken: {mask:'###.###.###-##'},
        cpfMask: null,

        cnpjMaskToken: {mask:'##.###.###/####-##'},
        cnpjMask: null,

        phoneMaskToken: {mask:'(##) #####-####'},
        phoneMask: null,
    };
},
created(){
    // Starting progress bar in step 1
    this.step.percentagePerStep = 100 / this.step.totalSteps
    this.step.progress = this.step.percentagePerStep

    Object.assign(this.user, this.userStore.getUser);
    
    this.init()
},
methods: {
    init(){
        this.cpfMask = new Mask(this.cpfMaskToken)
        this.cnpjMask = new Mask(this.cnpjMaskToken)
        this.phoneMask = new Mask(this.phoneMaskToken)

        this.getCategories()
    },

    next(){
        if(this.step.currentStep < this.step.totalSteps){
            this.step.progress += this.step.percentagePerStep
            this.step.currentStep++
        }else{
            this.register()
        }
    },

    previous(){
        if(this.step.currentStep > 1){
            this.step.progress -= this.step.percentagePerStep
            this.step.currentStep--
        }
    },

    register(){
        this.place.cnpj = this.cnpjMask.unmasked(this.place.cnpj)
        this.place.phoneNumber = this.phoneMask.unmasked(this.place.phoneNumber)

        req.post(this.serverUrl+'/api/admin/place', this.place)
        .then( (response) => {
            this.resetMessages()
            this.$router.replace('/dashboard')
        })
        .catch( (reason) => {
            this.loading = false
            if(reason.response.data.errors !== undefined){
                this.messages = reason.response.data.errors
                
                if(reason.response.data.errors.address === undefined){
                    this.resetAddressMessages()
                    this.previous()
                }else{
                    this.resetPlaceMessage()
                }
            }
        })
    },

    searchAddress(){
        this.place.address.cep = this.place.address.cep.replace(/\D/g, '')

        if (this.place.address.cep != "") {
            let validaCep = /^[0-9]{8}$/
            let errorMessage = "Houve um problema na requisicao, tente novamente mais tarde."
            this.resetAddressMessages()


            if(validaCep.test(this.place.address.cep)){
                this.loading = true

                req.get("https://viacep.com.br/ws/"+ this.place.address.cep +"/json/")
                .then( (response) => {
                    this.loading = false
                    let data = response.data

                    if(data){
                        this.place.address.district = data.bairro
                        this.place.address.city = data.localidade
                        this.place.address.uf = data.uf
                        this.place.address.complement = data.complemento
                    }else{
                        this.messages.place.address.cep = errorMessage
                    }
                })
                .catch( (response) => {
                    this.loading = false
                    this.messages.place.address.cep = errorMessage
                })
            }
        }
    },

    getCategories(){
        req.get(this.serverUrl+'/api/admin/place/categories')
        .then( (response) => {
            this.categories = response.data
        })
    },

    resetMessages(){
        this.messages = new Place()
    },

    resetPlaceMessage(){
        let message = structuredClone(this.messages.address);
        this.messages = new Place()
        this.messages.address = message
    },

    resetAddressMessages(){
        this.messages.address = new PlaceAddress()
    }
}
});

export default App
</script>
    