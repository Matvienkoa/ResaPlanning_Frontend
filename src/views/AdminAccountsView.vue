<template>
  <AdminAddAccountEmployee v-if="getAddBox === 'addAccountEmployee'" />
  <AdminAddAccountCustomer v-if="getAddBox === 'addAccountCustomer'" />
  <AdminDeleteAccountEmployee v-if="getDeleteBox === 'deleteAccountEmployee'" :id="id" />
  <AdminDeleteAccountCustomer v-if="getDeleteBox === 'deleteAccountCustomer'" :id="id" />
  <AdminEditAccountEmployee v-if="getEditBox === 'editAccountEmployee'" :id="id" />
  <AdminEditAccountCustomer v-if="getEditBox === 'editAccountCustomer'" :id="id" />
  <Header />
  <div class="account-admin-box">
    <div class="account-admin-employees">
      <div class="account-admin-employees-title-box">
        <h2 class="account-admin-employees-title">Comptes Collaborateurs</h2>
        <img @click="openAddBox('addAccountEmployee')" src="../assets/Icons/add.svg" alt="" class="account-admin-employee-icon">
      </div>
      <div class="account-admin-employees-list">
        <div v-for="employee in getAccountsEmployee" :key="employee.id" class="account-admin-employee">
          <div class="account-admin-employee-infos">
            <div>Compte N°{{ employee.id }}</div>
            <div>{{ employee.infos.firstName }}</div>
            <div>{{ employee.infos.lastName }}</div>
          </div>
          <div class="account-admin-employee-actions">
            <img @click="openEditBox({id: employee.id, type: 'editAccountEmployee'})" src="../assets/Icons/edit.svg" alt="" class="account-admin-employee-icon">
            <img @click="openDeleteBox({id: employee.id, type: 'deleteAccountEmployee'})" src="../assets/Icons/delete.svg" alt="" class="account-admin-employee-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="account-admin-customers">
      <div class="account-admin-customers-title-box">
        <h2 class="account-admin-customers-title">Comptes Clients</h2>
        <img @click="openAddBox('addAccountCustomer')" src="../assets/Icons/add.svg" alt="" class="account-admin-customer-icon">
      </div>
      <div class="account-admin-customers-list">
        <div v-for="customer in getAccountsCustomer" :key="customer.id" class="account-admin-customer">
          <div class="account-admin-customer-infos">
            <div>Compte N°{{ customer.id }}</div>
            <div>{{ customer.infos.company }}</div>
            <div>{{ customer.infos.firstName }}</div>
            <div>{{ customer.infos.lastName }}</div>
          </div>
          <div class="account-admin-customer-actions">
            <img @click="openEditBox({id: customer.id, type: 'editAccountCustomer'})" src="../assets/Icons/edit.svg" alt="" class="account-admin-customer-icon">
            <img @click="openDeleteBox({id: customer.id, type: 'deleteAccountCustomer'})" src="../assets/Icons/delete.svg" alt="" class="account-admin-customer-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AdminAddAccountEmployee from '@/components/AdminAddAccountEmployee.vue';
import AdminAddAccountCustomer from '@/components/AdminAddAccountCustomer.vue';
import AdminDeleteAccountEmployee from '@/components/AdminDeleteAccountEmployee.vue';
import AdminDeleteAccountCustomer from '@/components/AdminDeleteAccountCustomer.vue';
import AdminEditAccountEmployee from '@/components/AdminEditAccountEmployee.vue';
import AdminEditAccountCustomer from '@/components/AdminEditAccountCustomer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminAccounts',
  components: {
    Header,
    AdminAddAccountEmployee,
    AdminAddAccountCustomer,
    AdminDeleteAccountEmployee,
    AdminDeleteAccountCustomer,
    AdminEditAccountEmployee,
    AdminEditAccountCustomer
  },
  data() {
    return {
      type: "",
      id: null
    }
  },
  computed: {
    ...mapGetters(['getAccountsEmployee', 'getAccountsCustomer', 'getAddBox', 'getDeleteBox', 'getEditBox'])
  },
  methods: {
    openAddBox(type) {
      this.$store.state.addBox = type
    },
    openDeleteBox(data) {
      this.id = data.id
      this.$store.state.deleteBox = data.type
    },
    openEditBox(data) {
      this.id = data.id
      this.$store.state.editBox = data.type
    },
  },
  created: function () {
    this.$store.dispatch('getAccounts')
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