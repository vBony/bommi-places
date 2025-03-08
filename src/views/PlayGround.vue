<template>        
    <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="8" sm="12">
                    <h2>Playground</h2>
                </v-col>

                <v-col cols="12" md="8" sm="12">
                    <v-card class="elevation-4 pa-10">
                        <app-label text="CPF" />
                        <text-field
                            v-maska:[mt.cpf]
                        />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import MaskTokens from '../entities/Masks'
import TextField from '@/components/fields/TextField.vue';
import AppLabel from "@/components/fields/LabelField.vue";
        
const App = defineComponent({

    components: {
        TextField,
        AppLabel
    },

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        userStore: useUserStore(),
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