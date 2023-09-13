<template>
  <HeaderHome />
  <div class="main-page">
    <div class="home-admin-title-box">
      <h1 class="home-admin-title">Menu Principal</h1>
    </div>
    <div class="home-customer-box">
      <router-link to="/customer/requests" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-booking.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Demande de réservation</p>
        </div>
      </router-link>
      <router-link to="/customer/tracking" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img class="home-menu-link-img" src="../assets/images/menu-detailing.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Statut de préparation</p>
        </div>
      </router-link>
      <router-link to="/customer/showroom" class="home-menu-link">
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
  name: 'CustomerHome',
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
.home-customer-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>