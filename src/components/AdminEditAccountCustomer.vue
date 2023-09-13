<template>
  <div class="add-back">
    <div class="add-box">
        <img @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Modifier le compte client</h2>
        <div class="add-account-form">
            <label class="form-label" for="form-login">Login<span class="star">*</span></label>
            <input class="form-input required" v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login">
            <label class="form-label" for="form-password">Mot de passe</label>
            <input class="form-input" v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
            <label class="form-label" for="form-password-2">Répéter le Mot de passe</label>
            <input class="form-input" v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
            <div class="custom-checkbox">
              <input v-model="afc" type="checkbox" name="form-afc" id="form-afc">
              <label class="form-label-checkbox" for="form-afc">Accès AFC</label>
            </div>
            <div class="custom-checkbox">
              <input v-model="millenium" type="checkbox" name="form-millenium" id="form-millenium">
              <label class="form-label-checkbox" for="form-millenium">Accès Millenium</label>
            </div>
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
  name: 'AdminEditAccountCustomer',
  props: ["id"],
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
      afc: false,
      millenium: false
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
        console.log(account)
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


<style>

</style>