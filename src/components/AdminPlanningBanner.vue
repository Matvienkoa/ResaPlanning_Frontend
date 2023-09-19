<template>
    <div class="banner">
        <div class="logos-box"></div>
        <div class="back-box">
            <router-link class="link" :to="url">
                <img crossorigin="anonymous" class="back-icon" src="../assets/Icons/arrow-left.svg" alt="">
                <p class="back-txt">Retour</p>
            </router-link>
        </div>
        <div @click="openGetBox('getRequests')" class="banner-item">
            Demandes <img crossorigin="anonymous" src="../assets/Icons/notification.svg" alt="" v-if="getPrepRequestsPending.length > 0 || getSlotRequestsPending.length > 0" class="notification" />
        </div>
        <div @click="openGetBox('getBillings')" class="banner-item">
            Facturation
        </div>
        <div class="banner-events-box">
          <div class="banner-event-prep">Préparation</div>
          <div class="banner-event-slot">Créneau</div>
        </div>
        <div class="logout-box">
            <img crossorigin="anonymous" class="logout-icon" src="../assets/Icons/logout.svg" alt="">
            <p class="logout-txt">Se Déconnecter</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AdminPlanningBanner',
    props: ["url"],
    computed: {
        ...mapGetters(['getPrepRequestsPending', 'getSlotRequestsPending'])
    },
    methods: {
        openGetBox(data) {
            this.$store.state.getBox = data
        }
    },
    created: function () {
        this.$store.dispatch('getRequestsPending')
        .then((res) => {
            console.log(res)
        })
    }
}
</script>

<style scoped>
.banner{
  position: fixed;
  z-index: 5;
  width: 200px;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logos-box{
  height: 50px;
}
.back-box{
  width: 80%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #383838;
  margin-bottom: 25px;
  font-size: 1.1em;
}
.link{
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-icon{
  height: 18px;
  margin-right: 5px;
}
.banner-item{
    width: 80%;
    display: flex;
    cursor: pointer;
    font-size: 1.2em;
    color: white;
    margin-bottom: 20px;
}
.notification{
    width: 20px;
    position: relative;
    left: 3px;
    bottom: 10px;
}
.banner-events-box{
  position: absolute;
  width: 80%;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  padding-top: 20px;
  border-top: 3px solid #383838;
}
.banner-event-prep{
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgb(55,136,216);
  margin-bottom: 10px;
}
.banner-event-slot{
  padding: 5px 10px;
  border-radius: 5px;
  background-color: red;
  margin-bottom: 20px;
}
.logout-box{
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logout-icon{
  width: 20px;
  margin-right: 10px;
  margin-left: 15px;
}
.logout-txt{
  color: white;
}
</style>