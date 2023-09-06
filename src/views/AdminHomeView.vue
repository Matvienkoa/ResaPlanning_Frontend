<template>
  <HeaderHome />
  <div class="main-page">
    <div class="home-admin-title-box">
      <h1 class="home-admin-title">Menu Principal</h1>
    </div>
    <div class="home-admin-box">
      <router-link to="/admin/accounts" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-users.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Gestion des comptes utilisateurs</p>
        </div>
      </router-link>
      <router-link to="/admin/planning" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-planning.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Planning</p>
        </div>
      </router-link>
      <router-link to="/admin/customers" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-customers.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Clients</p>
        </div>
      </router-link>
      <router-link to="/admin/showroom" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-showroom.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Showroom</p>
        </div>
      </router-link>
    </div>
  </div>
  
</template>

<script>
import HeaderHome from '@/components/HeaderHome.vue'

export default {
  name: 'AdminHome',
  components: {
    HeaderHome,
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
.main-page{
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-admin-title-box{
  width: 100%;
  height: 40px;
  border-bottom: 3px solid #c0c0c0;
  display: flex;
  align-items: center;
}
.home-admin-title{
  font-size: 1.3em;
  margin-left: 30px;
}
.home-admin-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.home-menu-link{
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}
.home-menu-link-img-box{
  width: 100%;
  height: 60%;
}
.home-menu-link-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.home-menu-link-bloc{
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-menu-link-bloc p{
  text-align: center;
  color: black;
}
</style>

<style scoped>
.back-box-home{
  display: none;
}
</style>