<template>
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

import Header from '@/components/Header.vue'
import BackButton from '@/components/BackButton.vue';

export default {
  name: 'AdminPlanning',
  components: {
    Header,
    BackButton,
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        locale: frLocale,
        allDaySlot: false,
        navLinks: true,
        weekNumbers: true,

        dateClick: function(info) {
          console.log(info)
        },

        events: [
          // { 
          //   title: 'Renault Traffic', 
          //   start: '2023-07-06T09:30:00+02:00', 
          //   end: '2023-07-08T07:30:00+02:00'
          // },
          // { 
          //   title: 'Renault Traffic', 
          //   start: '2023-07-06T07:30:00+02:00', 
          //   end: '2023-07-08T07:30:00+02:00'
          // },
          // { 
          //   title: 'Renault Traffic', 
          //   start: '2023-07-06T07:30:00+02:00', 
          //   end: '2023-07-08T07:30:00+02:00'
          // },
          // { 
          //   title: 'Renault Traffic', 
          //   start: '2023-07-06T10:30:00+02:00', 
          //   end: '2023-07-08T07:30:00+02:00'
          // },
          // { 
          //   title: 'Renault Traffic', 
          //   start: '2023-06-29T07:30:00+02:00', 
          //   end: '2023-06-30T07:30:00+02:00'
          // },
        ]
      }
    }
  },
  methods: {
    
  },
  created: function () {
    this.$store.dispatch('getPreparations')
    .then((res) => {
      console.log(res.data)
      res.data.forEach(prep => {
        this.calendarOptions.events.push(
          {
            title: prep.immat,
            start: prep.createdAt,
            end: prep.createdAt
          }
        )
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