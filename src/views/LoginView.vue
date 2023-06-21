<template>
  <div id="login-home" class="home">
    <div id="spinner" class="spinner-off">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="home-form-box">
      <div class="home-form">
        <label for="login-input">Identifiant</label>
        <input @input="cancelError()" v-model="login" type="text" class="form-login-input input" id="login-input">
        <label for="password-input">Mot de Passe</label>
        <input @input="cancelError()" v-model="password" type="password" class="form-login-input input" id="password-input">
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="signIn()" id="button-login">Connexion</button>
      </div>
    </div>
    <img class="home-back" alt="" src="../assets/images/1.jpg">
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      error: "",
      login: "",
      password: ""
    }
  },
  methods: {
    showSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.classList.replace('spinner-off', 'lds-ring');
        const body = document.getElementById('login-home');
        body.classList.add('on');
    },
    hideSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.classList.replace('lds-ring', 'spinner-off');
        const body = document.getElementById('login-home');
        body.classList.remove('on');
    },
    signIn() {
      this.showSpinner();
      this.$store.dispatch('login', {
        login: this.login,
        password: this.password
      })
      .then(() => {
        this.$store.dispatch("getProfile")
        .then((res) => {
          this.hideSpinner();
          if (res.data.role === "admin" || res.data.role === "employee") {
            this.$router.push("admin/home");
          }
          if (res.data.role === "customer") {
            this.$router.push("customer/home");
          }
        })
      })
      .catch((error) => {
        this.hideSpinner();
        this.error = error.response.data
        const emptyInput = document.querySelectorAll('.input');
          emptyInput.forEach(input => {
              if(input.value === "") {
                  input.classList.add('empty')
              }
          })
      })
    },
    cancelError() {
      const emptyInput = document.querySelectorAll('.input');
      emptyInput.forEach(input => {
          if(input.value !== "") {
              input.classList.remove('empty')
          }
      })
      this.error = ''
    },
  }
}
</script>

<style scoped>
/* Page */
.home{
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
}
.home-back{
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.9;
}
.home-form-box{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Form */
.home-form{
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
label{
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
  font-size: 1.2em;
}
input{
  width: 95%;
  height: 10%;
  margin-bottom: 20px;
  border-radius: 30px;
  border: solid 1px rgb(184, 184, 184);
  padding-left: 5%;
  font-size: 1.2em;
}
input:focus{
  outline: none;
}
#button-login{
  width: 100%;
  height: 10%;
  border-radius: 30px;
  background: black;
  color: white;
  margin-top: 10%;
  font-size: 1.2em;
  border: solid 2px rgb(0, 0, 0);
  cursor: pointer;
}
</style>
