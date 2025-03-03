<template>
    <v-navigation-drawer
        elevation="4"
        class="border-0"
        :model-value="this.display.lgAndUp == true || showVerticalMenu == true"
        :temporary="display.lg.value == false"
    >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            nav
            class="px-3 py-5"
        >
            <div cols="12">
                <div class="font-weight-bold text-truncate"> {{ user.emp_first_name }} </div>
                <div class="text-disabled text-subtitle-2"> {{ user.emp_type_name }} </div>
            </div>
        </v-list-item>

        <v-list density="comfortable" nav>
            <v-list-item 
                prepend-icon="mdi-view-dashboard" 
                title="Dashboard" 
                value="home"
                to="/dashboard"
            ></v-list-item>
            <v-list-group value="Cadastros">
                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-archive-edit-outline"
                        title="Cadastros"
                    ></v-list-item>
                </template>

                <v-list-item 
                    title="Funcionários"
                    prepend-icon="mdi-badge-account-horizontal-outline"
                    style="padding-inline-start: 25px !important"
                    link
                    variant="text"
                    to="/cadastros/funcionarios"
                ></v-list-item>

                <v-list-item 
                    title="Serviços"
                    prepend-icon="mdi-format-list-bulleted-type"
                    style="padding-inline-start: 25px !important"
                    link
                    variant="text"
                    to="/cadastros/servicos"
                ></v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
// @ts-nocheck
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'

export default {
    props: {
        showVerticalMenu: false
    },

    data () {
        return {
            userStore: useUserStore(),
            user: new UserModel(),
            display: useDisplay()
        }
    },

    created(){
        this.user = this.userStore.getUser ?? new UserModel()
    }
}
</script>