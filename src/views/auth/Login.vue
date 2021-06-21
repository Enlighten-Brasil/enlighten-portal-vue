<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto p-8 lg:px-10 py-10 pt-0">
            <form action="#" @submit.prevent="login">
              <div class="relative w-full mb-3 mt-8">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="nome@empresa.com"
                  name="username"
                  id="username"
                  v-model="username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Senha
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="*********"
                  name="password"
                  id="password"
                  v-model="password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Lembrar me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button v-if="loading == false" class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit">
                  Entrar
                </button>
                <button v-else disabled class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                  <i class="animate-spin fas fa-spinner"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-200">
              <small>Esqueceu seu acesso?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Não tem uma conta?</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  setup() {
      // Get toast interface
      const toast = useToast();

      // Use it!
      toast("I'm a toast!");

      // or with options
      toast.success("My toast content", {
        timeout: 2000
      });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
    },
  
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false,
    }
  },
  methods: {
    login() {
      this.$notify('Hello user!')
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.loading = false
          this.$router.push({name: 'portal'})
        })
        .catch(error => {
          this.loading = false
          this.serverError = error.response.data
          this.successMessage = ''
        })
    }
  }
}
</script>
