<template>
<AdminAddVehicle v-if="getAddBox === 'addVehicle'" />
  <Header url="/admin/home" />
  <BackButton url="/admin/home" />
  <div class="showroom-admin-box">
    <div class="showroom-admin">
      <div class="showroom-admin-title-box">
        <h2 class="showroom-admin-title">Mes Véhicules</h2>
        <img @click="openAddBox('addVehicle')" src="../assets/Icons/add.svg" alt="" class="showroom-admin-icon">
      </div>
      <div class="showroom-admin-vehicles-box">
        <router-link v-for="vehicle in getVehicles" :key="vehicle.id" :to="{name: 'AdminShowroomVehicle', params: {id: vehicle.id}}" class="showroom-admin-vehicle">
          <div class="showroom-admin-vehicle-img-box">
            <img crossorigin="anonymous" v-if="vehicle.photo1" :src="vehicle.photo1" alt="" class="showroom-admin-vehicle-img">
          </div>
          <div class="showroom-admin-vehicle-infos-box">
            <div class="showroom-admin-vehicle-model-box">
              <div class="showroom-admin-vehicle-brand">{{vehicle.brand}}</div>
              <div class="showroom-admin-vehicle-model">{{vehicle.model}}</div>
            </div>
            <div class="showroom-admin-vehicle-options-box">
              <div class="showroom-admin-vehicle-option">{{vehicle.year}}</div>
              <div class="showroom-admin-vehicle-option">{{vehicle.kilometers}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';
import AdminAddVehicle from '@/components/AdminAddVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminShowroom',
  components: {
    Header,
    BackButton,
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
.showroom-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.showroom-admin{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.showroom-admin-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
.showroom-admin-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.showroom-admin-vehicles-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.showroom-admin-vehicle{
  width: 30%;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 1.66%;
  margin-right: 1.66%;
}
.showroom-admin-vehicle-img-box{
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showroom-admin-vehicle-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


</style>