<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Modifier le véhicule</h2>
        <div class="add-vehicle-form">
            <label class="form-label" for="vehicle-form-brand">Marque<span class="star">*</span></label>
            <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="vehicle-form-brand" id="vehicle-form-brand">
            <label class="form-label" for="vehicle-form-model">Modèle<span class="star">*</span></label>
            <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="vehicle-form-model" id="vehicle-form-model">
            <label class="form-label" for="vehicle-form-year">Année<span class="star">*</span></label>
            <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="vehicle-form-year" id="vehicle-form-year">
            <label class="form-label" for="vehicle-form-immat">Immatriculation<span class="star">*</span></label>
            <p class="form-password-infos">Ou numéro de série du véhicule</p>
            <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="vehicle-form-immat" id="vehicle-form-immat">
            <label class="form-label" for="vehicle-form-kilometers">Km<span class="star">*</span></label>
            <input class="form-input required" v-model="kilometers" @input="cancelError()" type="text" name="vehicle-form-kilometers" id="vehicle-form-kilometers">
            <label class="form-label" for="vehicle-form-marketPrice">Prix marchand<span class="star">*</span></label>
            <input class="form-input required" v-model="marketPrice" @input="cancelError()" type="number" name="vehicle-form-marketPrice" id="vehicle-form-marketPrice">
            <label class="form-label" for="vehicle-form-publicPrice">Prix Public<span class="star">*</span></label>
            <input class="form-input required" v-model="publicPrice" @input="cancelError()" type="number" name="vehicle-form-publicPrice" id="vehicle-form-publicPrice">
            <label class="form-label" for="vehicle-form-purchasePrice">Prix d'Achat<span class="star">*</span></label>
            <input class="form-input required" v-model="purchasePrice" @input="cancelError()" type="number" name="vehicle-form-purchasePrice" id="vehicle-form-purchasePrice">
            <label class="form-label" for="vehicle-form-frevos">FREVOS</label>
            <input class="form-input" v-model="frevos" type="text" name="vehicle-form-frevos" id="vehicle-form-frevos">
            <label class="form-label" for="vehicle-form-frevosPrice">Montant FREVOS</label>
            <input class="form-input" v-model="frevosPrice" type="number" name="vehicle-form-frevosPrice" id="vehicle-form-frevosPrice">
            <div class="custom-checkbox">
              <input v-model="firstHand" type="checkbox" name="form-firstHand" id="form-firstHand">
              <label class="form-label-checkbox" for="form-firstHand">Première Main</label>
            </div>
            <label class="form-label" for="vehicle-form-observations">Observations</label>
            <input class="form-input" v-model="observations" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="editVehicle()">Modifier le véhicule</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminEditVehicle',
  data() {
    return {
      error: "",
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometers: "",
      marketPrice: null,
      publicPrice: null,
      purchasePrice: null,
      frevos: "",
      frevosPrice: null,
      firstHand: false,
      observations: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox'])
  },
  methods: {
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    checkBox(data) {
      if(data === true) {
        return 'yes'
      } else {
        return 'no'
      }
    },
    editVehicle() {
      instance.put(`/vehicle/${this.$route.params.id}`, {
        brand: this.brand,
        model: this.model,
        year: this.year,
        immat: this.immat,
        kilometers: this.kilometers,
        marketPrice: this.marketPrice,
        publicPrice: this.publicPrice,
        purchasePrice: this.purchasePrice,
        frevos: this.frevos,
        frevosPrice: this.frevosPrice,
        firstHand: this.checkBox(this.firstHand),
        observations: this.observations
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.editBox = "closed"
              this.$store.dispatch('getVehicle', this.$route.params.id);
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
    },
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id)
    .then((vehicle) => {
        this.brand = vehicle.data.brand
        this.model = vehicle.data.model
        this.year = vehicle.data.year
        this.immat = vehicle.data.immat
        this.kilometers = vehicle.data.kilometers
        this.marketPrice = vehicle.data.marketPrice / 100
        this.publicPrice = vehicle.data.publicPrice / 100
        this.purchasePrice = vehicle.data.purchasePrice / 100
        this.frevos = vehicle.data.frevos
        if(vehicle.data.frevosPrice) {
          this.frevosPrice = vehicle.data.frevosPrice / 100
        }
        if(vehicle.data.firstHand === 'yes') {
          this.firstHand = true
        }
        this.observations = vehicle.data.observations
    })
  }
}
</script>


<style scoped>
.add-vehicle-form{
  max-width: 400px;
  width: 80%;
  display: flex;
  flex-direction: column;
}
.custom-checkbox{
  margin-bottom: 20px;
}
</style>