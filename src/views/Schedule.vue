<template>
    <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="8" sm="12">
                    <h2>Agenda</h2>
                </v-col>
                
                <v-col cols="12" md="8" sm="12">
                    <v-card class="elevation-4 pa-10">
                        <FullCalendarWrapper @eventClicked="handleEventClick" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import FullCalendarWrapper from '@/components/FullCalendarWrapper.vue' 

const App = defineComponent({
    components: {
        HelloWorld,
        VerticalMenu,
        AppBar,
        FullCalendarWrapper
    },

    data() {
        return {
            loading: false,
        };
    },

    created(){
        
    },

    methods: {
        handleEventClick(event) {
            console.log(event)
        },
    }
});
        
export default App
</script>
        