<template>
  <div class="get-back">
    <div class="get-box">
      <div @click="closeGetBox()" class="close-get">X</div>
      <div class="get-infos-box">
        <div @click="openEditBox({mode: 'editPreparation', id: this.id})" class="edit-infos-icon">Edit</div>
        <p>Préparation pour le véhicule :</p>
        <p>{{getPreparation.immat}}</p>
        <p>{{getPreparation.brand}}</p>
        <p>{{getPreparation.model}}</p>
        <p>{{getPreparation.year}}</p>
      </div>
      <div class="get-steps-box">
        <div v-for="step in getPreparation.steps" :key="step.id" class="step-box">
          {{step.type}}
          <div @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="planned" v-if="step.state === 'planned'">En cours</div>
          <div @click="openEditStateStepBox({mode: 'editStateStep', id: step.id, state: step.state})" class="complete" v-if="step.state === 'complete'">Terminé</div>
          <div @click="openEditStepBox({mode: 'editStep', id: step.id, type: step.type})">Modifier</div>
        </div>
      </div>
      <AdminEditStep v-if="getStepBox === 'editStep'" :preparationId="this.id" :stepId="step" :stepType="type" />
      <AdminEditStateStep v-if="getStepBox === 'editStateStep'" :preparationId="this.id" :stepId="step" :stepState="state" />
      <AdminEditPreparation v-if="getEditBox === 'editPreparation'" :preparationId="this.preparation" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AdminEditStep from '@/components/AdminEditStep.vue';
import AdminEditStateStep from '@/components/AdminEditStateStep.vue';
import AdminEditPreparation from '@/components/AdminEditPreparation.vue';

export default {
  name: 'AdminGetPreparation',
  components: {
    AdminEditStep,
    AdminEditStateStep,
    AdminEditPreparation
  },
  props: ['id'],
  data() {
    return {
      step: null,
      type: "",
      state: "",
      customer: null,
      preparation: null
    }
  },
  computed: {
    ...mapGetters(['getPreparation', 'getCustomers', 'getStepBox', 'getEditBox'])
  },
  methods: {
    openEditBox(data) {
      this.preparation = data.id
      this.$store.state.editBox = data.mode
    },
    openEditStateStepBox(data) {
      this.step = data.id
      this.state = data.state
      this.$store.state.stepBox = data.mode
    },
    openEditStepBox(data) {
      this.step = data.id
      this.type = data.type
      this.$store.state.stepBox = data.mode
    },
    closeGetBox() {
      this.$store.state.getBox = "closed"
    }
  },
  created: function () {
    this.$store.dispatch('getCustomers');
    this.$store.dispatch('getPreparation', this.id)
  },
  updated() {
    
  }
}
</script>

<style>
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
.edit-infos-icon{
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
}
.edit-infos-box{
  width: 90%;
  display: flex;
  flex-direction: column;
}

.get-steps-box{
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.step-box{
  width: 100px;
  height: 80px;
  border: red solid 1px;
}

.planned{
  font-weight: bold;
  color: red;
}
.complete{
  font-weight: bold;
  color: green;
}
</style>