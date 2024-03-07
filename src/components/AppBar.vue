<template>
    <v-app-bar title="" class="elevation-0 d-flex align-center justify-space-between">
        <v-row no-gutters class="d-flex align-center justify-space-between pe-4">
            <div class="d-inline-flex text-center align-center" :class="{ 'ps-4': display.mdAndDown == false }">
                <v-app-bar-nav-icon @click="toggleVerticalMenu()" v-show="display.mdAndDown == true"></v-app-bar-nav-icon>
                <h3>Bommi Places</h3>
            </div> 
    
            <div>
                Teste
            </div> 
        </v-row>
    </v-app-bar>
</template>

<script lang="ts">
// @ts-nocheck
import { useDisplay } from 'vuetify'

export default {
    data () {
        return {
            display: useDisplay(),
            showVerticalMenu: false
        }
    },

    created(){
        console.log(this.display.mdAndDown)
    },

    methods: {
        toggleVerticalMenu(){
            this.showVerticalMenu = this.showVerticalMenu == true ? false : true
            this.$emit("setToggleVerticalMenu", this.showVerticalMenu);
        }
    }
}
</script>