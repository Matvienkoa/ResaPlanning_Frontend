<template>
    <div class="delete-step-back">
        <div class="delete-step-box">
            <h2 class="add-box-title">Supprimer cette prestation?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="deleteStep()">Supprimer</button>
              <div class="cancel-button" @click="closeDeleteBox()">Annuler</div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminDeleteStep',
  props: ['preparationId', 'stepId'],
  data() {
    return {
      error: ""
    }
  },
  methods: {
    closeDeleteBox() {
        this.$store.state.deleteBox = 'closed'
    },
    deleteStep() {
      instance.delete(`/step/${this.stepId}`)
      .then((res) => {
          if(res.status === 200) {
              this.$store.dispatch('getPreparation', this.preparationId)
              this.closeDeleteBox()
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
.delete-step-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.delete-step-box{
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