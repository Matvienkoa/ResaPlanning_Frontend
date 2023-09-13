<template>
<AdminGetPhotoVehicle v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" />
<Header url="/customer/showroom" />
  <div class="main-page">
    <div class="showroom-vehicle-admin-box">
      <div class="showroom-vehicle-admin-back-box">
        <div class="showroom-vehicle-admin-background"></div>
        <img v-if="getVehicle.photo1" :src="getVehicle.photo1" alt="" class="showroom-vehicle-admin-back-img">
        <img v-if="!getVehicle.photo1" src="../assets/images/back-vehicle.jpg" alt="" class="showroom-vehicle-admin-back-img">
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
            <div class="subtitle-green">{{getVehicle.price}}</div><div class="subtitle-white">€</div>
          </div>
        </div>
      </div>
      <div class="showroom-vehicle-admin-infos-box">
        <p>Marque : {{getVehicle.brand}}</p>
        <p>Modèle : {{getVehicle.model}}</p>
        <p>Année : {{getVehicle.year}}</p>
        <p>KM : {{getVehicle.kilometers}}</p>
        <p>Immat : {{getVehicle.immat}}</p>
        <p>Observations : {{getVehicle.observations}}</p>
        <p>Prix de vente : {{getVehicle.price}} €</p>
      </div>
      <div class="showroom-vehicle-admin-photos-box">
        <div v-if="getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo1})" :src="getVehicle.photo1" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo2})" :src="getVehicle.photo2" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo3})" :src="getVehicle.photo3" alt="" class="showroom-vehicle-photo">
        </div>
        <div v-if="getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo4})" :src="getVehicle.photo4" alt="" class="showroom-vehicle-photo">
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
    },
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id);
  }
}
</script>

<style scoped>

</style>