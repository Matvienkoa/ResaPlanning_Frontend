<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Modifier le compte d'accès client</h2>
        <div class="add-account-form">
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
            <p class="edit-password">Ne remplir que si vous souhaitez changer le mot de passe</p>
            <label class="form-label" for="form-password">Mot de passe</label>
            <p class="form-password-infos">Compris entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre</p>
            <div class="home-form-password-box">
              <input class="home-form-password-input" v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
              <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye.svg">
              <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye-slash.svg">
            </div>
            <label class="form-label" for="form-password-2">Répéter le Mot de passe</label>
            <div class="home-form-password-box">
              <input class="home-form-password-input" v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
              <img crossorigin="anonymous" v-if="modePassword2 === 'hidden'" @click="showPassword2()" class="home-form-password-icon" alt="" src="../assets/Icons/eye.svg">
              <img crossorigin="anonymous" v-if="modePassword2 === 'visible'" @click="hidePassword2()" class="home-form-password-icon" alt="" src="../assets/Icons/eye-slash.svg">
            </div>
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="editAccount()">Modifier</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminEditAccountCustomer',
  props: ["id"],
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
      afc: false,
      millenium: false,
      modePassword: 'hidden',
      modePassword2: 'hidden'
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getAccount'])
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
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    checkBox(data) {
      if(data === true) {
        return 'yes'
      } else {
        return 'no'
      }
    },
    editAccount() {
      instance.put(`/account/edit/customer/${this.id}`, {
        login: this.login,
        password: this.password,
        password2: this.password2,
        afc: this.checkBox(this.afc),
        millenium: this.checkBox(this.millenium)
      })
      .then((res) => {
        if(res.status === 201) {
          this.$store.dispatch('getAccounts');
          this.$store.state.editBox = "closed";
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
    this.$store.dispatch('getAccount', this.id)
    .then((account) => {
        this.login = account.login
        if(account.afc === 'yes') {
          this.afc = true
        }
        if(account.millenium === 'yes') {
          this.millenium = true
        }
    })
  }
}
</script>

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