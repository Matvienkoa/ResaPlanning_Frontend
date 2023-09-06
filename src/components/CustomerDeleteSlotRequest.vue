<template>
    <div class="delete-request-back">
        <div class="delete-request-box">
            <p>Supprimer le demande?</p>
            <button @click="deleteSlotRequest()">Supprimer la demande</button>
            <button @click="closeDeleteBox()">Annuler</button>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerDeleteSlotRequest',
  props: ['id'],
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
    deleteSlotRequest() {
      instance.delete(`/slotrequest/${this.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.closeDeleteBox()
              this.$store.dispatch('getRequests')
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
.delete-request-back{
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
.delete-request-box{
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