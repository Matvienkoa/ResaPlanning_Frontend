<template>
    <div class="delete-step-back">
        <div class="delete-step-box">
            <p>Supprimer cette étape?</p>
            <button @click="deleteStep()">Supprimer</button>
            <button @click="closeDeleteBox()">Annuler</button>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';

export default {
  name: 'AdminDeleteStep',
  props: ['preparationId', 'stepId'],
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    closeDeleteBox() {
        this.$store.state.deleteBox = 'closed'
    },
    deleteStep() {
      instance.delete(`/step/${this.stepId}`)
      .then((res) => {
          if(res.status === 200) {
              this.$store.dispatch('getPreparation', this.preparationId)
              this.closeDeleteBox()
          }
      })
    }
  }
}
</script>

<style>
.delete-step-back{
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
.delete-step-box{
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