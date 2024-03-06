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
        userStore: useUserStore(),
        user: new UserModel(),
        place: new Place(),
        placeAddress: new PlaceAddress()
    };
    },
    created(){
        this.user = this.userStore.getUser

        const config = {
            headers: { Authorization: `Bearer ${this.userStore.getToken}` }
        };

        axios.post(this.serverUrl+'/api/dashboard/init', {}, config)
        .then( (response) => {
            let data = response.data
            this.place = data.place
            this.placeAddress = data.place.address
            
            this.userStore.setUser(data.employee)
        })
    },
    methods: {
    
    },

    mounted(){
    }
});
    
export default App
</script>
    