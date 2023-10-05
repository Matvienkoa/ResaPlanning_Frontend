<template>
    <div class="delete-slot-back">
        <div class="delete-slot-box">
            <h2 class="add-box-title">Supprimer le créneau?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="deleteSlot()">Oui</button>
              <div class="cancel-button" @click="closeDeleteBox()">Annuler</div>
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
              this.$store.commit('DELETE_SLOT_TO_EVENTS_PLANNING', this.slotId)
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
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.delete-slot-box{
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
</style>