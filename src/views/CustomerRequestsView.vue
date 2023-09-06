<template>
<CustomerAddRequest v-if="getAddBox === 'addRequest'" :id="getProfile.id"/>
<CustomerEditPrepRequest v-if="getEditBox === 'editPrepRequest'" :id="this.requestId" />
<CustomerDeletePrepRequest v-if="getDeleteBox === 'deletePrepRequest'" :id="this.requestId" />
<CustomerEditSlotRequest v-if="getEditBox === 'editSlotRequest'" :id="this.requestId" />
<CustomerDeleteSlotRequest v-if="getDeleteBox === 'deleteSlotRequest'" :id="this.requestId" />
  <Header url="/customer/home" />
  <BackButton url="/customer/home" />
  <div class="requests-customer-box">
    <button @click="openAddBox()">Nouvelle demande</button>
    <div class="requests-customer-pending-box">
        <div class="requests-customer-pending-title-box">
            <h2 class="requests-customer-pending-title">Demandes de prep en cours</h2>
        </div>
        <div v-for="prep in getCustomerPrepRequestsPending" :key="prep.id" class="request-customer-box">
          {{prep.brand}} {{prep.immat}} {{prep.state}} 
          <div @click="openEditBox({type: 'editPrepRequest', id: prep.id})">Editer</div>
          <div @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})">Supprimer</div>
        </div>
        <div class="requests-customer-pending-title-box">
            <h2 class="requests-customer-pending-title">Demandes de créneaux en cours</h2>
        </div>
        <div v-for="slot in getCustomerSlotRequestsPending" :key="slot.id" class="request-customer-box">
          {{slot.date}} {{slot.place}} {{slot.state}} 
          <div @click="openEditBox({type: 'editSlotRequest', id: slot.id})">Editer</div>
          <div @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})">Supprimer</div>
        </div>
        <div class="requests-customer-pending-title-box">
            <h2 class="requests-customer-pending-title">Demandes de prep refusées</h2>
        </div>
        <div v-for="prep in getCustomerPrepRequestsRefused" :key="prep.id" class="request-customer-box">
          {{prep.brand}} {{prep.immat}} {{prep.state}} {{prep.observationsDepot}}
          <div @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})">Supprimer</div>
        </div>
        <div class="requests-customer-pending-title-box">
            <h2 class="requests-customer-pending-title">Demandes de créneaux refusées</h2>
        </div>
        <div v-for="slot in getCustomerSlotRequestsRefused" :key="slot.id" class="request-customer-box">
          {{slot.date}} {{slot.place}} {{slot.state}} {{slot.observationsDepot}}
          <div @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})">Supprimer</div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';
import { mapGetters } from 'vuex';
import CustomerAddRequest from '@/components/CustomerAddRequest.vue';
import CustomerEditPrepRequest from '@/components/CustomerEditPrepRequest.vue';
import CustomerDeletePrepRequest from '@/components/CustomerDeletePrepRequest.vue';
import CustomerEditSlotRequest from '@/components/CustomerEditSlotRequest.vue';
import CustomerDeleteSlotRequest from '@/components/CustomerDeleteSlotRequest.vue';

export default {
  name: 'CustomerRequests',
  components: {
    Header,
    BackButton,
    CustomerAddRequest,
    CustomerEditPrepRequest,
    CustomerDeletePrepRequest,
    CustomerEditSlotRequest,
    CustomerDeleteSlotRequest
  },
  data() {
    return {
      requestId: null
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getEditBox', 'getDeleteBox', 'getCustomerPrepRequestsPending', 'getCustomerPrepRequestsRefused', 'getCustomerSlotRequestsPending', 'getCustomerSlotRequestsRefused', 'getProfile'])
  },
  methods: {
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
  },
  updated() {
    
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
}
.requests-customer-pending-box{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.requests-customer-pending-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
</style>