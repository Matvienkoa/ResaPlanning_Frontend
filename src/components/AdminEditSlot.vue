<template>
<div class="edit-slot-back">
  <div class="edit-slot-box">
    <h2 class="add-box-title">Modifier le créneau</h2>
    <div class="edit-slot-form">
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
      <div class="box-choice-button">
        <button class="valid-button" @click="editSlot()">Modifier</button>
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
  name: 'AdminEditSlot',
  props: ['slotId'],
  data() {
    return {
      moment: moment,
      error: "",
      customer: null,
      observationsDepot: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      place: ""
    }
  },
  computed: {
    ...mapGetters(['getSlot', 'getCustomers', 'getEditBox'])
  },
  methods: {
    closeEditBox() {
        this.$store.state.editBox = 'closed'
    },
    editSlot() {
      instance.put(`/slot/${this.slotId}`, {
        place: this.place,
        observationsDepot: this.observationsDepot,
        customerId: this.customer,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.commit('EDIT_SLOT_TO_EVENTS_PLANNING', res.data)
              this.closeEditBox()
              this.$store.dispatch('getSlot', this.slotId)
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
    this.$store.dispatch('getSlot', this.slotId)
    .then((res) => {
      this.customer = res.data.customerId
      this.startDate = moment(res.data.start).format('YYYY-MM-DD')
      this.endDate = moment(res.data.end).format('YYYY-MM-DD')
      this.startTime = moment(res.data.start).format('LT')
      this.endTime = moment(res.data.end).format('LT')
      this.place = res.data.place
      this.observationsDepot = res.data.observationsDepot
    })
  },
}
</script>

<style>
.edit-slot-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.edit-slot-box{
  position: relative;
  width: 100%;
  max-width: 600px;
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
.edit-slot-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>