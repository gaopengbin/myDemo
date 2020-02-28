import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Home from "../components/pages/Home.vue";
import Blog from "../components/pages/Blog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "Blog",
    component: Blog
  }
];

const router = new VueRouter({
  routes
});

export default router;
