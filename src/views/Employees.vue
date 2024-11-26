<template>        
    <v-main class="d-flex mx-lg-4 my-lg-4" style="min-height: 300px;">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="8" sm="12">
                    <h2>Cadastro de Funcionários</h2>
                    <v-breadcrumbs :items="['Cadastros', 'Funcionários']">
                        <template v-slot:divider>
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </template>
                    </v-breadcrumbs>
                </v-col>
                
                <v-col cols="12" md="8" sm="12">
                    <v-card class="elevation-4 pa-10">
                        <v-row class="d-flex justify-space-between">
                            <v-col cols="12" md="12" lg="12" class="pa-0">
                                <v-text-field
                                    type="text"
                                    prepend-inner-icon="mdi-magnify"
                                    density="compact"
                                    label="Procurar"
                                    v-model="searchQuery"
                                    @keyup="filterEmployeesByName()"
                                ></v-text-field>
                            </v-col>    
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="2" lg="2" class="pa-0">
                                <v-btn
                                    prepend-icon="mdi-account-multiple-plus"
                                    color="black"
                                    block
                                    size="small"
                                    @click="registerDialog = true"
                                >
                                    Novo
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row>
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
                                            <th class="text-left" width="80">
                                                CPF
                                            </th>
                                            <th class="text-left" width="100" style="min-width: 160px">
                                                Tipo
                                            </th>
                                            <th class="text-left" width="20">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in employees"
                                            :key="item.emp_id"
                                        >
                                            <td width="280">{{ item.emp_first_name }} {{ item.emp_last_name }}</td>
                                            <td width="80" style="min-width: 160px">{{ this.cpfMask.masked(item.emp_cpf) }}</td>
                                            <td width="100">{{ item.emp_type_name }}</td>
                                            <td width="20">
                                                <v-btn 
                                                    elevation="0" 
                                                    icon="mdi-delete" 
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

    <v-dialog
        v-model="registerDialog"
        width="auto"
        max-width="800"
        transition="dialog-bottom-transition"
    >
        <v-card
            max-width="800"
            rounded="lg"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-account-multiple-plus </v-icon>
                    Criar Funcionário
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="registerDialog = false"
                ></v-btn>
            </v-card-title>

            <v-divider class="mb-4"></v-divider>

            <v-card-text>
                <div class="text-medium-emphasis mb-4">
                    Crie novos funcionários para trabalhar em seu estabelecimento.
                </div>

                <v-form :disabled="loading" class="pa-0 pa-lg-2 pa-md-2 mb-8">
                    <div>
                        <h6 class="text-h6">Dados Pessoais 📄</h6>
                        <p class="text-disabled mb-2">
                            Informe os dados pessoais do funcionário
                        </p>
                    </div>

                    <v-row>
                        <v-col cols="12" class="pb-0 mb-8">
                            <v-text-field 
                                v-model="employee.emp_cpf"
                                label="CPF" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                prepend-inner-icon="mdi-magnify"
                                :loading="loading"
                                @change="searchEmployeeByCPF()"
                                :error-messages="messages.emp_cpf"
                                v-maska:[cpfMaskToken]
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" lg="6" md="6" class="pb-0">
                            <v-text-field 
                                v-model="employee.emp_first_name"
                                :disabled="founded"
                                label="Nome" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.emp_first_name"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6" md="6" class="pb-0">
                            <v-text-field 
                                v-model="employee.emp_last_name"
                                :disabled="founded"
                                label="Sobrenome" 
                                type="text" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.emp_last_name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-text-field 
                                v-model="employee.emp_birthdate"
                                :disabled="founded"
                                label="Data de nascimento" 
                                type="date" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.emp_birthdate"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <div class="mt-10">
                        <h6 class="text-h6">Tipo de funcionário 👷</h6>
                        <p class="text-disabled mb-2">
                            Selecione o tipo de funcionário que deseja criar
                        </p>
                    </div>

                    <v-row>
                        <v-col cols="12">
                            <v-select
                                v-model="employee.emp_type"
                                :disabled="founded && !employee.emp_cpf"
                                label="Tipos"
                                variant="outlined"
                                :items="types"
                                item-title="text" 
                                item-value="value"
                                density="compact"
                                :error-messages="messages.emp_type"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <div class="mt-10">
                        <h6 class="text-h6">Dados de acesso 🔐</h6>
                        <p class="text-disabled mb-2">
                            Os dados informados abaixo serão para acessar o sistema
                        </p>
                    </div>

                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-text-field 
                                v-model="employee.emp_email"
                                :disabled="founded"
                                label="E-mail" 
                                type="email" 
                                variant="outlined"
                                hide-details="auto" 
                                density="compact"
                                :error-messages="messages.emp_email"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-text-field 
                                label="Senha" 
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'"
                                @click:append-inner="visible = !visible"
                                hide-details="auto"
                                density="compact"
                                variant="outlined"
                                v-model="employee.emp_password"
                                :disabled="founded"
                                :error-messages="messages.emp_password"
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
                    @click="registerDialog = false"
                ></v-btn>

                <v-btn
                    color="grey-darken-4"
                    text="Incluir"
                    variant="tonal"
                    class="px-4"
                    @click="create()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="deleteDialog"
        width="auto"
    >
        <v-card
            max-width="600"
        >
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                    <v-icon class="me-2"> mdi-account-multiple-minus </v-icon>
                    Excluir funcionário
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="deleteDialog = false"
                ></v-btn>
            </v-card-title>
            <v-card-text>
                <p>Confirma a exclusão do funcionário <b class="text-decoration-underline">{{ this.delete.emp_first_name }}</b> ?</p>
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
                    @click="deleteDialog = false"
                ></v-btn>

                <v-btn
                    :disabled="deleteLoading"
                    :loading="deleteLoading"
                    class="ms-auto"
                    text="Sim, excluir"
                    color="red"
                    variant="tonal"
                    @click="deleteEmployee()"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show">
        <v-icon color="green">{{ snackbar.data.icon }}</v-icon>

        {{ snackbar.data.text }}

        <template v-slot:actions>
            <v-btn
                color="green"
                variant="text"
                @click="snackbar.show = false"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import VerticalMenu from '@/components/VerticalMenu.vue'
import AppBar from '@/components/AppBar.vue'
import req from '../helpers/http'
import { useUserStore } from '../store/user'
import UserModel from '../entities/User'
import { useDisplay } from 'vuetify'
import { vMaska, Mask } from "maska"
        
const App = defineComponent({
components: {
    VerticalMenu,
    AppBar
},

directives: { maska: vMaska },

data() {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL,
        loading: false,
        userStore: useUserStore(),
        display: useDisplay(),
        searchQuery: null,

        
        registerDialog: false,
        deleteDialog: false,
        deleteLoading: false,
        visible: false,
        
        user: new UserModel(),

        types: [],
        founded: true,
        employee: new UserModel(),
        messages: new UserModel(),
        employees: [],
        backupEmployees: [],
        delete: new UserModel(),

        snackbar: {
            show: false,
            data: {
                icon: 'mdi-check-circle-outline',
                text: null
            }
        },

        cpfMaskToken: {mask:'###.###.###-##'},
        cpfMask: null
    };
},

beforeCreate(){
    let userStore = useUserStore()
    this.user = userStore.getUser
},

created(){
    this.user = this.userStore.getUser ?? new UserModel()
    this.cpfMask = new Mask(this.cpfMaskToken)
},

methods: {
    gettypes(){
        req.get(this.serverUrl+'/api/employees/init')
        .then( (response) => {
            this.types = response.data.employeeTypes
        })
    },

    searchEmployeeByCPF(){
        const cpf = structuredClone(this.cpfMask.unmasked(this.employee.emp_cpf))
        if(cpf.length == 11){
            this.loading = true
            req.get(this.serverUrl+'/api/employee/?cpf='+cpf)
            .then( (response) => {
                this.loading = false
                this.founded = true
                this.messages = new UserModel()

                this.employee = response.data.employee
                this.employee.emp_type = null
                this.employee.emp_type_name = null
            }).catch ( (reason) => {
                this.loading = false

                if(reason.response.data.errors){
                    this.messages = reason.response.data.errors
                }else{
                    this.messages = new UserModel()
                }

                if(reason.request.status == 404){
                    this.founded = false
                    this.employee = new UserModel()
                    this.employee.emp_cpf = cpf
                }
            })
        }
    },

    create(){
        this.loading = true
        req.post(this.serverUrl+'/api/employee/', {employee: this.employee, reuse: this.founded})
        .then( (response) => {
            this.loading = false
            if(response.data.employee){
                this.resetModal()
                this.employees.unshift(response.data.employee)
                
                this.snackBar("Funcionário cadastrado com sucesso")
            }
        }).catch ( (reason) => {
            this.loading = false

            if(reason.response.data.errors){
                this.messages = reason.response.data.errors
            }else{
                this.messages = new UserModel()
            }
        })
    },

    snackBar(text, icon = null){
        if(icon){
            this.snackbar.data.icon = icon
        }

        this.snackbar.data.text = text
        this.snackbar.show = true
    },

    resetModal(){
        this.registerDialog = false,
        this.founded = true
        this.employee = new UserModel()
        this.messages = new UserModel()
    },

    getEmployees(){
        req.get(this.serverUrl+'/api/admin/employees', {employee: this.employee, reuse: this.founded})
        .then( (response) => {
            if(response.data.employees){
                this.resetModal()
                this.employees = response.data.employees
                this.backupEmployees = response.data.employees
            }
        })
    },

    openDeleteDialog(employee){
        this.delete = employee
        this.deleteDialog = true
    },

    deleteEmployee(){
        this.deleteLoading = true
        req.delete(this.serverUrl+'/api/admin/employee/'+this.delete.emp_id)
        .then( (response) => {
            this.deleteLoading = false


            const index = this.employees.findIndex(employee => employee.emp_id === this.delete.emp_id);

            if (index !== -1) {
                this.employees.splice(index, 1);
                this.backupEmployees.splice(index, 1);

                this.deleteDialog = false
                this.delete = new UserModel()
                this.snackBar("Funcionário excluído com sucesso")
            }
        })
        .catch( (reason) => {
            this.deleteLoading = false
        })
    },

    filterEmployeesByName: function() {
        const name = this.searchQuery.toLowerCase();

        if(name.length > 0){
            this.employees = this.employees.filter(employee => {
                const fullName = `${employee.emp_first_name} ${employee.emp_last_name}`.toLowerCase();
                return fullName.includes(name);
            });
        }else{
            this.employees = this.backupEmployees
        }
    },

    init(){
        this.gettypes()
        this.getEmployees()
    }
},

mounted(){
    this.init()
}
});
        
export default App
</script>
        