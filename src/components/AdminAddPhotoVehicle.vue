<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeAddBox()" class="close-add">X</div>
        <h2>Ajouter une photo</h2>
        <div class="add-vehicle-form">
            <label>{{numberPhoto}}</label>
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="vehicle-form-photo" id="vehicle-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="addPhotoVehicle()">Ajouter la photo</button>
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
.add-vehicle-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>