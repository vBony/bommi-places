<template>        
    <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="8" sm="12">
                    <h2>Meu Perfil</h2>
                </v-col>

                <v-col cols="12" md="8" sm="12">
                    <v-card class="elevation-4 pa-10">
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
                            <v-col cols="12">
                                <v-window v-model="tab">
                                    <v-window-item value="1">
                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12" lg="6" md="6">
                                                <v-text-field 
                                                    v-model="user.emp_first_name"
                                                    label="Nome" 
                                                    variant="outlined" 
                                                    type="text" 
                                                    hide-details="auto" 
                                                    :error-messages="messages.emp_first_name"
                                                ></v-text-field>
                                            </v-col>
                
                                            <v-col cols="12" lg="6" md="6" sm="12">
                                                <v-text-field 
                                                    v-model="user.emp_last_name"
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
                                                v-model="user.emp_cpf"
                                                label="CPF do responsável legal" 
                                                variant="outlined"
                                                hide-details="auto"
                                                type="text"
                                                :error-messages="messages.emp_cpf"
                                                v-maska:[mt.cpf]
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="px-0 py-0 mt-4">
                                            <v-text-field 
                                                v-model="user.emp_birthdate"
                                                label="Data de nascimento" 
                                                variant="outlined"
                                                hide-details="auto"
                                                type="date"
                                                :error-messages="messages.emp_birthdate"
                                            ></v-text-field>
                                        </v-col>

                                        <v-row>
                                            <v-col cols="12" class="pb-0">
                                                <v-text-field 
                                                    v-model="user.emp_email"
                                                    label="E-mail" 
                                                    type="email" 
                                                    variant="outlined"
                                                    hide-details="auto" 
                                                    density="compact"
                                                    :error-messages="messages.emp_email"
                                                ></v-text-field>
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
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
import { vMaska, Mask } from "maska"
import MaskTokens from '../entities/Masks'
        
const App = defineComponent({
components: {
    VerticalMenu,
    AppBar
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
    
},

mounted(){

}
});
        
export default App
</script>