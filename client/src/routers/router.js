import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("../pages/HomePage.vue"),
    },

    {
      path: "/sign-in",
      name: "LoginPage",
      component: () => import("../pages/LoginPage.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  if (localStorage.getItem("access_token") && to.name === "LoginPage") {
    return { name: "HomePage" };
  }
  if (!localStorage.getItem("access_token") && to.name === "HomePage") {
    return { name: "LoginPage" };
  }
});

export default router;
