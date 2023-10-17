<template>
<AdminGetPhotoVehicle v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" :numberPhoto="this.numberPhoto" />
<Header url="/customer/showroom" />
  <div class="main-page">
    <div class="showroom-vehicle-admin-box">
      <div class="showroom-vehicle-admin-back-box">
        <div class="showroom-vehicle-admin-background"></div>
        <img crossorigin="anonymous" v-if="getVehicle.photo1" :src="getVehicle.photo1" alt="" class="showroom-vehicle-admin-back-img">
        <img crossorigin="anonymous" v-if="!getVehicle.photo1" src="../assets/images/back-vehicle.jpg" alt="" class="showroom-vehicle-admin-back-img">
        <div class="showroom-vehicle-admin-title">
          <div class="title-white">{{getVehicle.brand}}</div><div class="title-green">{{getVehicle.model}}</div>
        </div>
        <div class="showroom-vehicle-admin-subtitles">
          <div class="showroom-vehicle-admin-subtitle">
            <div class="subtitle-green">{{getVehicle.year}}</div><div class="subtitle-white"></div>
          </div>
          <div class="showroom-vehicle-admin-subtitle">
            <div class="subtitle-green">{{getVehicle.kilometers}}</div><div class="subtitle-white">KM</div>
          </div>
          <div class="showroom-vehicle-admin-subtitle">
            <div class="subtitle-green">{{getVehicle.marketPrice/100}}</div><div class="subtitle-white">€</div>
          </div>
        </div>
      </div>
      <div class="showroom-vehicle-admin-infos-box">
        <p class="showroom-vehicle-admin-info-box">Marque : <span class="showroom-vehicle-admin-info">{{getVehicle.brand}}</span></p>
        <p class="showroom-vehicle-admin-info-box">Modèle : <span class="showroom-vehicle-admin-info">{{getVehicle.model}}</span></p>
        <p class="showroom-vehicle-admin-info-box">Année : <span class="showroom-vehicle-admin-info">{{getVehicle.year}}</span></p>
        <p class="showroom-vehicle-admin-info-box">KM : <span class="showroom-vehicle-admin-info">{{getVehicle.kilometers}}</span></p>
        <p class="showroom-vehicle-admin-info-box">Immat : <span class="showroom-vehicle-admin-info">{{getVehicle.immat}}</span></p>
        <p v-if="getVehicle.observations" class="showroom-vehicle-admin-info-box">Observations : <span class="showroom-vehicle-admin-info">{{getVehicle.observations}}</span></p>
        <p class="showroom-vehicle-admin-info-box">Prix Marchand : <span class="showroom-vehicle-admin-info">{{getVehicle.marketPrice/100}} €</span></p>
        <p class="showroom-vehicle-admin-info-box">Prix Public : <span class="showroom-vehicle-admin-info">{{getVehicle.publicPrice/100}} €</span></p>
        <p v-if="getVehicle.frevos" class="showroom-vehicle-admin-info-box">FREVOS : <span class="showroom-vehicle-admin-info">{{getVehicle.frevos}}</span></p>
        <p v-if="getVehicle.frevosPrice" class="showroom-vehicle-admin-info-box">Montant FREVOS : <span class="showroom-vehicle-admin-info">{{getVehicle.frevosPrice/100}} €</span></p>
        <div v-if="getVehicle.firstHand === 'yes'" class="first-box"><p>Première main</p><img crossorigin="anonymous" src="../assets/Icons/first.svg" alt="" class="first"></div>
      </div>
      <div class="showroom-vehicle-admin-photos-box">
        <div v-if="getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo1, number: 'photo1'})" :src="getVehicle.photo1" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo2, number: 'photo2'})" :src="getVehicle.photo2" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo3, number: 'photo3'})" :src="getVehicle.photo3" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo4, number: 'photo4'})" :src="getVehicle.photo4" alt="" class="showroom-vehicle-photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminGetPhotoVehicle from '@/components/AdminGetPhotoVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerShowroomVehicle',
  components: {
    AdminGetPhotoVehicle,
    Header
  },
  data() {
    return {
      numberPhoto: "",
      urlPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getVehicle', 'getPhotoBox'])
  },
  methods: {
    openPhotoBox(data) {
      this.urlPhoto = data.url
      this.$store.state.photoBox = data.mode
      this.numberPhoto = data.number
    },
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id);
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin' && res.data.role !== 'customer' && res.data.role !== 'employee') {
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

</style>