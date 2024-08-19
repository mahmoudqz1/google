import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "leads",
          name: "leads",
          component: () => import("../views/LeadsView.vue"),
        },
        {
          path: "clients",
          name: "clients",
          component: () => import("../views/ClientsView.vue"),
        },
        {
          path: "devoirs",
          name: "devoirs",
          component: () => import("../views/DevoirsView.vue"),
        },
        {
          path: "contracts",
          name: "contracts",
          component: () => import("../views/ContractsView.vue"),
        },
        {
          path: "calls",
          name: "calls",
          component: () => import("../views/CallsView.vue"),
        },
        {
          path: "payments",
          name: "payments",
          component: () => import("../views/PaymentsView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
