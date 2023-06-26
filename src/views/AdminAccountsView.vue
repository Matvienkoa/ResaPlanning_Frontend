<template>
  <AdminAddAccountEmployee v-if="getAddBox === 'addAccountEmployee'" />
  <Header />
  <div class="account-admin-box">
    <div class="account-admin-employees">
      <div class="account-admin-employees-title-box">
        <h2 class="account-admin-employees-title">Comptes Collaborateurs</h2>
        <img @click="openAddBox('addAccountEmployee')" src="../assets/Icons/add.svg" alt="" class="account-admin-employee-icon">
      </div>
      <div class="account-admin-employees-list">
        <div v-for="employee in getAccountsEmployees" :key="employee.id" class="account-admin-employee">
          <div class="account-admin-employee-infos">
            <div>Compte N°{{ employee.id }}</div>
            <div>{{ employee.employees[0].firstName }}</div>
            <div>{{ employee.employees[0].lastName }}</div>
          </div>
          <div class="account-admin-employee-actions">
            <router-link :to="{name: 'AdminAccountEmployeeEdit', params: {id: employee.id}}" class="account-admin-employee-link">
              <img src="../assets/Icons/edit.svg" alt="" class="account-admin-employee-icon">
            </router-link>
            <img src="../assets/Icons/delete.svg" alt="" class="account-admin-employee-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="account-admin-customers">
      <div class="account-admin-customers-title-box">
        <h2 class="account-admin-customers-title">Comptes Clients</h2>
        <img src="../assets/Icons/add.svg" alt="" class="account-admin-customer-icon">
      </div>
      <div class="account-admin-customers-list">
        <div v-for="customer in getAccountsCustomers" :key="customer.id" class="account-admin-customer">
          <div class="account-admin-customer-infos">
            <div>Compte N°{{ customer.id }}</div>
            <div>{{ customer.customers[0].company }}</div>
            <div>{{ customer.customers[0].firstName }}</div>
            <div>{{ customer.customers[0].lastName }}</div>
          </div>
          <div class="account-admin-customer-actions">
            <router-link :to="{name: 'AdminAccountCustomerEdit', params: {id: customer.id}}" class="account-admin-customer-link">
              <img src="../assets/Icons/edit.svg" alt="" class="account-admin-customer-icon">
            </router-link>
            <img src="../assets/Icons/delete.svg" alt="" class="account-admin-customer-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminAddAccountEmployee from '@/components/AdminAddAccountEmployee.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAccounts',
  components: {
    Header,
    AdminAddAccountEmployee
  },
  data() {
    return {
      type: ""
    }
  },
  computed: {
    ...mapGetters(['getAccountsEmployees', 'getAccountsCustomers', 'getAddBox'])
  },
  methods: {
    openAddBox(type) {
      this.$store.state.addBox = type
    }
  },
  created: function () {
    this.$store.dispatch('getAccounts');
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
.account-admin-employees, .account-admin-customers{
  width: 95%;
  display: flex;
  flex-direction: column;
}
.account-admin-employees-title-box, .account-admin-customers-title-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.account-admin-employees-list, .account-admin-customers-list{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.account-admin-employee, .account-admin-customer{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.account-admin-employee-infos, .account-admin-customer-infos{
  display: flex;
}
.account-admin-employee-icon, .account-admin-customer-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

</style>