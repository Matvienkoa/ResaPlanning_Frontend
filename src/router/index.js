import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import AdminHome from '../views/AdminHomeView.vue'
import AdminAccounts from '../views/AdminAccountsView.vue'
import AdminPlanning from '../views/AdminPlanningView.vue'

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
