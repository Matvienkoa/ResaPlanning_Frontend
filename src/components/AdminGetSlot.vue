<template>
  <div class="get-back">
    <AdminEditSlot v-if="getEditBox === 'editSlot'" :slotId="this.slot" />
    <AdminDeleteSlot v-if="getDeleteBox === 'deleteSlot'" :slotId="this.slot" />
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Créneau réservé à : {{getSlot.company}}</h2>
      <div class="get-infos-box">
        <p>Réalisé par : <span class="info-bold">{{getSlot.maker}}</span></p>
        <p v-if="getSlot.duration === 'day'">Durée de l'intervention : <span class="info-bold">Journée entière</span></p>
        <p v-if="getSlot.duration === 'half'">Durée de l'intervention : <span class="info-bold">Demie Journée</span></p>
        <p>Du <span class="info-bold">{{moment(getSlot.start).format('LLL')}}</span></p>
        <p>Au <span class="info-bold">{{moment(getSlot.end).format('LLL')}}</span></p>
        <p>Lieux de la prestation : <span class="info-bold">{{getSlot.place}}</span></p>
        <p v-if="getSlot.observationsCustomer">Informations client : <span class="info-bold">{{getSlot.observationsCustomer}}</span></p>
        <p v-if="!getSlot.observationsCustomer">Informations client : Non renseigné</p>
        <p v-if="getSlot.observationsDepot">Observations : <span class="info-bold">{{getSlot.observationsDepot}}</span></p>
        <p v-if="!getSlot.observationsDepot">Observations : Non renseigné</p>
        <div @click="openEditBox({mode: 'editSlot', id: this.id})" class="edit-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="edit-icon" />
        </div>
        <div @click="openDeleteBox({mode: 'deleteSlot', id: this.id})" class="delete-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="delete-icon" />
        </div>
      </div>
      <div class="get-customer-box">
        <p>Client : <span class="info-bold">{{getSlot.company}} {{getSlot.firstName}} {{getSlot.lastName}}</span></p>
        <p>Adresse : <span class="info-bold">{{getSlot.adress}} {{getSlot.adress2}} {{getSlot.zipCode}} {{getSlot.city}}</span></p>
        <p>Contact : <span class="info-bold">{{getSlot.phone}} {{getSlot.mail}}</span></p>
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