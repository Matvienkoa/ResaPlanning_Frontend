<template>
    <div class="get-back">
        <AdminInvoicePreparation v-if="getInvoiceBox === 'invoicePrep'" :preparationId="this.id" />
        <div class="get-box">
            <img @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
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
                        <img @click="openInvoiceBox({mode: 'invoicePrep', id: prep.id})" src="../assets/Icons/invoice.svg" alt="" class="invoice-icon" />
                    </div>
                </div>
                <div class="get-preps-box">
                    <div class="get-requests-title-box">
                        <h2 class="get-requests-title">Préparations facturées</h2>
                    </div>
                    <div class="prep-request" v-for="prep in getPreparationsBilled" :key="prep.id">
                        <div class="prep-request-infos">
                            <p class="prep-request-info">{{prep.immat}}</p>
                            <p class="prep-request-info">{{prep.brand}}</p>
                            <p class="prep-request-info">{{prep.model}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AdminInvoicePreparation from '@/components/AdminInvoicePreparation.vue';

export default {
    name: 'AdminGetBillings',
    components: {
        AdminInvoicePreparation
    },
    data() {
        return {
            id: null
        }
  },
  computed: {
    ...mapGetters(['getPreparationsBilling', 'getPreparationsBilled', 'getInvoiceBox'])
  },
  methods: {
    openInvoiceBox(data) {
        this.id = data.id
        this.$store.state.invoiceBox = data.mode
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
    }
  },
  created: function () {
        this.$store.dispatch('getPreparationsCompleted')
    }
}
</script>

<style scoped>
.get-box{
    position: relative;
    width: 60%;
    max-width: 800px;
    min-height: 70%;
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
  margin-bottom: 15px;
  margin-top: 15px;
}
.get-requests-title{
  font-size: 1.3em;
}
.prep-request{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
  padding: 0.4em 0;
}
.prep-request-infos{
  display: flex;
}
.prep-request-info{
  margin-left: 5px;
  margin-right: 5px;
}
.invoice-icon{
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
}
</style>