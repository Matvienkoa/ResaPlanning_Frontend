<template>
    <div class="get-back">
        <div class="get-box">
            <div @click="closeGetBox()" class="close-get">X</div>
            <p>Préparations à facturer</p>
            <div v-for="prep in getPreparationsBilling" :key="prep.id">
                {{prep.immat}} {{prep.brand}} {{prep.model}}
                <div @click="openInvoiceBox({mode: 'invoicePrep', id: prep.id})">Facturer</div>
            </div>
            <AdminInvoicePreparation v-if="getInvoiceBox === 'invoicePrep'" :preparationId="this.id" />
            <p>Préparations facturées</p>
            <div v-for="prep in getPreparationsBilled" :key="prep.id">
                {{prep.immat}} {{prep.brand}} {{prep.model}}
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