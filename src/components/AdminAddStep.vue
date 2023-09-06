<template>
    <div class="add-step-back">
        <div class="add-step-box">
            Ajouter une étape
            <label for="step-form-type">Type</label>
            <input v-model="type" @input="cancelError()" type="text" name="step-form-type" id="step-form-type" class="required">
            <div v-if="error" class="error">{{ error.message }}</div>
            <button @click="addStep()">Ajouter</button>
            <button @click="closeAddBox()">Annuler</button>
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
.add-step-box{
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