<template>
    <div class="banner">
        <div class="logos-box">
          <img crossorigin="anonymous" class="logo logo-afc" alt="" src="../assets/images/afc-logo.png">
          <img crossorigin="anonymous" class="logo logo-millenium" alt="" src="../assets/images/millenium-logo.png">
        </div>
        <div class="back-box">
            <router-link class="link" :to="url">
                <img crossorigin="anonymous" class="back-icon" src="../assets/Icons/arrow-left.svg" alt="">
                <p class="back-txt">Retour</p>
            </router-link>
        </div>
        <div class="banner-items-box">
          <div v-if="getUser.role === 'admin' || (getUser.role === 'employee' && getProfile.privileges === 'yes')" @click="openGetBox('getRequests')" class="banner-item">
            Demandes <img crossorigin="anonymous" src="../assets/Icons/notification-red.svg" alt="" v-if="getPrepRequestsPending.length > 0 || getSlotRequestsPending.length > 0" class="notification" />
          </div>
          <div v-if="getUser.role === 'admin'" @click="openGetBox('getBillings')" class="banner-item">
              Facturation
          </div>
        </div>
        <div class="banner-items-box-mobile">
          <div v-if="getUser.role === 'admin' || (getUser.role === 'employee' && getProfile.privileges === 'yes')" @click="openGetBox('getRequests')" class="banner-item">
            <img crossorigin="anonymous" src="../assets/Icons/request-white.svg" alt="" class="request-icon">
            <img crossorigin="anonymous" src="../assets/Icons/notification-red.svg" alt="" v-if="getPrepRequestsPending.length > 0 || getSlotRequestsPending.length > 0" class="notification" />
          </div>
          <div v-if="getUser.role === 'admin'" @click="openGetBox('getBillings')" class="banner-item">
              <img crossorigin="anonymous" src="../assets/Icons/invoice-white.svg" alt="" class="invoice-icon">
          </div>
        </div>
        <div class="banner-events-box">
          <div class="banner-event-slot">Créneau</div>
          <div class="banner-event-prep-planned">Préparation en cours</div>
          <div class="banner-event-prep-completed">Préparation terminée</div>
        </div>
        <div class="logout-box">
          <router-link to="/" @click="logOut()" class="logout-txt">
            <img crossorigin="anonymous" class="logout-icon" src="../assets/Icons/logout.svg" alt="">
            <p>Se Déconnecter</p>
          </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AdminPlanningBanner',
    props: ["url"],
    computed: {
        ...mapGetters(['getPrepRequestsPending', 'getSlotRequestsPending', 'getUser', 'getProfile'])
    },
    methods: {
      openGetBox(data) {
          this.$store.state.getBox = data
      },
      logOut: function() {
        this.$store.commit("LOG_OUT");
      }
    },
    created: function () {
        this.$store.dispatch('getRequestsPending')
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
  font-family: 'catamaran', sans-serif;
  line-height: 0.8em;
}
.logos-box{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  margin-bottom: 30px;
}
.logo{
  height: 90%;
  width: auto;
}
.back-box{
  width: 80%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #c90200;
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
.banner-items-box{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.banner-item{
    display: flex;
    align-items: center;
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
.banner-items-box-mobile{
  display: none;
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
  border-top: 3px solid #c90200;
  font-size: 0.9em;
}
.banner-event-prep-planned{
  padding: 5px 10px;
  border-radius: 5px;
  background-color: orange;
  margin-bottom: 10px;
}
.banner-event-prep-completed{
  padding: 5px 10px;
  border-radius: 5px;
  background-color: green;
  margin-bottom: 20px;
}
.banner-event-slot{
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgb(55,136,216);
  margin-bottom: 10px;
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
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: 'catamaran', sans-serif;
  font-size: 1em;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
@media (max-width: 1024px) {
  .banner{
    width: 150px;
  }
  .banner-events-box{
    width: 90%;
    font-size: 0.8em;
  }
  .logout-box{
    justify-content: center;
  }
  .logout-icon{
    width: 20px;
    margin-right: 5px;
    margin-left: 0px;
  }
  .logout-txt{
    font-size: 0.9em;
  }
}
@media (max-width: 768px) {
  .banner{
    bottom: 0;
    width: 100%;
    height: 70px;
    min-height: 60px;
    flex-direction: row;
    justify-content: space-between;
  }
  .logos-box{
    display: none;
  }
  .back-box{
    width: 100px;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: unset;
    border-bottom: unset;
    margin-bottom: unset;
    font-size: 1.1em;
    border-right: 3px solid #c90200;
  }
  .banner-items-box{
    display: none;
  }
  .banner-items-box-mobile{
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
  .banner-item{
    margin-bottom: unset;
  }
  .invoice-icon{
    height: 30px;
  }
  .request-icon{
    height: 30px;
  }
  .notification{
    width: 20px;
    position: relative;
    left: -15px;
    bottom: 15px;
  }
  .banner-events-box{
    height: 100%;
    position: unset;
    width: auto;
    bottom: unset;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-top: unset;
    border-top: unset;
    font-size: 0.7em;
    flex-wrap: wrap;
  }
  .banner-event-prep-planned{
    padding: 5px 10px;
    border-radius: 5px;
    background-color: orange;
    margin-bottom: unset;
    margin-right: 5px;
  }
  .banner-event-prep-completed{
    padding: 5px 10px;
    border-radius: 5px;
    background-color: green;
    margin-bottom: unset;
  }
  .banner-event-slot{
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgb(55,136,216);
    margin-bottom: unset;
    margin-right: 5px;
  }
  .logout-box{
    position: unset;
    width: 50px;
    height: 100%;
  }
  .logout-txt p{
    display: none;
  }
}
@media (max-width: 600px) {
  .banner{
    height: 60px;
    justify-content: flex-start;
  }
  .banner-items-box-mobile{
    margin-left: 5%;
  }
  .banner-events-box{
    display: none;
  }
  .logout-box{
    position: absolute;
    right: 0;
    width: 50px;
    height: 100%;
  }
}
</style>