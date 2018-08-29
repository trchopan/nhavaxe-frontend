import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Article from "./views/Article.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/article/:id",
      name: "article",
      component: Article
    },
    {
      // Lazy load
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      // Lazy load
      path: "/page-not-found",
      name: "page-not-found",
      component: () => import("./views/PageNotFound.vue")
    },
    { path: "*", redirect: "/page-not-found" }
  ]
});
