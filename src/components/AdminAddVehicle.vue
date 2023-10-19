<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Créer un nouveau véhicule</h2>
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
            <p class="form-label">Photos</p>
            <label class="form-label" for="vehicle-form-photos" id="vehicle-form-label-photos">
              <img crossorigin="anonymous" src="../assets/Icons/file.svg" alt="" class="file-icon" />
              <p>Sélectionnez jusqu'à 4 photos</p>
            </label>
            <input @change="onFileSelected" ref="photos" @input="cancelError()" type="file" multiple name="vehicle-form-photos" id="vehicle-form-photos">
            <div v-if="this.url1 || this.url2 || this.url3 || this.url4" class="photos-box">
              <img crossorigin="anonymous" v-if="this.url1" :src="this.url1" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url2" :src="this.url2" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url3" :src="this.url3" alt="" class="photo-selected">
              <img crossorigin="anonymous" v-if="this.url4" :src="this.url4" alt="" class="photo-selected">
            </div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="addVehicle()">Ajouter le véhicule</button>
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
      marketPrice: null,
      publicPrice: null,
      purchasePrice: null,
      frevos: "",
      frevosPrice: null,
      firstHand: false,
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
    checkBox(data) {
      if(data === true) {
        return 'yes'
      } else {
        return 'no'
      }
    },
    addVehicle() {
      const formData = new FormData();
      formData.append('brand', this.brand)
      formData.append('model', this.model)
      formData.append('year', this.year)
      formData.append('immat', this.immat)
      formData.append('kilometers', this.kilometers)
      formData.append('marketPrice', this.marketPrice)
      formData.append('publicPrice', this.publicPrice)
      formData.append('purchasePrice', this.purchasePrice)
      formData.append('frevos', this.frevos)
      formData.append('frevosPrice', this.frevosPrice)
      formData.append('firstHand', this.checkBox(this.firstHand))
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
.add-vehicle-form{
  max-width: 400px;
  width: 80%;
  display: flex;
  flex-direction: column;
}
.custom-checkbox{
  margin-bottom: 20px;
}
#vehicle-form-photos{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#vehicle-form-label-photos{
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1;
  margin-top: 10px;
  border: dotted 2px rgb(184, 184, 184);
  padding: 5%;
  border-radius: 20px;
  margin-bottom: 15px;
}
.file-icon{
  height: 40px;
  margin-right: 20px;
}
#vehicle-form-label-photos p{
  font-size: 0.8em;
  line-height: 0.9em;
  color: #707e8d;
}
.photos-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
}
.photo-selected{
  width: 45%;
  margin: 2.5%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
}
@media (max-width: 480px) {
  .photo-selected{
    width: 90%;
    height: 120px;
  }
}
</style>