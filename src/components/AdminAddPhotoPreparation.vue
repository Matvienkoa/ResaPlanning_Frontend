<template>
  <div class="add-photo-preparation-back">
    <div class="add-photo-preparation-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <Camera v-if="getCamera" @photo-captured="handlePhotoCapture" />
        <h2 class="add-box-title">Ajouter la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="add-photo-preparation-form">
            <input @change="onFileSelected" ref="photo" @input="cancelError(), resetData()" type="file" name="add-photo-preparation-form-photo" id="add-photo-preparation-form-photo" class="required">
            <button @click="startCamera()">Prendre une photo</button>
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.getActualPhoto" :src="this.getActualPhoto" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <div v-if="this.photo" class="box-choice-button">
              <button class="add-button" @click="addPhotoPreparation()">Ajouter la photo</button>
              <div class="cancel-button" @click="closeAddBox()">Annuler</div>
            </div>
            <div v-if="this.photoCamera" class="box-choice-button">
              <button class="add-button" @click="addPhotoShootPreparation()">Ajouter la photo</button>
              <div class="cancel-button" @click="closeAddBox()">Annuler</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

import Camera from '@/components/Camera.vue';

export default {
  name: 'AdminAddPhotoPreparation',
  props: ["numberPhoto", 'preparationId'],
  components: {
    Camera
  },
  data() {
    return {
      error: "",
      photo: "",
      photoCamera: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getCamera', 'getActualPhoto'])
  },
  methods: {
    handlePhotoCapture(file) {
      this.photoCamera = file
    },
    startCamera() {
      this.$store.state.camera = true;
      this.resetData()
    },
    checkPhoto(photo) {
      let number = ""
      switch (photo) {
        case 'photo1':
          number = '1'
          break;
        case 'photo2':
          number = '2';
          break;
        case 'photo3':
          number = '3'
          break;
        case 'photo4':
          number = '4'
          break;
      }
      return number
    },
    resetData() {
      this.photo = ""
      this.photoCamera = ""
      this.url = ""
      this.$store.state.actualPhoto = ""
    },
    onFileSelected(event) {
      this.photo = event.target.files[0];
      if(event.target.files[0]) {
        this.url = URL.createObjectURL(event.target.files[0])
      }
      this.$store.state.actualPhoto = ""
      this.photoCamera = ""
    },
    closeAddBox() {
      this.$store.state.addBox = "closed"
    },
    addPhotoPreparation() {
      const formData = new FormData();
      formData.append('numberPhoto', this.numberPhoto)
      formData.append('photo', this.photo)
      instance.put(`/preparation/photo/${this.preparationId}`, formData)
      .then((res) => {
        if(res.status === 201) {
          this.closeAddBox();
          this.$store.dispatch('getPreparation', this.preparationId)
        }
      })
      .catch(() => {
        this.error = {message: "Une erreur est survenue. Le fichier n'est pas au bon format ou dépasse la taille limite"}
        const emptyInput = document.querySelectorAll('.required');
        emptyInput.forEach(input => {
          if(input.value === "") {
            input.classList.add('empty')
          }
        })
      })
    },
    addPhotoShootPreparation() {
      const formData = new FormData();
      formData.append('numberPhoto', this.numberPhoto)
      formData.append('photo', this.photoCamera)
      instance.put(`/preparation/photo/${this.preparationId}`, formData)
      .then((res) => {
        if(res.status === 201) {
          this.closeAddBox();
          this.$store.dispatch('getPreparation', this.preparationId)
        }
      })
      .catch(() => {
        this.error = {message: "Une erreur est survenue. Le fichier n'est pas au bon format ou dépasse la taille limite"}
        const emptyInput = document.querySelectorAll('.required');
        emptyInput.forEach(input => {
          if(input.value === "") {
            input.classList.add('empty')
          }
        })
      })
    },
    cancelError() {
      const emptyInput = document.querySelectorAll('.required');
      emptyInput.forEach(input => {
        if(input.value !== "") {
          input.classList.remove('empty')
        }
      })
      this.error = ''
    }
  },
  created() {
    this.$store.state.actualPhoto = ""
  }
}
</script>


<style scoped>
.add-photo-preparation-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.add-photo-preparation-box{
  position: relative;
  width: 100%;
  max-width: 700px;
  min-height: 40%;
  max-height: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
.add-photo-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
.photo-selected{
  width: 100%;
  object-fit: cover;
  margin-top: 20px;
}
.add-button{
  margin: 0 10px;
}
</style>