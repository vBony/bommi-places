<template>
    <v-app>
        <v-layout class="rounded rounded-md">
            <AppBar @setToggleVerticalMenu="setToggleVerticalMenu" />
            
            <VerticalMenu :showVerticalMenu="showVerticalMenu" />
        
            <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
                <v-container fluid>
                    <v-row justify="center">
                        <v-col cols="12" md="8" sm="12">
                            <h2>Cadastro de Funcionários</h2>
                            <v-breadcrumbs :items="['Cadastros', 'Funcionários']">
                                <template v-slot:divider>
                                    <v-icon icon="mdi-chevron-right"></v-icon>
                                </template>
                            </v-breadcrumbs>
                        </v-col>
                        
                        <v-col cols="12" md="8" sm="12">
                            <v-card class="elevation-4 px-5 py-5">
                                Lorem Ipsum
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
    </template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import Place from '@/entities/Place';
import PlaceAddress from '@/entities/PlaceAddress';
        
const App = defineComponent({
components: {
    VerticalMenu,
    AppBar
},

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        showVerticalMenu: false,
        userStore: useUserStore(),
        user: new UserModel(),
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
    setToggleVerticalMenu(data){
        this.showVerticalMenu = data
    }
},

mounted(){
}
});
        
    export default App
    </script>
        