<template>
    <div class="delete-slot-back">
        <div class="delete-slot-box">
            <h2 class="add-box-title">Supprimer le créneau {{slotId}}?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="deleteSlot()">Oui</button>
              <button class="delete-button" @click="closeDeleteBox()">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminDeleteSlot',
  props: ['slotId'],
  data() {
    return {
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getDeleteBox'])
  },
  methods: {
    closeDeleteBox() {
        this.$store.state.deleteBox = 'closed'
    },
    deleteSlot() {
      instance.delete(`/slot/${this.slotId}`)
      .then((res) => {
          if(res.status === 200) {
              this.$store.commit('RESET_BOX');
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
.delete-slot-back{
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  z-index: 8;
}
.delete-slot-box{
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  z-index: 6;
}
</style>