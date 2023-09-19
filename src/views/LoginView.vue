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
        <label class="home-form-label" for="login-input">Identifiant</label>
        <input class="home-form-input form-login-input required" @input="cancelError()" v-model="login" type="text" id="login-input">
        <label class="home-form-label" for="password-input">Mot de Passe</label>
        <div class="home-form-password-box">
          <input class="home-form-password-input form-login-input required" @input="cancelError()" @keyup.enter="signIn()" v-model="password" type="password" id="password-input">
          <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye.svg">
          <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/Icons/eye-slash.svg">
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="signIn()" id="button-login">Connexion</button>
      </div>
      <img crossorigin="anonymous" src="../assets/images/wave-trans.svg" alt="" class="wave">
    </div>
    <img crossorigin="anonymous" class="home-back" alt="" src="../assets/images/1.jpg">
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      error: "",
      login: "",
      password: "",
      modePassword: 'hidden'
    }
  },
  methods: {
    showPassword() {
        this.modePassword = 'visible'
        const input = document.getElementById('password-input')
        input.type = 'text'
    },
    hidePassword() {
        this.modePassword = 'hidden'
        const input = document.getElementById('password-input')
        input.type = 'password'
    },
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
  created: function() {
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.error = {message: 'Votre session a expiré, veuillez vous reconnecter'}
      }
      if(res === 'valid') {
        this.$store.dispatch('getProfile')
        .then((res) => {
          if (res.data.role === "admin" || res.data.role === "employee") {
            this.$router.push("/admin/home");
            console.log('admin ou employee')
          }
          if (res.data.role === "customer") {
            this.$router.push("/customer/home");
            console.log('customer')
          }
        })
      }
    })
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
  bottom: 0;
  right: 0;
  width: 50%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.9;
}
.home-form-box{
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: white;
}
.wave{
  position: absolute;
  width: 100%;
  bottom: 0;
}

/* Form */
.home-form{
  position: relative;
  width: 60%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
}
.home-form-label{
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
  font-size: 1.2em;
}
.home-form-input{
  width: 90%;
  height: 35px;
  margin-bottom: 20px;
  border-radius: 30px;
  border: solid 1px rgb(184, 184, 184);
  padding-left: 5%;
  padding-right: 5%;
  font-size: 1.2em;
}
input:focus{
  outline: none;
}
.home-form-password-box{
  position: relative;
  width: 100%;
  height: 35px;
  margin-bottom: 30px;
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
#button-login{
  margin: auto;
  width: 60%;
  height: 40px;
  border-radius: 30px;
  background: rgb(198,238,0);
  color: white;
  margin-top: 7%;
  font-size: 1.2em;
  border: solid 2px rgb(198,238,0);
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

@media (max-width: 1024px) {
  .home-back{
    width: 100%;
  }
  .home-form-box{
    background-color: unset;
    width: 100%;
    align-items: flex-start;
  }
  .home-form{
    top: 20%;
  }
  .wave{
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
