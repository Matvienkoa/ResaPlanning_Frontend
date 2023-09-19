<template>
  <div class="add-back">
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="add-box-title">Modifier la demande</h2>
      <div class="add-account-form">
        <label class="form-label" for="preparation-form-deliveryDate">Date de livraison souhaitée<span class="star">*</span></label>
        <input class="form-input required" v-model="deliveryDate" @input="cancelError()" type="date" name="preparation-form-deliveryDate" id="preparation-form-deliveryDate">
        <label class="form-label" for="preparation-form-brand">Marque<span class="star">*</span></label>
        <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
        <label class="form-label" for="preparation-form-model">Modèle<span class="star">*</span></label>
        <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
        <label class="form-label" for="preparation-form-year">Année<span class="star">*</span></label>
        <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
        <label class="form-label" for="preparation-form-immat">Immatriculation<span class="star">*</span></label>
        <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
        <label class="form-label" for="preparation-form-kilometers">Km<span class="star">*</span></label>
        <input class="form-input required" v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers">
        <label class="form-label" for="preparation-form-condition">Etat du véhicule<span class="star">*</span></label>
        <input class="form-input required" v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition">
        <label class="form-label" for="vehicle-form-steps">Etapes souhaitées</label>
        <input class="form-input" v-model="steps" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="editPrepRequest()">Modifier la demande</button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'CustomerEditPrepRequest',
  props: ['id'],
  data() {
    return {
      moment: moment,
      error: "",
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometer: "",
      condition: "",
      steps: "",
      observationsCustomer: "",
      deliveryDate: ""
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    editPrepRequest() {
      instance.put(`/preprequest/${this.id}`, {
        brand: this.brand,
        model: this.model,
        year: this.year,
        immat: this.immat,
        kilometer: this.kilometer,
        condition: this.condition,
        steps: this.steps,
        observationsCustomer: this.observationsCustomer,
        customerId: this.getProfile.id,
        deliveryDate: this.deliveryDate
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.editBox = "closed"
              this.$store.dispatch('getRequests')
          }
      })
      .catch((error) => {
          this.error = error.response.data;
          const emptyInput = document.querySelectorAll('.required');
          emptyInput.forEach(input => {
              if(input.value === "") {
                  input.classList.add('empty')
              }
          })
      })
    },
    cancelError() {
      const emptyInput = document.querySelectorAll('.required');
      emptyInput.forEach(input => {
          if(input.value !== "") {
              input.classList.remove('empty')
          }
      })
      this.error = ''
    }
  },
  created: function () {
    this.$store.dispatch('getPrepRequest', this.id)
    .then((res) => {
        console.log(res)
        this.brand = res.data.brand
        this.model = res.data.model
        this.year = res.data.year
        this.immat = res.data.immat
        this.kilometer = res.data.kilometer
        this.condition = res.data.condition
        this.steps = res.data.steps
        this.observationsCustomer = res.data.observationsCustomer
        this.deliveryDate = moment(res.data.deliveryDate).format('YYYY-MM-DD')
    })
  }
}
</script>


<style scoped>
.add-box{
  justify-content: flex-start;
}
.edit-request-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>