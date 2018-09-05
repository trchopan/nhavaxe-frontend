import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Article from "./views/Article.vue";

const About = () => import(/* webpackChunkName: "about" */ "./views/About.vue");
const PageNotFound = () =>
  import(/* webpackChunkName: "page-not-found" */ "./views/PageNotFound.vue");
const BangGia = () =>
  import(/* webpackChunkName: "bang-gia" */ "./views/BangGia.vue");
const TableNha = () =>
  import(/* webpackChunkName: "bang-gia" */ "./components/TableNha.vue");
const TableXe = () =>
  import(/* webpackChunkName: "bang-gia" */ "./components/TableXe.vue");

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
      path: "/bang-gia",
      name: "bang-gia",
      component: BangGia,
      children: [
        {
          path: "nha",
          name: "nha",
          component: TableNha
        },
        {
          path: "xe",
          name: "xe",
          component: TableXe
        }
      ]
    },
    {
      // Lazy load
      path: "/about",
      name: "about",
      component: About
    },
    {
      // Lazy load
      path: "/page-not-found",
      name: "page-not-found",
      component: PageNotFound
    },
    { path: "*", redirect: "/page-not-found" }
  ]
});
