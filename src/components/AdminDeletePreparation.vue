<template>
    <div class="delete-preparation-back">
        <div class="delete-preparation-box">
          <h2 class="add-box-title">Supprimer la préparation {{preparationId}}?</h2>
          <div v-if="error" class="error">{{ error }}</div>
          <div class="box-choice-button">
            <button class="valid-button" @click="deletePreparation()">Oui</button>
            <button class="delete-button" @click="closeDeleteBox()">Annuler</button>
          </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminDeletePreparation',
  props: ['preparationId'],
  data() {
    return {
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getDeleteBox'])
  },
  methods: {
    closeDeleteBox() {
        this.$store.state.deleteBox = 'closed'
    },
    deletePreparation() {
      instance.delete(`/preparation/${this.preparationId}`)
      .then((res) => {
          if(res.status === 200) {
              this.$store.commit('RESET_BOX');
          }
      })
      .catch((error) => {
          this.error = error.response.data;
      })
    }
  }
}
</script>

<style>
.delete-preparation-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.delete-preparation-box{
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