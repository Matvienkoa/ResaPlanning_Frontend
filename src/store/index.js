import { createStore } from 'vuex';
import instance from '../axios';
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: "",
    profile: "",
    // accounts: [],
    employees: [],
    customers: [],
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getProfile: (state) => {
      return state.profile
    },
    // getAccounts: (state) => {
    //   return state.accounts
    // },
    getEmployees: (state) => {
      return state.employees
    },
    getCustomers: (state) => {
      return state.customers
    },
  },
  mutations: {
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_PROFILE: function (state, profile) {
      state.profile = profile
    },
    // SET_ACCOUNTS: function (state, accounts) {
    //   state.accounts = accounts
    // },
    SET_EMPLOYEES: function (state, employees) {
      state.employees = employees
    },
    SET_CUSTOMERS: function (state, customers) {
      state.customers = customers
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
    }
  },
  modules: {
  }
})
