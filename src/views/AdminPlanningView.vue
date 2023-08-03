<template>
  <AdminAddEventClick v-if="getAddBox === 'addEventClick'" :date="dateSelected" :day="allDay" />
  <AdminAddEventSelect v-if="getAddBox === 'addEventSelect'" :startD="startDate" :endD="endDate" :day="allDay" />
  <AdminGetPreparation v-if="getGetBox === 'getPreparation'" :id="preparation" />
  <Header />
  <BackButton url="/admin/home" />
  <div class="planning-admin-box">
    <div class="planning-banner">
      <div class="planning-banner-item">Demandes</div>
    </div>
    <div class="planning-calendar-box">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';

import { mapGetters } from 'vuex';

import Header from '@/components/Header.vue'
import BackButton from '@/components/BackButton.vue';
import AdminAddEventClick from '@/components/AdminAddEventClick.vue';
import AdminAddEventSelect from '@/components/AdminAddEventSelect.vue';
import AdminGetPreparation from '@/components/AdminGetPreparation.vue';

export default {
  name: 'AdminPlanning',
  components: {
    Header,
    BackButton,
    FullCalendar,
    AdminAddEventClick,
    AdminAddEventSelect,
    AdminGetPreparation
  },
  data() {
    return {
      dateSelected: "",
      startDate: "",
      endDate: "",
      allDay: "",
      preparation: null,
      slot: null,
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        locale: frLocale,
        selectable: true,
        editable: true,
        allDaySlot: true,
        navLinks: true,
        weekNumbers: true,
        dateClick: this.openAddBox,
        select: this.openAddSlot,
        eventClick: this.openGetPreparation,
        eventDrop: this.test2,
        events: []
      }
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getPreparations', 'getEvents', 'getGetBox'])
  },
  methods: {
    openGetPreparation(event) {
      console.log(event)
      if(event.event._def.extendedProps.type === "preparation") {
        this.preparation = event.event._def.extendedProps.eventId
        this.$store.state.getBox = 'getPreparation'
      }
      if(event.event._def.extendedProps.type === "slot") {
        this.slot = event.event._def.extendedProps.eventId
        this.$store.state.getBox = 'getSlot'
      }
    },
    test2(event) {
      console.log(event)
    },
    openAddBox(date) {
      console.log(date)
      this.dateSelected = date.dateStr
      this.allDay = date.allDay
      this.$store.state.addBox = 'addEventClick'
    },
    openAddSlot(date) {
      console.log(date)
      this.startDate = date.startStr
      this.endDate = date.endStr
      this.allDay = date.allDay
      this.$store.state.addBox = 'addEventSelect'
    },
    setEvents(res) {
      res.data.forEach(prep => {
        this.calendarOptions.events.push(
          {
            title: prep.immat,
            start: prep.start,
            end: prep.end,
            eventId: prep.id,
            type: 'preparation'
          }
        )
      })
    },
    setSlots(res) {
      res.data.forEach(slot => {
        this.calendarOptions.events.push(
          {
            title: slot.place,
            start: slot.start,
            end: slot.end,
            eventId: slot.id,
            backgroundColor: 'rgb(255,0,0)',
            type: 'slot'
          }
        )
      })
    }
  },
  created: function () {
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('getPreparations')
    .then((res) => {
      this.setEvents(res)
      this.$store.dispatch('getSlots')
      .then((res) => {
        this.setSlots(res)
      })
    })
  },
  updated() {
    this.calendarOptions.events = []
    this.$store.dispatch('getPreparations')
    .then((res) => {
      this.setEvents(res)
      this.$store.dispatch('getSlots')
      .then((res) => {
        this.setSlots(res)
      })
    })
  }
}
</script>

<style scoped>
.planning-admin-box{
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.planning-calendar-box{
  width: 85%;
  margin-right: 3%;
  margin-top: 3%;
}

.planning-banner{
  position: fixed;
  left: 0;
  top: 10%;
  width: 10%;
  height: 80%;
  border: solid red 2px;
}
</style>