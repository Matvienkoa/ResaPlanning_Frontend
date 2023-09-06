<template>
<AdminEditVehicle v-if="getEditBox === 'editVehicle'" />
<AdminDeleteVehicle v-if="getDeleteBox === 'deleteVehicle'" />
<AdminEditPhotoVehicle v-if="getEditBox === 'editPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminAddPhotoVehicle v-if="getAddBox === 'addPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminDeletePhotoVehicle v-if="getDeleteBox === 'deletePhotoVehicle'" :numberPhoto="this.numberPhoto" />
  <Header url="/admin/showroom" />
  <BackButton url="/admin/showroom" />
  <div class="showroom-vehicle-admin-box">
    <div class="showroom-vehicle-admin-back-box">
      <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-admin-back-img">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="showroom-vehicle-admin-back-wave"><path fill="white" fill-opacity="1" d="M0,192L720,288L1440,64L1440,320L720,320L0,320Z"></path></svg>
    </div>
    <div class="showroom-vehicle-admin-photos-box">
      <div v-if="getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
        <img :src="getVehicle.photo1" alt="" class="showroom-vehicle-photo">
        <img @click="openEditPhoto({number: 'photo1', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
        <img @click="openDeletePhoto({number: 'photo1', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
      </div>
      <div v-if="!getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
        <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
        <img @click="openAddPhoto({number: 'photo1', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
      </div>
      <div v-if="getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
        <img :src="getVehicle.photo2" alt="" class="showroom-vehicle-photo">
        <img @click="openEditPhoto({number: 'photo2', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
        <img @click="openDeletePhoto({number: 'photo2', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
      </div>
      <div v-if="!getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
        <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
        <img @click="openAddPhoto({number: 'photo2', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
      </div>
      <div v-if="getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
        <img :src="getVehicle.photo3" alt="" class="showroom-vehicle-photo">
        <img @click="openEditPhoto({number: 'photo3', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
        <img @click="openDeletePhoto({number: 'photo3', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
      </div>
      <div v-if="!getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
        <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
        <img @click="openAddPhoto({number: 'photo3', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
      </div>
      <div v-if="getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
        <img :src="getVehicle.photo4" alt="" class="showroom-vehicle-photo">
        <img @click="openEditPhoto({number: 'photo4', type: 'editPhotoVehicle'})" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
        <img @click="openDeletePhoto({number: 'photo4', type: 'deletePhotoVehicle'})" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
      </div>
      <div v-if="!getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
        <img src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
        <img @click="openAddPhoto({number: 'photo4', type: 'addPhotoVehicle'})" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
      </div>
    </div>
    <div class="showroom-vehicle-admin-actions-box">
      <button @click="openEditBox('editVehicle')">Modifier</button>
      <button @click="openDeleteBox('deleteVehicle')">Supprimer</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';
import AdminEditVehicle from '@/components/AdminEditVehicle.vue';
import AdminDeleteVehicle from '@/components/AdminDeleteVehicle.vue';
import AdminEditPhotoVehicle from '@/components/AdminEditPhotoVehicle.vue';
import AdminAddPhotoVehicle from '@/components/AdminAddPhotoVehicle.vue';
import AdminDeletePhotoVehicle from '@/components/AdminDeletePhotoVehicle.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminShowroomVehicle',
  components: {
    Header,
    BackButton,
    AdminEditVehicle,
    AdminDeleteVehicle,
    AdminEditPhotoVehicle,
    AdminAddPhotoVehicle,
    AdminDeletePhotoVehicle
  },
  data() {
    return {
      numberPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getAddBox', 'getDeleteBox', 'getVehicle'])
  },
  methods: {
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

<style scoped>
.showroom-vehicle-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.showroom-vehicle-admin-back-box{
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.showroom-vehicle-admin-back-img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 90%;
  z-index: -1;
  opacity: 0.8;
}
.showroom-vehicle-admin-back-wave{
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
}
.showroom-vehicle-admin-title{
  display: flex;
  font-size: 4em;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 20px;
}
.title-white{
  color: white;
  margin: 0 10px;
}
.title-green{
  color: rgb(198,238,0);
  margin: 0 10px;
}

.showroom-vehicle-admin-subtitles{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 30%;
}
.showroom-vehicle-admin-subtitle{
  display: flex;
  align-items: center;
  font-weight: 700;
  text-transform: uppercase;
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

.showroom-vehicle-admin-photos-box{
  width: 100%;
  display: flex;
}
.showroom-vehicle-admin-photo-box{
  position: relative;
  width: 25%;
  height: 200px;
}
.showroom-vehicle-photo{
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  top: 50%;
  left: 40%;
  width: 20%;
}
</style>