<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeAddBox()" class="close-add">X</div>
        <h2>Ajouter un client</h2>
        <div class="add-customer-form">
            <label for="customer-form-company">Société</label>
            <input v-model="company" @input="cancelError()" type="text" name="customer-form-company" id="customer-form-company" class="required">
            <label for="customer-form-lastName">Nom</label>
            <input v-model="firstName" type="text" name="customer-form-lastName" id="customer-form-lastName">
            <label for="customer-form-firstName">Prénom</label>
            <input v-model="lastName" type="text" name="customer-form-firstName" id="customer-form-firstName">
            <label for="customer-form-adress">Adresse</label>
            <input v-model="adress" type="text" name="customer-form-adress" id="customer-form-adress">
            <label for="customer-form-adress-2">Adresse (suite)</label>
            <input v-model="adress2" type="text" name="customer-form-adress-2" id="customer-form-adress-2">
            <label for="customer-form-zipCode">Code Postal</label>
            <input v-model="zipCode" type="text" name="customer-form-zipCode" id="customer-form-zipCode">
            <label for="customer-form-city">Ville</label>
            <input v-model="city" type="text" name="customer-form-city" id="customer-form-city">
            <label for="customer-form-phone">Téléphone</label>
            <input v-model="phone" @input="cancelError()" type="text" name="customer-form-phone" id="customer-form-phone" class="required">
            <label for="customer-form-mail">Mail</label>
            <input v-model="mail" @input="cancelError()" type="text" name="customer-form-mail" id="customer-form-mail" class="required">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="addCustomer()">Créer le client</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAddCustomer',
  data() {
    return {
      error: "",
      company: "",
      lastName: "",
      firstName: "",
      adress: "",
      adress2: "",
      zipCode: "",
      city: "",
      phone: "",
      mail: "",
    }
  },
  computed: {
    ...mapGetters(['getAddBox'])
  },
  methods: {
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    addCustomer() {
        this.$store.dispatch('addCustomer', {
            company: this.company,
            lastName: this.lastName,
            firstName: this.firstName,
            adress: this.adress,
            adress2: this.adress2,
            zipCode: this.zipCode,
            city: this.city,
            phone: this.phone,
            mail: this.mail
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
}
</script>


<style scoped>
.add-customer-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>