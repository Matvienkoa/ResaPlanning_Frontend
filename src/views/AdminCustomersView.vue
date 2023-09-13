<template>
<AdminEditCustomer v-if="getEditBox === 'editCustomer'" :id="customer" />
<AdminDeleteCustomer v-if="getDeleteBox === 'deleteCustomer'" :id="customer" />
<AdminAddCustomer v-if="getAddBox === 'addCustomer'" />
  <Header url="/admin/home" />
  <div class="main-page">
    <div class="account-admin-title-box">
      <h1 class="account-admin-title">Clients</h1>
    </div>
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
            <div class="customer-infos-hidden-box">
              <div class="customer-infos-hidden">
                <div>{{ customer.adress }}</div>
                <div>{{ customer.adress2 }}</div>
                <div>{{ customer.zipCode }}</div>
                <div>{{ customer.city }}</div>
                <div>{{ customer.phone }}</div>
                <div>{{ customer.mail }}</div>
              </div>
              <div class="customer-actions-hidden">
                <img @click="openEditBox({id: customer.id, mode: 'editCustomer'})" src="../assets/Icons/edit.svg" alt="" class="customer-edit-icon">
                <img @click="openDeleteBox({id: customer.id, mode: 'deleteCustomer'})" src="../assets/Icons/delete.svg" alt="" class="customer-delete-icon">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

import AdminEditCustomer from '@/components/AdminEditCustomer.vue';
import AdminDeleteCustomer from '@/components/AdminDeleteCustomer.vue';
import AdminAddCustomer from '@/components/AdminAddCustomer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminCustomers',
  components: {
    Header,
    AdminEditCustomer,
    AdminDeleteCustomer,
    AdminAddCustomer
  },
  data() {
    return {
      customer: "",
    }
  },
  computed: {
    ...mapGetters(['getCustomers', 'getAddBox', 'getEditBox', 'getDeleteBox'])
  },
  methods: {
    openAddBox(type) {
      this.$store.state.addBox = type
    },
    openEditBox(data) {
      this.customer = data.id
      this.$store.state.editBox = data.mode
    },
    openDeleteBox(data) {
      this.customer = data.id
      this.$store.state.deleteBox = data.mode
    },
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
.account-admin-customer-icon{
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
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
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}
.account-admin-customer-infos{
  display: flex;
}
.customer-infos-hidden-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.customer-infos-hidden{
  display: flex;
  flex-direction: column;
}
.customer-actions-hidden{
  display: flex;
}
.customer-edit-icon{
  cursor: pointer;
  height: 20px;
}
.customer-delete-icon{
  cursor: pointer;
  height: 20px;
}

</style>