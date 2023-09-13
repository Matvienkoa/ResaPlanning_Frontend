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
                <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerPlanned" :key="prep.id" class="home-tracking-prep-box">
                    <div class="home-tracking-prep-infos">
                        <p>{{prep.brand}}</p>
                        <p>{{prep.model}}</p>
                        <p>{{prep.state}}</p>
                    </div>
                    <img src="../assets/Icons/eye.svg" alt="" class="home-tracking-prep-icon" />
                </div>
            </div>
            <div class="requests-customer-pending-box">
                <div class="requests-customer-pending-title-box">
                    <h2 class="requests-customer-pending-title">Preparations Terminées</h2>
                </div>
                <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerCompleted" :key="prep.id" class="home-tracking-prep-box">
                    <div class="home-tracking-prep-infos">
                        <p>{{prep.brand}}</p>
                        <p>{{prep.model}}</p>
                        <p>{{prep.state}}</p>
                    </div>
                    <img src="../assets/Icons/eye.svg" alt="" class="home-tracking-prep-icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CustomerGetPreparation from '@/components/CustomerGetPreparation.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'CustomerTracking',
    components: {
        Header,
        CustomerGetPreparation
    },
    data() {
        return {
            preparation: null
        }
    },
    computed: {
        ...mapGetters(['getPreparationsCustomerPlanned', 'getPreparationsCustomerCompleted', 'getGetBox'])
    },
    methods: {
        openGetBox(id) {
            this.preparation = id
            this.$store.state.getBox = 'getCustomerPreparation'
        }
    },
    created: function () {
        this.$store.dispatch('getPreparationsCustomer');
    }
}
</script>

<style scoped>
.home-tracking-prep-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(236, 236, 236);
    border-radius: 10px;
    padding: 0.4em 0;
    margin-bottom: 10px;
    cursor: pointer;
}
.home-tracking-prep-infos{
    display: flex;
}
.home-tracking-prep-icon{
    height: 20px;
}
</style>