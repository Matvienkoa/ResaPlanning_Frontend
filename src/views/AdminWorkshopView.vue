<template>
  <Header />
  <BackButton url="/admin/home" />
  <div class="workshop-box">
    <div class="workshop-demands-box">
        <div class="workshop-demands-title-box">
            <h2 class="workshop-demands-title">Demandes de Préparations</h2>
        </div>
    </div>
    <div class="workshop-demands-box">
        <div class="workshop-demands-title-box">
            <h2 class="workshop-demands-title">Préparations Planifiées</h2>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';

export default {
  name: 'AdminWorkshop',
  components: {
    Header,
    BackButton
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  created: function () {
    
  }
}
</script>

<style scoped>
.workshop-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.workshop-demands-box{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.workshop-demands-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
</style>