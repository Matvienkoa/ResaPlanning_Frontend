<template>
    <div class="edit-step-back">
        <div class="edit-step-box">
            <h2 class="add-box-title">Modifier l'étape de préparation</h2>
            <div class="edit-step-form">
              <label class="form-label" for="step-form-type">Type<span class="star">*</span></label>
              <input class="form-input required" v-model="type" @input="cancelError()" type="text" name="step-form-type" id="step-form-type">
              <div v-if="error" class="error">{{ error.message }}</div>
              <div class="box-choice-button">
                <button class="valid-button" @click="editStep()">Modifier</button>
                <div class="cancel-button" @click="closeEditStepBox()">Annuler</div>
              </div>
            </div>
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
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.edit-step-box{
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
.edit-step-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>