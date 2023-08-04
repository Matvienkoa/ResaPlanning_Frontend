<template>
    <div class="edit-step-back">
        <div class="edit-step-box">
            modifier l'étape {{stepId}}
            <label for="step-form-type">Type</label>
            <input v-model="type" @input="cancelError()" type="text" name="step-form-type" id="step-form-type" class="required">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="editStep()">Modifier</button>
            <button @click="closeEditStepBox()">Annuler</button>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminEditStep',
  props: ['preparationId', 'stepId', 'stepType'],
  data() {
    return {
      type: this.stepType,
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getPreparation'])
  },
  methods: {
    closeEditStepBox() {
        this.$store.state.stepBox = 'closed'
    },
    editStep() {
      instance.put(`/step/${this.stepId}`, {
        type: this.type
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.dispatch('getPreparation', this.preparationId)
              this.closeEditStepBox()
          }
      })
      .catch((error) => {
          this.error = error.response.data;
          const emptyInput = document.getElementById('step-form-type');
          emptyInput.classList.add('empty')
      })
    },
    cancelError() {
        const emptyInput = document.getElementById('step-form-type');
        emptyInput.classList.remove('empty')
        this.error = ''
    },
  }
}
</script>

<style>
.edit-step-back{
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
.edit-step-box{
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