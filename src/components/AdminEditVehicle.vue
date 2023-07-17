<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeEditBox()" class="close-add">X</div>
        <h2>Modifier le véhicule</h2>
        <div class="add-vehicle-form">
            <label for="vehicle-form-brand">Marque</label>
            <input v-model="brand" @input="cancelError()" type="text" name="vehicle-form-brand" id="vehicle-form-brand" class="required">
            <label for="vehicle-form-model">Modèle</label>
            <input v-model="model" type="text" name="vehicle-form-model" id="vehicle-form-model" class="required">
            <label for="vehicle-form-year">Année</label>
            <input v-model="year" type="text" name="vehicle-form-year" id="vehicle-form-year" class="required">
            <label for="vehicle-form-immat">Immatriculation</label>
            <input v-model="immat" type="text" name="vehicle-form-immat" id="vehicle-form-immat" class="required">
            <label for="vehicle-form-kilometers">Km</label>
            <input v-model="kilometers" type="text" name="vehicle-form-kilometers" id="vehicle-form-kilometers" class="required">
            <label for="vehicle-form-price">Prix marchand</label>
            <input v-model="price" type="number" name="vehicle-form-price" id="vehicle-form-price" class="required">
            <label for="vehicle-form-observations">Observations</label>
            <input v-model="observations" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="editVehicle()">Modifier le véhicule</button>
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
      price: null,
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
    editVehicle() {
      instance.put(`/vehicle/${this.$route.params.id}`, {
        brand: this.brand,
        model: this.model,
        year: this.year,
        immat: this.immat,
        kilometers: this.kilometers,
        price: this.price,
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
      console.log(vehicle)
        this.brand = vehicle.data.brand
        this.model = vehicle.data.model
        this.year = vehicle.data.year
        this.immat = vehicle.data.immat
        this.kilometers = vehicle.data.kilometers
        this.price = vehicle.data.price
        this.observations = vehicle.data.observations
    })
  }
}
</script>


<style scoped>
.add-vehicle-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>