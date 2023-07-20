<template>
  <div class="back-box">
    <router-link :to="url">Retour</router-link>
  </div>
</template>

<script>
export default {
  name: 'Back-button',
  props: ["url"],
}
</script>

<style scoped>
.back-box{
  width: 100%;
  height: 30px;
  display: flex;
}
</style>