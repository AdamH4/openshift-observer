
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../App.vue"),
  },
]

const router = createRouter({
  // base: "/~xkobera/kahi-final/",
  history: createWebHistory(),
  routes,
})

export default router
