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
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="editPreparation()">Modifier la préparation</button>
              <div class="cancel-button" @click="closeEditBox()">Annuler</div>
            </div>
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
  name: 'AdminEditPreparation',
  props: ['preparationId'],
  data() {
    return {
      moment: moment,
      error: "",
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
      prestation: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getCustomers', 'getEditBox'])
  },
  methods: {
    closeEditBox() {
        this.$store.state.editBox = 'closed'
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
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime
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
      this.startTime = moment(res.data.start).format('LT')
      this.endTime = moment(res.data.end).format('LT')
      this.brand = res.data.brand
      this.model = res.data.model
      this.year = res.data.year
      this.immat = res.data.immat
      this.kilometer = res.data.kilometer
      this.condition = res.data.condition
      this.observationsDepot = res.data.observationsDepot
    })
  },
}
</script>

<style>
.edit-preparation-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.edit-preparation-box{
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: 90%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
.edit-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>