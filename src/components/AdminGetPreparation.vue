<template>
  <div class="get-back">
    <div class="get-box">
      <div @click="closeGetBox()" class="close-get">X</div>
      <div v-if="mode === ''" class="get-infos-box">
        <div @click="setMode('edit')" class="edit-infos-icon">Edit</div>
        <p>Préparation pour le véhicule :</p>
        <p>{{getPreparation.immat}}</p>
        <p>{{getPreparation.brand}}</p>
        <p>{{getPreparation.model}}</p>
        <p>{{getPreparation.year}}</p>
      </div>
      <div v-if="mode === ''" class="get-steps-box">
        <div v-for="step in getPreparation.steps" :key="step.id" class="step-box">
          {{step.type}}
          <div @click="setStepMode('edit')">Modifier</div>
        </div>
      </div>
      <div v-if="stepMode === 'edit'" class="edit-step-back">
        <div class="edit-step-box">
          modifier l'étape
          <button>Modifier</button>
          <button @click="setStepMode('')">Annuler</button>
        </div>
      </div>
      <div v-if="mode === 'edit'" class="edit-infos-box">
        <label for="preparation-form-customer">Client :</label>
        <select @change="cancelError()" v-model="customer" name="preparation-form-customer" id="preparation-form-customer" class="required">
            <option v-for="customer in getCustomers" :key="customer.id" :value="customer.id">{{customer.company}}</option>
        </select>
        <label for="preparation-form-startDate">Date de début</label>
        <input v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate" class="required">
        <label for="preparation-form-endDate">Date de fin</label>
        <input v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate" class="required">
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
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="editPreparation()">Modifier la préparation</button>
        <button @click="setMode('')">Annuler</button>
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
  name: 'AdminGetPreparation',
  props: ['id'],
  data() {
    return {
      moment: moment,
      mode: "",
      stepMode: "",
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
      prestation: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getCustomers'])
  },
  methods: {
    setStepMode(mode) {
      this.stepMode = mode
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
    },
    setMode(mode) {
      this.mode = mode
    },
    editPreparation() {
      instance.put(`/preparation/${this.id}`, {
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
              this.mode = ""
              this.$store.dispatch('getPreparation', this.id)
              .then((res) => {
                console.log(res.data)
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
    this.$store.dispatch('getPreparation', this.id)
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
  }
}
</script>

<style>
.get-back{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}
.get-box{
    position: relative;
    width: 90%;
    min-height: 70%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    z-index: 4;
}
.close-get{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
.get-infos-box{
  width: 90%;
  position: relative;
}
.edit-infos-icon{
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
}
.edit-infos-box{
  width: 90%;
  display: flex;
  flex-direction: column;
}

.get-steps-box{
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.step-box{
  width: 100px;
  height: 80px;
  border: red solid 1px;
}

.edit-step-back{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.edit-step-box{
  position: relative;
  width: 70%;
  min-height: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 6;
}
</style>