<template>
    <div class="invoice-back">
        <div class="invoice-box">
            <h2 class="add-box-title">Marquer comme facturée?</h2>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="invoicePrep()">Oui</button>
              <div class="cancel-button" @click="closeInvoiceBox()">Annuler</div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'AdminInvoicePreparation',
  props: ['preparationId', 'month'],
  data() {
    return {
      error: "",
      moment: moment,
    }
  },
  methods: {
    closeInvoiceBox() {
        this.$store.state.invoiceBox = 'closed'
    },
    invoicePrep() {
      instance.put(`/preparation/invoice/${this.preparationId}`)
      .then((res) => {
          if(res.status === 201) {
              this.$store.dispatch('getPreparationsCompletedBilled', moment(this.month).format())
              this.$store.dispatch('getPreparationsCompletedNoBilled')
              .then(() => {
                this.closeInvoiceBox()
              })
          }
      })
      .catch((error) => {
          this.error = error.response.data;
      })
    }
  }
}
</script>

<style scoped>
.invoice-back{
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
  z-index: 9;
}
.invoice-box{
  position: relative;
  width: 95%;
  max-width: 500px;
  min-height: 40%;
  max-height: 95%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
</style>