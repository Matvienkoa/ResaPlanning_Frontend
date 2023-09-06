<template>
  <div class="edit-photo-preparation-back">
    <div class="edit-photo-preparation-box">
        <h2>Modifier la photo</h2>
        <div class="edit-photo-preparation-form">
            <label>{{numberPhoto}}</label>
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="edit-photo-preparation-form-photo" id="edit-photo-preparation-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo1'" :src="getPreparation.photo1" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo2'" :src="getPreparation.photo2" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo3'" :src="getPreparation.photo3" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo4'" :src="getPreparation.photo4" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="editPhotoPreparation()">Modifier la photo</button>
            <button @click="closeEditBox()">Annuler</button>
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
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}
.edit-photo-preparation-box{
  position: relative;
  width: 70%;
  min-height: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 6;
}
.edit-photo-preparation-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>