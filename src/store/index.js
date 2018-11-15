import Vue from "vue";
import Vuex from "vuex";
import layout from "./modules/layout.js";
import articles from "./modules/articles.js";
import specials from "./modules/specials.js";
import categories from "./modules/categories.js";
import banggia from "./modules/bang-gia.js";
import banner from "./modules/banner.js";
import tag from "./modules/tag.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    articles,
    specials,
    categories,
    banggia,
    banner,
    tag
  },
  strict: process.env.NODE_ENV !== "production"
});
