<template>
  <div class="get-back">
    <AdminGetPhotoPreparation v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" :numberPhoto="this.numberPhoto" />
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Préparation du véhicule immatriculé : {{getPreparation.immat}}</h2>
      <div v-if="getPreparation.state === 'planned' && moment(new Date()).isAfter(moment(getPreparation.start))" class="get-box-state">
        <img crossorigin="anonymous" src="../assets/Icons/in-time.svg" alt="" class="get-state-icon" /><p class="get-state-txt-in-time">En cours</p>
      </div>
      <div v-if="getPreparation.state === 'planned' && moment(new Date()).isBefore(moment(getPreparation.start))" class="get-box-state">
        <img src="../assets/Icons/calendar.svg" alt="" class="get-state-icon" /><p class="get-state-txt-calendar">Programmée</p>
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
        <h2 class="second-title">Prestations</h2>
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          <div v-if="step.state === 'planned' && moment(new Date()).isAfter(moment(getPreparation.start))" class="step-state-box-in-time">
            <div class="step-state-box-icon-in-time">
              <img crossorigin="anonymous" src="../assets/Icons/in-time.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-in-time">En cours</p>
          </div>
          <div v-if="step.state === 'planned' && moment(new Date()).isBefore(moment(getPreparation.start))" class="step-state-box-calendar">
            <div class="step-state-box-icon-calendar">
              <img crossorigin="anonymous" src="../assets/Icons/calendar.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-calendar">Programmé</p>
          </div>
          <div v-if="step.state === 'completed'" class="step-state-box-completed">
            <div class="step-state-box-icon-completed">
              <img crossorigin="anonymous" src="../assets/Icons/completed.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-completed">Terminé</p>
          </div>
          <h3 class="step-state-type">{{step.type}}</h3>
        </div>
        <h3 v-if="getSteps.length === 0" class="no-step">Aucune prestation renseignée pour le moment</h3>
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
.get-box-state{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.get-infos-box{
  position: relative;
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
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
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
  color: #09c407;
  margin: 0 5px;
}
.get-state-txt-calendar{
  font-weight: 700;
  font-size: 1.4em;
  color: rgb(55,136,216);
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
  width: 90%;
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.step-state-box-in-time, .step-state-box-completed, .step-state-box-calendar{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  border: solid 5px #09c407;
}
.step-state-box-icon-calendar{
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: solid 5px rgb(55,136,216);
}
.step-state-txt-in-time{
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(243,126,0);
}
.step-state-txt-completed{
  font-size: 1.2em;
  font-weight: 700;
  color: #09c407;
}
.step-state-txt-calendar{
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(55,136,216);
}
.step-state-icon{
  width: 60%;
  height: auto;
}
.step-state-type{
  font-family: 'catamaran', sans-serif;
  font-size: 1.2em;
  line-height: 1.1em;
  word-break: break-all;
  width: 100%;
  margin-left: 20px;
}
.no-step{
  width: 90%;
  text-align: center;
  margin-bottom: 20px;
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
  object-fit: cover;
  cursor: zoom-in;
}
@media (max-width: 769px) {
  .get-infos-box{
    margin-top: 30px;
  }
  .edit-icon-box{
    top: -45px;
    background: rgb(245, 245, 245);
  }
  .delete-icon-box{
    top: -45px;
    background: rgb(245, 245, 245);
  }
  .step-state-box-icon-in-time{
    height: 60px;
    width: 60px;
  }
  .step-state-box-icon-completed{
    height: 60px;
    width: 60px;
  }
  .step-state-txt-in-time{
    font-size: 1em;
  }
  .step-state-txt-completed{
    font-size: 1em;
  }
  .step-state-type{
    font-size: 1em;
    word-break: break-all;
    margin-left: 20px;
    width: 100%;
  }
}
@media (max-width: 480px) {
  .step-state-box-icon-in-time{
    height: 50px;
    width: 50px;
  }
  .step-state-box-icon-completed{
    height: 50px;
    width: 50px;
  }
  .step-state-txt-in-time{
    font-size: 0.8em;
  }
  .step-state-txt-completed{
    font-size: 0.8em;
  }
  .step-state-type{
    font-size: 1em;
    word-break: break-all;
    margin-left: 20px;
  }
}
</style>
