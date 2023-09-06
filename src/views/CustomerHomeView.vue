<template>
  <Header url="#"/>
  <div class="home-customer-box">
    <router-link to="/customer/requests" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Demande de réservation
      </div>
    </router-link>
    <router-link to="/customer/tracking" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Statut de préparation
      </div>
    </router-link>
    <router-link to="/customer/showroom" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Showroom
      </div>
    </router-link>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'CustomerHome',
  components: {
    Header,
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
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>