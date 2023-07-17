<template>
  <Header />
  <div class="home-admin-box">
    <router-link to="/admin/accounts" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Gestion des comptes utilisateurs
      </div>
    </router-link>
    <router-link to="/admin/planning" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Planning
      </div>
    </router-link>
    <router-link to="/admin/workshop" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Atelier
      </div>
    </router-link>
    <router-link to="/admin/customers" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Clients
      </div>
    </router-link>
    <router-link to="/admin/showcase" class="home-menu-link">
      <div class="home-menu-link-bloc">
        Showcase
      </div>
    </router-link>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'AdminHome',
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
.home-admin-box{
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.home-menu-link{
  width: 20%;
  max-width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 20px;
  border-radius: 10px;
}
</style>