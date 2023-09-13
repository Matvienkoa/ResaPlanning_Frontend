<template>
<AdminEditVehicle v-if="getEditBox === 'editVehicle'" />
<AdminDeleteVehicle v-if="getDeleteBox === 'deleteVehicle'" />
<AdminGetPhotoVehicle v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" />
<AdminEditPhotoVehicle v-if="getEditBox === 'editPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminAddPhotoVehicle v-if="getAddBox === 'addPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminDeletePhotoVehicle v-if="getDeleteBox === 'deletePhotoVehicle'" :numberPhoto="this.numberPhoto" />
  <Header url="/admin/showroom" />
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
        <img @click="openEditBox('editVehicle')" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-admin-edit-icon">
        <img @click="openDeleteBox('deleteVehicle')" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-admin-delete-icon">
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
          <img @click="openEditPhoto({number: 'photo1', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          <img @click="openDeletePhoto({number: 'photo1', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
        </div>
        <div v-if="!getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <img @click="openAddPhoto({number: 'photo1', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
        </div>
        <div v-if="getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo2})" :src="getVehicle.photo2" alt="" class="showroom-vehicle-photo">
          <img @click="openEditPhoto({number: 'photo2', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          <img @click="openDeletePhoto({number: 'photo2', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
        </div>
        <div v-if="!getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <img @click="openAddPhoto({number: 'photo2', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
        </div>
        <div v-if="getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo3})" :src="getVehicle.photo3" alt="" class="showroom-vehicle-photo">
          <img @click="openEditPhoto({number: 'photo3', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          <img @click="openDeletePhoto({number: 'photo3', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
        </div>
        <div v-if="!getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <img @click="openAddPhoto({number: 'photo3', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
        </div>
        <div v-if="getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo4})" :src="getVehicle.photo4" alt="" class="showroom-vehicle-photo">
          <img @click="openEditPhoto({number: 'photo4', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          <img @click="openDeletePhoto({number: 'photo4', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
        </div>
        <div v-if="!getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <img @click="openAddPhoto({number: 'photo4', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminEditVehicle from '@/components/AdminEditVehicle.vue';
import AdminDeleteVehicle from '@/components/AdminDeleteVehicle.vue';
import AdminGetPhotoVehicle from '@/components/AdminGetPhotoVehicle.vue';
import AdminEditPhotoVehicle from '@/components/AdminEditPhotoVehicle.vue';
import AdminAddPhotoVehicle from '@/components/AdminAddPhotoVehicle.vue';
import AdminDeletePhotoVehicle from '@/components/AdminDeletePhotoVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminShowroomVehicle',
  components: {
    Header,
    AdminEditVehicle,
    AdminDeleteVehicle,
    AdminGetPhotoVehicle,
    AdminEditPhotoVehicle,
    AdminAddPhotoVehicle,
    AdminDeletePhotoVehicle
  },
  data() {
    return {
      numberPhoto: "",
      urlPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getAddBox', 'getDeleteBox', 'getVehicle', 'getPhotoBox'])
  },
  methods: {
    openPhotoBox(data) {
      this.urlPhoto = data.url
      this.$store.state.photoBox = data.mode
    },
    openEditBox(type) {
      this.$store.state.editBox = type
    },
    openEditPhoto(data) {
      this.numberPhoto = data.number
      this.$store.state.editBox = data.type
    },
    openAddPhoto(data) {
      this.numberPhoto = data.number
      this.$store.state.addBox = data.type
    },
    openDeletePhoto(data) {
      this.numberPhoto = data.number
      this.$store.state.deleteBox = data.type
    },
    openDeleteBox(type) {
      this.$store.state.deleteBox = type
    },
  },
  created: function () {
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('getVehicle', this.$route.params.id);
  }
}
</script>

<style>
.showroom-vehicle-admin-box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.showroom-vehicle-admin-back-box{
  position: relative;
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.showroom-vehicle-admin-back-img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  opacity: 0.2;
}
.showroom-vehicle-admin-background{
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  z-index: -2;
}
.showroom-vehicle-admin-title{
  width: 100%;
  display: flex;
  font-size: 4em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 30px;
}
.title-white{
  color: white;
  margin-left: 20px;
  margin-right: 20px;
}
.title-green{
  color: rgb(198,238,0);
}
.showroom-vehicle-admin-subtitles{
  width: 100%;
  display: flex;
}
.showroom-vehicle-admin-subtitle{
  display: flex;
  align-items: center;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 20px;
}
.subtitle-green{
  font-size: 3em;
  color: rgb(198,238,0);
  margin: 0 2px;
}
.subtitle-white{
  font-size: 2em;
  color: white;
  margin: 0 2px;
}
.showroom-vehicle-admin-edit-icon{
  cursor: pointer;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 40px;
}
.showroom-vehicle-admin-delete-icon{
  cursor: pointer;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 10px;
}

.showroom-vehicle-admin-infos-box{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.showroom-vehicle-admin-photos-box{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.showroom-vehicle-admin-photo-box{
  position: relative;
  width: 20%;
  max-width: 300px;
  min-width: 220px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  margin: 2%;
}
.showroom-vehicle-photo{
  cursor: zoom-in;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.showroom-vehicle-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.showroom-vehicle-edit-icon{
  width: 20px;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 15%;
  cursor: pointer;
}
.showroom-vehicle-delete-icon{
  width: 20px;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 2%;
  cursor: pointer;
}
.showroom-vehicle-add-icon{
  position: absolute;
  z-index: 1;
  top: 40%;
  left: 40%;
  height: 20%;
  cursor: pointer;
}
</style>