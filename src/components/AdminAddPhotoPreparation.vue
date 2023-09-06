<template>
  <div class="add-photo-preparation-back">
    <div class="add-photo-preparation-box">
        <h2>Ajouter une photo</h2>
        <div class="add-photo-preparation-form">
            <label>{{numberPhoto}}</label>
            <input @change="onFileSelected" ref="photo" @input="cancelError()" type="file" name="add-photo-preparation-form-photo" id="add-photo-preparation-form-photo">
            <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="photo-selected">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="addPhotoPreparation()">Ajouter la photo</button>
            <button @click="closeAddBox()">Annuler</button>
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
.add-photo-preparation-box{
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
.add-photo-preparation-form{
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>