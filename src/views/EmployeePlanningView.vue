<template>
  <AdminGetRequests v-if="getGetBox === 'getRequests'" />
  <AdminAddEventClick v-if="getAddBox === 'addEventClick'" :date="dateSelected" :day="allDay" />
  <AdminAddEventSelect v-if="getAddBox === 'addEventSelect'" :startD="startDate" :endD="endDate" :day="allDay" />
  <AdminGetPreparation v-if="getGetBox === 'getPreparation'" :id="preparation" />
  <AdminGetSlot v-if="getGetBox === 'getSlot'" :id="slot" />
  <AdminDropPreparation v-if="getDropBox === 'dropPreparation'" :id="preparation" :deltaD="deltaDay" :deltaM="deltaMm" />
  <AdminSizePreparation v-if="getSizeBox === 'sizePreparation'" :id="preparation" :deltaD="deltaDay" :deltaM="deltaMm" />
  <AdminDropSlot v-if="getDropBox === 'dropSlot'" :id="slot" :deltaD="deltaDay" :deltaM="deltaMm" />
  <AdminSizeSlot v-if="getSizeBox === 'sizeSlot'" :id="slot" :deltaD="deltaDay" :deltaM="deltaMm" />
  <AdminPlanningBanner url="/admin/home" />
  <div id="login-home" class="main-page">
    <div id="spinner" class="spinner-off">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="home-admin-title-box">
      <h1 class="home-admin-title">Mon Planning</h1>
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

import AdminPlanningBanner from '@/components/AdminPlanningBanner.vue';
import AdminGetRequests from '@/components/AdminGetRequests.vue';

import AdminAddEventClick from '@/components/AdminAddEventClick.vue';
import AdminAddEventSelect from '@/components/AdminAddEventSelect.vue';
import AdminGetPreparation from '@/components/AdminGetPreparation.vue';
import AdminGetSlot from '@/components/AdminGetSlot.vue';

import AdminDropPreparation from '@/components/AdminDropPreparation.vue';
import AdminSizePreparation from '@/components/AdminSizePreparation.vue';
import AdminDropSlot from '@/components/AdminDropSlot.vue';
import AdminSizeSlot from '@/components/AdminSizeSlot.vue';

export default {
  name: 'EmployeePlanning',
  components: {
    AdminPlanningBanner,
    AdminGetRequests,
    FullCalendar,
    AdminAddEventClick,
    AdminAddEventSelect,
    AdminGetPreparation,
    AdminDropPreparation,
    AdminSizePreparation,
    AdminSizeSlot,
    AdminGetSlot,
    AdminDropSlot
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
        allDaySlot: false,
        navLinks: true,
        weekNumbers: true,
        dateClick: this.openAddBox,
        select: this.openAddSlot,
        eventClick: this.openGetPreparation,
        eventDrop: this.openDropBox,
        eventResize: this.openSizeBox,
        events: [],
        datesSet: this.getEventsByDate
      },
      deltaDay: null,
      deltaMm: null,
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getGetBox', 'getDropBox', 'getSizeBox', 'getEventsPlanning', 'getUser', 'getProfile'])
  },
  methods: {
    getEventsByDate(date) {
      this.showSpinner()
      this.calendarOptions.events = []
      this.$store.dispatch('getPreparations', date)
      .then((res) => {
        this.setEvents(res)
        this.$store.dispatch('getSlots', date)
        .then((res) => {
          this.setSlots(res)
          this.hideSpinner()
        })
      })
    },
    openDropBox(event) {
      if(event.event._def.extendedProps.type === "preparation") {
        this.preparation = event.event._def.extendedProps.eventId
        this.deltaDay = event.delta.days
        this.deltaMm = event.delta.milliseconds
        this.$store.state.dropBox = 'dropPreparation'
      }
      if(event.event._def.extendedProps.type === "slot") {
        this.slot = event.event._def.extendedProps.eventId
        this.deltaDay = event.delta.days
        this.deltaMm = event.delta.milliseconds
        this.$store.state.dropBox = 'dropSlot'
      }
    },
    openSizeBox(event) {
      if(event.event._def.extendedProps.type === "preparation") {
        this.preparation = event.event._def.extendedProps.eventId
        this.deltaDay = event.endDelta.days
        this.deltaMm = event.endDelta.milliseconds
        this.$store.state.sizeBox = 'sizePreparation'
      }
      if(event.event._def.extendedProps.type === "slot") {
        this.slot = event.event._def.extendedProps.eventId
        this.deltaDay = event.endDelta.days
        this.deltaMm = event.endDelta.milliseconds
        this.$store.state.sizeBox = 'sizeSlot'
      }
    },
    openGetPreparation(event) {
      if(event.event._def.extendedProps.type === "preparation") {
        this.preparation = event.event._def.extendedProps.eventId
        this.$store.state.getBox = 'getPreparation'
      }
      if(event.event._def.extendedProps.type === "slot") {
        this.slot = event.event._def.extendedProps.eventId
        this.$store.state.getBox = 'getSlot'
      }
    },
    openAddBox(date) {
      this.dateSelected = date.dateStr
      this.allDay = date.allDay
      this.$store.state.addBox = 'addEventClick'
    },
    openAddSlot(date) {
      this.startDate = date.startStr
      this.endDate = date.endStr
      this.allDay = date.allDay
      this.$store.state.addBox = 'addEventSelect'
    },
    setEvents(res) {
      res.data.forEach(prep => {
        this.calendarOptions.events.push(
          {
            title: prep.immat + ' ' + prep.brand + ' ' + prep.model,
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
            borderColor: 'rgb(255,0,0)',
            type: 'slot'
          }
        )
      })
    },
    showSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.classList.replace('spinner-off', 'lds-ring');
        const body = document.getElementById('login-home');
        body.classList.add('on');
    },
    hideSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.classList.replace('lds-ring', 'spinner-off');
        const body = document.getElementById('login-home');
        body.classList.remove('on');
    },
  },
  created: function () {
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin' && res.data.role !== 'employee') {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/')
      }
    })
  },
  updated() {
    this.calendarOptions.events = this.getEventsPlanning
  }
}
</script>