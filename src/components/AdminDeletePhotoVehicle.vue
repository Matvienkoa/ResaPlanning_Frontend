<template>
  <div class="delete-photo-vehicle-back">
    <div class="delete-photo-vehicle-box">
        <h2 class="add-box-title">Supprimer la photo n°{{checkPhoto(numberPhoto)}} ?</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="box-choice-button">
            <button class="valid-button" @click="deletePhoto()">Oui</button>
            <button class="delete-button" @click="closeDeleteBox()">Non</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminDeletePhotoVehicle',
  props: ["numberPhoto"],
  data() {
    return {
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getDeleteBox', 'getVehicle'])
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
    closeDeleteBox() {
      this.$store.state.deleteBox = "closed"
    },
    deletePhoto() {
        instance.put(`/vehicle/photo/delete/${this.$route.params.id}`, {
            numberPhoto: this.numberPhoto
        })
        .then((res) => {
            if(res.status === 201) {
                this.$store.state.deleteBox = "closed"
                this.$store.dispatch('getVehicle', this.$route.params.id);
            }
        })
        .catch((error) => {
            this.error = error.response.data;
        })
    }
  },
  created: function () {
    this.$store.dispatch('getVehicle', this.$route.params.id)
  }
}
</script>

<style scoped>
.delete-photo-vehicle-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.delete-photo-vehicle-box{
  position: relative;
  width: 100%;
  max-width: 500px;
  min-height: 40%;
  max-height: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
</style>