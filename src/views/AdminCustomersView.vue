<template>
<AdminAddCustomer v-if="getAddBox === 'addCustomer'" />
  <Header />
  <div class="account-admin-box">
    <div class="account-admin-customers">
      <div class="account-admin-customers-title-box">
        <h2 class="account-admin-customers-title">Mes Clients</h2>
        <img @click="openAddBox('addCustomer')" src="../assets/Icons/add.svg" alt="" class="account-admin-customer-icon">
      </div>
      <div class="account-admin-customers-list">
        <div v-for="customer in getCustomers" :key="customer.id" class="account-admin-customer">
          <div class="account-admin-customer-infos">
            <div>Client N°{{ customer.id }}</div>
            <div>{{ customer.company }}</div>
            <div>{{ customer.firstName }}</div>
            <div>{{ customer.lastName }}</div>
          </div>
          <div class="account-admin-customer-actions">
            <!-- <router-link :to="{name: 'AdminAccountCustomerEdit', params: {id: customer.id}}" class="account-admin-customer-link">
              <img src="../assets/Icons/edit.svg" alt="" class="account-admin-customer-icon">
            </router-link> -->
            <img src="../assets/Icons/delete.svg" alt="" class="account-admin-customer-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminAddCustomer from '@/components/AdminAddCustomer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminCustomers',
  components: {
    Header,
    AdminAddCustomer
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getCustomers', 'getAddBox'])
  },
  methods: {
    openAddBox(type) {
      this.$store.state.addBox = type
    }
  },
  created: function () {
    this.$store.dispatch('getCustomers');
    this.$store.commit('RESET_BOX');
  }
}
</script>

<style scoped>
.account-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
}
.account-admin-customers{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.account-admin-customers-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.account-admin-customers-list{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.account-admin-customer{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.account-admin-customer-infos{
  display: flex;
}
.account-admin-customer-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}
</style>