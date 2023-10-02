<template>
  <div class="get-photo-back">
    <div class="get-photo-box">
        <img crossorigin="anonymous" @click="closeGetPhotoBox()" src="../assets/Icons/close.svg" alt="" class="close-get" />
        <img @click="swipeLeft(numberP)" v-if="numberP !== 'photo1' && showArrowLeft(numberP) > 0" crossorigin="anonymous" src="../assets/Icons/arrow-car-left.svg" alt="" class="arrow-car-left" />
        <img @click="swipeRight(numberP)" v-if="numberP !== 'photo4' && showArrowRight(numberP) > 0" crossorigin="anonymous" src="../assets/Icons/arrow-car-right.svg" alt="" class="arrow-car-right" />
        <div class="photo-main">
            <img v-if="photoUrl" crossorigin="anonymous" class="photo" :src="photoUrl" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminGetPhotoVehicle',
  props: ['url', 'numberPhoto'],
  data() {
    return {
      photoUrl: this.url,
      numberP: this.numberPhoto
    }
  },
  computed: {
    ...mapGetters(['getVehicle'])
  },
  methods: {
    closeGetPhotoBox() {
      this.$store.state.photoBox = "closed"
    },
    showArrowRight(number) {
      let show = 0;
      if(number === 'photo1' && (this.getVehicle.photo2 || this.getVehicle.photo3 || this.getVehicle.photo4)) {
        show += 1
      }
      if(number === 'photo2' && (this.getVehicle.photo3 || this.getVehicle.photo4)) {
        show += 1
      }
      if(number === 'photo3' && this.getVehicle.photo4) {
        show += 1
      }
      return show
    },
    showArrowLeft(number) {
      let show = 0;
      if(number === 'photo2' && this.getVehicle.photo1) {
        show += 1
      }
      if(number === 'photo3' && (this.getVehicle.photo2 || this.getVehicle.photo1)) {
        show += 1
      }
      if(number === 'photo4' && (this.getVehicle.photo3 || this.getVehicle.photo2 || this.getVehicle.photo1)) {
        show += 1
      }
      return show
    },
    swipeRight(number) {
      switch (number) {
        case 'photo1' :
          if(this.getVehicle.photo2) {
            this.numberP = 'photo2'
            this.photoUrl = this.getVehicle.photo2
          } else if (this.getVehicle.photo3){
            this.numberP = 'photo3'
            this.photoUrl = this.getVehicle.photo3
          } else if (this.getVehicle.photo4){
            this.numberP = 'photo4'
            this.photoUrl = this.getVehicle.photo4
          }
          break;
        case 'photo2' :
          if(this.getVehicle.photo3) {
            this.numberP = 'photo3'
            this.photoUrl = this.getVehicle.photo3
          } else if (this.getVehicle.photo4){
            this.numberP = 'photo4'
            this.photoUrl = this.getVehicle.photo4
          }
          break;
        case 'photo3' :
          if(this.getVehicle.photo4) {
            this.numberP = 'photo4'
            this.photoUrl = this.getVehicle.photo4
          }
          break;
      }
    },
    swipeLeft(number) {
      switch (number) {
        case 'photo2' :
          if(this.getVehicle.photo1) {
            this.numberP = 'photo1'
            this.photoUrl = this.getVehicle.photo1
          }
          break;
        case 'photo3' :
          if(this.getVehicle.photo2) {
            this.numberP = 'photo2'
            this.photoUrl = this.getVehicle.photo2
          } else if (this.getVehicle.photo1){
            this.numberP = 'photo1'
            this.photoUrl = this.getVehicle.photo1
          }
          break;
        case 'photo4' :
          if(this.getVehicle.photo3) {
            this.numberP = 'photo3'
            this.photoUrl = this.getVehicle.photo3
          } else if (this.getVehicle.photo2){
            this.numberP = 'photo2'
            this.photoUrl = this.getVehicle.photo2
          } else if (this.getVehicle.photo1){
            this.numberP = 'photo1'
            this.photoUrl = this.getVehicle.photo1
          }
          break;
      }
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
  height: 90%;
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
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.photo{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.arrow-car-left{
  position: absolute;
  left: 2%;
  top: 50%;
  width: 30px;
  cursor: pointer;
}
.arrow-car-right{
  position: absolute;
  right: 2%;
  top: 50%;
  width: 30px;
  cursor: pointer;
}
</style>