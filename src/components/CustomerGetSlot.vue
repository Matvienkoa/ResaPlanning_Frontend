<template>
  <div class="get-back">
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Créneau du {{moment(getSlot.start).format('LL')}}</h2>
      <div v-if="moment(new Date()).isAfter(moment(getSlot.start))" class="get-box-state">
        <img src="../assets/Icons/in-time.svg" alt="" class="get-state-icon" /><p class="get-state-txt-in-time">En cours</p>
      </div>
      <div v-if="moment(new Date()).isBefore(moment(getSlot.start))" class="get-box-state">
        <img src="../assets/Icons/calendar.svg" alt="" class="get-state-icon" /><p class="get-state-txt-completed">Programmé</p>
      </div>
      <div class="get-infos-box">
        <p v-if="getSlot.duration === 'day'">Durée de l'intervention : <span class="info-bold">Journée entière</span></p>
        <p v-if="getSlot.duration === 'half'">Durée de l'intervention : <span class="info-bold">Demie Journée</span></p>
        <p>Du <span class="info-bold">{{moment(getSlot.start).format('LLL')}}</span></p>
        <p>Au <span class="info-bold">{{moment(getSlot.end).format('LLL')}}</span></p>
        <p>Lieux de la prestation : <span class="info-bold">{{getSlot.place}}</span></p>
        <p v-if="getSlot.observationsCustomer">Informations client : <span class="info-bold">{{getSlot.observationsCustomer}}</span></p>
        <p v-if="!getSlot.observationsCustomer">Informations client : Non renseigné</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'CustomerGetSlot',
  props: ['id'],
  data() {
    return {
      moment: moment,
      slot: null
    }
  },
  computed: {
    ...mapGetters(['getSlot'])
  },
  methods: {
    closeGetBox() {
      this.$store.state.getBox = "closed"
    },
  },
  created: function () {
    this.$store.dispatch('getSlot', this.id)
  }
}
</script>

<style>
.get-back{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}
.get-box{
  position: relative;
  width: 80%;
  max-width: 800px;
  min-height: 30%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
}
.get-box-title{
  text-align: start;
  margin-bottom: 20px;
  margin-top: 40px;
  width: 90%;
  border-bottom: 3px solid #c0c0c0;
  padding-bottom: 5px;
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2.5em;
}
.close-get{
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  width: 30px;
}
.get-infos-box{
  font-family: 'catamaran', sans-serif;
  font-size: 1.2em;
  line-height: 1.2em;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.edit-infos-box{
  width: 90%;
  display: flex;
  flex-direction: column;
}
@media (max-width: 768px) {
  .get-box{
    width: 90%;
  }
}
@media (max-width: 480px) {
  .get-box{
    width: 95%;
    min-height: 95%;
    max-height: 95%;
  }
  .get-box-title{
    font-size: 2.2em;
  }
}
</style>

<style scoped>
.get-box-state{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.get-state-icon{
  height: 40px;
  margin: 0 5px;
}
.get-state-txt-in-time{
  font-weight: 700;
  font-size: 1.4em;
  color: rgb(243,126,0);
  margin: 0 5px;
}
.get-state-txt-completed{
  font-weight: 700;
  font-size: 1.4em;
  color: rgb(55,136,216);
  margin: 0 5px;
}
.get-infos-box{
  padding: 0.4em 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.get-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.get-customer-box{
  margin-bottom: 3em;
}
.edit-icon-box{
  position: absolute;
  top: 5px;
  right: 45px;
  height: 35px;
  width: 35px;
  margin: unset;
}
.delete-icon-box{
  position: absolute;
  top: 5px;
  right: 5px;
  height: 35px;
  width: 35px;
  margin: unset;
}
.edit-icon{
  height: 16px;
}
.delete-icon{
  height: 16px;
}
@media (max-width: 769px) {
  .get-infos-box{
    margin-top: 30px;
  }
  .edit-icon-box{
    top: -45px;
    background: rgb(245, 245, 245);
  }
  .delete-icon-box{
    top: -45px;
    background: rgb(245, 245, 245);
  }
}
</style>