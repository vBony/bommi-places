<template>
<v-app>
    <v-layout class="rounded rounded-md">
        <VerticalMenu :showVerticalMenu="showVerticalMenu" v-if="shouldShowMenu" />
        <AppBar @setToggleVerticalMenu="setToggleVerticalMenu" v-if="shouldShowMenu" />

        <RouterView id="routerview" />
    </v-layout>
</v-app>
</template>

<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from './helpers/http'
import { useUserStore } from './store/user'
import UserModel from './entities/User'
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
            place: new Place(),
            placeAddress: new PlaceAddress(),
            showMenu: true,
            hiddenMenuRoutes: []
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
        },

        getHiddenMenuRoutes(){
            return ['login', 'singup', 'singupPlaces']
        }
    },
    computed: {
        shouldShowMenu(){
            const routes = this.getHiddenMenuRoutes()

            // console.log(this.$route.name)
            
            // Se ta na lista, não mostra o menu
            return !routes.includes(this.$route.name)
        }
    }
});
    
export default App
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

    .v-application {
        background-color:  #e0e0e0 !important;
    }

    * {
        font-family: 'Poppins', sans-serif;
    }
</style>
