<template>
  <div class="add-back">
    <div class="add-box">
      <div @click="closeAddBox()" class="close-add">X</div>
      <div v-if="addMode === ''" class="add-choice-box">
        <h2>Ajouter un évènement</h2>
        <p>{{date}}</p>
        <button @click="addOption('preparation')">Préparation</button>
        <button @click="addOption('slot')">Créneau</button>
      </div>
      <div v-if="addMode === 'preparation'" class="add-preparation-box">
        <p>préparation</p>
        <label for="preparation-form-customer">Séléctionner un Client :</label>
        <select @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer" class="required">
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label for="preparation-form-startTime">Heure de début</label>
        <input v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime" class="required">
        <label for="preparation-form-endTime">Heure de fin</label>
        <input v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime" class="required">
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
        <label for="vehicle-form-observations">Observations</label>
        <input v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <label for="vehicle-form-steps">Ajouter une étape de préparation</label>
        <input @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <div v-if="errorPrestation" class="error">{{ errorPrestation }}</div>
        <button @click="addStep()">Ajouter la prestation</button>
        <div>
          <div v-for="step in steps" :key="step">{{step}}<div @click="deleteStep(step)">X</div></div>
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="addPreparation()">Créer la préparation</button>
      </div>
      <div v-if="addMode=== 'slot'" class="add-slot-box">
        <p>créneaux</p>
        <label for="preparation-form-customer">Séléctionner un Client :</label>
        <select @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer" class="required">
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label for="preparation-form-startTime">Heure de début</label>
        <input v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime" class="required">
        <label for="preparation-form-endTime">Heure de fin</label>
        <input v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime" class="required">
        <label for="preparation-form-place">Lieux</label>
        <input v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place" class="required">
        <label for="vehicle-form-observations">Observations</label>
        <input v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="addSlot()">Créer le créneaux</button>
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
  name: 'AdminAddEventClick',
  props: ['date', 'day'],
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
        startdate: this.date,
        endDate: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
        steps: this.steps
      })
      .then((res) => {
          if(res.status === 201) {
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
        startDate: this.date,
        endDate: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
      })
      .then((res) => {
          if(res.status === 201) {
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
    if(this.day === false) {
      this.startTime = moment(this.date).format('LT')
    }
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