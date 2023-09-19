<template>
  <div class="header">
    <div class="logos-box"></div>
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
  height: 50px;
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
  text-decoration: none;
  color: white;
  cursor: pointer;
}
</style>