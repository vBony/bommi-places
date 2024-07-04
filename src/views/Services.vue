<template>
<v-app>
    <v-layout class="rounded rounded-md">
        <AppBar @setToggleVerticalMenu="setToggleVerticalMenu" />
        <VerticalMenu :showVerticalMenu="showVerticalMenu" />
        <LoadingOverlay :loading="loading"></LoadingOverlay>
    
        <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="12" md="8" sm="12">
                        <h2>Cadastro de Serviços</h2>
                        <v-breadcrumbs :items="['Cadastros', 'Serviços']">
                            <template v-slot:divider>
                                <v-icon icon="mdi-chevron-right"></v-icon>
                            </template>
                        </v-breadcrumbs>
                    </v-col>
                    
                    <v-col cols="12" md="8" sm="12">
                        <v-card class="elevation-4 pa-10">
                            <v-row class="mb-4">
                                <v-alert
                                    text="Crie uma categoria para criar os serviços. As categorias são as modalidades de serviços que seu estabelecimento realiza."
                                    type="info"
                                    variant="tonal"
                                ></v-alert>
                            </v-row>
                            <v-row>
                                <v-btn
                                    variant="text"
                                    size="small"
                                    prepend-icon="mdi-plus"
                                    class="mb-2"
                                    color="green"
                                    @click="categoryDialog = true"
                                >
                                    Adicionar Categoria
                                </v-btn>
                            </v-row>
                            <v-row>
                                <v-select
                                    v-model="category.case_id"
                                    label="Selecione uma categoria"
                                    no-data-text="Nenhuma categoria encontrada."
                                    variant="outlined"
                                    density="compact"
                                    :items="categories"
                                    item-title="case_name" 
                                    item-value="case_id"
                                    @update:modelValue="getServices()"
                                ></v-select>'
                            </v-row>

                            <v-row cols="12" v-if="category.case_id">
                                <h4>Serviços</h4>
                                <v-divider class="mb-3"></v-divider>

                                <v-col cols="12" md="12" lg="12" class="pa-0">
                                    <v-text-field
                                        v-if="services"
                                        variant="outlined"
                                        type="text"
                                        prepend-inner-icon="mdi-magnify"
                                        density="compact"
                                        label="Procurar serviços"
                                        v-model="searchQuery"
                                        @keyup="filterEmployeesByName()"
                                    ></v-text-field>
                                </v-col> 

                                <v-col cols="12" md="2" lg="2" class="pa-0">
                                    <v-btn
                                        prepend-icon="mdi-format-list-bulleted-type"
                                        color="black"
                                        block
                                        size="small"
                                        @click="registerDialog = true"
                                    >
                                        Novo
                                    </v-btn>
                                </v-col>

                                <v-col cols="12" class="pa-0" v-if="services">
                                    <v-table
                                        height="300px"
                                        fixed-header
                                        hover
                                    >
                                        <thead>
                                            <tr>
                                                <th class="text-left" width="280">
                                                    Nome
                                                </th>
                                                <th class="text-left" width="80">
                                                    Preço
                                                </th>
                                                <th class="text-left" width="20">
                                                    
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="item in services"
                                                :key="item.sepl_id"
                                            >
                                                <td width="280">{{ item.sepl_name }}</td>
                                                <td width="80">{{ item.sepl_price }}</td>
                                                <td width="20">
                                                    <v-btn 
                                                        elevation="0" 
                                                        icon="mdi-pencil" 
                                                        size="small"
                                                        @click="openDeleteDialog(item)"
                                                    ></v-btn>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </v-table>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>

    <v-dialog
        v-model="categoryDialog"
        width=""
        max-width="800"
        min-width="300"
        transition="dialog-bottom-transition"
    >
        <v-card
            max-width="800"
            rounded="lg"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-account-multiple-plus </v-icon>
                    Criar categoria
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="categoryDialog = false"
                ></v-btn>
            </v-card-title>

            <v-divider class="mb-4"></v-divider>

            <v-card-text>
                <v-form :disabled="loading" class="pa-0 pa-lg-2 pa-md-2 mb-8">
                    <v-row>
                        <v-col cols="12" class="pb-0 mb-8">
                            <v-text-field 
                                v-model="category.case_name"
                                label="Nome da categoria" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                prepend-inner-icon="mdi-format-list-bulleted-type"
                                :loading="loading"
                                :error-messages="messages.category.case_name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    text="Cancelar"
                    variant="plain"
                    class="px-4"
                    @click="categoryDialog = false"
                ></v-btn>

                <v-btn
                    color="grey-darken-4"
                    text="Incluir"
                    variant="tonal"
                    class="px-4"
                    @click="createCategory()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <SnackBar
        v-model="snackbar.show"
        :text="snackbar.data.text"
    />
</v-app>
</template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import SnackBar from '@/components/SnackBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
import { vMaska, Mask } from "maska"
import LoadingOverlay from '@/components/LoadingOverlay.vue';
        
const App = defineComponent({
components: {
    VerticalMenu,
    AppBar,
    SnackBar,
    LoadingOverlay
},

directives: { maska: vMaska },

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        showVerticalMenu: false,
        userStore: useUserStore(),
        display: useDisplay(),
        searchQuery: null,
        
        user: new UserModel(),


        category: {
            case_id: null,
            case_name: null
        },

        categories: [],
        categoryDialog: false,
        services: [],

        messages: {
            category: [],
        },

        snackbar: {
            show: false,
            data: {
                text: null
            }
        },
    };
},

beforeCreate(){
    let userStore = useUserStore()
    this.user = userStore.getUser
},

methods: {
    setToggleVerticalMenu(data){
        this.showVerticalMenu = data
    },

    init(){
        this.loading = true
        req.get(this.serverUrl+'/api/place/services/categories')
        .then( (response) => {
            this.loading = false
            this.categories = response.data.categories
        })
    },

    createCategory(){
        this.category.case_id = null
        this.messages.category = []

        this.loading = true
        req.post(this.serverUrl+'/api/admin/place/services/categories', this.category)
        .then( (response) => {
            this.loading = false

            this.category.case_id = response.data.case_id
            this.category.case_name = null

            this.categories.unshift(response.data)

            this.categoryDialog = false
            this.snackBar("Categoria cadastrada com sucesso!")
        })
        .catch( (reason) => {
            this.loading = false
            this.messages.category = reason.response.data.errors
        })
    },

    snackBar(text, icon = null){
        if(icon){
            this.snackbar.data.icon = icon
        }

        this.snackbar.data.text = text
        this.snackbar.show = true
    },

    getServices(){
        this.loading = true
        req.get(this.serverUrl+'/api/place/services/'+this.category.case_id)
        .then( (response) => {
            this.loading = false
            this.services = response.data.services
        })
    }
},

mounted(){
    this.init()
}
});
        
export default App
</script>
        