<template>
    <v-app-bar title="" class="elevation-4 d-flex align-center justify-space-between">
        <v-row no-gutters class="d-flex align-center justify-space-between pe-4">
            <div class="d-inline-flex text-center align-center" :class="{ 'ps-4': display.mdAndDown == false }">
                <v-app-bar-nav-icon @click="toggleVerticalMenu()" v-show="display.mdAndDown == true"></v-app-bar-nav-icon>
                <h3>Bommi Places</h3>
            </div> 
    
            <div>
                <UserMenu
                    :first_name="user.emp_first_name"
                    :user_type="user.emp_type_name"
                    :user_avatar_url="user.emp_avatar_url"
                />
            </div> 
        </v-row>
    </v-app-bar>
</template>

<script lang="ts">
// @ts-nocheck
import { useDisplay } from 'vuetify'
import UserMenu from './UserMenu.vue'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'

export default {
    components: {
        UserMenu
    },

    data () {
        return {
            display: useDisplay(),
            showVerticalMenu: false,
            userStore: useUserStore(),
            user: new UserModel()
        }
    },

    created(){
        this.user = this.userStore.getUser ?? new UserModel()
    },

    methods: {
        toggleVerticalMenu(){
            this.showVerticalMenu = this.showVerticalMenu == true ? false : true
            this.$emit("setToggleVerticalMenu", this.showVerticalMenu);
        }
    }
}
</script>