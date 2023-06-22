<template>
  <Header />
  <div class="account-admin-box">
    <div class="account-admin-employees">
        <h2 class="account-admin-employees-title">Comptes Collaborateurs</h2>
        <div class="account-admin-employees-list">
          <div v-for="employee in getEmployees" :key="employee.id" class="account-admin-employee">{{ employee.firstName }}</div>
        </div>
    </div>
    <div class="account-admin-customers">
        <h2 class="account-admin-customers-title">Comptes Clients</h2>
        <div class="account-admin-customers-list">
          <div v-for="customer in getCustomers" :key="customer.id" class="account-admin-customer">{{ customer.firstName }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAccounts',
  components: {
    Header,
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getEmployees', 'getCustomers'])
  },
  methods: {
    
  },
  created: function () {
    this.$store.dispatch('getEmployees');
    this.$store.dispatch('getCustomers');
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
.account-admin-employees, .account-admin-customers{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.account-admin-employees-title{

}
.account-admin-employees-list{
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>