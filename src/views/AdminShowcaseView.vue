<template>
<AdminAddVehicle v-if="getAddBox === 'addVehicle'" />
  <Header />
  <div class="showcase-admin-box">
    <div class="showcase-admin">
      <div class="showcase-admin-title-box">
        <h2 class="showcase-admin-title">Mes Véhicules</h2>
        <img @click="openAddBox('addVehicle')" src="../assets/Icons/add.svg" alt="" class="showcase-admin-icon">
      </div>
      <div class="showcase-admin-vehicles-box">
        <router-link v-for="vehicle in getVehicles" :key="vehicle.id" :to="{name: 'AdminShowcaseVehicle', params: {id: vehicle.id}}" class="showcase-admin-vehicle">
          <div class="showcase-admin-vehicle-img-box">
            <img crossorigin="anonymous" v-if="vehicle.photo1" :src="vehicle.photo1" alt="" class="showcase-admin-vehicle-img">
          </div>
          <div class="showcase-admin-vehicle-infos-box">
            <div class="showcase-admin-vehicle-model-box">
              <div class="showcase-admin-vehicle-brand">{{vehicle.brand}}</div>
              <div class="showcase-admin-vehicle-model">{{vehicle.model}}</div>
            </div>
            <div class="showcase-admin-vehicle-options-box">
              <div class="showcase-admin-vehicle-option">{{vehicle.year}}</div>
              <div class="showcase-admin-vehicle-option">{{vehicle.kilometers}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminAddVehicle from '@/components/AdminAddVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminShowcase',
  components: {
    Header,
    AdminAddVehicle
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getVehicles'])
  },
  methods: {
    openAddBox(type) {
      this.$store.state.addBox = type
    }
  },
  created: function () {
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('getVehicles');
  }
}
</script>

<style scoped>
.showcase-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.showcase-admin{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.showcase-admin-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
.showcase-admin-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.showcase-admin-vehicles-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.showcase-admin-vehicle{
  width: 30%;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 1.66%;
  margin-right: 1.66%;
}
.showcase-admin-vehicle-img-box{
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showcase-admin-vehicle-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


</style>