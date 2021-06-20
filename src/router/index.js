import { createRouter, createWebHashHistory } from 'vue-router'


// layouts
import Portal from "@/layouts/Portal.vue";
import Auth from "@/layouts/Auth.vue";


// views for portal layout
import Dashboard from "@/views/portal/Dashboard.vue";
import Settings from "@/views/portal/Settings.vue";
import Tables from "@/views/portal/Tables.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Logout from "@/views/auth/Logout.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Index from "@/views/Index.vue";

// routes
const routes = [
  {
    name: 'portal',
    path: "/portal",
    redirect: "/portal/dashboard",
    component: Portal,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'dashboard',
        path: "/portal/dashboard",
        component: Dashboard,
      },
      {
        path: "/portal/settings",
        component: Settings,
      },
      {
        path: "/portal/tables",
        component: Tables,
      }
    ],
  },
  {
    name: 'auth',
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,    
    children: [
      {
        name: 'login',
        path: "/auth/login",
        component: Login,
        meta: {
          requiresVisitor: true,
        },
      },
      {
        name: 'logout',
        path: "/auth/logout",
        component: Logout,
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'register',
        path: "/auth/register",
        component: Register,
        meta: {
          requiresVisitor: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: Index,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
