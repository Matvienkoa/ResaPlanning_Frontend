<template>
  <div class="add-back">
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
      <div class="add-preparation-box">
        <h2 class="second-title">Ajouter une préparation</h2>
        <label class="form-label">Heure de début<span class="star">*</span></label>
        <VueDatePicker class="picker" v-model="startTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="required datepicker" @update:model-value="cancelError()" />
        <!-- <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime"> -->
        <label class="form-label">Heure de fin</label>
        <VueDatePicker class="picker" v-model="endTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="datepicker" />
        <!-- <input class="form-input" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime"> -->
        <label class="form-label" for="preparation-form-brand">Marque<span class="star">*</span></label>
        <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
        <label class="form-label" for="preparation-form-model">Modèle<span class="star">*</span></label>
        <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
        <label class="form-label" for="preparation-form-year">Année<span class="star">*</span></label>
        <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
        <label class="form-label" for="preparation-form-immat">Immatriculation<span class="star">*</span></label>
        <p class="form-password-infos">Ou numéro de série du véhicule</p>
        <input class="form-input required" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
        <label class="form-label" for="preparation-form-kilometers">Km<span class="star">*</span></label>
        <input class="form-input required" v-model="kilometer" @input="cancelError()" type="text" name="preparation-form-kilometers" id="preparation-form-kilometers">
        <label class="form-label" for="preparation-form-condition">Etat du véhicule<span class="star">*</span></label>
        <input class="form-input required" v-model="condition" @input="cancelError()" type="text" name="preparation-form-condition" id="preparation-form-condition">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <label class="form-label" for="vehicle-form-steps">Ajouter une prestation</label>
        <input class="form-input" @input="cancelErrorPrestation()" v-model="prestation" type="text" name="vehicle-form-steps" id="vehicle-form-steps">
        <div v-if="errorPrestation" class="error error-step">{{ errorPrestation }}</div>
        <button class="add-presta-button" @click="addStep()">Ajouter la prestation</button>
        <div class="prestas-box">
          <div class="presta-box" v-for="step in steps" :key="step">
            {{step}}
            <img crossorigin="anonymous" class="presta-icon" src="../assets/Icons/presta.svg" @click="deleteStep(step)" alt=""/>
          </div>
        </div>
        <label class="form-label" for="vehicle-form-maker">Préparation attribuée à :</label>
        <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addPreparation()">Créer la préparation</button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'AdminAddPreparationSlot',
  props: ['date', 'slotId', 'customerId'],
  components: { 
    VueDatePicker 
  },
  setup() {
    return {
      startTime: ref({
        hours: "9",
        minutes: "0"
      }),
      endTime: ref(null)
    }
  },
  data() {
    return {
      moment: moment,
      error: "",
      errorPrestation: "",
      customer: this.customerId,
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometer: "",
      condition: "",
      observationsDepot: "",
      prestation: "",
      steps: [],
      place: "",
      maker: ""
    }
  },
  computed: {
    ...mapGetters(['getCustomers'])
  },
  methods: {
    closeAddBox() {
      this.$store.state.addBox = "closed"
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
        startDate: moment(this.date).format('YYYY-MM-DD'),
        endDate: moment(this.date).format('YYYY-MM-DD'),
        startTime: this.startTime,
        endTime: this.endTime,
        steps: this.steps,
        maker: this.maker,
        slotId: this.slotId
      })
      .then((res) => {
          if(res.status === 201) {
            this.$store.commit('ADD_PREPARATION_TO_EVENTS_PLANNING', res.data)
            this.$store.commit('ADD_PREPARATION_SLOT', res.data)
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
    }
  },
  created: function () {
    this.$store.dispatch('getCustomers');
  }
}
</script>

<style scoped>
.add-back{
  z-index: 8;
}
.add-box{
  z-index: 9;
}
.add-preparation-box{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>