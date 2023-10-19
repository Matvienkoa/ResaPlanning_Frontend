<template>
  <div class="add-back">
    <Camera v-if="getCamera" @photo-captured="handlePhotoCapture" />
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
      <img crossorigin="anonymous" v-if="addMode === 'preparation' || addMode === 'slot' || addMode === 'preparationPhoto'" @click="closeAddMode(), cancelError()" src="../assets/Icons/arrow-back.svg" alt="" class="arrow-back" />
      <div v-if="addMode === ''" class="add-choice-box">
        <h2 class="add-box-title">Quel type de demande?</h2>
        <div class="box-choice-button">
          <button class="prep-button" @click="addOption('preparation')">Préparation</button>
          <button class="prep-photo-button" @click="addOption('preparationPhoto')">Préparation via Photo</button>
          <button class="slot-button" @click="addOption('slot')">Créneau</button>
        </div>
      </div>
      <div v-if="addMode === 'preparationPhoto'" class="add-preparationPhoto-box">
        <h2 class="second-title">Demande de préparation via photo</h2>
        <label class="form-label" for="add-photo-preparation-form-photo" id="add-photo-preparation-form-label-photo">
          <img crossorigin="anonymous" src="../assets/Icons/file.svg" alt="" class="file-icon" />
          <p>Sélectionner une photo</p>
        </label>
        <input @change="onFileSelected" ref="photo" @input="cancelError(), resetData()" type="file" name="add-photo-preparation-form-photo" id="add-photo-preparation-form-photo" class="required">
        <h3 class="option-txt">Ou</h3>
        <div class="button-photo" @click="startCamera()">
          <img crossorigin="anonymous" src="../assets/Icons/camera.svg" alt="" class="file-icon" />
          <p>Prendre une photo</p>
        </div>
        <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.getActualPhoto" :src="this.getActualPhoto" alt="" class="photo-selected">
        <label class="form-label" for="preparation-form-deliveryDate">Date de livraison souhaitée<span class="star">*</span></label>
        <input class="form-input required" v-model="deliveryDate" @input="cancelError()" type="date" name="preparation-form-deliveryDate" id="preparation-form-deliveryDate">
        <label class="form-label" for="preparation-form-brand">Marque</label>
        <input class="form-input" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
        <label class="form-label" for="preparation-form-model">Modèle</label>
        <input class="form-input" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
        <label class="form-label" for="preparation-form-year">Année</label>
        <input class="form-input" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
        <label class="form-label" for="preparation-form-immat">Immatriculation</label>
        <p class="form-password-infos">Ou numéro de série du véhicule</p>
        <input class="form-input" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
        <label class="form-label" for="preparation-form-kilometers">Km</label>
        <input class="form-input" v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers">
        <label class="form-label" for="preparation-form-condition">Etat du véhicule</label>
        <input class="form-input" v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition">
        <label class="form-label" for="vehicle-form-steps">Prestations souhaitées</label>
        <input class="form-input" v-model="steps" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button v-if="this.photo" class="add-button" @click="addPrepRequestPhoto()">Envoyer la demande</button>
        <button v-if="this.photoCamera" class="add-button" @click="addPrepRequestPhotoShoot()">Envoyer la demande</button>
      </div>
      <div v-if="addMode === 'preparation'" class="add-preparation-box">
        <h2 class="second-title">Demande de préparation</h2>
        <label class="form-label" for="preparation-form-deliveryDate">Date de livraison souhaitée<span class="star">*</span></label>
        <input class="form-input required" v-model="deliveryDate" @input="cancelError()" type="date" name="preparation-form-deliveryDate" id="preparation-form-deliveryDate">
        <label class="form-label" for="preparation-form-brand">Marque<span class="star">*</span></label>
        <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
        <label class="form-label" for="preparation-form-model">Modèle<span class="star">*</span></label>
        <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
        <label class="form-label" for="preparation-form-year">Année</label>
        <input class="form-input" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
        <label class="form-label" for="preparation-form-immat">Immatriculation<span class="star">*</span></label>
        <p class="form-password-infos">Ou numéro de série du véhicule</p>
        <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
        <label class="form-label" for="preparation-form-kilometers">Km</label>
        <input class="form-input" v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers">
        <label class="form-label" for="preparation-form-condition">Etat du véhicule</label>
        <input class="form-input" v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition">
        <label class="form-label" for="vehicle-form-steps">Prestations souhaitées</label>
        <input class="form-input" v-model="steps" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addPrepRequest()">Envoyer la demande</button>
      </div>
      <div v-if="addMode=== 'slot'" class="add-slot-box">
        <h2 class="second-title">Demande de créneau</h2>
        <label class="form-label" for="preparation-form-date">Date souhaitée<span class="star">*</span></label>
        <input class="form-input required" v-model="date" @input="cancelError()" type="date" name="preparation-form-date" id="preparation-form-date">
        <label class="form-label" for="preparation-form-duration">Durée de l'intervention<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration">
            <option value="half">Demi-Journée</option>
            <option value="day">Journée</option>
        </select>
        <label class="form-label" for="preparation-form-place">Lieux de la prestation<span class="star">*</span></label>
        <input class="form-input required" v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addSlotRequest()">Envoyer la demande</button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';
import Camera from '@/components/Camera.vue';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'CustomerAddRequest',
  components: {
    Camera
  },
  data() {
    return {
      moment: moment,
      addMode: '',
      error: "",
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometer: "",
      condition: "",
      steps: "",
      observationsCustomer: "",
      deliveryDate: "",
      date: "",
      duration: "",
      place: "",
      photoCamera: "",
      photo: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getProfile', 'getCamera', 'getActualPhoto'])
  },
  methods: {
    handlePhotoCapture(file) {
      this.photoCamera = file
    },
    startCamera() {
      this.$store.state.camera = true;
      this.resetData()
    },
    resetData() {
      this.photo = ""
      this.photoCamera = ""
      this.url = ""
      this.$store.state.actualPhoto = ""
    },
    onFileSelected(event) {
      this.photo = event.target.files[0];
      if(event.target.files[0]) {
        this.url = URL.createObjectURL(event.target.files[0])
      }
      this.$store.state.actualPhoto = ""
      this.photoCamera = ""
    },
    closeAddMode() {
      this.addMode = ''
      this.$store.state.actualPhoto = ""
      this.photoCamera = ""
      this.url = ""
      this.photo = ""
    },
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    addOption(option) {
      this.addMode = option
    },
    addPrepRequest() {
      instance.post('/preprequest/', {
        brand: this.brand,
        model: this.model,
        year: this.year,
        immat: this.immat,
        kilometer: this.kilometer,
        condition: this.condition,
        steps: this.steps,
        observationsCustomer: this.observationsCustomer,
        customerId: this.getProfile.id,
        company: this.getProfile.company,
        firstName: this.getProfile.firstName,
        lastName: this.getProfile.lastName,
        deliveryDate: this.deliveryDate
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.addBox = "closed"
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
    addPrepRequestPhotoShoot() {
      const formData = new FormData();
      formData.append('photo', this.photoCamera)
      formData.append('brand', this.brand)
      formData.append('model', this.model)
      formData.append('year', this.year)
      formData.append('immat', this.immat)
      formData.append('kilometer', this.kilometer)
      formData.append('condition', this.condition)
      formData.append('steps', this.steps)
      formData.append('observationsCustomer', this.observationsCustomer)
      formData.append('customerId', this.getProfile.id)
      formData.append('company', this.company)
      formData.append('firstName', this.firstName)
      formData.append('lastName', this.lastName)
      formData.append('deliveryDate', this.deliveryDate)
      instance.post('/preprequest/photo', formData)
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.addBox = "closed"
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
    addPrepRequestPhoto() {
      const formData = new FormData();
      formData.append('photo', this.photo)
      formData.append('brand', this.brand)
      formData.append('model', this.model)
      formData.append('year', this.year)
      formData.append('immat', this.immat)
      formData.append('kilometer', this.kilometer)
      formData.append('condition', this.condition)
      formData.append('steps', this.steps)
      formData.append('observationsCustomer', this.observationsCustomer)
      formData.append('customerId', this.getProfile.id)
      formData.append('company', this.company)
      formData.append('firstName', this.firstName)
      formData.append('lastName', this.lastName)
      formData.append('deliveryDate', this.deliveryDate)
      instance.post('/preprequest/photo', formData)
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.addBox = "closed"
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
    },
    addSlotRequest() {
      instance.post('/slotrequest/', {
        customerId: this.getProfile.id,
        company: this.getProfile.company,
        firstName: this.getProfile.firstName,
        lastName: this.getProfile.lastName,
        place: this.place,
        observationsCustomer: this.observationsCustomer,
        date: this.date,
        duration: this.duration
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.addBox = "closed"
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
    }
  },
  created: function () {
    this.$store.state.actualPhoto = ""
  }
}
</script>


<style scoped>
.prep-photo-button{
  margin: 0 10px;
  width: 200px;
  height: 35px;
  border-radius: 30px;
  background: green;
  color: white;
  font-size: 1.1em;
  border: solid 2px green;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.add-choice-box{
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.box-choice-button{
  flex-wrap: wrap;
}
.box-choice-button button{
  margin-bottom: 10px;
}
.add-preparation-box, .add-preparationPhoto-box, .add-slot-box{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
.second-title{
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2.3em;
}
#add-photo-preparation-form-photo{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#add-photo-preparation-form-label-photo, .button-photo{
  margin: auto;
  width: 80%;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 10px;
  border: dotted 2px rgb(184, 184, 184);
  padding: 5%;
  border-radius: 20px;
}
.button-photo{
  margin-bottom: 20px;
}
.file-icon{
  height: 40px;
  margin-right: 20px;
}
#add-photo-preparation-form-label-photo p, .button-photo p{
  font-size: 0.8em;
  line-height: 0.9em;
  color: #707e8d;
}
.option-txt{
  padding-top: 10px;
  text-align: center;
}
.photo-selected{
  margin-bottom: 20px;
}
@media (max-width: 480px) {
  .second-title{
    width: 80%;
  }
}
</style>

