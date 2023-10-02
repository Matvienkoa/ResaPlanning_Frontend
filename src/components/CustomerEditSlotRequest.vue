<template>
  <div class="add-back">
    <div class="add-box">
      <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="add-box-title">Modifier la demande</h2>
      <div class="add-account-form">
        <label class="form-label" for="preparation-form-date">Date souhaitée<span class="star">*</span></label>
        <input class="form-input required" v-model="date" @input="cancelError()" type="date" name="preparation-form-date" id="preparation-form-date">
        <label class="form-label" for="preparation-form-duration">Durée de l'intervention<span class="star">*</span></label>
        <select class="form-input required" @change="cancelError()" v-model="duration" name="preparation-form-duration" id="preparation-form-duration">
            <option value="half">Demi-Journée</option>
            <option value="day">Journée</option>
        </select>
        <label class="form-label" for="preparation-form-place">Lieux<span class="star">*</span></label>
        <input class="form-input required" v-model="place" @input="cancelError()" type="text" name="preparation-form-place" id="preparation-form-place">
        <label class="form-label" for="vehicle-form-observations">Observations</label>
        <input class="form-input" v-model="observationsCustomer" type="text" name="vehicle-form-observations" id="vehicle-form-observations">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button class="add-button" @click="editSlotRequest()">Envoyer la demande</button>
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
  name: 'CustomerEditSlotRequest',
  props: ['id'],
  data() {
    return {
      moment: moment,
      error: "",
      date: "",
      duration: "",
      place: "",
      observationsCustomer: ""
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    editSlotRequest() {
      instance.put(`/slotrequest/${this.id}`, {
        place: this.place,
        observationsCustomer: this.observationsCustomer,
        date: this.date,
        duration: this.duration
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.state.editBox = "closed"
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
    }
  },
  created: function () {
    this.$store.dispatch('getSlotRequest', this.id)
    .then((res) => {
        this.duration = res.data.duration
        this.place = res.data.place
        this.observationsCustomer = res.data.observationsCustomer
        this.date = moment(res.data.date).format('YYYY-MM-DD')
    })
  }
}
</script>


<style scoped>
.add-box{
  justify-content: flex-start;
}
.edit-request-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>