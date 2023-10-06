<template>
  <Header url="/customer/home" />
  <div class="main-page">
    <div class="account-admin-title-box">
      <h1 class="account-admin-title">Showroom</h1>
    </div>
    <div class="showroom-customer-box">
      <div class="showroom-customer">
        <div class="showroom-customer-title-box">
          <h2 class="showroom-customer-title">Véhicules disponibles</h2>
        </div>
        <div class="showroom-customer-vehicles-box">
          <p class="no-content" v-if="getVehicles.length === 0">Aucun véhicule disponible pour le moment</p>
          <router-link v-for="vehicle in getVehicles" :key="vehicle.id" :to="{name: 'CustomerShowroomVehicle', params: {id: vehicle.id}}" class="showroom-customer-vehicle">
            <div class="showroom-customer-vehicle-img-box">
              <img crossorigin="anonymous" v-if="vehicle.photo1" :src="vehicle.photo1" alt="" class="showroom-customer-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && vehicle.photo2" :src="vehicle.photo2" alt="" class="showroom-customer-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && vehicle.photo3" :src="vehicle.photo3" alt="" class="showroom-customer-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && vehicle.photo4" :src="vehicle.photo4" alt="" class="showroom-customer-vehicle-img">
              <div v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && !vehicle.photo4" class="showroom-customer-vehicle-no-photo-back"></div>
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && !vehicle.photo4" src="../assets/images/back-vehicle.jpg" alt="" class="showroom-customer-vehicle-no-photo">
            </div>
            <div class="showroom-customer-vehicle-infos-box">
              <p class="showroom-customer-vehicle-title">{{vehicle.brand}} {{vehicle.model}}</p>
              <p class="showroom-customer-vehicle-year">{{vehicle.year}}</p>
              <p class="showroom-customer-vehicle-price">{{vehicle.marketPrice/100}} €</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerShowroom',
  components: {
    Header
  },
  computed: {
    ...mapGetters(['getVehicles'])
  },
  created: function () {
    this.$store.dispatch('getVehicles');
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
  max-width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 1.66%;
  margin-right: 1.66%;
  margin-bottom: 20px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 20px;
  overflow: hidden;
}
.showroom-customer-vehicle-img-box{
  position: relative;
  width: 100%;
  height: 60%;
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
.showroom-customer-vehicle-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.4;
}
.showroom-customer-vehicle-no-photo-back{
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
}
.showroom-customer-vehicle-infos-box{
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.showroom-customer-vehicle-title{
  color: black;
  font-weight: 600;
  margin-bottom: 5px;
}
.showroom-customer-vehicle-year{
  color: rgb(153, 153, 153);
  font-weight: 600;
  margin-bottom: 15px;
}
.showroom-customer-vehicle-price{
  color: black;
  font-weight: 600;
  font-size: 1.2em;
}

</style>