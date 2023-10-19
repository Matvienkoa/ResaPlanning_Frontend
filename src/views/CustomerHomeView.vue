<template>
  <HeaderHome />
  <div class="main-page">
    <div class="home-admin-title-box">
      <h1 class="home-admin-title">Menu Principal</h1>
    </div>
    <div class="home-admin-box">
      <router-link v-if="getUser.afc === 'yes'" to="/customer/requests" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img crossorigin="anonymous" class="home-menu-link-img" src="../assets/images/menu-booking.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Demande de réservation</p>
        </div>
      </router-link>
      <router-link v-if="getUser.afc === 'yes'" to="/customer/tracking" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img crossorigin="anonymous" class="home-menu-link-img" src="../assets/images/menu-detailing.jpg" alt="">
        </div>
        <div class="home-menu-link-bloc">
          <p>Statut de préparation</p>
        </div>
      </router-link>
      <router-link v-if="getUser.millenium === 'yes'" to="/customer/showroom" class="home-menu-link">
        <div class="home-menu-link-img-box">
          <img crossorigin="anonymous" class="home-menu-link-img" src="../assets/images/menu-showroom.jpg" alt="">
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
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerHome',
  components: {
    HeaderHome,
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created: function () {
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin' && res.data.role !== 'customer') {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>