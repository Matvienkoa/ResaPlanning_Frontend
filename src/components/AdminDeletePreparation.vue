<template>
    <div class="delete-preparation-back">
        <div class="delete-preparation-box">
          <h2 class="add-box-title">Supprimer la préparation?</h2>
          <div v-if="error" class="error">{{ error }}</div>
          <div class="box-choice-button">
            <button class="valid-button" @click="deletePreparation()">Oui</button>
            <div class="cancel-button" @click="closeDeleteBox()">Annuler</div>
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
              this.$store.commit('DELETE_PREPARATION_TO_EVENTS_PLANNING', this.preparationId)
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
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.delete-preparation-box{
  position: relative;
  width: 95%;
  max-width: 500px;
  min-height: 40%;
  max-height: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 11;
  border-radius: 10px;
}
.cancel-button{
  margin: 0 10px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
}
</style>