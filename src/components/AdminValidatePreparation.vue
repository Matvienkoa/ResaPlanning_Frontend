<template>
    <div class="validate-preparation-back">
        <div class="validate-preparation-box">
            <h2 class="add-box-title">Valider la préparation?</h2>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="validatePreparation()">Valider la préparation</button>
              <div class="cancel-button" @click="closeEditBox()">Annuler</div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminValidatePreparation',
  props: ['preparationId'],
  data() {
    return {
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getEditBox'])
  },
  methods: {
    closeEditBox() {
        this.$store.state.editBox = 'closed'
    },
    validatePreparation() {
      instance.put(`/preparation/validate/${this.preparationId}`)
      .then((res) => {
          if(res.status === 201) {
            this.$store.dispatch('getPreparation', this.preparationId)
            .then(() => this.closeEditBox())
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
.validate-preparation-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.validate-preparation-box{
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