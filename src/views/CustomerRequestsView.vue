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
              <h2 class="requests-customer-pending-title">Demandes de prep en cours</h2>
          </div>
          <div v-for="prep in getCustomerPrepRequestsPending" :key="prep.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>{{prep.brand}}</p>
                <p>{{prep.model}}</p>
                <p>{{prep.immat}}</p>
              </div>
              <div class="request-customer-show">Voir</div>
            </div>
            <div class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>{{prep.steps}}</p>
                <p>{{prep.year}}</p>
              </div>
              <div class="request-customer-actions">
                <img @click="openEditBox({type: 'editPrepRequest', id: prep.id})" src="../assets/Icons/edit.svg" alt="" class="request-customer-edit-icon">
                <img @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon">
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de créneaux en cours</h2>
          </div>
          <div v-for="slot in getCustomerSlotRequestsPending" :key="slot.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>{{slot.date}}</p>
                <p>{{slot.place}}</p>
                <p>{{slot.state}}</p>
              </div>
              <div class="request-customer-show">Voir</div>
            </div>
            <div class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>{{slot.duration}}</p>
                <p>{{slot.observationsCustomer}}</p>
              </div>
              <div class="request-customer-actions">
                <img @click="openEditBox({type: 'editSlotRequest', id: slot.id})" src="../assets/Icons/edit.svg" alt="" class="request-customer-edit-icon" />
                <img @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon" />
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de preparations refusées</h2>
          </div>
          <div v-for="prep in getCustomerPrepRequestsRefused" :key="prep.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>{{prep.brand}}</p>
                <p>{{prep.immat}}</p>
                <p>{{prep.state}}</p>
              </div>
              <div class="request-customer-show">Voir</div>
            </div>
            <div class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>{{prep.observationsDepot}}</p>
                <p>TEST</p>
              </div>
              <div class="request-customer-actions">
                <img @click="openDeleteBox({type: 'deletePrepRequest', id: prep.id})" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon" />
              </div>
            </div>
          </div>
          <div class="requests-customer-pending-title-box">
              <h2 class="requests-customer-pending-title">Demandes de créneaux refusées</h2>
          </div>
          <div v-for="slot in getCustomerSlotRequestsRefused" :key="slot.id" class="request-customer-box">
            <div class="request-customer-infos-box">
              <div class="request-customer-infos">
                <p>{{slot.date}}</p>
                <p>{{slot.place}}</p>
                <p>{{slot.state}}</p>
              </div>
              <div class="request-customer-show">Voir</div>
            </div>
            <div class="request-customer-infos-hidden-box">
              <div class="request-customer-infos-hidden">
                <p>{{slot.observationsDepot}}</p>
                <p>TEST</p>
              </div>
              <div class="request-customer-actions">
                <img @click="openDeleteBox({type: 'deleteSlotRequest', id: slot.id})" src="../assets/Icons/delete.svg" alt="" class="request-customer-delete-icon" />
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

.request-customer-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
  padding: 0.4em 0;
  margin-bottom: 10px;
}
.request-customer-infos-box{
  display: flex;
  justify-content: space-between;
}
.request-customer-infos-hidden-box{
  display: flex;
  justify-content: space-between;
}
.request-customer-infos{
  display: flex;
}
.request-customer-infos-hidden{
  display: flex;
}
.request-customer-actions{
  display: flex;
}
.request-customer-edit-icon{
  height: 20px;
}
.request-customer-delete-icon{
  height: 20px;
}
</style>