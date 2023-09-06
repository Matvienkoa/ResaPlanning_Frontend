import { createStore } from 'vuex';
import instance from '../axios';
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: "",
    profile: "",
    account: "",
    accounts: "",
    accountsEmployee: [],
    accountsCustomer: [],
    customers: [],
    customer: "",
    customersWithoutAccount: [],
    addBox: "closed",
    deleteBox: "closed",
    editBox: "closed",
    getBox: "closed",
    stepBox: "closed",
    dropBox: "closed",
    sizeBox: "closed",
    invoiceBox: 'closed',
    preparations: [],
    preparation: "",
    steps: [],
    slots: [],
    slot: "",
    events: [],
    vehicles: [],
    vehicle: "",
    customerPrepRequestsPending: [],
    customerPrepRequestsRefused: [],
    customerSlotRequestsPending: [],
    customerSlotRequestsRefused: [],
    prepRequests: [],
    slotRequests: [],
    prepRequest: "",
    slotRequest: "",
    prepRequestsPending: [],
    slotRequestsPending: [],
    preparationsCustomerPlanned: [],
    preparationsCustomerCompleted: [],
    preparationsBilling: [],
    preparationsBilled: []
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getProfile: (state) => {
      return state.profile
    },
    getAccount: (state) => {
      return state.account
    },
    getAccounts: (state) => {
      return state.accounts
    },
    getAccountsEmployee: (state) => {
      return state.accountsEmployee
    },
    getAccountsCustomer: (state) => {
      return state.accountsCustomer
    },
    getCustomers: (state) => {
      return state.customers
    },
    getCustomer: (state) => {
      return state.customer
    },
    getCustomersWithoutAccount: (state) => {
      return state.customersWithoutAccount
    },
    getAddBox: (state) => {
      return state.addBox
    },
    getDeleteBox: (state) => {
      return state.deleteBox
    },
    getEditBox: (state) => {
      return state.editBox
    },
    getGetBox: (state) => {
      return state.getBox
    },
    getStepBox: (state) => {
      return state.stepBox
    },
    getDropBox: (state) => {
      return state.dropBox
    },
    getSizeBox: (state) => {
      return state.sizeBox
    },
    getInvoiceBox: (state) => {
      return state.invoiceBox
    },
    getPreparations: (state) => {
      return state.preparations
    },
    getPreparation: (state) => {
      return state.preparation
    },
    getSteps: (state) => {
      return state.steps
    },
    getSlots: (state) => {
      return state.slots
    },
    getSlot: (state) => {
      return state.slot
    },
    getEvents: (state) => {
      return state.events
    },
    getVehicles: (state) => {
      return state.vehicles
    },
    getVehicle: (state) => {
      return state.vehicle
    },
    getCustomerPrepRequestsPending: (state) => {
      return state.customerPrepRequestsPending
    },
    getCustomerPrepRequestsRefused: (state) => {
      return state.customerPrepRequestsRefused
    },
    getCustomerSlotRequestsPending: (state) => {
      return state.customerSlotRequestsPending
    },
    getCustomerSlotRequestsRefused: (state) => {
      return state.customerSlotRequestsRefused
    },
    getPrepRequests: (state) => {
      return state.prepRequests
    },
    getSlotRequests: (state) => {
      return state.slotRequests
    },
    getPrepRequest: (state) => {
      return state.prepRequest
    },
    getSlotRequest: (state) => {
      return state.slotRequest
    },
    getPrepRequestsPending: (state) => {
      return state.prepRequestsPending
    },
    getSlotRequestsPending: (state) => {
      return state.slotRequestsPending
    },
    getPreparationsCustomerPlanned: (state) => {
      return state.preparationsCustomerPlanned
    },
    getPreparationsCustomerCompleted: (state) => {
      return state.preparationsCustomerCompleted
    },
    getPreparationsBilling: (state) => {
      return state.preparationsBilling
    },
    getPreparationsBilled: (state) => {
      return state.preparationsBilled
    }
  },
  mutations: {
    RESET_BOX: function (state) {
      state.addBox = "closed";
      state.deleteBox = "closed";
      state.editBox = "closed";
      state.getBox = "closed";
      state.dropBox = "closed";
      state.sizeBox = "closed";
      state.invoiceBox = 'closed'
    },
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_PROFILE: function (state, profile) {
      state.profile = profile
    },
    SET_ACCOUNT: function (state, account) {
      state.account = account
    },
    SET_ACCOUNTS: function (state, accounts) {
      state.accounts = accounts
    },
    SET_ACCOUNTS_EMPLOYEE: function (state, employee) {
      state.accountsEmployee.push(employee)
    },
    DELETE_ACCOUNT_EMPLOYEE: function (state, employee) {
      const index = state.accountsEmployee.findIndex(e => e.id === employee);
      if (index !== -1) {
        state.accountsEmployee.splice(index, 1);
      }
    },
    SET_ACCOUNTS_CUSTOMER: function (state, customer) {
      state.accountsCustomer.push(customer)
    },
    DELETE_ACCOUNT_CUSTOMER: function (state, customer) {
      const index = state.accountsCustomer.findIndex(c => c.id === customer);
      if (index !== -1) {
        state.accountsCustomer.splice(index, 1);
      }
    },
    RESET_ACCOUNTS: function (state) {
      state.accountsEmployee = []
      state.accountsCustomer = []
    },
    SET_CUSTOMERS: function (state, customers) {
      state.customers = customers
    },
    SET_CUSTOMER: function (state, customer) {
      state.customer = customer
    },
    UPDATE_CUSTOMERS: function (state, customer) {
      state.customers.push(customer)
    },
    SET_CUSTOMERS_WITHOUT_ACCOUNT: function (state, customers) {
      let cwa = [];
      customers.forEach(customer => {
        if(customer.account === 'no') {
          cwa.push(customer)
        }
      })
      state.customersWithoutAccount = cwa
    },
    SET_PREPARATIONS: function (state, preparations) {
      state.preparations = preparations
      preparations.forEach(prep => {
        state.events.push(
          {
            title: prep.immat,
            start: prep.start,
            end: prep.end
          }
        )
      })
    },
    SET_PREPARATION: function (state, preparation) {
      state.preparation = preparation
    },
    SET_STEPS: function (state, steps) {
      state.steps = steps
    },
    SET_SLOTS: function (state, slots) {
      state.slots = slots
    },
    SET_SLOT: function (state, slot) {
      state.slot = slot
    },
    SET_VEHICLES: function (state, vehicles) {
      state.vehicles = vehicles
    },
    SET_VEHICLE: function (state, vehicle) {
      state.vehicle = vehicle
    },
    SET_REQUESTS: function (state, requests) {
      state.customerPrepRequestsPending = []
      state.customerPrepRequestsRefused = []
      state.customerSlotRequestsPending = []
      state.customerSlotRequestsRefused = []
      state.prepRequests = requests.preps
      state.slotRequests = requests.slots
      requests.preps.forEach(prep => {
        if(prep.state === 'pending') {
          state.customerPrepRequestsPending.push(prep)
        }
        if (prep.state === 'refused') {
          state.customerPrepRequestsRefused.push(prep)
        }
      })
      requests.slots.forEach(slot => {
        if (slot.state === 'pending') {
          state.customerSlotRequestsPending.push(slot)
        }
        if (slot.state === 'refused') {
          state.customerSlotRequestsRefused.push(slot)
        }
      })
    },
    SET_PREP_REQUEST: function (state, request) {
      state.prepRequest = request
    },
    SET_SLOT_REQUEST: function (state, request) {
      state.slotRequest = request
    },
    SET_REQUESTS_PENDING: function (state, requests) {
      state.prepRequestsPending = requests.preps
      state.slotRequestsPending = requests.slots
    },
    SET_PREPARATIONS_CUSTOMER: function (state, preparations) {
      state.preparationsCustomerPlanned = preparations.prepsPlanned
      state.preparationsCustomerCompleted = preparations.prepsCompleted
    },
    SET_PREPARATIONS_COMPLETED: function (state, preparations) {
      state.preparationsBilling = preparations.billing
      state.preparationsBilled = preparations.billed
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
                  instance.get(`/customer/user/${response.data.id}`)
                    .then((res) => {
                      commit('SET_PROFILE', res.data);
                    })
                }
                if (response.data.role === 'employee') {
                  instance.get(`/employee/user/${response.data.id}`)
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
    getAccount: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        instance.get(`/account/${user}`)
        .then(account => {
          let accountUser = account.data;
          if (accountUser.role === 'employee') {
            instance.get(`/employee/user/${accountUser.id}`)
            .then((employee) => {
              accountUser.infos = employee.data
              commit('SET_ACCOUNT', accountUser)
              resolve(accountUser)
            })
          }
          if (accountUser.role === 'customer') {
            instance.get(`/customer/user/${accountUser.id}`)
            .then((customer) => {
              accountUser.infos = customer.data
              commit('SET_ACCOUNT', accountUser)
              resolve(accountUser)
            })
          }
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getAccounts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/account')
        .then((accounts) => {
          commit('SET_ACCOUNTS', accounts.data)
          commit('RESET_ACCOUNTS')
          accounts.data.forEach(account => {
            if(account.role === 'employee') {
              instance.get(`/employee/user/${account.id}`)
              .then((employee) => {
                account.infos = employee.data
                commit('SET_ACCOUNTS_EMPLOYEE', account)
              })
            }
            if (account.role === 'customer') {
              instance.get(`/customer/user/${account.id}`)
                .then((customer) => {
                  account.infos = customer.data
                  commit('SET_ACCOUNTS_CUSTOMER', account)
                })
            }
          })
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
            commit('SET_CUSTOMERS_WITHOUT_ACCOUNT', customers.data)
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
    },
    getCustomer: ({ commit }, customer) => {
      return new Promise((resolve, reject) => {
        instance.get(`/customer/${customer}`)
        .then((response) => {
          commit('SET_CUSTOMER', response.data)
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getPreparations: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/preparation/')
        .then((response) => {
          commit('SET_PREPARATIONS', response.data)
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getPreparation: ({ commit }, preparation) => {
      return new Promise((resolve, reject) => {
        instance.get(`/preparation/${preparation}`)
          .then((response) => {
            commit('SET_PREPARATION', response.data)
            resolve(response)
            instance.get(`/step/preparation/${preparation}`)
            .then((steps) => {
              commit('SET_STEPS', steps.data)
            })
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getSlots: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/slot/')
        .then((response) => {
          commit('SET_SLOTS', response.data)
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    getSlot: ({ commit }, slot) => {
      return new Promise((resolve, reject) => {
        instance.get(`/slot/${slot}`)
          .then((response) => {
            commit('SET_SLOT', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getVehicles: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/vehicle/')
          .then(function (response) {
            commit('SET_VEHICLES', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getVehicle: ({ commit }, vehicule) => {
      return new Promise((resolve, reject) => {
        instance.get(`/vehicle/${vehicule}`)
          .then((response) => {
            commit('SET_VEHICLE', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getRequests: ({ commit }) => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        return new Promise((resolve, reject) => {
          if (userId) {
            instance.get(`/customer/user/${userId}`)
              .then((res) => {
                instance.get(`/preprequest/${res.data.id}`)
                  .then((requests) => {
                    commit('SET_REQUESTS', requests.data);
                    resolve(requests)
                  })
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
    getPrepRequest: ({ commit }, request) => {
      return new Promise((resolve, reject) => {
        instance.get(`/preprequest/one/${request}`)
          .then((response) => {
            commit('SET_PREP_REQUEST', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getSlotRequest: ({ commit }, request) => {
      return new Promise((resolve, reject) => {
        instance.get(`/slotrequest/${request}`)
          .then((response) => {
            commit('SET_SLOT_REQUEST', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getRequestsPending: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/request/')
          .then((res) => {
              commit('SET_REQUESTS_PENDING', res.data);
              resolve(res)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },
    getPreparationsCustomer: ({ commit }) => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        return new Promise((resolve, reject) => {
          if (userId) {
            instance.get(`/customer/user/${userId}`)
              .then((res) => {
                instance.get(`/preparation/customer/${res.data.id}`)
                  .then((preps) => {
                    commit('SET_PREPARATIONS_CUSTOMER', preps.data);
                    resolve(preps)
                  })
              })
              .catch(function (error) {
                reject(error)
              });
          }
        })
      }
    },
    getPreparationsCompleted: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get('/billings')
        .then((res) => {
          console.log(res)
          commit('SET_PREPARATIONS_COMPLETED', res.data)
          resolve(res)
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
