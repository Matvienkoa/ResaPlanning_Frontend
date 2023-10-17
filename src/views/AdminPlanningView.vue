<template>
  <AdminGetRequests v-if="getGetBox === 'getRequests'" />
  <AdminGetBillings v-if="getGetBox === 'getBillings'" />
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
      <FullCalendar ref="calendar" :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { mapGetters } from 'vuex';

import AdminPlanningBanner from '@/components/AdminPlanningBanner.vue';
import AdminGetRequests from '@/components/AdminGetRequests.vue';
import AdminGetBillings from '@/components/AdminGetBillings.vue';

import AdminAddEventClick from '@/components/AdminAddEventClick.vue';
import AdminAddEventSelect from '@/components/AdminAddEventSelect.vue';
import AdminGetPreparation from '@/components/AdminGetPreparation.vue';
import AdminGetSlot from '@/components/AdminGetSlot.vue';

import AdminDropPreparation from '@/components/AdminDropPreparation.vue';
import AdminSizePreparation from '@/components/AdminSizePreparation.vue';
import AdminDropSlot from '@/components/AdminDropSlot.vue';
import AdminSizeSlot from '@/components/AdminSizeSlot.vue';

export default {
  name: 'AdminPlanning',
  components: {
    AdminPlanningBanner,
    AdminGetRequests,
    AdminGetBillings,
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
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ],
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: ''
        },
        initialView: this.calculateInitialView(),
        views: {
          listMonth: { buttonText: 'Mois' },
          listWeek: { buttonText: 'Semaine' }
        },
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
    initializeCalendar() {
      this.calendarOptions.initialView = this.calculateInitialView() 
      this.calendarOptions.headerToolbar.right = this.calculateHeaderRight()
      this.$refs.calendar.getApi().setOption('height', this.calculateCalendarHeight());
    },
    calculateInitialView() {
      return window.innerWidth < 480 ? 'listMonth' : 'dayGridMonth';
    },
    calculateHeaderRight() {
      return window.innerWidth < 480 ? 'listMonth,listWeek,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay';
    },
    calculateCalendarHeight() {
      const windowHeight = window.innerHeight;
      return windowHeight;
    },
    // handleResize() {
    //   this.$refs.calendar.getApi().setOption('height', this.calculateCalendarHeight());
    //   this.$refs.calendar.getApi().changeView(this.calculateInitialView());
    //   this.calendarOptions.headerToolbar.right = this.calculateHeaderRight()
    //   this.calendarOptions.headerToolbar.left = this.calculateHeaderLeft()
    // },
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
    checkColor(state) {
      let color = "";
      if(state === 'planned') {
        color = 'orange'
      } else {
        color = 'green'
      }
      return color;
    },
    setEvents(res) {
      res.data.forEach(prep => {
        this.calendarOptions.events.push(
          {
            title: prep.maker + ' ' + prep.immat + ' ' + prep.brand + ' ' + prep.model,
            start: prep.start,
            end: prep.end,
            eventId: prep.id,
            backgroundColor: this.checkColor(prep.state),
            borderColor: this.checkColor(prep.state),
            type: 'preparation'
          }
        )
      })
    },
    setSlots(res) {
      res.data.forEach(slot => {
        this.calendarOptions.events.push(
          {
            title: slot.maker + ' ' + slot.place,
            start: slot.start,
            end: slot.end,
            eventId: slot.id,
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
  mounted() {
    this.initializeCalendar();
    // window.addEventListener('resize', this.handleResize);
  },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // },
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

<style>
.planning-calendar-box{
  width: 95%;
  margin-top: 20px;
  padding-bottom: 6em;
}

:root {
  --fc-button-bg-color: black;
  --fc-button-border-color: black;
  --fc-button-hover-bg-color: #c90200;
  --fc-button-hover-border-color: #c90200;
  --fc-button-active-bg-color: #c90200;
  --fc-button-active-border-color: #c90200;
  --fc-today-bg-color: #c9030021;
  --fc-highlight-color: #c9030021;
}

@media (max-width: 479px) {
  .fc-view-timeGridDay {
    display: block !important;
  }
  .fc-view-timeGridWeek, .fc-view-timeGridMonth {
    display: none !important;
  }
  .fc-header-toolbar {
    flex-direction: column-reverse;
    font-size: 1em;
  }
  .fc-toolbar-chunk{
    margin-bottom: 10px;
  }
  .fc .fc-toolbar-title{
    font-size: 1.5em;
    text-transform: uppercase;
  }
}
</style>

<style scoped>
/* @media (max-width: 1024px) {
  .main-page{
    margin-left: 150px;
  }
} */
@media (max-width: 1024px) {
  .main-page{
    margin-left: unset;
  }
}
</style>