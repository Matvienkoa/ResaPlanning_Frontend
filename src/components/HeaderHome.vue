<template>
  <div class="header">
    <div class="logos-box">
      <img crossorigin="anonymous" class="logo logo-afc" alt="" src="../assets/images/afc-logo.png">
      <img crossorigin="anonymous" class="logo logo-millenium" alt="" src="../assets/images/millenium-logo.png">
    </div>
    
    <div class="logout-box">
      <img crossorigin="anonymous" class="logout-icon" src="../assets/Icons/logout.svg" alt="">
      <router-link to="/" @click="logOut()" class="logout-txt">Se Déconnecter</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderHome-view',
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
  width: 200px;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
}
.logos-box{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  /* border-bottom: 3px solid #c90200; */
}
.logo{
  height: 90%;
  width: auto;
}

.logout-box{
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logout-icon{
  width: 20px;
  margin-right: 10px;
  margin-left: 15px;
}
.logout-txt{
  font-family: 'catamaran', sans-serif;
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .header{
    bottom: 0;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .logos-box{
    display: none;
  }
  .logout-box{
    position: unset;
    width: auto;
    height: 100%;
    padding-right: 20px;
  }
}
</style>