<template>
  <AdminAddAccountEmployee v-if="getAddBox === 'addAccountEmployee'" />
  <AdminAddAccountCustomer v-if="getAddBox === 'addAccountCustomer'" />
  <AdminDeleteAccountEmployee v-if="getDeleteBox === 'deleteAccountEmployee'" :id="id" />
  <AdminDeleteAccountCustomer v-if="getDeleteBox === 'deleteAccountCustomer'" :id="id" />
  <AdminEditAccountEmployee v-if="getEditBox === 'editAccountEmployee'" :id="id" />
  <AdminEditAccountCustomer v-if="getEditBox === 'editAccountCustomer'" :id="id" />
  <Header url="/admin/home" />
  <div class="main-page">
    <div class="account-admin-title-box">
      <h1 class="account-admin-title">Comptes d'accès</h1>
    </div>
    <div class="account-admin-box">
      <div class="account-admin-employees">
        <div class="account-admin-employees-title-box">
          <h2 class="account-admin-employees-title">Collaborateurs</h2>
          <div @click="openAddBox('addAccountEmployee')" class="add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add.svg" alt="" class="add-icon">
          </div>
        </div>
        <div class="account-admin-employees-list">
          <div v-for="employee in getAccountsEmployee" :key="employee.id" class="account-admin-employee">
            <div class="account-admin-employee-infos">
              <div class="employee-info">N°{{ employee.id }}</div>
              <div class="employee-info slash">|</div>
              <div v-if="employee.infos.firstName" class="employee-info">{{ employee.infos.firstName }}</div>
              <div v-if="employee.infos.lastName" class="employee-info">{{ employee.infos.lastName }}</div>
              <div class="employee-info slash">|</div>
              <div v-if="employee.infos.privileges === 'yes'" class="employee-info checkbox-box">Privilèges : <img class="checkbox" src="../assets/Icons/checkbox-check.svg" alt=""></div>
              <div v-if="employee.infos.privileges === 'no'" class="employee-info checkbox-box">Privilèges : <img class="checkbox" src="../assets/Icons/checkbox-mark.svg" alt=""></div>
            </div>
            <div class="account-admin-employee-actions">
              <div @click="openEditBox({id: employee.id, type: 'editAccountEmployee'})" class="edit-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="edit-icon">
              </div>
              <div @click="openDeleteBox({id: employee.id, type: 'deleteAccountEmployee'})" class="delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="delete-icon">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-admin-customers">
        <div class="account-admin-customers-title-box">
          <h2 class="account-admin-customers-title">Clients</h2>
          <div @click="openAddBox('addAccountCustomer')" class="add-icon-box">
            <img crossorigin="anonymous" src="../assets/Icons/add.svg" alt="" class="add-icon">
          </div>
        </div>
        <div class="account-admin-customers-list">
          <div v-for="customer in getAccountsCustomer" :key="customer.id" class="account-admin-customer">
            <div class="account-admin-customer-infos">
              <div class="customer-info">N°{{ customer.id }}</div>
              <div class="employee-info slash">|</div>
              <div v-if="customer.infos.company" class="customer-info">{{ customer.infos.company }}</div>
              <div class="employee-info slash">|</div>
              <div v-if="customer.infos.firstName" class="customer-info">{{ customer.infos.firstName }}</div>
              <div v-if="customer.infos.lastName" class="customer-info">{{ customer.infos.lastName }}</div>
              <div class="employee-info slash">|</div>
              <div v-if="customer.afc === 'yes'" class="customer-info checkbox-box">Compte AFC : <img class="checkbox" src="../assets/Icons/checkbox-check.svg" alt=""></div>
              <div v-if="customer.afc === 'no'" class="customer-info checkbox-box">Compte AFC : <img class="checkbox" src="../assets/Icons/checkbox-mark.svg" alt=""></div>
              <div class="employee-info slash">|</div>
              <div v-if="customer.millenium === 'yes'" class="customer-info checkbox-box">Compte Millenium : <img class="checkbox" src="../assets/Icons/checkbox-check.svg" alt=""></div>
              <div v-if="customer.millenium === 'no'" class="customer-info checkbox-box">Compte Millenium : <img class="checkbox" src="../assets/Icons/checkbox-mark.svg" alt=""></div>
            </div>
            <div class="account-admin-customer-actions">
              <div @click="openEditBox({id: customer.id, type: 'editAccountCustomer'})" class="edit-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/edit.svg" alt="" class="edit-icon">
              </div>
              <div @click="openDeleteBox({id: customer.id, type: 'deleteAccountCustomer'})" class="delete-icon-box">
                <img crossorigin="anonymous" src="../assets/Icons/delete.svg" alt="" class="delete-icon">
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
    this.$store.dispatch('getAccounts');
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

<style>
.account-admin-title-box{
  width: 100%;
  height: 60px;
  border-bottom: 3px solid #c90200;
  display: flex;
  align-items: center;
}
.account-admin-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2.1em;
  margin-left: 30px;
  text-transform: uppercase;
}
.account-admin-box{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1.5em;
  padding-bottom: 4em;
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
  border-bottom: 2px solid #c0c0c0;
  margin-bottom: 15px;
  padding-bottom: 5px;
}
.account-admin-employees-title, .account-admin-customers-title{
  font-family: 'trumpSoftPro', sans-serif;
  font-size: 2em;
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
  align-items: center;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  padding: 0.4em 0;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.account-admin-employee-infos, .account-admin-customer-infos{
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
}
.employee-info, .customer-info{
  margin: 5px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: 'catamaran', sans-serif;
  font-size: 1em;
}
.slash{
  font-weight: 400;
}
.checkbox-box{
  display: flex;
  align-items: center;
}
.checkbox{
  width: 20px;
  margin-left: 5px;
}
.account-admin-employee-actions, .account-admin-customer-actions{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}

.add-icon-box{
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
}
.add-icon{
  height: 20px;
}
.edit-icon-box{
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
  margin-right: 5px;
}
.edit-icon{
  height: 20px;
}
.delete-icon-box{
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
  margin-right: 5px;
}
.delete-icon{
  height: 20px;
}

@media (max-width: 480px) {
  .account-admin-employee, .account-admin-customer{
    flex-direction: column;
    align-items: flex-start;
  }
  .account-admin-employee-actions, .account-admin-customer-actions{
    align-self: flex-end;
    margin-top: 5px;
  }
  .edit-icon-box{
    height: 35px;
    width: 35px;
  }
  .edit-icon{
    height: 15px;
  }
  .delete-icon-box{
    height: 35px;
    width: 35px;
  }
  .delete-icon{
    height: 15px;
  }
}
</style>