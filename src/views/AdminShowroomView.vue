<template>
<AdminAddVehicle v-if="getAddBox === 'addVehicle'" />
  <Header url="/admin/home" />
  <div class="main-page">
    <div class="account-admin-title-box">
      <h1 class="account-admin-title">Showroom</h1>
    </div>
    <div class="showroom-admin-box">
      <div class="showroom-admin">
        <div class="showroom-admin-title-box">
          <h2 class="showroom-admin-title">Mes Véhicules</h2>
          <img crossorigin="anonymous" @click="openAddBox('addVehicle')" src="../assets/Icons/add.svg" alt="" class="showroom-admin-icon">
        </div>
        <div class="showroom-admin-vehicles-box">
          <p class="no-content" v-if="getVehicles.length === 0">Aucun véhicule enregistré pour le moment</p>
          <router-link v-for="vehicle in getVehicles" :key="vehicle.id" :to="{name: 'AdminShowroomVehicle', params: {id: vehicle.id}}" class="showroom-admin-vehicle">
            <div class="showroom-admin-vehicle-img-box">
              <img crossorigin="anonymous" v-if="vehicle.photo1" :src="vehicle.photo1" alt="" class="showroom-admin-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && vehicle.photo2" :src="vehicle.photo2" alt="" class="showroom-admin-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && vehicle.photo3" :src="vehicle.photo3" alt="" class="showroom-admin-vehicle-img">
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && vehicle.photo4" :src="vehicle.photo4" alt="" class="showroom-admin-vehicle-img">
              <div v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && !vehicle.photo4" class="showroom-admin-vehicle-no-photo-back"></div>
              <img crossorigin="anonymous" v-if="!vehicle.photo1 && !vehicle.photo2 && !vehicle.photo3 && !vehicle.photo4" src="../assets/images/back-vehicle.jpg" alt="" class="showroom-admin-vehicle-no-photo">
            </div>
            <div class="showroom-admin-vehicle-infos-box">
              <p class="showroom-admin-vehicle-title">{{vehicle.brand}} {{vehicle.model}}</p>
              <p class="showroom-admin-vehicle-year">{{vehicle.year}}</p>
              <p class="showroom-admin-vehicle-price">{{vehicle.marketPrice/100}} €</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminAddVehicle from '@/components/AdminAddVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminShowroom',
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
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin') {
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
.showroom-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
  padding-bottom: 4em;
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
  margin-bottom: 30px;
}
.showroom-admin-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
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
  min-width: 250px;
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
.showroom-admin-vehicle-img-box{
  position: relative;
  width: 100%;
  height: 60%;
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
.showroom-admin-vehicle-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.4;
}
.showroom-admin-vehicle-no-photo-back{
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
}
.showroom-admin-vehicle-infos-box{
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
}
.showroom-admin-vehicle-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 5px;
}
.showroom-admin-vehicle-year{
  font-family: 'catamaran', sans-serif;
  color: rgb(153, 153, 153);
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1em;
  font-size: 1.2em;
}
.showroom-admin-vehicle-price{
  font-family: 'trumpSoftPro', sans-serif;
  color: #2c3e50;
  font-weight: 600;
  font-size: 2em;
  line-height: 1em;
}

@media (max-width: 1024px) {
  .showroom-admin-vehicles-box{
    justify-content: center;
  }
  .showroom-admin-vehicle{
    width: 45%;
    min-width: 240px;
    max-width: 300px;
  }
}
@media (max-width: 480px) {
  .showroom-admin-vehicle{
    width: 90%;
    min-width: 240px;
    max-width: 300px;
  }
}
</style>