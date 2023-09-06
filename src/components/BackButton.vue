<template>
  <div class="back-box">
    <router-link class="link" :to="url">Retour</router-link>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.link{
  text-decoration: none;
  color: white;
}
</style>