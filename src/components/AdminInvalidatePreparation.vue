<template>
    <div class="invalidate-preparation-back">
        <div class="invalidate-preparation-box">
            <h2 class="add-box-title">Marquer la préparation comme non terminée?</h2>
            <div v-if="error" class="error">{{ error.message }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="invalidatePreparation()">Oui</button>
              <div class="cancel-button" @click="closeEditBox()">Annuler</div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminInvalidatePreparation',
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
    invalidatePreparation() {
      instance.put(`/preparation/invalidate/${this.preparationId}`)
      .then((res) => {
          if(res.status === 201) {
            this.$store.commit('EDIT_PREPARATION_TO_EVENTS_PLANNING', res.data)
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
.invalidate-preparation-back{
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
.invalidate-preparation-box{
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
</style>