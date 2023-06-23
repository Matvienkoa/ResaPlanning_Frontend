<template>
  <AdminAddAccount v-if="getAddAccountBox === 'open'" :type="this.type" />
  <Header />
  <div class="account-admin-box">
    <div class="account-admin-employees">
      <div class="account-admin-employees-title-box">
        <h2 class="account-admin-employees-title">Comptes Collaborateurs</h2>
        <img @click="openAddAccountBox('collaborateur')" src="../assets/Icons/add.svg" alt="" class="account-admin-employee-icon">
      </div>
      <div class="account-admin-employees-list">
        <div v-for="employee in getEmployees" :key="employee.id" class="account-admin-employee">
          <div class="account-admin-employee-infos">
            <div>Compte N°{{ employee.userId }}</div>
            <div>{{ employee.firstName }}</div>
            <div>{{ employee.lastName }}</div>
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
        <img @click="openAddAccountBox('client')" src="../assets/Icons/add.svg" alt="" class="account-admin-customer-icon">
      </div>
      <div class="account-admin-customers-list">
        <div v-for="customer in getCustomers" :key="customer.id" class="account-admin-customer">
          <div class="account-admin-customer-infos">
            <div>Compte N°{{ customer.userId }}</div>
            <div>{{ customer.company }}</div>
            <div>{{ customer.firstName }}</div>
            <div>{{ customer.lastName }}</div>
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
import AdminAddAccount from '@/components/AdminAddAccount.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAccounts',
  components: {
    Header,
    AdminAddAccount
  },
  data() {
    return {
      type: ""
    }
  },
  computed: {
    ...mapGetters(['getEmployees', 'getCustomers', 'getAddAccountBox'])
  },
  methods: {
    openAddAccountBox(type) {
      this.type = type
      this.$store.state.addAccountBox = "open"
    }
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