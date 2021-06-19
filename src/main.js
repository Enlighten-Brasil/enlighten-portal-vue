import { createApp } from "vue";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import store from './store'
import router from './router'

// mouting point for the whole app

import App from "@/App.vue";




createApp(App).use(router).use(store).mount("#app");
