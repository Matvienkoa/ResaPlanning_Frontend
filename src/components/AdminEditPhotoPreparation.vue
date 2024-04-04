<template>
  <div class="edit-photo-preparation-back" id="edit-photo-preparation-back">
    <div id="spinner" class="spinner-off">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <Camera v-if="getCamera" :resolution="{ width: 1920, height: 1080 }" ref="camera" @loading="showSpinner" @started="hideSpinner">
      <img src="../assets/Icons/photo.svg" alt="" @click="snapshot()" id="photo-button" class="hide" />
      <img src="../assets/Icons/cancel.svg" alt="" @click="stopCamera()" id="stop-photo-button" class="hide" />
    </Camera>
    <div class="edit-photo-preparation-box" id="edit-photo-preparation-box">
      <img crossorigin="anonymous" @click="closeEditBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
      <h2 class="add-box-title">Modifier la photo n°{{checkPhoto(numberPhoto)}}</h2>
      <div class="edit-photo-preparation-form">
        <label class="form-label" for="edit-photo-preparation-form-photo" id="edit-photo-preparation-form-label-photo">
          <img crossorigin="anonymous" src="../assets/Icons/file.svg" alt="" class="file-icon" />
          <p>Sélectionner une photo</p>
        </label>
        <input @change="onFileSelected" ref="photo" @input="cancelError(), resetData()" type="file" name="edit-photo-preparation-form-photo" id="edit-photo-preparation-form-photo" class="required">
        <h3 class="option-txt">Ou</h3>
        <div class="button-photo" @click="startCamera()">
          <img crossorigin="anonymous" src="../assets/Icons/camera.svg" alt="" class="file-icon" />
          <p>Prendre une photo</p>
        </div>
        <img crossorigin="anonymous" v-if="this.photoUrl" :src="this.photoUrl" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.url === '' && !this.photoUrl && this.numberPhoto ==='photo1'" :src="getPreparation.photo1" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.url === '' && !this.photoUrl && this.numberPhoto ==='photo2'" :src="getPreparation.photo2" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.url === '' && !this.photoUrl && this.numberPhoto ==='photo3'" :src="getPreparation.photo3" alt="" class="photo-selected">
        <img crossorigin="anonymous" v-if="this.url === '' && !this.photoUrl && this.numberPhoto ==='photo4'" :src="getPreparation.photo4" alt="" class="photo-selected">
        <div v-if="error" class="error">{{ error.message }}</div>
        <div v-if="this.photo" class="box-choice-button">
          <button class="valid-button" @click="editPhotoPreparation()">Modifier</button>
          <div class="cancel-button" @click="closeEditBox()">Annuler</div>
        </div>
        <div v-if="this.photoCamera" class="box-choice-button">
          <button class="add-button" @click="editPhotoShootPreparation()">Ajouter la photo</button>
          <div class="cancel-button" @click="closeEditBox()">Annuler</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';
import { ref } from 'vue';
import Camera from 'simple-vue-camera';

export default {
  name: 'AdminEditPhotoPreparation',
  props: ["numberPhoto", 'preparationId'],
  components: {
    Camera
  },
  data() {
    return {
      error: "",
      photo: "",
      url: ""
    }
  },
  setup() {
    let getCamera = ref(false);
    const camera = ref(null);
    const photoCamera = ref(null);
    const photoUrl = ref(null);
    const snapshot = async () => {
      const blob = await camera.value?.snapshot({width: window.innerWidth, height: window.innerHeight});
      const file = new File([blob], 'photo.png', { type: 'image/png' });
      photoCamera.value = file
      const url = URL.createObjectURL(blob)
      photoUrl.value = url
      getCamera.value = false;
    }
    return {
        camera,
        snapshot,
        photoCamera,
        photoUrl,
        getCamera,
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getPreparation'])
  },
  methods: {
    startCamera() {
      this.getCamera = true;
      this.resetData();
    },
    stopCamera() {
      this.getCamera = false;
      this.resetData();
    },
    showSpinner() {
      const spinner = document.getElementById('spinner');
      spinner.classList.replace('spinner-off', 'lds-ring');
      const body = document.getElementById('edit-photo-preparation-box');
      body.classList.add('on');
    },
    hideSpinner() {
      const spinner = document.getElementById('spinner');
      spinner.classList.replace('lds-ring', 'spinner-off');
      const body = document.getElementById('edit-photo-preparation-box');
      body.classList.remove('on');
      this.showButtons();
    },
    showButtons() {
      document.getElementById('photo-button').classList.remove('hide')
      document.getElementById('stop-photo-button').classList.remove('hide')
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
      this.photoUrl = ""
    },
    onFileSelected(event) {
      this.photo = event.target.files[0];
      if(event.target.files[0]) {
        this.url = URL.createObjectURL(event.target.files[0])
      }
      this.$store.state.actualPhoto = ""
      this.photoCamera = ""
    },
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    editPhotoPreparation() {
        const formData = new FormData();
        formData.append('numberPhoto', this.numberPhoto)
        formData.append('photo', this.photo)
        instance.put(`/preparation/photo/${this.preparationId}`, formData)
        .then((res) => {
            if(res.status === 201) {
                this.closeEditBox();
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
    editPhotoShootPreparation() {
        const formData = new FormData();
        formData.append('numberPhoto', this.numberPhoto)
        formData.append('photo', this.photoCamera)
        instance.put(`/preparation/photo/${this.preparationId}`, formData)
        .then((res) => {
            if(res.status === 201) {
                this.closeEditBox();
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
    },
  }
}
</script>


<style scoped>
.hide{
  display: none;
}
.on{
    opacity: 0.5;
}
.edit-photo-preparation-back{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.edit-photo-preparation-box{
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
  z-index: 11;
  border-radius: 10px;
  padding-bottom: 3em;
}
.edit-photo-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#edit-photo-preparation-form-photo{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#edit-photo-preparation-form-label-photo, .button-photo{
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
#edit-photo-preparation-form-label-photo p, .button-photo p{
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