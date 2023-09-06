<template>
    <div class="invoice-prep-back">
        <div class="invoice-prep-box">
            Marquer comme facturée?
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="invoicePrep()">Oui</button>
            <button @click="closeInvoiceBox()">Annuler</button>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminInvoicePreparation',
  props: ['preparationId'],
  data() {
    return {
      error: ""
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
              this.$store.dispatch('getPreparationsCompleted')
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

<style>
.invoice-prep-back{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.invoice-prep-box{
  position: relative;
  width: 70%;
  min-height: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 6;
}
</style>