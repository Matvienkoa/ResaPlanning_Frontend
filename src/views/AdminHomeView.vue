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
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: flex-start;
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