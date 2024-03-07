<template>
<v-app>
    <v-layout class="rounded rounded-md">
        <AppBar @setToggleVerticalMenu="setToggleVerticalMenu" />
        
        <VerticalMenu :showVerticalMenu="showVerticalMenu" />
    
        <v-main class="d-flex mx-4 my-4" style="min-height: 300px;">
            <div cols="12" >
                <v-col cols="12" class="px-0 py-0 mb-10">
                    <h4 class="text-center">Ubarber Places</h4>
                    <p class="text-disabled">Seja bem-vindo 👋</p>
                    <h2>🏬 {{ place.pla_name }}</h2>
                    <p class="text-disabled">
                        {{placeAddress.plad_cep }} <br>
                        {{placeAddress.plad_city}} - {{placeAddress.plad_uf}} <br>
                        {{placeAddress.plad_district}} <br>
                        {{placeAddress.plad_complement}}
                    </p>
                </v-col>

                <v-col cols="12">
                    <h4>🤵 Usuario</h4>
                    <p>Nome: {{ user.emp_first_name + ' ' + user.emp_last_name }} </p>
                    <p>Hierarquia: {{ user.emp_type_name }}</p>
                </v-col>
            </div>
        </v-main>
    </v-layout>
</v-app>
</template>
    
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import Place from '@/entities/Place';
import PlaceAddress from '@/entities/PlaceAddress';
    
const App = defineComponent({
    components: {
        HelloWorld,
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
            place: new Place(),
            placeAddress: new PlaceAddress()
        };
    },

    beforeCreate(){
        let userStore = useUserStore()
        this.user = userStore.getUser
    },

    created(){
        this.user = this.userStore.getUser ?? new UserModel()

        req.post(this.serverUrl+'/api/dashboard/init', {})
        .then( (response) => {
            let data = response.data
            this.place = data.place
            this.placeAddress = data.place.address
        })
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
    