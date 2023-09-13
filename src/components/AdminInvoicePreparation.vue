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

<style scoped>
.invoice-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.invoice-box{
  position: relative;
  width: 60%;
  max-width: 600px;
  min-height: 50%;
  max-height: 90%;
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