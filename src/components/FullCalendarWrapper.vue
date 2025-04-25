<template>
    <FullCalendar :options="calendarOptions" />
</template>

<style>
:root{
    --fc-today-bg-color: white !important
}

a.fc-event{
    cursor: pointer !important;
}

.fc-button .fc-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 100% !important;
    position: relative !important;
    top: 1px !important; /* pode ser 0, -1px, 1px — ajusta até ficar centralizado */
}

.fc-today {
  background-color: #ffcccc !important; /* Escolha a cor que preferir */
}

.fc .fc-button-primary {
    background-color: black !important;
    border-color: black !important;
    color: var(--fc-button-text-color);
}
</style>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import req from '../helpers/http'

export default {
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    emits: ['eventClicked'],
    data() {
        return {
            colorsEvents: [
                { 0: '#607D8B' }, // Pendente (cinza azulado escuro)
                { 1: '#2C6B2F' }, // Confirmado (verde musgo)
                { 2: '#3F51B5' }, // Finalizado (azul escuro)
                { 3: '#D32F2F' }  // Cancelado (vermelho escuro)
            ],
            events: {},

            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
                nowIndicator: true,
                initialView: 'timeGridDay',
                locale: 'pt-BR',
                height:600,
                timeZone: 'America/Sao_Paulo',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,dayGridMonth'
                },
                buttonText: {
                    today:    'Hoje',
                    month:    'Mês',
                    week:     'Semana',
                    day:      'Dia',
                    list:     'Lista'
                },
                allDaySlot: false,
                slotLabelFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                },
                slotDuration: '00:30:00',
                slotMinTime: '08:00:00',
                events: this.fetchEvents,
                eventClick: this.eventClick
            }
        }
    },
    methods: {
        formatData(eventData) {
            return eventData;
        },

        
        fetchEventsForDateChange(info) {
            const startDate = info.view.currentStart; 
            const endDate = info.view.currentEnd;

            this.fetchEvents(startDate, endDate);
        },

        async fetchEvents(info, successCallback, failureCallback) {
            const start = this.formatDate(info.start);
            const end = this.formatDate(info.end);

            try {
                const response = await req.get(`/api/admin/place/appointments?start=${start}&end=${end}`);

                this.events = response.data

                const events = response.data.map(event => ({
                    id: event.id,
                    title: event.client.name,
                    start: event.date,
                    end: event.dateEnd,
                    color: this.colorsEvents[event.status] ? Object.values(this.colorsEvents[event.status])[0] : '#FFFFFF'
                }));

                successCallback(events);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
                failureCallback(error);
            }
        },

        formatDate(date) {
            const pad = (num) => String(num).padStart(2, '0');

            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        },

        eventClick(info){
            const eventId = info.event.id
            
            const clickedEvent = this.events.find(event => {
                return Number(event.id) === Number(eventId);
            });
            
            // Emitindo o evento para o componente pai
            this.$emit('eventClicked', clickedEvent);
        }
    }
}
</script>