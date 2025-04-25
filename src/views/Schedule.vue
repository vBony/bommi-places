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

        <v-dialog
            v-model="dialogAppointment"
            width="auto"
            max-width="800"
            transition="dialog-bottom-transition"
        >
            <v-card
                width="800"
                rounded="lg"
            >
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                        <v-icon class="me-2"> mdi-notebook </v-icon>
                        Agendamento
                    </div>

                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="dialogAppointment = false"
                    ></v-btn>
                </v-card-title>

                <v-divider class="mb-4"></v-divider>

                <v-card-text>
                    <v-form :disabled="loading" class="pa-0 pa-lg-2 pa-md-2 mb-8">
                        <div>
                            <h6 class="text-h6">Dados do cliente 🧒</h6>
                            <v-divider class="mb-4" />
                        </div>

                        <v-row>
                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0 mb-8">
                                <app-label text="Cliente" />
                                <text-field
                                    readonly
                                    v-model="appoinment.client.name"
                                />   
                            </v-col>

                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0 mb-8">
                                <app-label text="Telefone" />
                                <text-field
                                    readonly
                                    v-model="appoinment.client.phoneNumber"
                                    v-maska:[mt.phone]
                                />   
                            </v-col>
                        </v-row>

                        <div>
                            <h6 class="text-h6">Detalhes do agendamento 📃</h6>
                            <v-divider class="mb-4" />
                        </div>
                        
                        <v-row>
                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0">
                                <app-label text="Data Início" />
                                <text-field
                                    readonly
                                    v-model="appoinmentDate"
                                />   
                            </v-col>

                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0">
                                <app-label text="Data Fim" />
                                <text-field
                                    readonly
                                    v-model="appoinmentDateEnd"
                                />   
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0 mb-8">
                                <app-label text="Duração total" />
                                <text-field
                                    readonly
                                    v-model="totalMinutes"
                                />   
                            </v-col>

                            <v-col cols="12" lg="6" md="12" sm="12" class="pb-0 mb-8">
                                <app-label text="Valor total (R$)" />
                                <text-field
                                    readonly
                                    v-model="appoinment.totalValue"
                                    v-maska:[mt.money]
                                />   
                            </v-col>
                        </v-row>

                        <div>
                            <h6 class="text-h6">Serviços agendados 📅🛠️</h6>
                            <v-divider class="mb-4" />
                        </div>

                        <v-row>
                            <v-col class="pb-" cols="12">
                                <v-table 
                                    height="200px" 
                                    fixed-header 
                                    density="compact"
                                    class="pa-0"
                                >
                                    <thead>
                                        <tr>
                                            <th class="text-left" style="width: 75%">
                                                Nome
                                            </th>
                                            <th class="text-right" style="width: 25%">
                                                Valor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in appoinment.services"
                                            :key="item.id"
                                        >
                                            <td style="width: 75%">{{ item.servicePlace.name }}</td>
                                            <td class="text-right" style="width: 25%">R$ {{ item.servicePlace.price }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between">
                    <v-btn
                        prepend-icon="mdi-check-circle"
                        text="Finalizar Atendimento"
                        variant="flat"
                        color="black"
                        class="px-4"
                        :disabled="appoinment.status !== appoinmentStatusEnum.pending"
                        @click="showFinishAppointmentDialog = true"
                    ></v-btn>

                    <v-btn
                        color="grey-darken-4"
                        text="Fechar"
                        variant="tonal"
                        class="px-4"
                        @click="dialogAppointment = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showFinishAppointmentDialog" max-width="500px">
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h6 font-weight-black text-medium-emphasis ps-2">
                        <v-icon class="me-2"> mdi-notebook </v-icon>
                        Finalizar agendamento
                    </div>

                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="showFinishAppointmentDialog = false"
                    ></v-btn>
                </v-card-title>

                <v-card-text>
                    <p class="mb-2">Você tem certeza de que deseja finalizar o atendimento?</p>
                    <p class="text-disabled">
                        Esta ação não pode ser desfeita. <br>
                    </p>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between mt-4">
                    <v-btn 
                        color="gray"
                        @click="showFinishAppointmentDialog = false"
                    >
                        Cancelar
                    </v-btn>

                    <v-btn 
                        color="green" 
                        variant="flat"
                        @click="finishAppointment()"
                    >
                        Finalizar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <SnackBar
            v-model="snackbar.show"
            :text="snackbar.data.text"
        />
    </v-main>
</template>
        
<script lang='ts'>
// @ts-nocheck
import { defineComponent } from 'vue';
import req from '../helpers/http'
import FullCalendarWrapper from '@/components/FullCalendarWrapper.vue' 
import TextField from '@/components/fields/TextField.vue';
import AppLabel from "@/components/fields/LabelField.vue";
import MaskTokens from '../entities/Masks'
import SnackBar from '@/components/SnackBar.vue';
import { appointmentStatus } from '@/enums/AppointmentStatus';

const App = defineComponent({
    components: {
        FullCalendarWrapper,
        TextField,
        AppLabel,
        SnackBar
    },

    data() {
        return {
            loading: false,
            mt: new MaskTokens(),

            dialogAppointment: false,
            showFinishAppointmentDialog: false,
            appoinment: {},

            appoinmentStatusEnum: {... appointmentStatus},

            snackbar: {
                show: false,
                data: {
                    text: null
                }
            },
        };
    },

    computed: {
        appoinmentDate(){
            if(this.appoinment.date){
                return this.formatarDataBrasileira(this.appoinment.date)
            }
        },

        appoinmentDateEnd(){
            if(this.appoinment.dateEnd){
                return this.formatarDataBrasileira(this.appoinment.dateEnd)
            }
        },

        totalMinutes(){
            if(this.appoinment.totalMinutes){
                return this.formatMinutesToTimeLabel(this.appoinment.totalMinutes)
            }
        }
    },

    methods: {
        finishAppointment() {
            req.post(`/api/admin/place/appointment/${this.appoinment.id}/finish`)
            .then(() => {
                this.dialogAppointment = false
                this.showFinishAppointmentDialog = false

                this.snackbar.data.text = "Agendamento finalizado com sucesso!"
                this.snackbar.show = true
            })
            .catch( () => {

            })
        },

        handleEventClick(event) {
            this.appoinment = event
            this.dialogAppointment = true

            console.log(event)
        },

        formatarDataBrasileira(dataISO) {
            const data = new Date(dataISO);

            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();

            const hora = String(data.getHours()).padStart(2, '0');
            const minuto = String(data.getMinutes()).padStart(2, '0');
            const segundo = String(data.getSeconds()).padStart(2, '0');

            return `${dia}/${mes}/${ano} às ${hora}:${minuto}:${segundo}`;
        },

        formatMinutesToTimeLabel(totalMinutes) {
            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60

            let result = ''
            if (hours > 0) {
                result += `${hours}h`
            }
            if (minutes > 0 || hours === 0) {
                result += `${minutes}min`
            }

            return result
        },

    }
});
        
export default App
</script>
        