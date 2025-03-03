<template>        
    <v-main class="d-flex" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="10" sm="12">
                    <h2>Meu Perfil</h2>
                </v-col>

                <v-col cols="12" md="10" sm="12">
                    <v-card class="elevation-5 pa-10">
                        <v-row>
                            <v-tabs v-model="tab">
                                <v-tab 
                                    value="1"
                                    prepend-icon="mdi-account-edit"
                                >
                                    Dados Pessoais
                                </v-tab>
                                <v-tab 
                                    value="2"
                                    prepend-icon="mdi-store-cog"
                                >
                                    Atendimento
                                </v-tab>
                            </v-tabs>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="pa-0">
                                <v-window v-model="tab">
                                    <v-window-item value="1">
                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <v-card class="pa-5" color="surface-variant" variant="tonal">
                                                    <div class="d-flex justify-space-between align-center">
                                                        <div class="d-flex align-center">
                                                            <input 
                                                                type="file" 
                                                                style="display: none" 
                                                                id="avatar"
                                                                accept="image/jpeg, image/jpg, image/png"
                                                            >
                                                            
                                                            <v-img
                                                                class="rounded-circle me-5"
                                                                width="90"
                                                                height="90"
                                                                aspect-ratio="1/1"
                                                                cover
                                                                src="https://randomuser.me/api/portraits/men/85.jpg"
                                                            ></v-img>
                                                            <div cols="12">
                                                                <div class="font-weight-bold text-truncate"> {{ user.emp_first_name }} </div>
                                                                <div class="text-disabled text-subtitle-2"> {{ user.emp_type_name }} </div>
                                                            </div>
                                                        </div>
    
                                                        <div>
                                                            <v-btn
                                                                prepend-icon="mdi-camera-plus-outline"
                                                                color="black"
                                                                @click="triggerUpload()"
                                                            >
                                                                Alterar foto
                                                            </v-btn>
                                                        </div>
                                                    </div>
                                                </v-card>

                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12" lg="6" md="6">
                                                <app-label text="Nome" />
                                                <text-field
                                                    v-model="user.emp_first_name"
                                                    :error-messages="messages.emp_first_name"
                                                />
                                            </v-col>
                
                                            <v-col cols="12" lg="6" md="6" sm="12">
                                                <app-label text="Sobrenome" />
                                                <text-field
                                                    v-model="user.emp_last_name"
                                                    :error-messages="messages.emp_last_name"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <app-label text="CPF" />
                                                <text-field
                                                    v-model="user.emp_cpf"
                                                    :error-messages="messages.emp_cpf"
                                                    v-maska:[mt.cpf]
                                                />                                                
                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <app-label text="Data de nascimento" />
                                                <text-field
                                                    v-model="user.emp_birthdate"
                                                    :error-messages="messages.emp_birthdate"
                                                    type="date"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4 mb-4">
                                            <v-col cols="12">
                                                <app-label text="E-mail" />
                                                <text-field
                                                    v-model="user.emp_email"
                                                    :error-messages="messages.emp_email"
                                                    type="email"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-btn
                                                    prepend-icon="mdi-pencil-outline"
                                                    color="black"
                                                >
                                                    Salvar Alterações
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-window-item>

                                    <v-window-item value="2">
                                        Two
                                    </v-window-item>
                                </v-window>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
import { vMaska, Mask } from "maska"
import MaskTokens from '../entities/Masks'
import TextField from '@/components/fields/TextField.vue';
import AppLabel from "@/components/fields/LabelField.vue";
        
const App = defineComponent({
components: {
    TextField,
    AppLabel
},

directives: { maska: vMaska },

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        userStore: useUserStore(),
        display: useDisplay(),
        mt: new MaskTokens(),
        
        tab: '1',
        user: new UserModel(),
        messages: new UserModel()
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
    triggerUpload(){
        let inputFile = document.getElementById("avatar")
        inputFile.click()
    }
},

mounted(){

}
});
        
export default App
</script>