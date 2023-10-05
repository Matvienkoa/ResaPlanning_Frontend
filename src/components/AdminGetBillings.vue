<template>
    <div class="get-back">
        <AdminInvoicePreparation v-if="getInvoiceBox === 'invoicePrep'" :preparationId="this.id" :month="this.month" />
        <div class="get-box">
            <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
            <div class="get-requests-box">
                <div class="get-preps-box">
                    <div class="get-requests-title-box">
                        <h2 class="get-requests-title">Préparations à facturer</h2>
                    </div>
                    <div class="prep-request" v-for="prep in getPreparationsBilling" :key="prep.id">
                        <div class="prep-request-infos">
                            <p class="prep-request-info">{{prep.immat}}</p>
                            <p class="prep-request-info">{{prep.brand}}</p>
                            <p class="prep-request-info">{{prep.model}}</p>
                        </div>
                        <div @click="openInvoiceBox({mode: 'invoicePrep', id: prep.id})" class="invoice-icon-box">
                          <img crossorigin="anonymous" src="../assets/Icons/invoice-red.svg" alt="" class="invoice-icon" />
                        </div>
                    </div>
                </div>
                <div class="get-preps-box">
                    <div class="get-requests-title-box">
                        <h2 class="get-requests-title">Préparations facturées</h2>
                    </div>
                    <input @change="updatePrepBilled()" type="month" v-model="month" name="" id="month-input">
                    <div class="prep-request" v-for="prep in getPreparationsBilled" :key="prep.id">
                        <div class="prep-request-infos">
                            <p class="prep-request-info">{{prep.immat}}</p>
                            <p class="prep-request-info">{{prep.brand}}</p>
                            <p class="prep-request-info">{{prep.model}}</p>
                        </div>
                        <div class="invoice-icon-box billed">
                          <img crossorigin="anonymous" src="../assets/Icons/invoice-green.svg" alt="" class="invoice-icon" />
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

import AdminInvoicePreparation from '@/components/AdminInvoicePreparation.vue';

export default {
  name: 'AdminGetBillings',
  components: {
    AdminInvoicePreparation
  },
  data() {
    return {
        id: null,
        moment: moment,
        month: moment(new Date()).format('yyyy-MM')
    }
  },
  computed: {
    ...mapGetters(['getPreparationsBilling', 'getPreparationsBilled', 'getInvoiceBox'])
  },
  methods: {
    updatePrepBilled() {
      this.$store.dispatch('getPreparationsCompletedBilled', moment(this.month).format())
    },
    openInvoiceBox(data) {
        this.id = data.id
        this.$store.state.invoiceBox = data.mode
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
    }
  },
  created: function () {
      this.$store.dispatch('getPreparationsCompletedBilled', new Date())
      this.$store.dispatch('getPreparationsCompletedNoBilled')
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
.get-preps-box{
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
  margin-bottom: 15px;
  margin-top: 15px;
}
.get-requests-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
}
.prep-request{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  padding: 0.4em 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.prep-request-infos{
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
}
.prep-request-info{
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 600;
}
.invoice-icon-box{
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
.invoice-icon{
  height: 20px;
}
.billed{
  cursor: unset;
}
#month-input{
  width: 180px;
  padding: 0 10px;
  height: 40px;
  font-size: 1.3em;
  margin: auto;
  margin-bottom: 20px;
  border: #2c3e50 solid 3px;
  border-radius: 20px;
}
#month-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
</style>