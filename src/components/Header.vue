<template>
  <div class="header">
    <div class="logos-box">
      <img crossorigin="anonymous" class="logo logo-afc" alt="" src="../assets/images/afc-logo.png">
      <img crossorigin="anonymous" class="logo logo-millenium" alt="" src="../assets/images/millenium-logo.png">
    </div>
    <div class="back-box">
      <router-link class="link" :to="url">
        <img crossorigin="anonymous" class="back-icon" src="../assets/Icons/arrow-left.svg" alt="">
        <p class="back-txt">Retour</p>
      </router-link>
    </div>
    <div class="logout-box">
      <router-link to="/" @click="logOut()" class="logout-txt">
        <img crossorigin="anonymous" class="logout-icon" src="../assets/Icons/logout.svg" alt="">
        <p>Se Déconnecter</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header-view',
  props: ["url"],
  methods: {
    logOut: function() {
      this.$store.commit("LOG_OUT");
    }
  },
}
</script>

<style scoped>
.header{
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  width: 150px;
  height: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logos-box{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  margin-bottom: 30px;
}
.logo{
  height: 90%;
  width: auto;
}
.back-box{
  width: 80%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #c90200;
  margin-bottom: 25px;
  font-size: 1.1em;
}
.link{
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-icon{
  height: 18px;
  margin-right: 5px;
}
.back-txt{
  font-weight: 600;
  font-family: 'catamaran', sans-serif;
  font-size: 1em;
}
.logout-box{
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #383838;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout-icon{
  width: 20px;
    margin-right: 5px;
    margin-left: 0px;
}
.logout-txt{
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: 'catamaran', sans-serif;
  font-size: 0.9em;
  text-decoration: none;
  color: white;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .header{
    bottom: 0;
    top: unset;
    left: unset;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .logos-box{
    display: none;
  }
  .back-box{
    width: 120px;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: unset;
    border-bottom: unset;
    margin-bottom: unset;
    font-size: 1.1em;
    border-right: 3px solid #c90200;
  }
  .link{
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .back-icon{
    height: 18px;
    margin-right: 5px;
  }
  .logout-box{
    position: unset;
    width: auto;
    height: 100%;
    padding-right: 20px;
  }
  .logout-icon{
    margin-left: 15px;
  }
}
@media (max-width: 480px) {
  .logout-box{
    padding-right: unset;
  }
  .logout-txt p{
    display: none;
  }
  .logout-icon{
    margin-left: 10px;
  }
}
</style>
