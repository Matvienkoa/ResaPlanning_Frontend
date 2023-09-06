<template>
  <div class="delete-photo-preparation-back">
    <div class="delete-photo-preparation-box">
        <h2>Supprimer la photo?</h2>
        <p>{{numberPhoto}}</p>
        <div v-if="error" class="error">{{ error.message }}</div>
        <button @click="deletePhotoPreparation()">Supprimer la photo</button>
        <button @click="closeDeleteBox()">Annuler</button>
        
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'AdminDeletePhotoPreparation',
  props: ["numberPhoto", 'preparationId'],
  data() {
    return {
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getDeleteBox', 'getPreparation'])
  },
  methods: {
    closeDeleteBox() {
      this.$store.state.deleteBox = "closed"
    },
    deletePhotoPreparation() {
        instance.put(`/preparation/photo/delete/${this.preparationId}`, {
            numberPhoto: this.numberPhoto
        })
        .then((res) => {
            if(res.status === 201) {
                this.closeDeleteBox();
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
.delete-photo-preparation-back{
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
.delete-photo-preparation-box{
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
</style>