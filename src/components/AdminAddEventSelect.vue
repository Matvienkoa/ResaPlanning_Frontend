<template>
  <div class="add-back">
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
      <img crossorigin="anonymous" v-if="addMode === 'preparation' || addMode === 'slot'" @click="closeAddMode()" src="../assets/Icons/arrow-back.svg" alt="" class="arrow-back" />
      <div v-if="addMode === ''" class="add-choice-box">
        <h2 class="add-box-title">Ajouter un évènement du : {{moment(startD).format('LL')}} au {{moment(endD).format('LL')}}</h2>
        <div class="box-choice-button">
          <button class="prep-button" @click="addOption('preparation')">Préparation</button>
          <button class="slot-button" @click="addOption('slot')">Créneau</button>
        </div>
      </div>
      <div v-if="addMode === 'preparation'" class="add-preparation-box">
        <h2 class="second-title">Ajouter une préparation</h2>
        <label class="form-label" for="preparation-form-customer">Séléctionner un Client :<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer">
            <option v-if="getCustomers.length === 0" disabled selected value="">Aucun client trouvé</option>
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label class="form-label" for="preparation-form-startDate">Date de début<span class="star">*</span></label>
        <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate">
        <label class="form-label" for="preparation-form-endDate">Date de fin<span class="star">*</span></label>
        <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate">
        <label class="form-label" for="preparation-form-startTime">Heure de début<span class="star">*</span></label>
        <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime">
        <label class="form-label" for="preparation-form-endTime">Heure de fin<span class="star">*</span></label>
        <input class="form-input required" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime">
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
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <label class="form-label" for="vehicle-form-steps">Ajouter une étape de préparation</label>
        <input class="form-input" @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <div v-if="errorPrestation" class="error">{{ errorPrestation }}</div>
        <button class="add-presta-button" @click="addStep()">Ajouter la prestation</button>
        <div class="prestas-box">
          <div class="presta-box" v-for="step in steps" :key="step">{{step}}<img crossorigin="anonymous" class="presta-icon" src="../assets/Icons/presta.svg" @click="deleteStep(step)" alt=""/></div>
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addPreparation()">Créer la préparation</button>
      </div>
      <div v-if="addMode=== 'slot'" class="add-slot-box">
        <h2 class="second-title">Ajouter un créneaux</h2>
        <label class="form-label" for="preparation-form-customer">Séléctionner un Client :<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer">
            <option v-if="getCustomers.length === 0" disabled selected value="">Aucun client trouvé</option>
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label class="form-label" for="preparation-form-startDate">Date de début<span class="star">*</span></label>
        <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate">
        <label class="form-label" for="preparation-form-endDate">Date de fin<span class="star">*</span></label>
        <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate">
        <label class="form-label" for="preparation-form-startTime">Heure de début<span class="star">*</span></label>
        <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime">
        <label class="form-label" for="preparation-form-endTime">Heure de fin<span class="star">*</span></label>
        <input class="form-input required" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime">
        <label class="form-label" for="preparation-form-place">Lieux<span class="star">*</span></label>
        <input class="form-input required" v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addSlot()">Créer le créneaux</button>
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
  name: 'AdminAddEventSelect',
  props: ['startD', 'endD', 'day'],
  data() {
    return {
      moment: moment,
      addMode: '',
      error: "",
      errorPrestation: "",
      customer: null,
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometer: "",
      condition: "",
      observationsDepot: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      allDay: this.day,
      prestation: "",
      steps: [],
      place: ""
    }
  },
  computed: {
    ...mapGetters(['getCustomers'])
  },
  methods: {
    closeAddMode() {
      this.addMode = ''
    },
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    addOption(option) {
      this.addMode = option
    },
    addStep() {
      if(this.prestation !== "") {
        const index = this.steps.findIndex(s => s === this.prestation)
        if(index === -1) {
          this.steps.push(this.prestation);
          this.prestation = "";
        } else {
          this.errorPrestation = "Cette prestation est déjà présente";
        }
        
      } else {
        this.errorPrestation = "Merci d'ajouter une prestation";
        const prestationInput = document.getElementById('vehicle-form-steps');
        prestationInput.classList.add('empty');
      }
      
    },
    deleteStep(step) {
      const index = this.steps.findIndex(s => s === step)
      if(index !== -1) {
        this.steps.splice(index, 1)
      }
    },
    addPreparation() {
      instance.post('/preparation/', {
        brand: this.brand,
        model: this.model,
        year: this.year,
        immat: this.immat,
        kilometer: this.kilometer,
        condition: this.condition,
        observationsDepot: this.observationsDepot,
        customerId: this.customer,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        steps: this.steps
      })
      .then((res) => {
          if(res.status === 201) {
            this.$store.commit('ADD_PREPARATION_TO_EVENTS_PLANNING', res.data)
            this.$store.state.addBox = "closed"
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
    cancelErrorPrestation() {
      const prestationInput = document.getElementById('vehicle-form-steps')
      if(prestationInput.value !== "") {
        prestationInput.classList.remove('empty')
      }
      this.errorPrestation = ''
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
    addSlot() {
      instance.post('/slot/', {
        customerId: this.customer,
        place: this.place,
        observationsDepot: this.observationsDepot,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
      })
      .then((res) => {
          if(res.status === 201) {
            this.$store.commit('ADD_SLOT_TO_EVENTS_PLANNING', res.data)
            this.$store.state.addBox = "closed"
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
    this.$store.dispatch('getCustomers');
    if(this.day === true) {
      this.startDate = moment(this.startD).format('YYYY-MM-DD')
      this.endDate = moment(this.endD).subtract(1, 'days').format('YYYY-MM-DD')
    }
    if(this.day === false) {
      this.startDate = moment(this.startD).format('YYYY-MM-DD')
      this.endDate = moment(this.endD).format('YYYY-MM-DD')
      this.startTime = moment(this.startD).format('LT')
      this.endTime = moment(this.endD).format('LT')
    }
  }
}
</script>


<style scoped>
.add-box{
  justify-content: flex-start;
}
.add-choice-box{
    width: 100%;
    margin: auto;
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