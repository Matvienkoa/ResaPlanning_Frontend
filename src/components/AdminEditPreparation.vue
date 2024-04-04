<template>
    <div class="edit-preparation-back">
        <div class="edit-preparation-box">
          <h2 class="add-box-title">Modifier la préparation</h2>
          <div class="edit-preparation-form">
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
            <label class="form-label" for="vehicle-form-maker">Préparation attribuée à :</label>
            <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="checkImmat()">Modifier</button>
              <div class="cancel-button" @click="closeEditBox()">Annuler</div>
            </div>
          </div>
          <div v-if="alertMode === 'alert'" class="alert-back">
            <div class="alert-box">
              <h2 class="add-box-title">Cette Immatriculation est déjà enregistrée</h2>
              <div class="box-choice-button">
                <button class="valid-button" @click="editPreparation()">Continuer</button>
                <div class="cancel-button" @click="cancelImmat()">Annuler</div>
              </div>
            </div>
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
  name: 'AdminEditPreparation',
  props: ['preparationId'],
  components: { 
    VueDatePicker 
  },
  setup() {
    const startDate = ref(null);
    const formatStart = (startDate) => {
      return moment(startDate).format('DD/MM/YYYY')
    }
    const endDate = ref(null);
    const formatEnd = (endDate) => {
      return moment(endDate).format('DD/MM/YYYY')
    }
    return {
      startDate,
      endDate,
      startTime: ref(null),
      endTime: ref(null),
      formatStart,
      formatEnd
    }
  },
  data() {
    return {
      moment: moment,
      alertMode: '',
      error: "",
      customer: null,
      brand: "",
      model: "",
      year: "",
      immat: "",
      kilometer: "",
      condition: "",
      observationsDepot: "",
      prestation: "",
      maker: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getCustomers', 'getEditBox'])
  },
  methods: {
    closeEditBox() {
        this.$store.state.editBox = 'closed'
    },
    checkImmat() {
      instance.post(`/preparation/check/${this.preparationId}`, {
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
              this.editPreparation()
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
    editPreparation() {
      instance.put(`/preparation/${this.preparationId}`, {
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
        maker: this.maker
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.commit('EDIT_PREPARATION_TO_EVENTS_PLANNING', res.data)
              this.closeEditBox()
              this.$store.dispatch('getPreparation', this.preparationId)
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
    this.$store.dispatch('getCustomers');
    this.$store.dispatch('getPreparation', this.preparationId)
    .then((res) => {
      this.customer = res.data.customerId
      this.startDate = moment(res.data.start).format('YYYY-MM-DD')
      this.endDate = moment(res.data.end).format('YYYY-MM-DD')
      this.startTime = {
        hours: moment(res.data.start).format('HH'),
        minutes: moment(res.data.start).format('mm')
      }
      this.endTime = {
        hours: moment(res.data.end).format('HH'),
        minutes: moment(res.data.end).format('mm')
      }
      this.brand = res.data.brand
      this.model = res.data.model
      this.year = res.data.year
      this.immat = res.data.immat
      this.kilometer = res.data.kilometer
      this.condition = res.data.condition
      this.observationsDepot = res.data.observationsDepot
      this.maker = res.data.maker
    })
  },
}
</script>

<style>
.edit-preparation-back{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.edit-preparation-box{
  position: relative;
  width: 95%;
  max-width: 800px;
  min-height: 90%;
  max-height: 95%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 11;
  border-radius: 10px;
}
.edit-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>

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
</style>