<template>
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
                        <v-row class="d-flex justify-space-between">
                            <v-btn
                                variant="text"
                                size="small"
                                prepend-icon="mdi-plus"
                                class="mb-2"
                                color="green"
                                @click="openDialogCreateCategory()"
                            >
                                Nova Categoria
                            </v-btn>

                            <v-btn
                                v-if="this.category.case_id"
                                variant="text"
                                size="small"
                                prepend-icon="mdi-pencil"
                                class="mb-2"
                                color="grey-darken-2"
                                @click="openDialogEditCategory()"
                            >
                                Editar Categoria
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
                                    @click="openDialogCreateService()"
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
                                                    @click="openDialogEditService(item.sepl_id)"
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
                    <v-icon class="me-2"> mdi-shape </v-icon>
                    {{ (modeEditCategoryDialog == true) ? "Editar Categoria" : "Criar Categoria" }}
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
                <v-btn
                    v-if="modeEditCategoryDialog == true"
                    class="text-none font-weight-regular"
                    color="red"
                    prepend-icon="mdi-trash-can"
                    text="Excluir"
                    variant="tonal"
                    @click="deleteCategoryDialog = true"
                ></v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    text="Cancelar"
                    variant="plain"
                    class="px-4"
                    @click="categoryDialog = false"
                ></v-btn>

                <v-btn
                    v-if="!modeEditCategoryDialog"
                    color="grey-darken-4"
                    text="Incluir"
                    variant="tonal"
                    class="px-4"
                    @click="createCategory()"
                ></v-btn>

                <v-btn
                    v-if="modeEditCategoryDialog"
                    color="grey-darken-4"
                    text="Alterar"
                    variant="tonal"
                    class="px-4"
                    @click="editCategory()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="serviceDialog"
        width="90%"
        max-width="800"
        transition="dialog-bottom-transition"
    >
        <v-card
            max-width="800"
            rounded="lg"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-format-list-bulleted-type </v-icon>
                    {{ (modeEditServiceDialog == true) ? "Alterar Serviço" : "Criar Serviço" }}
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="serviceDialog = false"
                ></v-btn>
            </v-card-title>

            <v-divider class="mb-4"></v-divider>

            <v-card-text>
                <div 
                    v-if="modeEditServiceDialog == false" 
                    class="text-medium-emphasis mb-4"
                >
                    Crie serviços que seu estabelecimento realiza
                </div>

                <v-form :disabled="loading" class="pa-0 pa-lg-2 pa-md-2 mb-8">
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-text-field 
                                v-model="service.sepl_name"
                                label="Nome" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.service.sepl_name"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6" class="pb-0">
                            <v-text-field 
                                v-model="service.sepl_price"
                                label="Preço (R$)" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.service.sepl_price"
                                v-maska:[mt.money]
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6" class="pb-0">
                            <v-text-field 
                                v-model="service.sepl_duration"
                                label="Duração (HH:MM)" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.service.sepl_duration"
                                v-maska:[mt.hoursAndMinutes]
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-textarea 
                                v-model="service.sepl_description"
                                label="Descrição" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.service.sepl_description"
                            ></v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-divider class="my-3"></v-divider>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-select
                                v-model="category.case_id"
                                label="Categoria"
                                variant="outlined"
                                density="compact"
                                :items="categories"
                                item-title="case_name" 
                                item-value="case_id"
                                disabled
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    v-if="modeEditServiceDialog == true"
                    class="text-none font-weight-regular"
                    color="red"
                    prepend-icon="mdi-trash-can"
                    text="Excluir"
                    variant="tonal"
                    @click="deleteServiceDialog = true"
                ></v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    text="Cancelar"
                    variant="plain"
                    class="px-4"
                    @click="serviceDialog = false"
                ></v-btn>

                <v-btn
                    v-if="modeEditServiceDialog == false"
                    color="grey-darken-4"
                    text="Incluir"
                    variant="tonal"
                    class="px-4"
                    @click="createService()"
                ></v-btn>

                <v-btn
                    v-if="modeEditServiceDialog == true"
                    color="grey-darken-4"
                    text="Alterar"
                    variant="tonal"
                    class="px-4"
                    @click="editService()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="deleteServiceDialog"
        width="auto"
    >
        <v-card
            max-width="600"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-format-list-bulleted-type </v-icon>
                    Excluir serviço
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="deleteServiceDialog = false"
                ></v-btn>
            </v-card-title>
            <v-card-text>
                <p>Confirma a exclusão do servico <b class="text-decoration-underline">{{ this.service.sepl_name }}</b> ?</p>
                <p class="text-disabled">
                    Essa ação é irreversível
                </p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="Cancelar"
                    variant="tonal"
                    class="px-4 mr-4"
                    @click="deleteServiceDialog = false"
                ></v-btn>

                <v-btn
                    class="ms-auto"
                    text="Sim, excluir"
                    color="red"
                    variant="tonal"
                    @click="deleteService()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="deleteCategoryDialog"
        width="auto"
    >
        <v-card
            max-width="600"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-shape </v-icon>
                    Excluir categoria
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="deleteCategoryDialog = false"
                ></v-btn>
            </v-card-title>
            <v-card-text>
                <p>Confirma a exclusão da categoria <b class="text-decoration-underline">{{ this.category.case_name }}</b> ?</p>
                <p class="text-disabled">
                    Essa ação é irreversível. <br>
                    Obs: Todos os serviços da categoria serão excluídos
                </p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="Cancelar"
                    variant="tonal"
                    class="px-4 mr-4"
                    @click="deleteCategoryDialog = false"
                ></v-btn>

                <v-btn
                    class="ms-auto"
                    text="Sim, excluir"
                    color="red"
                    variant="tonal"
                    @click="deleteCategory()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <SnackBar
        v-model="snackbar.show"
        :text="snackbar.data.text"
    />
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
import ServiceModel from '../entities/Service'
import CategoryModel from '../entities/Category'
import MaskTokens from '../entities/Masks'
import { useDisplay } from 'vuetify'
        
const App = defineComponent({
components: {
    AppBar,
    SnackBar
},

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        userStore: useUserStore(),
        display: useDisplay(),
        searchQuery: null,
        mt: new MaskTokens(),
        
        user: new UserModel(),


        categories: [],
        category: new CategoryModel(),
        categoryDialog: false,
        modeEditCategoryDialog: false,
        deleteCategoryDialog: false,

        services: [],
        serviceDialog: false,
        modeEditServiceDialog: false,
        service: new ServiceModel(),
        deleteServiceDialog: false,

        messages: {
            category: [],
            service: []
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

    init(){
        this.loading = true
        req.get(this.serverUrl+'/api/place/services/categories')
        .then( (response) => {
            this.loading = false
            this.categories = response.data.categories
        })
    },

    openDialogCreateService(){
        this.serviceDialog = true
        this.modeEditServiceDialog = false
        this.service = new ServiceModel()
        this.messages.service = []
    },
    
    openDialogEditService(id){
        this.service = new ServiceModel()
        this.messages.service = []

        this.getService(id)

        this.serviceDialog = true
        this.modeEditServiceDialog = true
    },

    openDialogCreateCategory(){
        this.categoryDialog = true
        this.modeEditCategoryDialog = false
        this.category = new CategoryModel()
        this.messages.category = []
    },

    openDialogEditCategory(){
        this.messages.category = []

        this.categoryDialog = true
        this.modeEditCategoryDialog = true
    },

    deleteCategory(){
        const index = this.categories.findIndex(category => category.sepl_id === this.category.sepl_id);

        if (index !== -1) {
            this.categories.splice(index, 1);
            
            this.category = new CategoryModel()
            
            this.deleteCategoryDialog = false
            this.categoryDialog = false
            this.snackBar("Categoria excluída com sucesso!")
        }
    },

    createCategory(){
        this.category.case_id = null
        this.messages.category = []

        this.loading = true
        req.post(this.serverUrl+'/api/admin/place/service/category', this.category)
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

    createService(){
        this.service.sepl_case_id = this.category.case_id
        this.messages.service = []

        this.loading = true
        req.post(this.serverUrl+'/api/admin/place/service', this.service)
        .then( (response) => {
            this.loading = false
            
            this.services.unshift(response.data)
            
            this.serviceDialog = false
            this.service = new ServiceModel()
            this.snackBar("Serviço cadastrada com sucesso!")
        })
        .catch( (reason) => {
            this.loading = false
            this.messages.service = reason.response.data.errors
        })
    },

    deleteService(){
        this.messages.service = []

        this.loading = true
        req.delete(this.serverUrl+'/api/admin/place/service/'+this.service.sepl_id )
        .then( () => {
            this.loading = false

            const index = this.services.findIndex(service => service.sepl_id === this.service.sepl_id);

            if (index !== -1) {
                this.services.splice(index, 1);
                
                this.service = new ServiceModel()
                
                this.deleteServiceDialog = false
                this.serviceDialog = false
                this.snackBar("Serviço excluído com sucesso!")
            }
        })
        .catch( (reason) => {
            this.loading = false
            this.messages.service = reason.response.data.errors
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

        this.category = this.categories.find(category => category.case_id === this.category.case_id);

        req.get(this.serverUrl+'/api/place/services/'+this.category.case_id)
        .then( (response) => {
            this.loading = false
            this.services = response.data.services
        })
    },

    getService(id){
        this.loading = true
        req.get(this.serverUrl+'/api/place/service/'+id)
        .then( (response) => {
            this.loading = false
            this.service = response.data
        })
    },

    editService(){
        this.loading = true
        req.put(this.serverUrl+'/api/admin/place/service', this.service)
        .then( (response) => {
            this.loading = false

            const index = this.services.findIndex(service => service.sepl_id === this.service.sepl_id);

            if (index !== -1) {
                this.services[index] = response.data;
                
                this.service = new ServiceModel()
                
                this.deleteServiceDialog = false
                this.serviceDialog = false
                this.snackBar("Serviço alterado com sucesso!")
            }
            console.log(response)
            this.loading = false
            // this.service = response.data
        })
        .catch( (reason) => {
            this.loading = false
            this.messages.service = reason.response.data.errors
        })
    }
},

mounted(){
    this.init()
}
});
        
export default App
</script>
        