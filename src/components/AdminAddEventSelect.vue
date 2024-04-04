<template>
  <div class="add-back">
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
      <img crossorigin="anonymous" v-if="addMode === 'preparation' || addMode === 'slot'" @click="closeAddMode()" src="../assets/Icons/arrow-back.svg" alt="" class="arrow-back" />
      <div v-if="addMode === ''" class="add-choice-box">
        <h2 v-if="day === true" class="add-box-title">Ajouter un évènement du : {{moment(startD).format('DD/MM/YYYY')}} au {{moment(endD).subtract(1, 'days').format('DD/MM/YYYY')}}</h2>
        <h2 v-if="day === false" class="add-box-title">Ajouter un évènement du : {{moment(startD).format('L')}} {{moment(startD).format('HH')}}H{{moment(startD).format('mm')}} au {{moment(endD).format('L')}} {{moment(endD).format('HH')}}H{{moment(endD).format('mm')}}</h2>
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
        <p class="form-label">Date de début<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="startDate" locale="fr" :format="formatStart" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Date de fin<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="endDate" locale="fr" :format="formatEnd" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Heure de début<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="startTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Heure de fin</p>
        <VueDatePicker class="picker" v-model="endTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="datepicker" />
        <label class="form-label" for="preparation-form-brand">Marque<span class="star">*</span></label>
        <input class="form-input required" v-model="brand" @input="cancelError()" type="text" name="preparation-form-brand" id="preparation-form-brand">
        <label class="form-label" for="preparation-form-model">Modèle<span class="star">*</span></label>
        <input class="form-input required" v-model="model" @input="cancelError()" type="text" name="preparation-form-model" id="preparation-form-model">
        <label class="form-label" for="preparation-form-year">Année<span class="star">*</span></label>
        <input class="form-input required" v-model="year" @input="cancelError()" type="text" name="preparation-form-year" id="preparation-form-year">
        <label class="form-label" for="preparation-form-immat">Immatriculation<span class="star">*</span></label>
        <p class="form-password-infos">Ou numéro de série du véhicule</p>
        <input class="form-input required input-immat" v-model="immat" @input="cancelError()" type="text" name="preparation-form-immat" id="preparation-form-immat">
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
          <div class="presta-box" v-for="step in steps" :key="step">{{step}}<img crossorigin="anonymous" class="presta-icon" src="../assets/Icons/presta.svg" @click="deleteStep(step)" alt=""/></div>
        </div>
        <label class="form-label" for="vehicle-form-maker">Préparation attribuée à :</label>
        <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="checkImmat()">Créer la préparation</button>
      </div>
      <div v-if="alertMode === 'alert'" class="alert-back">
        <div class="alert-box">
          <h2 class="add-box-title">Cette Immatriculation est déjà enregistrée</h2>
          <div class="box-choice-button">
            <button class="valid-button" @click="addPreparation()">Continuer</button>
            <div class="cancel-button" @click="cancelImmat()">Annuler</div>
          </div>
        </div>
      </div>
      <div v-if="addMode=== 'slot'" class="add-slot-box">
        <h2 class="second-title">Ajouter un créneau</h2>
        <label class="form-label" for="preparation-form-customer">Séléctionner un Client :<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer">
            <option v-if="getCustomers.length === 0" disabled selected value="">Aucun client trouvé</option>
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label class="form-label" for="preparation-form-duration">Durée de l'intervention<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration">
            <option value="half">Demi-Journée</option>
            <option value="day">Journée</option>
        </select>
        <p class="form-label">Date de début<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="startDate" locale="fr" :format="formatStart" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Date de fin<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="endDate" locale="fr" :format="formatEnd" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Heure de début<span class="star">*</span></p>
        <VueDatePicker class="picker" v-model="startTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="required datepicker" @update:model-value="cancelError()" />
        <p class="form-label">Heure de fin</p>
        <VueDatePicker class="picker" v-model="endTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="datepicker" />
        <label class="form-label" for="preparation-form-place">Lieux<span class="star">*</span></label>
        <input class="form-input required" v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <label class="form-label" for="vehicle-form-maker">Créneau attribué à :</label>
        <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="addSlot()">Créer le créneau</button>
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
  name: 'AdminAddEventSelect',
  props: ['startD', 'endD', 'day'],
  components: { 
    VueDatePicker 
  },
  setup(props) {
    const startDate = ref(props.startD);
    const formatStart = (startDate) => {
      return moment(startDate).format('DD/MM/YYYY')
    }
    const endDate = ref(moment(props.endD).subtract(1, 'days').format('YYYY-MM-DD'));
    const formatEnd = (endDate) => {
      return moment(endDate).format('DD/MM/YYYY')
    }
    return {
      startDate,
      endDate,
      startTime: ref({
        hours: "9",
        minutes: "0"
      }),
      endTime: ref(null),
      formatStart,
      formatEnd
    }
  },
  data() {
    return {
      moment: moment,
      addMode: '',
      alertMode: '',
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
      allDay: this.day,
      prestation: "",
      steps: [],
      place: "",
      maker: "",
      duration: ""
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
    checkImmat() {
      instance.post('/preparation/check/', {
          brand: this.brand,
          model: this.model,
          year: this.year,
          immat: this.immat,
          kilometer: this.kilometer,
          condition: this.condition,
          customerId: this.customer,
          startDate: moment(this.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.endDate).format('YYYY-MM-DD'),
          startTime: this.startTime
      })
      .then((res) => {
          if(res.data.length === 0) {
              this.addPreparation()
          } else {
              this.alertMode = 'alert'
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
    cancelImmat() {
        this.alertMode = ''
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
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        startTime: this.startTime,
        endTime: this.endTime,
        steps: this.steps,
        maker: this.maker
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
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        startTime: this.startTime,
        endTime: this.endTime,
        maker: this.maker,
        duration: this.duration
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
    if(this.day === false) {
      this.startDate = this.startD
      this.endDate = this.endD
      this.startTime = {
        hours: moment(this.startD).format('HH'),
        minutes: moment(this.startD).format('mm')
      }
      this.endTime = {
        hours: moment(this.endD).format('HH'),
        minutes: moment(this.endD).format('mm')
      }
    }
  }
}
</script>


<style scoped>
.alert-back{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.808);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}
.alert-box{
  position: relative;
  width: 90%;
  max-width: 500px;
  min-height: 30%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 12;
  border-radius: 10px;
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
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>