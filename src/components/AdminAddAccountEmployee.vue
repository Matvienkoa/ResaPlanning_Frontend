<template>
  <div class="add-back">
    <div class="add-box">
        <img @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Créer un compte collaborateur</h2>
        <div class="add-account-form">
            <label class="form-label" for="form-login">Login</label>
            <input class="form-input required" v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login">
            <label class="form-label" for="form-lastName">Nom</label>
            <input class="form-input required" v-model="lastName" type="text" name="form-lastName" id="form-lastName">
            <label class="form-label" for="form-firstName">Prénom</label>
            <input class="form-input required" v-model="firstName" @input="cancelError()" type="text" name="form-firstName" id="form-firstName">
            <div class="custom-checkbox">
              <input v-model="privileges" type="checkbox" name="form-privileges" id="form-privileges">
              <label class="form-label-checkbox" for="form-privileges">Privilèges</label>
            </div>
            <label class="form-label" for="form-password">Mot de passe</label>
            <input class="form-input required" v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
            <label class="form-label" for="form-password-2">Répéter le Mot de passe</label>
            <input class="form-input required" v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
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
  name: 'AdminAddAccountEmployee',
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
      lastName: "",
      firstName: "",
      privileges: false
    }
  },
  computed: {
    ...mapGetters(['getAddBox'])
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
      instance.post('/account/add/employee', {
        login: this.login,
        password: this.password,
        password2: this.password2,
        firstName: this.firstName,
        lastName: this.lastName,
        privileges: this.checkBox(this.privileges)
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
}
</script>


<style>
.add-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.808);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}
.add-box{
  position: relative;
  width: 60%;
  max-width: 600px;
  min-height: 50%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
}
.add-box-title{
  width: 90%;
  margin: auto;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
}
.close-add{
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  width: 30px;
}
.add-account-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
.form-label{
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
}
.form-input{
  height: 30px;
  border-radius: 30px;
  border: solid 1px rgb(184, 184, 184);
  padding-left: 5%;
  padding-right: 5%;
  font-size: 1.2em;
  margin-bottom: 10px;
}
.form-input:focus{
  outline: none;
}
.custom-checkbox{
  margin-bottom: 20px;
  margin-top: 10px;
}
.form-label-checkbox{
  font-weight: 600;
}
.custom-checkbox input[type="checkbox"] {
  display: none;
}
.custom-checkbox label {
  position: relative;
  padding-left: 35px; /* Espace à gauche de la case à cocher */
  cursor: pointer;
}
.custom-checkbox label::before {
  content: "";
  position: absolute;
  left: 0;
  top: -5px;
  width: 25px; /* Largeur de la case à cocher personnalisée */
  height: 25px; /* Hauteur de la case à cocher personnalisée */
  border: solid 1px rgb(184, 184, 184);
  background-color: #fff; /* Couleur de fond de la case à cocher */
  border-radius: 20px;
}
.custom-checkbox input[type="checkbox"]:checked + label::before {
  background-color: rgb(198,238,0); /* Couleur de fond de la case à cocher cochée */
  border-color: rgb(184, 184, 184); /* Couleur de bordure de la case à cocher cochée */
}
.add-button{
  margin: auto;
  width: 200px;
  height: 35px;
  border-radius: 30px;
  background: rgb(198,238,0);
  color: white;
  margin-top: 20px;
  font-size: 1.1em;
  border: solid 2px rgb(198,238,0);
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin-bottom: 40px;
}
</style>