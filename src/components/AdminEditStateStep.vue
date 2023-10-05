<template>
    <div class="edit-state-step-back">
        <div class="edit-state-step-box">
            <h2 class="add-box-title" v-if="stepState === 'planned'">Valider cette étape comme finalisée?</h2>
            <h2 class="add-box-title" v-if="stepState === 'completed'">Valider cette étape comme non finalisée?</h2>
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
  computed: {
    
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
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
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
  z-index: 10;
  border-radius: 10px;
}
</style>