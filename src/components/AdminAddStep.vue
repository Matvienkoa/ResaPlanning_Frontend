<template>
    <div class="add-step-back">
        <div class="add-step-box">
            <h2 class="add-box-title">Ajouter une étape</h2>
            <div class="add-step-form">
              <label class="form-label" for="step-form-type">Type</label>
              <input class="form-input required" v-model="type" @input="cancelError()" type="text" name="step-form-type" id="step-form-type">
              <div v-if="error" class="error">{{ error.message }}</div>
              <div class="box-choice-button">
                <button class="valid-button" @click="addStep()">Ajouter</button>
                <button class="delete-button" @click="closeAddBox()">Annuler</button>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAddStep',
  props: ['preparationId'],
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
    closeAddBox() {
        this.$store.state.addBox = 'closed'
    },
    addStep() {
      instance.post(`/step/append/`, {
        type: this.type,
        preparationId: this.preparationId
      })
      .then((res) => {
          if(res.status === 201) {
              this.$store.dispatch('getPreparation', this.preparationId)
              this.closeAddBox()
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

<style scoped>
.add-step-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.add-step-box{
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
  z-index: 10;
  border-radius: 10px;
}
.add-step-form{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}
</style>