<template>
  <div class="add-back">
    <div class="add-box">
        <img crossorigin="anonymous" @click="closeDeleteBox()" src="../assets/Icons/close.svg" alt="" class="close-add" />
        <h2 class="add-box-title">Supprimer ce véhicule?</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="box-choice-button">
            <button class="valid-button" @click="deleteVehicle()">Oui</button>
            <button class="delete-button" @click="closeDeleteBox()">Non</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminDeleteVehicle',
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
    deleteVehicle() {
        instance.delete(`/vehicle/${this.$route.params.id}`)
        .then((res) => {
            if(res.status === 200) {
                this.$router.push(`/admin/showroom`)
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