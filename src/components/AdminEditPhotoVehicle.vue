<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeEditBox()" class="close-add">X</div>
        <h2>Modifier la photo</h2>
        <div class="add-vehicle-form">
            <label>Photo</label>
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="vehicle-form-photo" id="vehicle-form-photo">

            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo1'" :src="getVehicle.photo1" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo2'" :src="getVehicle.photo2" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo3'" :src="getVehicle.photo3" alt="" class="photo-selected">
            <img crossorigin="anonymous" v-if="this.url === '' && this.numberPhoto ==='photo4'" :src="getVehicle.photo4" alt="" class="photo-selected">
    
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="editPhotoVehicle()">Modifier la photo</button>
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
.add-vehicle-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>