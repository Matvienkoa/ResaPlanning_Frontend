<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Ajouter un véhicule</h2>
        <div class="add-vehicle-form">
            <label class="form-label" for="vehicle-form-brand">Marque<span class="star">*</span></label>
            <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="vehicle-form-brand" id="vehicle-form-brand">
            <label class="form-label" for="vehicle-form-model">Modèle<span class="star">*</span></label>
            <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="vehicle-form-model" id="vehicle-form-model">
            <label class="form-label" for="vehicle-form-year">Année<span class="star">*</span></label>
            <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="vehicle-form-year" id="vehicle-form-year">
            <label class="form-label" for="vehicle-form-immat">Immatriculation<span class="star">*</span></label>
            <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="vehicle-form-immat" id="vehicle-form-immat">
            <label class="form-label" for="vehicle-form-kilometers">Km<span class="star">*</span></label>
            <input class="form-input required" v-model="kilometers" @input="cancelError()" type="text" name="vehicle-form-kilometers" id="vehicle-form-kilometers">
            <label class="form-label" for="vehicle-form-price">Prix marchand<span class="star">*</span></label>
            <input class="form-input required" v-model="price" @input="cancelError()" type="number" name="vehicle-form-price" id="vehicle-form-price">
            <label class="form-label" for="vehicle-form-observations">Observations</label>
            <input class="form-input" v-model="observations" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
            <label class="form-label" for="vehicle-form-photos">Photos</label>
            <input @change="onFileSelected" ref="photos" @input="cancelError()" type="file" multiple name="vehicle-form-photos" id="vehicle-form-photos">
            <div class="photos-box">
              <img crossorigin="anonymous" v-if="this.url1" :src="this.url1" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url2" :src="this.url2" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url3" :src="this.url3" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url4" :src="this.url4" alt="" class="photo-selected">
            </div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="addVehicle()">Créer le véhicule</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminAddVehicle',
  data() {
    return {
      error: "",
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometers: "",
      price: null,
      observations: "",
      photos: [],
      url1: "",
      url2: "",
      url3: "",
      url4: ""
    }
  },
  computed: {
    ...mapGetters(['getAddBox'])
  },
  methods: {
    onFileSelected(event) {
      this.photos = event.target.files;
      if(event.target.files[0]) {
        this.url1 = URL.createObjectURL(event.target.files[0]);
      }
      if(event.target.files[1]) {
        this.url2 = URL.createObjectURL(event.target.files[1]);
      }
      if(event.target.files[2]) {
        this.url3 = URL.createObjectURL(event.target.files[2]);
      }
      if(event.target.files[3]) {
        this.url4 = URL.createObjectURL(event.target.files[3]);
      }
    },
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    addVehicle() {
      const formData = new FormData();
      formData.append('brand', this.brand)
      formData.append('model', this.model)
      formData.append('year', this.year)
      formData.append('immat', this.immat)
      formData.append('kilometers', this.kilometers)
      formData.append('price', this.price)
      formData.append('observations', this.observations)
      for (let i = 0; i < this.photos.length; i++) {
        formData.append('photos', this.photos[i]);
      }
      instance.post('/vehicle/', formData)
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.addBox = "closed"
              this.$store.dispatch('getVehicles')
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
}
</script>


<style scoped>
.add-box{
  justify-content: flex-start;
}
.add-vehicle-form{
  max-width: 400px;
  width: 80%;
  display: flex;
  flex-direction: column;
}
.photos-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.photo-selected{
  width: 45%;
  height: 120px;
  object-fit: cover;
}
</style>