import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Article from "./views/Article.vue";
import ArticleDetail from "./components/ArticleDetail.vue";

const PageNotFound = () =>
  import(/* webpackChunkName: "page-not-found" */ "./views/PageNotFound.vue");
const BangGia = () =>
  import(/* webpackChunkName: "bang-gia" */ "./views/BangGia.vue");
const TableNha = () =>
  import(/* webpackChunkName: "bang-gia" */ "./components/TableNha.vue");
const TableXe = () =>
  import(/* webpackChunkName: "bang-gia" */ "./components/TableXe.vue");
const Tag = () => import(/* webpackChunkName: "tags" */ "./views/Tag.vue");
const TagResults = () =>
  import(/* webpackChunkName: "tags" */ "./components/TagResults.vue");

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
      path: "/article",
      component: Article,
      children: [
        {
          path: ":id",
          name: "article-detail",
          component: ArticleDetail
        },
        { path: "", redirect: "/" }
      ]
    },
    {
      // Lazy load
      path: "/bang-gia",
      component: BangGia,
      children: [
        {
          path: "nha",
          name: "bang-gia-nha",
          component: TableNha
        },
        {
          path: "xe",
          name: "bang-gia-xe",
          component: TableXe
        },
        { path: "", redirect: "/" }
      ]
    },
    {
      // Lazy load
      path: "/tag",
      name: "tag",
      component: Tag,
      children: [
        {
          path: ":id",
          name: "tag-results",
          component: TagResults
        },
        { path: "", redirect: "/" }
      ]
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
