

<template>
<v-menu
    v-model="menu"
    location="top start"
    origin="top start"
    transition="scale-transition"
>
    <template v-slot:activator="{ props }">
        <v-chip
            v-bind="props"
            link
            pill
        >
            <v-avatar start>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            
            {{ first_name }}
        </v-chip>
    </template>

    <v-card width="300">
        <v-list bg-color="black">
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar image="https://cdn.vuetifyjs.com/images/john.png"></v-avatar>
                </template>

                <v-list-item-title>{{ first_name }}</v-list-item-title>

                <v-list-item-subtitle>{{ user_type }}</v-list-item-subtitle>

                <template v-slot:append>
                    <v-list-item-action>
                        <v-btn
                            variant="text"
                            icon
                            @click="menu = false"
                        >
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </template>
            </v-list-item>
        </v-list>

        <v-list>
            <v-list-item prepend-icon="mdi-cog" link>
                <v-list-item-subtitle>Configurações</v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-exit-to-app" link>
                <v-list-item-subtitle>Sair</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-card>
</v-menu>
</template>

<script lang="ts">
// @ts-nocheck
import UserModel from '../entities/User'

export default {
    props: {
        first_name: "",
        user_type: ""
    },
    
    data () {
        return {
            user: new UserModel(),
            menu: false
        }
    },

    methods: {
        toggleVerticalMenu(){
            this.showVerticalMenu = this.showVerticalMenu == true ? false : true
            this.$emit("setToggleVerticalMenu", this.showVerticalMenu);
        }
    }
}
</script>