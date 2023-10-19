<template>
  <CustomerAddRequest v-if="getAddBox === 'addRequest'" :id="getProfile.id"/>
  <CustomerEditPrepRequest v-if="getEditBox === 'editPrepRequest'" :id="this.requestId" />
  <CustomerDeletePrepRequest v-if="getDeleteBox === 'deletePrepRequest'" :id="this.requestId" />
  <CustomerEditSlotRequest v-if="getEditBox === 'editSlotRequest'" :id="this.requestId" />
  <CustomerDeleteSlotRequest v-if="getDeleteBox === 'deleteSlotRequest'" :id="this.requestId" />
  <Header url="/customer/home" />
  <div class="main-page">
    <div class="account-admin-title-box">
      <h1 class="account-admin-title">Demandes de réservations</h1>
    </div>
    <div class="requests-customer-box">
      <button class="add-button" @click="openAddBox()">Nouvelle demande</button>
      <div class="requests-customer-pending-box">
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de préparation envoyées</h2>
          </div>
          <p class="no-content" v-if="getCustomerPrepRequestsPending.length === 0">Aucune demande pour le moment</p>
          <div v-for="prep in getCustomerPrepRequestsPending" :key="prep.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>Le {{moment(prep.createdAt).format('LL')}}</p>
                <p>{{prep.brand}}</p>
                <p>{{prep.model}}</p>
                <p>{{prep.immat}}</p>
              </div>
              <div v-if="showModePrepRequestPending === 'closed' || prepRequestPendingSelected !== prep.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="openShowModePRP(prep.id)" src="../assets/Icons/arrow-down.svg" alt="" class="request-customer-show">
              </div>
              <div v-if="showModePrepRequestPending === 'open' && prepRequestPendingSelected === prep.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="closeShowModePRP()" src="../assets/Icons/arrow-up.svg" alt="" class="request-customer-show">
              </div>
            </div>
            <div v-if="showModePrepRequestPending === 'open' && prepRequestPendingSelected === prep.id" class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>Date de livraison souhaitée : {{moment(prep.deliveryDate).format('LL')}}</p>
                <p v-if="prep.steps">Prestations souhaitées : {{prep.steps}}</p>
                <p v-if="!prep.steps">Prestations souhaitées : Non renseigné</p>
                <p v-if="prep.year">Année : {{prep.year}}</p>
                <p v-if="!prep.year">Année : Non renseigné</p>
                <p v-if="prep.kilometer">KM : {{prep.kilometer}}</p>
                <p v-if="!prep.kilometer">KM : Non renseigné</p>
                <p v-if="prep.condition">Etat du véhicule : {{prep.condition}}</p>
                <p v-if="!prep.condition">Etat du véhicule : Non renseigné</p>
                <p v-if="prep.observationsCustomer">Observations : {{prep.observationsCustomer}}</p>
                <p v-if="!prep.observationsCustomer">Observations : Non renseigné</p>
                <div v-if="prep.photo" class="request-customer-photo-box-hidden">
                  <img crossorigin="anonymous" :src="prep.photo" alt="" class="request-customer-photo-hidden">
                </div>
              </div>
              <div v-if="!prep.photo" @click="openEditBox({type: 'editPrepRequest', id: prep.id})" class="request-customer-edit-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="request-customer-edit-icon">
              </div>
              <div @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})" class="request-customer-delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon">
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de créneau envoyées</h2>
          </div>
          <p class="no-content" v-if="getCustomerSlotRequestsPending.length === 0">Aucune demande pour le moment</p>
          <div v-for="slot in getCustomerSlotRequestsPending" :key="slot.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>Le {{moment(slot.createdAt).format('LL')}}</p>
                <p v-if="slot.duration === 'day'">Journée entière</p>
                <p v-if="slot.duration === 'half'">Demie Journée</p>
              </div>
              <div v-if="showModeSlotRequestPending === 'closed' || slotRequestPendingSelected !== slot.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="openShowModeSRP(slot.id)" src="../assets/Icons/arrow-down.svg" alt="" class="request-customer-show">
              </div>
              <div v-if="showModeSlotRequestPending === 'open' && slotRequestPendingSelected === slot.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="closeShowModeSRP()" src="../assets/Icons/arrow-up.svg" alt="" class="request-customer-show">
              </div>
            </div>
            <div v-if="showModeSlotRequestPending === 'open' && slotRequestPendingSelected === slot.id" class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>Date souhaitée : {{moment(slot.date).format('LL')}}</p>
                <p>Lieux de la prestation : {{slot.place}}</p>
                <p v-if="slot.observationsCustomer">Observations : {{slot.observationsCustomer}}</p>
                <p v-if="!slot.observationsCustomer">Observations : non renseigné</p>
              </div>
              <div @click="openEditBox({type: 'editSlotRequest', id: slot.id})" class="request-customer-edit-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="request-customer-edit-icon">
              </div>
              <div @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})" class="request-customer-delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon">
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de preparation refusées</h2>
          </div>
          <p class="no-content" v-if="getCustomerPrepRequestsRefused.length === 0">Aucune demande pour le moment</p>
          <div v-for="prep in getCustomerPrepRequestsRefused" :key="prep.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>Le {{moment(prep.createdAt).format('LL')}}</p>
                <p>{{prep.brand}}</p>
                <p>{{prep.model}}</p>
                <p>{{prep.immat}}</p>
              </div>
              <div v-if="showModePrepRequestRefused === 'closed' || prepRequestRefusedSelected !== prep.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="openShowModePRR(prep.id)" src="../assets/Icons/arrow-down.svg" alt="" class="request-customer-show">
              </div>
              <div v-if="showModePrepRequestRefused === 'open' && prepRequestRefusedSelected === prep.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="closeShowModePRR()" src="../assets/Icons/arrow-up.svg" alt="" class="request-customer-show">
              </div>
            </div>
            <div v-if="showModePrepRequestRefused === 'open' && prepRequestRefusedSelected === prep.id" class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>Date de livraison souhaitée : {{moment(prep.deliveryDate).format('LL')}}</p>
                <p v-if="prep.steps">Prestations souhaitées : {{prep.steps}}</p>
                <p v-if="!prep.steps">Prestations souhaitées : Non renseigné</p>
                <p v-if="prep.year">Année : {{prep.year}}</p>
                <p v-if="!prep.year">Année : Non renseigné</p>
                <p v-if="prep.kilometer">KM : {{prep.kilometer}}</p>
                <p v-if="!prep.kilometer">KM : Non renseigné</p>
                <p v-if="prep.condition">Etat du véhicule : {{prep.condition}}</p>
                <p v-if="!prep.condition">Etat du véhicule : Non renseigné</p>
                <p v-if="prep.observationsCustomer">Observations : {{prep.observationsCustomer}}</p>
                <p v-if="!prep.observationsCustomer">Observations : Non renseigné</p>
                <p>Motif du refus : {{prep.observationsDepot}}</p>
              </div>
              <div @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})" class="request-customer-delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon">
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de créneau refusées</h2>
          </div>
          <p class="no-content" v-if="getCustomerSlotRequestsRefused.length === 0">Aucune demande pour le moment</p>
          <div v-for="slot in getCustomerSlotRequestsRefused" :key="slot.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>Le {{moment(slot.createdAt).format('LL')}}</p>
                <p v-if="slot.duration === 'day'">Journée entière</p>
                <p v-if="slot.duration === 'half'">Demie Journée</p>
              </div>
              <div v-if="showModeSlotRequestRefused === 'closed' || slotRequestRefusedSelected !== slot.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="openShowModeSRR(slot.id)" src="../assets/Icons/arrow-down.svg" alt="" class="request-customer-show">
              </div>
              <div v-if="showModeSlotRequestRefused === 'open' && slotRequestRefusedSelected === slot.id" class="request-customer-show-box">
                <img crossorigin="anonymous" @click="closeShowModeSRR()" src="../assets/Icons/arrow-up.svg" alt="" class="request-customer-show">
              </div>
            </div>
            <div v-if="showModeSlotRequestRefused === 'open' && slotRequestRefusedSelected === slot.id" class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>Date souhaitée : {{moment(slot.date).format('LL')}}</p>
                <p>Lieux de la prestation : {{slot.place}}</p>
                <p v-if="slot.observationsCustomer">Observations : {{slot.observationsCustomer}}</p>
                <p v-if="!slot.observationsCustomer">Observations : non renseigné</p>
                <p>Motif du refus : {{slot.observationsDepot}}</p>
              </div>
              <div @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})" class="request-customer-delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon">
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');
import CustomerAddRequest from '@/components/CustomerAddRequest.vue';
import CustomerEditPrepRequest from '@/components/CustomerEditPrepRequest.vue';
import CustomerDeletePrepRequest from '@/components/CustomerDeletePrepRequest.vue';
import CustomerEditSlotRequest from '@/components/CustomerEditSlotRequest.vue';
import CustomerDeleteSlotRequest from '@/components/CustomerDeleteSlotRequest.vue';

export default {
  name: 'CustomerRequests',
  components: {
    Header,
    CustomerAddRequest,
    CustomerEditPrepRequest,
    CustomerDeletePrepRequest,
    CustomerEditSlotRequest,
    CustomerDeleteSlotRequest
  },
  data() {
    return {
      moment: moment,
      requestId: null,
      showModePrepRequestPending: "closed",
      prepRequestPendingSelected: null,
      showModeSlotRequestPending: "closed",
      slotRequestPendingSelected: null,
      showModePrepRequestRefused: "closed",
      prepRequestRefusedSelected: null,
      showModeSlotRequestRefused: "closed",
      slotRequestRefusedSelected: null,
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getEditBox', 'getDeleteBox', 'getCustomerPrepRequestsPending', 'getCustomerPrepRequestsRefused', 'getCustomerSlotRequestsPending', 'getCustomerSlotRequestsRefused', 'getProfile'])
  },
  methods: {
    openShowModePRP(id) {
      this.prepRequestPendingSelected = id
      this.showModePrepRequestPending = 'open'
    },
    closeShowModePRP() {
      this.prepRequestPendingSelected = null
      this.showModePrepRequestPending = 'closed'
    },
    openShowModeSRP(id) {
      this.slotRequestPendingSelected = id
      this.showModeSlotRequestPending = 'open'
    },
    closeShowModeSRP() {
      this.slotRequestPendingSelected = null
      this.showModeSlotRequestPending = 'closed'
    },
    openShowModePRR(id) {
      this.prepRequestRefusedSelected = id
      this.showModePrepRequestRefused = 'open'
    },
    closeShowModePRR() {
      this.prepRequestRefusedSelected = null
      this.showModePrepRequestRefused = 'closed'
    },
    openShowModeSRR(id) {
      this.slotRequestRefusedSelected = id
      this.showModeSlotRequestRefused = 'open'
    },
    closeShowModeSRR() {
      this.slotRequestRefusedSelected = null
      this.showModeSlotRequestRefused = 'closed'
    },
    openAddBox() {
        this.$store.state.addBox = 'addRequest'
    },
    openEditBox(data) {
        this.requestId = data.id
        this.$store.state.editBox = data.type
    },
    openDeleteBox(data) {
        this.requestId = data.id
        this.$store.state.deleteBox = data.type
    }
  },
  created: function () {
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getRequests')
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin' && res.data.role !== 'customer') {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style>
.requests-customer-box{
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
  padding-bottom: 5em;
}
.requests-customer-pending-box{
  width: 95%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.requests-customer-pending-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-bottom: 5px;
}
.request-customer-box{
  font-family: 'catamaran', sans-serif;
  font-size: 1.2em;
  line-height: 1.2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  padding: 0.4em 0;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.request-customer-infos-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
.request-customer-infos-box p{
  margin-right: 10px;
}
.request-customer-infos-hidden-box{
  width: 100%;
  position: relative;
  display: flex;
}
.request-customer-infos-hidden{
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
.request-customer-infos{
  display: flex;
  flex-wrap: wrap;
}
.request-customer-photo-box-hidden{
  width: 70%;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.request-customer-photo-hidden{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.request-customer-show-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #fff;
}
.request-customer-show{
  height: 20px;
}
.request-customer-infos-hidden{
  display: flex;
}
.request-customer-edit-icon-box{
  position: absolute;
  bottom: 3px;
  right: 45px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
}
.request-customer-edit-icon{
  height: 17px;
}
.request-customer-delete-icon-box{
  position: absolute;
  bottom: 3px;
  right: 10px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
}
.request-customer-delete-icon{
  height: 17px;
}
@media (max-width: 480px) {
  .request-customer-infos-hidden{
    width: 80%;
  }
  .request-customer-edit-icon-box{
    bottom: 35px;
    right: 10px;
  }
  .request-customer-delete-icon-box{
    bottom: 2px;
    right: 10px;
  }
}
</style>

<style scoped>
.no-content{
  margin-bottom: 20px;
  margin-top: unset;
}
</style>