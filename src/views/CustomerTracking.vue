<template>
    <CustomerGetPreparation v-if="getGetBox === 'getCustomerPreparation'" :id="preparation" />
    <Header url="/customer/home" />
    <div class="main-page">
        <div class="account-admin-title-box">
            <h1 class="account-admin-title">Suivi des préparations</h1>
        </div>
        <div class="requests-customer-box">
            <div class="requests-customer-pending-box">
                <div class="requests-customer-pending-title-box">
                    <h2 class="requests-customer-pending-title">Preparations En cours</h2>
                </div>
                <p class="no-content" v-if="getPreparationsCustomerPlanned.length === 0">Aucune préparation en cours pour le moment</p>
                <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerPlanned" :key="prep.id" class="home-tracking-prep-box">
                    <div class="home-tracking-prep-infos">
                        <p>{{prep.brand}}</p>
                        <p>{{prep.model}}</p>
                        <p>{{prep.immat}}</p>
                    </div>
                    <div class="home-tracking-prep-icon-box">
                        <img crossorigin="anonymous" src="../assets/Icons/eye.svg" alt="" class="home-tracking-prep-icon" />
                    </div>
                </div>
            </div>
            <div class="requests-customer-pending-box">
                <div class="requests-customer-pending-title-box">
                    <h2 class="requests-customer-pending-title">Preparations Terminées</h2>
                </div>
                <input @change="updatePrepCompleted()" type="month" v-model="month" name="" id="month-input">
                <p class="no-content" v-if="getPreparationsCustomerCompleted.length === 0">Aucune préparation terminée pour le mois sélectionné</p>
                <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerCompleted" :key="prep.id" class="home-tracking-prep-box">
                    <div class="home-tracking-prep-infos">
                        <p>{{prep.brand}}</p>
                        <p>{{prep.model}}</p>
                        <p>{{prep.immat}}</p>
                    </div>
                    <div class="home-tracking-prep-icon-box">
                        <img crossorigin="anonymous" src="../assets/Icons/eye.svg" alt="" class="home-tracking-prep-icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CustomerGetPreparation from '@/components/CustomerGetPreparation.vue';
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'CustomerTracking',
    components: {
        Header,
        CustomerGetPreparation
    },
    data() {
        return {
            preparation: null,
            moment: moment,
            month: moment(new Date()).format('yyyy-MM')
        }
    },
    computed: {
        ...mapGetters(['getPreparationsCustomerPlanned', 'getPreparationsCustomerCompleted', 'getGetBox'])
    },
    methods: {
        updatePrepCompleted() {
            this.$store.dispatch('getPreparationsCustomerCompleted', moment(this.month).format())
        },
        openGetBox(id) {
            this.preparation = id
            this.$store.state.getBox = 'getCustomerPreparation'
        }
    },
    created: function () {
        this.$store.dispatch('getPreparationsCustomerPlanned')
        this.$store.dispatch('getPreparationsCustomerCompleted', new Date())
        this.$store.dispatch('checkToken')
        .then((res) => {
            if(res === 'expired') {
                this.$router.push('/')
            }
        })
        this.$store.dispatch('getProfile')
        .then((res) => {
            if(res.data) {
                if(res.data.role !== 'admin' && res.data.role !== 'customer') {
                    this.$router.push('/')
                }
            } else {
                this.$router.push('/')
            }
        })
    }
}
</script>

<style scoped>
.home-tracking-prep-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(245, 245, 245);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    border-radius: 10px;
    padding: 0.4em 0;
    margin-bottom: 15px;
    cursor: pointer;
}
.home-tracking-prep-infos{
    display: flex;
    margin-left: 10px;
}
.home-tracking-prep-infos p{
    margin-right: 10px;
}
.home-tracking-prep-icon-box{
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 30px;
    margin-right: 10px;
}
.home-tracking-prep-icon{
    height: 18px;
}
#month-input{
  width: 180px;
  padding: 0 10px;
  height: 40px;
  font-size: 1.3em;
  margin: auto;
  margin-bottom: 20px;
  border: #2c3e50 solid 3px;
  border-radius: 20px;
}
#month-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
</style>