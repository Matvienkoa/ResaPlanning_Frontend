<template>
  <div class="edit-photo-preparation-back">
    <div class="edit-photo-preparation-box">
        <h2 class="add-box-title">Modifier la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="edit-photo-preparation-form">
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="edit-photo-preparation-form-photo" id="edit-photo-preparation-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo1'" :src="getPreparation.photo1" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo2'" :src="getPreparation.photo2" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo3'" :src="getPreparation.photo3" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo4'" :src="getPreparation.photo4" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="editPhotoPreparation()">Modifier la photo</button>
              <button class="delete-button" @click="closeEditBox()">Annuler</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminEditPhotoPreparation',
  props: ["numberPhoto", 'preparationId'],
  data() {
    return {
      error: "",
      photo: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox', 'getPreparation'])
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
        .catch((error) => {
            this.error = error.response.data;
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
.edit-photo-preparation-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.edit-photo-preparation-box{
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
.edit-photo-preparation-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
.photo-selected{
  width: 100%;
  object-fit: cover;
}
</style>