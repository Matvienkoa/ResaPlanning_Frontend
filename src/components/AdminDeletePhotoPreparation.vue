<template>
  <div class="delete-photo-preparation-back">
    <div class="delete-photo-preparation-box">
        <h2 class="add-box-title">Supprimer la photo n°{{checkPhoto(numberPhoto)}} ?</h2>
        <div v-if="error" class="error">{{ error.message }}</div>
        <div class="box-choice-button">
          <button class="valid-button" @click="deletePhotoPreparation()">Supprimer</button>
          <div class="cancel-button" @click="closeDeleteBox()">Annuler</div>
        </div>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.delete-photo-preparation-box{
  position: relative;
  width: 95%;
  max-width: 500px;
  min-height: 30%;
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