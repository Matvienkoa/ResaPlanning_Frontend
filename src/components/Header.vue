<template>
  <div class="header">
    <div class="logos-box"></div>
    <div class="back-box">
      <router-link class="link" :to="url">
        <img class="back-icon" src="../assets/Icons/arrow-left.svg" alt="">
        <p class="back-txt">Retour</p>
      </router-link>
    </div>
    <div class="logout-box">
      <img class="logout-icon" src="../assets/Icons/logout.svg" alt="">
      <p class="logout-txt">Se Déconnecter</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header-view',
  props: ["url"],
}
</script>


<style scoped>
.header{
  position: fixed;
  z-index: 5;
  width: 200px;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
}
.logos-box{
  height: 50px;
}
.back-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: white;
}
</style>
