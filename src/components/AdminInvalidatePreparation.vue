<template>
    <div class="invalidate-preparation-back">
        <div class="invalidate-preparation-box">
            <p>Invalider la préparation {{preparationId}}?</p>
            <button @click="invalidatePreparation()">Invalider la préparation</button>
            <button @click="closeEditBox()">Annuler</button>
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
.invalidate-preparation-box{
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