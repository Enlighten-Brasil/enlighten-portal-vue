import { createApp } from "vue";
import Toast from "vue-toastification";

// styles
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import store from './store'
import router from './router'

// mouting point for the whole app
import App from "@/App.vue";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
// TOAST OPTIONS HERE
const options = {
    // You can set your default options here
};

createApp(App).use(Toast, options).use(router).use(store).mount("#app");
