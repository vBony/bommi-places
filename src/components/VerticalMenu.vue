<template>
    <v-navigation-drawer
        class="border-0"
        :model-value="display.lg.value == true || showVerticalMenu == true"
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
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
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