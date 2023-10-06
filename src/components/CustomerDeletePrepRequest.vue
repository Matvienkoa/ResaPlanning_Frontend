<template>
    <div class="delete-back">
        <div class="delete-box">
            <h2 class="add-box-title">Supprimer la demande?</h2>
            <div v-if="error" class="error">{{ error }}</div>
            <div class="box-choice-button">
              <button class="valid-button" @click="deletePrepRequest()">Oui</button>
              <button class="delete-button" @click="closeDeleteBox()">Non</button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerDeletePrepRequest',
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
    deletePrepRequest() {
      instance.delete(`/preprequest/${this.id}`)
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