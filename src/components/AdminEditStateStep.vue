<template>
    <div class="edit-state-step-back">
        <div class="edit-state-step-box">
            <p v-if="stepState === 'planned'">Valider cette étape comme finalisée?</p>
            <button v-if="stepState === 'planned'" @click="editStateStep('complete')">Valider</button>
            <p v-if="stepState === 'complete'">Valider cette étape comme non finalisée?</p>
            <button v-if="stepState === 'complete'" @click="editStateStep('planned')">Valider</button>
            <button @click="closeEditStepBox()">Annuler</button>
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
    }
  }
}
</script>

<style>
.edit-state-step-back{
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
.edit-state-step-box{
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