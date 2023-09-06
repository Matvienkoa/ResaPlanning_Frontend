<template>
  <div class="get-back">
    <div class="get-box">
      <img @click="closeGetBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <div @click="openEditBox({mode: 'editPreparation', id: this.id})" class="edit-infos-icon">Edit</div>
        <div @click="openDeleteBox({mode: 'deletePreparation', id: this.id})" class="delete-infos-icon">Supp</div>
      <h2 class="get-box-title">Préparation du véhicule immatriculé {{getPreparation.immat}}</h2>
      <div class="get-infos-box">
        <p>Marque : {{getPreparation.brand}}</p>
        <p>Modèle : {{getPreparation.model}}</p>
        <p>Annéee : {{getPreparation.year}}</p>
        <p>KM : {{getPreparation.kilometer}}</p>
        <p>Etat du véhicule : {{getPreparation.state}}</p>


        
        
      </div>
      <div class="get-steps-box">
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          {{step.type}}
          <div @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="planned" v-if="step.state === 'planned'">En cours</div>
          <div @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="completed" v-if="step.state === 'completed'">Terminé</div>
          <div @click="openEditStepBox({mode: 'editStep', id: step.id, type: step.type})">Modifier</div>
          <div @click="openDeleteStepBox({mode: 'deleteStep', id: step.id})">Supprimer</div>
        </div>
        <div class="add-step-box-2">
          <button @click="openAddStepBox('addStep')">Ajouter</button>
        </div>
      </div>
      <AdminAddStep v-if="getAddBox === 'addStep'" :preparationId="this.id" />
      <AdminEditStep v-if="getStepBox === 'editStep'" :preparationId="this.id" :stepId="step" :stepType="type" />
      <AdminEditStateStep v-if="getStepBox === 'editStateStep'" :preparationId="this.id" :stepId="step" :stepState="state" />
      <AdminEditPreparation v-if="getEditBox === 'editPreparation'" :preparationId="this.preparation" />
      <AdminDeletePreparation v-if="getDeleteBox === 'deletePreparation'" :preparationId="this.preparation" />
      <AdminDeleteStep v-if="getDeleteBox === 'deleteStep'" :preparationId="this.id" :stepId="step" />
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
      <AdminAddPhotoPreparation v-if="getAddBox === 'addPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
      <AdminEditPhotoPreparation v-if="getEditBox === 'editPhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
      <AdminDeletePhotoPreparation v-if="getDeleteBox === 'deletePhotoPreparation'" :preparationId="this.id" :numberPhoto="this.numberPhoto" />
      <AdminValidatePreparation v-if="getEditBox === 'validatePreparation'" :preparationId="this.id" />
      <AdminInvalidatePreparation v-if="getEditBox === 'invalidatePreparation'" :preparationId="this.id" />
      <button v-if="getPreparation.state === 'planned'" @click="openEditBox({mode: 'validatePreparation', id: this.id})">Marquer comme terminée</button>
      <button v-if="getPreparation.state === 'completed'" @click="openEditBox({mode: 'invalidatePreparation', id: this.id})">Marquer comme non terminée</button>
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
    justify-content: center;
    overflow-y: auto;
    z-index: 7;
    border-radius: 10px;
}

.get-steps-box{
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.step-box, .add-step-box-2{
  width: 100px;
  height: 80px;
  border: red solid 1px;
}

.planned{
  font-weight: bold;
  color: red;
}
.completed{
  font-weight: bold;
  color: green;
}

.get-photos-box{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.get-photo-box{
  position: relative;
  width: 150px;
  height: 150px;
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
  width: 20px;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 15%;
  cursor: pointer;
}
.get-photo-delete-icon{
  width: 20px;
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
}
</style>