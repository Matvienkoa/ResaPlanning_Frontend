<template>
  <div class="get-back">
    <AdminEditPreparation v-if="getEditBox === 'editPreparation'" :preparationId="this.preparation" />
    <AdminDeletePreparation v-if="getDeleteBox === 'deletePreparation'" :preparationId="this.preparation" />
    <AdminEditStep v-if="getStepBox === 'editStep'" :preparationId="this.id" :stepId="step" :stepType="type" />
    <AdminDeleteStep v-if="getDeleteBox === 'deleteStep'" :preparationId="this.id" :stepId="step" />
    <AdminEditStateStep v-if="getStepBox === 'editStateStep'" :preparationId="this.id" :stepId="step" :stepState="state" />
    <AdminAddStep v-if="getAddBox === 'addStep'" :preparationId="this.id" />
    <AdminGetPhotoPreparation v-if="getPhotoBox === 'getPhoto'" :url="this.urlPhoto" :numberPhoto="this.numberPhoto" />
    <AdminAddPhotoPreparation v-if="getAddBox === 'addPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminEditPhotoPreparation v-if="getEditBox === 'editPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminDeletePhotoPreparation v-if="getDeleteBox === 'deletePhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminValidatePreparation v-if="getEditBox === 'validatePreparation'" :preparationId="this.id" />
    <AdminInvalidatePreparation v-if="getEditBox === 'invalidatePreparation'" :preparationId="this.id" />
    <div class="get-box">
      <img crossorigin="anonymous" @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Préparation du véhicule immatriculé {{getPreparation.immat}}</h2>
      <div v-if="getPreparation.state === 'planned'" class="get-box-state">
        <img src="../assets/Icons/in-time.svg" alt="" class="get-state-icon" /><p class="get-state-txt-in-time">En cours</p>
      </div>
      <div v-if="getPreparation.state === 'completed'" class="get-box-state">
        <img src="../assets/Icons/completed.svg" alt="" class="get-state-icon" /><p class="get-state-txt-completed">Terminée</p>
      </div>
      <div class="get-infos-box">
        <p>Réalisée par : {{getPreparation.maker}}</p>
        <p>Du {{moment(getPreparation.start).format('LLL')}}</p>
        <p>Au {{moment(getPreparation.end).format('LLL')}}</p>
        <p>Marque : {{getPreparation.brand}}</p>
        <p>Modèle : {{getPreparation.model}}</p>
        <p>Annéee : {{getPreparation.year}}</p>
        <p>KM : {{getPreparation.kilometer}}</p>
        <p>Etat du véhicule : {{getPreparation.condition}}</p>
        <p v-if="getPreparation.observationsDepot">Observations : {{getPreparation.observationsDepot}}</p>
        <p v-if="!getPreparation.observationsDepot">Observations : Non renseigné</p>
        <p v-if="getPreparation.observationsCustomer">Informations client : {{getPreparation.observationsCustomer}}</p>
        <p v-if="!getPreparation.observationsCustomer">Informations client : Non renseigné</p>
        <div @click="openEditBox({mode: 'editPreparation', id: this.id})" class="edit-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="edit-icon" />
        </div>
        <div @click="openDeleteBox({mode: 'deletePreparation', id: this.id})" class="delete-icon-box">
          <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="delete-icon" />
        </div>
      </div>
      <div class="get-customer-box">
        <p>Client : {{getPreparation.company}} {{getPreparation.firstName}} {{getPreparation.lastName}}</p>
        <p>Adresse : {{getPreparation.adress}} {{getPreparation.adress2}} {{getPreparation.zipCode}} {{getPreparation.city}}</p>
        <p>Contact : {{getPreparation.phone}} {{getPreparation.mail}}</p>
      </div>
      <div class="get-steps-box">
        <h2 class="second-title">Etapes de préparations</h2>
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          <div v-if="step.state === 'planned'" @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="step-state-box-in-time">
            <div class="step-state-box-icon-in-time">
              <img crossorigin="anonymous" src="../assets/Icons/in-time.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-in-time">En cours</p>
          </div>
          <div v-if="step.state === 'completed'" @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="step-state-box-completed">
            <div class="step-state-box-icon-completed">
              <img crossorigin="anonymous" src="../assets/Icons/completed.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-completed">Terminé</p>
          </div>
          
          <h3 class="step-state-type">{{step.type}}</h3>
          <div class="step-fonctions-box">
            <div @click="openEditStepBox({mode: 'editStep', id: step.id, type: step.type})" class="edit-step-icon-box">
              <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="step-edit-icon" />
            </div>
            <div @click="openDeleteStepBox({mode: 'deleteStep', id: step.id})" class="delete-step-icon-box">
              <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="step-delete-icon" />
            </div>
          </div>
        </div>
        <h3 v-if="getSteps.length === 0" class="no-step">Aucune étape renseignée pour le moment</h3>
        <div class="add-step-box-2">
          <button class="add-button" @click="openAddStepBox('addStep')">Ajouter une étape</button>
        </div>
      </div>
      <h2 class="second-title">Photos</h2>
      <div class="get-photos-box">
        <div v-if="getPreparation.photo1" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo1, number: 'photo1'})" :src="getPreparation.photo1" alt="" class="get-photo">
          <div @click="openEditPhoto({number: 'photo1', type: 'editPhotoPreparation'})" class="get-photo-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo1', type: 'deletePhotoPreparation'})" class="get-photo-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="get-photo-delete-icon">
          </div>
        </div>
        <div v-if="!getPreparation.photo1" class="get-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img crossorigin="anonymous" @click="openAddPhoto({number: 'photo1', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo2" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo2, number: 'photo2'})" :src="getPreparation.photo2" alt="" class="get-photo">
          <div @click="openEditPhoto({number: 'photo2', type: 'editPhotoPreparation'})" class="get-photo-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo2', type: 'deletePhotoPreparation'})" class="get-photo-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="get-photo-delete-icon">
          </div>
        </div>
        <div v-if="!getPreparation.photo2" class="get-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img crossorigin="anonymous" @click="openAddPhoto({number: 'photo2', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo3" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo3, number: 'photo3'})" :src="getPreparation.photo3" alt="" class="get-photo">
          <div @click="openEditPhoto({number: 'photo3', type: 'editPhotoPreparation'})" class="get-photo-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo3', type: 'deletePhotoPreparation'})" class="get-photo-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="get-photo-delete-icon">
          </div>
        </div>
        <div v-if="!getPreparation.photo3" class="get-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img crossorigin="anonymous" @click="openAddPhoto({number: 'photo3', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo4" class="get-photo-box">
          <img crossorigin="anonymous" @click="openPhotoBox({mode:'getPhoto', url: getPreparation.photo4, number: 'photo4'})" :src="getPreparation.photo4" alt="" class="get-photo">
          <div @click="openEditPhoto({number: 'photo4', type: 'editPhotoPreparation'})" class="get-photo-edit-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          </div>
          <div @click="openDeletePhoto({number: 'photo4', type: 'deletePhotoPreparation'})" class="get-photo-delete-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/delete-2.svg" alt="" class="get-photo-delete-icon">
          </div>
        </div>
        <div v-if="!getPreparation.photo4" class="get-photo-box">
          <img crossorigin="anonymous" src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img crossorigin="anonymous" @click="openAddPhoto({number: 'photo4', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
      </div>
      <div class="button-box">
        <button class="add-button valid-prep-button" v-if="getPreparation.state === 'planned'" @click="openEditBox({mode: 'validatePreparation', id: this.id})">Marquer comme terminée</button>
        <button class="add-button invalid-prep-button " v-if="getPreparation.state === 'completed'" @click="openEditBox({mode: 'invalidatePreparation', id: this.id})">Marquer comme non terminée</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

import AdminAddStep from '@/components/AdminAddStep.vue';
import AdminEditStep from '@/components/AdminEditStep.vue';
import AdminEditStateStep from '@/components/AdminEditStateStep.vue';
import AdminEditPreparation from '@/components/AdminEditPreparation.vue';
import AdminDeletePreparation from '@/components/AdminDeletePreparation.vue';
import AdminDeleteStep from '@/components/AdminDeleteStep.vue';
import AdminValidatePreparation from '@/components/AdminValidatePreparation.vue';
import AdminInvalidatePreparation from '@/components/AdminInvalidatePreparation.vue';

import AdminGetPhotoPreparation from '@/components/AdminGetPhotoPreparation.vue';
import AdminAddPhotoPreparation from '@/components/AdminAddPhotoPreparation.vue';
import AdminEditPhotoPreparation from '@/components/AdminEditPhotoPreparation.vue';
import AdminDeletePhotoPreparation from '@/components/AdminDeletePhotoPreparation.vue';

export default {
  name: 'AdminGetPreparation',
  components: {
    AdminAddStep,
    AdminEditStep,
    AdminEditStateStep,
    AdminEditPreparation,
    AdminDeletePreparation,
    AdminDeleteStep,
    AdminGetPhotoPreparation,
    AdminAddPhotoPreparation,
    AdminEditPhotoPreparation,
    AdminDeletePhotoPreparation,
    AdminValidatePreparation,
    AdminInvalidatePreparation
  },
  props: ['id'],
  data() {
    return {
      moment: moment,
      step: null,
      type: "",
      state: "",
      preparation: null,
      numberPhoto: "",
      urlPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getSteps', 'getStepBox', 'getEditBox', 'getAddBox', 'getDeleteBox', 'getPhotoBox'])
  },
  methods: {
    openPhotoBox(data) {
      this.urlPhoto = data.url
      this.$store.state.photoBox = data.mode
      this.numberPhoto = data.number
    },
    openEditBox(data) {
      this.preparation = data.id
      this.$store.state.editBox = data.mode
    },
    openDeleteBox(data) {
      this.preparation = data.id
      this.$store.state.deleteBox = data.mode
    },
    openEditStateStepBox(data) {
      this.step = data.id
      this.state = data.state
      this.$store.state.stepBox = data.mode
    },
    openEditStepBox(data) {
      this.step = data.id
      this.type = data.type
      this.$store.state.stepBox = data.mode
    },
    openAddStepBox(data) {
      this.$store.state.addBox = data
    },
    openDeleteStepBox(data) {
      this.step = data.id
      this.$store.state.deleteBox = data.mode
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
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
    }
  },
  created: function () {
    // this.$store.dispatch('getCustomers');
    this.$store.dispatch('getPreparation', this.id)
    // .then((res) => {
    //   this.$store.dispatch('getCustomer', res.data.customerId)
    // })
  }
}
</script>

<style>
.get-customer-box{
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 0.4em 0;
  border-radius: 10px;
  font-family: 'catamaran', sans-serif;
  font-size: 1.2em;
  line-height: 1.2em;
}
.get-customer-box p{
  margin-left: 10px;
  margin-right: 10px;
}
</style>

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
  color: rgb(198,238,0);
  margin: 0 5px;
}
.edit-icon-box{
  position: absolute;
  top: 5px;
  right: 45px;
  height: 35px;
  width: 35px;
  margin: unset;
}
.delete-icon-box{
  position: absolute;
  top: 5px;
  right: 5px;
  height: 35px;
  width: 35px;
  margin: unset;
}
.edit-icon{
  height: 16px;
}
.delete-icon{
  height: 16px;
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
.step-state-box-in-time, .step-state-box-completed{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(243,126,0);
}
.step-state-txt-completed{
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  color: rgb(198,238,0);
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
  width: 70%;
  margin-left: 20px;
  margin-right: 100px;
}
.step-fonctions-box{
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
}
.edit-step-icon-box{
  height: 35px;
  width: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #f0f0f0;
  margin-right: 5px;
}
.step-edit-icon{
  height: 16px;
}
.delete-step-icon-box{
  height: 35px;
  width: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #f0f0f0;
  margin-right: 5px;
}
.step-delete-icon{
  height: 16px;
}
.add-step-box-2{
  width: 100%;
  display: flex;
  justify-content: center;
}
.no-step{
  width: 90%;
  text-align: center;
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
.get-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.get-photo-edit-icon-box{
  background-color: white;
  border-radius: 30px;
  height: 30px;
  width: 30px;
  bottom: 3px;
  right: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.get-photo-edit-icon{
  height: 15px;
}
.get-photo-delete-icon-box{
  background-color: white;
  border-radius: 30px;
  height: 30px;
  width: 30px;
  bottom: 3px;
  right: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.get-photo-delete-icon{
  height: 15px;
}
.get-photo-add-icon{
  position: absolute;
  z-index: 1;
  top: 35%;
  left: 40%;
  width: 30%;
  cursor: pointer;
}
.button-box{
  width: 100%;
  display: flex;
  justify-content: center;
}
.valid-prep-button{
  width: 240px;
  height: 40px;
}
.invalid-prep-button{
  width: 240px;
  height: 40px;
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
    width: 70%;
    margin-left: 20px;
    margin-right: 90px;
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
    width: 70%;
    margin-left: 20px;
    margin-right: 60px;
  }
  .step-fonctions-box{
    flex-direction: column;
    justify-content: space-evenly;
  }
  .edit-step-icon-box{
    margin-bottom: 5px;
  }
}
</style>