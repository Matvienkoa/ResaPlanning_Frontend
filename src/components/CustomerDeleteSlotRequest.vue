<template>
    <div class="add-back">
        <div class="add-box">
            <h2 class="add-box-title">Supprimer la demande?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="deleteSlotRequest()">Oui</button>
              <button class="delete-button" @click="closeDeleteBox()">Non</button>
            </div>
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

</style>