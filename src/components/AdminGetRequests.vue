<template>
    <div class="get-back">
      <AdminGetPrepRequest v-if="getEditBox === 'showPrepRequest'" :id="this.requestId" />
      <AdminRefusePrepRequest v-if="getDeleteBox === 'refusePrepRequest'" :id="this.requestId" />
      <AdminGetSlotRequest v-if="getEditBox === 'showSlotRequest'" :id="this.requestId" />
      <AdminRefuseSlotRequest v-if="getDeleteBox === 'refuseSlotRequest'" :id="this.requestId" />
        <div class="get-box">
            <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <div class="get-requests-box">
              <div class="get-preps-box">
                <div class="get-requests-title-box">
                  <h2 class="get-requests-title">Nouvelles demandes de préparation</h2>
                </div>
                <h3 v-if="getPrepRequestsPending.length === 0" class="no-request">Aucune nouvelle demande pour le moment</h3>
                <div class="prep-request" v-for="prepR in getPrepRequestsPending" :key="prepR.id">
                  <div class="prep-request-infos">
                    <p class="prep-request-info">Le {{moment(prepR.createdAt).format('LL')}}</p>
                    <p class="prep-request-info">{{prepR.company}}</p>
                    <p class="prep-request-info">{{prepR.firstName}}</p>
                    <p class="prep-request-info">{{prepR.lastName}}</p>
                  </div>
                  <div class="prep-request-actions">
                    <div @click="openEditBox({mode: 'showPrepRequest', id: prepR.id})" class="requests-icon-box">
                      <img crossorigin="anonymous" class="requests-icon" src="../assets/Icons/eye-green.svg" alt="" />
                    </div>
                    <div @click="openDeleteBox({mode: 'refusePrepRequest', id: prepR.id})" class="requests-icon-box">
                      <img crossorigin="anonymous" class="requests-icon" src="../assets/Icons/refuse.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="get-slots-box">
                <div class="get-requests-title-box">
                  <h2 class="get-requests-title">Nouvelles demandes de créneaux</h2>
                </div>
                <h3 v-if="getSlotRequestsPending.length === 0" class="no-request">Aucune nouvelle demande pour le moment</h3>
                <div class="slot-request" v-for="slotR in getSlotRequestsPending" :key="slotR.id">
                  <div class="slot-request-infos">
                    <p class="slot-request-info">Le {{moment(slotR.createdAt).format('LL')}}</p>
                    <p class="slot-request-info">{{slotR.company}}</p>
                    <p class="slot-request-info">{{slotR.firstName}}</p>
                    <p class="slot-request-info">{{slotR.lastName}}</p>
                  </div>
                  <div class="slot-request-actions">
                    <div @click="openEditBox({mode: 'showSlotRequest', id: slotR.id})" class="requests-icon-box">
                      <img crossorigin="anonymous" class="requests-icon" src="../assets/Icons/eye-green.svg" alt="" />
                    </div>
                    <div @click="openDeleteBox({mode: 'refuseSlotRequest', id: slotR.id})" class="requests-icon-box">
                      <img crossorigin="anonymous" class="requests-icon" src="../assets/Icons/refuse.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

import AdminGetPrepRequest from '@/components/AdminGetPrepRequest.vue';
import AdminRefusePrepRequest from '@/components/AdminRefusePrepRequest.vue';
import AdminGetSlotRequest from '@/components/AdminGetSlotRequest.vue';
import AdminRefuseSlotRequest from '@/components/AdminRefuseSlotRequest.vue';

export default {
  name: 'AdminGetRequests',
  components: {
      AdminGetPrepRequest,
      AdminRefusePrepRequest,
      AdminGetSlotRequest,
      AdminRefuseSlotRequest
  },
  data() {
    return {
      moment: moment,
      requestId: null
    }
  },
  computed: {
    ...mapGetters(['getPrepRequestsPending', 'getSlotRequestsPending', 'getEditBox', 'getDeleteBox'])
  },
  methods: {
    closeGetBox() {
      this.$store.state.getBox = "closed"
    },
    openEditBox(data) {
      this.requestId = data.id
      this.$store.state.editBox = data.mode
    },
    openDeleteBox(data) {
      this.requestId = data.id
      this.$store.state.deleteBox = data.mode
    },
  },
  created: function () {
    this.$store.dispatch('getRequestsPending')
  }
}
</script>

<style scoped>
.get-box{
  position: relative;
  width: 95%;
  max-width: 800px;
  min-height: 40%;
  max-height: 95%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
  padding-bottom: 2em;
}
.get-requests-box{
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.get-preps-box, .get-slots-box{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.get-requests-title-box{
  width: 100%;
  height: 40px;
  border-bottom: 3px solid #c0c0c0;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.get-requests-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
}
.prep-request, .slot-request{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  padding: 0.4em 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.prep-request-infos, .slot-request-infos{
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
}
.prep-request-info, .slot-request-info{
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 600;
}
.prep-request-actions, .slot-request-actions{
  display: flex;
}
.requests-icon-box{
  height: 35px;
  width: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: white;
  margin-right: 5px;
}
.requests-icon{
  height: 20px;
}
</style>