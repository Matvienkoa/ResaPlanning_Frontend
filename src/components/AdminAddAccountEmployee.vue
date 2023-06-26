<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeAddBox()" class="close-add">X</div>
        <h2>Créer un compte collaborateur</h2>
        <div class="add-account-form">
            <label for="form-login">Login</label>
            <input v-model="login" type="text" name="form-login" id="form-login" class="required">
            <label for="form-lastName">Nom</label>
            <input v-model="lastName" type="text" name="form-lastName" id="form-lastName">
            <label for="form-firstName">Prénom</label>
            <input v-model="firstName" type="text" name="form-firstName" id="form-firstName" class="required">
            <label for="form-password">Mot de passe</label>
            <input v-model="password" type="password" name="form-password" id="form-password" class="required">
            <label for="form-password-2">Répéter le Mot de passe</label>
            <input v-model="password2" type="password" name="form-password-2" id="form-password-2" class="required">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="addAccount()">Créer le compte</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAddAccountEmployee',
  data() {
    return {
      error: "",
      login: "",
      password: "",
      password2: "",
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
    }
  },
}
</script>


<style>
.add-back{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-box{
    position: relative;
    width: 60%;
    min-height: 50%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
.close-add{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
</style>

<style scoped>
.add-account-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>