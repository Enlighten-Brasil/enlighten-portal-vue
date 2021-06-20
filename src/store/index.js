import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://134.209.124.223'

export default createStore({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
  },
  mutations: {
    // AUTH BEGGIN
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
    // AUTH END
  },
  actions: {
    // AUTH BEGGIN
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem('access_token')
        context.commit('destroyToken')
      }
    },
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
            console.log(response);
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },    
    // AUTH END

  },
  modules: {
  }
})
