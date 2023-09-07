<template>
    <div class="get-back">
        <div class="get-box">
            <img @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <h2 class="get-box-title">Nouvelles Demandes de préparation</h2>
            <div v-for="prepR in getPrepRequestsPending" :key="prepR.id">
                <div>{{prepR.customerId}} {{prepR.observationsCustomer}} {{prepR.deliveryDate}}</div>
                <div @click="openEditBox({mode: 'showPrepRequest', id: prepR.id})">voir</div>
                <div @click="openDeleteBox({mode: 'refusePrepRequest', id: prepR.id})">Refuser</div>
            </div>
            <AdminGetPrepRequest v-if="getEditBox === 'showPrepRequest'" :id="this.requestId" />
            <AdminRefusePrepRequest v-if="getDeleteBox === 'refusePrepRequest'" :id="this.requestId" />
            <AdminGetSlotRequest v-if="getEditBox === 'showSlotRequest'" :id="this.requestId" />
            <AdminRefuseSlotRequest v-if="getDeleteBox === 'refuseSlotRequest'" :id="this.requestId" />
            <h2 class="get-box-title">Demandes de créneaux</h2>
            <div v-for="slotR in getSlotRequestsPending" :key="slotR.id">
                <div>{{slotR.customerId}} {{slotR.observationsCustomer}} {{slotR.date}}</div>
                <div @click="openEditBox({mode: 'showSlotRequest', id: slotR.id})">voir</div>
                <div @click="openDeleteBox({mode: 'refuseSlotRequest', id: slotR.id})">Refuser</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
.get-back{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}
.get-box{
    position: relative;
    width: 90%;
    min-height: 70%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    z-index: 4;
}
.close-get{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
</style>