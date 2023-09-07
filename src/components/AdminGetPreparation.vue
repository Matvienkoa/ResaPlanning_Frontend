<template>
  <div class="get-back">
    <AdminEditPreparation v-if="getEditBox === 'editPreparation'" :preparationId="this.preparation" />
    <AdminDeletePreparation v-if="getDeleteBox === 'deletePreparation'" :preparationId="this.preparation" />
    <AdminEditStep v-if="getStepBox === 'editStep'" :preparationId="this.id" :stepId="step" :stepType="type" />
    <AdminDeleteStep v-if="getDeleteBox === 'deleteStep'" :preparationId="this.id" :stepId="step" />
    <AdminEditStateStep v-if="getStepBox === 'editStateStep'" :preparationId="this.id" :stepId="step" :stepState="state" />
    <AdminAddStep v-if="getAddBox === 'addStep'" :preparationId="this.id" />
    <AdminAddPhotoPreparation v-if="getAddBox === 'addPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminEditPhotoPreparation v-if="getEditBox === 'editPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminDeletePhotoPreparation v-if="getDeleteBox === 'deletePhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
    <AdminValidatePreparation v-if="getEditBox === 'validatePreparation'" :preparationId="this.id" />
    <AdminInvalidatePreparation v-if="getEditBox === 'invalidatePreparation'" :preparationId="this.id" />
    <div class="get-box">
      <img @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="get-box-title">Préparation du véhicule immatriculé {{getPreparation.immat}}</h2>
      <div v-if="getPreparation.state === 'planned'" class="get-box-state">
        <img src="../assets/Icons/in-time.svg" alt="" class="get-state-icon" /><p class="get-state-txt-in-time">En cours</p>
      </div>
      <div v-if="getPreparation.state === 'completed'" class="get-box-state">
        <img src="../assets/Icons/completed.svg" alt="" class="get-state-icon" /><p class="get-state-txt-completed">Terminée</p>
      </div>
      <div class="get-infos-box">
        <p>Marque : {{getPreparation.brand}}</p>
        <p>Modèle : {{getPreparation.model}}</p>
        <p>Annéee : {{getPreparation.year}}</p>
        <p>KM : {{getPreparation.kilometer}}</p>
        <p>Etat du véhicule : {{getPreparation.condition}}</p>
        <p>Observations : {{getPreparation.observationsDepot}}</p>
        <p>Informations client : {{getPreparation.observationsCustomer}}</p>
        <div class="buttons-prep-box">
          <img @click="openEditBox({mode: 'editPreparation', id: this.id})" src="../assets/Icons/edit.svg" alt="" class="edit-infos-prep-button" />
          <img @click="openDeleteBox({mode: 'deletePreparation', id: this.id})" src="../assets/Icons/delete.svg" alt="" class="delete-infos-prep-button" />
        </div>
      </div>
      <div class="get-steps-box">
        <h2 class="second-title">Etapes de préparations</h2>
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          <div v-if="step.state === 'planned'" @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="step-state-box-in-time">
            <div class="step-state-box-icon-in-time">
              <img src="../assets/Icons/in-time.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-in-time">En cours</p>
          </div>
          <div v-if="step.state === 'completed'" @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="step-state-box-completed">
            <div class="step-state-box-icon-completed">
              <img src="../assets/Icons/completed.svg" alt="" class="step-state-icon" />
            </div>
            <p class="step-state-txt-completed">Terminé</p>
          </div>
          <h3 class="step-state-type">{{step.type}}</h3>
          <div class="step-fonctions-box">
            <img @click="openEditStepBox({mode: 'editStep', id: step.id, type: step.type})" src="../assets/Icons/edit.svg" alt="" class="step-edit-icon" />
            <img @click="openDeleteStepBox({mode: 'deleteStep', id: step.id})" src="../assets/Icons/delete.svg" alt="" class="step-delete-icon" />
          </div>
        </div>
        <div class="add-step-box-2">
          <button class="add-button" @click="openAddStepBox('addStep')">Ajouter une étape</button>
        </div>
      </div>
      <h2 class="second-title">Photos</h2>
      <div class="get-photos-box">
        <div v-if="getPreparation.photo1" class="get-photo-box">
          <img :src="getPreparation.photo1" alt="" class="get-photo">
          <img @click="openEditPhoto({number: 'photo1', type: 'editPhotoPreparation'})" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          <img @click="openDeletePhoto({number: 'photo1', type: 'deletePhotoPreparation'})" src="../assets/Icons/delete.svg" alt="" class="get-photo-delete-icon">
        </div>
        <div v-if="!getPreparation.photo1" class="get-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img @click="openAddPhoto({number: 'photo1', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo2" class="get-photo-box">
          <img :src="getPreparation.photo2" alt="" class="get-photo">
          <img @click="openEditPhoto({number: 'photo2', type: 'editPhotoPreparation'})" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          <img @click="openDeletePhoto({number: 'photo2', type: 'deletePhotoPreparation'})" src="../assets/Icons/delete.svg" alt="" class="get-photo-delete-icon">
        </div>
        <div v-if="!getPreparation.photo2" class="get-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img @click="openAddPhoto({number: 'photo2', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo3" class="get-photo-box">
          <img :src="getPreparation.photo3" alt="" class="get-photo">
          <img @click="openEditPhoto({number: 'photo3', type: 'editPhotoPreparation'})" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          <img @click="openDeletePhoto({number: 'photo3', type: 'deletePhotoPreparation'})" src="../assets/Icons/delete.svg" alt="" class="get-photo-delete-icon">
        </div>
        <div v-if="!getPreparation.photo3" class="get-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img @click="openAddPhoto({number: 'photo3', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
        </div>
        <div v-if="getPreparation.photo4" class="get-photo-box">
          <img :src="getPreparation.photo4" alt="" class="get-photo">
          <img @click="openEditPhoto({number: 'photo4', type: 'editPhotoPreparation'})" src="../assets/Icons/edit.svg" alt="" class="get-photo-edit-icon">
          <img @click="openDeletePhoto({number: 'photo4', type: 'deletePhotoPreparation'})" src="../assets/Icons/delete.svg" alt="" class="get-photo-delete-icon">
        </div>
        <div v-if="!getPreparation.photo4" class="get-photo-box">
          <img src="../assets/images/1.jpg" alt="" class="get-no-photo">
          <img @click="openAddPhoto({number: 'photo4', type: 'addPhotoPreparation'})" src="../assets/Icons/add-photo.svg" alt="" class="get-photo-add-icon">
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

import AdminAddStep from '@/components/AdminAddStep.vue';
import AdminEditStep from '@/components/AdminEditStep.vue';
import AdminEditStateStep from '@/components/AdminEditStateStep.vue';
import AdminEditPreparation from '@/components/AdminEditPreparation.vue';
import AdminDeletePreparation from '@/components/AdminDeletePreparation.vue';
import AdminDeleteStep from '@/components/AdminDeleteStep.vue';
import AdminValidatePreparation from '@/components/AdminValidatePreparation.vue';
import AdminInvalidatePreparation from '@/components/AdminInvalidatePreparation.vue';

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
    AdminAddPhotoPreparation,
    AdminEditPhotoPreparation,
    AdminDeletePhotoPreparation,
    AdminValidatePreparation,
    AdminInvalidatePreparation
  },
  props: ['id'],
  data() {
    return {
      step: null,
      type: "",
      state: "",
      customer: null,
      preparation: null,
      numberPhoto: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getSteps', 'getCustomers', 'getStepBox', 'getEditBox', 'getAddBox', 'getDeleteBox'])
  },
  methods: {
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
    this.$store.dispatch('getCustomers');
    this.$store.dispatch('getPreparation', this.id)
  },
  updated() {
    
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
.get-box-state{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.buttons-prep-box{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.edit-infos-prep-button{
  height: 20px;
  cursor: pointer;
}
.delete-infos-prep-button{
  height: 20px;
  cursor: pointer;
  margin-left: 20px;
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
  justify-content: space-between;
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
  width: 260px;
  margin-left: 20px;
}
.step-fonctions-box{
  width: 55px;
  display: flex;
  justify-content: space-around;
}
.step-edit-icon{
  height: 20px;
  cursor: pointer;
}
.step-delete-icon{
  height: 20px;
  cursor: pointer;
}
.add-step-box-2{
  width: 100%;
  display: flex;
  justify-content: center;
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
}
.get-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.get-photo-edit-icon{
  height: 20px;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 15%;
  cursor: pointer;
}
.get-photo-delete-icon{
  height: 20px;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 2%;
  cursor: pointer;
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

</style>