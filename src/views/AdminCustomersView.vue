<template>
<AdminEditCustomer v-if="getEditBox === 'editCustomer'" :id="customer" />
<AdminDeleteCustomer v-if="getDeleteBox === 'deleteCustomer'" :id="customer" :account="account" />
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
          <img crossorigin="anonymous" @click="openAddBox('addCustomer')" src="../assets/Icons/add.svg" alt="" class="account-admin-customer-icon">
        </div>
        <div class="account-admin-customers-list">
          <div v-for="customer in getCustomers" :key="customer.id" class="account-admin-customer">
            <div class="account-admin-customer-infos-box">
              <div class="account-admin-customer-infos">
                <div class="customer-info">Client N°{{ customer.id }}</div>
                <div class="customer-info slash">|</div>
                <div class="customer-info">{{ customer.company }}</div>
                <div v-if="customer.firstName || customer.lastName" class="customer-info slash">|</div>
                <div v-if="customer.firstName" class="customer-info">{{ customer.firstName }}</div>
                <div v-if="customer.lastName" class="customer-info">{{ customer.lastName }}</div>
              </div>
              <div v-if="showMode === 'closed' || customerSelected !== customer.id" class="account-admin-customer-show-box">
                <img crossorigin="anonymous" @click="openShowMode(customer.id)" src="../assets/Icons/arrow-down.svg" alt="" class="account-admin-customer-show-icon">
              </div>
              <div v-if="showMode === 'open' && customerSelected === customer.id" class="account-admin-customer-show-box">
                <img crossorigin="anonymous" @click="closeShowMode()" src="../assets/Icons/arrow-up.svg" alt="" class="account-admin-customer-show-icon">
              </div>
            </div>
            <div v-if="showMode === 'open' && customerSelected === customer.id" class="customer-infos-hidden-box">
              <div class="customer-infos-hidden">
                <div v-if="customer.adress" class="customer-info">{{ customer.adress }}</div>
                <div v-if="customer.adress2" class="customer-info">{{ customer.adress2 }}</div>
                <div v-if="customer.zipCode" class="customer-info">{{ customer.zipCode }}</div>
                <div v-if="customer.city" class="customer-info">{{ customer.city }}</div>
                <div class="customer-info">{{ customer.phone }}</div>
                <div class="customer-info">{{ customer.mail }}</div>
              </div>
              <div class="customer-edit-icon-box">
                <img crossorigin="anonymous" @click="openEditBox({id: customer.id, mode: 'editCustomer'})" src="../assets/Icons/edit.svg" alt="" class="customer-edit-icon">
              </div>
              <div class="customer-delete-icon-box">
                <img crossorigin="anonymous" @click="openDeleteBox({id: customer.id, account: customer.userId, mode: 'deleteCustomer'})" src="../assets/Icons/delete-2.svg" alt="" class="customer-delete-icon">
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
      account: "",
      showMode: "closed",
      customerSelected: null
    }
  },
  computed: {
    ...mapGetters(['getCustomers', 'getAddBox', 'getEditBox', 'getDeleteBox'])
  },
  methods: {
    openShowMode(id) {
      this.customerSelected = id
      this.showMode = 'open'
    },
    closeShowMode() {
      this.customerSelected = null
      this.showMode = 'closed'
    },
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
      this.account = data.account
    },
  },
  created: function () {
    this.$store.dispatch('getCustomers');
    this.$store.commit('RESET_BOX');
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'admin') {
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
.account-admin-customer-infos-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account-admin-customer-infos{
  display: flex;
}
.account-admin-customer-show-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #fff;
}
.account-admin-customer-show-icon{
  height: 20px;
}

.customer-infos-hidden-box{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.customer-infos-hidden{
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
.customer-edit-icon-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #fff;
  position: absolute;
  bottom: 3px;
  right: 35px;
}
.customer-edit-icon{
  height: 16px;
}
.customer-delete-icon-box{
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #fff;
  position: absolute;
  bottom: 3px;
  right: 0;
}
.customer-delete-icon{
  height: 16px;
}

</style>