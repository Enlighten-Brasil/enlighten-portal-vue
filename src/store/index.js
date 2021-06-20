import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = (process.env.API_URL) ? process.env.API_URL : 'http://localhost:1337';

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
      // LOGIN
      retrieveToken(state, token) {
        state.token = token
      },
      // LOGOUT
      destroyToken(state) {
        state.token = null
    }
    // AUTH END
  },
  actions: {
    // AUTH BEGGIN
      // LOGOUT 
      // LOGIN
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
              console.log(error)
              reject(error)
            })
          })
      },
      destroyToken(context) {
        if (context.getters.loggedIn) {
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
        }
      }  
    // AUTH END

  },
  modules: {
  }
})
