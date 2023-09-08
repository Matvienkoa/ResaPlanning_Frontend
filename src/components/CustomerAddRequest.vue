<template>
  <div class="add-back">
    <div class="add-box">
      <div @click="closeAddBox()" class="close-add">X</div>
      <div v-if="addMode === ''" class="add-choice-box">
        <h2>Quel type de demande?</h2>
        <button @click="addOption('preparation')">Préparation</button>
        <button @click="addOption('slot')">Créneau</button>
      </div>
      <div v-if="addMode === 'preparation'" class="add-preparation-box">
        <p>préparation</p>
        <label for="preparation-form-deliveryDate">Date de livraison souhaitée</label>
        <input v-model="deliveryDate" @input="cancelError()" type="date" name="preparation-form-deliveryDate" id="preparation-form-deliveryDate" class="required">
        <label for="preparation-form-brand">Marque</label>
        <input v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand" class="required">
        <label for="preparation-form-model">Modèle</label>
        <input v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model" class="required">
        <label for="preparation-form-year">Année</label>
        <input v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year" class="required">
        <label for="preparation-form-immat">Immatriculation</label>
        <input v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat" class="required">
        <label for="preparation-form-kilometers">Km</label>
        <input v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers" class="required">
        <label for="preparation-form-condition">Etat du véhicule</label>
        <input v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition" class="required">
        <label for="vehicle-form-steps">Etapes souhaitées</label>
        <input v-model="steps" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <label for="vehicle-form-observations">Observations</label>
        <input v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="addPrepRequest()">Envoyer la demande</button>
      </div>
      <div v-if="addMode=== 'slot'" class="add-slot-box">
        <p>créneaux</p>
        <label for="preparation-form-date">Date souhaitée</label>
        <input v-model="date" @input="cancelError()" type="date" name="preparation-form-date" id="preparation-form-date" class="required">
        <label for="preparation-form-duration">Durée de l'intervention</label>
        <select @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration" class="required">
            <option value="half">Demi-Journée</option>
            <option value="day">Journée</option>
        </select>
        <label for="preparation-form-place">Lieux</label>
        <input v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place" class="required">
        <label for="vehicle-form-observations">Observations</label>
        <input v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="addSlotRequest()">Envoyer la demande</button>
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
  name: 'CustomerAddRequest',
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
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
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
    
  }
}
</script>


<style scoped>
.add-choice-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add-preparation-box, .add-slot-box{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>