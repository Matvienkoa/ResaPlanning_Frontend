<template>
  <div class="get-photo-back">
    <div class="get-photo-box">
        <img @click="closeGetPhotoBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
        <div class="photo-main">
            <img class="photo" :src="url" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminGetPhotoVehicle',
  props: ['url'],
  data() {
    return {
    }
  },
  methods: {
    closeGetPhotoBox() {
      this.$store.state.photoBox = "closed"
    }
  }
}
</script>

<style scoped>
.get-photo-back{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}
.get-photo-box{
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: 90%;
  max-height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 10;
  border-radius: 10px;
}
.photo-main{
    height: 90%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.photo{
    width: 100%;
    object-fit: contain;
}
</style>