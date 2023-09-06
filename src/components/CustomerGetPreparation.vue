<template>
    <div class="get-back">
    <div class="get-box">
      <div @click="closeGetBox()" class="close-get">X</div>
      <div class="get-infos-box">
        <p>Préparation pour le véhicule :</p>
        <p>{{getPreparation.immat}}</p>
        <p>{{getPreparation.brand}}</p>
        <p>{{getPreparation.model}}</p>
        <p>{{getPreparation.year}}</p>
      </div>
      <div class="get-steps-box">
        <div v-for="step in getSteps" :key="step.id" class="step-box">
          {{step.type}}
          <div class="planned" v-if="step.state === 'planned'">En cours</div>
          <div class="completed" v-if="step.state === 'completed'">Terminé</div>
        </div>
      </div>
      <div class="get-photos-box">
        <div v-if="getPreparation.photo1" class="get-photo-box">
          <img :src="getPreparation.photo1" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo2" class="get-photo-box">
          <img :src="getPreparation.photo2" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo3" class="get-photo-box">
          <img :src="getPreparation.photo3" alt="" class="get-photo">
        </div>
        <div v-if="getPreparation.photo4" class="get-photo-box">
          <img :src="getPreparation.photo4" alt="" class="get-photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerGetPreparation',
  components: {
    
  },
  props: ['id'],
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getSteps'])
  },
  methods: {
    closeGetBox() {
      this.$store.state.getBox = "closed"
    }
  },
  created: function () {
    this.$store.dispatch('getPreparation', this.id)
  }
}
</script>

<style scoped>
.get-back{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}
.get-box{
    position: relative;
    width: 90%;
    min-height: 70%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    z-index: 4;
}
.close-get{
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
.get-infos-box{
  width: 90%;
  position: relative;
}
.get-steps-box{
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.step-box, .add-step-box-2{
  width: 100px;
  height: 80px;
  border: red solid 1px;
}
.planned{
  font-weight: bold;
  color: red;
}
.completed{
  font-weight: bold;
  color: green;
}

.get-photos-box{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.get-photo-box{
  position: relative;
  width: 150px;
  height: 150px;
}
.get-photo{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.get-no-photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
</style>
