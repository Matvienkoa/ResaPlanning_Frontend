<template>
    <div class="edit-state-step-back">
        <div class="edit-state-step-box">
            <h2 class="add-box-title" v-if="stepState === 'planned'">Marquer cette prestation comme terminée?</h2>
            <h2 class="add-box-title" v-if="stepState === 'completed'">Marquer cette prestation comme non terminée?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" v-if="stepState === 'planned'" @click="editStateStep('completed')">Valider</button>
              <button class="valid-button"  v-if="stepState === 'completed'" @click="editStateStep('planned')">Valider</button>
              <button class="delete-button" @click="closeEditStepBox()">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminEditStateStep',
  props: ['preparationId', 'stepId', 'stepState'],
  data() {
    return {
      error: ""
    }
  },
  methods: {
    closeEditStepBox() {
        this.$store.state.stepBox = 'closed'
    },
    editStateStep(state) {
      instance.put(`/step/state/${this.stepId}`, {
        state: state
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.dispatch('getPreparation', this.preparationId)
              this.closeEditStepBox()
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
.edit-state-step-back{
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
.edit-state-step-box{
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
  z-index: 11;
  border-radius: 10px;
}
</style>