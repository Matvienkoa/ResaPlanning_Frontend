<template>
  <div class="edit-photo-vehicle-back">
    <div class="edit-photo-vehicle-box">
        <h2 class="add-box-title">Modifier la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="edit-photo-vehicle-form">
          <label class="form-label" for="vehicle-form-photo" id="vehicle-form-label-photo">
            <img crossorigin="anonymous" src="../assets/Icons/file.svg" alt="" class="file-icon" />
            <p>Sélectionner une photo</p>
          </label>
          <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="vehicle-form-photo" id="vehicle-form-photo" class="required">
          <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
          <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo1'" :src="getVehicle.photo1" alt="" class="photo-selected">
          <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo2'" :src="getVehicle.photo2" alt="" class="photo-selected">
          <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo3'" :src="getVehicle.photo3" alt="" class="photo-selected">
          <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo4'" :src="getVehicle.photo4" alt="" class="photo-selected">
          <div v-if="error" class="error">{{ error.message }}</div>
          <div class="box-choice-button">
            <button class="valid-button" @click="editPhotoVehicle()">Modifier</button>
            <div class="cancel-button" @click="closeEditBox()">Annuler</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminEditPhotoVehicle',
  props: ["numberPhoto"],
  data() {
    return {
      error: "",
      photo: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getVehicle'])
  },
  methods: {
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
    onFileSelected(event) {
        this.photo = event.target.files[0];
        this.url = URL.createObjectURL(event.target.files[0])
    },
    closeEditBox() {
      this.$store.state.editBox = "closed"
    },
    editPhotoVehicle() {
        const formData = new FormData();
        formData.append('numberPhoto', this.numberPhoto)
        formData.append('photo', this.photo)
        instance.put(`/vehicle/photo/${this.$route.params.id}`, formData)
        .then((res) => {
            if(res.status === 201) {
                this.$store.state.editBox = "closed"
                this.$store.dispatch('getVehicle', this.$route.params.id);
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
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id)
  }
}
</script>


<style scoped>
.edit-photo-vehicle-back{
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
  z-index: 9;
}
.edit-photo-vehicle-box{
  position: relative;
  width: 80%;
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
}
.edit-photo-vehicle-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
#vehicle-form-photo{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#vehicle-form-label-photo{
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
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
#vehicle-form-label-photo p{
  font-size: 0.8em;
  line-height: 0.9em;
  color: #707e8d;
}
.photo-selected{
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-top: 20px;
  border-radius: 10px;
}
.valid-button{
  width: auto;
  padding: 0 10px;
}

@media (max-width: 768px) {
  .edit-photo-vehicle-box{
    width: 90%;
  }
}
@media (max-width: 480px) {
  .edit-photo-vehicle-box{
    width: 95%;
    min-height: 40%;
    max-height: 95%;
  }
  .photo-selected{
    max-height: 200px;
  }
}
</style>