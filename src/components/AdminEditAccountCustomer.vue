<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeEditBox()" class="close-add">X</div>
        <h2>Modifier un compte client</h2>
        <div class="add-account-form">
            <label for="form-login">Login</label>
            <input v-model="login" @input="cancelError()" type="text" name="form-login" id="form-login" class="required">
            <label for="form-password">Mot de passe</label>
            <input v-model="password" @input="cancelError()" type="password" name="form-password" id="form-password">
            <label for="form-password-2">Répéter le Mot de passe</label>
            <input v-model="password2" @input="cancelError()" type="password" name="form-password-2" id="form-password-2">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="editAccount()">Modifier le compte</button>
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
      password2: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getAccount'])
  },
  methods: {
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    editAccount() {
      instance.put(`/account/edit/customer/${this.id}`, {
        login: this.login,
        password: this.password,
        password2: this.password2
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
    })
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