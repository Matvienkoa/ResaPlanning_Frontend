<template>
  <Header url="/customer/home" />
  <BackButton url="/customer/home" />
  <div class="showroom-customer-box">
    <div class="showroom-customer">
      <div class="showroom-customer-title-box">
        <h2 class="showroom-customer-title">Mes Véhicules</h2>
      </div>
      <div class="showroom-customer-vehicles-box">
        <router-link v-for="vehicle in getVehicles" :key="vehicle.id" :to="{name: 'CustomerShowroomVehicle', params: {id: vehicle.id}}" class="showroom-customer-vehicle">
          <div class="showroom-customer-vehicle-img-box">
            <img crossorigin="anonymous" v-if="vehicle.photo1" :src="vehicle.photo1" alt="" class="showroom-customer-vehicle-img">
          </div>
          <div class="showroom-customer-vehicle-infos-box">
            <div class="showroom-customer-vehicle-model-box">
              <div class="showroom-customer-vehicle-brand">{{vehicle.brand}}</div>
              <div class="showroom-customer-vehicle-model">{{vehicle.model}}</div>
            </div>
            <div class="showroom-customer-vehicle-options-box">
              <div class="showroom-customer-vehicle-option">{{vehicle.year}}</div>
              <div class="showroom-customer-vehicle-option">{{vehicle.kilometers}}</div>
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
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerShowroom',
  components: {
    Header,
    BackButton
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getVehicles'])
  },
  methods: {

  },
  created: function () {
    this.$store.dispatch('getVehicles');
  }
}
</script>

<style scoped>
.showroom-customer-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.showroom-customer{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.showroom-customer-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
.showroom-customer-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.showroom-customer-vehicles-box{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.showroom-customer-vehicle{
  width: 30%;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 1.66%;
  margin-right: 1.66%;
}
.showroom-customer-vehicle-img-box{
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showroom-customer-vehicle-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


</style>