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
  name: 'AdminGetPhotoPreparation',
  props: ['url', 'numberPhoto'],
  data() {
    return {
      photoUrl: this.url,
      numberP: this.numberPhoto
    }
  },
  computed: {
    ...mapGetters(['getPreparation'])
  },
  methods: {
    closeGetPhotoBox() {
      this.$store.state.photoBox = "closed"
    },
    showArrowRight(number) {
      let show = 0;
      if(number === 'photo1' && (this.getPreparation.photo2 || this.getPreparation.photo3 || this.getPreparation.photo4)) {
        show += 1
      }
      if(number === 'photo2' && (this.getPreparation.photo3 || this.getPreparation.photo4)) {
        show += 1
      }
      if(number === 'photo3' && this.getPreparation.photo4) {
        show += 1
      }
      return show
    },
    showArrowLeft(number) {
      let show = 0;
      if(number === 'photo2' && this.getPreparation.photo1) {
        show += 1
      }
      if(number === 'photo3' && (this.getPreparation.photo2 || this.getPreparation.photo1)) {
        show += 1
      }
      if(number === 'photo4' && (this.getPreparation.photo3 || this.getPreparation.photo2 || this.getPreparation.photo1)) {
        show += 1
      }
      return show
    },
    swipeRight(number) {
      switch (number) {
        case 'photo1' :
          if(this.getPreparation.photo2) {
            this.numberP = 'photo2'
            this.photoUrl = this.getPreparation.photo2
          } else if (this.getPreparation.photo3){
            this.numberP = 'photo3'
            this.photoUrl = this.getPreparation.photo3
          } else if (this.getPreparation.photo4){
            this.numberP = 'photo4'
            this.photoUrl = this.getPreparation.photo4
          }
          break;
        case 'photo2' :
          if(this.getPreparation.photo3) {
            this.numberP = 'photo3'
            this.photoUrl = this.getPreparation.photo3
          } else if (this.getPreparation.photo4){
            this.numberP = 'photo4'
            this.photoUrl = this.getPreparation.photo4
          }
          break;
        case 'photo3' :
          if(this.getPreparation.photo4) {
            this.numberP = 'photo4'
            this.photoUrl = this.getPreparation.photo4
          }
          break;
      }
    },
    swipeLeft(number) {
      switch (number) {
        case 'photo2' :
          if(this.getPreparation.photo1) {
            this.numberP = 'photo1'
            this.photoUrl = this.getPreparation.photo1
          }
          break;
        case 'photo3' :
          if(this.getPreparation.photo2) {
            this.numberP = 'photo2'
            this.photoUrl = this.getPreparation.photo2
          } else if (this.getPreparation.photo1){
            this.numberP = 'photo1'
            this.photoUrl = this.getPreparation.photo1
          }
          break;
        case 'photo4' :
          if(this.getPreparation.photo3) {
            this.numberP = 'photo3'
            this.photoUrl = this.getPreparation.photo3
          } else if (this.getPreparation.photo2){
            this.numberP = 'photo2'
            this.photoUrl = this.getPreparation.photo2
          } else if (this.getPreparation.photo1){
            this.numberP = 'photo1'
            this.photoUrl = this.getPreparation.photo1
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
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.get-photo-box{
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 11;
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
@media (max-width: 768px) {
  .photo-main{
    height: 85%;
    margin-bottom: 40px;
  }
  .arrow-car-left{
    left: 43%;
    top: unset;
    bottom: 2%;
  }
  .arrow-car-right{
    top: unset;
    bottom: 2%;
    right: 43%;
  }
}
@media (max-width: 480px) {
  .get-photo-box{
    width: 95%;
    height: 95%;
  }
  .arrow-car-left{
    left: 35%;
  }
  .arrow-car-right{
    right: 35%;
  }
}
</style>