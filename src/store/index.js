import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = (process.env.API_URL) ? process.env.API_URL : 'http://localhost:1337';
// ADD AUTH HEADER
(localStorage.getItem('access_token')) ? 
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token') : '';

export default createStore({
  state: {
    // AUTH
    token: localStorage.getItem('access_token') || null,
    // USER
    userData: '',
    userConfig: '',
    // GROUP
    groupData: '',
    // MODULES 
    modulesAct: []
  },
  getters: {
    // AUTH
    loggedIn(state) {
      return state.token !== null
    },
    // USER
    getUserData(state) {
      return state.userData !== null
    },
    // MODULES
    getModules(state) {
      return state.modulesAct !== null
    }
  },
  mutations: {
    // AUTH / LOGIN
    retrieveToken(state, token) {
      state.token = token
    },
    // AUTH / LOGOUT
    destroyToken(state) {
      state.token = null
    },
    // USER / SET DATA
    retrieveModules(state, modulesAct) {
      state.modulesAct = modulesAct
    }
  },
  actions: {
    // AUTH / LOGIN
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/local', {
          identifier: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.jwt
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },
    // AUTH / LOGOUT
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem('access_token')
        context.commit('destroyToken')
      }
    },
    // MODULES / GET
    retrieveModules(context) {
      axios.get('/modules')
        .then(response => {
          console.log(response.data)
          context.commit('retrieveModules', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    

  },
  modules: {
  }
})
