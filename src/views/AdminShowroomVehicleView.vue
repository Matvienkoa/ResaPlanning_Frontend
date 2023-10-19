<template>
<AdminEditVehicle v-if="getEditBox === 'editVehicle'" />
<AdminDeleteVehicle v-if="getDeleteBox === 'deleteVehicle'" />
<AdminGetPhotoVehicle v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" :numberPhoto="this.numberPhoto" />
<AdminEditPhotoVehicle v-if="getEditBox === 'editPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminAddPhotoVehicle v-if="getAddBox === 'addPhotoVehicle'" :numberPhoto="this.numberPhoto" />
<AdminDeletePhotoVehicle v-if="getDeleteBox === 'deletePhotoVehicle'" :numberPhoto="this.numberPhoto" />
  <Header url="/admin/showroom" />
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
        <div @click="openEditBox('editVehicle')" class="showroom-vehicle-admin-edit-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-admin-edit-icon">
        </div>
        <div @click="openDeleteBox('deleteVehicle')" class="showroom-vehicle-admin-delete-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-admin-delete-icon">
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
        <p class="showroom-vehicle-admin-info-box">Prix d'achat : <span class="showroom-vehicle-admin-info">{{getVehicle.purchasePrice/100}} €</span></p>
        <p v-if="getVehicle.frevos" class="showroom-vehicle-admin-info-box">FREVOS : <span class="showroom-vehicle-admin-info">{{getVehicle.frevos}}</span></p>
        <p v-if="getVehicle.frevosPrice" class="showroom-vehicle-admin-info-box">Montant FREVOS : <span class="showroom-vehicle-admin-info">{{getVehicle.frevosPrice/100}} €</span></p>
        <div v-if="getVehicle.firstHand === 'yes'" class="first-box"><p>Première main</p><img crossorigin="anonymous" src="../assets/Icons/first.svg" alt="" class="first"></div>
      </div>
      <div class="showroom-vehicle-admin-photos-box">
        <div v-if="getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo1, number: 'photo1'})" :src="getVehicle.photo1" alt="" class="showroom-vehicle-photo">
          <div @click="openEditPhoto({number: 'photo1', type: 'editPhotoVehicle'})" class="showroom-vehicle-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo1', type: 'deletePhotoVehicle'})" class="showroom-vehicle-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
          </div>
        </div>
        <div v-if="!getVehicle.photo1" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <div @click="openAddPhoto({number: 'photo1', type: 'addPhotoVehicle'})" class="showroom-vehicle-add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
          </div>
        </div>
        <div v-if="getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo2, number: 'photo2'})" :src="getVehicle.photo2" alt="" class="showroom-vehicle-photo">
          <div @click="openEditPhoto({number: 'photo2', type: 'editPhotoVehicle'})" class="showroom-vehicle-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo2', type: 'deletePhotoVehicle'})" class="showroom-vehicle-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
          </div>
        </div>
        <div v-if="!getVehicle.photo2" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <div @click="openAddPhoto({number: 'photo2', type: 'addPhotoVehicle'})" class="showroom-vehicle-add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
          </div>
        </div>
        <div v-if="getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo3, number: 'photo3'})" :src="getVehicle.photo3" alt="" class="showroom-vehicle-photo">
          <div @click="openEditPhoto({number: 'photo3', type: 'editPhotoVehicle'})" class="showroom-vehicle-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo3', type: 'deletePhotoVehicle'})" class="showroom-vehicle-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
          </div>
        </div>
        <div v-if="!getVehicle.photo3" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <div @click="openAddPhoto({number: 'photo3', type: 'addPhotoVehicle'})" class="showroom-vehicle-add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
          </div>
        </div>
        <div v-if="getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getVehicle.photo4, number: 'photo4'})" :src="getVehicle.photo4" alt="" class="showroom-vehicle-photo">
          <div @click="openEditPhoto({number: 'photo4', type: 'editPhotoVehicle'})" class="showroom-vehicle-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="showroom-vehicle-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo4', type: 'deletePhotoVehicle'})" class="showroom-vehicle-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="showroom-vehicle-delete-icon">
          </div>
        </div>
        <div v-if="!getVehicle.photo4" class="showroom-vehicle-admin-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="showroom-vehicle-no-photo">
          <div @click="openAddPhoto({number: 'photo4', type: 'addPhotoVehicle'})" class="showroom-vehicle-add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add-photo.svg" alt="" class="showroom-vehicle-add-icon">
          </div>
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
import instance from '@/axios';

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
      this.numberPhoto = data.number
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
          if(res.data.role !== 'employee') {
            this.$router.push('/')
          }
          if(res.data.role === 'employee') {
            instance.get(`/employee/user/${res.data.id}`)
            .then((res) => {
              if(res.data.privilegesM !== 'yes') {
                this.$router.push('/')
              }
            })
          }
        }
      } else {
        this.$router.push('/')
      }
    })
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
  margin-bottom: 30px;
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
  font-family: 'trumpSoftPro', sans-serif;
  width: 100%;
  display: flex;
  font-size: 6em;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 30px;
  margin-left: 10px;
}
.title-white{
  color: white;
  margin-left: 10px;
  margin-right: 10px;
}
.title-green{
  color: #c90200;
  margin-left: 10px;
  margin-right: 10px;
}
.showroom-vehicle-admin-subtitles{
  width: 100%;
  display: flex;
}
.showroom-vehicle-admin-subtitle{
  font-family: 'trumpSoftPro', sans-serif;
  display: flex;
  align-items: center;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 15px;
  font-size: 1.6em;
}
.subtitle-green{
  font-size: 3em;
  color: #c90200;
  margin: 0 5px;
}
.subtitle-white{
  font-size: 2em;
  color: white;
  margin: 0 5px;
}
.showroom-vehicle-admin-edit-icon-box{
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  bottom: 10px;
  right: 60px;
  background-color: white;
}
.showroom-vehicle-admin-edit-icon{
  height: 20px;
}
.showroom-vehicle-admin-delete-icon-box{
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
}
.showroom-vehicle-admin-delete-icon{
  height: 20px;
}
.showroom-vehicle-admin-infos-box{
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 30px;
  border-left: #c90200 solid 6px;
  padding-left: 10px;
  font-family: 'catamaran', sans-serif;
  line-height: 1.2em;
  font-size: 1.2em;
}
.showroom-vehicle-admin-info-box{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.showroom-vehicle-admin-info{
  margin-left: 5px;
  font-weight: 600;
  font-size: 1.3em;
}
.first-box{
  display: flex;
  align-items: flex-end;
}
.first{
  width: 30px;
  margin-left: 10px;
}
.showroom-vehicle-admin-photos-box{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4em;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.showroom-vehicle-photo{
  cursor: zoom-in;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.showroom-vehicle-no-photo{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}
.showroom-vehicle-edit-icon-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  z-index: 1;
  bottom: 2%;
  right: 17%;
  background-color: white;
}
.showroom-vehicle-edit-icon{
  width: 17px;
}
.showroom-vehicle-delete-icon-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  z-index: 1;
  bottom: 2%;
  right: 2%;
  background-color: white;
}
.showroom-vehicle-delete-icon{
  height: 17px;
}
.showroom-vehicle-add-icon-box{
  cursor: pointer;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: white;
}
.showroom-vehicle-add-icon{
  height: 30px;
}

@media (max-width: 1024px) {
  .showroom-vehicle-admin-title{
    font-size: 5em;
  }
  .showroom-vehicle-admin-subtitle{
    font-size: 1.4em;
  }
}
@media (max-width: 768px) {
  .showroom-vehicle-admin-title{
    flex-wrap: wrap;
  }
  .showroom-vehicle-admin-subtitles{
    flex-wrap: wrap;
  }
  .showroom-vehicle-admin-subtitle{
    margin: 0 10px;
  }
}
@media (max-width: 600px) {
  .showroom-vehicle-admin-title{
    font-size: 4em;
  }
  .showroom-vehicle-admin-subtitle{
    font-size: 1.2em;
  }
}
@media (max-width: 480px) {
  .showroom-vehicle-admin-title{
    font-size: 4em;
  }
  .showroom-vehicle-admin-subtitle{
    font-size: 1em;
  }
  .showroom-vehicle-admin-photo-box{
    width: 80%;
    max-width: 300px;
    min-width: 220px;
    height: 200px;
  }
}
</style>