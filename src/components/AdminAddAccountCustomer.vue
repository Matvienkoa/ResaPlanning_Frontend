<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeAddBox()" class="close-add">X</div>
        <h2>Créer un compte client</h2>
        <div class="add-account-form">
            <label for="form-customer">Séléctionner un Client :</label>
            <select @change="cancelError()" v-model="customer" name="form-customer" id="form-customer" class="required">
                <option v-for="customer in getCustomersWithoutAccount" :key="customer.id" :value="customer.id">{{customer.company}}</option>
            </select>
            <label for="form-login">Login</label>
            <input v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login" class="required">
            <label for="form-password">Mot de passe</label>
            <input v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password" class="required">
            <label for="form-password-2">Répéter le Mot de passe</label>
            <input v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2" class="required">
            <label for="form-afc">Accès AFC</label>
            <input v-model="afc" type="checkbox" name="form-afc" id="form-afc">
            <label for="form-millenium">Accès Millenium</label>
            <input v-model="millenium" type="checkbox" name="form-millenium" id="form-millenium">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="createAccount()">Créer le compte</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminAddAccountCustomer',
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
      customer: null,
      afc: false,
      millenium: false
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getCustomersWithoutAccount'])
  },
  methods: {
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    checkBox(data) {
      if(data === true) {
        return 'yes'
      } else {
        return 'no'
      }
    },
    createAccount() {
      instance.post('/account/add/customer', {
        login: this.login,
        password: this.password,
        password2: this.password2,
        id: this.customer,
        afc: this.checkBox(this.afc),
        millenium: this.checkBox(this.millenium)
      })
      .then((res) => {
        if(res.status === 201) {
          this.$store.dispatch('getAccounts');
          this.$store.state.addBox = "closed";
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
  }
}
</script>


<style>

</style>

<style scoped>
.add-account-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>