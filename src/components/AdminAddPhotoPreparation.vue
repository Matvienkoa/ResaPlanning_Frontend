<template>
  <div class="add-photo-preparation-back">
    <div class="add-photo-preparation-box">
      <img crossorigin="anonymous" @click="closeAddBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <Camera v-if="getCamera" @photo-captured="handlePhotoCapture" />
        <h2 class="add-box-title">Ajouter la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="add-photo-preparation-form">
          <label class="form-label" for="add-photo-preparation-form-photo" id="add-photo-preparation-form-label-photo">
            <img crossorigin="anonymous" src="../assets/Icons/file.svg" alt="" class="file-icon" />
            <p>Sélectionner une photo</p>
          </label>
          <input @change="onFileSelected" ref="photo" @input="cancelError(), resetData()" type="file" name="add-photo-preparation-form-photo" id="add-photo-preparation-form-photo" class="required">
          <h3 class="option-txt">Ou</h3>
          <div class="button-photo" @click="startCamera()">
            <img crossorigin="anonymous" src="../assets/Icons/camera.svg" alt="" class="file-icon" />
            <p>Prendre une photo</p>
          </div>
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
  width: 95%;
  max-width: 600px;
  min-height: 30%;
  max-height: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
  padding-bottom: 3em;
}
.add-photo-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#add-photo-preparation-form-photo{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#add-photo-preparation-form-label-photo, .button-photo{
  width: 80%;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 10px;
  border: dotted 2px rgb(184, 184, 184);
  padding: 5%;
  border-radius: 20px;
}
.file-icon{
  height: 40px;
  margin-right: 20px;
}
#add-photo-preparation-form-label-photo p, .button-photo p{
  font-size: 0.8em;
  line-height: 0.9em;
  color: #707e8d;
}
.option-txt{
  padding-top: 10px;
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