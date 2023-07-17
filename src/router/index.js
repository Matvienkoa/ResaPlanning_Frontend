import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import AdminHome from '../views/AdminHomeView.vue'

import AdminAccounts from '../views/AdminAccountsView.vue'

import AdminPlanning from '../views/AdminPlanningView.vue'

import AdminWorkshop from '../views/AdminWorkshopView.vue'

import AdminShowcase from '../views/AdminShowcaseView.vue'
import AdminShowcaseVehicle from '../views/AdminShowcaseVehicleView.vue'

import AdminCustomers from '../views/AdminCustomersView.vue'
import AdminCustomer from '../views/AdminCustomerView.vue'

import CustomerHome from '../views/CustomerHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/admin/home',
    name: 'AdminHome',
    component: AdminHome
  },

  {
    path: '/admin/accounts',
    name: 'AdminAccounts',
    component: AdminAccounts
  },

  {
    path: '/admin/planning',
    name: 'AdminPlanning',
    component: AdminPlanning
  },

  {
    path: '/admin/workshop',
    name: 'AdminWorkshop',
    component: AdminWorkshop
  },

  {
    path: '/admin/showcase',
    name: 'AdminShowcase',
    component: AdminShowcase
  },
  {
    path: '/admin/showcase/vehicle/:id',
    name: 'AdminShowcaseVehicle',
    component: AdminShowcaseVehicle
  },

  {
    path: '/admin/customers',
    name: 'AdminCustomers',
    component: AdminCustomers
  },
  {
    path: '/admin/customer/:id',
    name: 'AdminCustomer',
    component: AdminCustomer
  },

  {
    path: '/customer/home',
    name: 'CustomerHome',
    component: CustomerHome
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
