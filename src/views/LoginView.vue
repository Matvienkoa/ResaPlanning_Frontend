<template>
  <div class="home">
    <div class="home-form-box">
      <div class="home-form">
        <label for="">Identifiant</label>
        <input type="text" class="form-login-input">
        <label for="">Mot de Passe</label>
        <input type="password" class="form-login-input">
        <button id="button-login">Connexion</button>
      </div>
    </div>
    <img class="home-back" alt="" src="../assets/images/1.jpg">
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
    
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
  width: 100%;
  height: 10%;
  margin-bottom: 20px;
  border-radius: 30px;
  border: solid 1px rgb(184, 184, 184);
  
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
}

</style>
