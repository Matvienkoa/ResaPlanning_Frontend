<template>
  <div class="add-back">
    <div class="add-box">
        <img @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Modifier le compte collaborateur</h2>
        <div class="add-account-form">
            <label class="form-label" for="form-login">Login<span class="star">*</span></label>
            <input class="form-input required" v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login">
            <label class="form-label" for="form-lastName">Nom</label>
            <input class="form-input" v-model="lastName" type="text" name="form-lastName" id="form-lastName">
            <label class="form-label" for="form-firstName">Prénom<span class="star">*</span></label>
            <input class="form-input required" v-model="firstName" @input="cancelError()" type="text" name="form-firstName" id="form-firstName">
            <div class="custom-checkbox">
              <input v-model="privileges" type="checkbox" name="form-privileges" id="form-privileges">
              <label class="form-label-checkbox" for="form-privileges">Privilèges</label>
            </div>
            <label class="form-label" for="form-password">Mot de passe</label>
            <input class="form-input" v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
            <label class="form-label" for="form-password-2">Répéter le Mot de passe</label>
            <input class="form-input" v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button class="add-button" @click="editAccount()">Modifier le compte</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminEditAccountEmployee',
  props: ["id"],
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      privileges: false
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getAccount'])
  },
  methods: {
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
      instance.put(`/account/edit/employee/${this.id}`, {
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
      console.log(account)
        this.login = account.login
        this.firstName = account.infos.firstName
        this.lastName = account.infos.lastName
        if(account.infos.privileges === 'yes') {
          this.privileges = true
        }
    })
  }
}
</script>


<style>

</style>