<template>        
    <v-main class="d-flex" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="10" sm="12">
                    <h2>Meu Perfil</h2>
                </v-col>

                <v-col cols="12" md="10" sm="12">
                    <v-card class="elevation-5 pa-10">
                        <v-row>
                            <v-tabs v-model="tab">
                                <v-tab 
                                    value="1"
                                    prepend-icon="mdi-account-edit"
                                >
                                    Dados Pessoais
                                </v-tab>
                                <v-tab 
                                    value="2"
                                    prepend-icon="mdi-store-cog"
                                >
                                    Serviços
                                </v-tab>
                                <v-tab 
                                    value="3"
                                    prepend-icon="mdi-toolbox-outline"
                                >
                                    Atendimento
                                </v-tab>
                            </v-tabs>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="pa-0">
                                <v-window v-model="tab">
                                    <v-window-item value="1">
                                        <v-row class="px-0 py-0 mt-4">
                                            <v-alert
                                                class="px-10"
                                                closable
                                                icon="mdi-information"
                                                title="Atenção!"
                                                text="Os dados alterados nesta aba serão aplicados a todos os estabelecimentos nos quais você trabalha"
                                                type="info"
                                                variant="tonal"
                                            ></v-alert>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <v-card class="pa-5" color="surface-variant" variant="tonal">
                                                    <div class="d-flex justify-space-between align-center">
                                                        <div class="d-flex align-center">
                                                            <input 
                                                                type="file" 
                                                                style="display: none" 
                                                                id="avatar"
                                                                accept="image/jpeg, image/jpg, image/png"
                                                                @change="handleFileUpload"
                                                            >
                                                            
                                                            <v-img
                                                                class="rounded-circle me-5"
                                                                width="90"
                                                                height="90"
                                                                aspect-ratio="1/1"
                                                                cover
                                                                :src="this.userAvatarPreview ? this.userAvatarPreview : this.user.avatarUrl"
                                                            ></v-img>
                                                            <div cols="12">
                                                                <div class="font-weight-bold text-truncate"> {{ user.firstName }} </div>
                                                                <div class="text-disabled text-subtitle-2"> {{ user.typeName }} </div>
                                                            </div>
                                                        </div>
    
                                                        <div>
                                                            <v-btn
                                                                prepend-icon="mdi-camera-plus-outline"
                                                                color="black"
                                                                @click="triggerUpload()"
                                                            >
                                                                Alterar foto
                                                            </v-btn>
                                                        </div>
                                                    </div>
                                                </v-card>

                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12" lg="6" md="6">
                                                <app-label text="Nome" />
                                                <text-field
                                                    v-model="user.firstName"
                                                    :error-messages="messages.firstName"
                                                />
                                            </v-col>
                
                                            <v-col cols="12" lg="6" md="6" sm="12">
                                                <app-label text="Sobrenome" />
                                                <text-field
                                                    v-model="user.lastName"
                                                    :error-messages="messages.lastName"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <app-label text="CPF" />
                                                <text-field
                                                    v-model="user.cpf"
                                                    :error-messages="messages.cpf"
                                                    v-maska:[mt.cpf]
                                                />                                                
                                            </v-col>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <app-label text="Data de nascimento" />
                                                <text-field
                                                    v-model="user.birthdate"
                                                    :error-messages="messages.birthdate"
                                                    type="date"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-btn
                                                    prepend-icon="mdi-pencil-outline"
                                                    color="black"
                                                    @click="updateEmployee()"
                                                >
                                                    Salvar Alterações
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-window-item>

                                    <v-window-item value="2">
                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <h3>Serviços</h3>
                                                <p class="text-disabled">Defina os serviços que você realiza atendimento</p>
                                            </v-col>

                                            <v-divider></v-divider>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12" lg="4" md="4" sm="12">
                                                <app-label text="Categoria" />
                                                <v-select
                                                    v-model="employeeService.idCategory"
                                                    label="Selecione uma categoria"
                                                    no-data-text="Nenhuma categoria encontrada."
                                                    variant="outlined"
                                                    density="compact"
                                                    :items="categories"
                                                    item-title="name" 
                                                    item-value="id"
                                                    single-line
                                                    @update:modelValue="getServices()"
                                                ></v-select>
                                            </v-col>
                                            
                                            <v-col cols="12" lg="4" md="4" sm="12">
                                                <app-label text="Serviço" />
                                                <v-select
                                                    v-model="employeeService.idService"
                                                    :error-messages="messages.idService"
                                                    label="Selecione um serviço"
                                                    no-data-text="Nenhum serviço encontrado."
                                                    variant="outlined"
                                                    density="compact"
                                                    :items="services"
                                                    item-title="name" 
                                                    item-value="id"
                                                    single-line
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" lg="4" md="4" sm="12">
                                                <app-label text="" /><br>
                                                <v-btn
                                                    prepend-icon="mdi-plus"
                                                    color="black"
                                                    block
                                                    :disabled="(employeeService.idCategory == null || employeeService.idService == null)"
                                                    @click="createEmployeeService()"
                                                >
                                                    Adicionar serviço
                                                </v-btn>
                                            </v-col>

                                            <v-col cols="12" class="pa-0">
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
                                                            <th class="text-left" width="280">
                                                                Categoria
                                                            </th>
                                                            <th class="text-left" width="20">
                                                                
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-if="employeeServices.length === 0">
                                                            <td colspan="2" class="text-center">Nenhum serviço adicionado</td>
                                                        </tr>
                                                        <tr
                                                            v-else
                                                            v-for="item in employeeServices"
                                                            :key="item.usser_id"
                                                        >
                                                            <td width="280">{{ item.service.name }}</td>
                                                            <td width="280">{{ item.service.category.name }}</td>
                                                            <td width="20">
                                                                <v-btn 
                                                                    elevation="0" 
                                                                    icon="mdi-delete-outline" 
                                                                    size="small"
                                                                    @click="openDialogDeleteService(item.id)"
                                                                ></v-btn>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                </v-table>
                                            </v-col>
                                        </v-row>
                                    </v-window-item>

                                    <v-window-item value="3">
                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <h3>Atendimento</h3>
                                                <p class="text-disabled">Dados sobre atendimento</p>
                                            </v-col>

                                            <v-divider></v-divider>
                                        </v-row>

                                        <v-row class="px-0 py-0 mt-4">
                                            <v-col cols="12">
                                                <h4>Horário de atendimento</h4>
                                                <p class="text-disabled">Defina o horário que você irá atender os seus clientes</p>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" lg="3" md="3">
                                                <app-label text="Início" />
                                                <text-field
                                                    v-model="attendance.clockIn"
                                                    :error-messages="messages.clockIn"
                                                    v-maska:[mt.hoursAndMinutes]
                                                /> 
                                            </v-col>
                                        
                                            <v-col cols="12" lg="3" md="3">
                                                <app-label text="Fim" />
                                                <text-field
                                                    v-model="attendance.clockOut"
                                                    :error-messages="messages.clockOut"
                                                    v-maska:[mt.hoursAndMinutes]
                                                /> 
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12">
                                                <v-btn
                                                    prepend-icon="mdi-pencil-outline"
                                                    color="black"
                                                    @click="updateAttendance()"
                                                >
                                                    Salvar Alterações
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-window-item>
                                </v-window>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

    <SnackBar
        v-model="snackbar.show"
        :text="snackbar.text"
    />

    <v-dialog
        v-model="deleteServiceDialog"
        width="auto"
    >
        <v-card
            max-width="600"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-shape </v-icon>
                    Desvincular serviço
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="deleteServiceDialog = false"
                ></v-btn>
            </v-card-title>
            <v-card-text>
                <p>Tem certeza de que deseja desvincular o serviço <b class="text-decoration-underline">{{ employeeServiceDelete.service.name }}</b>?</p>
                <!-- <p class="text-disabled">
                    Essa ação é irreversível. <br>
                </p> -->
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
                    text="Sim"
                    color="red"
                    variant="tonal"
                    @click="deleteService(employeeServiceDelete.id)"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
import { vMaska, Mask, unmask } from "maska"
import MaskTokens from '../entities/Masks'
import TextField from '@/components/fields/TextField.vue';
import AppLabel from "@/components/fields/LabelField.vue";
import SnackBar from '@/components/SnackBar.vue'
import { maska } from 'maska'
        
const App = defineComponent({
components: {
    TextField,
    AppLabel,
    SnackBar
},

directives: { maska: vMaska },

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        userStore: useUserStore(),
        display: useDisplay(),
        mt: new MaskTokens(),
        
        tab: '1',
        user: new UserModel(),
        userAvatar: null,
        userAvatarPreview: null,

        categories: [],
        services: [],
        attendance: {
            clockIn: null,
            clockOut: null
        },

        employeeService: {
            idCategory: null,
            idService: null
        },

        messages: {
            idService: ""
        },

        employeeServices: [],

        employeeServiceDelete: {},

        snackbar: {
            show: false,
            text: null
        },

        deleteServiceDialog: false,

        cpfMask: null
    };
},

beforeCreate(){
    let userStore = useUserStore()
    this.user = userStore.getUser
},

created(){
    this.user = this.userStore.getUser ?? new UserModel()
    this.cpfMask = new Mask(this.mt.cpf)
},

mounted(){
    this.init()
},

methods: {
    triggerUpload(){
        let inputFile = document.getElementById("avatar")
        inputFile.click()
    },

    init(){
        this.getCategories()
        this.getEmployeeServices()
        this.getAttendance()
    },

    getCategories(){
        req.get(this.serverUrl+'/api/admin/place/services/categories')
        .then( (response) => {
            this.categories = response.data
        })
    },

    getServices(){
        this.employeeService.emse_sepl_id = null
        this.services = []

        req.get(this.serverUrl+'/api/admin/place/services/'+this.employeeService.idCategory)
        .then( (response) => {
            this.services = response.data
        })
    },

    getEmployeeServices(){
        req.get(this.serverUrl+'/api/admin/employee/services')
        .then( (response) => {
            this.employeeServices = response.data
        })
    },

    createEmployeeService(){
        this.messages = {idService: ""}

        req.post(this.serverUrl+'/api/admin/employee/service/', this.employeeService)
        .then( (response) => {
            this.employeeServices.unshift(response.data)

            this.snackBar("Serviço vinculado com sucesso")
        })
        .catch( (reason) => {
            this.messages = reason.response.data.errors
        })
    },

    openDialogDeleteService(id){
        this.deleteServiceDialog = true

        this.employeeServiceDelete = this.employeeServices.find(employeeService => employeeService.id === id);
    },

    snackBar(text){
        this.snackbar.text = text
        this.snackbar.show = true
    },

    handleFileUpload(event){
        const file = event.target.files[0];
        if (file) {
            this.userAvatar = event.target.files[0]

            const reader = new FileReader();
            reader.onload = (e) => {
                this.userAvatarPreview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },

    updateEmployee(){
        const formData = new FormData();
        formData.append("firstName", this.user.firstName);
        formData.append("lastName", this.user.lastName);
        formData.append("cpf", structuredClone(this.cpfMask.unmasked(this.user.cpf)));
        formData.append("birthdate", this.user.birthdate);
        
        if (this.userAvatar) {
            formData.append("uploadedAvatar", this.userAvatar);
        }

        // Laravel não aceita form-data no put, foi necessário realizar um method spoofing
        req.post(
            this.serverUrl+'/api/admin/employee?_method=PUT', 
            formData, 
            { 
                headers: { "Content-Type": "multipart/form-data" } 
            }
        )
        .then( (response) => {
            if(response.data){
                this.userStore.setUser(response.data)
                this.user = this.userStore.getUser

                this.snackBar("Dados pessoais alterados com sucesso")
                setInterval(() => {
                    window.location.reload();
                }, 1000);
            }
        })
        .catch( (reason) => {
            this.messages = reason.response.data.errors
        })
    },

    updateAttendance(){
        req.put(
            this.serverUrl+'/api/admin/employee/attendance', 
            this.attendance
        )
        .then( (response) => {
            ['clockIn', 'clockOut'].forEach(key => key in this.messages && delete this.messages[key]);
            this.snackBar("Dados alterados com sucesso!")
        })
        .catch( (reason) => {
            this.messages = reason.response.data.errors
        })
    },

    getAttendance(){
        req.get(
            this.serverUrl+'/api/admin/employee/attendance'
        )
        .then( (response) => {
            this.attendance = response.data
        })
        .catch( (reason) => {
            this.messages = reason.response.data.errors
        })
    },

    deleteService(id){
        req.delete(this.serverUrl+'/api/admin/employee/service/'+id)
        .then( () => {
            const index = this.employeeServices.findIndex(service => service.id === id);

            if (index !== -1) {
                this.employeeServices.splice(index, 1);
                
                this.deleteServiceDialog = false
                this.snackBar("Serviço desvinculado com sucesso")
            }
        })
        .catch( (reason) => {
            this.messages = reason.response.data.errors
        })
    }
},
});
        
export default App
</script>