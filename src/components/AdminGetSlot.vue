<template>
  <div class="get-back">
    <AdminEditSlot v-if="getEditBox === 'editSlot'" :slotId="this.slot" />
    <AdminDeleteSlot v-if="getDeleteBox === 'deleteSlot'" :slotId="this.slot" />
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Créneau réservé à {{getSlot.company}}</h2>
      <div class="get-infos-box">
        <p>Réalisé par : {{getSlot.maker}}</p>
        <p v-if="getSlot.duration === 'day'">Durée de l'intervention : Journée entière</p>
        <p v-if="getSlot.duration === 'half'">Durée de l'intervention : Demie Journée</p>
        <p>Du {{moment(getSlot.start).format('LLL')}}</p>
        <p>Au {{moment(getSlot.end).format('LLL')}}</p>
        <p>Lieux de la prestation : {{getSlot.place}}</p>
        <p v-if="getSlot.observationsCustomer">Informations client : {{getSlot.observationsCustomer}}</p>
        <p v-if="!getSlot.observationsCustomer">Informations client : Non renseigné</p>
        <p v-if="getSlot.observationsDepot">Observations : {{getSlot.observationsDepot}}</p>
        <p v-if="!getSlot.observationsDepot">Observations : Non renseigné</p>
        <div @click="openEditBox({mode: 'editSlot', id: this.id})" class="edit-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="edit-icon" />
        </div>
        <div @click="openDeleteBox({mode: 'deleteSlot', id: this.id})" class="delete-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="delete-icon" />
        </div>
      </div>
      <div class="get-customer-box">
        <p>Client : {{getSlot.company}} {{getSlot.firstName}} {{getSlot.lastName}}</p>
        <p>Adresse : {{getSlot.adress}} {{getSlot.adress2}} {{getSlot.zipCode}} {{getSlot.city}}</p>
        <p>Contact : {{getSlot.phone}} {{getSlot.mail}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminEditSlot from '@/components/AdminEditSlot.vue';
import AdminDeleteSlot from '@/components/AdminDeleteSlot.vue';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'AdminGetSlot',
  components: {
    AdminEditSlot,
    AdminDeleteSlot,
  },
  props: ['id'],
  data() {
    return {
      moment: moment,
      slot: null
    }
  },
  computed: {
    ...mapGetters(['getSlot', 'getEditBox', 'getDeleteBox'])
  },
  methods: {
    openEditBox(data) {
      this.slot = data.id
      this.$store.state.editBox = data.mode
    },
    openDeleteBox(data) {
      this.slot = data.id
      this.$store.state.deleteBox = data.mode
    },
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
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}
.get-box{
  position: relative;
  max-width: 600px;
  min-height: 50%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
}
.get-box-title{
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
}
.close-get{
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  width: 30px;
}
.get-infos-box{
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.edit-infos-box{
  width: 90%;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.get-box{
  width: 60%;
  justify-content: flex-start;
}
.get-box-title{
  text-align: start;
  width: 90%;
  border-bottom: 3px solid #c0c0c0;
  padding-bottom: 5px;
}
.get-infos-box{
  background-color: rgb(240, 240, 240);
  padding: 0.4em 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.get-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
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
</style>