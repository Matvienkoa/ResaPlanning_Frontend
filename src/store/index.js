import { createStore } from 'vuex';
import instance from '../axios';
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: "",
    profile: "",
    accountsEmployees: [],
    accountsCustomers: [],
    customers: [],
    addBox: "closed",
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getProfile: (state) => {
      return state.profile
    },
    getAccountsEmployees: (state) => {
      return state.accountsEmployees
    },
    getAccountsCustomers: (state) => {
      return state.accountsCustomers
    },
    getCustomers: (state) => {
      return state.customers
    },
    getAddBox: (state) => {
      return state.addBox
    },
  },
  mutations: {
    RESET_BOX: function (state) {
      state.addBox = "closed"
    },
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_PROFILE: function (state, profile) {
      state.profile = profile
    },
    SET_ACCOUNTS: function (state, accounts) {
      state.accountsCustomers = [];
      state.accountsEmployees = [];
      accounts.forEach(account => {
        if(account.role === 'employee') {
          state.accountsEmployees.push(account)
        }
        if (account.role === 'customer') {
          state.accountsCustomers.push(account)
        }
      });
    },
    SET_CUSTOMERS: function (state, customers) {
      state.customers = customers
    },
    UPDATE_CUSTOMERS: function (state, customer) {
      state.customers.push(customer)
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            if (response.data.token) {
              commit('SET_USER', response.data);
              localStorage.setItem('token', response.data.token);
              resolve(response);
            }
          })
          .catch(function (error) {
            reject(error);
          })
      })
    },
    getProfile: ({ commit }) => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        return new Promise((resolve, reject) => {
          if (userId) {
            instance.get(`/account/${userId}`)
              .then(function (response) {
                if (response.data.role === 'customer') {
                  instance.get(`/account/customer/${response.data.id}`)
                    .then((res) => {
                      commit('SET_PROFILE', res.data);
                    })
                }
                if (response.data.role === 'employee') {
                  instance.get(`/account/employee/${response.data.id}`)
                    .then((res) => {
                      commit('SET_PROFILE', res.data);
                    })
                }
                resolve(response)
              })
              .catch(function (error) {
                reject(error)
              });
          }
        })
      } else {
        return 'no token'
      }
    },
    getAccounts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/account')
        .then((accounts) => {
          commit('SET_ACCOUNTS', accounts.data)
          resolve(accounts)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getEmployees: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/employee')
        .then((employees) => {
          commit('SET_EMPLOYEES', employees.data)
          resolve(employees)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getCustomers: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/customer')
          .then((customers) => {
            commit('SET_CUSTOMERS', customers.data)
            resolve(customers)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    addCustomer: ({ commit }, customer) => {
      return new Promise((resolve, reject) => {
        instance.post('/customer', customer)
          .then((response) => {
            commit('UPDATE_CUSTOMERS', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    }
  },
  modules: {
  }
})
