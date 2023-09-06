<template>
    <CustomerGetPreparation v-if="getGetBox === 'getCustomerPreparation'" :id="preparation" />
    <Header url="/customer/home" />
    <BackButton url="/customer/home" />
    <div>Preparations En cours</div>
    <div class="home-tracking-box">
        <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerPlanned" :key="prep.id" class="home-tracking-prep-box">
            {{prep.brand}} {{prep.model}} {{prep.state}}
        </div>
    </div>
    <div>Preparations Terminées</div>
    <div class="home-tracking-box">
        <div @click="openGetBox(prep.id)" v-for="prep in getPreparationsCustomerCompleted" :key="prep.id" class="home-tracking-prep-box">
            {{prep.brand}} {{prep.model}} {{prep.state}}
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BackButton from '@/components/BackButton.vue';
import CustomerGetPreparation from '@/components/CustomerGetPreparation.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'CustomerTracking',
    components: {
        Header,
        BackButton,
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
.home-tracking-box{
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.home-tracking-prep-box{
    width: 100px;
    height: 100px;
    border: solid 1px red;
}
</style>