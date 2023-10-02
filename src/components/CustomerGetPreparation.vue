<template>
  <div class="get-back">
    <AdminGetPhotoPreparation v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" :numberPhoto="this.numberPhoto" />
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Préparation du véhicule immatriculé {{getPreparation.immat}}</h2>
      <div v-if="getPreparation.state === 'planned'" class="get-box-state">
        <img crossorigin="anonymous" src="../assets/Icons/in-time.svg" alt="" class="get-state-icon" /><p class="get-state-txt-in-time">En cours</p>
      </div>
      <div v-if="getPreparation.state === 'completed'" class="get-box-state">
        <img crossorigin="anonymous" src="../assets/Icons/completed.svg" alt="" class="get-state-icon" /><p class="get-state-txt-completed">Terminée</p>
      </div>
      <div class="get-infos-box">
        <p v-if="getPreparation.state === 'planned'">Prévue pour le {{moment(getPreparation.end).format('LL')}}</p>
        <p v-if="getPreparation.state === 'completed'">Livrée le {{moment(getPreparation.end).format('LL')}}</p>
        <p>Marque : {{getPreparation.brand}}</p>
        <p>Modèle : {{getPreparation.model}}</p>
        <p>Annéee : {{getPreparation.year}}</p>
        <p>KM : {{getPreparation.kilometer}}</p>
        <p>Etat du véhicule : {{getPreparation.condition}}</p>
        <p v-if="getPreparation.observationsDepot">Observations : {{getPreparation.observationsDepot}}</p>
        <p v-if="!getPreparation.observationsDepot">Observations : non renseigné</p>
        <p v-if="getPreparation.observationsCustomer">Informations client : {{getPreparation.observationsCustomer}}</p>
        <p v-if="!getPreparation.observationsCustomer">Informations client : non renseigné</p>
      </div>
      <div class="get-steps-box">
        <h2 class="second-title">Etapes de préparations</h2>
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          <div v-if="step.state === 'planned'" class="step-state-box-in-time">
            <div class="step-state-box-icon-in-time">
              <img crossorigin="anonymous" src="../assets/Icons/in-time.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-in-time">En cours</p>
          </div>
          <div v-if="step.state === 'completed'" class="step-state-box-completed">
            <div class="step-state-box-icon-completed">
              <img crossorigin="anonymous" src="../assets/Icons/completed.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-completed">Terminé</p>
          </div>
          <h3 class="step-state-type">{{step.type}}</h3>
        </div>
        <h3 v-if="getSteps.length === 0" class="no-step">Aucune étape renseignée pour le moment</h3>
      </div>
      <h2 v-if="checkPhotos() > 0" class="second-title">Photos</h2>
      <div v-if="checkPhotos() > 0" class="get-photos-box">
        <div v-if="getPreparation.photo1" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo1, number: 'photo1'})" :src="getPreparation.photo1" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo2" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo2, number: 'photo2'})" :src="getPreparation.photo2" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo3" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo3, number: 'photo3'})" :src="getPreparation.photo3" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo4" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo4, number: 'photo4'})" :src="getPreparation.photo4" alt="" class="get-photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');
import AdminGetPhotoPreparation from '@/components/AdminGetPhotoPreparation.vue';

export default {
  name: 'CustomerGetPreparation',
  components: {
    AdminGetPhotoPreparation
  },
  props: ['id'],
  data() {
    return {
      moment: moment,
      urlPhoto: "",
      numberPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getSteps', 'getPhotoBox'])
  },
  methods: {
    checkPhotos() {
      let numberOfPhoto = 0;
      if (this.getPreparation.photo1) {
        numberOfPhoto += 1
      }
      if (this.getPreparation.photo2) {
        numberOfPhoto += 1
      }
      if (this.getPreparation.photo3) {
        numberOfPhoto += 1
      }
      if (this.getPreparation.photo4) {
        numberOfPhoto += 1
      }
      return numberOfPhoto
    },
    openPhotoBox(data) {
      this.urlPhoto = data.url
      this.$store.state.photoBox = data.mode
      this.numberPhoto = data.number
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
    }
  },
  created: function () {
    this.$store.dispatch('getPreparation', this.id)
  }
}
</script>

<style scoped>
.get-box{
  position: relative;
  width: 60%;
  max-width: 800px;
  min-height: 70%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 7;
  border-radius: 10px;
}
.get-box-title{
  text-align: start;
  width: 90%;
  border-bottom: 3px solid #c0c0c0;
  padding-bottom: 5px;
}
.get-box-state{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.get-infos-box{
  position: relative;
  background-color: rgb(240, 240, 240);
  padding: 0.4em 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.get-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
}
.second-title{
  text-align: start;
  width: 90%;
  border-bottom: 3px solid #c0c0c0;
  padding-bottom: 5px;
}
.get-state-icon{
  height: 40px;
  margin: 0 5px;
}
.get-state-txt-in-time{
  font-weight: 700;
  font-size: 1.4em;
  color: rgb(243,126,0);
  margin: 0 5px;
}
.get-state-txt-completed{
  font-weight: 700;
  font-size: 1.4em;
  color: rgb(198,238,0);
  margin: 0 5px;
}
.get-steps-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.step-box{
  position: relative;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.step-state-box-in-time, .step-state-box-completed{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
}
.step-state-box-icon-in-time{
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: solid 5px rgb(243,126,0);
}
.step-state-box-icon-completed{
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: solid 5px rgb(198,238,0);
}
.step-state-txt-in-time{
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(243,126,0);
}
.step-state-txt-completed{
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(198,238,0);
}
.step-state-icon{
  width: 60%;
  height: auto;
}
.step-state-type{
  margin-left: 20px;
}
.get-photos-box{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.get-photo-box{
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 5px 10px 5px;
}
.get-photo{
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}
</style>
