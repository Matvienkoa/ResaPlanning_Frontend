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
      <label class="form-label" for="preparation-form-duration">Durée de l'intervention<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration">
            <option value="half">Demi-Journée</option>
            <option value="day">Journée</option>
        </select>
      <label class="form-label">Date de début<span class="star">*</span></label>
      <VueDatePicker class="picker" v-model="startDate" locale="fr" :format="formatStart" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
      <!-- <input class="form-input required" v-model="startDate" @input="cancelError()" type="date" name="preparation-form-startDate" id="preparation-form-startDate"> -->
      <label class="form-label">Date de fin<span class="star">*</span></label>
      <VueDatePicker class="picker" v-model="endDate" locale="fr" :format="formatEnd" :enable-time-picker="false" auto-apply month-name-format="long" select-text="Valider" cancel-text="Annuler" teleport-center input-class-name="required datepicker" @update:model-value="cancelError()" />
      <!-- <input class="form-input required" v-model="endDate" @input="cancelError()" type="date" name="preparation-form-endDate" id="preparation-form-endDate"> -->
      <label class="form-label">Heure de début<span class="star">*</span></label>
      <VueDatePicker class="picker" v-model="startTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="required datepicker" @update:model-value="cancelError()" />
      <!-- <input class="form-input required" v-model="startTime" @input="cancelError()" type="time" name="preparation-form-startTime" id="preparation-form-startTime"> -->
      <label class="form-label">Heure de fin</label>
      <VueDatePicker class="picker" v-model="endTime" timePicker teleport-center select-text="Valider" cancel-text="Annuler" input-class-name="datepicker" />
      <!-- <input class="form-input" v-model="endTime" @input="cancelError()" type="time" name="preparation-form-endTime" id="preparation-form-endTime"> -->
      <label class="form-label" for="preparation-form-place">Lieux<span class="star">*</span></label>
      <input class="form-input required" v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place">
      <label class="form-label" for="vehicle-form-observations">Observations</label>
      <input class="form-input" v-model="observationsDepot" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
      <label class="form-label" for="vehicle-form-maker">Créneau attribué à :</label>
      <input class="form-input" v-model="maker" type="text" name="vehicle-form-maker" id="vehicle-form-maker">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'AdminEditSlot',
  props: ['slotId'],
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
      error: "",
      customer: null,
      observationsDepot: "",
      place: "",
      maker: "",
      duration: ""
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
        endTime: this.endTime,
        maker: this.maker,
        duration: this.duration
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
      this.startTime = {
        hours: moment(res.data.start).format('HH'),
        minutes: moment(res.data.start).format('mm')
      }
      this.endTime = {
        hours: moment(res.data.end).format('HH'),
        minutes: moment(res.data.end).format('mm')
      }
      this.place = res.data.place
      this.observationsDepot = res.data.observationsDepot
      this.maker = res.data.maker
      this.duration = res.data.duration
    })
  },
}
</script>

<style>
.edit-slot-back{
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
  z-index: 9;
}
.edit-slot-box{
  position: relative;
  width: 95%;
  max-width: 700px;
  min-height: 90%;
  max-height: 95%;
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