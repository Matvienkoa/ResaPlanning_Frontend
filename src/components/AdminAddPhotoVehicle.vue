<template>
  <div class="add-photo-vehicle-back">
    <div class="add-photo-vehicle-box">
        <h2 class="add-box-title">Ajouter la photo n°{{checkPhoto(numberPhoto)}}</h2>
        <div class="add-photo-vehicle-form">
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="vehicle-form-photo" id="vehicle-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="addPhotoVehicle()">Ajouter la photo</button>
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
  name: 'AdminAddPhotoVehicle',
  props: ["numberPhoto"],
  data() {
    return {
      error: "",
      photo: "",
      url: ""
    }
  },
  computed: {
    ...mapGetters(['getAddBox', 'getVehicle'])
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
    addPhotoVehicle() {
        const formData = new FormData();
        formData.append('numberPhoto', this.numberPhoto)
        formData.append('photo', this.photo)
        instance.put(`/vehicle/photo/${this.$route.params.id}`, formData)
        .then((res) => {
            if(res.status === 201) {
                this.$store.state.addBox = "closed"
                this.$store.dispatch('getVehicle', this.$route.params.id);
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
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id)
  }
}
</script>


<style scoped>
.add-photo-vehicle-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.add-photo-vehicle-box{
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
.add-photo-vehicle-form{
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