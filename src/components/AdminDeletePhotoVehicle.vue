<template>
  <div class="add-back">
    <div class="add-box">
        <div @click="closeDeleteBox()" class="close-add">X</div>
        <h2>Supprimer cette photo?</h2>
        <p>{{numberPhoto}}</p>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="">
            <button @click="deletePhoto()">Oui</button>
            <button @click="closeDeleteBox()">Non</button>
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
.add-vehicle-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>