<template>
  <div class="add-photo-preparation-back">
    <div class="add-photo-preparation-box">
        <h2 class="add-box-title">Ajouter la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="add-photo-preparation-form">
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="add-photo-preparation-form-photo" id="add-photo-preparation-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="addPhotoPreparation()">Ajouter la photo</button>
              <button class="delete-button" @click="closeAddBox()">Annuler</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminAddPhotoPreparation',
  props: ["numberPhoto", 'preparationId'],
  data() {
    return {
      error: "",
      photo: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getAddBox'])
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
}
</style>