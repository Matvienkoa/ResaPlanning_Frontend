<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Créer un compte d'accès client</h2>
        <div class="add-account-form">
            <label class="form-label" for="form-customer">Séléctionner un Client :<span class="star">*</span></label>
            <select class="form-input required" @change="cancelError()" v-model="customer" name="form-customer" id="form-customer">
                <option v-if="getCustomersWithoutAccount.length === 0" disabled selected value="">Aucun client trouvé</option>
                <option v-for="customer in getCustomersWithoutAccount" :key="customer.id" :value="customer.id">{{customer.company}} {{customer.firstName}} {{customer.lastName}}</option>
            </select>
            <label class="form-label" for="form-login">Identifiant<span class="star">*</span></label>
            <input class="form-input required" v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login">
            <div class="custom-checkbox">
              <input v-model="afc" type="checkbox" name="form-afc" id="form-afc">
              <label class="form-label-checkbox" for="form-afc">Accès AFC</label>
            </div>
            <div class="custom-checkbox millenium">
              <input v-model="millenium" type="checkbox" name="form-millenium" id="form-millenium">
              <label class="form-label-checkbox" for="form-millenium">Accès Millenium</label>
            </div>
            <label class="form-label" for="form-password">Mot de passe<span class="star">*</span></label>
            <p class="form-password-infos">Compris entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre</p>
            <div class="home-form-password-box">
              <input class="home-form-password-input required" v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
              <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye.svg">
              <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye-slash.svg">
            </div>
            <label class="form-label" for="form-password-2">Répéter le Mot de passe<span class="star">*</span></label>
            <div class="home-form-password-box">
              <input class="home-form-password-input required" v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
              <img crossorigin="anonymous" v-if="modePassword2 === 'hidden'" @click="showPassword2()" class="home-form-password-icon" alt="" src="../assets/Icons/eye.svg">
              <img crossorigin="anonymous" v-if="modePassword2 === 'visible'" @click="hidePassword2()" class="home-form-password-icon" alt="" src="../assets/Icons/eye-slash.svg">
            </div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="createAccount()">Créer le compte</button>
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
      millenium: false,
      modePassword: 'hidden',
      modePassword2: 'hidden'
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getCustomersWithoutAccount'])
  },
  methods: {
    showPassword() {
      this.modePassword = 'visible'
      const input = document.getElementById('form-password')
      input.type = 'text'
    },
    hidePassword() {
      this.modePassword = 'hidden'
      const input = document.getElementById('form-password')
      input.type = 'password'
    },
    showPassword2() {
      this.modePassword2 = 'visible'
      const input = document.getElementById('form-password-2')
      input.type = 'text'
    },
    hidePassword2() {
      this.modePassword2 = 'hidden'
      const input = document.getElementById('form-password-2')
      input.type = 'password'
    },
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
.millenium{
  margin-bottom: 20px;
}
</style>

<style scoped>
.home-form-password-box{
  position: relative;
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-form-password-input{
  border-radius: 30px;
  border: solid 1px rgb(184, 184, 184);
  width: 90%;
  height: 100%;
  font-size: 1.2em;
  padding-left: 5%;
  padding-right: 15%;
}
.home-form-password-icon{
  position: absolute;
  height: 50%;
  right: 4%;
  top: 25%;
  cursor: pointer;
}
</style>